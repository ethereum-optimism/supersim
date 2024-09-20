// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import {Unauthorized} from "@contracts-bedrock/libraries/errors/CommonErrors.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {SafeCall} from "@contracts-bedrock//libraries/SafeCall.sol";
import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/interfaces/IL2ToL2CrossDomainMessenger.sol";
import {ISuperchainERC20Extensions} from "@contracts-bedrock/L2/interfaces/ISuperchainERC20.sol";
import {IWETH} from "@contracts-bedrock/universal/interfaces/IWETH.sol";

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
    event LogReceived(address from, uint256 value);

    // Fallback function to receive ETH
    receive() external payable {
        emit LogReceived(msg.sender, msg.value);
    }

    /**
     * @notice Unwraps SuperchainWETH into native ETH and sends it to a specified destination address.
     * @param _relayERC20MsgHash The hash of the relayed ERC20 message.
     * @param _dst The destination address on the receiving chain.
     * @param _wad The amount of SuperchainWETH to unwrap to ETH.
     */
    function unwrap(bytes32 _relayERC20MsgHash, address _dst, uint256 _wad) external {
        // Receive message from other chain.
        IL2ToL2CrossDomainMessenger messenger = IL2ToL2CrossDomainMessenger(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);
        if (msg.sender != address(messenger)) revert Unauthorized();
        if (messenger.crossDomainMessageSender() != address(this)) revert Unauthorized();

        if (messenger.successfulMessages(_relayERC20MsgHash) == false) {
            revert RelaySuperchainWETHNotSuccessful();
        }

        IWETH(Predeploys.SUPERCHAIN_WETH).withdraw(_wad);
        SafeCall.call(_dst, _wad, hex"");
    }

    /**
     * @notice Wraps ETH into SuperchainWETH and sends it to another chain.
     * @dev This function wraps the sent ETH into SuperchainWETH, computes the relay message hash,
     *      and relays the message to the destination chain.
     * @param _dst The destination address on the receiving chain.
     * @param _chainId The ID of the destination chain.
     */
    function sendETH(address _dst, uint256 _chainId) public payable {
        IWETH(Predeploys.SUPERCHAIN_WETH).deposit{value: msg.value}();

        IL2ToL2CrossDomainMessenger messenger = IL2ToL2CrossDomainMessenger(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);
        bytes32 relayERC20MessageHash = keccak256(
            abi.encode(
                _chainId,
                block.chainid,
                messenger.messageNonce(),
                Predeploys.SUPERCHAIN_WETH,
                Predeploys.SUPERCHAIN_WETH,
                abi.encodeCall(
                    ISuperchainERC20Extensions(Predeploys.SUPERCHAIN_WETH).relayERC20,
                    (address(this), address(this), msg.value)
                )
            )
        );
        ISuperchainERC20Extensions(Predeploys.SUPERCHAIN_WETH).sendERC20(address(this), msg.value, _chainId);
        messenger.sendMessage({
            _destination: _chainId,
            _target: address(this),
            _message: abi.encodeCall(this.unwrap, (relayERC20MessageHash, _dst, msg.value))
        });
    }
}
