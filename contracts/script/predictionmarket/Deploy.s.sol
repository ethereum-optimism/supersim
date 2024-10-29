// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {console, Script} from "forge-std/Script.sol";
import {PredictionMarket} from "../../src/predictionmarket/PredictionMarket.sol";

import {TicTacToe} from "../../src/tictactoe/TicTacToe.sol";
import {TicTacToeMarketFactory} from "../../src/predictionmarket/factories/TicTacToeMarketFactory.sol";

import {BlockHashEmitter} from "../../src/predictionmarket/utils/BlockHashEmitter.sol";
import {BlockHashMarketFactory} from "../../src/predictionmarket/factories/BlockHashMarketFactory.sol";

import {MockMarketFactory} from "../../src/predictionmarket/factories/MockMarketFactory.sol";

contract DeployScript is Script {
    bytes32 constant BLOCKHASH_EMITTER_SALT = "blockhashemitter";
    bytes32 constant TIC_TAC_TOE_SALT = "tictactoe";

    function setUp() public {}

    function run() public {
        // Only Prediction Market App Chain
        require(block.chainid == 901, "Not on Prediction Market App Chain");

        // Sanity checks
        bytes32 emitterBytecodehash = keccak256(abi.encodePacked(type(BlockHashEmitter).creationCode));
        address emitter = vm.computeCreate2Address(BLOCKHASH_EMITTER_SALT, emitterBytecodehash);
        require(emitter.code.length > 0, "BlockHashEmitter not deployed");

        bytes32 tictactoeBytecodehash = keccak256(abi.encodePacked(type(TicTacToe).creationCode));
        address tictactoe = vm.computeCreate2Address(TIC_TAC_TOE_SALT, tictactoeBytecodehash);
        require(tictactoe.code.length > 0, "TicTacToe not deployed");

        vm.startBroadcast();

        // Deploy Prediction Market
        PredictionMarket market = new PredictionMarket{salt: "predictionmarket"}();

        // Deploy the factories for the types of markets
        MockMarketFactory mockFactory = new MockMarketFactory{salt: "mockfactory"}(market);
        BlockHashMarketFactory blockHashFactory = new BlockHashMarketFactory{salt: "blockhashfactory"}(market, BlockHashEmitter(emitter));
        TicTacToeMarketFactory ticTacToeFactory = new TicTacToeMarketFactory{salt: "tictactoe"}(market, TicTacToe(tictactoe));

        vm.stopBroadcast();

        console.log("PredictionMarket Deployed at: ", address(market));
        console.log("MockMarketFactory Deployed at: ", address(mockFactory));
        console.log("BlockHashMarketFactory Deployed at: ", address(blockHashFactory));
        console.log("TicTacToeMarketFactory Deployed at: ", address(ticTacToeFactory));
    }

    function deployBlockHashEmitter() public {
        vm.startBroadcast();
        BlockHashEmitter emitter = new BlockHashEmitter{salt: BLOCKHASH_EMITTER_SALT}();
        vm.stopBroadcast();

        console.log("BlockHashEmitter Deployed at: ", address(emitter));
    }
}
