package opsimulator

import (
	"testing"

	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/testutils"

	"github.com/ethereum/go-ethereum/log"

	"github.com/stretchr/testify/require"
)

// MockChainWithDependencySet extends MockChain to support dependency set configuration
type MockChainWithDependencySet struct {
	*testutils.MockChain
	chainID       uint64
	dependencySet []uint64
}

func NewMockChainWithDependencySet(chainID uint64, dependencySet []uint64) *MockChainWithDependencySet {
	return &MockChainWithDependencySet{
		MockChain:     testutils.NewMockChain(),
		chainID:       chainID,
		dependencySet: dependencySet,
	}
}

func (c *MockChainWithDependencySet) Config() *config.ChainConfig {
	return &config.ChainConfig{
		Name:      "mockchain",
		ChainID:   c.chainID,
		BlockTime: 2,
		L2Config: &config.L2Config{
			L1ChainID:     900,
			DependencySet: c.dependencySet,
		},
	}
}

func TestCheckInteropInvariants_DependencySetValidation(t *testing.T) {
	tests := []struct {
		name                   string
		executingChainID       uint64
		executingDependencySet []uint64
		sourceChainID          uint64
		expectError            bool
		expectedErrorContains  string
	}{
		{
			name:                   "Valid: Source chain in dependency set",
			executingChainID:       901,
			executingDependencySet: []uint64{902, 903},
			sourceChainID:          902,
			expectError:            false,
		},
		{
			name:                   "Invalid: Source chain not in dependency set",
			executingChainID:       901,
			executingDependencySet: []uint64{902},
			sourceChainID:          903,
			expectError:            true,
			expectedErrorContains:  "executing message in block (chain 901) may not execute message from chain 903: not in dependency set",
		},
		{
			name:                   "Invalid: Empty dependency set",
			executingChainID:       903,
			executingDependencySet: []uint64{},
			sourceChainID:          901,
			expectError:            true,
			expectedErrorContains:  "executing message in block (chain 903) may not execute message from chain 901: not in dependency set",
		},
		{
			name:                   "Valid: Multiple chains in dependency set",
			executingChainID:       903,
			executingDependencySet: []uint64{901, 902},
			sourceChainID:          901,
			expectError:            false,
		},
		{
			name:                   "Valid: Same-chain message (source == destination)",
			executingChainID:       901,
			executingDependencySet: []uint64{902}, // 901 is NOT in its own dependency set
			sourceChainID:          901,           // Same as executing chain
			expectError:            false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create mock executing chain
			executingChain := NewMockChainWithDependencySet(tt.executingChainID, tt.executingDependencySet)
			sourceChain := NewMockChainWithDependencySet(tt.sourceChainID, []uint64{})

			// Create peers map
			peers := map[uint64]config.Chain{
				tt.sourceChainID: sourceChain,
			}

			// Create OpSimulator
			opSim := &OpSimulator{
				Chain:        executingChain,
				log:          log.New("test", "dependency-validation"),
				peers:        peers,
				interopDelay: 0,
			}

			// Test the dependency set validation directly
			err := opSim.ValidateDependencySet(tt.sourceChainID)

			if tt.expectError {
				require.Error(t, err)
				require.Contains(t, err.Error(), tt.expectedErrorContains)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

// Test realistic scenarios matching CLI example: --dependency.set '[901,902]' --l2.count 3
func TestDependencySetScenarios(t *testing.T) {
	scenarios := []struct {
		name                   string
		executingChainID       uint64
		executingDependencySet []uint64
		sourceChainID          uint64
		shouldPass             bool
		description            string
	}{
		{
			name:                   "Chain 901 executing message from 902",
			executingChainID:       901,
			executingDependencySet: []uint64{902},
			sourceChainID:          902,
			shouldPass:             true,
			description:            "901 has 902 in dependency set",
		},
		{
			name:                   "Chain 902 executing message from 901",
			executingChainID:       902,
			executingDependencySet: []uint64{901},
			sourceChainID:          901,
			shouldPass:             true,
			description:            "902 has 901 in dependency set",
		},
		{
			name:                   "Chain 903 trying to execute message from 901",
			executingChainID:       903,
			executingDependencySet: []uint64{}, // empty dependency set
			sourceChainID:          901,
			shouldPass:             false,
			description:            "903 has empty dependency set",
		},
		{
			name:                   "Chain 901 trying to execute message from 903",
			executingChainID:       901,
			executingDependencySet: []uint64{902}, // only has 902, not 903
			sourceChainID:          903,
			shouldPass:             false,
			description:            "901 doesn't have 903 in dependency set",
		},
	}

	for _, scenario := range scenarios {
		t.Run(scenario.name, func(t *testing.T) {
			// Create mock chains
			executingChain := NewMockChainWithDependencySet(scenario.executingChainID, scenario.executingDependencySet)

			// Create OpSimulator
			opSim := &OpSimulator{
				Chain: executingChain,
				log:   log.New("test", scenario.name),
			}

			// Test the dependency set validation logic directly
			sourceChainID := scenario.sourceChainID
			executingChainDependencySet := opSim.Config().L2Config.DependencySet

			sourceInExecutingDeps := false
			for _, depChainID := range executingChainDependencySet {
				if depChainID == sourceChainID {
					sourceInExecutingDeps = true
					break
				}
			}

			if scenario.shouldPass {
				require.True(t, sourceInExecutingDeps,
					"Expected dependency validation to pass: %s", scenario.description)
			} else {
				require.False(t, sourceInExecutingDeps,
					"Expected dependency validation to fail: %s", scenario.description)
			}
		})
	}
}
