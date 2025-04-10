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

// SuperchainETHBridgeMetaData contains all meta data concerning the SuperchainETHBridge contract.
var SuperchainETHBridgeMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"function\",\"name\":\"relayETH\",\"inputs\":[{\"name\":\"_from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"sendETH\",\"inputs\":[{\"name\":\"_to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_chainId\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"msgHash_\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"payable\"},{\"type\":\"function\",\"name\":\"version\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"event\",\"name\":\"RelayETH\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"},{\"name\":\"source\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"SendETH\",\"inputs\":[{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"},{\"name\":\"destination\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"error\",\"name\":\"InvalidCrossDomainSender\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"Unauthorized\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ZeroAddress\",\"inputs\":[]}]",
}

// SuperchainETHBridgeABI is the input ABI used to generate the binding from.
// Deprecated: Use SuperchainETHBridgeMetaData.ABI instead.
var SuperchainETHBridgeABI = SuperchainETHBridgeMetaData.ABI

// SuperchainETHBridge is an auto generated Go binding around an Ethereum contract.
type SuperchainETHBridge struct {
	SuperchainETHBridgeCaller     // Read-only binding to the contract
	SuperchainETHBridgeTransactor // Write-only binding to the contract
	SuperchainETHBridgeFilterer   // Log filterer for contract events
}

// SuperchainETHBridgeCaller is an auto generated read-only Go binding around an Ethereum contract.
type SuperchainETHBridgeCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainETHBridgeTransactor is an auto generated write-only Go binding around an Ethereum contract.
type SuperchainETHBridgeTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainETHBridgeFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SuperchainETHBridgeFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainETHBridgeSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SuperchainETHBridgeSession struct {
	Contract     *SuperchainETHBridge // Generic contract binding to set the session for
	CallOpts     bind.CallOpts        // Call options to use throughout this session
	TransactOpts bind.TransactOpts    // Transaction auth options to use throughout this session
}

// SuperchainETHBridgeCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SuperchainETHBridgeCallerSession struct {
	Contract *SuperchainETHBridgeCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts              // Call options to use throughout this session
}

// SuperchainETHBridgeTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SuperchainETHBridgeTransactorSession struct {
	Contract     *SuperchainETHBridgeTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts              // Transaction auth options to use throughout this session
}

// SuperchainETHBridgeRaw is an auto generated low-level Go binding around an Ethereum contract.
type SuperchainETHBridgeRaw struct {
	Contract *SuperchainETHBridge // Generic contract binding to access the raw methods on
}

// SuperchainETHBridgeCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SuperchainETHBridgeCallerRaw struct {
	Contract *SuperchainETHBridgeCaller // Generic read-only contract binding to access the raw methods on
}

// SuperchainETHBridgeTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SuperchainETHBridgeTransactorRaw struct {
	Contract *SuperchainETHBridgeTransactor // Generic write-only contract binding to access the raw methods on
}

// NewSuperchainETHBridge creates a new instance of SuperchainETHBridge, bound to a specific deployed contract.
func NewSuperchainETHBridge(address common.Address, backend bind.ContractBackend) (*SuperchainETHBridge, error) {
	contract, err := bindSuperchainETHBridge(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &SuperchainETHBridge{SuperchainETHBridgeCaller: SuperchainETHBridgeCaller{contract: contract}, SuperchainETHBridgeTransactor: SuperchainETHBridgeTransactor{contract: contract}, SuperchainETHBridgeFilterer: SuperchainETHBridgeFilterer{contract: contract}}, nil
}

// NewSuperchainETHBridgeCaller creates a new read-only instance of SuperchainETHBridge, bound to a specific deployed contract.
func NewSuperchainETHBridgeCaller(address common.Address, caller bind.ContractCaller) (*SuperchainETHBridgeCaller, error) {
	contract, err := bindSuperchainETHBridge(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SuperchainETHBridgeCaller{contract: contract}, nil
}

// NewSuperchainETHBridgeTransactor creates a new write-only instance of SuperchainETHBridge, bound to a specific deployed contract.
func NewSuperchainETHBridgeTransactor(address common.Address, transactor bind.ContractTransactor) (*SuperchainETHBridgeTransactor, error) {
	contract, err := bindSuperchainETHBridge(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SuperchainETHBridgeTransactor{contract: contract}, nil
}

// NewSuperchainETHBridgeFilterer creates a new log filterer instance of SuperchainETHBridge, bound to a specific deployed contract.
func NewSuperchainETHBridgeFilterer(address common.Address, filterer bind.ContractFilterer) (*SuperchainETHBridgeFilterer, error) {
	contract, err := bindSuperchainETHBridge(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SuperchainETHBridgeFilterer{contract: contract}, nil
}

// bindSuperchainETHBridge binds a generic wrapper to an already deployed contract.
func bindSuperchainETHBridge(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := SuperchainETHBridgeMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SuperchainETHBridge *SuperchainETHBridgeRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SuperchainETHBridge.Contract.SuperchainETHBridgeCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SuperchainETHBridge *SuperchainETHBridgeRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SuperchainETHBridge.Contract.SuperchainETHBridgeTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SuperchainETHBridge *SuperchainETHBridgeRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SuperchainETHBridge.Contract.SuperchainETHBridgeTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SuperchainETHBridge *SuperchainETHBridgeCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SuperchainETHBridge.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SuperchainETHBridge *SuperchainETHBridgeTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SuperchainETHBridge.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SuperchainETHBridge *SuperchainETHBridgeTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SuperchainETHBridge.Contract.contract.Transact(opts, method, params...)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainETHBridge *SuperchainETHBridgeCaller) Version(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SuperchainETHBridge.contract.Call(opts, &out, "version")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainETHBridge *SuperchainETHBridgeSession) Version() (string, error) {
	return _SuperchainETHBridge.Contract.Version(&_SuperchainETHBridge.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainETHBridge *SuperchainETHBridgeCallerSession) Version() (string, error) {
	return _SuperchainETHBridge.Contract.Version(&_SuperchainETHBridge.CallOpts)
}

// RelayETH is a paid mutator transaction binding the contract method 0x4f0edcc9.
//
// Solidity: function relayETH(address _from, address _to, uint256 _amount) returns()
func (_SuperchainETHBridge *SuperchainETHBridgeTransactor) RelayETH(opts *bind.TransactOpts, _from common.Address, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainETHBridge.contract.Transact(opts, "relayETH", _from, _to, _amount)
}

// RelayETH is a paid mutator transaction binding the contract method 0x4f0edcc9.
//
// Solidity: function relayETH(address _from, address _to, uint256 _amount) returns()
func (_SuperchainETHBridge *SuperchainETHBridgeSession) RelayETH(_from common.Address, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainETHBridge.Contract.RelayETH(&_SuperchainETHBridge.TransactOpts, _from, _to, _amount)
}

// RelayETH is a paid mutator transaction binding the contract method 0x4f0edcc9.
//
// Solidity: function relayETH(address _from, address _to, uint256 _amount) returns()
func (_SuperchainETHBridge *SuperchainETHBridgeTransactorSession) RelayETH(_from common.Address, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainETHBridge.Contract.RelayETH(&_SuperchainETHBridge.TransactOpts, _from, _to, _amount)
}

// SendETH is a paid mutator transaction binding the contract method 0x64a197f3.
//
// Solidity: function sendETH(address _to, uint256 _chainId) payable returns(bytes32 msgHash_)
func (_SuperchainETHBridge *SuperchainETHBridgeTransactor) SendETH(opts *bind.TransactOpts, _to common.Address, _chainId *big.Int) (*types.Transaction, error) {
	return _SuperchainETHBridge.contract.Transact(opts, "sendETH", _to, _chainId)
}

// SendETH is a paid mutator transaction binding the contract method 0x64a197f3.
//
// Solidity: function sendETH(address _to, uint256 _chainId) payable returns(bytes32 msgHash_)
func (_SuperchainETHBridge *SuperchainETHBridgeSession) SendETH(_to common.Address, _chainId *big.Int) (*types.Transaction, error) {
	return _SuperchainETHBridge.Contract.SendETH(&_SuperchainETHBridge.TransactOpts, _to, _chainId)
}

// SendETH is a paid mutator transaction binding the contract method 0x64a197f3.
//
// Solidity: function sendETH(address _to, uint256 _chainId) payable returns(bytes32 msgHash_)
func (_SuperchainETHBridge *SuperchainETHBridgeTransactorSession) SendETH(_to common.Address, _chainId *big.Int) (*types.Transaction, error) {
	return _SuperchainETHBridge.Contract.SendETH(&_SuperchainETHBridge.TransactOpts, _to, _chainId)
}

// SuperchainETHBridgeRelayETHIterator is returned from FilterRelayETH and is used to iterate over the raw logs and unpacked data for RelayETH events raised by the SuperchainETHBridge contract.
type SuperchainETHBridgeRelayETHIterator struct {
	Event *SuperchainETHBridgeRelayETH // Event containing the contract specifics and raw log

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
func (it *SuperchainETHBridgeRelayETHIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainETHBridgeRelayETH)
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
		it.Event = new(SuperchainETHBridgeRelayETH)
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
func (it *SuperchainETHBridgeRelayETHIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainETHBridgeRelayETHIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainETHBridgeRelayETH represents a RelayETH event raised by the SuperchainETHBridge contract.
type SuperchainETHBridgeRelayETH struct {
	From   common.Address
	To     common.Address
	Amount *big.Int
	Source *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterRelayETH is a free log retrieval operation binding the contract event 0xe5479bb8ebad3b9ac81f55f424a6289cf0a54ff2641708f41dcb2b26f264d359.
//
// Solidity: event RelayETH(address indexed from, address indexed to, uint256 amount, uint256 source)
func (_SuperchainETHBridge *SuperchainETHBridgeFilterer) FilterRelayETH(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*SuperchainETHBridgeRelayETHIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainETHBridge.contract.FilterLogs(opts, "RelayETH", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainETHBridgeRelayETHIterator{contract: _SuperchainETHBridge.contract, event: "RelayETH", logs: logs, sub: sub}, nil
}

// WatchRelayETH is a free log subscription operation binding the contract event 0xe5479bb8ebad3b9ac81f55f424a6289cf0a54ff2641708f41dcb2b26f264d359.
//
// Solidity: event RelayETH(address indexed from, address indexed to, uint256 amount, uint256 source)
func (_SuperchainETHBridge *SuperchainETHBridgeFilterer) WatchRelayETH(opts *bind.WatchOpts, sink chan<- *SuperchainETHBridgeRelayETH, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainETHBridge.contract.WatchLogs(opts, "RelayETH", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainETHBridgeRelayETH)
				if err := _SuperchainETHBridge.contract.UnpackLog(event, "RelayETH", log); err != nil {
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

// ParseRelayETH is a log parse operation binding the contract event 0xe5479bb8ebad3b9ac81f55f424a6289cf0a54ff2641708f41dcb2b26f264d359.
//
// Solidity: event RelayETH(address indexed from, address indexed to, uint256 amount, uint256 source)
func (_SuperchainETHBridge *SuperchainETHBridgeFilterer) ParseRelayETH(log types.Log) (*SuperchainETHBridgeRelayETH, error) {
	event := new(SuperchainETHBridgeRelayETH)
	if err := _SuperchainETHBridge.contract.UnpackLog(event, "RelayETH", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SuperchainETHBridgeSendETHIterator is returned from FilterSendETH and is used to iterate over the raw logs and unpacked data for SendETH events raised by the SuperchainETHBridge contract.
type SuperchainETHBridgeSendETHIterator struct {
	Event *SuperchainETHBridgeSendETH // Event containing the contract specifics and raw log

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
func (it *SuperchainETHBridgeSendETHIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainETHBridgeSendETH)
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
		it.Event = new(SuperchainETHBridgeSendETH)
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
func (it *SuperchainETHBridgeSendETHIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainETHBridgeSendETHIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainETHBridgeSendETH represents a SendETH event raised by the SuperchainETHBridge contract.
type SuperchainETHBridgeSendETH struct {
	From        common.Address
	To          common.Address
	Amount      *big.Int
	Destination *big.Int
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterSendETH is a free log retrieval operation binding the contract event 0xed98a2ff78833375c368471a747cdf0633024dde3f870feb08a934ac5be83402.
//
// Solidity: event SendETH(address indexed from, address indexed to, uint256 amount, uint256 destination)
func (_SuperchainETHBridge *SuperchainETHBridgeFilterer) FilterSendETH(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*SuperchainETHBridgeSendETHIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainETHBridge.contract.FilterLogs(opts, "SendETH", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainETHBridgeSendETHIterator{contract: _SuperchainETHBridge.contract, event: "SendETH", logs: logs, sub: sub}, nil
}

// WatchSendETH is a free log subscription operation binding the contract event 0xed98a2ff78833375c368471a747cdf0633024dde3f870feb08a934ac5be83402.
//
// Solidity: event SendETH(address indexed from, address indexed to, uint256 amount, uint256 destination)
func (_SuperchainETHBridge *SuperchainETHBridgeFilterer) WatchSendETH(opts *bind.WatchOpts, sink chan<- *SuperchainETHBridgeSendETH, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainETHBridge.contract.WatchLogs(opts, "SendETH", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainETHBridgeSendETH)
				if err := _SuperchainETHBridge.contract.UnpackLog(event, "SendETH", log); err != nil {
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

// ParseSendETH is a log parse operation binding the contract event 0xed98a2ff78833375c368471a747cdf0633024dde3f870feb08a934ac5be83402.
//
// Solidity: event SendETH(address indexed from, address indexed to, uint256 amount, uint256 destination)
func (_SuperchainETHBridge *SuperchainETHBridgeFilterer) ParseSendETH(log types.Log) (*SuperchainETHBridgeSendETH, error) {
	event := new(SuperchainETHBridgeSendETH)
	if err := _SuperchainETHBridge.contract.UnpackLog(event, "SendETH", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
