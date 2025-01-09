// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {TicTacToe} from "../../src/tictactoe/TicTacToe.sol";

contract DeployScript is Script {
    bytes32 constant _TICTACTOE_SALT = "tictactoe";

    function run() public {

        /** Chain A **/

        console.log("Selecting OPChainA");
        vm.createSelectFork(vm.rpcUrl("opchain_a"));
        deploy();

        /** Chain B **/

        console.log("\n\nSelecting OPChainB");
        vm.createSelectFork(vm.rpcUrl("opchain_b"));
        deploy();
    }

    function deploy() public {
        address tictactoeAddress = contractAddress();
        if (tictactoeAddress.code.length > 0) {
            console.log("TicTacToe Already Deployed at:", tictactoeAddress);
            return;
        }

        vm.startBroadcast();

        TicTacToe tictactoe = new TicTacToe{salt: _TICTACTOE_SALT}();
        require(address(tictactoe) == tictactoeAddress);

        vm.stopBroadcast();

        console.log("TicTacToe Deployed at:", tictactoeAddress);
    }

    function contractAddress() public pure returns (address) {
        bytes32 tictactoeBytecodehash = keccak256(abi.encodePacked(type(TicTacToe).creationCode));
        return vm.computeCreate2Address(_TICTACTOE_SALT, tictactoeBytecodehash);
    }
}
