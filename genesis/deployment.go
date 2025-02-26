package genesis

import (
	_ "embed"
	"encoding/json"
	"fmt"

	"github.com/ethereum-optimism/optimism/op-chain-ops/genesis"
	"github.com/ethereum/go-ethereum/superchain"
)

type GenesisJson struct {
	Alloc map[string]Alloc `json:"alloc"`
}

type Alloc struct {
	Balance string            `json:"balance"`
	Code    string            `json:"code"`
	Nonce   string            `json:"nonce"`
	Storage map[string]string `json:"storage"`
}

/*******************
L1 Genesis files
*******************/
//go:embed generated/900-l1-genesis.json
var l1GenesisJSON []byte

/*******************
L2 Genesis files
*******************/
//go:embed generated/901-l2-genesis.json
var l2Genesis901JSON []byte

//go:embed generated/902-l2-genesis.json
var l2Genesis902JSON []byte

//go:embed generated/903-l2-genesis.json
var l2Genesis903JSON []byte

//go:embed generated/904-l2-genesis.json
var l2Genesis904JSON []byte

//go:embed generated/905-l2-genesis.json
var l2Genesis905JSON []byte

/*******************
L2 Addresses files
*******************/
//go:embed generated/901-l2-addresses.json
var addresses901JSON []byte

//go:embed generated/902-l2-addresses.json
var addresses902JSON []byte

//go:embed generated/903-l2-addresses.json
var addresses903JSON []byte

//go:embed generated/904-l2-addresses.json
var addresses904JSON []byte

//go:embed generated/905-l2-addresses.json
var addresses905JSON []byte

var GeneratedGenesisDeployment = &GenesisDeployment{
	L1: &L1GenesisDeployment{
		ChainID:     900,
		GenesisJSON: l1GenesisJSON,
	},
	L2s: []*L2GenesisDeployment{
		newL2GenesisDeployment(901, addresses901JSON, l2Genesis901JSON),
		newL2GenesisDeployment(902, addresses902JSON, l2Genesis902JSON),
		newL2GenesisDeployment(903, addresses903JSON, l2Genesis903JSON),
		newL2GenesisDeployment(904, addresses904JSON, l2Genesis904JSON),
		newL2GenesisDeployment(905, addresses905JSON, l2Genesis905JSON),
	},
}

type GenesisDeployment struct {
	L1  *L1GenesisDeployment
	L2s []*L2GenesisDeployment
}

type L1GenesisDeployment struct {
	ChainID     uint64
	GenesisJSON []byte
}

type L2GenesisDeployment struct {
	ChainID               uint64
	GenesisJSON           []byte
	L1DeploymentAddresses *genesis.L1Deployments
}

// Unassigned contracts -- Fault Proof, Plasma, SuperchainConfig, Roles
//
// NOTE: We use the superchain registry AddressList as the canonical format for superchain
// addresses. Any experimental contracts will be managed externally from this list. The registry
// and op-chain-ops L1Deployments type will be consolidated in the future as well.
//   - See: https://github.com/ethereum-optimism/optimism/blob/5be91416a3d017d3f8648140b3c41189b234ff6e/op-chain-ops/genesis/config.go#L693
func (d *L2GenesisDeployment) RegistryAddressList() *superchain.AddressesConfig {
	return &superchain.AddressesConfig{
		AddressManager:                    &d.L1DeploymentAddresses.AddressManager,
		L1CrossDomainMessengerProxy:       &d.L1DeploymentAddresses.L1CrossDomainMessengerProxy,
		L1ERC721BridgeProxy:               &d.L1DeploymentAddresses.L1ERC721BridgeProxy,
		L1StandardBridgeProxy:             &d.L1DeploymentAddresses.L1StandardBridgeProxy,
		L2OutputOracleProxy:               &d.L1DeploymentAddresses.L2OutputOracleProxy,
		OptimismMintableERC20FactoryProxy: &d.L1DeploymentAddresses.OptimismMintableERC20FactoryProxy,
		OptimismPortalProxy:               &d.L1DeploymentAddresses.OptimismPortalProxy,
		SystemConfigProxy:                 &d.L1DeploymentAddresses.SystemConfigProxy,
		ProxyAdmin:                        &d.L1DeploymentAddresses.ProxyAdmin,
	}
}

func newL2GenesisDeployment(l2ChainID uint64, l1DeploymentAddressesJSON []byte, l2GenesisJSON []byte) *L2GenesisDeployment {
	var l1DeploymentAddresses genesis.L1Deployments
	if err := json.Unmarshal(l1DeploymentAddressesJSON, &l1DeploymentAddresses); err != nil {
		panic(fmt.Sprintf("failed to unmarshal L1 deployment addresses: %v", err))
	}

	return &L2GenesisDeployment{
		ChainID:               l2ChainID,
		GenesisJSON:           l2GenesisJSON,
		L1DeploymentAddresses: &l1DeploymentAddresses,
	}
}

func UnMarshaledL2GenesisJSON() (*GenesisJson, error) {
	var genesis *GenesisJson
	err := json.Unmarshal(GeneratedGenesisDeployment.L2s[0].GenesisJSON, &genesis)
	if err != nil {
		return nil, fmt.Errorf("Failed to unmarshal allocs: %w", err)
	}

	return genesis, nil
}
