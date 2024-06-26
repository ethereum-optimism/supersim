package testutils

import (
	"context"
	"fmt"
	"time"

	"github.com/ethereum/go-ethereum/rpc"
)

func WaitForAnvilClientToBeReady(rpcUrl string, timeout time.Duration) (*rpc.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return nil, fmt.Errorf("timed out waiting for response from %s", rpcUrl)
		case <-ticker.C:
			client, err := rpc.Dial(rpcUrl)
			if err != nil {
				fmt.Printf("Error making request: %v\n", err)
				continue
			}

			return client, nil
		}
	}
}
