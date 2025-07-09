package orchestrator

import (
	"context"
	_ "embed"
	"errors"
	"fmt"
	"math/big"
	"sort"
	"strings"
	"sync"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	"github.com/ethereum-optimism/supersim/admin"
	"github.com/ethereum-optimism/supersim/anvil"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/interop"
	opsimulator "github.com/ethereum-optimism/supersim/opsimulator"
	"github.com/ethereum-optimism/supersim/withdrawal"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
)

type Orchestrator struct {
	log       log.Logger
	cliConfig *config.CLIConfig
	config    *config.NetworkConfig

	l1Chain config.Chain

	l2Chains map[uint64]config.Chain
	l2OpSims map[uint64]*opsimulator.OpSimulator

	l2ToL2MsgIndexer *interop.L2ToL2MessageIndexer
	l2ToL2MsgRelayer *interop.L2ToL2MessageRelayer

	withdrawalEventMonitor *withdrawal.WithdrawalEventMonitor

	AdminServer *admin.AdminServer
}

func NewOrchestrator(log log.Logger, closeApp context.CancelCauseFunc, cliConfig *config.CLIConfig, networkConfig *config.NetworkConfig, adminPort uint64) (*Orchestrator, error) {
	// Spin up L1 anvil instance
	l1Cfg := networkConfig.L1Config
	if cliConfig != nil {
		l1Cfg.OdysseyEnabled = cliConfig.OdysseyEnabled
	}
	l1Anvil := anvil.New(log, closeApp, &l1Cfg)

	// Spin up L2 anvil instances
	nextL2Port := networkConfig.L2StartingPort
	l2Anvils, l2OpSims := make(map[uint64]config.Chain), make(map[uint64]*opsimulator.OpSimulator)
	for i := range networkConfig.L2Configs {
		cfg := networkConfig.L2Configs[i]

		if cliConfig != nil {
			cfg.OdysseyEnabled = cliConfig.OdysseyEnabled
		}

		cfg.Port = 0 // explicitly set to zero as this anvil sits behind a proxy

		l2Anvil := anvil.New(log, closeApp, &cfg)
		l2Anvils[cfg.ChainID] = l2Anvil
	}

	// Spin up OpSim to front the L2 instances
	for i := range networkConfig.L2Configs {
		cfg := networkConfig.L2Configs[i]
		l2OpSims[cfg.ChainID] = opsimulator.New(log, closeApp, nextL2Port, cfg.Host, l1Anvil, l2Anvils[cfg.ChainID], l2Anvils, networkConfig.InteropDelay)

		// only increment expected port if it has been specified
		if nextL2Port > 0 {
			nextL2Port++
		}
	}

	o := Orchestrator{log: log, cliConfig: cliConfig, config: networkConfig, l1Chain: l1Anvil, l2Chains: l2Anvils, l2OpSims: l2OpSims}

	// Interop Setup
	if networkConfig.InteropEnabled {
		o.l2ToL2MsgIndexer = interop.NewL2ToL2MessageIndexer(log)
		if networkConfig.InteropAutoRelay {
			o.l2ToL2MsgRelayer = interop.NewL2ToL2MessageRelayer(log)
		}
	}

	o.AdminServer = admin.NewAdminServer(log, adminPort, networkConfig, o.l2ToL2MsgIndexer)
	return &o, nil
}

func (o *Orchestrator) Start(ctx context.Context) error {
	o.log.Debug("starting orchestrator")

	// Start Chains
	if err := o.l1Chain.Start(ctx); err != nil {
		return fmt.Errorf("l1 chain %s failed to start: %w", o.l1Chain.Config().Name, err)
	}
	for _, chain := range o.l2Chains {
		if err := chain.Start(ctx); err != nil {
			return fmt.Errorf("l2 chain %s failed to start: %w", chain.Config().Name, err)
		}
	}
	for _, opSim := range o.l2OpSims {
		if err := opSim.Start(ctx); err != nil {
			return fmt.Errorf("op simulator instance %s failed to start: %w", opSim.Config().Name, err)
		}
	}

	// Start Mining Blocks
	if err := o.kickOffMining(ctx); err != nil {
		return fmt.Errorf("unable to start mining: %w", err)
	}

	// TODO: hack until opsim proxy supports websocket connections.
	// We need websocket connections to make subscriptions.
	// We should try to use make RPC through opsim not directly to the underlying chain
	l2ChainClientByChainId := make(map[uint64]*ethclient.Client)
	l2OpSimClientByChainId := make(map[uint64]*ethclient.Client)
	for chainID, opSim := range o.l2OpSims {
		l2ChainClientByChainId[chainID] = opSim.Chain.EthClient()
		l2OpSimClientByChainId[chainID] = opSim.EthClient()
	}

	// Configure Interop (if applicable)
	if o.config.InteropEnabled {
		o.log.Info("configuring interop contracts")

		var wg sync.WaitGroup
		var errs []error
		wg.Add(len(o.l2Chains))

		// Iterate over the underlying l2Chains for configuration as it relies
		// on deposit txs from system addresses which opsimulator will reject
		for i, chain := range o.l2Chains {
			go func(i uint64) {
				if err := interop.Configure(ctx, chain); err != nil {
					errs = append(errs, fmt.Errorf("failed to configure interop for chain %s: %w", chain.Config().Name, err))
				}
				wg.Done()
			}(i)
		}

		wg.Wait()
		if err := errors.Join(errs...); err != nil {
			return err
		}

		if err := o.l2ToL2MsgIndexer.Start(ctx, l2ChainClientByChainId); err != nil {
			return fmt.Errorf("l2 to l2 message indexer failed to start: %w", err)
		}

		if o.l2ToL2MsgRelayer != nil {
			o.log.Info("starting L2ToL2CrossDomainMessenger autorelayer") // `info` since it's explictily enabled
			if err := o.l2ToL2MsgRelayer.Start(o.l2ToL2MsgIndexer, l2OpSimClientByChainId, o.l2Chains); err != nil {
				return fmt.Errorf("l2 to l2 message relayer failed to start: %w", err)
			}
		}
	}

	if err := o.AdminServer.Start(ctx); err != nil {
		return fmt.Errorf("admin server failed to start: %w", err)
	}

	o.log.Debug("orchestrator is ready")

	// Initialize withdrawal event monitor
	o.withdrawalEventMonitor = withdrawal.NewWithdrawalEventMonitor(
		o.log,
		o.l1Chain.EthClient(),
		l2ChainClientByChainId,
		o.config,
	)
	if o.withdrawalEventMonitor != nil {
		// Fund proposer addresses with ETH for gas
		if err := o.fundProposerAddresses(ctx); err != nil {
			return fmt.Errorf("failed to fund proposer addresses: %w", err)
		}

		o.log.Info("starting withdrawal event monitor")
		if err := o.withdrawalEventMonitor.Start(ctx); err != nil {
			return fmt.Errorf("withdrawal event monitor failed to start: %w", err)
		}
	}

	return nil
}

func (o *Orchestrator) Stop(ctx context.Context) error {
	var errs []error
	o.log.Debug("stopping orchestrator")

	// Stop withdrawal event monitor
	if o.withdrawalEventMonitor != nil {
		o.log.Info("stopping withdrawal event monitor")
		if err := o.withdrawalEventMonitor.Stop(ctx); err != nil {
			errs = append(errs, fmt.Errorf("withdrawal event monitor failed to stop: %w", err))
		}
	}

	if o.config.InteropEnabled {
		if o.l2ToL2MsgRelayer != nil {
			o.log.Info("stopping L2ToL2CrossDomainMessenger autorelayer")
			o.l2ToL2MsgRelayer.Stop(ctx)
		}

		o.log.Debug("stopping L2ToL2CrossDomainMessenger indexer")
		if err := o.l2ToL2MsgIndexer.Stop(ctx); err != nil {
			errs = append(errs, fmt.Errorf("l2 to l2 message indexer failed to stop: %w", err))
		}
	}

	for _, opSim := range o.l2OpSims {
		o.log.Debug("stopping op simulator", "chain.id", opSim.Config().ChainID)
		if err := opSim.Stop(ctx); err != nil {
			errs = append(errs, fmt.Errorf("op simulator instance %s failed to stop: %w", opSim.Config().Name, err))
		}
	}
	for _, chain := range o.l2Chains {
		o.log.Debug("stopping l2 chain", "chain.id", chain.Config().ChainID)
		if err := chain.Stop(ctx); err != nil {
			errs = append(errs, fmt.Errorf("l2 chain %s failed to stop: %w", chain.Config().Name, err))
		}
	}

	if err := o.l1Chain.Stop(ctx); err != nil {
		o.log.Debug("stopping l1 chain", "chain.id", o.l1Chain.Config().ChainID)
		errs = append(errs, fmt.Errorf("l1 chain %s failed to stop: %w", o.l1Chain.Config().Name, err))
	}

	if err := o.AdminServer.Stop(ctx); err != nil {
		errs = append(errs, fmt.Errorf("admin server failed to stop: %w", err))
	}

	return errors.Join(errs...)
}

func (o *Orchestrator) kickOffMining(ctx context.Context) error {
	if err := o.l1Chain.SetIntervalMining(ctx, nil, int64(o.config.L1Config.BlockTime)); err != nil {
		return errors.New("failed to start interval mining on l1")
	}

	var wg sync.WaitGroup
	wg.Add(len(o.l2Chains))

	errs := make([]error, len(o.l2Chains))
	for i, chain := range o.L2Chains() {
		go func(i int) {
			if err := chain.SetIntervalMining(ctx, nil, int64(chain.Config().BlockTime)); err != nil {
				errs[i] = fmt.Errorf("failed to start interval mining for chain %s", chain.Config().Name)
			}

			wg.Done()
		}(i)
	}

	return errors.Join(errs...)
}

func (o *Orchestrator) L1Chain() config.Chain {
	return o.l1Chain
}

func (o *Orchestrator) L2Chains() []config.Chain {
	var chains []config.Chain
	for _, chain := range o.l2OpSims {
		chains = append(chains, chain)
	}
	return chains
}

func (o *Orchestrator) Endpoint(chainId uint64) string {
	if o.l1Chain.Config().ChainID == chainId {
		return o.l1Chain.Endpoint()
	}
	return o.l2OpSims[chainId].Endpoint()
}

func (o *Orchestrator) WSEndpoint(chainId uint64) string {
	if o.l1Chain.Config().ChainID == chainId {
		return o.l1Chain.WSEndpoint()
	}
	return o.l2OpSims[chainId].WSEndpoint()
}

func (o *Orchestrator) ConfigAsString() string {
	var b strings.Builder
	l1Cfg := o.l1Chain.Config()

	fmt.Fprintln(&b, o.AdminServer.ConfigAsString())

	fmt.Fprintln(&b, "Chain Configuration")
	fmt.Fprintln(&b, "-----------------------")

	fmt.Fprintf(&b, "L1: Name: %s  ChainID: %d  RPC: %s  LogPath: %s\n", l1Cfg.Name, l1Cfg.ChainID, o.l1Chain.Endpoint(), o.l1Chain.LogPath())

	fmt.Fprintf(&b, "\nL2: Predeploy Contracts Spec ( %s )\n", "https://specs.optimism.io/protocol/predeploys.html")
	opSims := make([]*opsimulator.OpSimulator, 0, len(o.l2OpSims))
	for _, chain := range o.l2OpSims {
		opSims = append(opSims, chain)
	}

	// sort by port number (retain ordering of chain flags)
	sort.Slice(opSims, func(i, j int) bool { return opSims[i].Config().Port < opSims[j].Config().Port })
	for _, opSim := range opSims {
		cfg := opSim.Config()
		fmt.Fprintf(&b, "\n")
		fmt.Fprintf(&b, "  * Name: %s  ChainID: %d  RPC: %s  LogPath: %s\n", cfg.Name, cfg.ChainID, opSim.Endpoint(), opSim.LogPath())

		// Only log dependency set if user explicitly provided the flag
		if o.cliConfig != nil && o.cliConfig.DependencySet != nil {
			depSetStrs := make([]string, len(cfg.L2Config.DependencySet))
			for i, chainID := range cfg.L2Config.DependencySet {
				depSetStrs[i] = fmt.Sprintf("%d", chainID)
			}
			fmt.Fprintf(&b, "    Dependency Set: [%s]\n", strings.Join(depSetStrs, ", "))
		}

		fmt.Fprintf(&b, "    L1 Contracts:\n")
		fmt.Fprintf(&b, "     - OptimismPortal:         %s\n", cfg.L2Config.L1Addresses.OptimismPortalProxy)
		fmt.Fprintf(&b, "     - L1CrossDomainMessenger: %s\n", cfg.L2Config.L1Addresses.L1CrossDomainMessengerProxy)
		fmt.Fprintf(&b, "     - L1StandardBridge:       %s\n", cfg.L2Config.L1Addresses.L1StandardBridgeProxy)
	}

	return b.String()
}

// fundProposerAddresses funds the proposer addresses with ETH for gas payments
func (o *Orchestrator) fundProposerAddresses(ctx context.Context) error {
	// Get dev keys for funding transactions
	devKeys, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	if err != nil {
		return fmt.Errorf("failed to create dev keys: %w", err)
	}

	// Use the first dev key as the funder (it should have ETH)
	funderPrivateKey, err := devKeys.Secret(devkeys.UserKey(0))
	if err != nil {
		return fmt.Errorf("failed to get funder private key: %w", err)
	}

	// Create transactor for L1 transactions
	l1ChainID := big.NewInt(int64(o.config.L1Config.ChainID))
	funderTransactor, err := bind.NewKeyedTransactorWithChainID(funderPrivateKey, l1ChainID)
	if err != nil {
		return fmt.Errorf("failed to create funder transactor: %w", err)
	}

	// Amount to fund each proposer (1 ETH should be plenty for gas)
	fundingAmount := big.NewInt(1_000_000_000_000_000_000) // 1 ETH
	minBalance := big.NewInt(100_000_000_000_000_000)      // 0.1 ETH

	// Collect proposers that need funding
	var proposersToFund []struct {
		chainID uint64
		address common.Address
	}

	for _, l2Config := range o.config.L2Configs {
		proposerAddr := l2Config.L2Config.ProposerAddress

		// Check current balance
		currentBalance, err := o.l1Chain.EthClient().BalanceAt(ctx, proposerAddr, nil)
		if err != nil {
			return fmt.Errorf("failed to get balance for proposer %s: %w", proposerAddr.Hex(), err)
		}

		// Only fund if balance is low (less than 0.1 ETH)
		if currentBalance.Cmp(minBalance) < 0 {
			proposersToFund = append(proposersToFund, struct {
				chainID uint64
				address common.Address
			}{l2Config.ChainID, proposerAddr})
		}
	}

	// If no proposers need funding, return early
	if len(proposersToFund) == 0 {
		o.log.Info("all proposer addresses already have sufficient balance")
		return nil
	}

	// Send funding transactions in parallel
	var wg sync.WaitGroup
	var mu sync.Mutex
	fundedCount := 0

	for _, proposer := range proposersToFund {
		wg.Add(1)
		go func(chainID uint64, proposerAddr common.Address) {
			defer wg.Done()

			// Get nonce (this needs to be done serially to avoid conflicts)
			mu.Lock()
			nonce, err := o.l1Chain.EthClient().PendingNonceAt(ctx, funderTransactor.From)
			if err != nil {
				mu.Unlock()
				return
			}
			mu.Unlock()

			gasPrice, err := o.l1Chain.EthClient().SuggestGasPrice(ctx)
			if err != nil {
				return
			}

			tx := types.NewTransaction(nonce, proposerAddr, fundingAmount, 21000, gasPrice, nil)

			// Sign and send the transaction
			signedTx, err := funderTransactor.Signer(funderTransactor.From, tx)
			if err != nil {
				return
			}

			err = o.l1Chain.EthClient().SendTransaction(ctx, signedTx)
			if err != nil {
				return
			}

			// Wait for transaction to be mined
			receipt, err := bind.WaitMined(ctx, o.l1Chain.EthClient(), signedTx)
			if err != nil {
				return
			}

			if receipt.Status == 1 {
				mu.Lock()
				fundedCount++
				mu.Unlock()
			}
		}(proposer.chainID, proposer.address)
	}

	// Wait for all funding transactions to complete
	wg.Wait()

	// Log final result
	o.log.Info("💰 proposer addresses funded",
		"funded", fundedCount,
		"total", len(proposersToFund),
	)

	return nil
}
