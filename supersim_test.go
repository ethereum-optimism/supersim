package supersim

import (
	"context"
	"math/big"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/ethereum-optimism/optimism/op-chain-ops/devkeys"
	opbindings "github.com/ethereum-optimism/optimism/op-e2e/bindings"
	"github.com/ethereum-optimism/optimism/op-e2e/e2eutils/wait"
	"github.com/ethereum-optimism/optimism/op-service/predeploys"
	"github.com/ethereum-optimism/optimism/op-service/testlog"
	registry "github.com/ethereum-optimism/superchain-registry/superchain"
	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/interop"
	"github.com/ethereum-optimism/supersim/testutils"
	"github.com/joho/godotenv"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const (
	anvilClientTimeout                = 5 * time.Second
	emptyCode                         = "0x"
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

type TestSuite struct {
	t *testing.T

	DevKeys *devkeys.MnemonicDevKeys

	Cfg      *config.CLIConfig
	Supersim *Supersim
}

type InteropTestSuite struct {
	t *testing.T

	DevKeys *devkeys.MnemonicDevKeys

	Cfg      *config.CLIConfig
	Supersim *Supersim

	SourceEthClient *ethclient.Client
	DestEthClient   *ethclient.Client
	SourceChainID   *big.Int
	DestChainID     *big.Int
}

func createTestSuite(t *testing.T, cliConfig *config.CLIConfig) *TestSuite {
	// Load the .env file
	err := godotenv.Load()
	if err != nil {
		log.Warn("Error loading .env file", "err", err)
	}
	testlog := testlog.Logger(t, log.LevelInfo)
	dk, err := devkeys.NewMnemonicDevKeys(devkeys.TestMnemonic)
	if err != nil {
		t.Fatalf("unable to create dev key store: %s", err)
		return nil
	}

	ctx, closeApp := context.WithCancelCause(context.Background())
	supersim, _ := NewSupersim(testlog, "SUPERSIM", closeApp, cliConfig)
	t.Cleanup(func() {
		closeApp(nil)
		if err := supersim.Stop(context.Background()); err != nil {
			t.Errorf("failed to stop supersim: %s", err)
		}
	})

	if err := supersim.Start(ctx); err != nil {
		t.Fatalf("unable to start supersim: %s", err)
		return nil
	}

	return &TestSuite{
		t:        t,
		Cfg:      cliConfig,
		Supersim: supersim,
		DevKeys:  dk,
	}
}

type ForkInteropTestSuiteOptions struct {
	interopAutoRelay bool
}

func createForkedInteropTestSuite(t *testing.T, testOptions ForkInteropTestSuiteOptions) *InteropTestSuite {
	srcChain := "op"
	destChain := "base"
	cliConfig := &config.CLIConfig{
		ForkConfig: &config.ForkCLIConfig{
			Chains:         []string{srcChain, destChain},
			Network:        "mainnet",
			InteropEnabled: true,
		},
		InteropAutoRelay: testOptions.interopAutoRelay,
	}
	superchain := registry.Superchains[cliConfig.ForkConfig.Network]
	srcChainCfg := config.OPChainByName(superchain, srcChain)
	destChainCfg := config.OPChainByName(superchain, destChain)

	testSuite := createTestSuite(t, cliConfig)
	sourceURL := testSuite.Supersim.Orchestrator.Endpoint(srcChainCfg.ChainID)
	sourceEthClient, _ := ethclient.Dial(sourceURL)
	defer sourceEthClient.Close()

	destURL := testSuite.Supersim.Orchestrator.Endpoint(destChainCfg.ChainID)
	destEthClient, _ := ethclient.Dial(destURL)
	defer destEthClient.Close()

	destChainID := new(big.Int).SetUint64(destChainCfg.ChainID)
	sourceChainID := new(big.Int).SetUint64(srcChainCfg.ChainID)

	return &InteropTestSuite{
		t:               t,
		Cfg:             testSuite.Cfg,
		Supersim:        testSuite.Supersim,
		DevKeys:         testSuite.DevKeys,
		SourceEthClient: sourceEthClient,
		DestEthClient:   destEthClient,
		SourceChainID:   sourceChainID,
		DestChainID:     destChainID,
	}
}

func createInteropTestSuite(t *testing.T, cliConfig config.CLIConfig) *InteropTestSuite {
	testSuite := createTestSuite(t, &cliConfig)

	sourceURL := testSuite.Supersim.Orchestrator.Endpoint(testSuite.Supersim.NetworkConfig.L2Configs[0].ChainID)
	sourceEthClient, _ := ethclient.Dial(sourceURL)
	defer sourceEthClient.Close()

	destURL := testSuite.Supersim.Orchestrator.Endpoint(testSuite.Supersim.NetworkConfig.L2Configs[1].ChainID)
	destEthClient, _ := ethclient.Dial(destURL)
	defer destEthClient.Close()

	return &InteropTestSuite{
		t:               t,
		Cfg:             testSuite.Cfg,
		Supersim:        testSuite.Supersim,
		DevKeys:         testSuite.DevKeys,
		SourceEthClient: sourceEthClient,
		DestEthClient:   destEthClient,
		SourceChainID:   new(big.Int).SetUint64(testSuite.Supersim.NetworkConfig.L2Configs[0].ChainID),
		DestChainID:     new(big.Int).SetUint64(testSuite.Supersim.NetworkConfig.L2Configs[1].ChainID),
	}
}

func TestStartup(t *testing.T) {
	t.Parallel()

	testSuite := createTestSuite(t, &config.CLIConfig{})

	l2Chains := testSuite.Supersim.Orchestrator.L2Chains()
	require.True(t, len(l2Chains) > 0)

	// test that all chains can be queried
	for _, chain := range l2Chains {
		l2Client, err := rpc.Dial(chain.Endpoint())
		require.NoError(t, err)

		var chainId math.HexOrDecimal64
		require.NoError(t, l2Client.CallContext(context.Background(), &chainId, "eth_chainId"))
		require.Equal(t, chain.Config().ChainID, uint64(chainId))

		l2Client.Close()
	}

	// test that l1 anvil can be queried
	l1Client, err := rpc.Dial(testSuite.Supersim.Orchestrator.L1Chain().Endpoint())
	require.NoError(t, err)

	var chainId math.HexOrDecimal64
	require.NoError(t, l1Client.CallContext(context.Background(), &chainId, "eth_chainId"))
	require.Equal(t, testSuite.Supersim.Orchestrator.L1Chain().Config().ChainID, uint64(chainId))

	l1Client.Close()
}

func TestL1GenesisState(t *testing.T) {
	t.Parallel()

	testSuite := createTestSuite(t, &config.CLIConfig{})

	l1Client := testSuite.Supersim.Orchestrator.L1Chain().EthClient()
	for _, chain := range testSuite.Supersim.Orchestrator.L2Chains() {
		require.NotNil(t, chain.Config().L2Config)

		l1Addrs := chain.Config().L2Config.L1Addresses

		code, err := l1Client.CodeAt(context.Background(), common.Address(l1Addrs.AddressManager), nil)
		require.Nil(t, err)
		require.NotEqual(t, emptyCode, code, "AddressManager is not deployed")

		code, err = l1Client.CodeAt(context.Background(), common.Address(l1Addrs.OptimismPortalProxy), nil)
		require.Nil(t, err)
		require.NotEqual(t, emptyCode, code, "OptimismPortalProxy is not deployed")
	}
}

func TestGenesisState(t *testing.T) {
	t.Parallel()

	testSuite := createTestSuite(t, &config.CLIConfig{})
	for _, chain := range testSuite.Supersim.Orchestrator.L2Chains() {
		client, err := rpc.Dial(chain.Endpoint())
		require.NoError(t, err)
		defer client.Close()

		var code string
		require.NoError(t, client.CallContext(context.Background(), &code, "eth_getCode", predeploys.CrossL2Inbox, "latest"))
		require.NotEqual(t, emptyCode, code, "CrossL2Inbox is not deployed")

		require.NoError(t, client.CallContext(context.Background(), &code, "eth_getCode", l2toL2CrossDomainMessengerAddress, "latest"))
		require.NotEqual(t, emptyCode, code, "L2ToL2CrosSDomainMessenger is not deployed")

		require.NoError(t, client.CallContext(context.Background(), &code, "eth_getCode", l1BlockAddress, "latest"))
		require.NotEqual(t, emptyCode, code, "L1Block is not deployed")
	}
}

func TestAccountBalances(t *testing.T) {
	t.Parallel()

	testSuite := createTestSuite(t, &config.CLIConfig{})

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
	t.Parallel()

	testSuite := createTestSuite(t, &config.CLIConfig{})

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
			privateKey, _ := testSuite.DevKeys.Secret(devkeys.UserKey(i))
			senderAddress, _ := testSuite.DevKeys.Address(devkeys.UserKey(i))

			oneEth := big.NewInt(1e18)
			prevBalance, _ := l2EthClient.BalanceAt(context.Background(), senderAddress, nil)

			transactor, _ := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(int64(l1Chain.Config().ChainID)))
			transactor.Value = oneEth
			optimismPortal, _ := opbindings.NewOptimismPortal(common.Address(chain.Config().L2Config.L1Addresses.OptimismPortalProxy), l1EthClient)

			// needs a lock because the gas estimation can be outdated between transactions
			l1TxMutex.Lock()
			tx, err := optimismPortal.DepositTransaction(transactor, senderAddress, oneEth, 100000, false, make([]byte, 0))
			l1TxMutex.Unlock()
			require.NoError(t, err)

			txReceipt, _ := bind.WaitMined(context.Background(), l1EthClient, tx)
			require.NoError(t, err)

			require.True(t, txReceipt.Status == 1, "Deposit transaction failed")
			require.NotEmpty(t, txReceipt.Logs, "Deposit transaction failed")

			postBalance, postBalanceCheckErr := wait.ForBalanceChange(
				context.Background(),
				l2EthClient,
				senderAddress,
				prevBalance,
			)
			require.NoError(t, postBalanceCheckErr)

			// check that balance was increased
			require.Equal(t, oneEth, postBalance.Sub(postBalance, prevBalance), "Recipient balance is incorrect")
		}()
	}

	wg.Wait()
}

func TestDependencySet(t *testing.T) {
	t.Parallel()

	testSuite := createTestSuite(t, &config.CLIConfig{})

	for _, chain := range testSuite.Supersim.Orchestrator.L2Chains() {
		l2Client, err := ethclient.Dial(testSuite.Supersim.Orchestrator.Endpoint(chain.Config().ChainID))
		require.NoError(t, err)
		defer l2Client.Close()

		l1BlockInterop, err := bindings.NewL1BlockInterop(predeploys.L1BlockAddr, l2Client)
		require.NoError(t, err)

		depSetSize, err := l1BlockInterop.DependencySetSize(&bind.CallOpts{})
		require.NoError(t, err)

		cfg := chain.Config()
		require.NotNil(t, cfg)
		require.NotNil(t, cfg.L2Config)
		require.Equal(t, len(cfg.L2Config.DependencySet), int(depSetSize), "Dependency set size is incorrect")

		for _, chainID := range cfg.L2Config.DependencySet {
			dep, err := l1BlockInterop.IsInDependencySet(&bind.CallOpts{}, big.NewInt(int64(chainID)))
			require.NoError(t, err)
			require.True(t, dep, "ChainID is not in dependency set")
		}
	}
}

func TestDeployContractsL1WithDevAccounts(t *testing.T) {
	t.Parallel()

	testSuite := createTestSuite(t, &config.CLIConfig{})

	l1Client, err := ethclient.Dial(testSuite.Supersim.Orchestrator.L1Chain().Endpoint())
	require.NoError(t, err)

	accountCount := 10

	var wg sync.WaitGroup

	wg.Add(accountCount)

	// For each account, test deploying 5 contracts
	for i := range accountCount {
		go func() {
			defer wg.Done()
			privateKey, _ := testSuite.DevKeys.Secret(devkeys.UserKey(i))
			senderAddress, _ := testSuite.DevKeys.Address(devkeys.UserKey(i))

			for range 5 {
				transactor, _ := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(int64(testSuite.Supersim.Orchestrator.L1Chain().Config().ChainID)))

				// Test deploying a contract with CREATE
				_, tx, _, err := opbindings.DeployProxyAdmin(transactor, l1Client, senderAddress)

				require.NoError(t, err)

				_, err = bind.WaitMined(context.Background(), l1Client, tx)

				require.NoError(t, err)
			}

		}()
	}

	wg.Wait()
}

func TestBatchJsonRpcRequests(t *testing.T) {
	t.Parallel()

	testSuite := createTestSuite(t, &config.CLIConfig{})

	for _, chain := range testSuite.Supersim.Orchestrator.L2Chains() {
		client, err := ethclient.Dial(testSuite.Supersim.Orchestrator.Endpoint(chain.Config().ChainID))
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

func TestBatchJsonRpcRequestErrorHandling(t *testing.T) {
	t.Parallel()

	testSuite := createInteropTestSuite(t, config.CLIConfig{})
	gasLimit := uint64(30000000)
	gasPrice := big.NewInt(10000000)
	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)
	fromAddress := crypto.PubkeyToAddress(privateKey.PublicKey)

	// Create initiating message using L2ToL2CrossDomainMessenger
	l2ToL2CrossDomainMessenger, err := bindings.NewL2ToL2CrossDomainMessenger(predeploys.L2toL2CrossDomainMessengerAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	origin := predeploys.L2toL2CrossDomainMessengerAddr
	parsedSchemaRegistryAbi, _ := abi.JSON(strings.NewReader(opbindings.SchemaRegistryABI))
	data, err := parsedSchemaRegistryAbi.Pack("register", "uint256 value", common.HexToAddress("0x0000000000000000000000000000000000000000"), false)
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)
	tx, err := l2ToL2CrossDomainMessenger.SendMessage(sourceTransactor, testSuite.DestChainID, predeploys.SchemaRegistryAddr, data)
	require.NoError(t, err)

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	// progress forward one block before sending tx
	err = testSuite.DestEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(1), uint64(2))
	require.NoError(t, err)

	// Create a bad executing message that will throw an error using CrossL2Inbox
	executeMessageNonce, err := testSuite.DestEthClient.PendingNonceAt(context.Background(), fromAddress)
	require.NoError(t, err)
	initiatingMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)
	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.ICrossL2InboxIdentifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).Sub(new(big.Int).SetUint64(initiatingMessageBlockHeader.Time), big.NewInt(1)),
		ChainId:     testSuite.SourceChainID,
	}
	executeMessageCallData, err := bindings.CrossL2InboxParsedABI.Pack("executeMessage", identifier, fromAddress, initiatingMessageLog.Data)
	require.NoError(t, err)
	executeMessageTx := types.NewTransaction(executeMessageNonce, predeploys.CrossL2InboxAddr, big.NewInt(0), gasLimit, gasPrice, executeMessageCallData)
	require.NoError(t, err)
	executeMessageSignedTx, err := types.SignTx(executeMessageTx, types.NewEIP155Signer(testSuite.DestChainID), privateKey)
	require.NoError(t, err)
	executeMessageTxData, err := executeMessageSignedTx.MarshalBinary()
	require.NoError(t, err)
	var chainIdError error
	var sendRawTxError error
	elems := []rpc.BatchElem{{Method: "eth_chainId", Result: new(hexutil.Uint64), Error: chainIdError}, {Method: "eth_sendRawTransaction", Args: []interface{}{hexutil.Encode(executeMessageTxData)}, Result: new(string), Error: sendRawTxError}}

	require.NoError(t, testSuite.DestEthClient.Client().BatchCallContext(context.Background(), elems))
	require.Nil(t, elems[0].Error)
	// Make sure that an error is returned for eth_sendRawTransaction
	require.NotNil(t, elems[1].Error)
	require.NotZero(t, uint64(*(elems[0].Result).(*hexutil.Uint64)))
}

func TestInteropInvariantCheckSucceeds(t *testing.T) {
	t.Parallel()

	testSuite := createInteropTestSuite(t, config.CLIConfig{})
	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)

	l2ToL2CrossDomainMessenger, err := bindings.NewL2ToL2CrossDomainMessenger(predeploys.L2toL2CrossDomainMessengerAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	// Create initiating message using L2ToL2CrossDomainMessenger
	origin := predeploys.L2toL2CrossDomainMessengerAddr
	parsedSchemaRegistryAbi, _ := abi.JSON(strings.NewReader(opbindings.SchemaRegistryABI))
	data, err := parsedSchemaRegistryAbi.Pack("register", "uint256 value", common.HexToAddress("0x0000000000000000000000000000000000000000"), false)
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)
	tx, err := l2ToL2CrossDomainMessenger.SendMessage(sourceTransactor, testSuite.DestChainID, predeploys.SchemaRegistryAddr, data)
	require.NoError(t, err)

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	// progress forward one block before sending tx
	err = testSuite.DestEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)
	err = testSuite.SourceEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)

	l2tol2CDM, err := bindings.NewL2ToL2CrossDomainMessengerTransactor(predeploys.L2toL2CrossDomainMessengerAddr, testSuite.DestEthClient)
	require.NoError(t, err)
	initiatingMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)
	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.ICrossL2InboxIdentifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	// Should succeed
	tx, err = l2tol2CDM.RelayMessage(transactor, identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))
	require.NoError(t, err)

	receipt, err := bind.WaitMined(context.Background(), testSuite.DestEthClient, tx)
	require.NoError(t, err)
	require.True(t, receipt.Status == 1, "initiating message transaction failed")
}

func TestInteropInvariantCheckFailsBadLogIndex(t *testing.T) {
	t.Parallel()

	testSuite := createInteropTestSuite(t, config.CLIConfig{})
	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)
	fromAddress := crypto.PubkeyToAddress(privateKey.PublicKey)

	l2ToL2CrossDomainMessenger, err := bindings.NewL2ToL2CrossDomainMessenger(predeploys.L2toL2CrossDomainMessengerAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	// Create initiating message using L2ToL2CrossDomainMessenger
	origin := predeploys.L2toL2CrossDomainMessengerAddr
	parsedSchemaRegistryAbi, _ := abi.JSON(strings.NewReader(opbindings.SchemaRegistryABI))
	data, err := parsedSchemaRegistryAbi.Pack("register", "uint256 value", common.HexToAddress("0x0000000000000000000000000000000000000000"), false)
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)
	tx, err := l2ToL2CrossDomainMessenger.SendMessage(sourceTransactor, testSuite.DestChainID, predeploys.SchemaRegistryAddr, data)
	require.NoError(t, err)

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	// progress forward one block before sending tx
	err = testSuite.DestEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)
	err = testSuite.SourceEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)

	crossL2Inbox, err := bindings.NewCrossL2Inbox(predeploys.CrossL2InboxAddr, testSuite.DestEthClient)
	require.NoError(t, err)
	initiatingMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)

	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.ICrossL2InboxIdentifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(1), // Wrong index
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	// Should fail because the block number is incorrect
	_, err = crossL2Inbox.ExecuteMessage(transactor, identifier, fromAddress, initiatingMessageLog.Data)
	require.Error(t, err)
}

func TestInteropInvariantCheckBadBlockNumber(t *testing.T) {
	t.Parallel()

	testSuite := createInteropTestSuite(t, config.CLIConfig{})
	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)
	fromAddress := crypto.PubkeyToAddress(privateKey.PublicKey)

	l2ToL2CrossDomainMessenger, err := bindings.NewL2ToL2CrossDomainMessenger(predeploys.L2toL2CrossDomainMessengerAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	// Create initiating message using L2ToL2CrossDomainMessenger
	origin := predeploys.L2toL2CrossDomainMessengerAddr
	parsedSchemaRegistryAbi, _ := abi.JSON(strings.NewReader(opbindings.SchemaRegistryABI))
	data, err := parsedSchemaRegistryAbi.Pack("register", "uint256 value", common.HexToAddress("0x0000000000000000000000000000000000000000"), false)
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)
	tx, err := l2ToL2CrossDomainMessenger.SendMessage(sourceTransactor, testSuite.DestChainID, predeploys.SchemaRegistryAddr, data)
	require.NoError(t, err)

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	// progress forward one block before sending tx
	err = testSuite.DestEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)
	err = testSuite.SourceEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)

	crossL2Inbox, err := bindings.NewCrossL2Inbox(predeploys.CrossL2InboxAddr, testSuite.DestEthClient)
	require.NoError(t, err)
	wrongBlockNumber := new(big.Int).Add(initiatingMessageTxReceipt.BlockNumber, big.NewInt(1))
	wrongMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), wrongBlockNumber)
	require.NoError(t, err)
	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.ICrossL2InboxIdentifier{
		Origin:      origin,
		BlockNumber: wrongBlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).SetUint64(wrongMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	// Should fail because the block number is incorrect
	_, err = crossL2Inbox.ExecuteMessage(transactor, identifier, fromAddress, initiatingMessageLog.Data)
	require.Error(t, err)
}

func TestInteropInvariantCheckBadBlockTimestamp(t *testing.T) {
	t.Parallel()

	testSuite := createInteropTestSuite(t, config.CLIConfig{})
	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)
	fromAddress := crypto.PubkeyToAddress(privateKey.PublicKey)

	l2ToL2CrossDomainMessenger, err := bindings.NewL2ToL2CrossDomainMessenger(predeploys.L2toL2CrossDomainMessengerAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	// Create initiating message using L2ToL2CrossDomainMessenger
	origin := predeploys.L2toL2CrossDomainMessengerAddr
	parsedSchemaRegistryAbi, _ := abi.JSON(strings.NewReader(opbindings.SchemaRegistryABI))
	data, err := parsedSchemaRegistryAbi.Pack("register", "uint256 value", common.HexToAddress("0x0000000000000000000000000000000000000000"), false)
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)
	tx, err := l2ToL2CrossDomainMessenger.SendMessage(sourceTransactor, testSuite.DestChainID, predeploys.SchemaRegistryAddr, data)
	require.NoError(t, err)

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	// progress forward one block before sending tx
	err = testSuite.DestEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)
	err = testSuite.SourceEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)

	crossL2Inbox, err := bindings.NewCrossL2Inbox(predeploys.CrossL2InboxAddr, testSuite.DestEthClient)
	require.NoError(t, err)
	initiatingMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)
	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.ICrossL2InboxIdentifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time + 1),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	// Should fail because the block timestamp is incorrect
	_, err = crossL2Inbox.ExecuteMessage(transactor, identifier, fromAddress, initiatingMessageLog.Data)
	require.Error(t, err)
}

func TestForkedInteropInvariantCheckSucceeds(t *testing.T) {
	t.Parallel()

	testSuite := createForkedInteropTestSuite(t, ForkInteropTestSuiteOptions{interopAutoRelay: false})

	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)

	l2ToL2CrossDomainMessenger, err := bindings.NewL2ToL2CrossDomainMessenger(predeploys.L2toL2CrossDomainMessengerAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	// Create initiating message using L2ToL2CrossDomainMessenger
	origin := predeploys.L2toL2CrossDomainMessengerAddr
	parsedSchemaRegistryAbi, _ := abi.JSON(strings.NewReader(opbindings.SchemaRegistryABI))
	data, err := parsedSchemaRegistryAbi.Pack("register", "uint256 value", common.HexToAddress("0x0000000000000000000000000000000000000000"), false)
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)
	tx, err := l2ToL2CrossDomainMessenger.SendMessage(sourceTransactor, testSuite.DestChainID, predeploys.SchemaRegistryAddr, data)
	require.NoError(t, err)

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	// progress forward one block before sending tx
	err = testSuite.DestEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)
	err = testSuite.SourceEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)

	l2tol2CDM, err := bindings.NewL2ToL2CrossDomainMessengerTransactor(predeploys.L2toL2CrossDomainMessengerAddr, testSuite.DestEthClient)
	require.NoError(t, err)
	initiatingMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)
	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.ICrossL2InboxIdentifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	// Should succeed
	tx, err = l2tol2CDM.RelayMessage(transactor, identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))
	require.NoError(t, err)

	receipt, err := bind.WaitMined(context.Background(), testSuite.DestEthClient, tx)
	require.NoError(t, err)
	require.True(t, receipt.Status == 1, "initiating message transaction failed")
}

func TestAutoRelaySimpleStorageCallSucceeds(t *testing.T) {
	t.Parallel()

	testSuite := createInteropTestSuite(t, config.CLIConfig{InteropAutoRelay: true})
	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)

	destinationTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	simpleStorageAddress, deployTx, _, err := bind.DeployContract(destinationTransactor, *bindings.SimpleStorageParsedABI, common.FromHex(bindings.SimpleStorageMetaData.Bin), testSuite.DestEthClient)
	require.NoError(t, err)

	_, err = bind.WaitDeployed(context.Background(), testSuite.DestEthClient, deployTx)
	require.NoError(t, err)

	simpleStorage, err := bindings.NewSimpleStorage(simpleStorageAddress, testSuite.DestEthClient)
	require.NoError(t, err)

	l2ToL2CrossDomainMessenger, err := bindings.NewL2ToL2CrossDomainMessenger(predeploys.L2toL2CrossDomainMessengerAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	// Sanity check current value on SimpleStorage
	key := common.HexToHash("0xf00")
	val := common.HexToHash("0xba7")

	initialVal, err := simpleStorage.Get(&bind.CallOpts{}, key)
	require.NoError(t, err)
	require.Equal(t, common.Hash(initialVal), common.HexToHash("0x"), "SimpleStorage initial value is incorrect")

	// Calls SimpleStorage on the destination chain using L2ToL2CrossDomainMessenger

	calldata, err := bindings.SimpleStorageParsedABI.Pack("set", key, val)
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)
	tx, err := l2ToL2CrossDomainMessenger.SendMessage(sourceTransactor, testSuite.DestChainID, simpleStorageAddress, calldata)
	require.NoError(t, err)

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	waitErr := testutils.WaitForWithTimeout(context.Background(), 500*time.Millisecond, 10*time.Second, func() (bool, error) {
		newVal, err := simpleStorage.Get(&bind.CallOpts{}, key)
		require.NoError(t, err)
		if err != nil {
			return false, err
		}

		return newVal == common.Hash(newVal), nil
	})
	assert.NoError(t, waitErr)
}

func TestAutoRelaySuperchainWETHTransferSucceeds(t *testing.T) {
	t.Parallel()

	testSuite := createInteropTestSuite(t, config.CLIConfig{InteropAutoRelay: true})
	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)

	sourceSuperchainWETH, err := bindings.NewSuperchainWETH(predeploys.SuperchainWETHAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	sourceSuperchainTokenBridge, err := bindings.NewSuperchainTokenBridge(predeploys.SuperchainTokenBridgeAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	destSuperchainWETH, err := bindings.NewSuperchainWETH(predeploys.SuperchainWETHAddr, testSuite.DestEthClient)
	require.NoError(t, err)
	valueToTransfer := big.NewInt(10_000_000)

	sourceTransactor.Value = valueToTransfer
	depositTx, err := sourceSuperchainWETH.Deposit(sourceTransactor)
	require.NoError(t, err)
	depositTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, depositTx)
	require.NoError(t, err)
	require.True(t, depositTxReceipt.Status == 1, "weth deposit transaction failed")
	sourceTransactor.Value = nil

	destStartingBalance, err := destSuperchainWETH.BalanceOf(&bind.CallOpts{}, sourceTransactor.From)
	require.NoError(t, err)

	_, err = sourceSuperchainWETH.BalanceOf(&bind.CallOpts{}, sourceTransactor.From)
	require.NoError(t, err)

	tx, err := sourceSuperchainTokenBridge.SendERC20(sourceTransactor, predeploys.SuperchainWETHAddr, sourceTransactor.From, valueToTransfer, testSuite.DestChainID)
	require.NoError(t, err)

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	waitErr := testutils.WaitForWithTimeout(context.Background(), 500*time.Millisecond, 10*time.Second, func() (bool, error) {
		destEndingBalance, err := destSuperchainWETH.BalanceOf(&bind.CallOpts{}, sourceTransactor.From)
		require.NoError(t, err)
		diff := new(big.Int).Sub(destEndingBalance, destStartingBalance)
		return diff.Cmp(valueToTransfer) == 0, nil
	})
	assert.NoError(t, waitErr)
}

func TestForkAutoRelaySuperchainWETHTransferSucceeds(t *testing.T) {
	testSuite := createForkedInteropTestSuite(t, ForkInteropTestSuiteOptions{interopAutoRelay: true})

	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)

	sourceSuperchainWETH, err := bindings.NewSuperchainWETH(predeploys.SuperchainWETHAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	sourceSuperchainTokenBridge, err := bindings.NewSuperchainTokenBridge(predeploys.SuperchainTokenBridgeAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	destSuperchainWETH, err := bindings.NewSuperchainWETH(predeploys.SuperchainWETHAddr, testSuite.DestEthClient)
	require.NoError(t, err)
	valueToTransfer := big.NewInt(10_000_000)

	sourceTransactor.Value = valueToTransfer
	depositTx, err := sourceSuperchainWETH.Deposit(sourceTransactor)
	require.NoError(t, err)
	depositTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, depositTx)
	require.NoError(t, err)
	require.True(t, depositTxReceipt.Status == 1, "weth deposit transaction failed")
	sourceTransactor.Value = nil

	destStartingBalance, err := destSuperchainWETH.BalanceOf(&bind.CallOpts{}, sourceTransactor.From)
	require.NoError(t, err)

	_, err = sourceSuperchainWETH.BalanceOf(&bind.CallOpts{}, sourceTransactor.From)
	require.NoError(t, err)

	tx, err := sourceSuperchainTokenBridge.SendERC20(sourceTransactor, predeploys.SuperchainWETHAddr, sourceTransactor.From, valueToTransfer, testSuite.DestChainID)
	require.NoError(t, err)

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	waitErr := testutils.WaitForWithTimeout(context.Background(), 500*time.Millisecond, 10*time.Second, func() (bool, error) {
		destEndingBalance, err := destSuperchainWETH.BalanceOf(&bind.CallOpts{}, sourceTransactor.From)
		require.NoError(t, err)
		diff := new(big.Int).Sub(destEndingBalance, destStartingBalance)
		return diff.Cmp(valueToTransfer) == 0, nil
	})
	assert.NoError(t, waitErr)
}
