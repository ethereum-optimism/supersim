package worldgen

import (
	"fmt"
	"math/big"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
)

// Supersim extends the devkeys package to add operator accounts for Supersim's dev operations
//
// Key identifies an account, and produces an HD-Path to derive the secret-key from.
//
// We organize the dev keys with a mnemonic key-path structure as following:
// BIP-44: `m / purpose' / coin_type' / account' / change / address_index`
// purpose = standard secp256k1 usage (Eth2 BLS keys use different purpose data).
// coin_type = chain type, set to 60' for ETH. See SLIP-0044.
// account = for different identities, used here to separate domains:
//
//	domain 0: users (defined in devkeys package)
//	domain 1: superchain operations (defined in devkeys package)
//	domain 2: chain operations (defined in devkeys package)
//  domain 3: supersim dev operations

// SupersimDevOperatorRole identifies an account for setup and admin tasks run by Supersim
// These roles don't exist in production OP-Stack chains
type SupersimDevOperatorRole uint64

const (
	// PeripheryContractsDeployerRole is the role of the account that deploys the periphery contracts to the L2
	PeripheryContractsDeployerRole = 0

	// AutoRelayerSenderRole is the sender of the interop.autorelayer transactions
	AutoRelayerSenderRole = 1
)

func (role SupersimDevOperatorRole) String() string {
	switch role {
	case PeripheryContractsDeployerRole:
		return "periphery-contracts-deployer"
	case AutoRelayerSenderRole:
		return "auto-relayer-sender"
	default:
		return fmt.Sprintf("unknown-operator-%d", uint64(role))
	}
}

func (role SupersimDevOperatorRole) Key(chainID *big.Int) devkeys.Key {
	return &SupersimDevOperatorKey{
		ChainID: chainID,
		Role:    role,
	}
}

// SupersimDevOperatorKey is an account specific to an OperationRole of a given OP-Stack chain.
type SupersimDevOperatorKey struct {
	ChainID *big.Int
	Role    SupersimDevOperatorRole
}

var _ devkeys.Key = SupersimDevOperatorKey{}

func (k SupersimDevOperatorKey) HDPath() string {
	return fmt.Sprintf("m/44'/60'/3'/%d/%d", k.ChainID, uint64(k.Role))
}

func (k SupersimDevOperatorKey) String() string {
	return fmt.Sprintf("chain(%d)-%s", k.ChainID, k.Role)
}

// SupersimDevOperatorKeys is a helper method to not repeat chainID on every operator role
func SupersimDevOperatorKeys(chainID *big.Int) func(SupersimDevOperatorRole) SupersimDevOperatorKey {
	return func(role SupersimDevOperatorRole) SupersimDevOperatorKey {
		return SupersimDevOperatorKey{ChainID: chainID, Role: role}
	}
}
