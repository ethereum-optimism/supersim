package opsimulator

import (
	"fmt"
	"sync"

	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

type L2ToL2MessageState uint

const (
	Sent L2ToL2MessageState = iota
	Relayed
	FailedRelay
)

type L2ToL2MessageLifecycle struct {
	SentTxHash     common.Hash
	FailedTxHashes []common.Hash
	RelayedTxHash  common.Hash
}

func (s *L2ToL2MessageLifecycle) WithFailedTxHash(hash common.Hash) *L2ToL2MessageLifecycle {
	return &L2ToL2MessageLifecycle{
		SentTxHash:     s.SentTxHash,
		FailedTxHashes: append(append([]common.Hash{}, s.FailedTxHashes...), hash),
		RelayedTxHash:  s.RelayedTxHash,
	}
}

func (s *L2ToL2MessageLifecycle) WithRelayedTxHash(hash common.Hash) *L2ToL2MessageLifecycle {
	return &L2ToL2MessageLifecycle{
		SentTxHash:     s.SentTxHash,
		FailedTxHashes: append([]common.Hash{}, s.FailedTxHashes...),
		RelayedTxHash:  hash,
	}
}
func (s *L2ToL2MessageLifecycle) Status() L2ToL2MessageState {
	if s.RelayedTxHash != (common.Hash{}) {
		return Relayed
	}
	if len(s.FailedTxHashes) > 0 {
		return FailedRelay
	}
	return Sent

}

type L2ToL2MessageStoreEntry struct {
	message   *L2ToL2Message
	lifecycle *L2ToL2MessageLifecycle
}

type L2ToL2MessageStore struct {
	entryByHash map[common.Hash]*L2ToL2MessageStoreEntry
	mu          sync.RWMutex
}

func NewL2ToL2MessageStore() *L2ToL2MessageStore {
	return &L2ToL2MessageStore{
		entryByHash: make(map[common.Hash]*L2ToL2MessageStoreEntry),
	}
}

func (s *L2ToL2MessageStore) Set(msgHash common.Hash, entry *L2ToL2MessageStoreEntry) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.entryByHash[msgHash] = entry
	return nil
}

func (s *L2ToL2MessageStore) Get(msgHash common.Hash) (*L2ToL2MessageStoreEntry, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	entry, exists := s.entryByHash[msgHash]
	if !exists {
		return nil, fmt.Errorf("message not found")
	}
	return entry, nil
}

type UpdaterFunc func(lifecycle *L2ToL2MessageLifecycle) (*L2ToL2MessageLifecycle, error)

func (s *L2ToL2MessageStore) UpdateLifecycle(msgHash common.Hash, updater UpdaterFunc) (*L2ToL2MessageStoreEntry, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	entry, exists := s.entryByHash[msgHash]
	if !exists {
		return nil, fmt.Errorf("message not found")
	}

	newLifecycle, err := updater(entry.lifecycle)
	if err != nil {
		return nil, fmt.Errorf("failed to update lifecycle: %w", err)
	}

	newEntry := &L2ToL2MessageStoreEntry{
		message:   entry.message,
		lifecycle: newLifecycle,
	}

	s.entryByHash[msgHash] = newEntry

	return newEntry, nil
}

type L2ToL2MessageStoreManager struct {
	store *L2ToL2MessageStore
}

func NewL2ToL2MessageStoreManager() (*L2ToL2MessageStoreManager, error) {
	return &L2ToL2MessageStoreManager{
		store: NewL2ToL2MessageStore(),
	}, nil
}

func (m *L2ToL2MessageStoreManager) HandleSentEvent(log *types.Log) error {
	msg, err := NewL2ToL2MessageFromSentMessageEventData(log.Data)
	if err != nil {
		return fmt.Errorf("failed to create L2ToL2Message: %w", err)
	}

	msgHash, err := msg.Hash()
	if err != nil {
		return fmt.Errorf("failed to calculate message hash: %w", err)
	}

	lifecycle := &L2ToL2MessageLifecycle{
		SentTxHash: log.TxHash,
	}

	entry := &L2ToL2MessageStoreEntry{
		message:   msg,
		lifecycle: lifecycle,
	}

	return m.store.Set(msgHash, entry)
}

func (m *L2ToL2MessageStoreManager) HandleRelayedEvent(log *types.Log) error {
	msgHash := log.Topics[1]

	if _, err := m.store.UpdateLifecycle(msgHash, func(lifecycle *L2ToL2MessageLifecycle) (*L2ToL2MessageLifecycle, error) {
		if lifecycle.RelayedTxHash != (common.Hash{}) {
			return nil, fmt.Errorf("message already relayed")
		}

		return lifecycle.WithRelayedTxHash(log.TxHash), nil
	}); err != nil {
		return fmt.Errorf("failed to update lifecycle for relayed event: %w", err)
	}

	return nil
}

func (m *L2ToL2MessageStoreManager) HandleFailedRelayedEvent(log *types.Log) error {
	if log.Topics[0] != bindings.L2ToL2CrossDomainMessengerParsedABI.Events["FailedRelayedMessage"].ID {
		return fmt.Errorf("unexpected event type")
	}

	msgHash := log.Topics[1]

	_, err := m.store.UpdateLifecycle(msgHash, func(lifecycle *L2ToL2MessageLifecycle) (*L2ToL2MessageLifecycle, error) {
		if lifecycle.RelayedTxHash != (common.Hash{}) {
			return nil, fmt.Errorf("message already relayed")
		}

		return lifecycle.WithFailedTxHash(log.TxHash), nil
	})

	if err != nil {
		return fmt.Errorf("failed to update lifecycle for failed relayed event: %w", err)
	}
	return nil
}

func (m *L2ToL2MessageStoreManager) Get(msgHash common.Hash) (*L2ToL2MessageStoreEntry, error) {
	return m.store.Get(msgHash)
}
