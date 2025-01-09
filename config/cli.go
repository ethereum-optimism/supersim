package config

import (
	"fmt"
	"os"
	"strings"

	opservice "github.com/ethereum-optimism/optimism/op-service"
	"github.com/pelletier/go-toml/v2"

	"net"
	"regexp"

	registry "github.com/ethereum-optimism/superchain-registry/superchain"

	"github.com/urfave/cli/v2"
)

const (
	ForkCommandName = "fork"
	DocsCommandName = "docs"

	AdminPortFlagName = "admin.port"

	L1ForkHeightFlagName = "l1.fork.height"
	L1PortFlagName       = "l1.port"
	L1HostFlagName       = "l1.host"

	ChainsFlagName         = "chains"
	NetworkFlagName        = "network"
	L2StartingPortFlagName = "l2.starting.port"
	L2HostFlagName         = "l2.host"

	LogsDirectoryFlagName = "logs.directory"

	InteropEnabledFlagName   = "interop.enabled"
	InteropAutoRelayFlagName = "interop.autorelay"
	InteropDelayFlagName     = "interop.delay"
)

var documentationLinks = []struct {
	url  string
	text string
}{
	{"https://specs.optimism.io/interop/overview.html", "Superchain Interop Specs"},
	{"https://docs.optimism.io/", "Optimism Documentation"},
	{"https://supersim.pages.dev/", "Supersim Documentation"},
}

func BaseCLIFlags(envPrefix string) []cli.Flag {
	return []cli.Flag{
		&cli.Uint64Flag{
			Name:    AdminPortFlagName,
			Usage:   "Listening port for the admin server",
			Value:   8420,
			EnvVars: opservice.PrefixEnvVar(envPrefix, "ADMIN_PORT"),
		},
		&cli.Uint64Flag{
			Name:    L1PortFlagName,
			Usage:   "Listening port for the L1 instance. `0` binds to any available port",
			Value:   8545,
			EnvVars: opservice.PrefixEnvVar(envPrefix, "L1_PORT"),
		},
		&cli.Uint64Flag{
			Name:    L2StartingPortFlagName,
			Usage:   "Starting port to increment from for L2 chains. `0` binds each chain to any available port",
			Value:   9545,
			EnvVars: opservice.PrefixEnvVar(envPrefix, "L2_STARTING_PORT"),
		},
		&cli.BoolFlag{
			Name:    InteropAutoRelayFlagName,
			Value:   false,
			Usage:   "Automatically relay messages sent to the L2ToL2CrossDomainMessenger using account 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
			EnvVars: opservice.PrefixEnvVar(envPrefix, "INTEROP_AUTORELAY"),
		},
		&cli.StringFlag{
			Name:    LogsDirectoryFlagName,
			Usage:   "Directory to store logs",
			Value:   "",
			EnvVars: opservice.PrefixEnvVar(envPrefix, "LOGS_DIRECTORY"),
		},
		&cli.StringFlag{
			Name:    L1HostFlagName,
			Usage:   "Host address for the L1 instance",
			Value:   "127.0.0.1",
			EnvVars: opservice.PrefixEnvVar(envPrefix, "L1_HOST"),
		},
		&cli.StringFlag{
			Name:    L2HostFlagName,
			Usage:   "Host address for L2 instances",
			Value:   "127.0.0.1",
			EnvVars: opservice.PrefixEnvVar(envPrefix, "L2_HOST"),
		},
		&cli.Uint64Flag{
			Name:    InteropDelayFlagName,
			Value:   0, // enabled by default
			Usage:   "Delay before relaying messages sent to the L2ToL2CrossDomainMessenger",
			EnvVars: opservice.PrefixEnvVar(envPrefix, "INTEROP_DELAY"),
		},
	}
}

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
			Usage:    fmt.Sprintf("chains to fork in the superchain, mainnet options: [%s]. In order to replace the public rpc endpoint for a chain, specify the ($%s_RPC_URL_<CHAIN>) env variable. i.e SUPERSIM_RPC_URL_OP=http://optimism-mainnet.infura.io/v3/<API-KEY>", mainnetMembers, envPrefix),
			Required: true,
			EnvVars:  opservice.PrefixEnvVar(envPrefix, "CHAINS"),
		},
		&cli.StringFlag{
			Name:    NetworkFlagName,
			Value:   "mainnet",
			Usage:   fmt.Sprintf("superchain network. options: %s. In order to replace the public rpc endpoint for the network, specify the ($%s_RPC_URL_<NETWORK>) env variable. i.e SUPERSIM_RPC_URL_MAINNET=http://mainnet.infura.io/v3/<API-KEY>", networks, envPrefix),
			EnvVars: opservice.PrefixEnvVar(envPrefix, "NETWORK"),
		},
		&cli.BoolFlag{
			Name:    InteropEnabledFlagName,
			Value:   true, // enabled by default
			Usage:   "enable interop predeploy and functionality",
			EnvVars: opservice.PrefixEnvVar(envPrefix, "INTEROP_ENABLED"),
		},
	}
}

type ForkCLIConfig struct {
	L1ForkHeight uint64   `toml:"l1_fork_height"`
	Network      string   `toml:"network"`
	Chains       []string `toml:"chains"`

	InteropEnabled bool `toml:"interop_enabled"`
}

type CLIConfig struct {
	AdminPort uint64 `toml:"admin_port"`

	L1Port         uint64 `toml:"l1_port"`
	L2StartingPort uint64 `toml:"l2_starting_port"`

	InteropAutoRelay bool   `toml:"interop_autorelay"`
	InteropDelay     uint64 `toml:"interop_delay"`

	LogsDirectory string `toml:"logs_directory"`

	ForkConfig *ForkCLIConfig `toml:"fork"`

	L1Host string `toml:"l1_host"`
	L2Host string `toml:"l2_host"`
}

func ReadCLIConfig(ctx *cli.Context) (*CLIConfig, error) {
	cfg := &CLIConfig{}

	if err := applyTOMLConfig(cfg); err != nil {
		return nil, err
	}

	// populateFromCLIContext(cfg, ctx)

	return cfg, cfg.Check()
}

// Check runs validatation on the cli configuration
func (c *CLIConfig) Check() error {
	if err := validateHost(c.L1Host); err != nil {
		return fmt.Errorf("invalid L1 host address: %w", err)
	}
	if err := validateHost(c.L2Host); err != nil {
		return fmt.Errorf("invalid L2 host address: %w", err)
	}

	if c.ForkConfig != nil {
		forkCfg := c.ForkConfig

		superchain, ok := registry.Superchains[forkCfg.Network]
		if !ok {
			return fmt.Errorf("unrecognized superchain network `%s`, available networks: [%s]",
				forkCfg.Network, strings.Join(superchainNetworks(), ", "))
		}

		if len(forkCfg.Chains) == 0 {
			return fmt.Errorf("no chains specified! available chains: [%s]", strings.Join(superchainMemberChains(superchain), ","))
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

func PrintDocLinks() {
	fmt.Printf("Here are the available documentation links:\n\n")

	for _, link := range documentationLinks {
		fmt.Printf("\033]8;;%s\033\\%s\033]8;;\033\\\n", link.url, link.text)
	}
}

func validateHost(host string) error {
	if host == "" {
		return fmt.Errorf("host cannot be empty")
	}

	if host == "localhost" || host == "127.0.0.1" {
		return nil
	}

	if ip := net.ParseIP(host); ip != nil {
		return nil
	}

	if matched, _ := regexp.MatchString(`^[a-zA-Z0-9][a-zA-Z0-9\-\.]+[a-zA-Z0-9]$`, host); !matched {
		return fmt.Errorf("invalid host format: %s", host)
	}

	return nil
}

func applyTOMLConfig(cfg *CLIConfig) error {
	tomlCfgFile := "config.toml"
	if _, err := os.Stat(tomlCfgFile); err == nil {
		content, err := os.ReadFile(tomlCfgFile)
		if err != nil {
			return fmt.Errorf("failed to read TOML config: %w", err)
		}

		if err := toml.Unmarshal(content, &cfg); err != nil {
			return fmt.Errorf("error parsing TOML: %v", err)
		}
	} else if !os.IsNotExist(err) {
		return fmt.Errorf("error checking TOML config file: %w", err)
	}

	return nil
}

// If toml config is set then

// func populateFromCLIContext(cfg *CLIConfig, ctx *cli.Context) {
// 	if cfg.AdminPort == 0 {
// 		cfg.AdminPort = ctx.Uint64(AdminPortFlagName)
// 	}
// 	if cfg.L1Port == 0 {
// 		cfg.L1Port = ctx.Uint64(L1PortFlagName)
// 	}
// 	if cfg.L2StartingPort == 0 {
// 		cfg.L2StartingPort = ctx.Uint64(L2StartingPortFlagName)
// 	}
// 	if !cfg.InteropAutoRelay {
// 		cfg.InteropAutoRelay = ctx.Bool(InteropAutoRelayFlagName)
// 	}
// 	if cfg.InteropDelay == 0 {
// 		cfg.InteropDelay = ctx.Uint64(InteropDelayFlagName)
// 	}
// 	if cfg.LogsDirectory == "" {
// 		cfg.LogsDirectory = ctx.String(LogsDirectoryFlagName)
// 	}
// 	if cfg.L1Host == "" {
// 		cfg.L1Host = ctx.String(L1HostFlagName)
// 	}
// 	if cfg.L2Host == "" {
// 		cfg.L2Host = ctx.String(L2HostFlagName)
// 	}

// 	if ctx.Command.Name == ForkCommandName {
// 		cfg.ForkConfig = &ForkCLIConfig{
// 			L1ForkHeight:   ctx.Uint64(L1ForkHeightFlagName),
// 			Network:        ctx.String(NetworkFlagName),
// 			Chains:         ctx.StringSlice(ChainsFlagName),
// 			InteropEnabled: ctx.Bool(InteropEnabledFlagName),
// 		}
// 	}
// }
