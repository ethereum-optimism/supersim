import React, { useState } from 'react';

import { Game, GameKey, createGameKey } from '../types/game';
import GameCard from './GameCard';

interface PlayerGamesProps {
    games: Game[]
}

const PlayerGames: React.FC<PlayerGamesProps> = ({ games }) => {
  const [selectedGameKey, setSelectedGameKey] = useState<GameKey | null>(null)

  // TODO: By default have the first game selected

  return (
    <div>
      <div style={styles.header}>
        <h3 style={styles.title}>My Games</h3>
      </div>
      <div>
        {games.map((game, index) => {
          const gameKey = createGameKey(game.chainId, game.gameId, game.player)
          const isSelected = selectedGameKey === gameKey
          return (
            <>
              <GameCard 
                key={index}
                game={game}
                isSelected={isSelected}
                onSelect={() => isSelected ? setSelectedGameKey(null) : setSelectedGameKey(gameKey)} />
            </>
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
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '0px',
    display: 'flex',
    alignItems: 'center',
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
