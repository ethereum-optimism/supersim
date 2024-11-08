import { useConfig } from "wagmi";
import { getPublicClient } from "wagmi/actions"

import { PREDICTION_MARKET_CHAIN_ID } from "../constants/app";

export const useCreateMarket = () => {
    const config = useConfig()

    // Prediction Market Chain Client
    const appPublicClient = getPublicClient(config, { chainId: PREDICTION_MARKET_CHAIN_ID });
    if (!appPublicClient) {
        throw new Error('app chain not present in wagmi config')
    }

    // Create The Mock Resolver

    // Create The Market directly with the resolver
}