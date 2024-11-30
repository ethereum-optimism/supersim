package interop

import (
	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum/go-ethereum/core/types"
)

// ExecutingMessagePayloadBytes concatenates log topics and data to reconstruct the full message payload.
// Returns the complete byte array of the message payload.
func ExecutingMessagePayloadBytes(log *types.Log) []byte {
	if log == nil || !IsExecutingMessageLog(log) {
		return []byte{}
	}

	totalLen := 0
	for _, topic := range log.Topics {
		totalLen += len(topic.Bytes())
	}
	totalLen += len(log.Data)

	msg := make([]byte, 0, totalLen)
	
	for _, topic := range log.Topics {
		msg = append(msg, topic.Bytes()...)
	}
	
	return append(msg, log.Data...)
}

// IsExecutingMessageLog checks if the provided log represents an ExecutingMessage event.
// Returns true if the log matches the ExecutingMessage event signature.
func IsExecutingMessageLog(log *types.Log) bool {
	return log != nil && 
	       len(log.Topics) > 0 && 
	       log.Topics[0] == bindings.CrossL2InboxParsedABI.Events["ExecutingMessage"].ID
}