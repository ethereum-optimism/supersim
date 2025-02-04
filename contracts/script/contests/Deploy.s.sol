// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {console, Script} from "forge-std/Script.sol";

import {TicTacToe} from "../../src/tictactoe/TicTacToe.sol";
import {DeployScript as TicTacToeDeployScript} from "../tictactoe/Deploy.s.sol";

import {Contests} from "../../src/contests/Contests.sol";
import {TicTacToeContestFactory} from "../../src/contests/factories/TicTacToeContestFactory.sol";
import {BlockHashEmitter} from "../../src/contests/utils/BlockHashEmitter.sol";
import {BlockHashContestFactory} from "../../src/contests/factories/BlockHashContestFactory.sol";
import {MockContestFactory} from "../../src/contests/factories/MockContestFactory.sol";

contract DeployScript is Script {
    bytes32 constant _BLOCKHASH_EMITTER_SALT = "blockhashemitter";
    bytes32 constant _CONTESTS_SALT = "contests";
    bytes32 constant _BLOCKHASH_FACTORY_SALT = "blackhashfactory";
    bytes32 constant _TICTACTOE_FACTORY_SALT = "tictactoefactory";
    bytes32 constant _MOCK_FACTORY_SALT = "mockfactory";

    function run() public {
        TicTacToeDeployScript ticTacToeDeploy = new TicTacToeDeployScript();

        /** Chain A **/

        console.log("Selecting OPChainA");
        vm.createSelectFork(vm.rpcUrl("opchain_a"));
        ticTacToeDeploy.deploy();
        deployBlockHashEmitter();


        /** Chain B **/

        console.log("\n\nSelecting OPChainB");
        vm.createSelectFork(vm.rpcUrl("opchain_b"));
        ticTacToeDeploy.deploy();
        deployBlockHashEmitter();

        /** Chain C (Contests Chain) **/

        console.log("\n\nSelecting OPChainC");
        vm.createSelectFork(vm.rpcUrl("opchain_c"));
        ticTacToeDeploy.deploy();
        deployBlockHashEmitter();
        deploy();
    }

    function deploy() public {
        address marketAddress = contestsContractAddress();
        if (marketAddress.code.length > 0) {
            console.log("Contests Already Deployed at:", marketAddress);
            return;
        }

        vm.startBroadcast();

        Contests market = new Contests{salt: _CONTESTS_SALT}();
        require(address(market) == marketAddress);

        /** Also Deploy Market Factories **/
        TicTacToeDeployScript ticTacToeDeploy = new TicTacToeDeployScript();

        address emitter = emitterContractAddress();
        address tictactoe = ticTacToeDeploy.contractAddress();

        BlockHashContestFactory blockHashFactory = new BlockHashContestFactory{salt: _BLOCKHASH_FACTORY_SALT}(market, BlockHashEmitter(emitter));
        TicTacToeContestFactory ticTacToeFactory = new TicTacToeContestFactory{salt: _TICTACTOE_FACTORY_SALT}(market, TicTacToe(tictactoe));
        MockContestFactory mockFactory = new MockContestFactory{salt: _MOCK_FACTORY_SALT}(market);
        vm.stopBroadcast();

        console.log("Contests Deployed at:", address(market));
        console.log("BlockHashContestFactory Deployed at:", address(blockHashFactory));
        console.log("TicTacToeContestFactory Deployed at:", address(ticTacToeFactory));
        console.log("MockContestFactory Deployed at:", address(mockFactory));
    }

    function deployBlockHashEmitter() public {
        address emitterAddress = emitterContractAddress();
        if (emitterAddress.code.length > 0) {
            console.log("BlockHashEmitter Already Deployed at:", emitterAddress);
            return;
        }

        vm.startBroadcast();

        BlockHashEmitter emitter = new BlockHashEmitter{salt: _BLOCKHASH_EMITTER_SALT}();
        require(address(emitter) == emitterAddress);

        vm.stopBroadcast();

        console.log("BlockHashEmitter Deployed at:", emitterAddress);
    }

    function emitterContractAddress() public pure returns (address) {
        bytes32 emitterBytecodehash = keccak256(abi.encodePacked(type(BlockHashEmitter).creationCode));
        return vm.computeCreate2Address(_BLOCKHASH_EMITTER_SALT, emitterBytecodehash);
    }

    function contestsContractAddress() public pure returns (address) {
        bytes32 marketBytecodehash = keccak256(abi.encodePacked(type(Contests).creationCode));
        return vm.computeCreate2Address(_CONTESTS_SALT, marketBytecodehash);
    }
}
