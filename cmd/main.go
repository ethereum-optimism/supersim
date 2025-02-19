package main

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"os/exec"
	"regexp"
	"time"

	"github.com/ethereum-optimism/supersim"
	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum-optimism/optimism/op-service/cliapp"
	"github.com/ethereum-optimism/optimism/op-service/ctxinterrupt"
	oplog "github.com/ethereum-optimism/optimism/op-service/log"

	"github.com/ethereum/go-ethereum/log"

	"github.com/joho/godotenv"
	"github.com/urfave/cli/v2"
)

var (
	version = "dev"
	commit  = "none"
	date    = "unknown"
)

var (
	envVarPrefix = "SUPERSIM"
)

const (
	minAnvilTimestamp = "2024-09-01T00:20:02.123144000Z"
)

func main() {
	// Load the .env file
	err := godotenv.Load()
	if err != nil {
		log.Warn("Error loading .env file", "err", err)
	}

	oplog.SetupDefaults()
	logFlags := oplog.CLIFlags(envVarPrefix)

	app := cli.NewApp()
	app.Version = formatVersion()
	app.Name = "supersim"
	app.Usage = "Superchain Multi-L2 Simulator"
	app.Description = "Local multichain optimism development environment"
	app.Action = cliapp.LifecycleCmd(SupersimMain)

	baseFlags := append(config.BaseCLIFlags(envVarPrefix), logFlags...)

	// Vanilla mode has no specific flags for now
	app.Flags = baseFlags

	// Subcommands
	app.Commands = []*cli.Command{
		{
			Name:   config.ForkCommandName,
			Usage:  "Locally fork a network in the superchain registry",
			Flags:  append(config.ForkCLIFlags(envVarPrefix), baseFlags...),
			Action: cliapp.LifecycleCmd(SupersimMain),
		},
		{
			Name:   config.DocsCommandName,
			Usage:  "Display available docs links",
			Action: cliapp.LifecycleCmd(SupersimMain),
		},
	}

	ctx := ctxinterrupt.WithSignalWaiterMain(context.Background())
	if err := app.RunContext(ctx, os.Args); err != nil {
		log.Crit("Application Failed", "err", err)
	}
}

func SupersimMain(ctx *cli.Context, closeApp context.CancelCauseFunc) (cliapp.Lifecycle, error) {
	log := oplog.NewLogger(oplog.AppOut(ctx), oplog.ReadCLIConfig(ctx))
	ok, minAnvilErr := isMinAnvilInstalled()
	if !ok {
		return nil, fmt.Errorf("anvil version timestamp of %s or higher is required, please use foundryup to update to the latest version.", minAnvilTimestamp)
	}
	if minAnvilErr != nil {
		return nil, fmt.Errorf("error determining installed anvil version: %w.", minAnvilErr)
	}

	cfg, err := config.ReadCLIConfig(ctx)
	if err != nil {
		return nil, fmt.Errorf("invalid cli config: %w", err)
	}

	if ctx.Command.Name == config.DocsCommandName {
		config.PrintDocLinks()
		closeApp(nil)
		os.Exit(0)
	}

	// use config and setup supersim
	s, err := supersim.NewSupersim(log, envVarPrefix, closeApp, cfg)
	if err != nil {
		return nil, fmt.Errorf("failed to create supersim: %w", err)
	}

	return s, nil
}

func isMinAnvilInstalled() (bool, error) {
	cmd := exec.Command("anvil", "--version")
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		return false, err
	}

	output := out.String()

	// anvil does not use semver until 1.0.0 is released so using timestamp to determine version.
	timestampRegex := regexp.MustCompile(`\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z`)
	timestamp := timestampRegex.FindString(output)
	if timestamp == "" {
		return false, fmt.Errorf("failed to parse anvil timestamp from anvil --version")
	}

	ok, dateErr := isTimestampGreaterOrEqual(timestamp, minAnvilTimestamp)
	if dateErr != nil {
		return false, dateErr
	}

	return ok, nil
}

// compares two timestamps in the format "YYYY-MM-DDTHH:MM:SS.sssZ".
func isTimestampGreaterOrEqual(timestamp, minTimestamp string) (bool, error) {
	parsedTimestamp, err := time.Parse(time.RFC3339Nano, timestamp)
	if err != nil {
		return false, fmt.Errorf("Error parsing timestamp: %w", err)
	}

	parsedMinTimestamp, err := time.Parse(time.RFC3339Nano, minTimestamp)
	if err != nil {
		return false, fmt.Errorf("Error parsing minimum required timestamp: %w", err)
	}

	return !parsedTimestamp.Before(parsedMinTimestamp), nil
}

func formatVersion() string {
	result := version
	if commit != "none" {
		result += fmt.Sprintf(" (%s)", commit)
	}
	if date != "unknown" {
		result += fmt.Sprintf(" built at %s", date)
	}
	return result
}
