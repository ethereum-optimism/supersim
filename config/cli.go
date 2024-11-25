package config

import (
	"fmt"
	"strings"

	opservice "github.com/ethereum-optimism/optimism/op-service"

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
	L1ForkHeight uint64
	Network      string
	Chains       []string

	InteropEnabled bool
}

type CLIConfig struct {
	AdminPort uint64

	L1Port         uint64
	L2StartingPort uint64

	InteropAutoRelay bool
	InteropDelay     uint64

	LogsDirectory string

	ForkConfig *ForkCLIConfig

	L1Host string
	L2Host string
}

func ReadCLIConfig(ctx *cli.Context) (*CLIConfig, error) {
	cfg := &CLIConfig{
		AdminPort: ctx.Uint64(AdminPortFlagName),

		L1Port:         ctx.Uint64(L1PortFlagName),
		L2StartingPort: ctx.Uint64(L2StartingPortFlagName),

		InteropAutoRelay: ctx.Bool(InteropAutoRelayFlagName),
		InteropDelay:     ctx.Uint64(InteropDelayFlagName),

		LogsDirectory: ctx.String(LogsDirectoryFlagName),

		L1Host: ctx.String(L1HostFlagName),
		L2Host: ctx.String(L2HostFlagName),
	}

	if ctx.Command.Name == ForkCommandName {
		cfg.ForkConfig = &ForkCLIConfig{
			L1ForkHeight: ctx.Uint64(L1ForkHeightFlagName),
			Network:      ctx.String(NetworkFlagName),
			Chains:       ctx.StringSlice(ChainsFlagName),

			InteropEnabled: ctx.Bool(InteropEnabledFlagName),
		}
	}

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
