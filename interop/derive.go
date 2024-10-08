package interop

import (
	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum/go-ethereum/core/types"
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
