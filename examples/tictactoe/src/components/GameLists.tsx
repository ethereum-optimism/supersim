import React, { useState } from 'react'

import { createGameKey, Game, GameKey, PlayerTurn } from "../types/game"
import { usePlayerGames } from '../hooks/usePlayerGames'
import { useAcceptGame } from '../hooks/useAcceptGame'

import Board from './Board'

const truncateAddress = (address: string) => {
  if (!address) return 'Unavailable';
  return `${address.slice(0, 5)}...${address.slice(-3)}`;
};

interface GameProps {
  game: Game
}

const AvailableGame: React.FC<GameProps> = ({ game }) => {
  const { acceptGame, isPending, isConfirming } = useAcceptGame()
  const handleAcceptGame = async () => { await acceptGame(game.chainId, game.gameId, game.player) }
  return (
    <div style={styles.gameCard}>
      <div>
        <p style={styles.cardText}>Chain ID: {game.chainId}</p>
        <p style={styles.cardText}>Game ID: {game.gameId}</p>
        <p style={styles.cardText}>Opponent: {truncateAddress(game.player)}</p>
      </div>
      <button 
        onClick={handleAcceptGame}
        disabled={isPending || isConfirming}
        style={styles.acceptButton}
      >
        {isPending ? 'Accepting...' : isConfirming ? 'Confirming...' : 'Accept'}
      </button>
    </div>
  )
}

interface MyGameProps {
  game: Game,
  isSelected: boolean
  onSelect: () => void
}

const MyGame: React.FC<MyGameProps> = ({ game, isSelected, onSelect }) => {
  const isAccepted = game.opponent !== undefined
  const isYourTurn = game.turn === PlayerTurn.Player
  const status = !isAccepted ? "Unaccepted" : isYourTurn ? "Your Turn!" : "Opponent's Turn"
  return (
    <div
      onClick={isAccepted ? onSelect : undefined}
      style={{
        ...styles.gameCard,
        ...(isSelected ? styles.selectedCard : {}),
        ...(isAccepted ? {} : styles.unacceptedCard),
        cursor: isAccepted ? 'pointer' : 'default',
      }}
    >
      <div>
        <p style={styles.cardText}>Chain ID: {game.chainId}</p>
        <p style={styles.cardText}>Game ID: {game.gameId}</p>
        <p style={styles.cardText}>Opp: {truncateAddress(game.opponent)}</p>
        <p style={{
          ...styles.status,
          color: !isAccepted ? '#999999' : isYourTurn ? styles.yourTurnColor : styles.opponentTurnColor,
        }}>{status}</p>
      </div>
    </div>
  )
}

const GameLists: React.FC = () => {
  const { games, playerGames, availableGames } = usePlayerGames()
  const [selectedGameKey, setSelectedGameKey] = useState<GameKey | null>(null)

  const selectedGame = selectedGameKey ? games[selectedGameKey] : null
  const opponentSelectedGame = selectedGameKey ? games[createGameKey(selectedGame.chainId, selectedGame.gameId, selectedGame.opponent)] : null

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <h2 style={styles.sectionTitle}>Available Games</h2>
        <div style={styles.gameGrid}>
          {availableGames.map((game: Game) => (
            <AvailableGame key={`${game.chainId}-${game.gameId}`} game={game} />
          ))}
        </div>

        <h2 style={styles.sectionTitle}>My Games</h2>
        <div style={styles.gameGrid}>
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
        </div>
      </div>

      <div style={styles.rightPanel}>
        {selectedGameKey ? (
          <div style={styles.boardContainer}>
            <Board game={selectedGame} opponentGame={opponentSelectedGame} />
          </div>
        ) : (
          <div style={styles.selectPrompt}>Select a game to play</div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    padding: '20px',
    boxSizing: 'border-box' as const,
    gap: '20px',
  },
  leftPanel: {
    width: '350px',
    overflowY: 'auto' as const,
    paddingRight: '20px',
    height: 'calc(100vh - 40px)', // Subtract container padding
  },
  rightPanel: {
    flex: '1',
    borderRadius: '12px',
    padding: '20px',
    overflowY: 'auto' as const,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 40px)', // Subtract container padding
  },
  boardContainer: {
    width: '100%',
    maxWidth: '500px', // Adjust this value based on your Board component's ideal size
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#000000',
    marginBottom: '15px',
    fontSize: '1.4em',
    fontWeight: 'bold',
    textAlign: 'left' as const,
  },
  gameGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', // Adjusted for smaller left panel
    gap: '10px',
    marginBottom: '20px',
  },
  gameCard: {
    backgroundColor: '#2c3e50',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    color: '#ffffff',
    transition: 'all 0.3s ease',
  },
  unacceptedCard: {
    opacity: 0.5,
    filter: 'grayscale(50%)',
  },
  selectedCard: {
    backgroundColor: '#34495e',
    boxShadow: '0 0 0 2px #3498db',
  },
  cardText: {
    margin: '5px 0',
    fontSize: '0.9em',
  },
  status: {
    fontWeight: 'bold',
    marginTop: '5px',
    fontSize: '1em',
  },
  yourTurnColor: '#4CAF50', // Green color for "Your Turn"
  opponentTurnColor: '#FF9800', // Orange color for "Opponent's Turn"
  selectPrompt: {
    textAlign: 'center' as const,
    fontSize: '1.4em',
    color: '#000000',
    padding: '20px',
    borderRadius: '8px',
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    fontSize: '1em',
  },
} as const;

export default GameLists