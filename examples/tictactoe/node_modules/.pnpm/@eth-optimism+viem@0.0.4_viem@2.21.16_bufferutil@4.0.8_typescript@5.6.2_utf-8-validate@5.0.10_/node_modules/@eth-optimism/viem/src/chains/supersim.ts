import { defineChain } from 'viem'
import { mainnet, optimism } from 'viem/chains'

/**
 * L1 chain definition for supersim in non-forked mode
 * @category Supersim
 */
export const supersimL1 = defineChain({
  ...mainnet,
  id: 900,
  name: 'Supersim L1',
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
  },
  testnet: true,
})

/**
 * L2 chain A definition for supersim in non-forked mode. Interop Enabled
 * @category Supersim
 */
export const supersimL2A = defineChain({
  ...optimism,
  id: 901,
  name: 'Supersim L2 A',
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:9545'],
    },
  },
  testnet: true,
  sourceId: 900,
})

/**
 * L2 chain B definition for supersim in non-forked mode. Interop Enabled
 * @category Supersim
 */
export const supersimL2B = defineChain({
  ...optimism,
  id: 902,
  name: 'Supersim L2 B',
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:9546'],
    },
  },
  testnet: true,
  sourceId: 900,
})
