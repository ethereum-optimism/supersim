// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script, console} from "forge-std/Script.sol";
import {CrossChainPingPong} from "../../src/pingpong/CrossChainPingPong.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 serverChainId = 901;

        vm.broadcast();

        CrossChainPingPong game = new CrossChainPingPong{salt: "pingpong"}(serverChainId);
        console.log("Deployed at: ", address(game));
    }
}
