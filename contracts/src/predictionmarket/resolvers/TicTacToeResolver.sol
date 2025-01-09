// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { Predeploys } from "@contracts-bedrock/libraries/Predeploys.sol";
import { CrossL2Inbox, Identifier } from "@contracts-bedrock/L2/CrossL2Inbox.sol";

import { IMarketResolver, MarketOutcome } from "../MarketResolver.sol";
import { PredictionMarket } from "../PredictionMarket.sol";

import { TicTacToe } from "../../tictactoe/TicTacToe.sol";

struct Game {
    uint256 chainId;
    uint256 gameId;
    address creator;
}

contract TicTacToeGameResolver is IMarketResolver {
    // @notice prediction market
    PredictionMarket public market;

    // @notice TicTacToe contract
    TicTacToe public tictactoe;

    // @notice Current outcome of the game
    MarketOutcome public outcome;

    // @notice Game for this resolver
    Game public game;

    // @notice create a resolved for an accepted TicTacToe game
    constructor(PredictionMarket _market, TicTacToe _tictactoe, uint256 _chainId, uint256 _gameId, address _creator) {
        market = _market;
        tictactoe = _tictactoe;

        game = Game({chainId: _chainId, gameId: _gameId, creator: _creator});
        outcome = MarketOutcome.UNDECIDED;
    }

    // @notice resolve this game by providing the game ending event
    function resolve(Identifier calldata _id, bytes calldata _data) external {
        require(outcome == MarketOutcome.UNDECIDED);

        // Validate Log
        require(_id.origin == address(tictactoe));
        CrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        // Ensure this is a finalizing event
        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == TicTacToe.GameWon.selector || selector == TicTacToe.GameDraw.selector, "event not a game outcome");

        // Decode game attributes & ensure it matches the game we are resolving
        (uint256 _chainId, uint256 gameId, address winner,,) = abi.decode(_data[32:], (uint256, uint256, address, uint8, uint8));
        require(_chainId == game.chainId && gameId == game.gameId);

        // Set outcome based on if the creator has won (non-draw)
        if (winner == game.creator && selector != TicTacToe.GameDraw.selector) {
            outcome = MarketOutcome.YES;
        } else {
            outcome = MarketOutcome.NO;
        }

        // Resolve the prediction market
        market.resolveMarket(this);
    }

    function chainId() external view returns (uint256) {
        return game.chainId;
    }
}

