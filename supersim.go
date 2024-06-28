package supersim

import (
	_ "embed"
	"fmt"
	"strings"
	"sync"
	"time"

	"context"

	"github.com/ethereum-optimism/supersim/anvil"
	"github.com/ethereum-optimism/supersim/utils"

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
	for _, l2ChainConfig := range config.l2Chains {
		l2Chains[l2ChainConfig.ChainId] = anvil.New(log, &l2ChainConfig)
	}

	return &Supersim{log, l1Chain, l2Chains}
}

func (s *Supersim) Start(ctx context.Context) error {
	s.log.Info("starting supersim")

	if err := s.l1Chain.Start(ctx); err != nil {
		return fmt.Errorf("l1 chain failed to start: %w", err)
	}

	var wg sync.WaitGroup
	waitForAnvil := func(anvil *anvil.Anvil) {
		defer wg.Done()
		wg.Add(1)
		utils.WaitForAnvilEndpointToBeReady(anvil.Endpoint(), 10*time.Second)
	}

	go waitForAnvil(s.l1Chain)

	for _, l2Chain := range s.l2Chains {
		if err := l2Chain.Start(ctx); err != nil {
			return fmt.Errorf("l2 chain failed to start: %w", err)
		}
		go waitForAnvil(l2Chain)
	}

	wg.Wait()

	s.log.Info("Supersim is ready")
	s.log.Info(s.ConfigAsString())

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

func (s *Supersim) ConfigAsString() string {
	var b strings.Builder

	fmt.Fprintf(&b, "\nSupersim Config:\n")
	fmt.Fprintf(&b, "L1:\n")
	fmt.Fprintf(&b, "  Chain ID: %d    RPC: %s\n", s.l1Chain.ChainId(), s.l1Chain.Endpoint())

	fmt.Fprintf(&b, "L2:\n")
	for _, l2Chain := range s.l2Chains {
		fmt.Fprintf(&b, "  Chain ID: %d    RPC: %s\n", l2Chain.ChainId(), l2Chain.Endpoint())
	}

	return b.String()
}
