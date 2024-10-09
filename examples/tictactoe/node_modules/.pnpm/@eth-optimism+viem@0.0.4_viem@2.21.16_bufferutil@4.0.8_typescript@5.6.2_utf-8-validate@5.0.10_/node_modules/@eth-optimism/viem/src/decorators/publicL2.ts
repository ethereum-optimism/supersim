import type { Account, Chain, Client, Transport } from 'viem'
import type { PublicActionsL2 as UpstreamPublicActionsL2 } from 'viem/op-stack'
import { publicActionsL2 as upstreamPublicActionsL2 } from 'viem/op-stack'

import type {
  ExecuteL2ToL2MessageContractReturnType,
  ExecuteL2ToL2MessageParameters,
} from '@/actions/executeL2ToL2Message.js'
import {
  estimateExecuteL2ToL2MessageGas,
  simulateExecuteL2ToL2Message,
} from '@/actions/executeL2ToL2Message.js'
import type {
  SendL2ToL2MessageContractReturnType,
  SendL2ToL2MessageParameters,
} from '@/actions/sendL2ToL2Message.js'
import {
  estimateSendL2ToL2MessageGas,
  simulateSendL2ToL2Message,
} from '@/actions/sendL2ToL2Message.js'

export type PublicActionsL2<
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
> = UpstreamPublicActionsL2 & {
  estimateSendL2ToL2MessageGas: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: SendL2ToL2MessageParameters<TChain, TAccount, TChainOverride>,
  ) => Promise<bigint>

  estimateExecuteL2ToL2MessageGas: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: ExecuteL2ToL2MessageParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<bigint>

  simulateSendL2ToL2Message: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: SendL2ToL2MessageParameters<TChain, TAccount, TChainOverride>,
  ) => Promise<SendL2ToL2MessageContractReturnType>

  simulateExecuteL2ToL2Message: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    parameters: ExecuteL2ToL2MessageParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<ExecuteL2ToL2MessageContractReturnType>
}

export function publicActionsL2() {
  return <
    TTransport extends Transport,
    TChain extends Chain | undefined = Chain | undefined,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<TTransport, TChain, TAccount>,
  ) => {
    return {
      ...upstreamPublicActionsL2(),
      estimateSendL2ToL2MessageGas: (args) =>
        estimateSendL2ToL2MessageGas(client, args),
      estimateExecuteL2ToL2MessageGas: (args) =>
        estimateExecuteL2ToL2MessageGas(client, args),
      simulateSendL2ToL2Message: (args) =>
        simulateSendL2ToL2Message(client, args),
      simulateExecuteL2ToL2Message: (args) =>
        simulateExecuteL2ToL2Message(client, args),
    } as PublicActionsL2<TChain, TAccount>
  }
}
