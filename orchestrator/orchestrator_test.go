package orchestrator

import (
	"context"
	"slices"
	"testing"
	"time"

	"github.com/ethereum-optimism/optimism/op-service/testlog"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum/log"
	"github.com/stretchr/testify/require"
)

type TestSuite struct {
	t            *testing.T
	orchestrator *Orchestrator
}

func createTestSuite(t *testing.T, networkConfig *config.NetworkConfig) *TestSuite {
	testlog := testlog.Logger(t, log.LevelInfo)

	ctx, closeApp := context.WithCancelCause(context.Background())
	orchestrator, _ := NewOrchestrator(testlog, closeApp, networkConfig)

	t.Cleanup(func() {
		closeApp(nil)
		if err := orchestrator.Stop(context.Background()); err != nil {
			t.Errorf("failed to stop orchestrator: %s", err)
		}
	})

	if err := orchestrator.Start(ctx); err != nil {
		t.Fatalf("unable to start orchestrator: %s", err)
		return nil
	}

	return &TestSuite{t, orchestrator}
}

func TestStartup(t *testing.T) {
	networkConfig := config.GetDefaultNetworkConfig(uint64(time.Now().Unix()), "")
	networkConfig.L1Config.Host = "127.0.0.1"
	for i := range networkConfig.L2Configs {
		networkConfig.L2Configs[i].Host = "127.0.0.1"
	}
	testSuite := createTestSuite(t, &networkConfig)
	verifyChainConfigs(t, testSuite)
}

func TestCustomHosts(t *testing.T) {
	networkConfig := config.GetDefaultNetworkConfig(uint64(time.Now().Unix()), "")
	networkConfig.L1Config.Host = "0.0.0.0"
	for i := range networkConfig.L2Configs {
		networkConfig.L2Configs[i].Host = "0.0.0.0"
	}
	testSuite := createTestSuite(t, &networkConfig)
	verifyChainConfigs(t, testSuite)
}
func TestMixedCustomHosts(t *testing.T) {
	networkConfig := config.GetDefaultNetworkConfig(uint64(time.Now().Unix()), "")
	networkConfig.L1Config.Host = "127.0.0.1"
	for i := range networkConfig.L2Configs {
		networkConfig.L2Configs[i].Host = "0.0.0.0"
	}
	testSuite := createTestSuite(t, &networkConfig)
	verifyChainConfigs(t, testSuite)
}

func verifyChainConfigs(t *testing.T, suite *TestSuite) {
	// Verify L1 chain
	require.Equal(t, uint64(900), suite.orchestrator.L1Chain().Config().ChainID)
	require.Nil(t, suite.orchestrator.L1Chain().Config().L2Config)

	// Verify L2 chains
	chains := suite.orchestrator.L2Chains()
	require.Equal(t, 2, len(chains))

	// Verify first L2 chain
	require.True(t, slices.ContainsFunc(chains, func(chain config.Chain) bool {
		return chain.Config().ChainID == uint64(901)
	}))
	require.NotNil(t, chains[0].Config().L2Config)
	require.Equal(t, uint64(900), chains[0].Config().L2Config.L1ChainID)

	// Verify second L2 chain
	require.True(t, slices.ContainsFunc(chains, func(chain config.Chain) bool {
		return chain.Config().ChainID == uint64(902)
	}))
	require.NotNil(t, chains[1].Config().L2Config)
	require.Equal(t, uint64(900), chains[1].Config().L2Config.L1ChainID)
}
