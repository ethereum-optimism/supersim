package supersim

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	registry "github.com/ethereum-optimism/superchain-registry/superchain"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/orchestrator"

	"github.com/ethereum/go-ethereum/log"
)

type Supersim struct {
	log log.Logger

	CLIConfig     *config.CLIConfig
	NetworkConfig *config.NetworkConfig

	Orchestrator *orchestrator.Orchestrator
}

func NewSupersim(log log.Logger, envPrefix string, closeApp context.CancelCauseFunc, cliConfig *config.CLIConfig) (*Supersim, error) {
	networkConfig := config.GetDefaultNetworkConfig(uint64(time.Now().Unix()), cliConfig.LogsDirectory)

	// If Forking, override the network config with the generated fork config
	if cliConfig.ForkConfig != nil {
		superchain := registry.Superchains[cliConfig.ForkConfig.Network]
		log.Info("generating fork configuration", "superchain", superchain.Superchain)

		var err error
		networkConfig, err = orchestrator.NetworkConfigFromForkCLIConfig(log, envPrefix, cliConfig)
		if err != nil {
			return nil, fmt.Errorf("failed to construct fork configuration: %w", err)
		}

		l1ForkHeightStr := "latest"
		if cliConfig.ForkConfig.L1ForkHeight > 0 {
			l1ForkHeightStr = fmt.Sprintf("%d", cliConfig.ForkConfig.L1ForkHeight)
		}

		log.Info("forked l1 chain config", "name", superchain.Superchain, "chain.id", networkConfig.L1Config.ChainID, "fork.height", l1ForkHeightStr)
		for _, chainCfg := range networkConfig.L2Configs {
			name := registry.OPChains[chainCfg.ChainID].Chain
			log.Info("forked l2 chain config", "name", name, "chain.id", chainCfg.ChainID, "fork.height", chainCfg.ForkConfig.BlockNumber)
		}
	}

	// Forward set ports. Setting `0` will work to allocate a random port
	networkConfig.L1Config.Port = cliConfig.L1Port
	networkConfig.L2StartingPort = cliConfig.L2StartingPort

	// Forward interop config
	networkConfig.InteropAutoRelay = cliConfig.InteropAutoRelay

	o, err := orchestrator.NewOrchestrator(log, closeApp, &networkConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create orchestrator")
	}

	return &Supersim{log, cliConfig, &networkConfig, o}, nil
}

func (s *Supersim) Start(ctx context.Context) error {
	s.log.Info("starting supersim")
	if err := s.Orchestrator.Start(ctx); err != nil {
		return fmt.Errorf("orchestrator failed to start: %w", err)
	}

	s.log.Info("supersim is ready")
	s.log.Info(s.ConfigAsString())
	return nil
}

func (s *Supersim) Stop(ctx context.Context) error {
	s.log.Info("stopping supersim")
	if err := s.Orchestrator.Stop(ctx); err != nil {
		return fmt.Errorf("orchestrator failed to stop: %w", err)
	}

	s.log.Info("stopped supersim")
	return nil
}

// no-op dead code in the cliapp lifecycle
func (s *Supersim) Stopped() bool {
	return false
}

func (s *Supersim) ConfigAsString() string {
	var b strings.Builder
	fmt.Fprintln(&b, config.DefaultSecretsConfigAsString())
	fmt.Fprintln(&b, "Chain Configuration")
	fmt.Fprintln(&b, "-----------------------")
	fmt.Fprintln(&b, s.Orchestrator.ConfigAsString())

	// Vanilla mode or enabled in fork mode
	if s.NetworkConfig.InteropEnabled {
		fmt.Fprintln(&b, "(EXPERIMENTAL) Interop!")
		fmt.Fprintln(&b, "-----------------------")
		fmt.Fprintln(&b, "For more information see the explainer! ( https://docs.optimism.io/stack/protocol/interop/explainer )")
		fmt.Fprintln(&b, "\nAdded Predeploy Contracts:")
		fmt.Fprintf(&b, " - L2ToL2CrossDomainMessenger: %s\n", predeploys.L2toL2CrossDomainMessenger)
		fmt.Fprintf(&b, " - CrossL2Inbox:               %s\n", predeploys.CrossL2Inbox)
	}

	return b.String()
}
