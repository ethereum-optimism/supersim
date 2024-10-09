import type {
  Account,
  Address,
  Chain,
  Client,
  ContractFunctionReturnType,
  DeriveChain,
  EstimateContractGasErrorType,
  EstimateContractGasParameters,
  Hash,
  Hex,
  SimulateContractParameters,
  Transport,
  WriteContractErrorType,
} from 'viem'
import { estimateContractGas, simulateContract } from 'viem/actions'

import { crossL2InboxABI } from '@/abis.js'
import { contracts } from '@/contracts.js'
import {
  baseWriteAction,
  type BaseWriteContractActionParameters,
} from '@/core/baseWriteAction.js'
import type { MessageIdentifier } from '@/types/interop.js'
import type { ErrorType } from '@/types/utils.js'

/**
 * @category Types
 */
export type ExecuteL2ToL2MessageParameters<
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TDerivedChain extends Chain | undefined = DeriveChain<TChain, TChainOverride>,
> = BaseWriteContractActionParameters<
  TChain,
  TAccount,
  TChainOverride,
  TDerivedChain
> & {
  /** Identifier pointing to the initiating message. */
  id: MessageIdentifier
  /** Target contract or wallet address. */
  target: Address
  /** Message payload to call target with. */
  message: Hex
}

/**
 * @category Types
 */
export type ExecuteL2ToL2MessageReturnType = Hash

/**
 * @category Types
 */
export type ExecuteL2ToL2MessageContractReturnType = ContractFunctionReturnType<
  typeof crossL2InboxABI,
  'payable',
  'executeMessage'
>

/**
 * @category Types
 */
export type ExecuteL2ToL2MessageErrorType =
  | EstimateContractGasErrorType
  | WriteContractErrorType
  | ErrorType

/**
 * Executes the L2 to L2 message. Used in the interop flow.
 * @category L2 Wallet Actions
 * @param client - Client to use
 * @param parameters - {@link ExecuteL2ToL2MessageParameters}
 * @returns The executeL2ToL2Message transaction hash. {@link ExecuteL2ToL2MessageReturnType}
 */
export async function executeL2ToL2Message<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  parameters: ExecuteL2ToL2MessageParameters<TChain, TAccount, TChainOverride>,
): Promise<ExecuteL2ToL2MessageReturnType> {
  const { id, target, message, ...txParameters } = parameters

  return baseWriteAction(
    client,
    {
      abi: crossL2InboxABI,
      contractAddress: contracts.crossL2Inbox.address,
      contractFunctionName: 'executeMessage',
      contractArgs: [id, target, message],
    },
    txParameters as BaseWriteContractActionParameters,
  )
}

/**
 * Estimates gas for {@link executeL2ToL2Message}
 * @category L2 Wallet Actions
 * @param client - Client to use
 * @param parameters - {@link ExecuteL2ToL2MessageParameters}
 * @returns The estimated gas value.
 */
export async function estimateExecuteL2ToL2MessageGas<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  parameters: ExecuteL2ToL2MessageParameters<TChain, TAccount, TChainOverride>,
): Promise<bigint> {
  const { id, target, message, ...txParameters } = parameters

  return estimateContractGas(client, {
    abi: crossL2InboxABI,
    address: contracts.crossL2Inbox.address,
    functionName: 'executeMessage',
    args: [id, target, message],
    ...txParameters,
  } as EstimateContractGasParameters)
}

/**
 * Simulate contract call for {@link executeL2ToL2Message}
 * @category L2 Public Actions
 * @param client - L2 Public Client
 * @param parameters - {@link ExecuteL2ToL2MessageParameters}
 * @returns The contract functions return value. {@link ExecuteL2ToL2MessageContractReturnType}
 */
export async function simulateExecuteL2ToL2Message<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  parameters: ExecuteL2ToL2MessageParameters<TChain, TAccount, TChainOverride>,
): Promise<ExecuteL2ToL2MessageContractReturnType> {
  const { account, id, target, message } = parameters

  const res = await simulateContract(client, {
    account,
    abi: crossL2InboxABI,
    address: contracts.crossL2Inbox.address,
    chain: client.chain,
    functionName: 'executeMessage',
    args: [id, target, message],
  } as SimulateContractParameters)

  return res.result as ExecuteL2ToL2MessageContractReturnType
}
