import { useChainId, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { parseAbi } from "viem";

import { AcceptedGame } from "../types/tictactoe";
import { useDeployment } from "./useDeployment";

import { PREDICTION_MARKET_CHAIN_ID } from "../constants/app";

export const useMarketCreation = () => {
    const { data: hash, writeContract, isPending } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    const connectedChainId = useChainId();
    const { switchChainAsync } = useSwitchChain();
    const { deployment } = useDeployment()

    const newBlockHashMarket = async (chainId: bigint, blockNumber: bigint, liquidity: number) => {
        try {
            if (connectedChainId !== PREDICTION_MARKET_CHAIN_ID) {
                await switchChainAsync({chainId: PREDICTION_MARKET_CHAIN_ID});
            }

            await writeContract({
                abi: parseAbi(['function newMarket(uint256,uint256) payable']),
                address: deployment!.BlockHashMarketFactory, functionName: "newMarket", args: [chainId, blockNumber], value: BigInt(liquidity)
            })
        } catch (error) {
            console.error('Error creating new block hash market:', error)
        }
    }

    const newTicTacToeMarket = async (game: AcceptedGame, liquidity: number) => {
        try {
            if (connectedChainId !== PREDICTION_MARKET_CHAIN_ID) {
                await switchChainAsync({chainId: PREDICTION_MARKET_CHAIN_ID});
            }

            const idArgs = [game.id.origin, game.id.blockNumber, game.id.logIndex, game.id.timestamp, game.id.chainId] as const
            await writeContract({
                abi: parseAbi(['function newMarket((address,uint256,uint256,uint256,uint256),bytes) payable']),
                address: deployment!.TicTacToeMarketFactory, functionName: "newMarket", args: [idArgs, game.payload], value: BigInt(liquidity)
            })
        } catch (error) {
            console.error('Error creating new tictactoe market:', error)
        }
    }

    return { newBlockHashMarket, newTicTacToeMarket, isPending, isConfirming}
}
