// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script, console} from "forge-std/Script.sol";
import {CrossChainPingPong} from "../src/CrossChainPingPong.sol";

contract DeployCrossChainPingPong is Script {
    function setUp() public {}

    function _salt() internal pure returns (bytes32) {
        return bytes32(0);
    }

    function run() public {
        uint256[] memory allowedChains = new uint256[](2);
        allowedChains[0] = 901;
        allowedChains[1] = 902;

        uint256 serverChainId = allowedChains[0];

        vm.startBroadcast();

        address crossChainPingPong = address(new CrossChainPingPong{salt: _salt()}(allowedChains, serverChainId));

        vm.stopBroadcast();

        console.log("Deployed CrossChainPingPong at address: ", crossChainPingPong);
    }
}
