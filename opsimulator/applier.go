package opsimulator

import (
	"context"
	"fmt"
	"math/big"
	"strings"
	"sync"

	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/genesis"

	"github.com/ethereum/go-ethereum/common"
)

type predeploy struct {
	proxy common.Address
	impl  common.Address
}

var interopProxyPredeploys = []common.Address{
	predeploys.CrossL2InboxAddr,
	predeploys.L2toL2CrossDomainMessengerAddr,
	predeploys.L1BlockAddr,
}

const (
	emptyCode = "0x"
)

// Uses same logic as `predeployToCodeNamespace` in Predeploy.sol to determine impl address.
func predeployToCodeNamespace(addr common.Address) common.Address {
	addrBigInt := new(big.Int).SetBytes(addr.Bytes())

	namespaceBigInt := new(big.Int).SetBytes(common.FromHex("0xc0D3C0d3C0d3C0D3c0d3C0d3c0D3C0d3c0d30000"))
	resultBigInt := new(big.Int).Or(new(big.Int).And(addrBigInt, big.NewInt(0xffff)), namespaceBigInt)

	return common.BytesToAddress(resultBigInt.Bytes())
}

func fetchAllocForAddr(addr common.Address, genesisJSON *genesis.GenesisJson) (*genesis.Alloc, error) {
	alloc, exists := genesisJSON.Alloc[strings.ToLower(addr.Hex()[2:])]
	if !exists {
		return nil, fmt.Errorf("alloc not found: %s", addr)
	}

	return &alloc, nil
}

func applyAllocToAddress(ctx context.Context, chain config.Chain, alloc *genesis.Alloc, address common.Address) error {
	if alloc.Code != emptyCode {
		err := chain.SetCode(ctx, nil, address.Hex(), alloc.Code)
		if err != nil {
			return fmt.Errorf("failed to set code for %s: %w", address, err)
		}
	}
	if alloc.Storage != nil {
		for storageSlot, storageValue := range alloc.Storage {
			err := chain.SetStorageAt(ctx, nil, address.Hex(), storageSlot, storageValue)
			if err != nil {
				return fmt.Errorf("failed to set storage for %s: %w", address, err)
			}
		}
	}
	return nil
}

func applyAllocForPredeploy(ctx context.Context, chain config.Chain, predeploy predeploy, genesisJSON *genesis.GenesisJson) error {
	implAlloc, err := fetchAllocForAddr(predeploy.impl, genesisJSON)
	if err != nil {
		return fmt.Errorf("failed to fetch alloc for %s: %w", predeploy.impl, err)
	}
	if err := applyAllocToAddress(ctx, chain, implAlloc, predeploy.impl); err != nil {
		return fmt.Errorf("failed to apply alloc for %s: %w", predeploy.impl, err)
	}

	proxyAlloc, err := fetchAllocForAddr(predeploy.proxy, genesisJSON)
	if err != nil {
		return fmt.Errorf("failed to fetch alloc for %s: %w", predeploy.proxy, err)
	}
	if err := applyAllocToAddress(ctx, chain, proxyAlloc, predeploy.proxy); err != nil {
		return fmt.Errorf("failed to apply alloc for %s: %w", predeploy.proxy, err)
	}

	return nil
}

func configureInteropForChain(ctx context.Context, chain config.Chain) error {
	var interopPredeploys []predeploy
	for _, proxy := range interopProxyPredeploys {
		implContractAddress := predeployToCodeNamespace(proxy)
		interopPredeploys = append(interopPredeploys, predeploy{proxy: proxy, impl: implContractAddress})
	}
	l2Genesis, unMarshaledErr := genesis.UnMarshaledL2GenesisJSON()
	if unMarshaledErr != nil {
		return unMarshaledErr
	}

	var once sync.Once
	var handledError error
	ctx, cancel := context.WithCancel(ctx)

	handleErr := func(e error) {
		if e == nil {
			return
		}

		once.Do(func() {
			handledError = e
			cancel()
		})
	}

	var wg sync.WaitGroup
	wg.Add(len(interopPredeploys))
	for _, predeploy := range interopPredeploys {
		predeploy := predeploy
		go func() {
			defer wg.Done()
			handleErr(applyAllocForPredeploy(ctx, chain, predeploy, l2Genesis))
		}()

	}

	wg.Wait()

	return handledError
}
