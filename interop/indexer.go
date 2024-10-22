package interop

import (
	"context"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/log"

	"github.com/asaskevich/EventBus"
	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/optimism/op-service/tasks"
	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

type L2ToL2MessageIndexer struct {
	log          log.Logger
	storeManager *L2ToL2MessageStoreManager
	eb           EventBus.Bus
	clients      map[uint64]*ethclient.Client
	tasks        tasks.Group
	tasksCtx     context.Context
	tasksCancel  context.CancelFunc
}

func NewL2ToL2MessageIndexer(log log.Logger) *L2ToL2MessageIndexer {
	tasksCtx, tasksCancel := context.WithCancel(context.Background())

	return &L2ToL2MessageIndexer{
		log:          log,
		storeManager: NewL2ToL2MessageStoreManager(),
		eb:           EventBus.New(),
		tasks: tasks.Group{
			HandleCrit: func(err error) {
				fmt.Printf("unhandled indexer error: %v\n", err)
			},
		},
		tasksCtx:    tasksCtx,
		tasksCancel: tasksCancel,
	}
}

func (i *L2ToL2MessageIndexer) Start(ctx context.Context, clients map[uint64]*ethclient.Client) error {
	i.clients = clients

	for chainID, client := range i.clients {
		i.tasks.Go(func() error {
			logCh := make(chan types.Log)
			fq := ethereum.FilterQuery{Addresses: []common.Address{predeploys.L2toL2CrossDomainMessengerAddr}}
			sub, err := client.SubscribeFilterLogs(i.tasksCtx, fq, logCh)
			if err != nil {
				return fmt.Errorf("failed to subscribe to L2ToL2CrossDomainMessenger events: %w", err)
			}

			for {
				select {
				case log := <-logCh:
					if err := i.processEventLog(i.tasksCtx, client, chainID, &log); err != nil {
						fmt.Printf("failed to process log: %v\n", err)
					}
				case <-i.tasksCtx.Done():
					sub.Unsubscribe()
				}
			}
		})
	}
	return nil
}

func (i *L2ToL2MessageIndexer) Stop(ctx context.Context) error {
	i.tasksCancel()
	return nil
}

func sentMessageFromSourceKey(sourceChainID uint64) string {
	return fmt.Sprintf("SentMessage:source:%d", sourceChainID)
}

func (i *L2ToL2MessageIndexer) SubscribeSentMessageFromSource(sourceChainID uint64, sentMessageChan chan<- *L2ToL2MessageStoreEntry) (func(), error) {
	return i.createSubscription(sentMessageFromSourceKey(sourceChainID), sentMessageChan)
}

func sentMessageToDestinationKey(destinationChainID uint64) string {
	return fmt.Sprintf("SentMessage:destination:%d", destinationChainID)
}

func (i *L2ToL2MessageIndexer) SubscribeSentMessageToDestination(destinationChainID uint64, sentMessageChan chan<- *L2ToL2MessageStoreEntry) (func(), error) {
	return i.createSubscription(sentMessageToDestinationKey(destinationChainID), sentMessageChan)
}

func relayedMessageToDestinationKey(destinationChainID uint64) string {
	return fmt.Sprintf("RelayedMessage:destination:%d", destinationChainID)
}

func (i *L2ToL2MessageIndexer) SubscribeRelayedMessageToDestination(destinationChainID uint64, relayedMessageChan chan<- *L2ToL2MessageStoreEntry) (func(), error) {
	return i.createSubscription(relayedMessageToDestinationKey(destinationChainID), relayedMessageChan)
}

func failedRelayedMessageToDestinationKey(destinationChainID uint64) string {
	return fmt.Sprintf("FailedRelayedMessage:destination%d", destinationChainID)
}

func (i *L2ToL2MessageIndexer) SubscribeFailedRelayMessageToDestination(destinationChainID uint64, failedRelayMessageChan chan<- *L2ToL2MessageStoreEntry) (func(), error) {
	return i.createSubscription(failedRelayedMessageToDestinationKey(destinationChainID), failedRelayMessageChan)
}

func (i *L2ToL2MessageIndexer) Get(msgHash common.Hash) (*L2ToL2MessageStoreEntry, error) {
	return i.storeManager.Get(msgHash)
}

func (i *L2ToL2MessageIndexer) processEventLog(ctx context.Context, backend ethereum.ChainReader, chainID uint64, log *types.Log) error {
	relayedMessageEventId := bindings.L2ToL2CrossDomainMessengerParsedABI.Events["RelayedMessage"].ID
	sentMessageEventId := bindings.L2ToL2CrossDomainMessengerParsedABI.Events["SentMessage"].ID
	failedRelayedMessageEventId := bindings.L2ToL2CrossDomainMessengerParsedABI.Events["FailedRelayedMessage"].ID

	if log.Topics[0] == sentMessageEventId {
		identifier, err := getIdentifier(ctx, backend, chainID, log)
		if err != nil {
			return fmt.Errorf("failed to get log identifier: %w", err)
		}

		entry, err := i.storeManager.HandleSentEvent(log, identifier)
		if err != nil {
			return fmt.Errorf("failed to handle SentMessage event: %w", err)
		}

		i.logMessageEvent("SentMessage", entry)

		i.eb.Publish(sentMessageFromSourceKey(entry.message.Source), entry)
		i.eb.Publish(sentMessageToDestinationKey(entry.message.Destination), entry)

	} else if log.Topics[0] == relayedMessageEventId {
		entry, err := i.storeManager.HandleRelayedEvent(log)
		if err != nil {
			return fmt.Errorf("failed to handle RelayedMessage event: %w", err)
		}

		i.logMessageEvent("RelayedMessage", entry)

		i.eb.Publish(relayedMessageToDestinationKey(entry.message.Destination), entry)
	} else if log.Topics[0] == failedRelayedMessageEventId {
		entry, err := i.storeManager.HandleFailedRelayedEvent(log)
		if err != nil {
			return fmt.Errorf("failed to handle FailedRelayedMessage event: %w", err)
		}

		i.logMessageEvent("FailedRelayedMessage", entry)

		i.eb.Publish(failedRelayedMessageToDestinationKey(entry.message.Destination), entry)

	} else {
		return fmt.Errorf("unexpected event type: %x", log.Topics[0])
	}

	return nil
}

func (i *L2ToL2MessageIndexer) logMessageEvent(eventName string, entry *L2ToL2MessageStoreEntry) {
	msg := entry.Message()
	i.log.Info(fmt.Sprintf("L2ToL2CrossChainMessenger#%s", eventName), "sourceChainID", msg.Source, "destinationChainID", msg.Destination, "nonce", msg.Nonce, "sender", msg.Sender, "target", msg.Target)
}

func (i *L2ToL2MessageIndexer) createSubscription(key string, messageChan chan<- *L2ToL2MessageStoreEntry) (func(), error) {
	handler := func(e *L2ToL2MessageStoreEntry) {
		messageChan <- e
	}
	if err := i.eb.Subscribe(key, handler); err != nil {
		return nil, fmt.Errorf("failed to create subscription %s: %w", key, err)
	}

	return func() {
		_ = i.eb.Unsubscribe(key, handler)
	}, nil
}

func getIdentifier(ctx context.Context, backend ethereum.ChainReader, chainID uint64, log *types.Log) (*bindings.ICrossL2InboxIdentifier, error) {
	blockHeader, err := backend.HeaderByNumber(ctx, big.NewInt(int64(log.BlockNumber)))
	if err != nil {
		return nil, fmt.Errorf("failed to get block: %w", err)
	}

	return &bindings.ICrossL2InboxIdentifier{
		Origin:      log.Address,
		BlockNumber: blockHeader.Number,
		LogIndex:    big.NewInt(int64(log.Index)),
		Timestamp:   big.NewInt(int64(blockHeader.Time)),
		ChainId:     big.NewInt(int64(chainID)),
	}, nil
}
