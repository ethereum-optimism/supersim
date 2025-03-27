// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Script, console} from "forge-std/Script.sol";

import {L2NativeSuperchainERC20} from "../src/L2NativeSuperchainERC20.sol";
import {Promise} from "../src/Promise.sol";
import {PromiseExample} from "../src/PromiseExample.sol";

contract DeployL2PeripheryContracts is Script {
    /// @notice Used for tracking the next address to deploy a periphery contract at.
    address internal nextDeploymentAddress = 0x420beeF000000000000000000000000000000001;

    /// @notice Modifier that wraps a function in broadcasting.
    modifier broadcast() {
        vm.startBroadcast();
        _;
        vm.stopBroadcast();
    }

    function setUp() public {}

    function _salt() internal pure returns (bytes32) {
        return bytes32(0);
    }

    function runWithStateDump(string memory allocsPath, string memory outputPath) public {
        vm.loadAllocs(allocsPath);

        run();

        vm.dumpState(outputPath);
    }

    function run() public broadcast {
        deployPromise();
        deployL2NativeSuperchainERC20();
    }

    function deployPromise() public {
        Promise p = new Promise{salt: _salt()}();
        console.log("Deployed Promise at address: ", address(p));
    }

    function deployL2NativeSuperchainERC20() public {
        address _l2NativeSuperchainERC20Contract = address(new L2NativeSuperchainERC20{salt: _salt()}());
        address deploymentAddress = deployAtNextDeploymentAddress(_l2NativeSuperchainERC20Contract.code);
        console.log("Deployed L2NativeSuperchainERC20 at address: ", deploymentAddress);
    }

    function deployAtNextDeploymentAddress(bytes memory newRuntimeBytecode)
        internal
        returns (address _deploymentAddr)
    {
        vm.etch(nextDeploymentAddress, newRuntimeBytecode);
        _deploymentAddr = nextDeploymentAddress;
        nextDeploymentAddress = addOneToAddress(nextDeploymentAddress);
        return _deploymentAddr;
    }

    function addOneToAddress(address addr) internal pure returns (address) {
        return address(uint160(addr) + 1);
    }
}
