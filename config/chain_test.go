package config

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestGetNetworkConfig_DependencySetLogic(t *testing.T) {
	tests := []struct {
		name                string
		l2Count             uint64
		userDependencySet   []uint64
		expectedDepsPerChain int
		shouldContainUser   bool
		userChainID         uint64
	}{
		{
			name:                "No user dependencies, 2 chains",
			l2Count:             2,
			userDependencySet:   []uint64{},
			expectedDepsPerChain: 1, // Just the other local chain
			shouldContainUser:   false,
		},
		{
			name:                "With user dependencies, 2 chains",
			l2Count:             2,
			userDependencySet:   []uint64{8453, 10},
			expectedDepsPerChain: 3, // Other local chain + 2 user chains
			shouldContainUser:   true,
			userChainID:         8453,
		},
		{
			name:                "With user dependencies, 3 chains",
			l2Count:             3,
			userDependencySet:   []uint64{1, 42},
			expectedDepsPerChain: 4, // 2 other local chains + 2 user chains
			shouldContainUser:   true,
			userChainID:         42,
		},
		{
			name:                "Single chain with user dependencies",
			l2Count:             1,
			userDependencySet:   []uint64{100, 200},
			expectedDepsPerChain: 2, // Just the 2 user chains (no other local chains)
			shouldContainUser:   true,
			userChainID:         100,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			cliConfig := &CLIConfig{
				L2Count:       tt.l2Count,
				DependencySet: tt.userDependencySet,
			}

			networkConfig := GetNetworkConfig(cliConfig)

			// Verify we have the expected number of L2 configs
			require.Equal(t, int(tt.l2Count), len(networkConfig.L2Configs))

			// Test each L2 config's dependency set
			for i, l2Config := range networkConfig.L2Configs {
				require.NotNil(t, l2Config.L2Config, "L2Config should not be nil for chain %d", i)

				depSet := l2Config.L2Config.DependencySet
				require.Equal(t, tt.expectedDepsPerChain, len(depSet),
					"Chain %d should have %d dependencies", l2Config.ChainID, tt.expectedDepsPerChain)

				// Verify it doesn't contain itself
				require.NotContains(t, depSet, l2Config.ChainID,
					"Chain %d should not contain itself in dependency set", l2Config.ChainID)

				// Verify it contains other local chains
				for j, otherL2Config := range networkConfig.L2Configs {
					if i != j {
						require.Contains(t, depSet, otherL2Config.ChainID,
							"Chain %d should contain other local chain %d", l2Config.ChainID, otherL2Config.ChainID)
					}
				}

				// Verify user dependencies are included (if any)
				if tt.shouldContainUser {
					require.Contains(t, depSet, tt.userChainID,
						"Chain %d should contain user-provided chain %d", l2Config.ChainID, tt.userChainID)
				}

				// Verify all user dependencies are included (except self)
				for _, userChainID := range tt.userDependencySet {
					if userChainID != l2Config.ChainID {
						require.Contains(t, depSet, userChainID,
							"Chain %d should contain user-provided chain %d", l2Config.ChainID, userChainID)
					}
				}
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