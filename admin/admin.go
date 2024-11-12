package admin

import (
	"context"
	"fmt"
	"net"
	"net/http"
	"strings"
	"sync"

	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/gin-gonic/gin"
)

var networkConfig *config.NetworkConfig

type AdminServer struct {
	log log.Logger

	srv    *http.Server
	cancel context.CancelFunc
	wg     sync.WaitGroup

	rpcServer *rpc.Server // New field for the RPC server

	port uint64
}

type RPCMethods struct {
	Log log.Logger
}

func NewAdminServer(log log.Logger, port uint64) *AdminServer {
	return &AdminServer{log: log, port: port}
}

func (s *AdminServer) Start(ctx context.Context) error {
	router := setupRouter()
	s.srv = &http.Server{Handler: router}

	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", s.port))
	if err != nil {
		panic(err)
	}

	addr := listener.Addr().(*net.TCPAddr)

	s.port = uint64(addr.Port)
	s.log.Debug("admin server listening", "port", s.port)

	// Set up RPC server
	rpcServer := rpc.NewServer()
	rpcMethods := &RPCMethods{Log: s.log}

	if err := rpcServer.RegisterName("Admin", rpcMethods); err != nil {
		return fmt.Errorf("failed to register RPC methods: %w", err)
	}

	s.log.Debug("admin HTTP server listening", "port", s.port)

	ctx, s.cancel = context.WithCancel(ctx)

	s.wg.Add(1)
	go func() {
		defer s.wg.Done()
		if err := s.srv.Serve(listener); err != nil && err != http.ErrServerClosed {
			s.log.Error("failed to serve", "error", err)
		}
	}()

	// Start RPC server in a goroutine
	s.wg.Add(1)
	go func() {
		defer s.wg.Done()

		http.Handle("/", rpcServer)
		err := http.ListenAndServe(fmt.Sprintf(":%d", s.port+1), nil)

		if err != nil {
			s.log.Error("failed to listen to RPC connection", "error", err)
			return
		}

		s.log.Debug("admin RPC server listening", "port", s.port+1)
	}()

	go func() {
		<-ctx.Done()
		if err := s.srv.Shutdown(context.Background()); err != nil {
			s.log.Error("failed to shutdown", "error", err)
		}
	}()

	return nil
}

func (s *AdminServer) Stop(ctx context.Context) error {
	if s.cancel != nil {
		s.cancel()
	}

	s.wg.Wait()
	return nil
}

func (s *AdminServer) Endpoint() string {
	return fmt.Sprintf("http://127.0.0.1:%d", s.port)
}

func (s *AdminServer) RPCEndpoint() string {
	return fmt.Sprintf("http://127.0.0.1:%d", s.port+1)
}

func (s *AdminServer) ConfigAsString() string {
	var b strings.Builder
	fmt.Fprintln(&b, "Admin Config")
	fmt.Fprintln(&b, "-----------------------")
	fmt.Fprintf(&b, "Admin Server: %s\n\n", s.RPCEndpoint())
	return b.String()
}

func filterByPort(chains []*config.ChainConfig, port uint64) *config.ChainConfig {
	for _, chain := range chains {
		if chain.ChainID == port {
			return chain
		}
	}
	return nil
}

func setupRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	router.Use(gin.Recovery())

	router.GET("/ready", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})

	return router
}

func (m *RPCMethods) Ready(args *struct{}, reply *string) error {
	*reply = "RPC Server is Ready"
	m.Log.Info("Ready method called via RPC")
	return nil
}
