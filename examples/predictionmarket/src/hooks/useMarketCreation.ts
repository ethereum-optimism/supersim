import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { parseAbi } from "viem";

import { AcceptedGame } from "../types/tictactoe";
import { BLOCKHASHMARKET_FACTORY_ADDRESS, TICTACTOE_FACTORY_ADDRESS } from "../constants/address";

export const useMarketCreation = () => {
    const { data: hash, writeContract, isPending } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    const newBlockHashMarket = async (chainId: bigint, blockNumber: bigint, liquidity: number) => {
        try {
            await writeContract({
                abi: parseAbi(['function newMarket(uint256,uint256) payable']),
                address: BLOCKHASHMARKET_FACTORY_ADDRESS, functionName: "newMarket", args: [chainId, blockNumber], value: BigInt(liquidity)
            })
        } catch (error) {
            console.error('Error creating new block hash market:', error)
        }
    }

    const newTicTacToeMarket = async (game: AcceptedGame, liquidity: number) => {
        try {
            const idArgs = [game.id.origin, game.id.blockNumber, game.id.logIndex, game.id.timestamp, game.id.chainId] as const
            await writeContract({
                abi: parseAbi(['function newMarket((address,uint256,uint256,uint256,uint256),bytes) payable']),
                address: TICTACTOE_FACTORY_ADDRESS, functionName: "newMarket", args: [idArgs, game.payload], value: BigInt(liquidity)
            })
        } catch (error) {
            console.error('Error creating new block hash market:', error)
        }
    }

    return { newBlockHashMarket, newTicTacToeMarket, isPending, isConfirming}
}
