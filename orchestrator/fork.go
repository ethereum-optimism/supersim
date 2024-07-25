package orchestrator

import (
	"context"
	"fmt"
	"math/big"

	"github.com/ethereum-optimism/optimism/op-chain-ops/genesis"
	registry "github.com/ethereum-optimism/superchain-registry/superchain"
	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum/common"
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
		addressList := registry.Addresses[config.OpChainToId[chain]]
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
				L1ChainID:             superchain.Config.L1.ChainID,
				L1DeploymentAddresses: addressListToL1Deployments(addressList),
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

// This is temporarily needed until the the L1Deployments type is consolidated.
// see comment on https://github.com/ethereum-optimism/optimism/blob/5be91416a3d017d3f8648140b3c41189b234ff6e/op-chain-ops/genesis/config.go#L693
// Notes: Will add all fields later. For now, only setting the proxy addresses that are used / easily accessible in the registry
// - Skipping setting implementation contracts since those are not used in our code
// - Using L1Deployments instead of AddressList in supersim since the superchain registry one is still being updated
// - Once the types are consolidated, we will use AddressList directly
func addressListToL1Deployments(a *registry.AddressList) *genesis.L1Deployments {
	return &genesis.L1Deployments{
		AddressManager: common.Address(a.AddressManager),
		// BlockOracle:                       common.Address(a.BlockOracle),
		// DisputeGameFactory:                common.Address(i.DisputeGameFactory.Address),
		DisputeGameFactoryProxy: common.Address(a.DisputeGameFactoryProxy),
		// L1CrossDomainMessenger:            common.Address(i.L1CrossDomainMessenger.Address),
		L1CrossDomainMessengerProxy: common.Address(a.L1CrossDomainMessengerProxy),
		// L1ERC721Bridge:                    common.Address(i.L1ERC721Bridge.Address),
		L1ERC721BridgeProxy: common.Address(a.L1ERC721BridgeProxy),
		// L1StandardBridge:                  common.Address(i.L1StandardBridge.Address),
		L1StandardBridgeProxy: common.Address(a.L1StandardBridgeProxy),
		// L2OutputOracle:                    common.Address(i.L2OutputOracle.Address),
		L2OutputOracleProxy: common.Address(a.L2OutputOracleProxy),
		// OptimismMintableERC20Factory:      common.Address(i.OptimismMintableERC20Factory.Address),
		OptimismMintableERC20FactoryProxy: common.Address(a.OptimismMintableERC20FactoryProxy),
		// OptimismPortal:                    common.Address(i.OptimismPortal.Address),
		OptimismPortalProxy: common.Address(a.OptimismPortalProxy),
		ProxyAdmin:          common.Address(a.ProxyAdmin),
		// SystemConfig:                      common.Address(i.SystemConfig.Address),
		SystemConfigProxy: common.Address(a.SystemConfigProxy),
		// ProtocolVersions:                  common.Address(i.ProtocolVersions.Address),
		// ProtocolVersionsProxy:             common.Address(a.ProtocolVersionsProxy),
	}
}
