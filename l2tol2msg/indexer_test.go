package l2tol2msg

import (
	"context"
	"math/big"
	"testing"

	oplog "github.com/ethereum-optimism/optimism/op-service/log"
	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum-optimism/supersim/testutils"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"

	"github.com/ethereum/go-ethereum/trie"
	"github.com/stretchr/testify/require"
)

var sourceChainID = uint64(901)
var destinationChainID = uint64(902)
var blockNumber = uint64(101)
var timestamp = uint64(100000000)
var header = types.Header{
	Number: big.NewInt(int64(blockNumber)),
	Time:   timestamp,
}
var block = types.NewBlock(&header, nil, nil, nil, types.TrieHasher((*trie.StackTrie)(nil)))

var sentMessage = &L2ToL2Message{
	Destination: destinationChainID,
	Source:      sourceChainID,
	Nonce:       big.NewInt(1),
	Sender:      common.HexToAddress("0x76E91fd3c511345B30D3d019600E55254ee3cC64"),
	Target:      common.HexToAddress("0x1116ec6Af2B498147444e065d3238C11f9166F16"),
	Message:     []byte("hello world"),
}

var eventData, _ = sentMessage.EventData()
var msgHash, _ = sentMessage.Hash()

var sentMessageLog = types.Log{
	Address:     predeploys.L2toL2CrossDomainMessengerAddr,
	Topics:      []common.Hash{},
	Data:        eventData,
	BlockNumber: blockNumber,
	Index:       0,
	TxHash:      common.HexToHash("0x5d4b3ef7a2c54bfe9d8cf68c3e3d24a2d9e8e10e6a8f4c1d9b67c1d6d9f3a48b"),
}

var relayedMessageEvent = bindings.L2ToL2CrossDomainMessengerParsedABI.Events["RelayedMessage"]
var relayedMessageLog = types.Log{
	Address:     predeploys.L2toL2CrossDomainMessengerAddr,
	Topics:      []common.Hash{relayedMessageEvent.ID, msgHash},
	Data:        []byte{},
	BlockNumber: blockNumber,
	Index:       0,
	TxHash:      common.HexToHash("0x5b38da6a701c568545dcfcb03fcbd80ed1163ddc09a1e5f4c0f1fdd891d9f564"),
}

var failedRelayedMessageEvent = bindings.L2ToL2CrossDomainMessengerParsedABI.Events["FailedRelayedMessage"]
var failedRelayedMessageLog = types.Log{
	Address:     predeploys.L2toL2CrossDomainMessengerAddr,
	Topics:      []common.Hash{failedRelayedMessageEvent.ID, msgHash},
	Data:        []byte{},
	BlockNumber: blockNumber,
	Index:       0,
	TxHash:      common.HexToHash("0x7e57d0048f89f53c6451378bd812d1782b0a77620d45c894dfc66a94938ff8e3"),
}

func TestProcessEventLogSentMessage(t *testing.T) {
	indexer := NewL2ToL2MessageIndexer(oplog.NewLogger(oplog.AppOut(nil), oplog.DefaultCLIConfig()))
	mockChainReader := testutils.NewMockChainReader(block)

	err := indexer.processEventLog(context.Background(), mockChainReader, sourceChainID, &sentMessageLog)
	require.NoError(t, err)

	msgHash, err := sentMessage.Hash()
	require.NoError(t, err)

	entry, err := indexer.Get(msgHash)
	require.NoError(t, err)

	require.Equal(t, entry.Lifecycle().SentTxHash, sentMessageLog.TxHash)

	msg := entry.Message()

	require.Equal(t, msg.Destination, sentMessage.Destination)
	require.Equal(t, msg.Source, sentMessage.Source)
	require.Equal(t, msg.Nonce, sentMessage.Nonce)
	require.Equal(t, msg.Sender, sentMessage.Sender)
	require.Equal(t, msg.Target, sentMessage.Target)
	require.Equal(t, msg.Message, sentMessage.Message)
}

func TestProcessEventLogRelayedMessage(t *testing.T) {
	indexer := NewL2ToL2MessageIndexer(oplog.NewLogger(oplog.AppOut(nil), oplog.DefaultCLIConfig()))
	mockChainReader := testutils.NewMockChainReader(block)

	// process a sent message first
	err := indexer.processEventLog(context.Background(), mockChainReader, sourceChainID, &sentMessageLog)
	require.NoError(t, err)

	// process a RelayedMessage event
	err = indexer.processEventLog(context.Background(), mockChainReader, sourceChainID, &relayedMessageLog)
	require.NoError(t, err)

	entry, err := indexer.Get(msgHash)
	require.NoError(t, err)

	require.Equal(t, entry.Lifecycle().SentTxHash, sentMessageLog.TxHash)
	require.Equal(t, entry.Lifecycle().RelayedTxHash, relayedMessageLog.TxHash)
}

func TestProcessEventLogFailedRelayedMessage(t *testing.T) {
	indexer := NewL2ToL2MessageIndexer(oplog.NewLogger(oplog.AppOut(nil), oplog.DefaultCLIConfig()))
	mockChainReader := testutils.NewMockChainReader(block)

	// process a sent message first
	err := indexer.processEventLog(context.Background(), mockChainReader, sourceChainID, &sentMessageLog)
	require.NoError(t, err)

	// process a FailedRelayedMessage event
	err = indexer.processEventLog(context.Background(), mockChainReader, sourceChainID, &failedRelayedMessageLog)
	require.NoError(t, err)

	entry, err := indexer.Get(msgHash)
	require.NoError(t, err)

	require.Equal(t, entry.Lifecycle().SentTxHash, sentMessageLog.TxHash)
	require.Equal(t, entry.Lifecycle().FailedTxHashes[0], failedRelayedMessageLog.TxHash)

	// process FailedRelayedMessage event 2
	err = indexer.processEventLog(context.Background(), mockChainReader, sourceChainID, &failedRelayedMessageLog)
	require.NoError(t, err)

	entry, err = indexer.Get(msgHash)
	require.NoError(t, err)

	require.Equal(t, entry.Lifecycle().SentTxHash, sentMessageLog.TxHash)
	require.Equal(t, entry.Lifecycle().FailedTxHashes[1], failedRelayedMessageLog.TxHash)
}

func TestGetIdentifier(t *testing.T) {

	mockChainReader := testutils.NewMockChainReader(block)

	identifier, err := getIdentifier(context.Background(), mockChainReader, sourceChainID, &sentMessageLog)
	require.NoError(t, err)

	require.Equal(t, identifier.Origin, predeploys.L2toL2CrossDomainMessengerAddr)
	require.Equal(t, identifier.BlockNumber, big.NewInt(int64(blockNumber)))
	require.Equal(t, identifier.LogIndex, big.NewInt(0))
	require.Equal(t, identifier.Timestamp, big.NewInt(int64(timestamp)))
	require.Equal(t, identifier.ChainId, big.NewInt(int64(sourceChainID)))
}
