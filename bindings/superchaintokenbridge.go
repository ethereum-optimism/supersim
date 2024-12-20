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

// SuperchainTokenBridgeMetaData contains all meta data concerning the SuperchainTokenBridge contract.
var SuperchainTokenBridgeMetaData = &bind.MetaData{
	ABI: "[{\"type\":\"function\",\"name\":\"relayERC20\",\"inputs\":[{\"name\":\"_token\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_from\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"sendERC20\",\"inputs\":[{\"name\":\"_token\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_to\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_chainId\",\"type\":\"uint256\",\"internalType\":\"uint256\"}],\"outputs\":[{\"name\":\"msgHash_\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"}],\"stateMutability\":\"nonpayable\"},{\"type\":\"function\",\"name\":\"version\",\"inputs\":[],\"outputs\":[{\"name\":\"\",\"type\":\"string\",\"internalType\":\"string\"}],\"stateMutability\":\"view\"},{\"type\":\"event\",\"name\":\"RelayERC20\",\"inputs\":[{\"name\":\"token\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"},{\"name\":\"source\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"event\",\"name\":\"SendERC20\",\"inputs\":[{\"name\":\"token\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"from\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"to\",\"type\":\"address\",\"indexed\":true,\"internalType\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"},{\"name\":\"destination\",\"type\":\"uint256\",\"indexed\":false,\"internalType\":\"uint256\"}],\"anonymous\":false},{\"type\":\"error\",\"name\":\"InvalidCrossDomainSender\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"InvalidERC7802\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"Unauthorized\",\"inputs\":[]},{\"type\":\"error\",\"name\":\"ZeroAddress\",\"inputs\":[]}]",
}

// SuperchainTokenBridgeABI is the input ABI used to generate the binding from.
// Deprecated: Use SuperchainTokenBridgeMetaData.ABI instead.
var SuperchainTokenBridgeABI = SuperchainTokenBridgeMetaData.ABI

// SuperchainTokenBridge is an auto generated Go binding around an Ethereum contract.
type SuperchainTokenBridge struct {
	SuperchainTokenBridgeCaller     // Read-only binding to the contract
	SuperchainTokenBridgeTransactor // Write-only binding to the contract
	SuperchainTokenBridgeFilterer   // Log filterer for contract events
}

// SuperchainTokenBridgeCaller is an auto generated read-only Go binding around an Ethereum contract.
type SuperchainTokenBridgeCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainTokenBridgeTransactor is an auto generated write-only Go binding around an Ethereum contract.
type SuperchainTokenBridgeTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainTokenBridgeFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SuperchainTokenBridgeFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SuperchainTokenBridgeSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SuperchainTokenBridgeSession struct {
	Contract     *SuperchainTokenBridge // Generic contract binding to set the session for
	CallOpts     bind.CallOpts          // Call options to use throughout this session
	TransactOpts bind.TransactOpts      // Transaction auth options to use throughout this session
}

// SuperchainTokenBridgeCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SuperchainTokenBridgeCallerSession struct {
	Contract *SuperchainTokenBridgeCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts                // Call options to use throughout this session
}

// SuperchainTokenBridgeTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SuperchainTokenBridgeTransactorSession struct {
	Contract     *SuperchainTokenBridgeTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts                // Transaction auth options to use throughout this session
}

// SuperchainTokenBridgeRaw is an auto generated low-level Go binding around an Ethereum contract.
type SuperchainTokenBridgeRaw struct {
	Contract *SuperchainTokenBridge // Generic contract binding to access the raw methods on
}

// SuperchainTokenBridgeCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SuperchainTokenBridgeCallerRaw struct {
	Contract *SuperchainTokenBridgeCaller // Generic read-only contract binding to access the raw methods on
}

// SuperchainTokenBridgeTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SuperchainTokenBridgeTransactorRaw struct {
	Contract *SuperchainTokenBridgeTransactor // Generic write-only contract binding to access the raw methods on
}

// NewSuperchainTokenBridge creates a new instance of SuperchainTokenBridge, bound to a specific deployed contract.
func NewSuperchainTokenBridge(address common.Address, backend bind.ContractBackend) (*SuperchainTokenBridge, error) {
	contract, err := bindSuperchainTokenBridge(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &SuperchainTokenBridge{SuperchainTokenBridgeCaller: SuperchainTokenBridgeCaller{contract: contract}, SuperchainTokenBridgeTransactor: SuperchainTokenBridgeTransactor{contract: contract}, SuperchainTokenBridgeFilterer: SuperchainTokenBridgeFilterer{contract: contract}}, nil
}

// NewSuperchainTokenBridgeCaller creates a new read-only instance of SuperchainTokenBridge, bound to a specific deployed contract.
func NewSuperchainTokenBridgeCaller(address common.Address, caller bind.ContractCaller) (*SuperchainTokenBridgeCaller, error) {
	contract, err := bindSuperchainTokenBridge(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SuperchainTokenBridgeCaller{contract: contract}, nil
}

// NewSuperchainTokenBridgeTransactor creates a new write-only instance of SuperchainTokenBridge, bound to a specific deployed contract.
func NewSuperchainTokenBridgeTransactor(address common.Address, transactor bind.ContractTransactor) (*SuperchainTokenBridgeTransactor, error) {
	contract, err := bindSuperchainTokenBridge(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SuperchainTokenBridgeTransactor{contract: contract}, nil
}

// NewSuperchainTokenBridgeFilterer creates a new log filterer instance of SuperchainTokenBridge, bound to a specific deployed contract.
func NewSuperchainTokenBridgeFilterer(address common.Address, filterer bind.ContractFilterer) (*SuperchainTokenBridgeFilterer, error) {
	contract, err := bindSuperchainTokenBridge(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SuperchainTokenBridgeFilterer{contract: contract}, nil
}

// bindSuperchainTokenBridge binds a generic wrapper to an already deployed contract.
func bindSuperchainTokenBridge(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := SuperchainTokenBridgeMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SuperchainTokenBridge *SuperchainTokenBridgeRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SuperchainTokenBridge.Contract.SuperchainTokenBridgeCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SuperchainTokenBridge *SuperchainTokenBridgeRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SuperchainTokenBridge.Contract.SuperchainTokenBridgeTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SuperchainTokenBridge *SuperchainTokenBridgeRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SuperchainTokenBridge.Contract.SuperchainTokenBridgeTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SuperchainTokenBridge *SuperchainTokenBridgeCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SuperchainTokenBridge.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SuperchainTokenBridge *SuperchainTokenBridgeTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SuperchainTokenBridge.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SuperchainTokenBridge *SuperchainTokenBridgeTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SuperchainTokenBridge.Contract.contract.Transact(opts, method, params...)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainTokenBridge *SuperchainTokenBridgeCaller) Version(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SuperchainTokenBridge.contract.Call(opts, &out, "version")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainTokenBridge *SuperchainTokenBridgeSession) Version() (string, error) {
	return _SuperchainTokenBridge.Contract.Version(&_SuperchainTokenBridge.CallOpts)
}

// Version is a free data retrieval call binding the contract method 0x54fd4d50.
//
// Solidity: function version() view returns(string)
func (_SuperchainTokenBridge *SuperchainTokenBridgeCallerSession) Version() (string, error) {
	return _SuperchainTokenBridge.Contract.Version(&_SuperchainTokenBridge.CallOpts)
}

// RelayERC20 is a paid mutator transaction binding the contract method 0x7cfd6dbc.
//
// Solidity: function relayERC20(address _token, address _from, address _to, uint256 _amount) returns()
func (_SuperchainTokenBridge *SuperchainTokenBridgeTransactor) RelayERC20(opts *bind.TransactOpts, _token common.Address, _from common.Address, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainTokenBridge.contract.Transact(opts, "relayERC20", _token, _from, _to, _amount)
}

// RelayERC20 is a paid mutator transaction binding the contract method 0x7cfd6dbc.
//
// Solidity: function relayERC20(address _token, address _from, address _to, uint256 _amount) returns()
func (_SuperchainTokenBridge *SuperchainTokenBridgeSession) RelayERC20(_token common.Address, _from common.Address, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainTokenBridge.Contract.RelayERC20(&_SuperchainTokenBridge.TransactOpts, _token, _from, _to, _amount)
}

// RelayERC20 is a paid mutator transaction binding the contract method 0x7cfd6dbc.
//
// Solidity: function relayERC20(address _token, address _from, address _to, uint256 _amount) returns()
func (_SuperchainTokenBridge *SuperchainTokenBridgeTransactorSession) RelayERC20(_token common.Address, _from common.Address, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _SuperchainTokenBridge.Contract.RelayERC20(&_SuperchainTokenBridge.TransactOpts, _token, _from, _to, _amount)
}

// SendERC20 is a paid mutator transaction binding the contract method 0xc1a433d8.
//
// Solidity: function sendERC20(address _token, address _to, uint256 _amount, uint256 _chainId) returns(bytes32 msgHash_)
func (_SuperchainTokenBridge *SuperchainTokenBridgeTransactor) SendERC20(opts *bind.TransactOpts, _token common.Address, _to common.Address, _amount *big.Int, _chainId *big.Int) (*types.Transaction, error) {
	return _SuperchainTokenBridge.contract.Transact(opts, "sendERC20", _token, _to, _amount, _chainId)
}

// SendERC20 is a paid mutator transaction binding the contract method 0xc1a433d8.
//
// Solidity: function sendERC20(address _token, address _to, uint256 _amount, uint256 _chainId) returns(bytes32 msgHash_)
func (_SuperchainTokenBridge *SuperchainTokenBridgeSession) SendERC20(_token common.Address, _to common.Address, _amount *big.Int, _chainId *big.Int) (*types.Transaction, error) {
	return _SuperchainTokenBridge.Contract.SendERC20(&_SuperchainTokenBridge.TransactOpts, _token, _to, _amount, _chainId)
}

// SendERC20 is a paid mutator transaction binding the contract method 0xc1a433d8.
//
// Solidity: function sendERC20(address _token, address _to, uint256 _amount, uint256 _chainId) returns(bytes32 msgHash_)
func (_SuperchainTokenBridge *SuperchainTokenBridgeTransactorSession) SendERC20(_token common.Address, _to common.Address, _amount *big.Int, _chainId *big.Int) (*types.Transaction, error) {
	return _SuperchainTokenBridge.Contract.SendERC20(&_SuperchainTokenBridge.TransactOpts, _token, _to, _amount, _chainId)
}

// SuperchainTokenBridgeRelayERC20Iterator is returned from FilterRelayERC20 and is used to iterate over the raw logs and unpacked data for RelayERC20 events raised by the SuperchainTokenBridge contract.
type SuperchainTokenBridgeRelayERC20Iterator struct {
	Event *SuperchainTokenBridgeRelayERC20 // Event containing the contract specifics and raw log

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
func (it *SuperchainTokenBridgeRelayERC20Iterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainTokenBridgeRelayERC20)
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
		it.Event = new(SuperchainTokenBridgeRelayERC20)
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
func (it *SuperchainTokenBridgeRelayERC20Iterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainTokenBridgeRelayERC20Iterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainTokenBridgeRelayERC20 represents a RelayERC20 event raised by the SuperchainTokenBridge contract.
type SuperchainTokenBridgeRelayERC20 struct {
	Token  common.Address
	From   common.Address
	To     common.Address
	Amount *big.Int
	Source *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterRelayERC20 is a free log retrieval operation binding the contract event 0x434965d7426acf45a548f00783c067e9ad789c8c66444f0a5ad8941d5005be93.
//
// Solidity: event RelayERC20(address indexed token, address indexed from, address indexed to, uint256 amount, uint256 source)
func (_SuperchainTokenBridge *SuperchainTokenBridgeFilterer) FilterRelayERC20(opts *bind.FilterOpts, token []common.Address, from []common.Address, to []common.Address) (*SuperchainTokenBridgeRelayERC20Iterator, error) {

	var tokenRule []interface{}
	for _, tokenItem := range token {
		tokenRule = append(tokenRule, tokenItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainTokenBridge.contract.FilterLogs(opts, "RelayERC20", tokenRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainTokenBridgeRelayERC20Iterator{contract: _SuperchainTokenBridge.contract, event: "RelayERC20", logs: logs, sub: sub}, nil
}

// WatchRelayERC20 is a free log subscription operation binding the contract event 0x434965d7426acf45a548f00783c067e9ad789c8c66444f0a5ad8941d5005be93.
//
// Solidity: event RelayERC20(address indexed token, address indexed from, address indexed to, uint256 amount, uint256 source)
func (_SuperchainTokenBridge *SuperchainTokenBridgeFilterer) WatchRelayERC20(opts *bind.WatchOpts, sink chan<- *SuperchainTokenBridgeRelayERC20, token []common.Address, from []common.Address, to []common.Address) (event.Subscription, error) {

	var tokenRule []interface{}
	for _, tokenItem := range token {
		tokenRule = append(tokenRule, tokenItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainTokenBridge.contract.WatchLogs(opts, "RelayERC20", tokenRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainTokenBridgeRelayERC20)
				if err := _SuperchainTokenBridge.contract.UnpackLog(event, "RelayERC20", log); err != nil {
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

// ParseRelayERC20 is a log parse operation binding the contract event 0x434965d7426acf45a548f00783c067e9ad789c8c66444f0a5ad8941d5005be93.
//
// Solidity: event RelayERC20(address indexed token, address indexed from, address indexed to, uint256 amount, uint256 source)
func (_SuperchainTokenBridge *SuperchainTokenBridgeFilterer) ParseRelayERC20(log types.Log) (*SuperchainTokenBridgeRelayERC20, error) {
	event := new(SuperchainTokenBridgeRelayERC20)
	if err := _SuperchainTokenBridge.contract.UnpackLog(event, "RelayERC20", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SuperchainTokenBridgeSendERC20Iterator is returned from FilterSendERC20 and is used to iterate over the raw logs and unpacked data for SendERC20 events raised by the SuperchainTokenBridge contract.
type SuperchainTokenBridgeSendERC20Iterator struct {
	Event *SuperchainTokenBridgeSendERC20 // Event containing the contract specifics and raw log

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
func (it *SuperchainTokenBridgeSendERC20Iterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SuperchainTokenBridgeSendERC20)
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
		it.Event = new(SuperchainTokenBridgeSendERC20)
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
func (it *SuperchainTokenBridgeSendERC20Iterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SuperchainTokenBridgeSendERC20Iterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SuperchainTokenBridgeSendERC20 represents a SendERC20 event raised by the SuperchainTokenBridge contract.
type SuperchainTokenBridgeSendERC20 struct {
	Token       common.Address
	From        common.Address
	To          common.Address
	Amount      *big.Int
	Destination *big.Int
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterSendERC20 is a free log retrieval operation binding the contract event 0x0247bfe63a1aaa59e073e20b172889babfda8d3273b5798e0e9ac4388e6dd11c.
//
// Solidity: event SendERC20(address indexed token, address indexed from, address indexed to, uint256 amount, uint256 destination)
func (_SuperchainTokenBridge *SuperchainTokenBridgeFilterer) FilterSendERC20(opts *bind.FilterOpts, token []common.Address, from []common.Address, to []common.Address) (*SuperchainTokenBridgeSendERC20Iterator, error) {

	var tokenRule []interface{}
	for _, tokenItem := range token {
		tokenRule = append(tokenRule, tokenItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainTokenBridge.contract.FilterLogs(opts, "SendERC20", tokenRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &SuperchainTokenBridgeSendERC20Iterator{contract: _SuperchainTokenBridge.contract, event: "SendERC20", logs: logs, sub: sub}, nil
}

// WatchSendERC20 is a free log subscription operation binding the contract event 0x0247bfe63a1aaa59e073e20b172889babfda8d3273b5798e0e9ac4388e6dd11c.
//
// Solidity: event SendERC20(address indexed token, address indexed from, address indexed to, uint256 amount, uint256 destination)
func (_SuperchainTokenBridge *SuperchainTokenBridgeFilterer) WatchSendERC20(opts *bind.WatchOpts, sink chan<- *SuperchainTokenBridgeSendERC20, token []common.Address, from []common.Address, to []common.Address) (event.Subscription, error) {

	var tokenRule []interface{}
	for _, tokenItem := range token {
		tokenRule = append(tokenRule, tokenItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SuperchainTokenBridge.contract.WatchLogs(opts, "SendERC20", tokenRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SuperchainTokenBridgeSendERC20)
				if err := _SuperchainTokenBridge.contract.UnpackLog(event, "SendERC20", log); err != nil {
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

// ParseSendERC20 is a log parse operation binding the contract event 0x0247bfe63a1aaa59e073e20b172889babfda8d3273b5798e0e9ac4388e6dd11c.
//
// Solidity: event SendERC20(address indexed token, address indexed from, address indexed to, uint256 amount, uint256 destination)
func (_SuperchainTokenBridge *SuperchainTokenBridgeFilterer) ParseSendERC20(log types.Log) (*SuperchainTokenBridgeSendERC20, error) {
	event := new(SuperchainTokenBridgeSendERC20)
	if err := _SuperchainTokenBridge.contract.UnpackLog(event, "SendERC20", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
