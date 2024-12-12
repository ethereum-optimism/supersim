package opsimulator

import (
	"context"
	"errors"
	"fmt"

	"github.com/ethereum-optimism/optimism/op-node/rollup/derive"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"

	"github.com/ethereum/go-ethereum"
)

var _ ethereum.Subscription = &depositTxSubscription{}

type depositTxSubscription struct {
	logSubscription ethereum.Subscription
	logCh           chan types.Log
	errCh           chan error
	doneCh          chan struct{}
}

type DepositChannels struct {
	DepositTxCh chan<- *types.DepositTx
	LogCh       chan<- types.Log
}

func (d *depositTxSubscription) Unsubscribe() {
	// since multiple opsims run subcription to indexer multiple times, a select needs to be added to avoid any race condition
	select {
	case <-d.doneCh:
		return
	default:
		d.logSubscription.Unsubscribe()
		close(d.doneCh)
	}
}

func (d *depositTxSubscription) Err() <-chan error {
	return d.errCh
}

type LogSubscriber interface {
	SubscribeFilterLogs(context.Context, ethereum.FilterQuery, chan<- types.Log) (ethereum.Subscription, error)
}

// transforms Deposit event logs into DepositTx
func SubscribeDepositTx(ctx context.Context, logSub LogSubscriber, depositContractAddr common.Address, channels DepositChannels) (ethereum.Subscription, error) {
	logCh := make(chan types.Log)
	filterQuery := ethereum.FilterQuery{Addresses: []common.Address{depositContractAddr}, Topics: [][]common.Hash{{derive.DepositEventABIHash}}}
	logSubscription, err := logSub.SubscribeFilterLogs(ctx, filterQuery, logCh)
	if err != nil {
		return nil, fmt.Errorf("failed to create log subscription: %w", err)
	}

	errCh := make(chan error)
	doneCh := make(chan struct{})
	logErrCh := logSubscription.Err()

	go func() {
		defer close(logCh)
		defer close(errCh)
		for {
			select {
			case log := <-logCh:
				dep, err := logToDepositTx(&log)
				if err != nil {
					errCh <- err
					continue
				}

				channels.DepositTxCh <- dep
				channels.LogCh <- log
			case err := <-logErrCh:
				errCh <- fmt.Errorf("log subscription error: %w", err)
			case <-ctx.Done():
				return
			case <-doneCh:
				return
			}
		}
	}()

	return &depositTxSubscription{logSubscription, logCh, errCh, doneCh}, nil
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
