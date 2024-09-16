// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/interfaces/IL2ToL2CrossDomainMessenger.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

error CallerNotL2ToL2CrossDomainMessenger();

error InvalidCrossDomainSender();

struct PingPongBall {
    uint256 rallyCount;
    uint256 lastHitterChainId;
    address lastHitterAddress;
}

contract CrossChainPingPong {
    event BallSent(uint256 indexed toChainId, PingPongBall ball);

    event BallReceived(uint256 indexed fromChainId, PingPongBall ball);

    address internal constant MESSENGER = Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER;

    mapping(uint256 => bool) internal allowedChainIds;

    uint256 internal serverChainId;
    bool internal serverAlreadyServed;

    PingPongBall internal receivedBall;

    constructor(uint256[] memory _allowedChainIds, uint256 _serverChainId) {
        for (uint256 i = 0; i < _allowedChainIds.length; i++) {
            allowedChainIds[_allowedChainIds[i]] = true;
        }

        require(allowedChainIds[_serverChainId], "Invalid first server chain ID");

        serverChainId = _serverChainId;
    }

    function serveBall(uint256 _toChainId) external {
        require(serverChainId == block.chainid, "Cannot serve ball from this chain");
        require(serverAlreadyServed == false, "Ball already served");
        require(_isValidDestinationChain(_toChainId), "Invalid destination chain ID");

        serverAlreadyServed = true;

        PingPongBall memory _newBall = PingPongBall(1, block.chainid, msg.sender);

        _sendBallMessage(_newBall, _toChainId);

        emit BallSent(_toChainId, _newBall);
    }

    function sendBall(uint256 _toChainId) public {
        require(_isBallOnThisChain(), "Ball is not on this chain");
        require(_isValidDestinationChain(_toChainId), "Invalid destination chain ID");

        PingPongBall memory _newBall = PingPongBall(receivedBall.rallyCount + 1, block.chainid, msg.sender);

        delete receivedBall;

        _sendBallMessage(_newBall, _toChainId);

        emit BallSent(_toChainId, _newBall);
    }

    function receiveBall(PingPongBall memory _ball) external {
        if (msg.sender != MESSENGER) {
            revert CallerNotL2ToL2CrossDomainMessenger();
        }

        if (IL2ToL2CrossDomainMessenger(MESSENGER).crossDomainMessageSender() != address(this)) {
            revert InvalidCrossDomainSender();
        }

        receivedBall.lastHitterAddress = _ball.lastHitterAddress;
        receivedBall.lastHitterChainId = _ball.lastHitterChainId;
        receivedBall.rallyCount = _ball.rallyCount;

        emit BallReceived(IL2ToL2CrossDomainMessenger(MESSENGER).crossDomainMessageSource(), _ball);
    }

    function _sendBallMessage(PingPongBall memory _ball, uint256 _toChainId) internal {
        bytes memory _message = abi.encodeCall(this.receiveBall, (_ball));
        IL2ToL2CrossDomainMessenger(MESSENGER).sendMessage(_toChainId, address(this), _message);
    }

    function _isBallOnThisChain() internal view returns (bool) {
        // Hack to check if receivedBall has been set
        return receivedBall.lastHitterAddress != address(0);
    }

    function _isValidDestinationChain(uint256 _toChainId) internal view returns (bool) {
        return allowedChainIds[_toChainId] && _toChainId != block.chainid;
    }
}
