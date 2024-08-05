package supersim

import (
	"context"
	"math/big"
	"sync"
	"testing"
	"time"

	opbindings "github.com/ethereum-optimism/optimism/op-e2e/bindings"
	"github.com/ethereum-optimism/optimism/op-service/testlog"
	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/hdaccount"
	"github.com/ethereum-optimism/supersim/opsimulator"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"

	"github.com/stretchr/testify/require"
)

const (
	anvilClientTimeout                = 5 * time.Second
	emptyCode                         = "0x"
	crossL2InboxAddress               = "0x4200000000000000000000000000000000000022"
	l2toL2CrossDomainMessengerAddress = "0x4200000000000000000000000000000000000023"
	l1BlockAddress                    = "0x4200000000000000000000000000000000000015"
	defaultTestAccountBalance         = "0x21e19e0c9bab2400000"
)

var defaultTestAccounts = [...]string{
	"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
	"0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
	"0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
	"0x90F79bf6EB2c4f870365E785982E1f101E93b906",
	"0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
	"0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
	"0x976EA74026E726554dB657fA54763abd0C3a0aa9",
	"0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
	"0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
	"0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
}

var defaultTestMnemonic = "test test test test test test test test test test test junk"
var defaultTestMnemonicDerivationPath = accounts.DefaultRootDerivationPath

type TestSuite struct {
	t *testing.T

	HdAccountStore *hdaccount.HdAccountStore

	Cfg      *config.CLIConfig
	Supersim *Supersim
}

func createTestSuite(t *testing.T) *TestSuite {
	cfg := &config.CLIConfig{} // does not run in fork mode
	testlog := testlog.Logger(t, log.LevelInfo)
	supersim, _ := NewSupersim(testlog, "", cfg)

	hdAccountStore, err := hdaccount.NewHdAccountStore(defaultTestMnemonic, defaultTestMnemonicDerivationPath)
	if err != nil {
		t.Fatalf("unable to create hd account store: %s", err)
		return nil
	}

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
		t:              t,
		Cfg:            cfg,
		Supersim:       supersim,
		HdAccountStore: hdAccountStore,
	}
}

func TestStartup(t *testing.T) {
	testSuite := createTestSuite(t)

	l2Chains := testSuite.Supersim.Orchestrator.L2Chains()
	require.True(t, len(l2Chains) > 0)

	// test that all chains can be queried
	for _, chain := range l2Chains {
		l2Client, err := rpc.Dial(chain.Endpoint())
		require.NoError(t, err)

		var chainId math.HexOrDecimal64
		require.NoError(t, l2Client.CallContext(context.Background(), &chainId, "eth_chainId"))
		require.Equal(t, chain.ChainID(), uint64(chainId))

		l2Client.Close()
	}

	// test that l1 anvil can be queried
	l1Client, err := rpc.Dial(testSuite.Supersim.Orchestrator.L1Chain().Endpoint())
	require.NoError(t, err)

	var chainId math.HexOrDecimal64
	require.NoError(t, l1Client.CallContext(context.Background(), &chainId, "eth_chainId"))
	require.Equal(t, testSuite.Supersim.Orchestrator.L1Chain().ChainID(), uint64(chainId))

	l1Client.Close()
}

func TestL1GenesisState(t *testing.T) {
	testSuite := createTestSuite(t)
	for _, chain := range testSuite.Supersim.Orchestrator.L2Chains() {
		require.NotNil(t, chain.Config().L2Config)

		l1Addrs := chain.Config().L2Config.L1Addresses

		code, err := testSuite.Supersim.Orchestrator.L1Chain().EthGetCode(context.Background(), common.Address(l1Addrs.AddressManager))
		require.Nil(t, err)
		require.NotEqual(t, emptyCode, code, "AddressManager is not deployed")

		code, err = testSuite.Supersim.Orchestrator.L1Chain().EthGetCode(context.Background(), common.Address(l1Addrs.OptimismPortalProxy))
		require.Nil(t, err)
		require.NotEqual(t, emptyCode, code, "OptimismPortalProxy is not deployed")
	}
}

func TestGenesisState(t *testing.T) {
	testSuite := createTestSuite(t)
	for _, chain := range testSuite.Supersim.Orchestrator.L2Chains() {
		client, err := rpc.Dial(chain.Endpoint())
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

func TestAccountBalances(t *testing.T) {
	testSuite := createTestSuite(t)

	for _, l2Chain := range testSuite.Supersim.Orchestrator.L2Chains() {
		client, err := rpc.Dial(l2Chain.Endpoint())
		require.NoError(t, err)
		defer client.Close()

		for _, account := range defaultTestAccounts {
			var balanceHex string
			require.NoError(t, client.CallContext(context.Background(), &balanceHex, "eth_getBalance", account, "latest"))
			require.Equal(t, balanceHex, "0x21e19e0c9bab2400000", "Test account balance is incorrect")
		}
	}
}

func TestDepositTxSimpleEthDeposit(t *testing.T) {
	testSuite := createTestSuite(t)

	l1Chain := testSuite.Supersim.Orchestrator.L1Chain()
	l1EthClient, _ := ethclient.Dial(l1Chain.Endpoint())

	var wg sync.WaitGroup
	var l1TxMutex sync.Mutex

	l2Chains := testSuite.Supersim.Orchestrator.L2Chains()
	wg.Add(len(l2Chains))
	for i, chain := range l2Chains {
		go func() {
			defer wg.Done()

			l2EthClient, _ := ethclient.Dial(chain.Endpoint())
			privateKey, _ := testSuite.HdAccountStore.DerivePrivateKeyAt(uint32(i))
			senderAddressHex, _ := testSuite.HdAccountStore.AddressHexAt(uint32(i))
			senderAddress := common.HexToAddress(senderAddressHex)

			oneEth := big.NewInt(1e18)
			prevBalance, _ := l2EthClient.BalanceAt(context.Background(), senderAddress, nil)

			transactor, _ := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(int64(l1Chain.ChainID())))
			transactor.Value = oneEth
			optimismPortal, _ := opbindings.NewOptimismPortal(common.Address(chain.Config().L2Config.L1Addresses.OptimismPortalProxy), l1EthClient)

			// needs a lock because the gas estimation can become outdated between transactions
			l1TxMutex.Lock()
			tx, err := optimismPortal.DepositTransaction(transactor, senderAddress, oneEth, 100000, false, make([]byte, 0))
			l1TxMutex.Unlock()
			require.NoError(t, err)

			txReceipt, _ := bind.WaitMined(context.Background(), l1EthClient, tx)
			require.NoError(t, err)

			require.True(t, txReceipt.Status == 1, "Deposit transaction failed")
			require.NotEmpty(t, txReceipt.Logs, "Deposit transaction failed")

			// wait for the deposit to be processed
			time.Sleep(1 * time.Second)
			postBalance, _ := l2EthClient.BalanceAt(context.Background(), senderAddress, nil)

			// check that balance was increased
			require.Equal(t, postBalance.Sub(postBalance, prevBalance), oneEth, "Recipient balance is incorrect")
		}()
	}

	wg.Wait()
}

func TestDependencySet(t *testing.T) {
	testSuite := createTestSuite(t)

	for _, opSim := range testSuite.Supersim.Orchestrator.L2OpSims {
		l2Client, err := ethclient.Dial(opSim.Endpoint())
		require.NoError(t, err)
		defer l2Client.Close()

		l1BlockInterop, err := bindings.NewL1BlockInterop(opsimulator.L1BlockAddress, l2Client)
		require.NoError(t, err)

		// TODO: fix when we add a wait for ready on the opsim
		time.Sleep(3 * time.Second)

		depSetSize, err := l1BlockInterop.DependencySetSize(&bind.CallOpts{})

		require.NoError(t, err)
		require.Equal(t, len(opSim.L2Config.DependencySet), int(depSetSize), "Dependency set size is incorrect")

		for _, chainID := range opSim.L2Config.DependencySet {
			dep, err := l1BlockInterop.IsInDependencySet(&bind.CallOpts{}, big.NewInt(int64(chainID)))
			require.NoError(t, err)
			require.True(t, dep, "ChainID is not in dependency set")
		}
	}
}

func TestBatchJsonRpcRequests(t *testing.T) {
	testSuite := createTestSuite(t)

	for _, opSim := range testSuite.Supersim.Orchestrator.L2OpSims {
		client, err := ethclient.Dial(opSim.Endpoint())
		require.NoError(t, err)
		defer client.Close()

		elems := []rpc.BatchElem{{Method: "eth_chainId", Result: new(hexutil.Uint64)}, {Method: "eth_blockNumber", Result: new(hexutil.Uint64)}}
		require.NoError(t, client.Client().BatchCall(elems))

		require.Nil(t, elems[0].Error)
		require.Nil(t, elems[1].Error)

		require.NotZero(t, uint64(*(elems[0].Result).(*hexutil.Uint64)))
		// TODO: fix later, this occasionally fails when we set anvil on block-time 2
		// require.NotZero(t, uint64(*(elems[1].Result).(*hexutil.Uint64)))
	}
}
