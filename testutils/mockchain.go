package testutils

import (
	"context"

	"github.com/ethereum-optimism/supersim/chainapi"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/core/types"
)

type MockSubscription struct{}

func (s *MockSubscription) Unsubscribe() {}

func (s *MockSubscription) Err() <-chan error {
	return make(<-chan error)
}

var _ chainapi.Chain = &MockChain{}

type MockChain struct {
}

func NewMockChain() *MockChain {
	return &MockChain{}
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

func (c *MockChain) EthGetLogs(ctx context.Context, q ethereum.FilterQuery) ([]types.Log, error) {
	return []types.Log{}, nil
}

func (c *MockChain) EthSendTransaction(ctx context.Context, tx *types.Transaction) error {
	return nil
}

func (c *MockChain) SubscribeFilterLogs(ctx context.Context, q ethereum.FilterQuery, ch chan<- types.Log) (ethereum.Subscription, error) {

	return &MockSubscription{}, nil
}
