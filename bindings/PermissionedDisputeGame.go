// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package bindings

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// FaultDisputeGameGameConstructorParams is an auto generated low-level Go binding around an user-defined struct.
type FaultDisputeGameGameConstructorParams struct {
	GameType            uint32
	AbsolutePrestate    [32]byte
	MaxGameDepth        *big.Int
	SplitDepth          *big.Int
	ClockExtension      uint64
	MaxClockDuration    uint64
	Vm                  common.Address
	Weth                common.Address
	AnchorStateRegistry common.Address
	L2ChainId           *big.Int
}

// TypesOutputRootProof is an auto generated low-level Go binding around an user-defined struct.
type TypesOutputRootProof struct {
	Version                  [32]byte
	StateRoot                [32]byte
	MessagePasserStorageRoot [32]byte
	LatestBlockhash          [32]byte
}

// PermissionedDisputeGameMetaData contains all meta data concerning the PermissionedDisputeGame contract.
var PermissionedDisputeGameMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"constructor\",\"inputs\":[{\"name\":\"_params\",\"type\":\"tuple\",\"internalType\":\"structFaultDisputeGame.GameConstructorParams\",\"components\":[{\"name\":\"gameType\",\"type\":\"uint32\",\"internalType\":\"GameType\"},{\"name\":\"absolutePrestate\",\"type\":\"bytes32\",\"internalType\":\"Claim\"},{\"name\":\"maxGameDepth\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"splitDepth\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"clockExtension\",\"type\":\"uint64\",\"internalType\":\"Duration\"},{\"name\":\"maxClockDuration\",\"type\":\"uint64\",\"internalType\":\"Duration\"},{\"name\":\"vm\",\"type\":\"address\",\"internalType\":\"contractIBigStepper\"},{\"name\":\"weth\",\"type\":\"address\",\"internalType\":\"contractIDelayedWETH\"},{\"name\":\"anchorStateRegistry\",\"type\":\"address\",\"internalType\":\"contractIAnchorStateRegistry\"},{\"name\":\"l2ChainId\",\"type\":\"uint256\",\"internalType\":\"uint256\"}]},{\"name\":\"_proposer\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_challenger\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"absolutePrestate\",\"inputs\":[],\"outputs\":[{\"name\":\"absolutePrestate_\",\"type\":\"bytes32\",\"internalType\":\"Claim\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"addLocalData\",\"inputs\":[{\"name\":\"_ident\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_execLeafIdx\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_partOffset\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"anchorStateRegistry\",\"inputs\":[],\"outputs\":[{\"name\":\"registry_\",\"type\":\"address\",\"internalType\":\"contractIAnchorStateRegistry\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"attack\",\"inputs\":[{\"name\":\"_disputed\",\"type\":\"bytes32\",\"internalType\":\"Claim\"},{\"name\":\"_parentIndex\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_claim\",\"type\":\"bytes32\",\"internalType\":\"Claim\"}],\"outputs\":[],\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"bondDistributionMode\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint8\",\"internalType\":\"enumBondDistributionMode\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"challengeRootL2Block\",\"inputs\":[{\"name\":\"_outputRootProof\",\"type\":\"tuple\",\"internalType\":\"structTypes.OutputRootProof\",\"components\":[{\"name\":\"version\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"stateRoot\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"messagePasserStorageRoot\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"latestBlockhash\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}]},{\"name\":\"_headerRLP\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"challenger\",\"inputs\":[],\"outputs\":[{\"name\":\"challenger_\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"claimCredit\",\"inputs\":[{\"name\":\"_recipient\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"claimData\",\"inputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"parentIndex\",\"type\":\"uint32\",\"internalType\":\"uint32\"},{\"name\":\"counteredBy\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"claimant\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"bond\",\"type\":\"uint128\",\"internalType\":\"uint128\"},{\"name\":\"claim\",\"type\":\"bytes32\",\"internalType\":\"Claim\"},{\"name\":\"position\",\"type\":\"uint128\",\"internalType\":\"Position\"},{\"name\":\"clock\",\"type\":\"uint128\",\"internalType\":\"Clock\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"claimDataLen\",\"inputs\":[],\"outputs\":[{\"name\":\"len_\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"claims\",\"inputs\":[{\"name\":\"\",\"type\":\"bytes32\",\"internalType\":\"Hash\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"clockExtension\",\"inputs\":[],\"outputs\":[{\"name\":\"clockExtension_\",\"type\":\"uint64\",\"internalType\":\"Duration\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"closeGame\",\"inputs\":[],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"createdAt\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint64\",\"internalType\":\"Timestamp\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"credit\",\"inputs\":[{\"name\":\"_recipient\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"credit_\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"defend\",\"inputs\":[{\"name\":\"_disputed\",\"type\":\"bytes32\",\"internalType\":\"Claim\"},{\"name\":\"_parentIndex\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_claim\",\"type\":\"bytes32\",\"internalType\":\"Claim\"}],\"outputs\":[],\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"extraData\",\"inputs\":[],\"outputs\":[{\"name\":\"extraData_\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"gameCreator\",\"inputs\":[],\"outputs\":[{\"name\":\"creator_\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"gameData\",\"inputs\":[],\"outputs\":[{\"name\":\"gameType_\",\"type\":\"uint32\",\"internalType\":\"GameType\"},{\"name\":\"rootClaim_\",\"type\":\"bytes32\",\"internalType\":\"Claim\"},{\"name\":\"extraData_\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"gameType\",\"inputs\":[],\"outputs\":[{\"name\":\"gameType_\",\"type\":\"uint32\",\"internalType\":\"GameType\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"getChallengerDuration\",\"inputs\":[{\"name\":\"_claimIndex\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"duration_\",\"type\":\"uint64\",\"internalType\":\"Duration\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"getNumToResolve\",\"inputs\":[{\"name\":\"_claimIndex\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"numRemainingChildren_\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"getRequiredBond\",\"inputs\":[{\"name\":\"_position\",\"type\":\"uint128\",\"internalType\":\"Position\"}],\"outputs\":[{\"name\":\"requiredBond_\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"hasUnlockedCredit\",\"inputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"initialize\",\"inputs\":[],\"outputs\":[],\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"l1Head\",\"inputs\":[],\"outputs\":[{\"name\":\"l1Head_\",\"type\":\"bytes32\",\"internalType\":\"Hash\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"l2BlockNumber\",\"inputs\":[],\"outputs\":[{\"name\":\"l2BlockNumber_\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"l2BlockNumberChallenged\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"l2BlockNumberChallenger\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"l2ChainId\",\"inputs\":[],\"outputs\":[{\"name\":\"l2ChainId_\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"l2SequenceNumber\",\"inputs\":[],\"outputs\":[{\"name\":\"l2SequenceNumber_\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"maxClockDuration\",\"inputs\":[],\"outputs\":[{\"name\":\"maxClockDuration_\",\"type\":\"uint64\",\"internalType\":\"Duration\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"maxGameDepth\",\"inputs\":[],\"outputs\":[{\"name\":\"maxGameDepth_\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"move\",\"inputs\":[{\"name\":\"_disputed\",\"type\":\"bytes32\",\"internalType\":\"Claim\"},{\"name\":\"_challengeIndex\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_claim\",\"type\":\"bytes32\",\"internalType\":\"Claim\"},{\"name\":\"_isAttack\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"outputs\":[],\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"normalModeCredit\",\"inputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"proposer\",\"inputs\":[],\"outputs\":[{\"name\":\"proposer_\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"refundModeCredit\",\"inputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"resolutionCheckpoints\",\"inputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"initialCheckpointComplete\",\"type\":\"bool\",\"internalType\":\"bool\"},{\"name\":\"subgameIndex\",\"type\":\"uint32\",\"internalType\":\"uint32\"},{\"name\":\"leftmostPosition\",\"type\":\"uint128\",\"internalType\":\"Position\"},{\"name\":\"counteredBy\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"resolve\",\"inputs\":[],\"outputs\":[{\"name\":\"status_\",\"type\":\"uint8\",\"internalType\":\"enumGameStatus\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"resolveClaim\",\"inputs\":[{\"name\":\"_claimIndex\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_numToResolve\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"resolvedAt\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint64\",\"internalType\":\"Timestamp\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"resolvedSubgames\",\"inputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"rootClaim\",\"inputs\":[],\"outputs\":[{\"name\":\"rootClaim_\",\"type\":\"bytes32\",\"internalType\":\"Claim\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"splitDepth\",\"inputs\":[],\"outputs\":[{\"name\":\"splitDepth_\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"startingBlockNumber\",\"inputs\":[],\"outputs\":[{\"name\":\"startingBlockNumber_\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"startingOutputRoot\",\"inputs\":[],\"outputs\":[{\"name\":\"root\",\"type\":\"bytes32\",\"internalType\":\"Hash\"},{\"name\":\"l2SequenceNumber\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"startingRootHash\",\"inputs\":[],\"outputs\":[{\"name\":\"startingRootHash_\",\"type\":\"bytes32\",\"internalType\":\"Hash\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"status\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint8\",\"internalType\":\"enumGameStatus\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"step\",\"inputs\":[{\"name\":\"_claimIndex\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_isAttack\",\"type\":\"bool\",\"internalType\":\"bool\"},{\"name\":\"_stateData\",\"type\":\"bytes\",\"internalType\":\"bytes\"},{\"name\":\"_proof\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"subgames\",\"inputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"version\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"vm\",\"inputs\":[],\"outputs\":[{\"name\":\"vm_\",\"type\":\"address\",\"internalType\":\"contractIBigStepper\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"wasRespectedGameTypeWhenCreated\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"weth\",\"inputs\":[],\"outputs\":[{\"name\":\"weth_\",\"type\":\"address\",\"internalType\":\"contractIDelayedWETH\"}],\"stateMutability\":\"view\"},{\"type\":\"event\",\"name\":\"GameClosed\",\"inputs\":[{\"name\":\"bondDistributionMode\",\"type\":\"uint8\",\"indexed\":false,\"internalType\":\"enumBondDistributionMode\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Move\",\"inputs\":[{\"name\":\"parentIndex\",\"type\":\"uint256\",\"indexed\":true,\"internalType\":\"uint256\"},{\"name\":\"claim\",\"type\":\"bytes32\",\"indexed\":true,\"internalType\":\"Claim\"},{\"name\":\"claimant\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Resolved\",\"inputs\":[{\"name\":\"status\",\"type\":\"uint8\",\"indexed\":true,\"internalType\":\"enumGameStatus\"}],\"anonymous\":false},{\"type\":\"error\",\"name\":\"AlreadyInitialized\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"AnchorRootNotFound\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"BadAuth\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"BlockNumberMatches\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"BondTransferFailed\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"CannotDefendRootClaim\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ClaimAboveSplit\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ClaimAlreadyExists\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ClaimAlreadyResolved\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ClockNotExpired\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ClockTimeExceeded\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ContentLengthMismatch\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"DuplicateStep\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"EmptyItem\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"GameDepthExceeded\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"GameNotFinalized\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"GameNotInProgress\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"GameNotResolved\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"GamePaused\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"IncorrectBondAmount\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidBondDistributionMode\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidChallengePeriod\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidClockExtension\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidDataRemainder\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidDisputedClaimIndex\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidHeader\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidHeaderRLP\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidLocalIdent\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidOutputRootProof\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidParent\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidPrestate\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidSplitDepth\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"L2BlockNumberChallenged\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"MaxDepthTooLarge\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"NoCreditToClaim\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"OutOfOrderResolution\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ReservedGameType\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"UnexpectedList\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"UnexpectedRootClaim\",\"inputs\":[{\"name\":\"rootClaim\",\"type\":\"bytes32\",\"internalType\":\"Claim\"}]},{\"type\":\"error\",\"name\":\"UnexpectedString\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ValidStep\",\"inputs\":[]}]",
}

// PermissionedDisputeGameABI is the input ABI used to generate the binding from.
// Deprecated: Use PermissionedDisputeGameMetaData.ABI instead.
var PermissionedDisputeGameABI = PermissionedDisputeGameMetaData.ABI

// PermissionedDisputeGame is an auto generated Go binding around an Ethereum contract.
type PermissionedDisputeGame struct {
	PermissionedDisputeGameCaller     // Read-only binding to the contract
	PermissionedDisputeGameTransactor // Write-only binding to the contract
	PermissionedDisputeGameFilterer   // Log filterer for contract events
}

// PermissionedDisputeGameCaller is an auto generated read-only Go binding around an Ethereum contract.
type PermissionedDisputeGameCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PermissionedDisputeGameTransactor is an auto generated write-only Go binding around an Ethereum contract.
type PermissionedDisputeGameTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PermissionedDisputeGameFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type PermissionedDisputeGameFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PermissionedDisputeGameSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type PermissionedDisputeGameSession struct {
	Contract     *PermissionedDisputeGame // Generic contract binding to set the session for
	CallOpts     bind.CallOpts            // Call options to use throughout this session
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// PermissionedDisputeGameCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type PermissionedDisputeGameCallerSession struct {
	Contract *PermissionedDisputeGameCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts                  // Call options to use throughout this session
}

// PermissionedDisputeGameTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type PermissionedDisputeGameTransactorSession struct {
	Contract     *PermissionedDisputeGameTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts                  // Transaction auth options to use throughout this session
}

// PermissionedDisputeGameRaw is an auto generated low-level Go binding around an Ethereum contract.
type PermissionedDisputeGameRaw struct {
	Contract *PermissionedDisputeGame // Generic contract binding to access the raw methods on
}

// PermissionedDisputeGameCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type PermissionedDisputeGameCallerRaw struct {
	Contract *PermissionedDisputeGameCaller // Generic read-only contract binding to access the raw methods on
}

// PermissionedDisputeGameTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type PermissionedDisputeGameTransactorRaw struct {
	Contract *PermissionedDisputeGameTransactor // Generic write-only contract binding to access the raw methods on
}

// NewPermissionedDisputeGame creates a new instance of PermissionedDisputeGame, bound to a specific deployed contract.
func NewPermissionedDisputeGame(address common.Address, backend bind.ContractBackend) (*PermissionedDisputeGame, error) {
	contract, err := bindPermissionedDisputeGame(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &PermissionedDisputeGame{PermissionedDisputeGameCaller: PermissionedDisputeGameCaller{contract: contract}, PermissionedDisputeGameTransactor: PermissionedDisputeGameTransactor{contract: contract}, PermissionedDisputeGameFilterer: PermissionedDisputeGameFilterer{contract: contract}}, nil
}

// NewPermissionedDisputeGameCaller creates a new read-only instance of PermissionedDisputeGame, bound to a specific deployed contract.
func NewPermissionedDisputeGameCaller(address common.Address, caller bind.ContractCaller) (*PermissionedDisputeGameCaller, error) {
	contract, err := bindPermissionedDisputeGame(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &PermissionedDisputeGameCaller{contract: contract}, nil
}

// NewPermissionedDisputeGameTransactor creates a new write-only instance of PermissionedDisputeGame, bound to a specific deployed contract.
func NewPermissionedDisputeGameTransactor(address common.Address, transactor bind.ContractTransactor) (*PermissionedDisputeGameTransactor, error) {
	contract, err := bindPermissionedDisputeGame(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &PermissionedDisputeGameTransactor{contract: contract}, nil
}

// NewPermissionedDisputeGameFilterer creates a new log filterer instance of PermissionedDisputeGame, bound to a specific deployed contract.
func NewPermissionedDisputeGameFilterer(address common.Address, filterer bind.ContractFilterer) (*PermissionedDisputeGameFilterer, error) {
	contract, err := bindPermissionedDisputeGame(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &PermissionedDisputeGameFilterer{contract: contract}, nil
}

// bindPermissionedDisputeGame binds a generic wrapper to an already deployed contract.
func bindPermissionedDisputeGame(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := PermissionedDisputeGameMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_PermissionedDisputeGame *PermissionedDisputeGameRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _PermissionedDisputeGame.Contract.PermissionedDisputeGameCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_PermissionedDisputeGame *PermissionedDisputeGameRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.PermissionedDisputeGameTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_PermissionedDisputeGame *PermissionedDisputeGameRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.PermissionedDisputeGameTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _PermissionedDisputeGame.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.contract.Transact(opts, method, params...)
}

// AbsolutePrestate is a free data retrieval call binding the contract method 0x8d450a95.
//
// Solidity: function absolutePrestate() view returns(bytes32 absolutePrestate_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) AbsolutePrestate(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "absolutePrestate")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// AbsolutePrestate is a free data retrieval call binding the contract method 0x8d450a95.
//
// Solidity: function absolutePrestate() view returns(bytes32 absolutePrestate_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) AbsolutePrestate() ([32]byte, error) {
	return _PermissionedDisputeGame.Contract.AbsolutePrestate(&_PermissionedDisputeGame.CallOpts)
}

// AbsolutePrestate is a free data retrieval call binding the contract method 0x8d450a95.
//
// Solidity: function absolutePrestate() view returns(bytes32 absolutePrestate_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) AbsolutePrestate() ([32]byte, error) {
	return _PermissionedDisputeGame.Contract.AbsolutePrestate(&_PermissionedDisputeGame.CallOpts)
}

// AnchorStateRegistry is a free data retrieval call binding the contract method 0x5c0cba33.
//
// Solidity: function anchorStateRegistry() view returns(address registry_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) AnchorStateRegistry(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "anchorStateRegistry")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// AnchorStateRegistry is a free data retrieval call binding the contract method 0x5c0cba33.
//
// Solidity: function anchorStateRegistry() view returns(address registry_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) AnchorStateRegistry() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.AnchorStateRegistry(&_PermissionedDisputeGame.CallOpts)
}

// AnchorStateRegistry is a free data retrieval call binding the contract method 0x5c0cba33.
//
// Solidity: function anchorStateRegistry() view returns(address registry_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) AnchorStateRegistry() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.AnchorStateRegistry(&_PermissionedDisputeGame.CallOpts)
}

// BondDistributionMode is a free data retrieval call binding the contract method 0x378dd48c.
//
// Solidity: function bondDistributionMode() view returns(uint8)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) BondDistributionMode(opts *bind.CallOpts) (uint8, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "bondDistributionMode")

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// BondDistributionMode is a free data retrieval call binding the contract method 0x378dd48c.
//
// Solidity: function bondDistributionMode() view returns(uint8)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) BondDistributionMode() (uint8, error) {
	return _PermissionedDisputeGame.Contract.BondDistributionMode(&_PermissionedDisputeGame.CallOpts)
}

// BondDistributionMode is a free data retrieval call binding the contract method 0x378dd48c.
//
// Solidity: function bondDistributionMode() view returns(uint8)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) BondDistributionMode() (uint8, error) {
	return _PermissionedDisputeGame.Contract.BondDistributionMode(&_PermissionedDisputeGame.CallOpts)
}

// Challenger is a free data retrieval call binding the contract method 0x534db0e2.
//
// Solidity: function challenger() view returns(address challenger_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) Challenger(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "challenger")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Challenger is a free data retrieval call binding the contract method 0x534db0e2.
//
// Solidity: function challenger() view returns(address challenger_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Challenger() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.Challenger(&_PermissionedDisputeGame.CallOpts)
}

// Challenger is a free data retrieval call binding the contract method 0x534db0e2.
//
// Solidity: function challenger() view returns(address challenger_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) Challenger() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.Challenger(&_PermissionedDisputeGame.CallOpts)
}

// ClaimData is a free data retrieval call binding the contract method 0xc6f0308c.
//
// Solidity: function claimData(uint256 ) view returns(uint32 parentIndex, address counteredBy, address claimant, uint128 bond, bytes32 claim, uint128 position, uint128 clock)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) ClaimData(opts *bind.CallOpts, arg0 *big.Int) (struct {
	ParentIndex uint32
	CounteredBy common.Address
	Claimant    common.Address
	Bond        *big.Int
	Claim       [32]byte
	Position    *big.Int
	Clock       *big.Int
}, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "claimData", arg0)

	outstruct := new(struct {
		ParentIndex uint32
		CounteredBy common.Address
		Claimant    common.Address
		Bond        *big.Int
		Claim       [32]byte
		Position    *big.Int
		Clock       *big.Int
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.ParentIndex = *abi.ConvertType(out[0], new(uint32)).(*uint32)
	outstruct.CounteredBy = *abi.ConvertType(out[1], new(common.Address)).(*common.Address)
	outstruct.Claimant = *abi.ConvertType(out[2], new(common.Address)).(*common.Address)
	outstruct.Bond = *abi.ConvertType(out[3], new(*big.Int)).(**big.Int)
	outstruct.Claim = *abi.ConvertType(out[4], new([32]byte)).(*[32]byte)
	outstruct.Position = *abi.ConvertType(out[5], new(*big.Int)).(**big.Int)
	outstruct.Clock = *abi.ConvertType(out[6], new(*big.Int)).(**big.Int)

	return *outstruct, err

}

// ClaimData is a free data retrieval call binding the contract method 0xc6f0308c.
//
// Solidity: function claimData(uint256 ) view returns(uint32 parentIndex, address counteredBy, address claimant, uint128 bond, bytes32 claim, uint128 position, uint128 clock)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) ClaimData(arg0 *big.Int) (struct {
	ParentIndex uint32
	CounteredBy common.Address
	Claimant    common.Address
	Bond        *big.Int
	Claim       [32]byte
	Position    *big.Int
	Clock       *big.Int
}, error) {
	return _PermissionedDisputeGame.Contract.ClaimData(&_PermissionedDisputeGame.CallOpts, arg0)
}

// ClaimData is a free data retrieval call binding the contract method 0xc6f0308c.
//
// Solidity: function claimData(uint256 ) view returns(uint32 parentIndex, address counteredBy, address claimant, uint128 bond, bytes32 claim, uint128 position, uint128 clock)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) ClaimData(arg0 *big.Int) (struct {
	ParentIndex uint32
	CounteredBy common.Address
	Claimant    common.Address
	Bond        *big.Int
	Claim       [32]byte
	Position    *big.Int
	Clock       *big.Int
}, error) {
	return _PermissionedDisputeGame.Contract.ClaimData(&_PermissionedDisputeGame.CallOpts, arg0)
}

// ClaimDataLen is a free data retrieval call binding the contract method 0x8980e0cc.
//
// Solidity: function claimDataLen() view returns(uint256 len_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) ClaimDataLen(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "claimDataLen")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// ClaimDataLen is a free data retrieval call binding the contract method 0x8980e0cc.
//
// Solidity: function claimDataLen() view returns(uint256 len_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) ClaimDataLen() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.ClaimDataLen(&_PermissionedDisputeGame.CallOpts)
}

// ClaimDataLen is a free data retrieval call binding the contract method 0x8980e0cc.
//
// Solidity: function claimDataLen() view returns(uint256 len_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) ClaimDataLen() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.ClaimDataLen(&_PermissionedDisputeGame.CallOpts)
}

// Claims is a free data retrieval call binding the contract method 0xeff0f592.
//
// Solidity: function claims(bytes32 ) view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) Claims(opts *bind.CallOpts, arg0 [32]byte) (bool, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "claims", arg0)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// Claims is a free data retrieval call binding the contract method 0xeff0f592.
//
// Solidity: function claims(bytes32 ) view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Claims(arg0 [32]byte) (bool, error) {
	return _PermissionedDisputeGame.Contract.Claims(&_PermissionedDisputeGame.CallOpts, arg0)
}

// Claims is a free data retrieval call binding the contract method 0xeff0f592.
//
// Solidity: function claims(bytes32 ) view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) Claims(arg0 [32]byte) (bool, error) {
	return _PermissionedDisputeGame.Contract.Claims(&_PermissionedDisputeGame.CallOpts, arg0)
}

// ClockExtension is a free data retrieval call binding the contract method 0x6b6716c0.
//
// Solidity: function clockExtension() view returns(uint64 clockExtension_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) ClockExtension(opts *bind.CallOpts) (uint64, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "clockExtension")

	if err != nil {
		return *new(uint64), err
	}

	out0 := *abi.ConvertType(out[0], new(uint64)).(*uint64)

	return out0, err

}

// ClockExtension is a free data retrieval call binding the contract method 0x6b6716c0.
//
// Solidity: function clockExtension() view returns(uint64 clockExtension_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) ClockExtension() (uint64, error) {
	return _PermissionedDisputeGame.Contract.ClockExtension(&_PermissionedDisputeGame.CallOpts)
}

// ClockExtension is a free data retrieval call binding the contract method 0x6b6716c0.
//
// Solidity: function clockExtension() view returns(uint64 clockExtension_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) ClockExtension() (uint64, error) {
	return _PermissionedDisputeGame.Contract.ClockExtension(&_PermissionedDisputeGame.CallOpts)
}

// CreatedAt is a free data retrieval call binding the contract method 0xcf09e0d0.
//
// Solidity: function createdAt() view returns(uint64)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) CreatedAt(opts *bind.CallOpts) (uint64, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "createdAt")

	if err != nil {
		return *new(uint64), err
	}

	out0 := *abi.ConvertType(out[0], new(uint64)).(*uint64)

	return out0, err

}

// CreatedAt is a free data retrieval call binding the contract method 0xcf09e0d0.
//
// Solidity: function createdAt() view returns(uint64)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) CreatedAt() (uint64, error) {
	return _PermissionedDisputeGame.Contract.CreatedAt(&_PermissionedDisputeGame.CallOpts)
}

// CreatedAt is a free data retrieval call binding the contract method 0xcf09e0d0.
//
// Solidity: function createdAt() view returns(uint64)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) CreatedAt() (uint64, error) {
	return _PermissionedDisputeGame.Contract.CreatedAt(&_PermissionedDisputeGame.CallOpts)
}

// Credit is a free data retrieval call binding the contract method 0xd5d44d80.
//
// Solidity: function credit(address _recipient) view returns(uint256 credit_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) Credit(opts *bind.CallOpts, _recipient common.Address) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "credit", _recipient)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Credit is a free data retrieval call binding the contract method 0xd5d44d80.
//
// Solidity: function credit(address _recipient) view returns(uint256 credit_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Credit(_recipient common.Address) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.Credit(&_PermissionedDisputeGame.CallOpts, _recipient)
}

// Credit is a free data retrieval call binding the contract method 0xd5d44d80.
//
// Solidity: function credit(address _recipient) view returns(uint256 credit_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) Credit(_recipient common.Address) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.Credit(&_PermissionedDisputeGame.CallOpts, _recipient)
}

// ExtraData is a free data retrieval call binding the contract method 0x609d3334.
//
// Solidity: function extraData() pure returns(bytes extraData_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) ExtraData(opts *bind.CallOpts) ([]byte, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "extraData")

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// ExtraData is a free data retrieval call binding the contract method 0x609d3334.
//
// Solidity: function extraData() pure returns(bytes extraData_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) ExtraData() ([]byte, error) {
	return _PermissionedDisputeGame.Contract.ExtraData(&_PermissionedDisputeGame.CallOpts)
}

// ExtraData is a free data retrieval call binding the contract method 0x609d3334.
//
// Solidity: function extraData() pure returns(bytes extraData_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) ExtraData() ([]byte, error) {
	return _PermissionedDisputeGame.Contract.ExtraData(&_PermissionedDisputeGame.CallOpts)
}

// GameCreator is a free data retrieval call binding the contract method 0x37b1b229.
//
// Solidity: function gameCreator() pure returns(address creator_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) GameCreator(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "gameCreator")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GameCreator is a free data retrieval call binding the contract method 0x37b1b229.
//
// Solidity: function gameCreator() pure returns(address creator_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) GameCreator() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.GameCreator(&_PermissionedDisputeGame.CallOpts)
}

// GameCreator is a free data retrieval call binding the contract method 0x37b1b229.
//
// Solidity: function gameCreator() pure returns(address creator_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) GameCreator() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.GameCreator(&_PermissionedDisputeGame.CallOpts)
}

// GameData is a free data retrieval call binding the contract method 0xfa24f743.
//
// Solidity: function gameData() view returns(uint32 gameType_, bytes32 rootClaim_, bytes extraData_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) GameData(opts *bind.CallOpts) (struct {
	GameType  uint32
	RootClaim [32]byte
	ExtraData []byte
}, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "gameData")

	outstruct := new(struct {
		GameType  uint32
		RootClaim [32]byte
		ExtraData []byte
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.GameType = *abi.ConvertType(out[0], new(uint32)).(*uint32)
	outstruct.RootClaim = *abi.ConvertType(out[1], new([32]byte)).(*[32]byte)
	outstruct.ExtraData = *abi.ConvertType(out[2], new([]byte)).(*[]byte)

	return *outstruct, err

}

// GameData is a free data retrieval call binding the contract method 0xfa24f743.
//
// Solidity: function gameData() view returns(uint32 gameType_, bytes32 rootClaim_, bytes extraData_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) GameData() (struct {
	GameType  uint32
	RootClaim [32]byte
	ExtraData []byte
}, error) {
	return _PermissionedDisputeGame.Contract.GameData(&_PermissionedDisputeGame.CallOpts)
}

// GameData is a free data retrieval call binding the contract method 0xfa24f743.
//
// Solidity: function gameData() view returns(uint32 gameType_, bytes32 rootClaim_, bytes extraData_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) GameData() (struct {
	GameType  uint32
	RootClaim [32]byte
	ExtraData []byte
}, error) {
	return _PermissionedDisputeGame.Contract.GameData(&_PermissionedDisputeGame.CallOpts)
}

// GameType is a free data retrieval call binding the contract method 0xbbdc02db.
//
// Solidity: function gameType() view returns(uint32 gameType_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) GameType(opts *bind.CallOpts) (uint32, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "gameType")

	if err != nil {
		return *new(uint32), err
	}

	out0 := *abi.ConvertType(out[0], new(uint32)).(*uint32)

	return out0, err

}

// GameType is a free data retrieval call binding the contract method 0xbbdc02db.
//
// Solidity: function gameType() view returns(uint32 gameType_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) GameType() (uint32, error) {
	return _PermissionedDisputeGame.Contract.GameType(&_PermissionedDisputeGame.CallOpts)
}

// GameType is a free data retrieval call binding the contract method 0xbbdc02db.
//
// Solidity: function gameType() view returns(uint32 gameType_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) GameType() (uint32, error) {
	return _PermissionedDisputeGame.Contract.GameType(&_PermissionedDisputeGame.CallOpts)
}

// GetChallengerDuration is a free data retrieval call binding the contract method 0xbd8da956.
//
// Solidity: function getChallengerDuration(uint256 _claimIndex) view returns(uint64 duration_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) GetChallengerDuration(opts *bind.CallOpts, _claimIndex *big.Int) (uint64, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "getChallengerDuration", _claimIndex)

	if err != nil {
		return *new(uint64), err
	}

	out0 := *abi.ConvertType(out[0], new(uint64)).(*uint64)

	return out0, err

}

// GetChallengerDuration is a free data retrieval call binding the contract method 0xbd8da956.
//
// Solidity: function getChallengerDuration(uint256 _claimIndex) view returns(uint64 duration_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) GetChallengerDuration(_claimIndex *big.Int) (uint64, error) {
	return _PermissionedDisputeGame.Contract.GetChallengerDuration(&_PermissionedDisputeGame.CallOpts, _claimIndex)
}

// GetChallengerDuration is a free data retrieval call binding the contract method 0xbd8da956.
//
// Solidity: function getChallengerDuration(uint256 _claimIndex) view returns(uint64 duration_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) GetChallengerDuration(_claimIndex *big.Int) (uint64, error) {
	return _PermissionedDisputeGame.Contract.GetChallengerDuration(&_PermissionedDisputeGame.CallOpts, _claimIndex)
}

// GetNumToResolve is a free data retrieval call binding the contract method 0x5a5fa2d9.
//
// Solidity: function getNumToResolve(uint256 _claimIndex) view returns(uint256 numRemainingChildren_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) GetNumToResolve(opts *bind.CallOpts, _claimIndex *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "getNumToResolve", _claimIndex)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetNumToResolve is a free data retrieval call binding the contract method 0x5a5fa2d9.
//
// Solidity: function getNumToResolve(uint256 _claimIndex) view returns(uint256 numRemainingChildren_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) GetNumToResolve(_claimIndex *big.Int) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.GetNumToResolve(&_PermissionedDisputeGame.CallOpts, _claimIndex)
}

// GetNumToResolve is a free data retrieval call binding the contract method 0x5a5fa2d9.
//
// Solidity: function getNumToResolve(uint256 _claimIndex) view returns(uint256 numRemainingChildren_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) GetNumToResolve(_claimIndex *big.Int) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.GetNumToResolve(&_PermissionedDisputeGame.CallOpts, _claimIndex)
}

// GetRequiredBond is a free data retrieval call binding the contract method 0xc395e1ca.
//
// Solidity: function getRequiredBond(uint128 _position) view returns(uint256 requiredBond_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) GetRequiredBond(opts *bind.CallOpts, _position *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "getRequiredBond", _position)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetRequiredBond is a free data retrieval call binding the contract method 0xc395e1ca.
//
// Solidity: function getRequiredBond(uint128 _position) view returns(uint256 requiredBond_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) GetRequiredBond(_position *big.Int) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.GetRequiredBond(&_PermissionedDisputeGame.CallOpts, _position)
}

// GetRequiredBond is a free data retrieval call binding the contract method 0xc395e1ca.
//
// Solidity: function getRequiredBond(uint128 _position) view returns(uint256 requiredBond_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) GetRequiredBond(_position *big.Int) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.GetRequiredBond(&_PermissionedDisputeGame.CallOpts, _position)
}

// HasUnlockedCredit is a free data retrieval call binding the contract method 0x222abf45.
//
// Solidity: function hasUnlockedCredit(address ) view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) HasUnlockedCredit(opts *bind.CallOpts, arg0 common.Address) (bool, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "hasUnlockedCredit", arg0)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// HasUnlockedCredit is a free data retrieval call binding the contract method 0x222abf45.
//
// Solidity: function hasUnlockedCredit(address ) view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) HasUnlockedCredit(arg0 common.Address) (bool, error) {
	return _PermissionedDisputeGame.Contract.HasUnlockedCredit(&_PermissionedDisputeGame.CallOpts, arg0)
}

// HasUnlockedCredit is a free data retrieval call binding the contract method 0x222abf45.
//
// Solidity: function hasUnlockedCredit(address ) view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) HasUnlockedCredit(arg0 common.Address) (bool, error) {
	return _PermissionedDisputeGame.Contract.HasUnlockedCredit(&_PermissionedDisputeGame.CallOpts, arg0)
}

// L1Head is a free data retrieval call binding the contract method 0x6361506d.
//
// Solidity: function l1Head() pure returns(bytes32 l1Head_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) L1Head(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "l1Head")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// L1Head is a free data retrieval call binding the contract method 0x6361506d.
//
// Solidity: function l1Head() pure returns(bytes32 l1Head_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) L1Head() ([32]byte, error) {
	return _PermissionedDisputeGame.Contract.L1Head(&_PermissionedDisputeGame.CallOpts)
}

// L1Head is a free data retrieval call binding the contract method 0x6361506d.
//
// Solidity: function l1Head() pure returns(bytes32 l1Head_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) L1Head() ([32]byte, error) {
	return _PermissionedDisputeGame.Contract.L1Head(&_PermissionedDisputeGame.CallOpts)
}

// L2BlockNumber is a free data retrieval call binding the contract method 0x8b85902b.
//
// Solidity: function l2BlockNumber() pure returns(uint256 l2BlockNumber_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) L2BlockNumber(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "l2BlockNumber")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// L2BlockNumber is a free data retrieval call binding the contract method 0x8b85902b.
//
// Solidity: function l2BlockNumber() pure returns(uint256 l2BlockNumber_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) L2BlockNumber() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.L2BlockNumber(&_PermissionedDisputeGame.CallOpts)
}

// L2BlockNumber is a free data retrieval call binding the contract method 0x8b85902b.
//
// Solidity: function l2BlockNumber() pure returns(uint256 l2BlockNumber_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) L2BlockNumber() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.L2BlockNumber(&_PermissionedDisputeGame.CallOpts)
}

// L2BlockNumberChallenged is a free data retrieval call binding the contract method 0x3e3ac912.
//
// Solidity: function l2BlockNumberChallenged() view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) L2BlockNumberChallenged(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "l2BlockNumberChallenged")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// L2BlockNumberChallenged is a free data retrieval call binding the contract method 0x3e3ac912.
//
// Solidity: function l2BlockNumberChallenged() view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) L2BlockNumberChallenged() (bool, error) {
	return _PermissionedDisputeGame.Contract.L2BlockNumberChallenged(&_PermissionedDisputeGame.CallOpts)
}

// L2BlockNumberChallenged is a free data retrieval call binding the contract method 0x3e3ac912.
//
// Solidity: function l2BlockNumberChallenged() view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) L2BlockNumberChallenged() (bool, error) {
	return _PermissionedDisputeGame.Contract.L2BlockNumberChallenged(&_PermissionedDisputeGame.CallOpts)
}

// L2BlockNumberChallenger is a free data retrieval call binding the contract method 0x30dbe570.
//
// Solidity: function l2BlockNumberChallenger() view returns(address)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) L2BlockNumberChallenger(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "l2BlockNumberChallenger")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// L2BlockNumberChallenger is a free data retrieval call binding the contract method 0x30dbe570.
//
// Solidity: function l2BlockNumberChallenger() view returns(address)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) L2BlockNumberChallenger() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.L2BlockNumberChallenger(&_PermissionedDisputeGame.CallOpts)
}

// L2BlockNumberChallenger is a free data retrieval call binding the contract method 0x30dbe570.
//
// Solidity: function l2BlockNumberChallenger() view returns(address)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) L2BlockNumberChallenger() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.L2BlockNumberChallenger(&_PermissionedDisputeGame.CallOpts)
}

// L2ChainId is a free data retrieval call binding the contract method 0xd6ae3cd5.
//
// Solidity: function l2ChainId() view returns(uint256 l2ChainId_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) L2ChainId(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "l2ChainId")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// L2ChainId is a free data retrieval call binding the contract method 0xd6ae3cd5.
//
// Solidity: function l2ChainId() view returns(uint256 l2ChainId_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) L2ChainId() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.L2ChainId(&_PermissionedDisputeGame.CallOpts)
}

// L2ChainId is a free data retrieval call binding the contract method 0xd6ae3cd5.
//
// Solidity: function l2ChainId() view returns(uint256 l2ChainId_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) L2ChainId() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.L2ChainId(&_PermissionedDisputeGame.CallOpts)
}

// L2SequenceNumber is a free data retrieval call binding the contract method 0x99735e32.
//
// Solidity: function l2SequenceNumber() pure returns(uint256 l2SequenceNumber_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) L2SequenceNumber(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "l2SequenceNumber")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// L2SequenceNumber is a free data retrieval call binding the contract method 0x99735e32.
//
// Solidity: function l2SequenceNumber() pure returns(uint256 l2SequenceNumber_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) L2SequenceNumber() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.L2SequenceNumber(&_PermissionedDisputeGame.CallOpts)
}

// L2SequenceNumber is a free data retrieval call binding the contract method 0x99735e32.
//
// Solidity: function l2SequenceNumber() pure returns(uint256 l2SequenceNumber_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) L2SequenceNumber() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.L2SequenceNumber(&_PermissionedDisputeGame.CallOpts)
}

// MaxClockDuration is a free data retrieval call binding the contract method 0xdabd396d.
//
// Solidity: function maxClockDuration() view returns(uint64 maxClockDuration_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) MaxClockDuration(opts *bind.CallOpts) (uint64, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "maxClockDuration")

	if err != nil {
		return *new(uint64), err
	}

	out0 := *abi.ConvertType(out[0], new(uint64)).(*uint64)

	return out0, err

}

// MaxClockDuration is a free data retrieval call binding the contract method 0xdabd396d.
//
// Solidity: function maxClockDuration() view returns(uint64 maxClockDuration_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) MaxClockDuration() (uint64, error) {
	return _PermissionedDisputeGame.Contract.MaxClockDuration(&_PermissionedDisputeGame.CallOpts)
}

// MaxClockDuration is a free data retrieval call binding the contract method 0xdabd396d.
//
// Solidity: function maxClockDuration() view returns(uint64 maxClockDuration_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) MaxClockDuration() (uint64, error) {
	return _PermissionedDisputeGame.Contract.MaxClockDuration(&_PermissionedDisputeGame.CallOpts)
}

// MaxGameDepth is a free data retrieval call binding the contract method 0xfa315aa9.
//
// Solidity: function maxGameDepth() view returns(uint256 maxGameDepth_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) MaxGameDepth(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "maxGameDepth")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// MaxGameDepth is a free data retrieval call binding the contract method 0xfa315aa9.
//
// Solidity: function maxGameDepth() view returns(uint256 maxGameDepth_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) MaxGameDepth() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.MaxGameDepth(&_PermissionedDisputeGame.CallOpts)
}

// MaxGameDepth is a free data retrieval call binding the contract method 0xfa315aa9.
//
// Solidity: function maxGameDepth() view returns(uint256 maxGameDepth_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) MaxGameDepth() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.MaxGameDepth(&_PermissionedDisputeGame.CallOpts)
}

// NormalModeCredit is a free data retrieval call binding the contract method 0x529d6a8c.
//
// Solidity: function normalModeCredit(address ) view returns(uint256)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) NormalModeCredit(opts *bind.CallOpts, arg0 common.Address) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "normalModeCredit", arg0)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// NormalModeCredit is a free data retrieval call binding the contract method 0x529d6a8c.
//
// Solidity: function normalModeCredit(address ) view returns(uint256)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) NormalModeCredit(arg0 common.Address) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.NormalModeCredit(&_PermissionedDisputeGame.CallOpts, arg0)
}

// NormalModeCredit is a free data retrieval call binding the contract method 0x529d6a8c.
//
// Solidity: function normalModeCredit(address ) view returns(uint256)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) NormalModeCredit(arg0 common.Address) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.NormalModeCredit(&_PermissionedDisputeGame.CallOpts, arg0)
}

// Proposer is a free data retrieval call binding the contract method 0xa8e4fb90.
//
// Solidity: function proposer() view returns(address proposer_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) Proposer(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "proposer")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Proposer is a free data retrieval call binding the contract method 0xa8e4fb90.
//
// Solidity: function proposer() view returns(address proposer_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Proposer() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.Proposer(&_PermissionedDisputeGame.CallOpts)
}

// Proposer is a free data retrieval call binding the contract method 0xa8e4fb90.
//
// Solidity: function proposer() view returns(address proposer_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) Proposer() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.Proposer(&_PermissionedDisputeGame.CallOpts)
}

// RefundModeCredit is a free data retrieval call binding the contract method 0xc0d8bb74.
//
// Solidity: function refundModeCredit(address ) view returns(uint256)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) RefundModeCredit(opts *bind.CallOpts, arg0 common.Address) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "refundModeCredit", arg0)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// RefundModeCredit is a free data retrieval call binding the contract method 0xc0d8bb74.
//
// Solidity: function refundModeCredit(address ) view returns(uint256)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) RefundModeCredit(arg0 common.Address) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.RefundModeCredit(&_PermissionedDisputeGame.CallOpts, arg0)
}

// RefundModeCredit is a free data retrieval call binding the contract method 0xc0d8bb74.
//
// Solidity: function refundModeCredit(address ) view returns(uint256)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) RefundModeCredit(arg0 common.Address) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.RefundModeCredit(&_PermissionedDisputeGame.CallOpts, arg0)
}

// ResolutionCheckpoints is a free data retrieval call binding the contract method 0xa445ece6.
//
// Solidity: function resolutionCheckpoints(uint256 ) view returns(bool initialCheckpointComplete, uint32 subgameIndex, uint128 leftmostPosition, address counteredBy)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) ResolutionCheckpoints(opts *bind.CallOpts, arg0 *big.Int) (struct {
	InitialCheckpointComplete bool
	SubgameIndex              uint32
	LeftmostPosition          *big.Int
	CounteredBy               common.Address
}, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "resolutionCheckpoints", arg0)

	outstruct := new(struct {
		InitialCheckpointComplete bool
		SubgameIndex              uint32
		LeftmostPosition          *big.Int
		CounteredBy               common.Address
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.InitialCheckpointComplete = *abi.ConvertType(out[0], new(bool)).(*bool)
	outstruct.SubgameIndex = *abi.ConvertType(out[1], new(uint32)).(*uint32)
	outstruct.LeftmostPosition = *abi.ConvertType(out[2], new(*big.Int)).(**big.Int)
	outstruct.CounteredBy = *abi.ConvertType(out[3], new(common.Address)).(*common.Address)

	return *outstruct, err

}

// ResolutionCheckpoints is a free data retrieval call binding the contract method 0xa445ece6.
//
// Solidity: function resolutionCheckpoints(uint256 ) view returns(bool initialCheckpointComplete, uint32 subgameIndex, uint128 leftmostPosition, address counteredBy)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) ResolutionCheckpoints(arg0 *big.Int) (struct {
	InitialCheckpointComplete bool
	SubgameIndex              uint32
	LeftmostPosition          *big.Int
	CounteredBy               common.Address
}, error) {
	return _PermissionedDisputeGame.Contract.ResolutionCheckpoints(&_PermissionedDisputeGame.CallOpts, arg0)
}

// ResolutionCheckpoints is a free data retrieval call binding the contract method 0xa445ece6.
//
// Solidity: function resolutionCheckpoints(uint256 ) view returns(bool initialCheckpointComplete, uint32 subgameIndex, uint128 leftmostPosition, address counteredBy)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) ResolutionCheckpoints(arg0 *big.Int) (struct {
	InitialCheckpointComplete bool
	SubgameIndex              uint32
	LeftmostPosition          *big.Int
	CounteredBy               common.Address
}, error) {
	return _PermissionedDisputeGame.Contract.ResolutionCheckpoints(&_PermissionedDisputeGame.CallOpts, arg0)
}

// ResolvedAt is a free data retrieval call binding the contract method 0x19effeb4.
//
// Solidity: function resolvedAt() view returns(uint64)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) ResolvedAt(opts *bind.CallOpts) (uint64, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "resolvedAt")

	if err != nil {
		return *new(uint64), err
	}

	out0 := *abi.ConvertType(out[0], new(uint64)).(*uint64)

	return out0, err

}

// ResolvedAt is a free data retrieval call binding the contract method 0x19effeb4.
//
// Solidity: function resolvedAt() view returns(uint64)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) ResolvedAt() (uint64, error) {
	return _PermissionedDisputeGame.Contract.ResolvedAt(&_PermissionedDisputeGame.CallOpts)
}

// ResolvedAt is a free data retrieval call binding the contract method 0x19effeb4.
//
// Solidity: function resolvedAt() view returns(uint64)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) ResolvedAt() (uint64, error) {
	return _PermissionedDisputeGame.Contract.ResolvedAt(&_PermissionedDisputeGame.CallOpts)
}

// ResolvedSubgames is a free data retrieval call binding the contract method 0xfe2bbeb2.
//
// Solidity: function resolvedSubgames(uint256 ) view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) ResolvedSubgames(opts *bind.CallOpts, arg0 *big.Int) (bool, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "resolvedSubgames", arg0)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// ResolvedSubgames is a free data retrieval call binding the contract method 0xfe2bbeb2.
//
// Solidity: function resolvedSubgames(uint256 ) view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) ResolvedSubgames(arg0 *big.Int) (bool, error) {
	return _PermissionedDisputeGame.Contract.ResolvedSubgames(&_PermissionedDisputeGame.CallOpts, arg0)
}

// ResolvedSubgames is a free data retrieval call binding the contract method 0xfe2bbeb2.
//
// Solidity: function resolvedSubgames(uint256 ) view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) ResolvedSubgames(arg0 *big.Int) (bool, error) {
	return _PermissionedDisputeGame.Contract.ResolvedSubgames(&_PermissionedDisputeGame.CallOpts, arg0)
}

// RootClaim is a free data retrieval call binding the contract method 0xbcef3b55.
//
// Solidity: function rootClaim() pure returns(bytes32 rootClaim_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) RootClaim(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "rootClaim")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// RootClaim is a free data retrieval call binding the contract method 0xbcef3b55.
//
// Solidity: function rootClaim() pure returns(bytes32 rootClaim_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) RootClaim() ([32]byte, error) {
	return _PermissionedDisputeGame.Contract.RootClaim(&_PermissionedDisputeGame.CallOpts)
}

// RootClaim is a free data retrieval call binding the contract method 0xbcef3b55.
//
// Solidity: function rootClaim() pure returns(bytes32 rootClaim_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) RootClaim() ([32]byte, error) {
	return _PermissionedDisputeGame.Contract.RootClaim(&_PermissionedDisputeGame.CallOpts)
}

// SplitDepth is a free data retrieval call binding the contract method 0xec5e6308.
//
// Solidity: function splitDepth() view returns(uint256 splitDepth_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) SplitDepth(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "splitDepth")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// SplitDepth is a free data retrieval call binding the contract method 0xec5e6308.
//
// Solidity: function splitDepth() view returns(uint256 splitDepth_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) SplitDepth() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.SplitDepth(&_PermissionedDisputeGame.CallOpts)
}

// SplitDepth is a free data retrieval call binding the contract method 0xec5e6308.
//
// Solidity: function splitDepth() view returns(uint256 splitDepth_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) SplitDepth() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.SplitDepth(&_PermissionedDisputeGame.CallOpts)
}

// StartingBlockNumber is a free data retrieval call binding the contract method 0x70872aa5.
//
// Solidity: function startingBlockNumber() view returns(uint256 startingBlockNumber_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) StartingBlockNumber(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "startingBlockNumber")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// StartingBlockNumber is a free data retrieval call binding the contract method 0x70872aa5.
//
// Solidity: function startingBlockNumber() view returns(uint256 startingBlockNumber_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) StartingBlockNumber() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.StartingBlockNumber(&_PermissionedDisputeGame.CallOpts)
}

// StartingBlockNumber is a free data retrieval call binding the contract method 0x70872aa5.
//
// Solidity: function startingBlockNumber() view returns(uint256 startingBlockNumber_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) StartingBlockNumber() (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.StartingBlockNumber(&_PermissionedDisputeGame.CallOpts)
}

// StartingOutputRoot is a free data retrieval call binding the contract method 0x57da950e.
//
// Solidity: function startingOutputRoot() view returns(bytes32 root, uint256 l2SequenceNumber)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) StartingOutputRoot(opts *bind.CallOpts) (struct {
	Root             [32]byte
	L2SequenceNumber *big.Int
}, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "startingOutputRoot")

	outstruct := new(struct {
		Root             [32]byte
		L2SequenceNumber *big.Int
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Root = *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)
	outstruct.L2SequenceNumber = *abi.ConvertType(out[1], new(*big.Int)).(**big.Int)

	return *outstruct, err

}

// StartingOutputRoot is a free data retrieval call binding the contract method 0x57da950e.
//
// Solidity: function startingOutputRoot() view returns(bytes32 root, uint256 l2SequenceNumber)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) StartingOutputRoot() (struct {
	Root             [32]byte
	L2SequenceNumber *big.Int
}, error) {
	return _PermissionedDisputeGame.Contract.StartingOutputRoot(&_PermissionedDisputeGame.CallOpts)
}

// StartingOutputRoot is a free data retrieval call binding the contract method 0x57da950e.
//
// Solidity: function startingOutputRoot() view returns(bytes32 root, uint256 l2SequenceNumber)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) StartingOutputRoot() (struct {
	Root             [32]byte
	L2SequenceNumber *big.Int
}, error) {
	return _PermissionedDisputeGame.Contract.StartingOutputRoot(&_PermissionedDisputeGame.CallOpts)
}

// StartingRootHash is a free data retrieval call binding the contract method 0x25fc2ace.
//
// Solidity: function startingRootHash() view returns(bytes32 startingRootHash_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) StartingRootHash(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "startingRootHash")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// StartingRootHash is a free data retrieval call binding the contract method 0x25fc2ace.
//
// Solidity: function startingRootHash() view returns(bytes32 startingRootHash_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) StartingRootHash() ([32]byte, error) {
	return _PermissionedDisputeGame.Contract.StartingRootHash(&_PermissionedDisputeGame.CallOpts)
}

// StartingRootHash is a free data retrieval call binding the contract method 0x25fc2ace.
//
// Solidity: function startingRootHash() view returns(bytes32 startingRootHash_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) StartingRootHash() ([32]byte, error) {
	return _PermissionedDisputeGame.Contract.StartingRootHash(&_PermissionedDisputeGame.CallOpts)
}

// Status is a free data retrieval call binding the contract method 0x200d2ed2.
//
// Solidity: function status() view returns(uint8)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) Status(opts *bind.CallOpts) (uint8, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "status")

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// Status is a free data retrieval call binding the contract method 0x200d2ed2.
//
// Solidity: function status() view returns(uint8)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Status() (uint8, error) {
	return _PermissionedDisputeGame.Contract.Status(&_PermissionedDisputeGame.CallOpts)
}

// Status is a free data retrieval call binding the contract method 0x200d2ed2.
//
// Solidity: function status() view returns(uint8)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) Status() (uint8, error) {
	return _PermissionedDisputeGame.Contract.Status(&_PermissionedDisputeGame.CallOpts)
}

// Subgames is a free data retrieval call binding the contract method 0x2ad69aeb.
//
// Solidity: function subgames(uint256 , uint256 ) view returns(uint256)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) Subgames(opts *bind.CallOpts, arg0 *big.Int, arg1 *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "subgames", arg0, arg1)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Subgames is a free data retrieval call binding the contract method 0x2ad69aeb.
//
// Solidity: function subgames(uint256 , uint256 ) view returns(uint256)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Subgames(arg0 *big.Int, arg1 *big.Int) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.Subgames(&_PermissionedDisputeGame.CallOpts, arg0, arg1)
}

// Subgames is a free data retrieval call binding the contract method 0x2ad69aeb.
//
// Solidity: function subgames(uint256 , uint256 ) view returns(uint256)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) Subgames(arg0 *big.Int, arg1 *big.Int) (*big.Int, error) {
	return _PermissionedDisputeGame.Contract.Subgames(&_PermissionedDisputeGame.CallOpts, arg0, arg1)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() pure returns(string)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) Version(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "version")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() pure returns(string)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Version() (string, error) {
	return _PermissionedDisputeGame.Contract.Version(&_PermissionedDisputeGame.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() pure returns(string)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) Version() (string, error) {
	return _PermissionedDisputeGame.Contract.Version(&_PermissionedDisputeGame.CallOpts)
}

// Vm is a free data retrieval call binding the contract method 0x3a768463.
//
// Solidity: function vm() view returns(address vm_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) Vm(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "vm")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Vm is a free data retrieval call binding the contract method 0x3a768463.
//
// Solidity: function vm() view returns(address vm_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Vm() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.Vm(&_PermissionedDisputeGame.CallOpts)
}

// Vm is a free data retrieval call binding the contract method 0x3a768463.
//
// Solidity: function vm() view returns(address vm_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) Vm() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.Vm(&_PermissionedDisputeGame.CallOpts)
}

// WasRespectedGameTypeWhenCreated is a free data retrieval call binding the contract method 0x250e69bd.
//
// Solidity: function wasRespectedGameTypeWhenCreated() view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) WasRespectedGameTypeWhenCreated(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "wasRespectedGameTypeWhenCreated")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// WasRespectedGameTypeWhenCreated is a free data retrieval call binding the contract method 0x250e69bd.
//
// Solidity: function wasRespectedGameTypeWhenCreated() view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) WasRespectedGameTypeWhenCreated() (bool, error) {
	return _PermissionedDisputeGame.Contract.WasRespectedGameTypeWhenCreated(&_PermissionedDisputeGame.CallOpts)
}

// WasRespectedGameTypeWhenCreated is a free data retrieval call binding the contract method 0x250e69bd.
//
// Solidity: function wasRespectedGameTypeWhenCreated() view returns(bool)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) WasRespectedGameTypeWhenCreated() (bool, error) {
	return _PermissionedDisputeGame.Contract.WasRespectedGameTypeWhenCreated(&_PermissionedDisputeGame.CallOpts)
}

// Weth is a free data retrieval call binding the contract method 0x3fc8cef3.
//
// Solidity: function weth() view returns(address weth_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCaller) Weth(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _PermissionedDisputeGame.contract.Call(opts, &out, "weth")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Weth is a free data retrieval call binding the contract method 0x3fc8cef3.
//
// Solidity: function weth() view returns(address weth_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Weth() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.Weth(&_PermissionedDisputeGame.CallOpts)
}

// Weth is a free data retrieval call binding the contract method 0x3fc8cef3.
//
// Solidity: function weth() view returns(address weth_)
func (_PermissionedDisputeGame *PermissionedDisputeGameCallerSession) Weth() (common.Address, error) {
	return _PermissionedDisputeGame.Contract.Weth(&_PermissionedDisputeGame.CallOpts)
}

// AddLocalData is a paid mutator transaction binding the contract method 0xf8f43ff6.
//
// Solidity: function addLocalData(uint256 _ident, uint256 _execLeafIdx, uint256 _partOffset) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactor) AddLocalData(opts *bind.TransactOpts, _ident *big.Int, _execLeafIdx *big.Int, _partOffset *big.Int) (*types.Transaction, error) {
	return _PermissionedDisputeGame.contract.Transact(opts, "addLocalData", _ident, _execLeafIdx, _partOffset)
}

// AddLocalData is a paid mutator transaction binding the contract method 0xf8f43ff6.
//
// Solidity: function addLocalData(uint256 _ident, uint256 _execLeafIdx, uint256 _partOffset) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) AddLocalData(_ident *big.Int, _execLeafIdx *big.Int, _partOffset *big.Int) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.AddLocalData(&_PermissionedDisputeGame.TransactOpts, _ident, _execLeafIdx, _partOffset)
}

// AddLocalData is a paid mutator transaction binding the contract method 0xf8f43ff6.
//
// Solidity: function addLocalData(uint256 _ident, uint256 _execLeafIdx, uint256 _partOffset) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorSession) AddLocalData(_ident *big.Int, _execLeafIdx *big.Int, _partOffset *big.Int) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.AddLocalData(&_PermissionedDisputeGame.TransactOpts, _ident, _execLeafIdx, _partOffset)
}

// Attack is a paid mutator transaction binding the contract method 0x472777c6.
//
// Solidity: function attack(bytes32 _disputed, uint256 _parentIndex, bytes32 _claim) payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactor) Attack(opts *bind.TransactOpts, _disputed [32]byte, _parentIndex *big.Int, _claim [32]byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.contract.Transact(opts, "attack", _disputed, _parentIndex, _claim)
}

// Attack is a paid mutator transaction binding the contract method 0x472777c6.
//
// Solidity: function attack(bytes32 _disputed, uint256 _parentIndex, bytes32 _claim) payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Attack(_disputed [32]byte, _parentIndex *big.Int, _claim [32]byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Attack(&_PermissionedDisputeGame.TransactOpts, _disputed, _parentIndex, _claim)
}

// Attack is a paid mutator transaction binding the contract method 0x472777c6.
//
// Solidity: function attack(bytes32 _disputed, uint256 _parentIndex, bytes32 _claim) payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorSession) Attack(_disputed [32]byte, _parentIndex *big.Int, _claim [32]byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Attack(&_PermissionedDisputeGame.TransactOpts, _disputed, _parentIndex, _claim)
}

// ChallengeRootL2Block is a paid mutator transaction binding the contract method 0x01935130.
//
// Solidity: function challengeRootL2Block((bytes32,bytes32,bytes32,bytes32) _outputRootProof, bytes _headerRLP) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactor) ChallengeRootL2Block(opts *bind.TransactOpts, _outputRootProof TypesOutputRootProof, _headerRLP []byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.contract.Transact(opts, "challengeRootL2Block", _outputRootProof, _headerRLP)
}

// ChallengeRootL2Block is a paid mutator transaction binding the contract method 0x01935130.
//
// Solidity: function challengeRootL2Block((bytes32,bytes32,bytes32,bytes32) _outputRootProof, bytes _headerRLP) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) ChallengeRootL2Block(_outputRootProof TypesOutputRootProof, _headerRLP []byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.ChallengeRootL2Block(&_PermissionedDisputeGame.TransactOpts, _outputRootProof, _headerRLP)
}

// ChallengeRootL2Block is a paid mutator transaction binding the contract method 0x01935130.
//
// Solidity: function challengeRootL2Block((bytes32,bytes32,bytes32,bytes32) _outputRootProof, bytes _headerRLP) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorSession) ChallengeRootL2Block(_outputRootProof TypesOutputRootProof, _headerRLP []byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.ChallengeRootL2Block(&_PermissionedDisputeGame.TransactOpts, _outputRootProof, _headerRLP)
}

// ClaimCredit is a paid mutator transaction binding the contract method 0x60e27464.
//
// Solidity: function claimCredit(address _recipient) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactor) ClaimCredit(opts *bind.TransactOpts, _recipient common.Address) (*types.Transaction, error) {
	return _PermissionedDisputeGame.contract.Transact(opts, "claimCredit", _recipient)
}

// ClaimCredit is a paid mutator transaction binding the contract method 0x60e27464.
//
// Solidity: function claimCredit(address _recipient) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) ClaimCredit(_recipient common.Address) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.ClaimCredit(&_PermissionedDisputeGame.TransactOpts, _recipient)
}

// ClaimCredit is a paid mutator transaction binding the contract method 0x60e27464.
//
// Solidity: function claimCredit(address _recipient) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorSession) ClaimCredit(_recipient common.Address) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.ClaimCredit(&_PermissionedDisputeGame.TransactOpts, _recipient)
}

// CloseGame is a paid mutator transaction binding the contract method 0x786b844b.
//
// Solidity: function closeGame() returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactor) CloseGame(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _PermissionedDisputeGame.contract.Transact(opts, "closeGame")
}

// CloseGame is a paid mutator transaction binding the contract method 0x786b844b.
//
// Solidity: function closeGame() returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) CloseGame() (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.CloseGame(&_PermissionedDisputeGame.TransactOpts)
}

// CloseGame is a paid mutator transaction binding the contract method 0x786b844b.
//
// Solidity: function closeGame() returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorSession) CloseGame() (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.CloseGame(&_PermissionedDisputeGame.TransactOpts)
}

// Defend is a paid mutator transaction binding the contract method 0x7b0f0adc.
//
// Solidity: function defend(bytes32 _disputed, uint256 _parentIndex, bytes32 _claim) payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactor) Defend(opts *bind.TransactOpts, _disputed [32]byte, _parentIndex *big.Int, _claim [32]byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.contract.Transact(opts, "defend", _disputed, _parentIndex, _claim)
}

// Defend is a paid mutator transaction binding the contract method 0x7b0f0adc.
//
// Solidity: function defend(bytes32 _disputed, uint256 _parentIndex, bytes32 _claim) payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Defend(_disputed [32]byte, _parentIndex *big.Int, _claim [32]byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Defend(&_PermissionedDisputeGame.TransactOpts, _disputed, _parentIndex, _claim)
}

// Defend is a paid mutator transaction binding the contract method 0x7b0f0adc.
//
// Solidity: function defend(bytes32 _disputed, uint256 _parentIndex, bytes32 _claim) payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorSession) Defend(_disputed [32]byte, _parentIndex *big.Int, _claim [32]byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Defend(&_PermissionedDisputeGame.TransactOpts, _disputed, _parentIndex, _claim)
}

// Initialize is a paid mutator transaction binding the contract method 0x8129fc1c.
//
// Solidity: function initialize() payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactor) Initialize(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _PermissionedDisputeGame.contract.Transact(opts, "initialize")
}

// Initialize is a paid mutator transaction binding the contract method 0x8129fc1c.
//
// Solidity: function initialize() payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Initialize() (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Initialize(&_PermissionedDisputeGame.TransactOpts)
}

// Initialize is a paid mutator transaction binding the contract method 0x8129fc1c.
//
// Solidity: function initialize() payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorSession) Initialize() (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Initialize(&_PermissionedDisputeGame.TransactOpts)
}

// Move is a paid mutator transaction binding the contract method 0x6f034409.
//
// Solidity: function move(bytes32 _disputed, uint256 _challengeIndex, bytes32 _claim, bool _isAttack) payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactor) Move(opts *bind.TransactOpts, _disputed [32]byte, _challengeIndex *big.Int, _claim [32]byte, _isAttack bool) (*types.Transaction, error) {
	return _PermissionedDisputeGame.contract.Transact(opts, "move", _disputed, _challengeIndex, _claim, _isAttack)
}

// Move is a paid mutator transaction binding the contract method 0x6f034409.
//
// Solidity: function move(bytes32 _disputed, uint256 _challengeIndex, bytes32 _claim, bool _isAttack) payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Move(_disputed [32]byte, _challengeIndex *big.Int, _claim [32]byte, _isAttack bool) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Move(&_PermissionedDisputeGame.TransactOpts, _disputed, _challengeIndex, _claim, _isAttack)
}

// Move is a paid mutator transaction binding the contract method 0x6f034409.
//
// Solidity: function move(bytes32 _disputed, uint256 _challengeIndex, bytes32 _claim, bool _isAttack) payable returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorSession) Move(_disputed [32]byte, _challengeIndex *big.Int, _claim [32]byte, _isAttack bool) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Move(&_PermissionedDisputeGame.TransactOpts, _disputed, _challengeIndex, _claim, _isAttack)
}

// Resolve is a paid mutator transaction binding the contract method 0x2810e1d6.
//
// Solidity: function resolve() returns(uint8 status_)
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactor) Resolve(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _PermissionedDisputeGame.contract.Transact(opts, "resolve")
}

// Resolve is a paid mutator transaction binding the contract method 0x2810e1d6.
//
// Solidity: function resolve() returns(uint8 status_)
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Resolve() (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Resolve(&_PermissionedDisputeGame.TransactOpts)
}

// Resolve is a paid mutator transaction binding the contract method 0x2810e1d6.
//
// Solidity: function resolve() returns(uint8 status_)
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorSession) Resolve() (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Resolve(&_PermissionedDisputeGame.TransactOpts)
}

// ResolveClaim is a paid mutator transaction binding the contract method 0x03c2924d.
//
// Solidity: function resolveClaim(uint256 _claimIndex, uint256 _numToResolve) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactor) ResolveClaim(opts *bind.TransactOpts, _claimIndex *big.Int, _numToResolve *big.Int) (*types.Transaction, error) {
	return _PermissionedDisputeGame.contract.Transact(opts, "resolveClaim", _claimIndex, _numToResolve)
}

// ResolveClaim is a paid mutator transaction binding the contract method 0x03c2924d.
//
// Solidity: function resolveClaim(uint256 _claimIndex, uint256 _numToResolve) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) ResolveClaim(_claimIndex *big.Int, _numToResolve *big.Int) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.ResolveClaim(&_PermissionedDisputeGame.TransactOpts, _claimIndex, _numToResolve)
}

// ResolveClaim is a paid mutator transaction binding the contract method 0x03c2924d.
//
// Solidity: function resolveClaim(uint256 _claimIndex, uint256 _numToResolve) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorSession) ResolveClaim(_claimIndex *big.Int, _numToResolve *big.Int) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.ResolveClaim(&_PermissionedDisputeGame.TransactOpts, _claimIndex, _numToResolve)
}

// Step is a paid mutator transaction binding the contract method 0xd8cc1a3c.
//
// Solidity: function step(uint256 _claimIndex, bool _isAttack, bytes _stateData, bytes _proof) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactor) Step(opts *bind.TransactOpts, _claimIndex *big.Int, _isAttack bool, _stateData []byte, _proof []byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.contract.Transact(opts, "step", _claimIndex, _isAttack, _stateData, _proof)
}

// Step is a paid mutator transaction binding the contract method 0xd8cc1a3c.
//
// Solidity: function step(uint256 _claimIndex, bool _isAttack, bytes _stateData, bytes _proof) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameSession) Step(_claimIndex *big.Int, _isAttack bool, _stateData []byte, _proof []byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Step(&_PermissionedDisputeGame.TransactOpts, _claimIndex, _isAttack, _stateData, _proof)
}

// Step is a paid mutator transaction binding the contract method 0xd8cc1a3c.
//
// Solidity: function step(uint256 _claimIndex, bool _isAttack, bytes _stateData, bytes _proof) returns()
func (_PermissionedDisputeGame *PermissionedDisputeGameTransactorSession) Step(_claimIndex *big.Int, _isAttack bool, _stateData []byte, _proof []byte) (*types.Transaction, error) {
	return _PermissionedDisputeGame.Contract.Step(&_PermissionedDisputeGame.TransactOpts, _claimIndex, _isAttack, _stateData, _proof)
}

// PermissionedDisputeGameGameClosedIterator is returned from FilterGameClosed and is used to iterate over the raw logs and unpacked data for GameClosed events raised by the PermissionedDisputeGame contract.
type PermissionedDisputeGameGameClosedIterator struct {
	Event *PermissionedDisputeGameGameClosed // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *PermissionedDisputeGameGameClosedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PermissionedDisputeGameGameClosed)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(PermissionedDisputeGameGameClosed)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *PermissionedDisputeGameGameClosedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PermissionedDisputeGameGameClosedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PermissionedDisputeGameGameClosed represents a GameClosed event raised by the PermissionedDisputeGame contract.
type PermissionedDisputeGameGameClosed struct {
	BondDistributionMode uint8
	Raw                  types.Log // Blockchain specific contextual infos
}

// FilterGameClosed is a free log retrieval operation binding the contract event 0x9908eaac0645df9d0704d06adc9e07337c951de2f06b5f2836151d48d5e4722f.
//
// Solidity: event GameClosed(uint8 bondDistributionMode)
func (_PermissionedDisputeGame *PermissionedDisputeGameFilterer) FilterGameClosed(opts *bind.FilterOpts) (*PermissionedDisputeGameGameClosedIterator, error) {

	logs, sub, err := _PermissionedDisputeGame.contract.FilterLogs(opts, "GameClosed")
	if err != nil {
		return nil, err
	}
	return &PermissionedDisputeGameGameClosedIterator{contract: _PermissionedDisputeGame.contract, event: "GameClosed", logs: logs, sub: sub}, nil
}

// WatchGameClosed is a free log subscription operation binding the contract event 0x9908eaac0645df9d0704d06adc9e07337c951de2f06b5f2836151d48d5e4722f.
//
// Solidity: event GameClosed(uint8 bondDistributionMode)
func (_PermissionedDisputeGame *PermissionedDisputeGameFilterer) WatchGameClosed(opts *bind.WatchOpts, sink chan<- *PermissionedDisputeGameGameClosed) (event.Subscription, error) {

	logs, sub, err := _PermissionedDisputeGame.contract.WatchLogs(opts, "GameClosed")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PermissionedDisputeGameGameClosed)
				if err := _PermissionedDisputeGame.contract.UnpackLog(event, "GameClosed", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseGameClosed is a log parse operation binding the contract event 0x9908eaac0645df9d0704d06adc9e07337c951de2f06b5f2836151d48d5e4722f.
//
// Solidity: event GameClosed(uint8 bondDistributionMode)
func (_PermissionedDisputeGame *PermissionedDisputeGameFilterer) ParseGameClosed(log types.Log) (*PermissionedDisputeGameGameClosed, error) {
	event := new(PermissionedDisputeGameGameClosed)
	if err := _PermissionedDisputeGame.contract.UnpackLog(event, "GameClosed", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PermissionedDisputeGameMoveIterator is returned from FilterMove and is used to iterate over the raw logs and unpacked data for Move events raised by the PermissionedDisputeGame contract.
type PermissionedDisputeGameMoveIterator struct {
	Event *PermissionedDisputeGameMove // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *PermissionedDisputeGameMoveIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PermissionedDisputeGameMove)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(PermissionedDisputeGameMove)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *PermissionedDisputeGameMoveIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PermissionedDisputeGameMoveIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PermissionedDisputeGameMove represents a Move event raised by the PermissionedDisputeGame contract.
type PermissionedDisputeGameMove struct {
	ParentIndex *big.Int
	Claim       [32]byte
	Claimant    common.Address
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterMove is a free log retrieval operation binding the contract event 0x9b3245740ec3b155098a55be84957a4da13eaf7f14a8bc6f53126c0b9350f2be.
//
// Solidity: event Move(uint256 indexed parentIndex, bytes32 indexed claim, address indexed claimant)
func (_PermissionedDisputeGame *PermissionedDisputeGameFilterer) FilterMove(opts *bind.FilterOpts, parentIndex []*big.Int, claim [][32]byte, claimant []common.Address) (*PermissionedDisputeGameMoveIterator, error) {

	var parentIndexRule []interface{}
	for _, parentIndexItem := range parentIndex {
		parentIndexRule = append(parentIndexRule, parentIndexItem)
	}
	var claimRule []interface{}
	for _, claimItem := range claim {
		claimRule = append(claimRule, claimItem)
	}
	var claimantRule []interface{}
	for _, claimantItem := range claimant {
		claimantRule = append(claimantRule, claimantItem)
	}

	logs, sub, err := _PermissionedDisputeGame.contract.FilterLogs(opts, "Move", parentIndexRule, claimRule, claimantRule)
	if err != nil {
		return nil, err
	}
	return &PermissionedDisputeGameMoveIterator{contract: _PermissionedDisputeGame.contract, event: "Move", logs: logs, sub: sub}, nil
}

// WatchMove is a free log subscription operation binding the contract event 0x9b3245740ec3b155098a55be84957a4da13eaf7f14a8bc6f53126c0b9350f2be.
//
// Solidity: event Move(uint256 indexed parentIndex, bytes32 indexed claim, address indexed claimant)
func (_PermissionedDisputeGame *PermissionedDisputeGameFilterer) WatchMove(opts *bind.WatchOpts, sink chan<- *PermissionedDisputeGameMove, parentIndex []*big.Int, claim [][32]byte, claimant []common.Address) (event.Subscription, error) {

	var parentIndexRule []interface{}
	for _, parentIndexItem := range parentIndex {
		parentIndexRule = append(parentIndexRule, parentIndexItem)
	}
	var claimRule []interface{}
	for _, claimItem := range claim {
		claimRule = append(claimRule, claimItem)
	}
	var claimantRule []interface{}
	for _, claimantItem := range claimant {
		claimantRule = append(claimantRule, claimantItem)
	}

	logs, sub, err := _PermissionedDisputeGame.contract.WatchLogs(opts, "Move", parentIndexRule, claimRule, claimantRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PermissionedDisputeGameMove)
				if err := _PermissionedDisputeGame.contract.UnpackLog(event, "Move", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseMove is a log parse operation binding the contract event 0x9b3245740ec3b155098a55be84957a4da13eaf7f14a8bc6f53126c0b9350f2be.
//
// Solidity: event Move(uint256 indexed parentIndex, bytes32 indexed claim, address indexed claimant)
func (_PermissionedDisputeGame *PermissionedDisputeGameFilterer) ParseMove(log types.Log) (*PermissionedDisputeGameMove, error) {
	event := new(PermissionedDisputeGameMove)
	if err := _PermissionedDisputeGame.contract.UnpackLog(event, "Move", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PermissionedDisputeGameResolvedIterator is returned from FilterResolved and is used to iterate over the raw logs and unpacked data for Resolved events raised by the PermissionedDisputeGame contract.
type PermissionedDisputeGameResolvedIterator struct {
	Event *PermissionedDisputeGameResolved // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *PermissionedDisputeGameResolvedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PermissionedDisputeGameResolved)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(PermissionedDisputeGameResolved)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *PermissionedDisputeGameResolvedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PermissionedDisputeGameResolvedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PermissionedDisputeGameResolved represents a Resolved event raised by the PermissionedDisputeGame contract.
type PermissionedDisputeGameResolved struct {
	Status uint8
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterResolved is a free log retrieval operation binding the contract event 0x5e186f09b9c93491f14e277eea7faa5de6a2d4bda75a79af7a3684fbfb42da60.
//
// Solidity: event Resolved(uint8 indexed status)
func (_PermissionedDisputeGame *PermissionedDisputeGameFilterer) FilterResolved(opts *bind.FilterOpts, status []uint8) (*PermissionedDisputeGameResolvedIterator, error) {

	var statusRule []interface{}
	for _, statusItem := range status {
		statusRule = append(statusRule, statusItem)
	}

	logs, sub, err := _PermissionedDisputeGame.contract.FilterLogs(opts, "Resolved", statusRule)
	if err != nil {
		return nil, err
	}
	return &PermissionedDisputeGameResolvedIterator{contract: _PermissionedDisputeGame.contract, event: "Resolved", logs: logs, sub: sub}, nil
}

// WatchResolved is a free log subscription operation binding the contract event 0x5e186f09b9c93491f14e277eea7faa5de6a2d4bda75a79af7a3684fbfb42da60.
//
// Solidity: event Resolved(uint8 indexed status)
func (_PermissionedDisputeGame *PermissionedDisputeGameFilterer) WatchResolved(opts *bind.WatchOpts, sink chan<- *PermissionedDisputeGameResolved, status []uint8) (event.Subscription, error) {

	var statusRule []interface{}
	for _, statusItem := range status {
		statusRule = append(statusRule, statusItem)
	}

	logs, sub, err := _PermissionedDisputeGame.contract.WatchLogs(opts, "Resolved", statusRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PermissionedDisputeGameResolved)
				if err := _PermissionedDisputeGame.contract.UnpackLog(event, "Resolved", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseResolved is a log parse operation binding the contract event 0x5e186f09b9c93491f14e277eea7faa5de6a2d4bda75a79af7a3684fbfb42da60.
//
// Solidity: event Resolved(uint8 indexed status)
func (_PermissionedDisputeGame *PermissionedDisputeGameFilterer) ParseResolved(log types.Log) (*PermissionedDisputeGameResolved, error) {
	event := new(PermissionedDisputeGameResolved)
	if err := _PermissionedDisputeGame.contract.UnpackLog(event, "Resolved", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
