// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script, console} from "forge-std/Script.sol";
import {PredictionMarket} from "../../src/predictionmarket/PredictionMarket.sol";

import {TicTacToe} from "../../src/tictactoe/TicTacToe.sol";
import {TicTacToePredictionMarketFactory} from "../../src/predictionmarket/factories/TicTacToePredictionMarketFactory.sol";
import {MockMarketFactory} from "../../src/predictionmarket/factories/MockMarketFactory.sol";
contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        // Only Prediction Market App Chain
        require(block.chainid == 901);

        // sanity check that this is deployed with an eth_call
        TicTacToe tictactoe = TicTacToe(address(0xe405EE520988f6F4f508f64108436911B7816135));
        console.log("Querying TicTacToe contract");
        tictactoe.nextGameId();

        vm.broadcast();

        // Deploy Prediction Market
        PredictionMarket market = new PredictionMarket{salt: "predictionmarket"}();

        // Deploy Factories for the different kinds of markets
        TicTacToePredictionMarketFactory factory = new TicTacToePredictionMarketFactory{salt: "tictactoefactory"}(tictactoe, market);
        MockMarketFactory mockFactory = new MockMarketFactory{salt: "mockfactory"}(market);

        console.log("PredictionMarket Deployed at: ", address(market));
        console.log("TicTacToePredictionMarketFactory Deployed at: ", address(factory));
        console.log("MockMarketFactory Deployed at: ", address(mockFactory));
    }
}
