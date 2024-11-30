package opsimulator

import (
	"fmt"
	"sync"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

type L1DepositStore struct {
	entryByHash map[common.Hash]*types.DepositTx
	mu          sync.RWMutex
}

type L1DepositStoreManager struct {
	store *L1DepositStore
}

func NewL1DepositStore() *L1DepositStore {
	return &L1DepositStore{
		entryByHash: make(map[common.Hash]*types.DepositTx),
	}
}

func NewL1DepositStoreManager() *L1DepositStoreManager {
	return &L1DepositStoreManager{
		store: NewL1DepositStore(),
	}
}

func (s *L1DepositStore) Set(txnHash common.Hash, entry *types.DepositTx) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.entryByHash[txnHash] = entry
	return nil
}

func (s *L1DepositStore) Get(txnHash common.Hash) (*types.DepositTx, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	entry, exists := s.entryByHash[txnHash]

	if !exists {
		return nil, fmt.Errorf("Deposit txn not found")
	}

	return entry, nil
}

func (s *L1DepositStoreManager) Get(txnHash common.Hash) (*types.DepositTx, error) {
	return s.store.Get(txnHash)
}

func (s *L1DepositStoreManager) Set(txnHash common.Hash, entry *types.DepositTx) error {
	if err := s.store.Set(txnHash, entry); err != nil {
		return fmt.Errorf("failed to store message: %w", err)
	}

	return nil
}
