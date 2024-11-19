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
	t.Run("set default host", func(t *testing.T) {
		cfg := config.ChainConfig{ChainID: 10, Port: 0, Host: "127.0.0.1"}
		testAnvilInstance(t, cfg)
	})
	t.Run("set custom host", func(t *testing.T) {
		cfg := config.ChainConfig{ChainID: 10, Port: 0, Host: "0.0.0.0"}
		testAnvilInstance(t, cfg)
	})
}

func testAnvilInstance(t *testing.T, cfg config.ChainConfig) {
	testlog := testlog.Logger(t, log.LevelInfo)

	ctx, closeApp := context.WithCancelCause(context.Background())
	anvil := New(testlog, closeApp, &cfg)
	t.Cleanup(func() { closeApp(nil) })

	require.NoError(t, anvil.Start(ctx))

	// port overridden on startup
	require.NotEqual(t, cfg.Port, 0)

	client, err := rpc.Dial(anvil.Endpoint())
	require.NoError(t, err)

	// query chainId
	var chainId math.HexOrDecimal64
	require.NoError(t, client.CallContext(context.Background(), &chainId, "eth_chainId"))
	require.Equal(t, uint64(chainId), cfg.ChainID)
}
