import type { Chain } from 'viem'
import { chainConfig } from 'viem/op-stack'

/**
 * OP Stack Predeploy Addresses
 * @category Predeploy Addresses
 */
export const contracts = {
  ...chainConfig.contracts,
  l1BlockInterop: {
    address: '0x4200000000000000000000000000000000000015',
  },
  crossL2Inbox: {
    address: '0x4200000000000000000000000000000000000022',
  },
  l2ToL2CrossDomainMessenger: {
    address: '0x4200000000000000000000000000000000000023',
  },
} as const satisfies Chain['contracts']
