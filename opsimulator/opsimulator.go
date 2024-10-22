package opsimulator

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"math/big"
	"net"
	"net/http"
	"strconv"
	"strings"
	"sync/atomic"

	ophttp "github.com/ethereum-optimism/optimism/op-service/httputil"
	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/optimism/op-service/tasks"

	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/interop"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"
)

const (
	host                        = "127.0.0.1"
	l2NativeSuperchainERC20Addr = "0x420beeF000000000000000000000000000000001"
)

type OpSimulator struct {
	config.Chain // the chain that op-sim is wrapping

	log log.Logger

	l1Chain config.Chain

	// Long running tasks
	bgTasks       tasks.Group
	bgTasksCtx    context.Context
	bgTasksCancel context.CancelFunc
	peers         map[uint64]config.Chain

	port         uint64
	httpServer   *ophttp.HTTPServer
	crossL2Inbox *bindings.CrossL2Inbox

	ethClient *ethclient.Client

	stopped atomic.Bool
}

// OpSimulator wraps around the l2 chain. By embedding `Chain`, it also implements the same inteface
func New(log log.Logger, closeApp context.CancelCauseFunc, port uint64, l1Chain, l2Chain config.Chain, peers map[uint64]config.Chain) *OpSimulator {
	bgTasksCtx, bgTasksCancel := context.WithCancel(context.Background())

	crossL2Inbox, err := bindings.NewCrossL2Inbox(predeploys.CrossL2InboxAddr, l2Chain.EthClient())
	if err != nil {
		closeApp(fmt.Errorf("failed to create cross L2 inbox: %w", err))
	}

	return &OpSimulator{
		Chain: l2Chain,

		log:          log,
		port:         port,
		l1Chain:      l1Chain,
		crossL2Inbox: crossL2Inbox,

		bgTasksCtx:    bgTasksCtx,
		bgTasksCancel: bgTasksCancel,
		bgTasks: tasks.Group{
			HandleCrit: func(err error) {
				log.Error("opsim bg task failed", "err", err)
				closeApp(err)
			},
		},

		peers: peers,
	}
}

func (opSim *OpSimulator) Start(ctx context.Context) error {
	mux := http.NewServeMux()
	mux.Handle("/", corsHandler(opSim.handler(ctx)))

	hs, err := ophttp.StartHTTPServer(net.JoinHostPort(host, fmt.Sprintf("%d", opSim.port)), mux)
	if err != nil {
		return fmt.Errorf("failed to start HTTP RPC server: %w", err)
	}

	cfg := opSim.Config()
	opSim.log.Debug("started opsimulator", "name", cfg.Name, "chain.id", cfg.ChainID, "addr", hs.Addr())

	opSim.httpServer = hs
	if opSim.port == 0 {
		opSim.port, err = strconv.ParseUint(strings.Split(hs.Addr().String(), ":")[1], 10, 64)
		if err != nil {
			panic(fmt.Errorf("unexpected opsimulator listening port: %w", err))
		}
	}

	ethClient, err := ethclient.Dial(opSim.Endpoint())
	if err != nil {
		return fmt.Errorf("failed to create eth client: %w", err)
	}

	opSim.ethClient = ethClient
	opSim.startBackgroundTasks()
	return nil
}

func (opSim *OpSimulator) Stop(ctx context.Context) error {
	if opSim.stopped.Load() {
		return errors.New("already stopped")
	}
	if !opSim.stopped.CompareAndSwap(false, true) {
		return nil // someone else stopped
	}

	opSim.bgTasksCancel()
	return opSim.httpServer.Stop(ctx)
}

func (opSim *OpSimulator) EthClient() *ethclient.Client {
	return opSim.ethClient
}

func (opSim *OpSimulator) startBackgroundTasks() {
	// Relay deposit tx from L1 to L2
	opSim.bgTasks.Go(func() error {
		depositTxCh := make(chan *types.DepositTx)
		portalAddress := common.Address(opSim.Config().L2Config.L1Addresses.OptimismPortalProxy)
		sub, err := SubscribeDepositTx(context.Background(), opSim.l1Chain.EthClient(), portalAddress, depositTxCh)
		if err != nil {
			return fmt.Errorf("failed to subscribe to deposit tx: %w", err)
		}

		chainId := opSim.Config().ChainID

		for {
			select {
			case dep := <-depositTxCh:
				depTx := types.NewTx(dep)
				opSim.log.Debug("observed deposit event on L1", "hash", depTx.Hash().String())

				clnt := opSim.Chain.EthClient()
				if err := clnt.SendTransaction(opSim.bgTasksCtx, depTx); err != nil {
					opSim.log.Error("failed to submit deposit tx to chain: %w", "chain.id", chainId, "err", err)
				}
				opSim.log.Debug("submitted deposit tx to chain", "chain.id", chainId, "hash", depTx.Hash().String())

			case <-opSim.bgTasksCtx.Done():
				sub.Unsubscribe()
				close(depositTxCh)
				return nil
			}
		}
	})

	// Log L2NativeSuperchainERC20 events
	opSim.bgTasks.Go(func() error {
		superchainERC20, err := bindings.NewL2NativeSuperchainERC20(common.HexToAddress(l2NativeSuperchainERC20Addr), opSim.Chain.EthClient())
		if err != nil {
			return fmt.Errorf("failed to create L2NativeSuperchainERC20 contract: %w", err)
		}

		mintEventChan := make(chan *bindings.L2NativeSuperchainERC20CrosschainMinted)
		mintSub, err := superchainERC20.WatchCrosschainMinted(&bind.WatchOpts{Context: opSim.bgTasksCtx}, mintEventChan, nil)
		if err != nil {
			return fmt.Errorf("failed to subscribe to L2NativeSuperchainERC20#CrosschainMint: %w", err)
		}

		burnEventChan := make(chan *bindings.L2NativeSuperchainERC20CrosschainBurnt)
		burnSub, err := superchainERC20.WatchCrosschainBurnt(&bind.WatchOpts{Context: opSim.bgTasksCtx}, burnEventChan, nil)
		if err != nil {
			return fmt.Errorf("failed to subscribe to L2NativeSuperchainERC20#CrosschainBurn: %w", err)
		}

		for {
			select {
			case event := <-mintEventChan:
				opSim.log.Info("L2NativeSuperchainERC20#CrosschainMint", "to", event.To, "amount", event.Amount)
			case event := <-burnEventChan:
				opSim.log.Info("L2NativeSuperchainERC20#CrosschainBurn", "from", event.From, "amount", event.Amount)
			case <-opSim.bgTasksCtx.Done():
				mintSub.Unsubscribe()
				burnSub.Unsubscribe()
				return nil
			}
		}
	})

	// Log SuperchainTokenBridge events
	opSim.bgTasks.Go(func() error {
		superchainTokenBridge, err := bindings.NewSuperchainTokenBridge(predeploys.SuperchainTokenBridgeAddr, opSim.Chain.EthClient())
		if err != nil {
			return fmt.Errorf("failed to create SuperchainTokenBridge contract: %w", err)
		}

		sendEventChan := make(chan *bindings.SuperchainTokenBridgeSendERC20)
		sendSub, err := superchainTokenBridge.WatchSendERC20(&bind.WatchOpts{Context: opSim.bgTasksCtx}, sendEventChan, nil, nil, nil)
		if err != nil {
			return fmt.Errorf("failed to subscribe to SuperchainTokenBridge#SendERC20: %w", err)
		}

		relayEventChan := make(chan *bindings.SuperchainTokenBridgeRelayERC20)
		relaySub, err := superchainTokenBridge.WatchRelayERC20(&bind.WatchOpts{Context: opSim.bgTasksCtx}, relayEventChan, nil, nil, nil)
		if err != nil {
			return fmt.Errorf("failed to subscribe to SuperchainTokenBridge#RelayERC20: %w", err)
		}

		for {
			select {
			case event := <-sendEventChan:
				opSim.log.Info("SuperchainTokenBridge#SendERC20", "token", event.Token, "from", event.From, "to", event.To, "amount", event.Amount, "destination", event.Destination)
			case event := <-relayEventChan:
				opSim.log.Info("SuperchainTokenBridge#RelayERC20", "token", event.Token, "from", event.From, "to", event.To, "amount", event.Amount, "source", event.Source)
			case <-opSim.bgTasksCtx.Done():
				sendSub.Unsubscribe()
				relaySub.Unsubscribe()
				return nil
			}
		}
	})

	// Log SuperchainWETH events
	opSim.bgTasks.Go(func() error {
		superchainWETH, err := bindings.NewSuperchainWETH(predeploys.SuperchainWETHAddr, opSim.Chain.EthClient())
		if err != nil {
			return fmt.Errorf("failed to create SuperchainWETH contract: %w", err)
		}

		mintEventChan := make(chan *bindings.SuperchainWETHCrosschainMinted)
		mintSub, err := superchainWETH.WatchCrosschainMinted(&bind.WatchOpts{Context: opSim.bgTasksCtx}, mintEventChan, nil)
		if err != nil {
			return fmt.Errorf("failed to subscribe to SuperchainWETH#SendERC20: %w", err)
		}

		burnEventChan := make(chan *bindings.SuperchainWETHCrosschainBurnt)
		burnSub, err := superchainWETH.WatchCrosschainBurnt(&bind.WatchOpts{Context: opSim.bgTasksCtx}, burnEventChan, nil)
		if err != nil {
			return fmt.Errorf("failed to subscribe to SuperchainWETH#RelayERC20: %w", err)
		}

		for {
			select {
			case event := <-mintEventChan:
				opSim.log.Info("SuperchainWETH#CrosschainMint", "to", event.To, "amount", event.Amount)
			case event := <-burnEventChan:
				opSim.log.Info("SuperchainWETH#CrosschainBurn", "from", event.From, "amount", event.Amount)
			case <-opSim.bgTasksCtx.Done():
				mintSub.Unsubscribe()
				burnSub.Unsubscribe()
				return nil
			}
		}
	})
}

func (opSim *OpSimulator) handler(ctx context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// setup an intermediate buffer so the request body is inspectable
		var buf bytes.Buffer
		body := io.TeeReader(r.Body, &buf)
		r.Body = io.NopCloser(&buf)

		// decode the fields we're interested in inspecting
		msgs, isBatchRequest, err := readJsonMessages(body)
		if err != nil {
			http.Error(w, fmt.Sprintf("Failed to parse JSON-RPC request: %s", err), http.StatusBadRequest)
			return
		}

		rpcClient := opSim.Chain.EthClient().Client()
		batchRes := make([]*jsonRpcMessage, len(msgs))
		for i, msg := range msgs {
			if msg.Method == "eth_sendRawTransaction" {
				var params []hexutil.Bytes
				if err := json.Unmarshal(msg.Params, &params); err != nil {
					opSim.log.Error("bad params sent to eth_sendRawTransaction", "err", err)
					batchRes[i] = msg.errorResponse(err)
					continue
				}
				if len(params) != 1 {
					opSim.log.Error("eth_sendRawTransaction request has invalid number of params")
					batchRes[i] = msg.errorResponse(&jsonError{Code: InvalidParams, Message: "invalid request params"})
					continue
				}

				tx := new(types.Transaction)
				if err := tx.UnmarshalBinary(params[0]); err != nil {
					opSim.log.Error("failed to decode transaction data", "err", err)
					batchRes[i] = msg.errorResponse(err)
					continue
				}
				if err := opSim.checkInteropInvariants(ctx, tx); err != nil {
					opSim.log.Error("interop invariants not met", "err", err)
					batchRes[i] = msg.errorResponse(&jsonError{Code: InvalidParams, Message: err.Error()})
					continue
				}
			}

			// NOTE: This fans out the batch request into individual requests. To match expected behavior, this
			// should filter out messages that are invalid and reconstruct a single batch request to forward
			var jsonErr *jsonError
			batchRes[i], jsonErr = forwardRPCRequest(ctx, rpcClient, msg)
			if jsonErr != nil {
				batchRes[i] = msg.errorResponse(jsonErr)
			}
		}

		var encdata []byte
		if isBatchRequest {
			encdata, err = json.Marshal(batchRes)
		} else {
			encdata, err = json.Marshal(batchRes[0])
		}

		// encoding error
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// write to response
		w.Header().Set("Content-Length", strconv.Itoa(len(encdata)))
		w.Header().Set("Transfer-Encoding", "identity")
		if _, err := w.Write(encdata); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// trigger a flush if applicable
		if f, ok := w.(http.Flusher); ok {
			f.Flush()
		}
	}
}

// Forward a JSON-RPC request to the Geth RPC server
func forwardRPCRequest(ctx context.Context, rpcClient *rpc.Client, req *jsonRpcMessage) (*jsonRpcMessage, *jsonError) {
	var result json.RawMessage
	var params []interface{}
	if len(req.Params) > 0 {
		if err := json.Unmarshal(req.Params, &params); err != nil {
			return nil, &jsonError{Code: InvalidParams, Message: err.Error()}
		}
	}

	if err := rpcClient.CallContext(ctx, &result, req.Method, params...); err != nil {
		return nil, toJsonError(err)
	}
	return &jsonRpcMessage{Version: vsn, Result: result, ID: req.ID}, nil
}

func (opSim *OpSimulator) checkInteropInvariants(ctx context.Context, tx *types.Transaction) error {
	logs, err := opSim.SimulatedLogs(ctx, tx)
	if err != nil {
		return fmt.Errorf("failed to simulate transaction: %w", err)
	}

	var executingMessages []*bindings.CrossL2InboxExecutingMessage
	for _, log := range logs {
		if !interop.IsExecutingMessageLog(&log) {
			continue
		}

		executingMessage, err := opSim.crossL2Inbox.ParseExecutingMessage(log)
		if err != nil {
			return fmt.Errorf("failed to decode executing messages from transaction logs: %w", err)
		}
		executingMessages = append(executingMessages, executingMessage)
	}

	if len(executingMessages) >= 1 {
		for _, executingMessage := range executingMessages {
			identifier := executingMessage.Id
			sourceChain, ok := opSim.peers[identifier.ChainId.Uint64()]
			if !ok {
				return fmt.Errorf("no chain found for chain id: %d", identifier.ChainId)
			}

			sourceClient := sourceChain.EthClient()
			identifierBlockHeader, err := sourceClient.HeaderByNumber(ctx, identifier.BlockNumber)
			if err != nil {
				return fmt.Errorf("failed to fetch executing message block: %w", err)
			}

			if identifier.Timestamp.Cmp(new(big.Int).SetUint64(identifierBlockHeader.Time)) != 0 {
				return fmt.Errorf("executing message identifier does not match block timestamp: %w", err)
			}

			fq := ethereum.FilterQuery{Addresses: []common.Address{identifier.Origin}, FromBlock: identifier.BlockNumber, ToBlock: identifier.BlockNumber}
			logs, err := sourceClient.FilterLogs(ctx, fq)
			if err != nil {
				return fmt.Errorf("failed to fetch initiating message logs: %w", err)
			}

			var initiatingMessageLogs []types.Log
			for _, log := range logs {
				logIndex := big.NewInt(int64(log.Index))
				if logIndex.Cmp(identifier.LogIndex) == 0 {
					initiatingMessageLogs = append(initiatingMessageLogs, log)
				}
			}

			if len(initiatingMessageLogs) == 0 {
				return fmt.Errorf("initiating message not found")
			}

			// Since we look for a log at a specific index, this should never be more than 1.
			if len(initiatingMessageLogs) > 1 {
				return fmt.Errorf("unexpected number of initiating messages found: %d", len(initiatingMessageLogs))
			}

			initiatingMsgPayloadHash := crypto.Keccak256Hash(interop.ExecutingMessagePayloadBytes(&initiatingMessageLogs[0]))
			if common.BytesToHash(executingMessage.MsgHash[:]).Cmp(initiatingMsgPayloadHash) != 0 {
				return fmt.Errorf("executing and initiating message fields are not equal")
			}
		}
	}

	return nil
}

// Overridden such that the port field can appropiately be set
func (opSim *OpSimulator) Config() *config.ChainConfig {
	// we dereference the config so that a copy is made. This is only okay since
	// the field were modifying is a non-pointer fields
	cfg := *opSim.Chain.Config()
	cfg.Port = opSim.port
	return &cfg
}

// Overridden such that the correct port is used
func (opSim *OpSimulator) Endpoint() string {
	return fmt.Sprintf("http://%s:%d", host, opSim.port)
}

func corsHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
