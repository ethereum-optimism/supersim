package genesisapplier

import (
	"encoding/json"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/core"
)

type Config struct {
	ChainID *big.Int
}

func UpdateGenesisWithConfig(genesisJson []byte, config Config) ([]byte, error) {
	var genesis core.Genesis

	err := json.Unmarshal(genesisJson, &genesis)
	if err != nil {
		return nil, fmt.Errorf("unable to parse genesis json")
	}

	if config.ChainID != nil && genesis.Config.ChainID != config.ChainID {
		genesis.Config.ChainID = config.ChainID
	}

	result, err := json.Marshal(genesis)
	if err != nil {
		return nil, fmt.Errorf("error marshaling genesis")
	}

	return result, nil
}
