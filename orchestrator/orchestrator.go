package orchestrator

import (
	"context"
	_ "embed"
	"errors"
	"fmt"
	"sort"
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
		cfg.Port = 0 // explicity set to zero as this instance sits behind a proxy

		l2Anvil := anvil.New(log, &cfg)
		l2Anvils[cfg.ChainID] = l2Anvil
	}

	for i := range networkConfig.L2Configs {
		cfg := networkConfig.L2Configs[i]
		l2OpSims[cfg.ChainID] = opsimulator.New(log, nextL2Port, l1Anvil, l2Anvils[cfg.ChainID], cfg.L2Config, l2Anvils)

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

	if err := o.WaitUntilAnvilsAreReady(); err != nil {
		return fmt.Errorf("anvil instances failed to get ready: %w", err)
	}

	o.log.Debug("orchestrator is ready")
	return nil
}

func (o *Orchestrator) Stop(ctx context.Context) error {
	var errs []error

	o.log.Info("stopping orchestrator")
	for _, opSim := range o.l2OpSims {
		o.log.Debug("stopping op simulator", "chain.id", opSim.ChainID())
		if err := opSim.Stop(ctx); err != nil {
			errs = append(errs, fmt.Errorf("op simulator instance %s failed to stop: %w", opSim.Name(), err))
		}
	}
	for _, anvil := range o.l2Anvils {
		o.log.Debug("stopping anvil", "chain.id", anvil.ChainID())
		if err := anvil.Stop(); err != nil {
			errs = append(errs, fmt.Errorf("anvil instance %s failed to stop: %w", anvil.Name(), err))
		}
	}

	if err := o.l1Anvil.Stop(); err != nil {
		o.log.Debug("stopping anvil", "chain.id", o.l1Anvil.ChainID())
		errs = append(errs, fmt.Errorf("anvil instance %s failed to stop: %w", o.l1Anvil.Name(), err))
	}

	return errors.Join(errs...)
}

func (o *Orchestrator) Stopped() bool {
	if stopped := o.l1Anvil.Stopped(); stopped {
		return stopped
	}
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

func (o *Orchestrator) WaitUntilAnvilsAreReady() error {
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
	anvils := []*anvil.Anvil{o.l1Anvil}
	for _, chain := range o.l2Anvils {
		anvils = append(anvils, chain)
	}

	waitForAnvil := func(anvil *anvil.Anvil) {
		defer wg.Done()
		handleErr(anvil.WaitUntilReady(ctx))
	}
	for _, chain := range anvils {
		wg.Add(1)
		go waitForAnvil(chain)
	}

	wg.Wait()

	if err != nil {
		return err
	}

	if err := o.kickOffMining(ctx, anvils); err != nil {
		return err
	}

	return nil
}

func (o *Orchestrator) kickOffMining(ctx context.Context, anvils []*anvil.Anvil) error {
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
	wg.Add(len(anvils))
	for _, chain := range anvils {
		go func() {
			defer wg.Done()
			handleErr(chain.SetIntervalMining(ctx, nil, 2))
		}()
	}

	wg.Wait()

	return err
}

func (o *Orchestrator) L1Chain() config.Chain {
	return o.l1Anvil
}

// TODO: op-sim should satisfy the same interface and
// this should return op-sim, not anvil. will refactor this
// once the interface is updated to remove EthClient stubs
func (o *Orchestrator) L2Chains() []config.Chain {
	var chains []config.Chain
	for _, chain := range o.l2Anvils {
		chains = append(chains, chain)
	}
	return chains
}

func (o *Orchestrator) Endpoint(chainId uint64) string {
	if o.l1Anvil.ChainID() == chainId {
		return o.l1Anvil.Endpoint()
	}
	return o.l2OpSims[chainId].Endpoint()
}

func (o *Orchestrator) ConfigAsString() string {
	var b strings.Builder

	if o.l1Anvil != nil {
		fmt.Fprintf(&b, "L1:\n")
		fmt.Fprintf(&b, "  %s\n", o.l1Anvil.String())
	}

	if len(o.l2OpSims) > 0 {
		fmt.Fprintf(&b, "L2:\n")

		opSims := make([]*opsimulator.OpSimulator, 0, len(o.l2OpSims))
		for _, chain := range o.l2OpSims {
			opSims = append(opSims, chain)
		}

		// sort by port number (retain ordering of chain flags)
		sort.Slice(opSims, func(i, j int) bool { return opSims[i].Config().Port < opSims[j].Config().Port })
		for _, opSim := range opSims {
			fmt.Fprintf(&b, "  %s\n", opSim.String())
		}
	}

	return b.String()
}
