import { useEffect, useState } from 'react';
import { Address, parseAbiItem, erc20Abi } from 'viem';
import { useAccount, useChainId, usePublicClient, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { Contest } from '../types/contest';
import { useDeployment } from './useDeployment';

import { CONTESTS_ABI } from '../constants/abi';
import { CONTESTS_CHAIN_ID } from '../constants/app';

export const useContestPositions = (contest: Contest) => {
    const { data: hash, writeContract, isPending } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    const connectedChainId = useChainId();
    const publicClient = usePublicClient();
    const { switchChainAsync } = useSwitchChain();
    const { address } = useAccount();
    const { deployment } = useDeployment()

    type Bet = {
        yesBalance: number, yesSupply: number, yesTotalEth: number,
        noBalance: number, noSupply: number, noTotalEth: number,
        lpBalance: number, lpSupply: number
    }

    const [positions, setPositions] = useState<Bet | null >(null);

    useEffect(() => {
        if (!publicClient) return;
        if (!deployment) return;
        if (!address) return;

        const fetchBalances = async () => {
            const yesBalance = Number(await publicClient.readContract({ address: contest.yesToken, abi: erc20Abi, functionName: 'balanceOf', args: [address] }));
            const yesSupply = Number(await publicClient.readContract({ address: contest.yesToken, abi: erc20Abi, functionName: 'totalSupply' }));

            const noBalance = Number(await publicClient.readContract({ address: contest.noToken, abi: erc20Abi, functionName: 'balanceOf', args: [address] }));
            const noSupply = Number(await publicClient.readContract({ address: contest.noToken, abi: erc20Abi, functionName: 'totalSupply' }));

            const lpBalance = Number(await publicClient.readContract({ address: contest.lpToken, abi: erc20Abi, functionName: 'balanceOf', args: [address] }));
            const lpSupply = Number(await publicClient.readContract({ address: contest.lpToken, abi: erc20Abi, functionName: 'totalSupply' }));

            // Retrieve all the bets that was placed by this user
            const betsPlaced = await publicClient.getLogs({
                address: deployment!.Contests,
                event: parseAbiItem(["event BetPlaced(address indexed resolver, address indexed bettor, uint8 outcome, uint256 ethAmountIn, uint256 amountOut)"]),
                args: { resolver: contest.resolver, bettor: address },
                fromBlock: 'earliest', toBlock: 'latest'
            })

            const yesBets = betsPlaced.filter((bet: any) => bet.args.outcome === 1);
            const noBets = betsPlaced.filter((bet: any) => bet.args.outcome === 2);

            // ETH Contributed
            const yesTotalEth = lpBalance + yesBets.reduce((acc: number, bet: any) => acc + Number(bet.args.ethAmountIn), 0);
            const noTotalEth = lpBalance + noBets.reduce((acc: number, bet: any) => acc + Number(bet.args.ethAmountIn), 0);

            setPositions({ yesBalance, yesSupply, yesTotalEth, noBalance, noSupply, noTotalEth, lpBalance, lpSupply })
        }

        fetchBalances();

        const unwatch = publicClient.watchContractEvent({
            address: [contest.yesToken, contest.noToken, contest.lpToken],
            abi: erc20Abi,
            eventName: 'Transfer',
            onLogs: () => { fetchBalances() },
        })

        return () => { unwatch() }
    }, [connectedChainId, contest, address, deployment, publicClient])

    const redeem = async (resolver: Address, isLP: boolean) => {
        try {
            if (connectedChainId !== CONTESTS_CHAIN_ID) {
                await switchChainAsync({ chainId: CONTESTS_CHAIN_ID });
            }

            const functionName = isLP ? "redeemLP" : "redeem";
            await writeContract({ address: deployment!.Contests, abi: CONTESTS_ABI, functionName, args: [resolver] })
        } catch (error) {
            console.error('Error redeeming:', error)
        }
    }

    return { positions, redeem, isPending, isConfirming, hash }
}