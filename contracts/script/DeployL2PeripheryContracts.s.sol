// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Script, console} from "forge-std/Script.sol";

import {Promise} from "@interop-lib/Promise.sol";
import {PredeployAddresses} from "@interop-lib/libraries/PredeployAddresses.sol";

import {L2NativeSuperchainERC20} from "../src/L2NativeSuperchainERC20.sol";
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
        address p = address(new Promise{salt: _salt()}());
        // the promise library is not an official predeploy, so we manually deployed the Promise
        // contract to this address in devnet, so we need to manually etch the code to the
        // expected address
        vm.etch(PredeployAddresses.PROMISE, p.code);
        // Number of slots to check
        uint256 slotsToCheck = 1000;

        // Copy storage slots
        for (uint256 slot = 0; slot < slotsToCheck; slot++) {
            bytes32 value = vm.load(p, bytes32(slot));

            // Only copy non-zero slots to save gas
            if (value != bytes32(0)) {
                console.log("Copying slot %d: %s on address %s", slot, vm.toString(value), PredeployAddresses.PROMISE);
                vm.store(PredeployAddresses.PROMISE, bytes32(slot), value);
            }
        }
        console.log("Deployed Promise at address: ", PredeployAddresses.PROMISE);
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
