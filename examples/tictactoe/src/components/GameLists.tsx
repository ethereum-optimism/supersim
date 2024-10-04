import React, { useState } from 'react'

import { createGameKey, Game, GameKey, PlayerTurn } from "../types/game"
import { usePlayerGames } from '../hooks/usePlayerGames'
import { useAcceptGame } from '../hooks/useAcceptGame'

import Board from './Board'

interface GameProps {
  game: Game
}

const AvailableGame: React.FC<GameProps> = ({ game }) => {
  const { acceptGame, isPending, isConfirming, isSuccess, hash } = useAcceptGame()
  const handleAcceptGame = async () => { await acceptGame(game.chainId, game.gameId, game.player) }
  return (
    <li>
      Chain ID: {game.chainId} |
      Game ID: {game.gameId} | 
      Opponent: {game.player} | 
      <button 
        onClick={handleAcceptGame}
        disabled={isPending || isConfirming}
        style={{ opacity: isPending || isConfirming ? 0.5 : 1, cursor: isPending || isConfirming ? 'not-allowed' : 'pointer' }}
      >
        {isPending || isConfirming ? 'Confirming...' : 'Accept Game'}
      </button>
    </li>
  )
}

interface MyGameProps {
  game: Game,
  isSelected: boolean
  onSelect: () => void
}

const MyGame: React.FC<MyGameProps> = ({ game, isSelected, onSelect }) => {
  const isAccepted = game.opponent !== undefined
  const status = !isAccepted ? "Unaccepted" : game.turn === PlayerTurn.Player ? "Your Turn!" : "Waiting for Opponent..."
  return (
    <li
      onClick={isAccepted ? onSelect : undefined}
      style={{ 
        cursor: 'pointer', 
        backgroundColor: isSelected ? '#e0e0e0' : 'transparent',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '5px'
      }}
    >
      Chain ID: {game.chainId} |
      Game ID: {game.gameId} | 
      Opponent: {game.opponent || 'Unavailable'} |
      Status: {status}
    </li>
  )
}

const GameLists: React.FC = () => {
  const { games, playerGames, availableGames } = usePlayerGames()
  const [selectedGameKey, setSelectedGameKey] = useState<GameKey | null>(null)

  const selectedGame = selectedGameKey ? games[selectedGameKey] : null
  const opponentSelectedGame = selectedGameKey ? games[createGameKey(selectedGame.chainId, selectedGame.gameId, selectedGame.opponent)] : null

  return (
    <div>
      <h2>Available Games</h2>
      <ul>
        {availableGames.map((game: Game) => ( <AvailableGame key={`${game.chainId}-${game.gameId}`} game={game} />))}
      </ul>

      <h2>My Games</h2>
      <ul>
        {playerGames.map((game: Game) => {
          const gameKey = createGameKey(game.chainId, game.gameId, game.player)
          const isSelected = selectedGameKey === gameKey
          return (
            <MyGame
              key={`${game.chainId}-${game.gameId}`}
              game={game}
              isSelected={isSelected}
              onSelect={() => isSelected ? setSelectedGameKey(null) : setSelectedGameKey(gameKey)}
            />
          )
        })}
      </ul>

      {selectedGameKey ? (
        <div>
          <Board game={selectedGame} opponentGame={opponentSelectedGame} />
        </div>
      ) : (
        <p>Select Game to Play</p>
      )}
    </div>
  )
}

export default GameLists