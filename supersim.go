package supersim

import (
	_ "embed"
	"fmt"

	"context"

	"github.com/ethereum-optimism/supersim/anvil"

	"github.com/ethereum/go-ethereum/log"
)

type Config struct {
	l1Chain  anvil.Config
	l2Chains []anvil.Config
}

//go:embed genesis/genesis-l1.json
var genesisL1JSON []byte

//go:embed genesis/genesis-l2.json
var genesisL2JSON []byte

var DefaultConfig = Config{
	l1Chain: anvil.Config{ChainId: 1, Port: 8545, Genesis: genesisL1JSON},
	l2Chains: []anvil.Config{
		{ChainId: 10, Port: 9545, Genesis: genesisL2JSON},
		{ChainId: 30, Port: 9555, Genesis: genesisL2JSON},
	},
}

type Supersim struct {
	log log.Logger

	l1Chain  *anvil.Anvil
	l2Chains map[uint64]*anvil.Anvil
}

func NewSupersim(log log.Logger, config *Config) *Supersim {
	l1Chain := anvil.New(log, &config.l1Chain)

	l2Chains := make(map[uint64]*anvil.Anvil)
	for _, l2Chain := range config.l2Chains {
		l2Chains[l2Chain.ChainId] = anvil.New(log, &l2Chain)
	}

	return &Supersim{log, l1Chain, l2Chains}
}

func (s *Supersim) Start(ctx context.Context) error {
	s.log.Info("starting supersim")

	if err := s.l1Chain.Start(ctx); err != nil {
		return fmt.Errorf("l1 chain failed to start: %w", err)
	}

	for _, l2Chain := range s.l2Chains {
		if err := l2Chain.Start(ctx); err != nil {
			return fmt.Errorf("l2 chain failed to start: %w", err)
		}
	}

	return nil
}

func (s *Supersim) Stop(_ context.Context) error {
	s.log.Info("stopping supersim")

	for _, l2Chain := range s.l2Chains {
		if err := l2Chain.Stop(); err != nil {
			return fmt.Errorf("l2 chain failed to stop: %w", err)
		}
	}

	if err := s.l1Chain.Stop(); err != nil {
		return fmt.Errorf("l1 chain failed to stop: %w", err)
	}

	return nil
}

func (s *Supersim) Stopped() bool {
	return s.l1Chain.Stopped()
}
