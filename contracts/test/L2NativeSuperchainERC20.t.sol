// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

import {ERC20} from "@solady/tokens/ERC20.sol";

import {
    L2NativeSuperchainERC20,
    CallerNotL2ToL2CrossDomainMessenger,
    InvalidCrossDomainSender,
    ZeroAddress
} from "src/L2NativeSuperchainERC20.sol";
import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/interfaces/IL2ToL2CrossDomainMessenger.sol";
import {ISuperchainERC20, ISuperchainERC20Extensions} from "@contracts-bedrock/L2/interfaces/ISuperchainERC20.sol";

contract L2NativeSuperchainERC20Test is Test {
    address internal constant ZERO_ADDRESS = address(0);
    address internal constant MESSENGER = Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER;

    L2NativeSuperchainERC20 public superchainERC20;

    /// @notice Helper function to setup a mock and expect a call to it.
    function _mockAndExpect(address _receiver, bytes memory _calldata, bytes memory _returned) internal {
        vm.mockCall(_receiver, _calldata, _returned);
        vm.expectCall(_receiver, _calldata);
    }

    /// @notice Sets up the test suite.
    function setUp() public {
        superchainERC20 = new L2NativeSuperchainERC20();
    }

    function testFuzz_mint_succeeds(address _to, uint256 _amount) public {
        // Ensure `_to` is not the zero address
        vm.assume(_to != ZERO_ADDRESS);

        // Get the total supply and balance of `_to` before the mint to compare later on the assertions
        uint256 _totalSupplyBefore = superchainERC20.totalSupply();
        uint256 _toBalanceBefore = superchainERC20.balanceOf(_to);

        // Look for the emit of the `Transfer` event
        vm.expectEmit(true, true, true, true, address(superchainERC20));
        emit ERC20.Transfer(ZERO_ADDRESS, _to, _amount);

        // Look for the emit of the `Mint` event
        vm.expectEmit(true, true, true, true, address(superchainERC20));
        emit L2NativeSuperchainERC20.Mint(_to, _amount);

        superchainERC20.mint(_to, _amount);

        assertEq(superchainERC20.totalSupply(), _totalSupplyBefore + _amount);
        assertEq(superchainERC20.balanceOf(_to), _toBalanceBefore + _amount);
    }

    function testFuzz_mint_toZeroAddress_reverts(uint256 _amount) public {
        // Expect the revert with `ZeroAddress` selector
        vm.expectRevert(ZeroAddress.selector);

        // Call the `mint` function with the zero address
        superchainERC20.mint(ZERO_ADDRESS, _amount);
    }

    /// @notice Tests the `sendERC20` function burns the sender tokens, sends the message, and emits the `SendERC20`
    /// event.
    function testFuzz_sendERC20_succeeds(address _sender, address _to, uint256 _amount, uint256 _chainId) external {
        // Ensure `_sender` is not the zero address
        vm.assume(_sender != ZERO_ADDRESS);
        vm.assume(_to != ZERO_ADDRESS);

        // Mint some tokens to the sender so then they can be sent
        superchainERC20.mint(_sender, _amount);

        // Get the total supply and balance of `_sender` before the send to compare later on the assertions
        uint256 _totalSupplyBefore = superchainERC20.totalSupply();
        uint256 _senderBalanceBefore = superchainERC20.balanceOf(_sender);

        // Look for the emit of the `Transfer` event
        vm.expectEmit(true, true, true, true, address(superchainERC20));
        emit ERC20.Transfer(_sender, ZERO_ADDRESS, _amount);

        // Look for the emit of the `SendERC20` event
        vm.expectEmit(true, true, true, true, address(superchainERC20));
        emit ISuperchainERC20Extensions.SendERC20(_sender, _to, _amount, _chainId);

        // Mock the call over the `sendMessage` function and expect it to be called properly
        bytes memory _message = abi.encodeCall(superchainERC20.relayERC20, (_sender, _to, _amount));
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(
                IL2ToL2CrossDomainMessenger.sendMessage.selector, _chainId, address(superchainERC20), _message
            ),
            abi.encode("")
        );

        // Call the `sendERC20` function
        vm.prank(_sender);
        superchainERC20.sendERC20(_to, _amount, _chainId);

        // Check the total supply and balance of `_sender` after the send were updated correctly
        assertEq(superchainERC20.totalSupply(), _totalSupplyBefore - _amount);
        assertEq(superchainERC20.balanceOf(_sender), _senderBalanceBefore - _amount);
    }

    /// @notice Tests the `relayERC20` mints the proper amount and emits the `RelayERC20` event.
    function testFuzz_relayERC20_succeeds(address _from, address _to, uint256 _amount, uint256 _source) public {
        vm.assume(_from != ZERO_ADDRESS);
        vm.assume(_to != ZERO_ADDRESS);

        // Mock the call over the `crossDomainMessageSender` function setting the same address as value
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(address(superchainERC20))
        );

        // Mock the call over the `crossDomainMessageSource` function setting the source chain ID as value
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSource.selector),
            abi.encode(_source)
        );

        // Get the total supply and balance of `_to` before the relay to compare later on the assertions
        uint256 _totalSupplyBefore = superchainERC20.totalSupply();
        uint256 _toBalanceBefore = superchainERC20.balanceOf(_to);

        // Look for the emit of the `Transfer` event
        vm.expectEmit(true, true, true, true, address(superchainERC20));
        emit ERC20.Transfer(ZERO_ADDRESS, _to, _amount);

        // Look for the emit of the `RelayERC20` event
        vm.expectEmit(true, true, true, true, address(superchainERC20));
        emit ISuperchainERC20Extensions.RelayERC20(_from, _to, _amount, _source);

        // Call the `relayERC20` function with the messenger caller
        vm.prank(MESSENGER);
        superchainERC20.relayERC20(_from, _to, _amount);

        // Check the total supply and balance of `_to` after the relay were updated correctly
        assertEq(superchainERC20.totalSupply(), _totalSupplyBefore + _amount);
        assertEq(superchainERC20.balanceOf(_to), _toBalanceBefore + _amount);
    }
}
