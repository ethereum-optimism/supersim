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

// Identifier is an auto generated low-level Go binding around an user-defined struct.
type Identifier struct {
	Origin      common.Address
	BlockNumber *big.Int
	LogIndex    *big.Int
	Timestamp   *big.Int
	ChainId     *big.Int
}

// CrossL2InboxMetaData contains all meta data concerning the CrossL2Inbox contract.
var CrossL2InboxMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"function\",\"name\":\"blockNumber\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"chainId\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"interopStart\",\"inputs\":[],\"outputs\":[{\"name\":\"interopStart_\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"logIndex\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"origin\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"address\",\"internalType\":\"address\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"setInteropStart\",\"inputs\":[],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"timestamp\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"validateMessage\",\"inputs\":[{\"name\":\"_id\",\"type\":\"tuple\",\"internalType\":\"structIdentifier\",\"components\":[{\"name\":\"origin\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"blockNumber\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"logIndex\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"timestamp\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"chainId\",\"type\":\"uint256\",\"internalType\":\"uint256\"}]},{\"name\":\"_msgHash\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"version\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"event\",\"name\":\"ExecutingMessage\",\"inputs\":[{\"name\":\"msgHash\",\"type\":\"bytes32\",\"indexed\":true,\"internalType\":\"bytes32\"},{\"name\":\"id\",\"type\":\"tuple\",\"indexed\":false,\"internalType\":\"structIdentifier\",\"components\":[{\"name\":\"origin\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"blockNumber\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"logIndex\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"timestamp\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"chainId\",\"type\":\"uint256\",\"internalType\":\"uint256\"}]}],\"anonymous\":false},{\"type\":\"error\",\"name\":\"InteropStartAlreadySet\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"NoExecutingDeposits\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"NotDepositor\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"NotEntered\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ReentrantCall\",\"inputs\":[]}]",
}

// CrossL2InboxABI is the input ABI used to generate the binding from.
// Deprecated: Use CrossL2InboxMetaData.ABI instead.
var CrossL2InboxABI = CrossL2InboxMetaData.ABI

// CrossL2Inbox is an auto generated Go binding around an Ethereum contract.
type CrossL2Inbox struct {
	CrossL2InboxCaller     // Read-only binding to the contract
	CrossL2InboxTransactor // Write-only binding to the contract
	CrossL2InboxFilterer   // Log filterer for contract events
}

// CrossL2InboxCaller is an auto generated read-only Go binding around an Ethereum contract.
type CrossL2InboxCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CrossL2InboxTransactor is an auto generated write-only Go binding around an Ethereum contract.
type CrossL2InboxTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CrossL2InboxFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type CrossL2InboxFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CrossL2InboxSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type CrossL2InboxSession struct {
	Contract     *CrossL2Inbox     // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// CrossL2InboxCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type CrossL2InboxCallerSession struct {
	Contract *CrossL2InboxCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts       // Call options to use throughout this session
}

// CrossL2InboxTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type CrossL2InboxTransactorSession struct {
	Contract     *CrossL2InboxTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts       // Transaction auth options to use throughout this session
}

// CrossL2InboxRaw is an auto generated low-level Go binding around an Ethereum contract.
type CrossL2InboxRaw struct {
	Contract *CrossL2Inbox // Generic contract binding to access the raw methods on
}

// CrossL2InboxCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type CrossL2InboxCallerRaw struct {
	Contract *CrossL2InboxCaller // Generic read-only contract binding to access the raw methods on
}

// CrossL2InboxTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type CrossL2InboxTransactorRaw struct {
	Contract *CrossL2InboxTransactor // Generic write-only contract binding to access the raw methods on
}

// NewCrossL2Inbox creates a new instance of CrossL2Inbox, bound to a specific deployed contract.
func NewCrossL2Inbox(address common.Address, backend bind.ContractBackend) (*CrossL2Inbox, error) {
	contract, err := bindCrossL2Inbox(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &CrossL2Inbox{CrossL2InboxCaller: CrossL2InboxCaller{contract: contract}, CrossL2InboxTransactor: CrossL2InboxTransactor{contract: contract}, CrossL2InboxFilterer: CrossL2InboxFilterer{contract: contract}}, nil
}

// NewCrossL2InboxCaller creates a new read-only instance of CrossL2Inbox, bound to a specific deployed contract.
func NewCrossL2InboxCaller(address common.Address, caller bind.ContractCaller) (*CrossL2InboxCaller, error) {
	contract, err := bindCrossL2Inbox(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &CrossL2InboxCaller{contract: contract}, nil
}

// NewCrossL2InboxTransactor creates a new write-only instance of CrossL2Inbox, bound to a specific deployed contract.
func NewCrossL2InboxTransactor(address common.Address, transactor bind.ContractTransactor) (*CrossL2InboxTransactor, error) {
	contract, err := bindCrossL2Inbox(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &CrossL2InboxTransactor{contract: contract}, nil
}

// NewCrossL2InboxFilterer creates a new log filterer instance of CrossL2Inbox, bound to a specific deployed contract.
func NewCrossL2InboxFilterer(address common.Address, filterer bind.ContractFilterer) (*CrossL2InboxFilterer, error) {
	contract, err := bindCrossL2Inbox(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &CrossL2InboxFilterer{contract: contract}, nil
}

// bindCrossL2Inbox binds a generic wrapper to an already deployed contract.
func bindCrossL2Inbox(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := CrossL2InboxMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CrossL2Inbox *CrossL2InboxRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _CrossL2Inbox.Contract.CrossL2InboxCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CrossL2Inbox *CrossL2InboxRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CrossL2Inbox.Contract.CrossL2InboxTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CrossL2Inbox *CrossL2InboxRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CrossL2Inbox.Contract.CrossL2InboxTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CrossL2Inbox *CrossL2InboxCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _CrossL2Inbox.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CrossL2Inbox *CrossL2InboxTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CrossL2Inbox.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CrossL2Inbox *CrossL2InboxTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CrossL2Inbox.Contract.contract.Transact(opts, method, params...)
}

// BlockNumber is a free data retrieval call binding the contract method 0x57e871e7.
//
// Solidity: function blockNumber() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxCaller) BlockNumber(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _CrossL2Inbox.contract.Call(opts, &out, "blockNumber")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BlockNumber is a free data retrieval call binding the contract method 0x57e871e7.
//
// Solidity: function blockNumber() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxSession) BlockNumber() (*big.Int, error) {
	return _CrossL2Inbox.Contract.BlockNumber(&_CrossL2Inbox.CallOpts)
}

// BlockNumber is a free data retrieval call binding the contract method 0x57e871e7.
//
// Solidity: function blockNumber() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxCallerSession) BlockNumber() (*big.Int, error) {
	return _CrossL2Inbox.Contract.BlockNumber(&_CrossL2Inbox.CallOpts)
}

// ChainId is a free data retrieval call binding the contract method 0x9a8a0592.
//
// Solidity: function chainId() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxCaller) ChainId(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _CrossL2Inbox.contract.Call(opts, &out, "chainId")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// ChainId is a free data retrieval call binding the contract method 0x9a8a0592.
//
// Solidity: function chainId() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxSession) ChainId() (*big.Int, error) {
	return _CrossL2Inbox.Contract.ChainId(&_CrossL2Inbox.CallOpts)
}

// ChainId is a free data retrieval call binding the contract method 0x9a8a0592.
//
// Solidity: function chainId() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxCallerSession) ChainId() (*big.Int, error) {
	return _CrossL2Inbox.Contract.ChainId(&_CrossL2Inbox.CallOpts)
}

// InteropStart is a free data retrieval call binding the contract method 0xb1745ada.
//
// Solidity: function interopStart() view returns(uint256 interopStart_)
func (_CrossL2Inbox *CrossL2InboxCaller) InteropStart(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _CrossL2Inbox.contract.Call(opts, &out, "interopStart")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// InteropStart is a free data retrieval call binding the contract method 0xb1745ada.
//
// Solidity: function interopStart() view returns(uint256 interopStart_)
func (_CrossL2Inbox *CrossL2InboxSession) InteropStart() (*big.Int, error) {
	return _CrossL2Inbox.Contract.InteropStart(&_CrossL2Inbox.CallOpts)
}

// InteropStart is a free data retrieval call binding the contract method 0xb1745ada.
//
// Solidity: function interopStart() view returns(uint256 interopStart_)
func (_CrossL2Inbox *CrossL2InboxCallerSession) InteropStart() (*big.Int, error) {
	return _CrossL2Inbox.Contract.InteropStart(&_CrossL2Inbox.CallOpts)
}

// LogIndex is a free data retrieval call binding the contract method 0xda99f729.
//
// Solidity: function logIndex() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxCaller) LogIndex(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _CrossL2Inbox.contract.Call(opts, &out, "logIndex")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// LogIndex is a free data retrieval call binding the contract method 0xda99f729.
//
// Solidity: function logIndex() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxSession) LogIndex() (*big.Int, error) {
	return _CrossL2Inbox.Contract.LogIndex(&_CrossL2Inbox.CallOpts)
}

// LogIndex is a free data retrieval call binding the contract method 0xda99f729.
//
// Solidity: function logIndex() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxCallerSession) LogIndex() (*big.Int, error) {
	return _CrossL2Inbox.Contract.LogIndex(&_CrossL2Inbox.CallOpts)
}

// Origin is a free data retrieval call binding the contract method 0x938b5f32.
//
// Solidity: function origin() view returns(address)
func (_CrossL2Inbox *CrossL2InboxCaller) Origin(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _CrossL2Inbox.contract.Call(opts, &out, "origin")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Origin is a free data retrieval call binding the contract method 0x938b5f32.
//
// Solidity: function origin() view returns(address)
func (_CrossL2Inbox *CrossL2InboxSession) Origin() (common.Address, error) {
	return _CrossL2Inbox.Contract.Origin(&_CrossL2Inbox.CallOpts)
}

// Origin is a free data retrieval call binding the contract method 0x938b5f32.
//
// Solidity: function origin() view returns(address)
func (_CrossL2Inbox *CrossL2InboxCallerSession) Origin() (common.Address, error) {
	return _CrossL2Inbox.Contract.Origin(&_CrossL2Inbox.CallOpts)
}

// Timestamp is a free data retrieval call binding the contract method 0xb80777ea.
//
// Solidity: function timestamp() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxCaller) Timestamp(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _CrossL2Inbox.contract.Call(opts, &out, "timestamp")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Timestamp is a free data retrieval call binding the contract method 0xb80777ea.
//
// Solidity: function timestamp() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxSession) Timestamp() (*big.Int, error) {
	return _CrossL2Inbox.Contract.Timestamp(&_CrossL2Inbox.CallOpts)
}

// Timestamp is a free data retrieval call binding the contract method 0xb80777ea.
//
// Solidity: function timestamp() view returns(uint256)
func (_CrossL2Inbox *CrossL2InboxCallerSession) Timestamp() (*big.Int, error) {
	return _CrossL2Inbox.Contract.Timestamp(&_CrossL2Inbox.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_CrossL2Inbox *CrossL2InboxCaller) Version(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _CrossL2Inbox.contract.Call(opts, &out, "version")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_CrossL2Inbox *CrossL2InboxSession) Version() (string, error) {
	return _CrossL2Inbox.Contract.Version(&_CrossL2Inbox.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_CrossL2Inbox *CrossL2InboxCallerSession) Version() (string, error) {
	return _CrossL2Inbox.Contract.Version(&_CrossL2Inbox.CallOpts)
}

// SetInteropStart is a paid mutator transaction binding the contract method 0xc8ab72ca.
//
// Solidity: function setInteropStart() returns()
func (_CrossL2Inbox *CrossL2InboxTransactor) SetInteropStart(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CrossL2Inbox.contract.Transact(opts, "setInteropStart")
}

// SetInteropStart is a paid mutator transaction binding the contract method 0xc8ab72ca.
//
// Solidity: function setInteropStart() returns()
func (_CrossL2Inbox *CrossL2InboxSession) SetInteropStart() (*types.Transaction, error) {
	return _CrossL2Inbox.Contract.SetInteropStart(&_CrossL2Inbox.TransactOpts)
}

// SetInteropStart is a paid mutator transaction binding the contract method 0xc8ab72ca.
//
// Solidity: function setInteropStart() returns()
func (_CrossL2Inbox *CrossL2InboxTransactorSession) SetInteropStart() (*types.Transaction, error) {
	return _CrossL2Inbox.Contract.SetInteropStart(&_CrossL2Inbox.TransactOpts)
}

// ValidateMessage is a paid mutator transaction binding the contract method 0xab4d6f75.
//
// Solidity: function validateMessage((address,uint256,uint256,uint256,uint256) _id, bytes32 _msgHash) returns()
func (_CrossL2Inbox *CrossL2InboxTransactor) ValidateMessage(opts *bind.TransactOpts, _id Identifier, _msgHash [32]byte) (*types.Transaction, error) {
	return _CrossL2Inbox.contract.Transact(opts, "validateMessage", _id, _msgHash)
}

// ValidateMessage is a paid mutator transaction binding the contract method 0xab4d6f75.
//
// Solidity: function validateMessage((address,uint256,uint256,uint256,uint256) _id, bytes32 _msgHash) returns()
func (_CrossL2Inbox *CrossL2InboxSession) ValidateMessage(_id Identifier, _msgHash [32]byte) (*types.Transaction, error) {
	return _CrossL2Inbox.Contract.ValidateMessage(&_CrossL2Inbox.TransactOpts, _id, _msgHash)
}

// ValidateMessage is a paid mutator transaction binding the contract method 0xab4d6f75.
//
// Solidity: function validateMessage((address,uint256,uint256,uint256,uint256) _id, bytes32 _msgHash) returns()
func (_CrossL2Inbox *CrossL2InboxTransactorSession) ValidateMessage(_id Identifier, _msgHash [32]byte) (*types.Transaction, error) {
	return _CrossL2Inbox.Contract.ValidateMessage(&_CrossL2Inbox.TransactOpts, _id, _msgHash)
}

// CrossL2InboxExecutingMessageIterator is returned from FilterExecutingMessage and is used to iterate over the raw logs and unpacked data for ExecutingMessage events raised by the CrossL2Inbox contract.
type CrossL2InboxExecutingMessageIterator struct {
	Event *CrossL2InboxExecutingMessage // Event containing the contract specifics and raw log

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
func (it *CrossL2InboxExecutingMessageIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CrossL2InboxExecutingMessage)
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
		it.Event = new(CrossL2InboxExecutingMessage)
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
func (it *CrossL2InboxExecutingMessageIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CrossL2InboxExecutingMessageIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CrossL2InboxExecutingMessage represents a ExecutingMessage event raised by the CrossL2Inbox contract.
type CrossL2InboxExecutingMessage struct {
	MsgHash [32]byte
	Id      Identifier
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterExecutingMessage is a free log retrieval operation binding the contract event 0x5c37832d2e8d10e346e55ad62071a6a2f9fa5130614ef2ec6617555c6f467ba7.
//
// Solidity: event ExecutingMessage(bytes32 indexed msgHash, (address,uint256,uint256,uint256,uint256) id)
func (_CrossL2Inbox *CrossL2InboxFilterer) FilterExecutingMessage(opts *bind.FilterOpts, msgHash [][32]byte) (*CrossL2InboxExecutingMessageIterator, error) {

	var msgHashRule []interface{}
	for _, msgHashItem := range msgHash {
		msgHashRule = append(msgHashRule, msgHashItem)
	}

	logs, sub, err := _CrossL2Inbox.contract.FilterLogs(opts, "ExecutingMessage", msgHashRule)
	if err != nil {
		return nil, err
	}
	return &CrossL2InboxExecutingMessageIterator{contract: _CrossL2Inbox.contract, event: "ExecutingMessage", logs: logs, sub: sub}, nil
}

// WatchExecutingMessage is a free log subscription operation binding the contract event 0x5c37832d2e8d10e346e55ad62071a6a2f9fa5130614ef2ec6617555c6f467ba7.
//
// Solidity: event ExecutingMessage(bytes32 indexed msgHash, (address,uint256,uint256,uint256,uint256) id)
func (_CrossL2Inbox *CrossL2InboxFilterer) WatchExecutingMessage(opts *bind.WatchOpts, sink chan<- *CrossL2InboxExecutingMessage, msgHash [][32]byte) (event.Subscription, error) {

	var msgHashRule []interface{}
	for _, msgHashItem := range msgHash {
		msgHashRule = append(msgHashRule, msgHashItem)
	}

	logs, sub, err := _CrossL2Inbox.contract.WatchLogs(opts, "ExecutingMessage", msgHashRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CrossL2InboxExecutingMessage)
				if err := _CrossL2Inbox.contract.UnpackLog(event, "ExecutingMessage", log); err != nil {
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

// ParseExecutingMessage is a log parse operation binding the contract event 0x5c37832d2e8d10e346e55ad62071a6a2f9fa5130614ef2ec6617555c6f467ba7.
//
// Solidity: event ExecutingMessage(bytes32 indexed msgHash, (address,uint256,uint256,uint256,uint256) id)
func (_CrossL2Inbox *CrossL2InboxFilterer) ParseExecutingMessage(log types.Log) (*CrossL2InboxExecutingMessage, error) {
	event := new(CrossL2InboxExecutingMessage)
	if err := _CrossL2Inbox.contract.UnpackLog(event, "ExecutingMessage", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
