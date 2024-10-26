// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";

import {IL2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/interfaces/IL2ToL2CrossDomainMessenger.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

import {
    CrossChainPingPong,
    PingPongBall,
    CallerNotL2ToL2CrossDomainMessenger,
    BallNotPresent,
    InvalidCrossDomainSender,
    InvalidDestination
} from "../../src/pingpong/CrossChainPingPong.sol";

contract CrossChainPingPongTest is Test {
    CrossChainPingPong public crossChainPingPong;

    address bob;
    address sally;

    // Helper function to mock and expect a call
    function _mockAndExpect(address _receiver, bytes memory _calldata, bytes memory _returned) internal {
        vm.mockCall(_receiver, _calldata, _returned);
        vm.expectCall(_receiver, _calldata);
    }

    function setUp() public {
        vm.chainId(901);
        crossChainPingPong = new CrossChainPingPong(901);

        bob = vm.addr(1);
        sally = vm.addr(2);
    }

    // Test receiving the ball from a valid cross-chain message
    function test_receiveBall_crossDomain_succeeds() public {
        uint256 fromChainId = 901;
        uint256 toChainId = 902;

        vm.chainId(toChainId);

        // Set up the mock for cross-domain message sender validation
        PingPongBall memory ball = PingPongBall(1, fromChainId, address(this));
        _mockAndExpect(
            Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(address(crossChainPingPong))
        );

        // Set up cross-domain message source mock
        _mockAndExpect(
            Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSource.selector),
            abi.encode(fromChainId)
        );

        // Expect the BallReceived event
        vm.expectEmit(true, true, true, true, address(crossChainPingPong));
        emit CrossChainPingPong.BallReceived(fromChainId, toChainId, ball);

        // Call receiveBall as if from the Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER
        vm.prank(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);
        crossChainPingPong.receiveBall(ball);
    }

    // Test receiving ball with an invalid cross-chain message sender
    function test_receiveBall_InvalidSender_reverts() public {
        PingPongBall memory _ball = PingPongBall(1, block.chainid, address(this));

        // Expect revert due to invalid sender
        vm.expectRevert(CallerNotL2ToL2CrossDomainMessenger.selector);
        crossChainPingPong.receiveBall(_ball);
    }

    // Test receiving ball with an invalid cross-domain source
    function test_receiveBall_invalidCrossDomainSender_reverts() public {
        PingPongBall memory _ball = PingPongBall(1, block.chainid, address(this));

        // Mock the cross-domain message sender to be invalid
        _mockAndExpect(
            Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.crossDomainMessageSender.selector),
            abi.encode(address(0xdeadbeef)) // Invalid address
        );

        // Expect revert due to invalid cross-domain sender
        vm.expectRevert(InvalidCrossDomainSender.selector);
        vm.prank(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER);
        crossChainPingPong.receiveBall(_ball);
    }

    // Test receiving then sending the ball
    function test_hitBall_succeeds() public {
        uint256 fromChainId = 901;
        uint256 toChainId = 902;

        vm.chainId(fromChainId);
        vm.prank(bob);

        PingPongBall memory newBall = PingPongBall(2, fromChainId, bob);
        bytes memory message = abi.encodeCall(crossChainPingPong.receiveBall, (newBall));
        _mockAndExpect(
            Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER,
            abi.encodeWithSelector(IL2ToL2CrossDomainMessenger.sendMessage.selector,
                toChainId, address(crossChainPingPong), message),
            abi.encode("")
        );

        vm.expectEmit(true, true, true, true, address(crossChainPingPong));
        emit CrossChainPingPong.BallSent(fromChainId, toChainId, newBall);

        // Send the ball
        crossChainPingPong.hitBallTo(toChainId);

        // ball is not present on the chain
        (,,address lastHitterAddress) = crossChainPingPong.ball();
        vm.assertEq(lastHitterAddress, address(0));
    }

    function test_hitBall_ballNotPresent_reverts() public {
        // hit once
        test_hitBall_succeeds();

        // hit again
        vm.expectRevert(BallNotPresent.selector);
        crossChainPingPong.hitBallTo(902);
    }

    function test_hitBall_sameChain_reverts() public {
        vm.expectRevert(InvalidDestination.selector);
        crossChainPingPong.hitBallTo(901);
    }
}
