import React, { useState } from 'react';
import { useAccount } from "wagmi"

import { Game, PlayerTurn } from '../types/game';
import { useMakeMove } from '../hooks/useMakeMove';

interface BoardProps {
  game: Game
  opponentGame: Game
}

const Board: React.FC<BoardProps> = ({ game, opponentGame }) => {
  const { chainId } = useAccount()
  const isConnectedToChain = chainId === Number(game.lastActionId.chainId)

  const { makeMove, isConfirming, isPending, isSuccess, hash } = useMakeMove()
  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null);

  const isPlayerTurn = game.turn == PlayerTurn.Player
  const isPendingTx = isPending || isConfirming

  // Player can make a move on the board
  const isInteractive = isConnectedToChain && isPlayerTurn && !isPendingTx

  const renderSquare = (x: number, y: number) => {
    const move = game.moves[x][y]
    const handleClick = async () => { 
      if (!isPendingTx && isPlayerTurn && !move) {
        await makeMove(opponentGame, x, y) 
      }
    }
    const squareKey = `${x}-${y}`;
    const isHovered = hoveredSquare === squareKey;

    return (
      <div 
        key={squareKey}
        onClick={handleClick}
        onMouseEnter={() => !isPendingTx && setHoveredSquare(squareKey)}
        onMouseLeave={() => !isPendingTx && setHoveredSquare(null)}
        style={{
          ...styles.square,
          cursor: isInteractive ? 'pointer' : 'default',
          backgroundColor: isPendingTx ? '#f0f0f0' : 'white',
          opacity: isInteractive ? 1 : 0.7,
          pointerEvents: isInteractive ? 'auto' : 'none',
        }}
      >
        <span style={{
          color: move === 1 ? '#FF5722' : move === 2 ? '#2196F3' : 'transparent',
        }}>
          {move === 1 ? 'X' : move === 2 ? 'O' : ''}
        </span>
        {isPlayerTurn && !isPendingTx && !move && isHovered && (
          <div style={styles.preview}>
            <span style={styles.previewSymbol}>X</span>
          </div>
        )}
      </div>
    )
  }

  const turnText = isPlayerTurn ? 'Your turn!' : 'Waiting for opponent'
  return (
    <div style={{ ...styles.boardContainer, opacity: isPlayerTurn && !isPendingTx ? 1 : 0.5 }}>
      {
        !isConnectedToChain && (
          <p style={{ ...styles.statusText, color: 'black' }}>
            switch to chain {game.lastActionId.chainId} to make a move
          </p>
        )
      }
      <p style={{ ...styles.statusText, color: isPlayerTurn ? '#FF5722' : '#2196F3' }}>
        {isConfirming ? 'Confirming Tx...' : turnText}
      </p>
      <div style={styles.board}>
        {[0, 1, 2].map(x => (
          <div key={x} style={styles.boardRow}> 
            {[0, 1, 2].map(y => renderSquare(x, y))}
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  boardContainer: {
    transition: 'opacity 0.5s ease-in-out',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  statusText: {
    textAlign: 'center' as const,
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  board: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center'
  },
  boardRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center'
  },
  square: {
    width: '60px',
    height: '60px',
    border: '2px solid #333',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '32px',
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
    backgroundColor: 'rgba(255, 87, 34, 0.2)',
  },
  previewSymbol: {
    color: '#FF5722',
    fontSize: '24px'
  }
} as const;

export default Board;
