import type { Account, Chain, Client, Transport } from 'viem'
import type { WalletActionsL2 as UpstreamWalletActionsL2 } from 'viem/op-stack'
import { walletActionsL2 as upstreamWalletActionsL2 } from 'viem/op-stack'

import type {
  ExecuteL2ToL2MessageParameters,
  ExecuteL2ToL2MessageReturnType,
} from '@/actions/executeL2ToL2Message.js'
import { executeL2ToL2Message } from '@/actions/executeL2ToL2Message.js'
import type {
  SendL2ToL2MessageParameters,
  SendL2ToL2MessageReturnType,
} from '@/actions/sendL2ToL2Message.js'
import { sendL2ToL2Message } from '@/actions/sendL2ToL2Message.js'

export type WalletActionsL2<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
> = UpstreamWalletActionsL2<chain, account> & {
  sendL2ToL2Message: <chainOverride extends Chain | undefined = undefined>(
    parameters: SendL2ToL2MessageParameters<chain, account, chainOverride>,
  ) => Promise<SendL2ToL2MessageReturnType>
  executeL2ToL2Message: <chainOverride extends Chain | undefined = undefined>(
    parameters: ExecuteL2ToL2MessageParameters<chain, account, chainOverride>,
  ) => Promise<ExecuteL2ToL2MessageReturnType>
}

export function walletActionsL2() {
  return <
    transport extends Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined,
  >(
    client: Client<transport, chain, account>,
  ): WalletActionsL2<chain, account> => {
    return {
      ...upstreamWalletActionsL2(),
      sendL2ToL2Message: (args) => sendL2ToL2Message(client, args),
      executeL2ToL2Message: (args) => executeL2ToL2Message(client, args),
    } as WalletActionsL2<chain, account>
  }
}
