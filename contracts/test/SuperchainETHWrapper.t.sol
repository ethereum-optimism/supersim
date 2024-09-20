// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import {Test} from "forge-std/Test.sol";

import {Unauthorized} from "@contracts-bedrock/libraries/errors/CommonErrors.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/interfaces/IL2ToL2CrossDomainMessenger.sol";
import {ISuperchainTokenBridge} from "@contracts-bedrock/L2/interfaces/ISuperchainTokenBridge.sol";
import {ISuperchainWETH} from "@contracts-bedrock/L2/interfaces/ISuperchainWETH.sol";
import {IWETH} from "@contracts-bedrock/universal/interfaces/IWETH.sol";
import {SuperchainWETH} from "@contracts-bedrock/L2/SuperchainWETH.sol";

import {SuperchainETHWrapper, RelaySuperchainWETHNotSuccessful} from "../src/SuperchainETHWrapper.sol";

/// @title SuperchainETHWrapper Happy Path Tests
/// @notice This contract contains the tests for successful paths in SuperchainETHWrapper.
contract SuperchainETHWrapper_HappyPath_Test is Test {
    SuperchainETHWrapper public superchainETHWrapper;
    address bob;

    /// @notice Helper function to setup a mock and expect a call to it.
    function _mockAndExpect(address _receiver, bytes memory _calldata, bytes memory _returned) internal {
        vm.mockCall(_receiver, _calldata, _returned);
        vm.expectCall(_receiver, _calldata);
    }

    /// @notice Helper function to setup a mock and expect a call to it.
    function _mockAndExpect(address _receiver, uint256 _msgValue, bytes memory _calldata, bytes memory _returned)
        internal
    {
        vm.mockCall(_receiver, _msgValue, _calldata, _returned);
        vm.expectCall(_receiver, _msgValue, _calldata);
    }

    /// @notice Sets up the test suite.
    function setUp() public {
        superchainETHWrapper = new SuperchainETHWrapper();
        SuperchainWETH superchainWETH = new SuperchainWETH();
        vm.etch(Predeploys.SUPERCHAIN_WETH, address(superchainWETH).code);
        bob = makeAddr("bob");
    }

    /// @notice Tests the `sendETH` function deposits the sender's tokens, calls
    /// SuperchainWETH.sendERC20, and sends an encoded call to
    /// SuperchainETHWrapper.unwrapAndCallAndCall through L2ToL2CrossDomainMessenger.
    function testFuzz_sendETH_succeeds(
        address _sender,
        address _to,
        uint256 _amount,
        uint256 _chainId,
        bytes32 messageHash,
        bytes memory _calldata
    ) public {
        vm.assume(_chainId != block.chainid);
        _amount = bound(_amount, 0, type(uint248).max - 1);
        vm.deal(_sender, _amount);
        _mockAndExpect(
            Predeploys.SUPERCHAIN_WETH, _amount, abi.encodeWithSelector(IWETH.deposit.selector), abi.encode("")
        );
        _mockAndExpect(
            Predeploys.SUPERCHAIN_TOKEN_BRIDGE,
            abi.encodeCall(
                ISuperchainTokenBridge.sendERC20,
                (Predeploys.SUPERCHAIN_WETH, address(superchainETHWrapper), _amount, _chainId)
            ),
            abi.encode(messageHash)
        );
        bytes memory _message =
            abi.encodeCall(superchainETHWrapper.unwrapAndCall, (messageHash, _to, _amount, _calldata));
        _mockAndExpect(
            Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER,
            abi.encodeWithSelector(
                IL2ToL2CrossDomainMessenger.sendMessage.selector, _chainId, address(superchainETHWrapper), _message
            ),
            abi.encode("")
        );

        vm.prank(_sender);
        superchainETHWrapper.sendETH{value: _amount}(_to, _chainId, _calldata);
    }

    /**
     * @notice Tests the successful execution of the `unwrapAndCall` function.
     * @dev This test mocks the `crossDomainMessageSender` and `successfulMessages` function calls
     *      to simulate the proper cross-domain message behavior.
     * @param _amount Amount of ETH to be unwrapped and sent.
     * @param _relayERC20MsgHash Hash of the relayed message.
     */
    function testFuzz_unwrapAndCall_succeeds(uint256 _amount, bytes32 _relayERC20MsgHash, bytes memory _calldata)
        public
    {
        _amount = bound(_amount, 0, type(uint248).max - 1);

        _mockAndExpect(
            Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(address(superchainETHWrapper))
        );
        _mockAndExpect(
            Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER,
            abi.encodeCall(IL2ToL2CrossDomainMessenger.successfulMessages, (_relayERC20MsgHash)),
            abi.encode(true)
        );
        _mockAndExpect(
            Predeploys.SUPERCHAIN_WETH,
            abi.encodeCall(ISuperchainWETH(Predeploys.SUPERCHAIN_WETH).withdraw, (_amount)),
            abi.encode("")
        );
        // Simulates the withdrawal being sent to the SuperchainETHWrapper contract.
        vm.deal(address(superchainETHWrapper), _amount);

        uint256 prevBalance = bob.balance;
        vm.expectCall(bob, _amount, _calldata);
        vm.prank(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);
        superchainETHWrapper.unwrapAndCall(_relayERC20MsgHash, bob, _amount, _calldata);
        assertEq(bob.balance - prevBalance, _amount);
    }
}

/// @title SuperchainETHWrapper Revert Tests
/// @notice This contract contains tests to check that certain conditions result in expected
///         reverts.
contract SuperchainETHWrapperRevertTests is Test {
    SuperchainETHWrapper public superchainETHWrapper;

    /// @notice Helper function to setup a mock and expect a call to it.
    function _mockAndExpect(address _receiver, bytes memory _calldata, bytes memory _returned) internal {
        vm.mockCall(_receiver, _calldata, _returned);
        vm.expectCall(_receiver, _calldata);
    }

    /// @notice Sets up the test suite.
    function setUp() public {
        superchainETHWrapper = new SuperchainETHWrapper();
    }

    /**
     * @notice Tests that the `unwrap` function reverts when the message is unrelayed.
     * @dev Mocks the cross-domain message sender and sets `successfulMessages` to return `false`,
     *      triggering a revert when trying to call `unwrap`.
     * @param _to Address receiving the unwrapped ETH.
     * @param _amount Amount of ETH to be unwrapped.
     * @param _relayERC20MsgHash Hash of the relayed message.
     */
    function testFuzz_unwrap_fromUnrelayedMsgHash_reverts(
        address _to,
        uint256 _amount,
        bytes32 _relayERC20MsgHash,
        bytes memory _calldata
    ) public {
        _mockAndExpect(
            Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(address(superchainETHWrapper))
        );
        _mockAndExpect(
            Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER,
            abi.encodeCall(IL2ToL2CrossDomainMessenger.successfulMessages, (_relayERC20MsgHash)),
            abi.encode(false)
        );

        vm.prank(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);
        vm.expectRevert(RelaySuperchainWETHNotSuccessful.selector);
        superchainETHWrapper.unwrapAndCall(_relayERC20MsgHash, _to, _amount, _calldata);
    }

    /**
     * @notice Tests that the `unwrap` function reverts when the sender is not the expected messenger.
     * @dev Mocks an invalid sender (not the messenger) to ensure the function reverts with the
     *      `Unauthorized` error.
     * @param _sender Address that tries to call `unwrap` but is not the messenger.
     * @param _to Address receiving the unwrapped ETH.
     * @param _amount Amount of ETH to be unwrapped.
     * @param _relayERC20MsgHash Hash of the relayed message.
     */
    function testFuzz_unwrap_nonMessengerSender_reverts(
        address _sender,
        address _to,
        uint256 _amount,
        bytes32 _relayERC20MsgHash,
        bytes memory _calldata
    ) public {
        vm.assume(_sender != Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);

        vm.prank(_sender);
        vm.expectRevert(Unauthorized.selector);
        superchainETHWrapper.unwrapAndCall(_relayERC20MsgHash, _to, _amount, _calldata);
    }

    /**
     * @notice Tests that the `unwrap` function reverts when the cross-domain message sender is
     *         not the SuperchainETHWrapper contract.
     * @dev Mocks a wrong cross-domain message sender and ensures the function reverts with the
     *      `Unauthorized` error.
     * @param _sender Address that tries to call `unwrap` but is not the correct message sender.
     * @param _to Address receiving the unwrapped ETH.
     * @param _amount Amount of ETH to be unwrapped.
     * @param _relayERC20MsgHash Hash of the relayed message.
     */
    function testFuzz_unwrap_wrongCrossDomainMessageSender_reverts(
        address _sender,
        address _to,
        uint256 _amount,
        bytes32 _relayERC20MsgHash,
        bytes memory _calldata
    ) public {
        vm.assume(_sender != address(superchainETHWrapper));

        _mockAndExpect(
            Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(_sender)
        );

        vm.prank(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);
        vm.expectRevert(Unauthorized.selector);
        superchainETHWrapper.unwrapAndCall(_relayERC20MsgHash, _to, _amount, _calldata);
    }
}
