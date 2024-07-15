package chainapi

import (
	"context"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/core/types"
)

type Chain interface {
	// metadata methods
	Endpoint() string
	ChainID() uint64
	LogPath() string

	// API methods
	EthSendTransaction(ctx context.Context, tx *types.Transaction) error

	EthGetLogs(ctx context.Context, q ethereum.FilterQuery) ([]types.Log, error)

	SubscribeFilterLogs(ctx context.Context, q ethereum.FilterQuery, ch chan<- types.Log) (ethereum.Subscription, error)
}
