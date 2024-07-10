package anvil

import (
	"context"
	"testing"

	"github.com/ethereum-optimism/optimism/op-service/testlog"
	"github.com/stretchr/testify/require"

	"github.com/ethereum/go-ethereum/common/math"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"
)

func TestAnvil(t *testing.T) {
	cfg := Config{ChainId: 10, Port: 0}
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
	require.Equal(t, uint64(chainId), cfg.ChainId)
}
