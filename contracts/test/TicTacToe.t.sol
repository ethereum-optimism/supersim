// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TicTacToe} from "../src/TicTacToe.sol";

contract TicTacToeTest is Test {
    address player1 = address(1);
    address player2 = address(2);

    function test_CreateGame() public {
        TicTacToe ticTacToe = new TicTacToe();
        uint256 gameId = ticTacToe.createGame(player1);
        TicTacToe.Game memory game = ticTacToe.getGame(gameId);
        assertEq(gameId, game.id);
        assertEq(game.player1, player1);
        assertEq(uint(game.state), uint(TicTacToe.GameState.WaitingForPlayer));
    }

    function test_JoinGameSuccessful() public {
        TicTacToe ticTacToe = new TicTacToe();
        uint256 gameId = ticTacToe.createGame(player1);

        bool success = ticTacToe.joinGame(player2, gameId);
        assertTrue(success);

        TicTacToe.Game memory game = ticTacToe.getGame(gameId);
        assertEq(game.player1, player1);
        assertEq(game.player2, player2);
    }

    function test_JoinGameInvalidState() public {
        TicTacToe ticTacToe = new TicTacToe();
        uint256 gameId = ticTacToe.createGame(player1);
        ticTacToe.joinGame(player2, gameId);
        vm.expectRevert("Game already has enough players");
        ticTacToe.joinGame(address(3), gameId);
    }

    function test_JoinGameSamePlayer() public {
        TicTacToe ticTacToe = new TicTacToe();
        uint256 gameId = ticTacToe.createGame(player1);
        vm.expectRevert("Players must be different");
        ticTacToe.joinGame(player1, gameId);
    }

    function test_PlayGameUntilWin() public {
        TicTacToe ticTacToe = new TicTacToe();

        // Game 1: row win by player 1
        uint256 gameId = ticTacToe.createGame(player1);
        ticTacToe.joinGame(player2, gameId);
        ticTacToe.makeMove(player1, gameId, 0, 0);
        ticTacToe.makeMove(player2, gameId, 1, 0);
        ticTacToe.makeMove(player1, gameId, 0, 1);
        ticTacToe.makeMove(player2, gameId, 1, 1);
        ticTacToe.makeMove(player1, gameId, 0, 2);
        TicTacToe.Game memory game = ticTacToe.getGame(gameId);
        assertEq(uint(game.state), uint(TicTacToe.GameState.PlayerOneWins));

        // Game 2: col win by player 2
        gameId = ticTacToe.createGame(player1);
        ticTacToe.joinGame(player2, gameId);
        ticTacToe.makeMove(player1, gameId, 0, 0);
        ticTacToe.makeMove(player2, gameId, 0, 1);
        ticTacToe.makeMove(player1, gameId, 0, 2);
        ticTacToe.makeMove(player2, gameId, 1, 1);
        ticTacToe.makeMove(player1, gameId, 1, 0);
        ticTacToe.makeMove(player2, gameId, 2, 1);
        game = ticTacToe.getGame(gameId);
        assertEq(uint(game.state), uint(TicTacToe.GameState.PlayerTwoWins));
    
        // Game 3: dial win by player 1
        gameId = ticTacToe.createGame(player1);
        ticTacToe.joinGame(player2, gameId);
        ticTacToe.makeMove(player1, gameId, 0, 0);
        ticTacToe.makeMove(player2, gameId, 1, 0);
        ticTacToe.makeMove(player1, gameId, 1, 1);
        ticTacToe.makeMove(player2, gameId, 1, 2);
        ticTacToe.makeMove(player1, gameId, 2, 2);
        game = ticTacToe.getGame(gameId);
        assertEq(uint(game.state), uint(TicTacToe.GameState.PlayerOneWins));
    }

    function test_PlayGameUntilDraw() public {
        TicTacToe ticTacToe = new TicTacToe();
        uint256 gameId = ticTacToe.createGame(player1);
        ticTacToe.joinGame(player2, gameId);
        ticTacToe.makeMove(player1, gameId, 0, 1);
        ticTacToe.makeMove(player2, gameId, 0, 0);
        ticTacToe.makeMove(player1, gameId, 1, 0);
        ticTacToe.makeMove(player2, gameId, 0, 2);
        ticTacToe.makeMove(player1, gameId, 1, 2);
        ticTacToe.makeMove(player2, gameId, 1, 1);
        ticTacToe.makeMove(player1, gameId, 2, 0);
        ticTacToe.makeMove(player2, gameId, 2, 1);
        ticTacToe.makeMove(player1, gameId, 2, 2);
        TicTacToe.Game memory game = ticTacToe.getGame(gameId);
        assertEq(uint(game.state), uint(TicTacToe.GameState.Draw));
    }
}
