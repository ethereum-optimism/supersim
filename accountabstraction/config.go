package accountabstraction

import (
	"math/big"
	"time"

	"github.com/ethereum/go-ethereum/common"
	"github.com/stackup-wallet/stackup-bundler/pkg/modules/entities"
)

var v6EntryPoint = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"

type Values struct {
	// Documented variables.
	SupportedEntryPoints         []common.Address
	MaxVerificationGas           *big.Int
	MaxBatchGasLimit             *big.Int
	MaxOpTTL                     time.Duration
	OpLookupLimit                uint64
	NativeBundlerCollectorTracer string
	NativeBundlerExecutorTracer  string
	ReputationConstants          *entities.ReputationConstants

	// Searcher mode variables.
	EthBuilderUrls    []string
	BlocksInTheFuture int

	// Observability variables.
	OTELServiceName      string
	OTELCollectorHeaders map[string]string
	OTELCollectorUrl     string
	OTELInsecureMode     bool

	// Alternative mempool variables.
	AltMempoolIPFSGateway string
	AltMempoolIds         []string

	// Rollup related variables.
	IsOpStackNetwork   bool
	IsRIP7212Supported bool
	IsArbStackNetwork  bool

	// Undocumented variables.
	DebugMode bool
	GinMode   string
}

func GetDefaultReputationConstants() *entities.ReputationConstants {
	return &entities.ReputationConstants{
		MinUnstakeDelay:                86400,
		MinStakeValue:                  2000000000000000,
		SameSenderMempoolCount:         4,
		SameUnstakedEntityMempoolCount: 11,
		ThrottledEntityMempoolCount:    4,
		ThrottledEntityLiveBlocks:      10,
		ThrottledEntityBundleCount:     4,
		MinInclusionRateDenominator:    10,
		ThrottlingSlack:                10,
		BanSlack:                       50,
	}
}

func GetDefaultConfig() *Values {
	return &Values{
		SupportedEntryPoints: []common.Address{common.HexToAddress(v6EntryPoint)},
		MaxVerificationGas:   big.NewInt(6000000),
		MaxBatchGasLimit:     big.NewInt(18000000),
		MaxOpTTL:             180 * time.Second,
		OpLookupLimit:        2000,

		ReputationConstants: GetDefaultReputationConstants(),

		NativeBundlerCollectorTracer: "",
		NativeBundlerExecutorTracer:  "",
		BlocksInTheFuture:            6,
		OTELServiceName:              "stackup-bundler",
		OTELCollectorHeaders:         map[string]string{},
		OTELCollectorUrl:             "",
		OTELInsecureMode:             false,
		AltMempoolIPFSGateway:        "",
		AltMempoolIds:                []string{},
		IsOpStackNetwork:             true,
		IsRIP7212Supported:           true,
		IsArbStackNetwork:            false,

		DebugMode: false,
		GinMode:   "release",
	}

}
