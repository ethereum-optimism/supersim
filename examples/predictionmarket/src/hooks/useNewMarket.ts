import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { parseAbi } from "viem";

import { AcceptedGame } from "../types/tictactoe";
import { BLOCKHASHMARKET_FACTORY_ADDRESS, MOCKMARKET_FACTORY_ADDRESS, TICTACTOE_FACTORY_ADDRESS } from "../constants/address";

export const useNewMockMarket = () => {
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    if (isError) {
        console.error('Error creating new mock market: ', error)
    }

    const newMockMarket = async (liquidity: number) => {
        try {
            await writeContract({
                address: MOCKMARKET_FACTORY_ADDRESS,
                abi: parseAbi(['function newMarket() payable']),
                functionName: "newMarket",
                value: BigInt(liquidity),
            })
        } catch (error) {
            console.error('Error creating new mock market:', error)
            return { error }
        }
    }

    return { newMockMarket, isPending, isConfirming, hash }
}

export const useNewBlockHashMarket = () => {
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    if (isError) {
        console.error('Error creating new block hash market: ', error)
    }

    const newBlockHashMarket = async (chainId: number, blockNumber: number, liquidity: number) => {
        try {
            await writeContract({
                address: BLOCKHASHMARKET_FACTORY_ADDRESS,
                abi: parseAbi(['function newMarket(uint256,uint256) payable']),
                functionName: "newMarket",
                args: [BigInt(chainId), BigInt(blockNumber)], value: BigInt(liquidity)
            })
        } catch (error) {
            console.error('Error creating new block hash market:', error)
            return { error }
        }
    }

    return { newBlockHashMarket, isPending, isConfirming, hash }
}

export const useNewTicTacToeMarket = () => {
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    if (isError) {
        console.error('Error creating new tic tac toe market: ', error)
    }

    const newTicTacToeMarket = async (game: AcceptedGame, liquidity: number) => {
        try {
            const idArgs = [game.id.origin, game.id.blockNumber, game.id.logIndex, game.id.timestamp, game.id.chainId] as const
            await writeContract({
                address: TICTACTOE_FACTORY_ADDRESS,
                abi: parseAbi(['function newMarket((address,uint256,uint256,uint256,uint256),bytes) payable']),
                functionName: "newMarket",
                args: [idArgs, game.payload], value: BigInt(liquidity)
            })
        } catch (error) {
            console.error('Error creating new block hash market:', error)
            return { error }
        }
    }

    return { newTicTacToeMarket, isPending, isConfirming, hash }
}