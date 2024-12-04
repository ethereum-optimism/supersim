// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {ICrossL2Inbox} from "@contracts-bedrock/L2/interfaces/ICrossL2Inbox.sol";

import { IMarketResolver, MarketOutcome } from "../MarketResolver.sol";
import { PredictionMarket } from "../PredictionMarket.sol";
import { TicTacToeGameResolver } from "../resolvers/TicTacToeResolver.sol";

import { TicTacToe } from "../../tictactoe/TicTacToe.sol";

contract TicTacToePredictionMarketFactory {
    // @notice TicTacToe contract
    TicTacToe public game;

    // @notice PredictionMarket contract
    PredictionMarket public predictionMarket;

    // @notice Emitted when a new market for tictactoe is created
    event TicTacToeMarketCreated(IMarketResolver resolver);

    // @notice indiciator if a resolver originated from this factory
    mapping(IMarketResolver => bool) public fromFactory;

    // @notice create a new factory instantiating prediction markets based
    //         on the outcome of the TicTacToe games
    // @param _gameAddress TicTacToe contract address
    // @param _predictionMarket PredictionMarket contract address
    constructor(TicTacToe _game, PredictionMarket _predictionMarket) {
        game = _game;
        predictionMarket = _predictionMarket;
    }


    // @notice create a new market for an accepted TicTacToe game. The game creator being the
    //         yes outcome and the opponent being the no outcome.
    function newMarket(ICrossL2Inbox.Identifier calldata _id, bytes calldata _data) public payable {
        require(_id.origin == address(game));
        ICrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        // Ensure this is an accepted game event
        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == TicTacToe.AcceptedGame.selector);

        // Decode game identifying fields
        (uint256 chainId, uint256 gameId, address opponent,) =
            abi.decode(_data[32:], (uint256, uint256, address, address));

        // Create resolver for the game & market
        IMarketResolver resolver = new TicTacToeGameResolver(game, chainId, gameId, opponent);
        predictionMarket.newMarket(resolver);

        fromFactory[resolver] = true;
        
        emit TicTacToeMarketCreated(resolver);
    }
}
