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

func testCLIConfig() *CLIConfig {
	return &CLIConfig{
		L1Host: "127.0.0.1",
		L2Host: "127.0.0.1",
	}
}

func TestCLIConfig_Check_WithDependencySet(t *testing.T) {
	tests := []struct {
		name          string
		setupConfig   func() *CLIConfig
		shouldError   bool
		expectedError string
	}{
		{
			name: "empty dependency set - local mode",
			setupConfig: func() *CLIConfig {
				config := testCLIConfig()
				config.L2Count = 2
				config.DependencySet = []uint64{}
				return config
			},
			shouldError: false,
		},
		{
			name: "empty dependency set - fork mode",
			setupConfig: func() *CLIConfig {
				config := testCLIConfig()
				config.L2Count = 1
				config.ForkConfig = &ForkCLIConfig{
					Network: "mainnet",
					Chains:  []string{"op", "base"},
				}
				config.DependencySet = []uint64{}
				return config
			},
			shouldError: false,
		},
		{
			name: "valid local mode dependency set",
			setupConfig: func() *CLIConfig {
				config := testCLIConfig()
				config.L2Count = 3
				config.DependencySet = []uint64{901, 902}
				return config
			},
			shouldError: false,
		},
		{
			name: "valid fork mode dependency set",
			setupConfig: func() *CLIConfig {
				config := testCLIConfig()
				config.L2Count = 1
				config.ForkConfig = &ForkCLIConfig{
					Network: "mainnet",
					Chains:  []string{"op", "base"},
				}
				config.DependencySet = []uint64{10, 8453} // OP and Base chain IDs
				return config
			},
			shouldError: false,
		},
		{
			name: "single chain dependency set fails",
			setupConfig: func() *CLIConfig {
				config := testCLIConfig()
				config.L2Count = 3
				config.DependencySet = []uint64{901}
				return config
			},
			shouldError:   true,
			expectedError: "dependency set must contain at least 2 chains to be bidirectional",
		},
		{
			name: "invalid chain ID in local mode",
			setupConfig: func() *CLIConfig {
				config := testCLIConfig()
				config.L2Count = 2
				config.DependencySet = []uint64{901, 999}
				return config
			},
			shouldError:   true,
			expectedError: "chain ID 999 in dependency set is not running locally",
		},
		{
			name: "invalid chain ID in fork mode",
			setupConfig: func() *CLIConfig {
				config := testCLIConfig()
				config.L2Count = 1
				config.ForkConfig = &ForkCLIConfig{
					Network: "mainnet",
					Chains:  []string{"op", "base"},
				}
				config.DependencySet = []uint64{10, 999}
				return config
			},
			shouldError:   true,
			expectedError: "chain ID 999 in dependency set is not running locally",
		},
		{
			name: "local chain IDs in fork mode fails",
			setupConfig: func() *CLIConfig {
				config := testCLIConfig()
				config.L2Count = 1
				config.ForkConfig = &ForkCLIConfig{
					Network: "mainnet",
					Chains:  []string{"op", "base"},
				}
				config.DependencySet = []uint64{901, 902} // Local mode chain IDs
				return config
			},
			shouldError:   true,
			expectedError: "chain ID 901 in dependency set is not running locally",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			config := tt.setupConfig()
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
			name: "local mode",
			config: &CLIConfig{
				L2Count: 2,
			},
			expectedIDs: []uint64{901, 902},
			shouldError: false,
		},
		{
			name: "fork mode",
			config: &CLIConfig{
				ForkConfig: &ForkCLIConfig{
					Network: "mainnet",
					Chains:  []string{"op", "base"},
				},
			},
			expectedIDs: []uint64{10, 8453}, // OP and Base chain IDs
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
