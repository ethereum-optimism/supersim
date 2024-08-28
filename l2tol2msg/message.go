package l2tol2msg

import (
	"errors"
	"fmt"
	"math/big"

	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
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

func (m *L2ToL2Message) EventData() ([]byte, error) {
	return bindings.L2ToL2CrossDomainMessengerParsedABI.Pack("relayMessage", big.NewInt(int64(m.Destination)), big.NewInt(int64(m.Source)), m.Nonce, m.Sender, m.Target, m.Message)
}

func NewL2ToL2MessageFromSentMessageEventData(logData []byte) (*L2ToL2Message, error) {
	args := logData[4:]

	decoded, err := bindings.L2ToL2CrossDomainMessengerParsedABI.Methods["relayMessage"].Inputs.Unpack(args)
	if err != nil {
		return nil, err
	}

	destination, ok := decoded[0].(*big.Int)
	if !ok {
		return nil, errors.New("cannot abi decode destination")
	}

	source, ok := decoded[1].(*big.Int)
	if !ok {
		return nil, errors.New("cannot abi decode source")
	}

	nonce, ok := decoded[2].(*big.Int)
	if !ok {
		return nil, errors.New("cannot abi decode nonce")
	}

	sender, ok := decoded[3].(common.Address)
	if !ok {
		return nil, errors.New("cannot abi decode sender")
	}

	target, ok := decoded[4].(common.Address)
	if !ok {
		return nil, errors.New("cannot abi decode target")
	}

	message, ok := decoded[5].([]byte)
	if !ok {
		return nil, errors.New("cannot abi decode message")
	}

	return &L2ToL2Message{
		Destination: destination.Uint64(),
		Source:      source.Uint64(),
		Nonce:       nonce,
		Sender:      sender,
		Target:      target,
		Message:     message,
	}, nil
}
