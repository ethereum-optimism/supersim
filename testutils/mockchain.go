package testutils

import (
	"context"

	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
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

func (c *MockChain) EthGetCode(ctx context.Context, account common.Address) ([]byte, error) {
	return []byte{}, nil
}

func (c *MockChain) EthGetLogs(ctx context.Context, q ethereum.FilterQuery) ([]types.Log, error) {
	return []types.Log{}, nil
}

func (c *MockChain) EthSendTransaction(ctx context.Context, tx *types.Transaction) error {
	return nil
}

func (c *MockChain) SubscribeFilterLogs(ctx context.Context, q ethereum.FilterQuery, ch chan<- types.Log) (ethereum.Subscription, error) {
	return &MockSubscription{}, nil
}
