package opsimulator

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"math/big"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strconv"
	"strings"
	"sync/atomic"

	ophttp "github.com/ethereum-optimism/optimism/op-service/httputil"
	"github.com/ethereum-optimism/optimism/op-service/tasks"

	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/log"
)

const (
	host = "127.0.0.1"
)

type OpSimulator struct {
	log log.Logger

	l1Chain config.Chain
	l2Chain config.Chain

	L2Config *config.L2Config

	// Long running tasks
	bgTasks       tasks.Group
	bgTasksCtx    context.Context
	bgTasksCancel context.CancelFunc

	// One time tasks at startup
	startupTasks       tasks.Group
	startupTasksCtx    context.Context
	startupTasksCancel context.CancelFunc

	port       uint64
	httpServer *ophttp.HTTPServer

	stopped atomic.Bool
}

func New(log log.Logger, port uint64, l1Chain, l2Chain config.Chain, l2Config *config.L2Config) *OpSimulator {
	bgTasksCtx, bgTasksCancel := context.WithCancel(context.Background())
	startupTasksCtx, startupTasksCancel := context.WithCancel(context.Background())

	return &OpSimulator{
		port:     port,
		log:      log,
		l1Chain:  l1Chain,
		l2Chain:  l2Chain,
		L2Config: l2Config,

		bgTasksCtx:    bgTasksCtx,
		bgTasksCancel: bgTasksCancel,
		bgTasks: tasks.Group{
			HandleCrit: func(err error) {
				log.Error("bg task failed", "err", err)
			},
		},

		startupTasksCtx:    startupTasksCtx,
		startupTasksCancel: startupTasksCancel,
		startupTasks: tasks.Group{
			HandleCrit: func(err error) {
				log.Error("startup task failed", err)
			},
		},
	}
}

func (opSim *OpSimulator) Start(ctx context.Context) error {
	proxy, err := opSim.createReverseProxy()
	if err != nil {
		return fmt.Errorf("error creating reverse proxy: %w", err)
	}

	mux := http.NewServeMux()
	mux.Handle("/", handler(proxy))

	hs, err := ophttp.StartHTTPServer(net.JoinHostPort(host, fmt.Sprintf("%d", opSim.port)), mux)
	if err != nil {
		return fmt.Errorf("failed to start HTTP RPC server: %w", err)
	}

	opSim.log.Debug("started opsimulator", "name", opSim.Name(), "chain.id", opSim.ChainID(), "addr", hs.Addr())
	opSim.httpServer = hs

	if opSim.port == 0 {
		opSim.port, err = strconv.ParseUint(strings.Split(hs.Addr().String(), ":")[1], 10, 64)
		if err != nil {
			panic(fmt.Errorf("unexpected opsimulator listening port: %w", err))
		}
	}

	opSim.startStartupTasks()
	if err := opSim.startupTasks.Wait(); err != nil {
		return fmt.Errorf("failed to start opsimulator: %w", err)
	}

	opSim.startBackgroundTasks()
	return nil
}

func (opSim *OpSimulator) Stop(ctx context.Context) error {
	if opSim.stopped.Load() {
		return errors.New("already stopped")
	}
	if !opSim.stopped.CompareAndSwap(false, true) {
		return nil // someone else stopped
	}

	opSim.bgTasksCancel()
	return opSim.httpServer.Stop(ctx)
}

func (opSim *OpSimulator) Stopped() bool {
	return opSim.stopped.Load()
}

func (opSim *OpSimulator) startStartupTasks() {
	for _, chainID := range opSim.L2Config.DependencySet {
		opSim.startupTasks.Go(func() error {
			return opSim.AddDependency(chainID, opSim.L2Config.DependencySet)
		})
	}
}

func (opSim *OpSimulator) startBackgroundTasks() {
	// Relay deposit tx from L1 to L2
	opSim.bgTasks.Go(func() error {
		depositTxCh := make(chan *types.DepositTx)
		sub, err := SubscribeDepositTx(context.Background(), opSim.l1Chain, common.Address(opSim.L2Config.L1Addresses.OptimismPortalProxy), depositTxCh)
		if err != nil {
			return fmt.Errorf("failed to subscribe to deposit tx: %w", err)
		}

		for {
			select {
			case dep := <-depositTxCh:
				depTx := types.NewTx(dep)
				opSim.log.Debug("received deposit tx", "hash", depTx.Hash().String())
				if err := opSim.l2Chain.EthSendTransaction(opSim.bgTasksCtx, depTx); err != nil {
					opSim.log.Error("failed to submit deposit tx: %w", err)
				}

				opSim.log.Debug("submitted deposit tx", "hash", depTx.Hash().String())

			case <-opSim.bgTasksCtx.Done():
				sub.Unsubscribe()
				close(depositTxCh)
			}
		}
	})
}

func handler(proxy *httputil.ReverseProxy) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			// handle preflight requests
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "*")
			w.Header().Set("Access-Control-Allow-Headers", "*")
			w.WriteHeader(http.StatusNoContent)
			return
		}

		// setup an intermediate buffer so the request body is inspectable
		var buf bytes.Buffer
		body := io.TeeReader(r.Body, &buf)
		r.Body = io.NopCloser(&buf)

		// decode the fields we're interested in inspecting
		msgs, err := readJsonMessages(body)
		if err != nil {
			http.Error(w, fmt.Sprintf("Failed to parse JSON-RPC request: %s", err), http.StatusBadRequest)
			return
		}

		// TODO(https://github.com/ethereum-optimism/supersim/issues/55): support batch txs

		for _, msg := range msgs {
			if msg.Method == "eth_sendRawTransaction" {
				checkInteropInvariants()
			}
		}

		proxy.ServeHTTP(w, r)
	}
}

// Update dependency set on the L2#L1BlockInterop using a deposit tx
func (opSim *OpSimulator) AddDependency(chainID uint64, depSet []uint64) error {
	dep, err := NewAddDependencyDepositTx(big.NewInt(int64(chainID)))

	if err != nil {
		return fmt.Errorf("failed to create setConfig deposit tx: %w", err)
	}

	if err := opSim.l2Chain.EthSendTransaction(context.Background(), types.NewTx(dep)); err != nil {
		return fmt.Errorf("failed to send setConfig deposit tx: %w", err)
	}

	return nil
}

// TODO(https://github.com/ethereum-optimism/supersim/issues/19): add logic for checking that an interop transaction is valid.
func checkInteropInvariants() bool {
	return true
}

func (opSim *OpSimulator) createReverseProxy() (*httputil.ReverseProxy, error) {
	targetURL, err := url.Parse(opSim.l2Chain.Endpoint())
	if err != nil {
		return nil, fmt.Errorf("failed to parse target URL: %w", err)
	}
	proxy := &httputil.ReverseProxy{
		Rewrite: func(r *httputil.ProxyRequest) {
			r.SetURL(targetURL)
		},
	}
	return proxy, nil
}

func (opSim *OpSimulator) Endpoint() string {
	return fmt.Sprintf("http://%s:%d", host, opSim.port)
}

func (opSim *OpSimulator) Name() string {
	return opSim.l2Chain.Name()
}

func (opSim *OpSimulator) ChainID() uint64 {
	return opSim.l2Chain.ChainID()
}

func (opSim *OpSimulator) Config() *config.ChainConfig {
	return opSim.l2Chain.Config()
}

func (opSim *OpSimulator) String() string {
	var b strings.Builder
	fmt.Fprintf(&b, "Name: %s    Chain ID: %d    RPC: %s    LogPath: %s", opSim.Name(), opSim.ChainID(), opSim.Endpoint(), opSim.l2Chain.LogPath())
	return b.String()
}
