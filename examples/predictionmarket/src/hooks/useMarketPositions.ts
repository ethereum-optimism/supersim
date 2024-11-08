import { useEffect, useState } from 'react';
import { Address, parseAbiItem } from 'viem';
import { useAccount, usePublicClient, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { Market } from '../types/market';

import { ERC20 } from '../constants/abi';
import { PREDICTION_MARKET_ABI } from '../constants/abi';
import { PREDICTION_MARKET_ADDRESS } from '../constants/address';

export const useMarketPositions = (market: Market) => {
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

    if (isError) {
        console.error('Error creating new mock market: ', error)
    }

    const { address } = useAccount();
    const publicClient = usePublicClient();

    type Bet = {
        yesBalance: number, yesSupply: number, yesTotalEth: number,
        noBalance: number, noSupply: number, noTotalEth: number,
        lpBalance: number, lpSupply: number
    }

    const [positions, setPositions] = useState<Bet | null >(null);

    useEffect(() => {
        if (!publicClient) return;

        const fetchBalances = async () => {
            const yesBalance = Number(await publicClient.readContract({ address: market.yesToken, abi: ERC20, functionName: 'balanceOf', args: [address] }));
            const yesSupply = Number(await publicClient.readContract({ address: market.yesToken, abi: ERC20, functionName: 'totalSupply' }));

            const noBalance = Number(await publicClient.readContract({ address: market.noToken, abi: ERC20, functionName: 'balanceOf', args: [address] }));
            const noSupply = Number(await publicClient.readContract({ address: market.noToken, abi: ERC20, functionName: 'totalSupply' }));

            const lpBalance = Number(await publicClient.readContract({ address: market.lpToken, abi: ERC20, functionName: 'balanceOf', args: [address] }));
            const lpSupply = Number(await publicClient.readContract({ address: market.lpToken, abi: ERC20, functionName: 'totalSupply' }));

            // Retrieve all the bets that was placed by this user
            const betsPlaced = await publicClient.getLogs({
                address: PREDICTION_MARKET_ADDRESS,
                event: parseAbiItem(["event BetPlaced(address indexed resolver, address indexed bettor, uint8 outcome, uint256 ethAmountIn, uint256 amountOut)"]),
                args: { resolver: market.resolver, bettor: address },
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
            address: [market.yesToken, market.noToken, market.lpToken],
            abi: ERC20,
            eventName: 'Transfer',
            onLogs: () => { fetchBalances() },
        })

        return () => { unwatch() }
    }, [market, address])

    const redeem = async (resolver: Address, isLP: boolean) => {
        if (!publicClient) return;

        try {
            const functionName = isLP ? "redeemLP" : "redeem";
            await writeContract({ address: PREDICTION_MARKET_ADDRESS, abi: PREDICTION_MARKET_ABI, functionName, args: [resolver] })
        } catch (error) {
            console.error('Error redeeming:', error)
        }
    }

    return { positions, redeem, isPending, isConfirming, hash }
}