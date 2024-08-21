package testutils

import (
	"context"

	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

var _ config.Chain = &MockChain{}

type MockSubscription struct{}

func (s *MockSubscription) Unsubscribe() {}

func (s *MockSubscription) Err() <-chan error {
	return make(<-chan error)
}

type MockChain struct {
}

func NewMockChain() *MockChain {
	return &MockChain{}
}

func (c *MockChain) Endpoint() string {
	return "http://localhost:8545"
}

func (c *MockChain) LogPath() string {
	return "var/chain/log"
}

func (c *MockChain) String() string {
	return "mockchain"
}

func (c *MockChain) Config() *config.ChainConfig {
	return &config.ChainConfig{
		Name:    "mockchain",
		ChainID: 1,
	}
}

func (c *MockChain) Start(_ context.Context) error {
	return nil
}

func (c *MockChain) Stop(_ context.Context) error {
	return nil
}

func (c *MockChain) EthClient() *ethclient.Client {
	return nil
}

func (c *MockChain) SimulatedLogs(ctx context.Context, tx *types.Transaction) ([]types.Log, error) {
	return nil, nil
}

func (c *MockChain) SetCode(ctx context.Context, result interface{}, address string, code string) error {
	return nil
}

func (c *MockChain) SetStorageAt(ctx context.Context, result interface{}, address string, storageSlot string, storageValue string) error {
	return nil
}

func (c *MockChain) SetIntervalMining(ctx context.Context, result interface{}, interval int64) error {
	return nil
}
