package config

import (
	"testing"
	"github.com/stretchr/testify/require"
)

type dependencySetTestCase struct {
	name          string
	dependencySet []uint64
}

func TestGetNetworkConfig_DependencySetLogic(t *testing.T) {
	tests := []dependencySetTestCase{
		{
			name:          "no flag passed",
			dependencySet: nil,
		},
		{
			name:          "flag passed with []",
			dependencySet: []uint64{},
		},
		{
			name:          "flag passed with 1 of the two local chain ids",
			dependencySet: []uint64{901}, // 901 is first local chain
		},
		{
			name:          "flag passed with both of the two local chain ids",
			dependencySet: []uint64{901, 902}, // both local chains
		},
		{
			name:          "flag passed with an external id",
			dependencySet: []uint64{8453}, // external chain
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			cliConfig := &CLIConfig{
				L2Count:       2,
				DependencySet: tt.dependencySet,
			}

			networkConfig := GetNetworkConfig(cliConfig)
			require.Equal(t, 2, len(networkConfig.L2Configs))

			chain901 := findChainByID(networkConfig.L2Configs, 901)
			chain902 := findChainByID(networkConfig.L2Configs, 902)
			require.NotNil(t, chain901)
			require.NotNil(t, chain902)

			// Verify specific behavior based on test case
			switch tt.name {
			case "no flag passed":
				require.Equal(t, []uint64{902}, chain901.L2Config.DependencySet)
				require.Equal(t, []uint64{901}, chain902.L2Config.DependencySet)
			case "flag passed with []":
				require.Equal(t, []uint64{}, chain901.L2Config.DependencySet)
				require.Equal(t, []uint64{}, chain902.L2Config.DependencySet)
			case "flag passed with 1 of the two local chain ids":
				require.Equal(t, []uint64{}, chain901.L2Config.DependencySet) // excludes self
				require.Equal(t, []uint64{901}, chain902.L2Config.DependencySet)
			case "flag passed with both of the two local chain ids":
				require.Equal(t, []uint64{902}, chain901.L2Config.DependencySet) // excludes self
				require.Equal(t, []uint64{901}, chain902.L2Config.DependencySet) // excludes self
			case "flag passed with an external id":
				require.Equal(t, []uint64{8453}, chain901.L2Config.DependencySet)
				require.Equal(t, []uint64{8453}, chain902.L2Config.DependencySet)
			}
		})
	}
}

func TestGetNetworkConfig_SelfExclusion(t *testing.T) {
	// Test that a chain doesn't include itself even if it's in the user dependency set
	cliConfig := &CLIConfig{
		L2Count:       2,
		DependencySet: []uint64{901, 902}, // These will be the actual chain IDs from genesis
	}

	networkConfig := GetNetworkConfig(cliConfig)

	// Check that each chain excludes itself from dependencies even if it matches user input
	for _, l2Config := range networkConfig.L2Configs {
		depSet := l2Config.L2Config.DependencySet
		require.NotContains(t, depSet, l2Config.ChainID,
			"Chain %d should never include itself in dependency set", l2Config.ChainID)
	}
}

func TestGetNetworkConfig_EmptyDependencySet(t *testing.T) {
	// Test with empty user dependency set
	cliConfig := &CLIConfig{
		L2Count:       1,
		DependencySet: []uint64{},
	}

	networkConfig := GetNetworkConfig(cliConfig)

	require.Equal(t, 1, len(networkConfig.L2Configs))
	l2Config := networkConfig.L2Configs[0]
	require.NotNil(t, l2Config.L2Config)

	// Single chain with no user dependencies should have empty dependency set
	require.Equal(t, 0, len(l2Config.L2Config.DependencySet))
}

func findChainByID(chains []ChainConfig, chainID uint64) *ChainConfig {
	for _, chain := range chains {
		if chain.ChainID == chainID {
			return &chain
		}
	}
	return nil
}