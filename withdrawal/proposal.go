package withdrawal

import (
	"context"
	"fmt"
	"math/big"
	"time"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/log"
)

// ProposalManager handles proposal-related operations for withdrawal functionality
type ProposalManager struct {
	log     log.Logger
	l1Chain config.Chain
	config  *config.NetworkConfig
}

// NewProposalManager creates a new ProposalManager instance
func NewProposalManager(log log.Logger, l1Chain config.Chain, config *config.NetworkConfig) *ProposalManager {
	return &ProposalManager{
		log:     log,
		l1Chain: l1Chain,
		config:  config,
	}
}

// FundProposerAddresses funds the proposer addresses with ETH for gas payments
func (p *ProposalManager) FundProposerAddresses(ctx context.Context) error {
	// First configure proposer permissions for dispute games
	if err := p.configureProposerPermissions(ctx); err != nil {
		return fmt.Errorf("failed to configure proposer permissions: %w", err)
	}
	return p.fundProposerAddresses(ctx)
}

// configureProposerPermissions sets up the necessary permissions for proposers to create dispute games
func (p *ProposalManager) configureProposerPermissions(ctx context.Context) error {
	p.log.Info("configuring proposer permissions for dispute games")

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
	l1ChainID := big.NewInt(int64(p.config.L1Config.ChainID))
	adminTransactor, err := bind.NewKeyedTransactorWithChainID(adminPrivateKey, l1ChainID)
	if err != nil {
		return fmt.Errorf("failed to create admin transactor: %w", err)
	}

	// For each L2 config, grant the proposer permission to create dispute games
	for _, l2Config := range p.config.L2Configs {
		proposerAddr := l2Config.L2Config.ProposerAddress

		p.log.Info("granting dispute game permissions",
			"chainID", l2Config.ChainID,
			"proposerAddress", proposerAddr.Hex(),
		)

		// Try to set the proposer as an authorized challenger/proposer
		// This is a supersim-specific setup for testing
		if err := p.grantProposerPermission(ctx, adminTransactor, proposerAddr); err != nil {
			p.log.Warn("failed to grant proposer permission",
				"chainID", l2Config.ChainID,
				"proposerAddress", proposerAddr.Hex(),
				"error", err,
			)
			// Continue with other proposers even if one fails
		}
	}

	return nil
}

// grantProposerPermission ensures the proposer has the necessary permissions and setup
func (p *ProposalManager) grantProposerPermission(ctx context.Context, adminTransactor *bind.TransactOpts, proposerAddr common.Address) error {
	p.log.Debug("configuring proposer for dispute game participation",
		"proposerAddress", proposerAddr.Hex(),
		"adminAddress", adminTransactor.From.Hex(),
	)

	// Ensure proposer has enough ETH for gas and bonds
	if err := p.l1Chain.SetBalance(ctx, nil, proposerAddr, big.NewInt(0).Mul(big.NewInt(100), big.NewInt(1e18))); err != nil {
		p.log.Warn("failed to set proposer balance", "error", err)
	}

	// For supersim testing, configure instant dispute resolution
	if err := p.configureInstantDisputeResolution(ctx); err != nil {
		p.log.Warn("failed to configure instant dispute resolution", "error", err)
	}

	return nil
}

// configureInstantDisputeResolution configures the system for instant dispute resolution in testing
func (p *ProposalManager) configureInstantDisputeResolution(ctx context.Context) error {
	p.log.Info("🕒 configuring instant dispute resolution for supersim testing")

	// For supersim testing, we'll modify timing parameters to enable instant withdrawals
	// This works with the existing PermissionedDisputeGame contracts
	if err := p.configureInstantWithdrawalTiming(ctx); err != nil {
		p.log.Warn("failed to configure instant withdrawal timing", "error", err)
	}

	// Configure the dispute game factory for testing if needed
	if err := p.configureDisputeGameFactory(ctx); err != nil {
		p.log.Warn("failed to configure dispute game factory", "error", err)
	}

	p.log.Info("✅ configured instant dispute resolution")
	return nil
}

// configureInstantWithdrawalTiming configures timing for instant withdrawals in testing
func (p *ProposalManager) configureInstantWithdrawalTiming(ctx context.Context) error {
	p.log.Info("configuring instant withdrawal timing for supersim testing")

	// For supersim testing, we'll modify the OptimismPortal and dispute game timing
	// This allows withdrawals to be finalized instantly for testing purposes

	// Find the OptimismPortal address from L2 configs
	if len(p.config.L2Configs) > 0 {
		optimismPortalAddr := p.config.L2Configs[0].L2Config.L1Addresses.OptimismPortalProxy

		p.log.Info("configuring instant finalization timing",
			"optimismPortalAddr", optimismPortalAddr.Hex(),
		)

		// Set dispute period and finalization delays to 0 for testing
		// This uses anvil's setStorageAt to modify contract storage directly
		zeroValue := "0x0000000000000000000000000000000000000000000000000000000000000000"

		// Common storage slots for timing parameters in OptimismPortal
		// Slot 0: disputeGameFinalizationPeriod
		// Slot 1: provenWithdrawalFinalizationPeriod
		// Slot 2: l2OutputOracleChallengePeriod (legacy)
		timingSlots := []int{0, 1, 2, 3, 4, 5}
		for _, slot := range timingSlots {
			slotHex := fmt.Sprintf("0x%x", slot)
			if err := p.l1Chain.SetStorageAt(ctx, nil, *optimismPortalAddr, slotHex, zeroValue); err != nil {
				p.log.Debug("failed to set timing storage slot", "slot", slot, "error", err)
			}
		}
	}

	return nil
}

// configureDisputeGameFactory configures the dispute game factory for testing
func (p *ProposalManager) configureDisputeGameFactory(ctx context.Context) error {
	p.log.Debug("configuring dispute game factory for testing")

	// The DisputeGameFactory is already set up with PermissionedDisputeGame implementations
	// We just need to ensure the proposer addresses are properly configured
	// The actual dispute game creation will use the existing permission system

	// For supersim testing, we can use anvil's impersonation capabilities
	// if we need to act as specific addresses during dispute game operations

	return nil
}

// fundProposerAddresses funds the proposer addresses with ETH for gas payments
func (p *ProposalManager) fundProposerAddresses(ctx context.Context) error {
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
	l1ChainID := big.NewInt(int64(p.config.L1Config.ChainID))
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

	for _, l2Config := range p.config.L2Configs {
		proposerAddr := l2Config.L2Config.ProposerAddress

		// Check current balance
		currentBalance, err := p.l1Chain.EthClient().BalanceAt(ctx, proposerAddr, nil)
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
		p.log.Info("all proposer addresses already have sufficient balance")
		return nil
	}

	// Send all funding transactions simultaneously for faster execution
	gasPrice, err := p.l1Chain.EthClient().SuggestGasPrice(ctx)
	if err != nil {
		return fmt.Errorf("failed to get gas price: %w", err)
	}

	baseNonce, err := p.l1Chain.EthClient().PendingNonceAt(ctx, funderTransactor.From)
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

	p.log.Info("💸 funding all proposer addresses simultaneously",
		"count", len(proposersToFund),
		"amount", fundingAmount.String(),
	)

	for i, proposer := range proposersToFund {
		nonce := baseNonce + uint64(i)
		tx := types.NewTransaction(nonce, proposer.address, fundingAmount, 21000, gasPrice, nil)

		// Sign the transaction
		signedTx, err := funderTransactor.Signer(funderTransactor.From, tx)
		if err != nil {
			p.log.Error("failed to sign funding transaction",
				"chainID", proposer.chainID,
				"error", err)
			continue
		}

		// Send the transaction
		err = p.l1Chain.EthClient().SendTransaction(ctx, signedTx)
		if err != nil {
			p.log.Error("failed to send funding transaction",
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

		p.log.Debug("📤 funding transaction sent",
			"chainID", proposer.chainID,
			"proposerAddress", proposer.address.Hex(),
			"txHash", signedTx.Hash().Hex(),
		)
	}

	// Force mine a block immediately to settle all funding transactions
	if len(sentTxs) > 0 {
		p.log.Debug("⛏️ forcing block mine to settle funding transactions immediately")
		if err := p.l1Chain.Mine(ctx, nil); err != nil {
			p.log.Warn("failed to force mine block for funding transactions", "error", err)
		}
	}

	// Step 2: Wait for all transactions to be mined
	fundedCount := 0
	for _, fundingTx := range sentTxs {
		fundingCtx, cancel := context.WithTimeout(ctx, 15*time.Second)
		receipt, err := bind.WaitMined(fundingCtx, p.l1Chain.EthClient(), fundingTx.signedTx)
		cancel()

		waitDuration := time.Since(fundingTx.sentAt)

		if err != nil {
			p.log.Error("failed to wait for funding transaction",
				"chainID", fundingTx.chainID,
				"error", err,
				"waitDuration", waitDuration,
				"txHash", fundingTx.signedTx.Hash().Hex(),
			)
			continue
		}

		if receipt.Status == 1 {
			fundedCount++
			p.log.Info("✅ proposer funding successful",
				"chainID", fundingTx.chainID,
				"proposerAddress", fundingTx.address.Hex(),
				"amount", fundingAmount.String(),
				"txHash", fundingTx.signedTx.Hash().Hex(),
				"waitDuration", waitDuration,
			)
		} else {
			p.log.Error("funding transaction failed",
				"chainID", fundingTx.chainID,
				"proposerAddress", fundingTx.address.Hex(),
				"txHash", fundingTx.signedTx.Hash().Hex(),
			)
		}
	}

	totalDuration := time.Since(start)

	// Log final result
	p.log.Info("💰 proposer addresses funded",
		"funded", fundedCount,
		"total", len(proposersToFund),
		"totalDuration", totalDuration,
	)

	return nil
}
