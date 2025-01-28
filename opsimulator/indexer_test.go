package opsimulator

import (
	"context"
	"math/rand"

	"testing"

	"github.com/ethereum-optimism/optimism/op-node/rollup/derive"
	oplog "github.com/ethereum-optimism/optimism/op-service/log"
	optestutils "github.com/ethereum-optimism/optimism/op-service/testutils"

	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/testutils"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"

	"github.com/stretchr/testify/require"
)

var _ config.Chain = &MockChainWithSubscriptions{}

func createMockDepositTxs() []*types.DepositTx {
	num := 10
	out := make([]*types.DepositTx, num)
	for i := range num {
		rng := rand.New(rand.NewSource(int64(i)))

		source := derive.UserDepositSource{
			L1BlockHash: optestutils.RandomHash(rng),
			LogIndex:    uint64(rng.Intn(10000)),
		}
		sourceHash := source.SourceHash()
		depInput := optestutils.GenerateDeposit(sourceHash, rng)
		out[i] = depInput
	}
	return out
}

type MockChainWithSubscriptions struct {
	*testutils.MockChain
	mockDepositTxs []*types.DepositTx
}

func (c *MockChainWithSubscriptions) SubscribeFilterLogs(ctx context.Context, q ethereum.FilterQuery, ch chan<- types.Log) (ethereum.Subscription, error) {
	go func() {
		for _, dep := range c.mockDepositTxs {
			log, _ := derive.MarshalDepositLogEvent(common.HexToAddress("0xdeadbeefdeadbeefdeadbeefdeadbeef00000000"), dep)
			ch <- *log

		}
	}()

	return &testutils.MockSubscription{}, nil
}

func TestSubscribeDepositTx(t *testing.T) {
	mockDepositTxs := createMockDepositTxs()
	chain := MockChainWithSubscriptions{testutils.NewMockChain(), mockDepositTxs}

	ctx := context.Background()

	depositTxCh := make(chan *types.DepositTx, len(mockDepositTxs))
	logCh := make(chan types.Log, len(mockDepositTxs))

	channels := DepositChannels{
		DepositTxCh: depositTxCh,
		LogCh:       logCh,
	}

	sub, err := SubscribeDepositTx(ctx, &chain, common.HexToAddress(""), channels)
	if err != nil {
		require.NoError(t, err)
	}

	for i := 0; i < len(mockDepositTxs); i++ {
		dep := <-depositTxCh

		// Source hash is lost in the marshal process
		require.Equal(t, dep.From, mockDepositTxs[i].From)
		require.Equal(t, dep.To, mockDepositTxs[i].To)
		require.Equal(t, dep.Mint, mockDepositTxs[i].Mint)
		require.Equal(t, dep.Value, mockDepositTxs[i].Value)
		require.Equal(t, dep.Gas, mockDepositTxs[i].Gas)
		require.Equal(t, dep.IsSystemTransaction, mockDepositTxs[i].IsSystemTransaction)
		require.Equal(t, dep.Data, mockDepositTxs[i].Data)

	}

	sub.Unsubscribe()

	close(depositTxCh)
}

func TestSubscribePublishTx(t *testing.T) {

	depositStoreMngr := NewL1DepositStoreManager()
	indexer := NewL1ToL2MessageIndexer(oplog.NewLogger(oplog.AppOut(nil), oplog.DefaultCLIConfig()), depositStoreMngr)

	mockDepositTxs := createMockDepositTxs()
	chain := MockChainWithSubscriptions{testutils.NewMockChain(), mockDepositTxs}

	depositPubTxCh := make(chan *types.Transaction, len(mockDepositTxs))

	unsubscribe, err := indexer.SubscribeDepositMessage(chain.Config().ChainID, depositPubTxCh)

	require.NoError(t, err, "Should subscribe via chainId")

	ctx := context.Background()

	depositTxCh := make(chan *types.DepositTx, len(mockDepositTxs))
	logCh := make(chan types.Log, len(mockDepositTxs))

	channels := DepositChannels{
		DepositTxCh: depositTxCh,
		LogCh:       logCh,
	}

	sub, err := SubscribeDepositTx(ctx, &chain, common.HexToAddress(""), channels)
	if err != nil {
		require.NoError(t, err)
	}

	initiatedDepTxn := make([]*types.Transaction, len(mockDepositTxs))

	for i := 0; i < len(mockDepositTxs); i++ {
		dep := <-depositTxCh
		log := <-logCh
		depTx := types.NewTx(dep)

		initiatedDepTxn[i] = depTx

		err := indexer.ProcessEvent(dep, log, chain.Config().ChainID)
		require.NoError(t, err, "Should send valid details")
	}

	for i := 0; i < len(initiatedDepTxn); i++ {
		dep := <-depositPubTxCh
		depTx := initiatedDepTxn[i]

		require.Equal(t, dep.To(), depTx.To())
		require.Equal(t, dep.IsDepositTx(), depTx.IsDepositTx())
		require.Equal(t, dep.Mint(), depTx.Mint())
		require.Equal(t, dep.SourceHash(), depTx.SourceHash())
		require.Equal(t, dep.Cost(), depTx.Cost())
		require.Equal(t, dep.Value(), depTx.Value())
	}

	unsubscribe()
	sub.Unsubscribe()
	close(depositTxCh)
}
