package orchestrator

import (
	"context"
	"fmt"
	"math/big"
	"os"
	"strings"

	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/registry"

	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/superchain"
)

func NetworkConfigFromForkCLIConfig(log log.Logger, envPrefix string, cliConfig *config.CLIConfig) (config.NetworkConfig, error) {
	forkConfig := cliConfig.ForkConfig
	superchain := registry.SuperchainsByIdentifier[forkConfig.Network]
	networkConfig := config.NetworkConfig{InteropEnabled: forkConfig.InteropEnabled}

	// L1
	l1RpcUrl := superchain.Config.L1.PublicRPC
	if url, ok := os.LookupEnv(fmt.Sprintf("%s_RPC_URL_%s", envPrefix, strings.ToUpper(forkConfig.Network))); ok && url != "" {
		log.Info("detected rpc override", "name", forkConfig.Network)
		l1RpcUrl = url
	}

	l1Client, err := ethclient.Dial(l1RpcUrl)
	if err != nil {
		return networkConfig, fmt.Errorf("failed to dial l1 public rpc: %w", err)
	}

	chainId, err := l1Client.ChainID(context.Background())
	if err != nil {
		return networkConfig, fmt.Errorf("failed to fetch l1 chain id: %w", err)
	}
	if superchain.Config.L1.ChainID != chainId.Uint64() {
		return networkConfig, fmt.Errorf("mismatched network chain id. Expected %d, Got %s", superchain.Config.L1.ChainID, chainId)
	}

	var l1ForkHeight *big.Int
	if forkConfig.L1ForkHeight > 0 {
		l1ForkHeight = new(big.Int).SetUint64(forkConfig.L1ForkHeight)
	}
	l1Header, err := l1Client.HeaderByNumber(context.Background(), l1ForkHeight)
	if err != nil {
		return networkConfig, fmt.Errorf("failed to retrieve L1 header: %w", err)
	}

	networkConfig.L1Config = config.ChainConfig{
		Name:          forkConfig.Network,
		BlockTime:     config.DefaultL1BlockTime,
		ChainID:       superchain.Config.L1.ChainID,
		SecretsConfig: config.DefaultSecretsConfig,
		LogsDirectory: cliConfig.LogsDirectory,
		ForkConfig: &config.ForkConfig{
			RPCUrl:      l1RpcUrl,
			BlockNumber: l1Header.Number.Uint64(),
		},
		OdysseyEnabled: cliConfig.OdysseyEnabled,
	}

	// L2s
	for _, chain := range forkConfig.Chains {
		chainCfg := config.OPChainConfigByName(superchain, chain)
		if chainCfg == nil {
			return networkConfig, fmt.Errorf("unrecognized chain %s. superchain %s", chain, superchain.Identifier)
		}

		l2RpcUrl := chainCfg.PublicRPC
		normalizedName := strings.ReplaceAll(chainCfg.Name, " ", "_")
		if url, ok := os.LookupEnv(fmt.Sprintf("%s_RPC_URL_%s", envPrefix, strings.ToUpper(normalizedName))); ok && url != "" {
			log.Info("detected rpc override", "name", chainCfg.Name)
			l2RpcUrl = url
		}

		l2Client, err := ethclient.Dial(l2RpcUrl)
		if err != nil {
			return networkConfig, fmt.Errorf("failed to dial l2 public rpc: %w", err)
		}

		chainId, err := l2Client.ChainID(context.Background())
		if err != nil {
			return networkConfig, fmt.Errorf("failed to fetch l2 chain id: %w", err)
		}
		if chainCfg.ChainID != chainId.Uint64() {
			return networkConfig, fmt.Errorf("mismatched l2 chain id for %s. Expected %d, Got %s", chainCfg.Name, chainCfg.ChainID, chainId)
		}

		l2ForkHeight, err := latestL2HeightFromL1Header(chainCfg, l2Client, l1Header)
		if err != nil {
			return networkConfig, fmt.Errorf("failed to find right l2 height for chain %s: %w", chainCfg.Name, err)
		}

		l2ChainConfig := config.ChainConfig{
			Name:          chainCfg.Name,
			ChainID:       chainCfg.ChainID,
			BlockTime:     config.DefaultL1BlockTime,
			SecretsConfig: config.DefaultSecretsConfig,
			LogsDirectory: cliConfig.LogsDirectory,
			ForkConfig: &config.ForkConfig{
				RPCUrl:      l2RpcUrl,
				BlockNumber: l2ForkHeight,
			},
			L2Config: &config.L2Config{
				L1ChainID:   superchain.Config.L1.ChainID,
				L1Addresses: registry.AddressesByID[chainCfg.ChainID],
			},
			OdysseyEnabled: cliConfig.OdysseyEnabled,
		}

		if forkConfig.InteropEnabled {
			var dependencySet []uint64
			for _, chain := range forkConfig.Chains {
				chainCfg := config.OPChainConfigByName(superchain, chain)
				if chainCfg.ChainID != l2ChainConfig.ChainID {
					dependencySet = append(dependencySet, chainCfg.ChainID)
				}
			}

			l2ChainConfig.L2Config.DependencySet = dependencySet
		}

		networkConfig.L2Configs = append(networkConfig.L2Configs, l2ChainConfig)
	}

	return networkConfig, nil
}

func latestL2HeightFromL1Header(l2Cfg *superchain.ChainConfig, l2Client *ethclient.Client, l1Header *types.Header) (uint64, error) {
	if l1Header.Time < l2Cfg.Genesis.L2Time {
		return 0, fmt.Errorf("l1 height precedes l2 genesis time")
	}

	latestHeader, err := l2Client.HeaderByNumber(context.Background(), nil)
	if err != nil {
		return 0, fmt.Errorf("failed to query latest header: %w", err)
	}

	// We can compute the number of blocks to wind back as the as the block time is fixed.
	blockNum := latestHeader.Number.Uint64()
	if latestHeader.Time > l1Header.Time {
		timeDiff := latestHeader.Time - l1Header.Time
		blocksToWalkBack := timeDiff / l2Cfg.BlockTime
		if timeDiff%l2Cfg.BlockTime != 0 {
			blocksToWalkBack++
		}
		blockNum = blockNum - blocksToWalkBack
	}

	return blockNum, nil
}
