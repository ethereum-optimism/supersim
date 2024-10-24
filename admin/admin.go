package admin

import (
	"context"
	"net/http"
	"sync"

	"github.com/ethereum/go-ethereum/log"

	"github.com/gin-gonic/gin"
)

type AdminServer struct {
	srv    *http.Server
	cancel context.CancelFunc
	wg     sync.WaitGroup

	log log.Logger
}

func NewAdminServer(log log.Logger) *AdminServer {
	return &AdminServer{log: log}
}

func (s *AdminServer) Start(ctx context.Context) error {
	router := setupRouter()

	s.srv = &http.Server{
		Addr:    ":8420",
		Handler: router,
	}

	ctx, s.cancel = context.WithCancel(ctx)

	s.wg.Add(1)
	go func() {
		defer s.wg.Done()
		if err := s.srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			s.log.Error("ListenAndServe error", "error", err)
		}
	}()

	go func() {
		<-ctx.Done()
		if err := s.srv.Shutdown(context.Background()); err != nil {
			s.log.Error("Server shutdown error", "error", err)
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

func setupRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	router.Use(gin.Recovery())

	router.GET("/ready", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})
	return router
}
