import { encodeFunctionData } from 'viem'
import { describe, expect, it } from 'vitest'

import { supersimL2A, supersimL2B } from '@/chains/supersim.js'
import { contracts } from '@/contracts.js'
import { publicClient, testAccount, walletClient } from '@/test/clients.js'
import { ticTacToeABI, ticTacToeAddress } from '@/test/setupTicTacToe.js'
import { decodeSentMessage } from '@/utils/decodeSentMessage.js'
import { extractMessageIdentifierFromLogs } from '@/utils/extractMessageIdentifierFromLogs.js'

describe('sendL2ToL2Message', () => {
  const encodedMessage = encodeFunctionData({
    abi: ticTacToeABI,
    functionName: 'createGame',
    args: [testAccount.address],
  })

  describe('write contract', () => {
    it('should return expected request', async () => {
      const hash = await walletClient.sendL2ToL2Message({
        account: testAccount.address,
        destinationChainId: supersimL2B.id,
        target: ticTacToeAddress,
        message: encodedMessage,
      })
      expect(hash).toBeDefined()

      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      const { id, payload } = await extractMessageIdentifierFromLogs(
        publicClient,
        { receipt },
      )

      // verifiy message id
      expect(id).toBeDefined()
      expect(id.chainId).toEqual(BigInt(supersimL2A.id))
      expect(id.origin.toLowerCase()).toEqual(
        contracts.l2ToL2CrossDomainMessenger.address.toLowerCase(),
      )
      expect(id.blockNumber).toEqual(receipt.blockNumber)
      expect(id.logIndex).toEqual(BigInt(receipt.logs[0].logIndex))

      const decodedPayload = decodeSentMessage({ payload })
      expect(decodedPayload.origin).toEqual(BigInt(supersimL2A.id))
      expect(decodedPayload.destination).toEqual(BigInt(supersimL2B.id))
      expect(decodedPayload.sender).toEqual(testAccount.address)
      expect(decodedPayload.target).toEqual(ticTacToeAddress)
      expect(decodedPayload.message).toEqual(encodedMessage)
    })
  })

  describe('estimate gas', () => {
    it('should estimate gas', async () => {
      const gas = await publicClient.estimateSendL2ToL2MessageGas({
        account: testAccount.address,
        target: ticTacToeAddress,
        destinationChainId: supersimL2B.id,
        message: encodedMessage,
      })

      expect(gas).toBeDefined()
    })
  })

  describe('simulate', () => {
    it('should simulate', async () => {
      expect(() =>
        publicClient.simulateSendL2ToL2Message({
          account: testAccount.address,
          destinationChainId: supersimL2B.id,
          target: ticTacToeAddress,
          message: encodedMessage,
        }),
      ).not.throw()
    })
  })
})
