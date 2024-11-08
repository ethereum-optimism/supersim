import React from 'react';

import { useBetsPlaced } from '../hooks/useBetsPlaced';

const Position: React.FC<{ market: any }> = ({ market }) => {
    const bets = useBetsPlaced(market);
    if (!bets) return null;

    const isLive = market.status === 0;
    const yesOdds = Number(market.noBalance) / (Number(market.yesBalance) + Number(market.noBalance))

    const yesEthPayout =  Number(market.ethBalance) * bets.yesBalance / bets.yesSupply;
    const noEthPayout =  Number(market.ethBalance) * bets.noBalance / bets.noSupply;
    const lpEthPayout =  Number(market.ethBalance) * bets.lpBalance / bets.lpSupply;

    const renderPayout = (outcome: string, amount: number, payout: number, odds: number) => {
        const redeemable = {"Yes": Number(market.outcome) === 1, "No": Number(market.outcome) === 2, "LP": market.outcome !== 0}[outcome]

        // If this was redeemeable and the user's balance is zero, that indicates that they redeemed
        return (
            <div style={styles.positionCard}>
                <div style={styles.positionRow}>
                    <div style={styles.cell}>Mock Resolver</div>
                    <div style={styles.cell}>{market.resolver.slice(0,10)}...</div>
                    <div style={styles.cell}>{outcome}</div>
                    <div style={styles.cell}>{(odds*100).toFixed(2)}%</div>
                    <div style={styles.cell}>{(amount / 10 ** 18).toFixed(2)} ETH</div>
                    <div style={styles.cell}>{(payout / 10 ** 18).toFixed(2)} ETH</div>
                    <div style={styles.cell}>
                        {
                            isLive ? <span style={{ fontStyle: 'italic', color: '#6b7280' }}>Market Live...</span> :
                            redeemable ?  <button onClick={() => {}}>Redeem</button> :
                            <span style={{ fontStyle: 'italic', color: '#6b7280' }}>Lost Outcome</span> 
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {bets.yesTotalEth  > 0 && renderPayout("Yes", bets.yesTotalEth, yesEthPayout, yesOdds)}
            {bets.noTotalEth > 0 && renderPayout("No", bets.noTotalEth, noEthPayout, 1-yesOdds)}
            {bets.lpBalance > 0 && renderPayout("LP", lpEthPayout, lpEthPayout, 1)}
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
                <div style={styles.headerCell}>Bet Amount</div>
                <div style={styles.headerCell}>Payout</div>
                <div style={styles.headerCell}>Status</div>
            </div>

            {/* Position List */}
            <div style={styles.positionsList}>
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
    positionsList: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem',
    },
    positionCard: {
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '1rem',
    },
    positionRow: {
        display: 'flex',
        width: '100%',
    },
    cell: {
        flex: 1,
    },
}

export default Positions;