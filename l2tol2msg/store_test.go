package l2tol2msg

import (
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/assert"
)

func TestL2ToL2MessageLifecycle_Status(t *testing.T) {
	hash := common.HexToHash("0x1")

	lifecycle := &L2ToL2MessageLifecycle{
		SentTxHash: hash,
	}

	assert.Equal(t, Sent, lifecycle.Status(), "expected status to be Sent")

	lifecycle = lifecycle.WithFailedTxHash(common.HexToHash("0x2"))
	assert.Equal(t, FailedRelay, lifecycle.Status(), "expected status to be FailedRelay")

	lifecycle = lifecycle.WithRelayedTxHash(common.HexToHash("0x3"))
	assert.Equal(t, Relayed, lifecycle.Status(), "expected status to be Relayed")
}

func TestL2ToL2MessageStore_SetAndGet(t *testing.T) {
	store := NewL2ToL2MessageStore()
	msg := &L2ToL2Message{
		Destination: 1,
		Source:      2,
		Nonce:       big.NewInt(1),
		Sender:      common.HexToAddress("0xSender"),
		Target:      common.HexToAddress("0xTarget"),
		Message:     []byte("hello world"),
	}

	msgHash, err := msg.Hash()
	assert.NoError(t, err, "expected no error when hashing message")

	entry := &L2ToL2MessageStoreEntry{
		message: &L2ToL2Message{
			Destination: 1,
			Source:      2,
			Nonce:       big.NewInt(1),
			Sender:      common.HexToAddress("0xSender"),
			Target:      common.HexToAddress("0xTarget"),
			Message:     []byte("hello world"),
		},
		lifecycle: &L2ToL2MessageLifecycle{
			SentTxHash: msgHash,
		},
	}

	err = store.Set(msgHash, entry)
	assert.NoError(t, err, "expected no error when setting entry in store")

	retrievedEntry, err := store.Get(msgHash)
	assert.NoError(t, err, "expected no error when getting entry from store")
	assert.Equal(t, entry, retrievedEntry, "expected retrieved entry to equal stored entry")
}

func TestL2ToL2MessageStore_UpdateLifecycle(t *testing.T) {
	store := NewL2ToL2MessageStore()
	msg := &L2ToL2Message{
		Destination: 1,
		Source:      2,
		Nonce:       big.NewInt(1),
		Sender:      common.HexToAddress("0xSender"),
		Target:      common.HexToAddress("0xTarget"),
		Message:     []byte("hello world"),
	}

	msgHash, err := msg.Hash()
	assert.NoError(t, err, "expected no error when hashing message")

	entry := &L2ToL2MessageStoreEntry{
		message: msg,
		lifecycle: &L2ToL2MessageLifecycle{
			SentTxHash: msgHash,
		},
	}

	err = store.Set(msgHash, entry)
	assert.NoError(t, err, "expected no error when setting entry in store")

	// Update lifecycle with a failed relay
	failedTxHash := common.HexToHash("0x2")
	updatedEntry, err := store.UpdateLifecycle(msgHash, func(lifecycle *L2ToL2MessageLifecycle) (*L2ToL2MessageLifecycle, error) {
		return lifecycle.WithFailedTxHash(failedTxHash), nil
	})
	assert.NoError(t, err, "expected no error when updating lifecycle")
	assert.Contains(t, updatedEntry.lifecycle.FailedTxHashes, failedTxHash, "expected failedTxHash to be in FailedTxHashes")

	// Update lifecycle with a relayed transaction
	relayedTxHash := common.HexToHash("0x3")
	updatedEntry, err = store.UpdateLifecycle(msgHash, func(lifecycle *L2ToL2MessageLifecycle) (*L2ToL2MessageLifecycle, error) {
		return lifecycle.WithRelayedTxHash(relayedTxHash), nil
	})

	assert.NoError(t, err, "expected no error when updating lifecycle")
	assert.Equal(t, relayedTxHash, updatedEntry.lifecycle.RelayedTxHash, "expected relayedTxHash to be set in RelayedTxHash")
	assert.Equal(t, Relayed, updatedEntry.lifecycle.Status(), "expected status to be Relayed")
}
