// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";

import {Predeploys} from "@contracts-bedrock/libraries/Predeploys.sol";
import {ICrossL2Inbox} from "@contracts-bedrock/L2/interfaces/ICrossL2Inbox.sol";

import {TicTacToe} from "../../src/tictactoe/TicTacToe.sol";
import {
    IdOriginNotTicTacToe,
    DataNotNewGame,
    DataNotAcceptedGame,
    GameChainMismatch,
    GameNotExists,
    SenderNotPlayer,
    MoveInvalid,
    MoveTaken
} from "../../src/tictactoe/TicTacToe.sol";

contract TicTacToeTest is Test {
    function test_newGame() public {
        TicTacToe game = new TicTacToe();
        uint256 expectedGameId = game.nextGameId();

        vm.recordLogs();

        game.newGame();
        assertEq(expectedGameId + 1, game.nextGameId());

        Vm.Log[] memory logs = vm.getRecordedLogs();
        assertEq(logs.length, 1);
        assertEq(logs[0].topics[0], TicTacToe.NewGame.selector);
        assertEq(logs[0].data, abi.encode(block.chainid, expectedGameId, address(this)));
    }

    function testFuzz_acceptGame_succeeds(uint256 chainId, uint256 gameId, address opponent) public {
        TicTacToe game = new TicTacToe();
        ICrossL2Inbox.Identifier memory newGameId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, chainId);
        bytes memory newGameData = abi.encodePacked(TicTacToe.NewGame.selector, abi.encode(chainId, gameId, opponent));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, newGameId, newGameData),
            returnData: ""
        });

        vm.recordLogs();
        game.acceptGame(newGameId, newGameData);

        Vm.Log[] memory logs = vm.getRecordedLogs();
        assertEq(logs.length, 1);
        assertEq(logs[0].topics[0], TicTacToe.AcceptedGame.selector);
        assertEq(logs[0].data, abi.encode(chainId, gameId, opponent, address(this)));

        TicTacToe.Game memory state = game.gameState(chainId, gameId, address(this));
        assertEq(state.player, address(this));
        assertEq(state.opponent, opponent);
        assertEq(state.movesLeft, 9);
        for (uint8 i = 0; i < 3; i++) {
            for (uint8 j = 0; j < 3; j++) {
                assertEq(state.moves[i][j], 0);
            }
        }

        assertEq(abi.encode(state.lastOpponentId), abi.encode(newGameId));
    }

    function testFuzz_acceptGame_invalidIdOrigin_reverts(uint256 chainId, uint256 gameId, address opponent) public {
        TicTacToe game = new TicTacToe();

        // Use an invalid origin. This couldn't occur due CrossL2Inbox invalidation but we test for it anyways
        ICrossL2Inbox.Identifier memory newGameId = ICrossL2Inbox.Identifier(address(this), 0, 0, 0, chainId);
        bytes memory newGameData = abi.encodePacked(TicTacToe.NewGame.selector, abi.encode(chainId, gameId, opponent));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, newGameId, newGameData),
            returnData: ""
        });

        vm.expectRevert(IdOriginNotTicTacToe.selector);
        game.acceptGame(newGameId, newGameData);
    }

    function testFuzz_acceptGame_invalidSelector_reverts(uint256 chainId, uint256 gameId, address opponent) public {
        TicTacToe game = new TicTacToe();

        // Use an invalid selector. This couldn't occur due CrossL2Inbox invalidation but we test for it anyways
        ICrossL2Inbox.Identifier memory newGameId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, chainId);
        bytes memory newGameData =
            abi.encodePacked(TicTacToe.AcceptedGame.selector, abi.encode(chainId, gameId, opponent));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, newGameId, newGameData),
            returnData: ""
        });

        vm.expectRevert(DataNotNewGame.selector);
        game.acceptGame(newGameId, newGameData);
    }

    function testFuzz_startGame_succeeds(uint256 oppChainId, uint256 gameId, address opponent, uint8 x, uint8 y)
        public
    {
        TicTacToe game = new TicTacToe();
        vm.assume(x < 3 && y < 3);

        // Even though the chainIds can be the same, differ for the test
        vm.assume(oppChainId != block.chainid);
        uint256 chainId = block.chainid;
        address player = address(this);

        // player is the opponent in the AcceptedGame event
        ICrossL2Inbox.Identifier memory acceptGameId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, oppChainId);
        bytes memory acceptGameData =
            abi.encodePacked(TicTacToe.AcceptedGame.selector, abi.encode(chainId, gameId, player, opponent));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, acceptGameId, acceptGameData),
            returnData: ""
        });

        vm.recordLogs();
        game.startGame(acceptGameId, acceptGameData, x, y);

        TicTacToe.Game memory state = game.gameState(chainId, gameId, player);
        assertEq(state.player, address(this));
        assertEq(state.opponent, opponent);
        assertEq(state.movesLeft, 8); // single move has been made
        assertEq(state.moves[x][y], 1);
        for (uint8 i = 0; i < 3; i++) {
            for (uint8 j = 0; j < 3; j++) {
                if (i == x && j == y) continue;
                assertEq(state.moves[i][j], 0);
            }
        }

        assertEq(abi.encode(state.lastOpponentId), abi.encode(acceptGameId));

        Vm.Log[] memory logs = vm.getRecordedLogs();
        assertEq(logs.length, 1);
        assertEq(logs[0].topics[0], TicTacToe.MovePlayed.selector);
        assertEq(logs[0].data, abi.encode(chainId, gameId, player, x, y));
    }

    function testFuzz_startGame_invalidIdOrigin_reverts(uint256 gameId, address opponent, uint8 x, uint8 y) public {
        TicTacToe game = new TicTacToe();
        uint256 chainId = block.chainid;

        // Use an invalid origin. This couldn't occur due CrossL2Inbox invalidation but we test for it anyways
        ICrossL2Inbox.Identifier memory acceptGameId = ICrossL2Inbox.Identifier(address(this), 0, 0, 0, chainId);
        bytes memory acceptGameData =
            abi.encodePacked(TicTacToe.AcceptedGame.selector, abi.encode(chainId, gameId, opponent));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, acceptGameId, acceptGameData),
            returnData: ""
        });

        vm.expectRevert(IdOriginNotTicTacToe.selector);
        game.startGame(acceptGameId, acceptGameData, x, y);
    }

    function testFuzz_startGame_invalidSelector_reverts(uint256 gameId, address opponent, uint8 x, uint8 y) public {
        TicTacToe game = new TicTacToe();
        uint256 chainId = block.chainid;

        // Use an invalid selector. This couldn't occur due CrossL2Inbox invalidation but we test for it anyways
        ICrossL2Inbox.Identifier memory acceptGameId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, chainId);
        bytes memory acceptGameData =
            abi.encodePacked(TicTacToe.NewGame.selector, abi.encode(chainId, gameId, opponent));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, acceptGameId, acceptGameData),
            returnData: ""
        });

        vm.expectRevert(DataNotAcceptedGame.selector);
        game.startGame(acceptGameId, acceptGameData, x, y);
    }

    function testFuzz_startGame_differentChain_reverts(
        uint256 oppChainId,
        uint256 gameId,
        address opponent,
        uint8 x,
        uint8 y
    ) public {
        TicTacToe game = new TicTacToe();
        address player = address(this);

        // An accepted game that was started on oppChainId and not block.chainId
        vm.assume(oppChainId != block.chainid);
        ICrossL2Inbox.Identifier memory acceptGameId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, oppChainId);
        bytes memory acceptGameData =
            abi.encodePacked(TicTacToe.AcceptedGame.selector, abi.encode(oppChainId, gameId, opponent, player));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, acceptGameId, acceptGameData),
            returnData: ""
        });

        vm.expectRevert(GameChainMismatch.selector);
        game.startGame(acceptGameId, acceptGameData, x, y);
    }

    function testFuzz_startGame_incorrectSender_reverts(uint256 gameId, address opponent, uint8 x, uint8 y) public {
        TicTacToe game = new TicTacToe();

        // This test is not authorized to start the game
        uint256 chainId = block.chainid;
        address player = address(game);

        ICrossL2Inbox.Identifier memory acceptGameId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, chainId);
        bytes memory acceptGameData =
            abi.encodePacked(TicTacToe.AcceptedGame.selector, abi.encode(chainId, gameId, opponent, player));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, acceptGameId, acceptGameData),
            returnData: ""
        });

        vm.expectRevert(SenderNotPlayer.selector);
        game.startGame(acceptGameId, acceptGameData, x, y);
    }

    function testFuzz_startGame_invalidMove_reverts(uint256 gameId, address opponent, uint8 x, uint8 y) public {
        vm.assume(x >= 3 || y >= 3);

        TicTacToe game = new TicTacToe();
        uint256 chainId = block.chainid;
        address player = address(this);

        // player is the opponent in the AcceptedGame event
        ICrossL2Inbox.Identifier memory acceptGameId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, chainId);
        bytes memory acceptGameData =
            abi.encodePacked(TicTacToe.AcceptedGame.selector, abi.encode(chainId, gameId, player, opponent));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, acceptGameId, acceptGameData),
            returnData: ""
        });

        vm.expectRevert(MoveInvalid.selector);
        game.startGame(acceptGameId, acceptGameData, x, y);
    }

    function testFuzz_makeMove_succeeds(uint256 gameId, address opponent) public {
        TicTacToe game = new TicTacToe();
        uint256 chainId = block.chainid;
        address player = address(this);

        // Moves made in a diagnol since fuzzing for 3 random points doess not work

        // Start a game from the local chain
        ICrossL2Inbox.Identifier memory acceptGameId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, chainId);
        bytes memory acceptGameData =
            abi.encodePacked(TicTacToe.AcceptedGame.selector, abi.encode(chainId, gameId, player, opponent));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, acceptGameId, acceptGameData),
            returnData: ""
        });
        game.startGame(acceptGameId, acceptGameData, 0, 0);

        // Play a move after the opponent
        ICrossL2Inbox.Identifier memory movePlayId = ICrossL2Inbox.Identifier(address(game), 1, 0, 0, chainId);
        bytes memory movePlayData =
            abi.encodePacked(TicTacToe.MovePlayed.selector, abi.encode(chainId, gameId, opponent, 1, 1));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, movePlayId, movePlayData),
            returnData: ""
        });

        vm.recordLogs();
        game.makeMove(movePlayId, movePlayData, 2, 2);
        Vm.Log[] memory logs = vm.getRecordedLogs();

        TicTacToe.Game memory state = game.gameState(chainId, gameId, player);
        assertEq(state.movesLeft, 6);
        assertEq(state.moves[0][0], 1); // first starting move
        assertEq(state.moves[1][1], 2); // second opponents move
        assertEq(state.moves[2][2], 1); // third move

        assertEq(logs.length, 1);
        assertEq(logs[0].topics[0], TicTacToe.MovePlayed.selector);
        assertEq(logs[0].data, abi.encode(chainId, gameId, player, 2, 2));
    }

    function testFuzz_makeMove_nonExistentGame_reverts(uint256 gameId, address opponent) public {
        TicTacToe game = new TicTacToe();
        uint256 chainId = block.chainid;

        // Game was never started or accepted
        ICrossL2Inbox.Identifier memory movePlayId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, chainId);
        bytes memory movePlayData =
            abi.encodePacked(TicTacToe.MovePlayed.selector, abi.encode(chainId, gameId, opponent, 1, 1));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, movePlayId, movePlayData),
            returnData: ""
        });

        vm.expectRevert(GameNotExists.selector);
        game.makeMove(movePlayId, movePlayData, 0, 0);
    }

    function testFuzz_makeMove_invalidMove_reverts(uint256 gameId, address opponent) public {
        TicTacToe game = new TicTacToe();
        uint256 chainId = block.chainid;
        address player = address(this);

        ICrossL2Inbox.Identifier memory acceptGameId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, chainId);
        bytes memory acceptGameData =
            abi.encodePacked(TicTacToe.AcceptedGame.selector, abi.encode(chainId, gameId, player, opponent));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, acceptGameId, acceptGameData),
            returnData: ""
        });

        game.startGame(acceptGameId, acceptGameData, 0, 0);

        ICrossL2Inbox.Identifier memory movePlayId = ICrossL2Inbox.Identifier(address(game), 1, 0, 0, chainId);
        bytes memory movePlayData =
            abi.encodePacked(TicTacToe.MovePlayed.selector, abi.encode(chainId, gameId, opponent, 1, 1));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, movePlayId, movePlayData),
            returnData: ""
        });

        vm.expectRevert(MoveInvalid.selector);
        game.makeMove(movePlayId, movePlayData, 3, 3);
    }

    function testFuzz_makeMove_moveTaken_reverts(uint256 gameId, address opponent) public {
        TicTacToe game = new TicTacToe();
        uint256 chainId = block.chainid;
        address player = address(this);

        ICrossL2Inbox.Identifier memory acceptGameId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, chainId);
        bytes memory acceptGameData =
            abi.encodePacked(TicTacToe.AcceptedGame.selector, abi.encode(chainId, gameId, player, opponent));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, acceptGameId, acceptGameData),
            returnData: ""
        });

        game.startGame(acceptGameId, acceptGameData, 0, 0);

        ICrossL2Inbox.Identifier memory movePlayId = ICrossL2Inbox.Identifier(address(game), 1, 0, 0, chainId);
        bytes memory movePlayData =
            abi.encodePacked(TicTacToe.MovePlayed.selector, abi.encode(chainId, gameId, opponent, 1, 1));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, movePlayId, movePlayData),
            returnData: ""
        });

        // Play the same move as the opponent
        vm.expectRevert(MoveTaken.selector);
        game.makeMove(movePlayId, movePlayData, 1, 1);
    }

    function testFuzz_makeMove_gameWon_succeeds(uint256 gameId, address opponent) public {
        TicTacToe game = new TicTacToe();
        uint256 chainId = block.chainid;
        address player = address(this);

        ICrossL2Inbox.Identifier memory acceptGameId = ICrossL2Inbox.Identifier(address(game), 0, 0, 0, chainId);
        bytes memory acceptGameData =
            abi.encodePacked(TicTacToe.AcceptedGame.selector, abi.encode(chainId, gameId, player, opponent));
        vm.mockCall({
            callee: Predeploys.CROSS_L2_INBOX,
            data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, acceptGameId, acceptGameData),
            returnData: ""
        });
        game.startGame(acceptGameId, acceptGameData, 0, 0);

        // Play Row 0 for player and Row 1 for opponent
        Vm.Log[] memory logs;
        uint256 blockNum = acceptGameId.blockNumber + 1;
        for (uint8 i = 1; i < 3; i++) {
            ICrossL2Inbox.Identifier memory movePlayId =
                ICrossL2Inbox.Identifier(address(game), blockNum, 0, 0, chainId);
            bytes memory movePlayData =
                abi.encodePacked(TicTacToe.MovePlayed.selector, abi.encode(chainId, gameId, opponent, 2, i));
            vm.mockCall({
                callee: Predeploys.CROSS_L2_INBOX,
                data: abi.encodeWithSelector(ICrossL2Inbox.validateMessage.selector, movePlayId, movePlayData),
                returnData: ""
            });

            if (i == 2) {
                vm.recordLogs();
            }
            game.makeMove(movePlayId, movePlayData, 0, i);
            if (i == 2) {
                logs = vm.getRecordedLogs();
            }

            blockNum++;
        }

        assertEq(logs.length, 1);
        assertEq(logs[0].topics[0], TicTacToe.GameWon.selector);
        assertEq(logs[0].data, abi.encode(chainId, gameId, player, 0, 2));
    }

    // TODO: unit test GameDrawn
}
