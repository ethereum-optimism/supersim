// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/interfaces/IL2ToL2CrossDomainMessenger.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

/// @notice Thrown when a function is called by an address other than the L2ToL2CrossDomainMessenger.
error CallerNotL2ToL2CrossDomainMessenger();

/// @notice Thrown when the cross-domain sender is not this contract's address on another chain.
error InvalidCrossDomainSender();

/// @notice Thrown when attempting to serve the ball from a non-server chain.
error UnauthorizedServer(uint256 callerChainId, uint256 serverChainId);

/// @notice Thrown when attempting to serve the ball more than once.
error BallAlreadyServed();

/// @notice Thrown when attempting to hit the ball to an invalid destination chain.
error InvalidDestinationChain(uint256 toChainId);

/// @notice Thrown when attempting to hit the ball when it's not on the current chain.
error BallNotPresent();

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
    /// @notice Emitted when a ball is sent from one chain to another.
    /// @param fromChainId The chain ID from which the ball is sent.
    /// @param toChainId The chain ID to which the ball is sent.
    /// @param ball The PingPongBall data structure containing rally count and hitter information.
    event BallSent(uint256 indexed fromChainId, uint256 indexed toChainId, PingPongBall ball);

    /// @notice Emitted when a ball is received on a chain.
    /// @param fromChainId The chain ID from which the ball was sent.
    /// @param toChainId The chain ID on which the ball was received.
    /// @param ball The PingPongBall data structure containing rally count and hitter information.
    event BallReceived(uint256 indexed fromChainId, uint256 indexed toChainId, PingPongBall ball);

    /// @dev Address of the L2 to L2 cross-domain messenger predeploy.
    address internal constant MESSENGER = Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER;

    /// @notice Chain ID of the server (initial ball sender).
    uint256 internal immutable SERVER_CHAIN_ID;

    /// @dev Flag indicating if the server has already served the ball.
    bool internal _hasServerAlreadyServed;

    /// @dev Mapping to track which chain IDs are allowed in the game.
    mapping(uint256 => bool) internal _isChainIdAllowed;

    /// @dev The current received ball on this chain.
    PingPongBall internal _receivedBall;

    /// @dev Tracks whether the ball is currently on this chain.
    bool private _isBallPresent;

    /**
     * @notice Constructor initializes the contract with allowed chain IDs and the server chain ID.
     * @param _allowedChainIds The list of chain IDs that are allowed to participate in the game.
     * @param _serverChainId The chain ID that will act as the server for the first ball serve.
     * @dev Ensures that the server chain ID is included in the list of allowed chain IDs.
     */
    constructor(uint256[] memory _allowedChainIds, uint256 _serverChainId) {
        for (uint256 i = 0; i < _allowedChainIds.length; i++) {
            _isChainIdAllowed[_allowedChainIds[i]] = true;
        }

        if (!_isChainIdAllowed[_serverChainId]) {
            revert InvalidDestinationChain(_serverChainId);
        }

        SERVER_CHAIN_ID = _serverChainId;
    }

    /**
     * @notice Serve the ping-pong ball to a specified destination chain.
     * @dev Can only be called once from the server chain, and this starts off the game.
     * @param _toChainId The chain ID to which the ball is served.
     */
    function serveBallTo(uint256 _toChainId) external {
        if (SERVER_CHAIN_ID != block.chainid) {
            revert UnauthorizedServer(block.chainid, SERVER_CHAIN_ID);
        }
        if (_hasServerAlreadyServed) {
            revert BallAlreadyServed();
        }
        if (!_isValidDestinationChain(_toChainId)) {
            revert InvalidDestinationChain(_toChainId);
        }
        _hasServerAlreadyServed = true;

        PingPongBall memory _newBall = PingPongBall(1, block.chainid, msg.sender);

        _sendCrossDomainMessage(_newBall, _toChainId);

        emit BallSent(block.chainid, _toChainId, _newBall);
    }

    /**
     * @notice Hit the received ping-pong ball to a specified destination chain.
     * @dev Can only be called when the ball is on the current chain.
     * @param _toChainId The chain ID to which the ball is hit.
     */
    function hitBallTo(uint256 _toChainId) public {
        if (!_isBallPresent) {
            revert BallNotPresent();
        }
        if (!_isValidDestinationChain(_toChainId)) {
            revert InvalidDestinationChain(_toChainId);
        }

        PingPongBall memory _newBall = PingPongBall(_receivedBall.rallyCount + 1, block.chainid, msg.sender);

        delete _receivedBall;
        _isBallPresent = false;

        _sendCrossDomainMessage(_newBall, _toChainId);

        emit BallSent(block.chainid, _toChainId, _newBall);
    }

    /**
     * @notice Receives the ping-pong ball from another chain.
     * @dev Only callable by the L2 to L2 cross-domain messenger.
     * @param _ball The PingPongBall data received from another chain.
     */
    function receiveBall(PingPongBall memory _ball) external {
        if (msg.sender != MESSENGER) {
            revert CallerNotL2ToL2CrossDomainMessenger();
        }

        if (IL2ToL2CrossDomainMessenger(MESSENGER).crossDomainMessageSender() != address(this)) {
            revert InvalidCrossDomainSender();
        }

        _receivedBall = _ball;
        _isBallPresent = true;

        emit BallReceived(IL2ToL2CrossDomainMessenger(MESSENGER).crossDomainMessageSource(), block.chainid, _ball);
    }

    /**
     * @notice Internal function to send the ping-pong ball to another chain.
     * @dev Uses the L2ToL2CrossDomainMessenger to send the message.
     * @param _ball The PingPongBall data to send.
     * @param _toChainId The chain ID to which the ball is sent.
     */
    function _sendCrossDomainMessage(PingPongBall memory _ball, uint256 _toChainId) internal {
        bytes memory _message = abi.encodeCall(this.receiveBall, (_ball));
        IL2ToL2CrossDomainMessenger(MESSENGER).sendMessage(_toChainId, address(this), _message);
    }

    /**
     * @notice Checks if a destination chain ID is valid.
     * @param _toChainId The destination chain ID to validate.
     * @return True if the destination chain ID is allowed and different from the current chain.
     */
    function _isValidDestinationChain(uint256 _toChainId) internal view returns (bool) {
        return _isChainIdAllowed[_toChainId] && _toChainId != block.chainid;
    }
}
