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

type TestCase struct {
	name    string
	l1Host  string
	l2Host  string
	wantErr bool
}

func createTestSuite(t *testing.T, tc *TestCase) *TestSuite {
	networkConfig := config.GetDefaultNetworkConfig(uint64(time.Now().Unix()), "")
	testlog := testlog.Logger(t, log.LevelInfo)

	l1Host := defaultHost
	l2Host := defaultHost
	if tc != nil {
		l1Host = tc.l1Host
		l2Host = tc.l2Host
	}

	networkConfig.L1Config.Host = l1Host
	networkConfig.L1Config.Port = 9471
	for i := range networkConfig.L2Configs {
		networkConfig.L2Configs[i].Host = l2Host
		networkConfig.L2StartingPort = 9473
	}

	ctx, closeApp := context.WithCancelCause(context.Background())
	orchestrator, err := NewOrchestrator(testlog, closeApp, &networkConfig)

	t.Cleanup(func() {
		closeApp(nil)
		if err := orchestrator.Stop(context.Background()); err != nil {
			t.Errorf("failed to stop orchestrator: %s", err)
		}
	})

	if err != nil {
		if tc != nil && tc.wantErr {
			return nil
		}
		t.Fatalf("unable to create orchestrator: %s", err)
	}

	if err := orchestrator.Start(ctx); err != nil {
		if tc != nil && tc.wantErr {
			return nil
		}
		t.Fatalf("unable to start orchestrator: %s", err)
	}

	require.Equal(t, l1Host, orchestrator.L1Chain().Config().Host)
	for _, chain := range orchestrator.l2Chains {
		require.Equal(t, l2Host, chain.Config().Host)
	}

	return &TestSuite{t, orchestrator}
}

func TestStartup(t *testing.T) {
	testSuite := createTestSuite(t, nil)
	verifyChainConfigs(t, testSuite)
}

func TestOrchestratorWithHosts(t *testing.T) {
	t.Run("default configuration", func(t *testing.T) {
		testSuite := createTestSuite(t, nil)
		verifyChainConfigs(t, testSuite)
	})
	testCases := []TestCase{
		{
			name:    "custom hosts",
			l1Host:  "0.0.0.0",
			l2Host:  "0.0.0.0",
			wantErr: false,
		},
		{
			name:    "mixed custom hosts",
			l1Host:  defaultHost,
			l2Host:  "0.0.0.0",
			wantErr: false,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			t.Logf("Testing with L1 Host: %s, L2 Host: %s", tc.l1Host, tc.l2Host)

			testSuite := createTestSuite(t, &tc)
			if !tc.wantErr {
				require.NotNil(t, testSuite)
				verifyChainConfigs(t, testSuite)
			}
		})
	}
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
