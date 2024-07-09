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
	"sync/atomic"

	ophttp "github.com/ethereum-optimism/optimism/op-service/httputil"
	"github.com/ethereum-optimism/supersim/anvil"
	"github.com/ethereum/go-ethereum/log"
)

type Config struct {
	Port uint64
}

type OpSimulator struct {
	log        log.Logger
	anvil      *anvil.Anvil
	httpServer *ophttp.HTTPServer

	stopped atomic.Bool

	cfg *Config
}

const (
	host = "127.0.0.1"
)

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
	endpoint := net.JoinHostPort(host, strconv.Itoa(int(opSim.cfg.Port)))

	hs, err := ophttp.StartHTTPServer(endpoint, mux)
	if err != nil {
		return fmt.Errorf("failed to start HTTP RPC server: %w", err)
	}
	opSim.log.Info(fmt.Sprintf("listening on %v", endpoint), "chain.id", opSim.ChainId())

	opSim.httpServer = hs

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

func (opSim *OpSimulator) ChainId() uint64 {
	return opSim.anvil.ChainId()
}
