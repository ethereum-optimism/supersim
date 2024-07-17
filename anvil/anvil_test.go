package anvil

import (
	"context"
	"testing"

	"github.com/ethereum-optimism/optimism/op-service/testlog"
	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum/common/math"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"

	"github.com/stretchr/testify/require"
)

func TestAnvil(t *testing.T) {
	cfg := Config{config.ChainConfig{ChainID: 10, Port: 0}, nil}
	testlog := testlog.Logger(t, log.LevelInfo)
	anvil := New(testlog, &cfg)

	require.NoError(t, anvil.Start(context.Background()))

	// port overridden on startup
	require.NotEqual(t, cfg.Port, 0)

	client, err := rpc.Dial(anvil.Endpoint())
	require.NoError(t, err)

	// query chainId
	var chainId math.HexOrDecimal64
	require.NoError(t, client.CallContext(context.Background(), &chainId, "eth_chainId"))
	require.Equal(t, uint64(chainId), cfg.ChainID)
}
