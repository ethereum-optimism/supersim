package accountabstraction

import (
	"context"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"os"

	badger "github.com/dgraph-io/badger/v3"
	"github.com/ethereum-optimism/optimism/op-service/tasks"
	"github.com/ethereum/go-ethereum/common"
	"github.com/go-logr/logr"
	"github.com/go-logr/logr/funcr"

	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/stackup-wallet/stackup-bundler/pkg/altmempools"
	"github.com/stackup-wallet/stackup-bundler/pkg/bundler"
	"github.com/stackup-wallet/stackup-bundler/pkg/client"
	"github.com/stackup-wallet/stackup-bundler/pkg/entrypoint/stake"
	"github.com/stackup-wallet/stackup-bundler/pkg/gas"
	"github.com/stackup-wallet/stackup-bundler/pkg/jsonrpc"
	"github.com/stackup-wallet/stackup-bundler/pkg/mempool"
	"github.com/stackup-wallet/stackup-bundler/pkg/modules/batch"
	"github.com/stackup-wallet/stackup-bundler/pkg/modules/checks"
	"github.com/stackup-wallet/stackup-bundler/pkg/modules/entities"
	"github.com/stackup-wallet/stackup-bundler/pkg/modules/expire"
	"github.com/stackup-wallet/stackup-bundler/pkg/modules/gasprice"
	"github.com/stackup-wallet/stackup-bundler/pkg/modules/relay"
	"github.com/stackup-wallet/stackup-bundler/pkg/signer"
	"go.opentelemetry.io/otel"
)

type noOpWriter struct{}

func (noOpWriter) Write(p []byte) (n int, err error) {
	return len(p), nil
}

func NewNoOpLogr() logr.Logger {
	noOpLogger := log.New(noOpWriter{}, "", 0)
	logrLogger := funcr.New(func(prefix, args string) {
		noOpLogger.Print(prefix, args)
	}, funcr.Options{})
	return logrLogger
}

func NewStdoutLogr() logr.Logger {
	stdoutLogger := log.New(os.Stdout, "", log.LstdFlags)
	logrLogger := funcr.New(func(prefix, args string) {
		stdoutLogger.Print(prefix, args)
	}, funcr.Options{})
	return logrLogger
}

var defaultBeneficiary = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"
var defaultPrivateKey = "dbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97"

type StackupBundler struct {
	ethClient *ethclient.Client
	srv       *http.Server
	chainID   uint64
	port      uint64
	task      tasks.Group
}

func NewStackupBundler(
	chainID uint64,
	port uint64,
) *StackupBundler {

	return &StackupBundler{
		chainID: chainID,
		port:    port,
	}
}

func (s *StackupBundler) Start(ethClient *ethclient.Client) {
	r := s.CreateHandler(ethClient)
	s.srv = &http.Server{
		Addr:    fmt.Sprintf(":%d", s.port),
		Handler: r,
	}

	go func() {
		if err := s.srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()
}

func (s *StackupBundler) Stop() error {
	return s.srv.Shutdown(context.Background())
}

func (s *StackupBundler) Endpoint() string {
	return fmt.Sprintf("http://127.0.0.1:%d", s.port)
}

func (s *StackupBundler) CreateHandler(ethClient *ethclient.Client) *gin.Engine {
	s.ethClient = ethClient

	conf := GetDefaultConfig()

	// no-op logger TODO: figure out where to send these logs to
	logr := NewNoOpLogr()

	eoa, err := signer.New(defaultPrivateKey)
	if err != nil {
		log.Fatal(err)
	}
	beneficiary := common.HexToAddress(defaultPrivateKey)

	dataDirectory := fmt.Sprintf("/tmp/stackup_bundler_%d", s.chainID)

	// delete if directory already exists
	if err := os.RemoveAll(dataDirectory); err != nil {
		log.Fatal(err)
	}

	db, err := badger.Open(badger.DefaultOptions(dataDirectory).WithLoggingLevel(badger.ERROR))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	eth := s.ethClient
	rpc := s.ethClient.Client()
	chain := big.NewInt(int64(s.chainID))

	ov := gas.NewDefaultOverhead()

	if conf.IsOpStackNetwork {
		ov.SetCalcPreVerificationGasFunc(
			gas.CalcOptimismPVGWithEthClient(rpc, chain, conf.SupportedEntryPoints[0]),
		)
		ov.SetPreVerificationGasBufferFactor(1)
	}

	mem, err := mempool.New(db)
	if err != nil {
		log.Fatal(err)
	}

	alt, err := altmempools.NewFromIPFS(chain, conf.AltMempoolIPFSGateway, conf.AltMempoolIds)
	if err != nil {
		log.Fatal(err)
	}
	check := checks.New(
		db,
		rpc,
		ov,
		alt,
		conf.MaxVerificationGas,
		conf.MaxBatchGasLimit,
		conf.IsRIP7212Supported,
		conf.NativeBundlerCollectorTracer,
		conf.ReputationConstants,
	)

	exp := expire.New(conf.MaxOpTTL)

	relayer := relay.New(eoa, eth, chain, beneficiary, logr)

	rep := entities.New(db, eth, conf.ReputationConstants)

	// Init Client
	c := client.New(mem, ov, chain, conf.SupportedEntryPoints, conf.OpLookupLimit)
	c.SetGetUserOpReceiptFunc(client.GetUserOpReceiptWithEthClient(eth))
	c.SetGetGasPricesFunc(client.GetGasPricesWithEthClient(eth))
	c.SetGetGasEstimateFunc(
		client.GetGasEstimateWithEthClient(
			rpc,
			ov,
			chain,
			conf.MaxBatchGasLimit,
			conf.NativeBundlerExecutorTracer,
		),
	)
	c.SetGetUserOpByHashFunc(client.GetUserOpByHashWithEthClient(eth))
	c.SetGetStakeFunc(stake.GetStakeWithEthClient(eth))
	c.UseLogger(logr)
	c.UseModules(
		rep.CheckStatus(),
		rep.ValidateOpLimit(),
		check.ValidateOpValues(),
		check.SimulateOp(),
		rep.IncOpsSeen(),
	)

	// Init Bundler
	b := bundler.New(mem, chain, conf.SupportedEntryPoints)
	b.SetGetBaseFeeFunc(gasprice.GetBaseFeeWithEthClient(eth))
	b.SetGetGasTipFunc(gasprice.GetGasTipWithEthClient(eth))
	b.SetGetLegacyGasPriceFunc(gasprice.GetLegacyGasPriceWithEthClient(eth))
	b.UseLogger(logr)
	if err := b.UserMeter(otel.GetMeterProvider().Meter("bundler")); err != nil {
		log.Fatal(err)
	}
	b.UseModules(
		exp.DropExpired(),
		gasprice.SortByGasPrice(),
		gasprice.FilterUnderpriced(),
		batch.SortByNonce(),
		batch.MaintainGasLimit(conf.MaxBatchGasLimit),
		check.CodeHashes(),
		check.PaymasterDeposit(),
		check.SimulateBatch(),
		relayer.SendUserOperation(),
		rep.IncOpsIncluded(),
		check.Clean(),
	)
	if err := b.Run(); err != nil {
		log.Fatal(err)
	}

	// init Debug
	var d *client.Debug
	if conf.DebugMode {
		d = client.NewDebug(eoa, eth, mem, rep, b, chain, conf.SupportedEntryPoints[0], beneficiary)
		b.SetMaxBatch(1)
		relayer.SetWaitTimeout(0)
	}

	// Init HTTP server
	gin.SetMode(conf.GinMode)
	r := gin.New()
	if err := r.SetTrustedProxies(nil); err != nil {
		log.Fatal(err)
	}

	r.Use(
		cors.Default(),
		WithLogr(logr),
		gin.Recovery(),
	)
	r.GET("/ping", func(g *gin.Context) {
		g.Status(http.StatusOK)
	})
	handlers := []gin.HandlerFunc{
		jsonrpc.Controller(client.NewRpcAdapter(c, d)),
		jsonrpc.WithOTELTracerAttributes(),
	}
	r.POST("/", handlers...)
	r.POST("/rpc", handlers...)

	return r
}
