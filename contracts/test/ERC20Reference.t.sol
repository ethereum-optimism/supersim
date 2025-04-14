// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test} from "forge-std/Test.sol";
import {StdUtils} from "forge-std/StdUtils.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

import {Relayer} from "@interop-lib/test/Relayer.sol";
import {CrossL2Inbox} from "@contracts-bedrock/L2/CrossL2Inbox.sol";
import {L2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/L2ToL2CrossDomainMessenger.sol";

import {ERC20Reference} from "../src/ERC20Reference.sol";

interface ICreate2Deployer {
    function deploy(uint256 value, bytes32 salt, bytes memory code) external;
    function computeAddress(bytes32 salt, bytes32 codeHash) external view returns (address);
}

contract ERC20ReferenceTest is StdUtils, Test, Relayer {
    ICreate2Deployer public deployer = ICreate2Deployer(0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2);

    bytes32 public salt = bytes32(0);

    ERC20 public erc20;
    ERC20Reference public remoteERC20;

    // Run against supersim locally so forking is fast
    constructor() Relayer("http://127.0.0.1:9545", "http://127.0.0.1:9546") {}

    function spender() public virtual returns (address) {
        return address(0x1);
    }

    function setUp() public virtual {
        // ERC20 only exists on A
        vm.selectFork(chainA);
        erc20 = new ERC20("ERC20", "ERC20");

        // home chain is A, remotely controlled by the spender on B
        bytes memory args = abi.encode(chainIdByForkId[chainA], address(erc20), chainIdByForkId[chainB], spender());
        bytes memory remoteERC20CreationCode = abi.encodePacked(type(ERC20Reference).creationCode, args);
        remoteERC20 = ERC20Reference(deployer.computeAddress(salt, keccak256(remoteERC20CreationCode)));

        // Setup Remote on A
        deployer.deploy(0, salt, remoteERC20CreationCode);
        vm.etch(Predeploys.CROSS_L2_INBOX, address(new CrossL2Inbox()).code);
        vm.etch(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER, address(new L2ToL2CrossDomainMessenger()).code);

        // Setup Remote on B
        vm.selectFork(chainB);
        deployer.deploy(0, salt, remoteERC20CreationCode);
        vm.etch(Predeploys.CROSS_L2_INBOX, address(new CrossL2Inbox()).code);
        vm.etch(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER, address(new L2ToL2CrossDomainMessenger()).code);
    }

    function test_approve() public {
        vm.selectFork(chainA);
        vm.assume(erc20.balanceOf(address(this)) == 0);

        deal(address(erc20), address(this), 1e18);
        assertEq(erc20.balanceOf(address(this)), 1e18);

        // Approve
        vm.startPrank(address(this));
        erc20.approve(address(remoteERC20), 1e18);
        remoteERC20.approve(spender(), 1e18);
        assertEq(erc20.balanceOf(address(this)), 0);

        // Check allowance
        relayAllMessages();
        vm.selectFork(chainB);
        assertEq(remoteERC20.balanceOf(address(this)), 1e18);
        assertEq(remoteERC20.balanceOf(spender()), 0);
        assertEq(remoteERC20.allowance(address(this), spender()), 1e18);

        vm.stopPrank();
    }

    function test_transferFrom() public {
        test_approve();

        vm.selectFork(chainB);

        // Claim approval
        vm.startPrank(spender());
        remoteERC20.transferFrom(address(this), spender(), 1e18);

        assertEq(remoteERC20.balanceOf(address(this)), 0);
        assertEq(remoteERC20.balanceOf(spender()), 1e18);
        assertEq(remoteERC20.allowance(address(this), spender()), 0);

        vm.stopPrank();
    }

    function test_transfer() public {
        test_transferFrom();

        vm.selectFork(chainB);

        // Transfer back to the holder (remote tokens burned)
        vm.startPrank(spender());
        remoteERC20.transfer(address(this), 1e18);
        assertEq(remoteERC20.balanceOf(spender()), 0);
        assertEq(remoteERC20.balanceOf(address(this)), 0);
        vm.stopPrank();

        // Tokens only transferred on the home chain.
        relayAllMessages();
        vm.selectFork(chainA);
        assertEq(erc20.balanceOf(address(this)), 1e18);
    }
}
