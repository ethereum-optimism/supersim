package orchestrator

import (
	"context"
	"slices"
	"testing"
	"time"

	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum-optimism/optimism/op-service/testlog"

	"github.com/ethereum/go-ethereum/log"

	"github.com/stretchr/testify/require"
)

type TestSuite struct {
	t            *testing.T
	orchestrator *Orchestrator
}

func createTestSuite(t *testing.T) *TestSuite {
	networkConfig := config.GetDefaultNetworkConfig(uint64(time.Now().Unix()), "")
	testlog := testlog.Logger(t, log.LevelInfo)

	ctx, closeApp := context.WithCancelCause(context.Background())
	orchestrator, _ := NewOrchestrator(testlog, closeApp, &networkConfig)
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
	testSuite := createTestSuite(t)

	require.Equal(t, testSuite.orchestrator.L1Chain().Config().ChainID, uint64(900))
	require.Nil(t, testSuite.orchestrator.L1Chain().Config().L2Config)

	chains := testSuite.orchestrator.L2Chains()
	require.Equal(t, len(chains), 2)

	require.True(t, slices.ContainsFunc(chains, func(chain config.Chain) bool {
		return chain.Config().ChainID == uint64(901)
	}))
	require.NotNil(t, chains[0].Config().L2Config)
	require.Equal(t, chains[0].Config().L2Config.L1ChainID, uint64(900))

	require.True(t, slices.ContainsFunc(chains, func(chain config.Chain) bool {
		return chain.Config().ChainID == uint64(902)
	}))
	require.NotNil(t, chains[1].Config().L2Config)
	require.Equal(t, chains[1].Config().L2Config.L1ChainID, uint64(900))
}
