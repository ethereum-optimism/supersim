import { useAccount } from "wagmi"

import { Game } from "../types/game"
import { useGames } from "./useGames"

export const usePlayerGames = () => {
    const { address: player } = useAccount();
    const { games } = useGames()
    const playerGames: Game[] = []
    const availableGames: Game[] = []
    
    Object.values(games).forEach(game => {
      const isGamePlayer = game.player.toLowerCase() === player.toLowerCase()
      if (game.player.toLowerCase() === player.toLowerCase()) {
        playerGames.push(game)
      }
      if (!isGamePlayer && game.opponent === undefined) {
        availableGames.push(game)
      }
    })

    return { games, playerGames, availableGames }
}