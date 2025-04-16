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
	"sync"
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
	"github.com/gorilla/websocket"
)

const (
	l2NativeSuperchainERC20Addr = "0x420beeF000000000000000000000000000000001"
)

type OpSimulator struct {
	config.Chain // the chain that op-sim is wrapping

	log log.Logger

	l1Chain config.Chain

	interopDelay uint64

	// Long running tasks
	bgTasks       tasks.Group
	bgTasksCtx    context.Context
	bgTasksCancel context.CancelFunc
	peers         map[uint64]config.Chain

	host         string
	port         uint64
	httpServer   *ophttp.HTTPServer
	crossL2Inbox *bindings.CrossL2Inbox

	ethClient *ethclient.Client

	stopped atomic.Bool

	// WebSocket configuration
	upgrader      websocket.Upgrader
	subscriptions map[string]*websocket.Conn
	subsMutex     sync.Mutex
	clientConnMu  sync.Mutex
}

type WSResponse struct {
	messageType int
	message     []byte
}

// OpSimulator wraps around the l2 chain. By embedding `Chain`, it also implements the same inteface
func New(log log.Logger, closeApp context.CancelCauseFunc, port uint64, host string, l1Chain, l2Chain config.Chain, peers map[uint64]config.Chain, interopDelay uint64) *OpSimulator {
	bgTasksCtx, bgTasksCancel := context.WithCancel(context.Background())

	return &OpSimulator{
		Chain: l2Chain,

		log:          log.New("chain.id", l2Chain.Config().ChainID),
		port:         port,
		host:         host,
		l1Chain:      l1Chain,
		interopDelay: interopDelay,

		bgTasksCtx:    bgTasksCtx,
		bgTasksCancel: bgTasksCancel,
		bgTasks: tasks.Group{
			HandleCrit: func(err error) {
				log.Error("opsim bg task failed", "err", err)
				closeApp(err)
			},
		},

		peers: peers,

		upgrader: websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin: func(r *http.Request) bool {
				// Allow all origins for development
				return true
			},
		},
	}
}

func (opSim *OpSimulator) Start(ctx context.Context) error {
	mux := http.NewServeMux()

	// Use a single handler for both HTTP and WebSocket
	mux.Handle("/", corsHandler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Check if this is a WebSocket request
		if websocket.IsWebSocketUpgrade(r) {
			opSim.handleWebSocket(w, r)
			return
		}

		// Otherwise handle as HTTP request
		opSim.handler(ctx)(w, r)
	})))

	hs, err := ophttp.StartHTTPServer(net.JoinHostPort(opSim.host, fmt.Sprintf("%d", opSim.port)), mux)
	if err != nil {
		return fmt.Errorf("failed to start HTTP RPC server: %w", err)
	}

	cfg := opSim.Config()
	opSim.log.Debug("started opsimulator", "name", cfg.Name, "chain.id", cfg.ChainID, "addr", hs.Addr())
	opSim.httpServer = hs

	if opSim.port == 0 {
		_, portStr, err := net.SplitHostPort(hs.Addr().String())
		if err != nil {
			panic(fmt.Errorf("failed to parse address: %w", err))
		}

		port, err := strconv.ParseUint(portStr, 10, 64)
		if err != nil {
			panic(fmt.Errorf("unexpected opsimulator listening port: %w", err))
		}
		opSim.port = port
	}

	ethClient, err := ethclient.Dial(opSim.Endpoint())
	if err != nil {
		return fmt.Errorf("failed to create eth client: %w", err)
	}
	opSim.ethClient = ethClient

	crossL2Inbox, err := bindings.NewCrossL2Inbox(predeploys.CrossL2InboxAddr, ethClient)
	if err != nil {
		return fmt.Errorf("failed to create cross L2 inbox: %w", err)
	}
	opSim.crossL2Inbox = crossL2Inbox

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
	if opSim.httpServer != nil {
		return opSim.httpServer.Stop(ctx)
	}

	return nil
}

func (opSim *OpSimulator) EthClient() *ethclient.Client {
	return opSim.ethClient
}

func (opSim *OpSimulator) startBackgroundTasks() {
	// Relay deposit tx from L1 to L2
	opSim.bgTasks.Go(func() error {
		depositTxCh := make(chan *types.DepositTx)
		portalAddress := opSim.Config().L2Config.L1Addresses.OptimismPortalProxy
		sub, err := SubscribeDepositTx(context.Background(), opSim.l1Chain.EthClient(), *portalAddress, depositTxCh)
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

				opSim.log.Info("OptimismPortal#depositTransaction", "l2TxHash", depTx.Hash().String())

			case <-opSim.bgTasksCtx.Done():
				sub.Unsubscribe()
				close(depositTxCh)
				return nil
			}
		}
	})

	// Log SuperchainERC20 events
	opSim.bgTasks.Go(func() error {
		contracts := []struct {
			name    string
			address common.Address
		}{
			{"L2NativeSuperchainERC20", common.HexToAddress(l2NativeSuperchainERC20Addr)},
		}

		for _, c := range contracts {
			contract, err := bindings.NewSuperchainERC20(c.address, opSim.Chain.EthClient())
			if err != nil {
				return fmt.Errorf("failed to create %s contract: %w", c.name, err)
			}

			mintEventChan := make(chan *bindings.SuperchainERC20CrosschainMint)
			burnEventChan := make(chan *bindings.SuperchainERC20CrosschainBurn)

			mintSub, err := contract.WatchCrosschainMint(&bind.WatchOpts{Context: opSim.bgTasksCtx}, mintEventChan, nil, nil)
			if err != nil {
				return fmt.Errorf("failed to subscribe to %s#CrosschainMint: %w", c.name, err)
			}

			burnSub, err := contract.WatchCrosschainBurn(&bind.WatchOpts{Context: opSim.bgTasksCtx}, burnEventChan, nil, nil)
			if err != nil {
				return fmt.Errorf("failed to subscribe to %s#CrosschainBurn: %w", c.name, err)
			}

			for {
				select {
				case event := <-mintEventChan:
					opSim.log.Info(c.name+"#CrosschainMint", "to", event.To, "amount", event.Amount, "sender", event.Sender)
				case event := <-burnEventChan:
					opSim.log.Info(c.name+"#CrosschainBurn", "from", event.From, "amount", event.Amount, "sender", event.Sender)
				case <-opSim.bgTasksCtx.Done():
					mintSub.Unsubscribe()
					burnSub.Unsubscribe()
					return nil
				}
			}
		}
		return nil
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

	// Log SuperchainETHBridge events
	opSim.bgTasks.Go(func() error {
		superchainETHBridge, err := bindings.NewSuperchainETHBridge(predeploys.SuperchainETHBridgeAddr, opSim.Chain.EthClient())
		if err != nil {
			return fmt.Errorf("failed to create SuperchainETHBridge contract: %w", err)
		}

		sendEventChan := make(chan *bindings.SuperchainETHBridgeSendETH)
		sendSub, err := superchainETHBridge.WatchSendETH(&bind.WatchOpts{Context: opSim.bgTasksCtx}, sendEventChan, nil, nil)
		if err != nil {
			return fmt.Errorf("failed to subscribe to SuperchainETHBridge#SendETH: %w", err)
		}

		relayEventChan := make(chan *bindings.SuperchainETHBridgeRelayETH)
		relaySub, err := superchainETHBridge.WatchRelayETH(&bind.WatchOpts{Context: opSim.bgTasksCtx}, relayEventChan, nil, nil)
		if err != nil {
			return fmt.Errorf("failed to subscribe to SuperchainETHBridge#RelayETH: %w", err)
		}

		for {
			select {
			case event := <-sendEventChan:
				opSim.log.Info("SuperchainETHBridge#SendETH", "from", event.From, "to", event.To, "amount", event.Amount, "destination", event.Destination)
			case event := <-relayEventChan:
				opSim.log.Info("SuperchainETHBridge#RelayETH", "from", event.From, "to", event.To, "amount", event.Amount, "source", event.Source)
			case <-opSim.bgTasksCtx.Done():
				sendSub.Unsubscribe()
				relaySub.Unsubscribe()
				return nil
			}
		}
	})
}

func (opSim *OpSimulator) superviseEthRequest(ctx context.Context, msg *jsonRpcMessage) *jsonRpcMessage {
	if msg.Method == "eth_sendRawTransaction" {
		var params []hexutil.Bytes
		if err := json.Unmarshal(msg.Params, &params); err != nil {
			opSim.log.Error("bad params sent to eth_sendRawTransaction", "err", err)
			return msg.errorResponse(err)
		}
		if len(params) != 1 {
			opSim.log.Error("eth_sendRawTransaction request has invalid number of params")
			return msg.errorResponse(&jsonError{Code: InvalidParams, Message: "invalid request params"})
		}

		tx := new(types.Transaction)
		if err := tx.UnmarshalBinary(params[0]); err != nil {
			opSim.log.Error("failed to decode transaction data", "err", err)
			return msg.errorResponse(err)
		}

		txHash := tx.Hash()

		// Deposits should not be directly sendable to the L2
		if tx.IsDepositTx() {
			opSim.log.Error("rejecting deposit tx", "hash", txHash.String())
			return msg.errorResponse(&jsonError{Code: InvalidParams, Message: "cannot process deposit tx"})
		}

		// Simulate the tx.
		logs, err := opSim.SimulatedLogs(ctx, tx)
		if err != nil {
			opSim.log.Warn("failed to simulate transaction!!!", "err", err, "hash", txHash)
			return msg.errorResponse(&jsonError{Code: InvalidParams, Message: "failed tx simulation"})
		} else {
			if err := opSim.checkInteropInvariants(ctx, logs); err != nil {
				opSim.log.Error("unable to statisfy interop invariants within transaction", "err", err, "hash", txHash)
				return msg.errorResponse(&jsonError{Code: InvalidParams, Message: err.Error()})
			}
		}
	}

	// NOTE: This fans out the batch request into individual requests. To match expected behavior, this
	// should filter out messages that are invalid and reconstruct a single batch request to forward
	response, jsonErr := forwardRPCRequest(ctx, opSim.Chain.EthClient().Client(), msg)
	if jsonErr != nil {
		return msg.errorResponse(jsonErr)
	}

	return response
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

		batchRes := make([]*jsonRpcMessage, len(msgs))
		for i, msg := range msgs {
			batchRes[i] = opSim.superviseEthRequest(ctx, msg)
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

func (opSim *OpSimulator) checkInteropInvariants(ctx context.Context, logs []types.Log) error {
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

			if opSim.interopDelay != 0 {
				header, err := opSim.ethClient.HeaderByNumber(ctx, nil)
				if err != nil {
					return fmt.Errorf("failed to fetch executing block header: %w", err)
				}

				if header.Time < identifierBlockHeader.Time+opSim.interopDelay {
					return fmt.Errorf("not enough time has passed since initiating message (need %ds, got %ds)",
						opSim.interopDelay, header.Time-identifierBlockHeader.Time)
				}
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
	return fmt.Sprintf("http://%s:%d", opSim.host, opSim.port)
}

// Overridden such that the correct port is used
func (opSim *OpSimulator) WSEndpoint() string {
	return fmt.Sprintf("ws://%s:%d", opSim.host, opSim.port)
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

func (opSim *OpSimulator) handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := opSim.upgrader.Upgrade(w, r, nil)
	if err != nil {
		opSim.log.Error("Failed to upgrade connection to WebSocket", "error", err)
		return
	}
	defer conn.Close()

	// Create a context for managing the connection lifecycle
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Channel to signal when we're done
	done := make(chan struct{})

	// Start a goroutine to handle messages from the client
	go func() {
		defer close(done)
		for {
			select {
			case <-ctx.Done():
				return
			default:
				messageType, message, err := conn.ReadMessage()
				if err != nil {
					if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
						opSim.log.Error("WebSocket error", "error", err)
					}
					return
				}
				// Process the message in a separate goroutine to avoid blocking
				go func(msgType int, msg []byte) {
					if err := opSim.processWSRequest(ctx, msgType, msg, conn); err != nil {
						opSim.log.Error("Failed to process WS RPC request", "error", err)
					}
				}(messageType, message)
			}
		}
	}()

	// Wait for the connection to be closed
	<-done
}

func (opSim *OpSimulator) processWSRequest(ctx context.Context, clientRequestMessageType int, clientRequestMessage []byte, clientConn *websocket.Conn) error {
	var msgs []*jsonRpcMessage
	var isBatchRequest bool
	var singleMsg jsonRpcMessage
	if err := json.Unmarshal(clientRequestMessage, &singleMsg); err == nil {
		msgs = []*jsonRpcMessage{&singleMsg}
	} else {
		// If that fails, try parsing as a batch
		if err := json.Unmarshal(clientRequestMessage, &msgs); err != nil {
			return fmt.Errorf("failed to parse JSON-RPC request: %w", err)
		}
		isBatchRequest = true
	}

	batchRes := make([]*jsonRpcMessage, len(msgs))
	for i, msg := range msgs {
		if msg.Method == "eth_subscribe" {
			chainConn, _, err := websocket.DefaultDialer.Dial(opSim.Chain.WSEndpoint(), nil)
			if err != nil {
				batchRes[i] = msg.errorResponse(err)
				continue
			}

			msgBytes, err := json.Marshal(msg)
			if err != nil {
				batchRes[i] = msg.errorResponse(err)
				continue
			}
			if err := chainConn.WriteMessage(clientRequestMessageType, msgBytes); err != nil {
				batchRes[i] = msg.errorResponse(err)
				continue
			}

			// Read the subscription ID
			_, responseMessage, err := chainConn.ReadMessage()
			if err != nil {
				batchRes[i] = msg.errorResponse(err)
				continue
			}

			var subResponse struct {
				ID     int    `json:"id"`
				Result string `json:"result"`
			}
			if err := json.Unmarshal(responseMessage, &subResponse); err != nil {
				batchRes[i] = msg.errorResponse(err)
				continue
			}

			opSim.subsMutex.Lock()
			if opSim.subscriptions == nil {
				opSim.subscriptions = make(map[string]*websocket.Conn)
			}
			opSim.subscriptions[subResponse.Result] = chainConn
			opSim.subsMutex.Unlock()

			var jsonRpcResponse *jsonRpcMessage
			if err := json.Unmarshal(responseMessage, &jsonRpcResponse); err != nil {
				batchRes[i] = msg.errorResponse(err)
				continue
			}
			batchRes[i] = jsonRpcResponse

			// Start a goroutine to forward messages from the subscription
			go func() {
				defer func() {
					opSim.subsMutex.Lock()
					delete(opSim.subscriptions, subResponse.Result)
					opSim.subsMutex.Unlock()
					chainConn.Close()
				}()

				for {
					messageType, message, err := chainConn.ReadMessage()
					if err != nil {
						if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
							opSim.log.Error("WS connection closed unexpectedly", "error", err)
						}
						return
					}
					opSim.clientConnMu.Lock()
					if err := clientConn.WriteMessage(messageType, message); err != nil {
						opSim.clientConnMu.Unlock()
						opSim.log.Error("Failed to write WS Message", "error", err)
						return
					}
					opSim.clientConnMu.Unlock()
				}
			}()

			continue
		}

		if msg.Method == "eth_unsubscribe" {
			var params []string
			if err := json.Unmarshal(msg.Params, &params); err != nil {
				batchRes[i] = msg.errorResponse(err)
				continue
			}
			if len(params) != 1 {
				batchRes[i] = msg.errorResponse(&jsonError{Code: InvalidParams, Message: "invalid request params"})
				continue
			}
			subscriptionID := params[0]
			subConn, exists := opSim.subscriptions[subscriptionID]
			if exists {
				defer subConn.Close()
				// Send unsubscribe request
				if err := subConn.WriteMessage(clientRequestMessageType, clientRequestMessage); err != nil {
					batchRes[i] = msg.errorResponse(err)
					continue
				}
				opSim.subsMutex.Lock()
				delete(opSim.subscriptions, subscriptionID)
				opSim.subsMutex.Unlock()

				// Read the response
				_, response, err := subConn.ReadMessage()
				if err != nil {
					batchRes[i] = msg.errorResponse(err)
					continue
				}
				var jsonRpcResponse *jsonRpcMessage
				if err := json.Unmarshal(response, &jsonRpcResponse); err != nil {
					batchRes[i] = msg.errorResponse(err)
					continue
				}
				batchRes[i] = jsonRpcResponse

				continue
			}
			// if subscription does not exist, then pass through the request
		}

		batchRes[i] = opSim.superviseEthRequest(ctx, msg)
	}

	opSim.clientConnMu.Lock()
	defer opSim.clientConnMu.Unlock()
	if isBatchRequest {
		batchResponseJSON, err := json.Marshal(batchRes)
		if err != nil {
			return fmt.Errorf("failed to marshal batch response: %w", err)
		}
		return clientConn.WriteMessage(clientRequestMessageType, batchResponseJSON)
	} else {
		responseJSON, err := json.Marshal(batchRes[0])
		if err != nil {
			return fmt.Errorf("failed to marshal response: %w", err)
		}
		return clientConn.WriteMessage(clientRequestMessageType, responseJSON)
	}
}
