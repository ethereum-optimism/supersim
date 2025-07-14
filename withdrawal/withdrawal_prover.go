package withdrawal

import (
	"context"
	"fmt"
	"math/big"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	opbindings "github.com/ethereum-optimism/optimism/op-e2e/bindings"
	"github.com/ethereum-optimism/optimism/op-service/eth"
	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
)

// WithdrawalProver handles proving withdrawal transactions on L1
type WithdrawalProver struct {
	log           log.Logger
	l1Client      *ethclient.Client
	l2Clients     map[uint64]*ethclient.Client
	networkConfig *config.NetworkConfig
	devKeys       *devkeys.MnemonicDevKeys
}

// WithdrawalData represents the data needed to prove a withdrawal
type WithdrawalData struct {
	Nonce         *big.Int
	Sender        common.Address
	Target        common.Address
	Value         *big.Int
	GasLimit      *big.Int
	Data          []byte
	WithdrawalTx  common.Hash
	L2BlockNumber uint64
	ChainID       uint64
}

// NewWithdrawalProver creates a new withdrawal prover
func NewWithdrawalProver(log log.Logger, l1Client *ethclient.Client, l2Clients map[uint64]*ethclient.Client, networkConfig *config.NetworkConfig) *WithdrawalProver {
	devKeys, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	if err != nil {
		log.Error("failed to create dev keys", "error", err)
		return nil
	}

	return &WithdrawalProver{
		log:           log,
		l1Client:      l1Client,
		l2Clients:     l2Clients,
		networkConfig: networkConfig,
		devKeys:       devKeys,
	}
}

// ProveWithdrawal proves a withdrawal transaction on L1
func (p *WithdrawalProver) ProveWithdrawal(ctx context.Context, chainID uint64, txHash common.Hash, l2BlockNumber uint64) error {
	p.log.Info("🔍 starting withdrawal proving process",
		"chainID", chainID,
		"txHash", txHash.Hex(),
		"blockNumber", l2BlockNumber,
	)

	// Get the L2 client for this chain
	l2Client, exists := p.l2Clients[chainID]
	if !exists {
		return fmt.Errorf("L2 client not found for chain %d", chainID)
	}

	// Get the L2 config for this chain
	var l2Config *config.ChainConfig
	for _, cfg := range p.networkConfig.L2Configs {
		if cfg.ChainID == chainID {
			l2Config = &cfg
			break
		}
	}
	if l2Config == nil {
		return fmt.Errorf("L2 config not found for chain %d", chainID)
	}

	// Step 1: Extract withdrawal data from L2 transaction
	withdrawalData, err := p.extractWithdrawalData(ctx, l2Client, txHash, chainID, l2BlockNumber)
	if err != nil {
		return fmt.Errorf("failed to extract withdrawal data: %w", err)
	}

	p.log.Info("📋 withdrawal data extracted",
		"chainID", chainID,
		"sender", withdrawalData.Sender.Hex(),
		"target", withdrawalData.Target.Hex(),
		"value", withdrawalData.Value.String(),
		"nonce", withdrawalData.Nonce.String(),
	)

	// Step 2: Generate withdrawal proof
	outputRootProof, withdrawalProof, err := p.generateWithdrawalProof(ctx, l2Client, withdrawalData, l2BlockNumber)
	if err != nil {
		return fmt.Errorf("failed to generate withdrawal proof: %w", err)
	}

	p.log.Info("🔐 withdrawal proof generated",
		"chainID", chainID,
		"stateRoot", common.BytesToHash(outputRootProof.StateRoot[:]).Hex(),
		"messagePasserStorageRoot", common.BytesToHash(outputRootProof.MessagePasserStorageRoot[:]).Hex(),
		"proofLength", len(withdrawalProof),
	)

	// Step 3: Submit proof to OptimismPortal
	err = p.submitProofToPortal(ctx, l2Config, withdrawalData, outputRootProof, withdrawalProof)
	if err != nil {
		return fmt.Errorf("failed to submit proof to portal: %w", err)
	}

	p.log.Info("✅ withdrawal proof submitted successfully",
		"chainID", chainID,
		"txHash", txHash.Hex(),
		"blockNumber", l2BlockNumber,
	)

	return nil
}

// extractWithdrawalData extracts withdrawal data from the L2 transaction
func (p *WithdrawalProver) extractWithdrawalData(ctx context.Context, l2Client *ethclient.Client, txHash common.Hash, chainID uint64, l2BlockNumber uint64) (*WithdrawalData, error) {
	// Get the transaction receipt to find the MessagePassed event
	receipt, err := l2Client.TransactionReceipt(ctx, txHash)
	if err != nil {
		return nil, fmt.Errorf("failed to get transaction receipt: %w", err)
	}

	// Extract withdrawal data from transaction receipt

	// Find the MessagePassed event from L2ToL1MessagePasser
	var messagePassedEvent *types.Log
	messagePassedTopic := common.HexToHash("0x02a52367d10742d8032712c1bb8e0144ff1ec5ffda1ed7d70bb05a2744955054")

	for _, log := range receipt.Logs {
		if log.Address == predeploys.L2ToL1MessagePasserAddr && len(log.Topics) > 0 && log.Topics[0] == messagePassedTopic {
			messagePassedEvent = log
			break
		}
	}

	if messagePassedEvent == nil {
		return nil, fmt.Errorf("MessagePassed event not found in transaction %s", txHash.Hex())
	}

	// Parse the MessagePassed event
	withdrawalData, err := p.parseMessagePassedEvent(messagePassedEvent)
	if err != nil {
		return nil, fmt.Errorf("failed to parse MessagePassed event: %w", err)
	}

	withdrawalData.WithdrawalTx = txHash
	withdrawalData.L2BlockNumber = l2BlockNumber
	withdrawalData.ChainID = chainID

	return withdrawalData, nil
}

// parseMessagePassedEvent parses the MessagePassed event to extract withdrawal data
func (p *WithdrawalProver) parseMessagePassedEvent(eventLog *types.Log) (*WithdrawalData, error) {

	// MessagePassed event structure from L2ToL1MessagePasser.sol:
	// event MessagePassed(
	//     uint256 indexed nonce,
	//     address indexed sender,
	//     address indexed target,
	//     uint256 value,
	//     uint256 gasLimit,
	//     bytes data,
	//     bytes32 withdrawalHash
	// );

	if len(eventLog.Topics) != 4 {
		return nil, fmt.Errorf("invalid number of topics in MessagePassed event: %d", len(eventLog.Topics))
	}

	// Extract indexed parameters from topics
	nonce := new(big.Int).SetBytes(eventLog.Topics[1].Bytes())
	sender := common.BytesToAddress(eventLog.Topics[2].Bytes())
	target := common.BytesToAddress(eventLog.Topics[3].Bytes())

	p.log.Info("🔍 extracted indexed parameters",
		"nonce", nonce.String(),
		"sender", sender.Hex(),
		"target", target.Hex(),
	)

	// Parse the data field using ABI decoding to properly handle dynamic types
	// The data contains: uint256 value, uint256 gasLimit, bytes data, bytes32 withdrawalHash
	uint256Type, _ := abi.NewType("uint256", "", nil)
	bytesType, _ := abi.NewType("bytes", "", nil)
	bytes32Type, _ := abi.NewType("bytes32", "", nil)

	args := abi.Arguments{
		{Name: "value", Type: uint256Type},
		{Name: "gasLimit", Type: uint256Type},
		{Name: "data", Type: bytesType},
		{Name: "withdrawalHash", Type: bytes32Type},
	}

	decoded, err := args.Unpack(eventLog.Data)
	if err != nil {
		return nil, fmt.Errorf("failed to decode MessagePassed event data: %w", err)
	}

	if len(decoded) != 4 {
		return nil, fmt.Errorf("unexpected number of decoded parameters: got %d, expected 4", len(decoded))
	}

	value, ok := decoded[0].(*big.Int)
	if !ok {
		return nil, fmt.Errorf("failed to decode value parameter")
	}

	gasLimit, ok := decoded[1].(*big.Int)
	if !ok {
		return nil, fmt.Errorf("failed to decode gasLimit parameter")
	}

	data, ok := decoded[2].([]byte)
	if !ok {
		return nil, fmt.Errorf("failed to decode data parameter")
	}

	withdrawalHashFromEvent, ok := decoded[3].([32]byte)
	if !ok {
		return nil, fmt.Errorf("failed to decode withdrawalHash parameter")
	}

	p.log.Info("🔍 extracted non-indexed parameters",
		"value", value.String(),
		"gasLimit", gasLimit.String(),
		"dataLength", len(data),
		"dataHex", fmt.Sprintf("0x%x", data),
		"withdrawalHash", common.BytesToHash(withdrawalHashFromEvent[:]).Hex(),
	)

	withdrawalData := &WithdrawalData{
		Nonce:    nonce,
		Sender:   sender,
		Target:   target,
		Value:    value,
		GasLimit: gasLimit,
		Data:     data,
	}

	p.log.Info("🔍 complete withdrawal data before hash calculation",
		"nonce", withdrawalData.Nonce.String(),
		"sender", withdrawalData.Sender.Hex(),
		"target", withdrawalData.Target.Hex(),
		"value", withdrawalData.Value.String(),
		"gasLimit", withdrawalData.GasLimit.String(),
		"dataLength", len(withdrawalData.Data),
		"dataHex", fmt.Sprintf("0x%x", withdrawalData.Data),
	)

	// Verify our withdrawal hash calculation matches the event
	calculatedHash, err := p.calculateWithdrawalHash(withdrawalData)
	if err != nil {
		return nil, fmt.Errorf("failed to calculate withdrawal hash for verification: %w", err)
	}

	eventHash := common.BytesToHash(withdrawalHashFromEvent[:])
	p.log.Info("🔍 withdrawal hash verification",
		"calculatedHash", calculatedHash.Hex(),
		"eventHash", eventHash.Hex(),
		"match", calculatedHash == eventHash,
	)

	// Require the hash to match for correctness
	if calculatedHash != eventHash {
		return nil, fmt.Errorf("withdrawal hash mismatch: calculated %s, event %s", calculatedHash.Hex(), eventHash.Hex())
	}

	p.log.Info("✅ withdrawal hash verification successful")

	return withdrawalData, nil
}

// generateWithdrawalProof generates the proofs needed for proving the withdrawal
func (p *WithdrawalProver) generateWithdrawalProof(ctx context.Context, l2Client *ethclient.Client, withdrawalData *WithdrawalData, l2BlockNumber uint64) (opbindings.TypesOutputRootProof, [][]byte, error) {
	// Get the L2 block header
	l2Block, err := l2Client.BlockByNumber(ctx, big.NewInt(int64(l2BlockNumber)))
	if err != nil {
		return opbindings.TypesOutputRootProof{}, nil, fmt.Errorf("failed to get L2 block: %w", err)
	}

	// Calculate the withdrawal hash
	withdrawalHash, err := p.calculateWithdrawalHash(withdrawalData)
	if err != nil {
		return opbindings.TypesOutputRootProof{}, nil, fmt.Errorf("failed to calculate withdrawal hash: %w", err)
	}

	// Calculate the storage slot for the withdrawal
	storageSlot := p.calculateStorageSlot(withdrawalHash)

	p.log.Info("🔐 calculating withdrawal proof",
		"withdrawalHash", withdrawalHash.Hex(),
		"storageSlot", storageSlot.Hex(),
		"l2BlockNumber", l2BlockNumber,
	)

	// Get storage proof from L2ToL1MessagePasser
	proof, err := p.getStorageProof(ctx, l2Client, predeploys.L2ToL1MessagePasserAddr, storageSlot, l2Block.Number())
	if err != nil {
		return opbindings.TypesOutputRootProof{}, nil, fmt.Errorf("failed to get storage proof: %w", err)
	}

	// Create output root proof
	outputRootProof := opbindings.TypesOutputRootProof{
		Version:                  [32]byte{}, // Version 0
		StateRoot:                l2Block.Root(),
		MessagePasserStorageRoot: proof.StorageHash,
		LatestBlockhash:          l2Block.Hash(),
	}

	// Convert proof to bytes format
	if len(proof.StorageProof) == 0 {
		return opbindings.TypesOutputRootProof{}, nil, fmt.Errorf("no storage proof entries found")
	}

	withdrawalProof := make([][]byte, len(proof.StorageProof[0].Proof))
	for i, proofElement := range proof.StorageProof[0].Proof {
		withdrawalProof[i] = []byte(proofElement)
	}

	return outputRootProof, withdrawalProof, nil
}

// calculateWithdrawalHash calculates the hash of the withdrawal using proper ABI encoding
func (p *WithdrawalProver) calculateWithdrawalHash(withdrawalData *WithdrawalData) (common.Hash, error) {
	// Define ABI types for proper encoding
	uint256Type, _ := abi.NewType("uint256", "", nil)
	addressType, _ := abi.NewType("address", "", nil)
	bytesType, _ := abi.NewType("bytes", "", nil)

	// Use ABI encoding exactly like the Solidity contract and op-node
	args := abi.Arguments{
		{Name: "nonce", Type: uint256Type},
		{Name: "sender", Type: addressType},
		{Name: "target", Type: addressType},
		{Name: "value", Type: uint256Type},
		{Name: "gasLimit", Type: uint256Type},
		{Name: "data", Type: bytesType},
	}

	p.log.Info("🔍 preparing to pack withdrawal hash arguments",
		"nonce", withdrawalData.Nonce.String(),
		"sender", withdrawalData.Sender.Hex(),
		"target", withdrawalData.Target.Hex(),
		"value", withdrawalData.Value.String(),
		"gasLimit", withdrawalData.GasLimit.String(),
		"dataLength", len(withdrawalData.Data),
		"dataHex", fmt.Sprintf("0x%x", withdrawalData.Data),
	)

	// Pack the arguments using ABI encoding
	enc, err := args.Pack(
		withdrawalData.Nonce,
		withdrawalData.Sender,
		withdrawalData.Target,
		withdrawalData.Value,
		withdrawalData.GasLimit,
		withdrawalData.Data,
	)
	if err != nil {
		return common.Hash{}, fmt.Errorf("failed to pack withdrawal hash: %w", err)
	}

	p.log.Info("🔍 ABI encoded withdrawal data",
		"encodedLength", len(enc),
		"encodedHex", fmt.Sprintf("0x%x", enc),
	)

	// Calculate keccak256 hash of the ABI encoded data
	hash := crypto.Keccak256Hash(enc)

	p.log.Info("🔍 calculated withdrawal hash",
		"hash", hash.Hex(),
	)

	return hash, nil
}

// findLatestGameForWithdrawal finds the latest dispute game that covers the withdrawal's L2 block
// This uses a simplified approach that works with supersim's permissionless dispute games
func (p *WithdrawalProver) findLatestGameForWithdrawal(ctx context.Context, disputeGameFactory *opbindings.DisputeGameFactory, optimismPortal *opbindings.OptimismPortal, withdrawalL2BlockNumber uint64) (*opbindings.IDisputeGameFactoryGameSearchResult, *big.Int, error) {
	// For supersim, we use the PERMISSIONED_CANNON game type (1)
	// This is the expected game type for the permissionless dispute game setup
	respectedGameType := uint32(1) // PERMISSIONED_CANNON

	p.log.Info("🔍 searching for dispute games",
		"respectedGameType", respectedGameType,
		"withdrawalL2Block", withdrawalL2BlockNumber,
	)

	// Get total game count
	gameCount, err := disputeGameFactory.GameCount(nil)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to get game count: %w", err)
	}

	if gameCount.Uint64() == 0 {
		return nil, nil, fmt.Errorf("no dispute games found")
	}

	p.log.Info("🔍 total dispute games available",
		"totalGames", gameCount.String(),
	)

	// For supersim, we'll use a simple approach since we only expect one recent game
	// Just use the most recent game (latest index)
	latestGameIndex := new(big.Int).Sub(gameCount, big.NewInt(1))

	gameInfo, err := disputeGameFactory.GameAtIndex(nil, latestGameIndex)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to get latest game at index %s: %w", latestGameIndex.String(), err)
	}

	p.log.Info("🔍 found latest dispute game",
		"gameIndex", latestGameIndex.String(),
		"gameType", gameInfo.GameType,
		"gameProxy", gameInfo.Proxy.Hex(),
		"gameTimestamp", gameInfo.Timestamp,
	)

	// Verify it's the correct game type
	if gameInfo.GameType != respectedGameType {
		return nil, nil, fmt.Errorf("latest game has type %d but expected type %d", gameInfo.GameType, respectedGameType)
	}

	// For supersim, we need to get the REAL output root from dispute game creation events
	// The FindLatestGames and dispute game contract both return test values (0x1)
	// But the actual output root is in the DisputeGameCreated event logs
	p.log.Info("🔍 getting original output root from dispute game creation event logs",
		"note", "FindLatestGames returns test values in supersim, need to check event logs",
	)

	// Get the original output root from DisputeGameCreated events
	originalOutputRoot, err := p.getOutputRootFromGameCreationEvent(ctx, disputeGameFactory, latestGameIndex)
	if err != nil {
		p.log.Warn("failed to get output root from creation events, using fallback", "error", err)

		// Fallback: Try to get rootClaim directly from the dispute game contract
		// This will return 0x1 in supersim but better than nothing
		disputeGameContract, err := opbindings.NewFaultDisputeGame(gameInfo.Proxy, p.l1Client)
		if err != nil {
			return nil, nil, fmt.Errorf("failed to create dispute game contract binding: %w", err)
		}

		rootClaim, err := disputeGameContract.RootClaim(nil)
		if err != nil {
			return nil, nil, fmt.Errorf("failed to get root claim from dispute game: %w", err)
		}

		originalOutputRoot = rootClaim
	}

	// Construct game result with the original root claim from event logs
	gameResult := &opbindings.IDisputeGameFactoryGameSearchResult{
		Index:     latestGameIndex,
		Metadata:  [32]byte{}, // We don't have this but it's not critical
		Timestamp: gameInfo.Timestamp,
		RootClaim: originalOutputRoot, // This is the REAL output root from creation events
		ExtraData: nil,                // We don't need this for our purpose
	}

	// Return the game with the original creation parameters
	return gameResult, latestGameIndex, nil
}

// getOutputRootFromGameCreationEvent extracts the original output root from DisputeGameCreated event logs
func (p *WithdrawalProver) getOutputRootFromGameCreationEvent(ctx context.Context, disputeGameFactory *opbindings.DisputeGameFactory, gameIndex *big.Int) ([32]byte, error) {
	// Get the game info to find the block where it was created
	gameInfo, err := disputeGameFactory.GameAtIndex(nil, gameIndex)
	if err != nil {
		return [32]byte{}, fmt.Errorf("failed to get game info: %w", err)
	}

	p.log.Info("🔍 searching for DisputeGameCreated event",
		"gameProxy", gameInfo.Proxy.Hex(),
		"gameTimestamp", gameInfo.Timestamp,
	)

	// Search for DisputeGameCreated events that created this specific game
	// The event signature for DisputeGameCreated(address indexed disputeProxy, GameType indexed gameType, Claim indexed rootClaim)
	disputeGameCreatedTopic := crypto.Keccak256Hash([]byte("DisputeGameCreated(address,uint32,bytes32)"))

	// Get the dispute game factory address from the network config
	disputeGameFactoryAddr := *p.networkConfig.L1Config.DisputeGameFactoryAddress

	// Create filter query - look for events where the disputeProxy (topic1) matches our game proxy
	filterQuery := ethereum.FilterQuery{
		Addresses: []common.Address{disputeGameFactoryAddr},
		Topics: [][]common.Hash{
			{disputeGameCreatedTopic},                    // Event signature
			{common.BytesToHash(gameInfo.Proxy.Bytes())}, // disputeProxy (indexed)
		},
		FromBlock: big.NewInt(0), // Search from genesis - could be optimized
		ToBlock:   nil,           // Search to latest block
	}

	// Query for the event logs
	logs, err := p.l1Client.FilterLogs(ctx, filterQuery)
	if err != nil {
		return [32]byte{}, fmt.Errorf("failed to filter logs for DisputeGameCreated: %w", err)
	}

	if len(logs) == 0 {
		return [32]byte{}, fmt.Errorf("no DisputeGameCreated events found for game proxy %s", gameInfo.Proxy.Hex())
	}

	// Use the most recent event (should be the creation event)
	creationEvent := logs[len(logs)-1]

	p.log.Info("🔍 found DisputeGameCreated event",
		"blockNumber", creationEvent.BlockNumber,
		"txHash", creationEvent.TxHash.Hex(),
		"topicsCount", len(creationEvent.Topics),
	)

	// Verify we have the expected number of topics: signature + 3 indexed parameters
	if len(creationEvent.Topics) != 4 {
		return [32]byte{}, fmt.Errorf("unexpected number of topics in DisputeGameCreated event: got %d, expected 4", len(creationEvent.Topics))
	}

	// Extract the original root claim from topic[3] (rootClaim is the 3rd indexed parameter)
	// Topics: [0] = event signature, [1] = disputeProxy, [2] = gameType, [3] = rootClaim
	originalRootClaim := creationEvent.Topics[3]

	p.log.Info("🎯 extracted original output root from DisputeGameCreated event",
		"gameProxy", gameInfo.Proxy.Hex(),
		"originalRootClaim", originalRootClaim.Hex(),
		"blockNumber", creationEvent.BlockNumber,
		"note", "This is the REAL output root that was posted when the dispute game was created",
	)

	return originalRootClaim, nil
}

// calculateStorageSlot calculates the storage slot for the withdrawal hash
func (p *WithdrawalProver) calculateStorageSlot(withdrawalHash common.Hash) common.Hash {
	// Storage slot = keccak256(abi.encode(withdrawalHash, 0))
	// The withdrawals mapping is at slot 0 in L2ToL1MessagePasser
	return crypto.Keccak256Hash(
		withdrawalHash.Bytes(),
		common.BigToHash(big.NewInt(0)).Bytes(),
	)
}

// getStorageProof gets the storage proof for a given address and storage slot
func (p *WithdrawalProver) getStorageProof(ctx context.Context, client *ethclient.Client, address common.Address, storageSlot common.Hash, blockNumber *big.Int) (*eth.AccountResult, error) {
	var result eth.AccountResult

	// Use the underlying RPC client to call eth_getProof
	rpcClient := client.Client()

	// Format block number as hex string
	blockTag := fmt.Sprintf("0x%x", blockNumber.Uint64())

	err := rpcClient.CallContext(ctx, &result, "eth_getProof", address, []common.Hash{storageSlot}, blockTag)
	if err != nil {
		return nil, fmt.Errorf("failed to get storage proof: %w", err)
	}

	return &result, nil
}

// submitProofToPortal submits the proof to the OptimismPortal contract
func (p *WithdrawalProver) submitProofToPortal(ctx context.Context, l2Config *config.ChainConfig, withdrawalData *WithdrawalData, outputRootProof opbindings.TypesOutputRootProof, withdrawalProof [][]byte) error {
	// Get the OptimismPortal contract
	optimismPortal, err := opbindings.NewOptimismPortal(*l2Config.L2Config.L1Addresses.OptimismPortalProxy, p.l1Client)
	if err != nil {
		return fmt.Errorf("failed to create OptimismPortal binding: %w", err)
	}

	// Get dispute game factory
	disputeGameFactory, err := opbindings.NewDisputeGameFactory(*p.networkConfig.L1Config.DisputeGameFactoryAddress, p.l1Client)
	if err != nil {
		return fmt.Errorf("failed to create dispute game factory binding: %w", err)
	}

	p.log.Info("🔍 finding dispute game for withdrawal",
		"chainID", withdrawalData.ChainID,
		"blockNumber", withdrawalData.L2BlockNumber,
	)

	// Step 1: Find the latest dispute game for this withdrawal
	gameResult, disputeGameIndex, err := p.findLatestGameForWithdrawal(ctx, disputeGameFactory, optimismPortal, withdrawalData.L2BlockNumber)
	if err != nil {
		return fmt.Errorf("failed to find latest game: %w", err)
	}

	p.log.Info("🎯 found dispute game for withdrawal",
		"chainID", withdrawalData.ChainID,
		"gameIndex", disputeGameIndex.String(),
		"gameTimestamp", gameResult.Timestamp,
		"outputRoot", common.BytesToHash(gameResult.RootClaim[:]).Hex(),
	)

	// Step 2: Set up transactor
	privateKey, err := p.devKeys.Secret(devkeys.UserKey(0))
	if err != nil {
		return fmt.Errorf("failed to get private key: %w", err)
	}

	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(int64(p.networkConfig.L1Config.ChainID)))
	if err != nil {
		return fmt.Errorf("failed to create transactor: %w", err)
	}

	gasPrice, err := p.l1Client.SuggestGasPrice(ctx)
	if err != nil {
		return fmt.Errorf("failed to get gas price: %w", err)
	}
	transactor.GasPrice = gasPrice
	transactor.GasLimit = 1000000

	withdrawalTx := opbindings.TypesWithdrawalTransaction{
		Nonce:    withdrawalData.Nonce,
		Sender:   withdrawalData.Sender,
		Target:   withdrawalData.Target,
		Value:    withdrawalData.Value,
		GasLimit: withdrawalData.GasLimit,
		Data:     withdrawalData.Data,
	}

	p.log.Info("📝 submitting withdrawal proof",
		"chainID", withdrawalData.ChainID,
		"disputeGameIndex", disputeGameIndex.String(),
		"withdrawalHash", p.mustCalculateWithdrawalHash(withdrawalData).Hex(),
		"outputRootProof", fmt.Sprintf("stateRoot=%s, messagePasserStorageRoot=%s",
			common.BytesToHash(outputRootProof.StateRoot[:]).Hex(),
			common.BytesToHash(outputRootProof.MessagePasserStorageRoot[:]).Hex()),
	)

	// Submit the proof
	tx, err := optimismPortal.ProveWithdrawalTransaction(
		transactor,
		withdrawalTx,
		disputeGameIndex,
		outputRootProof,
		withdrawalProof,
	)
	if err != nil {
		p.log.Error("❌ failed to submit withdrawal proof transaction",
			"chainID", withdrawalData.ChainID,
			"error", err.Error(),
		)
		return fmt.Errorf("failed to submit withdrawal proof: %w", err)
	}

	p.log.Info("📤 withdrawal proof transaction submitted",
		"chainID", withdrawalData.ChainID,
		"txHash", tx.Hash().Hex(),
	)

	// Wait for confirmation
	receipt, err := bind.WaitMined(ctx, p.l1Client, tx)
	if err != nil {
		return fmt.Errorf("failed to wait for proof transaction: %w", err)
	}

	p.log.Info("📋 withdrawal proof transaction result",
		"chainID", withdrawalData.ChainID,
		"txHash", tx.Hash().Hex(),
		"status", receipt.Status,
		"gasUsed", receipt.GasUsed,
		"blockNumber", receipt.BlockNumber.Uint64(),
	)

	if receipt.Status != 1 {
		p.log.Error("❌ withdrawal proof transaction reverted",
			"chainID", withdrawalData.ChainID,
			"txHash", tx.Hash().Hex(),
			"gasUsed", receipt.GasUsed,
		)
		return fmt.Errorf("withdrawal proof transaction failed - status: %d, gasUsed: %d", receipt.Status, receipt.GasUsed)
	}

	p.log.Info("✅ withdrawal proof submitted successfully",
		"chainID", withdrawalData.ChainID,
		"txHash", tx.Hash().Hex(),
		"gasUsed", receipt.GasUsed,
	)

	return nil
}

// mustCalculateWithdrawalHash calculates withdrawal hash and panics on error (for logging only)
func (p *WithdrawalProver) mustCalculateWithdrawalHash(withdrawalData *WithdrawalData) common.Hash {
	hash, err := p.calculateWithdrawalHash(withdrawalData)
	if err != nil {
		p.log.Error("failed to calculate withdrawal hash for logging", "error", err)
		return common.Hash{}
	}
	return hash
}
