package orchestrator

import (
	"context"
	"fmt"
	"math/big"

	registry "github.com/ethereum-optimism/superchain-registry/superchain"
	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

const blockTime = 2

func ChainConfigsFromForkCLIConfig(forkConfig *config.ForkCLIConfig) ([]config.ChainConfig, error) {
	superchain := registry.Superchains[forkConfig.Network]
	chainConfigs := []config.ChainConfig{}

	// L1
	l1Client, err := ethclient.Dial(superchain.Config.L1.PublicRPC)
	if err != nil {
		return nil, fmt.Errorf("failed to dial l1 public rpc: %w", err)
	}

	var l1ForkHeight *big.Int
	if forkConfig.L1ForkHeight > 0 {
		l1ForkHeight = new(big.Int).SetUint64(forkConfig.L1ForkHeight)
	}
	l1Header, err := l1Client.HeaderByNumber(context.Background(), l1ForkHeight)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve L1 header: %w", err)
	}

	chainConfigs = append(chainConfigs, config.ChainConfig{
		Name:          forkConfig.Network,
		Port:          0,
		ChainID:       superchain.Config.L1.ChainID,
		SecretsConfig: config.DefaultSecretsConfig,
		ForkConfig: &config.ForkConfig{
			RPCUrl:      superchain.Config.L1.PublicRPC,
			BlockNumber: l1Header.Number.Uint64(),
		},
	})

	// L2s
	for _, chain := range forkConfig.Chains {
		chainCfg := registry.OPChains[config.OpChainToId[chain]]
		l2ForkHeight, err := latestL2HeightFromL1Header(chainCfg, l1Header)
		if err != nil {
			return nil, fmt.Errorf("failed to find right l2 height: %w", err)
		}

		chainConfigs = append(chainConfigs, config.ChainConfig{
			Name:          chainCfg.Chain,
			ChainID:       chainCfg.ChainID,
			SecretsConfig: config.DefaultSecretsConfig,

			ForkConfig: &config.ForkConfig{
				RPCUrl:      chainCfg.PublicRPC,
				BlockNumber: l2ForkHeight,
			},

			L2Config: &config.L2Config{
				L1ChainID:   superchain.Config.L1.ChainID,
				L1Addresses: registry.Addresses[chainCfg.ChainID],
			},
		})
	}

	return chainConfigs, nil
}

func latestL2HeightFromL1Header(l2Cfg *registry.ChainConfig, l1Header *types.Header) (uint64, error) {
	if l1Header.Time < l2Cfg.Genesis.L2Time {
		return 0, fmt.Errorf("l1 height precedes l2 genesis time for chain %s", l2Cfg.Chain)
	}

	l2Client, err := ethclient.Dial(l2Cfg.PublicRPC)
	if err != nil {
		return 0, fmt.Errorf("failed to dial l2 public rpc: %w", err)
	}

	latestHeader, err := l2Client.HeaderByNumber(context.Background(), nil)
	if err != nil {
		return 0, fmt.Errorf("failed to query latest header: %w", err)
	}

	// We can compute the number of blocks to wind back as the as the block time is fixed.
	blockNum := latestHeader.Number.Uint64()
	if latestHeader.Time > l1Header.Time {
		timeDiff := latestHeader.Time - l1Header.Time
		blocksToWalkBack := timeDiff / blockTime
		if timeDiff%2 != 0 {
			blocksToWalkBack++
		}
		blockNum = blockNum - blocksToWalkBack
	}

	return blockNum, nil
}
