import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { ERC20 } from '../constants/abi';
import { useConfig } from 'wagmi';
import { PREDICTION_MARKET_CHAIN_ID } from '../constants/app';
import { getPublicClient } from "wagmi/actions"

const Position: React.FC<{ market: any }> = ({ market }) => {
    const { address } = useAccount();
    const config = useConfig()
    const publicClient = getPublicClient(config, { chainId: PREDICTION_MARKET_CHAIN_ID });

    const [balances, setBalances] = useState<{ yesBalance: number, yesSupply: number, noBalance: number, noSupply: number } | null>(null);

    useEffect(() => {
        const fetchBalances = async () => {
            if (!publicClient) return;

            const yesBalance = await publicClient.readContract({ address: market.yesToken, abi: ERC20, functionName: 'balanceOf', args: [address] });
            const yesSupply = await publicClient.readContract({ address: market.yesToken, abi: ERC20, functionName: 'totalSupply' });

            const noBalance = await publicClient.readContract({ address: market.noToken, abi: ERC20, functionName: 'balanceOf', args: [address] });
            const noSupply = await publicClient.readContract({ address: market.noToken, abi: ERC20, functionName: 'totalSupply' });

            setBalances({ yesBalance: Number(yesBalance), yesSupply: Number(yesSupply), noBalance: Number(noBalance), noSupply: Number(noSupply), });
        };
        
        fetchBalances();
    }, [market, publicClient]);

    const odds = Number(market.noBalance) / (Number(market.yesBalance) + Number(market.noBalance))
    const yesEthPayout =  balances ? Number(market.ethBalance) * balances.yesBalance / balances.yesSupply : 0;
    const noEthPayout =  balances ? Number(market.ethBalance) * balances.noBalance / balances.noSupply : 0;

    const isLive = market.outcome === 0;
    const isResolvable = false

    return (
        <div>
            {yesEthPayout > 0 && (
                <div style={styles.marketCard}>
                    <div style={styles.marketRow}>
                        <div style={styles.cell}>Mock Resolver</div>
                        <div style={styles.cell}>{market.resolver.slice(0,10)}...</div>
                        <div style={styles.cell}>Yes</div>
                        <div style={styles.cell}>{(odds*100).toFixed(2)}%</div>
                        <div style={styles.cell}>{(yesEthPayout / 10 ** 18).toFixed(4)} ETH</div>
                        <div style={styles.cell}>
                            <button onClick={() => {}}>
                                {isResolvable ? "Resolve" :
                                    isLive ? "Still Live" :
                                    market.outcome === 1 ? "Redeem" : "Lost :("
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {noEthPayout > 0 && (
                <div style={styles.marketCard}>
                    <div style={styles.marketRow}>
                        <div style={styles.cell}>Mock Resolver</div>
                        <div style={styles.cell}>{market.resolver.slice(0,10)}...</div>
                        <div style={styles.cell}>No</div>
                        <div style={styles.cell}>{((1-odds)*100).toFixed(2)}%</div>
                        <div style={styles.cell}>{(noEthPayout / 10 ** 18).toFixed(4)} ETH</div>
                        <div style={styles.cell}>
                            <button>Stand In</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const Positions: React.FC<{ markets: any[] }> = ({ markets }) => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>My Positions</h1>
            <p>Track your active, resolvable, and redeemable positions</p>

            {/* Table Header */}
            <div style={styles.tableHeader}>
                <div style={styles.headerCell}>Description</div>
                <div style={styles.headerCell}>Resolver</div>
                <div style={styles.headerCell}>Outcome</div>
                <div style={styles.headerCell}>Odds</div>
                <div style={styles.headerCell}>Payout</div>
                <div style={styles.headerCell}></div>
            </div>

            {/* Market List */}
            <div style={styles.marketList}>
                {markets.map((market) => (
                    <Position key={market.resolver} market={market} />
                ))}
            </div>
        </div>
    )
}

const styles = {
    container: {
        padding: '1rem',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    tableHeader: {
        display: 'flex',
        padding: '0.75rem 1rem',
        backgroundColor: '#f9fafb',
        borderBottom: '2px solid #e5e7eb',
        marginBottom: '0.5rem',
    },
    headerCell: {
        flex: 1,
        fontWeight: '600',
        color: '#374151',
    },
    marketList: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem',
    },
    marketCard: {
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '1rem',
    },
    marketRow: {
        display: 'flex',
        width: '100%',
    },
    cell: {
        flex: 1,
    },
}

export default Positions;