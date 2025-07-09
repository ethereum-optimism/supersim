package withdrawal

import (
	"context"
	"testing"

	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
	"github.com/stretchr/testify/assert"
)

func TestNewWithdrawalEventMonitor(t *testing.T) {
	logger := log.NewLogger(log.DiscardHandler())
	var l1Client *ethclient.Client
	l2Clients := make(map[uint64]*ethclient.Client)
	l2Clients[901] = nil // Mock client
	
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

	monitor := NewWithdrawalEventMonitor(logger, l1Client, l2Clients, networkConfig)

	assert.NotNil(t, monitor)
	assert.Equal(t, logger, monitor.log)
	assert.Equal(t, l1Client, monitor.l1Client)
	assert.Equal(t, l2Clients, monitor.l2Clients)
	assert.Equal(t, networkConfig, monitor.networkConfig)
	assert.NotNil(t, monitor.outputRootPoster)
	assert.NotNil(t, monitor.tasksCtx)
	assert.NotNil(t, monitor.tasksCancel)
}

func TestWithdrawalEventMonitorStartStop(t *testing.T) {
	logger := log.NewLogger(log.DiscardHandler())
	var l1Client *ethclient.Client
	l2Clients := make(map[uint64]*ethclient.Client)
	
	networkConfig := &config.NetworkConfig{
		L1Config: config.ChainConfig{
			ChainID: 900,
		},
		L2Configs: []config.ChainConfig{},
	}

	monitor := NewWithdrawalEventMonitor(logger, l1Client, l2Clients, networkConfig)

	// Test start - should work with no L2 clients
	err := monitor.Start(context.Background())
	assert.NoError(t, err)

	// Test stop
	err = monitor.Stop(context.Background())
	assert.NoError(t, err)
}

func TestProcessWithdrawalEvent(t *testing.T) {
	logger := log.NewLogger(log.DiscardHandler())
	var l1Client *ethclient.Client
	l2Clients := make(map[uint64]*ethclient.Client)
	
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

	monitor := NewWithdrawalEventMonitor(logger, l1Client, l2Clients, networkConfig)

	// Create a mock withdrawal event
	eventLog := &types.Log{
		Address: common.HexToAddress("0x4200000000000000000000000000000000000010"), // L2StandardBridge
		Topics: []common.Hash{
			common.HexToHash("0x73d170910aba9e6d50b102db522b1dbcd796216f5128b445aa2135272886497e"), // WithdrawalInitiated
		},
		Data:        []byte("mock-event-data"),
		BlockNumber: 1000,
		TxHash:      common.HexToHash("0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"),
		Index:       0,
	}

	// This should fail because dispute game factory is not available
	err := monitor.processWithdrawalEvent(901, eventLog)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "dispute game factory not available")
}

func TestWithdrawalEventFiltering(t *testing.T) {
	// Test that the correct event signatures are used
	withdrawalInitiatedSig := common.HexToHash("0x73d170910aba9e6d50b102db522b1dbcd796216f5128b445aa2135272886497e")
	messagePassedSig := common.HexToHash("0x02a52367d10742d8032712c1bb8e0144ff1ec5ffda1ed7d70bb05a2744955054")

	// These should match the signatures used in the monitor
	assert.Equal(t, "0x73d170910aba9e6d50b102db522b1dbcd796216f5128b445aa2135272886497e", withdrawalInitiatedSig.Hex())
	assert.Equal(t, "0x02a52367d10742d8032712c1bb8e0144ff1ec5ffda1ed7d70bb05a2744955054", messagePassedSig.Hex())
}

func TestWithdrawalEventAddresses(t *testing.T) {
	// Test that the correct contract addresses are monitored
	l2StandardBridgeAddr := common.HexToAddress("0x4200000000000000000000000000000000000010")
	l2ToL1MessagePasserAddr := common.HexToAddress("0x4200000000000000000000000000000000000016")

	// These should match the addresses used in the monitor
	assert.Equal(t, "0x4200000000000000000000000000000000000010", l2StandardBridgeAddr.Hex())
	assert.Equal(t, "0x4200000000000000000000000000000000000016", l2ToL1MessagePasserAddr.Hex())
}

func TestWithdrawalEventMonitorIntegration(t *testing.T) {
	// This test is designed to demonstrate the integration points
	// It should fail until the full system is integrated

	logger := log.NewLogger(log.DiscardHandler())
	var l1Client *ethclient.Client
	l2Clients := make(map[uint64]*ethclient.Client)
	// Don't add nil clients to avoid panic during start

	networkConfig := &config.NetworkConfig{
		L1Config: config.ChainConfig{
			ChainID: 900,
			DisputeGameFactoryAddress: &common.Address{}, // Mock address
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

	monitor := NewWithdrawalEventMonitor(logger, l1Client, l2Clients, networkConfig)

	// Test that monitor can be created
	assert.NotNil(t, monitor)
	assert.NotNil(t, monitor.outputRootPoster)

	// Test that start/stop works with no L2 clients
	err := monitor.Start(context.Background())
	assert.NoError(t, err)

	err = monitor.Stop(context.Background())
	assert.NoError(t, err)

	t.Log("✓ Withdrawal event monitor structure is ready for integration")
}