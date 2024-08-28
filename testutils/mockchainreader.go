package testutils

import (
	"context"
	"math/big"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

var _ ethereum.ChainReader = &MockChainReader{}

type MockChainReader struct {
	block *types.Block
}

func NewMockChainReader(block *types.Block) *MockChainReader {
	return &MockChainReader{
		block: block,
	}
}

func (m *MockChainReader) BlockByHash(ctx context.Context, hash common.Hash) (*types.Block, error) {
	return m.block, nil
}

func (m *MockChainReader) BlockByNumber(ctx context.Context, number *big.Int) (*types.Block, error) {
	return m.block, nil
}

func (m *MockChainReader) HeaderByNumber(ctx context.Context, number *big.Int) (*types.Header, error) {
	return m.block.Header(), nil
}

func (m *MockChainReader) HeaderByHash(ctx context.Context, hash common.Hash) (*types.Header, error) {
	return m.block.Header(), nil
}

func (m *MockChainReader) TransactionCount(ctx context.Context, blockHash common.Hash) (uint, error) {
	return 0, nil
}

func (m *MockChainReader) TransactionInBlock(ctx context.Context, blockHash common.Hash, index uint) (*types.Transaction, error) {
	return nil, nil
}

func (m *MockChainReader) SubscribeNewHead(ctx context.Context, ch chan<- *types.Header) (ethereum.Subscription, error) {
	return nil, nil
}
