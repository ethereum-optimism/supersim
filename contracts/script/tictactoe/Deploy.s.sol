// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {TicTacToe} from "../../src/tictactoe/TicTacToe.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        TicTacToe game = new TicTacToe{salt: "tictactoe"}();
        console.log("Deployed at: ", address(game));
    }
}
