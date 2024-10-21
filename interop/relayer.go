package interop

import (
	"context"
	"fmt"
	"math/big"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/optimism/op-service/tasks"
	"github.com/ethereum-optimism/supersim/bindings"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
)

type L2ToL2MessageRelayer struct {
	logger log.Logger

	l2ToL2MessageIndexer *L2ToL2MessageIndexer

	clients map[uint64]*ethclient.Client

	tasks       tasks.Group
	tasksCtx    context.Context
	tasksCancel context.CancelFunc
}

func NewL2ToL2MessageRelayer(logger log.Logger) *L2ToL2MessageRelayer {
	tasksCtx, tasksCancel := context.WithCancel(context.Background())

	return &L2ToL2MessageRelayer{
		logger: logger,
		tasks: tasks.Group{
			HandleCrit: func(err error) {
				fmt.Printf("unhandled indexer error: %v\n", err)
			},
		},
		tasksCtx:    tasksCtx,
		tasksCancel: tasksCancel,
	}

}

func (r *L2ToL2MessageRelayer) Start(indexer *L2ToL2MessageIndexer, clients map[uint64]*ethclient.Client) error {
	r.l2ToL2MessageIndexer = indexer
	r.clients = clients

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
			sentMessageCh := make(chan *L2ToL2MessageStoreEntry)
			unsubscribe, err := r.l2ToL2MessageIndexer.SubscribeSentMessageToDestination(destinationChainID, sentMessageCh)

			if err != nil {
				r.logger.Debug("failed to create	transactor", "err", err)
				return fmt.Errorf("failed to subscribe to sent message events: %w", err)
			}

			transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(int64(destinationChainID)))
			if err != nil {
				r.logger.Debug("failed to create	transactor", "err", err)
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
					if _, err := l2tol2CDM.RelayMessage(transactor, *sentMessage.Identifier(), sentMessage.MessagePayload()); err != nil {
						r.logger.Debug("failed to relay message", "err", err)
						return fmt.Errorf("failed to relay message: %w", err)
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
