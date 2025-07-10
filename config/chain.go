package config

import (
	"context"
	"fmt"
	"math/big"
	"strings"
	"time"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	"github.com/ethereum-optimism/supersim/genesis"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/superchain"
)

const (
	DefaultL1BlockTime = 12
	DefaultL2BlockTime = 2
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
	L1ChainID       uint64
	L1Addresses     *superchain.AddressesConfig
	DependencySet   []uint64
	ProposerAddress common.Address
}

type ChainConfig struct {
	Name    string
	Host    string
	Port    uint64
	ChainID uint64

	BlockTime uint64

	GenesisJSON   []byte
	SecretsConfig SecretsConfig

	// Optional Config
	ForkConfig *ForkConfig

	// Optional Config (L1 chain if nil)
	L2Config *L2Config

	// Optional
	StartingTimestamp uint64

	// Optional
	LogsDirectory string

	// Optional
	OdysseyEnabled bool

	// Optional
	InteropL2ToL2CDMOverrideArtifactPath string

	// Optional - Dispute Game Factory address (L1 only)
	DisputeGameFactoryAddress *common.Address
}

type NetworkConfig struct {
	L1Config ChainConfig

	L2StartingPort uint64
	L2Configs      []ChainConfig

	// Signaled higher up as a way to generally
	// check if Interop is enabled
	InteropEnabled   bool
	InteropAutoRelay bool
	InteropDelay     uint64
}

type TraceCallResult struct {
	Type    string            `json:"type"`
	From    common.Address    `json:"from"`
	To      common.Address    `json:"to"`
	Value   *hexutil.Big      `json:"value"`
	Gas     hexutil.Uint64    `json:"gas"`
	GasUsed hexutil.Uint64    `json:"gasUsed"`
	Input   hexutil.Bytes     `json:"input"`
	Output  hexutil.Bytes     `json:"output"`
	Error   string            `json:"error"`
	Revert  string            `json:"revert"`
	Calls   []TraceCallResult `json:"calls"`
}

type Chain interface {
	// Properties
	Endpoint() string
	WSEndpoint() string
	LogPath() string
	Config() *ChainConfig
	EthClient() *ethclient.Client

	// Additional methods
	DebugTraceCall(ctx context.Context, tx *types.Transaction) (*TraceCallResult, error)
	SimulatedLogs(ctx context.Context, tx *types.Transaction) ([]types.Log, error)
	SetCode(ctx context.Context, result interface{}, address common.Address, code string) error
	SetStorageAt(ctx context.Context, result interface{}, address common.Address, storageSlot string, storageValue string) error
	SetBalance(ctx context.Context, result interface{}, address common.Address, value *big.Int) error
	SetIntervalMining(ctx context.Context, result interface{}, interval int64) error
	Mine(ctx context.Context, result interface{}) error

	// Lifecycle
	Start(ctx context.Context) error
	Stop(ctx context.Context) error
}

func GetNetworkConfig(cliConfig *CLIConfig) NetworkConfig {
	startingTimestamp := uint64(time.Now().Unix())
	nameSuffix := []string{"A", "B", "C", "D", "E"}

	cfg := NetworkConfig{
		// Enabled by default as it is included in genesis
		InteropEnabled: true,

		// Populated based on L2 count
		L2Configs: make([]ChainConfig, cliConfig.L2Count),

		L1Config: ChainConfig{
			Name:                      "Local",
			ChainID:                   genesis.GeneratedGenesisDeployment.L1.ChainID,
			BlockTime:                 DefaultL1BlockTime,
			SecretsConfig:             DefaultSecretsConfig,
			GenesisJSON:               genesis.GeneratedGenesisDeployment.L1.GenesisJSON,
			StartingTimestamp:         startingTimestamp,
			LogsDirectory:             cliConfig.LogsDirectory,
			DisputeGameFactoryAddress: genesis.GeneratedGenesisDeployment.L2s[0].RegistryAddressList().DisputeGameFactoryProxy,
		},
	}

	for i := uint64(0); i < cliConfig.L2Count; i++ {
		l2Cfg := ChainConfig{
			Name:              fmt.Sprintf("OPChain%s", nameSuffix[i]),
			ChainID:           genesis.GeneratedGenesisDeployment.L2s[i].ChainID,
			SecretsConfig:     DefaultSecretsConfig,
			GenesisJSON:       genesis.GeneratedGenesisDeployment.L2s[i].GenesisJSON,
			StartingTimestamp: startingTimestamp,
			LogsDirectory:     cliConfig.LogsDirectory,
			BlockTime:         DefaultL2BlockTime,
			L2Config: &L2Config{
				L1ChainID:       genesis.GeneratedGenesisDeployment.L1.ChainID,
				L1Addresses:     genesis.GeneratedGenesisDeployment.L2s[i].RegistryAddressList(),
				DependencySet:   []uint64{},
				ProposerAddress: generateDisputeGameProposerAddress(genesis.GeneratedGenesisDeployment.L2s[i].ChainID),
			},
			InteropL2ToL2CDMOverrideArtifactPath: cliConfig.InteropL2ToL2CDMOverrideArtifactPath,
		}

		// Configure bidirectional dependency sets
		l2Cfg.L2Config.DependencySet = configureDependencySet(cliConfig, l2Cfg.ChainID, i)

		cfg.L2Configs[i] = l2Cfg
	}

	return cfg
}

// Note: The default secrets config is used everywhere
func DefaultSecretsConfigAsString() string {
	keys, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	if err != nil {
		panic(err)
	}

	var b strings.Builder

	fmt.Fprintf(&b, "\nAvailable Accounts\n")
	fmt.Fprintf(&b, "-----------------------\n")

	for i := range DefaultSecretsConfig.Accounts {
		address, _ := keys.Address(devkeys.UserKey(i))
		fmt.Fprintf(&b, "(%d): %s\n", i, address.Hex())
	}

	fmt.Fprintf(&b, "\nPrivate Keys\n")
	fmt.Fprintf(&b, "-----------------------\n")

	for i := range DefaultSecretsConfig.Accounts {
		privateKey, _ := keys.Secret(devkeys.UserKey(i))
		fmt.Fprintf(&b, "(%d): %s\n", i, hexutil.Encode(crypto.FromECDSA(privateKey)))
	}

	return b.String()
}

// configures the dependency set for a given L2 chain based on CLI configuration
func configureDependencySet(cliConfig *CLIConfig, chainID uint64, chainIndex uint64) []uint64 {
	// Default behavior: all local chains can communicate with each other
	if cliConfig.DependencySet == nil {
		var dependencySet []uint64
		for j := uint64(0); j < cliConfig.L2Count; j++ {
			if chainIndex == j {
				// Skip self
				continue
			}

			peerChainID := genesis.GeneratedGenesisDeployment.L2s[j].ChainID
			dependencySet = append(dependencySet, peerChainID)
		}
		return dependencySet
	}

	// User provided --dependency.set - only chains in the dependency set can execute messages from other chains in the set
	dependencySet := make([]uint64, 0)
	chainInDependencySet := false

	for _, userChainID := range cliConfig.DependencySet {
		if userChainID == chainID {
			chainInDependencySet = true
		} else {
			dependencySet = append(dependencySet, userChainID)
		}
	}

	// If chain is not in dependency set, return empty slice (not nil)
	if !chainInDependencySet {
		return make([]uint64, 0)
	}

	return dependencySet
}

// GenerateDisputeGameProposerAddress generates a deterministic proposer address for an L2 chain
// This creates a unique address per chain for posting output roots to the dispute game factory
func GenerateDisputeGameProposerAddress(chainID uint64) common.Address {
	return generateDisputeGameProposerAddress(chainID)
}

// generates a deterministic proposer address for an L2 chain
// This creates a unique address per chain for posting output roots to the dispute game factory
func generateDisputeGameProposerAddress(chainID uint64) common.Address {
	// Create a deterministic seed based on chain ID and a constant
	seed := fmt.Sprintf("supersim-proposer-%d", chainID)
	hash := crypto.Keccak256Hash([]byte(seed))

	// Generate a private key from the hash
	privateKey, err := crypto.ToECDSA(hash[:])
	if err != nil {
		// Fallback to a simple deterministic address if key generation fails
		var addr common.Address
		copy(addr[:], hash[:20])
		return addr
	}

	// Derive the address from the private key
	return crypto.PubkeyToAddress(privateKey.PublicKey)
}
