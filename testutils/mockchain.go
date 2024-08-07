package testutils

import (
	"context"
	"math/big"

	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
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

func (c *MockChain) Name() string {
	return "mockchain"
}

func (c *MockChain) ChainID() uint64 {
	return 1
}

func (c *MockChain) Endpoint() string {
	return "http://localhost:8545"
}

func (c *MockChain) LogPath() string {
	return "var/chain/log"
}

func (c *MockChain) Config() *config.ChainConfig {
	return nil
}

func (c *MockChain) EthClient() *ethclient.Client {
	return nil
}

func (c *MockChain) EthGetCode(ctx context.Context, account common.Address) ([]byte, error) {
	return []byte{}, nil
}

func (c *MockChain) EthGetLogs(ctx context.Context, q ethereum.FilterQuery) ([]types.Log, error) {
	return []types.Log{}, nil
}

func (c *MockChain) EthSendTransaction(ctx context.Context, tx *types.Transaction) error {
	return nil
}

func (c *MockChain) EthBlockByNumber(ctx context.Context, blockHeight *big.Int) (*types.Block, error) {
	return &types.Block{}, nil
}

func (c *MockChain) SubscribeFilterLogs(ctx context.Context, q ethereum.FilterQuery, ch chan<- types.Log) (ethereum.Subscription, error) {
	return &MockSubscription{}, nil
}

func (c *MockChain) DebugTraceCall(ctx context.Context, txArgs config.TransactionArgs) (config.TraceCallRaw, error) {
	return config.TraceCallRaw{}, nil
}

func (c *MockChain) SetCode(ctx context.Context, result interface{}, address string, code string) error {
	return nil
}

func (c *MockChain) SetStorageAt(ctx context.Context, result interface{}, address string, storageSlot string, storageValue string) error {
	return nil
}
