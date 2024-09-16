package config

import (
	"context"
	"fmt"
	"math/big"
	"strings"

	registry "github.com/ethereum-optimism/superchain-registry/superchain"
	"github.com/ethereum-optimism/supersim/genesis"
	"github.com/ethereum-optimism/supersim/hdaccount"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

var (
	DefaultSecretsConfig = SecretsConfig{
		Accounts:       10,
		Mnemonic:       "test test test test test test test test test test test junk",
		DerivationPath: accounts.DefaultRootDerivationPath,
	}
)

type ForkConfig struct {
	RPCUrl      string
	BlockNumber uint64
}

type SecretsConfig struct {
	Accounts       uint64
	Mnemonic       string
	DerivationPath accounts.DerivationPath
}

type L2Config struct {
	L1ChainID     uint64
	L1Addresses   *registry.AddressList
	DependencySet []uint64
}

type ChainConfig struct {
	Name    string
	Port    uint64
	ChainID uint64

	GenesisJSON   []byte
	SecretsConfig SecretsConfig

	// Optional Config
	ForkConfig *ForkConfig

	// Optional Config (L1 chain if nil)
	L2Config *L2Config

	// Optional
	StartingTimestamp uint64
}

type NetworkConfig struct {
	L1Config ChainConfig

	L2StartingPort uint64
	L2Configs      []ChainConfig

	// Signaled higher up as a way to generally
	// check if Interop is enabled
	InteropEnabled   bool
	InteropAutoRelay bool
}

type Chain interface {
	// Properties
	Endpoint() string
	LogPath() string
	Config() *ChainConfig
	EthClient() *ethclient.Client

	// Additional methods
	SimulatedLogs(ctx context.Context, tx *types.Transaction) ([]types.Log, error)
	SetCode(ctx context.Context, result interface{}, address common.Address, code string) error
	SetStorageAt(ctx context.Context, result interface{}, address common.Address, storageSlot string, storageValue string) error
	SetBalance(ctx context.Context, result interface{}, address common.Address, value *big.Int) error
	SetIntervalMining(ctx context.Context, result interface{}, interval int64) error

	// Lifecycle
	Start(ctx context.Context) error
	Stop(ctx context.Context) error
}

func GetDefaultNetworkConfig(startingTimestamp uint64) NetworkConfig {
	return NetworkConfig{
		// Enabled by default as it is included in genesis
		InteropEnabled: true,

		L1Config: ChainConfig{
			Name:              "Local",
			ChainID:           genesis.GeneratedGenesisDeployment.L1.ChainID,
			SecretsConfig:     DefaultSecretsConfig,
			GenesisJSON:       genesis.GeneratedGenesisDeployment.L1.GenesisJSON,
			StartingTimestamp: startingTimestamp,
		},
		L2Configs: []ChainConfig{
			{
				Name:          "OPChainA",
				ChainID:       genesis.GeneratedGenesisDeployment.L2s[0].ChainID,
				SecretsConfig: DefaultSecretsConfig,
				GenesisJSON:   genesis.GeneratedGenesisDeployment.L2s[0].GenesisJSON,
				L2Config: &L2Config{
					L1ChainID:     genesis.GeneratedGenesisDeployment.L1.ChainID,
					L1Addresses:   genesis.GeneratedGenesisDeployment.L2s[0].RegistryAddressList(),
					DependencySet: []uint64{genesis.GeneratedGenesisDeployment.L2s[1].ChainID},
				},
				StartingTimestamp: startingTimestamp,
			},
			{
				Name:          "OPChainB",
				ChainID:       genesis.GeneratedGenesisDeployment.L2s[1].ChainID,
				SecretsConfig: DefaultSecretsConfig,
				GenesisJSON:   genesis.GeneratedGenesisDeployment.L2s[1].GenesisJSON,
				L2Config: &L2Config{
					L1ChainID:     genesis.GeneratedGenesisDeployment.L1.ChainID,
					L1Addresses:   genesis.GeneratedGenesisDeployment.L2s[1].RegistryAddressList(),
					DependencySet: []uint64{genesis.GeneratedGenesisDeployment.L2s[0].ChainID},
				},
				StartingTimestamp: startingTimestamp,
			},
		},
	}
}

// Note: The default secrets config is used everywhere
func DefaultSecretsConfigAsString() string {
	hdAccountStore, err := hdaccount.NewHdAccountStore(DefaultSecretsConfig.Mnemonic, DefaultSecretsConfig.DerivationPath)
	if err != nil {
		panic(err)
	}

	var b strings.Builder

	fmt.Fprintf(&b, "\nAvailable Accounts\n")
	fmt.Fprintf(&b, "-----------------------\n")

	for i := range DefaultSecretsConfig.Accounts {
		addressHex, _ := hdAccountStore.AddressHexAt(uint32(i))
		fmt.Fprintf(&b, "(%d): %s\n", i, addressHex)
	}

	fmt.Fprintf(&b, "\nPrivate Keys\n")
	fmt.Fprintf(&b, "-----------------------\n")

	for i := range DefaultSecretsConfig.Accounts {
		privateKeyHex, _ := hdAccountStore.PrivateKeyHexAt(uint32(i))
		fmt.Fprintf(&b, "(%d): %s\n", i, privateKeyHex)
	}

	return b.String()
}
