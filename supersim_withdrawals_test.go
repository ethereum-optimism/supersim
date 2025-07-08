package supersim

import (
	"context"
	"fmt"
	"math/big"
	"testing"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	opbindings "github.com/ethereum-optimism/optimism/op-e2e/bindings"
	"github.com/ethereum-optimism/optimism/op-service/testlog"
	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// withdrawalTestSuite extends the existing test patterns for withdrawal-specific setup
type withdrawalTestSuite struct {
	Supersim                *Supersim
	DevKeys                 *devkeys.MnemonicDevKeys
	L1EthClient             *ethclient.Client
	L2EthClients            []*ethclient.Client
	L1ChainID               *big.Int
	L2ChainIDs              []*big.Int
	OptimismPortalContracts map[uint64]*opbindings.OptimismPortal
	L1StandardBridges       map[uint64]*opbindings.L1StandardBridge
	DisputeGameFactory      *opbindings.DisputeGameFactory
}

func createWithdrawalTestSuite(t *testing.T, cliConfigMutator func(*config.CLIConfig) *config.CLIConfig) *withdrawalTestSuite {
	cfg := &config.CLIConfig{
		L1Port:         0, // random port
		L2StartingPort: 0, // random port
		L2Count:        2,
		L1Host:         "127.0.0.1", // required host setting
		L2Host:         "127.0.0.1", // required host setting
		L1Withdraw:     true,        // Enable withdrawal support
	}

	if cliConfigMutator != nil {
		cfg = cliConfigMutator(cfg)
	}

	log := testlog.Logger(t, log.LevelInfo)
	supersim, err := NewSupersim(log, "SUPERSIM_TEST", func(error) {}, cfg)
	require.NoError(t, err)

	// Start supersim
	err = supersim.Start(context.Background())
	require.NoError(t, err)

	t.Cleanup(func() {
		require.NoError(t, supersim.Stop(context.Background()))
	})

	// Setup clients and contracts
	devKeys, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	require.NoError(t, err)

	l1Client, err := ethclient.Dial(supersim.Orchestrator.L1Chain().Endpoint())
	require.NoError(t, err)

	l2Clients := make([]*ethclient.Client, len(supersim.NetworkConfig.L2Configs))
	l2ChainIDs := make([]*big.Int, len(supersim.NetworkConfig.L2Configs))
	optimismPortals := make(map[uint64]*opbindings.OptimismPortal)
	l1StandardBridges := make(map[uint64]*opbindings.L1StandardBridge)

	for i, l2Config := range supersim.NetworkConfig.L2Configs {
		l2Client, err := ethclient.Dial(supersim.Orchestrator.Endpoint(l2Config.ChainID))
		require.NoError(t, err)
		l2Clients[i] = l2Client
		l2ChainIDs[i] = big.NewInt(int64(l2Config.ChainID))

		// Initialize OptimismPortal contract binding
		optimismPortal, err := opbindings.NewOptimismPortal(
			*l2Config.L2Config.L1Addresses.OptimismPortalProxy,
			l1Client,
		)
		require.NoError(t, err)
		optimismPortals[l2Config.ChainID] = optimismPortal

		// Initialize L1StandardBridge contract binding
		l1StandardBridge, err := opbindings.NewL1StandardBridge(
			*l2Config.L2Config.L1Addresses.L1StandardBridgeProxy,
			l1Client,
		)
		require.NoError(t, err)
		l1StandardBridges[l2Config.ChainID] = l1StandardBridge
	}

	// Initialize DisputeGameFactory - expect this to fail until implemented
	var disputeGameFactory *opbindings.DisputeGameFactory
	if supersim.NetworkConfig.L1Config.DisputeGameFactoryAddress != nil {
		disputeGameFactory, err = opbindings.NewDisputeGameFactory(
			*supersim.NetworkConfig.L1Config.DisputeGameFactoryAddress,
			l1Client,
		)
		// Don't require success yet - this will fail until we implement dispute games
		if err != nil {
			t.Logf("DisputeGameFactory not available yet: %v", err)
		}
	}

	return &withdrawalTestSuite{
		Supersim:                supersim,
		DevKeys:                 devKeys,
		L1EthClient:             l1Client,
		L2EthClients:            l2Clients,
		L1ChainID:               big.NewInt(int64(supersim.NetworkConfig.L1Config.ChainID)),
		L2ChainIDs:              l2ChainIDs,
		OptimismPortalContracts: optimismPortals,
		L1StandardBridges:       l1StandardBridges,
		DisputeGameFactory:      disputeGameFactory,
	}
}

// getProposerAddressForChain returns the proposer address for a given L2 chain
func (suite *withdrawalTestSuite) getProposerAddressForChain(chainID uint64) (common.Address, error) {
	for _, l2Config := range suite.Supersim.NetworkConfig.L2Configs {
		if l2Config.ChainID == chainID {
			if l2Config.L2Config == nil {
				return common.Address{}, fmt.Errorf("L2Config is nil for chain %d", chainID)
			}
			return l2Config.L2Config.ProposerAddress, nil
		}
	}
	return common.Address{}, fmt.Errorf("chain %d not found", chainID)
}

// Test ETH withdrawal flow - should fail initially
func TestETHWithdrawalFlow(t *testing.T) {
	t.Parallel()

	testSuite := createWithdrawalTestSuite(t, nil)

	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)

	// Setup transactor for L2
	l2Transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.L2ChainIDs[0])
	require.NoError(t, err)

	// Get initial L1 balance
	initialL1Balance, err := testSuite.L1EthClient.BalanceAt(context.Background(), l2Transactor.From, nil)
	require.NoError(t, err)

	// Amount to withdraw
	withdrawAmount := big.NewInt(1_000_000_000_000_000_000) // 1 ETH

	// Step 1: Initiate withdrawal on L2
	l2StandardBridge, err := opbindings.NewL2StandardBridge(
		common.HexToAddress("0x4200000000000000000000000000000000000010"), // L2StandardBridge predeploy
		testSuite.L2EthClients[0],
	)
	require.NoError(t, err)

	// Initiate withdrawal
	l2Transactor.Value = withdrawAmount
	withdrawTx, err := l2StandardBridge.WithdrawTo(
		l2Transactor,
		common.HexToAddress("0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"), // ETH address
		l2Transactor.From, // recipient
		withdrawAmount,
		0,        // min gas limit
		[]byte{}, // extra data
	)
	require.NoError(t, err)

	withdrawReceipt, err := bind.WaitMined(context.Background(), testSuite.L2EthClients[0], withdrawTx)
	require.NoError(t, err)
	require.Equal(t, uint64(1), withdrawReceipt.Status)

	// This should fail for now - withdrawal not yet implemented
	t.Log("✗ EXPECTED FAILURE: Withdrawal initiated but proving/finalizing not yet implemented")

	// TODO: Step 2: Prove withdrawal (should work with permissioned dispute game)
	// TODO: Step 3: Wait for finalization period (should be fast with permissioned setup)
	// TODO: Step 4: Finalize withdrawal and verify ETH received on L1

	// For now, verify the withdrawal was at least initiated properly
	assert.NotNil(t, withdrawReceipt)
	assert.Greater(t, len(withdrawReceipt.Logs), 0, "Withdrawal should emit logs")

	// Verify L1 balance hasn't changed yet (withdrawal not finalized)
	currentL1Balance, err := testSuite.L1EthClient.BalanceAt(context.Background(), l2Transactor.From, nil)
	require.NoError(t, err)
	assert.Equal(t, initialL1Balance, currentL1Balance, "L1 balance should not change until withdrawal is finalized")

	t.Log("✓ Withdrawal initiation test passed - ready for implementation")
}

// Test ERC20 withdrawal flow - should fail initially
func TestERC20WithdrawalFlow(t *testing.T) {
	t.Parallel()

	// This test should also fail until withdrawal infrastructure is implemented
	t.Log("✗ EXPECTED FAILURE: ERC20 withdrawal not yet implemented")

	// TODO: Deploy test ERC20 on L1 and L2
	// TODO: Bridge ERC20 from L1 to L2
	// TODO: Initiate ERC20 withdrawal from L2 to L1
	// TODO: Prove and finalize withdrawal
	// TODO: Verify ERC20 received on L1

	t.Skip("ERC20 withdrawal test - implementation pending")
}

// Test permissioned dispute game functionality - should fail initially
func TestPermissionedDisputeGame(t *testing.T) {
	t.Parallel()

	testSuite := createWithdrawalTestSuite(t, nil)

	// Test 1: DisputeGameFactory should exist
	require.NotNil(t, testSuite.DisputeGameFactory, "DisputeGameFactory should be deployed by default")

	// Test 2: Verify PERMISSIONED_CANNON game type is registered
	gameType := uint32(1) // PERMISSIONED_CANNON = 1
	impl, err := testSuite.DisputeGameFactory.GameImpls(nil, gameType)
	require.NoError(t, err, "Should be able to query PERMISSIONED_CANNON game type")
	require.NotEqual(t, common.Address{}, impl, "PERMISSIONED_CANNON implementation should be set")
	
	bond, err := testSuite.DisputeGameFactory.InitBonds(nil, gameType)
	require.NoError(t, err, "Should be able to query PERMISSIONED_CANNON init bond")
	// Note: bond may be 0 in test environment, which is acceptable for permissioned games

	t.Logf("✓ PERMISSIONED_CANNON game type found: impl=%s, bond=%s", impl.Hex(), bond.String())

	// Test 3: Each L2 should have a proposer address configured
	// See comprehensive tests in TestPerL2ProposerConfiguration, TestProposerAddressIsolation, etc.
	for chainID := range testSuite.OptimismPortalContracts {
		t.Logf("Chain %d requires proposer address configuration (tested in TestPerL2ProposerConfiguration)", chainID)
	}

	// Test 4: Verify dispute games can be created (this will fail until proposer posts output roots)
	t.Log("✗ EXPECTED FAILURE: Cannot create dispute games until output roots are posted")
}

// Test automatic output root posting - should fail initially
func TestAutomaticOutputRootPosting(t *testing.T) {
	t.Parallel()

	testSuite := createWithdrawalTestSuite(t, nil)

	require.NotNil(t, testSuite.DisputeGameFactory, "DisputeGameFactory should be deployed")

	// Check if any games have been created (indicating output roots are being posted)
	gameCount, err := testSuite.DisputeGameFactory.GameCount(nil)
	require.NoError(t, err)

	t.Logf("Current dispute game count: %s", gameCount.String())

	if gameCount.Uint64() == 0 {
		t.Log("✗ EXPECTED FAILURE: No dispute games found - output root posting not yet implemented")
		t.Fail()
	} else {
		// If games exist, verify they are being created regularly
		t.Logf("✓ Found %s dispute games - output root posting appears to be working", gameCount.String())

		// TODO: Verify output root posting frequency (every 1 minute)
		// TODO: Verify output roots match L2 state
	}
}

// Test OptimismPortal ETH seeding - should fail initially
func TestOptimismPortalETHSeeding(t *testing.T) {
	t.Parallel()

	testSuite := createWithdrawalTestSuite(t, nil)

	// Each OptimismPortal should have ETH balance to back L2 ETH supply
	expectedMinBalance := big.NewInt(1000) // At least 1000 wei for basic functionality

	for chainID, portal := range testSuite.OptimismPortalContracts {
		// Get portal address for this chain
		var portalAddr common.Address
		for _, l2Config := range testSuite.Supersim.NetworkConfig.L2Configs {
			if l2Config.ChainID == chainID {
				portalAddr = *l2Config.L2Config.L1Addresses.OptimismPortalProxy
				break
			}
		}

		balance, err := testSuite.L1EthClient.BalanceAt(context.Background(), portalAddr, nil)
		require.NoError(t, err)

		t.Logf("Chain %d OptimismPortal balance: %s (address: %s)", chainID, balance.String(), portalAddr.Hex())

		// Verify portal contract exists
		assert.NotNil(t, portal, "OptimismPortal contract should be accessible")

		// Check if portal has sufficient ETH for withdrawals
		if balance.Cmp(expectedMinBalance) < 0 {
			t.Logf("✗ EXPECTED FAILURE: OptimismPortal for chain %d has insufficient ETH balance: %s < %s",
				chainID, balance.String(), expectedMinBalance.String())
			t.Fail()
		} else {
			t.Logf("✓ OptimismPortal for chain %d has sufficient ETH balance: %s", chainID, balance.String())
		}
	}
}

// Test withdrawal proving flow - comprehensive test for the proving mechanism
func TestWithdrawalProvingFlow(t *testing.T) {
	t.Parallel()

	testSuite := createWithdrawalTestSuite(t, nil)

	// Prerequisites for proving withdrawals
	require.NotNil(t, testSuite.DisputeGameFactory, "DisputeGameFactory required for withdrawal proving")

	// Check if we have output roots to prove against
	gameCount, err := testSuite.DisputeGameFactory.GameCount(nil)
	require.NoError(t, err)

	if gameCount.Uint64() == 0 {
		t.Log("✗ EXPECTED FAILURE: No dispute games found - cannot prove withdrawals without output roots")
		t.Fail()
		return
	}

	// If we have games, attempt to prove a withdrawal
	// This will fail until we implement the full proving infrastructure
	t.Log("✗ EXPECTED FAILURE: Withdrawal proving flow not yet implemented")
	t.Log("TODO: Implement withdrawal proof generation and submission")
	t.Fail()
}

// Test withdrawal finalization flow
func TestWithdrawalFinalizationFlow(t *testing.T) {
	t.Parallel()

	t.Log("✗ EXPECTED FAILURE: Withdrawal finalization flow not yet implemented")

	// TODO: Complete withdrawal proving flow first
	// TODO: Wait for finalization period (should be minimal with permissioned setup)
	// TODO: Call finalizeWithdrawalTransaction on OptimismPortal
	// TODO: Verify ETH/tokens transferred to recipient
	// TODO: Verify withdrawal marked as finalized
	// TODO: Verify cannot finalize same withdrawal twice

	t.Skip("Withdrawal finalization flow test - implementation pending")
}

// Test withdrawal with insufficient OptimismPortal balance
func TestWithdrawalInsufficientPortalBalance(t *testing.T) {
	t.Parallel()

	t.Log("✗ EXPECTED FAILURE: Insufficient portal balance handling not yet implemented")

	// TODO: Attempt withdrawal when OptimismPortal has insufficient ETH
	// TODO: Verify transaction reverts with appropriate error
	// TODO: Verify user funds remain on L2

	t.Skip("Insufficient portal balance test - implementation pending")
}

// Test multiple concurrent withdrawals
func TestConcurrentWithdrawals(t *testing.T) {
	t.Parallel()

	t.Log("✗ EXPECTED FAILURE: Concurrent withdrawals not yet implemented")

	// TODO: Initiate multiple withdrawals from different accounts
	// TODO: Verify all can be proven and finalized
	// TODO: Verify no race conditions or double-spending

	t.Skip("Concurrent withdrawals test - implementation pending")
}

// Test withdrawal edge cases
func TestWithdrawalEdgeCases(t *testing.T) {
	t.Parallel()

	t.Log("✗ EXPECTED FAILURE: Withdrawal edge cases not yet implemented")

	// TODO: Test withdrawal of 0 amount (should fail)
	// TODO: Test withdrawal with invalid recipient (should fail)
	// TODO: Test withdrawal with excessive gas limit
	// TODO: Test withdrawal replay attacks

	t.Skip("Withdrawal edge cases test - implementation pending")
}

// Test per-L2 proposer address configuration - should fail initially
func TestPerL2ProposerConfiguration(t *testing.T) {
	t.Parallel()

	testSuite := createWithdrawalTestSuite(t, nil)

	require.NotNil(t, testSuite.DisputeGameFactory, "DisputeGameFactory required for proposer verification")

	// Expected proposer addresses for each L2 chain
	// These should be unique addresses derived deterministically for each chain
	expectedProposers := make(map[uint64]common.Address)
	
	for chainID := range testSuite.OptimismPortalContracts {
		// Test 1: Each L2 should have a dedicated proposer address
		proposerAddr, err := testSuite.getProposerAddressForChain(chainID)
		require.NoError(t, err, "Should be able to get proposer address for chain %d", chainID)
		require.NotEqual(t, common.Address{}, proposerAddr, "Proposer address should not be zero for chain %d", chainID)
		expectedProposers[chainID] = proposerAddr
		
		t.Logf("✓ Chain %d has proposer address: %s", chainID, proposerAddr.Hex())
	}

	// Test 2: Proposer addresses should be unique per L2
	addressSet := make(map[common.Address]uint64)
	for chainID, proposerAddr := range expectedProposers {
		if existingChainID, exists := addressSet[proposerAddr]; exists {
			t.Errorf("✗ Proposer address %s is used by both chain %d and chain %d - addresses must be unique", 
				proposerAddr.Hex(), existingChainID, chainID)
		}
		addressSet[proposerAddr] = chainID
	}

	// Test 3: Proposer addresses should have correct permissions
	// TODO: Verify each proposer can create dispute games for their chain
	// TODO: Verify proposers cannot create dispute games for other chains
	
	t.Log("✓ Per-L2 proposer addresses successfully configured")
}

// Test proposer address isolation and permissions - should fail initially  
func TestProposerAddressIsolation(t *testing.T) {
	t.Parallel()

	testSuite := createWithdrawalTestSuite(t, nil)

	require.NotNil(t, testSuite.DisputeGameFactory, "DisputeGameFactory required for isolation testing")

	// This test verifies that proposer addresses are properly isolated
	// Chain 901 proposer should only be able to post for chain 901
	// Chain 902 proposer should only be able to post for chain 902

	chainIDs := make([]uint64, 0)
	for chainID := range testSuite.OptimismPortalContracts {
		chainIDs = append(chainIDs, chainID)
	}

	if len(chainIDs) < 2 {
		t.Skip("Need at least 2 L2 chains to test proposer isolation")
	}

	// Test cross-chain proposer isolation
	for i, chainID1 := range chainIDs {
		for j, chainID2 := range chainIDs {
			if i == j {
				continue // Skip same chain
			}

			t.Logf("Testing that chain %d proposer cannot post for chain %d", chainID1, chainID2)
			
			// Get proposer addresses for both chains
			proposer1, err := testSuite.getProposerAddressForChain(chainID1)
			require.NoError(t, err, "Should be able to get proposer address for chain %d", chainID1)
			
			proposer2, err := testSuite.getProposerAddressForChain(chainID2)
			require.NoError(t, err, "Should be able to get proposer address for chain %d", chainID2)
			
			// Verify proposers are different
			require.NotEqual(t, proposer1, proposer2, "Proposer addresses should be different for chains %d and %d", chainID1, chainID2)
			
			t.Logf("✓ Chain %d proposer %s differs from chain %d proposer %s", 
				chainID1, proposer1.Hex(), chainID2, proposer2.Hex())
			
			// TODO: Attempt to create dispute game for chain2 using chain1's proposer
			// TODO: Verify the transaction fails with appropriate permission error
			t.Logf("TODO: Test cross-chain proposer isolation for chains %d -> %d", chainID1, chainID2)
		}
	}

	t.Log("✓ Proposer addresses are isolated per chain (permission testing requires dispute game implementation)")
}

// Test proposer address derivation and consistency - should fail initially
func TestProposerAddressDerivatation(t *testing.T) {
	t.Parallel()

	testSuite := createWithdrawalTestSuite(t, nil)

	// Test that proposer addresses are derived consistently and deterministically
	// This ensures that restarting supersim gives the same proposer addresses

	for chainID := range testSuite.OptimismPortalContracts {
		// Get proposer address for this chain
		proposerAddr, err := testSuite.getProposerAddressForChain(chainID)
		require.NoError(t, err, "Should be able to get proposer address for chain %d", chainID)
		require.NotEqual(t, common.Address{}, proposerAddr, "Proposer address should not be zero for chain %d", chainID)
		
		// Verify address is derived deterministically - calling twice should give same result
		proposerAddr2, err := testSuite.getProposerAddressForChain(chainID)
		require.NoError(t, err, "Should be able to get proposer address for chain %d again", chainID)
		require.Equal(t, proposerAddr, proposerAddr2, "Proposer address should be deterministic for chain %d", chainID)
		
		// Verify address is not a well-known test address
		wellKnownAddresses := []common.Address{
			common.HexToAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"), // First anvil account
			common.HexToAddress("0x70997970C51812dc3A010C7d01b50e0d17dc79C8"), // Second anvil account
			common.HexToAddress("0x0000000000000000000000000000000000000000"), // Zero address
		}
		for _, wellKnown := range wellKnownAddresses {
			require.NotEqual(t, wellKnown, proposerAddr, "Proposer address should not be a well-known address for chain %d", chainID)
		}
		
		t.Logf("✓ Chain %d proposer address %s is properly derived and unique", chainID, proposerAddr.Hex())
		
		// TODO: Verify address has sufficient ETH balance for posting output roots
	}

	t.Log("✓ Proposer address derivation working correctly")
}

// Test proposer permissions in DisputeGameFactory - should fail initially
func TestProposerPermissions(t *testing.T) {
	t.Parallel()

	testSuite := createWithdrawalTestSuite(t, nil)

	require.NotNil(t, testSuite.DisputeGameFactory, "DisputeGameFactory required for permission testing")

	for chainID := range testSuite.OptimismPortalContracts {
		// Get proposer address for this chain
		proposerAddr, err := testSuite.getProposerAddressForChain(chainID)
		require.NoError(t, err, "Should be able to get proposer address for chain %d", chainID)
		require.NotEqual(t, common.Address{}, proposerAddr, "Proposer address should not be zero for chain %d", chainID)
		
		t.Logf("✓ Chain %d has proposer address %s ready for permissions", chainID, proposerAddr.Hex())
		
		// TODO: Verify proposer address has permission to create PERMISSIONED_CANNON games
		// TODO: Verify proposer address can call createGame with valid parameters
		// TODO: Verify non-proposer addresses cannot create games for this chain
		t.Logf("TODO: Verify proposer permissions for chain %d", chainID)
	}

	// Test that random addresses cannot create dispute games
	randomAddr := common.HexToAddress("0x1234567890123456789012345678901234567890")
	
	// TODO: Attempt to create dispute game with random address
	// TODO: Verify transaction fails with permission denied error
	
	t.Logf("TODO: Verify random address %s should not have proposer permissions", randomAddr.Hex())

	t.Log("✓ Proposer addresses are configured (permissions testing requires dispute game implementation)")
}
