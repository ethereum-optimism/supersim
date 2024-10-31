// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {ICrossL2Inbox} from "@contracts-bedrock/L2/interfaces/ICrossL2Inbox.sol";

import { IMarketResolver, MarketOutcome } from "../MarketResolver.sol";
import { PredictionMarket } from "../PredictionMarket.sol";

import { TicTacToe } from "../../tictactoe/TicTacToe.sol";

contract TicTacToeGameResolver is IMarketResolver {
    // @notice TicTacToe contract
    TicTacToe public game;

    // @notice Current outcome of the game
    MarketOutcome public outcome;

    // @notice Chain ID of the game
    uint256 public chainId;

    // @notice Game ID
    uint256 public gameId;

    // @notice Expected winning player of the game
    address public winningPlayer;

    // @notice create a resolved for an accepted TicTacToe game
    constructor(TicTacToe _game, uint256 _chainId, uint256 _gameId, address _winningPlayer) {
        game = _game;

        chainId = _chainId;
        gameId = _gameId;
        winningPlayer = _winningPlayer;

        outcome = MarketOutcome.UNDECIDED;
    }

    // @notice resolve this game by providing the game ending event
    function resolve(ICrossL2Inbox.Identifier calldata _id, bytes calldata _data) external {
        require(_id.origin == address(game));
        ICrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        // TODO: Event must either be GameWon or GameDrawn
        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == TicTacToe.GameWon.selector || selector == TicTacToe.GameDraw.selector);

        // Decode game attributes & winning player. Both events share the same schema
        (uint256 dataChainId, uint256 dataGameId, address winner,,) =
            abi.decode(_data[32:], (uint256, uint256, address, uint8, uint8));

        // Corresponds to the right game
        require(dataChainId == chainId && dataGameId == gameId);

        // There's no DRAW outcome so this is recorded as a loss
        if (selector == TicTacToe.GameDraw.selector) {
            outcome = MarketOutcome.NO;
            return;
        }

        if (winner == winningPlayer) {
            outcome = MarketOutcome.YES;
        } else {
            outcome = MarketOutcome.NO;
        }
    }
}

