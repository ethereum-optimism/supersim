package supersim

import (
	"context"
	"testing"
	"time"

	"github.com/ethereum-optimism/optimism/op-service/testlog"
	"github.com/stretchr/testify/require"

	"github.com/ethereum/go-ethereum/common/math"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"
)

const (
	anvilClientTimeout                = 5 * time.Second
	emptyCode                         = "0x"
	crossL2InboxAddress               = "0x4200000000000000000000000000000000000022"
	l2toL2CrossDomainMessengerAddress = "0x4200000000000000000000000000000000000023"
	l1BlockAddress                    = "0x4200000000000000000000000000000000000015"
)

type TestSuite struct {
	t *testing.T

	Cfg      *Config
	Supersim *Supersim
}

func createTestSuite(t *testing.T) *TestSuite {
	cfg := &DefaultConfig

	testlog := testlog.Logger(t, log.LevelInfo)
	supersim := NewSupersim(testlog, cfg)
	t.Cleanup(func() {
		if err := supersim.Stop(context.Background()); err != nil {
			t.Errorf("failed to stop supersim: %s", err)
		}
	})

	if err := supersim.Start(context.Background()); err != nil {
		t.Fatalf("unable to start supersim: %s", err)
		return nil
	}

	return &TestSuite{
		t:        t,
		Cfg:      cfg,
		Supersim: supersim,
	}
}

func TestStartup(t *testing.T) {
	testSuite := createTestSuite(t)

	var chainId math.HexOrDecimal64

	// test that all chains can be queried
	l1Client, err := rpc.Dial(testSuite.Supersim.l1OpSim.Endpoint())
	require.NoError(t, err)
	require.NoError(t, l1Client.CallContext(context.Background(), &chainId, "eth_chainId"))
	require.Equal(t, uint64(chainId), testSuite.Supersim.l1OpSim.ChainId())
	l1Client.Close()

	for id, l2Chain := range testSuite.Supersim.l2OpSims {
		require.Equal(t, id, l2Chain.ChainId())

		l2Client, err := rpc.Dial(l2Chain.Endpoint())
		require.NoError(t, err)
		require.NoError(t, l2Client.CallContext(context.Background(), &chainId, "eth_chainId"))

		// Commented out due to a bug in foundry that sets the chain id to 1 whenever genesis.json file is supplied
		//require.Equal(t, l2Chain.ChainId(), uint64(chainId))

		l2Client.Close()
	}
}

func TestGenesisState(t *testing.T) {
	testSuite := createTestSuite(t)

	// assert that the predeploys exists on the l2 anvil instances
	for _, l2Chain := range testSuite.Supersim.l2OpSims {
		client, err := rpc.Dial(l2Chain.Endpoint())
		require.NoError(t, err)
		defer client.Close()

		var code string
		require.NoError(t, client.CallContext(context.Background(), &code, "eth_getCode", crossL2InboxAddress, "latest"))
		require.NotEqual(t, emptyCode, code, "CrossL2Inbox is not deployed")

		require.NoError(t, client.CallContext(context.Background(), &code, "eth_getCode", l2toL2CrossDomainMessengerAddress, "latest"))
		require.NotEqual(t, emptyCode, code, "L2ToL2CrosSDomainMessenger is not deployed")

		require.NoError(t, client.CallContext(context.Background(), &code, "eth_getCode", l1BlockAddress, "latest"))
		require.NotEqual(t, emptyCode, code, "L1Block is not deployed")
	}
}
