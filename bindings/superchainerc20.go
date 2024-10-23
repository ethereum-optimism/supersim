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

// SuperchainERC20MetaData contains all meta data concerning the SuperchainERC20 contract.
var SuperchainERC20MetaData = &bind.MetaData{
	ABI: "[{\"type\":\"function\",\"name\":\"DOMAIN_SEPARATOR\",\"inputs\":[],\"outputs\":[{\"name\":\"result\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"allowance\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"spender\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"approve\",\"inputs\":[{\"name\":\"spender\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"balanceOf\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"crosschainBurn\",\"inputs\":[{\"name\":\"_from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"crosschainMint\",\"inputs\":[{\"name\":\"_to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"decimals\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint8\",\"internalType\":\"uint8\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"name\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"nonces\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"permit\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"spender\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"value\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"deadline\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"v\",\"type\":\"uint8\",\"internalType\":\"uint8\"},{\"name\":\"r\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"s\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"symbol\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"totalSupply\",\"inputs\":[],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"transfer\",\"inputs\":[{\"name\":\"to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"transferFrom\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"version\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"event\",\"name\":\"Approval\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"spender\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"CrosschainBurnt\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"CrosschainMinted\",\"inputs\":[{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Transfer\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"error\",\"name\":\"AllowanceOverflow\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"AllowanceUnderflow\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InsufficientAllowance\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InsufficientBalance\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidPermit\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"Permit2AllowanceIsFixedAtInfinity\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"PermitExpired\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"TotalSupplyOverflow\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"Unauthorized\",\"inputs\":[]}]",
}

// SuperchainERC20ABI is the input ABI used to generate the binding from.
// Deprecated: Use SuperchainERC20MetaData.ABI instead.
var SuperchainERC20ABI = SuperchainERC20MetaData.ABI

// SuperchainERC20 is an auto generated Go binding around an Ethereum contract.
type SuperchainERC20 struct {
	SuperchainERC20Caller     // Read-only binding to the contract
	SuperchainERC20Transactor // Write-only binding to the contract
	SuperchainERC20Filterer   // Log filterer for contract events
}

// SuperchainERC20Caller is an auto generated read-only Go binding around an Ethereum contract.
type SuperchainERC20Caller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainERC20Transactor is an auto generated write-only Go binding around an Ethereum contract.
type SuperchainERC20Transactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainERC20Filterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SuperchainERC20Filterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainERC20Session is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SuperchainERC20Session struct {
	Contract     *SuperchainERC20  // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SuperchainERC20CallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SuperchainERC20CallerSession struct {
	Contract *SuperchainERC20Caller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts          // Call options to use throughout this session
}

// SuperchainERC20TransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SuperchainERC20TransactorSession struct {
	Contract     *SuperchainERC20Transactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts          // Transaction auth options to use throughout this session
}

// SuperchainERC20Raw is an auto generated low-level Go binding around an Ethereum contract.
type SuperchainERC20Raw struct {
	Contract *SuperchainERC20 // Generic contract binding to access the raw methods on
}

// SuperchainERC20CallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SuperchainERC20CallerRaw struct {
	Contract *SuperchainERC20Caller // Generic read-only contract binding to access the raw methods on
}

// SuperchainERC20TransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SuperchainERC20TransactorRaw struct {
	Contract *SuperchainERC20Transactor // Generic write-only contract binding to access the raw methods on
}

// NewSuperchainERC20 creates a new instance of SuperchainERC20, bound to a specific deployed contract.
func NewSuperchainERC20(address common.Address, backend bind.ContractBackend) (*SuperchainERC20, error) {
	contract, err := bindSuperchainERC20(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &SuperchainERC20{SuperchainERC20Caller: SuperchainERC20Caller{contract: contract}, SuperchainERC20Transactor: SuperchainERC20Transactor{contract: contract}, SuperchainERC20Filterer: SuperchainERC20Filterer{contract: contract}}, nil
}

// NewSuperchainERC20Caller creates a new read-only instance of SuperchainERC20, bound to a specific deployed contract.
func NewSuperchainERC20Caller(address common.Address, caller bind.ContractCaller) (*SuperchainERC20Caller, error) {
	contract, err := bindSuperchainERC20(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SuperchainERC20Caller{contract: contract}, nil
}

// NewSuperchainERC20Transactor creates a new write-only instance of SuperchainERC20, bound to a specific deployed contract.
func NewSuperchainERC20Transactor(address common.Address, transactor bind.ContractTransactor) (*SuperchainERC20Transactor, error) {
	contract, err := bindSuperchainERC20(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SuperchainERC20Transactor{contract: contract}, nil
}

// NewSuperchainERC20Filterer creates a new log filterer instance of SuperchainERC20, bound to a specific deployed contract.
func NewSuperchainERC20Filterer(address common.Address, filterer bind.ContractFilterer) (*SuperchainERC20Filterer, error) {
	contract, err := bindSuperchainERC20(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SuperchainERC20Filterer{contract: contract}, nil
}

// bindSuperchainERC20 binds a generic wrapper to an already deployed contract.
func bindSuperchainERC20(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := SuperchainERC20MetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SuperchainERC20 *SuperchainERC20Raw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SuperchainERC20.Contract.SuperchainERC20Caller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SuperchainERC20 *SuperchainERC20Raw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.SuperchainERC20Transactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SuperchainERC20 *SuperchainERC20Raw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.SuperchainERC20Transactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SuperchainERC20 *SuperchainERC20CallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SuperchainERC20.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SuperchainERC20 *SuperchainERC20TransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SuperchainERC20 *SuperchainERC20TransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.contract.Transact(opts, method, params...)
}

// DOMAINSEPARATOR is a free data retrieval call binding the contract method 0x3644e515.
//
// Solidity: function DOMAIN_SEPARATOR() view returns(bytes32 result)
func (_SuperchainERC20 *SuperchainERC20Caller) DOMAINSEPARATOR(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _SuperchainERC20.contract.Call(opts, &out, "DOMAIN_SEPARATOR")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// DOMAINSEPARATOR is a free data retrieval call binding the contract method 0x3644e515.
//
// Solidity: function DOMAIN_SEPARATOR() view returns(bytes32 result)
func (_SuperchainERC20 *SuperchainERC20Session) DOMAINSEPARATOR() ([32]byte, error) {
	return _SuperchainERC20.Contract.DOMAINSEPARATOR(&_SuperchainERC20.CallOpts)
}

// DOMAINSEPARATOR is a free data retrieval call binding the contract method 0x3644e515.
//
// Solidity: function DOMAIN_SEPARATOR() view returns(bytes32 result)
func (_SuperchainERC20 *SuperchainERC20CallerSession) DOMAINSEPARATOR() ([32]byte, error) {
	return _SuperchainERC20.Contract.DOMAINSEPARATOR(&_SuperchainERC20.CallOpts)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address owner, address spender) view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20Caller) Allowance(opts *bind.CallOpts, owner common.Address, spender common.Address) (*big.Int, error) {
	var out []interface{}
	err := _SuperchainERC20.contract.Call(opts, &out, "allowance", owner, spender)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address owner, address spender) view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20Session) Allowance(owner common.Address, spender common.Address) (*big.Int, error) {
	return _SuperchainERC20.Contract.Allowance(&_SuperchainERC20.CallOpts, owner, spender)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address owner, address spender) view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20CallerSession) Allowance(owner common.Address, spender common.Address) (*big.Int, error) {
	return _SuperchainERC20.Contract.Allowance(&_SuperchainERC20.CallOpts, owner, spender)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20Caller) BalanceOf(opts *bind.CallOpts, owner common.Address) (*big.Int, error) {
	var out []interface{}
	err := _SuperchainERC20.contract.Call(opts, &out, "balanceOf", owner)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20Session) BalanceOf(owner common.Address) (*big.Int, error) {
	return _SuperchainERC20.Contract.BalanceOf(&_SuperchainERC20.CallOpts, owner)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20CallerSession) BalanceOf(owner common.Address) (*big.Int, error) {
	return _SuperchainERC20.Contract.BalanceOf(&_SuperchainERC20.CallOpts, owner)
}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() view returns(uint8)
func (_SuperchainERC20 *SuperchainERC20Caller) Decimals(opts *bind.CallOpts) (uint8, error) {
	var out []interface{}
	err := _SuperchainERC20.contract.Call(opts, &out, "decimals")

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() view returns(uint8)
func (_SuperchainERC20 *SuperchainERC20Session) Decimals() (uint8, error) {
	return _SuperchainERC20.Contract.Decimals(&_SuperchainERC20.CallOpts)
}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() view returns(uint8)
func (_SuperchainERC20 *SuperchainERC20CallerSession) Decimals() (uint8, error) {
	return _SuperchainERC20.Contract.Decimals(&_SuperchainERC20.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_SuperchainERC20 *SuperchainERC20Caller) Name(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SuperchainERC20.contract.Call(opts, &out, "name")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_SuperchainERC20 *SuperchainERC20Session) Name() (string, error) {
	return _SuperchainERC20.Contract.Name(&_SuperchainERC20.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_SuperchainERC20 *SuperchainERC20CallerSession) Name() (string, error) {
	return _SuperchainERC20.Contract.Name(&_SuperchainERC20.CallOpts)
}

// Nonces is a free data retrieval call binding the contract method 0x7ecebe00.
//
// Solidity: function nonces(address owner) view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20Caller) Nonces(opts *bind.CallOpts, owner common.Address) (*big.Int, error) {
	var out []interface{}
	err := _SuperchainERC20.contract.Call(opts, &out, "nonces", owner)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Nonces is a free data retrieval call binding the contract method 0x7ecebe00.
//
// Solidity: function nonces(address owner) view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20Session) Nonces(owner common.Address) (*big.Int, error) {
	return _SuperchainERC20.Contract.Nonces(&_SuperchainERC20.CallOpts, owner)
}

// Nonces is a free data retrieval call binding the contract method 0x7ecebe00.
//
// Solidity: function nonces(address owner) view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20CallerSession) Nonces(owner common.Address) (*big.Int, error) {
	return _SuperchainERC20.Contract.Nonces(&_SuperchainERC20.CallOpts, owner)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_SuperchainERC20 *SuperchainERC20Caller) Symbol(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SuperchainERC20.contract.Call(opts, &out, "symbol")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_SuperchainERC20 *SuperchainERC20Session) Symbol() (string, error) {
	return _SuperchainERC20.Contract.Symbol(&_SuperchainERC20.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_SuperchainERC20 *SuperchainERC20CallerSession) Symbol() (string, error) {
	return _SuperchainERC20.Contract.Symbol(&_SuperchainERC20.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20Caller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _SuperchainERC20.contract.Call(opts, &out, "totalSupply")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20Session) TotalSupply() (*big.Int, error) {
	return _SuperchainERC20.Contract.TotalSupply(&_SuperchainERC20.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256 result)
func (_SuperchainERC20 *SuperchainERC20CallerSession) TotalSupply() (*big.Int, error) {
	return _SuperchainERC20.Contract.TotalSupply(&_SuperchainERC20.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainERC20 *SuperchainERC20Caller) Version(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SuperchainERC20.contract.Call(opts, &out, "version")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainERC20 *SuperchainERC20Session) Version() (string, error) {
	return _SuperchainERC20.Contract.Version(&_SuperchainERC20.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainERC20 *SuperchainERC20CallerSession) Version() (string, error) {
	return _SuperchainERC20.Contract.Version(&_SuperchainERC20.CallOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address spender, uint256 amount) returns(bool)
func (_SuperchainERC20 *SuperchainERC20Transactor) Approve(opts *bind.TransactOpts, spender common.Address, amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.contract.Transact(opts, "approve", spender, amount)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address spender, uint256 amount) returns(bool)
func (_SuperchainERC20 *SuperchainERC20Session) Approve(spender common.Address, amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.Approve(&_SuperchainERC20.TransactOpts, spender, amount)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address spender, uint256 amount) returns(bool)
func (_SuperchainERC20 *SuperchainERC20TransactorSession) Approve(spender common.Address, amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.Approve(&_SuperchainERC20.TransactOpts, spender, amount)
}

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_SuperchainERC20 *SuperchainERC20Transactor) CrosschainBurn(opts *bind.TransactOpts, _from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.contract.Transact(opts, "crosschainBurn", _from, _amount)
}

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_SuperchainERC20 *SuperchainERC20Session) CrosschainBurn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.CrosschainBurn(&_SuperchainERC20.TransactOpts, _from, _amount)
}

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_SuperchainERC20 *SuperchainERC20TransactorSession) CrosschainBurn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.CrosschainBurn(&_SuperchainERC20.TransactOpts, _from, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_SuperchainERC20 *SuperchainERC20Transactor) CrosschainMint(opts *bind.TransactOpts, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.contract.Transact(opts, "crosschainMint", _to, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_SuperchainERC20 *SuperchainERC20Session) CrosschainMint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.CrosschainMint(&_SuperchainERC20.TransactOpts, _to, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_SuperchainERC20 *SuperchainERC20TransactorSession) CrosschainMint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.CrosschainMint(&_SuperchainERC20.TransactOpts, _to, _amount)
}

// Permit is a paid mutator transaction binding the contract method 0xd505accf.
//
// Solidity: function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns()
func (_SuperchainERC20 *SuperchainERC20Transactor) Permit(opts *bind.TransactOpts, owner common.Address, spender common.Address, value *big.Int, deadline *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _SuperchainERC20.contract.Transact(opts, "permit", owner, spender, value, deadline, v, r, s)
}

// Permit is a paid mutator transaction binding the contract method 0xd505accf.
//
// Solidity: function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns()
func (_SuperchainERC20 *SuperchainERC20Session) Permit(owner common.Address, spender common.Address, value *big.Int, deadline *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.Permit(&_SuperchainERC20.TransactOpts, owner, spender, value, deadline, v, r, s)
}

// Permit is a paid mutator transaction binding the contract method 0xd505accf.
//
// Solidity: function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns()
func (_SuperchainERC20 *SuperchainERC20TransactorSession) Permit(owner common.Address, spender common.Address, value *big.Int, deadline *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.Permit(&_SuperchainERC20.TransactOpts, owner, spender, value, deadline, v, r, s)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address to, uint256 amount) returns(bool)
func (_SuperchainERC20 *SuperchainERC20Transactor) Transfer(opts *bind.TransactOpts, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.contract.Transact(opts, "transfer", to, amount)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address to, uint256 amount) returns(bool)
func (_SuperchainERC20 *SuperchainERC20Session) Transfer(to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.Transfer(&_SuperchainERC20.TransactOpts, to, amount)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address to, uint256 amount) returns(bool)
func (_SuperchainERC20 *SuperchainERC20TransactorSession) Transfer(to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.Transfer(&_SuperchainERC20.TransactOpts, to, amount)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 amount) returns(bool)
func (_SuperchainERC20 *SuperchainERC20Transactor) TransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.contract.Transact(opts, "transferFrom", from, to, amount)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 amount) returns(bool)
func (_SuperchainERC20 *SuperchainERC20Session) TransferFrom(from common.Address, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.TransferFrom(&_SuperchainERC20.TransactOpts, from, to, amount)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 amount) returns(bool)
func (_SuperchainERC20 *SuperchainERC20TransactorSession) TransferFrom(from common.Address, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _SuperchainERC20.Contract.TransferFrom(&_SuperchainERC20.TransactOpts, from, to, amount)
}

// SuperchainERC20ApprovalIterator is returned from FilterApproval and is used to iterate over the raw logs and unpacked data for Approval events raised by the SuperchainERC20 contract.
type SuperchainERC20ApprovalIterator struct {
	Event *SuperchainERC20Approval // Event containing the contract specifics and raw log

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
func (it *SuperchainERC20ApprovalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainERC20Approval)
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
		it.Event = new(SuperchainERC20Approval)
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
func (it *SuperchainERC20ApprovalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainERC20ApprovalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainERC20Approval represents a Approval event raised by the SuperchainERC20 contract.
type SuperchainERC20Approval struct {
	Owner   common.Address
	Spender common.Address
	Amount  *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterApproval is a free log retrieval operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed owner, address indexed spender, uint256 amount)
func (_SuperchainERC20 *SuperchainERC20Filterer) FilterApproval(opts *bind.FilterOpts, owner []common.Address, spender []common.Address) (*SuperchainERC20ApprovalIterator, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _SuperchainERC20.contract.FilterLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainERC20ApprovalIterator{contract: _SuperchainERC20.contract, event: "Approval", logs: logs, sub: sub}, nil
}

// WatchApproval is a free log subscription operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed owner, address indexed spender, uint256 amount)
func (_SuperchainERC20 *SuperchainERC20Filterer) WatchApproval(opts *bind.WatchOpts, sink chan<- *SuperchainERC20Approval, owner []common.Address, spender []common.Address) (event.Subscription, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _SuperchainERC20.contract.WatchLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainERC20Approval)
				if err := _SuperchainERC20.contract.UnpackLog(event, "Approval", log); err != nil {
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
func (_SuperchainERC20 *SuperchainERC20Filterer) ParseApproval(log types.Log) (*SuperchainERC20Approval, error) {
	event := new(SuperchainERC20Approval)
	if err := _SuperchainERC20.contract.UnpackLog(event, "Approval", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SuperchainERC20CrosschainBurntIterator is returned from FilterCrosschainBurnt and is used to iterate over the raw logs and unpacked data for CrosschainBurnt events raised by the SuperchainERC20 contract.
type SuperchainERC20CrosschainBurntIterator struct {
	Event *SuperchainERC20CrosschainBurnt // Event containing the contract specifics and raw log

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
func (it *SuperchainERC20CrosschainBurntIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainERC20CrosschainBurnt)
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
		it.Event = new(SuperchainERC20CrosschainBurnt)
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
func (it *SuperchainERC20CrosschainBurntIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainERC20CrosschainBurntIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainERC20CrosschainBurnt represents a CrosschainBurnt event raised by the SuperchainERC20 contract.
type SuperchainERC20CrosschainBurnt struct {
	From   common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterCrosschainBurnt is a free log retrieval operation binding the contract event 0x42bc6459057d74f6803939f81a66ca58f6945d62ede921af8b62bdacd5d34cfa.
//
// Solidity: event CrosschainBurnt(address indexed from, uint256 amount)
func (_SuperchainERC20 *SuperchainERC20Filterer) FilterCrosschainBurnt(opts *bind.FilterOpts, from []common.Address) (*SuperchainERC20CrosschainBurntIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _SuperchainERC20.contract.FilterLogs(opts, "CrosschainBurnt", fromRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainERC20CrosschainBurntIterator{contract: _SuperchainERC20.contract, event: "CrosschainBurnt", logs: logs, sub: sub}, nil
}

// WatchCrosschainBurnt is a free log subscription operation binding the contract event 0x42bc6459057d74f6803939f81a66ca58f6945d62ede921af8b62bdacd5d34cfa.
//
// Solidity: event CrosschainBurnt(address indexed from, uint256 amount)
func (_SuperchainERC20 *SuperchainERC20Filterer) WatchCrosschainBurnt(opts *bind.WatchOpts, sink chan<- *SuperchainERC20CrosschainBurnt, from []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _SuperchainERC20.contract.WatchLogs(opts, "CrosschainBurnt", fromRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainERC20CrosschainBurnt)
				if err := _SuperchainERC20.contract.UnpackLog(event, "CrosschainBurnt", log); err != nil {
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
func (_SuperchainERC20 *SuperchainERC20Filterer) ParseCrosschainBurnt(log types.Log) (*SuperchainERC20CrosschainBurnt, error) {
	event := new(SuperchainERC20CrosschainBurnt)
	if err := _SuperchainERC20.contract.UnpackLog(event, "CrosschainBurnt", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SuperchainERC20CrosschainMintedIterator is returned from FilterCrosschainMinted and is used to iterate over the raw logs and unpacked data for CrosschainMinted events raised by the SuperchainERC20 contract.
type SuperchainERC20CrosschainMintedIterator struct {
	Event *SuperchainERC20CrosschainMinted // Event containing the contract specifics and raw log

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
func (it *SuperchainERC20CrosschainMintedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainERC20CrosschainMinted)
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
		it.Event = new(SuperchainERC20CrosschainMinted)
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
func (it *SuperchainERC20CrosschainMintedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainERC20CrosschainMintedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainERC20CrosschainMinted represents a CrosschainMinted event raised by the SuperchainERC20 contract.
type SuperchainERC20CrosschainMinted struct {
	To     common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterCrosschainMinted is a free log retrieval operation binding the contract event 0xfd9e93ea79c50872b16c8a46b0601df4cce15f00c77b81ce46e474f6ae0512dd.
//
// Solidity: event CrosschainMinted(address indexed to, uint256 amount)
func (_SuperchainERC20 *SuperchainERC20Filterer) FilterCrosschainMinted(opts *bind.FilterOpts, to []common.Address) (*SuperchainERC20CrosschainMintedIterator, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainERC20.contract.FilterLogs(opts, "CrosschainMinted", toRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainERC20CrosschainMintedIterator{contract: _SuperchainERC20.contract, event: "CrosschainMinted", logs: logs, sub: sub}, nil
}

// WatchCrosschainMinted is a free log subscription operation binding the contract event 0xfd9e93ea79c50872b16c8a46b0601df4cce15f00c77b81ce46e474f6ae0512dd.
//
// Solidity: event CrosschainMinted(address indexed to, uint256 amount)
func (_SuperchainERC20 *SuperchainERC20Filterer) WatchCrosschainMinted(opts *bind.WatchOpts, sink chan<- *SuperchainERC20CrosschainMinted, to []common.Address) (event.Subscription, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainERC20.contract.WatchLogs(opts, "CrosschainMinted", toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainERC20CrosschainMinted)
				if err := _SuperchainERC20.contract.UnpackLog(event, "CrosschainMinted", log); err != nil {
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
func (_SuperchainERC20 *SuperchainERC20Filterer) ParseCrosschainMinted(log types.Log) (*SuperchainERC20CrosschainMinted, error) {
	event := new(SuperchainERC20CrosschainMinted)
	if err := _SuperchainERC20.contract.UnpackLog(event, "CrosschainMinted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SuperchainERC20TransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the SuperchainERC20 contract.
type SuperchainERC20TransferIterator struct {
	Event *SuperchainERC20Transfer // Event containing the contract specifics and raw log

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
func (it *SuperchainERC20TransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainERC20Transfer)
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
		it.Event = new(SuperchainERC20Transfer)
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
func (it *SuperchainERC20TransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainERC20TransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainERC20Transfer represents a Transfer event raised by the SuperchainERC20 contract.
type SuperchainERC20Transfer struct {
	From   common.Address
	To     common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed from, address indexed to, uint256 amount)
func (_SuperchainERC20 *SuperchainERC20Filterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*SuperchainERC20TransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainERC20.contract.FilterLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainERC20TransferIterator{contract: _SuperchainERC20.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed from, address indexed to, uint256 amount)
func (_SuperchainERC20 *SuperchainERC20Filterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *SuperchainERC20Transfer, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainERC20.contract.WatchLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainERC20Transfer)
				if err := _SuperchainERC20.contract.UnpackLog(event, "Transfer", log); err != nil {
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
func (_SuperchainERC20 *SuperchainERC20Filterer) ParseTransfer(log types.Log) (*SuperchainERC20Transfer, error) {
	event := new(SuperchainERC20Transfer)
	if err := _SuperchainERC20.contract.UnpackLog(event, "Transfer", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
