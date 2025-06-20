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
	"github.com/ethereum-optimism/supersim/bindings"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/interop"
	"github.com/ethereum-optimism/supersim/registry"
	"github.com/joho/godotenv"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	gethmath "github.com/ethereum/go-ethereum/common/math"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"golang.org/x/net/websocket"
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

type JSONL2ToL2Message struct {
	Destination uint64         `json:"Destination"`
	Source      uint64         `json:"Source"`
	Nonce       *big.Int       `json:"Nonce"`
	Sender      common.Address `json:"Sender"`
	Target      common.Address `json:"Target"`
	Message     hexutil.Bytes  `json:"Message"`
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

type ConfigOption = func(cfg *config.CLIConfig) *config.CLIConfig

func createTestSuite(t *testing.T, ConfigOption ...ConfigOption) *TestSuite {
	cliConfig := &config.CLIConfig{L2Count: 2, L1Host: "127.0.0.1", L2Host: "127.0.0.1"}
	for _, configure := range ConfigOption {
		cliConfig = configure(cliConfig)
	}

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
	supersim, err := NewSupersim(testlog, "SUPERSIM", closeApp, cliConfig)
	if err != nil {
		t.Fatalf("failed to create supersim: %s", err)
	}

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

func createForkedInteropTestSuite(t *testing.T, opts ...ConfigOption) *InteropTestSuite {
	srcChain := "op"
	destChain := "base"
	cfgOpt := func(cfg *config.CLIConfig) *config.CLIConfig {
		for _, opt := range opts {
			cfg = opt(cfg)
		}
		cfg.ForkConfig = &config.ForkCLIConfig{
			Chains:         []string{srcChain, destChain},
			Network:        "mainnet",
			InteropEnabled: true,
		}
		return cfg
	}

	testSuite := createTestSuite(t, cfgOpt)

	superchain := registry.SuperchainsByIdentifier[testSuite.Cfg.ForkConfig.Network]
	srcChainCfg := config.OPChainConfigByName(superchain, srcChain)
	destChainCfg := config.OPChainConfigByName(superchain, destChain)

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

func createInteropTestSuite(t *testing.T, opts ...ConfigOption) *InteropTestSuite {
	testSuite := createTestSuite(t, opts...)

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
	testSuite := createTestSuite(t)

	l2Chains := testSuite.Supersim.Orchestrator.L2Chains()
	require.True(t, len(l2Chains) > 0)

	// test that all chains can be queried
	for _, chain := range l2Chains {
		l2Client, err := rpc.Dial(chain.Endpoint())
		require.NoError(t, err)

		var chainId gethmath.HexOrDecimal64
		require.NoError(t, l2Client.CallContext(context.Background(), &chainId, "eth_chainId"))
		require.Equal(t, chain.Config().ChainID, uint64(chainId))

		l2Client.Close()
	}

	// test that l1 anvil can be queried
	l1Client, err := rpc.Dial(testSuite.Supersim.Orchestrator.L1Chain().Endpoint())
	require.NoError(t, err)

	var chainId gethmath.HexOrDecimal64
	require.NoError(t, l1Client.CallContext(context.Background(), &chainId, "eth_chainId"))
	require.Equal(t, testSuite.Supersim.Orchestrator.L1Chain().Config().ChainID, uint64(chainId))

	l1Client.Close()
}

func TestWsStartup(t *testing.T) {
	t.Parallel()
	testSuite := createTestSuite(t)

	l2Chains := testSuite.Supersim.Orchestrator.L2Chains()
	require.True(t, len(l2Chains) > 0)

	// test that all chains can be queried
	for _, chain := range l2Chains {
		l2Client, err := rpc.DialWebsocket(context.Background(), chain.WSEndpoint(), "")
		require.NoError(t, err)

		var chainId gethmath.HexOrDecimal64
		require.NoError(t, l2Client.CallContext(context.Background(), &chainId, "eth_chainId"))
		require.Equal(t, chain.Config().ChainID, uint64(chainId))

		l2Client.Close()
	}

	// test that l1 anvil can be queried
	l1Client, err := rpc.DialWebsocket(context.Background(), testSuite.Supersim.Orchestrator.L1Chain().WSEndpoint(), "")
	require.NoError(t, err)

	var chainId gethmath.HexOrDecimal64
	require.NoError(t, l1Client.CallContext(context.Background(), &chainId, "eth_chainId"))
	require.Equal(t, testSuite.Supersim.Orchestrator.L1Chain().Config().ChainID, uint64(chainId))

	l1Client.Close()
}

func TestL2Count(t *testing.T) {
	t.Parallel()
	testSuite := createTestSuite(t, func(cfg *config.CLIConfig) *config.CLIConfig {
		cfg.L2Count = config.MaxL2Count
		return cfg
	})

	require.Len(t, testSuite.Supersim.Orchestrator.L2Chains(), config.MaxL2Count)
}

func TestL1GenesisState(t *testing.T) {
	t.Parallel()
	testSuite := createTestSuite(t)

	l1Client := testSuite.Supersim.Orchestrator.L1Chain().EthClient()
	for _, chain := range testSuite.Supersim.Orchestrator.L2Chains() {
		require.NotNil(t, chain.Config().L2Config)

		l1Addrs := chain.Config().L2Config.L1Addresses

		code, err := l1Client.CodeAt(context.Background(), *l1Addrs.AddressManager, nil)
		require.Nil(t, err)
		require.NotEqual(t, emptyCode, code, "AddressManager is not deployed")

		code, err = l1Client.CodeAt(context.Background(), *l1Addrs.OptimismPortalProxy, nil)
		require.Nil(t, err)
		require.NotEqual(t, emptyCode, code, "OptimismPortalProxy is not deployed")
	}
}

func TestGenesisState(t *testing.T) {
	t.Parallel()
	testSuite := createTestSuite(t)

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

func TestOptimismPortalDeposit(t *testing.T) {
	t.Parallel()
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
			privateKey, _ := testSuite.DevKeys.Secret(devkeys.UserKey(i))
			senderAddress, _ := testSuite.DevKeys.Address(devkeys.UserKey(i))

			oneEth := big.NewInt(1e18)
			prevBalance, _ := l2EthClient.BalanceAt(context.Background(), senderAddress, nil)

			transactor, _ := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(int64(l1Chain.Config().ChainID)))
			transactor.Value = oneEth
			optimismPortal, _ := opbindings.NewOptimismPortal(*chain.Config().L2Config.L1Addresses.OptimismPortalProxy, l1EthClient)

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

func TestDirectDepositTxFails(t *testing.T) {
	t.Parallel()
	testSuite := createTestSuite(t)

	l2Chain := testSuite.Supersim.Orchestrator.L2Chains()[0]
	l2EthClient, err := ethclient.Dial(l2Chain.Endpoint())
	require.NoError(t, err)
	defer l2EthClient.Close()

	// Create a deposit transaction
	depositTx := &types.DepositTx{Mint: big.NewInt(1e18), Value: big.NewInt(0)}
	require.Error(t, l2EthClient.SendTransaction(context.Background(), types.NewTx(depositTx)))
}

func TestDeployContractsL1WithDevAccounts(t *testing.T) {
	t.Parallel()
	testSuite := createTestSuite(t)

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
	testSuite := createTestSuite(t)

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

func TestBatchJsonRpcRequestsWs(t *testing.T) {
	t.Parallel()
	testSuite := createTestSuite(t)

	for _, chain := range testSuite.Supersim.Orchestrator.L2Chains() {
		client, err := ethclient.Dial(testSuite.Supersim.Orchestrator.WSEndpoint(chain.Config().ChainID))
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
	testSuite := createInteropTestSuite(t)

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
	nonce, err := testSuite.DestEthClient.PendingNonceAt(context.Background(), fromAddress)
	require.NoError(t, err)
	initiatingMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)
	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.Identifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).Sub(new(big.Int).SetUint64(initiatingMessageBlockHeader.Time), big.NewInt(1)),
		ChainId:     testSuite.SourceChainID,
	}
	validateMessageCallData, err := bindings.CrossL2InboxParsedABI.Pack("validateMessage", identifier, crypto.Keccak256Hash(initiatingMessageLog.Data))
	require.NoError(t, err)
	validateMessageTx := types.NewTransaction(nonce, predeploys.CrossL2InboxAddr, big.NewInt(0), gasLimit, gasPrice, validateMessageCallData)
	require.NoError(t, err)
	validateMessageSignedTx, err := types.SignTx(validateMessageTx, types.NewEIP155Signer(testSuite.DestChainID), privateKey)
	require.NoError(t, err)
	validateMessageTxData, err := validateMessageSignedTx.MarshalBinary()
	require.NoError(t, err)
	var chainIdError error
	var sendRawTxError error
	elems := []rpc.BatchElem{{Method: "eth_chainId", Result: new(hexutil.Uint64), Error: chainIdError}, {Method: "eth_sendRawTransaction", Args: []interface{}{hexutil.Encode(validateMessageTxData)}, Result: new(string), Error: sendRawTxError}}

	require.NoError(t, testSuite.DestEthClient.Client().BatchCallContext(context.Background(), elems))
	require.Nil(t, elems[0].Error)
	// Make sure that an error is returned for eth_sendRawTransaction
	require.NotNil(t, elems[1].Error)
	require.NotZero(t, uint64(*(elems[0].Result).(*hexutil.Uint64)))
}

func TestInteropInvariantCheckSucceeds(t *testing.T) {
	t.Parallel()
	testSuite := createInteropTestSuite(t)

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
	identifier := bindings.Identifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)
	transactor.AccessList = interop.MessageAccessList(&identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))

	// Should succeed
	tx, err = l2tol2CDM.RelayMessage(transactor, identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))
	require.NoError(t, err)

	receipt, err := bind.WaitMined(context.Background(), testSuite.DestEthClient, tx)
	require.NoError(t, err)
	require.True(t, receipt.Status == 1, "initiating message transaction failed")
}

func TestInteropInvariantCheckSucceedsWs(t *testing.T) {
	t.Parallel()
	testSuite := createInteropTestSuite(t)

	sourceClient, err := ethclient.Dial(testSuite.Supersim.Orchestrator.WSEndpoint(testSuite.Supersim.NetworkConfig.L2Configs[0].ChainID))
	require.NoError(t, err)
	defer sourceClient.Close()

	destClient, err := ethclient.Dial(testSuite.Supersim.Orchestrator.WSEndpoint(testSuite.Supersim.NetworkConfig.L2Configs[1].ChainID))
	require.NoError(t, err)
	defer destClient.Close()

	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)

	l2ToL2CrossDomainMessenger, err := bindings.NewL2ToL2CrossDomainMessenger(predeploys.L2toL2CrossDomainMessengerAddr, sourceClient)
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

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), sourceClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	// progress forward one block before sending tx
	err = testSuite.DestEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)
	err = sourceClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)

	l2tol2CDM, err := bindings.NewL2ToL2CrossDomainMessengerTransactor(predeploys.L2toL2CrossDomainMessengerAddr, destClient)
	require.NoError(t, err)
	initiatingMessageBlockHeader, err := sourceClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)
	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.Identifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)
	transactor.AccessList = interop.MessageAccessList(&identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))

	// Should succeed
	tx, err = l2tol2CDM.RelayMessage(transactor, identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))
	require.NoError(t, err)

	receipt, err := bind.WaitMined(context.Background(), testSuite.DestEthClient, tx)
	require.NoError(t, err)
	require.True(t, receipt.Status == 1, "initiating message transaction failed")
}

func TestInteropInvariantCheckFailsBadLogIndex(t *testing.T) {
	t.Parallel()
	testSuite := createInteropTestSuite(t)

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

	crossL2Inbox, err := bindings.NewCrossL2Inbox(predeploys.CrossL2InboxAddr, testSuite.DestEthClient)
	require.NoError(t, err)
	initiatingMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)

	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.Identifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(5), // Wrong index
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	transactor.AccessList = interop.MessageAccessList(&identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))

	// Should fail because the log index is incorrect
	_, err = crossL2Inbox.ValidateMessage(transactor, identifier, crypto.Keccak256Hash(interop.ExecutingMessagePayloadBytes(initiatingMessageLog)))
	require.Error(t, err)
}

func TestInteropInvariantCheckFailsBadLogIndexWs(t *testing.T) {
	t.Parallel()
	testSuite := createInteropTestSuite(t)

	sourceClient, err := ethclient.Dial(testSuite.Supersim.Orchestrator.WSEndpoint(testSuite.Supersim.NetworkConfig.L2Configs[0].ChainID))
	require.NoError(t, err)
	defer sourceClient.Close()

	destClient, err := ethclient.Dial(testSuite.Supersim.Orchestrator.WSEndpoint(testSuite.Supersim.NetworkConfig.L2Configs[1].ChainID))
	require.NoError(t, err)
	defer destClient.Close()

	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)

	l2ToL2CrossDomainMessenger, err := bindings.NewL2ToL2CrossDomainMessenger(predeploys.L2toL2CrossDomainMessengerAddr, sourceClient)
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

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), sourceClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	// progress forward one block before sending tx
	err = destClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)
	err = sourceClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)

	crossL2Inbox, err := bindings.NewCrossL2Inbox(predeploys.CrossL2InboxAddr, destClient)
	require.NoError(t, err)
	initiatingMessageBlockHeader, err := sourceClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)

	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.Identifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(5), // Wrong index
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	transactor.AccessList = interop.MessageAccessList(&identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))

	// Should fail because the log index is incorrect
	_, err = crossL2Inbox.ValidateMessage(transactor, identifier, crypto.Keccak256Hash(interop.ExecutingMessagePayloadBytes(initiatingMessageLog)))
	require.Error(t, err)
}

func TestInteropInvariantCheckBadBlockNumber(t *testing.T) {
	t.Parallel()
	testSuite := createInteropTestSuite(t)

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

	crossL2Inbox, err := bindings.NewCrossL2Inbox(predeploys.CrossL2InboxAddr, testSuite.DestEthClient)
	require.NoError(t, err)
	wrongBlockNumber := new(big.Int).Add(initiatingMessageTxReceipt.BlockNumber, big.NewInt(1))
	wrongMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), wrongBlockNumber)
	require.NoError(t, err)
	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.Identifier{
		Origin:      origin,
		BlockNumber: wrongBlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).SetUint64(wrongMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	transactor.AccessList = interop.MessageAccessList(&identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))

	// Should fail because the block number is incorrect
	_, err = crossL2Inbox.ValidateMessage(transactor, identifier, crypto.Keccak256Hash(interop.ExecutingMessagePayloadBytes(initiatingMessageLog)))
	require.Error(t, err)
}

func TestInteropInvariantCheckBadBlockTimestamp(t *testing.T) {
	t.Parallel()
	testSuite := createInteropTestSuite(t)

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

	crossL2Inbox, err := bindings.NewCrossL2Inbox(predeploys.CrossL2InboxAddr, testSuite.DestEthClient)
	require.NoError(t, err)
	initiatingMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)
	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.Identifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time + 1),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	transactor.AccessList = interop.MessageAccessList(&identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))

	// Should fail because the block timestamp is incorrect
	_, err = crossL2Inbox.ValidateMessage(transactor, identifier, crypto.Keccak256Hash(interop.ExecutingMessagePayloadBytes(initiatingMessageLog)))
	require.Error(t, err)
}

func TestForkedInteropInvariantCheckSucceeds(t *testing.T) {
	t.Parallel()
	testSuite := createForkedInteropTestSuite(t, func(cfg *config.CLIConfig) *config.CLIConfig {
		cfg.InteropAutoRelay = false
		return cfg
	})

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
	identifier := bindings.Identifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	transactor.AccessList = interop.MessageAccessList(&identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))

	// Should succeed
	tx, err = l2tol2CDM.RelayMessage(transactor, identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))
	require.NoError(t, err)

	receipt, err := bind.WaitMined(context.Background(), testSuite.DestEthClient, tx)
	require.NoError(t, err)
	require.True(t, receipt.Status == 1, "initiating message transaction failed")
}

func TestAutoRelaySimpleStorageCallSucceeds(t *testing.T) {
	t.Parallel()
	testSuite := createInteropTestSuite(t)

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

	require.NoError(t, wait.For(context.Background(), 500*time.Millisecond, func() (bool, error) {
		newVal, err := simpleStorage.Get(&bind.CallOpts{}, key)
		require.NoError(t, err)
		if err != nil {
			return false, err
		}

		return newVal == common.Hash(newVal), nil
	}))
}

func TestAutoRelaySuperchainETHBridgeTransferSucceeds(t *testing.T) {
	t.Parallel()
	testSuite := createInteropTestSuite(t, func(cfg *config.CLIConfig) *config.CLIConfig {
		cfg.InteropAutoRelay = true
		return cfg
	})

	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)

	sourceSuperchainETHBridge, err := bindings.NewSuperchainETHBridge(predeploys.SuperchainETHBridgeAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	destStartingBalance, err := testSuite.DestEthClient.BalanceAt(context.Background(), sourceTransactor.From, nil)
	require.NoError(t, err)

	valueToTransfer := big.NewInt(10_000_000)
	sourceTransactor.Value = valueToTransfer
	sendEthTx, err := sourceSuperchainETHBridge.SendETH(sourceTransactor, sourceTransactor.From, testSuite.DestChainID)
	require.NoError(t, err)
	sendEthTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, sendEthTx)
	require.NoError(t, err)
	require.True(t, sendEthTxReceipt.Status == 1, "send eth transaction failed")
	sourceTransactor.Value = nil

	require.NoError(t, wait.For(context.Background(), 500*time.Millisecond, func() (bool, error) {
		destEndingBalance, err := testSuite.DestEthClient.BalanceAt(context.Background(), sourceTransactor.From, nil)
		require.NoError(t, err)
		diff := new(big.Int).Sub(destEndingBalance, destStartingBalance)
		return diff.Cmp(valueToTransfer) == 0, nil
	}))
}

func TestForkAutoRelaySuperchainETHBridgeTransferSucceeds(t *testing.T) {
	t.Parallel()
	testSuite := createForkedInteropTestSuite(t, func(cfg *config.CLIConfig) *config.CLIConfig {
		cfg.InteropAutoRelay = true
		return cfg
	})

	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)

	sourceSuperchainETHBridge, err := bindings.NewSuperchainETHBridge(predeploys.SuperchainETHBridgeAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	destStartingBalance, err := testSuite.DestEthClient.BalanceAt(context.Background(), sourceTransactor.From, nil)
	require.NoError(t, err)

	valueToTransfer := big.NewInt(10_000_000)
	sourceTransactor.Value = valueToTransfer
	sendEthTx, err := sourceSuperchainETHBridge.SendETH(sourceTransactor, sourceTransactor.From, testSuite.DestChainID)
	require.NoError(t, err)
	sendEthTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, sendEthTx)
	require.NoError(t, err)
	require.True(t, sendEthTxReceipt.Status == 1, "send eth transaction failed")
	sourceTransactor.Value = nil

	require.NoError(t, wait.For(context.Background(), 500*time.Millisecond, func() (bool, error) {
		destEndingBalance, err := testSuite.DestEthClient.BalanceAt(context.Background(), sourceTransactor.From, nil)
		require.NoError(t, err)
		diff := new(big.Int).Sub(destEndingBalance, destStartingBalance)
		return diff.Cmp(valueToTransfer) == 0, nil
	}))
}

func TestInteropInvariantSucceedsWithDelay(t *testing.T) {
	t.Parallel()
	testSuite := createInteropTestSuite(t, func(cfg *config.CLIConfig) *config.CLIConfig {
		cfg.InteropDelay = 2
		return cfg
	})

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

	// Wait for delay time to pass
	time.Sleep(2 * time.Second)

	// progress forward blocks to ensure timestamps are updated
	err = testSuite.DestEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)
	err = testSuite.SourceEthClient.Client().CallContext(context.Background(), nil, "anvil_mine", uint64(3), uint64(2))
	require.NoError(t, err)

	l2tol2CDM, err := bindings.NewL2ToL2CrossDomainMessengerTransactor(predeploys.L2toL2CrossDomainMessengerAddr, testSuite.DestEthClient)
	require.NoError(t, err)
	initiatingMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)
	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.Identifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	transactor.AccessList = interop.MessageAccessList(&identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))

	// Should succeed because delay time has passed
	tx, err = l2tol2CDM.RelayMessage(transactor, identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))
	require.NoError(t, err)

	receipt, err := bind.WaitMined(context.Background(), testSuite.DestEthClient, tx)
	require.NoError(t, err)
	require.True(t, receipt.Status == 1, "executing message transaction failed")
}

func TestInteropInvariantFailsWhenDelayTimeNotPassed(t *testing.T) {
	t.Parallel()
	testSuite := createInteropTestSuite(t, func(cfg *config.CLIConfig) *config.CLIConfig {
		cfg.InteropDelay = gethmath.MaxBig256.Uint64() / 2 // added to block time so provide leeway to not overflow
		return cfg
	})

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

	initiatingMessageBlockHeader, err := testSuite.SourceEthClient.HeaderByNumber(context.Background(), initiatingMessageTxReceipt.BlockNumber)
	require.NoError(t, err)
	initiatingMessageLog := initiatingMessageTxReceipt.Logs[0]
	identifier := bindings.Identifier{
		Origin:      origin,
		BlockNumber: initiatingMessageTxReceipt.BlockNumber,
		LogIndex:    big.NewInt(0),
		Timestamp:   new(big.Int).SetUint64(initiatingMessageBlockHeader.Time),
		ChainId:     testSuite.SourceChainID,
	}
	transactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.DestChainID)
	require.NoError(t, err)

	l2tol2CDM, err := bindings.NewL2ToL2CrossDomainMessengerTransactor(predeploys.L2toL2CrossDomainMessengerAddr, testSuite.DestEthClient)
	require.NoError(t, err)

	transactor.AccessList = interop.MessageAccessList(&identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))

	// Should fail because the delay time hasn't passed
	_, err = l2tol2CDM.RelayMessage(transactor, identifier, interop.ExecutingMessagePayloadBytes(initiatingMessageLog))
	require.Error(t, err)
	require.Contains(t, err.Error(), "not enough time has passed since initiating message")
}

func TestAdminGetL2ToL2MessageByMsgHash(t *testing.T) {
	t.Parallel()
	testSuite := createInteropTestSuite(t, func(cfg *config.CLIConfig) *config.CLIConfig {
		cfg.InteropAutoRelay = true
		return cfg
	})

	privateKey, err := testSuite.DevKeys.Secret(devkeys.UserKey(0))
	require.NoError(t, err)

	sourceTransactor, err := bind.NewKeyedTransactorWithChainID(privateKey, testSuite.SourceChainID)
	require.NoError(t, err)

	sourceSuperchainETHBridge, err := bindings.NewSuperchainETHBridge(predeploys.SuperchainETHBridgeAddr, testSuite.SourceEthClient)
	require.NoError(t, err)

	destStartingBalance, err := testSuite.DestEthClient.BalanceAt(context.Background(), sourceTransactor.From, nil)
	require.NoError(t, err)

	valueToTransfer := big.NewInt(10_000_000)
	sourceTransactor.Value = valueToTransfer
	tx, err := sourceSuperchainETHBridge.SendETH(sourceTransactor, sourceTransactor.From, testSuite.DestChainID)
	require.NoError(t, err)
	sourceTransactor.Value = nil

	initiatingMessageTxReceipt, err := bind.WaitMined(context.Background(), testSuite.SourceEthClient, tx)
	require.NoError(t, err)
	require.True(t, initiatingMessageTxReceipt.Status == 1, "initiating message transaction failed")

	var client *rpc.Client
	require.NoError(t, wait.For(context.Background(), 500*time.Millisecond, func() (bool, error) {
		destEndingBalance, err := testSuite.DestEthClient.BalanceAt(context.Background(), sourceTransactor.From, nil)
		require.NoError(t, err)
		diff := new(big.Int).Sub(destEndingBalance, destStartingBalance)

		newClient, err := rpc.Dial(testSuite.Supersim.Orchestrator.AdminServer.Endpoint())
		if err != nil {
			return false, err
		}
		client = newClient

		return diff.Cmp(valueToTransfer) == 0, nil
	}))

	var message *JSONL2ToL2Message

	// msgHash for the above sendETH txn
	msgHash := "0x358a8ff1dbea56deb9bdcea844c849a790a573be454e5b14691fe1dbf0e11f36"
	rpcErr := client.CallContext(context.Background(), &message, "admin_getL2ToL2MessageByMsgHash", msgHash)
	require.NoError(t, rpcErr)

	assert.Equal(t, testSuite.DestChainID.Uint64(), message.Destination)
	assert.Equal(t, testSuite.SourceChainID.Uint64(), message.Source)
	assert.Equal(t, tx.To().String(), message.Target.String())
	assert.Equal(t, tx.To().String(), message.Sender.String())
}

func TestEthSubscribeNewHeads(t *testing.T) {
	t.Parallel()
	testSuite := createTestSuite(t)

	// Connect to the WebSocket endpoint
	conn, err := websocket.Dial(testSuite.Supersim.Orchestrator.WSEndpoint(testSuite.Supersim.NetworkConfig.L2Configs[0].ChainID), "", "http://localhost")
	require.NoError(t, err)
	defer conn.Close()

	// Subscribe to newHeads
	subscribeMsg := map[string]interface{}{
		"jsonrpc": "2.0",
		"id":      1,
		"method":  "eth_subscribe",
		"params":  []string{"newHeads"},
	}
	err = websocket.JSON.Send(conn, subscribeMsg)
	require.NoError(t, err)

	// Read the subscription response
	var subscribeResponse map[string]interface{}
	err = websocket.JSON.Receive(conn, &subscribeResponse)
	require.NoError(t, err)
	require.NotNil(t, subscribeResponse["result"])
	subscriptionID := subscribeResponse["result"].(string)
	require.NotEmpty(t, subscriptionID)

	// Mine a new block to trigger the subscription
	err = testSuite.Supersim.Orchestrator.L2Chains()[0].EthClient().Client().CallContext(context.Background(), nil, "anvil_mine", uint64(1))
	require.NoError(t, err)

	// Read the notification
	var notification map[string]interface{}
	err = websocket.JSON.Receive(conn, &notification)
	require.NoError(t, err)
	require.Equal(t, "eth_subscription", notification["method"])
	require.Equal(t, subscriptionID, notification["params"].(map[string]interface{})["subscription"])
	require.NotNil(t, notification["params"].(map[string]interface{})["result"])

	// Unsubscribe
	unsubscribeMsg := map[string]interface{}{
		"jsonrpc": "2.0",
		"id":      2,
		"method":  "eth_unsubscribe",
		"params":  []string{subscriptionID},
	}
	err = websocket.JSON.Send(conn, unsubscribeMsg)
	require.NoError(t, err)

	// Read the unsubscribe response
	var unsubscribeResponse map[string]interface{}
	err = websocket.JSON.Receive(conn, &unsubscribeResponse)
	require.NoError(t, err)
	require.True(t, unsubscribeResponse["result"].(bool))
}

func TestDependencySetConfiguration(t *testing.T) {
	t.Parallel()
	testSuite := createTestSuite(t, func(cfg *config.CLIConfig) *config.CLIConfig {
		cfg.DependencySet = "[1,2,3]"
		return cfg
	})

	// Test that the dependency set is properly parsed and stored in the config
	require.Equal(t, "[1,2,3]", testSuite.Cfg.DependencySet)

	// Parse the dependency set to verify it can be parsed correctly
	dependencyNumbers, err := config.ParseDependencySet(testSuite.Cfg.DependencySet)
	require.NoError(t, err)
	require.Equal(t, 3, len(dependencyNumbers))
	require.Equal(t, 0, dependencyNumbers[0].Cmp(big.NewInt(1)))
	require.Equal(t, 0, dependencyNumbers[1].Cmp(big.NewInt(2)))
	require.Equal(t, 0, dependencyNumbers[2].Cmp(big.NewInt(3)))

	// Verify supersim started successfully with the dependency set configured
	require.NotNil(t, testSuite.Supersim)
	require.True(t, len(testSuite.Supersim.Orchestrator.L2Chains()) > 0)
}


