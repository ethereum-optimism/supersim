package interop

import (
	"fmt"
	"math/big"

	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
)

var (
	// Standard ABI types
	uint256Type, _ = abi.NewType("uint256", "", nil)
	bytesType, _   = abi.NewType("bytes", "", nil)
	addressType, _ = abi.NewType("address", "", nil)
)

type L2ToL2Message struct {
	Destination uint64
	Source      uint64
	Nonce       *big.Int
	Sender      common.Address
	Target      common.Address
	Message     []byte
}

func (m *L2ToL2Message) Encode() ([]byte, error) {
	args := abi.Arguments{
		{Name: "destination", Type: uint256Type},
		{Name: "source", Type: uint256Type},
		{Name: "nonce", Type: uint256Type},
		{Name: "sender", Type: addressType},
		{Name: "target", Type: addressType},
		{Name: "message", Type: bytesType},
	}

	encoded, err := args.Pack(big.NewInt(int64(m.Destination)), big.NewInt(int64(m.Source)), m.Nonce, m.Sender, m.Target, []byte(m.Message))
	if err != nil {
		return nil, fmt.Errorf("cannot encode L2ToL2CrossDomainMessage: %w", err)
	}

	return encoded, nil
}

func (m *L2ToL2Message) Hash() (common.Hash, error) {
	encoded, err := m.Encode()
	if err != nil {
		return common.Hash{}, err
	}
	return crypto.Keccak256Hash(encoded), nil
}

func NewL2ToL2MessageFromSentMessageEventData(log *types.Log, identifier *bindings.ICrossL2InboxIdentifier) (*L2ToL2Message, error) {
	event := new(bindings.L2ToL2CrossDomainMessengerSentMessage)
	err := bindings.L2ToL2CrossDomainMessengerParsedABI.UnpackIntoInterface(event, "SentMessage", log.Data)
	if err != nil {
		return nil, err
	}
	nonce := new(big.Int).SetBytes(log.Topics[3].Bytes())
	sender := event.Sender
	message := event.Message
	destination := log.Topics[1].Big().Uint64()
	target := common.HexToAddress(log.Topics[2].Hex())

	return &L2ToL2Message{
		Destination: destination,
		Source:      identifier.ChainId.Uint64(),
		Nonce:       nonce,
		Sender:      sender,
		Target:      target,
		Message:     message,
	}, nil
}
