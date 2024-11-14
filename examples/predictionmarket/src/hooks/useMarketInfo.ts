import { useState } from 'react';
import { Address } from 'viem';
import { getPublicClient } from "wagmi/actions"

import { PREDICTION_MARKET_CHAIN_ID } from '../constants/app';

export const useMarketInfo = (resolver: Address) => {
    const [numBets, setNumBets] = useState<number>(0)
    
    const appPublicClient = getPublicClient(config, { chainId: PREDICTION_MARKET_CHAIN_ID });
    if (!appPublicClient) {
        throw new Error('app chain not present in wagmi config')
    }

    return { numBets }
}