import { useEffect, useState } from "react"
import { Address, parseAbi, parseAbiItem } from "viem"
import { useConfig, useReadContracts } from "wagmi"
import { getPublicClient } from "wagmi/actions"

import { createInteropMessage } from '@eth-optimism/viem';

import { useContests } from "./useContests";
import { useDeployment } from "./useDeployment";

import { AcceptedGame, ResolvedGame, GameKey, createGameKey } from "../types/tictactoe"
import { ContestType } from "../types/contest";

export const useTicTacToeGames = () => {
    const [availableGames, setAvailableGames] = useState<Record<GameKey, AcceptedGame>>({})
    const [resolvedGames, setResolvedGames] = useState<Record<GameKey, ResolvedGame>>({})

    const config = useConfig()
    const { contests: allContests } = useContests()

    const { deployment } = useDeployment()

    // Query all tic-tac-toe markets
    const ticTacToeContestData = useReadContracts({
        contracts: Object.entries(allContests).filter(([_, contest]) => contest.type === ContestType.TICTACTOE).map(([_, contest]) => ({
            abi: parseAbi(['function game() view returns (uint256,uint256,address)']),
            address: contest.resolver, functionName: "game",
        })),
    })

    const ticTacToeContests: Set<GameKey> = new Set()
    for (const data of ticTacToeContestData.data ?? []) {
        if (!data.result) continue

        const [chainId, gameId, _] = data.result as [bigint, bigint, Address]
        ticTacToeContests.add(createGameKey(chainId, gameId))
    }

    // Sync with all accepted and resolving events
    useEffect(() => {
        const syncState = async () => {
            for (const chain of config.chains) {
                const publicClient = getPublicClient(config, { chainId: chain.id })
                if (!publicClient) continue

                const logs = await publicClient.getLogs({
                    address: deployment!.TicTacToe,
                    events: parseAbi([
                        'event GameWon(uint256 chainId, uint256 gameId, address winner, uint8 _x, uint8 _y)',
                        'event GameDraw(uint256 chainId, uint256 gameId, address player, uint8 _x, uint8 _y)'
                    ]),
                    fromBlock: 'earliest', toBlock: 'latest', strict: true,
                })

                for (const log of logs) {
                    const { id, payload } = await createInteropMessage(publicClient, { log })
                    const key = createGameKey(log.args.chainId, log.args.gameId)
                    setResolvedGames(prev => ({ ...prev, [key]: { key, id, payload } }))
                }
            }

            for (const chain of config.chains) {
                const publicClient = getPublicClient(config, { chainId: chain.id })
                if (!publicClient) continue

                const logs = await publicClient.getLogs({
                    address: deployment!.TicTacToe,
                    event: parseAbiItem('event AcceptedGame(uint256 chainId, uint256 gameId, address creator, address opponent)'),
                    fromBlock: 'earliest', toBlock: 'latest', strict: true,
                })

                for (const log of logs) {
                    const { id, payload } = await createInteropMessage(publicClient, { log })
                    const key = createGameKey(log.args.chainId, log.args.gameId)

                    // Filter games that have already have a contest or have already been finished
                    if (ticTacToeContests.has(key) || resolvedGames[key]) {
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
    }, [config, deployment, ticTacToeContests, resolvedGames])

    return { availableGames, resolvedGames }
}