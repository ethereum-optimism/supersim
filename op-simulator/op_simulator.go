package op_simulator

import (
	"context"
	"errors"
	"fmt"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strconv"
	"strings"
	"sync/atomic"

	ophttp "github.com/ethereum-optimism/optimism/op-service/httputil"
	"github.com/ethereum-optimism/supersim/anvil"
	"github.com/ethereum/go-ethereum/log"
)

const (
	host = "127.0.0.1"
)

type Config struct {
	Port          uint64
	SourceChainID uint64
}

type OpSimulator struct {
	log        log.Logger
	anvil      *anvil.Anvil
	httpServer *ophttp.HTTPServer

	stopped atomic.Bool

	cfg *Config
}

func New(log log.Logger, cfg *Config, anvil *anvil.Anvil) *OpSimulator {
	return &OpSimulator{
		log:   log,
		cfg:   cfg,
		anvil: anvil,
	}
}

func (opSim *OpSimulator) Start(ctx context.Context) error {
	proxy, err := opSim.createReverseProxy()
	if err != nil {
		return fmt.Errorf("error creating reverse proxy: %w", err)
	}

	mux := http.NewServeMux()
	mux.Handle("/", proxy)

	hs, err := ophttp.StartHTTPServer(net.JoinHostPort(host, fmt.Sprintf("%d", opSim.cfg.Port)), mux)
	if err != nil {
		return fmt.Errorf("failed to start HTTP RPC server: %w", err)
	}

	opSim.log.Info("started op-simulator", "chain.id", opSim.ChainID(), "addr", hs.Addr())
	opSim.httpServer = hs

	if opSim.cfg.Port == 0 {
		port, err := strconv.ParseInt(strings.Split(hs.Addr().String(), ":")[1], 10, 64)
		if err != nil {
			panic(fmt.Errorf("unexpected op-simulator listening port: %w", err))
		}

		opSim.cfg.Port = uint64(port)
	}

	return nil
}

func (opSim *OpSimulator) Stop(ctx context.Context) error {
	if opSim.stopped.Load() {
		return errors.New("already stopped")
	}
	if !opSim.stopped.CompareAndSwap(false, true) {
		return nil // someone else stopped
	}

	return opSim.httpServer.Stop(ctx)
}

func (a *OpSimulator) Stopped() bool {
	return a.stopped.Load()
}

func (opSim *OpSimulator) createReverseProxy() (*httputil.ReverseProxy, error) {
	targetURL, err := url.Parse(opSim.anvil.Endpoint())
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
	return fmt.Sprintf("http://%s:%d", host, opSim.cfg.Port)
}

func (opSim *OpSimulator) ChainID() uint64 {
	return opSim.anvil.ChainID()
}

func (opSim *OpSimulator) SourceChainID() uint64 {
	return opSim.cfg.SourceChainID
}

func (opSim *OpSimulator) String() string {
	var b strings.Builder
	fmt.Fprintf(&b, "Chain ID: %d    RPC: %s    LogPath: %s", opSim.ChainID(), opSim.Endpoint(), opSim.anvil.LogPath())
	return b.String()
}
