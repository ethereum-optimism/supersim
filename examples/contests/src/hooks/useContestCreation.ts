import { useChainId, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { parseAbi } from "viem";

import { AcceptedGame } from "../types/tictactoe";
import { useDeployment } from "./useDeployment";

import { CONTESTS_CHAIN_ID } from "../constants/app";

export const useContestCreation = () => {
    const { data: hash, writeContract, isPending } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    const connectedChainId = useChainId();
    const { switchChainAsync } = useSwitchChain();
    const { deployment } = useDeployment()

    const newBlockHashContest = async (chainId: bigint, blockNumber: bigint, liquidity: number) => {
        try {
            if (connectedChainId !== CONTESTS_CHAIN_ID) {
                await switchChainAsync({chainId: CONTESTS_CHAIN_ID});
            }

            await writeContract({
                abi: parseAbi(['function newContest(uint256,uint256) payable']),
                address: deployment!.BlockHashContestFactory, functionName: "newContest", args: [chainId, blockNumber], value: BigInt(liquidity)
            })
        } catch (error) {
            console.error('Error creating new block hash market:', error)
        }
    }

    const newTicTacToeContest = async (game: AcceptedGame, liquidity: number) => {
        try {
            if (connectedChainId !== CONTESTS_CHAIN_ID) {
                await switchChainAsync({chainId: CONTESTS_CHAIN_ID});
            }

            const idArgs = [game.id.origin, game.id.blockNumber, game.id.logIndex, game.id.timestamp, game.id.chainId] as const
            await writeContract({
                abi: parseAbi(['function newContest((address,uint256,uint256,uint256,uint256),bytes) payable']),
                address: deployment!.TicTacToeContestFactory, functionName: "newContest", args: [idArgs, game.payload], value: BigInt(liquidity)
            })
        } catch (error) {
            console.error('Error creating new tictactoe market:', error)
        }
    }

    return { newBlockHashContest, newTicTacToeContest, isPending, isConfirming}
}
