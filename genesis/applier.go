package genesis

import (
	"encoding/json"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/core"
)

func ApplyChainID(genesisJson []byte, chainId *big.Int) ([]byte, error) {
	var genesis core.Genesis

	err := json.Unmarshal(genesisJson, &genesis)
	if err != nil {
		return nil, fmt.Errorf("unable to parse genesis json")
	}

	if genesis.Config.ChainID.Cmp(chainId) != 0 {
		genesis.Config.ChainID = chainId
	}

	result, err := json.Marshal(genesis)
	if err != nil {
		return nil, fmt.Errorf("error marshaling genesis")
	}

	return result, nil
}
