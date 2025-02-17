package supersim

import (
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"testing"
	"time"

	"github.com/ethereum-optimism/optimism/op-e2e/e2eutils/wait"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type L2Addresses struct {
	L1StandardBridgeProxy string `json:"L1StandardBridgeProxy"`
}

//go:embed genesis/generated/901-l2-addresses.json
var l2AddressesJSON []byte

func runCmd(command string) (string, error) {
	cmd := exec.Command("bash", "-c", command)
	cmd.Env = append(os.Environ(), "FOUNDRY_DISABLE_NIGHTLY_WARNING=true")
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("error executing command: %w\nOutput: %s", err, output)
	}
	return strings.TrimSpace(string(output)), nil
}

func TestL1ToL2Deposit(t *testing.T) {
	_ = createTestSuite(t, func(cfg *config.CLIConfig) *config.CLIConfig {
		cfg.L1Port = 8545
		cfg.L2StartingPort = 9545
		return cfg
	})

	// Get the initial balance on L2
	initialBalanceCmd := "cast balance 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9545"
	initialBalance, err := runCmd(initialBalanceCmd)
	assert.NoError(t, err)
	assert.Equal(t, "10000000000000000000000", initialBalance, "Initial balance check failed")

	// Read the L1StandardBridgeProxy address from the JSON file
	var addresses L2Addresses
	err = json.Unmarshal(l2AddressesJSON, &addresses)
	require.NoError(t, err, "Failed to parse addresses file")

	// Initiate the bridge transaction on L1
	bridgeCmd := fmt.Sprintf(`cast send %s "bridgeETH(uint32 _minGasLimit, bytes calldata _extraData)" 50000 0x --value 0.1ether --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`, addresses.L1StandardBridgeProxy)
	_, err = runCmd(bridgeCmd)
	assert.NoError(t, err, "Failed to bridge ETH")

	// Wait for bridge transaction to be processed
	require.NoError(t, wait.For(context.Background(), 500*time.Millisecond, func() (bool, error) {
		finalBalanceCmd := "cast balance 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9545"
		finalBalance, err := runCmd(finalBalanceCmd)
		if err != nil {
			return false, err
		}

		return finalBalance == "10000100000000000000000", nil
	}))
}

func TestL2ToL2Transfer(t *testing.T) {
	_ = createTestSuite(t, func(cfg *config.CLIConfig) *config.CLIConfig {
		cfg.L1Port = 8545
		cfg.L2StartingPort = 9545
		cfg.InteropAutoRelay = true
		return cfg
	})

	// Mint tokens on chain 901
	mintCmd := `cast send 0x420beeF000000000000000000000000000000001 "mint(address _to, uint256 _amount)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000 --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
	_, err := runCmd(mintCmd)
	assert.NoError(t, err)

	// Check initial balance on chain 902
	initialBalanceCmd := `cast balance --erc20 0x420beeF000000000000000000000000000000001 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9546`
	initialBalance, err := runCmd(initialBalanceCmd)
	assert.NoError(t, err)
	assert.Equal(t, "0", initialBalance, "Initial balance check failed")

	// Initiate the send transaction on chain 901
	sendCmd := `cast send 0x4200000000000000000000000000000000000028 "sendERC20(address _token, address _to, uint256 _amount, uint256 _chainId)" 0x420beeF000000000000000000000000000000001 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000 902 --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
	_, err = runCmd(sendCmd)
	assert.NoError(t, err)

	// Check the final balance on chain 902
	require.NoError(t, wait.For(context.Background(), 500*time.Millisecond, func() (bool, error) {
		finalBalanceCmd := `cast balance --erc20 0x420beeF000000000000000000000000000000001 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9546`
		finalBalance, err := runCmd(finalBalanceCmd)
		if err != nil {
			return false, err
		}

		return finalBalance == "1000", nil
	}))
}

func TestSuperchainETHTransfer(t *testing.T) {
	_ = createTestSuite(t, func(cfg *config.CLIConfig) *config.CLIConfig {
		cfg.L1Port = 8545
		cfg.L2StartingPort = 9545
		cfg.InteropAutoRelay = true
		return cfg
	})

	// Check initial balance on chain 902
	initialBalanceCmd := `cast balance 0xCE35738E4bC96bB0a194F71B3d184809F3727f56 --rpc-url http://127.0.0.1:9546`
	initialBalance, err := runCmd(initialBalanceCmd)
	assert.NoError(t, err)
	assert.Equal(t, "0", initialBalance, "Initial balance check failed")

	// Initiate the send transaction on chain 901
	sendCmd := `cast send 0x4200000000000000000000000000000000000024 "sendETH(address _to, uint256 _chainId)" 0xCE35738E4bC96bB0a194F71B3d184809F3727f56 902 --value 10ether --rpc-url http://127.0.0.1:9545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
	_, err = runCmd(sendCmd)
	assert.NoError(t, err)

	// Check the final balance on chain 902
	require.NoError(t, wait.For(context.Background(), 500*time.Millisecond, func() (bool, error) {
		finalBalanceCmd := `cast balance 0xCE35738E4bC96bB0a194F71B3d184809F3727f56 --rpc-url http://127.0.0.1:9546`
		finalBalance, err := runCmd(finalBalanceCmd)
		if err != nil {
			return false, err
		}

		return finalBalance == "10000000000000000000", nil
	}))
}
