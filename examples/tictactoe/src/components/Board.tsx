import React, { useState } from 'react'
import { useAccount, useSwitchChain } from 'wagmi';

import { X, O } from './BoardMoves';

import { Game, PlayerTurn, GameStatus, createGameKey } from '../types/game';

import { useGames } from '../hooks/useGames';
import { useMakeMove } from '../hooks/useMakeMove';

import { chainName } from '../utils/chains';
import { endingMoves } from '../utils/board';

interface BoardProps {
  game: Game
}

const Board: React.FC<BoardProps> = ({ game }) => {
  const { chainId } = useAccount()
  const { games } = useGames()
  const { makeMove, isConfirming, isPending } = useMakeMove()
  const { switchChain } = useSwitchChain()

  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null);

  const statusText = (status: GameStatus, turn: PlayerTurn) => {
    switch (status) {
      case GameStatus.Draw: return '🥱 Draw';
      case GameStatus.Won: return '🥳 You won';
      case GameStatus.Lost: return '👎 You lost';
      default: // game is active
    }

    switch (turn) {
      case PlayerTurn.Player: return '🖐️ Your turn';
      case PlayerTurn.Opponent: return "‍💻 Opponent's turn";
      default: return 'UNEXPECTED';
    }
  };

  const isPlayerTurn = game.turn === PlayerTurn.Player
  const isConnectedToChain = chainId === Number(game.lastActionId.chainId)
  const isGameOver = game.status !== GameStatus.Active

  const gameEndingMoves = endingMoves(game.moves)
  const cellBackgroundColor = (row: number, col: number) => {
    if (!gameEndingMoves) { return '#F2F3F8' }

    const move = game.moves[row][col]

    // winning & losing cell
    if (move == 1 && gameEndingMoves.some(move => move[0] === row && move[1] === col)) { return '#D6FFDA' }
    if (move == 2 && gameEndingMoves.some(move => move[0] === row && move[1] === col)) { return '#FFD6D6' }

    // default color
    return '#F2F3F8'
  }

  const opponentGame = games[createGameKey(game.chainId, game.gameId, game.opponent!)]
  const isInteractive = isConnectedToChain && isPlayerTurn && !isGameOver && !(isPending || isConfirming)
  return (
    <div style={styles.boardContainer}>
      <div style={styles.turnText}>{isPending || isConfirming ? '🛠️  Making Move..' : statusText(game.status, game.turn)}</div>

      {isPlayerTurn && !isConnectedToChain && (
        <div style={styles.switchChainBanner}>
            Switch to {chainName(Number(game.lastActionId.chainId))} to play your turn. 
            <a
              style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: '4px' }}
              onClick={() => switchChain({ chainId: Number(game.lastActionId.chainId) })}>
              Switch Network
            </a>
        </div>
      )}

      <div style={{
        ...styles.board,
         filter: !isInteractive && !isGameOver ? 'blur(2px)' : 'none',
         pointerEvents: !isInteractive && !isGameOver ? 'none' : 'auto',
         }}>
        {[0, 1, 2].map(row => (
        <div key={row} style={styles.boardRow}>
          {[0, 1, 2].map(col => { 
            const squareKey = `${row}-${col}`
            const move = game.moves[row][col]
            const isHovered = hoveredSquare === squareKey;
            return (
              <div
                key={col}
                style={{
                  ...styles.cell,
                  backgroundColor: cellBackgroundColor(row, col),
                  cursor: isInteractive && !move ? 'pointer' : 'default',
                  opacity: isInteractive ? 1 : 0.7,
                  pointerEvents: isInteractive && !move ? 'auto' : 'none',
                }}
                onClick={() => makeMove(opponentGame, row, col)}
                onMouseEnter={() => isInteractive && setHoveredSquare(squareKey)}
                onMouseLeave={() => isInteractive && setHoveredSquare(null)}>
                
                {
                  move ?
                  
                  // If the move is defined it must be 1 or 1
                  move === 1 ? <X /> : <O/> :

                  // If the move is not taken, show the preview
                  isInteractive && isHovered && (
                    <div style={styles.preview}>
                     <X />
                    </div>
                  )
                }

              </div>
            )
          })}
        </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  turnText: {
    textAlign: 'center' as const,
    fontSize: '14px',
  },
  switchChainBanner: {
    backgroundColor: '#D6E4FF',
    padding: '24px',
    borderRadius: '12px',
    fontSize: '16px',
    color: '#0E4CAF',
    textAlign: 'center' as const,
    width: '250px',
    marginTop: '16px',
  },
  boardContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  board: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
  },
  boardRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '100px',
    borderRadius: '12px',
    fontSize: '56px',
    fontWeight: 'bold',
    margin: '5px',
    transition: 'all 0.3s ease',
    position: 'relative' as const,
  },
  preview: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E2EB',
    borderRadius: '12px',
  },
}

export default Board;