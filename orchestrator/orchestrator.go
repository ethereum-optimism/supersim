package orchestrator

import (
	"context"
	_ "embed"
	"fmt"
	"strings"
	"sync"

	"github.com/ethereum-optimism/supersim/anvil"
	"github.com/ethereum-optimism/supersim/config"
	opsimulator "github.com/ethereum-optimism/supersim/opsimulator"

	"github.com/ethereum/go-ethereum/log"
)

type Orchestrator struct {
	log log.Logger

	l1Anvil *anvil.Anvil

	l2Anvils map[uint64]*anvil.Anvil
	l2OpSims map[uint64]*opsimulator.OpSimulator
}

func NewOrchestrator(log log.Logger, networkConfig *config.NetworkConfig) (*Orchestrator, error) {
	// Spin up L1 anvil instance
	l1Anvil := anvil.New(log, &networkConfig.L1Config)

	// Spin up L2 anvil instances fronted by opsim
	nextL2Port := networkConfig.L2StartingPort
	l2Anvils, l2OpSims := make(map[uint64]*anvil.Anvil), make(map[uint64]*opsimulator.OpSimulator)
	for i := range networkConfig.L2Configs {
		cfg := networkConfig.L2Configs[i]

		l2Anvil := anvil.New(log, &cfg)
		l2Anvils[cfg.ChainID] = l2Anvil
		l2OpSims[cfg.ChainID] = opsimulator.New(log, nextL2Port, l1Anvil, l2Anvil, cfg.L2Config)

		// only increment expected port if it has been specified
		if nextL2Port > 0 {
			nextL2Port++
		}
	}

	return &Orchestrator{log, l1Anvil, l2Anvils, l2OpSims}, nil
}

func (o *Orchestrator) Start(ctx context.Context) error {
	o.log.Info("starting orchestrator")
	if err := o.l1Anvil.Start(ctx); err != nil {
		return fmt.Errorf("anvil instance %s failed to start: %w", o.l1Anvil.Name(), err)
	}
	for _, anvil := range o.l2Anvils {
		if err := anvil.Start(ctx); err != nil {
			return fmt.Errorf("anvil instance %s failed to start: %w", anvil.Name(), err)
		}
	}
	for _, opSim := range o.l2OpSims {
		if err := opSim.Start(ctx); err != nil {
			return fmt.Errorf("op simulator instance %s failed to start: %w", opSim.Name(), err)
		}
	}

	if err := o.WaitUntilReady(); err != nil {
		return fmt.Errorf("orchestrator failed to get ready: %w", err)
	}

	o.log.Debug("orchestrator is ready")
	return nil
}

func (o *Orchestrator) Stop(ctx context.Context) error {
	o.log.Info("stopping orchestrator")
	if err := o.l1Anvil.Stop(); err != nil {
		return fmt.Errorf("anvil instance %s failed to stop: %w", o.l1Anvil.Name(), err)
	}

	for _, opSim := range o.l2OpSims {
		if err := opSim.Stop(ctx); err != nil {
			return fmt.Errorf("op simulator chain.id=%d failed to stop: %w", opSim.ChainID(), err)
		}
		o.log.Debug("stopped op simulator", "chain.id", opSim.ChainID())
	}
	for _, anvil := range o.l2Anvils {
		if err := anvil.Stop(); err != nil {
			return fmt.Errorf("anvil chain.id=%d failed to stop: %w", anvil.ChainID(), err)
		}
		o.log.Debug("stopped anvil", "chain.id", anvil.ChainID())
	}

	o.log.Debug("stopped orchestrator")
	return nil
}

func (o *Orchestrator) Stopped() bool {
	for _, anvil := range o.l2Anvils {
		if stopped := anvil.Stopped(); !stopped {
			return stopped
		}
	}
	for _, opSim := range o.l2OpSims {
		if stopped := opSim.Stopped(); !stopped {
			return stopped
		}
	}
	return true
}

func (o *Orchestrator) WaitUntilReady() error {
	var once sync.Once
	var err error
	ctx, cancel := context.WithCancel(context.Background())

	handleErr := func(e error) {
		if e == nil {
			return
		}

		once.Do(func() {
			err = e
			cancel()
		})
	}

	var wg sync.WaitGroup

	waitForAnvil := func(anvil *anvil.Anvil) {
		defer wg.Done()
		handleErr(anvil.WaitUntilReady(ctx))
	}
	for _, chain := range o.l2Anvils {
		wg.Add(1)
		go waitForAnvil(chain)
	}

	wg.Wait()

	return err
}

func (o *Orchestrator) L1Chain() config.Chain {
	return o.l1Anvil
}

func (o *Orchestrator) L2Chains() []config.Chain {
	var chains []config.Chain
	for _, chain := range o.l2Anvils {
		chains = append(chains, chain)
	}
	return chains
}

func (o *Orchestrator) ConfigAsString() string {
	var b strings.Builder

	if o.l1Anvil != nil {
		fmt.Fprintf(&b, "L1:\n")
		fmt.Fprintf(&b, "  %s\n", o.l1Anvil.String())
	}

	if len(o.l2OpSims) > 0 {
		fmt.Fprintf(&b, "L2:\n")
		for _, opSim := range o.l2OpSims {
			fmt.Fprintf(&b, "  %s\n", opSim.String())
		}
	}

	return b.String()
}
