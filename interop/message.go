package interop

import (
	"fmt"
	"math/big"
	"sync"

	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
)

var (
	messageArgs abi.Arguments
	argsOnce   sync.Once
    
	// Precomputed type hashes for validation
	messageTypeHash common.Hash
)

func init() {
	// Initialize ABI types once
	uint256Type, _ := abi.NewType("uint256", "", nil)
	bytesType, _ := abi.NewType("bytes", "", nil)
	addressType, _ := abi.NewType("address", "", nil)

	messageArgs = abi.Arguments{
		{Name: "destination", Type: uint256Type},
		{Name: "source", Type: uint256Type},
		{Name: "nonce", Type: uint256Type},
		{Name: "sender", Type: addressType},
		{Name: "target", Type: addressType},
		{Name: "message", Type: bytesType},
	}

	// Precompute type hash for validation
	typeData := []byte("L2ToL2Message(uint256 destination,uint256 source,uint256 nonce,address sender,address target,bytes message)")
	messageTypeHash = crypto.Keccak256Hash(typeData)
}

// L2ToL2Message represents a cross-domain message between L2 chains
type L2ToL2Message struct {
	Destination uint64
	Source      uint64
	Nonce       *big.Int
	Sender      common.Address
	Target      common.Address
	Message     []byte

	// Cache for computed hash
	hash      common.Hash
	hashOnce  sync.Once
	encodedData []byte
}

// Encode returns the ABI-encoded representation of the message
func (m *L2ToL2Message) Encode() ([]byte, error) {
	// Return cached encoding if available
	if m.encodedData != nil {
		return m.encodedData, nil
	}

	// Pre-allocate big.Ints to avoid repeated allocations
	destBig := new(big.Int).SetUint64(m.Destination)
	sourceBig := new(big.Int).SetUint64(m.Source)

	encoded, err := messageArgs.Pack(
		destBig,
		sourceBig,
		m.Nonce,
		m.Sender,
		m.Target,
		m.Message,
	)
	if err != nil {
		return nil, fmt.Errorf("cannot encode L2ToL2CrossDomainMessage: %w", err)
	}

	// Cache the encoded data
	m.encodedData = encoded
	return encoded, nil
}

// Hash returns the keccak256 hash of the encoded message
func (m *L2ToL2Message) Hash() (common.Hash, error) {
	var err error
	m.hashOnce.Do(func() {
		var encoded []byte
		encoded, err = m.Encode()
		if err == nil {
			m.hash = crypto.Keccak256Hash(encoded)
		}
	})
	if err != nil {
		return common.Hash{}, err
	}
	return m.hash, nil
}

// NewL2ToL2MessageFromSentMessageEventData creates a new message from event data
func NewL2ToL2MessageFromSentMessageEventData(log *types.Log, identifier *bindings.ICrossL2InboxIdentifier) (*L2ToL2Message, error) {
	if len(log.Topics) < 4 {
		return nil, fmt.Errorf("invalid number of topics in log: got %d, want >= 4", len(log.Topics))
	}

	event := new(bindings.L2ToL2CrossDomainMessengerSentMessage)
	if err := bindings.L2ToL2CrossDomainMessengerParsedABI.UnpackIntoInterface(event, "SentMessage", log.Data); err != nil {
		return nil, fmt.Errorf("failed to unpack event data: %w", err)
	}

	// Efficient big.Int operations
	nonce := new(big.Int).SetBytes(log.Topics[3].Bytes())
	destination := new(big.Int).SetBytes(log.Topics[1].Bytes()).Uint64()

	msg := &L2ToL2Message{
		Destination: destination,
		Source:      identifier.ChainId.Uint64(),
		Nonce:       nonce,
		Sender:      event.Sender,
		Target:      common.HexToAddress(log.Topics[2].Hex()),
		Message:     event.Message,
	}

	// Pre-encode the message for later use
	if _, err := msg.Encode(); err != nil {
		return nil, fmt.Errorf("failed to pre-encode message: %w", err)
	}

	return msg, nil
}

// Validate performs basic validation of the message
func (m *L2ToL2Message) Validate() error {
	if m.Destination == 0 {
		return fmt.Errorf("invalid destination chain ID")
	}
	if m.Source == 0 {
		return fmt.Errorf("invalid source chain ID")
	}
	if m.Nonce == nil || m.Nonce.Sign() < 0 {
		return fmt.Errorf("invalid nonce")
	}
	if m.Sender == (common.Address{}) {
		return fmt.Errorf("invalid sender address")
	}
	if m.Target == (common.Address{}) {
		return fmt.Errorf("invalid target address")
	}
	return nil
}

// Size returns the size of the message in bytes
func (m *L2ToL2Message) Size() (int, error) {
	encoded, err := m.Encode()
	if err != nil {
		return 0, err
	}
	return len(encoded), nil
}