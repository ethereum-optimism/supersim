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

	// Calculate the output root (simplified for now)
	outputRoot, err := p.calculateOutputRoot(chainID, blockNumber)
	if err != nil {
		return fmt.Errorf("failed to calculate output root for chain %d: %w", chainID, err)
	}

	// Create dispute game parameters
	gameType := uint32(1) // PERMISSIONED_CANNON
	extraData := p.encodeExtraData(chainID, blockNumber)

	p.log.Info("🎯 creating dispute game",
		"chainID", chainID,
		"gameType", gameType,
		"outputRoot", outputRoot.Hex(),
		"extraDataLength", len(extraData),
		"proposerAddress", transactor.From.Hex(),
		"disputeGameFactoryAddress", p.networkConfig.L1Config.DisputeGameFactoryAddress.Hex(),
	)

	// Create the dispute game
	tx, err := p.disputeGameFactory.Create(transactor, gameType, outputRoot, extraData)
	if err != nil {
		p.log.Error("❌ dispute game creation failed",
			"chainID", chainID,
			"gameType", gameType,
			"outputRoot", outputRoot.Hex(),
			"proposerAddress", transactor.From.Hex(),
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

	// Wait for the transaction to be mined
	receipt, err := bind.WaitMined(context.Background(), p.l1Client, tx)
	if err != nil {
		return fmt.Errorf("failed to wait for dispute game creation for chain %d: %w", chainID, err)
	}

	if receipt.Status != 1 {
		return fmt.Errorf("dispute game creation failed for chain %d: transaction reverted", chainID)
	}

	p.log.Info("output root posted successfully", 
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
	
	data := fmt.Sprintf("output-root-%d-%d-%d", chainID, blockNumber, time.Now().Unix())
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
	// TODO: Implement proper extra data encoding
	// For now, return a simple encoding of chain ID and block number
	data := fmt.Sprintf("chain-%d-block-%d", chainID, blockNumber)
	return []byte(data)
}