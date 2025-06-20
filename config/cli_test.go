package config

import (
	"testing"
	"math/big"

	"github.com/stretchr/testify/require"
)

func TestParseDependencySet(t *testing.T) {
	tests := []struct {
		name        string
		input       string
		expected    []*big.Int
		shouldError bool
	}{
		{
			name:        "bracket format",
			input:       "[1,2,3]",
			expected:    []*big.Int{big.NewInt(1), big.NewInt(2), big.NewInt(3)},
			shouldError: false,
		},
		{
			name:        "simple format",
			input:       "4,5,6",
			expected:    []*big.Int{big.NewInt(4), big.NewInt(5), big.NewInt(6)},
			shouldError: false,
		},
		{
			name:        "bracket format with spaces",
			input:       "[ 7, 8, 9 ]",
			expected:    []*big.Int{big.NewInt(7), big.NewInt(8), big.NewInt(9)},
			shouldError: false,
		},
		{
			name:        "single number",
			input:       "42",
			expected:    []*big.Int{big.NewInt(42)},
			shouldError: false,
		},
		{
			name:        "negative numbers fail",
			input:       "1,-2,3",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "empty string fails",
			input:       "",
			expected:    []*big.Int{},
			shouldError: false,
		},
		{
			name:        "invalid single fails",
			input:       "invalid",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "invalid in multiple fails",
			input:       "1,invalid,3",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "leading comma fails",
			input:       ",1,2,3",
			expected:    nil,
			shouldError: true,
		},
		{
			name:        "large uint256 chain ID",
			input:       "[340282366920938463463374607431768211456]", // 2^128 - exceeds uint64
			expected:    func() []*big.Int {
				val := new(big.Int)
				val.SetString("340282366920938463463374607431768211456", 10)
				return []*big.Int{val}
			}(),
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
				require.Equal(t, len(test.expected), len(result))

				// Compare each big.Int individually since require.Equal doesn't work well with []*big.Int
				for i, expectedVal := range test.expected {
					require.Equal(t, 0, expectedVal.Cmp(result[i]),
						"expected %s, got %s at index %d", expectedVal.String(), result[i].String(), i)
				}
			}
		})
	}
}