import { useState, useEffect, } from "react";
import { useConfig, useWatchContractEvent, useContractRead } from "wagmi";
import { getPublicClient } from "wagmi/actions"
import { Block, concat, } from "viem"

import { Game, GameKey, GameStatus, PlayerTurn, createGameKey } from "../types/game";
import { abi, address } from "../constants/tictactoe";

const newGameEvent = {
    name: 'NewGame',
    type: 'event',
    inputs: [
        { name: 'chainId', type: 'uint256' },
        { name: 'gameId', type: 'uint256' },
        { name: 'player', type: 'address' }
    ],
}

const acceptedGameEvent = {
    name: 'AcceptedGame',
    type: 'event',
    inputs: [
        { name: 'chainId', type: 'uint256' },
        { name: 'gameId', type: 'uint256' },
        { name: 'opponent', type: 'address' },
        { name: 'player', type: 'address' }
    ],
}

const movePlayedEvent = {
    name: 'MovePlayed',
    type: 'event',
    inputs: [
        { name: 'chainId', type: 'uint256' },
        { name: 'gameId', type: 'uint256' },
        { name: 'player', type: 'address' },
        { name: '_x', type: 'uint8' },
        { name: '_y', type: 'uint8' },
    ],
}

const gameWonEvent = {
    name: 'GameWon',
    type: 'event',
    inputs: [
        { name: 'chainId', type: 'uint256' },
        { name: 'gameId', type: 'uint256' },
        { name: 'winner', type: 'address' },
        { name: '_x', type: 'uint8' },
        { name: '_y', type: 'uint8' },
    ],
}

const gameDrawnEvent = {
    name: 'GameDraw',
    type: 'event',
    inputs: [
        { name: 'chainId', type: 'uint256' },
        { name: 'gameId', type: 'uint256' },
        { name: 'player', type: 'address' },
        { name: '_x', type: 'uint8' },
        { name: '_y', type: 'uint8' },
    ],
}

export const useGames = () => {
    const [games, setGames] = useState<Record<GameKey, Game>>({});
    const [syncing, setSyncing] = useState(true);
    const config = useConfig()

    const newGame = (chainId: number, gameId: number, player: string, game: Partial<Game>) => {
        const gameKey = createGameKey(chainId, gameId, player);
        setGames(prev => ({
            ...prev,
            [gameKey]: {
                ...game,
                chainId, gameId, player,
                status: GameStatus.Active,
                moves: new Array(3).fill(null).map(() =>new Array(3).fill(null)),
            }
        }))
    }

    // Sync Past State
    useEffect(() => {
        // We do this in order of the game so that state is setup correctly
        const fetchPastEvents = async () => {
            const gamesInit: Record<GameKey, Game> = {}
            const addGame = (chainId: number, gameId: number, player: string, game: Partial<Game>) => {
                const gameKey = createGameKey(chainId, gameId, player);
                gamesInit[gameKey] = {
                        ...gamesInit[gameKey],
                        ...game,
                        chainId, gameId, player,
                        moves: new Array(3).fill(null).map(() =>new Array(3).fill(null)),
                }
            }
            
            // Record All NewGames
            for (const chain of config.chains) {
                const publicClient = getPublicClient(config, { chainId: chain.id })
                const logs = await publicClient.getLogs({ address, event: newGameEvent, fromBlock: 'earliest', toBlock: 'latest', chainId: chain.id })
                for (const log of logs) {
                    const block = await publicClient.getBlock({ blockHash: log.blockHash })
                    const lastActionId = { origin: log.address, blockNumber: block.number, logIndex: log.logIndex, timestamp: block.timestamp, chainId: chain.id }
                    const lastActionData = concat([...log.topics, log.data])

                    const chainId = Number(BigInt(log.args.chainId))
                    const gameId = Number(BigInt(log.args.gameId))
                    const player = log.args.player
                    addGame(chainId, gameId, player, { turn: PlayerTurn.Player, lastActionId, lastActionData })
                }
            } 

            // Accepted Games
            for (const chain of config.chains) {
                const publicClient = getPublicClient(config, { chainId: chain.id })
                const logs = await publicClient.getLogs({ address, event: acceptedGameEvent, fromBlock: 'earliest', toBlock: 'latest', chainId: chain.id })
                for (const log of logs) {
                    const block = await publicClient.getBlock({ blockHash: log.blockHash })
                    const lastActionId = { origin: log.address, blockNumber: block.number, logIndex: log.logIndex, timestamp: block.timestamp, chainId: chain.id }
                    const lastActionData = concat([...log.topics, log.data])

                    const chainId = Number(BigInt(log.args.chainId))
                    const gameId = Number(BigInt(log.args.gameId))
                    const player = log.args.player
                    const opponent = log.args.opponent
                    addGame(chainId, gameId, player, { opponent, turn: PlayerTurn.Opponent, lastActionId, lastActionData })

                    // update the opponent in the opponent's game
                    const opponentGameKey = createGameKey(chainId, gameId, opponent)
                    const opponentGame = gamesInit[opponentGameKey]
                    opponentGame.opponent = player
                    gamesInit[opponentGameKey] = opponentGame
                }
            }

            // Moves, with games loaded up in state, we can replay all moves out of order
            for (const chain of config.chains) {
                const publicClient = getPublicClient(config, { chainId: chain.id })
                const logs = await publicClient.getLogs({ address, event: movePlayedEvent, fromBlock: 'earliest', toBlock: 'latest', chainId: chain.id })
                for (const log of logs) {
                    const chainId = Number(BigInt(log.args.chainId))
                    const gameId = Number(BigInt(log.args.gameId))
                    const player = log.args.player
                    const x = Number(BigInt(log.args._x))
                    const y = Number(BigInt(log.args._y))

                    // Record Move on Players board
                    const gameKey = createGameKey(chainId, gameId, player)
                    const game = gamesInit[gameKey]
                    game.moves[x][y] = 1

                    // Record Move on Opponents board
                    const opponentGameKey = createGameKey(chainId, gameId, game.opponent)
                    const opponentGame = gamesInit[opponentGameKey]
                    opponentGame.moves[x][y] = 2

                    // Record if progressing (id can only be undefined when unaccepted so we're good since this is a move played implying acceptance)
                    if (game.lastActionId && game.lastActionId.blockNumber < log.blockNumber) {
                        const block = await publicClient.getBlock({ blockHash: log.blockHash })
                        game.lastActionId = { origin: log.address, blockNumber: log.blockNumber, logIndex: log.logIndex, timestamp: block.timestamp, chainId: chain.id }
                        game.lastActionData = concat([...log.topics, log.data])

                        // If forward progressing, update the turn to the opponent

                        if (game.lastActionId.timestamp > opponentGame.lastActionId.timestamp) {
                            game.turn = PlayerTurn.Opponent
                            opponentGame.turn = PlayerTurn.Player
                        }
                    }
                }
            }

            // games that have been won
            for (const chain of config.chains) {
                const publicClient = getPublicClient(config, { chainId: chain.id })
                const logs = await publicClient.getLogs({ address, event: gameWonEvent, fromBlock: 'earliest', toBlock: 'latest', chainId: chain.id })
                for (const log of logs) {
                    const chainId = Number(BigInt(log.args.chainId))
                    const gameId = Number(BigInt(log.args.gameId))
                    const winner = log.args.winner
                    const x = Number(BigInt(log.args._x))
                    const y = Number(BigInt(log.args._y))

                    // Record winning move & game status
                    const gameKey = createGameKey(chainId, gameId, winner)
                    const game = gamesInit[gameKey]
                    game.moves[x][y] = 1
                    game.status = GameStatus.Won

                    // Record move on opponent's board & game status
                    const opponentGameKey = createGameKey(chainId, gameId, game.opponent)
                    const opponentGame = gamesInit[opponentGameKey]
                    opponentGame.moves[x][y] = 2
                    opponentGame.status = GameStatus.Lost
                    
                    // Record if progressing (id can only be undefined when unaccepted so we're good since this is a move played implying acceptance)
                    if (game.lastActionId && game.lastActionId.blockNumber < log.blockNumber) {
                        const block = await publicClient.getBlock({ blockHash: log.blockHash })
                        game.lastActionId = { origin: log.address, blockNumber: log.blockNumber, logIndex: log.logIndex, timestamp: block.timestamp, chainId: chain.id }
                        game.lastActionData = concat([...log.topics, log.data])
                        if (game.lastActionId.timestamp > opponentGame.lastActionId.timestamp) {
                            game.turn = PlayerTurn.Opponent
                            opponentGame.turn = PlayerTurn.Player
                        }
                    }
                }
            }

            // games that resulted in a draw
            for (const chain of config.chains) {
                const publicClient = getPublicClient(config, { chainId: chain.id })
                const logs = await publicClient.getLogs({ address, event: gameDrawnEvent, fromBlock: 'earliest', toBlock: 'latest', chainId: chain.id })
                for (const log of logs) {
                    const chainId = Number(BigInt(log.args.chainId))
                    const gameId = Number(BigInt(log.args.gameId))
                    const player = log.args.player
                    const x = Number(BigInt(log.args._x))
                    const y = Number(BigInt(log.args._y))

                    // Record last move & game status
                    const gameKey = createGameKey(chainId, gameId, player)
                    const game = gamesInit[gameKey]
                    game.moves[x][y] = 1
                    game.status = GameStatus.Draw

                    // Record last move on opponent's board & game status
                    const opponentGameKey = createGameKey(chainId, gameId, game.opponent)
                    const opponentGame = gamesInit[opponentGameKey]
                    opponentGame.moves[x][y] = 2
                    opponentGame.status = GameStatus.Draw
                    
                    // Record if progressing (id can only be undefined when unaccepted so we're good since this is a move played implying acceptance)
                    if (game.lastActionId && game.lastActionId.blockNumber < log.blockNumber) {
                        const block = await publicClient.getBlock({ blockHash: log.blockHash })
                        game.lastActionId = { origin: log.address, blockNumber: log.blockNumber, logIndex: log.logIndex, timestamp: block.timestamp, chainId: chain.id }
                        game.lastActionData = concat([...log.topics, log.data])
                        if (game.lastActionId.timestamp > opponentGame.lastActionId.timestamp) {
                            game.turn = PlayerTurn.Opponent
                            opponentGame.turn = PlayerTurn.Player
                        }
                    }
                }
            }

            // With all games populated, we can set the state
            setGames(gamesInit)
            setSyncing(false)
        }

        fetchPastEvents()
    }, [config.chains])

    // Listen for new state after we finish syncing
    config.chains.forEach((chain: any) => {
        const publicClient = getPublicClient(config, { chainId: chain.id })

        // New Game
        useWatchContractEvent({ address, abi, eventName: newGameEvent.name, chainId: chain.id, onLogs(logs: any) {
            for (const log of logs) {
                const chainId = Number(BigInt(log.args.chainId))
                const gameId = Number(BigInt(log.args.gameId))
                const player = log.args.player
                publicClient.getBlock({ blockHash: log.blockHash})
                    .then((block: Block) => {
                        const lastActionId = { origin: log.address, blockNumber: log.blockNumber, logIndex: log.logIndex, timestamp: block.timestamp, chainId: chain.id }
                        const lastActionData = concat([...log.topics, log.data])
                        newGame(chainId, gameId, player, { turn: PlayerTurn.Player, lastActionId, lastActionData })
                    })
                    .catch((error: any) => {
                        console.error("Error processing log. Needs to be replayed which isn't supported...", error)
                    })
            }
        }})

        // Accepted Game
        useWatchContractEvent({ address, abi, eventName: acceptedGameEvent.name, chainId: chain.id, onLogs(logs: any) {
            for (const log of logs) {
                const chainId = Number(BigInt(log.args.chainId))
                const gameId = Number(BigInt(log.args.gameId))
                const player = log.args.player
                publicClient.getBlock({ blockHash: log.blockHash})
                    .then((block: Block) => {
                        const lastActionId = { origin: log.address, blockNumber: log.blockNumber, logIndex: log.logIndex, timestamp: block.timestamp, chainId: chain.id }
                        const lastActionData = concat([...log.topics, log.data])
                        const opponent = log.args.opponent
                        newGame(chainId, gameId, player, { opponent: log.args.opponent, turn: PlayerTurn.Opponent, lastActionId, lastActionData })

                        // update the player in the opponent's game (New Game must have already been seen based on ordering)
                        const opponentGameKey = createGameKey(chainId, gameId, opponent)
                        setGames(prev => ({ ...prev, [opponentGameKey]: { ...prev[opponentGameKey], opponent: player } }))
                    })
                    .catch((error: any) => {
                        console.error("Error processing log. Needs to be replayed which isn't supported...", error)
                    })
            }
        }})

        // Move Played
        useWatchContractEvent({ address, abi, eventName: movePlayedEvent.name, chainId: chain.id, onLogs(logs: any) {
            for (const log of logs) {
                const chainId = Number(BigInt(log.args.chainId))
                const gameId = Number(BigInt(log.args.gameId))
                const player = log.args.player

                // Record Move on Players board
                const gameKey = createGameKey(chainId, gameId, player)
                const game = games[gameKey]
                game.moves[log.args._x][log.args._y] = 1
                game.moves = [...game.moves] // create new reference to trigger react update

                // Record Move on Opponents board
                const opponent = game.opponent
                const opponentGameKey = createGameKey(chainId, gameId, opponent)
                const opponentGame = games[opponentGameKey]
                opponentGame.moves[log.args._x][log.args._y] = 2
                opponentGame.moves = [...opponentGame.moves] // create new reference to trigger react update

                // After syncing, moves should always be forward progressing...
                if (game.lastActionId && game.lastActionId.blockNumber < log.blockNumber) {
                    publicClient.getBlock({ blockHash: log.blockHash})
                        .then((block: Block) => {
                            game.lastActionId = { origin: log.address, blockNumber: log.blockNumber, logIndex: log.logIndex, timestamp: block.timestamp, chainId: chain.id }
                            game.lastActionData = concat([...log.topics, log.data])

                            // Sanity update the turns
                            if (game.lastActionId.timestamp > opponentGame.lastActionId.timestamp) {
                                game.turn = PlayerTurn.Opponent
                                opponentGame.turn = PlayerTurn.Player
                            }

                            setGames(prev => ({ ...prev, [gameKey]: {...game}, [opponentGameKey]: { ...opponentGame } }))
                        })
                        .catch((error: any) => {
                            console.error("GAME BROKEN: Error processing log. Needs to be replayed which isn't supported...", error)
                        })
                } else {
                    // Should never be in this branch
                    console.error("GAME BROKEN? MovePlayed event that is not forward progressing found after sync...")
                    setGames(prev => ({ ...prev, [gameKey]: {...game}, [opponentGameKey]: { ...opponentGame } }))
                }
            }
        }})

        // Game Won
        useWatchContractEvent({ address, abi, eventName: gameWonEvent.name, chainId: chain.id, onLogs(logs: any) {
            for (const log of logs) {
                const chainId = Number(BigInt(log.args.chainId))
                const gameId = Number(BigInt(log.args.gameId))
                const winner = log.args.winner
                const x = Number(BigInt(log.args._x))
                const y = Number(BigInt(log.args._y))

                // Update winner's game
                const gameKey = createGameKey(chainId, gameId, winner)
                const game = games[gameKey]
                game.moves[x][y] = 1
                game.status = GameStatus.Won

                // Update loser's game
                const opponentGameKey = createGameKey(chainId, gameId, game.opponent)
                const opponentGame = games[opponentGameKey]
                opponentGame.moves[x][y] = 2
                opponentGame.status = GameStatus.Lost

                publicClient.getBlock({ blockHash: log.blockHash})
                    .then((block: Block) => {
                        game.lastActionId = { origin: log.address, blockNumber: log.blockNumber, logIndex: log.logIndex, timestamp: block.timestamp, chainId: chain.id }
                        game.lastActionData = concat([...log.topics, log.data])

                        // Sanity update the turns
                        if (game.lastActionId.timestamp > opponentGame.lastActionId.timestamp) {
                            game.turn = PlayerTurn.Opponent
                            opponentGame.turn = PlayerTurn.Player
                        }

                        setGames(prev => ({ ...prev, [gameKey]: {...game}, [opponentGameKey]: {...opponentGame} }))
                    })
                    .catch((error: any) => {
                        console.error("Error processing GameWon event:", error)
                    })
            }
        }})


        // Game Drawn
        useWatchContractEvent({ address, abi, eventName: gameDrawnEvent.name, chainId: chain.id, onLogs(logs: any) {
            for (const log of logs) {
                const chainId = Number(BigInt(log.args.chainId))
                const gameId = Number(BigInt(log.args.gameId))
                const winner = log.args.winner
                const x = Number(BigInt(log.args._x))
                const y = Number(BigInt(log.args._y))

                // Update player's game
                const gameKey = createGameKey(chainId, gameId, winner)
                const game = games[gameKey]
                game.moves[x][y] = 1
                game.status = GameStatus.Draw

                // Update opponent's game
                const opponentGameKey = createGameKey(chainId, gameId, game.opponent)
                const opponentGame = games[opponentGameKey]
                opponentGame.moves[x][y] = 2
                opponentGame.status = GameStatus.Draw

                publicClient.getBlock({ blockHash: log.blockHash})
                    .then((block: Block) => {
                        game.lastActionId = { origin: log.address, blockNumber: log.blockNumber, logIndex: log.logIndex, timestamp: block.timestamp, chainId: chain.id }
                        game.lastActionData = concat([...log.topics, log.data])

                        // Sanity update the turns
                        if (game.lastActionId.timestamp > opponentGame.lastActionId.timestamp) {
                            game.turn = PlayerTurn.Opponent
                            opponentGame.turn = PlayerTurn.Player
                        }

                        setGames(prev => ({ ...prev, [gameKey]: {...game}, [opponentGameKey]: {...opponentGame} }))
                    })
                    .catch((error: any) => {
                        console.error("Error processing GameWon event:", error)
                    })
            }
        }})
    })

    return { games, syncing }
}
