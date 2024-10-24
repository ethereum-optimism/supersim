package admin

import (
	"context"
	"io"
	"net/http"
	"testing"
	"time"

	"github.com/ethereum-optimism/optimism/op-service/testlog"
	"github.com/ethereum/go-ethereum/log"
	"github.com/stretchr/testify/require"
)

func TestAdminServerBasicFunctionality(t *testing.T) {
	testlog := testlog.Logger(t, log.LevelInfo)

	ctx, cancel := context.WithCancel(context.Background())
	adminServer := NewAdminServer(testlog)
	t.Cleanup(func() { cancel() })

	require.NoError(t, adminServer.Start(ctx))

	require.Equal(t, ":8420", adminServer.srv.Addr)

	resp, err := http.Get("http://localhost:8420/ready")
	require.NoError(t, err)
	defer resp.Body.Close()

	require.Equal(t, http.StatusOK, resp.StatusCode)

	body, err := io.ReadAll(resp.Body)
	require.NoError(t, err)
	require.Equal(t, "OK", string(body))

	require.NoError(t, adminServer.Stop(context.Background()))

	resp, err = http.Get("http://localhost:8420/ready")
	if err == nil {
		resp.Body.Close()
	}
	require.Error(t, err)
}

func TestAdminServerContextCancellation(t *testing.T) {
	testlog := testlog.Logger(t, log.LevelInfo)

	ctx, cancel := context.WithCancel(context.Background())
	adminServer := NewAdminServer(testlog)

	require.NoError(t, adminServer.Start(ctx))

	// Cancel the context
	cancel()

	time.Sleep(100 * time.Millisecond)

	resp, err := http.Get("http://localhost:8420/ready")
	if err == nil {
		resp.Body.Close()
	}
	require.Error(t, err)
}
