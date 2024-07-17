package supersim

import (
	"fmt"
	"strings"
	"context"

	registry "github.com/ethereum-optimism/superchain-registry/superchain"

	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/orchestrator"

	"github.com/ethereum/go-ethereum/log"
)

type Supersim struct {
	log            log.Logger
	Orchestrator *orchestrator.Orchestrator
}

func NewSupersim(log log.Logger, cliConfig *config.CLIConfig) (*Supersim, error) {
	chainConfigs := config.DefaultChainConfigs
	if cliConfig.ForkConfig != nil {
		superchain := registry.Superchains[cliConfig.ForkConfig.Network]
		log.Info("generating fork configuration", "superchain", superchain.Superchain)

		var err error
		chainConfigs, err = orchestrator.ChainConfigsFromForkCLIConfig(cliConfig.ForkConfig)
		if err != nil {
			return nil, fmt.Errorf("failed to construct fork configuration: %w", err)
		}

		for _, chainCfg := range chainConfigs {
			var name string
			if chainCfg.ChainID == superchain.Config.L1.ChainID {
				name = superchain.Superchain
			} else {
				name = registry.OPChains[chainCfg.ChainID].Chain
			}

			log.Info("forked chain config", "name", name, "chain.id", chainCfg.ChainID, "fork.height", chainCfg.ForkConfig.BlockNumber)
		}
	}

	o, err := orchestrator.NewOrchestrator(log, chainConfigs)
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
