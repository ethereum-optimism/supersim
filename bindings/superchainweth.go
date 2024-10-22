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
	ABI: "[{\"type\":\"fallback\",\"stateMutability\":\"payable\"},{\"type\":\"receive\",\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"allowance\",\"inputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"approve\",\"inputs\":[{\"name\":\"guy\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"balanceOf\",\"inputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"crosschainBurn\",\"inputs\":[{\"name\":\"_from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"crosschainMint\",\"inputs\":[{\"name\":\"_to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"decimals\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint8\",\"internalType\":\"uint8\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"deposit\",\"inputs\":[],\"outputs\":[],\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"name\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"symbol\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"totalSupply\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"transfer\",\"inputs\":[{\"name\":\"dst\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"transferFrom\",\"inputs\":[{\"name\":\"src\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"dst\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"version\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"withdraw\",\"inputs\":[{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"event\",\"name\":\"Approval\",\"inputs\":[{\"name\":\"src\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"guy\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"CrosschainBurnt\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"CrosschainMinted\",\"inputs\":[{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Deposit\",\"inputs\":[{\"name\":\"dst\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Transfer\",\"inputs\":[{\"name\":\"src\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"dst\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Withdrawal\",\"inputs\":[{\"name\":\"src\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"wad\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"error\",\"name\":\"NotCustomGasToken\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"Unauthorized\",\"inputs\":[]}]",
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

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_SuperchainWETH *SuperchainWETHTransactor) CrosschainBurn(opts *bind.TransactOpts, _from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.contract.Transact(opts, "crosschainBurn", _from, _amount)
}

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_SuperchainWETH *SuperchainWETHSession) CrosschainBurn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.CrosschainBurn(&_SuperchainWETH.TransactOpts, _from, _amount)
}

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_SuperchainWETH *SuperchainWETHTransactorSession) CrosschainBurn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.CrosschainBurn(&_SuperchainWETH.TransactOpts, _from, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_SuperchainWETH *SuperchainWETHTransactor) CrosschainMint(opts *bind.TransactOpts, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.contract.Transact(opts, "crosschainMint", _to, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_SuperchainWETH *SuperchainWETHSession) CrosschainMint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.CrosschainMint(&_SuperchainWETH.TransactOpts, _to, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_SuperchainWETH *SuperchainWETHTransactorSession) CrosschainMint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.CrosschainMint(&_SuperchainWETH.TransactOpts, _to, _amount)
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
// Solidity: function withdraw(uint256 _amount) returns()
func (_SuperchainWETH *SuperchainWETHTransactor) Withdraw(opts *bind.TransactOpts, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.contract.Transact(opts, "withdraw", _amount)
}

// Withdraw is a paid mutator transaction binding the contract method 0x2e1a7d4d.
//
// Solidity: function withdraw(uint256 _amount) returns()
func (_SuperchainWETH *SuperchainWETHSession) Withdraw(_amount *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Withdraw(&_SuperchainWETH.TransactOpts, _amount)
}

// Withdraw is a paid mutator transaction binding the contract method 0x2e1a7d4d.
//
// Solidity: function withdraw(uint256 _amount) returns()
func (_SuperchainWETH *SuperchainWETHTransactorSession) Withdraw(_amount *big.Int) (*types.Transaction, error) {
	return _SuperchainWETH.Contract.Withdraw(&_SuperchainWETH.TransactOpts, _amount)
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

// SuperchainWETHCrosschainBurntIterator is returned from FilterCrosschainBurnt and is used to iterate over the raw logs and unpacked data for CrosschainBurnt events raised by the SuperchainWETH contract.
type SuperchainWETHCrosschainBurntIterator struct {
	Event *SuperchainWETHCrosschainBurnt // Event containing the contract specifics and raw log

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
func (it *SuperchainWETHCrosschainBurntIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainWETHCrosschainBurnt)
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
		it.Event = new(SuperchainWETHCrosschainBurnt)
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
func (it *SuperchainWETHCrosschainBurntIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainWETHCrosschainBurntIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainWETHCrosschainBurnt represents a CrosschainBurnt event raised by the SuperchainWETH contract.
type SuperchainWETHCrosschainBurnt struct {
	From   common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterCrosschainBurnt is a free log retrieval operation binding the contract event 0x42bc6459057d74f6803939f81a66ca58f6945d62ede921af8b62bdacd5d34cfa.
//
// Solidity: event CrosschainBurnt(address indexed from, uint256 amount)
func (_SuperchainWETH *SuperchainWETHFilterer) FilterCrosschainBurnt(opts *bind.FilterOpts, from []common.Address) (*SuperchainWETHCrosschainBurntIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _SuperchainWETH.contract.FilterLogs(opts, "CrosschainBurnt", fromRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETHCrosschainBurntIterator{contract: _SuperchainWETH.contract, event: "CrosschainBurnt", logs: logs, sub: sub}, nil
}

// WatchCrosschainBurnt is a free log subscription operation binding the contract event 0x42bc6459057d74f6803939f81a66ca58f6945d62ede921af8b62bdacd5d34cfa.
//
// Solidity: event CrosschainBurnt(address indexed from, uint256 amount)
func (_SuperchainWETH *SuperchainWETHFilterer) WatchCrosschainBurnt(opts *bind.WatchOpts, sink chan<- *SuperchainWETHCrosschainBurnt, from []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _SuperchainWETH.contract.WatchLogs(opts, "CrosschainBurnt", fromRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainWETHCrosschainBurnt)
				if err := _SuperchainWETH.contract.UnpackLog(event, "CrosschainBurnt", log); err != nil {
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

// ParseCrosschainBurnt is a log parse operation binding the contract event 0x42bc6459057d74f6803939f81a66ca58f6945d62ede921af8b62bdacd5d34cfa.
//
// Solidity: event CrosschainBurnt(address indexed from, uint256 amount)
func (_SuperchainWETH *SuperchainWETHFilterer) ParseCrosschainBurnt(log types.Log) (*SuperchainWETHCrosschainBurnt, error) {
	event := new(SuperchainWETHCrosschainBurnt)
	if err := _SuperchainWETH.contract.UnpackLog(event, "CrosschainBurnt", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SuperchainWETHCrosschainMintedIterator is returned from FilterCrosschainMinted and is used to iterate over the raw logs and unpacked data for CrosschainMinted events raised by the SuperchainWETH contract.
type SuperchainWETHCrosschainMintedIterator struct {
	Event *SuperchainWETHCrosschainMinted // Event containing the contract specifics and raw log

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
func (it *SuperchainWETHCrosschainMintedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainWETHCrosschainMinted)
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
		it.Event = new(SuperchainWETHCrosschainMinted)
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
func (it *SuperchainWETHCrosschainMintedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainWETHCrosschainMintedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainWETHCrosschainMinted represents a CrosschainMinted event raised by the SuperchainWETH contract.
type SuperchainWETHCrosschainMinted struct {
	To     common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterCrosschainMinted is a free log retrieval operation binding the contract event 0xfd9e93ea79c50872b16c8a46b0601df4cce15f00c77b81ce46e474f6ae0512dd.
//
// Solidity: event CrosschainMinted(address indexed to, uint256 amount)
func (_SuperchainWETH *SuperchainWETHFilterer) FilterCrosschainMinted(opts *bind.FilterOpts, to []common.Address) (*SuperchainWETHCrosschainMintedIterator, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainWETH.contract.FilterLogs(opts, "CrosschainMinted", toRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainWETHCrosschainMintedIterator{contract: _SuperchainWETH.contract, event: "CrosschainMinted", logs: logs, sub: sub}, nil
}

// WatchCrosschainMinted is a free log subscription operation binding the contract event 0xfd9e93ea79c50872b16c8a46b0601df4cce15f00c77b81ce46e474f6ae0512dd.
//
// Solidity: event CrosschainMinted(address indexed to, uint256 amount)
func (_SuperchainWETH *SuperchainWETHFilterer) WatchCrosschainMinted(opts *bind.WatchOpts, sink chan<- *SuperchainWETHCrosschainMinted, to []common.Address) (event.Subscription, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainWETH.contract.WatchLogs(opts, "CrosschainMinted", toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainWETHCrosschainMinted)
				if err := _SuperchainWETH.contract.UnpackLog(event, "CrosschainMinted", log); err != nil {
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

// ParseCrosschainMinted is a log parse operation binding the contract event 0xfd9e93ea79c50872b16c8a46b0601df4cce15f00c77b81ce46e474f6ae0512dd.
//
// Solidity: event CrosschainMinted(address indexed to, uint256 amount)
func (_SuperchainWETH *SuperchainWETHFilterer) ParseCrosschainMinted(log types.Log) (*SuperchainWETHCrosschainMinted, error) {
	event := new(SuperchainWETHCrosschainMinted)
	if err := _SuperchainWETH.contract.UnpackLog(event, "CrosschainMinted", log); err != nil {
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
