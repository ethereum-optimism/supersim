import React from 'react';

import { injected } from 'wagmi/connectors';
import { createConfig, http, WagmiProvider } from 'wagmi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supersimL2A, supersimL2B } from '@eth-optimism/viem'
import PredictionMarket from './components/PredictionMarket';

const queryClient = new QueryClient()

export const wagmiConfig = createConfig({
  chains: [supersimL2A, supersimL2B],
  connectors: [injected()],
  transports: {
    [supersimL2A.id]: http(),
    [supersimL2B.id]: http(),
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
