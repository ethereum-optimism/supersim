import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import { Game } from '../types/game'
import { abi, address } from '../constants/tictactoe'

export const useMakeMove = () => {
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    if (isError) {
        console.error('Error making move: ',error)
    }

    const makeMove = async (opponentGame: Game, x: number, y: number) => {
        let movesMade = 0;
        for (let i = 0; i < opponentGame.moves.length; i++) {
            for (let j = 0; j < opponentGame.moves[i].length; j++) {
                if (opponentGame.moves[i][j]) {
                    movesMade++;
                }
            }
        }

        let functionName: string = 'startGame';
        if (movesMade > 0) {
            functionName = 'makeMove'
        }

        try {
            await writeContract({ address, abi, functionName, args: [opponentGame.lastActionId, opponentGame.lastActionData, x, y] })
        } catch (error) {
            console.error('Error making move: ', error)
            return { error }
        }
    }

    return { makeMove, isPending, isConfirming, isSuccess, hash }
}
