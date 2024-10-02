import { WagmiProvider, http, createConfig, useAccount } from 'wagmi';
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Game from './components/Game';
import NewGame from './components/NewGame';
import GameLists from './components/GameLists';
import ConnectWallet from './components/ConnectWallet';
import { supersimChainA, supersimChainB } from './constants/chains'
import { useGames } from './hooks/useGames';

import './App.css'
import React from 'react';

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [supersimChainA, supersimChainB],
  connectors: [injected()],
  transports: {
    [supersimChainA.id]: http(),
    [supersimChainB.id]: http(),
  },
})

const App: React.FC = () => {
  const { isConnected, chainId } = useAccount()
  const { syncing } =  useGames();
  const isSuperchain = chainId === supersimChainA.id || chainId === supersimChainB.id
  return (
    <div className="app">
      <header className="app-header">
        <h1>TicTacToe</h1>
        <ConnectWallet />
      </header>
      {isConnected && isSuperchain ? (
        syncing ? 
        <p>Syncing Game state...</p> :
        <>
          <NewGame />
          <GameLists />
          <Game />
        </>
      ) : isConnected && !isSuperchain ? (
          <p>Switch to any network in the superchain to play!</p>
        ) : (
          <p>Connect your wallet to play</p>
        )
      }
    </div>
  )
}

const Root: React.FC = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider  client={queryClient} >
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Root
