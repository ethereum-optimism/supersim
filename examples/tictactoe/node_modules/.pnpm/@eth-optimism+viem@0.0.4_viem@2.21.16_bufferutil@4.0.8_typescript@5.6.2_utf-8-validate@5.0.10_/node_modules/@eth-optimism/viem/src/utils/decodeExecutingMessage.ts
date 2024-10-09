import type { Hash, Log } from 'viem'
import { parseEventLogs } from 'viem'

import { crossL2InboxABI } from '@/abis.js'
import type { MessageIdentifier } from '@/types/interop.js'

/**
 * @category Types
 */
export type DecodeExecutingMessageParameters = {
  logs: Log[]
}

/**
 * @category Types
 */
export type DecodeExecutingMessageReturnType = {
  msgHash: Hash
  id: MessageIdentifier
}

/**
 * Utility for decoding ExecutingMessage log events
 * @category Utils
 * @param params {@link DecodeExecutingMessageParameters}
 * @returns Decoded message arugments {@link DecodeExecutingMessageReturnType}
 */
export function decodeExecutingMessage(
  params: DecodeExecutingMessageParameters,
) {
  const parsedLogs = parseEventLogs({
    abi: crossL2InboxABI,
    logs: params.logs,
    eventName: 'ExecutingMessage',
  })

  const { msgHash, id } = parsedLogs[0].args

  return {
    id,
    msgHash,
  } as DecodeExecutingMessageReturnType
}
