package registry

import (
	"fmt"
	"path"
	"strings"

	"github.com/BurntSushi/toml"
	"github.com/ethereum/go-ethereum/superchain"
)

func init() {
	superchainTargets, err := superchainFS.ReadDir(superchainFSBasePath)
	if err != nil {
		panic(fmt.Errorf("failed to read superchain dir: %w", err))
	}
	// iterate over superchain-target entries
	for _, s := range superchainTargets {
		if !s.IsDir() {
			continue // ignore files, e.g. a readme
		}

		identifier := strings.TrimSuffix(s.Name(), ".toml")

		// Load superchain-target config
		superchainConfigData, err := superchainFS.ReadFile(path.Join(superchainFSBasePath, s.Name(), "superchain.toml"))
		if err != nil {
			panic(fmt.Errorf("failed to read superchain config: %w", err))
		}
		var superchainEntry superchain.Superchain

		if err := toml.Unmarshal(superchainConfigData, &superchainEntry); err != nil {
			panic(fmt.Errorf("failed to decode superchain config %s: %w", s.Name(), err))
		}

		// iterate over the chains of this superchain-target
		chainEntries, err := superchainFS.ReadDir(path.Join(superchainFSBasePath, s.Name()))
		if err != nil {
			panic(fmt.Errorf("failed to read superchain dir: %w", err))
		}

		registrySuperchain := RegistrySuperchain{
			Identifier: identifier,
			Config:     &superchainEntry,
			Chains:     []*RegistryChain{},
		}

		for _, c := range chainEntries {
			if !isConfigFile(c) {
				continue
			}

			chainIdentifier := strings.TrimSuffix(c.Name(), ".toml")
			// load chain config
			chainConfigData, err := superchainFS.ReadFile(path.Join(superchainFSBasePath, s.Name(), c.Name()))
			if err != nil {
				panic(fmt.Errorf("failed to read superchain config %s/%s: %w", s.Name(), c.Name(), err))
			}
			var chainConfig superchain.ChainConfig

			if err := toml.Unmarshal(chainConfigData, &chainConfig); err != nil {
				panic(fmt.Errorf("failed to decode chain config %s/%s: %w", s.Name(), c.Name(), err))
			}

			registryChain := RegistryChain{
				Identifier: chainIdentifier,
				Config:     &chainConfig,
			}

			registrySuperchain.Chains = append(registrySuperchain.Chains, &registryChain)

			ChainsByID[chainConfig.ChainID] = &registryChain
			AddressesByID[chainConfig.ChainID] = &chainConfig.Addresses
		}

		SuperchainsByIdentifier[identifier] = &registrySuperchain
	}
}
