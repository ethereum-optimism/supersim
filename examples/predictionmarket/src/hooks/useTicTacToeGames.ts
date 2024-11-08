import { useEffect, useState } from "react"
import { Address, parseAbi, parseAbiItem } from "viem"
import { useConfig, useReadContracts } from "wagmi"
import { getPublicClient } from "wagmi/actions"

import { createInteropMessage } from '@eth-optimism/viem';

import { useMarkets } from "./useMarkets";

import { AcceptedGame, ResolvedGame, GameKey, createGameKey } from "../types/tictactoe"
import { MarketType } from "../types/market";

import { TICTACTOE_ADDRESS } from "../constants/address"

export const useTicTacToeGames = () => {
    const [availableGames, setAvailableGames] = useState<Record<GameKey, AcceptedGame>>({})
    const [resolvedGames, setResolvedGames] = useState<Record<GameKey, ResolvedGame>>({})

    const config = useConfig()

    const { markets: allMarkets } = useMarkets()

    // Query all tic-tac-toe markets
    const ticTacToeMarketData = useReadContracts({
        contracts: Object.entries(allMarkets).filter(([_, market]) => market.type === MarketType.TICTACTOE).map(([_, market]) => ({
            abi: parseAbi(['function game() view returns (uint256,uint256,address)']),
            address: market.resolver, functionName: "game",
        })),
    })

    const ticTacToeMarkets: Set<GameKey> = new Set()
    for (const data of ticTacToeMarketData.data ?? []) {
        if (!data.result) continue

        const [chainId, gameId, _] = data.result as [bigint, bigint, Address]
        ticTacToeMarkets.add(createGameKey(Number(chainId), Number(gameId)))
    }

    // Sync with all accepted and resolving events
    useEffect(() => {
        const syncState = async () => {
            for (const chain of config.chains) {
                const publicClient = getPublicClient(config, { chainId: chain.id })
                if (!publicClient) continue

                const logs = await publicClient.getLogs({
                    address: TICTACTOE_ADDRESS,
                    events: parseAbi([
                        'event GameWon(uint256 chainId, uint256 gameId, address winner, uint8 _x, uint8 _y)',
                        'event GameDraw(uint256 chainId, uint256 gameId, address player, uint8 _x, uint8 _y)'
                    ]),
                    fromBlock: 'earliest', toBlock: 'latest', strict: true,
                })

                for (const log of logs) {
                    const { id, payload } = await createInteropMessage(publicClient, { log })
                    const key = createGameKey(Number(log.args.chainId), Number(log.args.gameId))
                    setResolvedGames(prev => ({ ...prev, [key]: { key, id, payload } }))
                }
            }

            for (const chain of config.chains) {
                const publicClient = getPublicClient(config, { chainId: chain.id })
                if (!publicClient) continue

                const logs = await publicClient.getLogs({
                    address: TICTACTOE_ADDRESS,
                    event: parseAbiItem('event AcceptedGame(uint256 chainId, uint256 gameId, address creator, address opponent)'),
                    fromBlock: 'earliest', toBlock: 'latest', strict: true,
                })

                for (const log of logs) {
                    const { id, payload } = await createInteropMessage(publicClient, { log })
                    const key = createGameKey(Number(log.args.chainId), Number(log.args.gameId))

                    // Filter games that have already have a market or have already been finished
                    if (ticTacToeMarkets.has(key) || resolvedGames[key]) {
                        setAvailableGames(prev => {
                            const newState = { ...prev }
                            delete newState[key]
                            return newState
                        })

                        continue
                    }

                    setAvailableGames(prev => ({
                        ...prev,
                        [key]: { key, player: log.args.creator, opponent: log.args.opponent, id, payload }
                    }))
                }
            }

        }

        syncState()
    }, [config.chains])

    return { availableGames, resolvedGames }
}