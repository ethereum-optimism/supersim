// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Script, console} from "forge-std/Script.sol";
import {L2NativeSuperchainERC20} from "../src/L2NativeSuperchainERC20.sol";

contract DeployL2PeripheryContracts is Script {
    function setUp() public {}

    function _salt() internal pure returns (bytes32) {
        return bytes32(0);
    }

    function runWithStateDump(string memory allocsPath, string memory outputPath) public {
        vm.loadAllocs(allocsPath);

        run();

        vm.dumpState(outputPath);
    }

    function run() public {
        address l2NativeSuperchainERC20 = address(new L2NativeSuperchainERC20{salt: _salt()}());
        console.log("Deployed L2NativeSuperchainERC20 at address: ", l2NativeSuperchainERC20);
    }
}
