// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {ICrossL2Inbox} from "@contracts-bedrock/L2/interfaces/ICrossL2Inbox.sol";

/// @notice Thrown when cross l2 origin is not the TicTacToe contract
error IdOriginNotTicTacToe();

/// @notice Thrown when the reference chain is mismatched
error IdChainMismatch();

/// @notice Thrown when a player tries to play themselves;
error SenderIsOpponent();

/// @notice Thrown when the exepcted event is not NewGame
error DataNotNewGame();

/// @notice Thrown when the exepcted event is not AcceptedGame
error DataNotAcceptedGame();

/// @notice Thrown when the exepcted event is not MovePlayed
error DataNotMovePlayed();

/// @notice Thrown when the caller is not allowed to act
error SenderNotPlayer();

/// @notice Thrown when trying to start a game on the wrong chain
error GameChainMismatch();

/// @notice Thrown when the game has already been started
error GameStarted();

/// @notice Thrown when a game does not exist
error GameNotExists();

/// @notice Thrown when the player makes an invalid move
error MoveInvalid();

/// @notice Thrown when the consumed event is not forward progressing the game.
error MoveNotForwardProgressing();

/// @notice Thrown when the player make a move that's already been played
error MoveTaken();

/// @title TicTacToe
/// @notice TicTacToe is a Superchain interoprable implementation of TicTacToe where players
///         can play each other from any two chains in each others interopable dependency sets
///         without needing to pass messages between themselves. Since a chain is be default in
///         its own dependency set, players on the same chain can also play each other :)
contract TicTacToe {
    uint256 public nextGameId;

    /// @notice Magic Square: https://mathworld.wolfram.com/MagicSquare.html
    uint8[3][3] private MAGIC_SQUARE = [[8, 3, 4], [1, 5, 9], [6, 7, 2]];
    uint8 private constant MAGIC_SUM = 15;

    /// @notice Structure for a local view of a game
    struct Game {
        address player;
        address opponent;
        // `1` for the player's moves, `2` opposing.
        uint8[3][3] moves;
        uint8 movesLeft;
        ICrossL2Inbox.Identifier lastOpponentId;
    }

    /// @notice A game is identifed from the (chainId, gameId) tuple from the chain it was initiated on
    ///         Since players on the same chain can play each other, we need to subspace by address as well.
    mapping(uint256 => mapping(uint256 => mapping(address => Game))) games;

    /// @notice Emitted when broadcasting a new game invitation. Anyone is allowed to accept
    event NewGame(uint256 chainId, uint256 gameId, address player);

    /// @notice Emitted when a player accepts an opponent's game
    event AcceptedGame(uint256 chainId, uint256 gameId, address opponent, address player);

    /// @notice Emitted when a player makes a move in a game
    event MovePlayed(uint256 chainId, uint256 gameId, address player, uint8 _x, uint8 _y);

    /// @notice Emitted when a player has won the game with their latest move
    event GameWon(uint256 chainId, uint256 gameId, address winner, uint8 _x, uint8 _y);

    /// @notice Emitted when all spots on the board were played with no winner with their lastest move
    event GameDraw(uint256 chainId, uint256 gameId, address player, uint8 _x, uint8 _y);

    /// @notice Creates a new game that any player can accept
    function newGame() external {
        emit NewGame(block.chainid, nextGameId, msg.sender);
        nextGameId++;
    }

    /// @notice Send out an acceptance event for a new game
    function acceptGame(ICrossL2Inbox.Identifier calldata _newGameId, bytes calldata _newGameData) external {
        // Validate Cross Chain Log
        if (_newGameId.origin != address(this)) revert IdOriginNotTicTacToe();
        ICrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_newGameId, keccak256(_newGameData));

        // Decode `NewGame` Event
        bytes32 selector = abi.decode(_newGameData[:32], (bytes32));
        if (selector != NewGame.selector) revert DataNotNewGame();

        (uint256 chainId, uint256 gameId, address opponent) = abi.decode(_newGameData[32:], (uint256, uint256, address));
        if (opponent == msg.sender) revert SenderIsOpponent();

        // Record Game Metadata (no moves)
        Game storage game = games[chainId][gameId][msg.sender];
        game.player = msg.sender;
        game.opponent = opponent;
        game.lastOpponentId = _newGameId;
        game.movesLeft = 9;

        emit AcceptedGame(chainId, gameId, game.opponent, game.player);
    }

    /// @notice Start a game accepted by an opponent with a starting move
    function startGame(
        ICrossL2Inbox.Identifier calldata _acceptedGameId,
        bytes calldata _acceptedGameData,
        uint8 _x,
        uint8 _y
    ) external {
        // Validate Cross Chain Log
        if (_acceptedGameId.origin != address(this)) revert IdOriginNotTicTacToe();
        ICrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_acceptedGameId, keccak256(_acceptedGameData));

        // Decode `AcceptedGame` event
        bytes32 selector = abi.decode(_acceptedGameData[:32], (bytes32));
        if (selector != AcceptedGame.selector) revert DataNotAcceptedGame();

        (uint256 chainId, uint256 gameId, address player, address opponent) = // player, opponent swapped in local view
         abi.decode(_acceptedGameData[32:], (uint256, uint256, address, address));

        // The accepted game was started from this chain, from the sender
        if (chainId != block.chainid) revert GameChainMismatch();
        if (msg.sender != player) revert SenderNotPlayer();

        // Game has not already been started with an opponent.
        Game storage game = games[chainId][gameId][msg.sender];
        if (game.opponent != address(0)) revert GameStarted();

        // Record Game Metadata
        game.player = msg.sender;
        game.opponent = opponent;
        game.lastOpponentId = _acceptedGameId;
        game.movesLeft = 9;

        // Make the first move (any spot on the board)
        if (_x >= 3 || _y >= 3) revert MoveInvalid();
        game.moves[_x][_y] = 1;
        game.movesLeft--;
        emit MovePlayed(chainId, gameId, game.player, _x, _y);
    }

    /// @notice Make a move for a game.
    function makeMove(
        ICrossL2Inbox.Identifier calldata _movePlayedId,
        bytes calldata _movePlayedData,
        uint8 _x,
        uint8 _y
    ) external {
        // Validate Cross Chain Log
        if (_movePlayedId.origin != address(this)) revert IdOriginNotTicTacToe();
        ICrossL2Inbox(Predeploys.CROSS_L2_INBOX).validateMessage(_movePlayedId, keccak256(_movePlayedData));

        // Decode `MovePlayed` event
        bytes32 selector = abi.decode(_movePlayedData[:32], (bytes32));
        if (selector != MovePlayed.selector) revert DataNotMovePlayed();

        (uint256 chainId, uint256 gameId,, uint8 oppX, uint8 oppY) =
            abi.decode(_movePlayedData[32:], (uint256, uint256, address, uint8, uint8));

        // Game was instantiated for this player
        Game storage game = games[chainId][gameId][msg.sender];
        if (game.player != msg.sender) revert GameNotExists();

        // The move played is forward progressing from the same chain
        if (_movePlayedId.chainId != game.lastOpponentId.chainId) revert IdChainMismatch();
        if (_movePlayedId.blockNumber <= game.lastOpponentId.blockNumber) revert MoveNotForwardProgressing();
        game.lastOpponentId = _movePlayedId;

        // NOTE: Since the supplied move is valid, `movesLeft > 0` as the code below will emit
        // `GameDrawn` when there are no moves left to play and `GameWon` on the winning move

        // Mark the opponents move
        game.moves[oppX][oppY] = 2;
        game.movesLeft--;

        // Make a move and mark the latest seen opposing move.
        if (_x >= 3 || _y >= 3) revert MoveInvalid();
        if (game.moves[_x][_y] != 0) revert MoveTaken();
        game.moves[_x][_y] = 1;
        game.movesLeft--;

        if (_isGameWon(game)) {
            emit GameWon(chainId, gameId, game.player, _x, _y);
        } else if (game.movesLeft == 0) {
            emit GameDraw(chainId, gameId, game.player, _x, _y);
        } else {
            emit MovePlayed(chainId, gameId, game.player, _x, _y);
        }
    }

    function gameState(uint256 chainId, uint256 gameId, address player) public view returns (Game memory) {
        return games[chainId][gameId][player];
    }

    /// @notice helper to check if a game has been won for the game's local player; moves == 1
    function _isGameWon(Game memory _game) internal view returns (bool) {
        // Check for a row/col win
        for (uint8 i = 0; i < 3; i++) {
            uint8 rowSum = (_game.moves[i][0] * MAGIC_SQUARE[i][0]) + (_game.moves[i][1] * MAGIC_SQUARE[i][1])
                + (_game.moves[i][2] * MAGIC_SQUARE[i][2]);

            if (rowSum == MAGIC_SUM) return true;

            uint8 colSum = (_game.moves[0][i] * MAGIC_SQUARE[0][i]) + (_game.moves[1][i] * MAGIC_SQUARE[1][i])
                + (_game.moves[2][i] * MAGIC_SQUARE[2][i]);

            if (colSum == MAGIC_SUM) return true;
        }

        // Check for a diag win
        uint8 leftToRightDiagSum = (_game.moves[0][0] * MAGIC_SQUARE[0][0]) + (_game.moves[1][1] * MAGIC_SQUARE[1][1])
            + (_game.moves[2][2] * MAGIC_SQUARE[2][2]);

        if (leftToRightDiagSum == MAGIC_SUM) return true;

        uint8 rightToLeftDiagSum = (_game.moves[0][2] * MAGIC_SQUARE[0][2]) + (_game.moves[1][1] * MAGIC_SQUARE[1][1])
            + (_game.moves[2][0] * MAGIC_SQUARE[2][0]);

        if (rightToLeftDiagSum == MAGIC_SUM) return true;

        return false;
    }
}
