package config

import (
	"fmt"
	"strings"

	opservice "github.com/ethereum-optimism/optimism/op-service"

	registry "github.com/ethereum-optimism/superchain-registry/superchain"

	"github.com/urfave/cli/v2"
)

const (
	ForkCommandName = "fork"

	L1ForkHeightFlagName = "l1.fork.height"
	ChainsFlagName       = "chains"
	NetworkFlagName      = "network"
)

func ForkCLIFlags(envPrefix string) []cli.Flag {
	networks := strings.Join(superchainNetworks(), ", ")
	mainnetMembers := strings.Join(superchainMemberChains(registry.Superchains["mainnet"]), ", ")
	return []cli.Flag{
		&cli.Uint64Flag{
			Name:    L1ForkHeightFlagName,
			Usage:   "L1 height to fork the superchain (bounds L2 time). `0` for latest",
			Value:   0,
			EnvVars: opservice.PrefixEnvVar(envPrefix, "L1_FORK_HEIGHT"),
		},
		&cli.StringSliceFlag{
			Name:     ChainsFlagName,
			Usage:    fmt.Sprintf("chains to fork in the superchain, mainnet network: [%s]", mainnetMembers),
			Required: true,
			EnvVars:  opservice.PrefixEnvVar(envPrefix, "CHAINS"),
		},
		&cli.StringFlag{
			Name:    NetworkFlagName,
			Value:   "mainnet",
			Usage:   fmt.Sprintf("superchain network. options: %s", networks),
			EnvVars: opservice.PrefixEnvVar(envPrefix, "NETWORK"),
		},
	}
}

type ForkCLIConfig struct {
	L1ForkHeight uint64
	Network      string
	Chains       []string
}

type CLIConfig struct {
	ForkConfig *ForkCLIConfig
}

func ReadCLIConfig(ctx *cli.Context) (*CLIConfig, error) {
	cfg := &CLIConfig{}
	if ctx.Command.Name == ForkCommandName {
		cfg.ForkConfig = &ForkCLIConfig{
			L1ForkHeight: ctx.Uint64(L1ForkHeightFlagName),
			Network:      ctx.String(NetworkFlagName),
			Chains:       ctx.StringSlice(ChainsFlagName),
		}
	}

	return cfg, cfg.Check()
}

// Check runs validatation on the cli configuration
func (c *CLIConfig) Check() error {
	if c.ForkConfig != nil {
		forkCfg := c.ForkConfig
		superchain, ok := registry.Superchains[forkCfg.Network]
		if !ok {
			return fmt.Errorf("unrecognized superchain network `%s`, available networks: [%s]",
				forkCfg.Network, strings.Join(superchainNetworks(), ", "))
		}

		// ensure every chain is apart of the network
		for _, chain := range forkCfg.Chains {
			if !isInSuperchain(chain, superchain) {
				return fmt.Errorf("unrecognized chain `%s` in %s superchain, available chains: [%s]",
					chain, forkCfg.Network, strings.Join(superchainMemberChains(superchain), ", "))
			}
		}
	}

	return nil
}
