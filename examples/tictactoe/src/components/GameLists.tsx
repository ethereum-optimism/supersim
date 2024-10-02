import React from 'react'

import { Game } from "../types/Game"
import { usePlayerGames } from '../hooks/usePlayerGames'

const GameLists: React.FC = () => {
  const { playerGames, availableGames } = usePlayerGames()
  return (
    <div>
      <h2>Your Games</h2>
      <ul>
        {playerGames.map((game: Game) => (
          <li key={`${game.chainId}-${game.gameId}`}>
            Chain ID: {game.chainId} |
            Game ID: {game.gameId} | 
            Opponent: {game.opponent || 'Waiting for opponent..'}
          </li>
        ))}
      </ul>

      <h2>Available Games</h2>
      <ul>
        {availableGames.map((game: Game) => (
          <li key={`${game.chainId}-${game.gameId}`}>
            Chain ID: {game.chainId} |
            Game ID: {game.gameId} | 
            Player: {game.player} | 
            <button onClick={() => {/* Function to join game */}}>Join Game</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GameLists