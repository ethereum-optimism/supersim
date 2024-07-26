package genesis

import (
	"encoding/json"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/core"
)

func ApplyChainID(genesisJson []byte, chainId *big.Int) ([]byte, error) {
	var genesis core.Genesis
	if err := json.Unmarshal(genesisJson, &genesis); err != nil {
		return nil, fmt.Errorf("unable to parse genesis json: %w", err)
	}

	if genesis.Config.ChainID.Cmp(chainId) != 0 {
		genesis.Config.ChainID = chainId
	}

	result, err := json.Marshal(genesis)
	if err != nil {
		return nil, fmt.Errorf("error marshaling genesis: %w", err)
	}

	return result, nil
}
