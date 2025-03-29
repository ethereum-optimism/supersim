package worldgen

import (
	"context"
	"fmt"
	"time"

	"github.com/ethereum/go-ethereum/log"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	"github.com/ethereum-optimism/optimism/op-chain-ops/foundry"
	"github.com/ethereum-optimism/optimism/op-chain-ops/interopgen"
)

const defaultBlockTime = 2

var defaultRecipe = interopgen.InteropDevRecipe{
	L1ChainID: 900,
	L2s: []interopgen.InteropDevL2Recipe{
		{ChainID: 901, BlockTime: defaultBlockTime},
		{ChainID: 902, BlockTime: defaultBlockTime},
		{ChainID: 903, BlockTime: defaultBlockTime},
		{ChainID: 904, BlockTime: defaultBlockTime},
		{ChainID: 905, BlockTime: defaultBlockTime},
	},
	GenesisTimestamp: uint64(time.Now().Unix()),
}

func GenerateWorld(ctx context.Context, logger log.Logger, monorepoArtifacts *foundry.ArtifactsFS, peripheryArtifacts *foundry.ArtifactsFS) (*interopgen.WorldDeployment, *interopgen.WorldOutput, error) {
	// Initialize dev keys
	hdWallet, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create hd wallet: %w", err)
	}

	// Build world config
	cfg, err := defaultRecipe.Build(hdWallet)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to build world config from recipe: %w", err)
	}

	// Sanity check all L2s have consistent chain ID and attach to the same L1
	for id, l2Cfg := range cfg.L2s {
		if fmt.Sprintf("%d", l2Cfg.L2ChainID) != id {
			return nil, nil, fmt.Errorf("chain L2 %s declared different L2 chain ID %d in config", id, l2Cfg.L2ChainID)
		}
		if !cfg.L1.ChainID.IsUint64() || cfg.L1.ChainID.Uint64() != l2Cfg.L1ChainID {
			return nil, nil, fmt.Errorf("chain L2 %s declared different L1 chain ID %d in config than global %d", id, l2Cfg.L1ChainID, cfg.L1.ChainID)
		}
	}

	deployments := &interopgen.WorldDeployment{
		L2s: make(map[string]*interopgen.L2Deployment),
	}

	l1Host := interopgen.CreateL1(logger, monorepoArtifacts, nil, cfg.L1)
	if err := l1Host.EnableCheats(); err != nil {
		return nil, nil, fmt.Errorf("failed to enable cheats in L1 state: %w", err)
	}

	l1Deployment, err := interopgen.PrepareInitialL1(l1Host, cfg.L1)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to deploy initial L1 content: %w", err)
	}
	deployments.L1 = l1Deployment

	superDeployment, err := interopgen.DeploySuperchainToL1(l1Host, cfg.Superchain)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to deploy superchain to L1: %w", err)
	}
	deployments.Superchain = superDeployment

	// We deploy contracts for each L2 to the L1
	// because we need to compute the genesis block hash
	// to put into the L2 genesis configs, and can thus not mutate the L1 state
	// after creating the final config for any particular L2. Will add comments.

	for l2ChainID, l2Cfg := range cfg.L2s {
		l2Deployment, err := interopgen.DeployL2ToL1(l1Host, cfg.Superchain, superDeployment, l2Cfg)
		if err != nil {
			return nil, nil, fmt.Errorf("failed to deploy L2 %d to L1: %w", &l2ChainID, err)
		}
		deployments.L2s[l2ChainID] = l2Deployment
	}

	out := &interopgen.WorldOutput{
		L2s: make(map[string]*interopgen.L2Output),
	}
	l1Out, err := interopgen.CompleteL1(l1Host, cfg.L1)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to complete L1: %w", err)
	}
	out.L1 = l1Out

	// Now that the L1 does not change anymore we can compute the L1 genesis block, to anchor all the L2s to.
	l1GenesisBlock := l1Out.Genesis.ToBlock()
	genesisTimestamp := l1Out.Genesis.Timestamp

	for l2ChainID, l2Cfg := range cfg.L2s {
		l2Host := interopgen.CreateL2(logger, monorepoArtifacts, nil, l2Cfg, genesisTimestamp)
		if err := l2Host.EnableCheats(); err != nil {
			return nil, nil, fmt.Errorf("failed to enable cheats in L2 state %s: %w", l2ChainID, err)
		}
		if err := interopgen.GenesisL2(l2Host, l2Cfg, deployments.L2s[l2ChainID]); err != nil {
			return nil, nil, fmt.Errorf("failed to apply genesis data to L2 %s: %w", l2ChainID, err)
		}

		if err := deployPeripheryContracts(logger, l2Host, peripheryArtifacts, l2Cfg, genesisTimestamp); err != nil {
			return nil, nil, fmt.Errorf("failed to deploy periphery contracts to L2 %s: %w", l2ChainID, err)
		}

		l2Out, err := interopgen.CompleteL2(l2Host, l2Cfg, l1GenesisBlock, deployments.L2s[l2ChainID])
		if err != nil {
			return nil, nil, fmt.Errorf("failed to complete L2 %s: %w", l2ChainID, err)
		}
		out.L2s[l2ChainID] = l2Out
	}
	return deployments, out, nil
}
