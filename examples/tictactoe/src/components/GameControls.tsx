import React from 'react';

import { useNewGame } from '../hooks/useNewGame';
import { usePlayerGames } from '../hooks/usePlayerGames';
import { GameKey } from '../types/game';

import AvailableGames from './AvailableGames';
import PlayerGames from './PlayerGames';

const NewGameButton: React.FC = () => {
  const { createNewGame, isPending, isConfirming } = useNewGame()
  return (
    <button
      style={{
        ...styles.newGameButton,
        opacity: isPending || isConfirming ? 0.5 : 1,
        cursor: isPending || isConfirming ? 'not-allowed' : 'pointer'
      }}
      onClick={createNewGame}
      disabled={isPending || isConfirming}>
      {isConfirming ? 'Creating Game...' : 'New Game'}
    </button>
  )
}

interface GameControlsProps {
  selectedGameKey?: GameKey
  setSelectedGameKey: (gameKey: GameKey) => void
}

const GameControls: React.FC<GameControlsProps> = ({ selectedGameKey, setSelectedGameKey }) => {
  const { availableGames, playerGames } = usePlayerGames()
  return (
    <div style={styles.container}>
      <NewGameButton />
      <AvailableGames games={availableGames} />

      <div style={styles.dividerContainer}>
        <div style={styles.divider}></div>
      </div>

      <PlayerGames games={playerGames} selectedGameKey={selectedGameKey} setSelectedGameKey={setSelectedGameKey} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    height: '100%',
  },
  newGameButton: {
    backgroundColor: '#FF0420',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  dividerContainer: {
    margin: '0 -25px',
  },
  divider: {
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
};

export default GameControls;