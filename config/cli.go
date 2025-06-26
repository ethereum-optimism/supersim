package config

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"

	opservice "github.com/ethereum-optimism/optimism/op-service"

	"net"

	"github.com/ethereum-optimism/supersim/genesis"
	"github.com/ethereum-optimism/supersim/registry"

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
	L2CountFlagName        = "l2.count"

	LogsDirectoryFlagName = "logs.directory"

	InteropEnabledFlagName               = "interop.enabled"
	InteropAutoRelayFlagName             = "interop.autorelay"
	InteropDelayFlagName                 = "interop.delay"
	InteropL2ToL2CDMOverrideArtifactPath = "interop.l2tol2cdm.override"

	OdysseyEnabledFlagName = "odyssey.enabled"

	DependencySetFlagName = "dependency.set"

	MaxL2Count = 5
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
		&cli.StringFlag{
			Name:    InteropL2ToL2CDMOverrideArtifactPath,
			Usage:   "Path to the L2ToL2CrossDomainMessenger build artifact that overrides the default implementation",
			Value:   "",
			EnvVars: opservice.PrefixEnvVar(envPrefix, "INTEROP_L2TO2CDM_OVERRIDE"),
		},
		&cli.Uint64Flag{
			Name:    L1PortFlagName,
			Usage:   "Listening port for the L1 instance. `0` binds to any available port",
			Value:   8545,
			EnvVars: opservice.PrefixEnvVar(envPrefix, "L1_PORT"),
		},
		&cli.Uint64Flag{
			Name:    L2CountFlagName,
			Usage:   fmt.Sprintf("Number of L2s. Max of %d", MaxL2Count),
			Value:   2,
			EnvVars: opservice.PrefixEnvVar(envPrefix, "L2_COUNT"),
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
		&cli.BoolFlag{
			Name:    OdysseyEnabledFlagName,
			Value:   false, // disabled by default
			Usage:   "Enable odyssey experimental features",
			EnvVars: opservice.PrefixEnvVar(envPrefix, "ODYSSEY_ENABLED"),
		},
		&cli.StringFlag{
			Name:    DependencySetFlagName,
			Usage:   "Override local chain IDs in the dependency set.(format: '[901,902]' or '[]')",
			EnvVars: opservice.PrefixEnvVar(envPrefix, "DEPENDENCY_SET"),
		},
	}
}

func ForkCLIFlags(envPrefix string) []cli.Flag {
	networks := strings.Join(superchainNetworks(), ", ")
	mainnetMembers := strings.Join(superchainMemberChains(registry.SuperchainsByIdentifier["mainnet"]), ", ")
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
	OdysseyEnabled bool
}

type CLIConfig struct {
	AdminPort uint64

	L1Port uint64

	L2StartingPort uint64
	L2Count        uint64

	InteropAutoRelay                     bool
	InteropDelay                         uint64
	InteropL2ToL2CDMOverrideArtifactPath string

	OdysseyEnabled bool

	LogsDirectory string

	ForkConfig *ForkCLIConfig

	L1Host string
	L2Host string

	DependencySet []uint64
}

func ReadCLIConfig(ctx *cli.Context) (*CLIConfig, error) {
	cfg := &CLIConfig{
		AdminPort: ctx.Uint64(AdminPortFlagName),

		L1Port: ctx.Uint64(L1PortFlagName),
		L1Host: ctx.String(L1HostFlagName),

		L2StartingPort: ctx.Uint64(L2StartingPortFlagName),
		L2Count:        ctx.Uint64(L2CountFlagName),
		L2Host:         ctx.String(L2HostFlagName),

		InteropAutoRelay:                     ctx.Bool(InteropAutoRelayFlagName),
		InteropDelay:                         ctx.Uint64(InteropDelayFlagName),
		InteropL2ToL2CDMOverrideArtifactPath: ctx.String(InteropL2ToL2CDMOverrideArtifactPath),

		LogsDirectory: ctx.String(LogsDirectoryFlagName),

		OdysseyEnabled: ctx.Bool(OdysseyEnabledFlagName),

		DependencySet: nil, // nil means no flag provided
	}

	if ctx.Command.Name == ForkCommandName {
		cfg.ForkConfig = &ForkCLIConfig{
			L1ForkHeight: ctx.Uint64(L1ForkHeightFlagName),
			Network:      ctx.String(NetworkFlagName),
			Chains:       ctx.StringSlice(ChainsFlagName),

			InteropEnabled: ctx.Bool(InteropEnabledFlagName),
			OdysseyEnabled: ctx.Bool(OdysseyEnabledFlagName),
		}
	}

	// Parse dependency set once during config reading
	dependencySetString := ctx.String(DependencySetFlagName)
	if len(dependencySetString) > 0 {
		parsedDeps, err := ParseDependencySet(dependencySetString)
		if err != nil {
			return nil, fmt.Errorf("failed to parse dependency set: %w", err)
		}
		cfg.DependencySet = parsedDeps
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

	if c.L2Count == 0 || c.L2Count > MaxL2Count {
		return fmt.Errorf("min 1, max %d L2 chains", MaxL2Count)
	}

	// Validate bidirectional dependency set requirements
	if c.DependencySet != nil {
		if err := c.validateBidirectionalDependencySet(); err != nil {
			return err
		}
	}

	if c.ForkConfig != nil {
		forkCfg := c.ForkConfig

		superchain, ok := registry.SuperchainsByIdentifier[forkCfg.Network]
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

func (c *CLIConfig) validateBidirectionalDependencySet() error {
	if len(c.DependencySet) == 0 {
		return nil // Empty dependency set is always valid
	}

	// Dependency sets must contain at least 2 chains to be bidirectional
	if len(c.DependencySet) < 2 {
		return fmt.Errorf("dependency set must contain at least 2 chains to be bidirectional, got %v", c.DependencySet)
	}

	// Get the chain IDs that will actually be running locally
	localChainIDs, err := c.getLocalChainIDsMap()
	if err != nil {
		return fmt.Errorf("failed to get local chain IDs: %w", err)
	}

	// Validate that all chain IDs in the dependency set correspond to chains being run locally
	for _, chainID := range c.DependencySet {
		if !localChainIDs[chainID] {
			var availableChains []uint64
			for chainID := range localChainIDs {
				availableChains = append(availableChains, chainID)
			}
			return fmt.Errorf("chain ID %d in dependency set is not running locally (available chains: %v)", chainID, availableChains)
		}
	}

	return nil
}

// Returns a map of chain IDs that will be running locally
func (c *CLIConfig) getLocalChainIDsMap() (map[uint64]bool, error) {
	// Local mode: get chain IDs from generated genesis deployment
	if c.ForkConfig == nil {
		localChainIDs := make(map[uint64]bool)
		for i := uint64(0); i < c.L2Count; i++ {
			localChainIDs[genesis.GeneratedGenesisDeployment.L2s[i].ChainID] = true
		}
		return localChainIDs, nil
	}

	// Fork mode: get chain IDs from superchain configuration
	superchain, ok := registry.SuperchainsByIdentifier[c.ForkConfig.Network]
	if !ok {
		return nil, fmt.Errorf("unrecognized superchain network `%s`", c.ForkConfig.Network)
	}

	localChainIDs := make(map[uint64]bool)
	for _, chainName := range c.ForkConfig.Chains {
		chainCfg := OPChainConfigByName(superchain, chainName)
		if chainCfg == nil {
			return nil, fmt.Errorf("unrecognized chain %s in %s superchain", chainName, c.ForkConfig.Network)
		}
		localChainIDs[chainCfg.ChainID] = true
	}
	return localChainIDs, nil
}

// getLocalChainIDs returns the chain IDs that will be running locally for the given L2 count
func getLocalChainIDs(l2Count uint64) []uint64 {
	chainIDs := make([]uint64, l2Count)
	for i := uint64(0); i < l2Count; i++ {
		chainIDs[i] = genesis.GeneratedGenesisDeployment.L2s[i].ChainID
	}
	return chainIDs
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

func ParseDependencySet(dependencySet string) ([]uint64, error) {
	if dependencySet == "" {
		return nil, fmt.Errorf("dependency set cannot be empty string: use '[]' for empty dependency set")
	}

	dependencySet = strings.TrimSpace(dependencySet)

	// Validate format: must be in square brackets [1,2,3] or empty []
	emptyPattern := `^\[\s*\]$`
	bracketPattern := `^\[\s*\d+(\s*,\s*\d+)*\s*\]$`

	emptyMatch, _ := regexp.MatchString(emptyPattern, dependencySet)
	bracketMatch, _ := regexp.MatchString(bracketPattern, dependencySet)

	if !emptyMatch && !bracketMatch {
		return nil, fmt.Errorf("invalid dependency set format: expected '[1,2,3]' or '[]', got '%s'", dependencySet)
	}

	// Handle empty array case
	if emptyMatch {
		return []uint64{}, nil
	}

	// Extract numbers - regex \d+ only matches positive integers
	re := regexp.MustCompile(`\d+`)
	matches := re.FindAllString(dependencySet, -1)

	result := make([]uint64, 0, len(matches))
	for _, match := range matches {
		num, err := strconv.ParseUint(match, 10, 64)
		if err != nil {
			return nil, fmt.Errorf("invalid positive number in dependency set: %s", match)
		}

		if num == 0 {
			return nil, fmt.Errorf("chain ID 0 is not allowed in dependency set")
		}

		result = append(result, num)
	}

	return result, nil
}
