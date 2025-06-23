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