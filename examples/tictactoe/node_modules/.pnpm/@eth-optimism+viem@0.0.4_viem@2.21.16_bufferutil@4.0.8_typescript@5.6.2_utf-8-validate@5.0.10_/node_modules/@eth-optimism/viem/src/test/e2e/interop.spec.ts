import {
  createPublicClient,
  createWalletClient,
  encodeFunctionData,
  http,
  keccak256,
} from 'viem'
import { describe, expect, it } from 'vitest'

import { supersimL2A, supersimL2B } from '@/chains/supersim.js'
import { publicActionsL2 } from '@/decorators/publicL2.js'
import { walletActionsL2 } from '@/decorators/walletL2.js'
import { testAccount } from '@/test/clients.js'
import { ticTacToeABI, ticTacToeAddress } from '@/test/setupTicTacToe.js'
import { decodeExecutingMessage } from '@/utils/decodeExecutingMessage.js'
import { extractMessageIdentifierFromLogs } from '@/utils/extractMessageIdentifierFromLogs.js'

const RPC_URL_A = supersimL2A.rpcUrls.default.http[0]
const RPC_URL_B = supersimL2B.rpcUrls.default.http[0]

const publicClientA = createPublicClient({
  chain: supersimL2A,
  transport: http(RPC_URL_A),
}).extend(publicActionsL2())

const publicClientB = createPublicClient({
  chain: supersimL2B,
  transport: http(RPC_URL_B),
}).extend(publicActionsL2())

export const walletClientA = createWalletClient({
  account: testAccount,
  chain: supersimL2A,
  transport: http(RPC_URL_A),
}).extend(walletActionsL2())

export const walletClientB = createWalletClient({
  account: testAccount,
  chain: supersimL2B,
  transport: http(RPC_URL_B),
}).extend(walletActionsL2())

describe('Generic Interop Flow', () => {
  it('should send and execute cross chain message', async () => {
    const encodedMessage = encodeFunctionData({
      abi: ticTacToeABI,
      functionName: 'createGame',
      args: [testAccount.address],
    })

    const sendMessageHash = await walletClientA.sendL2ToL2Message({
      account: testAccount.address,
      destinationChainId: supersimL2B.id,
      target: ticTacToeAddress,
      message: encodedMessage,
    })

    const sendMessageReceipt = await publicClientA.waitForTransactionReceipt({
      hash: sendMessageHash,
    })

    const { id } = await extractMessageIdentifierFromLogs(publicClientA, {
      receipt: sendMessageReceipt,
    })

    const executeMessageHash = await walletClientB.executeL2ToL2Message({
      id,
      account: testAccount.address,
      target: ticTacToeAddress,
      message: encodedMessage,
    })

    const executeMessageReceipt = await publicClientB.waitForTransactionReceipt(
      {
        hash: executeMessageHash,
      },
    )

    const { msgHash } = decodeExecutingMessage({
      logs: executeMessageReceipt.logs,
    })
    expect(msgHash).toEqual(keccak256(encodedMessage))
  })
})
