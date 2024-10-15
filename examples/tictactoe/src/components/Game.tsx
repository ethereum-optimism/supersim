import React, { useState } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';

import { useMakeMove } from '../hooks/useMakeMove';
import { createGameKey, Game as GameType, PlayerTurn, GameStatus } from '../types/game';
import { truncateAddress } from '../utils/address';
import { useGames } from '../hooks/useGames';
import { chainName } from '../utils/chains';

import ChainLogo from './ChainLogo';

interface GameProps {
  game: GameType
}

const Game: React.FC<GameProps> = ({ game }) => {
  const gameId = `${game.chainId}-${game.gameId}`
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <p style={styles.infoTitle}>Game ID:</p><p style={styles.infoValue}>{gameId}</p>

        <p style={styles.infoTitle}>Chain:</p>
        <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <ChainLogo chainId={BigInt(game.lastActionId.chainId)}/>
          <p style={styles.infoValue}>{chainName(Number(game.lastActionId.chainId))}</p>
        </span>

        <p style={styles.infoTitle}>Opponent:</p>
        <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <ChainLogo chainId={BigInt(game.opponentChainId!)}/>
          <p style={styles.infoValue}>{truncateAddress(game.opponent!)}</p>
        </span>
      </div>
      <Board game={game} />
    </div>
  )
}

const X: React.FC<{}> = () => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9996 11.7018L26.5492 0.152344L29.849 3.45217L18.2994 15.0016L29.849 26.5509L26.5492 29.8507L14.9996 18.3014L3.45024 29.8507L0.150391 26.5509L11.6998 15.0016L0.150391 3.45217L3.45024 0.152344L14.9996 11.7018Z" fill="#3374DB"/>
    </svg>
  )
}

const O: React.FC<{}> = () => {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.0007 53.6667C12.2731 53.6667 0.333984 41.7275 0.333984 27C0.333984 12.2724 12.2731 0.333374 27.0007 0.333374C41.7281 0.333374 53.6673 12.2724 53.6673 27C53.6673 41.7275 41.7281 53.6667 27.0007 53.6667ZM27.0007 48.3334C38.7828 48.3334 48.334 38.7822 48.334 27C48.334 15.218 38.7828 5.66671 27.0007 5.66671C15.2186 5.66671 5.66732 15.218 5.66732 27C5.66732 38.7822 15.2186 48.3334 27.0007 48.3334Z" fill="#636779"/>
    </svg>
  )
}

const Board: React.FC<GameProps> = ({ game }) => {
  const { chainId } = useAccount()
  const { games } = useGames()
  const { makeMove, isConfirming, isPending } = useMakeMove()
  const { switchChain } = useSwitchChain() // TODO: Detect if required chain is not in the list

  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null);

  const statusText = (status: GameStatus, turn: PlayerTurn) => {
    switch (status) {
      case GameStatus.Draw: return '🥱 Draw';
      case GameStatus.Won: return '🥳 You won';
      case GameStatus.Lost: return '👎 You lost';
      default: // game is active
    }

    if (!game.opponent) { return '-' }

    switch (turn) {
      case PlayerTurn.Player: return '🖐️ Your turn';
      case PlayerTurn.Opponent: return "‍💻 Opponent's turn";
      default: return 'UNEXPECTED';
    }
  };

  const isPlayerTurn = game.turn === PlayerTurn.Player
  const isConnectedToChain = chainId === Number(game.lastActionId.chainId)
  const isGameOver = game.status !== GameStatus.Active
  const isInteractive = isConnectedToChain && isPlayerTurn && !isGameOver && (!isPending || !isConfirming)
  const opponentGame = games[createGameKey(game.chainId, game.gameId, game.opponent!)]

  return (
    <div style={styles.boardContainer}>

      <div style={styles.turn}>{isPending || isConfirming ? '🛠️  Making Move..' : statusText(game.status, game.turn)}</div>

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

      <div style={styles.board}>
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
                  cursor: isInteractive && !move ? 'pointer' : 'default',
                  opacity: isInteractive ? 1 : 0.7,
                  pointerEvents: isInteractive && !move ? 'auto' : 'none',
                }}
                onClick={() => makeMove(opponentGame, row, col)}
                onMouseEnter={() => isInteractive && setHoveredSquare(squareKey)}
                onMouseLeave={() => isInteractive && setHoveredSquare(null)}>
                
                { move ?
                   move === 1 ? <X /> : <O/> :
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
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row' as 'row',
  },
  infoTitle: {
    fontSize: '14px',
    color: '#636779',
    marginRight: '4px',
  },
  infoValue: {
    fontSize: '14px',
    marginRight: '10px',
  },
  turn: {
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
    backgroundColor: '#F2F3F8',
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

export default Game;
