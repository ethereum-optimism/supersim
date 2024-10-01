import React, { useState } from 'react';
import { WagmiProvider, useAccount } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Board from './components/Board';
import ConnectWallet from './components/ConnectWallet';
import { wagmiConfig } from './wagmi';

import './App.css'

const Game: React.FC = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill("X"));
  const handleClick = async (i: number) => {
    const val = board[i]
    const newVal = val == "X" ? "O" : "X"
    setBoard(board.map((val, index) => index == i ? newVal : val))
  }

  const { isConnected } = useAccount()
  if (!isConnected) {
    return <div>Connect your wallet to play</div>
  }

  return(
    <div className="game">
      <Board squares={board} onClick={handleClick}/>
    </div>
  )
}

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider  client={queryClient} >
        <div className="app">
          <header className="app-header">
            <h1>TicTacToe</h1>
            <ConnectWallet />
          </header>
          <Game />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App
