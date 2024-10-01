import { createConfig, http } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { supersimChainA, supersimChainB } from './constants/chains'

// NOTE: Predefine L2 members in supersim. Although in practice
// we want to read from the superchain registry and by default
// include all chains in the registry.

export const wagmiConfig = createConfig({
  chains: [supersimChainA, supersimChainB],
  connectors: [injected()],
  transports: {
    [supersimChainA.id]: http(),
    [supersimChainB.id]: http(),
  },
})