// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {console, Script} from "forge-std/Script.sol";

import {TicTacToe} from "../../src/tictactoe/TicTacToe.sol";
import {DeployScript as TicTacToeDeployScript} from "../tictactoe/Deploy.s.sol";

import {PredictionMarket} from "../../src/predictionmarket/PredictionMarket.sol";
import {TicTacToeMarketFactory} from "../../src/predictionmarket/factories/TicTacToeMarketFactory.sol";
import {BlockHashEmitter} from "../../src/predictionmarket/utils/BlockHashEmitter.sol";
import {BlockHashMarketFactory} from "../../src/predictionmarket/factories/BlockHashMarketFactory.sol";
import {MockResolverFactory} from "../../src/predictionmarket/factories/MockResolverFactory.sol";

contract DeployScript is Script {
    bytes32 constant _BLOCKHASH_EMITTER_SALT = "blockhashemitter";
    bytes32 constant _PREDICTION_MARKET_SALT = "predictionmarket";
    bytes32 constant _BLOCKHASH_FACTORY_SALT = "blackhashfactory";
    bytes32 constant _TICTACTOE_FACTORY_SALT = "tictactoefactory";
    bytes32 constant _MOCK_RESOLVER_FACTORY_SALT = "mockresolverfactory";

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

        /** Chain C (PredictionMarket Chain) **/

        console.log("\n\nSelecting OPChainC");
        vm.createSelectFork(vm.rpcUrl("opchain_c"));
        ticTacToeDeploy.deploy();
        deployBlockHashEmitter();
        deploy();
    }

    function deploy() public {
        address marketAddress = predictionMarketContractAddress();
        if (marketAddress.code.length > 0) {
            console.log("PredictionMarket Already Deployed at:", marketAddress);
            return;
        }

        vm.startBroadcast();

        PredictionMarket market = new PredictionMarket{salt: _PREDICTION_MARKET_SALT}();
        require(address(market) == marketAddress);

        /** Also Deploy Market Factories **/
        TicTacToeDeployScript ticTacToeDeploy = new TicTacToeDeployScript();

        address emitter = emitterContractAddress();
        address tictactoe = ticTacToeDeploy.contractAddress();

        BlockHashMarketFactory blockHashFactory = new BlockHashMarketFactory{salt: _BLOCKHASH_FACTORY_SALT}(market, BlockHashEmitter(emitter));
        TicTacToeMarketFactory ticTacToeFactory = new TicTacToeMarketFactory{salt: _TICTACTOE_FACTORY_SALT}(market, TicTacToe(tictactoe));
        MockResolverFactory mockResolverFactory = new MockResolverFactory{salt: _MOCK_RESOLVER_FACTORY_SALT}(market);
        vm.stopBroadcast();

        console.log("PredictionMarket Deployed at:", address(market));
        console.log("BlockHashMarketFactory Deployed at:", address(blockHashFactory));
        console.log("TicTacToeMarketFactory Deployed at:", address(ticTacToeFactory));
        console.log("MockResolverFactory Deployed at:", address(mockResolverFactory));
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

    function predictionMarketContractAddress() public pure returns (address) {
        bytes32 marketBytecodehash = keccak256(abi.encodePacked(type(PredictionMarket).creationCode));
        return vm.computeCreate2Address(_PREDICTION_MARKET_SALT, marketBytecodehash);
    }
}
