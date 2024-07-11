package supersim

import (
	"fmt"
	"strings"

	"context"

	"github.com/ethereum-optimism/supersim/orchestrator"

	"github.com/ethereum/go-ethereum/log"
)

type Config struct {
	orchestratorConfig orchestrator.OrchestratorConfig
}

var DefaultConfig = Config{
	orchestratorConfig: orchestrator.OrchestratorConfig{
		ChainConfigs: []orchestrator.ChainConfig{
			{ChainID: 1, Port: 0},
			{ChainID: 10, SourceChainID: 1, Port: 0},
			{ChainID: 30, SourceChainID: 1, Port: 0},
		},
	},
}

type Supersim struct {
	log log.Logger

	Orchestrator *orchestrator.Orchestrator
}

func NewSupersim(log log.Logger, config *Config) (*Supersim, error) {
	o, err := orchestrator.NewOrchestrator(log, &DefaultConfig.orchestratorConfig)
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

	return nil
}

func (s *Supersim) Stopped() bool {
	return s.Orchestrator.Stopped()
}

func (s *Supersim) ConfigAsString() string {
	var b strings.Builder

	fmt.Fprintf(&b, "\nSupersim Config:\n")
	fmt.Fprint(&b, s.Orchestrator.ConfigAsString())

	return b.String()
}
