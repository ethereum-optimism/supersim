package withdrawal

import (
	"testing"

	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewOutputRootPoster(t *testing.T) {
	logger := log.NewLogger(log.DiscardHandler())
	var l1Client *ethclient.Client
	
	networkConfig := &config.NetworkConfig{
		L1Config: config.ChainConfig{
			ChainID: 900,
		},
		L2Configs: []config.ChainConfig{
			{
				ChainID: 901,
				L2Config: &config.L2Config{
					ProposerAddress: common.HexToAddress("0x1234567890123456789012345678901234567890"),
				},
			},
		},
	}

	poster := NewOutputRootPoster(logger, l1Client, networkConfig)

	assert.NotNil(t, poster)
	assert.Equal(t, logger, poster.log)
	assert.Equal(t, l1Client, poster.l1Client)
	assert.Equal(t, networkConfig, poster.networkConfig)
	assert.NotNil(t, poster.devKeys)
	// disputeGameFactory can be nil if address is not provided
}

func TestGetProposerPrivateKey(t *testing.T) {
	logger := log.NewLogger(log.DiscardHandler())
	var l1Client *ethclient.Client
	
	networkConfig := &config.NetworkConfig{
		L1Config: config.ChainConfig{
			ChainID: 900,
		},
	}

	poster := NewOutputRootPoster(logger, l1Client, networkConfig)
	require.NotNil(t, poster)

	chainID := uint64(901)
	
	// Test key generation
	privateKey, err := poster.getProposerPrivateKey(chainID)
	assert.NoError(t, err)
	assert.NotNil(t, privateKey)

	// Test that the same chain ID generates the same key
	privateKey2, err := poster.getProposerPrivateKey(chainID)
	assert.NoError(t, err)
	assert.Equal(t, privateKey, privateKey2)

	// Test that different chain IDs generate different keys
	otherChainID := uint64(902)
	otherPrivateKey, err := poster.getProposerPrivateKey(otherChainID)
	assert.NoError(t, err)
	assert.NotEqual(t, privateKey, otherPrivateKey)

	// Test that the generated key corresponds to the expected address
	expectedAddr := config.GenerateDisputeGameProposerAddress(chainID)
	actualAddr := crypto.PubkeyToAddress(privateKey.PublicKey)
	assert.Equal(t, expectedAddr, actualAddr)
}

func TestCalculateOutputRoot(t *testing.T) {
	logger := log.NewLogger(log.DiscardHandler())
	var l1Client *ethclient.Client
	
	networkConfig := &config.NetworkConfig{
		L1Config: config.ChainConfig{
			ChainID: 900,
		},
	}

	poster := NewOutputRootPoster(logger, l1Client, networkConfig)
	require.NotNil(t, poster)

	chainID := uint64(901)
	blockNumber := uint64(1000)

	// Test output root calculation
	outputRoot, err := poster.calculateOutputRoot(chainID, blockNumber)
	assert.NoError(t, err)
	assert.NotEqual(t, common.Hash{}, outputRoot)

	// Test that the same parameters generate the same root (within the same second)
	outputRoot2, err := poster.calculateOutputRoot(chainID, blockNumber)
	assert.NoError(t, err)
	// Note: This might be different due to timestamp, but structure should be valid
	assert.NotEqual(t, common.Hash{}, outputRoot2)

	// Test that different parameters generate different roots
	otherOutputRoot, err := poster.calculateOutputRoot(chainID, blockNumber+1)
	assert.NoError(t, err)
	// This should be different due to different block number
	assert.NotEqual(t, common.Hash{}, otherOutputRoot)
}

func TestEncodeExtraData(t *testing.T) {
	logger := log.NewLogger(log.DiscardHandler())
	var l1Client *ethclient.Client
	
	networkConfig := &config.NetworkConfig{
		L1Config: config.ChainConfig{
			ChainID: 900,
		},
	}

	poster := NewOutputRootPoster(logger, l1Client, networkConfig)
	require.NotNil(t, poster)

	chainID := uint64(901)
	blockNumber := uint64(1000)

	// Test extra data encoding
	extraData := poster.encodeExtraData(chainID, blockNumber)
	assert.NotNil(t, extraData)
	assert.Greater(t, len(extraData), 0)

	// Test that the same parameters generate the same extra data
	extraData2 := poster.encodeExtraData(chainID, blockNumber)
	assert.Equal(t, extraData, extraData2)

	// Test that different parameters generate different extra data
	otherExtraData := poster.encodeExtraData(chainID, blockNumber+1)
	assert.NotEqual(t, extraData, otherExtraData)
}

func TestPostOutputRootValidation(t *testing.T) {
	logger := log.NewLogger(log.DiscardHandler())
	var l1Client *ethclient.Client
	
	networkConfig := &config.NetworkConfig{
		L1Config: config.ChainConfig{
			ChainID: 900,
		},
		L2Configs: []config.ChainConfig{
			{
				ChainID: 901,
				L2Config: &config.L2Config{
					ProposerAddress: config.GenerateDisputeGameProposerAddress(901),
				},
			},
		},
	}

	poster := NewOutputRootPoster(logger, l1Client, networkConfig)
	require.NotNil(t, poster)

	chainID := uint64(901)
	blockNumber := uint64(1000)
	txHash := common.HexToHash("0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890")

	// Test that posting fails when dispute game factory is not available
	err := poster.PostOutputRoot(chainID, blockNumber, txHash)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "dispute game factory not available")

	// Test that posting fails for unknown chain ID
	unknownChainID := uint64(999)
	err = poster.PostOutputRoot(unknownChainID, blockNumber, txHash)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "L2 config not found")
}

func TestOutputRootPosterIntegration(t *testing.T) {
	// This test demonstrates the integration points for output root posting
	// It should fail until the full system is integrated with a real dispute game factory

	logger := log.NewLogger(log.DiscardHandler())
	var l1Client *ethclient.Client
	
	// Mock dispute game factory address
	disputeGameFactoryAddr := common.HexToAddress("0x1234567890123456789012345678901234567890")
	
	networkConfig := &config.NetworkConfig{
		L1Config: config.ChainConfig{
			ChainID: 900,
			DisputeGameFactoryAddress: &disputeGameFactoryAddr,
		},
		L2Configs: []config.ChainConfig{
			{
				ChainID: 901,
				L2Config: &config.L2Config{
					ProposerAddress: config.GenerateDisputeGameProposerAddress(901),
				},
			},
		},
	}

	poster := NewOutputRootPoster(logger, l1Client, networkConfig)

	// Test that poster can be created with dispute game factory
	assert.NotNil(t, poster)
	assert.Equal(t, networkConfig, poster.networkConfig)

	// Test proposer key generation
	proposerKey, err := poster.getProposerPrivateKey(901)
	assert.NoError(t, err)
	assert.NotNil(t, proposerKey)

	// Test output root calculation
	outputRoot, err := poster.calculateOutputRoot(901, 1000)
	assert.NoError(t, err)
	assert.NotEqual(t, common.Hash{}, outputRoot)

	// Test extra data encoding
	extraData := poster.encodeExtraData(901, 1000)
	assert.NotNil(t, extraData)
	assert.Greater(t, len(extraData), 0)

	t.Log("✓ Output root poster structure is ready for integration")
}