import React from 'react'
import { useNewGame } from '../hooks/useNewGame'

const NewGame: React.FC = () => {
  const { createNewGame, isPending, isConfirming, isSuccess, hash } = useNewGame()

  const handleClick = async () => {
    await createNewGame()
  }

  return (
    <div>
      <button 
        onClick={handleClick} 
        disabled={isPending || isConfirming}
        style={{ 
          opacity: isPending || isConfirming ? 0.5 : 1,
          cursor: isPending || isConfirming ? 'not-allowed' : 'pointer'
        }}
      >
        {isPending ? 'Creating Game...' : isConfirming? 'Confirming Tx...' : 'New Game'}
      </button>
        {isSuccess && <p>New Game was broadcasted! Tx Hash: {hash}</p>}
    </div>
  )
}

export default NewGame
