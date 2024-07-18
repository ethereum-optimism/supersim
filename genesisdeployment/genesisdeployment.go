package genesisdeployment

import (
	_ "embed"
	"encoding/json"
	"fmt"

	"github.com/ethereum-optimism/optimism/op-chain-ops/genesis"
)

/*******************
L1 Genesis files
*******************/
//go:embed generated/l1-genesis.json
var l1GenesisJSON []byte

/*******************
L2 Genesis files
*******************/
//go:embed generated/l2-genesis/901-l2-genesis.json
var l2Genesis901JSON []byte

//go:embed generated/l2-genesis/902-l2-genesis.json
var l2Genesis902JSON []byte

//go:embed generated/l2-genesis/903-l2-genesis.json
var l2Genesis903JSON []byte

//go:embed generated/l2-genesis/904-l2-genesis.json
var l2Genesis904JSON []byte

//go:embed generated/l2-genesis/905-l2-genesis.json
var l2Genesis905JSON []byte

/*******************
L2 Addresses files
*******************/
//go:embed generated/addresses/901-addresses.json
var addresses901JSON []byte

//go:embed generated/addresses/902-addresses.json
var addresses902JSON []byte

//go:embed generated/addresses/903-addresses.json
var addresses903JSON []byte

//go:embed generated/addresses/904-addresses.json
var addresses904JSON []byte

//go:embed generated/addresses/905-addresses.json
var addresses905JSON []byte

type L1GenesisDeployment struct {
	ChainID     uint64
	GenesisJSON []byte
}

type L2GenesisDeployment struct {
	ChainID               uint64
	GenesisJSON           []byte
	L1DeploymentAddresses *genesis.L1Deployments
}

func newL2GenesisDeployment(l2ChainID uint64, l1DeploymentAddressesJSON []byte, l2GenesisJSON []byte) *L2GenesisDeployment {
	var l1DeploymentAddresses genesis.L1Deployments
	if err := json.Unmarshal(l1DeploymentAddressesJSON, &l1DeploymentAddresses); err != nil {
		panic(fmt.Sprintf("failed to unmarshal L1 deployment addresses: %v", err))
	}

	return &L2GenesisDeployment{
		ChainID:               l2ChainID,
		L1DeploymentAddresses: &l1DeploymentAddresses,
		GenesisJSON:           l2GenesisJSON,
	}
}

type GenesisDeployment struct {
	L1  *L1GenesisDeployment
	L2s []*L2GenesisDeployment
}

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
