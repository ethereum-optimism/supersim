import { useConfig, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { getPublicClient } from "wagmi/actions"

import { PREDICTION_MARKET_CHAIN_ID } from "../constants/app";
import { MOCKMARKET_FACTORY_ADDRESS} from "../constants/address";
import { MOCKMARKET_FACTORY_ABI } from "../constants/abi";

export const useNewMockMarket = () => {
    const config = useConfig()
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    if (isError) {
        console.error('Error creating new mock market: ', error)
    }

    // Prediction Market Chain Client
    const appPublicClient = getPublicClient(config, { chainId: PREDICTION_MARKET_CHAIN_ID });
    if (!appPublicClient) {
        throw new Error('app chain not present in wagmi config')
    }

    const newMockMarket = async (liquidity: number) => {
        try {
            await writeContract({ address: MOCKMARKET_FACTORY_ADDRESS, abi: MOCKMARKET_FACTORY_ABI, functionName: "newMarket", value: BigInt(liquidity)})
        } catch (error) {
            console.error('Error creating new mock market:', error)
            return { error }
        }
    }

    return { newMockMarket, isPending, isConfirming, isSuccess, hash }
}