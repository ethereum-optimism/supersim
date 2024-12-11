import { useEffect, useState } from 'react';
import { parseAbiItem } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';

import { Market } from '../types/market';

import { ERC20 } from '../constants/abi';
import { PREDICTION_MARKET_ADDRESS } from '../constants/address';

export const useBetsPlaced = (market: Market) => {
    const { address } = useAccount();
    const publicClient = usePublicClient();

    type Bet = {
        yesBalance: number, yesSupply: number, yesTotalEth: number,
        noBalance: number, noSupply: number, noTotalEth: number,
        lpBalance: number, lpSupply: number
    }

    const [bets, setBets] = useState<Bet | null >(null);

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

            const yesTotalEth = yesBets.reduce((acc: number, bet: any) => acc + Number(bet.args.ethAmountIn), 0);
            const noTotalEth = noBets.reduce((acc: number, bet: any) => acc + Number(bet.args.ethAmountIn), 0);

            setBets({ yesBalance, yesSupply, yesTotalEth, noBalance, noSupply, noTotalEth, lpBalance, lpSupply })
        }

        fetchBalances();
    }, [market, address])

    // Query total bets placed by this user
    return bets
}