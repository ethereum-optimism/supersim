import { useEffect, useState } from 'react';
import { Address, Hex, parseAbi, parseAbiItem } from 'viem';
import { useBlockNumber, useChainId, useSwitchChain, usePublicClient, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { createInteropMessage, MessageIdentifier } from '@eth-optimism/viem';

import { createGameKey } from '../types/tictactoe';
import { Contest, ContestType } from '../types/contest';
import { useTicTacToeGames } from './useTicTacToeGames';
import { useDeployment } from './useDeployment';

import { CONTESTS_CHAIN_ID } from '../constants/app';

export type TicTacToeContestStatus = { gameId: bigint, player: Address, opponent: Address }
export type BlockHashContestStatus = { targetBlockNumber: bigint }

export type ContestStatus = {
    chainId: bigint

    data: TicTacToeContestStatus | BlockHashContestStatus

    isResolvable: boolean
    resolvingEvent: { id: MessageIdentifier, payload: Hex} | null
    resolveContest: () => Promise<void>

    isPending: boolean
    isConfirming: boolean
}

export const useContestStatus = (contest: Contest): ContestStatus => {
    if (contest.type === ContestType.BLOCKHASH) {
        return useBlockHashContestStatus(contest)
    } else {
        return useTicTacToeContestStatus(contest)
    }
}

const useTicTacToeContestStatus = (contest: Contest) => {
    const [resolvingEvent, setResolvingEvent] = useState<{ id: MessageIdentifier, payload: Hex} | null>(null)

    const { data: hash, writeContract, isPending } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    const connectedChainId = useChainId();
    const { switchChainAsync } = useSwitchChain();

    const { availableGames,resolvedGames } = useTicTacToeGames()
    const { data: game } = useReadContract({
        abi: parseAbi(['function game() view returns (uint256,uint256,address)']),
        address: contest.resolver, functionName: 'game'
    })
    
    const [chainId, gameId, player] = game ?? [0n, 0n, '0x0'] as const
    useEffect(() => {
        if (resolvingEvent) return
        if (!game) return

        const gameKey = createGameKey(chainId, gameId)
        if (resolvedGames[gameKey]) setResolvingEvent(resolvedGames[gameKey])
    }, [game, resolvedGames, chainId, gameId, resolvingEvent])
    
    const resolveContest = async () => {
        try {
            if (!resolvingEvent) return

            if (connectedChainId !== CONTESTS_CHAIN_ID) {
                await switchChainAsync({chainId: CONTESTS_CHAIN_ID});
            }

            const { id, payload } = resolvingEvent
            const idArgs = [id.origin, id.blockNumber, id.logIndex, id.timestamp, id.chainId] as const
            await writeContract({
                abi: parseAbi(['function resolve((address,uint256,uint256,uint256,uint256),bytes) external']),
                address: contest.resolver, functionName: 'resolve', args: [idArgs, payload],
            })
        } catch (error) {
            console.error('Error resolving tictactoe contest: ', error)
        }
    }

    const isResolvable = contest.outcome === 0 && resolvingEvent !== null
    const data: TicTacToeContestStatus = { gameId, player, opponent: availableGames[createGameKey(chainId, gameId)]?.opponent ?? '0x0' }
    return { chainId, data, isResolvable, resolvingEvent, resolveContest, isPending, isConfirming }
}

const useBlockHashContestStatus = (contest: Contest) => {
    const [resolvingEvent, setResolvingEvent] = useState<{ id: MessageIdentifier, payload: Hex} | null>(null)

    const { data: hash, writeContract, isPending } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    const connectedChainId = useChainId();
    const { switchChainAsync } = useSwitchChain();

    const { deployment } = useDeployment()

    const { data: chainId } = useReadContract({
        abi: parseAbi(['function chainId() external view returns (uint256)']), 
        address: contest.resolver, functionName: 'chainId' 
    })
    const { data: targetBlockNumber } = useReadContract({
        abi: parseAbi(['function blockNumber() external view returns (uint256)']), 
        address: contest.resolver, functionName: 'blockNumber'
    }) 

    const { data: currentBlockNumber } = useBlockNumber({ chainId: Number(chainId) })
    const client = usePublicClient({ chainId: Number(chainId) })

    useEffect(() => {
        const findBlockHashEvent = async () => {
            if (!client) return

            // Not yet reached the target block number
            if (!currentBlockNumber || !targetBlockNumber || currentBlockNumber < targetBlockNumber) return

            // Contest is resolved or the relevant data to resolve is cached
            if (contest.outcome !== 0) return
            if (resolvingEvent) return

            const logs = await client.getLogs({
                address: deployment!.BlockHashEmitter,
                event: parseAbiItem("event BlockHash(uint256 indexed blockNumber, bytes32 blockHash)"),
                args: { blockNumber: targetBlockNumber },
                fromBlock: 'earliest', toBlock: 'latest', strict: true,
            })

            if (logs && logs.length > 0) {
                const { id, payload } = await createInteropMessage(client, { log: logs[0] })
                setResolvingEvent({ id, payload })
            }
        }

        findBlockHashEvent()
    }, [client, contest.outcome, currentBlockNumber, deployment, resolvingEvent, targetBlockNumber])

    const resolveContest = async () => {
        if (!resolvingEvent) return

        const { id, payload } = resolvingEvent
        const idArgs = [id.origin, id.blockNumber, id.logIndex, id.timestamp, id.chainId] as const
        try {
            if (connectedChainId !== CONTESTS_CHAIN_ID) {
                await switchChainAsync({chainId: CONTESTS_CHAIN_ID});
            }

            await writeContract({
                abi: parseAbi(['function resolve((address,uint256,uint256,uint256,uint256),bytes) external']),
                address: contest.resolver, functionName: 'resolve', args: [idArgs, payload]
             })
        } catch (error) {
            console.error('Error resolving block hash contest: ', error)
        }
    }

    const isResolvable = contest.outcome === 0 && resolvingEvent !== null
    const data: BlockHashContestStatus = { targetBlockNumber: targetBlockNumber ?? 0n }
    return { chainId: chainId ?? 0n, data, isResolvable, resolvingEvent, resolveContest, isPending, isConfirming }
}