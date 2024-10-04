import React from 'react';

import { Game, PlayerTurn } from '../types/Game';
import { useMakeMove } from '../hooks/useMakeMove';

interface BoardProps {
  game: Game
  opponentGame: Game
}

const truncateAddress = (address: string) => {
  if (!address) return 'Unavailable';
  return `${address.slice(0, 3)}...${address.slice(-3)}`;
};

const Board: React.FC<BoardProps> = ({ game, opponentGame }) => {
  const { makeMove, isConfirming, isPending, isSuccess, hash } = useMakeMove()

  const isPlayerTurn = game.turn == PlayerTurn.Player
  const isPendingTx = isPending || isConfirming

  const renderSquare = (x: number, y: number) => {
    const move = game.moves[x][y]
    const handleClick = async () => { await makeMove(opponentGame, x, y) }

    return (
      <div 
        key={`${x}-${y}`} 
        onClick={handleClick}
        style={{
          width: '60px',
          height: '60px',
          border: '2px solid #333',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
          cursor: isPlayerTurn && !isPendingTx && !move ? 'pointer' : 'default',
          backgroundColor: isPendingTx ? '#f0f0f0' : 'white',
          opacity: isPlayerTurn || isConfirming ? 1 : 0.7,
          pointerEvents: isPlayerTurn && !move ? 'auto' : 'none',
          margin: '5px', // Add margin to create gap between squares
        }}
      >
        <span style={{
          color: move === 1 ? '#FF5722' : move === 2 ? '#2196F3' : 'transparent',
        }}>
          {move === 1 ? 'X' : move === 2 ? 'O' : ''}
        </span>
      </div>
    )
  }

  return (
    <div style={{ opacity: isPlayerTurn ? 1 : 0.5, transition: 'opacity 0.5s ease-in-out' }}>
      <p
        style={{
          textAlign: 'center',
          fontSize: '1.2em',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: isPlayerTurn ? '#FF5722' : '#2196F3',
        }}
      >{isConfirming ? 'Confirming Tx...': isPlayerTurn ? 'Your turn!' : 'Waiting for opponent'}</p>
      <div className="board" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {[0, 1, 2].map(x => (
          <div key={x} className="board-row" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> 
            {[0, 1, 2].map(y => renderSquare(x, y))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board;