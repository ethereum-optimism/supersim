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

	OpSimInstances         []*opsimulator.OpSimulator
	anvilInstances         []*anvil.Anvil
	anvilInstanceByChainID map[uint64]*anvil.Anvil
}

func NewOrchestrator(log log.Logger, chainConfigs []config.ChainConfig) (*Orchestrator, error) {
	var opSimInstances []*opsimulator.OpSimulator
	var anvilInstances []*anvil.Anvil

	l1Count := 0
	for _, config := range chainConfigs {
		if config.L2Config == nil {
			l1Count++
		}
	}
	if l1Count > 1 {
		return nil, fmt.Errorf("supersim does not support more than one l1")
	}

	// Spin up anvil instances
	var l1Chain *anvil.Anvil
	var anvilInstanceByChainID = make(map[uint64]*anvil.Anvil)
	for _, chainConfig := range chainConfigs {
		anvilConfig := chainConfig
		if chainConfig.L2Config != nil {
			anvilConfig.Port = 0 // internally allocate anvil port as op-simulator port is exposed externally
		}

		// Apply genesis if not forking from a live network
		if chainConfig.ForkConfig == nil {
			anvilConfig.GenesisJSON = chainConfig.GenesisJSON
		}

		anvil := anvil.New(log, &anvilConfig)
		anvilInstances = append(anvilInstances, anvil)
		anvilInstanceByChainID[chainConfig.ChainID] = anvil
		if chainConfig.L2Config == nil {
			l1Chain = anvil
		}
	}

	// Create Op Simulators to front L2 chains.
	for _, chainConfig := range chainConfigs {
		if chainConfig.L2Config != nil {
			opSim := opsimulator.New(log, chainConfig.Port, l1Chain, anvilInstanceByChainID[chainConfig.ChainID], chainConfig.L2Config)
			opSimInstances = append(opSimInstances, opSim)
		}
	}

	return &Orchestrator{log, l1Chain, opSimInstances, anvilInstances, anvilInstanceByChainID}, nil
}

func (o *Orchestrator) Start(ctx context.Context) error {
	o.log.Info("starting orchestrator")

	for _, anvil := range o.anvilInstances {
		if err := anvil.Start(ctx); err != nil {
			return fmt.Errorf("anvil instance %s failed to start: %w", anvil.Name(), err)
		}
	}
	for _, opSim := range o.OpSimInstances {
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

	for _, opSim := range o.OpSimInstances {
		if err := opSim.Stop(ctx); err != nil {
			return fmt.Errorf("op simulator chain.id=%v failed to stop: %w", opSim.ChainID(), err)
		}
		o.log.Debug("stopped op simulator", "chain.id", opSim.ChainID())
	}
	for _, anvil := range o.anvilInstances {
		if err := anvil.Stop(); err != nil {
			return fmt.Errorf("anvil chain.id=%v failed to stop: %w", anvil.ChainID(), err)
		}
		o.log.Debug("stopped anvil", "chain.id", anvil.ChainID())
	}

	o.log.Debug("stopped orchestrator")
	return nil
}

func (o *Orchestrator) Stopped() bool {
	for _, anvil := range o.anvilInstances {
		if stopped := anvil.Stopped(); !stopped {
			return stopped
		}
	}
	for _, opSim := range o.OpSimInstances {
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

	o.iterateAnvilInstances(func(chain *anvil.Anvil) {
		wg.Add(1)
		go waitForAnvil(chain)
	})

	wg.Wait()

	return err
}

func (o *Orchestrator) iterateAnvilInstances(fn func(anvil *anvil.Anvil)) {
	for _, anvilInstance := range o.anvilInstances {
		fn(anvilInstance)
	}
}

func (o *Orchestrator) L1Anvil() *anvil.Anvil {
	return o.l1Anvil
}

func (o *Orchestrator) ConfigAsString() string {
	var b strings.Builder

	if o.L1Anvil() != nil {
		fmt.Fprintf(&b, "L1:\n")
		fmt.Fprintf(&b, "  %s\n", o.L1Anvil().String())
	}

	if len(o.OpSimInstances) > 0 {
		fmt.Fprintf(&b, "L2:\n")
		for _, opSim := range o.OpSimInstances {
			fmt.Fprintf(&b, "  %s\n", opSim.String())
		}
	}

	return b.String()
}
