package bindings

import (
	_ "embed"
	"fmt"
	"math/big"

	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/optimism/op-service/sources/batching"
	"github.com/ethereum-optimism/optimism/packages/contracts-bedrock/snapshots"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
)

var (
	ExecutingMessageEventABI     = "ExecutingMessage(bytes32,(address,uint256,uint256,uint256,uint256))"
	ExecutingMessageEventABIHash = crypto.Keccak256Hash([]byte(ExecutingMessageEventABI))
)

type ExecutingMessage struct {
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

type CrossL2Inbox struct {
	Contract *batching.BoundContract
	Abi      abi.ABI
}

func NewCrossL2Inbox() *CrossL2Inbox {
	abi := snapshots.LoadCrossL2InboxABI()
	return &CrossL2Inbox{
		Abi:      *abi,
		Contract: batching.NewBoundContract(abi, predeploys.CrossL2InboxAddr),
	}
}

func (inbox *CrossL2Inbox) DecodeExecutingMessageLog(log *types.Log) (*ExecutingMessage, error) {
	if log.Address != inbox.Contract.Addr() {
		return nil, fmt.Errorf("incorrect log contract address")
	}
	if len(log.Topics) == 0 || log.Topics[0] != ExecutingMessageEventABIHash {
		return nil, fmt.Errorf("not an executing message log")
	}

	_, result, err := inbox.Contract.DecodeEvent(log)
	if err != nil {
		return nil, fmt.Errorf("failed to decode executing message decode: %w", err)
	}

	var messageIdentifier MessageIdentifier
	result.GetStruct(1, &messageIdentifier)

	return &ExecutingMessage{MsgHash: result.GetBytes32(0), Identifier: messageIdentifier}, nil
}
