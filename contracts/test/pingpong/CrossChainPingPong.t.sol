// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";
import {
    CrossChainPingPong,
    PingPongBall,
    CallerNotL2ToL2CrossDomainMessenger,
    InvalidCrossDomainSender,
    BallAlreadyServed
} from "../../src/pingpong/CrossChainPingPong.sol";
import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/interfaces/IL2ToL2CrossDomainMessenger.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

contract CrossChainPingPongTest is Test {
    address internal constant MESSENGER = Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER;

    CrossChainPingPong public crossChainPingPong;

    address bob;
    address sally;

    // Helper function to mock and expect a call
    function _mockAndExpect(address _receiver, bytes memory _calldata, bytes memory _returned) internal {
        vm.mockCall(_receiver, _calldata, _returned);
        vm.expectCall(_receiver, _calldata);
    }

    function setUp() public {
        // Setting up allowed chains and server chain for testing
        uint256[] memory allowedChains = new uint256[](2);
        allowedChains[0] = 901;
        allowedChains[1] = 902;

        crossChainPingPong = new CrossChainPingPong(allowedChains, 901);

        bob = vm.addr(1);
        sally = vm.addr(2);
    }

    // Test serving the ball
    function testServeBallTo() public {
        uint256 fromChainId = 901;
        uint256 toChainId = 902;

        vm.chainId(fromChainId);

        // Expect the BallSent event
        PingPongBall memory _expectedBall = PingPongBall(1, block.chainid, bob);
        vm.expectEmit(true, true, true, true, address(crossChainPingPong));
        emit CrossChainPingPong.BallSent(fromChainId, toChainId, _expectedBall);

        // Mock cross-chain message send call
        bytes memory _message = abi.encodeCall(crossChainPingPong.receiveBall, (_expectedBall));
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(
                IL2ToL2CrossDomainMessenger.sendMessage.selector, toChainId, address(crossChainPingPong), _message
            ),
            abi.encode("")
        );

        // Serve the ball
        vm.prank(bob);
        crossChainPingPong.serveBallTo(toChainId);

        // Ensure serve can only happen once
        vm.expectRevert(BallAlreadyServed.selector);
        crossChainPingPong.serveBallTo(toChainId);
    }

    // Test receiving the ball from a valid cross-chain message
    function testReceiveBall() public {
        uint256 fromChainId = 901;
        uint256 toChainId = 902;

        vm.chainId(toChainId);
        // Set up the mock for cross-domain message sender validation
        PingPongBall memory _ball = PingPongBall(1, fromChainId, address(this));
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(address(crossChainPingPong))
        );

        // Set up cross-domain message source mock
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSource.selector),
            abi.encode(fromChainId)
        );

        // Expect the BallReceived event
        vm.expectEmit(true, true, true, true, address(crossChainPingPong));
        emit CrossChainPingPong.BallReceived(fromChainId, toChainId, _ball);

        // Call receiveBall as if from the messenger
        vm.prank(MESSENGER);
        crossChainPingPong.receiveBall(_ball);
    }

    // Test receiving then sending the ball
    function testHitBall() public {
        // 1. receive a ball from 901 to 902
        uint256 receiveFromChainId = 901;
        uint256 receiveToChainId = 902;

        vm.chainId(receiveToChainId);

        // Set up the mock for cross-domain message sender validation
        PingPongBall memory _ball = PingPongBall(1, receiveFromChainId, sally);
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(address(crossChainPingPong))
        );

        // Set up cross-domain message source mock
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSource.selector),
            abi.encode(receiveFromChainId)
        );

        // Expect the BallReceived event
        vm.expectEmit(true, true, true, true, address(crossChainPingPong));
        emit CrossChainPingPong.BallReceived(receiveFromChainId, receiveToChainId, _ball);

        vm.prank(MESSENGER);
        crossChainPingPong.receiveBall(_ball);

        // 2. send a ball from 902 to 901

        uint256 sendFromChainId = 902;
        uint256 sendToChainId = 901;
        vm.chainId(sendFromChainId);

        // Set up the expected event and mock
        PingPongBall memory _newBall = PingPongBall(2, sendFromChainId, bob);

        bytes memory _message = abi.encodeCall(crossChainPingPong.receiveBall, (_newBall));
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(
                IL2ToL2CrossDomainMessenger.sendMessage.selector, sendToChainId, address(crossChainPingPong), _message
            ),
            abi.encode("")
        );

        vm.expectEmit(true, true, true, true, address(crossChainPingPong));
        emit CrossChainPingPong.BallSent(sendFromChainId, sendToChainId, _newBall);

        // Send the ball
        vm.prank(bob);
        crossChainPingPong.hitBallTo(sendToChainId);
    }

    // Test receiving ball with an invalid cross-chain message sender
    function testReceiveBallInvalidSender() public {
        PingPongBall memory _ball = PingPongBall(1, block.chainid, address(this));

        // Expect revert due to invalid sender
        vm.expectRevert(CallerNotL2ToL2CrossDomainMessenger.selector);
        crossChainPingPong.receiveBall(_ball);
    }

    // Test receiving ball with an invalid cross-domain source
    function testReceiveBallInvalidCrossDomainSender() public {
        PingPongBall memory _ball = PingPongBall(1, block.chainid, address(this));

        // Mock the cross-domain message sender to be invalid
        _mockAndExpect(
            MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(address(0xdeadbeef)) // Invalid address
        );

        // Expect revert due to invalid cross-domain sender
        vm.expectRevert(InvalidCrossDomainSender.selector);
        vm.prank(MESSENGER);
        crossChainPingPong.receiveBall(_ball);
    }
}
