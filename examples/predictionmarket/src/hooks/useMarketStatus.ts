import { useEffect, useState } from 'react';
import { Address, Hex, parseAbi, parseAbiItem } from 'viem';
import { useBlockNumber, usePublicClient, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { createInteropMessage, MessageIdentifier } from '@eth-optimism/viem';

import { useTicTacToeGames } from './useTicTacToeGames';
import { createGameKey } from '../types/tictactoe';
import { Market, MarketType } from '../types/market';
import { BLOCKHASH_EMITTER } from '../constants/address';

export type TicTacToeMarketStatus = { gameId: bigint, player: Address, opponent: Address }
export type BlockHashMarketStatus = { targetBlockNumber: bigint }

export type MarketStatus = {
    chainId: bigint

    data: TicTacToeMarketStatus | BlockHashMarketStatus

    isResolvable: boolean
    resolvingEvent: { id: MessageIdentifier, payload: Hex} | null
    resolveMarket: () => Promise<void>

    isPending: boolean
    isConfirming: boolean
}

export const useMarketStatus = (market: Market): MarketStatus => {
    if (market.type === MarketType.BLOCKHASH) {
        return useBlockHashMarketStatus(market)
    } else {
        return useTicTacToeMarketStatus(market)
    }
}

const useTicTacToeMarketStatus = (market: Market) => {
    const [resolvingEvent, setResolvingEvent] = useState<{ id: MessageIdentifier, payload: Hex} | null>(null)

    const { data: hash, writeContract, isPending } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    const { availableGames,resolvedGames } = useTicTacToeGames()
    const { data: game } = useReadContract({
        abi: parseAbi(['function game() view returns (uint256,uint256,address)']),
        address: market.resolver, functionName: 'game'
    })
    
    const [chainId, gameId, player] = game ?? [0n, 0n, '0x0'] as const
    useEffect(() => {
        if (resolvingEvent) return
        if (!game) return

        const gameKey = createGameKey(chainId, gameId)
        if (resolvedGames[gameKey]) setResolvingEvent(resolvedGames[gameKey])
    }, [game, resolvedGames])
    
    const resolveMarket = async () => {
        try {
            if (!resolvingEvent) return

            const { id, payload } = resolvingEvent
            const idArgs = [id.origin, id.blockNumber, id.logIndex, id.timestamp, id.chainId] as const
            await writeContract({
                abi: parseAbi(['function resolve((address,uint256,uint256,uint256,uint256),bytes) external']),
                address: market.resolver, functionName: 'resolve', args: [idArgs, payload],
            })
        } catch (error) {
            console.error('Error resolving tictactoe market: ', error)
        }
    }

    const isResolvable = market.outcome === 0 && resolvingEvent !== null
    const data: TicTacToeMarketStatus = { gameId, player, opponent: availableGames[createGameKey(chainId, gameId)]?.opponent ?? '0x0' }
    return { chainId, data, isResolvable, resolvingEvent, resolveMarket, isPending, isConfirming }
}

const useBlockHashMarketStatus = (market: Market) => {
    const [resolvingEvent, setResolvingEvent] = useState<{ id: MessageIdentifier, payload: Hex} | null>(null)

    const { data: hash, writeContract, isPending } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    const { data: chainId } = useReadContract({
        abi: parseAbi(['function chainId() external view returns (uint256)']), 
        address: market.resolver, functionName: 'chainId' 
    })
    const { data: targetBlockNumber } = useReadContract({
        abi: parseAbi(['function blockNumber() external view returns (uint256)']), 
        address: market.resolver, functionName: 'blockNumber'
    }) 

    const { data: currentBlockNumber } = useBlockNumber({ chainId: Number(chainId) })
    const client = usePublicClient({ chainId: Number(chainId) })

    useEffect(() => {
        const findBlockHashEvent = async () => {
            if (!client) return

            // Not yet reached the target block number
            if (!currentBlockNumber || !targetBlockNumber || currentBlockNumber < targetBlockNumber) return

            // Market is resolved or the relevant data to resolve is cached
            if (market.outcome !== 0) return
            if (resolvingEvent) return

            const logs = await client.getLogs({
                address: BLOCKHASH_EMITTER,
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
    }, [client, currentBlockNumber, targetBlockNumber])

    const resolveMarket = async () => {
        if (!resolvingEvent) return

        const { id, payload } = resolvingEvent
        const idArgs = [id.origin, id.blockNumber, id.logIndex, id.timestamp, id.chainId] as const
        try {
            await writeContract({
                abi: parseAbi(['function resolve((address,uint256,uint256,uint256,uint256),bytes) external']),
                address: market.resolver, functionName: 'resolve', args: [idArgs, payload] })
        } catch (error) {
            console.error('Error resolving block hash market: ', error)
        }
    }

    const isResolvable = market.outcome === 0 && resolvingEvent !== null
    const data: BlockHashMarketStatus = { targetBlockNumber: targetBlockNumber ?? 0n }
    return { chainId: chainId ?? 0n, data, isResolvable, resolvingEvent, resolveMarket, isPending, isConfirming }
}