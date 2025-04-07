// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";
import {StdUtils} from "forge-std/StdUtils.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";

import {Relayer} from "@interop-lib/test/Relayer.sol";
import {CrossL2Inbox} from "@contracts-bedrock/L2/CrossL2Inbox.sol";
import {L2ToL2CrossDomainMessenger} from "@contracts-bedrock/L2/L2ToL2CrossDomainMessenger.sol";

import {PhantomSuperchainERC20} from "../src/PhantomSuperchainERC20.sol";

interface ICreate2Deployer {
    function deploy(uint256 value, bytes32 salt, bytes memory code) external;
    function computeAddress(bytes32 salt, bytes32 codeHash) external view returns (address);
}

contract PhantomSuperchainERC20Test is StdUtils, Test, Relayer {
    ICreate2Deployer constant deployer = ICreate2Deployer(0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2);
    IERC20 constant cbBTC = IERC20(0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf);

    bytes32 salt = bytes32(0);
    PhantomSuperchainERC20 phantomCbBTC;

    // Chain A (Base), Chain B (OPM)
    constructor() Relayer("https://mainnet.base.org", "https://mainnet.optimism.io") {}

    function setUp() public {
        bytes memory creationCode = abi.encodePacked(
            type(PhantomSuperchainERC20).creationCode,
            abi.encode(8453, address(cbBTC)) // home chain is base
        );

        phantomCbBTC = PhantomSuperchainERC20(deployer.computeAddress(salt, keccak256(creationCode)));

        // Setup Base
        vm.selectFork(chainA);
        deployer.deploy(0, salt, creationCode);
        vm.etch(Predeploys.CROSS_L2_INBOX, address(new CrossL2Inbox()).code);
        vm.etch(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER, address(new L2ToL2CrossDomainMessenger()).code);

        // Setup OPM
        vm.selectFork(chainB);
        deployer.deploy(0, salt, creationCode);
        vm.etch(Predeploys.CROSS_L2_INBOX, address(new CrossL2Inbox()).code);
        vm.etch(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER, address(new L2ToL2CrossDomainMessenger()).code);
    }

    function test_deposit(address _depositor) public {
        vm.selectFork(chainA);
        vm.assume(cbBTC.balanceOf(_depositor) == 0);
        deal(address(cbBTC), _depositor, 1e18);

        // Deposit
        vm.startPrank(_depositor);
        cbBTC.approve(address(phantomCbBTC), 1e18);
        phantomCbBTC.deposit(chainIdByForkId[chainB], _depositor, 1e18);
        assertEq(cbBTC.balanceOf(_depositor), 0);

        // Relay Messages & check phantom balance
        relayAllMessages();
        vm.selectFork(chainB);
        assertEq(phantomCbBTC.balanceOf(_depositor), 1e18);

        vm.stopPrank();
    }

    function test_transfer(address _depositor) public {
        // Run Deposit Test
        test_deposit(_depositor);

        // Transfer
        vm.selectFork(chainB);
        vm.prank(_depositor);
        phantomCbBTC.transfer(_depositor, 1e18);
        assertEq(phantomCbBTC.balanceOf(_depositor), 0);

        // Check balance on Chain A
        relayAllMessages();
        vm.selectFork(chainA);
        assertEq(cbBTC.balanceOf(_depositor), 1e18);
    }

    function test_crossDomainDeposit(address _depositor, address _puller) public {
        test_deposit(_depositor);


        vm.selectFork(chainB);
        vm.assume(phantomCbBTC.balanceOf(_puller) == 0);

        // Approve the spender & phantom contract for the pull
        vm.selectFork(chainA);
        cbBTC.approve(address(phantomCbBTC), 1e18);
        cbBTC.approve(_puller, 1e18);

        // Send CrossDomainMessage to pull this approval
        vm.selectFork(chainB);
        vm.startPrank(_puller);
        L2ToL2CrossDomainMessenger(Predeploys.L2_TO_L2_CROSS_DOMAIN_MESSENGER).sendMessage(
            chainIdByForkId[chainA],
            address(phantomCbBTC),
            abi.encodeCall(PhantomSuperchainERC20.crossDomainDepositFrom, (_puller, 1e18))
        );

        // Relay Messages. Funds should be pulled
        relayAllMessages();
        vm.selectFork(chainA);
        assertEq(cbBTC.balanceOf(_depositor), 0);

        // Relay Messages back to ChainB
        relayAllMessages();
        vm.selectFork(chainB);

        // Puller has the funds
        assertEq(phantomCbBTC.balanceOf(_puller), 1e18);

        vm.stopPrank();
    }
}