import { Address } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { PREDICTION_MARKET_ABI } from "../constants/abi";
import { PREDICTION_MARKET_ADDRESS } from "../constants/address";

export const usePlaceBet = () => {
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    if (isError) {
        console.error('Error placing bet: ', error)
    }

    const placeBet = async (resolver: Address, outcome: number, amount: number) => {
        try {
            await writeContract({
                address: PREDICTION_MARKET_ADDRESS,
                abi: PREDICTION_MARKET_ABI,
                functionName: "buyOutcome",
                args: [resolver, outcome], value: BigInt(amount)
            })
        } catch (error) {
            console.error('Error placing bet:', error)
            return { error }
        }
    }

    return { placeBet, isPending, isConfirming, isSuccess, hash }
}