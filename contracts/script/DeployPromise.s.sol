// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Script, console} from "forge-std/Script.sol";
import {Promise} from "../src/Promise.sol";

contract DeployPromise is Script {
    /// @notice Modifier that wraps a function in broadcasting.
    modifier broadcast() {
        vm.startBroadcast();
        _;
        vm.stopBroadcast();
    }

    function _salt() internal pure returns (bytes32) {
        return bytes32(0);
    }

    function run() public broadcast {
        Promise promiseContract = new Promise{salt: _salt()}();
        console.log("Promise deployed at", address(promiseContract));
    }
}
