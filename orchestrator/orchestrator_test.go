package orchestrator

import (
	"context"
	"testing"

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
	chainConfigs := []config.ChainConfig{
		{ChainID: 1, Port: 0},
		{ChainID: 10, SourceChainID: 1, Port: 0},
		{ChainID: 30, SourceChainID: 1, Port: 0},
	}

	testlog := testlog.Logger(t, log.LevelInfo)
	orchestrator, _ := NewOrchestrator(testlog, chainConfigs)
	t.Cleanup(func() {
		if err := orchestrator.Stop(context.Background()); err != nil {
			t.Errorf("failed to stop orchestrator: %s", err)
		}
	})

	if err := orchestrator.Start(context.Background()); err != nil {
		t.Fatalf("unable to start orchestrator: %s", err)
		return nil
	}

	return &TestSuite{t, orchestrator}
}

func TestStartup(t *testing.T) {
	testSuite := createTestSuite(t)

	require.Equal(t, testSuite.orchestrator.L1Anvil().ChainID(), uint64(1))
	require.Equal(t, len(testSuite.orchestrator.OpSimInstances), 2)
	require.Equal(t, testSuite.orchestrator.OpSimInstances[0].ChainID(), uint64(10))
	require.Equal(t, testSuite.orchestrator.OpSimInstances[0].SourceChainID(), uint64(1))
	require.Equal(t, testSuite.orchestrator.OpSimInstances[1].ChainID(), uint64(30))
	require.Equal(t, testSuite.orchestrator.OpSimInstances[1].SourceChainID(), uint64(1))
}

func TestTooManyL1sError(t *testing.T) {
	chainConfigs := []config.ChainConfig{
		{ChainID: 1, Port: 0},
		{ChainID: 10, Port: 0},
		{ChainID: 30, SourceChainID: 1, Port: 0},
	}

	testlog := testlog.Logger(t, log.LevelInfo)
	_, err := NewOrchestrator(testlog, chainConfigs)
	require.Error(t, err)
}
