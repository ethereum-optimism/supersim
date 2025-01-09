import { Address } from "viem";
import { useSwitchChain, useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { useDeployment } from "./useDeployment";

import { PREDICTION_MARKET_ABI } from "../constants/abi";
import { PREDICTION_MARKET_CHAIN_ID } from "../constants/app";

export const usePlaceBet = () => {
    const { data: hash, writeContract, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    const connectedChainId = useChainId();
    const { switchChainAsync } = useSwitchChain();

    const { deployment } = useDeployment()

    const placeBet = async (resolver: Address, outcome: number, amount: number) => {
        try {
            if (connectedChainId !== PREDICTION_MARKET_CHAIN_ID) {
                await switchChainAsync({chainId: PREDICTION_MARKET_CHAIN_ID});
            }

            await writeContract({
                address: deployment!.PredictionMarket,
                abi: PREDICTION_MARKET_ABI, functionName: "buyOutcome", args: [resolver, outcome], value: BigInt(amount)
            })
        } catch (error) {
            console.error('Error placing bet:', error)
            return { error }
        }
    }

    return { placeBet, isPending, isConfirming, isSuccess, hash }
}