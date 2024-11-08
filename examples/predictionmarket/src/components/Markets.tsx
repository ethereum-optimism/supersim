import React from 'react';
import { useMarkets } from '../hooks/useMarkets';

const Markets: React.FC = () => {
    const { markets } = useMarkets();
    
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Markets</h1>
            <p>View all created markets. Pick Your Bet!</p>
            
            {/* Table Header */}
            <div style={styles.tableHeader}>
                <div style={styles.headerCell}>Chain</div>
                <div style={styles.headerCell}>Resolver</div>
                <div style={styles.headerCell}>Odds</div>
                <div style={styles.headerCell}>Volume</div>
                <div style={styles.headerCell}>Place Bet</div>
            </div>

            {/* Market List */}
            <div style={styles.marketList}>
                {markets.map((market) => (
                    <div key={market.resolver} style={styles.marketCard}>
                        <div style={styles.marketRow}>
                            <div style={styles.cell}>901</div>
                            <div style={styles.cell}>{market.resolver.slice(0,10)}...</div>
                            <div style={styles.cell}>20%</div>
                            <div style={styles.cell}>{market.ethBalance.toString()} ETH</div>
                            <div style={styles.cell}>
                                <div style={styles.betButtons}>
                                    <button>Yes</button>
                                    <button>No</button>
                                </div>

                            </div>
                        </div>
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
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#f9fafb',
        },
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