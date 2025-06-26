package config

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestParseDependencySet(t *testing.T) {
	tests := []struct {
		name        string
		input       string
		expected    []uint64
		shouldError bool
	}{
		{
			name:        "multiple chains",
			input:       "[1,2,3]",
			expected:    []uint64{1, 2, 3},
			shouldError: false,
		},
		{
			name:        "multiple chains with spaces",
			input:       "[1, 2, 3]",
			expected:    []uint64{1, 2, 3},
			shouldError: false,
		},
		{
			name:        "single number in brackets",
			input:       "[42]",
			expected:    []uint64{42},
			shouldError: false,
		},
		{
			name:        "empty array",
			input:       "[]",
			expected:    []uint64{},
			shouldError: false,
		},
		{
			name:        "empty array with spaces",
			input:       "[ ]",
			expected:    []uint64{},
			shouldError: false,
		},
		{
			name:        "empty string fails",
			input:       "",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "without brackets fails",
			input:       "1,2,3",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "single number without brackets fails",
			input:       "42",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "negative numbers fail",
			input:       "[1,-2,3]",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "invalid content fails",
			input:       "[abc]",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "invalid in multiple fails",
			input:       "[1,abc,3]",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "leading comma fails",
			input:       "[,1,2,3]",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "trailing comma fails",
			input:       "[1,2,3,]",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "max uint64 chain ID",
			input:       "[18446744073709551615]", // 2^64 - 1
			expected:    []uint64{18446744073709551615},
			shouldError: false,
		},
		{
			name:        "exceeds uint64 range fails",
			input:       "[18446744073709551616]", // 2^64
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "decimal numbers fail",
			input:       "[1.5, 2]",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "floating point numbers fail",
			input:       "[1.0, 2.0]",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "hexadecimal numbers fail",
			input:       "[0x1a, 0x2b]",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "zero chain ID is not allowed",
			input:       "[0, 1, 2]",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "single zero chain ID fails",
			input:       "[0]",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "valid chain IDs",
			input:       "[1, 137, 10, 42161]", // Ethereum, Polygon, Optimism, Arbitrum
			expected:    []uint64{1, 137, 10, 42161},
			shouldError: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			result, err := ParseDependencySet(test.input)

			if test.shouldError {
				require.Error(t, err)
				require.Nil(t, result)
			} else {
				require.NoError(t, err)
				require.Equal(t, test.expected, result)
			}
		})
	}
}

func TestValidateBidirectionalDependencySet(t *testing.T) {
	tests := []struct {
		name          string
		l2Count       uint64
		dependencySet []uint64
		shouldError   bool
		expectedError string
	}{
		{
			name:          "empty dependency set is always valid",
			l2Count:       2,
			dependencySet: []uint64{},
			shouldError:   false,
		},
		{
			name:          "empty dependency set with 3 chains is valid",
			l2Count:       3,
			dependencySet: []uint64{},
			shouldError:   false,
		},
		{
			name:          "dependency set with L2 count 1 should fail",
			l2Count:       1,
			dependencySet: []uint64{901},
			shouldError:   true,
			expectedError: "dependency set must contain at least 2 chains to be bidirectional",
		},
		{
			name:          "dependency set with L2 count 2 should fail",
			l2Count:       2,
			dependencySet: []uint64{901},
			shouldError:   true,
			expectedError: "dependency set must contain at least 2 chains to be bidirectional",
		},
		{
			name:          "single chain dependency set with L2 count 3 should fail",
			l2Count:       3,
			dependencySet: []uint64{901},
			shouldError:   true,
			expectedError: "dependency set must contain at least 2 chains to be bidirectional",
		},
		{
			name:          "valid bidirectional dependency set with L2 count 3",
			l2Count:       3,
			dependencySet: []uint64{901, 902},
			shouldError:   false,
		},
		{
			name:          "valid bidirectional dependency set with L2 count 5",
			l2Count:       5,
			dependencySet: []uint64{901, 902, 903},
			shouldError:   false,
		},
		{
			name:          "valid minimal bidirectional dependency set",
			l2Count:       4,
			dependencySet: []uint64{901, 902},
			shouldError:   false,
		},
		{
			name:          "dependency set with external chain ID should fail",
			l2Count:       3,
			dependencySet: []uint64{901, 902, 999}, // 999 is not a local chain ID
			shouldError:   true,
			expectedError: "chain ID 999 in dependency set is not running locally",
		},
		{
			name:          "dependency set with only external chain IDs should fail",
			l2Count:       2,
			dependencySet: []uint64{999, 888}, // Both are external chain IDs
			shouldError:   true,
			expectedError: "chain ID 999 in dependency set is not running locally",
		},
		{
			name:          "dependency set with 1 local and 1 external chain should fail",
			l2Count:       2,
			dependencySet: []uint64{901, 999}, // External chain not allowed
			shouldError:   true,
			expectedError: "chain ID 999 in dependency set is not running locally",
		},
		{
			name:          "dependency set with chain ID outside available range should fail",
			l2Count:       2,                  // Only chains 901, 902 available
			dependencySet: []uint64{901, 903}, // 903 is not available with L2Count=2
			shouldError:   true,
			expectedError: "chain ID 903 in dependency set is not running locally",
		},
		{
			name:          "dependency set with all available local chains is valid",
			l2Count:       5,
			dependencySet: []uint64{901, 902, 903, 904, 905}, // All local chains
			shouldError:   false,
		},
		{
			name:          "valid subset of available local chains",
			l2Count:       4,
			dependencySet: []uint64{901, 903}, // 2 out of 4 available local chains
			shouldError:   false,
		},
		{
			name:          "user runs 901,902,903 and passes [901,902] - valid case",
			l2Count:       3,
			dependencySet: []uint64{901, 902}, // 2 local chains - valid
			shouldError:   false,
		},
		{
			name:          "user runs 901,902 and passes [901,999] - invalid case",
			l2Count:       2,
			dependencySet: []uint64{901, 999}, // External chain 999 not allowed
			shouldError:   true,
			expectedError: "chain ID 999 in dependency set is not running locally",
		},
		{
			name:          "user runs 901,902,903 and passes [901,902,903] - valid all local case",
			l2Count:       3,
			dependencySet: []uint64{901, 902, 903}, // All local chains - valid
			shouldError:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			config := &CLIConfig{
				L2Count:       tt.l2Count,
				DependencySet: tt.dependencySet,
			}

			err := config.validateBidirectionalDependencySet()

			if tt.shouldError {
				require.Error(t, err)
				require.Contains(t, err.Error(), tt.expectedError)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestCLIConfig_Check_WithDependencySet(t *testing.T) {
	tests := []struct {
		name          string
		l2Count       uint64
		dependencySet []uint64
		shouldError   bool
		expectedError string
	}{
		{
			name:          "valid config with empty dependency set",
			l2Count:       2,
			dependencySet: []uint64{},
			shouldError:   false,
		},
		{
			name:          "invalid config with dependency set for 2 chains",
			l2Count:       2,
			dependencySet: []uint64{901},
			shouldError:   true,
			expectedError: "dependency set must contain at least 2 chains to be bidirectional",
		},
		{
			name:          "valid config with bidirectional dependency set",
			l2Count:       3,
			dependencySet: []uint64{901, 902},
			shouldError:   false,
		},
		{
			name:          "invalid config with single chain dependency set",
			l2Count:       3,
			dependencySet: []uint64{901},
			shouldError:   true,
			expectedError: "dependency set must contain at least 2 chains to be bidirectional",
		},
		{
			name:          "invalid config with external chain ID in dependency set",
			l2Count:       2,
			dependencySet: []uint64{901, 902, 999}, // External chain 999 not allowed
			shouldError:   true,
			expectedError: "chain ID 999 in dependency set is not running locally",
		},
		{
			name:          "invalid config with only external chain IDs",
			l2Count:       3,
			dependencySet: []uint64{999, 888}, // External chains not allowed
			shouldError:   true,
			expectedError: "chain ID 999 in dependency set is not running locally",
		},
		{
			name:          "invalid config with chain ID outside L2Count range",
			l2Count:       2,                  // Only chains 901, 902 available
			dependencySet: []uint64{901, 903}, // 903 is not available with L2Count=2
			shouldError:   true,
			expectedError: "chain ID 903 in dependency set is not running locally",
		},
		{
			name:          "valid config with all available local chains",
			l2Count:       4,
			dependencySet: []uint64{901, 902, 903, 904},
			shouldError:   false,
		},
		{
			name:          "valid config with subset of local chains",
			l2Count:       3,
			dependencySet: []uint64{901, 902}, // 2 out of 3 available local chains
			shouldError:   false,
		},
		{
			name:          "integration test: user runs 901,902,903 and passes [901,902] - valid",
			l2Count:       3,
			dependencySet: []uint64{901, 902}, // Valid local chains only
			shouldError:   false,
		},
		{
			name:          "integration test: user runs 901,902 and passes [901,999] - invalid",
			l2Count:       2,
			dependencySet: []uint64{901, 999}, // External chain 999 not allowed
			shouldError:   true,
			expectedError: "chain ID 999 in dependency set is not running locally",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			config := &CLIConfig{
				L1Host:        "127.0.0.1",
				L2Host:        "127.0.0.1",
				L2Count:       tt.l2Count,
				DependencySet: tt.dependencySet,
			}

			err := config.Check()

			if tt.shouldError {
				require.Error(t, err)
				require.Contains(t, err.Error(), tt.expectedError)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestCLIConfig_Check_WithDependencySet_ForkMode(t *testing.T) {
	tests := []struct {
		name          string
		network       string
		chains        []string
		dependencySet []uint64
		shouldError   bool
		expectedError string
	}{
		{
			name:          "valid fork config with empty dependency set",
			network:       "mainnet",
			chains:        []string{"op", "base"},
			dependencySet: []uint64{},
			shouldError:   false,
		},
		{
			name:          "valid fork config with correct mainnet chain IDs",
			network:       "mainnet",
			chains:        []string{"op", "base"},
			dependencySet: []uint64{10, 8453}, // OP Mainnet and Base chain IDs
			shouldError:   false,
		},
		{
			name:          "invalid fork config with wrong chain ID",
			network:       "mainnet",
			chains:        []string{"op", "base"},
			dependencySet: []uint64{10, 999}, // 999 is not Base chain ID
			shouldError:   true,
			expectedError: "chain ID 999 in dependency set is not running locally",
		},
		{
			name:          "invalid fork config with local chain ID in fork mode",
			network:       "mainnet",
			chains:        []string{"op", "base"},
			dependencySet: []uint64{901, 902}, // These are local mode chain IDs
			shouldError:   true,
			expectedError: "chain ID 901 in dependency set is not running locally",
		},
		{
			name:          "invalid fork config with single chain dependency set",
			network:       "mainnet",
			chains:        []string{"op", "base"},
			dependencySet: []uint64{10}, // Single chain not allowed for bidirectional
			shouldError:   true,
			expectedError: "dependency set must contain at least 2 chains to be bidirectional",
		},
		{
			name:          "valid fork config with subset of forked chains",
			network:       "mainnet",
			chains:        []string{"op", "base", "zora"},
			dependencySet: []uint64{10, 8453}, // Only OP and Base, not Zora
			shouldError:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			config := &CLIConfig{
				L1Host: "127.0.0.1",
				L2Host: "127.0.0.1",
				ForkConfig: &ForkCLIConfig{
					Network:        tt.network,
					Chains:         tt.chains,
					InteropEnabled: true,
				},
				DependencySet: tt.dependencySet,
			}

			err := config.Check()

			if tt.shouldError {
				require.Error(t, err)
				require.Contains(t, err.Error(), tt.expectedError)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestGetLocalChainIDsMap(t *testing.T) {
	tests := []struct {
		name          string
		config        *CLIConfig
		expectedIDs   []uint64
		shouldError   bool
		expectedError string
	}{
		{
			name: "local mode with 2 chains",
			config: &CLIConfig{
				L2Count: 2,
			},
			expectedIDs: []uint64{901, 902}, // Generated genesis chain IDs
			shouldError: false,
		},
		{
			name: "local mode with 3 chains",
			config: &CLIConfig{
				L2Count: 3,
			},
			expectedIDs: []uint64{901, 902, 903},
			shouldError: false,
		},
		{
			name: "fork mode with mainnet chains",
			config: &CLIConfig{
				ForkConfig: &ForkCLIConfig{
					Network: "mainnet",
					Chains:  []string{"op", "base"},
				},
			},
			expectedIDs: []uint64{10, 8453}, // OP Mainnet and Base chain IDs
			shouldError: false,
		},
		{
			name: "fork mode with single chain",
			config: &CLIConfig{
				ForkConfig: &ForkCLIConfig{
					Network: "mainnet",
					Chains:  []string{"op"},
				},
			},
			expectedIDs: []uint64{10}, // OP Mainnet chain ID
			shouldError: false,
		},
		{
			name: "fork mode with invalid network",
			config: &CLIConfig{
				ForkConfig: &ForkCLIConfig{
					Network: "invalid_network",
					Chains:  []string{"op"},
				},
			},
			shouldError:   true,
			expectedError: "unrecognized superchain network",
		},
		{
			name: "fork mode with invalid chain",
			config: &CLIConfig{
				ForkConfig: &ForkCLIConfig{
					Network: "mainnet",
					Chains:  []string{"invalid_chain"},
				},
			},
			shouldError:   true,
			expectedError: "unrecognized chain invalid_chain in mainnet superchain",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			chainIDsMap, err := tt.config.getLocalChainIDsMap()

			if tt.shouldError {
				require.Error(t, err)
				require.Contains(t, err.Error(), tt.expectedError)
				return
			}

			require.NoError(t, err)
			require.Equal(t, len(tt.expectedIDs), len(chainIDsMap))

			for _, expectedID := range tt.expectedIDs {
				require.True(t, chainIDsMap[expectedID], "Expected chain ID %d to be present", expectedID)
			}
		})
	}
}
