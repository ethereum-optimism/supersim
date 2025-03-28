// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {ICrossL2Inbox, Identifier} from "@contracts-bedrock-interfaces/L2/ICrossL2Inbox.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {L2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/L2ToL2CrossDomainMessenger.sol";
import {L2NativeSuperchainERC20} from "../src/L2NativeSuperchainERC20.sol";
import {Promise} from "../src/Promise.sol";
import {Relayer, RelayedMessage} from "@interop-lib/test/Relayer.sol";

contract PromiseTest is Relayer, Test {
    Promise public p;
    L2NativeSuperchainERC20 public token;

    event HandlerCalled();

    bool public handlerCalled;

    constructor()
        Relayer(
            vm.envOr("CHAIN_A_RPC_URL", string("https://interop-alpha-0.optimism.io")),
            vm.envOr("CHAIN_B_RPC_URL", string("https://interop-alpha-1.optimism.io"))
        )
    {}

    function setUp() public {
        vm.selectFork(chainA);
        p = new Promise{salt: bytes32(0)}();
        token = new L2NativeSuperchainERC20{salt: bytes32(0)}();

        vm.selectFork(chainB);
        new Promise{salt: bytes32(0)}();
        new L2NativeSuperchainERC20{salt: bytes32(0)}();

        // mint tokens on chain B
        vm.selectFork(chainB);
        token.mint(address(this), 100);
    }

    modifier async() {
        require(msg.sender == address(p), "PromiseTest: caller not Promise");
        _;
    }

    function test_then_succeeds() public {
        vm.selectFork(chainA);

        // context is empty
        assertEq(p.promiseContext().length, 0);
        assertEq(p.promiseRelayIdentifier().origin, address(0));

        // example IERC20 remote balanceOf query
        bytes32 msgHash =
            p.sendMessage(chainIdByForkId[chainB], address(token), abi.encodeCall(IERC20.balanceOf, (address(this))));
        p.then(msgHash, this.balanceHandler.selector, "abc");

        relayAllMessages();

        // need to refetch recorded logs and get the RelayedMessage
        Vm.Log[] memory logs = vm.getRecordedLogs();
        Vm.Log memory relayMessageLog;

        for (uint256 i = 0; i < logs.length; i++) {
            if (logs[i].topics[0] == keccak256("RelayedMessage(bytes32,bytes)")) {
                relayMessageLog = logs[i];
                break;
            }
        }

        bytes memory payload = constructMessagePayload(relayMessageLog);
        Identifier memory id = Identifier(relayMessageLog.emitter, block.number, 0, block.timestamp, chainIdByForkId[chainB]);

        // dispatch the callback
        p.dispatchCallbacks(id, payload);

        relayAllMessages();

        assertEq(handlerCalled, true);
        // context is empty
        assertEq(p.promiseContext().length, 0);
        assertEq(p.promiseRelayIdentifier().origin, address(0));
    }

    function balanceHandler(uint256 balance) public async {
        handlerCalled = true;
        require(balance == 100, "PromiseTest: balance mismatch");

        Identifier memory id = p.promiseRelayIdentifier();
        require(id.origin == address(p), "PromiseTest: origin mismatch");

        bytes memory context = p.promiseContext();
        require(keccak256(context) == keccak256("abc"), "PromiseTest: context mismatch");

        emit HandlerCalled();
    }
}
