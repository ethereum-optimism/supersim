package opsimulator

import (
	"math/big"
	"strings"

	"github.com/ethereum-optimism/optimism/op-node/rollup/derive"
	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

// TODO: when these are available in the monorepo import the constants directly from there
// L1BlockInterop contract/bindings are not available in the monorepo yet
const (
	ConfigTypeSetGasPayingToken uint8 = 0
	ConfigTypeAddDependency     uint8 = 1
	ConfigTypeRemoveDependency  uint8 = 2
)

var L1BlockInteropABI, _ = abi.JSON(strings.NewReader(bindings.L1BlockInteropMetaData.ABI))
var L1BlockAddress = common.HexToAddress(predeploys.L1Block)

func NewAddDependencyDepositTx(chainID *big.Int) (*types.DepositTx, error) {

	data, err := L1BlockInteropABI.Pack(
		"setConfig",
		ConfigTypeAddDependency,
		chainID.FillBytes(make([]byte, 32)),
	)

	if err != nil {
		return nil, err
	}

	return &types.DepositTx{
		// Since we're not depositing from the L1, SourceHash is empty
		// Update when we initiate the system config tx from the L1
		SourceHash:          common.BytesToHash(make([]byte, 0)),
		From:                derive.L1InfoDepositerAddress,
		To:                  &L1BlockAddress,
		Mint:                nil,
		Value:               big.NewInt(0),
		Gas:                 derive.RegolithSystemTxGas,
		IsSystemTransaction: false, // Deprecated post-Regolith
		Data:                data,
	}, nil
}
