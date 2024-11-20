package opsimulator

import (
	"math/rand"
	"testing"

	optestutils "github.com/ethereum-optimism/optimism/op-service/testutils"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/stretchr/testify/assert"
)

func TestL1DepositStore_SetAndGet(t *testing.T) {
	sm := NewL1DepositStoreManager()

	rng := rand.New(rand.NewSource(int64(0)))
	sourceHash := common.Hash{}
	depInput := optestutils.GenerateDeposit(sourceHash, rng)
	depTx := types.NewTx(depInput)
	txnHash := depTx.Hash()

	err := sm.store.Set(txnHash, depInput)
	assert.NoError(t, err, "expect no error while store deposit txn ref")

	retrievedEntry, err := sm.store.Get(txnHash)
	assert.NoError(t, err, "expected no error when getting entry from store")
	assert.Equal(t, depInput, retrievedEntry, "expected retrieved entry to equal stored entry")
}
