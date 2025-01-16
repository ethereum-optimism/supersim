package bindings

import (
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
)

func MustParseABI(abiStr string) *abi.ABI {
	abi, err := abi.JSON(strings.NewReader(abiStr))
	if err != nil {
		panic(err)
	}
	return &abi
}

var SimpleStorageParsedABI = MustParseABI(SimpleStorageMetaData.ABI)

var CrossL2InboxParsedABI = MustParseABI(CrossL2InboxMetaData.ABI)
var L1BlockInteropParsedABI = MustParseABI(L1BlockInteropMetaData.ABI)
var L2ToL2CrossDomainMessengerParsedABI = MustParseABI(L2ToL2CrossDomainMessengerMetaData.ABI)
var SuperchainWETHParsedABI = MustParseABI(SuperchainWETHMetaData.ABI)
var SuperchainTokenBridgeParsedABI = MustParseABI(SuperchainTokenBridgeMetaData.ABI)
