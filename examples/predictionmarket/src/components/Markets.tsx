import React, { useState } from 'react';

import PlaceBetModal from './PlaceBetModal';

const Market: React.FC<{ market }> = ({ market }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalYes, setIsModalYes] = useState(false);

    const odds = Number(market.noBalance) / (Number(market.yesBalance) + Number(market.noBalance)) * 100

    return (
        <div style={styles.marketCard}>
            <div style={styles.marketRow}>
                <div style={styles.cell}>Mock Resolver</div>
                <div style={styles.cell}>{market.resolver.slice(0,10)}...</div>
                <div style={styles.cell}>{odds.toFixed(2)}%</div>
                <div style={styles.cell}>{Number(market.ethBalance) / 10 ** 18} ETH</div>
                <div style={styles.cell}>
                    <div style={styles.betButtons}>
                        <button onClick={() => {setIsModalOpen(true); setIsModalYes(true)}}>Yes</button>
                        <button onClick={() => {setIsModalOpen(true); setIsModalYes(false)}}>No</button>
                    </div>
                </div>
            </div>

            <PlaceBetModal isOpen={isModalOpen} isYes={isModalYes} market={market} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

const Markets: React.FC<{ markets: any[] }> = ({ markets }) => {
    const liveMarkets = markets.filter((market) => market.status === 0)
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Live Markets</h1>
            <p>View all created markets. Pick Your Bet!</p>
            
            {/* Table Header */}
            <div style={styles.tableHeader}>
                <div style={styles.headerCell}>Description</div>
                <div style={styles.headerCell}>Resolver</div>
                <div style={styles.headerCell}>Odds</div>
                <div style={styles.headerCell}>Liquidity</div>
                <div style={styles.headerCell}>Place Bet</div>
            </div>

            {/* Market List */}
            <div style={styles.marketList}>
                {liveMarkets.map((market) => (
                    <div key={market.resolver}>
                        <Market market={market} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '1rem',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
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
    marketTitle: {
        fontSize: '1.125rem',
        fontWeight: '600',
    },
    marketDetails: {
        marginTop: '0.5rem',
        color: '#4b5563',
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
    marketRow: {
        display: 'flex',
        width: '100%',
    },
    cell: {
        flex: 1,
    },
    betButtons: {
        gap: '0.5rem',
        display: 'flex',
    }
}

export default Markets;