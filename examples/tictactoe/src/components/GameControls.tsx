import React from 'react';

import { useNewGame } from '../hooks/useNewGame';
import { usePlayerGames } from '../hooks/usePlayerGames';
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

const GameControls: React.FC = () => {
  const { availableGames, playerGames } = usePlayerGames()
  return (
    <div style={styles.container}>
      <NewGameButton />
      <AvailableGames games={availableGames} />

      <div style={styles.dividerContainer}>
        <div style={styles.divider}></div>
      </div>

      <PlayerGames games={playerGames} />
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
    backgroundColor: '#FF5722',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
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