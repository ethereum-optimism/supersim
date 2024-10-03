import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import { useGames } from './useGames'
import { createGameKey } from '../types/Game'
import { address, abi } from '../constants/tictactoe'

export const useAcceptGame = () => {
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    const { games } = useGames()

    if (isError) {
        console.error('Error accepting game: ',error)
    }

    const acceptGame = async (chainId: number, gameId: number, opponent: string) => {
        // pull in the opponent's new game event
        const opponentGameKey = createGameKey(chainId, gameId, opponent)
        const opponentGame = games[opponentGameKey]

        try {
            await writeContract({ address, abi, functionName: 'acceptGame', args: [opponentGame.lastMove, opponentGame.lastMoveData] })
        } catch (error) {
            console.error('Error accepting game: ', error)
            return { error }
        }
    }

    return { acceptGame, isPending, isConfirming, isSuccess, hash }
}