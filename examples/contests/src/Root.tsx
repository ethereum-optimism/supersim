import React from 'react';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { injected } from 'wagmi/connectors';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supersimL2A, supersimL2B, supersimL2C } from '@eth-optimism/viem/chains'

import App from './components/App';

const queryClient = new QueryClient()

const wagmiConfig = createConfig({
  chains: [supersimL2A, supersimL2B, supersimL2C],
  connectors: [injected()],
  transports: {
    [supersimL2A.id]: http(),
    [supersimL2B.id]: http(),
    [supersimL2C.id]: http(),
  },
})


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
