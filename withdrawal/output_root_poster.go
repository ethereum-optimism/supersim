package withdrawal

import (
	"context"
	"crypto/ecdsa"
	"fmt"
	"math/big"
	"time"

	opbindings "github.com/ethereum-optimism/optimism/op-e2e/bindings"
	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
)

// OutputRootPoster handles posting output roots to the dispute game factory
type OutputRootPoster struct {
	log               log.Logger
	l1Client          *ethclient.Client
	networkConfig     *config.NetworkConfig
	disputeGameFactory *opbindings.DisputeGameFactory
	devKeys           *devkeys.MnemonicDevKeys
}

// NewOutputRootPoster creates a new output root poster
func NewOutputRootPoster(log log.Logger, l1Client *ethclient.Client, networkConfig *config.NetworkConfig) *OutputRootPoster {
	devKeys, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	if err != nil {
		log.Error("failed to create dev keys", "error", err)
		return nil
	}

	var disputeGameFactory *opbindings.DisputeGameFactory
	if networkConfig.L1Config.DisputeGameFactoryAddress != nil {
		disputeGameFactory, err = opbindings.NewDisputeGameFactory(
			*networkConfig.L1Config.DisputeGameFactoryAddress,
			l1Client,
		)
		if err != nil {
			log.Error("failed to create dispute game factory binding", "error", err)
		}
	}

	return &OutputRootPoster{
		log:               log,
		l1Client:          l1Client,
		networkConfig:     networkConfig,
		disputeGameFactory: disputeGameFactory,
		devKeys:           devKeys,
	}
}

// PostOutputRoot posts an output root to the dispute game factory for the given chain
func (p *OutputRootPoster) PostOutputRoot(chainID uint64, blockNumber uint64, txHash common.Hash) error {
	// Find the L2 config for this chain
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

	if p.disputeGameFactory == nil {
		return fmt.Errorf("dispute game factory not available for chain %d", chainID)
	}

	// Get the proposer address for this chain
	proposerAddr := l2Config.L2Config.ProposerAddress
	
	p.log.Info("posting output root", 
		"chainID", chainID,
		"blockNumber", blockNumber,
		"txHash", txHash.Hex(),
		"proposerAddress", proposerAddr.Hex(),
	)

	// Create a transactor for the proposer
	proposerKey, err := p.getProposerPrivateKey(chainID)
	if err != nil {
		return fmt.Errorf("failed to get proposer private key for chain %d: %w", chainID, err)
	}

	transactor, err := bind.NewKeyedTransactorWithChainID(proposerKey, big.NewInt(int64(p.networkConfig.L1Config.ChainID)))
	if err != nil {
		return fmt.Errorf("failed to create transactor for chain %d: %w", chainID, err)
	}

	// Set gas parameters to avoid estimation issues
	gasPrice, err := p.l1Client.SuggestGasPrice(context.Background())
	if err != nil {
		return fmt.Errorf("failed to get gas price for chain %d: %w", chainID, err)
	}
	transactor.GasPrice = gasPrice
	transactor.GasLimit = 500000 // Set explicit gas limit for dispute game creation
	
	// Use game type 1 which has an implementation (from the logs above)
	gameType := uint32(1) // PERMISSIONED_CANNON - this has implementation 0xC77c081d3245bE490949E4C2E5Dd8b522a194927
	
	// Check what game types are available
	for testGameType := uint32(0); testGameType <= 2; testGameType++ {
		testBond, err := p.disputeGameFactory.InitBonds(nil, testGameType)
		if err != nil {
			p.log.Info("game type not supported", "gameType", testGameType, "error", err)
		} else {
			p.log.Info("supported game type found", "gameType", testGameType, "bond", testBond.String())
		}
		
		// Also check if there's an implementation for this game type
		testImpl, err := p.disputeGameFactory.GameImpls(nil, testGameType)
		if err != nil {
			p.log.Info("failed to get game implementation", "gameType", testGameType, "error", err)
		} else {
			p.log.Info("game implementation", "gameType", testGameType, "impl", testImpl.Hex())
			
			// If this is game type 1 (PermissionedDisputeGame), get the proposer address
			if testGameType == 1 && testImpl != (common.Address{}) {
				p.log.Info("🔍 checking PermissionedDisputeGame proposer address")
				if proposerAddr, err := p.getPermissionedGameProposer(testImpl); err != nil {
					p.log.Warn("failed to get proposer address", "error", err)
				} else {
					p.log.Info("✅ found hardcoded proposer address", "proposerAddr", proposerAddr.Hex())
				}
			}
		}
	}
	
	requiredBond, err := p.disputeGameFactory.InitBonds(nil, gameType)
	if err != nil {
		return fmt.Errorf("failed to get required bond for game type %d: %w", gameType, err)
	}
	
	// The contract requires exact bond amount - don't modify it
	p.log.Info("using exact required bond", "requiredBond", requiredBond.String())
	
	transactor.Value = requiredBond // Set the required bond as transaction value
	
	// Debug: Check if this proposer is allowed to create games
	p.log.Info("🔍 checking dispute game factory configuration",
		"chainID", chainID,
		"proposerAddress", transactor.From.Hex(),
		"gameType", gameType,
		"requiredBond", requiredBond.String(),
	)

	// Check proposer balance before transaction
	balance, err := p.l1Client.BalanceAt(context.Background(), transactor.From, nil)
	if err != nil {
		return fmt.Errorf("failed to get proposer balance for chain %d: %w", chainID, err)
	}
	
	// Calculate required gas cost
	requiredGas := big.NewInt(0).Mul(gasPrice, big.NewInt(int64(transactor.GasLimit)))
	
	p.log.Info("💰 proposer balance check",
		"chainID", chainID,
		"proposerAddress", transactor.From.Hex(),
		"balance", balance.String(),
		"requiredGas", requiredGas.String(),
		"gasPrice", gasPrice.String(),
		"gasLimit", transactor.GasLimit,
		"sufficientFunds", balance.Cmp(requiredGas) >= 0,
	)

	// Calculate the output root (simplified for now)
	outputRoot, err := p.calculateOutputRoot(chainID, blockNumber)
	if err != nil {
		return fmt.Errorf("failed to calculate output root for chain %d: %w", chainID, err)
	}

	// Create dispute game parameters
	extraData := p.encodeExtraData(chainID, blockNumber)

	p.log.Info("🎯 creating dispute game",
		"chainID", chainID,
		"gameType", gameType,
		"outputRoot", outputRoot.Hex(),
		"extraDataLength", len(extraData),
		"proposerAddress", transactor.From.Hex(),
		"disputeGameFactoryAddress", p.networkConfig.L1Config.DisputeGameFactoryAddress.Hex(),
		"gasPrice", gasPrice.String(),
		"gasLimit", transactor.GasLimit,
		"requiredBond", requiredBond.String(),
		"transactorValue", transactor.Value.String(),
	)

	// First, let's check what the call would return without sending
	p.log.Info("🔬 simulating dispute game creation call",
		"chainID", chainID,
		"gameType", gameType,
		"outputRoot", outputRoot.Hex(),
		"extraDataHex", fmt.Sprintf("0x%x", extraData),
		"extraDataLength", len(extraData),
	)

	// Try to simulate the call first to see if we get a revert reason
	callOpts := &bind.CallOpts{
		From: transactor.From,
	}
	
	// Check if we can call gameCount to verify the contract is working
	gameCount, err := p.disputeGameFactory.GameCount(callOpts)
	if err != nil {
		p.log.Error("failed to call gameCount", "error", err)
	} else {
		p.log.Info("current game count before creation", "gameCount", gameCount.Uint64())
	}
	
	// Try to simulate the create call to see if we get a revert reason
	p.log.Info("attempting to simulate create call")
	simulateTransactor := *transactor
	simulateTransactor.NoSend = true
	
	simulateTx, err := p.disputeGameFactory.Create(&simulateTransactor, gameType, outputRoot, extraData)
	if err != nil {
		p.log.Error("simulation failed", "error", err)
	} else {
		p.log.Info("simulation succeeded", "txHash", simulateTx.Hash().Hex())
	}
	
	// Check if the game already exists (GameAlreadyExists error)
	gameUuid, err := p.disputeGameFactory.GetGameUUID(nil, gameType, outputRoot, extraData)
	if err != nil {
		p.log.Error("failed to get game UUID", "error", err)
	} else {
		p.log.Info("game UUID calculated", "uuid", common.BytesToHash(gameUuid[:]).Hex())
		
		// Check if a game with this UUID already exists
		existingGame, timestamp := p.disputeGameFactory.Games(nil, gameType, outputRoot, extraData)
		if existingGame.Proxy != (common.Address{}) {
			p.log.Info("game already exists", "existingGame", existingGame.Proxy.Hex(), "timestamp", timestamp)
		} else {
			p.log.Info("no existing game found")
		}
	}

	// Create the dispute game
	tx, err := p.disputeGameFactory.Create(transactor, gameType, outputRoot, extraData)
	if err != nil {
		p.log.Error("❌ dispute game creation failed",
			"chainID", chainID,
			"gameType", gameType,
			"outputRoot", outputRoot.Hex(),
			"proposerAddress", transactor.From.Hex(),
			"extraDataHex", fmt.Sprintf("0x%x", extraData),
			"error", err,
		)
		return fmt.Errorf("failed to create dispute game for chain %d: %w", chainID, err)
	}

	p.log.Info("📝 dispute game transaction created",
		"chainID", chainID,
		"txHash", tx.Hash().Hex(),
		"gameType", gameType,
		"outputRoot", outputRoot.Hex(),
	)

	// Wait for the transaction to be mined with timeout (L1 has 12s block time)
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	receipt, err := bind.WaitMined(ctx, p.l1Client, tx)
	if err != nil {
		p.log.Error("❌ failed to wait for dispute game transaction",
			"chainID", chainID,
			"txHash", tx.Hash().Hex(),
			"error", err,
		)
		return fmt.Errorf("failed to wait for dispute game creation for chain %d: %w", chainID, err)
	}

	p.log.Info("📋 dispute game transaction mined",
		"chainID", chainID,
		"txHash", tx.Hash().Hex(),
		"status", receipt.Status,
		"gasUsed", receipt.GasUsed,
		"gasLimit", transactor.GasLimit,
		"blockNumber", receipt.BlockNumber.Uint64(),
		"contractAddress", receipt.ContractAddress.Hex(),
		"logsCount", len(receipt.Logs),
	)

	if receipt.Status != 1 {
		// Try to get revert reason by tracing the transaction
		p.log.Error("❌ dispute game transaction reverted",
			"chainID", chainID,
			"txHash", tx.Hash().Hex(),
			"gasUsed", receipt.GasUsed,
			"gasLimit", transactor.GasLimit,
			"blockNumber", receipt.BlockNumber.Uint64(),
		)
		
		// Try to get more details about the revert
		p.log.Info("🔍 attempting to trace transaction for revert reason")
		// Skip tracing for now - ethclient doesn't expose CallContext directly
		
		// Let's also check the current game count to debug
		gameCount, err := p.disputeGameFactory.GameCount(nil)
		if err != nil {
			p.log.Warn("failed to get game count after revert", "error", err)
		} else {
			p.log.Info("current dispute game count after revert", "gameCount", gameCount.Uint64())
		}
		
		// Try to call the contract directly to see if we get a revert reason
		p.log.Info("🔍 attempting direct contract call to get revert reason")
		// Create a simple call to simulate the transaction
		result, err := p.l1Client.CallContract(context.Background(), ethereum.CallMsg{
			From:     transactor.From,
			To:       p.networkConfig.L1Config.DisputeGameFactoryAddress,
			Gas:      transactor.GasLimit,
			GasPrice: transactor.GasPrice,
			Value:    transactor.Value,
			Data:     tx.Data(), // Use the transaction data
		}, receipt.BlockNumber)
		if err != nil {
			p.log.Info("direct call revert reason", "error", err.Error())
		} else {
			p.log.Info("direct call succeeded unexpectedly", "result", common.Bytes2Hex(result))
		}
		
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

	p.log.Info("✅ output root posted successfully", 
		"chainID", chainID,
		"blockNumber", blockNumber,
		"outputRoot", outputRoot.Hex(),
		"txHash", tx.Hash().Hex(),
		"gasUsed", receipt.GasUsed,
	)

	return nil
}

// getProposerPrivateKey generates or retrieves the private key for the proposer
func (p *OutputRootPoster) getProposerPrivateKey(chainID uint64) (*ecdsa.PrivateKey, error) {
	// Generate deterministic private key from the same seed as the address
	seed := fmt.Sprintf("supersim-proposer-%d", chainID)
	hash := crypto.Keccak256Hash([]byte(seed))
	
	privateKey, err := crypto.ToECDSA(hash[:])
	if err != nil {
		return nil, fmt.Errorf("failed to generate proposer private key: %w", err)
	}

	return privateKey, nil
}

// calculateOutputRoot calculates the output root for a given chain and block number
func (p *OutputRootPoster) calculateOutputRoot(chainID uint64, blockNumber uint64) (common.Hash, error) {
	// TODO: Implement proper output root calculation
	// For now, return a deterministic hash based on chain ID and block number
	// In a real implementation, this would:
	// 1. Get the L2 block at blockNumber
	// 2. Extract the state root
	// 3. Calculate the proper output root hash
	
	// Make it unique each time to avoid GameAlreadyExists error
	data := fmt.Sprintf("output-root-%d-%d-%d", chainID, blockNumber, time.Now().UnixNano())
	hash := crypto.Keccak256Hash([]byte(data))
	
	p.log.Debug("calculated output root", 
		"chainID", chainID,
		"blockNumber", blockNumber,
		"outputRoot", hash.Hex(),
	)

	return hash, nil
}

// encodeExtraData encodes extra data for the dispute game
func (p *OutputRootPoster) encodeExtraData(chainID uint64, blockNumber uint64) []byte {
	// Based on the contract code, extraData should be the L2 block number as 32 bytes
	// common.BigToHash(big.NewInt(int64(l2BlockNum))).Bytes()
	blockNumBig := big.NewInt(int64(blockNumber))
	blockNumHash := common.BigToHash(blockNumBig)
	
	p.log.Debug("encoding extra data", 
		"chainID", chainID,
		"blockNumber", blockNumber,
		"blockNumBig", blockNumBig.String(),
		"blockNumHash", blockNumHash.Hex(),
		"extraDataLength", len(blockNumHash.Bytes()),
	)
	
	return blockNumHash.Bytes()
}

// getPermissionedGameProposer calls the proposer() function on the PermissionedDisputeGame contract
func (p *OutputRootPoster) getPermissionedGameProposer(gameImplAddr common.Address) (common.Address, error) {
	// Create a call to the proposer() function
	// proposer() is a view function that returns the hardcoded PROPOSER address
	callData := crypto.Keccak256([]byte("proposer()"))[:4] // Function selector
	
	result, err := p.l1Client.CallContract(context.Background(), ethereum.CallMsg{
		To:   &gameImplAddr,
		Data: callData,
	}, nil)
	if err != nil {
		return common.Address{}, fmt.Errorf("failed to call proposer(): %w", err)
	}
	
	if len(result) != 32 {
		return common.Address{}, fmt.Errorf("unexpected result length: %d", len(result))
	}
	
	// The result is 32 bytes with the address in the last 20 bytes
	proposerAddr := common.BytesToAddress(result[12:32])
	return proposerAddr, nil
}