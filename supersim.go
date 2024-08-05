package supersim

import (
	"context"
	"fmt"
	"strings"

	registry "github.com/ethereum-optimism/superchain-registry/superchain"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/orchestrator"

	"github.com/ethereum/go-ethereum/log"
)

type Supersim struct {
	log          log.Logger
	Orchestrator *orchestrator.Orchestrator
}

func NewSupersim(log log.Logger, envPrefix string, cliConfig *config.CLIConfig) (*Supersim, error) {
	networkConfig := config.DefaultNetworkConfig
	if cliConfig.ForkConfig != nil {
		superchain := registry.Superchains[cliConfig.ForkConfig.Network]
		log.Info("generating fork configuration", "superchain", superchain.Superchain)

		var err error
		networkConfig, err = orchestrator.NetworkConfigFromForkCLIConfig(log, envPrefix, cliConfig.ForkConfig)
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

	o, err := orchestrator.NewOrchestrator(log, &networkConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create orchestrator")
	}

	return &Supersim{log, o}, nil
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

func (s *Supersim) Stopped() bool {
	return s.Orchestrator.Stopped()
}

func (s *Supersim) ConfigAsString() string {
	var b strings.Builder
	fmt.Fprint(&b, config.DefaultSecretsConfigAsString())

	fmt.Fprintf(&b, "\nOrchestrator Config:\n")
	fmt.Fprint(&b, s.Orchestrator.ConfigAsString())

	return b.String()
}
