import { useState, useEffect, } from "react";
import { useConfig, useWatchContractEvent, useAccount } from "wagmi";
import { getPublicClient } from "wagmi/actions"

import { Game, GameKey, createGameKey } from "../types/Game";
import { abi, address } from "../constants/tictactoe";

export const useGames = () => {
    const [games, setGames] = useState<Record<GameKey, Game>>({});
    const [syncing, setSyncing] = useState(true);
    const config = useConfig()


    // New Games
    //   - Insert into State (opponent === undefined)
    // AcceptedGames
    //   - Insert into Stsate (update creawtor, insert opponent)

    // MovesPlayed. Update Game State

    // GameWon/GameDrawn. Update Game Staste
    const newGame = (chainId: number, gameId: number, player: string) => {
        const gameKey = createGameKey(chainId, gameId, player);
        setGames(prev => ({
            ...prev,
            [gameKey]: {
                chainId, gameId, player,
                gameWon: false, gameDrawn: false,
                moves: new Array(3).fill(new Array(3).fill(null)),
            }
        }))
    }

    /*
    const acceptedGame = (chainId: number, gameId: number, player: string, opponent: string) => {
        const gameKey: GameKey = createGameKey(chainId, gameId, player);
        const oppGameKey: GameKey = createGameKey(chainId, gameId, opponent);
        setGames(prev  => ({
            ...prev,
            [oppGameKey]: { ...prev[oppGameKey], opponent: player, },
            [gameKey]: {
                chainId,
                gameId,
                player,
                moves: new Array(3).fill(new Array(3).fill(null)),
                gameWon: false,
            },
        }))
    }
    */

    // Sync Past State
    useEffect(() => {
        const fetchPastEvents = async () => {
            for (const chain of config.chains) {
                if (typeof chain.id === 'undefined') {
                    console.log('chain.id is undefined. skipping...')
                    return
                }

                const publicClient = getPublicClient(config, { chainId: chain.id })
                const logs = await publicClient.getLogs({
                    address, 
                    event: {
                        name: 'NewGame',
                        type: 'event',
                        inputs: [
                            { name: 'chainId', type: 'uint256' },
                            { name: 'gameId', type: 'uint256' },
                            { name: 'player', type: 'address' }
                        ],
                    },
                    fromBlock: 'earliest',
                    toBlock: 'latest',
                    chainId: chain.id,
                })

                logs.forEach((log: any) => {
                    const chainId = Number(BigInt(log.args.chainId))
                    if (chainId !== chain.id) {
                        throw new Error(`ChainId ${chainId} does not match ${chain.id}`)
                    }

                    const gameId = Number(BigInt(log.args.gameId))
                    const player = log.args.player
                    newGame(chain.id, gameId, player)
                })
            } 

            setSyncing(false)
        }

        fetchPastEvents()
    }, [config.chains])

    // Listen for new state
    config.chains.forEach((chain: any) => {
        useWatchContractEvent({
            address, abi,
            eventName: 'NewGame',
            chainId: chain.id,
            onLogs(logs: any) {
                logs.forEach((log: any) => {
                    const chainId = Number(BigInt(log.args.chainId))
                    const gameId = Number(BigInt(log.args.gameId))
                    const player = log.args.player
                    newGame(chainId, gameId, player)
                })
            },
        })
    })

    // Listen for all AcceptedGames

    return { games, syncing }
}