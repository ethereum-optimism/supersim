// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

contract CombineAllocs is Script {
    function setUp() public {}

    function run(string[] memory allocsPaths, string memory outputPath) public {
        for (uint256 i = 0; i < allocsPaths.length; i++) {
            vm.loadAllocs(allocsPaths[i]);
        }
        vm.dumpState(outputPath);
    }
}
