import React, { useState } from 'react';
import { useAccount } from 'wagmi';

import { Game, GameStatus, PlayerTurn} from '../types/game';
import { truncateAddress } from '../utils/address';
import { useAcceptGame } from '../hooks/useAcceptGame';

interface GameCardProps {
  game: Game
  isSelected?: boolean
  onSelect?: () => void
}

const GameCard: React.FC<GameCardProps> = ({ game, isSelected = false, onSelect = () => {}}) => {
  const { address: player } = useAccount();
  const { acceptGame, isPending, isConfirming } = useAcceptGame()
  const [isHovered, setIsHovered] = useState(false);

  const handleAcceptGame = async () => { await acceptGame(game.chainId, game.gameId, game.player) }

  const statusText = (status: GameStatus, turn: PlayerTurn) => {
    switch (status) {
      case GameStatus.Draw: return '🥱 Draw';
      case GameStatus.Won: return '🥳 You won';
      case GameStatus.Lost: return '👎 You lost';
      default:
    }

    if (!game.opponent) { return '-' }

    switch (turn) {
      case PlayerTurn.Player: return '🖐️ Your turn';
      case PlayerTurn.Opponent: return "‍💻 Opponent's turn";
      default: return 'UNEXPECTED';
    }
  };

  const isAvailableGame = !game.opponent && game.player.toLowerCase() !== player!.toLowerCase()

  // Indicates if the game card is clickable. Available games can only be accepted
  // and the game requires an opponent to be played.
  const isInteractive = !isAvailableGame && game.opponent

  return (
    <div
        style={{
          ...styles.card,
          backgroundColor: isSelected || (isInteractive && isHovered) ? '#f0f0f0' : 'white',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}>
      <div
       style={{
          ...styles.info,
          cursor: isInteractive ? 'pointer' : 'default',
          opacity: isInteractive ? 1 : 0.7,
          pointerEvents: isInteractive ? 'auto' : 'none',
       }}>
        {!isAvailableGame && (
          <p style={styles.text}>Game ID: {`${game.chainId}-${game.gameId}`}</p>
        )}

        <p style={styles.text}>Opponent: {game.opponent ? truncateAddress(game.opponent) : 'Waiting to accept'}</p>

        {!isAvailableGame && (
          <p style={styles.text}>Status: {statusText(game.status, game.turn)}</p>
        )}

        {isAvailableGame && (
          <div style={styles.buttonContainer}>
            <button
              style={{
                ...styles.acceptButton,
                opacity: isPending || isConfirming ? 0.5 : 1,
                cursor: isPending || isConfirming ? 'not-allowed' : 'pointer'
              }}
              onClick={handleAcceptGame}
              disabled={isPending || isConfirming}>
              {isConfirming ? 'Accepting...' : 'Accept'}
            </button>

            {/* TODO IMPLEMENT THIS? */}
            <button style={styles.declineButton}>Decline</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    margin: '0px -25px', // extend beyond padding
    borderStyle: 'none none solid none',
    borderColor: '#E0E0E0',
  },
  info: {
    margin: '0px 25px',
    padding: '16px 0px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  text: {
    margin: '2px 0px',
    fontSize: '12px',
    color: '#666',
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '8px',
    marginBottom: '8px',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    marginRight: '8px',
  },
  declineButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
  },
};

export default GameCard;
