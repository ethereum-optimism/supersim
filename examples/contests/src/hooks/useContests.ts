import { useState, useEffect } from 'react';
import { Abi, Address, parseAbi, parseAbiItem } from 'viem';
import { usePublicClient, useReadContracts, useWatchContractEvent } from 'wagmi';

import { CONTESTS_ABI } from '../constants/abi';

import { Contest, ContestType } from '../types/contest';
import { useDeployment } from './useDeployment';

export const useContests = () => {
    const [resolvers, setResolvers] = useState<Record<Address, ContestType>>({});
    const publicClient = usePublicClient()

    const { deployment } = useDeployment();

    // Register past contests
    useEffect(() => {
        const registerPastContests = async () => {
            if (!publicClient || !deployment) return;

            const event = parseAbiItem("event NewContest(address resolver)")
            const blockhashContestLogs = await publicClient.getLogs({
                address: deployment.BlockHashContestFactory,
                event, fromBlock: 'earliest', toBlock: 'latest', strict: true
            })
            const ticTacToeContestLogs = await publicClient.getLogs({
                address: deployment.TicTacToeContestFactory,
                event, fromBlock: 'earliest', toBlock: 'latest', strict: true
            })
            
            const resolvers: Record<Address, ContestType> = {}
            blockhashContestLogs.forEach(log => resolvers[log.args.resolver] = ContestType.BLOCKHASH);
            ticTacToeContestLogs.forEach(log => resolvers[log.args.resolver] = ContestType.TICTACTOE);

            setResolvers(resolvers)
        }

        registerPastContests()
    }, [publicClient, deployment])

    // Listen for new contests (TODO: fix addresses)
    useWatchContractEvent({
        address: deployment?.BlockHashContestFactory,
        abi: parseAbi(['event NewContest(address resolver)']),
        eventName: 'NewContest', strict: true,
        enabled: !!deployment,
        onLogs: (logs) => { logs.forEach(log => { setResolvers(prev => ({ ...prev, [log.args.resolver]: ContestType.BLOCKHASH })) }) }
    })
    useWatchContractEvent({
        address: deployment?.TicTacToeContestFactory,
        abi: parseAbi(['event NewContest(address resolver)']),
        eventName: 'NewContest', strict: true,
        enabled: !!deployment,
        onLogs: (logs) => { logs.forEach(log => { setResolvers(prev => ({ ...prev, [log.args.resolver]: ContestType.TICTACTOE })) }) }
    })

    const { data: contestsData } = useReadContracts({
        contracts: Object.entries(resolvers).map(([resolver, _]) => ({
            address: deployment?.Contests,
            abi: CONTESTS_ABI as Abi,
            functionName: "contests", args: [resolver],
        })),
        query: { refetchInterval: 1000, refetchIntervalInBackground: true },
    });

    if (!contestsData) return { contests: [] }

    // Sync with onchain state
    const contests = Object.entries(resolvers)
        .filter((_, i) => contestsData[i] !== undefined && contestsData[i].result !== undefined)
        .map(([resolver, type], i) => {
            const result = contestsData[i].result as any;
            return {
                resolver, type,
                outcome: result[0], 
                yesToken: result[1],
                noToken: result[2],
                lpToken: result[3],
                ethBalance: result[4],
                yesBalance: result[5],
                noBalance: result[6]
            } as Contest;
        })

    return { contests };
}