import { useState, useEffect } from 'react';
import { Address } from 'viem';
import { useConfig, useReadContracts, useWatchContractEvent } from 'wagmi';
import { getPublicClient } from "wagmi/actions"

import { PREDICTION_MARKET_ABI } from '../constants/abi';
import { PREDICTION_MARKET_ADDRESS } from '../constants/address';
import { PREDICTION_MARKET_CHAIN_ID } from '../constants/app';

const NewMarketEvent = {
    name: 'NewMarket',
    type: 'event',
    inputs: [
        { name: 'resolver', type: 'address' },
        { name: 'yesToken', type: 'address' },
        { name: 'noToken', type: 'address' },
        { name: 'lpToken', type: 'address' },
    ],
}

export const useMarkets = () => {
    const [resolvers, setResolvers] = useState<Set<Address>>(new Set());
    const config = useConfig()

    // Prediction Market Chain Client
    const appPublicClient = getPublicClient(config, { chainId: PREDICTION_MARKET_CHAIN_ID });
    if (!appPublicClient) {
        throw new Error('app chain not present in wagmi config')
    }

    // Register past markets
    useEffect(() => {
        console.log('Registering past markets')
        const registerPastMarkets = async () => {
            const logs = await appPublicClient.getLogs({ address: PREDICTION_MARKET_ADDRESS, event: NewMarketEvent, fromBlock: 'earliest', toBlock: 'latest' })
            for (const log of logs) {
                console.log(log)
                setResolvers(prev => new Set([...prev, log.args.resolver]))
            }

            console.log('Done registering past markets')
        }

        registerPastMarkets()
    }, [config.chains])

    // Listen for and register new markets
    useWatchContractEvent({
        abi: PREDICTION_MARKET_ABI,
        address: PREDICTION_MARKET_ADDRESS,
        chainId: PREDICTION_MARKET_CHAIN_ID,
        eventName: 'NewMarket',
        onLogs: (logs) => {
            for (const log of logs) {
                console.log(log)
                setResolvers(prev => new Set([...prev, log.args.resolver]))
            }
        }
    })

    const { data: marketsData } = useReadContracts({
        contracts: Array.from(resolvers).map(resolver => ({
            abi: PREDICTION_MARKET_ABI,
            address: PREDICTION_MARKET_ADDRESS,
            chainId: PREDICTION_MARKET_CHAIN_ID,
            functionName: "markets",
            args: [resolver],
        })),
        query: { refetchInterval: 1000 }
    });

    // Sync with onchain state
    const markets = Array.from(resolvers)
        .filter((_, i) => marketsData?.[i] !== undefined)
        .map((resolver, i) => {
            const result = marketsData![i].result;
            return {
                resolver,
                status: result[0],
                outcome: result[1], 
                yesToken: result[2],
                noToken: result[3],
                lpToken: result[4],
                ethBalance: result[5]
            };
        })

    return { markets };
}