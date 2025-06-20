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
			name:        "bracket format",
			input:       "[1,2,3]",
			expected:    []uint64{1, 2, 3},
			shouldError: false,
		},
		{
			name:        "simple format",
			input:       "4,5,6",
			expected:    []uint64{4, 5, 6},
			shouldError: false,
		},
		{
			name:        "bracket format with spaces",
			input:       "[ 7, 8, 9 ]",
			expected:    []uint64{7, 8, 9},
			shouldError: false,
		},
		{
			name:        "single number",
			input:       "42",
			expected:    []uint64{42},
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
			expected:    []uint64{},
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