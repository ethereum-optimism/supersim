package opsimulator

import (
	"context"
	"errors"
	"fmt"

	"github.com/asaskevich/EventBus"
	"github.com/ethereum-optimism/optimism/op-node/rollup/derive"
	"github.com/ethereum-optimism/optimism/op-service/tasks"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
)

var _ ethereum.Subscription = &depositTxSubscription{}

type L1ToL2MessageIndexer struct {
	log          log.Logger
	storeManager *L1DepositStoreManager
	eb           EventBus.Bus
	l2Chain      config.Chain
	tasks        tasks.Group
	tasksCtx     context.Context
	tasksCancel  context.CancelFunc
	ethClient    *ethclient.Client
	chains       map[uint64]config.Chain
}

type depositTxSubscription struct {
	logSubscription ethereum.Subscription
	logCh           chan types.Log
	errCh           chan error
	doneCh          chan struct{}
}

type DepositChannels struct {
	DepositTxCh chan<- *types.DepositTx
	LogCh       chan<- types.Log
}

func (d *depositTxSubscription) Unsubscribe() {
	// since multiple opsims run subcription to indexer multiple times, a select needs to be added to avoid any race condition leading to a panic
	select {
	case <-d.doneCh:
		return
	default:
		d.logSubscription.Unsubscribe()
		close(d.doneCh)
	}
}

func (d *depositTxSubscription) Err() <-chan error {
	return d.errCh
}

type LogSubscriber interface {
	SubscribeFilterLogs(context.Context, ethereum.FilterQuery, chan<- types.Log) (ethereum.Subscription, error)
}

func NewL1ToL2MessageIndexer(log log.Logger, storeManager *L1DepositStoreManager) *L1ToL2MessageIndexer {
	tasksCtx, tasksCancel := context.WithCancel(context.Background())

	return &L1ToL2MessageIndexer{
		log:          log,
		storeManager: storeManager,
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

func (i *L1ToL2MessageIndexer) Start(ctx context.Context, client *ethclient.Client, l2Chains map[uint64]config.Chain) error {

	i.chains = l2Chains

	for _, chain := range i.chains {
		if err := i.startForChain(client, chain); err != nil {
			return fmt.Errorf("Failed to start L1 to L2 indexer")
		}
	}

	return nil
}

func (i *L1ToL2MessageIndexer) startForChain(client *ethclient.Client, chain config.Chain) error {
	i.tasks.Go(func() error {
		depositTxCh := make(chan *types.DepositTx)
		logCh := make(chan types.Log)

		defer close(depositTxCh)
		defer close(logCh)

		channels := DepositChannels{
			DepositTxCh: depositTxCh,
			LogCh:       logCh,
		}

		portalAddress := common.Address(chain.Config().L2Config.L1Addresses.OptimismPortalProxy)
		sub, err := SubscribeDepositTx(i.tasksCtx, client, portalAddress, channels)

		if err != nil {
			return fmt.Errorf("failed to subscribe to deposit tx: %w", err)
		}

		chainID := chain.Config().ChainID

		for {
			select {
			case dep := <-depositTxCh:
				log := <-logCh
				i.log.Info("observed deposit event on L1", "deposit:", dep)
				if err := i.ProcessEvent(dep, log, chainID); err != nil {
					fmt.Printf("failed to process log: %v\n", err)
				}

			case <-i.tasksCtx.Done():
				sub.Unsubscribe()
			}
		}
	})

	return nil
}

func (i *L1ToL2MessageIndexer) Stop(ctx context.Context) error {
	i.tasksCancel()
	return nil
}

func depositMessageInfoKey(destinationChainID uint64) string {
	return fmt.Sprintf("DepositMessageKey:destination:%d", destinationChainID)
}

func (i *L1ToL2MessageIndexer) SubscribeDepositMessage(destinationChainID uint64, depositMessageChan chan<- *types.Transaction) (func(), error) {
	return i.createSubscription(depositMessageInfoKey(destinationChainID), depositMessageChan)
}

func (i *L1ToL2MessageIndexer) createSubscription(key string, depositMessageChan chan<- *types.Transaction) (func(), error) {
	handler := func(e *types.Transaction) {
		depositMessageChan <- e
	}

	if err := i.eb.Subscribe(key, handler); err != nil {
		return nil, fmt.Errorf("failed to create subscription %s: %w", key, err)
	}

	return func() {
		_ = i.eb.Unsubscribe(key, handler)
	}, nil
}

func (i *L1ToL2MessageIndexer) Get(msgHash common.Hash) (*L1DepositMessage, error) {
	return i.storeManager.Get(msgHash)
}

func (i *L1ToL2MessageIndexer) ProcessEvent(dep *types.DepositTx, log types.Log, chainID uint64) error {

	depTx := types.NewTx(dep)
	i.log.Info("observed deposit event on L1", "hash", depTx.Hash().String(), "SourceHash", dep.SourceHash.String())

	depositMessage := L1DepositMessage{
		DepositTxn: dep,
		DepositLog: log,
	}

	if err := i.storeManager.Set(dep.SourceHash, &depositMessage); err != nil {
		i.log.Error("failed to store deposit tx to chain: %w", "chain.id", chainID, "err", err)
		return err
	}

	i.eb.Publish(depositMessageInfoKey(chainID), depTx)
	return nil
}

// transforms Deposit event logs into DepositTx
func SubscribeDepositTx(ctx context.Context, logSub LogSubscriber, depositContractAddr common.Address, channels DepositChannels) (ethereum.Subscription, error) {
	logCh := make(chan types.Log)
	filterQuery := ethereum.FilterQuery{Addresses: []common.Address{depositContractAddr}, Topics: [][]common.Hash{{derive.DepositEventABIHash}}}
	logSubscription, err := logSub.SubscribeFilterLogs(ctx, filterQuery, logCh)
	if err != nil {
		return nil, fmt.Errorf("failed to create log subscription: %w", err)
	}

	errCh := make(chan error)
	doneCh := make(chan struct{})
	logErrCh := logSubscription.Err()

	go func() {
		defer close(logCh)
		defer close(errCh)
		for {
			select {
			case log := <-logCh:
				dep, err := logToDepositTx(&log)
				if err != nil {
					errCh <- err
					continue
				}

				channels.DepositTxCh <- dep
				channels.LogCh <- log
			case err := <-logErrCh:
				errCh <- fmt.Errorf("log subscription error: %w", err)
			case <-ctx.Done():
				return
			case <-doneCh:
				return
			}
		}
	}()

	return &depositTxSubscription{logSubscription, logCh, errCh, doneCh}, nil
}

func logToDepositTx(log *types.Log) (*types.DepositTx, error) {
	if len(log.Topics) > 0 && log.Topics[0] == derive.DepositEventABIHash {
		dep, err := derive.UnmarshalDepositLogEvent(log)
		if err != nil {
			return nil, err
		}
		return dep, nil
	} else {
		return nil, errors.New("log is not a deposit event")
	}
}
