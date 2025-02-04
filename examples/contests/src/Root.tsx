import React from 'react';
import { defineChain } from 'viem';
import { optimism } from 'viem/chains';
import { injected } from 'wagmi/connectors';
import { createConfig, http, WagmiProvider } from 'wagmi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supersimL2A, supersimL2B } from '@eth-optimism/viem'

import App from './components/App';

const queryClient = new QueryClient()
const supersimL2C = defineChain({
  ...optimism,
  id: 903,
  name: 'Supersim L2 C',
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:9547'],
    },
  },
  testnet: true,
  sourceId: 900,
})

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
