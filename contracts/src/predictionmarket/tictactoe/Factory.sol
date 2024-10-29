// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {ICrossL2Inbox} from "@contracts-bedrock/L2/interfaces/ICrossL2Inbox.sol";

import { IMarketResolver, MarketOutcome } from "../MarketResolver.sol";

import { TicTacToe } from "../../tictactoe/TicTacToe.sol";

contract TicTacToePredictionMarketFactory {
    // @notice TicTacToe contract address
    address public gameAddress;

    function newMarket(ICrossL2Inbox.Identifier calldata _id, bytes calldata _data) external {
        require(_id.origin == gameAddress);
        ICrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        // Ensure this is an accepted game event
        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == TicTacToe.AcceptedGame.selector);

        (uint256 chainId, uint256 gameId, address opponent, address player) =
            abi.decode(_data[32:], (uint256, uint256, address, address));

        // Create the resolver for this game

    }
}

contract TicTacToeGameResolver is IMarketResolver {
    address private gameAddress;

    MarketOutcome public outcome;

    // @notice create a resolved for an accepted TicTacToe game
    constructor(address _gameAddress) {
        gameAddress = _gameAddress;
        currentOutcome = MarketOutcome.UNDECIDED;
    }

    // @notice resolve this game by providing the game ending event
    function resolve(ICrossL2Inbox.Identifier calldata _id, bytes calldata _data) external {
        require(_id.origin == gameAddress);
        ICrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        // Event must either be GameWon or GameDrawn
    }
}

