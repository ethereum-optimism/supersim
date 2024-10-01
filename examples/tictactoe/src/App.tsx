import React from 'react';
import { WagmiProvider, http, createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supersimL2A, supersimL2B } from '@eth-optimism/viem'

import TicTacToe from './components/TicTacToe';

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [supersimL2A, supersimL2B],
  connectors: [injected()],
  transports: {
    [supersimL2A.id]: http(),
    [supersimL2B.id]: http(),
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
