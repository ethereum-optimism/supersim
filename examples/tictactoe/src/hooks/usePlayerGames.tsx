import { useMemo } from "react"
import { useAccount } from "wagmi"

import { createGameKey, Game } from "../types/game"
import { useGames } from "./useGames"

export enum PlayerTurn {
    Player = 0,
    Opponent = 1
}

export type GameWithTurn = Game & {
    // Defined if the game has been accepted
    turn: PlayerTurn | undefined
}

export const usePlayerGames = () => {
    const { address: player } = useAccount();
    const { games } = useGames()
    const playerGames: GameWithTurn[] = []
    const availableGames: Game[] = []
    
    Object.values(games).forEach(game => {
      const isGamePlayer = game.player.toLowerCase() === player.toLowerCase()
      if (game.player.toLowerCase() === player.toLowerCase()) {
        let turn: PlayerTurn | undefined;
        if (game.opponent !== undefined) {
          const opponentGameKey = createGameKey(game.chainId, game.gameId, game.opponent)
          const opponentGame = games[opponentGameKey]
          turn = Number(game.lastMove.timestamp) < Number(opponentGame.lastMove.timestamp) ? PlayerTurn.Player : PlayerTurn.Opponent
        }

        playerGames.push({...game, turn})
      }
      if (!isGamePlayer && game.opponent === undefined) {
        availableGames.push(game)
      }
    })

    return { games, playerGames, availableGames }
}