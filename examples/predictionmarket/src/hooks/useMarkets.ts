import { useState, useEffect } from 'react';
import { Abi, Address, parseAbi, parseAbiItem } from 'viem';
import { usePublicClient, useReadContracts, useWatchContractEvent } from 'wagmi';

import { PREDICTION_MARKET_ABI } from '../constants/abi';
import { BLOCKHASHMARKET_FACTORY_ADDRESS, MOCKMARKET_FACTORY_ADDRESS, PREDICTION_MARKET_ADDRESS, TICTACTOE_FACTORY_ADDRESS } from '../constants/address';
import { PREDICTION_MARKET_CHAIN_ID } from '../constants/app';

import { Market, MarketType } from '../types/market';

export const useMarkets = () => {
    const [resolvers, setResolvers] = useState<Record<Address, MarketType>>({});

    const publicClient = usePublicClient()

    // Register past markets
    useEffect(() => {
        const registerPastMarkets = async () => {
            if (!publicClient) return;

            const event = parseAbiItem("event NewMarket(address resolver)")
            const mockMarketLogs = await publicClient.getLogs({
                address: MOCKMARKET_FACTORY_ADDRESS,
                event, fromBlock: 'earliest', toBlock: 'latest', strict: true
            })
            const blockhashMarketLogs = await publicClient.getLogs({
                address: BLOCKHASHMARKET_FACTORY_ADDRESS,
                event, fromBlock: 'earliest', toBlock: 'latest', strict: true
            })
            const ticTacToeMarketLogs = await publicClient.getLogs({
                address: TICTACTOE_FACTORY_ADDRESS,
                event, fromBlock: 'earliest', toBlock: 'latest', strict: true
            })

            
            for (const log of mockMarketLogs) {
                setResolvers(prev => ({ ...prev, [log.args.resolver]: MarketType.MOCK }))
            }
            for (const log of blockhashMarketLogs) {
                setResolvers(prev => ({ ...prev, [log.args.resolver]: MarketType.BLOCKHASH }))
            }
            for (const log of ticTacToeMarketLogs) {
                setResolvers(prev => ({ ...prev, [log.args.resolver]: MarketType.TICTACTOE }))
            }
        }

        registerPastMarkets()
    }, [publicClient])

    // Listen for new markets
    useWatchContractEvent({
        address: MOCKMARKET_FACTORY_ADDRESS,
        abi: parseAbi(['event NewMarket(address resolver)']),
        eventName: 'NewMarket', strict: true,
        onLogs: (logs) => {
            for (const log of logs) {
                setResolvers(prev => ({ ...prev, [log.args.resolver]: MarketType.MOCK }))
            }
        }
    })
    useWatchContractEvent({
        address: BLOCKHASHMARKET_FACTORY_ADDRESS,
        abi: parseAbi(['event NewMarket(address resolver)']),
        eventName: 'NewMarket', strict: true,
        onLogs: (logs) => {
            for (const log of logs) {
                setResolvers(prev => ({ ...prev, [log.args.resolver]: MarketType.BLOCKHASH }))
            }
        }
    })
    useWatchContractEvent({
        address: TICTACTOE_FACTORY_ADDRESS,
        abi: parseAbi(['event NewMarket(address resolver)']),
        eventName: 'NewMarket', strict: true,
        onLogs: (logs) => {
            for (const log of logs) {
                setResolvers(prev => ({ ...prev, [log.args.resolver]: MarketType.TICTACTOE }))
            }
        }
    })

    const { data: marketsData } = useReadContracts({
        contracts: Object.entries(resolvers).map(([resolver, _]) => ({
            address: PREDICTION_MARKET_ADDRESS,
            abi: PREDICTION_MARKET_ABI as Abi,
            functionName: "markets", args: [resolver],
        })),
    });

    if (!marketsData) return { markets: [] }

    // Sync with onchain state
    const markets = Object.entries(resolvers)
        .filter((_, i) => marketsData[i] !== undefined && marketsData[i].result !== undefined)
        .map(([resolver, type], i) => {
            const result = marketsData[i].result as any;
            return {
                resolver, type,
                status: result[0],
                outcome: result[1], 
                yesToken: result[2],
                noToken: result[3],
                lpToken: result[4],
                ethBalance: result[5],
                yesBalance: result[6],
                noBalance: result[7]
            } as Market;
        })

    return { markets };
}