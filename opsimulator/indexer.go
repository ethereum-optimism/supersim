package opsimulator

import (
	"context"
	"fmt"

	"github.com/asaskevich/EventBus"
	"github.com/ethereum-optimism/optimism/op-service/tasks"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
)

type L1ToL2MessageIndexer struct {
	log          log.Logger
	storeManager *L1DepositStoreManager
	eb           EventBus.Bus
	l2Chain      config.Chain
	tasks        tasks.Group
	tasksCtx     context.Context
	tasksCancel  context.CancelFunc
	ethClient    *ethclient.Client
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

func (i *L1ToL2MessageIndexer) Start(ctx context.Context, client *ethclient.Client, l2Chain config.Chain) error {

	i.l2Chain = l2Chain

	i.tasks.Go(func() error {
		depositTxCh := make(chan *types.DepositTx)
		portalAddress := common.Address(l2Chain.Config().L2Config.L1Addresses.OptimismPortalProxy)
		sub, err := SubscribeDepositTx(i.tasksCtx, client, portalAddress, depositTxCh)

		if err != nil {
			return fmt.Errorf("failed to subscribe to deposit tx: %w", err)
		}

		chainID := i.l2Chain.Config().ChainID

		for {
			select {
			case dep := <-depositTxCh:
				if err := i.processEvent(dep, chainID); err != nil {
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

func (i *L1ToL2MessageIndexer) processEvent(dep *types.DepositTx, chainID uint64) error {

	depTx := types.NewTx(dep)
	i.log.Info("observed deposit event on L1", "hash", depTx.Hash().String(), "SourceHash", dep.SourceHash.String())

	if err := i.storeManager.Set(dep.SourceHash, dep); err != nil {
		i.log.Error("failed to store deposit tx to chain: %w", "chain.id", chainID, "err", err)
		return err
	}

	i.eb.Publish(depositMessageInfoKey(chainID), depTx)
	return nil
}
