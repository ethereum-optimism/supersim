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
	"github.com/ethereum-optimism/supersim/genesis"
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
	adminServer := NewAdminServer(testlog, 0, &networkConfig, nil, nil)
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
}

func TestGetL1AddressesRPC(t *testing.T) {
	networkConfig := config.GetDefaultNetworkConfig(uint64(time.Now().Unix()), "")
	testlog := testlog.Logger(t, log.LevelInfo)

	ctx, cancel := context.WithCancel(context.Background())
	adminServer := NewAdminServer(testlog, 0, &networkConfig, nil, nil)
	t.Cleanup(func() { cancel() })

	require.NoError(t, adminServer.Start(ctx))

	var client *rpc.Client
	waitErr := testutils.WaitForWithTimeout(context.Background(), 500*time.Millisecond, 10*time.Second, func() (bool, error) {
		newClient, err := rpc.Dial(adminServer.Endpoint())
		if err != nil {
			return false, err
		}
		client = newClient
		return true, nil
	})
	assert.NoError(t, waitErr)

	var addresses map[string]string
	chainID := genesis.GeneratedGenesisDeployment.L2s[1].ChainID
	err := client.CallContext(context.Background(), &addresses, "admin_getL1Addresses", chainID)
	require.NoError(t, err)

	registryAddresses := genesis.GeneratedGenesisDeployment.L2s[1].RegistryAddressList()
	assert.Equal(t, registryAddresses.AddressManager.String(), addresses["AddressManager"])
	assert.Equal(t, registryAddresses.L1CrossDomainMessengerProxy.String(), addresses["L1CrossDomainMessengerProxy"])
	assert.Equal(t, registryAddresses.L1ERC721BridgeProxy.String(), addresses["L1ERC721BridgeProxy"])
	assert.Equal(t, registryAddresses.L1StandardBridgeProxy.String(), addresses["L1StandardBridgeProxy"])
	assert.Equal(t, registryAddresses.L2OutputOracleProxy.String(), addresses["L2OutputOracleProxy"])
	assert.Equal(t, registryAddresses.OptimismMintableERC20FactoryProxy.String(), addresses["OptimismMintableERC20FactoryProxy"])
	assert.Equal(t, registryAddresses.OptimismPortalProxy.String(), addresses["OptimismPortalProxy"])
	assert.Equal(t, registryAddresses.ProxyAdmin.String(), addresses["ProxyAdmin"])
	assert.Equal(t, registryAddresses.SuperchainConfig.String(), addresses["SuperchainConfig"])
	assert.Equal(t, registryAddresses.SystemConfigProxy.String(), addresses["SystemConfigProxy"])
}
