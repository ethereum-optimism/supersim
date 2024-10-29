// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {console, Script} from "forge-std/Script.sol";
import {PredictionMarket} from "../../src/predictionmarket/PredictionMarket.sol";

import {TicTacToe} from "../../src/tictactoe/TicTacToe.sol";
import {TicTacToeMarketFactory} from "../../src/predictionmarket/factories/TicTacToeMarketFactory.sol";

import {BlockHashEmitter} from "../../src/predictionmarket/utils/BlockHashEmitter.sol";
import {BlockHashMarketFactory} from "../../src/predictionmarket/factories/BlockHashMarketFactory.sol";

contract DeployScript is Script {
    uint256 constant APP_CHAIN_ID = 903;

    bytes32 constant _BLOCKHASH_EMITTER_SALT = "blockhashemitter";
    bytes32 constant _TIC_TAC_TOE_SALT = "tictactoe";

    function setUp() public {}

    function run() public {
        bytes32 emitterBytecodehash = keccak256(abi.encodePacked(type(BlockHashEmitter).creationCode));
        address emitter = vm.computeCreate2Address(_BLOCKHASH_EMITTER_SALT, emitterBytecodehash);
        if (emitter.code.length == 0) {
            deployBlockHashEmitter();
        } else {
            console.log("BlockHashEmitter address: ", emitter);
        }

        bytes32 tictactoeBytecodehash = keccak256(abi.encodePacked(type(TicTacToe).creationCode));
        address tictactoe = vm.computeCreate2Address(_TIC_TAC_TOE_SALT, tictactoeBytecodehash);
        if (tictactoe.code.length == 0) {
            deployTicTacToe();
        } else {
            console.log("TicTacToe address: ", tictactoe);
        }

        // Deploy Prediction Market contracts on the 
        if (block.chainid == APP_CHAIN_ID) {
            vm.startBroadcast();
            PredictionMarket market = new PredictionMarket{salt: "predictionmarket"}();

            // Deploy the factories for the types of markets
            BlockHashMarketFactory blockHashFactory = new BlockHashMarketFactory{salt: "blockhashfactory"}(market, BlockHashEmitter(emitter));
            TicTacToeMarketFactory ticTacToeFactory = new TicTacToeMarketFactory{salt: "tictactoe"}(market, TicTacToe(tictactoe));


            console.log("PredictionMarket Deployed at: ", address(market));
            console.log("BlockHashMarketFactory Deployed at: ", address(blockHashFactory));
            console.log("TicTacToeMarketFactory Deployed at: ", address(ticTacToeFactory));
            vm.stopBroadcast();
        }
    }

    function deployBlockHashEmitter() public {
        vm.startBroadcast();
        BlockHashEmitter emitter = new BlockHashEmitter{salt: _BLOCKHASH_EMITTER_SALT}();
        vm.stopBroadcast();

        console.log("BlockHashEmitter Deployed at: ", address(emitter));
    }

    function deployTicTacToe() public {
        vm.startBroadcast();
        TicTacToe tictactoe = new TicTacToe{salt: _TIC_TAC_TOE_SALT}();
        vm.stopBroadcast();

        console.log("TicTacToe Deployed at: ", address(tictactoe));
    }
}
