import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { address, abi } from '../constants/tictactoe'

export const useNewGame = () => {
    const { data: hash, writeContract, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    const createNewGame = async () => {
        try {
            await writeContract({ address: address, abi: abi, functionName: 'newGame' })
        } catch (error) {
            console.error('Error creating new game: ',error)
            return { error }
        }
    }

    return {
        createNewGame,
        isPending,
        isConfirming,
        isSuccess,
        hash
    }
}