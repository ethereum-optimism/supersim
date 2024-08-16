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

var L1BlockInteropParsedABI = MustParseABI(L1BlockInteropMetaData.ABI)
var L2ToL2CrossDomainMessengerParsedABI = MustParseABI(L2ToL2CrossDomainMessengerMetaData.ABI)
