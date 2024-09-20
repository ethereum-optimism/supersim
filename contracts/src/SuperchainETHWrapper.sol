// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import {Unauthorized} from "@contracts-bedrock/libraries/errors/CommonErrors.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {SafeCall} from "@contracts-bedrock//libraries/SafeCall.sol";
import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/interfaces/IL2ToL2CrossDomainMessenger.sol";
import {ISuperchainTokenBridge} from "@contracts-bedrock/L2/interfaces/ISuperchainTokenBridge.sol";
import {ISuperchainWETH} from "@contracts-bedrock/L2/interfaces/ISuperchainWETH.sol";

/**
 * @notice This contract has not been audited. It may contain bugs or security vulnerabilities.
 *         We are not liable for any issues arising from its use. It is strongly advised that this
 *         contract not be used with actual funds and should only be used for testing on
 *         testnets or in a controlled development environment.
 */

/**
 * @notice Thrown when the relay of SuperchainWETH has not succeeded.
 * @dev This error is triggered if the SuperchainWETH relay through the L2ToL2CrossDomainMessenger
 *      has not completed successfully successful.
 */
error RelaySuperchainWETHNotSuccessful();

/**
 * @title SuperchainETHWrapper
 * @notice This contract facilitates sending ETH across chains within the Superchain by wrapping
 *         ETH into SuperchainWETH, relaying the wrapped asset to another chain, and then
 *         unwrapping it back to ETH on the destination chain.
 * @dev The contract integrates with the SuperchainWETH contract for wrapping and unwrapping ETH,
 *      and uses the L2ToL2CrossDomainMessenger for relaying the wrapped ETH between chains.
 */
contract SuperchainETHWrapper {
    /**
     * @dev Emitted when ETH is received by the contract.
     * @param from The address that sent ETH.
     * @param value The amount of ETH received.
     */
    event ETHReceived(address indexed from, uint256 value);

    // Fallback function to receive ETH
    receive() external payable {
        emit ETHReceived(msg.sender, msg.value);
    }

    /**
     * @notice Unwraps SuperchainWETH into native ETH and sends it to a specified destination address
     *         then calls an arbitrary function at the destination..
     * @param _relayERC20MsgHash The hash of the relayed ERC20 message.
     * @param _dst The destination address on the receiving chain.
     * @param _wad The amount of SuperchainWETH to unwrap to ETH.
     * @param _calldata The calldata to be passed in the call to the destination address.
     */
    function unwrapAndCall(bytes32 _relayERC20MsgHash, address _dst, uint256 _wad, bytes memory _calldata) external {
        IL2ToL2CrossDomainMessenger messenger = IL2ToL2CrossDomainMessenger(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);
        if (msg.sender != address(messenger)) revert Unauthorized();
        if (messenger.crossDomainMessageSender() != address(this)) revert Unauthorized();

        if (messenger.successfulMessages(_relayERC20MsgHash) == false) {
            revert RelaySuperchainWETHNotSuccessful();
        }

        ISuperchainWETH(Predeploys.SUPERCHAIN_WETH).withdraw(_wad);
        SafeCall.call(_dst, _wad, _calldata);
    }

    /**
     * @notice Wraps ETH into SuperchainWETH and sends it to another chain.
     * @dev This function wraps the sent ETH into SuperchainWETH, computes the relay message hash,
     *      and relays the message to the destination chain.
     * @param _dst The destination address on the receiving chain.
     * @param _chainId The ID of the destination chain.
     * @param _calldata The calldata for the function to be called on the destination chain after unwrapping.
     */
    function sendETH(address _dst, uint256 _chainId, bytes memory _calldata) public payable {
        ISuperchainWETH(Predeploys.SUPERCHAIN_WETH).deposit{value: msg.value}();
        bytes32 messageHash = ISuperchainTokenBridge(Predeploys.SUPERCHAIN_TOKEN_BRIDGE).sendERC20(
            Predeploys.SUPERCHAIN_WETH, address(this), msg.value, _chainId
        );
        IL2ToL2CrossDomainMessenger(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER).sendMessage({
            _destination: _chainId,
            _target: address(this),
            _message: abi.encodeCall(this.unwrapAndCall, (messageHash, _dst, msg.value, _calldata))
        });
    }
}
