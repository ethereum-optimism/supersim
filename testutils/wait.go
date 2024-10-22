package testutils

import (
	"context"
	"time"

	"github.com/ethereum-optimism/optimism/op-e2e/e2eutils/wait"
)

func WaitForWithTimeout(ctx context.Context, ticker time.Duration, timeout time.Duration, cb func() (bool, error)) error {
	ctx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()

	return wait.For(ctx, ticker, cb)
}
