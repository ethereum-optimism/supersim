// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {ICrossL2Inbox, Identifier} from "@contracts-bedrock-interfaces/L2/ICrossL2Inbox.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {L2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/L2ToL2CrossDomainMessenger.sol";

import {Promise} from "../src/Promise.sol";

contract PromiseTest is Test {
    Promise public p;

    event HandlerCalled();

    function setUp() public {
        vm.etch(
            Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER,
            address(new L2ToL2CrossDomainMessenger()).code
        );

        p = new Promise();
    }

    modifier async() {
        require(msg.sender == address(p), "PromiseTest: caller not Promise");
        _;
    }

    function test_then_succeeds(uint256 _destination) public {
        vm.assume(_destination != block.chainid);

        // context is empty
        assertEq(p.promiseContext().length, 0);
        assertEq(p.promiseRelayIdentifier().origin, address(0));

        // example IERC20 remote balanceOf query
        address tokenAddress = address(0x1234567890123456789012345678901234567890);
        bytes32 msgHash = p.sendMessage(_destination, tokenAddress, abi.encodeCall(IERC20.balanceOf, (address(this))));
        p.then(msgHash, this.balanceHandler.selector, "abc");

        // construct some return value for this message with a balance
        uint256 balance = 100;
        Identifier memory id = Identifier(address(p), 0, 0, 0, _destination);
        bytes memory payload = abi.encodePacked(Promise.RelayedMessage.selector, abi.encode(msgHash, abi.encode(balance)));

        // mock the CrossL2Inbox validation
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, id, payload),
            returnData: ""
        });

        // dispatch the callback
        vm.recordLogs();
        p.dispatchCallbacks(id, payload);

        Vm.Log[] memory logs = vm.getRecordedLogs();
        assertEq(logs.length, 2);
        assertEq(logs[0].topics[0], HandlerCalled.selector);
        assertEq(logs[1].topics[0], Promise.CallbacksCompleted.selector);

        // context is empty
        assertEq(p.promiseContext().length, 0);
        assertEq(p.promiseRelayIdentifier().origin, address(0));
    }

    function balanceHandler(uint256 balance) async public {
        require(balance == 100, "PromiseTest: balance mismatch");

        Identifier memory id = p.promiseRelayIdentifier();
        require(id.origin == address(p), "PromiseTest: origin mismatch");

        bytes memory context = p.promiseContext();
        require(keccak256(context) == keccak256("abc"), "PromiseTest: context mismatch");

        emit HandlerCalled();
    }
}