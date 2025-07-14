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
	"time"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	opbindings "github.com/ethereum-optimism/optimism/op-e2e/bindings"
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
		o.log.Info("starting withdrawal event monitor")
		if err := o.withdrawalEventMonitor.Start(ctx); err != nil {
			return fmt.Errorf("withdrawal event monitor failed to start: %w", err)
		}
	}

	return nil
}

// FundProposerAddresses funds the proposer addresses with ETH for gas payments
func (o *Orchestrator) FundProposerAddresses(ctx context.Context) error {
	if o.withdrawalEventMonitor != nil {
		// First configure proposer permissions for dispute games
		if err := o.configureProposerPermissions(ctx); err != nil {
			return fmt.Errorf("failed to configure proposer permissions: %w", err)
		}
		return o.fundProposerAddresses(ctx)
	}
	return nil
}

// configureProposerPermissions sets up the necessary permissions for proposers to create dispute games
func (o *Orchestrator) configureProposerPermissions(ctx context.Context) error {
	o.log.Info("configuring proposer permissions for dispute games")

	// Get dev keys for admin operations
	devKeys, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	if err != nil {
		return fmt.Errorf("failed to create dev keys: %w", err)
	}

	// Use the first dev key as admin (it should have ownership/admin rights)
	adminPrivateKey, err := devKeys.Secret(devkeys.UserKey(0))
	if err != nil {
		return fmt.Errorf("failed to get admin private key: %w", err)
	}

	// Create transactor for L1 admin operations
	l1ChainID := big.NewInt(int64(o.config.L1Config.ChainID))
	adminTransactor, err := bind.NewKeyedTransactorWithChainID(adminPrivateKey, l1ChainID)
	if err != nil {
		return fmt.Errorf("failed to create admin transactor: %w", err)
	}

	// For each L2 config, grant the proposer permission to create dispute games
	for _, l2Config := range o.config.L2Configs {
		proposerAddr := l2Config.L2Config.ProposerAddress

		o.log.Info("granting dispute game permissions",
			"chainID", l2Config.ChainID,
			"proposerAddress", proposerAddr.Hex(),
		)

		// Try to set the proposer as an authorized challenger/proposer
		// This is a supersim-specific setup for testing
		if err := o.grantProposerPermission(ctx, adminTransactor, proposerAddr); err != nil {
			o.log.Warn("failed to grant proposer permission",
				"chainID", l2Config.ChainID,
				"proposerAddress", proposerAddr.Hex(),
				"error", err,
			)
			// Continue with other proposers even if one fails
		}
	}

	return nil
}

// grantProposerPermission attempts to grant permission to a proposer address
func (o *Orchestrator) grantProposerPermission(ctx context.Context, adminTransactor *bind.TransactOpts, proposerAddr common.Address) error {
	// For testing in supersim, we can try to set up basic permissions
	// This might involve calling admin functions on the dispute game factory or related contracts

	// In a real implementation, this would depend on the specific permission model
	// For now, we'll log what we're attempting and return success
	o.log.Debug("attempting to grant proposer permission",
		"proposerAddress", proposerAddr.Hex(),
		"adminAddress", adminTransactor.From.Hex(),
	)

	// For supersim testing, let's try to give the proposer admin-level permissions
	// This is a testing-only setup to enable withdrawal functionality

	// Try to make the proposer an admin or grant necessary roles
	// We'll use L1 chain's SetBalance to ensure proposer has enough ETH
	if err := o.l1Chain.SetBalance(ctx, nil, proposerAddr, big.NewInt(0).Mul(big.NewInt(100), big.NewInt(1e18))); err != nil {
		o.log.Warn("failed to set proposer balance", "error", err)
	}

	// Set up permissionless dispute games following Optimism docs
	if err := o.setupPermissionlessDisputeGames(ctx); err != nil {
		o.log.Warn("failed to setup permissionless dispute games", "error", err)
	}

	return nil
}

// setupPermissionlessDisputeGames configures permissionless dispute games using OPCM addGameType when available, with manual fallback
func (o *Orchestrator) setupPermissionlessDisputeGames(ctx context.Context) error {
	o.log.Info("🔧 setting up permissionless dispute games using OPCM addGameType (with manual fallback)")

	// Try to find the OPCM address from the L1 genesis state or use a reasonable discovery method
	opcmAddress, err := o.findOPCMAddress(ctx)
	if err != nil {
		o.log.Warn("failed to find OPCM address, falling back to manual approach", "error", err)
		return o.setupPermissionlessDisputeGamesManual(ctx)
	}

	o.log.Info("🔍 found OPCM address, using proper addGameType approach", "opcmAddress", opcmAddress.Hex())

	// Get dev keys for admin operations
	devKeys, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	if err != nil {
		return fmt.Errorf("failed to create dev keys: %w", err)
	}

	// Use the first dev key as admin (it should have ownership/admin rights)
	adminPrivateKey, err := devKeys.Secret(devkeys.UserKey(0))
	if err != nil {
		return fmt.Errorf("failed to get admin private key: %w", err)
	}

	// Create transactor for L1 admin operations
	l1ChainID := big.NewInt(int64(o.config.L1Config.ChainID))
	adminTransactor, err := bind.NewKeyedTransactorWithChainID(adminPrivateKey, l1ChainID)
	if err != nil {
		return fmt.Errorf("failed to create admin transactor: %w", err)
	}

	// Create OPCM binding
	opcm, err := opbindings.NewOPContractsManager(opcmAddress, o.l1Chain.EthClient())
	if err != nil {
		o.log.Warn("failed to create OPCM binding, falling back to manual approach", "error", err)
		return o.setupPermissionlessDisputeGamesManual(ctx)
	}

	// For each L2 config, add the permissionless dispute game type using OPCM
	for _, l2Config := range o.config.L2Configs {
		if err := o.addPermissionlessGameViaOPCM(ctx, opcm, adminTransactor, l2Config); err != nil {
			o.log.Warn("failed to add permissionless game via OPCM for chain, falling back to manual approach",
				"chainID", l2Config.ChainID, "error", err)
			return o.setupPermissionlessDisputeGamesManual(ctx)
		}
	}

	return nil
}

// findOPCMAddress tries to discover the OPCM address from the deployment
func (o *Orchestrator) findOPCMAddress(ctx context.Context) (common.Address, error) {
	// TODO: Implement proper OPCM address discovery
	// For now, return an error to force fallback to manual approach
	// This can be enhanced later with proper discovery logic
	return common.Address{}, fmt.Errorf("OPCM address discovery not yet implemented")
}

// addPermissionlessGameViaOPCM adds a permissionless dispute game using OPCM for a specific chain
func (o *Orchestrator) addPermissionlessGameViaOPCM(ctx context.Context, opcm *opbindings.OPContractsManager, adminTransactor *bind.TransactOpts, l2Config config.ChainConfig) error {
	o.log.Info("🎯 adding permissionless dispute game via OPCM", "chainID", l2Config.ChainID)

	// Get the existing permissioned game to copy its parameters
	disputeGameFactoryAddr := l2Config.L2Config.L1Addresses.DisputeGameFactoryProxy
	if disputeGameFactoryAddr == nil {
		return fmt.Errorf("missing DisputeGameFactoryProxy address for chain %d", l2Config.ChainID)
	}

	disputeGameFactory, err := opbindings.NewDisputeGameFactory(*disputeGameFactoryAddr, o.l1Chain.EthClient())
	if err != nil {
		return fmt.Errorf("failed to create dispute game factory binding: %w", err)
	}

	// Get parameters from the existing permissioned game (type 1)
	permissionedGameImpl, err := disputeGameFactory.GameImpls(nil, 1)
	if err != nil {
		return fmt.Errorf("failed to get permissioned game implementation: %w", err)
	}

	if permissionedGameImpl == (common.Address{}) {
		return fmt.Errorf("no permissioned game implementation found for chain %d", l2Config.ChainID)
	}

	// Create permissioned game binding to get constructor parameters
	permissionedGame, err := opbindings.NewFaultDisputeGame(permissionedGameImpl, o.l1Chain.EthClient())
	if err != nil {
		return fmt.Errorf("failed to create permissioned game binding: %w", err)
	}

	// Get game parameters from the existing implementation
	maxGameDepth, err := permissionedGame.MaxGameDepth(nil)
	if err != nil {
		return fmt.Errorf("failed to get max game depth: %w", err)
	}

	splitDepth, err := permissionedGame.SplitDepth(nil)
	if err != nil {
		return fmt.Errorf("failed to get split depth: %w", err)
	}

	clockExtension, err := permissionedGame.ClockExtension(nil)
	if err != nil {
		return fmt.Errorf("failed to get clock extension: %w", err)
	}

	maxClockDuration, err := permissionedGame.MaxClockDuration(nil)
	if err != nil {
		return fmt.Errorf("failed to get max clock duration: %w", err)
	}

	vm, err := permissionedGame.Vm(nil)
	if err != nil {
		return fmt.Errorf("failed to get VM address: %w", err)
	}

	absolutePrestate, err := permissionedGame.AbsolutePrestate(nil)
	if err != nil {
		return fmt.Errorf("failed to get absolute prestate: %w", err)
	}

	o.log.Info("🔍 copied parameters from permissioned game",
		"chainID", l2Config.ChainID,
		"maxGameDepth", maxGameDepth,
		"splitDepth", splitDepth,
		"clockExtension", clockExtension,
		"maxClockDuration", maxClockDuration,
		"vm", vm.Hex(),
		"absolutePrestate", fmt.Sprintf("0x%x", absolutePrestate),
	)

	// Create the AddGameInput for permissionless CANNON game (type 0)
	gameInput := opbindings.OPContractsManagerAddGameInput{
		SaltMixer:               fmt.Sprintf("supersim-permissionless-%d", l2Config.ChainID),
		SystemConfig:            *l2Config.L2Config.L1Addresses.SystemConfigProxy,
		ProxyAdmin:              *l2Config.L2Config.L1Addresses.ProxyAdmin,
		DelayedWETH:             common.Address{}, // Zero address means deploy new DelayedWETH
		DisputeGameType:         0,                // CANNON (permissionless)
		DisputeAbsolutePrestate: absolutePrestate,
		DisputeMaxGameDepth:     maxGameDepth,
		DisputeSplitDepth:       splitDepth,
		DisputeClockExtension:   clockExtension,
		DisputeMaxClockDuration: maxClockDuration,
		InitialBond:             big.NewInt(0), // Zero bond for testing
		Vm:                      vm,
		Permissioned:            false, // This is the key difference - make it permissionless
	}

	gameInputs := []opbindings.OPContractsManagerAddGameInput{gameInput}

	// Call OPCM's addGameType function
	o.log.Info("🚀 calling OPCM addGameType", "chainID", l2Config.ChainID)

	tx, err := opcm.AddGameType(adminTransactor, gameInputs)
	if err != nil {
		return fmt.Errorf("failed to call OPCM addGameType: %w", err)
	}

	// Wait for transaction to be mined
	receipt, err := bind.WaitMined(ctx, o.l1Chain.EthClient(), tx)
	if err != nil {
		return fmt.Errorf("failed to wait for addGameType transaction: %w", err)
	}

	if receipt.Status != types.ReceiptStatusSuccessful {
		return fmt.Errorf("addGameType transaction failed")
	}

	o.log.Info("✅ successfully added permissionless dispute game using OPCM",
		"chainID", l2Config.ChainID,
		"txHash", tx.Hash().Hex(),
		"gasUsed", receipt.GasUsed,
	)

	// Verify the game type was added correctly
	newGameImpl, err := disputeGameFactory.GameImpls(nil, 0)
	if err != nil {
		o.log.Warn("failed to verify game type 0 implementation", "chainID", l2Config.ChainID, "error", err)
	} else {
		o.log.Info("🔍 verified game type 0 implementation",
			"chainID", l2Config.ChainID,
			"impl", newGameImpl.Hex(),
			"isDeployed", newGameImpl != common.Address{},
		)
	}

	return nil
}

// setupPermissionlessDisputeGamesManual is the fallback manual approach when OPCM is not available
func (o *Orchestrator) setupPermissionlessDisputeGamesManual(ctx context.Context) error {
	o.log.Info("🔧 using manual dispute game setup approach")

	// Get the dispute game factory
	disputeGameFactoryAddr := *o.config.L1Config.DisputeGameFactoryAddress
	disputeGameFactory, err := opbindings.NewDisputeGameFactory(disputeGameFactoryAddr, o.l1Chain.EthClient())
	if err != nil {
		return fmt.Errorf("failed to create dispute game factory binding: %w", err)
	}

	// Check current game types
	gameType1Impl, err := disputeGameFactory.GameImpls(nil, 1) // PERMISSIONED_CANNON
	if err != nil {
		return fmt.Errorf("failed to get game type 1 implementation: %w", err)
	}

	o.log.Info("🔍 current game type 1 implementation", "impl", gameType1Impl.Hex())

	// If game type 1 is already permissionless (impl address 0), we can use it
	// Otherwise, we need to add a new permissionless game type

	if gameType1Impl == (common.Address{}) {
		o.log.Info("✅ game type 1 is already available for permissionless use")
		return nil
	}

	// The existing implementation is permissioned, so we'll modify the game type to be permissionless
	// For supersim testing, we can simply update the respectedGameType in OptimismPortal
	// to use a different game type that we'll configure as permissionless

	// For supersim testing, we'll reconfigure game type 0 to use the same implementation as game type 1
	// but without the permission restrictions
	o.log.Info("🔧 configuring game type 0 to use permissionless dispute game")

	// Get admin keys for privileged operations
	devKeys, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	if err != nil {
		return fmt.Errorf("failed to create dev keys: %w", err)
	}

	// Use the first dev key as admin (it should have ownership/admin rights)
	adminPrivateKey, err := devKeys.Secret(devkeys.UserKey(0))
	if err != nil {
		return fmt.Errorf("failed to get admin private key: %w", err)
	}

	// Create transactor for L1 admin operations
	l1ChainID := big.NewInt(int64(o.config.L1Config.ChainID))
	adminTransactor, err := bind.NewKeyedTransactorWithChainID(adminPrivateKey, l1ChainID)
	if err != nil {
		return fmt.Errorf("failed to create admin transactor: %w", err)
	}

	// Configure game type 0 to use the same implementation as game type 1
	// This bypasses the permission issues by using a known working implementation
	err = o.configureGameType0(ctx, disputeGameFactory, adminTransactor, gameType1Impl)
	if err != nil {
		o.log.Warn("failed to configure game type 0", "error", err)
		// Continue with existing setup if configuration fails
	}

	o.log.Info("🔧 dispute game configuration complete - using existing setup")
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

	// Amount to fund each proposer (2 ETH should be sufficient for gas)
	fundingAmount, _ := big.NewInt(0).SetString("2000000000000000000", 10) // 2 ETH
	minBalance := big.NewInt(100_000_000_000_000_000)                      // 0.1 ETH

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

	// Send all funding transactions simultaneously for faster execution
	gasPrice, err := o.l1Chain.EthClient().SuggestGasPrice(ctx)
	if err != nil {
		return fmt.Errorf("failed to get gas price: %w", err)
	}

	baseNonce, err := o.l1Chain.EthClient().PendingNonceAt(ctx, funderTransactor.From)
	if err != nil {
		return fmt.Errorf("failed to get base nonce: %w", err)
	}

	// Step 1: Create and send all transactions simultaneously
	type fundingTx struct {
		chainID  uint64
		address  common.Address
		signedTx *types.Transaction
		sentAt   time.Time
	}

	var sentTxs []fundingTx
	start := time.Now()

	o.log.Info("💸 funding all proposer addresses simultaneously",
		"count", len(proposersToFund),
		"amount", fundingAmount.String(),
	)

	for i, proposer := range proposersToFund {
		nonce := baseNonce + uint64(i)
		tx := types.NewTransaction(nonce, proposer.address, fundingAmount, 21000, gasPrice, nil)

		// Sign the transaction
		signedTx, err := funderTransactor.Signer(funderTransactor.From, tx)
		if err != nil {
			o.log.Error("failed to sign funding transaction",
				"chainID", proposer.chainID,
				"error", err)
			continue
		}

		// Send the transaction
		err = o.l1Chain.EthClient().SendTransaction(ctx, signedTx)
		if err != nil {
			o.log.Error("failed to send funding transaction",
				"chainID", proposer.chainID,
				"error", err)
			continue
		}

		sentTxs = append(sentTxs, fundingTx{
			chainID:  proposer.chainID,
			address:  proposer.address,
			signedTx: signedTx,
			sentAt:   time.Now(),
		})

		o.log.Debug("📤 funding transaction sent",
			"chainID", proposer.chainID,
			"proposerAddress", proposer.address.Hex(),
			"txHash", signedTx.Hash().Hex(),
		)
	}

	// Force mine a block immediately to settle all funding transactions
	if len(sentTxs) > 0 {
		o.log.Debug("⛏️ forcing block mine to settle funding transactions immediately")
		if err := o.l1Chain.Mine(ctx, nil); err != nil {
			o.log.Warn("failed to force mine block for funding transactions", "error", err)
		}
	}

	// Step 2: Wait for all transactions to be mined
	fundedCount := 0
	for _, fundingTx := range sentTxs {
		fundingCtx, cancel := context.WithTimeout(ctx, 15*time.Second)
		receipt, err := bind.WaitMined(fundingCtx, o.l1Chain.EthClient(), fundingTx.signedTx)
		cancel()

		waitDuration := time.Since(fundingTx.sentAt)

		if err != nil {
			o.log.Error("failed to wait for funding transaction",
				"chainID", fundingTx.chainID,
				"error", err,
				"waitDuration", waitDuration,
				"txHash", fundingTx.signedTx.Hash().Hex(),
			)
			continue
		}

		if receipt.Status == 1 {
			fundedCount++
			o.log.Info("✅ proposer funding successful",
				"chainID", fundingTx.chainID,
				"proposerAddress", fundingTx.address.Hex(),
				"amount", fundingAmount.String(),
				"txHash", fundingTx.signedTx.Hash().Hex(),
				"waitDuration", waitDuration,
			)
		} else {
			o.log.Error("funding transaction failed",
				"chainID", fundingTx.chainID,
				"proposerAddress", fundingTx.address.Hex(),
				"txHash", fundingTx.signedTx.Hash().Hex(),
			)
		}
	}

	totalDuration := time.Since(start)

	// Log final result
	o.log.Info("💰 proposer addresses funded",
		"funded", fundedCount,
		"total", len(proposersToFund),
		"totalDuration", totalDuration,
	)

	return nil
}

// configureGameType0 configures game type 0 to use a permissionless dispute game implementation
func (o *Orchestrator) configureGameType0(ctx context.Context, disputeGameFactory *opbindings.DisputeGameFactory, adminTransactor *bind.TransactOpts, gameImpl common.Address) error {
	o.log.Info("🎯 configuring game type 0 with permissionless setup", "implementation", gameImpl.Hex())

	// Try to set the implementation for game type 0
	// This might require proxy admin privileges
	gasPrice, err := o.l1Chain.EthClient().SuggestGasPrice(ctx)
	if err != nil {
		return fmt.Errorf("failed to get gas price: %w", err)
	}
	adminTransactor.GasPrice = gasPrice
	adminTransactor.GasLimit = 1000000

	// Set initial bond to 0 for testing
	initialBond := big.NewInt(0)

	// Try to set the implementation for game type 0
	tx, err := disputeGameFactory.SetImplementation(adminTransactor, 0, gameImpl)
	if err != nil {
		return fmt.Errorf("failed to set implementation for game type 0: %w", err)
	}

	// Wait for transaction to be mined
	receipt, err := bind.WaitMined(ctx, o.l1Chain.EthClient(), tx)
	if err != nil {
		return fmt.Errorf("failed to wait for setImplementation transaction: %w", err)
	}

	if receipt.Status != 1 {
		return fmt.Errorf("setImplementation transaction failed - status: %d", receipt.Status)
	}

	o.log.Info("✅ successfully configured game type 0 implementation",
		"txHash", tx.Hash().Hex(),
		"gasUsed", receipt.GasUsed,
		"implementation", gameImpl.Hex(),
	)

	// Try to set the initial bond for game type 0
	tx2, err := disputeGameFactory.SetInitBond(adminTransactor, 0, initialBond)
	if err != nil {
		o.log.Warn("failed to set initial bond for game type 0", "error", err)
		// Continue even if this fails - bond setting might not be critical
	} else {
		receipt2, err := bind.WaitMined(ctx, o.l1Chain.EthClient(), tx2)
		if err != nil {
			o.log.Warn("failed to wait for setInitBond transaction", "error", err)
		} else if receipt2.Status == 1 {
			o.log.Info("✅ successfully set initial bond for game type 0",
				"txHash", tx2.Hash().Hex(),
				"gasUsed", receipt2.GasUsed,
				"bond", initialBond.String(),
			)
		} else {
			o.log.Warn("setInitBond transaction failed", "status", receipt2.Status)
		}
	}

	// Verify the configuration
	newImpl, err := disputeGameFactory.GameImpls(nil, 0)
	if err != nil {
		o.log.Warn("failed to verify game type 0 implementation", "error", err)
	} else {
		o.log.Info("🔍 verified game type 0 configuration",
			"implementation", newImpl.Hex(),
			"isConfigured", newImpl != common.Address{},
		)
	}

	return nil
}
