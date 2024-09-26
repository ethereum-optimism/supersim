package worldgen

import (
	"fmt"
	"math/big"

	"github.com/ethereum-optimism/optimism/op-chain-ops/foundry"
	"github.com/ethereum-optimism/optimism/op-chain-ops/interopgen"
	"github.com/ethereum-optimism/optimism/op-chain-ops/script"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/log"
)

type DeployL2PeripheryContractsScript struct {
	Run func() error
}

func createL2PeripheryHost(logger log.Logger, peripheryArtifacts *foundry.ArtifactsFS, l2Cfg *interopgen.L2Config, genesisTimestamp uint64) *script.Host {
	l2PeripheryContext := script.Context{
		ChainID:      new(big.Int).SetUint64(l2Cfg.L2ChainID),
		Sender:       l2Cfg.Deployer, // TODO swap with PeripheryContractsDeployerRole
		Origin:       l2Cfg.Deployer, // TODO swap with PeripheryContractsDeployerRole
		FeeRecipient: common.Address{},
		GasLimit:     script.DefaultFoundryGasLimit,
		BlockNum:     uint64(l2Cfg.L2GenesisBlockNumber),
		Timestamp:    genesisTimestamp,
	}

	l2PeripheryHost := script.NewHost(logger.New("role", "l2", "chain", l2Cfg.L2ChainID), peripheryArtifacts, nil, l2PeripheryContext)
	l2PeripheryHost.SetEnvVar("OUTPUT_MODE", "none") // we don't use the cheatcode, but capture the state outside of EVM execution
	l2PeripheryHost.SetEnvVar("FORK", "granite")     // latest fork

	return l2PeripheryHost
}

func deployPeripheryContracts(logger log.Logger, l2Host *script.Host, peripheryArtifacts *foundry.ArtifactsFS, l2Cfg *interopgen.L2Config, genesisTimestamp uint64) error {
	// Note: doesn't directly deploy the contracts
	// Instead it deploys into a fresh L2 state, and imports the state into the existing L2 state
	l2PeripheryHost := createL2PeripheryHost(logger, peripheryArtifacts, l2Cfg, genesisTimestamp)

	if err := l2PeripheryHost.EnableCheats(); err != nil {
		return fmt.Errorf("failed to enable cheats in L2 state %d: %w", l2Cfg.L2ChainID, err)
	}

	deployL2PeripheryContractsScript, cleanup, err := script.WithScript[DeployL2PeripheryContractsScript](l2PeripheryHost, "DeployL2PeripheryContracts.s.sol", "DeployL2PeripheryContracts")
	if err != nil {
		return fmt.Errorf("failed to load DeployL2PeripheryContracts script: %w", err)
	}
	defer cleanup()

	if err := deployL2PeripheryContractsScript.Run(); err != nil {
		return fmt.Errorf("failed to run DeployL2PeripheryContracts script: %w", err)
	}

	peripheryStateDump, err := l2PeripheryHost.StateDump()
	if err != nil {
		return fmt.Errorf("failed to dump state after deploying periphery contracts: %w", err)
	}

	l2Host.ImportState(peripheryStateDump)

	return nil
}
