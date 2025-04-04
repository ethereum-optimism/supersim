package interop

import (
	"github.com/ethereum-optimism/optimism/op-service/eth"
	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	supervisortypes "github.com/ethereum-optimism/optimism/op-supervisor/supervisor/types"
	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
)

func ExecutingMessagePayloadBytes(log *types.Log) []byte {
	msg := []byte{}
	for _, topic := range log.Topics {
		msg = append(msg, topic.Bytes()...)
	}
	return append(msg, log.Data...)
}

func IsExecutingMessageLog(log *types.Log) bool {
	return len(log.Topics) > 0 && log.Topics[0] == bindings.CrossL2InboxParsedABI.Events["ExecutingMessage"].ID
}

func MessageAccessList(identifier *bindings.Identifier, messagePayload []byte) types.AccessList {
	supervisorIdentifier := supervisortypes.Identifier{
		Origin:      identifier.Origin,
		BlockNumber: identifier.BlockNumber.Uint64(),
		LogIndex:    uint32(identifier.LogIndex.Uint64()),
		Timestamp:   identifier.Timestamp.Uint64(),
		ChainID:     eth.ChainIDFromBig(identifier.ChainId),
	}
	access := supervisorIdentifier.ChecksumArgs(crypto.Keccak256Hash(messagePayload)).Access()
	accessList := []types.AccessTuple{
		{
			Address:     predeploys.CrossL2InboxAddr,
			StorageKeys: supervisortypes.EncodeAccessList([]supervisortypes.Access{access}),
		},
	}
	return accessList
}
