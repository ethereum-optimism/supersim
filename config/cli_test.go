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
			name:          "dependency set with external chain ID and 2 local chains is valid",
			l2Count:       3,
			dependencySet: []uint64{901, 902, 999}, // 999 is external, 901,902 are local
			shouldError:   false,
		},
		{
			name:          "dependency set with only external chain IDs is valid",
			l2Count:       2,
			dependencySet: []uint64{999, 888}, // Both are external chain IDs
			shouldError:   false,
		},
		{
			name:          "dependency set with 1 local and 1 external chain should fail",
			l2Count:       2,
			dependencySet: []uint64{901, 999}, // Only 1 local chain (901)
			shouldError:   true,
			expectedError: "dependency set contains only 1 locally running chain",
		},
		{
			name:          "dependency set with 1 local chain at different position should fail",
			l2Count:       3,
			dependencySet: []uint64{999, 902, 888}, // Only 1 local chain (902)
			shouldError:   true,
			expectedError: "dependency set contains only 1 locally running chain",
		},
		{
			name:          "dependency set with all available local chains is valid",
			l2Count:       5,
			dependencySet: []uint64{901, 902, 903, 904, 905}, // All local chains
			shouldError:   false,
		},
		{
			name:          "dependency set with some local chains and external chains is valid",
			l2Count:       4,
			dependencySet: []uint64{901, 903, 999, 888}, // 2 local, 2 external
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
			name:          "valid config with bidirectional local ids and external chain IDs",
			l2Count:       2,
			dependencySet: []uint64{901, 902, 999}, // 2 local, 1 external
			shouldError:   false,
		},
		{
			name:          "invalid config with only 1 local chain and external chains",
			l2Count:       3,
			dependencySet: []uint64{901, 999, 888}, // Only 1 local chain
			shouldError:   true,
			expectedError: "dependency set contains only 1 locally running chain",
		},
		{
			name:          "valid config with only external chain IDs",
			l2Count:       2,
			dependencySet: []uint64{999, 888}, // Only external chains
			shouldError:   false,
		},
		{
			name:          "valid config with all available local chains",
			l2Count:       4,
			dependencySet: []uint64{901, 902, 903, 904},
			shouldError:   false,
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
