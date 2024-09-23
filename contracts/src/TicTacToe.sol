// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract TicTacToe {
    enum PlayerTurn {
        PlayerOne,
        PlayerTwo
    }

    enum GameState {
        WaitingForPlayer,
        Playing,
        Draw,
        PlayerOneWins,
        PlayerTwoWins
    }

    event GameCreated(uint256 indexed gameId, address indexed creator);
    event PlayerJoinedGame(uint256 indexed gameId, address indexed player);
    event PlayerMadeMove(uint256 indexed gameId, uint8 x, uint8 y);
    event GameCompletedWithWinner(uint256 indexed gameId, address indexed winner);
    event GameCompletedDraw(uint256 indexed gameId);

    struct Game {
        uint256 id;
        GameState state;
        address player1;
        address player2;
        PlayerTurn currentTurn;
        uint8 numOfTurns;
        uint8[3][3] board;
    }

    uint256 numOfGames;
    mapping(uint256 => Game) public games;

    // Magic Square: https://mathworld.wolfram.com/MagicSquare.html
    uint8[3][3] private MAGIC_SQUARE = [[8, 3, 4], [1, 5, 9], [6, 7, 2]];
    uint8 private constant MAGIC_SUM_PLAYER_ONE = 15;
    uint8 private constant MAGIC_SUM_PLAYER_TWO = 30;

    modifier validGame(uint256 gameId) {
        require(gameId <= numOfGames, "Invalid game id");
        _;
    }

    function createGame(address player1) public returns (uint256) {
        numOfGames++;

        games[numOfGames] = Game({
            id: numOfGames,
            state: GameState.WaitingForPlayer,
            player1: player1,
            player2: address(0),
            currentTurn: PlayerTurn.PlayerOne,
            numOfTurns: 0,
            board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        });

        emit GameCreated(numOfGames, player1);
        return numOfGames;
    }

    function joinGame(address player2, uint256 gameId) public validGame(gameId) returns (bool) {
        Game storage game = games[gameId];

        require(game.state == GameState.WaitingForPlayer, "Game already has enough players");
        require(game.player1 != player2, "Players must be different");

        game.player2 = player2;
        game.state = GameState.Playing;
        emit PlayerJoinedGame(game.id, game.player2);

        return true;
    }

    function makeMove(address player, uint256 gameId, uint8 x, uint8 y) public validGame(gameId) returns (bool) {
        Game storage game = games[gameId];
        require(game.state == GameState.Playing, "Game hasn't started or has already been completed");

        bool isPlayerOneTurn = game.currentTurn == PlayerTurn.PlayerOne;
        require(isPlayerOneTurn ? player == game.player1 : player == game.player2, "Not a valid player in the game");
        require(x >= 0 && x <= 2 || y >= 0 && y <= 2, "Move out of bounds");
        require(game.board[x][y] == 0, "Invalid move");

        game.board[x][y] = isPlayerOneTurn ? 1 : 2;
        game.currentTurn = isPlayerOneTurn ? PlayerTurn.PlayerTwo : PlayerTurn.PlayerOne;
        game.numOfTurns++;
        emit PlayerMadeMove(game.id, x, y);

        bool isWin = checkForWin(player, game.id);
        if (isWin) {
            game.state = isPlayerOneTurn ? GameState.PlayerOneWins : GameState.PlayerTwoWins;
            emit GameCompletedWithWinner(game.id, player);
        } else if (game.numOfTurns >= 9) {
            game.state = GameState.Draw;
            emit GameCompletedDraw(game.id);
        }

        return true;
    }

    function getGame(uint256 gameId) public view returns (Game memory) {
        return games[gameId];
    }

    function checkForWin(address player, uint256 gameId) public view validGame(gameId) returns (bool) {
        Game storage game = games[gameId];
        require(player == game.player1 || player == game.player2, "Not a valid player in the game");

        uint8 magicSum = player == game.player1 ? MAGIC_SUM_PLAYER_ONE : MAGIC_SUM_PLAYER_TWO;

        // row & col check
        for (uint8 i = 0; i < 3; i++) {
            uint8 rowSum = (game.board[i][0] * MAGIC_SQUARE[i][0]) + (game.board[i][1] * MAGIC_SQUARE[i][1])
                + (game.board[i][2] * MAGIC_SQUARE[i][2]);
            uint8 colSum = (game.board[0][i] * MAGIC_SQUARE[0][i]) + (game.board[1][i] * MAGIC_SQUARE[1][i])
                + (game.board[2][i] * MAGIC_SQUARE[2][i]);

            if (rowSum == magicSum || colSum == magicSum) {
                return true;
            }
        }

        // diag check
        uint8 leftToRightSum = (game.board[0][0] * MAGIC_SQUARE[0][0]) + (game.board[1][1] * MAGIC_SQUARE[1][1])
            + (game.board[2][2] * MAGIC_SQUARE[2][2]);
        uint8 rightToLeftSum = (game.board[0][2] * MAGIC_SQUARE[0][2]) + (game.board[1][1] * MAGIC_SQUARE[1][1])
            + (game.board[2][0] * MAGIC_SQUARE[2][0]);
        if (leftToRightSum == magicSum || rightToLeftSum == magicSum) {
            return true;
        }

        return false;
    }
}
