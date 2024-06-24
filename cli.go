package supersim

import (
	opservice "github.com/ethereum-optimism/optimism/op-service"

	"github.com/urfave/cli/v2"
)

const (
	L1ForkHeightFlagName = "l1.fork.height"
)

func CLIFlags(envPrefix string) []cli.Flag {
	return []cli.Flag{
		&cli.UintFlag{
			Name:    L1ForkHeightFlagName,
			Usage:   "L1 height to fork the superchain",
			EnvVars: opservice.PrefixEnvVar(envPrefix, "L1_FORK_HEIGHT"),
		},
	}
}

type CLIConfig struct {
	L1ForkHeight uint
}

func ReadCLIConfig(ctx *cli.Context) (*CLIConfig, error) {
	cfg := CLIConfig{
		L1ForkHeight: ctx.Uint(L1ForkHeightFlagName),
	}

	return &cfg, cfg.Check()
}

// Check runs validatation on the cli configuration
func (c *CLIConfig) Check() error {
	return nil
}
