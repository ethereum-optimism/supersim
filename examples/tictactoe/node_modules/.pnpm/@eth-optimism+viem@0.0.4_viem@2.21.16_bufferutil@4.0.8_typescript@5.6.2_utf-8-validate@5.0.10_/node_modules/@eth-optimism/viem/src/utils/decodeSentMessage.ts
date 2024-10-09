import type { Address, Hex } from 'viem'
import { decodeFunctionData } from 'viem'

import { l2ToL2CrossDomainMessengerABI } from '@/abis.js'

/**
 * @category Types
 */
export type DecodeSentMessageParameters = {
  payload: Hex
}

/**
 * @category Types
 */
export type DecodeSentMessageReturnType = {
  origin: bigint
  destination: bigint
  messageNonce: bigint
  sender: Address
  target: Address
  message: Hex
}

/**
 * Utility for decoding SentMessage log events
 * @category Utils
 * @param params {@link DecodeSentMessageParameters}
 * @returns Decoded message arugments {@link DecodeSentMessageReturnType}
 */
export function decodeSentMessage(
  params: DecodeSentMessageParameters,
): DecodeSentMessageReturnType {
  const decodedPayload = decodeFunctionData({
    abi: l2ToL2CrossDomainMessengerABI,
    data: params.payload,
  })

  const [destination, origin, messageNonce, sender, target, message] =
    decodedPayload.args

  return {
    origin,
    destination,
    messageNonce,
    sender,
    target,
    message,
  } as DecodeSentMessageReturnType
}
