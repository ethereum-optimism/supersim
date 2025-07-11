package withdrawal

import (
	"context"
	"fmt"
	"math/big"

	opbindings "github.com/ethereum-optimism/optimism/op-e2e/bindings"
	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	"github.com/ethereum-optimism/optimism/op-service/eth"
	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/supersim/config"
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
	// MessagePassed event structure:
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

	// Parse the data field to extract value, gasLimit, and data
	if len(eventLog.Data) < 96 { // 32 bytes for value + 32 bytes for gasLimit + 32 bytes for data offset
		return nil, fmt.Errorf("insufficient data in MessagePassed event")
	}

	value := new(big.Int).SetBytes(eventLog.Data[0:32])
	gasLimit := new(big.Int).SetBytes(eventLog.Data[32:64])
	
	// The data field starts at offset 64, but we need to parse the dynamic bytes
	dataOffset := new(big.Int).SetBytes(eventLog.Data[64:96]).Uint64()
	
	var data []byte
	if dataOffset+32 <= uint64(len(eventLog.Data)) {
		dataLength := new(big.Int).SetBytes(eventLog.Data[dataOffset:dataOffset+32]).Uint64()
		if dataOffset+32+dataLength <= uint64(len(eventLog.Data)) {
			data = eventLog.Data[dataOffset+32 : dataOffset+32+dataLength]
		}
	}

	return &WithdrawalData{
		Nonce:    nonce,
		Sender:   sender,
		Target:   target,
		Value:    value,
		GasLimit: gasLimit,
		Data:     data,
	}, nil
}

// generateWithdrawalProof generates the proofs needed for proving the withdrawal
func (p *WithdrawalProver) generateWithdrawalProof(ctx context.Context, l2Client *ethclient.Client, withdrawalData *WithdrawalData, l2BlockNumber uint64) (opbindings.TypesOutputRootProof, [][]byte, error) {
	// Get the L2 block header
	l2Block, err := l2Client.BlockByNumber(ctx, big.NewInt(int64(l2BlockNumber)))
	if err != nil {
		return opbindings.TypesOutputRootProof{}, nil, fmt.Errorf("failed to get L2 block: %w", err)
	}

	// Calculate the withdrawal hash
	withdrawalHash := p.calculateWithdrawalHash(withdrawalData)
	
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

// calculateWithdrawalHash calculates the hash of the withdrawal
func (p *WithdrawalProver) calculateWithdrawalHash(withdrawalData *WithdrawalData) common.Hash {
	// Calculate withdrawal hash: keccak256(abi.encode(nonce, sender, target, value, gasLimit, data))
	return crypto.Keccak256Hash(
		common.BigToHash(withdrawalData.Nonce).Bytes(),
		common.LeftPadBytes(withdrawalData.Sender.Bytes(), 32),
		common.LeftPadBytes(withdrawalData.Target.Bytes(), 32),
		common.BigToHash(withdrawalData.Value).Bytes(),
		common.BigToHash(withdrawalData.GasLimit).Bytes(),
		crypto.Keccak256(withdrawalData.Data),
	)
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

	// Create a transactor using the first dev key (for testing)
	privateKey, err := p.devKeys.Secret(devkeys.UserKey(0))
	if err != nil {
		return fmt.Errorf("failed to get private key: %w", err)
	}

	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(int64(p.networkConfig.L1Config.ChainID)))
	if err != nil {
		return fmt.Errorf("failed to create transactor: %w", err)
	}

	// Set gas parameters
	gasPrice, err := p.l1Client.SuggestGasPrice(ctx)
	if err != nil {
		return fmt.Errorf("failed to get gas price: %w", err)
	}
	transactor.GasPrice = gasPrice
	transactor.GasLimit = 1000000 // High gas limit for proving

	// Create the withdrawal transaction struct
	withdrawalTx := opbindings.TypesWithdrawalTransaction{
		Nonce:    withdrawalData.Nonce,
		Sender:   withdrawalData.Sender,
		Target:   withdrawalData.Target,
		Value:    withdrawalData.Value,
		GasLimit: withdrawalData.GasLimit,
		Data:     withdrawalData.Data,
	}

	// We need to get the dispute game index - for now, use 0 (latest)
	disputeGameIndex := big.NewInt(0)

	p.log.Info("📝 submitting withdrawal proof to OptimismPortal",
		"chainID", withdrawalData.ChainID,
		"sender", withdrawalData.Sender.Hex(),
		"target", withdrawalData.Target.Hex(),
		"value", withdrawalData.Value.String(),
		"disputeGameIndex", disputeGameIndex.String(),
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
		return fmt.Errorf("failed to submit withdrawal proof: %w", err)
	}

	// Wait for the transaction to be mined
	receipt, err := bind.WaitMined(ctx, p.l1Client, tx)
	if err != nil {
		return fmt.Errorf("failed to wait for proof transaction: %w", err)
	}

	if receipt.Status != 1 {
		return fmt.Errorf("withdrawal proof transaction failed")
	}

	p.log.Info("✅ withdrawal proof submitted successfully",
		"chainID", withdrawalData.ChainID,
		"txHash", tx.Hash().Hex(),
		"gasUsed", receipt.GasUsed,
	)

	return nil
}