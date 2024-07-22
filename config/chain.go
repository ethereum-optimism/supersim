package config

import (
	"context"
	"fmt"
	"math/big"
	"strings"

	registry "github.com/ethereum-optimism/superchain-registry/superchain"
	"github.com/ethereum-optimism/supersim/genesis"
	"github.com/ethereum-optimism/supersim/hdaccount"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
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
					L1ChainID:     genesis.GeneratedGenesisDeployment.L1.ChainID,
					L1Addresses:   genesis.GeneratedGenesisDeployment.L2s[0].RegistryAddressList(),
					DependencySet: []uint64{genesis.GeneratedGenesisDeployment.L2s[1].ChainID},
				},
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
}

type NetworkConfig struct {
	L1Config ChainConfig

	L2StartingPort uint64
	L2Configs      []ChainConfig
}

type TransactionArgs struct {
	From     common.Address  `json:"from"`
	To       *common.Address `json:"to"`
	Gas      hexutil.Uint64  `json:"gas"`
	GasPrice *hexutil.Big    `json:"gasPrice"`
	Data     hexutil.Bytes   `json:"data"`
	Value    *hexutil.Big    `json:"value"`
}

type TraceCallRaw struct {
	Error   *string            `json:"error,omitempty"`
	Type    string             `json:"type"`
	From    string             `json:"from"`
	To      string             `json:"to"`
	Value   string             `json:"value"`
	Gas     string             `json:"gas"`
	GasUsed string             `json:"gasUsed"`
	Input   string             `json:"input"`
	Output  string             `json:"output"`
	Logs    []*TraceCallRawLog `json:"logs"`
	Calls   []TraceCallRaw     `json:"calls"`
}

type TraceCallRawLog struct {
	Address common.Address `json:"address"`
	Topics  []common.Hash  `json:"topics"`
	Data    string         `json:"data"`
}

type Chain interface {
	Name() string
	Endpoint() string
	ChainID() uint64
	LogPath() string
	Config() *ChainConfig
	EthClient() *ethclient.Client

	// TODO: Delete these and use EthClient directly
	// API methods
	EthGetCode(ctx context.Context, account common.Address) ([]byte, error)
	EthGetLogs(ctx context.Context, q ethereum.FilterQuery) ([]types.Log, error)
	EthSendTransaction(ctx context.Context, tx *types.Transaction) error
	EthBlockByNumber(ctx context.Context, blockHeight *big.Int) (*types.Block, error)

	SubscribeFilterLogs(ctx context.Context, q ethereum.FilterQuery, ch chan<- types.Log) (ethereum.Subscription, error)
	DebugTraceCall(ctx context.Context, txArgs TransactionArgs) (TraceCallRaw, error)
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
