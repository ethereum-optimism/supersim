// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { Predeploys } from "@contracts-bedrock/libraries/Predeploys.sol";
import { CrossL2Inbox, Identifier } from "@contracts-bedrock/L2/CrossL2Inbox.sol";

import { IMarketResolver, MarketOutcome } from "../MarketResolver.sol";
import { PredictionMarket } from "../PredictionMarket.sol";
import { TicTacToeGameResolver } from "../resolvers/TicTacToeResolver.sol";

import { TicTacToe } from "../../tictactoe/TicTacToe.sol";

contract TicTacToeMarketFactory {
    // @notice TicTacToe contract
    TicTacToe public tictactoe;

    // @notice PredictionMarket contract
    PredictionMarket public market;

    // @notice Emitted when a new market for tictactoe is created
    event NewMarket(IMarketResolver resolver);

    // @notice indiciator if a resolver originated from this factory
    mapping(IMarketResolver => bool) public fromFactory;

    // @notice create a new factory instantiating prediction markets based on the outcome of the TicTacToe games
    constructor(PredictionMarket _market, TicTacToe _tictactoe) {
        market = _market;
        tictactoe = _tictactoe;
    }

    // @notice create a new market for an accepted TicTacToe game. The game creator being the yes outcome.
    function newMarket(Identifier calldata _id, bytes calldata _data) public payable {
        // Validate Log
        require(_id.origin == address(tictactoe));
        CrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        // Ensure this is an accepted game event
        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == TicTacToe.AcceptedGame.selector);

        // Decode game identifying fields
        (uint256 chainId, uint256 gameId, address creator,) =
            abi.decode(_data[32:], (uint256, uint256, address, address));

        IMarketResolver resolver = new TicTacToeGameResolver(market, tictactoe, chainId, gameId, creator);
        market.newMarket{ value: msg.value }(resolver, msg.sender);

        fromFactory[resolver] = true;
        
        emit NewMarket(resolver);
    }
}
