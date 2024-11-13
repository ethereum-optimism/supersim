package admin

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"testing"
	"time"

	"github.com/ethereum-optimism/optimism/op-service/testlog"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/stretchr/testify/require"
)

func TestAdminServerBasicFunctionality(t *testing.T) {
	networkConfig := config.GetDefaultNetworkConfig(uint64(time.Now().Unix()), "")
	testlog := testlog.Logger(t, log.LevelInfo)

	ctx, cancel := context.WithCancel(context.Background())
	adminServer := NewAdminServer(testlog, 0, &networkConfig)
	t.Cleanup(func() { cancel() })

	require.NoError(t, adminServer.Start(ctx))

	resp, err := http.Get(fmt.Sprintf("%s/ready", adminServer.Endpoint()))
	require.NoError(t, err)
	defer resp.Body.Close()

	require.Equal(t, http.StatusOK, resp.StatusCode)

	body, err := io.ReadAll(resp.Body)
	require.NoError(t, err)
	require.Equal(t, "OK", string(body))

	require.NoError(t, adminServer.Stop(context.Background()))

	resp, err = http.Get(fmt.Sprintf("%s/ready", adminServer.Endpoint()))
	if err == nil {
		resp.Body.Close()
	}
	require.Error(t, err)
}

func TestGetL1AddressesRPC(t *testing.T) {
	networkConfig := config.GetDefaultNetworkConfig(uint64(time.Now().Unix()), "")
	testlog := testlog.Logger(t, log.LevelInfo)
	server := NewAdminServer(testlog, 0, &networkConfig)
	defer server.Stop(context.Background())

	// Start the server
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	go server.Start(ctx)
	time.Sleep(1 * time.Second) // Allow time for the server to start

	// Dial the RPC server
	client, err := rpc.Dial(server.Endpoint())
	require.NoError(t, err)

	var addresses map[string]string
	chainID := uint64(902)
	err = client.CallContext(context.Background(), &addresses, "admin_getL1Addresses", chainID)

	require.NoError(t, err)

	require.Equal(t, "0xeCA0f912b4bd255f3851951caE5775CC9400aA3B", addresses["L2CrossDomainMessenger"])
	require.Equal(t, "0x67B2aB287a32bB9ACe84F6a5A30A62597b10AdE9", addresses["L2StandardBridge"])
}
