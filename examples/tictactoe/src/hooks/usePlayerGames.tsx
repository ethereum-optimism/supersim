import { useMemo } from "react"
import { useAccount } from "wagmi"

import { Game } from "../types/Game"
import { useGames } from "./useGames"

export const usePlayerGames = () => {
    const { address: player } = useAccount();
    const { games } = useGames()
    return useMemo(() => {
        const playerGames: Game[] = []
        const availableGames: Game[] = []
    
        Object.values(games).forEach(game => {
          if (game.player.toLowerCase() === player.toLowerCase()) {
            playerGames.push(game)
          } else if (game.player.toLowerCase() !== player.toLowerCase() && game.opponent === undefined) {
            availableGames.push(game)
          }
        })

        return { playerGames, availableGames }

    }, [games, player])
}