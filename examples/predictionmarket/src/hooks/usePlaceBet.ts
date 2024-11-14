import { useConfig, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { getPublicClient } from "wagmi/actions"
import { Address } from "viem";

import { PREDICTION_MARKET_ABI } from "../constants/abi";
import { PREDICTION_MARKET_CHAIN_ID } from "../constants/app";
import { PREDICTION_MARKET_ADDRESS } from "../constants/address";

export const usePlaceBet = () => {
    const config = useConfig()
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })


    if (isError) {
        console.error('Error placing bet: ', error)
    }

    // Prediction Market Chain Client
    const appPublicClient = getPublicClient(config, { chainId: PREDICTION_MARKET_CHAIN_ID });
    if (!appPublicClient) {
        throw new Error('app chain not present in wagmi config')
    }

    const placeBet = async (resolver: Address, outcome: number, amount: number) => {
        try {
            await writeContract({ address: PREDICTION_MARKET_ADDRESS, abi: PREDICTION_MARKET_ABI,
                functionName: "buyOutcome", args: [resolver, outcome], value: BigInt(amount * 10 ** 18)})
        } catch (error) {
            console.error('Error placing bet:', error)
            return { error }
        }
    }

    return { placeBet, isPending, isConfirming, isSuccess, hash }
}