package config

import (
	"context"
	"fmt"
	"strings"

	registry "github.com/ethereum-optimism/superchain-registry/superchain"
	"github.com/ethereum-optimism/supersim/genesis"
	"github.com/ethereum-optimism/supersim/hdaccount"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

var (
	DefaultSecretsConfig = SecretsConfig{
		Accounts:       10,
		Mnemonic:       "test test test test test test test test test test test junk",
		DerivationPath: accounts.DefaultRootDerivationPath,
	}

	DefaultNetworkConfig = NetworkConfig{
		L1Config: ChainConfig{
			Name:          "L1",
			ChainID:       genesis.GeneratedGenesisDeployment.L1.ChainID,
			SecretsConfig: DefaultSecretsConfig,
			GenesisJSON:   genesis.GeneratedGenesisDeployment.L1.GenesisJSON,
		},
		L2Configs: []ChainConfig{
			{
				Name:          "OPChainA",
				ChainID:       genesis.GeneratedGenesisDeployment.L2s[0].ChainID,
				SecretsConfig: DefaultSecretsConfig,
				GenesisJSON:   genesis.GeneratedGenesisDeployment.L2s[0].GenesisJSON,
				L2Config: &L2Config{
					L1ChainID:   genesis.GeneratedGenesisDeployment.L1.ChainID,
					L1Addresses: genesis.GeneratedGenesisDeployment.L2s[0].RegistryAddressList(),
				},
			},
			{
				Name:          "OPChainB",
				ChainID:       genesis.GeneratedGenesisDeployment.L2s[1].ChainID,
				SecretsConfig: DefaultSecretsConfig,
				GenesisJSON:   genesis.GeneratedGenesisDeployment.L2s[1].GenesisJSON,
				L2Config: &L2Config{
					L1ChainID:   genesis.GeneratedGenesisDeployment.L1.ChainID,
					L1Addresses: genesis.GeneratedGenesisDeployment.L2s[1].RegistryAddressList(),
				},
			},
		},
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
	L1ChainID   uint64
	L1Addresses *registry.AddressList
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
}

type NetworkConfig struct {
	L1Config ChainConfig

	L2StartingPort uint64
	L2Configs      []ChainConfig
}

type Chain interface {
	Name() string
	Endpoint() string
	ChainID() uint64
	LogPath() string
	Config() *ChainConfig

	// API methods
	EthGetCode(ctx context.Context, account common.Address) ([]byte, error)
	EthGetLogs(ctx context.Context, q ethereum.FilterQuery) ([]types.Log, error)
	EthSendTransaction(ctx context.Context, tx *types.Transaction) error

	SubscribeFilterLogs(ctx context.Context, q ethereum.FilterQuery, ch chan<- types.Log) (ethereum.Subscription, error)
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
