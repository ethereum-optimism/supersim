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

// L2NativeSuperchainERC20MetaData contains all meta data concerning the L2NativeSuperchainERC20 contract.
var L2NativeSuperchainERC20MetaData = &bind.MetaData{
	ABI: "[{\"type\":\"function\",\"name\":\"DOMAIN_SEPARATOR\",\"inputs\":[],\"outputs\":[{\"name\":\"result\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"allowance\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"spender\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"approve\",\"inputs\":[{\"name\":\"spender\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"balanceOf\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"burn\",\"inputs\":[{\"name\":\"_from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"crosschainBurn\",\"inputs\":[{\"name\":\"_from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"crosschainMint\",\"inputs\":[{\"name\":\"_to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"decimals\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint8\",\"internalType\":\"uint8\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"mint\",\"inputs\":[{\"name\":\"_to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"name\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"nonces\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"}],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"permit\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"spender\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"value\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"deadline\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"v\",\"type\":\"uint8\",\"internalType\":\"uint8\"},{\"name\":\"r\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"s\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"symbol\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"pure\"},{\"type\":\"function\",\"name\":\"totalSupply\",\"inputs\":[],\"outputs\":[{\"name\":\"result\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"transfer\",\"inputs\":[{\"name\":\"to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"transferFrom\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bool\",\"internalType\":\"bool\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"version\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"event\",\"name\":\"Approval\",\"inputs\":[{\"name\":\"owner\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"spender\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Burn\",\"inputs\":[{\"name\":\"account\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"CrosschainBurn\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"CrosschainMint\",\"inputs\":[{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Mint\",\"inputs\":[{\"name\":\"account\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"Transfer\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"error\",\"name\":\"AllowanceOverflow\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"AllowanceUnderflow\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InsufficientAllowance\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InsufficientBalance\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidPermit\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"Permit2AllowanceIsFixedAtInfinity\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"PermitExpired\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"TotalSupplyOverflow\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"Unauthorized\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ZeroAddress\",\"inputs\":[]}]",
}

// L2NativeSuperchainERC20ABI is the input ABI used to generate the binding from.
// Deprecated: Use L2NativeSuperchainERC20MetaData.ABI instead.
var L2NativeSuperchainERC20ABI = L2NativeSuperchainERC20MetaData.ABI

// L2NativeSuperchainERC20 is an auto generated Go binding around an Ethereum contract.
type L2NativeSuperchainERC20 struct {
	L2NativeSuperchainERC20Caller     // Read-only binding to the contract
	L2NativeSuperchainERC20Transactor // Write-only binding to the contract
	L2NativeSuperchainERC20Filterer   // Log filterer for contract events
}

// L2NativeSuperchainERC20Caller is an auto generated read-only Go binding around an Ethereum contract.
type L2NativeSuperchainERC20Caller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// L2NativeSuperchainERC20Transactor is an auto generated write-only Go binding around an Ethereum contract.
type L2NativeSuperchainERC20Transactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// L2NativeSuperchainERC20Filterer is an auto generated log filtering Go binding around an Ethereum contract events.
type L2NativeSuperchainERC20Filterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// L2NativeSuperchainERC20Session is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type L2NativeSuperchainERC20Session struct {
	Contract     *L2NativeSuperchainERC20 // Generic contract binding to set the session for
	CallOpts     bind.CallOpts            // Call options to use throughout this session
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// L2NativeSuperchainERC20CallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type L2NativeSuperchainERC20CallerSession struct {
	Contract *L2NativeSuperchainERC20Caller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts                  // Call options to use throughout this session
}

// L2NativeSuperchainERC20TransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type L2NativeSuperchainERC20TransactorSession struct {
	Contract     *L2NativeSuperchainERC20Transactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts                  // Transaction auth options to use throughout this session
}

// L2NativeSuperchainERC20Raw is an auto generated low-level Go binding around an Ethereum contract.
type L2NativeSuperchainERC20Raw struct {
	Contract *L2NativeSuperchainERC20 // Generic contract binding to access the raw methods on
}

// L2NativeSuperchainERC20CallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type L2NativeSuperchainERC20CallerRaw struct {
	Contract *L2NativeSuperchainERC20Caller // Generic read-only contract binding to access the raw methods on
}

// L2NativeSuperchainERC20TransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type L2NativeSuperchainERC20TransactorRaw struct {
	Contract *L2NativeSuperchainERC20Transactor // Generic write-only contract binding to access the raw methods on
}

// NewL2NativeSuperchainERC20 creates a new instance of L2NativeSuperchainERC20, bound to a specific deployed contract.
func NewL2NativeSuperchainERC20(address common.Address, backend bind.ContractBackend) (*L2NativeSuperchainERC20, error) {
	contract, err := bindL2NativeSuperchainERC20(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &L2NativeSuperchainERC20{L2NativeSuperchainERC20Caller: L2NativeSuperchainERC20Caller{contract: contract}, L2NativeSuperchainERC20Transactor: L2NativeSuperchainERC20Transactor{contract: contract}, L2NativeSuperchainERC20Filterer: L2NativeSuperchainERC20Filterer{contract: contract}}, nil
}

// NewL2NativeSuperchainERC20Caller creates a new read-only instance of L2NativeSuperchainERC20, bound to a specific deployed contract.
func NewL2NativeSuperchainERC20Caller(address common.Address, caller bind.ContractCaller) (*L2NativeSuperchainERC20Caller, error) {
	contract, err := bindL2NativeSuperchainERC20(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &L2NativeSuperchainERC20Caller{contract: contract}, nil
}

// NewL2NativeSuperchainERC20Transactor creates a new write-only instance of L2NativeSuperchainERC20, bound to a specific deployed contract.
func NewL2NativeSuperchainERC20Transactor(address common.Address, transactor bind.ContractTransactor) (*L2NativeSuperchainERC20Transactor, error) {
	contract, err := bindL2NativeSuperchainERC20(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &L2NativeSuperchainERC20Transactor{contract: contract}, nil
}

// NewL2NativeSuperchainERC20Filterer creates a new log filterer instance of L2NativeSuperchainERC20, bound to a specific deployed contract.
func NewL2NativeSuperchainERC20Filterer(address common.Address, filterer bind.ContractFilterer) (*L2NativeSuperchainERC20Filterer, error) {
	contract, err := bindL2NativeSuperchainERC20(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &L2NativeSuperchainERC20Filterer{contract: contract}, nil
}

// bindL2NativeSuperchainERC20 binds a generic wrapper to an already deployed contract.
func bindL2NativeSuperchainERC20(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := L2NativeSuperchainERC20MetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Raw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _L2NativeSuperchainERC20.Contract.L2NativeSuperchainERC20Caller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Raw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.L2NativeSuperchainERC20Transactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Raw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.L2NativeSuperchainERC20Transactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20CallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _L2NativeSuperchainERC20.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20TransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20TransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.contract.Transact(opts, method, params...)
}

// DOMAINSEPARATOR is a free data retrieval call binding the contract method 0x3644e515.
//
// Solidity: function DOMAIN_SEPARATOR() view returns(bytes32 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Caller) DOMAINSEPARATOR(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _L2NativeSuperchainERC20.contract.Call(opts, &out, "DOMAIN_SEPARATOR")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// DOMAINSEPARATOR is a free data retrieval call binding the contract method 0x3644e515.
//
// Solidity: function DOMAIN_SEPARATOR() view returns(bytes32 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) DOMAINSEPARATOR() ([32]byte, error) {
	return _L2NativeSuperchainERC20.Contract.DOMAINSEPARATOR(&_L2NativeSuperchainERC20.CallOpts)
}

// DOMAINSEPARATOR is a free data retrieval call binding the contract method 0x3644e515.
//
// Solidity: function DOMAIN_SEPARATOR() view returns(bytes32 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20CallerSession) DOMAINSEPARATOR() ([32]byte, error) {
	return _L2NativeSuperchainERC20.Contract.DOMAINSEPARATOR(&_L2NativeSuperchainERC20.CallOpts)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address owner, address spender) view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Caller) Allowance(opts *bind.CallOpts, owner common.Address, spender common.Address) (*big.Int, error) {
	var out []interface{}
	err := _L2NativeSuperchainERC20.contract.Call(opts, &out, "allowance", owner, spender)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address owner, address spender) view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) Allowance(owner common.Address, spender common.Address) (*big.Int, error) {
	return _L2NativeSuperchainERC20.Contract.Allowance(&_L2NativeSuperchainERC20.CallOpts, owner, spender)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(address owner, address spender) view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20CallerSession) Allowance(owner common.Address, spender common.Address) (*big.Int, error) {
	return _L2NativeSuperchainERC20.Contract.Allowance(&_L2NativeSuperchainERC20.CallOpts, owner, spender)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Caller) BalanceOf(opts *bind.CallOpts, owner common.Address) (*big.Int, error) {
	var out []interface{}
	err := _L2NativeSuperchainERC20.contract.Call(opts, &out, "balanceOf", owner)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) BalanceOf(owner common.Address) (*big.Int, error) {
	return _L2NativeSuperchainERC20.Contract.BalanceOf(&_L2NativeSuperchainERC20.CallOpts, owner)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20CallerSession) BalanceOf(owner common.Address) (*big.Int, error) {
	return _L2NativeSuperchainERC20.Contract.BalanceOf(&_L2NativeSuperchainERC20.CallOpts, owner)
}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() pure returns(uint8)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Caller) Decimals(opts *bind.CallOpts) (uint8, error) {
	var out []interface{}
	err := _L2NativeSuperchainERC20.contract.Call(opts, &out, "decimals")

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() pure returns(uint8)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) Decimals() (uint8, error) {
	return _L2NativeSuperchainERC20.Contract.Decimals(&_L2NativeSuperchainERC20.CallOpts)
}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() pure returns(uint8)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20CallerSession) Decimals() (uint8, error) {
	return _L2NativeSuperchainERC20.Contract.Decimals(&_L2NativeSuperchainERC20.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() pure returns(string)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Caller) Name(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _L2NativeSuperchainERC20.contract.Call(opts, &out, "name")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() pure returns(string)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) Name() (string, error) {
	return _L2NativeSuperchainERC20.Contract.Name(&_L2NativeSuperchainERC20.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() pure returns(string)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20CallerSession) Name() (string, error) {
	return _L2NativeSuperchainERC20.Contract.Name(&_L2NativeSuperchainERC20.CallOpts)
}

// Nonces is a free data retrieval call binding the contract method 0x7ecebe00.
//
// Solidity: function nonces(address owner) view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Caller) Nonces(opts *bind.CallOpts, owner common.Address) (*big.Int, error) {
	var out []interface{}
	err := _L2NativeSuperchainERC20.contract.Call(opts, &out, "nonces", owner)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Nonces is a free data retrieval call binding the contract method 0x7ecebe00.
//
// Solidity: function nonces(address owner) view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) Nonces(owner common.Address) (*big.Int, error) {
	return _L2NativeSuperchainERC20.Contract.Nonces(&_L2NativeSuperchainERC20.CallOpts, owner)
}

// Nonces is a free data retrieval call binding the contract method 0x7ecebe00.
//
// Solidity: function nonces(address owner) view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20CallerSession) Nonces(owner common.Address) (*big.Int, error) {
	return _L2NativeSuperchainERC20.Contract.Nonces(&_L2NativeSuperchainERC20.CallOpts, owner)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() pure returns(string)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Caller) Symbol(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _L2NativeSuperchainERC20.contract.Call(opts, &out, "symbol")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() pure returns(string)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) Symbol() (string, error) {
	return _L2NativeSuperchainERC20.Contract.Symbol(&_L2NativeSuperchainERC20.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() pure returns(string)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20CallerSession) Symbol() (string, error) {
	return _L2NativeSuperchainERC20.Contract.Symbol(&_L2NativeSuperchainERC20.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Caller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _L2NativeSuperchainERC20.contract.Call(opts, &out, "totalSupply")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) TotalSupply() (*big.Int, error) {
	return _L2NativeSuperchainERC20.Contract.TotalSupply(&_L2NativeSuperchainERC20.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256 result)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20CallerSession) TotalSupply() (*big.Int, error) {
	return _L2NativeSuperchainERC20.Contract.TotalSupply(&_L2NativeSuperchainERC20.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Caller) Version(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _L2NativeSuperchainERC20.contract.Call(opts, &out, "version")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) Version() (string, error) {
	return _L2NativeSuperchainERC20.Contract.Version(&_L2NativeSuperchainERC20.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20CallerSession) Version() (string, error) {
	return _L2NativeSuperchainERC20.Contract.Version(&_L2NativeSuperchainERC20.CallOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address spender, uint256 amount) returns(bool)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Transactor) Approve(opts *bind.TransactOpts, spender common.Address, amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.contract.Transact(opts, "approve", spender, amount)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address spender, uint256 amount) returns(bool)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) Approve(spender common.Address, amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.Approve(&_L2NativeSuperchainERC20.TransactOpts, spender, amount)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address spender, uint256 amount) returns(bool)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20TransactorSession) Approve(spender common.Address, amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.Approve(&_L2NativeSuperchainERC20.TransactOpts, spender, amount)
}

// Burn is a paid mutator transaction binding the contract method 0x9dc29fac.
//
// Solidity: function burn(address _from, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Transactor) Burn(opts *bind.TransactOpts, _from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.contract.Transact(opts, "burn", _from, _amount)
}

// Burn is a paid mutator transaction binding the contract method 0x9dc29fac.
//
// Solidity: function burn(address _from, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) Burn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.Burn(&_L2NativeSuperchainERC20.TransactOpts, _from, _amount)
}

// Burn is a paid mutator transaction binding the contract method 0x9dc29fac.
//
// Solidity: function burn(address _from, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20TransactorSession) Burn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.Burn(&_L2NativeSuperchainERC20.TransactOpts, _from, _amount)
}

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Transactor) CrosschainBurn(opts *bind.TransactOpts, _from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.contract.Transact(opts, "crosschainBurn", _from, _amount)
}

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) CrosschainBurn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.CrosschainBurn(&_L2NativeSuperchainERC20.TransactOpts, _from, _amount)
}

// CrosschainBurn is a paid mutator transaction binding the contract method 0x2b8c49e3.
//
// Solidity: function crosschainBurn(address _from, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20TransactorSession) CrosschainBurn(_from common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.CrosschainBurn(&_L2NativeSuperchainERC20.TransactOpts, _from, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Transactor) CrosschainMint(opts *bind.TransactOpts, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.contract.Transact(opts, "crosschainMint", _to, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) CrosschainMint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.CrosschainMint(&_L2NativeSuperchainERC20.TransactOpts, _to, _amount)
}

// CrosschainMint is a paid mutator transaction binding the contract method 0x18bf5077.
//
// Solidity: function crosschainMint(address _to, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20TransactorSession) CrosschainMint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.CrosschainMint(&_L2NativeSuperchainERC20.TransactOpts, _to, _amount)
}

// Mint is a paid mutator transaction binding the contract method 0x40c10f19.
//
// Solidity: function mint(address _to, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Transactor) Mint(opts *bind.TransactOpts, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.contract.Transact(opts, "mint", _to, _amount)
}

// Mint is a paid mutator transaction binding the contract method 0x40c10f19.
//
// Solidity: function mint(address _to, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) Mint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.Mint(&_L2NativeSuperchainERC20.TransactOpts, _to, _amount)
}

// Mint is a paid mutator transaction binding the contract method 0x40c10f19.
//
// Solidity: function mint(address _to, uint256 _amount) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20TransactorSession) Mint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.Mint(&_L2NativeSuperchainERC20.TransactOpts, _to, _amount)
}

// Permit is a paid mutator transaction binding the contract method 0xd505accf.
//
// Solidity: function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Transactor) Permit(opts *bind.TransactOpts, owner common.Address, spender common.Address, value *big.Int, deadline *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.contract.Transact(opts, "permit", owner, spender, value, deadline, v, r, s)
}

// Permit is a paid mutator transaction binding the contract method 0xd505accf.
//
// Solidity: function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) Permit(owner common.Address, spender common.Address, value *big.Int, deadline *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.Permit(&_L2NativeSuperchainERC20.TransactOpts, owner, spender, value, deadline, v, r, s)
}

// Permit is a paid mutator transaction binding the contract method 0xd505accf.
//
// Solidity: function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns()
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20TransactorSession) Permit(owner common.Address, spender common.Address, value *big.Int, deadline *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.Permit(&_L2NativeSuperchainERC20.TransactOpts, owner, spender, value, deadline, v, r, s)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address to, uint256 amount) returns(bool)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Transactor) Transfer(opts *bind.TransactOpts, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.contract.Transact(opts, "transfer", to, amount)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address to, uint256 amount) returns(bool)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) Transfer(to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.Transfer(&_L2NativeSuperchainERC20.TransactOpts, to, amount)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(address to, uint256 amount) returns(bool)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20TransactorSession) Transfer(to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.Transfer(&_L2NativeSuperchainERC20.TransactOpts, to, amount)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 amount) returns(bool)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Transactor) TransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.contract.Transact(opts, "transferFrom", from, to, amount)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 amount) returns(bool)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Session) TransferFrom(from common.Address, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.TransferFrom(&_L2NativeSuperchainERC20.TransactOpts, from, to, amount)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 amount) returns(bool)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20TransactorSession) TransferFrom(from common.Address, to common.Address, amount *big.Int) (*types.Transaction, error) {
	return _L2NativeSuperchainERC20.Contract.TransferFrom(&_L2NativeSuperchainERC20.TransactOpts, from, to, amount)
}

// L2NativeSuperchainERC20ApprovalIterator is returned from FilterApproval and is used to iterate over the raw logs and unpacked data for Approval events raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20ApprovalIterator struct {
	Event *L2NativeSuperchainERC20Approval // Event containing the contract specifics and raw log

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
func (it *L2NativeSuperchainERC20ApprovalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(L2NativeSuperchainERC20Approval)
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
		it.Event = new(L2NativeSuperchainERC20Approval)
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
func (it *L2NativeSuperchainERC20ApprovalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *L2NativeSuperchainERC20ApprovalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// L2NativeSuperchainERC20Approval represents a Approval event raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20Approval struct {
	Owner   common.Address
	Spender common.Address
	Amount  *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterApproval is a free log retrieval operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed owner, address indexed spender, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) FilterApproval(opts *bind.FilterOpts, owner []common.Address, spender []common.Address) (*L2NativeSuperchainERC20ApprovalIterator, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.FilterLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return &L2NativeSuperchainERC20ApprovalIterator{contract: _L2NativeSuperchainERC20.contract, event: "Approval", logs: logs, sub: sub}, nil
}

// WatchApproval is a free log subscription operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed owner, address indexed spender, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) WatchApproval(opts *bind.WatchOpts, sink chan<- *L2NativeSuperchainERC20Approval, owner []common.Address, spender []common.Address) (event.Subscription, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.WatchLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(L2NativeSuperchainERC20Approval)
				if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "Approval", log); err != nil {
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
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) ParseApproval(log types.Log) (*L2NativeSuperchainERC20Approval, error) {
	event := new(L2NativeSuperchainERC20Approval)
	if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "Approval", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// L2NativeSuperchainERC20BurnIterator is returned from FilterBurn and is used to iterate over the raw logs and unpacked data for Burn events raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20BurnIterator struct {
	Event *L2NativeSuperchainERC20Burn // Event containing the contract specifics and raw log

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
func (it *L2NativeSuperchainERC20BurnIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(L2NativeSuperchainERC20Burn)
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
		it.Event = new(L2NativeSuperchainERC20Burn)
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
func (it *L2NativeSuperchainERC20BurnIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *L2NativeSuperchainERC20BurnIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// L2NativeSuperchainERC20Burn represents a Burn event raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20Burn struct {
	Account common.Address
	Amount  *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterBurn is a free log retrieval operation binding the contract event 0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5.
//
// Solidity: event Burn(address indexed account, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) FilterBurn(opts *bind.FilterOpts, account []common.Address) (*L2NativeSuperchainERC20BurnIterator, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.FilterLogs(opts, "Burn", accountRule)
	if err != nil {
		return nil, err
	}
	return &L2NativeSuperchainERC20BurnIterator{contract: _L2NativeSuperchainERC20.contract, event: "Burn", logs: logs, sub: sub}, nil
}

// WatchBurn is a free log subscription operation binding the contract event 0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5.
//
// Solidity: event Burn(address indexed account, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) WatchBurn(opts *bind.WatchOpts, sink chan<- *L2NativeSuperchainERC20Burn, account []common.Address) (event.Subscription, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.WatchLogs(opts, "Burn", accountRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(L2NativeSuperchainERC20Burn)
				if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "Burn", log); err != nil {
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
// Solidity: event Burn(address indexed account, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) ParseBurn(log types.Log) (*L2NativeSuperchainERC20Burn, error) {
	event := new(L2NativeSuperchainERC20Burn)
	if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "Burn", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// L2NativeSuperchainERC20CrosschainBurnIterator is returned from FilterCrosschainBurn and is used to iterate over the raw logs and unpacked data for CrosschainBurn events raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20CrosschainBurnIterator struct {
	Event *L2NativeSuperchainERC20CrosschainBurn // Event containing the contract specifics and raw log

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
func (it *L2NativeSuperchainERC20CrosschainBurnIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(L2NativeSuperchainERC20CrosschainBurn)
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
		it.Event = new(L2NativeSuperchainERC20CrosschainBurn)
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
func (it *L2NativeSuperchainERC20CrosschainBurnIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *L2NativeSuperchainERC20CrosschainBurnIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// L2NativeSuperchainERC20CrosschainBurn represents a CrosschainBurn event raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20CrosschainBurn struct {
	From   common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterCrosschainBurn is a free log retrieval operation binding the contract event 0x017c33ab728c93e2be949ec7e4a35b76d607957c5fac4253f5d623b4a3b13036.
//
// Solidity: event CrosschainBurn(address indexed from, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) FilterCrosschainBurn(opts *bind.FilterOpts, from []common.Address) (*L2NativeSuperchainERC20CrosschainBurnIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.FilterLogs(opts, "CrosschainBurn", fromRule)
	if err != nil {
		return nil, err
	}
	return &L2NativeSuperchainERC20CrosschainBurnIterator{contract: _L2NativeSuperchainERC20.contract, event: "CrosschainBurn", logs: logs, sub: sub}, nil
}

// WatchCrosschainBurn is a free log subscription operation binding the contract event 0x017c33ab728c93e2be949ec7e4a35b76d607957c5fac4253f5d623b4a3b13036.
//
// Solidity: event CrosschainBurn(address indexed from, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) WatchCrosschainBurn(opts *bind.WatchOpts, sink chan<- *L2NativeSuperchainERC20CrosschainBurn, from []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.WatchLogs(opts, "CrosschainBurn", fromRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(L2NativeSuperchainERC20CrosschainBurn)
				if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "CrosschainBurn", log); err != nil {
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

// ParseCrosschainBurn is a log parse operation binding the contract event 0x017c33ab728c93e2be949ec7e4a35b76d607957c5fac4253f5d623b4a3b13036.
//
// Solidity: event CrosschainBurn(address indexed from, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) ParseCrosschainBurn(log types.Log) (*L2NativeSuperchainERC20CrosschainBurn, error) {
	event := new(L2NativeSuperchainERC20CrosschainBurn)
	if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "CrosschainBurn", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// L2NativeSuperchainERC20CrosschainMintIterator is returned from FilterCrosschainMint and is used to iterate over the raw logs and unpacked data for CrosschainMint events raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20CrosschainMintIterator struct {
	Event *L2NativeSuperchainERC20CrosschainMint // Event containing the contract specifics and raw log

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
func (it *L2NativeSuperchainERC20CrosschainMintIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(L2NativeSuperchainERC20CrosschainMint)
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
		it.Event = new(L2NativeSuperchainERC20CrosschainMint)
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
func (it *L2NativeSuperchainERC20CrosschainMintIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *L2NativeSuperchainERC20CrosschainMintIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// L2NativeSuperchainERC20CrosschainMint represents a CrosschainMint event raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20CrosschainMint struct {
	To     common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterCrosschainMint is a free log retrieval operation binding the contract event 0x7ca16db12dad0e1c536f8062fd9e2e4fbb3d1a503b59df12a0cfa9f96abf1c59.
//
// Solidity: event CrosschainMint(address indexed to, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) FilterCrosschainMint(opts *bind.FilterOpts, to []common.Address) (*L2NativeSuperchainERC20CrosschainMintIterator, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.FilterLogs(opts, "CrosschainMint", toRule)
	if err != nil {
		return nil, err
	}
	return &L2NativeSuperchainERC20CrosschainMintIterator{contract: _L2NativeSuperchainERC20.contract, event: "CrosschainMint", logs: logs, sub: sub}, nil
}

// WatchCrosschainMint is a free log subscription operation binding the contract event 0x7ca16db12dad0e1c536f8062fd9e2e4fbb3d1a503b59df12a0cfa9f96abf1c59.
//
// Solidity: event CrosschainMint(address indexed to, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) WatchCrosschainMint(opts *bind.WatchOpts, sink chan<- *L2NativeSuperchainERC20CrosschainMint, to []common.Address) (event.Subscription, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.WatchLogs(opts, "CrosschainMint", toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(L2NativeSuperchainERC20CrosschainMint)
				if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "CrosschainMint", log); err != nil {
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

// ParseCrosschainMint is a log parse operation binding the contract event 0x7ca16db12dad0e1c536f8062fd9e2e4fbb3d1a503b59df12a0cfa9f96abf1c59.
//
// Solidity: event CrosschainMint(address indexed to, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) ParseCrosschainMint(log types.Log) (*L2NativeSuperchainERC20CrosschainMint, error) {
	event := new(L2NativeSuperchainERC20CrosschainMint)
	if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "CrosschainMint", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// L2NativeSuperchainERC20MintIterator is returned from FilterMint and is used to iterate over the raw logs and unpacked data for Mint events raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20MintIterator struct {
	Event *L2NativeSuperchainERC20Mint // Event containing the contract specifics and raw log

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
func (it *L2NativeSuperchainERC20MintIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(L2NativeSuperchainERC20Mint)
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
		it.Event = new(L2NativeSuperchainERC20Mint)
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
func (it *L2NativeSuperchainERC20MintIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *L2NativeSuperchainERC20MintIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// L2NativeSuperchainERC20Mint represents a Mint event raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20Mint struct {
	Account common.Address
	Amount  *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterMint is a free log retrieval operation binding the contract event 0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885.
//
// Solidity: event Mint(address indexed account, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) FilterMint(opts *bind.FilterOpts, account []common.Address) (*L2NativeSuperchainERC20MintIterator, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.FilterLogs(opts, "Mint", accountRule)
	if err != nil {
		return nil, err
	}
	return &L2NativeSuperchainERC20MintIterator{contract: _L2NativeSuperchainERC20.contract, event: "Mint", logs: logs, sub: sub}, nil
}

// WatchMint is a free log subscription operation binding the contract event 0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885.
//
// Solidity: event Mint(address indexed account, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) WatchMint(opts *bind.WatchOpts, sink chan<- *L2NativeSuperchainERC20Mint, account []common.Address) (event.Subscription, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.WatchLogs(opts, "Mint", accountRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(L2NativeSuperchainERC20Mint)
				if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "Mint", log); err != nil {
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
// Solidity: event Mint(address indexed account, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) ParseMint(log types.Log) (*L2NativeSuperchainERC20Mint, error) {
	event := new(L2NativeSuperchainERC20Mint)
	if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "Mint", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// L2NativeSuperchainERC20TransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20TransferIterator struct {
	Event *L2NativeSuperchainERC20Transfer // Event containing the contract specifics and raw log

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
func (it *L2NativeSuperchainERC20TransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(L2NativeSuperchainERC20Transfer)
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
		it.Event = new(L2NativeSuperchainERC20Transfer)
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
func (it *L2NativeSuperchainERC20TransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *L2NativeSuperchainERC20TransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// L2NativeSuperchainERC20Transfer represents a Transfer event raised by the L2NativeSuperchainERC20 contract.
type L2NativeSuperchainERC20Transfer struct {
	From   common.Address
	To     common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed from, address indexed to, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*L2NativeSuperchainERC20TransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.FilterLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &L2NativeSuperchainERC20TransferIterator{contract: _L2NativeSuperchainERC20.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed from, address indexed to, uint256 amount)
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *L2NativeSuperchainERC20Transfer, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _L2NativeSuperchainERC20.contract.WatchLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(L2NativeSuperchainERC20Transfer)
				if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "Transfer", log); err != nil {
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
func (_L2NativeSuperchainERC20 *L2NativeSuperchainERC20Filterer) ParseTransfer(log types.Log) (*L2NativeSuperchainERC20Transfer, error) {
	event := new(L2NativeSuperchainERC20Transfer)
	if err := _L2NativeSuperchainERC20.contract.UnpackLog(event, "Transfer", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
