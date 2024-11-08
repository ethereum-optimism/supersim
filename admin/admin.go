package admin

import (
	"context"
	"fmt"
	"net"
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum/go-ethereum/log"
	"github.com/gin-gonic/gin"
)

var networkConfig *config.NetworkConfig

type AdminServer struct {
	log log.Logger

	srv    *http.Server
	cancel context.CancelFunc
	wg     sync.WaitGroup

	port uint64
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

	router.GET("/getL1Addresses/:chainID", func(c *gin.Context) {
		cliConfig := &config.CLIConfig{
			L1Port:         8545,
			L2StartingPort: 9545,
		}
		networkConfig := config.GetDefaultNetworkConfig(uint64(time.Now().Unix()), cliConfig.LogsDirectory)

		chainIDStr := c.Param("chainID")

		chainID, err := strconv.ParseUint(chainIDStr, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid chainID format. Must be a positive integer."})
			return
		}

		l2Configs := make([]*config.ChainConfig, len(networkConfig.L2Configs))
		for i := range networkConfig.L2Configs {
			l2Configs[i] = &networkConfig.L2Configs[i]
		}

		filteredChain := filterByPort(l2Configs, chainID)

		if filteredChain == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid chainID."})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"L1 Address": gin.H{
				"OptimismPortal":         filteredChain.L2Config.L1Addresses.OptimismPortalProxy,
				"L1CrossDomainMessenger": filteredChain.L2Config.L1Addresses.L1CrossDomainMessengerProxy,
				"L1StandardBridge":       filteredChain.L2Config.L1Addresses.L1StandardBridgeProxy,
			},
		})
	})

	return router
}
