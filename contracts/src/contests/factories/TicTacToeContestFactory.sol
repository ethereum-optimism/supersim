// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { Predeploys } from "@contracts-bedrock/libraries/Predeploys.sol";
import { CrossL2Inbox, Identifier } from "@contracts-bedrock/L2/CrossL2Inbox.sol";

import { IContestResolver } from "../ContestResolver.sol";
import { Contests } from "../Contests.sol";
import { TicTacToeGameResolver } from "../resolvers/TicTacToeResolver.sol";

import { TicTacToe } from "../../tictactoe/TicTacToe.sol";

contract TicTacToeContestFactory {
    // @notice TicTacToe contract
    TicTacToe public tictactoe;

    // @notice Contests contract
    Contests public contests;

    // @notice Emitted when a new contest for tictactoe is created
    event NewContest(IContestResolver resolver);

    // @notice indiciator if a resolver originated from this factory
    mapping(IContestResolver => bool) public fromFactory;

    // @notice create a new factory instantiating contests based on the outcome of the TicTacToe games
    constructor(Contests _contests, TicTacToe _tictactoe) {
        contests = _contests;
        tictactoe = _tictactoe;
    }

    // @notice create a new contest for an accepted TicTacToe game. The game creator being the yes outcome.
    function newContest(Identifier calldata _id, bytes calldata _data) public payable {
        // Validate Log
        require(_id.origin == address(tictactoe));
        CrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_id, keccak256(_data));

        // Ensure this is an accepted game event
        bytes32 selector = abi.decode(_data[:32], (bytes32));
        require(selector == TicTacToe.AcceptedGame.selector);

        // Decode game identifying fields
        (uint256 chainId, uint256 gameId, address creator,) =
            abi.decode(_data[32:], (uint256, uint256, address, address));

        IContestResolver resolver = new TicTacToeGameResolver(contests, tictactoe, chainId, gameId, creator);
        contests.newContest{ value: msg.value }(resolver, msg.sender);

        fromFactory[resolver] = true;
        
        emit NewContest(resolver);
    }
}
