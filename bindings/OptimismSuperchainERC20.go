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

// OptimismSuperchainERC20MetaData contains all meta data concerning the OptimismSuperchainERC20 contract.
var OptimismSuperchainERC20MetaData = &bind.MetaData{
	ABI: "[{\"type\":\"constructor\",\"inputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"DOMAIN_SEPARATOR\",\"inputs\":[],\"outputs\":[{\"name\":\"result\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"allowance\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"spender\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"approve\",\"inputs\":[{\"name\":\"spender\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"balanceOf\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"burn\",\"inputs\":[{\"name\":\"_from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"crosschainBurn\",\"inputs\":[{\"name\":\"_from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"crosschainMint\",\"inputs\":[{\"name\":\"_to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"decimals\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint8\",\"internalType\":\"uint8\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"initialize\",\"inputs\":[{\"name\":\"_remoteToken\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_name\",\"type\":\"string\",\"internalType\":\"string\"},{\"name\":\"_symbol\",\"type\":\"string\",\"internalType\":\"string\"},{\"name\":\"_decimals\",\"type\":\"uint8\",\"internalType\":\"uint8\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"mint\",\"inputs\":[{\"name\":\"_to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"name\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"nonces\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"permit\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"spender\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"value\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"deadline\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"v\",\"type\":\"uint8\",\"internalType\":\"uint8\"},{\"name\":\"r\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"s\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"remoteToken\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"supportsInterface\",\"inputs\":[{\"name\":\"_interfaceId\",\"type\":\"bytes4\",\"internalType\":\"bytes4\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"symbol\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"totalSupply\",\"inputs\":[],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"transfer\",\"inputs\":[{\"name\":\"to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"transferFrom\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"version\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"event\",\"name\":\"Approval\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"spender\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Burn\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"CrosschainBurn\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"},{\"name\":\"sender\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"CrosschainMint\",\"inputs\":[{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"},{\"name\":\"sender\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Initialized\",\"inputs\":[{\"name\":\"version\",\"type\":\"uint64\",\"indexed\":false,\"internalType\":\"uint64\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Mint\",\"inputs\":[{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Transfer\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"error\",\"name\":\"AllowanceOverflow\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"AllowanceUnderflow\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InsufficientAllowance\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InsufficientBalance\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidInitialization\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidPermit\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"NotInitializing\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"Permit2AllowanceIsFixedAtInfinity\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"PermitExpired\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"TotalSupplyOverflow\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"Unauthorized\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ZeroAddress\",\"inputs\":[]}]",
}

// OptimismSuperchainERC20ABI is the input ABI used to generate the binding from.
// Deprecated: Use OptimismSuperchainERC20MetaData.ABI instead.
var OptimismSuperchainERC20ABI = OptimismSuperchainERC20MetaData.ABI

// OptimismSuperchainERC20 is an auto generated Go binding around an Ethereum contract.
type OptimismSuperchainERC20 struct {
	OptimismSuperchainERC20Caller     // Read-only binding to the contract
	OptimismSuperchainERC20Transactor // Write-only binding to the contract
	OptimismSuperchainERC20Filterer   // Log filterer for contract events
}

// OptimismSuperchainERC20Caller is an auto generated read-only Go binding around an Ethereum contract.
type OptimismSuperchainERC20Caller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// OptimismSuperchainERC20Transactor is an auto generated write-only Go binding around an Ethereum contract.
type OptimismSuperchainERC20Transactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// OptimismSuperchainERC20Filterer is an auto generated log filtering Go binding around an Ethereum contract events.
type OptimismSuperchainERC20Filterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// OptimismSuperchainERC20Session is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type OptimismSuperchainERC20Session struct {
	Contract     *OptimismSuperchainERC20 // Generic contract binding to set the session for
	CallOpts     bind.CallOpts            // Call options to use throughout this session
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// OptimismSuperchainERC20CallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type OptimismSuperchainERC20CallerSession struct {
	Contract *OptimismSuperchainERC20Caller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts                  // Call options to use throughout this session
}

// OptimismSuperchainERC20TransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type OptimismSuperchainERC20TransactorSession struct {
	Contract     *OptimismSuperchainERC20Transactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts                  // Transaction auth options to use throughout this session
}

// OptimismSuperchainERC20Raw is an auto generated low-level Go binding around an Ethereum contract.
type OptimismSuperchainERC20Raw struct {
	Contract *OptimismSuperchainERC20 // Generic contract binding to access the raw methods on
}

// OptimismSuperchainERC20CallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type OptimismSuperchainERC20CallerRaw struct {
	Contract *OptimismSuperchainERC20Caller // Generic read-only contract binding to access the raw methods on
}

// OptimismSuperchainERC20TransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type OptimismSuperchainERC20TransactorRaw struct {
	Contract *OptimismSuperchainERC20Transactor // Generic write-only contract binding to access the raw methods on
}

// NewOptimismSuperchainERC20 creates a new instance of OptimismSuperchainERC20, bound to a specific deployed contract.
func NewOptimismSuperchainERC20(address common.Address, backend bind.ContractBackend) (*OptimismSuperchainERC20, error) {
	contract, err := bindOptimismSuperchainERC20(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &OptimismSuperchainERC20{OptimismSuperchainERC20Caller: OptimismSuperchainERC20Caller{contract: contract}, OptimismSuperchainERC20Transactor: OptimismSuperchainERC20Transactor{contract: contract}, OptimismSuperchainERC20Filterer: OptimismSuperchainERC20Filterer{contract: contract}}, nil
}

// NewOptimismSuperchainERC20Caller creates a new read-only instance of OptimismSuperchainERC20, bound to a specific deployed contract.
func NewOptimismSuperchainERC20Caller(address common.Address, caller bind.ContractCaller) (*OptimismSuperchainERC20Caller, error) {
	contract, err := bindOptimismSuperchainERC20(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &OptimismSuperchainERC20Caller{contract: contract}, nil
}

// NewOptimismSuperchainERC20Transactor creates a new write-only instance of OptimismSuperchainERC20, bound to a specific deployed contract.
func NewOptimismSuperchainERC20Transactor(address common.Address, transactor bind.ContractTransactor) (*OptimismSuperchainERC20Transactor, error) {
	contract, err := bindOptimismSuperchainERC20(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &OptimismSuperchainERC20Transactor{contract: contract}, nil
}

// NewOptimismSuperchainERC20Filterer creates a new log filterer instance of OptimismSuperchainERC20, bound to a specific deployed contract.
func NewOptimismSuperchainERC20Filterer(address common.Address, filterer bind.ContractFilterer) (*OptimismSuperchainERC20Filterer, error) {
	contract, err := bindOptimismSuperchainERC20(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &OptimismSuperchainERC20Filterer{contract: contract}, nil
}

// bindOptimismSuperchainERC20 binds a generic wrapper to an already deployed contract.
func bindOptimismSuperchainERC20(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := OptimismSuperchainERC20MetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Raw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _OptimismSuperchainERC20.Contract.OptimismSuperchainERC20Caller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Raw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.OptimismSuperchainERC20Transactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Raw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.OptimismSuperchainERC20Transactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _OptimismSuperchainERC20.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20TransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20TransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.contract.Transact(opts, method, params...)
}

// DOMAINSEPARATOR is a free data retrieval call binding the contract method 0x3644e515.
//
// Solidity: function DOMAIN_SEPARATOR() view returns(bytes32 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Caller) DOMAINSEPARATOR(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _OptimismSuperchainERC20.contract.Call(opts, &out, "DOMAIN_SEPARATOR")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// DOMAINSEPARATOR is a free data retrieval call binding the contract method 0x3644e515.
//
// Solidity: function DOMAIN_SEPARATOR() view returns(bytes32 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) DOMAINSEPARATOR() ([32]byte, error) {
	return _OptimismSuperchainERC20.Contract.DOMAINSEPARATOR(&_OptimismSuperchainERC20.CallOpts)
}

// DOMAINSEPARATOR is a free data retrieval call binding the contract method 0x3644e515.
//
// Solidity: function DOMAIN_SEPARATOR() view returns(bytes32 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerSession) DOMAINSEPARATOR() ([32]byte, error) {
	return _OptimismSuperchainERC20.Contract.DOMAINSEPARATOR(&_OptimismSuperchainERC20.CallOpts)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address owner, address spender) view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Caller) Allowance(opts *bind.CallOpts, owner common.Address, spender common.Address) (*big.Int, error) {
	var out []interface{}
	err := _OptimismSuperchainERC20.contract.Call(opts, &out, "allowance", owner, spender)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address owner, address spender) view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Allowance(owner common.Address, spender common.Address) (*big.Int, error) {
	return _OptimismSuperchainERC20.Contract.Allowance(&_OptimismSuperchainERC20.CallOpts, owner, spender)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address owner, address spender) view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerSession) Allowance(owner common.Address, spender common.Address) (*big.Int, error) {
	return _OptimismSuperchainERC20.Contract.Allowance(&_OptimismSuperchainERC20.CallOpts, owner, spender)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Caller) BalanceOf(opts *bind.CallOpts, owner common.Address) (*big.Int, error) {
	var out []interface{}
	err := _OptimismSuperchainERC20.contract.Call(opts, &out, "balanceOf", owner)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) BalanceOf(owner common.Address) (*big.Int, error) {
	return _OptimismSuperchainERC20.Contract.BalanceOf(&_OptimismSuperchainERC20.CallOpts, owner)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerSession) BalanceOf(owner common.Address) (*big.Int, error) {
	return _OptimismSuperchainERC20.Contract.BalanceOf(&_OptimismSuperchainERC20.CallOpts, owner)
}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() view returns(uint8)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Caller) Decimals(opts *bind.CallOpts) (uint8, error) {
	var out []interface{}
	err := _OptimismSuperchainERC20.contract.Call(opts, &out, "decimals")

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() view returns(uint8)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Decimals() (uint8, error) {
	return _OptimismSuperchainERC20.Contract.Decimals(&_OptimismSuperchainERC20.CallOpts)
}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() view returns(uint8)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerSession) Decimals() (uint8, error) {
	return _OptimismSuperchainERC20.Contract.Decimals(&_OptimismSuperchainERC20.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Caller) Name(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _OptimismSuperchainERC20.contract.Call(opts, &out, "name")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Name() (string, error) {
	return _OptimismSuperchainERC20.Contract.Name(&_OptimismSuperchainERC20.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerSession) Name() (string, error) {
	return _OptimismSuperchainERC20.Contract.Name(&_OptimismSuperchainERC20.CallOpts)
}

// Nonces is a free data retrieval call binding the contract method 0x7ecebe00.
//
// Solidity: function nonces(address owner) view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Caller) Nonces(opts *bind.CallOpts, owner common.Address) (*big.Int, error) {
	var out []interface{}
	err := _OptimismSuperchainERC20.contract.Call(opts, &out, "nonces", owner)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Nonces is a free data retrieval call binding the contract method 0x7ecebe00.
//
// Solidity: function nonces(address owner) view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Nonces(owner common.Address) (*big.Int, error) {
	return _OptimismSuperchainERC20.Contract.Nonces(&_OptimismSuperchainERC20.CallOpts, owner)
}

// Nonces is a free data retrieval call binding the contract method 0x7ecebe00.
//
// Solidity: function nonces(address owner) view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerSession) Nonces(owner common.Address) (*big.Int, error) {
	return _OptimismSuperchainERC20.Contract.Nonces(&_OptimismSuperchainERC20.CallOpts, owner)
}

// RemoteToken is a free data retrieval call binding the contract method 0xd6c0b2c4.
//
// Solidity: function remoteToken() view returns(address)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Caller) RemoteToken(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _OptimismSuperchainERC20.contract.Call(opts, &out, "remoteToken")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// RemoteToken is a free data retrieval call binding the contract method 0xd6c0b2c4.
//
// Solidity: function remoteToken() view returns(address)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) RemoteToken() (common.Address, error) {
	return _OptimismSuperchainERC20.Contract.RemoteToken(&_OptimismSuperchainERC20.CallOpts)
}

// RemoteToken is a free data retrieval call binding the contract method 0xd6c0b2c4.
//
// Solidity: function remoteToken() view returns(address)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerSession) RemoteToken() (common.Address, error) {
	return _OptimismSuperchainERC20.Contract.RemoteToken(&_OptimismSuperchainERC20.CallOpts)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 _interfaceId) view returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Caller) SupportsInterface(opts *bind.CallOpts, _interfaceId [4]byte) (bool, error) {
	var out []interface{}
	err := _OptimismSuperchainERC20.contract.Call(opts, &out, "supportsInterface", _interfaceId)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 _interfaceId) view returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) SupportsInterface(_interfaceId [4]byte) (bool, error) {
	return _OptimismSuperchainERC20.Contract.SupportsInterface(&_OptimismSuperchainERC20.CallOpts, _interfaceId)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 _interfaceId) view returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerSession) SupportsInterface(_interfaceId [4]byte) (bool, error) {
	return _OptimismSuperchainERC20.Contract.SupportsInterface(&_OptimismSuperchainERC20.CallOpts, _interfaceId)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Caller) Symbol(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _OptimismSuperchainERC20.contract.Call(opts, &out, "symbol")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Symbol() (string, error) {
	return _OptimismSuperchainERC20.Contract.Symbol(&_OptimismSuperchainERC20.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerSession) Symbol() (string, error) {
	return _OptimismSuperchainERC20.Contract.Symbol(&_OptimismSuperchainERC20.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Caller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _OptimismSuperchainERC20.contract.Call(opts, &out, "totalSupply")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) TotalSupply() (*big.Int, error) {
	return _OptimismSuperchainERC20.Contract.TotalSupply(&_OptimismSuperchainERC20.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256 result)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerSession) TotalSupply() (*big.Int, error) {
	return _OptimismSuperchainERC20.Contract.TotalSupply(&_OptimismSuperchainERC20.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Caller) Version(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _OptimismSuperchainERC20.contract.Call(opts, &out, "version")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Version() (string, error) {
	return _OptimismSuperchainERC20.Contract.Version(&_OptimismSuperchainERC20.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20CallerSession) Version() (string, error) {
	return _OptimismSuperchainERC20.Contract.Version(&_OptimismSuperchainERC20.CallOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address spender, uint256 amount) returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Transactor) Approve(opts *bind.TransactOpts, spender common.Address, amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.contract.Transact(opts, "approve", spender, amount)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address spender, uint256 amount) returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Approve(spender common.Address, amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Approve(&_OptimismSuperchainERC20.TransactOpts, spender, amount)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address spender, uint256 amount) returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20TransactorSession) Approve(spender common.Address, amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Approve(&_OptimismSuperchainERC20.TransactOpts, spender, amount)
}

// Burn is a paid mutator transaction binding the contract method 0x9dc29fac.
//
// Solidity: function burn(address _from, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Transactor) Burn(opts *bind.TransactOpts, _from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.contract.Transact(opts, "burn", _from, _amount)
}

// Burn is a paid mutator transaction binding the contract method 0x9dc29fac.
//
// Solidity: function burn(address _from, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Burn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Burn(&_OptimismSuperchainERC20.TransactOpts, _from, _amount)
}

// Burn is a paid mutator transaction binding the contract method 0x9dc29fac.
//
// Solidity: function burn(address _from, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20TransactorSession) Burn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Burn(&_OptimismSuperchainERC20.TransactOpts, _from, _amount)
}

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Transactor) CrosschainBurn(opts *bind.TransactOpts, _from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.contract.Transact(opts, "crosschainBurn", _from, _amount)
}

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) CrosschainBurn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.CrosschainBurn(&_OptimismSuperchainERC20.TransactOpts, _from, _amount)
}

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20TransactorSession) CrosschainBurn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.CrosschainBurn(&_OptimismSuperchainERC20.TransactOpts, _from, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Transactor) CrosschainMint(opts *bind.TransactOpts, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.contract.Transact(opts, "crosschainMint", _to, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) CrosschainMint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.CrosschainMint(&_OptimismSuperchainERC20.TransactOpts, _to, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20TransactorSession) CrosschainMint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.CrosschainMint(&_OptimismSuperchainERC20.TransactOpts, _to, _amount)
}

// Initialize is a paid mutator transaction binding the contract method 0xf6d2ee86.
//
// Solidity: function initialize(address _remoteToken, string _name, string _symbol, uint8 _decimals) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Transactor) Initialize(opts *bind.TransactOpts, _remoteToken common.Address, _name string, _symbol string, _decimals uint8) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.contract.Transact(opts, "initialize", _remoteToken, _name, _symbol, _decimals)
}

// Initialize is a paid mutator transaction binding the contract method 0xf6d2ee86.
//
// Solidity: function initialize(address _remoteToken, string _name, string _symbol, uint8 _decimals) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Initialize(_remoteToken common.Address, _name string, _symbol string, _decimals uint8) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Initialize(&_OptimismSuperchainERC20.TransactOpts, _remoteToken, _name, _symbol, _decimals)
}

// Initialize is a paid mutator transaction binding the contract method 0xf6d2ee86.
//
// Solidity: function initialize(address _remoteToken, string _name, string _symbol, uint8 _decimals) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20TransactorSession) Initialize(_remoteToken common.Address, _name string, _symbol string, _decimals uint8) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Initialize(&_OptimismSuperchainERC20.TransactOpts, _remoteToken, _name, _symbol, _decimals)
}

// Mint is a paid mutator transaction binding the contract method 0x40c10f19.
//
// Solidity: function mint(address _to, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Transactor) Mint(opts *bind.TransactOpts, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.contract.Transact(opts, "mint", _to, _amount)
}

// Mint is a paid mutator transaction binding the contract method 0x40c10f19.
//
// Solidity: function mint(address _to, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Mint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Mint(&_OptimismSuperchainERC20.TransactOpts, _to, _amount)
}

// Mint is a paid mutator transaction binding the contract method 0x40c10f19.
//
// Solidity: function mint(address _to, uint256 _amount) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20TransactorSession) Mint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Mint(&_OptimismSuperchainERC20.TransactOpts, _to, _amount)
}

// Permit is a paid mutator transaction binding the contract method 0xd505accf.
//
// Solidity: function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Transactor) Permit(opts *bind.TransactOpts, owner common.Address, spender common.Address, value *big.Int, deadline *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.contract.Transact(opts, "permit", owner, spender, value, deadline, v, r, s)
}

// Permit is a paid mutator transaction binding the contract method 0xd505accf.
//
// Solidity: function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Permit(owner common.Address, spender common.Address, value *big.Int, deadline *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Permit(&_OptimismSuperchainERC20.TransactOpts, owner, spender, value, deadline, v, r, s)
}

// Permit is a paid mutator transaction binding the contract method 0xd505accf.
//
// Solidity: function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns()
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20TransactorSession) Permit(owner common.Address, spender common.Address, value *big.Int, deadline *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Permit(&_OptimismSuperchainERC20.TransactOpts, owner, spender, value, deadline, v, r, s)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address to, uint256 amount) returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Transactor) Transfer(opts *bind.TransactOpts, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.contract.Transact(opts, "transfer", to, amount)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address to, uint256 amount) returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) Transfer(to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Transfer(&_OptimismSuperchainERC20.TransactOpts, to, amount)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address to, uint256 amount) returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20TransactorSession) Transfer(to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.Transfer(&_OptimismSuperchainERC20.TransactOpts, to, amount)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 amount) returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Transactor) TransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.contract.Transact(opts, "transferFrom", from, to, amount)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 amount) returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Session) TransferFrom(from common.Address, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.TransferFrom(&_OptimismSuperchainERC20.TransactOpts, from, to, amount)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 amount) returns(bool)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20TransactorSession) TransferFrom(from common.Address, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _OptimismSuperchainERC20.Contract.TransferFrom(&_OptimismSuperchainERC20.TransactOpts, from, to, amount)
}

// OptimismSuperchainERC20ApprovalIterator is returned from FilterApproval and is used to iterate over the raw logs and unpacked data for Approval events raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20ApprovalIterator struct {
	Event *OptimismSuperchainERC20Approval // Event containing the contract specifics and raw log

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
func (it *OptimismSuperchainERC20ApprovalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(OptimismSuperchainERC20Approval)
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
		it.Event = new(OptimismSuperchainERC20Approval)
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
func (it *OptimismSuperchainERC20ApprovalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *OptimismSuperchainERC20ApprovalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// OptimismSuperchainERC20Approval represents a Approval event raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20Approval struct {
	Owner   common.Address
	Spender common.Address
	Amount  *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterApproval is a free log retrieval operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed owner, address indexed spender, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) FilterApproval(opts *bind.FilterOpts, owner []common.Address, spender []common.Address) (*OptimismSuperchainERC20ApprovalIterator, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.FilterLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return &OptimismSuperchainERC20ApprovalIterator{contract: _OptimismSuperchainERC20.contract, event: "Approval", logs: logs, sub: sub}, nil
}

// WatchApproval is a free log subscription operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed owner, address indexed spender, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) WatchApproval(opts *bind.WatchOpts, sink chan<- *OptimismSuperchainERC20Approval, owner []common.Address, spender []common.Address) (event.Subscription, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.WatchLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(OptimismSuperchainERC20Approval)
				if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "Approval", log); err != nil {
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
// Solidity: event Approval(address indexed owner, address indexed spender, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) ParseApproval(log types.Log) (*OptimismSuperchainERC20Approval, error) {
	event := new(OptimismSuperchainERC20Approval)
	if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "Approval", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// OptimismSuperchainERC20BurnIterator is returned from FilterBurn and is used to iterate over the raw logs and unpacked data for Burn events raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20BurnIterator struct {
	Event *OptimismSuperchainERC20Burn // Event containing the contract specifics and raw log

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
func (it *OptimismSuperchainERC20BurnIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(OptimismSuperchainERC20Burn)
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
		it.Event = new(OptimismSuperchainERC20Burn)
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
func (it *OptimismSuperchainERC20BurnIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *OptimismSuperchainERC20BurnIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// OptimismSuperchainERC20Burn represents a Burn event raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20Burn struct {
	From   common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterBurn is a free log retrieval operation binding the contract event 0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5.
//
// Solidity: event Burn(address indexed from, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) FilterBurn(opts *bind.FilterOpts, from []common.Address) (*OptimismSuperchainERC20BurnIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.FilterLogs(opts, "Burn", fromRule)
	if err != nil {
		return nil, err
	}
	return &OptimismSuperchainERC20BurnIterator{contract: _OptimismSuperchainERC20.contract, event: "Burn", logs: logs, sub: sub}, nil
}

// WatchBurn is a free log subscription operation binding the contract event 0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5.
//
// Solidity: event Burn(address indexed from, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) WatchBurn(opts *bind.WatchOpts, sink chan<- *OptimismSuperchainERC20Burn, from []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.WatchLogs(opts, "Burn", fromRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(OptimismSuperchainERC20Burn)
				if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "Burn", log); err != nil {
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

// ParseBurn is a log parse operation binding the contract event 0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5.
//
// Solidity: event Burn(address indexed from, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) ParseBurn(log types.Log) (*OptimismSuperchainERC20Burn, error) {
	event := new(OptimismSuperchainERC20Burn)
	if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "Burn", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// OptimismSuperchainERC20CrosschainBurnIterator is returned from FilterCrosschainBurn and is used to iterate over the raw logs and unpacked data for CrosschainBurn events raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20CrosschainBurnIterator struct {
	Event *OptimismSuperchainERC20CrosschainBurn // Event containing the contract specifics and raw log

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
func (it *OptimismSuperchainERC20CrosschainBurnIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(OptimismSuperchainERC20CrosschainBurn)
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
		it.Event = new(OptimismSuperchainERC20CrosschainBurn)
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
func (it *OptimismSuperchainERC20CrosschainBurnIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *OptimismSuperchainERC20CrosschainBurnIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// OptimismSuperchainERC20CrosschainBurn represents a CrosschainBurn event raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20CrosschainBurn struct {
	From   common.Address
	Amount *big.Int
	Sender common.Address
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterCrosschainBurn is a free log retrieval operation binding the contract event 0xb90795a66650155983e242cac3e1ac1a4dc26f8ed2987f3ce416a34e00111fd4.
//
// Solidity: event CrosschainBurn(address indexed from, uint256 amount, address indexed sender)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) FilterCrosschainBurn(opts *bind.FilterOpts, from []common.Address, sender []common.Address) (*OptimismSuperchainERC20CrosschainBurnIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	var senderRule []interface{}
	for _, senderItem := range sender {
		senderRule = append(senderRule, senderItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.FilterLogs(opts, "CrosschainBurn", fromRule, senderRule)
	if err != nil {
		return nil, err
	}
	return &OptimismSuperchainERC20CrosschainBurnIterator{contract: _OptimismSuperchainERC20.contract, event: "CrosschainBurn", logs: logs, sub: sub}, nil
}

// WatchCrosschainBurn is a free log subscription operation binding the contract event 0xb90795a66650155983e242cac3e1ac1a4dc26f8ed2987f3ce416a34e00111fd4.
//
// Solidity: event CrosschainBurn(address indexed from, uint256 amount, address indexed sender)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) WatchCrosschainBurn(opts *bind.WatchOpts, sink chan<- *OptimismSuperchainERC20CrosschainBurn, from []common.Address, sender []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	var senderRule []interface{}
	for _, senderItem := range sender {
		senderRule = append(senderRule, senderItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.WatchLogs(opts, "CrosschainBurn", fromRule, senderRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(OptimismSuperchainERC20CrosschainBurn)
				if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "CrosschainBurn", log); err != nil {
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

// ParseCrosschainBurn is a log parse operation binding the contract event 0xb90795a66650155983e242cac3e1ac1a4dc26f8ed2987f3ce416a34e00111fd4.
//
// Solidity: event CrosschainBurn(address indexed from, uint256 amount, address indexed sender)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) ParseCrosschainBurn(log types.Log) (*OptimismSuperchainERC20CrosschainBurn, error) {
	event := new(OptimismSuperchainERC20CrosschainBurn)
	if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "CrosschainBurn", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// OptimismSuperchainERC20CrosschainMintIterator is returned from FilterCrosschainMint and is used to iterate over the raw logs and unpacked data for CrosschainMint events raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20CrosschainMintIterator struct {
	Event *OptimismSuperchainERC20CrosschainMint // Event containing the contract specifics and raw log

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
func (it *OptimismSuperchainERC20CrosschainMintIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(OptimismSuperchainERC20CrosschainMint)
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
		it.Event = new(OptimismSuperchainERC20CrosschainMint)
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
func (it *OptimismSuperchainERC20CrosschainMintIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *OptimismSuperchainERC20CrosschainMintIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// OptimismSuperchainERC20CrosschainMint represents a CrosschainMint event raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20CrosschainMint struct {
	To     common.Address
	Amount *big.Int
	Sender common.Address
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterCrosschainMint is a free log retrieval operation binding the contract event 0xde22baff038e3a3e08407cbdf617deed74e869a7ba517df611e33131c6e6ea04.
//
// Solidity: event CrosschainMint(address indexed to, uint256 amount, address indexed sender)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) FilterCrosschainMint(opts *bind.FilterOpts, to []common.Address, sender []common.Address) (*OptimismSuperchainERC20CrosschainMintIterator, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	var senderRule []interface{}
	for _, senderItem := range sender {
		senderRule = append(senderRule, senderItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.FilterLogs(opts, "CrosschainMint", toRule, senderRule)
	if err != nil {
		return nil, err
	}
	return &OptimismSuperchainERC20CrosschainMintIterator{contract: _OptimismSuperchainERC20.contract, event: "CrosschainMint", logs: logs, sub: sub}, nil
}

// WatchCrosschainMint is a free log subscription operation binding the contract event 0xde22baff038e3a3e08407cbdf617deed74e869a7ba517df611e33131c6e6ea04.
//
// Solidity: event CrosschainMint(address indexed to, uint256 amount, address indexed sender)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) WatchCrosschainMint(opts *bind.WatchOpts, sink chan<- *OptimismSuperchainERC20CrosschainMint, to []common.Address, sender []common.Address) (event.Subscription, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	var senderRule []interface{}
	for _, senderItem := range sender {
		senderRule = append(senderRule, senderItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.WatchLogs(opts, "CrosschainMint", toRule, senderRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(OptimismSuperchainERC20CrosschainMint)
				if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "CrosschainMint", log); err != nil {
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

// ParseCrosschainMint is a log parse operation binding the contract event 0xde22baff038e3a3e08407cbdf617deed74e869a7ba517df611e33131c6e6ea04.
//
// Solidity: event CrosschainMint(address indexed to, uint256 amount, address indexed sender)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) ParseCrosschainMint(log types.Log) (*OptimismSuperchainERC20CrosschainMint, error) {
	event := new(OptimismSuperchainERC20CrosschainMint)
	if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "CrosschainMint", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// OptimismSuperchainERC20InitializedIterator is returned from FilterInitialized and is used to iterate over the raw logs and unpacked data for Initialized events raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20InitializedIterator struct {
	Event *OptimismSuperchainERC20Initialized // Event containing the contract specifics and raw log

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
func (it *OptimismSuperchainERC20InitializedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(OptimismSuperchainERC20Initialized)
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
		it.Event = new(OptimismSuperchainERC20Initialized)
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
func (it *OptimismSuperchainERC20InitializedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *OptimismSuperchainERC20InitializedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// OptimismSuperchainERC20Initialized represents a Initialized event raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20Initialized struct {
	Version uint64
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterInitialized is a free log retrieval operation binding the contract event 0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2.
//
// Solidity: event Initialized(uint64 version)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) FilterInitialized(opts *bind.FilterOpts) (*OptimismSuperchainERC20InitializedIterator, error) {

	logs, sub, err := _OptimismSuperchainERC20.contract.FilterLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return &OptimismSuperchainERC20InitializedIterator{contract: _OptimismSuperchainERC20.contract, event: "Initialized", logs: logs, sub: sub}, nil
}

// WatchInitialized is a free log subscription operation binding the contract event 0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2.
//
// Solidity: event Initialized(uint64 version)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) WatchInitialized(opts *bind.WatchOpts, sink chan<- *OptimismSuperchainERC20Initialized) (event.Subscription, error) {

	logs, sub, err := _OptimismSuperchainERC20.contract.WatchLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(OptimismSuperchainERC20Initialized)
				if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "Initialized", log); err != nil {
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

// ParseInitialized is a log parse operation binding the contract event 0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2.
//
// Solidity: event Initialized(uint64 version)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) ParseInitialized(log types.Log) (*OptimismSuperchainERC20Initialized, error) {
	event := new(OptimismSuperchainERC20Initialized)
	if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "Initialized", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// OptimismSuperchainERC20MintIterator is returned from FilterMint and is used to iterate over the raw logs and unpacked data for Mint events raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20MintIterator struct {
	Event *OptimismSuperchainERC20Mint // Event containing the contract specifics and raw log

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
func (it *OptimismSuperchainERC20MintIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(OptimismSuperchainERC20Mint)
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
		it.Event = new(OptimismSuperchainERC20Mint)
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
func (it *OptimismSuperchainERC20MintIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *OptimismSuperchainERC20MintIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// OptimismSuperchainERC20Mint represents a Mint event raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20Mint struct {
	To     common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterMint is a free log retrieval operation binding the contract event 0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885.
//
// Solidity: event Mint(address indexed to, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) FilterMint(opts *bind.FilterOpts, to []common.Address) (*OptimismSuperchainERC20MintIterator, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.FilterLogs(opts, "Mint", toRule)
	if err != nil {
		return nil, err
	}
	return &OptimismSuperchainERC20MintIterator{contract: _OptimismSuperchainERC20.contract, event: "Mint", logs: logs, sub: sub}, nil
}

// WatchMint is a free log subscription operation binding the contract event 0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885.
//
// Solidity: event Mint(address indexed to, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) WatchMint(opts *bind.WatchOpts, sink chan<- *OptimismSuperchainERC20Mint, to []common.Address) (event.Subscription, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.WatchLogs(opts, "Mint", toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(OptimismSuperchainERC20Mint)
				if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "Mint", log); err != nil {
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

// ParseMint is a log parse operation binding the contract event 0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885.
//
// Solidity: event Mint(address indexed to, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) ParseMint(log types.Log) (*OptimismSuperchainERC20Mint, error) {
	event := new(OptimismSuperchainERC20Mint)
	if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "Mint", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// OptimismSuperchainERC20TransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20TransferIterator struct {
	Event *OptimismSuperchainERC20Transfer // Event containing the contract specifics and raw log

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
func (it *OptimismSuperchainERC20TransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(OptimismSuperchainERC20Transfer)
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
		it.Event = new(OptimismSuperchainERC20Transfer)
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
func (it *OptimismSuperchainERC20TransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *OptimismSuperchainERC20TransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// OptimismSuperchainERC20Transfer represents a Transfer event raised by the OptimismSuperchainERC20 contract.
type OptimismSuperchainERC20Transfer struct {
	From   common.Address
	To     common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed from, address indexed to, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*OptimismSuperchainERC20TransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.FilterLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &OptimismSuperchainERC20TransferIterator{contract: _OptimismSuperchainERC20.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed from, address indexed to, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *OptimismSuperchainERC20Transfer, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _OptimismSuperchainERC20.contract.WatchLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(OptimismSuperchainERC20Transfer)
				if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "Transfer", log); err != nil {
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
// Solidity: event Transfer(address indexed from, address indexed to, uint256 amount)
func (_OptimismSuperchainERC20 *OptimismSuperchainERC20Filterer) ParseTransfer(log types.Log) (*OptimismSuperchainERC20Transfer, error) {
	event := new(OptimismSuperchainERC20Transfer)
	if err := _OptimismSuperchainERC20.contract.UnpackLog(event, "Transfer", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
