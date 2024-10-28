// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/interfaces/IL2ToL2CrossDomainMessenger.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

/// @notice Thrown when a function is called by an address other than the L2ToL2CrossDomainMessenger.
error CallerNotL2ToL2CrossDomainMessenger();

/// @notice Thrown when the cross-domain sender is not this contract's address on another chain.
error InvalidCrossDomainSender();

/// @notice Thrown when attempting to hit the ball when it's not on the current chain.
error BallNotPresent();

/// @notice Thrown when attempting to hit to an invalid chain
error InvalidDestination();

/// @notice Represents the state of the ping-pong ball.
/// @param rallyCount The number of times the ball has been hit.
/// @param lastHitterChainId The chain ID of the last chain to hit the ball.
/// @param lastHitterAddress The address of the last player to hit the ball.
struct PingPongBall {
    uint256 rallyCount;
    uint256 lastHitterChainId;
    address lastHitterAddress;
}

/**
 * @title CrossChainPingPong
 * @notice This contract implements a cross-chain ping-pong game using the L2ToL2CrossDomainMessenger.
 * Players hit a virtual *ball* back and forth between allowed L2 chains. The game starts with a serve
 * from a designated server chain, and each hit increases the rally count. The contract tracks the
 * last hitter's address, chain ID, and the current rally count.
 * @dev This contract relies on the L2ToL2CrossDomainMessenger for cross-chain communication.
 */
contract CrossChainPingPong {
    /// @notice Emitted when a ball is sent
    event BallSent(uint256 indexed fromChainId, uint256 indexed toChainId, PingPongBall ball);

    /// @notice Emitted when a ball is received
    event BallReceived(uint256 indexed fromChainId, uint256 indexed toChainId, PingPongBall ball);

    /// @dev The L2 to L2 cross domain messenger predeploy to handle message passing
    IL2ToL2CrossDomainMessenger internal messenger = IL2ToL2CrossDomainMessenger(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);

    /// @dev Modifier to restrict a function to only be a cross-domain callback into this contract
    modifier onlyCrossDomainCallback() {
        if (msg.sender != address(messenger)) revert CallerNotL2ToL2CrossDomainMessenger();
        if (messenger.crossDomainMessageSender() != address(this)) revert InvalidCrossDomainSender();

        _;
    }

    /// @dev The current ball on this chain, empty if not present
    PingPongBall public ball;

    /**
     * @notice Since CREATE2 includes initcode, the game address is deterministic with the the starting chain.
     * @param _serverChainId The chain that starts with the ball.
     */
    constructor(uint256 _serverChainId) {
        if (block.chainid == _serverChainId) {
            ball = PingPongBall(1, block.chainid, msg.sender);
        }
    }

    /**
     * @notice Hit the ball to a specified destination chain.
     * @param _toChainId The chain id of the destination
     */
    function hitBallTo(uint256 _toChainId) public {
        if (ball.lastHitterAddress == address(0)) revert BallNotPresent();
        if (_toChainId == block.chainid) revert InvalidDestination();

        // Construct a new ball
        PingPongBall memory newBall = PingPongBall(ball.rallyCount + 1, block.chainid, msg.sender);

        // Delete the reference
        delete ball;

        // Send to the destination
        messenger.sendMessage(_toChainId, address(this), abi.encodeCall(this.receiveBall, (newBall)));

        emit BallSent(block.chainid, _toChainId, newBall);
    }

    /**
     * @notice Receives the ping-pong ball from another chain.
     * @dev Only callable by the L2ToL2CrossDomainMessenger.
     * @param _ball The PingPongBall received from the other chain.
     */
    function receiveBall(PingPongBall memory _ball) onlyCrossDomainCallback() external {
        // Hold reference to the ball
        ball = _ball;

        emit BallReceived(messenger.crossDomainMessageSource(), block.chainid, _ball);
    }
}
