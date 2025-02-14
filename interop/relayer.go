package interop

import (
	"context"
	"fmt"
	"math/big"
	"strings"
	"sync"
	"time"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/optimism/op-service/tasks"
	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
)

type L2ToL2MessageRelayer struct {
	logger log.Logger

	l2ToL2MessageIndexer *L2ToL2MessageIndexer

	clients map[uint64]*ethclient.Client
	chains  map[uint64]config.Chain

	tasks       tasks.Group
	tasksCtx    context.Context
	tasksCancel context.CancelFunc

	// the messages stored in this mapping are keyed by the msgHash of the message that they
	// depend on being relayed before they can be relayed.
	messageWaitingPool            map[common.Hash][]*L2ToL2MessageStoreEntry
	messageWaitingPoolMutex       sync.RWMutex
	checkForDependentMsgHashMutex sync.RWMutex
}

var (
	ErrDependentMsgNotSuccessful = hexutil.Encode(
		crypto.Keccak256([]byte("DependentMessageNotSuccessful(bytes32)"))[:4],
	)
)

func NewL2ToL2MessageRelayer(logger log.Logger) *L2ToL2MessageRelayer {
	tasksCtx, tasksCancel := context.WithCancel(context.Background())

	return &L2ToL2MessageRelayer{
		logger: logger,
		tasks: tasks.Group{
			HandleCrit: func(err error) {
				fmt.Printf("unhandled indexer error: %v\n", err)
			},
		},
		tasksCtx:                      tasksCtx,
		tasksCancel:                   tasksCancel,
		messageWaitingPool:            make(map[common.Hash][]*L2ToL2MessageStoreEntry),
		messageWaitingPoolMutex:       sync.RWMutex{},
		checkForDependentMsgHashMutex: sync.RWMutex{},
	}

}

func (r *L2ToL2MessageRelayer) Start(indexer *L2ToL2MessageIndexer, clients map[uint64]*ethclient.Client, chains map[uint64]config.Chain) error {
	r.l2ToL2MessageIndexer = indexer
	r.clients = clients
	r.chains = chains
	keys, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	if err != nil {
		return fmt.Errorf("failed to create dev keys: %w", err)
	}

	privateKey, err := keys.Secret(devkeys.UserKey(9))
	// we force the curve to Geth's instance, because Geth does an equality check in the nocgo version:
	// https://github.com/ethereum/go-ethereum/blob/723b1e36ad6a9e998f06f74cc8b11d51635c6402/crypto/signature_nocgo.go#L82
	privateKey.PublicKey.Curve = crypto.S256()

	if err != nil {
		return fmt.Errorf("failed to derive private key: %w", err)
	}

	for destinationChainID, client := range r.clients {
		r.tasks.Go(func() error {
			relayedMsgChan := make(chan *L2ToL2MessageStoreEntry)
			unsubscribe, err := r.l2ToL2MessageIndexer.SubscribeRelayedMessageToDestination(destinationChainID, relayedMsgChan)
			if err != nil {
				r.logger.Debug("failed to subscribe to sent message events", "err", err)
				return fmt.Errorf("failed to subscribe to sent message events: %w", err)
			}

			transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(int64(destinationChainID)))
			if err != nil {
				r.logger.Debug("failed to create transactor", "err", err)
				return fmt.Errorf("failed to create transactor: %w", err)
			}

			l2tol2CDM, err := bindings.NewL2ToL2CrossDomainMessengerTransactor(predeploys.L2toL2CrossDomainMessengerAddr, client)
			if err != nil {
				r.logger.Debug("failed to create transactor", "err", err)
				return fmt.Errorf("failed to create	transactor: %w", err)
			}

			for {
				select {
				case relayedMsg := <-relayedMsgChan:
					r.checkForDependentMsgHashMutex.RLock()
					r.messageWaitingPoolMutex.Lock()
					if waitingMsgs, exists := r.messageWaitingPool[relayedMsg.msgHash]; exists {
						delete(r.messageWaitingPool, relayedMsg.msgHash)
						r.messageWaitingPoolMutex.Unlock()

						for _, waitingMsg := range waitingMsgs {
							if err := r.relayMessageWithRetry(l2tol2CDM, transactor, waitingMsg, 1); err != nil {
								r.logger.Error("failed to relay waiting message", "err", err)
							}
						}
					} else {
						r.messageWaitingPoolMutex.Unlock()
					}
					r.checkForDependentMsgHashMutex.RUnlock()
				case <-r.tasksCtx.Done():
					unsubscribe()
					close(relayedMsgChan)
					return nil
				}
			}

		})

		r.tasks.Go(func() error {
			sentMessageCh := make(chan *L2ToL2MessageStoreEntry)
			unsubscribe, err := r.l2ToL2MessageIndexer.SubscribeSentMessageToDestination(destinationChainID, sentMessageCh)

			if err != nil {
				r.logger.Debug("failed to create transactor", "err", err)
				return fmt.Errorf("failed to subscribe to sent message events: %w", err)
			}

			transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(int64(destinationChainID)))
			if err != nil {
				r.logger.Debug("failed to create transactor", "err", err)
				return fmt.Errorf("failed to create transactor: %w", err)
			}

			l2tol2CDM, err := bindings.NewL2ToL2CrossDomainMessengerTransactor(predeploys.L2toL2CrossDomainMessengerAddr, client)
			if err != nil {
				r.logger.Debug("failed to create transactor", "err", err)
				return fmt.Errorf("failed to create	transactor: %w", err)
			}

			for {
				select {
				case <-r.tasksCtx.Done():
					unsubscribe()
					close(sentMessageCh)
					return nil
				case sentMessage := <-sentMessageCh:
					dependentMsgHash, err := r.fetchDependentMsgHash(transactor, sentMessage, destinationChainID)
					if err != nil {
						r.logger.Error("failed to relay message while checking for dependent message", "err", err)
						continue
					}
					if dependentMsgHash == nil {
						if err := r.relayMessageWithRetry(l2tol2CDM, transactor, sentMessage, 1); err != nil {
							r.logger.Error("failed to relay message after retries", "err", err)
							continue
						}
					}
					if dependentMsgHash != nil {
						r.messageWaitingPoolMutex.Lock()
						r.messageWaitingPool[*dependentMsgHash] = append(r.messageWaitingPool[*dependentMsgHash], sentMessage)
						r.messageWaitingPoolMutex.Unlock()
					}
				}
			}

		})
	}

	return nil
}

func (r *L2ToL2MessageRelayer) Stop(ctx context.Context) {
	r.tasksCancel()
}

func (r *L2ToL2MessageRelayer) relayMessageWithRetry(l2tol2CDM *bindings.L2ToL2CrossDomainMessengerTransactor, transactor *bind.TransactOpts, sentMessage *L2ToL2MessageStoreEntry, maxRetries int) error {
	for attempt := 0; attempt < maxRetries; attempt++ {
		if _, err := l2tol2CDM.RelayMessage(transactor, *sentMessage.Identifier(), sentMessage.MessagePayload()); err != nil {
			r.logger.Debug("failed to relay message", "err", err, "attempt", attempt+1, "maxRetries", maxRetries)
			if attempt == maxRetries-1 {
				return fmt.Errorf("failed to relay message after %d attempts: %w", maxRetries, err)
			}
			time.Sleep(time.Second * time.Duration(1<<attempt))
			continue
		}
		return nil
	}
	return nil
}

func (r *L2ToL2MessageRelayer) fetchDependentMsgHash(transactor *bind.TransactOpts, sentMessage *L2ToL2MessageStoreEntry, destinationChainID uint64) (*common.Hash, error) {
	r.checkForDependentMsgHashMutex.Lock()
	defer r.checkForDependentMsgHashMutex.Unlock()
	l2tol2CDMABI, err := abi.JSON(strings.NewReader(bindings.L2ToL2CrossDomainMessengerMetaData.ABI))
	if err != nil {
		return nil, fmt.Errorf("failed to read l2tol2CDM abi: %w", err)
	}

	input, err := l2tol2CDMABI.Pack(
		"relayMessage",
		*sentMessage.Identifier(),
		sentMessage.MessagePayload(),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to pack relayMessage transaction data: %w", err)
	}

	chain, ok := r.chains[destinationChainID]
	if !ok {
		return nil, fmt.Errorf("no client found for chain ID %d", destinationChainID)
	}

	gasPrice, err := chain.EthClient().SuggestGasPrice(r.tasksCtx)
	if err != nil {
		return nil, fmt.Errorf("failed to suggest gas price: %w", err)
	}
	header, err := chain.EthClient().HeaderByNumber(r.tasksCtx, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to get latest block: %w", err)
	}

	tx := types.NewTransaction(
		0,
		predeploys.L2toL2CrossDomainMessengerAddr,
		big.NewInt(0),
		header.GasLimit,
		gasPrice,
		input,
	)

	signedTx, err := transactor.Signer(transactor.From, tx)
	if err != nil {
		return nil, fmt.Errorf("failed to sign transaction: %w", err)
	}

	traceCallResult, err := chain.DebugTraceCall(r.tasksCtx, signedTx)
	if err != nil {
		return nil, fmt.Errorf("autorelaying failed while simulating transaction: %w", err)
	}

	msgHash := checkForDependentMsgNotSuccessfulRevert(*traceCallResult)
	return msgHash, nil
}

func checkForDependentMsgNotSuccessfulRevert(trace config.TraceCallResult) *common.Hash {
	if trace.From == predeploys.L2toL2CrossDomainMessengerAddr && trace.Output != nil && len(trace.Output) >= 4 && hexutil.Encode(trace.Output[:4]) == ErrDependentMsgNotSuccessful {
		msgHash := common.BytesToHash(trace.Output[4:])
		return &msgHash
	}

	// Check nested calls
	for _, call := range trace.Calls {
		if msgHash := checkForDependentMsgNotSuccessfulRevert(call); msgHash != nil {
			return msgHash
		}
	}

	return nil
}
