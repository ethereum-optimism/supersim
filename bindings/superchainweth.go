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

// SuperchainWETHMetaData contains all meta data concerning the SuperchainWETH contract.
var SuperchainWETHMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"fallback\",\"stateMutability\":\"payable\"},{\"type\":\"receive\",\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"allowance\",\"inputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"approve\",\"inputs\":[{\"name\":\"guy\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"balanceOf\",\"inputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"decimals\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint8\",\"internalType\":\"uint8\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"deposit\",\"inputs\":[],\"outputs\":[],\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"name\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"relayERC20\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"dst\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"sendERC20\",\"inputs\":[{\"name\":\"dst\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"chainId\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"symbol\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"totalSupply\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"transfer\",\"inputs\":[{\"name\":\"dst\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"transferFrom\",\"inputs\":[{\"name\":\"src\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"dst\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"version\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"withdraw\",\"inputs\":[{\"name\":\"wad\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"event\",\"name\":\"Approval\",\"inputs\":[{\"name\":\"src\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"guy\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Deposit\",\"inputs\":[{\"name\":\"dst\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"RelayERC20\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"},{\"name\":\"source\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"SendERC20\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"},{\"name\":\"destination\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Transfer\",\"inputs\":[{\"name\":\"src\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"dst\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Withdrawal\",\"inputs\":[{\"name\":\"src\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"error\",\"name\":\"CallerNotL2ToL2CrossDomainMessenger\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidCrossDomainSender\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"NotCustomGasToken\",\"inputs\":[]}]",
}

// SuperchainWETHABI is the input ABI used to generate the binding from.
// Deprecated: Use SuperchainWETHMetaData.ABI instead.
var SuperchainWETHABI = SuperchainWETHMetaData.ABI

// SuperchainWETH is an auto generated Go binding around an Ethereum contract.
type SuperchainWETH struct {
	SuperchainWETHCaller     // Read-only binding to the contract
	SuperchainWETHTransactor // Write-only binding to the contract
	SuperchainWETHFilterer   // Log filterer for contract events
}

// SuperchainWETHCaller is an auto generated read-only Go binding around an Ethereum contract.
type SuperchainWETHCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainWETHTransactor is an auto generated write-only Go binding around an Ethereum contract.
type SuperchainWETHTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainWETHFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SuperchainWETHFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainWETHSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SuperchainWETHSession struct {
	Contract     *SuperchainWETH   // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SuperchainWETHCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SuperchainWETHCallerSession struct {
	Contract *SuperchainWETHCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts         // Call options to use throughout this session
}

// SuperchainWETHTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SuperchainWETHTransactorSession struct {
	Contract     *SuperchainWETHTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts         // Transaction auth options to use throughout this session
}

// SuperchainWETHRaw is an auto generated low-level Go binding around an Ethereum contract.
type SuperchainWETHRaw struct {
	Contract *SuperchainWETH // Generic contract binding to access the raw methods on
}

// SuperchainWETHCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SuperchainWETHCallerRaw struct {
	Contract *SuperchainWETHCaller // Generic read-only contract binding to access the raw methods on
}

// SuperchainWETHTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SuperchainWETHTransactorRaw struct {
	Contract *SuperchainWETHTransactor // Generic write-only contract binding to access the raw methods on
}

// NewSuperchainWETH creates a new instance of SuperchainWETH, bound to a specific deployed contract.
func NewSuperchainWETH(address common.Address, backend bind.ContractBackend) (*SuperchainWETH, error) {
	contract, err := bindSuperchainWETH(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETH{SuperchainWETHCaller: SuperchainWETHCaller{contract: contract}, SuperchainWETHTransactor: SuperchainWETHTransactor{contract: contract}, SuperchainWETHFilterer: SuperchainWETHFilterer{contract: contract}}, nil
}

// NewSuperchainWETHCaller creates a new read-only instance of SuperchainWETH, bound to a specific deployed contract.
func NewSuperchainWETHCaller(address common.Address, caller bind.ContractCaller) (*SuperchainWETHCaller, error) {
	contract, err := bindSuperchainWETH(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETHCaller{contract: contract}, nil
}

// NewSuperchainWETHTransactor creates a new write-only instance of SuperchainWETH, bound to a specific deployed contract.
func NewSuperchainWETHTransactor(address common.Address, transactor bind.ContractTransactor) (*SuperchainWETHTransactor, error) {
	contract, err := bindSuperchainWETH(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETHTransactor{contract: contract}, nil
}

// NewSuperchainWETHFilterer creates a new log filterer instance of SuperchainWETH, bound to a specific deployed contract.
func NewSuperchainWETHFilterer(address common.Address, filterer bind.ContractFilterer) (*SuperchainWETHFilterer, error) {
	contract, err := bindSuperchainWETH(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETHFilterer{contract: contract}, nil
}

// bindSuperchainWETH binds a generic wrapper to an already deployed contract.
func bindSuperchainWETH(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := SuperchainWETHMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SuperchainWETH *SuperchainWETHRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SuperchainWETH.Contract.SuperchainWETHCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SuperchainWETH *SuperchainWETHRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.SuperchainWETHTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SuperchainWETH *SuperchainWETHRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.SuperchainWETHTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SuperchainWETH *SuperchainWETHCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SuperchainWETH.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SuperchainWETH *SuperchainWETHTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SuperchainWETH *SuperchainWETHTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.contract.Transact(opts, method, params...)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address , address ) view returns(uint256)
func (_SuperchainWETH *SuperchainWETHCaller) Allowance(opts *bind.CallOpts, arg0 common.Address, arg1 common.Address) (*big.Int, error) {
	var out []interface{}
	err := _SuperchainWETH.contract.Call(opts, &out, "allowance", arg0, arg1)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address , address ) view returns(uint256)
func (_SuperchainWETH *SuperchainWETHSession) Allowance(arg0 common.Address, arg1 common.Address) (*big.Int, error) {
	return _SuperchainWETH.Contract.Allowance(&_SuperchainWETH.CallOpts, arg0, arg1)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address , address ) view returns(uint256)
func (_SuperchainWETH *SuperchainWETHCallerSession) Allowance(arg0 common.Address, arg1 common.Address) (*big.Int, error) {
	return _SuperchainWETH.Contract.Allowance(&_SuperchainWETH.CallOpts, arg0, arg1)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address ) view returns(uint256)
func (_SuperchainWETH *SuperchainWETHCaller) BalanceOf(opts *bind.CallOpts, arg0 common.Address) (*big.Int, error) {
	var out []interface{}
	err := _SuperchainWETH.contract.Call(opts, &out, "balanceOf", arg0)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address ) view returns(uint256)
func (_SuperchainWETH *SuperchainWETHSession) BalanceOf(arg0 common.Address) (*big.Int, error) {
	return _SuperchainWETH.Contract.BalanceOf(&_SuperchainWETH.CallOpts, arg0)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address ) view returns(uint256)
func (_SuperchainWETH *SuperchainWETHCallerSession) BalanceOf(arg0 common.Address) (*big.Int, error) {
	return _SuperchainWETH.Contract.BalanceOf(&_SuperchainWETH.CallOpts, arg0)
}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() view returns(uint8)
func (_SuperchainWETH *SuperchainWETHCaller) Decimals(opts *bind.CallOpts) (uint8, error) {
	var out []interface{}
	err := _SuperchainWETH.contract.Call(opts, &out, "decimals")

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() view returns(uint8)
func (_SuperchainWETH *SuperchainWETHSession) Decimals() (uint8, error) {
	return _SuperchainWETH.Contract.Decimals(&_SuperchainWETH.CallOpts)
}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() view returns(uint8)
func (_SuperchainWETH *SuperchainWETHCallerSession) Decimals() (uint8, error) {
	return _SuperchainWETH.Contract.Decimals(&_SuperchainWETH.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_SuperchainWETH *SuperchainWETHCaller) Name(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SuperchainWETH.contract.Call(opts, &out, "name")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_SuperchainWETH *SuperchainWETHSession) Name() (string, error) {
	return _SuperchainWETH.Contract.Name(&_SuperchainWETH.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_SuperchainWETH *SuperchainWETHCallerSession) Name() (string, error) {
	return _SuperchainWETH.Contract.Name(&_SuperchainWETH.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_SuperchainWETH *SuperchainWETHCaller) Symbol(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SuperchainWETH.contract.Call(opts, &out, "symbol")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_SuperchainWETH *SuperchainWETHSession) Symbol() (string, error) {
	return _SuperchainWETH.Contract.Symbol(&_SuperchainWETH.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_SuperchainWETH *SuperchainWETHCallerSession) Symbol() (string, error) {
	return _SuperchainWETH.Contract.Symbol(&_SuperchainWETH.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256)
func (_SuperchainWETH *SuperchainWETHCaller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _SuperchainWETH.contract.Call(opts, &out, "totalSupply")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256)
func (_SuperchainWETH *SuperchainWETHSession) TotalSupply() (*big.Int, error) {
	return _SuperchainWETH.Contract.TotalSupply(&_SuperchainWETH.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256)
func (_SuperchainWETH *SuperchainWETHCallerSession) TotalSupply() (*big.Int, error) {
	return _SuperchainWETH.Contract.TotalSupply(&_SuperchainWETH.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainWETH *SuperchainWETHCaller) Version(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SuperchainWETH.contract.Call(opts, &out, "version")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainWETH *SuperchainWETHSession) Version() (string, error) {
	return _SuperchainWETH.Contract.Version(&_SuperchainWETH.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainWETH *SuperchainWETHCallerSession) Version() (string, error) {
	return _SuperchainWETH.Contract.Version(&_SuperchainWETH.CallOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address guy, uint256 wad) returns(bool)
func (_SuperchainWETH *SuperchainWETHTransactor) Approve(opts *bind.TransactOpts, guy common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.contract.Transact(opts, "approve", guy, wad)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address guy, uint256 wad) returns(bool)
func (_SuperchainWETH *SuperchainWETHSession) Approve(guy common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Approve(&_SuperchainWETH.TransactOpts, guy, wad)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address guy, uint256 wad) returns(bool)
func (_SuperchainWETH *SuperchainWETHTransactorSession) Approve(guy common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Approve(&_SuperchainWETH.TransactOpts, guy, wad)
}

// Deposit is a paid mutator transaction binding the contract method 0xd0e30db0.
//
// Solidity: function deposit() payable returns()
func (_SuperchainWETH *SuperchainWETHTransactor) Deposit(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SuperchainWETH.contract.Transact(opts, "deposit")
}

// Deposit is a paid mutator transaction binding the contract method 0xd0e30db0.
//
// Solidity: function deposit() payable returns()
func (_SuperchainWETH *SuperchainWETHSession) Deposit() (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Deposit(&_SuperchainWETH.TransactOpts)
}

// Deposit is a paid mutator transaction binding the contract method 0xd0e30db0.
//
// Solidity: function deposit() payable returns()
func (_SuperchainWETH *SuperchainWETHTransactorSession) Deposit() (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Deposit(&_SuperchainWETH.TransactOpts)
}

// RelayERC20 is a paid mutator transaction binding the contract method 0xd9f50046.
//
// Solidity: function relayERC20(address from, address dst, uint256 wad) returns()
func (_SuperchainWETH *SuperchainWETHTransactor) RelayERC20(opts *bind.TransactOpts, from common.Address, dst common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.contract.Transact(opts, "relayERC20", from, dst, wad)
}

// RelayERC20 is a paid mutator transaction binding the contract method 0xd9f50046.
//
// Solidity: function relayERC20(address from, address dst, uint256 wad) returns()
func (_SuperchainWETH *SuperchainWETHSession) RelayERC20(from common.Address, dst common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.RelayERC20(&_SuperchainWETH.TransactOpts, from, dst, wad)
}

// RelayERC20 is a paid mutator transaction binding the contract method 0xd9f50046.
//
// Solidity: function relayERC20(address from, address dst, uint256 wad) returns()
func (_SuperchainWETH *SuperchainWETHTransactorSession) RelayERC20(from common.Address, dst common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.RelayERC20(&_SuperchainWETH.TransactOpts, from, dst, wad)
}

// SendERC20 is a paid mutator transaction binding the contract method 0x78a3727b.
//
// Solidity: function sendERC20(address dst, uint256 wad, uint256 chainId) returns()
func (_SuperchainWETH *SuperchainWETHTransactor) SendERC20(opts *bind.TransactOpts, dst common.Address, wad *big.Int, chainId *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.contract.Transact(opts, "sendERC20", dst, wad, chainId)
}

// SendERC20 is a paid mutator transaction binding the contract method 0x78a3727b.
//
// Solidity: function sendERC20(address dst, uint256 wad, uint256 chainId) returns()
func (_SuperchainWETH *SuperchainWETHSession) SendERC20(dst common.Address, wad *big.Int, chainId *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.SendERC20(&_SuperchainWETH.TransactOpts, dst, wad, chainId)
}

// SendERC20 is a paid mutator transaction binding the contract method 0x78a3727b.
//
// Solidity: function sendERC20(address dst, uint256 wad, uint256 chainId) returns()
func (_SuperchainWETH *SuperchainWETHTransactorSession) SendERC20(dst common.Address, wad *big.Int, chainId *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.SendERC20(&_SuperchainWETH.TransactOpts, dst, wad, chainId)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address dst, uint256 wad) returns(bool)
func (_SuperchainWETH *SuperchainWETHTransactor) Transfer(opts *bind.TransactOpts, dst common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.contract.Transact(opts, "transfer", dst, wad)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address dst, uint256 wad) returns(bool)
func (_SuperchainWETH *SuperchainWETHSession) Transfer(dst common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Transfer(&_SuperchainWETH.TransactOpts, dst, wad)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address dst, uint256 wad) returns(bool)
func (_SuperchainWETH *SuperchainWETHTransactorSession) Transfer(dst common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Transfer(&_SuperchainWETH.TransactOpts, dst, wad)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address src, address dst, uint256 wad) returns(bool)
func (_SuperchainWETH *SuperchainWETHTransactor) TransferFrom(opts *bind.TransactOpts, src common.Address, dst common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.contract.Transact(opts, "transferFrom", src, dst, wad)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address src, address dst, uint256 wad) returns(bool)
func (_SuperchainWETH *SuperchainWETHSession) TransferFrom(src common.Address, dst common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.TransferFrom(&_SuperchainWETH.TransactOpts, src, dst, wad)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address src, address dst, uint256 wad) returns(bool)
func (_SuperchainWETH *SuperchainWETHTransactorSession) TransferFrom(src common.Address, dst common.Address, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.TransferFrom(&_SuperchainWETH.TransactOpts, src, dst, wad)
}

// Withdraw is a paid mutator transaction binding the contract method 0x2e1a7d4d.
//
// Solidity: function withdraw(uint256 wad) returns()
func (_SuperchainWETH *SuperchainWETHTransactor) Withdraw(opts *bind.TransactOpts, wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.contract.Transact(opts, "withdraw", wad)
}

// Withdraw is a paid mutator transaction binding the contract method 0x2e1a7d4d.
//
// Solidity: function withdraw(uint256 wad) returns()
func (_SuperchainWETH *SuperchainWETHSession) Withdraw(wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Withdraw(&_SuperchainWETH.TransactOpts, wad)
}

// Withdraw is a paid mutator transaction binding the contract method 0x2e1a7d4d.
//
// Solidity: function withdraw(uint256 wad) returns()
func (_SuperchainWETH *SuperchainWETHTransactorSession) Withdraw(wad *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Withdraw(&_SuperchainWETH.TransactOpts, wad)
}

// Fallback is a paid mutator transaction binding the contract fallback function.
//
// Solidity: fallback() payable returns()
func (_SuperchainWETH *SuperchainWETHTransactor) Fallback(opts *bind.TransactOpts, calldata []byte) (*types.Transaction, error) {
	return _SuperchainWETH.contract.RawTransact(opts, calldata)
}

// Fallback is a paid mutator transaction binding the contract fallback function.
//
// Solidity: fallback() payable returns()
func (_SuperchainWETH *SuperchainWETHSession) Fallback(calldata []byte) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Fallback(&_SuperchainWETH.TransactOpts, calldata)
}

// Fallback is a paid mutator transaction binding the contract fallback function.
//
// Solidity: fallback() payable returns()
func (_SuperchainWETH *SuperchainWETHTransactorSession) Fallback(calldata []byte) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Fallback(&_SuperchainWETH.TransactOpts, calldata)
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_SuperchainWETH *SuperchainWETHTransactor) Receive(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SuperchainWETH.contract.RawTransact(opts, nil) // calldata is disallowed for receive function
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_SuperchainWETH *SuperchainWETHSession) Receive() (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Receive(&_SuperchainWETH.TransactOpts)
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_SuperchainWETH *SuperchainWETHTransactorSession) Receive() (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Receive(&_SuperchainWETH.TransactOpts)
}

// SuperchainWETHApprovalIterator is returned from FilterApproval and is used to iterate over the raw logs and unpacked data for Approval events raised by the SuperchainWETH contract.
type SuperchainWETHApprovalIterator struct {
	Event *SuperchainWETHApproval // Event containing the contract specifics and raw log

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
func (it *SuperchainWETHApprovalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainWETHApproval)
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
		it.Event = new(SuperchainWETHApproval)
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
func (it *SuperchainWETHApprovalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainWETHApprovalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainWETHApproval represents a Approval event raised by the SuperchainWETH contract.
type SuperchainWETHApproval struct {
	Src common.Address
	Guy common.Address
	Wad *big.Int
	Raw types.Log // Blockchain specific contextual infos
}

// FilterApproval is a free log retrieval operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed src, address indexed guy, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) FilterApproval(opts *bind.FilterOpts, src []common.Address, guy []common.Address) (*SuperchainWETHApprovalIterator, error) {

	var srcRule []interface{}
	for _, srcItem := range src {
		srcRule = append(srcRule, srcItem)
	}
	var guyRule []interface{}
	for _, guyItem := range guy {
		guyRule = append(guyRule, guyItem)
	}

	logs, sub, err := _SuperchainWETH.contract.FilterLogs(opts, "Approval", srcRule, guyRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETHApprovalIterator{contract: _SuperchainWETH.contract, event: "Approval", logs: logs, sub: sub}, nil
}

// WatchApproval is a free log subscription operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed src, address indexed guy, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) WatchApproval(opts *bind.WatchOpts, sink chan<- *SuperchainWETHApproval, src []common.Address, guy []common.Address) (event.Subscription, error) {

	var srcRule []interface{}
	for _, srcItem := range src {
		srcRule = append(srcRule, srcItem)
	}
	var guyRule []interface{}
	for _, guyItem := range guy {
		guyRule = append(guyRule, guyItem)
	}

	logs, sub, err := _SuperchainWETH.contract.WatchLogs(opts, "Approval", srcRule, guyRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainWETHApproval)
				if err := _SuperchainWETH.contract.UnpackLog(event, "Approval", log); err != nil {
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

// ParseApproval is a log parse operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed src, address indexed guy, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) ParseApproval(log types.Log) (*SuperchainWETHApproval, error) {
	event := new(SuperchainWETHApproval)
	if err := _SuperchainWETH.contract.UnpackLog(event, "Approval", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SuperchainWETHDepositIterator is returned from FilterDeposit and is used to iterate over the raw logs and unpacked data for Deposit events raised by the SuperchainWETH contract.
type SuperchainWETHDepositIterator struct {
	Event *SuperchainWETHDeposit // Event containing the contract specifics and raw log

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
func (it *SuperchainWETHDepositIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainWETHDeposit)
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
		it.Event = new(SuperchainWETHDeposit)
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
func (it *SuperchainWETHDepositIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainWETHDepositIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainWETHDeposit represents a Deposit event raised by the SuperchainWETH contract.
type SuperchainWETHDeposit struct {
	Dst common.Address
	Wad *big.Int
	Raw types.Log // Blockchain specific contextual infos
}

// FilterDeposit is a free log retrieval operation binding the contract event 0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c.
//
// Solidity: event Deposit(address indexed dst, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) FilterDeposit(opts *bind.FilterOpts, dst []common.Address) (*SuperchainWETHDepositIterator, error) {

	var dstRule []interface{}
	for _, dstItem := range dst {
		dstRule = append(dstRule, dstItem)
	}

	logs, sub, err := _SuperchainWETH.contract.FilterLogs(opts, "Deposit", dstRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETHDepositIterator{contract: _SuperchainWETH.contract, event: "Deposit", logs: logs, sub: sub}, nil
}

// WatchDeposit is a free log subscription operation binding the contract event 0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c.
//
// Solidity: event Deposit(address indexed dst, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) WatchDeposit(opts *bind.WatchOpts, sink chan<- *SuperchainWETHDeposit, dst []common.Address) (event.Subscription, error) {

	var dstRule []interface{}
	for _, dstItem := range dst {
		dstRule = append(dstRule, dstItem)
	}

	logs, sub, err := _SuperchainWETH.contract.WatchLogs(opts, "Deposit", dstRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainWETHDeposit)
				if err := _SuperchainWETH.contract.UnpackLog(event, "Deposit", log); err != nil {
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

// ParseDeposit is a log parse operation binding the contract event 0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c.
//
// Solidity: event Deposit(address indexed dst, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) ParseDeposit(log types.Log) (*SuperchainWETHDeposit, error) {
	event := new(SuperchainWETHDeposit)
	if err := _SuperchainWETH.contract.UnpackLog(event, "Deposit", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SuperchainWETHRelayERC20Iterator is returned from FilterRelayERC20 and is used to iterate over the raw logs and unpacked data for RelayERC20 events raised by the SuperchainWETH contract.
type SuperchainWETHRelayERC20Iterator struct {
	Event *SuperchainWETHRelayERC20 // Event containing the contract specifics and raw log

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
func (it *SuperchainWETHRelayERC20Iterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainWETHRelayERC20)
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
		it.Event = new(SuperchainWETHRelayERC20)
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
func (it *SuperchainWETHRelayERC20Iterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainWETHRelayERC20Iterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainWETHRelayERC20 represents a RelayERC20 event raised by the SuperchainWETH contract.
type SuperchainWETHRelayERC20 struct {
	From   common.Address
	To     common.Address
	Amount *big.Int
	Source *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterRelayERC20 is a free log retrieval operation binding the contract event 0xc75e22a0b57fb7740dbfc0caa5c6b7a82a2139964e7f1b7be7ac4e8be0f719ba.
//
// Solidity: event RelayERC20(address indexed from, address indexed to, uint256 amount, uint256 source)
func (_SuperchainWETH *SuperchainWETHFilterer) FilterRelayERC20(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*SuperchainWETHRelayERC20Iterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainWETH.contract.FilterLogs(opts, "RelayERC20", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETHRelayERC20Iterator{contract: _SuperchainWETH.contract, event: "RelayERC20", logs: logs, sub: sub}, nil
}

// WatchRelayERC20 is a free log subscription operation binding the contract event 0xc75e22a0b57fb7740dbfc0caa5c6b7a82a2139964e7f1b7be7ac4e8be0f719ba.
//
// Solidity: event RelayERC20(address indexed from, address indexed to, uint256 amount, uint256 source)
func (_SuperchainWETH *SuperchainWETHFilterer) WatchRelayERC20(opts *bind.WatchOpts, sink chan<- *SuperchainWETHRelayERC20, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainWETH.contract.WatchLogs(opts, "RelayERC20", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainWETHRelayERC20)
				if err := _SuperchainWETH.contract.UnpackLog(event, "RelayERC20", log); err != nil {
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

// ParseRelayERC20 is a log parse operation binding the contract event 0xc75e22a0b57fb7740dbfc0caa5c6b7a82a2139964e7f1b7be7ac4e8be0f719ba.
//
// Solidity: event RelayERC20(address indexed from, address indexed to, uint256 amount, uint256 source)
func (_SuperchainWETH *SuperchainWETHFilterer) ParseRelayERC20(log types.Log) (*SuperchainWETHRelayERC20, error) {
	event := new(SuperchainWETHRelayERC20)
	if err := _SuperchainWETH.contract.UnpackLog(event, "RelayERC20", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SuperchainWETHSendERC20Iterator is returned from FilterSendERC20 and is used to iterate over the raw logs and unpacked data for SendERC20 events raised by the SuperchainWETH contract.
type SuperchainWETHSendERC20Iterator struct {
	Event *SuperchainWETHSendERC20 // Event containing the contract specifics and raw log

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
func (it *SuperchainWETHSendERC20Iterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainWETHSendERC20)
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
		it.Event = new(SuperchainWETHSendERC20)
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
func (it *SuperchainWETHSendERC20Iterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainWETHSendERC20Iterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainWETHSendERC20 represents a SendERC20 event raised by the SuperchainWETH contract.
type SuperchainWETHSendERC20 struct {
	From        common.Address
	To          common.Address
	Amount      *big.Int
	Destination *big.Int
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterSendERC20 is a free log retrieval operation binding the contract event 0xfcea3600a13c757f2758710b089cc9752781c35d2a9d6804370ed18cd82f0bb6.
//
// Solidity: event SendERC20(address indexed from, address indexed to, uint256 amount, uint256 destination)
func (_SuperchainWETH *SuperchainWETHFilterer) FilterSendERC20(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*SuperchainWETHSendERC20Iterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainWETH.contract.FilterLogs(opts, "SendERC20", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETHSendERC20Iterator{contract: _SuperchainWETH.contract, event: "SendERC20", logs: logs, sub: sub}, nil
}

// WatchSendERC20 is a free log subscription operation binding the contract event 0xfcea3600a13c757f2758710b089cc9752781c35d2a9d6804370ed18cd82f0bb6.
//
// Solidity: event SendERC20(address indexed from, address indexed to, uint256 amount, uint256 destination)
func (_SuperchainWETH *SuperchainWETHFilterer) WatchSendERC20(opts *bind.WatchOpts, sink chan<- *SuperchainWETHSendERC20, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainWETH.contract.WatchLogs(opts, "SendERC20", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainWETHSendERC20)
				if err := _SuperchainWETH.contract.UnpackLog(event, "SendERC20", log); err != nil {
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

// ParseSendERC20 is a log parse operation binding the contract event 0xfcea3600a13c757f2758710b089cc9752781c35d2a9d6804370ed18cd82f0bb6.
//
// Solidity: event SendERC20(address indexed from, address indexed to, uint256 amount, uint256 destination)
func (_SuperchainWETH *SuperchainWETHFilterer) ParseSendERC20(log types.Log) (*SuperchainWETHSendERC20, error) {
	event := new(SuperchainWETHSendERC20)
	if err := _SuperchainWETH.contract.UnpackLog(event, "SendERC20", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SuperchainWETHTransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the SuperchainWETH contract.
type SuperchainWETHTransferIterator struct {
	Event *SuperchainWETHTransfer // Event containing the contract specifics and raw log

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
func (it *SuperchainWETHTransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainWETHTransfer)
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
		it.Event = new(SuperchainWETHTransfer)
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
func (it *SuperchainWETHTransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainWETHTransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainWETHTransfer represents a Transfer event raised by the SuperchainWETH contract.
type SuperchainWETHTransfer struct {
	Src common.Address
	Dst common.Address
	Wad *big.Int
	Raw types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed src, address indexed dst, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) FilterTransfer(opts *bind.FilterOpts, src []common.Address, dst []common.Address) (*SuperchainWETHTransferIterator, error) {

	var srcRule []interface{}
	for _, srcItem := range src {
		srcRule = append(srcRule, srcItem)
	}
	var dstRule []interface{}
	for _, dstItem := range dst {
		dstRule = append(dstRule, dstItem)
	}

	logs, sub, err := _SuperchainWETH.contract.FilterLogs(opts, "Transfer", srcRule, dstRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETHTransferIterator{contract: _SuperchainWETH.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed src, address indexed dst, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *SuperchainWETHTransfer, src []common.Address, dst []common.Address) (event.Subscription, error) {

	var srcRule []interface{}
	for _, srcItem := range src {
		srcRule = append(srcRule, srcItem)
	}
	var dstRule []interface{}
	for _, dstItem := range dst {
		dstRule = append(dstRule, dstItem)
	}

	logs, sub, err := _SuperchainWETH.contract.WatchLogs(opts, "Transfer", srcRule, dstRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainWETHTransfer)
				if err := _SuperchainWETH.contract.UnpackLog(event, "Transfer", log); err != nil {
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

// ParseTransfer is a log parse operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed src, address indexed dst, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) ParseTransfer(log types.Log) (*SuperchainWETHTransfer, error) {
	event := new(SuperchainWETHTransfer)
	if err := _SuperchainWETH.contract.UnpackLog(event, "Transfer", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SuperchainWETHWithdrawalIterator is returned from FilterWithdrawal and is used to iterate over the raw logs and unpacked data for Withdrawal events raised by the SuperchainWETH contract.
type SuperchainWETHWithdrawalIterator struct {
	Event *SuperchainWETHWithdrawal // Event containing the contract specifics and raw log

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
func (it *SuperchainWETHWithdrawalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainWETHWithdrawal)
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
		it.Event = new(SuperchainWETHWithdrawal)
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
func (it *SuperchainWETHWithdrawalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainWETHWithdrawalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainWETHWithdrawal represents a Withdrawal event raised by the SuperchainWETH contract.
type SuperchainWETHWithdrawal struct {
	Src common.Address
	Wad *big.Int
	Raw types.Log // Blockchain specific contextual infos
}

// FilterWithdrawal is a free log retrieval operation binding the contract event 0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65.
//
// Solidity: event Withdrawal(address indexed src, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) FilterWithdrawal(opts *bind.FilterOpts, src []common.Address) (*SuperchainWETHWithdrawalIterator, error) {

	var srcRule []interface{}
	for _, srcItem := range src {
		srcRule = append(srcRule, srcItem)
	}

	logs, sub, err := _SuperchainWETH.contract.FilterLogs(opts, "Withdrawal", srcRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETHWithdrawalIterator{contract: _SuperchainWETH.contract, event: "Withdrawal", logs: logs, sub: sub}, nil
}

// WatchWithdrawal is a free log subscription operation binding the contract event 0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65.
//
// Solidity: event Withdrawal(address indexed src, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) WatchWithdrawal(opts *bind.WatchOpts, sink chan<- *SuperchainWETHWithdrawal, src []common.Address) (event.Subscription, error) {

	var srcRule []interface{}
	for _, srcItem := range src {
		srcRule = append(srcRule, srcItem)
	}

	logs, sub, err := _SuperchainWETH.contract.WatchLogs(opts, "Withdrawal", srcRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainWETHWithdrawal)
				if err := _SuperchainWETH.contract.UnpackLog(event, "Withdrawal", log); err != nil {
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

// ParseWithdrawal is a log parse operation binding the contract event 0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65.
//
// Solidity: event Withdrawal(address indexed src, uint256 wad)
func (_SuperchainWETH *SuperchainWETHFilterer) ParseWithdrawal(log types.Log) (*SuperchainWETHWithdrawal, error) {
	event := new(SuperchainWETHWithdrawal)
	if err := _SuperchainWETH.contract.UnpackLog(event, "Withdrawal", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
