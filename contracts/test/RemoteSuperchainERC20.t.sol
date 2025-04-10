// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test} from "forge-std/Test.sol";
import {StdUtils} from "forge-std/StdUtils.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

import {Relayer} from "@interop-lib/test/Relayer.sol";
import {CrossL2Inbox} from "@contracts-bedrock/L2/CrossL2Inbox.sol";
import {L2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/L2ToL2CrossDomainMessenger.sol";

import {RemoteSuperchainERC20} from "../src/RemoteSuperchainERC20.sol";

interface ICreate2Deployer {
    function deploy(uint256 value, bytes32 salt, bytes memory code) external;
    function computeAddress(bytes32 salt, bytes32 codeHash) external view returns (address);
}

contract RemoteSuperchainERC20Test is StdUtils, Test, Relayer {
    ICreate2Deployer public deployer = ICreate2Deployer(0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2);
    IERC20 public cbBTC = IERC20(0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf);

    bytes32 public salt = bytes32(0);
    RemoteSuperchainERC20 public remoteCbBTC;

    // Chain A (Base), Chain B (OPM)
    constructor() Relayer("https://mainnet.base.org", "https://mainnet.optimism.io") {}

    function spender() public view virtual returns (address) {
        return address(0x1);
    }

    function setUp() public virtual {
        // home chain is base, remotely controlled by the spender on OPM
        bytes memory remoteERC20CreationCode =
            abi.encodePacked(type(RemoteSuperchainERC20).creationCode, abi.encode(8453, address(cbBTC), 10, spender()));

        remoteCbBTC = RemoteSuperchainERC20(deployer.computeAddress(salt, keccak256(remoteERC20CreationCode)));

        // Setup Base
        vm.selectFork(chainA);
        deployer.deploy(0, salt, remoteERC20CreationCode);
        vm.etch(Predeploys.CROSS_L2_INBOX, address(new CrossL2Inbox()).code);
        vm.etch(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER, address(new L2ToL2CrossDomainMessenger()).code);

        // Setup OPM
        vm.selectFork(chainB);
        deployer.deploy(0, salt, remoteERC20CreationCode);
        vm.etch(Predeploys.CROSS_L2_INBOX, address(new CrossL2Inbox()).code);
        vm.etch(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER, address(new L2ToL2CrossDomainMessenger()).code);
    }

    function test_approve(address _holder) public {
        vm.selectFork(chainA);
        vm.assume(cbBTC.balanceOf(_holder) == 0);
        vm.assume(_holder != spender() && _holder != address(0));
        vm.assume(_holder != address(remoteCbBTC) && _holder != address(cbBTC));

        deal(address(cbBTC), _holder, 1e18);
        assertEq(cbBTC.balanceOf(_holder), 1e18);

        // Approve
        vm.startPrank(_holder);
        cbBTC.approve(address(remoteCbBTC), 1e18);
        remoteCbBTC.approve(spender(), 1e18);
        assertEq(cbBTC.balanceOf(_holder), 0);

        // Check allowance
        relayAllMessages();
        vm.selectFork(chainB);
        assertEq(remoteCbBTC.balanceOf(_holder), 1e18);
        assertEq(remoteCbBTC.balanceOf(spender()), 0);
        assertEq(remoteCbBTC.allowance(_holder, spender()), 1e18);

        // Claim these fudns
        vm.stopPrank();
    }

    function test_transferFrom(address _holder) public {
        test_approve(_holder);

        vm.selectFork(chainB);

        // Claim approval
        vm.startPrank(spender());
        remoteCbBTC.transferFrom(_holder, spender(), 1e18);

        assertEq(remoteCbBTC.balanceOf(_holder), 0);
        assertEq(remoteCbBTC.balanceOf(spender()), 1e18);
        assertEq(remoteCbBTC.allowance(_holder, spender()), 0);

        vm.stopPrank();
    }

    function test_transfer(address _holder) public {
        test_transferFrom(_holder);

        vm.selectFork(chainB);

        // Transfer back to the holder (remote tokens burned)
        vm.startPrank(spender());
        remoteCbBTC.transfer(_holder, 1e18);
        assertEq(remoteCbBTC.balanceOf(spender()), 0);
        assertEq(remoteCbBTC.balanceOf(_holder), 0);
        vm.stopPrank();

        // Tokens only transferred on the home chain.
        relayAllMessages();
        vm.selectFork(chainA);
        assertEq(cbBTC.balanceOf(_holder), 1e18);
    }
}
