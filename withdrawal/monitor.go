package withdrawal

import (
	"context"
	"fmt"

	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/optimism/op-service/tasks"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
)

// WithdrawalEventMonitor monitors withdrawal events from L2 chains and triggers output root posting
type WithdrawalEventMonitor struct {
	log             log.Logger
	l1Client        *ethclient.Client
	l2Clients       map[uint64]*ethclient.Client
	networkConfig   *config.NetworkConfig
	outputRootPoster *OutputRootPoster
	tasks           tasks.Group
	tasksCtx        context.Context
	tasksCancel     context.CancelFunc
}

// NewWithdrawalEventMonitor creates a new withdrawal event monitor
func NewWithdrawalEventMonitor(log log.Logger, l1Client *ethclient.Client, l2Clients map[uint64]*ethclient.Client, networkConfig *config.NetworkConfig) *WithdrawalEventMonitor {
	tasksCtx, tasksCancel := context.WithCancel(context.Background())

	return &WithdrawalEventMonitor{
		log:           log,
		l1Client:      l1Client,
		l2Clients:     l2Clients,
		networkConfig: networkConfig,
		outputRootPoster: NewOutputRootPoster(log, l1Client, networkConfig),
		tasks: tasks.Group{
			HandleCrit: func(err error) {
				log.Error("unhandled withdrawal monitor error", "error", err)
			},
		},
		tasksCtx:    tasksCtx,
		tasksCancel: tasksCancel,
	}
}

// Start starts the withdrawal event monitor
func (m *WithdrawalEventMonitor) Start(ctx context.Context) error {
	m.log.Info("starting withdrawal event monitor")

	// Start monitoring each L2 chain for withdrawal events
	for chainID, client := range m.l2Clients {
		m.tasks.Go(func() error {
			return m.monitorChain(chainID, client)
		})
	}

	return nil
}

// Stop stops the withdrawal event monitor
func (m *WithdrawalEventMonitor) Stop(ctx context.Context) error {
	m.log.Info("stopping withdrawal event monitor")
	m.tasksCancel()
	return nil
}

// monitorChain monitors withdrawal events for a specific L2 chain
func (m *WithdrawalEventMonitor) monitorChain(chainID uint64, client *ethclient.Client) error {
	m.log.Info("starting withdrawal event monitoring", "chainID", chainID)

	logCh := make(chan types.Log)

	// Set up filter for withdrawal events
	// Monitor both L2StandardBridge (WithdrawalInitiated) and L2ToL1MessagePasser (MessagePassed)
	fq := ethereum.FilterQuery{
		Addresses: []common.Address{
			predeploys.L2StandardBridgeAddr,     // 0x4200000000000000000000000000000000000010
			predeploys.L2ToL1MessagePasserAddr, // 0x4200000000000000000000000000000000000016
		},
		Topics: [][]common.Hash{
			{
				// WithdrawalInitiated event from L2StandardBridge
				common.HexToHash("0x73d170910aba9e6d50b102db522b1dbcd796216f5128b445aa2135272886497e"),
				// MessagePassed event from L2ToL1MessagePasser
				common.HexToHash("0x02a52367d10742d8032712c1bb8e0144ff1ec5ffda1ed7d70bb05a2744955054"),
			},
		},
	}

	sub, err := client.SubscribeFilterLogs(m.tasksCtx, fq, logCh)
	if err != nil {
		return fmt.Errorf("failed to subscribe to withdrawal events for chain %d: %w", chainID, err)
	}

	for {
		select {
		case eventLog := <-logCh:
			if err := m.processWithdrawalEvent(chainID, &eventLog); err != nil {
				m.log.Error("failed to process withdrawal event", "chainID", chainID, "error", err)
			}
		case <-m.tasksCtx.Done():
			sub.Unsubscribe()
			return nil
		}
	}
}

// processWithdrawalEvent processes a withdrawal event and triggers output root posting
func (m *WithdrawalEventMonitor) processWithdrawalEvent(chainID uint64, eventLog *types.Log) error {
	// Determine the event type for better logging
	var eventType string
	switch eventLog.Topics[0].Hex() {
	case "0x73d170910aba9e6d50b102db522b1dbcd796216f5128b445aa2135272886497e":
		eventType = "WithdrawalInitiated"
	case "0x02a52367d10742d8032712c1bb8e0144ff1ec5ffda1ed7d70bb05a2744955054":
		eventType = "MessagePassed"
	default:
		eventType = "Unknown"
	}

	// Determine the contract name
	var contractName string
	switch eventLog.Address.Hex() {
	case "0x4200000000000000000000000000000000000010":
		contractName = "L2StandardBridge"
	case "0x4200000000000000000000000000000000000016":
		contractName = "L2ToL1MessagePasser"
	default:
		contractName = "Unknown"
	}

	// Log the withdrawal event with detailed information
	m.log.Info("🔔 WITHDRAWAL EVENT DETECTED", 
		"chainID", chainID,
		"eventType", eventType,
		"contractName", contractName,
		"contractAddress", eventLog.Address.Hex(),
		"blockNumber", eventLog.BlockNumber,
		"txHash", eventLog.TxHash.Hex(),
		"logIndex", eventLog.Index,
		"topicCount", len(eventLog.Topics),
		"dataLength", len(eventLog.Data),
	)

	// Log additional details about the event
	if len(eventLog.Topics) > 1 {
		m.log.Info("🔍 withdrawal event details",
			"chainID", chainID,
			"eventType", eventType,
			"topic0", eventLog.Topics[0].Hex(),
			"topic1", eventLog.Topics[1].Hex(),
			"hasMoreTopics", len(eventLog.Topics) > 2,
		)
	}

	// Trigger output root posting for this chain
	m.log.Info("🚀 triggering output root posting",
		"chainID", chainID,
		"blockNumber", eventLog.BlockNumber,
		"txHash", eventLog.TxHash.Hex(),
	)

	err := m.outputRootPoster.PostOutputRoot(chainID, eventLog.BlockNumber, eventLog.TxHash)
	if err != nil {
		m.log.Error("❌ output root posting failed",
			"chainID", chainID,
			"blockNumber", eventLog.BlockNumber,
			"txHash", eventLog.TxHash.Hex(),
			"error", err,
		)
		return err
	}

	m.log.Info("✅ output root posting completed successfully",
		"chainID", chainID,
		"blockNumber", eventLog.BlockNumber,
		"txHash", eventLog.TxHash.Hex(),
	)

	return nil
}