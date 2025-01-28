package opsimulator

import (
	"math/rand"
	"testing"

	"github.com/ethereum-optimism/optimism/op-service/testutils"
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
	depLog := optestutils.GenerateLog(testutils.RandomAddress(rng), nil, nil)
	depTx := types.NewTx(depInput)
	txnHash := depTx.SourceHash()

	depositMessage := L1DepositMessage{
		DepositTxn: depInput,
		DepositLog: *depLog,
	}

	err := sm.store.Set(txnHash, &depositMessage)
	assert.NoError(t, err, "expect no error while store deposit txn ref")

	retrievedEntry, err := sm.store.Get(txnHash)
	assert.NoError(t, err, "expected no error when getting entry from store")
	assert.Equal(t, depositMessage.DepositTxn, retrievedEntry.DepositTxn, "expected retrieved depositTxn to equal stored depositTxn")
	assert.Equal(t, depositMessage.DepositLog, retrievedEntry.DepositLog, "expected retrieved depositLog to equal stored depositLog")
}
