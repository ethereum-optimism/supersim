package opsimulator

import (
	"context"
	"errors"
	"fmt"

	"github.com/ethereum-optimism/optimism/op-node/rollup/derive"
	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"

	"github.com/ethereum/go-ethereum"
)

var _ ethereum.Subscription = &DepositTxSubscription{}

type DepositTxSubscription struct {
	logSubscription ethereum.Subscription
	logCh           chan types.Log
	errCh           chan error
	doneCh          chan struct{}
}

func (d *DepositTxSubscription) Unsubscribe() {
	d.logSubscription.Unsubscribe()
	d.doneCh <- struct{}{}
}

func (d *DepositTxSubscription) Err() <-chan error {
	return d.errCh
}

// transforms Deposit event logs into DepositTx
func SubscribeDepositTx(ctx context.Context, l1Chain config.Chain, depositContractAddr common.Address, ch chan<- *types.DepositTx) (ethereum.Subscription, error) {
	f := ethereum.FilterQuery{
		Addresses: []common.Address{depositContractAddr},
		Topics:    [][]common.Hash{{derive.DepositEventABIHash}},
	}

	logCh := make(chan types.Log)

	logSubscription, err := l1Chain.SubscribeFilterLogs(ctx, f, logCh)

	if err != nil {
		return nil, fmt.Errorf("failed to create log subscription: %w", err)
	}

	errCh := make(chan error)
	doneCh := make(chan struct{})
	logErrCh := logSubscription.Err()

	go func() {
		defer close(logCh)
		defer close(errCh)
		defer close(doneCh)
		for {
			select {
			case log := <-logCh:
				dep, err := logToDepositTx(&log)
				if err != nil {
					errCh <- err
					continue
				}
				ch <- dep
			case err := <-logErrCh:
				errCh <- fmt.Errorf("log subscription error: %w", err)
			case <-ctx.Done():
				return
			case <-doneCh:
				return
			}
		}
	}()

	return &DepositTxSubscription{
		logSubscription: logSubscription,
		logCh:           logCh,
		errCh:           errCh,
		doneCh:          doneCh,
	}, nil
}

func logToDepositTx(log *types.Log) (*types.DepositTx, error) {
	if len(log.Topics) > 0 && log.Topics[0] == derive.DepositEventABIHash {
		dep, err := derive.UnmarshalDepositLogEvent(log)
		if err != nil {
			return nil, err
		}
		return dep, nil
	} else {
		return nil, errors.New("log is not a deposit event")
	}
}
