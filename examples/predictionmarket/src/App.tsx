import React from 'react';

import { injected } from 'wagmi/connectors';
import { createConfig, http, WagmiProvider } from 'wagmi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supersimL2A, supersimL2B } from '@eth-optimism/viem'
import PredictionMarket from './components/PredictionMarket';

import { defineChain } from 'viem';
import { optimism } from 'viem/chains';

const queryClient = new QueryClient()
export const supersimL2C = defineChain({
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

export const wagmiConfig = createConfig({
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
        <PredictionMarket />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Root
