import React from 'react';
import { WagmiProvider, http, createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TicTacToe from './components/TicTacToe';

import { supersimChainA, supersimChainB } from './constants/chains'

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
  return (
    <div className="app" >
      <TicTacToe />
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
