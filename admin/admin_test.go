package admin

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"testing"

	"github.com/ethereum-optimism/optimism/op-service/testlog"
	"github.com/ethereum/go-ethereum/log"
	"github.com/stretchr/testify/require"
)

func TestAdminServerBasicFunctionality(t *testing.T) {
	testlog := testlog.Logger(t, log.LevelInfo)

	ctx, cancel := context.WithCancel(context.Background())
	adminServer := NewAdminServer(testlog, 0)
	t.Cleanup(func() { cancel() })

	require.NoError(t, adminServer.Start(ctx))

	resp, err := http.Get(fmt.Sprintf("%s/ready", adminServer.Endpoint()))
	require.NoError(t, err)
	defer resp.Body.Close()

	require.Equal(t, http.StatusOK, resp.StatusCode)

	body, err := io.ReadAll(resp.Body)
	require.NoError(t, err)
	require.Equal(t, "OK", string(body))

	require.NoError(t, adminServer.Stop(context.Background()))

	resp, err = http.Get(fmt.Sprintf("%s/ready", adminServer.Endpoint()))
	if err == nil {
		resp.Body.Close()
	}
	require.Error(t, err)
}
