package main

import (
	"context"
	"fmt"
	"os"

	"github.com/ethereum-optimism/supersim"

	"github.com/ethereum-optimism/optimism/op-service/cliapp"
	oplog "github.com/ethereum-optimism/optimism/op-service/log"
	"github.com/ethereum-optimism/optimism/op-service/opio"

	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/params"

	"github.com/urfave/cli/v2"
)

var (
	GitCommit    = ""
	GitDate      = ""
	EnvVarPrefix = "SUPERSIM"
)

func main() {
	oplog.SetupDefaults()

	app := cli.NewApp()
	app.Version = params.VersionWithCommit(GitCommit, GitDate)
	app.Name = "supersim"
	app.Usage = "Superchain Multi-L2 Simulator"
	app.Description = "Local multichain optimism development environment"
	app.Action = cliapp.LifecycleCmd(SupersimMain)

	logFlags := oplog.CLIFlags(EnvVarPrefix)
	supersimFlags := supersim.CLIFlags(EnvVarPrefix)
	app.Flags = append(logFlags, supersimFlags...)

	ctx := opio.WithInterruptBlocker(context.Background())
	if err := app.RunContext(ctx, os.Args); err != nil {
		log.Crit("Application Failed", "err", err)
	}
}

func SupersimMain(ctx *cli.Context, closeApp context.CancelCauseFunc) (cliapp.Lifecycle, error) {
	log := oplog.NewLogger(oplog.AppOut(ctx), oplog.ReadCLIConfig(ctx))

	_, err := supersim.ReadCLIConfig(ctx)
	if err != nil {
		return nil, fmt.Errorf("invalid cli config: %w", err)
	}

	// use config and setup supersim
	return supersim.NewSupersim(log, &supersim.DefaultConfig), nil
}
