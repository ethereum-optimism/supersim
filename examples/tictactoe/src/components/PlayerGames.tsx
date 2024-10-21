import React from 'react';

import { Game, GameKey, createGameKey } from '../types/game';
import GameCard from './GameCard';

interface PlayerGamesProps {
    games: Game[]
    selectedGameKey?: GameKey
    setSelectedGameKey: (gameKey: GameKey) => void
}

const PlayerGames: React.FC<PlayerGamesProps> = ({ games, selectedGameKey, setSelectedGameKey }) => {
  // move unaccepted games to the end of the list
  const acceptedGames = games.filter(game => game.opponent)
  const unacceptedGames = games.filter(game => !game.opponent)
  games = [...acceptedGames, ...unacceptedGames]

  return (
    <div>
      <div style={styles.header}>
        <h3 style={styles.title}>My Games</h3>
      </div>
      <div style={styles.gamesContainer}>
        {games.map((game, index) => {
          const gameKey = createGameKey(game.chainId, game.gameId, game.player)
          const isSelected = selectedGameKey === gameKey
          return (
            <GameCard
              key={index}
              game={game}
              isSelected={isSelected}
              onSelect={() => setSelectedGameKey(gameKey)} />
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  header: {
    display: 'flex',
    marginBottom: '10px',
  },
  title: {
    fontSize: '14px',
    marginBottom: '0px',
    display: 'flex',
    alignItems: 'center',
  },
  gamesContainer: {
    overflowY: 'auto' as const,
  },
  dividerContainer: {
    margin: '5px -25px', // Negative margin to extend beyond padding
  },
  divider: {
    height: '1px',
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
}

export default PlayerGames
