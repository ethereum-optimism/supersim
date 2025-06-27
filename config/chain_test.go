package config

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestGetNetworkConfig_DependencySetLogic(t *testing.T) {
	tests := []struct {
		name                   string
		dependencySet          []uint64
		expectedChain901DepSet []uint64
		expectedChain902DepSet []uint64
	}{
		{
			name:                   "no flag passed",
			dependencySet:          nil,
			expectedChain901DepSet: []uint64{902},
			expectedChain902DepSet: []uint64{901},
		},
		{
			name:                   "flag passed with []",
			dependencySet:          []uint64{},
			expectedChain901DepSet: []uint64{},
			expectedChain902DepSet: []uint64{},
		},
		{
			name:                   "flag passed with 1 of the two local chain ids",
			dependencySet:          []uint64{901}, // 901 is first local chain
			expectedChain901DepSet: []uint64{},    // only 901 in set, so 901 gets empty (excluding self)
			expectedChain902DepSet: []uint64{},    // 902 not in set, so gets empty
		},
		{
			name:                   "flag passed with both of the two local chain ids",
			dependencySet:          []uint64{901, 902}, // both local chains
			expectedChain901DepSet: []uint64{902},      // excludes self
			expectedChain902DepSet: []uint64{901},      // excludes self
		},
		{
			name:                   "flag passed with an external id",
			dependencySet:          []uint64{8453}, // external chain
			expectedChain901DepSet: []uint64{},     // 901 not in set [8453], so gets empty
			expectedChain902DepSet: []uint64{},     // 902 not in set [8453], so gets empty
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

			require.Equal(t, tt.expectedChain901DepSet, chain901.L2Config.DependencySet)
			require.Equal(t, tt.expectedChain902DepSet, chain902.L2Config.DependencySet)
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
	// Test with empty user dependency set across multiple chains
	cliConfig := &CLIConfig{
		L2Count:       3,
		DependencySet: []uint64{},
	}

	networkConfig := GetNetworkConfig(cliConfig)

	require.Equal(t, 3, len(networkConfig.L2Configs))

	// All chains should have empty dependency sets when explicitly set to empty
	for _, l2Config := range networkConfig.L2Configs {
		require.NotNil(t, l2Config.L2Config)
		require.Equal(t, 0, len(l2Config.L2Config.DependencySet),
			"Chain %d should have empty dependency set when user explicitly provides empty set", l2Config.ChainID)
	}
}

func findChainByID(chains []ChainConfig, chainID uint64) *ChainConfig {
	for _, chain := range chains {
		if chain.ChainID == chainID {
			return &chain
		}
	}
	return nil
}
