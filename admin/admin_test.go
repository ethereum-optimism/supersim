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
	"github.com/ethereum-optimism/supersim/testutils"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/stretchr/testify/assert"
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

	ctx, cancel := context.WithCancel(context.Background())
	adminServer := NewAdminServer(testlog, 0, &networkConfig)
	t.Cleanup(func() { cancel() })

	require.NoError(t, adminServer.Start(ctx))

	waitErr := testutils.WaitForWithTimeout(context.Background(), 500*time.Millisecond, 10*time.Second, func() (bool, error) {
		// Dial the RPC server
		client, err := rpc.Dial(adminServer.Endpoint())
		require.NoError(t, err)

		var addresses map[string]string
		chainID := uint64(902)
		err = client.CallContext(context.Background(), &addresses, "admin_getL1Addresses", chainID)

		require.NoError(t, err)

		expectedAddresses := map[string]string{
			"AddressManager":                    "0x90D0B458313d3A207ccc688370eE76B75200EadA",
			"L1CrossDomainMessengerProxy":       "0xeCA0f912b4bd255f3851951caE5775CC9400aA3B",
			"L1ERC721BridgeProxy":               "0xdC0917C61A4CD589B29b6464257d564C0abeBB2a",
			"L1StandardBridgeProxy":             "0x67B2aB287a32bB9ACe84F6a5A30A62597b10AdE9",
			"L2OutputOracleProxy":               "0x0000000000000000000000000000000000000000",
			"OptimismMintableERC20FactoryProxy": "0xd4E933aa1f37A755135d7623488a383f8208CC7c",
			"OptimismPortalProxy":               "0x35e67BC631C327b60C6A39Cff6b03a8adBB19c2D",
			"ProxyAdmin":                        "0x0000000000000000000000000000000000000000",
			"SuperchainConfig":                  "0x0000000000000000000000000000000000000000",
			"SystemConfigProxy":                 "0xFb295Aa436F23BE2Bd17678Adf1232bdec02FED1",
		}

		for key, expectedValue := range expectedAddresses {
			if addresses[key] != expectedValue {
				return false, nil
			}
		}

		return true, nil
	})

	assert.NoError(t, waitErr)
}
