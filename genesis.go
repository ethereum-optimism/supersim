package genesis

import (
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"

	"github.com/holiman/uint256"
)

type ChainService interface {
	SetCode(addr common.Address, code []byte)
	SetBalance(addr common.Address, amount *uint256.Int)
	SetNonce(addr common.Address, nonce uint64)
	SetStorage(addr common.Address, key, value common.Hash)
}

// reference: https://github.com/ethereum-optimism/op-geth/blob/5e9cb8176cf953e09208ffca77c6c6ea7ee07015/core/genesis.go#L161

func applyGenesisAlloc(ga *types.GenesisAlloc, cs ChainService) {
	for addr, account := range *ga {
		if account.Balance != nil {
			// in op-geth balance is added not replaced
			cs.SetBalance(addr, uint256.MustFromBig(account.Balance))
		}
		cs.SetCode(addr, account.Code)
		cs.SetNonce(addr, account.Nonce)
		for key, value := range account.Storage {
			cs.SetStorage(addr, key, value)
		}
	}
}
