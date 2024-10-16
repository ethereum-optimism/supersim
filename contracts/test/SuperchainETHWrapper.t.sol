// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import {Test} from "forge-std/Test.sol";

import {Unauthorized} from "@contracts-bedrock/libraries/errors/CommonErrors.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/interfaces/IL2ToL2CrossDomainMessenger.sol";
import {ISuperchainERC20Extensions} from "@contracts-bedrock/L2/interfaces/ISuperchainERC20.sol";
import {IWETH} from "@contracts-bedrock/universal/interfaces/IWETH.sol";

import {SuperchainETHWrapper, RelaySuperchainWETHNotSuccessful} from "src/SuperchainETHWrapper.sol";

/// @title SuperchainETHWrapper Happy Path Tests
/// @notice This contract contains the tests for successful paths in SuperchainETHWrapper.
contract SuperchainETHWrapper_HappyPath_Test is Test {
    address internal constant SUPERCHAIN_WETH = Predeploys.SUPERCHAIN_WETH;
    address internal constant MESSENGER = Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER;

    SuperchainETHWrapper public superchainETHWrapper;

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
    }

    /// @notice Tests the `sendETH` function deposits the sender's tokens, calls
    /// SuperchainWETH.sendERC20, and sends an encoded call to
    /// SuperchainETHWrapper.unwrap through L2ToL2CrossDomainMessenger.
    function testFuzz_sendETH_succeeds(address _sender, address _to, uint256 _amount, uint256 _nonce, uint256 _chainId)
        public
    {
        vm.assume(_chainId != block.chainid);
        _amount = bound(_amount, 0, type(uint248).max - 1);
        vm.deal(_sender, _amount);

        _mockAndExpect(SUPERCHAIN_WETH, _amount, abi.encodeCall(IWETH.deposit, ()), abi.encode(""));
        _mockAndExpect(
            SUPERCHAIN_WETH,
            abi.encodeCall(ISuperchainERC20Extensions.sendERC20, (address(superchainETHWrapper), _amount, _chainId)),
            abi.encode("")
        );
        _mockAndExpect(MESSENGER, abi.encodeCall(IL2ToL2CrossDomainMessenger.messageNonce, ()), abi.encode(_nonce));
        bytes32 expectedRelayERC20MessageHash = keccak256(
            abi.encode(
                _chainId,
                block.chainid,
                _nonce,
                Predeploys.SUPERCHAIN_WETH,
                Predeploys.SUPERCHAIN_WETH,
                abi.encodeCall(
                    ISuperchainERC20Extensions(Predeploys.SUPERCHAIN_WETH).relayERC20,
                    (address(superchainETHWrapper), address(superchainETHWrapper), _amount)
                )
            )
        );
        bytes memory _message =
            abi.encodeCall(superchainETHWrapper.unwrap, (expectedRelayERC20MessageHash, _to, _amount));
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(
                IL2ToL2CrossDomainMessenger.sendMessage.selector, _chainId, address(superchainETHWrapper), _message
            ),
            abi.encode("")
        );

        vm.prank(_sender);
        superchainETHWrapper.sendETH{value: _amount}(_to, _chainId);
    }

    /**
     * @notice Tests the successful execution of the `unwrap` function.
     * @dev This test mocks the `crossDomainMessageSender` and `successfulMessages` function calls
     *      to simulate the proper cross-domain message behavior.
     * @param _to Address receiving the unwrapped ETH.
     * @param _amount Amount of ETH to be unwrapped and sent.
     * @param _relayERC20MsgHash Hash of the relayed message.
     */
    function testFuzz_unwrap_succeeds(address _to, uint256 _amount, bytes32 _relayERC20MsgHash) public {
        _amount = bound(_amount, 0, type(uint248).max - 1);
        // Ensure that the target contract is not a Forge contract.
        assumeNotForgeAddress(_to);
        // Ensure that the target call is payable if value is sent
        assumePayable(_to);

        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(address(superchainETHWrapper))
        );
        _mockAndExpect(
            MESSENGER,
            abi.encodeCall(IL2ToL2CrossDomainMessenger.successfulMessages, (_relayERC20MsgHash)),
            abi.encode(true)
        );
        _mockAndExpect(SUPERCHAIN_WETH, abi.encodeCall(IWETH.withdraw, (_amount)), abi.encode(""));
        // Simulates the withdrawal being sent to the SuperchainETHWrapper contract.
        vm.deal(address(superchainETHWrapper), _amount);

        vm.prank(MESSENGER);
        uint256 prevBalance = _to.balance;
        superchainETHWrapper.unwrap(_relayERC20MsgHash, _to, _amount);
        assertEq(_to.balance - prevBalance, _amount);
    }
}

/// @title SuperchainETHWrapper Revert Tests
/// @notice This contract contains tests to check that certain conditions result in expected
///         reverts.
contract SuperchainETHWrapperRevertTests is Test {
    address internal constant MESSENGER = Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER;

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
    function testFuzz_unwrap_fromUnrelayedMsgHash_reverts(address _to, uint256 _amount, bytes32 _relayERC20MsgHash)
        public
    {
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(address(superchainETHWrapper))
        );
        _mockAndExpect(
            MESSENGER,
            abi.encodeCall(IL2ToL2CrossDomainMessenger.successfulMessages, (_relayERC20MsgHash)),
            abi.encode(false)
        );

        vm.prank(MESSENGER);
        vm.expectRevert(RelaySuperchainWETHNotSuccessful.selector);
        superchainETHWrapper.unwrap(_relayERC20MsgHash, _to, _amount);
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
        bytes32 _relayERC20MsgHash
    ) public {
        vm.assume(_sender != MESSENGER);

        vm.prank(_sender);
        vm.expectRevert(Unauthorized.selector);
        superchainETHWrapper.unwrap(_relayERC20MsgHash, _to, _amount);
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
        bytes32 _relayERC20MsgHash
    ) public {
        vm.assume(_sender != address(superchainETHWrapper));

        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(_sender)
        );

        vm.prank(MESSENGER);
        vm.expectRevert(Unauthorized.selector);
        superchainETHWrapper.unwrap(_relayERC20MsgHash, _to, _amount);
    }
}
