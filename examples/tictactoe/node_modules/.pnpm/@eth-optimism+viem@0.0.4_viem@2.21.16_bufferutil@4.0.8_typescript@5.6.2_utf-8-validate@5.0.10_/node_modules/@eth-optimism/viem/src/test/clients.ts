import {
  createPublicClient,
  createTestClient,
  createWalletClient,
  http,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { supersimL2A } from '@/chains/supersim.js'
import { publicActionsL2 } from '@/decorators/publicL2.js'
import { walletActionsL2 } from '@/decorators/walletL2.js'

const RPC_URL = supersimL2A.rpcUrls.default.http[0]

// anvil account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
export const testAccount = privateKeyToAccount(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
)

export const publicClient = createPublicClient({
  chain: supersimL2A,
  transport: http(RPC_URL),
}).extend(publicActionsL2())

export const walletClient = createWalletClient({
  account: testAccount,
  chain: supersimL2A,
  transport: http(RPC_URL),
}).extend(walletActionsL2())

export const testClient = createTestClient({
  chain: supersimL2A,
  mode: 'anvil',
  transport: http(RPC_URL),
})
