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
)

// SimpleStorageMetaData contains all meta data concerning the SimpleStorage contract.
var SimpleStorageMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"function\",\"name\":\"db\",\"inputs\":[{\"name\":\"\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"get\",\"inputs\":[{\"name\":\"_key\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"set\",\"inputs\":[{\"name\":\"_key\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"_value\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"outputs\":[],\"stateMutability\":\"payable\"}]",
	Bin: "0x6080604052348015600e575f80fd5b5060f38061001b5f395ff3fe608060405260043610602f575f3560e01c80638eaa6ac0146033578063ecf265bc14606c578063f71f7a25146093575b5f80fd5b348015603d575f80fd5b50605a604936600460b1565b5f9081526020819052604090205490565b60405190815260200160405180910390f35b3480156076575f80fd5b50605a608236600460b1565b5f6020819052908152604090205481565b60af609e36600460c7565b5f9182526020829052604090912055565b005b5f6020828403121560c0575f80fd5b5035919050565b5f806040838503121560d7575f80fd5b5050803592602090910135915056fea164736f6c6343000819000a",
}

// SimpleStorageABI is the input ABI used to generate the binding from.
// Deprecated: Use SimpleStorageMetaData.ABI instead.
var SimpleStorageABI = SimpleStorageMetaData.ABI

// SimpleStorageBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use SimpleStorageMetaData.Bin instead.
var SimpleStorageBin = SimpleStorageMetaData.Bin

// DeploySimpleStorage deploys a new Ethereum contract, binding an instance of SimpleStorage to it.
func DeploySimpleStorage(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *SimpleStorage, error) {
	parsed, err := SimpleStorageMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(SimpleStorageBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &SimpleStorage{SimpleStorageCaller: SimpleStorageCaller{contract: contract}, SimpleStorageTransactor: SimpleStorageTransactor{contract: contract}, SimpleStorageFilterer: SimpleStorageFilterer{contract: contract}}, nil
}

// SimpleStorage is an auto generated Go binding around an Ethereum contract.
type SimpleStorage struct {
	SimpleStorageCaller     // Read-only binding to the contract
	SimpleStorageTransactor // Write-only binding to the contract
	SimpleStorageFilterer   // Log filterer for contract events
}

// SimpleStorageCaller is an auto generated read-only Go binding around an Ethereum contract.
type SimpleStorageCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SimpleStorageTransactor is an auto generated write-only Go binding around an Ethereum contract.
type SimpleStorageTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SimpleStorageFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SimpleStorageFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SimpleStorageSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SimpleStorageSession struct {
	Contract     *SimpleStorage    // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SimpleStorageCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SimpleStorageCallerSession struct {
	Contract *SimpleStorageCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts        // Call options to use throughout this session
}

// SimpleStorageTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SimpleStorageTransactorSession struct {
	Contract     *SimpleStorageTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// SimpleStorageRaw is an auto generated low-level Go binding around an Ethereum contract.
type SimpleStorageRaw struct {
	Contract *SimpleStorage // Generic contract binding to access the raw methods on
}

// SimpleStorageCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SimpleStorageCallerRaw struct {
	Contract *SimpleStorageCaller // Generic read-only contract binding to access the raw methods on
}

// SimpleStorageTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SimpleStorageTransactorRaw struct {
	Contract *SimpleStorageTransactor // Generic write-only contract binding to access the raw methods on
}

// NewSimpleStorage creates a new instance of SimpleStorage, bound to a specific deployed contract.
func NewSimpleStorage(address common.Address, backend bind.ContractBackend) (*SimpleStorage, error) {
	contract, err := bindSimpleStorage(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &SimpleStorage{SimpleStorageCaller: SimpleStorageCaller{contract: contract}, SimpleStorageTransactor: SimpleStorageTransactor{contract: contract}, SimpleStorageFilterer: SimpleStorageFilterer{contract: contract}}, nil
}

// NewSimpleStorageCaller creates a new read-only instance of SimpleStorage, bound to a specific deployed contract.
func NewSimpleStorageCaller(address common.Address, caller bind.ContractCaller) (*SimpleStorageCaller, error) {
	contract, err := bindSimpleStorage(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SimpleStorageCaller{contract: contract}, nil
}

// NewSimpleStorageTransactor creates a new write-only instance of SimpleStorage, bound to a specific deployed contract.
func NewSimpleStorageTransactor(address common.Address, transactor bind.ContractTransactor) (*SimpleStorageTransactor, error) {
	contract, err := bindSimpleStorage(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SimpleStorageTransactor{contract: contract}, nil
}

// NewSimpleStorageFilterer creates a new log filterer instance of SimpleStorage, bound to a specific deployed contract.
func NewSimpleStorageFilterer(address common.Address, filterer bind.ContractFilterer) (*SimpleStorageFilterer, error) {
	contract, err := bindSimpleStorage(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SimpleStorageFilterer{contract: contract}, nil
}

// bindSimpleStorage binds a generic wrapper to an already deployed contract.
func bindSimpleStorage(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(SimpleStorageABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SimpleStorage *SimpleStorageRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SimpleStorage.Contract.SimpleStorageCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SimpleStorage *SimpleStorageRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SimpleStorage.Contract.SimpleStorageTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SimpleStorage *SimpleStorageRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SimpleStorage.Contract.SimpleStorageTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SimpleStorage *SimpleStorageCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SimpleStorage.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SimpleStorage *SimpleStorageTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SimpleStorage.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SimpleStorage *SimpleStorageTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SimpleStorage.Contract.contract.Transact(opts, method, params...)
}

// Db is a free data retrieval call binding the contract method 0xecf265bc.
//
// Solidity: function db(bytes32 ) view returns(bytes32)
func (_SimpleStorage *SimpleStorageCaller) Db(opts *bind.CallOpts, arg0 [32]byte) ([32]byte, error) {
	var out []interface{}
	err := _SimpleStorage.contract.Call(opts, &out, "db", arg0)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// Db is a free data retrieval call binding the contract method 0xecf265bc.
//
// Solidity: function db(bytes32 ) view returns(bytes32)
func (_SimpleStorage *SimpleStorageSession) Db(arg0 [32]byte) ([32]byte, error) {
	return _SimpleStorage.Contract.Db(&_SimpleStorage.CallOpts, arg0)
}

// Db is a free data retrieval call binding the contract method 0xecf265bc.
//
// Solidity: function db(bytes32 ) view returns(bytes32)
func (_SimpleStorage *SimpleStorageCallerSession) Db(arg0 [32]byte) ([32]byte, error) {
	return _SimpleStorage.Contract.Db(&_SimpleStorage.CallOpts, arg0)
}

// Get is a free data retrieval call binding the contract method 0x8eaa6ac0.
//
// Solidity: function get(bytes32 _key) view returns(bytes32)
func (_SimpleStorage *SimpleStorageCaller) Get(opts *bind.CallOpts, _key [32]byte) ([32]byte, error) {
	var out []interface{}
	err := _SimpleStorage.contract.Call(opts, &out, "get", _key)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// Get is a free data retrieval call binding the contract method 0x8eaa6ac0.
//
// Solidity: function get(bytes32 _key) view returns(bytes32)
func (_SimpleStorage *SimpleStorageSession) Get(_key [32]byte) ([32]byte, error) {
	return _SimpleStorage.Contract.Get(&_SimpleStorage.CallOpts, _key)
}

// Get is a free data retrieval call binding the contract method 0x8eaa6ac0.
//
// Solidity: function get(bytes32 _key) view returns(bytes32)
func (_SimpleStorage *SimpleStorageCallerSession) Get(_key [32]byte) ([32]byte, error) {
	return _SimpleStorage.Contract.Get(&_SimpleStorage.CallOpts, _key)
}

// Set is a paid mutator transaction binding the contract method 0xf71f7a25.
//
// Solidity: function set(bytes32 _key, bytes32 _value) payable returns()
func (_SimpleStorage *SimpleStorageTransactor) Set(opts *bind.TransactOpts, _key [32]byte, _value [32]byte) (*types.Transaction, error) {
	return _SimpleStorage.contract.Transact(opts, "set", _key, _value)
}

// Set is a paid mutator transaction binding the contract method 0xf71f7a25.
//
// Solidity: function set(bytes32 _key, bytes32 _value) payable returns()
func (_SimpleStorage *SimpleStorageSession) Set(_key [32]byte, _value [32]byte) (*types.Transaction, error) {
	return _SimpleStorage.Contract.Set(&_SimpleStorage.TransactOpts, _key, _value)
}

// Set is a paid mutator transaction binding the contract method 0xf71f7a25.
//
// Solidity: function set(bytes32 _key, bytes32 _value) payable returns()
func (_SimpleStorage *SimpleStorageTransactorSession) Set(_key [32]byte, _value [32]byte) (*types.Transaction, error) {
	return _SimpleStorage.Contract.Set(&_SimpleStorage.TransactOpts, _key, _value)
}
