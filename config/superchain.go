package config

import (
	registry "github.com/ethereum-optimism/superchain-registry/superchain"
)

func OPChainByName(superchain *registry.Superchain, name string) *registry.ChainConfig {
	for _, id := range superchain.ChainIDs {
		if registry.OPChains[id].Chain == name {
			return registry.OPChains[id]
		}
	}
	return nil
}

func superchainNetworks() []string {
	var networks []string
	for name := range registry.Superchains {
		networks = append(networks, name)
	}
	return networks
}

func superchainMemberChains(superchain *registry.Superchain) []string {
	var chains []string
	for _, id := range superchain.ChainIDs {
		chains = append(chains, registry.OPChains[id].Chain)
	}
	return chains
}

func isInSuperchain(name string, superchain *registry.Superchain) bool {
	for _, id := range superchain.ChainIDs {
		if registry.OPChains[id].Chain == name {
			return true
		}
	}
	return false
}
