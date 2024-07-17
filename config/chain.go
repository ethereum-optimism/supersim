package config

import (
	"fmt"
	"context" 
	"strings"

	"github.com/ethereum-optimism/supersim/hdaccount"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum"
)

var (
	DefaultSecretsConfig = SecretsConfig{
		Accounts:       10,
		Mnemonic:       "test test test test test test test test test test test junk",
		DerivationPath: accounts.DefaultRootDerivationPath,
	}

	DefaultChainConfigs = []ChainConfig{
			{
				Name: "SourceChain",
				ChainID:        1,
				SecretsConfig: DefaultSecretsConfig,
			},
			{
				Name: "OPChainA",
				ChainID:        10,
				SourceChainID:  1,
				SecretsConfig: DefaultSecretsConfig,
			},
			{
				Name: "OPChainB",
				ChainID:        30,
				SourceChainID:  1,
				SecretsConfig: DefaultSecretsConfig,
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

type ChainConfig struct {
	Name string
	Port uint64

	ChainID       uint64
	SourceChainID uint64 // "L1"

	SecretsConfig SecretsConfig

	// Optional Config
	ForkConfig *ForkConfig
}

type Chain interface {
	Name() string
	Endpoint() string
	ChainID() uint64
	LogPath() string

	// API methods
	EthSendTransaction(ctx context.Context, tx *types.Transaction) error
	EthGetLogs(ctx context.Context, q ethereum.FilterQuery) ([]types.Log, error)
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
