package utils

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/ethereum/go-ethereum/rpc"
)

func WaitForAnvilEndpointToBeReady(endpoint string, timeout time.Duration) error {
	client, clientCreateErr := rpc.Dial(endpoint)
	if clientCreateErr != nil {
		return fmt.Errorf("failed to create client: %v", clientCreateErr)
	}

	err := WaitForAnvilClientToBeReady(client, timeout)
	if err != nil {
		return fmt.Errorf("failed to connect to RPC server: %v", err)
	}

	return nil
}

func WaitForAnvilClientToBeReady(client *rpc.Client, timeout time.Duration) error {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return fmt.Errorf("timed out waiting for response from client")
		case <-ticker.C:
			var result string
			callErr := client.Call(&result, "web3_clientVersion")

			if callErr != nil {
				continue
			}

			if strings.HasPrefix(result, "anvil") {
				return nil
			}

			return fmt.Errorf("unexpected client version: %s", result)
		}
	}
}
