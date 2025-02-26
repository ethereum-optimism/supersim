package config

import (
	"github.com/ethereum-optimism/supersim/registry"
	"github.com/ethereum/go-ethereum/superchain"
)

func OPChainConfigByName(superchain *registry.RegistrySuperchain, identifier string) *superchain.ChainConfig {
	for _, chain := range superchain.Chains {
		if chain.Identifier == identifier {
			return chain.Config
		}
	}
	return nil
}

func superchainNetworks() []string {
	var networks []string
	for identifier := range registry.SuperchainsByIdentifier {
		networks = append(networks, identifier)
	}
	return networks
}

func superchainMemberChains(superchain *registry.RegistrySuperchain) []string {
	var chains []string
	for _, chain := range superchain.Chains {
		chains = append(chains, chain.Identifier)
	}
	return chains
}

func isInSuperchain(identifier string, superchain *registry.RegistrySuperchain) bool {
	for _, chain := range superchain.Chains {
		if chain.Identifier == identifier {
			return true
		}
	}
	return false
}
