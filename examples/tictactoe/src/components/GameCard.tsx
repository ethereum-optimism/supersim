import React, { useState } from 'react';

import { Game, GameStatus, PlayerTurn} from '../types/game';
import { truncateAddress } from '../utils/address';
import { useAcceptGame } from '../hooks/useAcceptGame';

import ChainLogo from './ChainLogo';
import { useAccount } from 'wagmi';

interface GameCardProps {
  game: Game

  isSelected?: boolean
  onSelect?: () => void
}

const GameCard: React.FC<GameCardProps> = ({ game, isSelected = false, onSelect = () => {}}) => {
  const { address: player } = useAccount();
  const { acceptGame, isPending, isConfirming } = useAcceptGame()
  const [isHovered, setIsHovered] = useState(false);

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

  // Indicates if the game card is available for the player to accept
  const isAvailableGame = !game.opponent && game.player.toLowerCase() !== player!.toLowerCase()
  const isPlayerGame = !isAvailableGame

  // Address of the opponent for this game. The player for an available game is the potential opponent
  const opponent = isAvailableGame ? game.player : game.opponent

  // Indicates if the game card is clickable.
  // For available games, the card has an accept button
  // For player games, the game has been accepted by an opponent
  const isInteractive = isPlayerGame && game.opponent

  return (
    <div
        style={{
          ...styles.card,
          backgroundColor: isSelected || (isInteractive && isHovered) ? '#f0f0f0' : 'white',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => isInteractive && onSelect()}>
      <div
       style={{
          ...styles.info,
          opacity: isAvailableGame || isInteractive ? 1 : 0.7,
          pointerEvents: isAvailableGame || isInteractive ? 'auto' : 'none',
          cursor: isInteractive ? 'pointer' : 'default',
       }}>

        {isPlayerGame && (
          <p style={styles.text}>Game ID: {`${game.chainId}-${game.gameId}`}</p>
        )}

        <p style={styles.text}>
          Opponent:
          <span style={{display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '4px'}}>
            {isAvailableGame ?
              <ChainLogo chainId={BigInt(game.chainId)}/> : // local view of the creating chain id
              opponent && <ChainLogo chainId={BigInt(game.opponentChainId!)}/> // pull in the chain id of the opponent
            }
            {opponent ? truncateAddress(opponent!): 'Waiting to accept'}
          </span>
        </p>

        {isPlayerGame && (
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
              onClick={() => acceptGame(game.chainId, game.gameId, game.player)}
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
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '8px',
    marginBottom: '8px',
  },
  acceptButton: {
    backgroundColor: '#FF0420',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    marginRight: '8px',
  },
  declineButton: {
    backgroundColor: '#F1F5F9',
    color: 'black',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
  },
};

export default GameCard;
