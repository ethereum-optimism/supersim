// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script, console} from "forge-std/Script.sol";
import {CrossChainPingPong} from "../../src/pingpong/CrossChainPingPong.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256[] memory allowedChains = new uint256[](2);
        allowedChains[0] = 901;
        allowedChains[1] = 902;

        vm.broadcast();
        uint256 serverChainId = allowedChains[0];
        CrossChainPingPong pingpong = new CrossChainPingPong{salt: "pingpong"}(allowedChains, serverChainId);
        console.log("Deployed at: ", address(pingpong));
    }
}
