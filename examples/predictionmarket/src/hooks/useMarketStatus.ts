import { useEffect, useState } from 'react';
import { parseAbi, parseAbiItem, Hex } from 'viem';
import { useBlockNumber, usePublicClient, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { createInteropMessage, MessageIdentifier } from '@eth-optimism/viem';

import { PREDICTION_MARKET_ABI } from '../constants/abi';
import { BLOCKHASH_EMITTER, PREDICTION_MARKET_ADDRESS } from '../constants/address';

import { Market } from '../types/market';

export const useTicTacToeMarketStatus = (market: Market) => {
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    if (isError) {
        console.error('Error resolving block hash resolver: ', error)
    }

    const { data: game } = useReadContract({
        abi: parseAbi(['function game() view returns (uint256,uint256,address)']),
        address: market.resolver, functionName: 'game'
    })
    
    const chainId = Number(game?.[0])
    const gameId = Number(game?.[1])
    const player = game?.[2]

    const resolveMarket = async (id: MessageIdentifier, payload: Hex) => {
        try {
            const idArgs = [id.origin, id.blockNumber, id.logIndex, id.timestamp, id.chainId] as const
            await writeContract({
                address: market.resolver,
                abi: parseAbi(['function resolve((address,uint256,uint256,uint256,uint256),bytes) external']),
                functionName: 'resolve',
                args: [idArgs, payload],
            })
        } catch (error) {
            console.error('Error resolving market: ', error)
            return { error }
        }
    }

    return { chainId, gameId, player, resolveMarket, isPending, isConfirming }
}

export const useBlockHashMarketStatus = (market: Market) => {
    const [blockHashEvent, setBlockHashEvent] = useState<{ id: MessageIdentifier, payload: Hex} | null>(null)

    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    if (isError) {
        console.error('Error resolving block hash resolver: ', error)
    }

    const { data: chainId } = useReadContract({
        abi: parseAbi(['function chainId() external view returns (uint256)']), 
        address: market.resolver, functionName: 'chainId' 
    })
    const { data: targetBlockNumber } = useReadContract({
        abi: parseAbi(['function blockNumber() external view returns (uint256)']), 
        address: market.resolver, functionName: 'blockNumber' 
    }) 
    const { data: outcome } = useReadContract({
        abi: parseAbi(['function outcome() external view returns (uint8)']), 
        address: market.resolver, functionName: 'outcome' 
    })

    const { data: currentBlockNumber } = useBlockNumber({ chainId: Number(chainId) })
    const client = usePublicClient({ chainId: Number(chainId) })

    useEffect(() => {
        const findBlockHashEvent = async () => {
            if (!client) return

            // Not yet reached the target block number
            if (!currentBlockNumber || !targetBlockNumber || currentBlockNumber < targetBlockNumber) return

            // Market is resolved or the relevant data to resolve is cached
            if (outcome !== 0) return
            if (blockHashEvent) return

            const logs = await client.getLogs({
                address: BLOCKHASH_EMITTER,
                event: parseAbiItem("event BlockHash(uint256 indexed blockNumber, bytes32 blockHash)"),
                args: { blockNumber: targetBlockNumber },
                fromBlock: 'earliest', toBlock: 'latest', strict: true,
            })

            if (logs && logs.length > 0) {
                const { id, payload } = await createInteropMessage(client, { log: logs[0] })
                setBlockHashEvent({ id, payload })
            }
        }

        findBlockHashEvent()
    }, [client, currentBlockNumber, targetBlockNumber, outcome])

    const resolveMarket = async () => {
        if (!blockHashEvent) return

        const { id, payload } = blockHashEvent
        const idArgs = [id.origin, id.blockNumber, id.logIndex, id.timestamp, id.chainId] as const
        try {
            await writeContract({
                address: market.resolver,
                abi: parseAbi(['function resolve((address,uint256,uint256,uint256,uint256),bytes) external']),
                functionName: 'resolve',
                args: [idArgs, payload],
            })
        } catch (error) {
            console.error('Error resolving market: ', error)
            return { error }
        }
    }

    // undecided & the block hash event is cached
    const isResolvable = outcome === 0 && blockHashEvent
    return { chainId, targetBlockNumber, isResolvable, resolveMarket, isPending, isConfirming }
}

export const useMockMarketStatus = (market: Market) => {
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    if (isError) {
        console.error('Error checking resolver outcome: ', error)
    }

    const { data: chainId } = useReadContract({
        abi: parseAbi(['function chainId() external view returns (uint256)']), 
        address: market.resolver, functionName: 'chainId' 
    })
    const { data: outcome } = useReadContract({
        abi: parseAbi(['function outcome() external view returns (uint8)']), 
        address: market.resolver, functionName: 'outcome' 
    })

    const resolveMarket = async () => {
        try {
            await writeContract({
                address: PREDICTION_MARKET_ADDRESS,
                abi: PREDICTION_MARKET_ABI,
                functionName: "resolveMarket",
                args: [market.resolver]
            })
        } catch (error) {
            console.error('Error resolving market:', error)
            return { error }
        }
    }

    const isResolvable = outcome !== 0
    return { chainId, isResolvable, resolveMarket, isPending, isConfirming }
}
