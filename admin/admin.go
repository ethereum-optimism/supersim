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

type AdminServer struct {
	log log.Logger

	srv    *http.Server
	cancel context.CancelFunc
	wg     sync.WaitGroup

	rpcServer     *rpc.Server // New field for the RPC server
	networkConfig *config.NetworkConfig

	port uint64
}

type RPCMethods struct {
	Log           log.Logger
	NetworkConfig *config.NetworkConfig
}

func NewAdminServer(log log.Logger, port uint64, networkConfig *config.NetworkConfig) *AdminServer {
	return &AdminServer{log: log, port: port, networkConfig: networkConfig}
}

func (s *AdminServer) Start(ctx context.Context) error {
	router := setupRouter()

	// Set up RPC server
	rpcServer := rpc.NewServer()
	rpcMethods := &RPCMethods{
		Log:           s.log,
		NetworkConfig: s.networkConfig, // Ensure this is correctly set
	}

	if err := rpcServer.RegisterName("admin", rpcMethods); err != nil {
		return fmt.Errorf("failed to register RPC methods: %w", err)
	}

	// Mount the RPC server on the root path `/` to handle all RPC requests
	router.Any("/", gin.WrapH(rpcServer))

	s.srv = &http.Server{Handler: router}

	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", s.port))
	if err != nil {
		panic(err)
	}

	addr := listener.Addr().(*net.TCPAddr)

	s.port = uint64(addr.Port)
	s.log.Debug("Admin server and RPC server listening on the same port", "port", s.port)

	ctx, s.cancel = context.WithCancel(ctx)

	s.wg.Add(1)
	go func() {
		defer s.wg.Done()
		if err := s.srv.Serve(listener); err != nil && err != http.ErrServerClosed {
			s.log.Error("failed to serve", "error", err)
		}
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

func (s *AdminServer) ConfigAsString() string {
	var b strings.Builder
	fmt.Fprintf(&b, "Admin Server: %s\n\n", s.Endpoint())
	return b.String()
}

func filterByChainID(chains []config.ChainConfig, chainId uint64) *config.ChainConfig {
	for _, chain := range chains {
		if chain.ChainID == chainId {
			return &chain
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

func (m *RPCMethods) GetConfig(args *struct{}) *config.NetworkConfig {

	m.Log.Info("GetConfig called")
	return m.NetworkConfig
}

func (m *RPCMethods) GetL1Addresses(args *uint64) *map[string]string {
	chain := filterByChainID(m.NetworkConfig.L2Configs, *args)
	if chain == nil {
		m.Log.Info("chain not found")
		return nil
	}
	reply := map[string]string{
		"L2CrossDomainMessenger": chain.L2Config.L1Addresses.L1CrossDomainMessengerProxy.String(),
		"L2StandardBridge":       chain.L2Config.L1Addresses.L1StandardBridgeProxy.String(),
	}
	m.Log.Info("GetL2Addresses called", "chainId", *args)
	return &reply
}
