package opsimulator

import (
	_ "embed"
	"errors"
	"fmt"
	"math/big"

	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/optimism/op-service/sources/batching"
	"github.com/ethereum-optimism/optimism/packages/contracts-bedrock/snapshots"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

const (
	eventExecutingMessage = "ExecutingMessage"
)

var (
	ErrEventNotFound = errors.New("event not found")
)

type executingMessage struct {
	MsgHash    [32]byte
	Identifier MessageIdentifier
}

type MessageIdentifier struct {
	Origin      common.Address
	BlockNumber *big.Int
	LogIndex    *big.Int
	Timestamp   *big.Int
	ChainId     *big.Int
}

type crossL2Inbox struct {
	Contract *batching.BoundContract
	Abi      abi.ABI
}

func NewCrossL2Inbox() *crossL2Inbox {
	abi := snapshots.LoadCrossL2InboxABI()
	return &crossL2Inbox{
		Abi:      *abi,
		Contract: batching.NewBoundContract(abi, predeploys.CrossL2InboxAddr),
	}
}

func (i *crossL2Inbox) decodeExecutingMessageLog(l *types.Log) (*executingMessage, error) {
	if l.Address != i.Contract.Addr() {
		return nil, nil
	}
	name, result, err := i.Contract.DecodeEvent(l)
	if errors.Is(err, batching.ErrUnknownEvent) {
		return nil, fmt.Errorf("%w: %v", ErrEventNotFound, err.Error())
	} else if err != nil {
		return nil, fmt.Errorf("failed to decode event: %w", err)
	}
	if name != eventExecutingMessage {
		return nil, nil
	}

	msgHash := result.GetBytes32(0)
	var messageIdentifier MessageIdentifier
	result.GetStruct(1, &messageIdentifier)

	return &executingMessage{
		MsgHash:    msgHash,
		Identifier: messageIdentifier,
	}, nil
}
