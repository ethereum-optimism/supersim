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

// PromiseMetaData contains all meta data concerning the Promise contract.
var PromiseMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"function\",\"name\":\"callbacks\",\"inputs\":[{\"name\":\"\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"target\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"selector\",\"type\":\"bytes4\",\"internalType\":\"bytes4\"},{\"name\":\"context\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"dispatchCallbacks\",\"inputs\":[{\"name\":\"_id\",\"type\":\"tuple\",\"internalType\":\"structIdentifier\",\"components\":[{\"name\":\"origin\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"blockNumber\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"logIndex\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"timestamp\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"chainId\",\"type\":\"uint256\",\"internalType\":\"uint256\"}]},{\"name\":\"_payload\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[],\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"handleMessage\",\"inputs\":[{\"name\":\"_nonce\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_target\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_message\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"promiseContext\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"promiseRelayIdentifier\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"tuple\",\"internalType\":\"structIdentifier\",\"components\":[{\"name\":\"origin\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"blockNumber\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"logIndex\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"timestamp\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"chainId\",\"type\":\"uint256\",\"internalType\":\"uint256\"}]}],\"stateMutability\":\"view\"},{\"type\":\"function\",\"name\":\"sendMessage\",\"inputs\":[{\"name\":\"_destination\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_target\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_message\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"then\",\"inputs\":[{\"name\":\"_msgHash\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"_selector\",\"type\":\"bytes4\",\"internalType\":\"bytes4\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"then\",\"inputs\":[{\"name\":\"_msgHash\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"_selector\",\"type\":\"bytes4\",\"internalType\":\"bytes4\"},{\"name\":\"_context\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"event\",\"name\":\"CallbackRegistered\",\"inputs\":[{\"name\":\"messageHash\",\"type\":\"bytes32\",\"indexed\":false,\"internalType\":\"bytes32\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"CallbacksCompleted\",\"inputs\":[{\"name\":\"messageHash\",\"type\":\"bytes32\",\"indexed\":false,\"internalType\":\"bytes32\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"RelayedMessage\",\"inputs\":[{\"name\":\"messageHash\",\"type\":\"bytes32\",\"indexed\":false,\"internalType\":\"bytes32\"},{\"name\":\"returnData\",\"type\":\"bytes\",\"indexed\":false,\"internalType\":\"bytes\"}],\"anonymous\":false},{\"type\":\"error\",\"name\":\"NotEntered\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ReentrantCall\",\"inputs\":[]}]",
}

// PromiseABI is the input ABI used to generate the binding from.
// Deprecated: Use PromiseMetaData.ABI instead.
var PromiseABI = PromiseMetaData.ABI

// Manually Added as this is nto an official predeploy
var PromiseAddr = common.HexToAddress("0xFcdC08d2DFf80DCDf1e954c4759B3316BdE86464")

// Promise is an auto generated Go binding around an Ethereum contract.
type Promise struct {
	PromiseCaller     // Read-only binding to the contract
	PromiseTransactor // Write-only binding to the contract
	PromiseFilterer   // Log filterer for contract events
}

// PromiseCaller is an auto generated read-only Go binding around an Ethereum contract.
type PromiseCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PromiseTransactor is an auto generated write-only Go binding around an Ethereum contract.
type PromiseTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PromiseFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type PromiseFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PromiseSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type PromiseSession struct {
	Contract     *Promise          // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// PromiseCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type PromiseCallerSession struct {
	Contract *PromiseCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts  // Call options to use throughout this session
}

// PromiseTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type PromiseTransactorSession struct {
	Contract     *PromiseTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
}

// PromiseRaw is an auto generated low-level Go binding around an Ethereum contract.
type PromiseRaw struct {
	Contract *Promise // Generic contract binding to access the raw methods on
}

// PromiseCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type PromiseCallerRaw struct {
	Contract *PromiseCaller // Generic read-only contract binding to access the raw methods on
}

// PromiseTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type PromiseTransactorRaw struct {
	Contract *PromiseTransactor // Generic write-only contract binding to access the raw methods on
}

// NewPromise creates a new instance of Promise, bound to a specific deployed contract.
func NewPromise(address common.Address, backend bind.ContractBackend) (*Promise, error) {
	contract, err := bindPromise(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Promise{PromiseCaller: PromiseCaller{contract: contract}, PromiseTransactor: PromiseTransactor{contract: contract}, PromiseFilterer: PromiseFilterer{contract: contract}}, nil
}

// NewPromiseCaller creates a new read-only instance of Promise, bound to a specific deployed contract.
func NewPromiseCaller(address common.Address, caller bind.ContractCaller) (*PromiseCaller, error) {
	contract, err := bindPromise(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &PromiseCaller{contract: contract}, nil
}

// NewPromiseTransactor creates a new write-only instance of Promise, bound to a specific deployed contract.
func NewPromiseTransactor(address common.Address, transactor bind.ContractTransactor) (*PromiseTransactor, error) {
	contract, err := bindPromise(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &PromiseTransactor{contract: contract}, nil
}

// NewPromiseFilterer creates a new log filterer instance of Promise, bound to a specific deployed contract.
func NewPromiseFilterer(address common.Address, filterer bind.ContractFilterer) (*PromiseFilterer, error) {
	contract, err := bindPromise(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &PromiseFilterer{contract: contract}, nil
}

// bindPromise binds a generic wrapper to an already deployed contract.
func bindPromise(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := PromiseMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Promise *PromiseRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Promise.Contract.PromiseCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Promise *PromiseRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Promise.Contract.PromiseTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Promise *PromiseRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Promise.Contract.PromiseTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Promise *PromiseCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Promise.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Promise *PromiseTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Promise.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Promise *PromiseTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Promise.Contract.contract.Transact(opts, method, params...)
}

// Callbacks is a free data retrieval call binding the contract method 0x0838f689.
//
// Solidity: function callbacks(bytes32 , uint256 ) view returns(address target, bytes4 selector, bytes context)
func (_Promise *PromiseCaller) Callbacks(opts *bind.CallOpts, arg0 [32]byte, arg1 *big.Int) (struct {
	Target   common.Address
	Selector [4]byte
	Context  []byte
}, error) {
	var out []interface{}
	err := _Promise.contract.Call(opts, &out, "callbacks", arg0, arg1)

	outstruct := new(struct {
		Target   common.Address
		Selector [4]byte
		Context  []byte
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Target = *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	outstruct.Selector = *abi.ConvertType(out[1], new([4]byte)).(*[4]byte)
	outstruct.Context = *abi.ConvertType(out[2], new([]byte)).(*[]byte)

	return *outstruct, err

}

// Callbacks is a free data retrieval call binding the contract method 0x0838f689.
//
// Solidity: function callbacks(bytes32 , uint256 ) view returns(address target, bytes4 selector, bytes context)
func (_Promise *PromiseSession) Callbacks(arg0 [32]byte, arg1 *big.Int) (struct {
	Target   common.Address
	Selector [4]byte
	Context  []byte
}, error) {
	return _Promise.Contract.Callbacks(&_Promise.CallOpts, arg0, arg1)
}

// Callbacks is a free data retrieval call binding the contract method 0x0838f689.
//
// Solidity: function callbacks(bytes32 , uint256 ) view returns(address target, bytes4 selector, bytes context)
func (_Promise *PromiseCallerSession) Callbacks(arg0 [32]byte, arg1 *big.Int) (struct {
	Target   common.Address
	Selector [4]byte
	Context  []byte
}, error) {
	return _Promise.Contract.Callbacks(&_Promise.CallOpts, arg0, arg1)
}

// PromiseContext is a free data retrieval call binding the contract method 0xd90e24c4.
//
// Solidity: function promiseContext() view returns(bytes)
func (_Promise *PromiseCaller) PromiseContext(opts *bind.CallOpts) ([]byte, error) {
	var out []interface{}
	err := _Promise.contract.Call(opts, &out, "promiseContext")

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// PromiseContext is a free data retrieval call binding the contract method 0xd90e24c4.
//
// Solidity: function promiseContext() view returns(bytes)
func (_Promise *PromiseSession) PromiseContext() ([]byte, error) {
	return _Promise.Contract.PromiseContext(&_Promise.CallOpts)
}

// PromiseContext is a free data retrieval call binding the contract method 0xd90e24c4.
//
// Solidity: function promiseContext() view returns(bytes)
func (_Promise *PromiseCallerSession) PromiseContext() ([]byte, error) {
	return _Promise.Contract.PromiseContext(&_Promise.CallOpts)
}

// PromiseRelayIdentifier is a free data retrieval call binding the contract method 0x156ea9ec.
//
// Solidity: function promiseRelayIdentifier() view returns((address,uint256,uint256,uint256,uint256))
func (_Promise *PromiseCaller) PromiseRelayIdentifier(opts *bind.CallOpts) (Identifier, error) {
	var out []interface{}
	err := _Promise.contract.Call(opts, &out, "promiseRelayIdentifier")

	if err != nil {
		return *new(Identifier), err
	}

	out0 := *abi.ConvertType(out[0], new(Identifier)).(*Identifier)

	return out0, err

}

// PromiseRelayIdentifier is a free data retrieval call binding the contract method 0x156ea9ec.
//
// Solidity: function promiseRelayIdentifier() view returns((address,uint256,uint256,uint256,uint256))
func (_Promise *PromiseSession) PromiseRelayIdentifier() (Identifier, error) {
	return _Promise.Contract.PromiseRelayIdentifier(&_Promise.CallOpts)
}

// PromiseRelayIdentifier is a free data retrieval call binding the contract method 0x156ea9ec.
//
// Solidity: function promiseRelayIdentifier() view returns((address,uint256,uint256,uint256,uint256))
func (_Promise *PromiseCallerSession) PromiseRelayIdentifier() (Identifier, error) {
	return _Promise.Contract.PromiseRelayIdentifier(&_Promise.CallOpts)
}

// DispatchCallbacks is a paid mutator transaction binding the contract method 0xc6543f36.
//
// Solidity: function dispatchCallbacks((address,uint256,uint256,uint256,uint256) _id, bytes _payload) payable returns()
func (_Promise *PromiseTransactor) DispatchCallbacks(opts *bind.TransactOpts, _id Identifier, _payload []byte) (*types.Transaction, error) {
	return _Promise.contract.Transact(opts, "dispatchCallbacks", _id, _payload)
}

// DispatchCallbacks is a paid mutator transaction binding the contract method 0xc6543f36.
//
// Solidity: function dispatchCallbacks((address,uint256,uint256,uint256,uint256) _id, bytes _payload) payable returns()
func (_Promise *PromiseSession) DispatchCallbacks(_id Identifier, _payload []byte) (*types.Transaction, error) {
	return _Promise.Contract.DispatchCallbacks(&_Promise.TransactOpts, _id, _payload)
}

// DispatchCallbacks is a paid mutator transaction binding the contract method 0xc6543f36.
//
// Solidity: function dispatchCallbacks((address,uint256,uint256,uint256,uint256) _id, bytes _payload) payable returns()
func (_Promise *PromiseTransactorSession) DispatchCallbacks(_id Identifier, _payload []byte) (*types.Transaction, error) {
	return _Promise.Contract.DispatchCallbacks(&_Promise.TransactOpts, _id, _payload)
}

// HandleMessage is a paid mutator transaction binding the contract method 0x1a4325b5.
//
// Solidity: function handleMessage(uint256 _nonce, address _target, bytes _message) returns()
func (_Promise *PromiseTransactor) HandleMessage(opts *bind.TransactOpts, _nonce *big.Int, _target common.Address, _message []byte) (*types.Transaction, error) {
	return _Promise.contract.Transact(opts, "handleMessage", _nonce, _target, _message)
}

// HandleMessage is a paid mutator transaction binding the contract method 0x1a4325b5.
//
// Solidity: function handleMessage(uint256 _nonce, address _target, bytes _message) returns()
func (_Promise *PromiseSession) HandleMessage(_nonce *big.Int, _target common.Address, _message []byte) (*types.Transaction, error) {
	return _Promise.Contract.HandleMessage(&_Promise.TransactOpts, _nonce, _target, _message)
}

// HandleMessage is a paid mutator transaction binding the contract method 0x1a4325b5.
//
// Solidity: function handleMessage(uint256 _nonce, address _target, bytes _message) returns()
func (_Promise *PromiseTransactorSession) HandleMessage(_nonce *big.Int, _target common.Address, _message []byte) (*types.Transaction, error) {
	return _Promise.Contract.HandleMessage(&_Promise.TransactOpts, _nonce, _target, _message)
}

// SendMessage is a paid mutator transaction binding the contract method 0x7056f41f.
//
// Solidity: function sendMessage(uint256 _destination, address _target, bytes _message) returns(bytes32)
func (_Promise *PromiseTransactor) SendMessage(opts *bind.TransactOpts, _destination *big.Int, _target common.Address, _message []byte) (*types.Transaction, error) {
	return _Promise.contract.Transact(opts, "sendMessage", _destination, _target, _message)
}

// SendMessage is a paid mutator transaction binding the contract method 0x7056f41f.
//
// Solidity: function sendMessage(uint256 _destination, address _target, bytes _message) returns(bytes32)
func (_Promise *PromiseSession) SendMessage(_destination *big.Int, _target common.Address, _message []byte) (*types.Transaction, error) {
	return _Promise.Contract.SendMessage(&_Promise.TransactOpts, _destination, _target, _message)
}

// SendMessage is a paid mutator transaction binding the contract method 0x7056f41f.
//
// Solidity: function sendMessage(uint256 _destination, address _target, bytes _message) returns(bytes32)
func (_Promise *PromiseTransactorSession) SendMessage(_destination *big.Int, _target common.Address, _message []byte) (*types.Transaction, error) {
	return _Promise.Contract.SendMessage(&_Promise.TransactOpts, _destination, _target, _message)
}

// Then is a paid mutator transaction binding the contract method 0xee9e3463.
//
// Solidity: function then(bytes32 _msgHash, bytes4 _selector) returns()
func (_Promise *PromiseTransactor) Then(opts *bind.TransactOpts, _msgHash [32]byte, _selector [4]byte) (*types.Transaction, error) {
	return _Promise.contract.Transact(opts, "then", _msgHash, _selector)
}

// Then is a paid mutator transaction binding the contract method 0xee9e3463.
//
// Solidity: function then(bytes32 _msgHash, bytes4 _selector) returns()
func (_Promise *PromiseSession) Then(_msgHash [32]byte, _selector [4]byte) (*types.Transaction, error) {
	return _Promise.Contract.Then(&_Promise.TransactOpts, _msgHash, _selector)
}

// Then is a paid mutator transaction binding the contract method 0xee9e3463.
//
// Solidity: function then(bytes32 _msgHash, bytes4 _selector) returns()
func (_Promise *PromiseTransactorSession) Then(_msgHash [32]byte, _selector [4]byte) (*types.Transaction, error) {
	return _Promise.Contract.Then(&_Promise.TransactOpts, _msgHash, _selector)
}

// Then0 is a paid mutator transaction binding the contract method 0xfcda5d95.
//
// Solidity: function then(bytes32 _msgHash, bytes4 _selector, bytes _context) returns()
func (_Promise *PromiseTransactor) Then0(opts *bind.TransactOpts, _msgHash [32]byte, _selector [4]byte, _context []byte) (*types.Transaction, error) {
	return _Promise.contract.Transact(opts, "then0", _msgHash, _selector, _context)
}

// Then0 is a paid mutator transaction binding the contract method 0xfcda5d95.
//
// Solidity: function then(bytes32 _msgHash, bytes4 _selector, bytes _context) returns()
func (_Promise *PromiseSession) Then0(_msgHash [32]byte, _selector [4]byte, _context []byte) (*types.Transaction, error) {
	return _Promise.Contract.Then0(&_Promise.TransactOpts, _msgHash, _selector, _context)
}

// Then0 is a paid mutator transaction binding the contract method 0xfcda5d95.
//
// Solidity: function then(bytes32 _msgHash, bytes4 _selector, bytes _context) returns()
func (_Promise *PromiseTransactorSession) Then0(_msgHash [32]byte, _selector [4]byte, _context []byte) (*types.Transaction, error) {
	return _Promise.Contract.Then0(&_Promise.TransactOpts, _msgHash, _selector, _context)
}

// PromiseCallbackRegisteredIterator is returned from FilterCallbackRegistered and is used to iterate over the raw logs and unpacked data for CallbackRegistered events raised by the Promise contract.
type PromiseCallbackRegisteredIterator struct {
	Event *PromiseCallbackRegistered // Event containing the contract specifics and raw log

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
func (it *PromiseCallbackRegisteredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PromiseCallbackRegistered)
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
		it.Event = new(PromiseCallbackRegistered)
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
func (it *PromiseCallbackRegisteredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PromiseCallbackRegisteredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PromiseCallbackRegistered represents a CallbackRegistered event raised by the Promise contract.
type PromiseCallbackRegistered struct {
	MessageHash [32]byte
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterCallbackRegistered is a free log retrieval operation binding the contract event 0x650e5bc5554f895cdf25053bb0218c3ba28ffed9ecbcefa859d50b66d0b091ab.
//
// Solidity: event CallbackRegistered(bytes32 messageHash)
func (_Promise *PromiseFilterer) FilterCallbackRegistered(opts *bind.FilterOpts) (*PromiseCallbackRegisteredIterator, error) {

	logs, sub, err := _Promise.contract.FilterLogs(opts, "CallbackRegistered")
	if err != nil {
		return nil, err
	}
	return &PromiseCallbackRegisteredIterator{contract: _Promise.contract, event: "CallbackRegistered", logs: logs, sub: sub}, nil
}

// WatchCallbackRegistered is a free log subscription operation binding the contract event 0x650e5bc5554f895cdf25053bb0218c3ba28ffed9ecbcefa859d50b66d0b091ab.
//
// Solidity: event CallbackRegistered(bytes32 messageHash)
func (_Promise *PromiseFilterer) WatchCallbackRegistered(opts *bind.WatchOpts, sink chan<- *PromiseCallbackRegistered) (event.Subscription, error) {

	logs, sub, err := _Promise.contract.WatchLogs(opts, "CallbackRegistered")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PromiseCallbackRegistered)
				if err := _Promise.contract.UnpackLog(event, "CallbackRegistered", log); err != nil {
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

// ParseCallbackRegistered is a log parse operation binding the contract event 0x650e5bc5554f895cdf25053bb0218c3ba28ffed9ecbcefa859d50b66d0b091ab.
//
// Solidity: event CallbackRegistered(bytes32 messageHash)
func (_Promise *PromiseFilterer) ParseCallbackRegistered(log types.Log) (*PromiseCallbackRegistered, error) {
	event := new(PromiseCallbackRegistered)
	if err := _Promise.contract.UnpackLog(event, "CallbackRegistered", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PromiseCallbacksCompletedIterator is returned from FilterCallbacksCompleted and is used to iterate over the raw logs and unpacked data for CallbacksCompleted events raised by the Promise contract.
type PromiseCallbacksCompletedIterator struct {
	Event *PromiseCallbacksCompleted // Event containing the contract specifics and raw log

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
func (it *PromiseCallbacksCompletedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PromiseCallbacksCompleted)
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
		it.Event = new(PromiseCallbacksCompleted)
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
func (it *PromiseCallbacksCompletedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PromiseCallbacksCompletedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PromiseCallbacksCompleted represents a CallbacksCompleted event raised by the Promise contract.
type PromiseCallbacksCompleted struct {
	MessageHash [32]byte
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterCallbacksCompleted is a free log retrieval operation binding the contract event 0xe333b9ae15782c35c5709ebd17e0daefd9cac20bb56af62c6b5500c4fef56310.
//
// Solidity: event CallbacksCompleted(bytes32 messageHash)
func (_Promise *PromiseFilterer) FilterCallbacksCompleted(opts *bind.FilterOpts) (*PromiseCallbacksCompletedIterator, error) {

	logs, sub, err := _Promise.contract.FilterLogs(opts, "CallbacksCompleted")
	if err != nil {
		return nil, err
	}
	return &PromiseCallbacksCompletedIterator{contract: _Promise.contract, event: "CallbacksCompleted", logs: logs, sub: sub}, nil
}

// WatchCallbacksCompleted is a free log subscription operation binding the contract event 0xe333b9ae15782c35c5709ebd17e0daefd9cac20bb56af62c6b5500c4fef56310.
//
// Solidity: event CallbacksCompleted(bytes32 messageHash)
func (_Promise *PromiseFilterer) WatchCallbacksCompleted(opts *bind.WatchOpts, sink chan<- *PromiseCallbacksCompleted) (event.Subscription, error) {

	logs, sub, err := _Promise.contract.WatchLogs(opts, "CallbacksCompleted")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PromiseCallbacksCompleted)
				if err := _Promise.contract.UnpackLog(event, "CallbacksCompleted", log); err != nil {
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

// ParseCallbacksCompleted is a log parse operation binding the contract event 0xe333b9ae15782c35c5709ebd17e0daefd9cac20bb56af62c6b5500c4fef56310.
//
// Solidity: event CallbacksCompleted(bytes32 messageHash)
func (_Promise *PromiseFilterer) ParseCallbacksCompleted(log types.Log) (*PromiseCallbacksCompleted, error) {
	event := new(PromiseCallbacksCompleted)
	if err := _Promise.contract.UnpackLog(event, "CallbacksCompleted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PromiseRelayedMessageIterator is returned from FilterRelayedMessage and is used to iterate over the raw logs and unpacked data for RelayedMessage events raised by the Promise contract.
type PromiseRelayedMessageIterator struct {
	Event *PromiseRelayedMessage // Event containing the contract specifics and raw log

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
func (it *PromiseRelayedMessageIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PromiseRelayedMessage)
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
		it.Event = new(PromiseRelayedMessage)
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
func (it *PromiseRelayedMessageIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PromiseRelayedMessageIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PromiseRelayedMessage represents a RelayedMessage event raised by the Promise contract.
type PromiseRelayedMessage struct {
	MessageHash [32]byte
	ReturnData  []byte
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterRelayedMessage is a free log retrieval operation binding the contract event 0xd3ab751bdd6a4c6a968cb92ace09bf1936841c82e12e085c0791dfb8d0ea0216.
//
// Solidity: event RelayedMessage(bytes32 messageHash, bytes returnData)
func (_Promise *PromiseFilterer) FilterRelayedMessage(opts *bind.FilterOpts) (*PromiseRelayedMessageIterator, error) {

	logs, sub, err := _Promise.contract.FilterLogs(opts, "RelayedMessage")
	if err != nil {
		return nil, err
	}
	return &PromiseRelayedMessageIterator{contract: _Promise.contract, event: "RelayedMessage", logs: logs, sub: sub}, nil
}

// WatchRelayedMessage is a free log subscription operation binding the contract event 0xd3ab751bdd6a4c6a968cb92ace09bf1936841c82e12e085c0791dfb8d0ea0216.
//
// Solidity: event RelayedMessage(bytes32 messageHash, bytes returnData)
func (_Promise *PromiseFilterer) WatchRelayedMessage(opts *bind.WatchOpts, sink chan<- *PromiseRelayedMessage) (event.Subscription, error) {

	logs, sub, err := _Promise.contract.WatchLogs(opts, "RelayedMessage")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PromiseRelayedMessage)
				if err := _Promise.contract.UnpackLog(event, "RelayedMessage", log); err != nil {
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

// ParseRelayedMessage is a log parse operation binding the contract event 0xd3ab751bdd6a4c6a968cb92ace09bf1936841c82e12e085c0791dfb8d0ea0216.
//
// Solidity: event RelayedMessage(bytes32 messageHash, bytes returnData)
func (_Promise *PromiseFilterer) ParseRelayedMessage(log types.Log) (*PromiseRelayedMessage, error) {
	event := new(PromiseRelayedMessage)
	if err := _Promise.contract.UnpackLog(event, "RelayedMessage", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
