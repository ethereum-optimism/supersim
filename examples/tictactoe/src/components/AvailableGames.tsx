import React, { useState } from 'react';

import { Game } from '../types/game';
import GameCard from './GameCard';

interface AvailableGamesProps {
    games: Game[]
}

const AvailableGames: React.FC<AvailableGamesProps> = ({ games  }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const count = games.length
  return (
    <div>
      <div
        style={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}>
        <h3 style={styles.title}>Available Games <span style={styles.gamesCount}>{count}</span></h3>
        <span style={styles.dropdownIcon}>{isExpanded ? '▼' : '▶'}</span>
      </div>
      {isExpanded && (
        <div style={styles.items}>
          {games.map((game, index) => ( <GameCard key={index} game={game} />))}
        </div>
      )}
    </div>
  )
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '-5px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  dropdownIcon: {
    fontSize: '14px',
    marginLeft: '10px',
  },
  gamesCount: {
    backgroundColor: '#E2E8F0',
    color: '#333',
    borderRadius: '5px',
    padding: '2px 8px',
    fontSize: '12px',
    marginLeft: '10px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
  },
  items: {
  },
}

export default AvailableGames