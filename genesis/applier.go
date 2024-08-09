package genesis

import (
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"math/big"
	"strings"

	"github.com/ethereum-optimism/optimism/op-service/predeploys"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/rpc"
)

//go:embed generated/l2-allocs/901-l2-allocs.json
var l2AllocsJSON []byte

// Define the struct for the inner values
type Alloc struct {
	Balance string                 `json:"balance"`
	Code    string                 `json:"code"`
	Nonce   string                 `json:"nonce"`
	Storage map[string]interface{} `json:"storage"`
}

// Define a type alias for the outer map
type Allocs map[string]Alloc

var interopPredeploys = []common.Address{
	predeploys.CrossL2InboxAddr,
	predeploys.L2toL2CrossDomainMessengerAddr,
	predeploys.L1BlockAddr,
}

// Uses same logic as `predeployToCodeNamespace` in Predeploy.sol to determine impl address.
func PredeployToCodeNamespace(addr common.Address) common.Address {
	addrBigInt := new(big.Int).SetBytes(addr.Bytes())

	// Mask the address with 0xffff and OR with the namespace value
	namespaceBigInt := new(big.Int).SetBytes(common.FromHex("0xc0D3C0d3C0d3C0D3c0d3C0d3c0D3C0d3c0d30000"))
	resultBigInt := new(big.Int).Or(new(big.Int).And(addrBigInt, big.NewInt(0xffff)), namespaceBigInt)

	// Convert the result back to an Ethereum address
	return common.BytesToAddress(resultBigInt.Bytes())
}

func FetchByteCodeForL2Alloc(addr common.Address) (string, error) {
	var allocs Allocs
	err := json.Unmarshal(l2AllocsJSON, &allocs)
	if err != nil {
		return "", fmt.Errorf("Failed to unmarshal l2 allocs: %s", err)
	}

	alloc, exists := allocs[strings.ToLower(addr.String())]
	if !exists {
		return "", fmt.Errorf("alloc not found: %s", addr)
	}

	return alloc.Code, nil
}

func ApplyByteCodeForL2Alloc(ctx context.Context, rpcClient *rpc.Client, addr common.Address) error {
	var code string
	rpcClient.CallContext(ctx, &code, "eth_getCode", addr.String(), "latest")
	if code == "0x" {
		byteCodeToApply, err := FetchByteCodeForL2Alloc(addr)
		if err != nil {
			return err
		}
		rpcClient.CallContext(ctx, &code, "anvil_setCode", addr.Hex(), byteCodeToApply)
	}
	return nil
}

func UpdateDepSet() {}

func ConfigureInteropForChain() {
	// iterate over each interop predeploy and call ApplyByteCodeForL2Alloc for both predeploy and impl
	// iterate over each dep set of chains passed into this function and add to dependency set
}

//

// we will need to set the byte code for each interop contract
// we will also need to set the dependency set for each chain
