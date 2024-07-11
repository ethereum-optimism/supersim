package orchestrator

import (
	"context"
	_ "embed"
	"fmt"
	"strings"
	"sync"

	"github.com/ethereum-optimism/supersim/anvil"
	op_simulator "github.com/ethereum-optimism/supersim/op-simulator"

	"github.com/ethereum/go-ethereum/log"
)

type ChainConfig struct {
	Port    uint64
	ChainID uint64
	// The base chain ID when the chain is a rollup.
	// If set to 0, the chain is considered an L1 chain
	SourceChainID uint64
}

type OrchestratorConfig struct {
	ChainConfigs []ChainConfig
}

type Orchestrator struct {
	log log.Logger

	OpSimInstances []*op_simulator.OpSimulator
	anvilInstances []*anvil.Anvil
}

//go:embed genesisstates/genesis-l1.json
var genesisL1JSON []byte

//go:embed genesisstates/genesis-l2.json
var genesisL2JSON []byte

func NewOrchestrator(log log.Logger, config *OrchestratorConfig) (*Orchestrator, error) {
	var opSimInstances []*op_simulator.OpSimulator
	var anvilInstances []*anvil.Anvil

	l1Count := 0
	for _, config := range config.ChainConfigs {
		if config.SourceChainID == 0 {
			l1Count++
		}
	}

	if l1Count > 1 {
		return nil, fmt.Errorf("supersim does not support more than one l1")
	}

	for _, chainConfig := range config.ChainConfigs {
		genesis := genesisL2JSON
		if chainConfig.SourceChainID == 0 {
			genesis = genesisL1JSON
		}
		anvil := anvil.New(log, &anvil.Config{ChainID: chainConfig.ChainID, SourceChainID: chainConfig.SourceChainID, Genesis: genesis})
		anvilInstances = append(anvilInstances, anvil)
		// Only create Op Simulators for L2 chains.
		if chainConfig.SourceChainID != 0 {
			opSimInstances = append(opSimInstances, op_simulator.New(log, &op_simulator.Config{Port: chainConfig.Port, SourceChainID: chainConfig.SourceChainID}, anvil))
		}
	}

	return &Orchestrator{log, opSimInstances, anvilInstances}, nil
}

func (o *Orchestrator) Start(ctx context.Context) error {
	o.log.Info("starting orchestrator")

	for _, anvilInstance := range o.anvilInstances {
		if err := anvilInstance.Start(ctx); err != nil {
			return fmt.Errorf("anvil instance chain.id=%v failed to start: %w", anvilInstance.ChainID(), err)
		}
	}
	for _, opSimInstance := range o.OpSimInstances {
		if err := opSimInstance.Start(ctx); err != nil {
			return fmt.Errorf("op simulator instance chain.id=%v failed to start: %w", opSimInstance.ChainID(), err)
		}
	}

	if err := o.WaitUntilReady(); err != nil {
		return fmt.Errorf("orchestrator failed to get ready: %w", err)
	}

	o.log.Info("orchestrator is ready")

	return nil
}

func (o *Orchestrator) Stop(ctx context.Context) error {
	o.log.Info("stopping orchestrator")

	for _, opSim := range o.OpSimInstances {
		if err := opSim.Stop(ctx); err != nil {
			return fmt.Errorf("op simulator chain.id=%v failed to stop: %w", opSim.ChainID(), err)
		}
		o.log.Info("stopped op simulator", "chain.id", opSim.ChainID())
	}
	for _, anvil := range o.anvilInstances {
		if err := anvil.Stop(); err != nil {
			return fmt.Errorf("anvil chain.id=%v failed to stop: %w", anvil.ChainID(), err)
		}
		o.log.Info("stopped anvil", "chain.id", anvil.ChainID())
	}

	o.log.Info("stopped orchestrator")

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
	var result *anvil.Anvil
	for _, anvil := range o.anvilInstances {
		if anvil.SourceChainID() == 0 {
			result = anvil
		}
	}

	return result
}

func (o *Orchestrator) ConfigAsString() string {
	var b strings.Builder

	fmt.Fprintf(&b, "\nSupersim Config:\n")
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
