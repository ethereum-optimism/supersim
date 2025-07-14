package withdrawal

import (
	"context"
	"fmt"
	"math/big"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	"github.com/ethereum-optimism/optimism/op-e2e/bindings"
	"github.com/ethereum-optimism/optimism/op-service/eth"
	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	ssimbindings "github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
)

type OutputRootPoster struct {
	log                log.Logger
	l1Client           *ethclient.Client
	l2Clients          map[uint64]*ethclient.Client // Add L2 clients for proper output root calculation
	networkConfig      *config.NetworkConfig
	disputeGameFactory *bindings.DisputeGameFactory
	devKeys            *devkeys.MnemonicDevKeys
}

func NewOutputRootPoster(log log.Logger, l1Client *ethclient.Client, l2Clients map[uint64]*ethclient.Client, networkConfig *config.NetworkConfig) *OutputRootPoster {
	// Get the dispute game factory
	disputeGameFactory, err := bindings.NewDisputeGameFactory(*networkConfig.L1Config.DisputeGameFactoryAddress, l1Client)
	if err != nil {
		log.Error("failed to create dispute game factory binding", "error", err)
		return nil
	}

	// Get dev keys for transactions
	devKeys, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	if err != nil {
		log.Error("failed to create dev keys", "error", err)
		return nil
	}

	return &OutputRootPoster{
		log:                log,
		l1Client:           l1Client,
		l2Clients:          l2Clients,
		networkConfig:      networkConfig,
		disputeGameFactory: disputeGameFactory,
		devKeys:            devKeys,
	}
}

func (p *OutputRootPoster) PostOutputRoot(chainID uint64, blockNumber uint64, txHash common.Hash) error {
	p.log.Info("posting output root",
		"chainID", chainID,
		"blockNumber", blockNumber,
		"txHash", txHash.Hex(),
	)

	// Get L2 client for the chain
	l2Client := p.l2Clients[chainID]
	if l2Client == nil {
		return fmt.Errorf("no L2 client for chain %d", chainID)
	}

	// Verify the chain exists in our config
	found := false
	for _, cfg := range p.networkConfig.L2Configs {
		if cfg.ChainID == chainID {
			found = true
			break
		}
	}
	if !found {
		return fmt.Errorf("no L2 config found for chain %d", chainID)
	}

	// Find an available game type
	gameType, err := p.findAvailableGameType()
	if err != nil {
		return fmt.Errorf("failed to find available game type: %w", err)
	}

	// If using game type 1 (PermissionedDisputeGame), check what proposer address it expects
	var expectedProposer common.Address
	if gameType == 1 {
		var err error
		expectedProposer, err = p.getExpectedProposerAddress(gameType)
		if err != nil {
			p.log.Warn("failed to get expected proposer address from contract", "error", err)
			// Fall back to our generated address
			expectedProposer = config.GenerateDisputeGameProposerAddress(chainID)
		} else {
			ourProposerAddress := config.GenerateDisputeGameProposerAddress(chainID)
			p.log.Info("🔍 PermissionedDisputeGame contract details",
				"chainID", chainID,
				"gameType", gameType,
				"expectedProposer", expectedProposer.Hex(),
				"ourProposerAddress", ourProposerAddress.Hex(),
				"addressesMatch", expectedProposer == ourProposerAddress,
			)
		}
	} else {
		// For other game types, use our generated address
		expectedProposer = config.GenerateDisputeGameProposerAddress(chainID)
	}

	p.log.Info("🎯 using game type for dispute game creation",
		"chainID", chainID,
		"gameType", gameType,
	)

	// Calculate the real output root based on L2 state
	outputRoot, err := p.calculateRealOutputRoot(l2Client, chainID, blockNumber)
	if err != nil {
		return fmt.Errorf("failed to calculate output root for chain %d: %w", chainID, err)
	}

	// Create dispute game parameters
	extraData := p.encodeExtraData(chainID, blockNumber)

	// Use anvil impersonation to send transaction as the expected proposer
	err = p.impersonateAccount(expectedProposer)
	if err != nil {
		return fmt.Errorf("failed to impersonate proposer account %s: %w", expectedProposer.Hex(), err)
	}

	// Create transactor using a dev key but we'll override the From address to use impersonation
	devKey, err := p.devKeys.Secret(devkeys.UserKey(0))
	if err != nil {
		return fmt.Errorf("failed to get dev key: %w", err)
	}

	transactor, err := bind.NewKeyedTransactorWithChainID(devKey, big.NewInt(int64(p.networkConfig.L1Config.ChainID)))
	if err != nil {
		return fmt.Errorf("failed to create transactor: %w", err)
	}

	// Override the From address to use the impersonated account
	transactor.From = expectedProposer

	// Set gas parameters
	gasPrice, err := p.l1Client.SuggestGasPrice(context.Background())
	if err != nil {
		return fmt.Errorf("failed to get gas price: %w", err)
	}
	transactor.GasPrice = gasPrice
	transactor.GasLimit = 500000

	// Get required bond (should be 0 for testing)
	requiredBond, err := p.disputeGameFactory.InitBonds(nil, gameType)
	if err != nil {
		return fmt.Errorf("failed to get required bond for game type %d: %w", gameType, err)
	}
	transactor.Value = requiredBond

	p.log.Info("💰 bond and gas configuration",
		"chainID", chainID,
		"gameType", gameType,
		"requiredBond", requiredBond.String(),
		"gasPrice", gasPrice.String(),
		"gasLimit", transactor.GasLimit,
	)

	p.log.Info("🎯 creating dispute game with REAL output root",
		"chainID", chainID,
		"gameType", gameType,
		"outputRoot", outputRoot.Hex(),
		"extraDataLength", len(extraData),
		"extraDataHex", fmt.Sprintf("0x%x", extraData),
		"fromAddress", transactor.From.Hex(),
		"bondAmount", requiredBond.String(),
	)

	// Create the dispute game using the dispute game factory
	tx, err := p.disputeGameFactory.Create(transactor, gameType, outputRoot, extraData)
	if err != nil {
		return fmt.Errorf("failed to create dispute game: %w", err)
	}

	p.log.Info("📝 dispute game transaction sent",
		"chainID", chainID,
		"txHash", tx.Hash().Hex(),
		"gameType", gameType,
		"outputRoot", outputRoot.Hex(),
		"fromAddress", transactor.From.Hex(),
	)

	// Wait for transaction receipt
	receipt, err := bind.WaitMined(context.Background(), p.l1Client, tx)
	if err != nil {
		return fmt.Errorf("failed to wait for dispute game transaction: %w", err)
	}

	p.log.Info("📋 dispute game transaction mined",
		"chainID", chainID,
		"txHash", tx.Hash().Hex(),
		"status", receipt.Status,
		"gasUsed", receipt.GasUsed,
		"gasLimit", tx.Gas(),
		"blockNumber", receipt.BlockNumber.Uint64(),
		"contractAddress", receipt.ContractAddress.Hex(),
		"logsCount", len(receipt.Logs),
	)

	if receipt.Status == 0 {
		p.log.Error("❌ dispute game transaction reverted",
			"chainID", chainID,
			"txHash", tx.Hash().Hex(),
			"gasUsed", receipt.GasUsed,
			"gasLimit", tx.Gas(),
			"blockNumber", receipt.BlockNumber.Uint64(),
		)
		return fmt.Errorf("dispute game creation failed for chain %d: transaction reverted", chainID)
	}

	// Log any events from the transaction
	for i, eventLog := range receipt.Logs {
		p.log.Info("📜 transaction log",
			"chainID", chainID,
			"txHash", tx.Hash().Hex(),
			"logIndex", i,
			"address", eventLog.Address.Hex(),
			"topicsCount", len(eventLog.Topics),
			"dataLength", len(eventLog.Data),
		)
	}

	p.log.Info("✅ output root posted successfully with REAL output root",
		"chainID", chainID,
		"blockNumber", blockNumber,
		"outputRoot", outputRoot.Hex(),
		"txHash", tx.Hash().Hex(),
		"gasUsed", receipt.GasUsed,
	)

	return nil
}

// findAvailableGameType finds an available game type that can be used for dispute games
func (p *OutputRootPoster) findAvailableGameType() (uint32, error) {
	// Try game types in order of preference
	// Game type 0 should be configured by the orchestrator to be permissionless
	gameTypesToTry := []uint32{0, 1} // CANNON (0), PERMISSIONED_CANNON (1)

	for _, gameType := range gameTypesToTry {
		impl, err := p.disputeGameFactory.GameImpls(nil, gameType)
		if err != nil {
			p.log.Warn("failed to check game type implementation", "gameType", gameType, "error", err)
			continue
		}

		if impl != (common.Address{}) {
			p.log.Info("🔍 found available game type",
				"gameType", gameType,
				"implementation", impl.Hex(),
			)
			return gameType, nil
		}
	}

	return 0, fmt.Errorf("no available game types found")
}

// calculateRealOutputRoot calculates the actual output root for a given chain and block number
// This follows the OP Stack specification for output root calculation
func (p *OutputRootPoster) calculateRealOutputRoot(l2Client *ethclient.Client, chainID uint64, blockNumber uint64) (common.Hash, error) {
	p.log.Info("🔍 calculating REAL output root from L2 state",
		"chainID", chainID,
		"blockNumber", blockNumber,
	)

	// Get the L2 block at the specified block number
	l2Block, err := l2Client.BlockByNumber(context.Background(), big.NewInt(int64(blockNumber)))
	if err != nil {
		return common.Hash{}, fmt.Errorf("failed to get L2 block %d: %w", blockNumber, err)
	}

	// Get the storage root of the L2ToL1MessagePasser contract
	// This is the messagePasserStorageRoot in the output root calculation
	proof, err := p.getStorageProof(l2Client, predeploys.L2ToL1MessagePasserAddr, common.Hash{}, l2Block.Number())
	if err != nil {
		return common.Hash{}, fmt.Errorf("failed to get L2ToL1MessagePasser storage proof: %w", err)
	}

	// Create OutputV0 structure according to OP Stack specification
	outputV0 := &eth.OutputV0{
		StateRoot:                eth.Bytes32(l2Block.Root()),
		MessagePasserStorageRoot: eth.Bytes32(proof.StorageHash),
		BlockHash:                l2Block.Hash(),
	}

	// Calculate the output root hash
	outputRootBytes32 := eth.OutputRoot(outputV0)
	outputRoot := common.Hash(outputRootBytes32)

	p.log.Info("✅ calculated REAL output root",
		"chainID", chainID,
		"blockNumber", blockNumber,
		"stateRoot", l2Block.Root().Hex(),
		"messagePasserStorageRoot", proof.StorageHash.Hex(),
		"blockHash", l2Block.Hash().Hex(),
		"outputRoot", outputRoot.Hex(),
	)

	return outputRoot, nil
}

// getStorageProof gets the storage proof for the L2ToL1MessagePasser contract
func (p *OutputRootPoster) getStorageProof(client *ethclient.Client, address common.Address, storageSlot common.Hash, blockNumber *big.Int) (*eth.AccountResult, error) {
	var result eth.AccountResult

	// Use the underlying RPC client to call eth_getProof
	rpcClient := client.Client()

	// Format block number as hex string
	blockTag := fmt.Sprintf("0x%x", blockNumber.Uint64())

	// Get proof for the contract's storage root (empty storage slot array gets us the storage root)
	err := rpcClient.CallContext(context.Background(), &result, "eth_getProof", address, []common.Hash{}, blockTag)
	if err != nil {
		return nil, fmt.Errorf("failed to get storage proof: %w", err)
	}

	return &result, nil
}

// encodeExtraData encodes extra data for the dispute game
func (p *OutputRootPoster) encodeExtraData(chainID uint64, blockNumber uint64) []byte {
	// The FaultDisputeGame contract expects extraData to be ABI-encoded uint256
	// This matches the test pattern: extraData = abi.encode(l2BlockNumber)

	// Convert to big.Int for ABI encoding
	blockNumBig := big.NewInt(int64(blockNumber))

	// Use ABI encoding for uint256 - this creates the proper 32-byte ABI-encoded value
	// that matches Solidity's abi.encode(uint256) behavior
	uint256Type, _ := abi.NewType("uint256", "", nil)
	arguments := abi.Arguments{
		{Type: uint256Type},
	}

	extraData, err := arguments.Pack(blockNumBig)
	if err != nil {
		p.log.Error("failed to ABI encode extraData", "error", err)
		// Fallback to previous method if ABI encoding fails
		fallbackData := make([]byte, 32)
		blockNumBig.FillBytes(fallbackData)
		return fallbackData
	}

	p.log.Debug("encoding extra data with ABI encoding",
		"chainID", chainID,
		"blockNumber", blockNumber,
		"blockNumBig", blockNumBig.String(),
		"extraDataHex", fmt.Sprintf("0x%x", extraData),
		"extraDataLength", len(extraData),
	)

	return extraData
}

// getExpectedProposerAddress queries the deployed dispute game to find what proposer address it expects
func (p *OutputRootPoster) getExpectedProposerAddress(gameType uint32) (common.Address, error) {
	// Get the implementation address for this game type
	impl, err := p.disputeGameFactory.GameImpls(nil, gameType)
	if err != nil {
		return common.Address{}, fmt.Errorf("failed to get game implementation: %w", err)
	}

	if impl == (common.Address{}) {
		return common.Address{}, fmt.Errorf("no implementation found for game type %d", gameType)
	}

	// Create a binding to the PermissionedDisputeGame contract
	// Use the PermissionedDisputeGame binding since it has the proposer() getter
	permissionedGame, err := ssimbindings.NewPermissionedDisputeGame(impl, p.l1Client)
	if err != nil {
		return common.Address{}, fmt.Errorf("failed to create PermissionedDisputeGame binding: %w", err)
	}

	// Query the expected proposer address
	expectedProposer, err := permissionedGame.Proposer(nil)
	if err != nil {
		return common.Address{}, fmt.Errorf("failed to get proposer address from contract: %w", err)
	}

	return expectedProposer, nil
}

// impersonateAccount uses anvil's impersonation feature to allow sending transactions as any address
func (p *OutputRootPoster) impersonateAccount(address common.Address) error {
	// Call anvil_impersonateAccount RPC method
	var result bool
	err := p.l1Client.Client().Call(&result, "anvil_impersonateAccount", address)
	if err != nil {
		return fmt.Errorf("failed to impersonate account %s: %w", address.Hex(), err)
	}

	if !result {
		return fmt.Errorf("anvil_impersonateAccount returned false for address %s", address.Hex())
	}

	p.log.Info("✅ successfully impersonated account", "address", address.Hex())
	return nil
}
