package interop

import (
	"context"
	"fmt"
	"math/big"
	"strings"

	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/genesis"

	"github.com/ethereum/go-ethereum/common"
)

const emptyCode = "0x"

var interopPredeploys = []common.Address{
	predeploys.CrossL2InboxAddr,
	predeploys.L2toL2CrossDomainMessengerAddr,
	predeploys.L1BlockAddr,
	predeploys.SuperchainWETHAddr,
	predeploys.ETHLiquidityAddr,
	predeploys.SuperchainTokenBridgeAddr,
}

type predeploy struct {
	proxy common.Address
	impl  common.Address
}

func Configure(ctx context.Context, chain config.Chain) error {
	cfg := chain.Config()
	if cfg.L2Config == nil {
		return nil // should only be called on L2s
	}

	// Interop contracts are included in L2 genesis. So we only need to
	// apply them manually in a forked configuration.
	if cfg.ForkConfig != nil {
		var predeploys []predeploy
		for _, proxy := range interopPredeploys {
			impl := predeployToCodeNamespace(proxy)
			predeploys = append(predeploys, predeploy{proxy, impl})
		}

		l2Genesis, err := genesis.UnMarshaledL2GenesisJSON()
		if err != nil {
			return err
		}

		// Setup predeploys
		for _, predeploy := range predeploys {
			if err := applyAllocForPredeploy(ctx, chain, predeploy, l2Genesis); err != nil {
				return fmt.Errorf("failed to apply predeploy %s", predeploy.proxy)
			}
		}
	}

	return nil
}

// Uses same logic as `predeployToCodeNamespace` in Predeploy.sol to determine impl address.
func predeployToCodeNamespace(addr common.Address) common.Address {
	addrBigInt := new(big.Int).SetBytes(addr.Bytes())
	namespaceBigInt := new(big.Int).SetBytes(common.FromHex("0xc0D3C0d3C0d3C0D3c0d3C0d3c0D3C0d3c0d30000"))
	resultBigInt := new(big.Int).Or(new(big.Int).And(addrBigInt, big.NewInt(0xffff)), namespaceBigInt)
	return common.BytesToAddress(resultBigInt.Bytes())
}

func applyAllocForPredeploy(ctx context.Context, chain config.Chain, predeploy predeploy, genesisJSON *genesis.GenesisJson) error {
	implAlloc, ok := genesisJSON.Alloc[strings.ToLower(predeploy.impl.Hex()[2:])]
	if !ok {
		return fmt.Errorf("alloc not found %s:", predeploy.impl)
	}
	if err := applyAllocToAddress(ctx, chain, &implAlloc, predeploy.impl); err != nil {
		return fmt.Errorf("failed to apply alloc for %s: %w", predeploy.impl, err)
	}

	proxyAlloc, ok := genesisJSON.Alloc[strings.ToLower(predeploy.proxy.Hex()[2:])]
	if !ok {
		return fmt.Errorf("alloc not found %s:", predeploy.proxy)
	}
	if err := applyAllocToAddress(ctx, chain, &proxyAlloc, predeploy.proxy); err != nil {
		return fmt.Errorf("failed to apply alloc for %s: %w", predeploy.proxy, err)
	}

	return nil
}

func applyAllocToAddress(ctx context.Context, chain config.Chain, alloc *genesis.Alloc, address common.Address) error {
	if alloc.Code != emptyCode {
		if err := chain.SetCode(ctx, nil, address, alloc.Code); err != nil {
			return fmt.Errorf("failed to set code for %s: %w", address, err)
		}
	}
	if alloc.Storage != nil {
		for storageSlot, storageValue := range alloc.Storage {
			if err := chain.SetStorageAt(ctx, nil, address, storageSlot, storageValue); err != nil {
				return fmt.Errorf("failed to set storage for %s: %w", address, err)
			}
		}
	}

	balance := new(big.Int).SetBytes(common.FromHex(alloc.Balance))
	if balance.Cmp(big.NewInt(0)) > 0 {
		if err := chain.SetBalance(ctx, nil, address, balance); err != nil {
			return fmt.Errorf("failed to set balance for %s: %w", address, err)
		}
	}

	return nil
}
