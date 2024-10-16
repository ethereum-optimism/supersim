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

// L1BlockInteropMetaData contains all meta data concerning the L1BlockInterop contract.
var L1BlockInteropMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"function\",\"name\":\"DEPOSITOR_ACCOUNT\",\"inputs\":[],\"outputs\":[{\"name\":\"addr_\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"baseFeeScalar\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint32\",\"internalType\":\"uint32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"basefee\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"batcherHash\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"blobBaseFee\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"blobBaseFeeScalar\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint32\",\"internalType\":\"uint32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"dependencySetSize\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint8\",\"internalType\":\"uint8\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"depositsComplete\",\"inputs\":[],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"gasPayingToken\",\"inputs\":[],\"outputs\":[{\"name\":\"addr_\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"decimals_\",\"type\":\"uint8\",\"internalType\":\"uint8\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"gasPayingTokenName\",\"inputs\":[],\"outputs\":[{\"name\":\"name_\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"gasPayingTokenSymbol\",\"inputs\":[],\"outputs\":[{\"name\":\"symbol_\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"hash\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"isCustomGasToken\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"isDeposit\",\"inputs\":[],\"outputs\":[{\"name\":\"isDeposit_\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"isInDependencySet\",\"inputs\":[{\"name\":\"_chainId\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"l1FeeOverhead\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"l1FeeScalar\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"number\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint64\",\"internalType\":\"uint64\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"sequenceNumber\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint64\",\"internalType\":\"uint64\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"setConfig\",\"inputs\":[{\"name\":\"_type\",\"type\":\"uint8\",\"internalType\":\"enumConfigType\"},{\"name\":\"_value\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"setGasPayingToken\",\"inputs\":[{\"name\":\"_token\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_decimals\",\"type\":\"uint8\",\"internalType\":\"uint8\"},{\"name\":\"_name\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"_symbol\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"setL1BlockValues\",\"inputs\":[{\"name\":\"_number\",\"type\":\"uint64\",\"internalType\":\"uint64\"},{\"name\":\"_timestamp\",\"type\":\"uint64\",\"internalType\":\"uint64\"},{\"name\":\"_basefee\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_hash\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"_sequenceNumber\",\"type\":\"uint64\",\"internalType\":\"uint64\"},{\"name\":\"_batcherHash\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"_l1FeeOverhead\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_l1FeeScalar\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"setL1BlockValuesEcotone\",\"inputs\":[],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"setL1BlockValuesInterop\",\"inputs\":[],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"timestamp\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint64\",\"internalType\":\"uint64\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"version\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"pure\"},{\"type\":\"event\",\"name\":\"DependencyAdded\",\"inputs\":[{\"name\":\"chainId\",\"type\":\"uint256\",\"indexed\":true,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"DependencyRemoved\",\"inputs\":[{\"name\":\"chainId\",\"type\":\"uint256\",\"indexed\":true,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"GasPayingTokenSet\",\"inputs\":[{\"name\":\"token\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"decimals\",\"type\":\"uint8\",\"indexed\":true,\"internalType\":\"uint8\"},{\"name\":\"name\",\"type\":\"bytes32\",\"indexed\":false,\"internalType\":\"bytes32\"},{\"name\":\"symbol\",\"type\":\"bytes32\",\"indexed\":false,\"internalType\":\"bytes32\"}],\"anonymous\":false},{\"type\":\"error\",\"name\":\"AlreadyDependency\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"CantRemovedDependency\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"DependencySetSizeTooLarge\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"NotCrossL2Inbox\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"NotDependency\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"NotDepositor\",\"inputs\":[]}]",
}

// L1BlockInteropABI is the input ABI used to generate the binding from.
// Deprecated: Use L1BlockInteropMetaData.ABI instead.
var L1BlockInteropABI = L1BlockInteropMetaData.ABI

// L1BlockInterop is an auto generated Go binding around an Ethereum contract.
type L1BlockInterop struct {
	L1BlockInteropCaller     // Read-only binding to the contract
	L1BlockInteropTransactor // Write-only binding to the contract
	L1BlockInteropFilterer   // Log filterer for contract events
}

// L1BlockInteropCaller is an auto generated read-only Go binding around an Ethereum contract.
type L1BlockInteropCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// L1BlockInteropTransactor is an auto generated write-only Go binding around an Ethereum contract.
type L1BlockInteropTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// L1BlockInteropFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type L1BlockInteropFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// L1BlockInteropSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type L1BlockInteropSession struct {
	Contract     *L1BlockInterop   // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// L1BlockInteropCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type L1BlockInteropCallerSession struct {
	Contract *L1BlockInteropCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts         // Call options to use throughout this session
}

// L1BlockInteropTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type L1BlockInteropTransactorSession struct {
	Contract     *L1BlockInteropTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts         // Transaction auth options to use throughout this session
}

// L1BlockInteropRaw is an auto generated low-level Go binding around an Ethereum contract.
type L1BlockInteropRaw struct {
	Contract *L1BlockInterop // Generic contract binding to access the raw methods on
}

// L1BlockInteropCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type L1BlockInteropCallerRaw struct {
	Contract *L1BlockInteropCaller // Generic read-only contract binding to access the raw methods on
}

// L1BlockInteropTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type L1BlockInteropTransactorRaw struct {
	Contract *L1BlockInteropTransactor // Generic write-only contract binding to access the raw methods on
}

// NewL1BlockInterop creates a new instance of L1BlockInterop, bound to a specific deployed contract.
func NewL1BlockInterop(address common.Address, backend bind.ContractBackend) (*L1BlockInterop, error) {
	contract, err := bindL1BlockInterop(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &L1BlockInterop{L1BlockInteropCaller: L1BlockInteropCaller{contract: contract}, L1BlockInteropTransactor: L1BlockInteropTransactor{contract: contract}, L1BlockInteropFilterer: L1BlockInteropFilterer{contract: contract}}, nil
}

// NewL1BlockInteropCaller creates a new read-only instance of L1BlockInterop, bound to a specific deployed contract.
func NewL1BlockInteropCaller(address common.Address, caller bind.ContractCaller) (*L1BlockInteropCaller, error) {
	contract, err := bindL1BlockInterop(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &L1BlockInteropCaller{contract: contract}, nil
}

// NewL1BlockInteropTransactor creates a new write-only instance of L1BlockInterop, bound to a specific deployed contract.
func NewL1BlockInteropTransactor(address common.Address, transactor bind.ContractTransactor) (*L1BlockInteropTransactor, error) {
	contract, err := bindL1BlockInterop(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &L1BlockInteropTransactor{contract: contract}, nil
}

// NewL1BlockInteropFilterer creates a new log filterer instance of L1BlockInterop, bound to a specific deployed contract.
func NewL1BlockInteropFilterer(address common.Address, filterer bind.ContractFilterer) (*L1BlockInteropFilterer, error) {
	contract, err := bindL1BlockInterop(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &L1BlockInteropFilterer{contract: contract}, nil
}

// bindL1BlockInterop binds a generic wrapper to an already deployed contract.
func bindL1BlockInterop(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := L1BlockInteropMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_L1BlockInterop *L1BlockInteropRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _L1BlockInterop.Contract.L1BlockInteropCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_L1BlockInterop *L1BlockInteropRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _L1BlockInterop.Contract.L1BlockInteropTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_L1BlockInterop *L1BlockInteropRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _L1BlockInterop.Contract.L1BlockInteropTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_L1BlockInterop *L1BlockInteropCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _L1BlockInterop.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_L1BlockInterop *L1BlockInteropTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _L1BlockInterop.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_L1BlockInterop *L1BlockInteropTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _L1BlockInterop.Contract.contract.Transact(opts, method, params...)
}

// DEPOSITORACCOUNT is a free data retrieval call binding the contract method 0xe591b282.
//
// Solidity: function DEPOSITOR_ACCOUNT() pure returns(address addr_)
func (_L1BlockInterop *L1BlockInteropCaller) DEPOSITORACCOUNT(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "DEPOSITOR_ACCOUNT")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// DEPOSITORACCOUNT is a free data retrieval call binding the contract method 0xe591b282.
//
// Solidity: function DEPOSITOR_ACCOUNT() pure returns(address addr_)
func (_L1BlockInterop *L1BlockInteropSession) DEPOSITORACCOUNT() (common.Address, error) {
	return _L1BlockInterop.Contract.DEPOSITORACCOUNT(&_L1BlockInterop.CallOpts)
}

// DEPOSITORACCOUNT is a free data retrieval call binding the contract method 0xe591b282.
//
// Solidity: function DEPOSITOR_ACCOUNT() pure returns(address addr_)
func (_L1BlockInterop *L1BlockInteropCallerSession) DEPOSITORACCOUNT() (common.Address, error) {
	return _L1BlockInterop.Contract.DEPOSITORACCOUNT(&_L1BlockInterop.CallOpts)
}

// BaseFeeScalar is a free data retrieval call binding the contract method 0xc5985918.
//
// Solidity: function baseFeeScalar() view returns(uint32)
func (_L1BlockInterop *L1BlockInteropCaller) BaseFeeScalar(opts *bind.CallOpts) (uint32, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "baseFeeScalar")

	if err != nil {
		return *new(uint32), err
	}

	out0 := *abi.ConvertType(out[0], new(uint32)).(*uint32)

	return out0, err

}

// BaseFeeScalar is a free data retrieval call binding the contract method 0xc5985918.
//
// Solidity: function baseFeeScalar() view returns(uint32)
func (_L1BlockInterop *L1BlockInteropSession) BaseFeeScalar() (uint32, error) {
	return _L1BlockInterop.Contract.BaseFeeScalar(&_L1BlockInterop.CallOpts)
}

// BaseFeeScalar is a free data retrieval call binding the contract method 0xc5985918.
//
// Solidity: function baseFeeScalar() view returns(uint32)
func (_L1BlockInterop *L1BlockInteropCallerSession) BaseFeeScalar() (uint32, error) {
	return _L1BlockInterop.Contract.BaseFeeScalar(&_L1BlockInterop.CallOpts)
}

// Basefee is a free data retrieval call binding the contract method 0x5cf24969.
//
// Solidity: function basefee() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropCaller) Basefee(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "basefee")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Basefee is a free data retrieval call binding the contract method 0x5cf24969.
//
// Solidity: function basefee() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropSession) Basefee() (*big.Int, error) {
	return _L1BlockInterop.Contract.Basefee(&_L1BlockInterop.CallOpts)
}

// Basefee is a free data retrieval call binding the contract method 0x5cf24969.
//
// Solidity: function basefee() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropCallerSession) Basefee() (*big.Int, error) {
	return _L1BlockInterop.Contract.Basefee(&_L1BlockInterop.CallOpts)
}

// BatcherHash is a free data retrieval call binding the contract method 0xe81b2c6d.
//
// Solidity: function batcherHash() view returns(bytes32)
func (_L1BlockInterop *L1BlockInteropCaller) BatcherHash(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "batcherHash")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// BatcherHash is a free data retrieval call binding the contract method 0xe81b2c6d.
//
// Solidity: function batcherHash() view returns(bytes32)
func (_L1BlockInterop *L1BlockInteropSession) BatcherHash() ([32]byte, error) {
	return _L1BlockInterop.Contract.BatcherHash(&_L1BlockInterop.CallOpts)
}

// BatcherHash is a free data retrieval call binding the contract method 0xe81b2c6d.
//
// Solidity: function batcherHash() view returns(bytes32)
func (_L1BlockInterop *L1BlockInteropCallerSession) BatcherHash() ([32]byte, error) {
	return _L1BlockInterop.Contract.BatcherHash(&_L1BlockInterop.CallOpts)
}

// BlobBaseFee is a free data retrieval call binding the contract method 0xf8206140.
//
// Solidity: function blobBaseFee() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropCaller) BlobBaseFee(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "blobBaseFee")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BlobBaseFee is a free data retrieval call binding the contract method 0xf8206140.
//
// Solidity: function blobBaseFee() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropSession) BlobBaseFee() (*big.Int, error) {
	return _L1BlockInterop.Contract.BlobBaseFee(&_L1BlockInterop.CallOpts)
}

// BlobBaseFee is a free data retrieval call binding the contract method 0xf8206140.
//
// Solidity: function blobBaseFee() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropCallerSession) BlobBaseFee() (*big.Int, error) {
	return _L1BlockInterop.Contract.BlobBaseFee(&_L1BlockInterop.CallOpts)
}

// BlobBaseFeeScalar is a free data retrieval call binding the contract method 0x68d5dca6.
//
// Solidity: function blobBaseFeeScalar() view returns(uint32)
func (_L1BlockInterop *L1BlockInteropCaller) BlobBaseFeeScalar(opts *bind.CallOpts) (uint32, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "blobBaseFeeScalar")

	if err != nil {
		return *new(uint32), err
	}

	out0 := *abi.ConvertType(out[0], new(uint32)).(*uint32)

	return out0, err

}

// BlobBaseFeeScalar is a free data retrieval call binding the contract method 0x68d5dca6.
//
// Solidity: function blobBaseFeeScalar() view returns(uint32)
func (_L1BlockInterop *L1BlockInteropSession) BlobBaseFeeScalar() (uint32, error) {
	return _L1BlockInterop.Contract.BlobBaseFeeScalar(&_L1BlockInterop.CallOpts)
}

// BlobBaseFeeScalar is a free data retrieval call binding the contract method 0x68d5dca6.
//
// Solidity: function blobBaseFeeScalar() view returns(uint32)
func (_L1BlockInterop *L1BlockInteropCallerSession) BlobBaseFeeScalar() (uint32, error) {
	return _L1BlockInterop.Contract.BlobBaseFeeScalar(&_L1BlockInterop.CallOpts)
}

// DependencySetSize is a free data retrieval call binding the contract method 0x5eb30fa3.
//
// Solidity: function dependencySetSize() view returns(uint8)
func (_L1BlockInterop *L1BlockInteropCaller) DependencySetSize(opts *bind.CallOpts) (uint8, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "dependencySetSize")

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// DependencySetSize is a free data retrieval call binding the contract method 0x5eb30fa3.
//
// Solidity: function dependencySetSize() view returns(uint8)
func (_L1BlockInterop *L1BlockInteropSession) DependencySetSize() (uint8, error) {
	return _L1BlockInterop.Contract.DependencySetSize(&_L1BlockInterop.CallOpts)
}

// DependencySetSize is a free data retrieval call binding the contract method 0x5eb30fa3.
//
// Solidity: function dependencySetSize() view returns(uint8)
func (_L1BlockInterop *L1BlockInteropCallerSession) DependencySetSize() (uint8, error) {
	return _L1BlockInterop.Contract.DependencySetSize(&_L1BlockInterop.CallOpts)
}

// GasPayingToken is a free data retrieval call binding the contract method 0x4397dfef.
//
// Solidity: function gasPayingToken() view returns(address addr_, uint8 decimals_)
func (_L1BlockInterop *L1BlockInteropCaller) GasPayingToken(opts *bind.CallOpts) (struct {
	Addr     common.Address
	Decimals uint8
}, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "gasPayingToken")

	outstruct := new(struct {
		Addr     common.Address
		Decimals uint8
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Addr = *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	outstruct.Decimals = *abi.ConvertType(out[1], new(uint8)).(*uint8)

	return *outstruct, err

}

// GasPayingToken is a free data retrieval call binding the contract method 0x4397dfef.
//
// Solidity: function gasPayingToken() view returns(address addr_, uint8 decimals_)
func (_L1BlockInterop *L1BlockInteropSession) GasPayingToken() (struct {
	Addr     common.Address
	Decimals uint8
}, error) {
	return _L1BlockInterop.Contract.GasPayingToken(&_L1BlockInterop.CallOpts)
}

// GasPayingToken is a free data retrieval call binding the contract method 0x4397dfef.
//
// Solidity: function gasPayingToken() view returns(address addr_, uint8 decimals_)
func (_L1BlockInterop *L1BlockInteropCallerSession) GasPayingToken() (struct {
	Addr     common.Address
	Decimals uint8
}, error) {
	return _L1BlockInterop.Contract.GasPayingToken(&_L1BlockInterop.CallOpts)
}

// GasPayingTokenName is a free data retrieval call binding the contract method 0xd8444715.
//
// Solidity: function gasPayingTokenName() view returns(string name_)
func (_L1BlockInterop *L1BlockInteropCaller) GasPayingTokenName(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "gasPayingTokenName")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GasPayingTokenName is a free data retrieval call binding the contract method 0xd8444715.
//
// Solidity: function gasPayingTokenName() view returns(string name_)
func (_L1BlockInterop *L1BlockInteropSession) GasPayingTokenName() (string, error) {
	return _L1BlockInterop.Contract.GasPayingTokenName(&_L1BlockInterop.CallOpts)
}

// GasPayingTokenName is a free data retrieval call binding the contract method 0xd8444715.
//
// Solidity: function gasPayingTokenName() view returns(string name_)
func (_L1BlockInterop *L1BlockInteropCallerSession) GasPayingTokenName() (string, error) {
	return _L1BlockInterop.Contract.GasPayingTokenName(&_L1BlockInterop.CallOpts)
}

// GasPayingTokenSymbol is a free data retrieval call binding the contract method 0x550fcdc9.
//
// Solidity: function gasPayingTokenSymbol() view returns(string symbol_)
func (_L1BlockInterop *L1BlockInteropCaller) GasPayingTokenSymbol(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "gasPayingTokenSymbol")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GasPayingTokenSymbol is a free data retrieval call binding the contract method 0x550fcdc9.
//
// Solidity: function gasPayingTokenSymbol() view returns(string symbol_)
func (_L1BlockInterop *L1BlockInteropSession) GasPayingTokenSymbol() (string, error) {
	return _L1BlockInterop.Contract.GasPayingTokenSymbol(&_L1BlockInterop.CallOpts)
}

// GasPayingTokenSymbol is a free data retrieval call binding the contract method 0x550fcdc9.
//
// Solidity: function gasPayingTokenSymbol() view returns(string symbol_)
func (_L1BlockInterop *L1BlockInteropCallerSession) GasPayingTokenSymbol() (string, error) {
	return _L1BlockInterop.Contract.GasPayingTokenSymbol(&_L1BlockInterop.CallOpts)
}

// Hash is a free data retrieval call binding the contract method 0x09bd5a60.
//
// Solidity: function hash() view returns(bytes32)
func (_L1BlockInterop *L1BlockInteropCaller) Hash(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "hash")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// Hash is a free data retrieval call binding the contract method 0x09bd5a60.
//
// Solidity: function hash() view returns(bytes32)
func (_L1BlockInterop *L1BlockInteropSession) Hash() ([32]byte, error) {
	return _L1BlockInterop.Contract.Hash(&_L1BlockInterop.CallOpts)
}

// Hash is a free data retrieval call binding the contract method 0x09bd5a60.
//
// Solidity: function hash() view returns(bytes32)
func (_L1BlockInterop *L1BlockInteropCallerSession) Hash() ([32]byte, error) {
	return _L1BlockInterop.Contract.Hash(&_L1BlockInterop.CallOpts)
}

// IsCustomGasToken is a free data retrieval call binding the contract method 0x21326849.
//
// Solidity: function isCustomGasToken() view returns(bool)
func (_L1BlockInterop *L1BlockInteropCaller) IsCustomGasToken(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "isCustomGasToken")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsCustomGasToken is a free data retrieval call binding the contract method 0x21326849.
//
// Solidity: function isCustomGasToken() view returns(bool)
func (_L1BlockInterop *L1BlockInteropSession) IsCustomGasToken() (bool, error) {
	return _L1BlockInterop.Contract.IsCustomGasToken(&_L1BlockInterop.CallOpts)
}

// IsCustomGasToken is a free data retrieval call binding the contract method 0x21326849.
//
// Solidity: function isCustomGasToken() view returns(bool)
func (_L1BlockInterop *L1BlockInteropCallerSession) IsCustomGasToken() (bool, error) {
	return _L1BlockInterop.Contract.IsCustomGasToken(&_L1BlockInterop.CallOpts)
}

// IsDeposit is a free data retrieval call binding the contract method 0x7bc3b5ff.
//
// Solidity: function isDeposit() view returns(bool isDeposit_)
func (_L1BlockInterop *L1BlockInteropCaller) IsDeposit(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "isDeposit")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsDeposit is a free data retrieval call binding the contract method 0x7bc3b5ff.
//
// Solidity: function isDeposit() view returns(bool isDeposit_)
func (_L1BlockInterop *L1BlockInteropSession) IsDeposit() (bool, error) {
	return _L1BlockInterop.Contract.IsDeposit(&_L1BlockInterop.CallOpts)
}

// IsDeposit is a free data retrieval call binding the contract method 0x7bc3b5ff.
//
// Solidity: function isDeposit() view returns(bool isDeposit_)
func (_L1BlockInterop *L1BlockInteropCallerSession) IsDeposit() (bool, error) {
	return _L1BlockInterop.Contract.IsDeposit(&_L1BlockInterop.CallOpts)
}

// IsInDependencySet is a free data retrieval call binding the contract method 0xe38bbc32.
//
// Solidity: function isInDependencySet(uint256 _chainId) view returns(bool)
func (_L1BlockInterop *L1BlockInteropCaller) IsInDependencySet(opts *bind.CallOpts, _chainId *big.Int) (bool, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "isInDependencySet", _chainId)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsInDependencySet is a free data retrieval call binding the contract method 0xe38bbc32.
//
// Solidity: function isInDependencySet(uint256 _chainId) view returns(bool)
func (_L1BlockInterop *L1BlockInteropSession) IsInDependencySet(_chainId *big.Int) (bool, error) {
	return _L1BlockInterop.Contract.IsInDependencySet(&_L1BlockInterop.CallOpts, _chainId)
}

// IsInDependencySet is a free data retrieval call binding the contract method 0xe38bbc32.
//
// Solidity: function isInDependencySet(uint256 _chainId) view returns(bool)
func (_L1BlockInterop *L1BlockInteropCallerSession) IsInDependencySet(_chainId *big.Int) (bool, error) {
	return _L1BlockInterop.Contract.IsInDependencySet(&_L1BlockInterop.CallOpts, _chainId)
}

// L1FeeOverhead is a free data retrieval call binding the contract method 0x8b239f73.
//
// Solidity: function l1FeeOverhead() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropCaller) L1FeeOverhead(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "l1FeeOverhead")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// L1FeeOverhead is a free data retrieval call binding the contract method 0x8b239f73.
//
// Solidity: function l1FeeOverhead() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropSession) L1FeeOverhead() (*big.Int, error) {
	return _L1BlockInterop.Contract.L1FeeOverhead(&_L1BlockInterop.CallOpts)
}

// L1FeeOverhead is a free data retrieval call binding the contract method 0x8b239f73.
//
// Solidity: function l1FeeOverhead() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropCallerSession) L1FeeOverhead() (*big.Int, error) {
	return _L1BlockInterop.Contract.L1FeeOverhead(&_L1BlockInterop.CallOpts)
}

// L1FeeScalar is a free data retrieval call binding the contract method 0x9e8c4966.
//
// Solidity: function l1FeeScalar() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropCaller) L1FeeScalar(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "l1FeeScalar")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// L1FeeScalar is a free data retrieval call binding the contract method 0x9e8c4966.
//
// Solidity: function l1FeeScalar() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropSession) L1FeeScalar() (*big.Int, error) {
	return _L1BlockInterop.Contract.L1FeeScalar(&_L1BlockInterop.CallOpts)
}

// L1FeeScalar is a free data retrieval call binding the contract method 0x9e8c4966.
//
// Solidity: function l1FeeScalar() view returns(uint256)
func (_L1BlockInterop *L1BlockInteropCallerSession) L1FeeScalar() (*big.Int, error) {
	return _L1BlockInterop.Contract.L1FeeScalar(&_L1BlockInterop.CallOpts)
}

// Number is a free data retrieval call binding the contract method 0x8381f58a.
//
// Solidity: function number() view returns(uint64)
func (_L1BlockInterop *L1BlockInteropCaller) Number(opts *bind.CallOpts) (uint64, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "number")

	if err != nil {
		return *new(uint64), err
	}

	out0 := *abi.ConvertType(out[0], new(uint64)).(*uint64)

	return out0, err

}

// Number is a free data retrieval call binding the contract method 0x8381f58a.
//
// Solidity: function number() view returns(uint64)
func (_L1BlockInterop *L1BlockInteropSession) Number() (uint64, error) {
	return _L1BlockInterop.Contract.Number(&_L1BlockInterop.CallOpts)
}

// Number is a free data retrieval call binding the contract method 0x8381f58a.
//
// Solidity: function number() view returns(uint64)
func (_L1BlockInterop *L1BlockInteropCallerSession) Number() (uint64, error) {
	return _L1BlockInterop.Contract.Number(&_L1BlockInterop.CallOpts)
}

// SequenceNumber is a free data retrieval call binding the contract method 0x64ca23ef.
//
// Solidity: function sequenceNumber() view returns(uint64)
func (_L1BlockInterop *L1BlockInteropCaller) SequenceNumber(opts *bind.CallOpts) (uint64, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "sequenceNumber")

	if err != nil {
		return *new(uint64), err
	}

	out0 := *abi.ConvertType(out[0], new(uint64)).(*uint64)

	return out0, err

}

// SequenceNumber is a free data retrieval call binding the contract method 0x64ca23ef.
//
// Solidity: function sequenceNumber() view returns(uint64)
func (_L1BlockInterop *L1BlockInteropSession) SequenceNumber() (uint64, error) {
	return _L1BlockInterop.Contract.SequenceNumber(&_L1BlockInterop.CallOpts)
}

// SequenceNumber is a free data retrieval call binding the contract method 0x64ca23ef.
//
// Solidity: function sequenceNumber() view returns(uint64)
func (_L1BlockInterop *L1BlockInteropCallerSession) SequenceNumber() (uint64, error) {
	return _L1BlockInterop.Contract.SequenceNumber(&_L1BlockInterop.CallOpts)
}

// Timestamp is a free data retrieval call binding the contract method 0xb80777ea.
//
// Solidity: function timestamp() view returns(uint64)
func (_L1BlockInterop *L1BlockInteropCaller) Timestamp(opts *bind.CallOpts) (uint64, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "timestamp")

	if err != nil {
		return *new(uint64), err
	}

	out0 := *abi.ConvertType(out[0], new(uint64)).(*uint64)

	return out0, err

}

// Timestamp is a free data retrieval call binding the contract method 0xb80777ea.
//
// Solidity: function timestamp() view returns(uint64)
func (_L1BlockInterop *L1BlockInteropSession) Timestamp() (uint64, error) {
	return _L1BlockInterop.Contract.Timestamp(&_L1BlockInterop.CallOpts)
}

// Timestamp is a free data retrieval call binding the contract method 0xb80777ea.
//
// Solidity: function timestamp() view returns(uint64)
func (_L1BlockInterop *L1BlockInteropCallerSession) Timestamp() (uint64, error) {
	return _L1BlockInterop.Contract.Timestamp(&_L1BlockInterop.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() pure returns(string)
func (_L1BlockInterop *L1BlockInteropCaller) Version(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _L1BlockInterop.contract.Call(opts, &out, "version")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() pure returns(string)
func (_L1BlockInterop *L1BlockInteropSession) Version() (string, error) {
	return _L1BlockInterop.Contract.Version(&_L1BlockInterop.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() pure returns(string)
func (_L1BlockInterop *L1BlockInteropCallerSession) Version() (string, error) {
	return _L1BlockInterop.Contract.Version(&_L1BlockInterop.CallOpts)
}

// DepositsComplete is a paid mutator transaction binding the contract method 0xe32d20bb.
//
// Solidity: function depositsComplete() returns()
func (_L1BlockInterop *L1BlockInteropTransactor) DepositsComplete(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _L1BlockInterop.contract.Transact(opts, "depositsComplete")
}

// DepositsComplete is a paid mutator transaction binding the contract method 0xe32d20bb.
//
// Solidity: function depositsComplete() returns()
func (_L1BlockInterop *L1BlockInteropSession) DepositsComplete() (*types.Transaction, error) {
	return _L1BlockInterop.Contract.DepositsComplete(&_L1BlockInterop.TransactOpts)
}

// DepositsComplete is a paid mutator transaction binding the contract method 0xe32d20bb.
//
// Solidity: function depositsComplete() returns()
func (_L1BlockInterop *L1BlockInteropTransactorSession) DepositsComplete() (*types.Transaction, error) {
	return _L1BlockInterop.Contract.DepositsComplete(&_L1BlockInterop.TransactOpts)
}

// SetConfig is a paid mutator transaction binding the contract method 0xc0012163.
//
// Solidity: function setConfig(uint8 _type, bytes _value) returns()
func (_L1BlockInterop *L1BlockInteropTransactor) SetConfig(opts *bind.TransactOpts, _type uint8, _value []byte) (*types.Transaction, error) {
	return _L1BlockInterop.contract.Transact(opts, "setConfig", _type, _value)
}

// SetConfig is a paid mutator transaction binding the contract method 0xc0012163.
//
// Solidity: function setConfig(uint8 _type, bytes _value) returns()
func (_L1BlockInterop *L1BlockInteropSession) SetConfig(_type uint8, _value []byte) (*types.Transaction, error) {
	return _L1BlockInterop.Contract.SetConfig(&_L1BlockInterop.TransactOpts, _type, _value)
}

// SetConfig is a paid mutator transaction binding the contract method 0xc0012163.
//
// Solidity: function setConfig(uint8 _type, bytes _value) returns()
func (_L1BlockInterop *L1BlockInteropTransactorSession) SetConfig(_type uint8, _value []byte) (*types.Transaction, error) {
	return _L1BlockInterop.Contract.SetConfig(&_L1BlockInterop.TransactOpts, _type, _value)
}

// SetGasPayingToken is a paid mutator transaction binding the contract method 0x71cfaa3f.
//
// Solidity: function setGasPayingToken(address _token, uint8 _decimals, bytes32 _name, bytes32 _symbol) returns()
func (_L1BlockInterop *L1BlockInteropTransactor) SetGasPayingToken(opts *bind.TransactOpts, _token common.Address, _decimals uint8, _name [32]byte, _symbol [32]byte) (*types.Transaction, error) {
	return _L1BlockInterop.contract.Transact(opts, "setGasPayingToken", _token, _decimals, _name, _symbol)
}

// SetGasPayingToken is a paid mutator transaction binding the contract method 0x71cfaa3f.
//
// Solidity: function setGasPayingToken(address _token, uint8 _decimals, bytes32 _name, bytes32 _symbol) returns()
func (_L1BlockInterop *L1BlockInteropSession) SetGasPayingToken(_token common.Address, _decimals uint8, _name [32]byte, _symbol [32]byte) (*types.Transaction, error) {
	return _L1BlockInterop.Contract.SetGasPayingToken(&_L1BlockInterop.TransactOpts, _token, _decimals, _name, _symbol)
}

// SetGasPayingToken is a paid mutator transaction binding the contract method 0x71cfaa3f.
//
// Solidity: function setGasPayingToken(address _token, uint8 _decimals, bytes32 _name, bytes32 _symbol) returns()
func (_L1BlockInterop *L1BlockInteropTransactorSession) SetGasPayingToken(_token common.Address, _decimals uint8, _name [32]byte, _symbol [32]byte) (*types.Transaction, error) {
	return _L1BlockInterop.Contract.SetGasPayingToken(&_L1BlockInterop.TransactOpts, _token, _decimals, _name, _symbol)
}

// SetL1BlockValues is a paid mutator transaction binding the contract method 0x015d8eb9.
//
// Solidity: function setL1BlockValues(uint64 _number, uint64 _timestamp, uint256 _basefee, bytes32 _hash, uint64 _sequenceNumber, bytes32 _batcherHash, uint256 _l1FeeOverhead, uint256 _l1FeeScalar) returns()
func (_L1BlockInterop *L1BlockInteropTransactor) SetL1BlockValues(opts *bind.TransactOpts, _number uint64, _timestamp uint64, _basefee *big.Int, _hash [32]byte, _sequenceNumber uint64, _batcherHash [32]byte, _l1FeeOverhead *big.Int, _l1FeeScalar *big.Int) (*types.Transaction, error) {
	return _L1BlockInterop.contract.Transact(opts, "setL1BlockValues", _number, _timestamp, _basefee, _hash, _sequenceNumber, _batcherHash, _l1FeeOverhead, _l1FeeScalar)
}

// SetL1BlockValues is a paid mutator transaction binding the contract method 0x015d8eb9.
//
// Solidity: function setL1BlockValues(uint64 _number, uint64 _timestamp, uint256 _basefee, bytes32 _hash, uint64 _sequenceNumber, bytes32 _batcherHash, uint256 _l1FeeOverhead, uint256 _l1FeeScalar) returns()
func (_L1BlockInterop *L1BlockInteropSession) SetL1BlockValues(_number uint64, _timestamp uint64, _basefee *big.Int, _hash [32]byte, _sequenceNumber uint64, _batcherHash [32]byte, _l1FeeOverhead *big.Int, _l1FeeScalar *big.Int) (*types.Transaction, error) {
	return _L1BlockInterop.Contract.SetL1BlockValues(&_L1BlockInterop.TransactOpts, _number, _timestamp, _basefee, _hash, _sequenceNumber, _batcherHash, _l1FeeOverhead, _l1FeeScalar)
}

// SetL1BlockValues is a paid mutator transaction binding the contract method 0x015d8eb9.
//
// Solidity: function setL1BlockValues(uint64 _number, uint64 _timestamp, uint256 _basefee, bytes32 _hash, uint64 _sequenceNumber, bytes32 _batcherHash, uint256 _l1FeeOverhead, uint256 _l1FeeScalar) returns()
func (_L1BlockInterop *L1BlockInteropTransactorSession) SetL1BlockValues(_number uint64, _timestamp uint64, _basefee *big.Int, _hash [32]byte, _sequenceNumber uint64, _batcherHash [32]byte, _l1FeeOverhead *big.Int, _l1FeeScalar *big.Int) (*types.Transaction, error) {
	return _L1BlockInterop.Contract.SetL1BlockValues(&_L1BlockInterop.TransactOpts, _number, _timestamp, _basefee, _hash, _sequenceNumber, _batcherHash, _l1FeeOverhead, _l1FeeScalar)
}

// SetL1BlockValuesEcotone is a paid mutator transaction binding the contract method 0x440a5e20.
//
// Solidity: function setL1BlockValuesEcotone() returns()
func (_L1BlockInterop *L1BlockInteropTransactor) SetL1BlockValuesEcotone(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _L1BlockInterop.contract.Transact(opts, "setL1BlockValuesEcotone")
}

// SetL1BlockValuesEcotone is a paid mutator transaction binding the contract method 0x440a5e20.
//
// Solidity: function setL1BlockValuesEcotone() returns()
func (_L1BlockInterop *L1BlockInteropSession) SetL1BlockValuesEcotone() (*types.Transaction, error) {
	return _L1BlockInterop.Contract.SetL1BlockValuesEcotone(&_L1BlockInterop.TransactOpts)
}

// SetL1BlockValuesEcotone is a paid mutator transaction binding the contract method 0x440a5e20.
//
// Solidity: function setL1BlockValuesEcotone() returns()
func (_L1BlockInterop *L1BlockInteropTransactorSession) SetL1BlockValuesEcotone() (*types.Transaction, error) {
	return _L1BlockInterop.Contract.SetL1BlockValuesEcotone(&_L1BlockInterop.TransactOpts)
}

// SetL1BlockValuesInterop is a paid mutator transaction binding the contract method 0x760ee04d.
//
// Solidity: function setL1BlockValuesInterop() returns()
func (_L1BlockInterop *L1BlockInteropTransactor) SetL1BlockValuesInterop(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _L1BlockInterop.contract.Transact(opts, "setL1BlockValuesInterop")
}

// SetL1BlockValuesInterop is a paid mutator transaction binding the contract method 0x760ee04d.
//
// Solidity: function setL1BlockValuesInterop() returns()
func (_L1BlockInterop *L1BlockInteropSession) SetL1BlockValuesInterop() (*types.Transaction, error) {
	return _L1BlockInterop.Contract.SetL1BlockValuesInterop(&_L1BlockInterop.TransactOpts)
}

// SetL1BlockValuesInterop is a paid mutator transaction binding the contract method 0x760ee04d.
//
// Solidity: function setL1BlockValuesInterop() returns()
func (_L1BlockInterop *L1BlockInteropTransactorSession) SetL1BlockValuesInterop() (*types.Transaction, error) {
	return _L1BlockInterop.Contract.SetL1BlockValuesInterop(&_L1BlockInterop.TransactOpts)
}

// L1BlockInteropDependencyAddedIterator is returned from FilterDependencyAdded and is used to iterate over the raw logs and unpacked data for DependencyAdded events raised by the L1BlockInterop contract.
type L1BlockInteropDependencyAddedIterator struct {
	Event *L1BlockInteropDependencyAdded // Event containing the contract specifics and raw log

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
func (it *L1BlockInteropDependencyAddedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(L1BlockInteropDependencyAdded)
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
		it.Event = new(L1BlockInteropDependencyAdded)
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
func (it *L1BlockInteropDependencyAddedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *L1BlockInteropDependencyAddedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// L1BlockInteropDependencyAdded represents a DependencyAdded event raised by the L1BlockInterop contract.
type L1BlockInteropDependencyAdded struct {
	ChainId *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterDependencyAdded is a free log retrieval operation binding the contract event 0x754553d16dd99693ae11c457214cb1baa77b15c7b02cea5515370dc637e050f0.
//
// Solidity: event DependencyAdded(uint256 indexed chainId)
func (_L1BlockInterop *L1BlockInteropFilterer) FilterDependencyAdded(opts *bind.FilterOpts, chainId []*big.Int) (*L1BlockInteropDependencyAddedIterator, error) {

	var chainIdRule []interface{}
	for _, chainIdItem := range chainId {
		chainIdRule = append(chainIdRule, chainIdItem)
	}

	logs, sub, err := _L1BlockInterop.contract.FilterLogs(opts, "DependencyAdded", chainIdRule)
	if err != nil {
		return nil, err
	}
	return &L1BlockInteropDependencyAddedIterator{contract: _L1BlockInterop.contract, event: "DependencyAdded", logs: logs, sub: sub}, nil
}

// WatchDependencyAdded is a free log subscription operation binding the contract event 0x754553d16dd99693ae11c457214cb1baa77b15c7b02cea5515370dc637e050f0.
//
// Solidity: event DependencyAdded(uint256 indexed chainId)
func (_L1BlockInterop *L1BlockInteropFilterer) WatchDependencyAdded(opts *bind.WatchOpts, sink chan<- *L1BlockInteropDependencyAdded, chainId []*big.Int) (event.Subscription, error) {

	var chainIdRule []interface{}
	for _, chainIdItem := range chainId {
		chainIdRule = append(chainIdRule, chainIdItem)
	}

	logs, sub, err := _L1BlockInterop.contract.WatchLogs(opts, "DependencyAdded", chainIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(L1BlockInteropDependencyAdded)
				if err := _L1BlockInterop.contract.UnpackLog(event, "DependencyAdded", log); err != nil {
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

// ParseDependencyAdded is a log parse operation binding the contract event 0x754553d16dd99693ae11c457214cb1baa77b15c7b02cea5515370dc637e050f0.
//
// Solidity: event DependencyAdded(uint256 indexed chainId)
func (_L1BlockInterop *L1BlockInteropFilterer) ParseDependencyAdded(log types.Log) (*L1BlockInteropDependencyAdded, error) {
	event := new(L1BlockInteropDependencyAdded)
	if err := _L1BlockInterop.contract.UnpackLog(event, "DependencyAdded", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// L1BlockInteropDependencyRemovedIterator is returned from FilterDependencyRemoved and is used to iterate over the raw logs and unpacked data for DependencyRemoved events raised by the L1BlockInterop contract.
type L1BlockInteropDependencyRemovedIterator struct {
	Event *L1BlockInteropDependencyRemoved // Event containing the contract specifics and raw log

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
func (it *L1BlockInteropDependencyRemovedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(L1BlockInteropDependencyRemoved)
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
		it.Event = new(L1BlockInteropDependencyRemoved)
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
func (it *L1BlockInteropDependencyRemovedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *L1BlockInteropDependencyRemovedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// L1BlockInteropDependencyRemoved represents a DependencyRemoved event raised by the L1BlockInterop contract.
type L1BlockInteropDependencyRemoved struct {
	ChainId *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterDependencyRemoved is a free log retrieval operation binding the contract event 0xc96df06add4aa6dba310cd93d0b93d7b645252f40e11fa6089731c841315cd89.
//
// Solidity: event DependencyRemoved(uint256 indexed chainId)
func (_L1BlockInterop *L1BlockInteropFilterer) FilterDependencyRemoved(opts *bind.FilterOpts, chainId []*big.Int) (*L1BlockInteropDependencyRemovedIterator, error) {

	var chainIdRule []interface{}
	for _, chainIdItem := range chainId {
		chainIdRule = append(chainIdRule, chainIdItem)
	}

	logs, sub, err := _L1BlockInterop.contract.FilterLogs(opts, "DependencyRemoved", chainIdRule)
	if err != nil {
		return nil, err
	}
	return &L1BlockInteropDependencyRemovedIterator{contract: _L1BlockInterop.contract, event: "DependencyRemoved", logs: logs, sub: sub}, nil
}

// WatchDependencyRemoved is a free log subscription operation binding the contract event 0xc96df06add4aa6dba310cd93d0b93d7b645252f40e11fa6089731c841315cd89.
//
// Solidity: event DependencyRemoved(uint256 indexed chainId)
func (_L1BlockInterop *L1BlockInteropFilterer) WatchDependencyRemoved(opts *bind.WatchOpts, sink chan<- *L1BlockInteropDependencyRemoved, chainId []*big.Int) (event.Subscription, error) {

	var chainIdRule []interface{}
	for _, chainIdItem := range chainId {
		chainIdRule = append(chainIdRule, chainIdItem)
	}

	logs, sub, err := _L1BlockInterop.contract.WatchLogs(opts, "DependencyRemoved", chainIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(L1BlockInteropDependencyRemoved)
				if err := _L1BlockInterop.contract.UnpackLog(event, "DependencyRemoved", log); err != nil {
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

// ParseDependencyRemoved is a log parse operation binding the contract event 0xc96df06add4aa6dba310cd93d0b93d7b645252f40e11fa6089731c841315cd89.
//
// Solidity: event DependencyRemoved(uint256 indexed chainId)
func (_L1BlockInterop *L1BlockInteropFilterer) ParseDependencyRemoved(log types.Log) (*L1BlockInteropDependencyRemoved, error) {
	event := new(L1BlockInteropDependencyRemoved)
	if err := _L1BlockInterop.contract.UnpackLog(event, "DependencyRemoved", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// L1BlockInteropGasPayingTokenSetIterator is returned from FilterGasPayingTokenSet and is used to iterate over the raw logs and unpacked data for GasPayingTokenSet events raised by the L1BlockInterop contract.
type L1BlockInteropGasPayingTokenSetIterator struct {
	Event *L1BlockInteropGasPayingTokenSet // Event containing the contract specifics and raw log

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
func (it *L1BlockInteropGasPayingTokenSetIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(L1BlockInteropGasPayingTokenSet)
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
		it.Event = new(L1BlockInteropGasPayingTokenSet)
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
func (it *L1BlockInteropGasPayingTokenSetIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *L1BlockInteropGasPayingTokenSetIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// L1BlockInteropGasPayingTokenSet represents a GasPayingTokenSet event raised by the L1BlockInterop contract.
type L1BlockInteropGasPayingTokenSet struct {
	Token    common.Address
	Decimals uint8
	Name     [32]byte
	Symbol   [32]byte
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterGasPayingTokenSet is a free log retrieval operation binding the contract event 0x10e43c4d58f3ef4edae7c1ca2e7f02d46b2cadbcc046737038527ed8486ffeb0.
//
// Solidity: event GasPayingTokenSet(address indexed token, uint8 indexed decimals, bytes32 name, bytes32 symbol)
func (_L1BlockInterop *L1BlockInteropFilterer) FilterGasPayingTokenSet(opts *bind.FilterOpts, token []common.Address, decimals []uint8) (*L1BlockInteropGasPayingTokenSetIterator, error) {

	var tokenRule []interface{}
	for _, tokenItem := range token {
		tokenRule = append(tokenRule, tokenItem)
	}
	var decimalsRule []interface{}
	for _, decimalsItem := range decimals {
		decimalsRule = append(decimalsRule, decimalsItem)
	}

	logs, sub, err := _L1BlockInterop.contract.FilterLogs(opts, "GasPayingTokenSet", tokenRule, decimalsRule)
	if err != nil {
		return nil, err
	}
	return &L1BlockInteropGasPayingTokenSetIterator{contract: _L1BlockInterop.contract, event: "GasPayingTokenSet", logs: logs, sub: sub}, nil
}

// WatchGasPayingTokenSet is a free log subscription operation binding the contract event 0x10e43c4d58f3ef4edae7c1ca2e7f02d46b2cadbcc046737038527ed8486ffeb0.
//
// Solidity: event GasPayingTokenSet(address indexed token, uint8 indexed decimals, bytes32 name, bytes32 symbol)
func (_L1BlockInterop *L1BlockInteropFilterer) WatchGasPayingTokenSet(opts *bind.WatchOpts, sink chan<- *L1BlockInteropGasPayingTokenSet, token []common.Address, decimals []uint8) (event.Subscription, error) {

	var tokenRule []interface{}
	for _, tokenItem := range token {
		tokenRule = append(tokenRule, tokenItem)
	}
	var decimalsRule []interface{}
	for _, decimalsItem := range decimals {
		decimalsRule = append(decimalsRule, decimalsItem)
	}

	logs, sub, err := _L1BlockInterop.contract.WatchLogs(opts, "GasPayingTokenSet", tokenRule, decimalsRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(L1BlockInteropGasPayingTokenSet)
				if err := _L1BlockInterop.contract.UnpackLog(event, "GasPayingTokenSet", log); err != nil {
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

// ParseGasPayingTokenSet is a log parse operation binding the contract event 0x10e43c4d58f3ef4edae7c1ca2e7f02d46b2cadbcc046737038527ed8486ffeb0.
//
// Solidity: event GasPayingTokenSet(address indexed token, uint8 indexed decimals, bytes32 name, bytes32 symbol)
func (_L1BlockInterop *L1BlockInteropFilterer) ParseGasPayingTokenSet(log types.Log) (*L1BlockInteropGasPayingTokenSet, error) {
	event := new(L1BlockInteropGasPayingTokenSet)
	if err := _L1BlockInterop.contract.UnpackLog(event, "GasPayingTokenSet", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
