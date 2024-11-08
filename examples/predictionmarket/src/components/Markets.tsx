import React, { useState } from 'react';

import { useMockMarketStatus, useBlockHashMarketStatus, useTicTacToeMarketStatus } from '../hooks/useMarketStatus';
import { useTicTacToeGames } from '../hooks/useTicTacToeGames';
import PlaceBetModal from './PlaceBetModal';

import { Market, MarketType } from '../types/market';
import { createGameKey } from '../types/tictactoe';

const TicTacToeMarket: React.FC<{ market: Market }> = ({ market }) => {
    const [isModalOpen, setIsModalOpen] = useState<{isModalOpen: boolean, isYes: boolean}>({isModalOpen: false, isYes: false});

    const { chainId, gameId, player, resolveMarket } = useTicTacToeMarketStatus(market)
    const { resolvedGames } = useTicTacToeGames()

    const isLive = market.status === 0
    const odds = Number(market.noBalance) / (Number(market.yesBalance) + Number(market.noBalance)) * 100

    const gameKey = createGameKey(Number(chainId), Number(gameId))
    const isResolvable = resolvedGames[gameKey] !== undefined && isLive

    return (
        <div style={styles.marketCard}>
            <div style={styles.marketRow}>
                <div style={styles.cell}>{Number(chainId)}</div>
                <div style={styles.cell}>Winning Player: {player?.slice(0, 6)}..</div>
                <div style={styles.cell}>{odds.toFixed(2)}%</div>
                <div style={styles.cell}>{Number(market.ethBalance) / 10 ** 18} ETH</div>
                <div style={{...styles.cell, display: 'flex', justifyContent: 'center'}}>
                    <div style={styles.betButtons}>
                        <button style={{backgroundColor: 'green'}} onClick={() => {setIsModalOpen({isModalOpen: true, isYes: true});}}>Win</button>
                        <button style={{backgroundColor: '#FF0420'}} onClick={() => {setIsModalOpen({isModalOpen: true, isYes: false});}}>Lose</button>
                    </div>
                </div>
                <div style={{...styles.cell, display: 'flex', justifyContent: 'center'}}>
                    {
                        isResolvable ? <button onClick={() => resolveMarket(resolvedGames[gameKey].id, resolvedGames[gameKey].payload)}>Resolve</button> :
                        isLive ? <span style={{ fontStyle: 'italic', color: '#6b7280' }}>Market Live...</span> :
                        <span style={{ fontStyle: 'italic', color: '#6b7280', textAlign: 'center' }}>Closed</span>
                    }
                </div>
            </div>

            <PlaceBetModal isOpen={isModalOpen.isModalOpen} isYes={isModalOpen.isYes} market={market} onClose={() => setIsModalOpen({isModalOpen: false, isYes: false})} />
        </div>
    )
}

const BlockHashMarket: React.FC<{ market: Market }> = ({ market }) => {
    const [isModalOpen, setIsModalOpen] = useState<{isModalOpen: boolean, isYes: boolean}>({isModalOpen: false, isYes: false});

    const { chainId, isResolvable, targetBlockNumber, resolveMarket } = useBlockHashMarketStatus(market);

    const isLive = market.status === 0;
    const odds = Number(market.noBalance) / (Number(market.yesBalance) + Number(market.noBalance)) * 100

    return (
        <div style={styles.marketCard}>
            <div style={styles.marketRow}>
                <div style={styles.cell}>{Number(chainId)}</div>
                <div style={styles.cell}>Block {targetBlockNumber?.toString()}</div>
                <div style={styles.cell}>{odds.toFixed(2)}%</div>
                <div style={styles.cell}>{Number(market.ethBalance) / 10 ** 18} ETH</div>
                <div style={{...styles.cell, display: 'flex', justifyContent: 'center'}}>
                    <div style={styles.betButtons}>
                        <button style={{backgroundColor: 'green'}} onClick={() => {setIsModalOpen({isModalOpen: true, isYes: true});}}>Odd</button>
                        <button style={{backgroundColor: '#FF0420'}} onClick={() => {setIsModalOpen({isModalOpen: true, isYes: false});}}>Even</button>
                    </div>
                </div>
                <div style={{...styles.cell, display: 'flex', justifyContent: 'center'}}>
                    {
                        isResolvable ? <button onClick={() => resolveMarket()}>Resolve</button> :
                        isLive ? <span style={{ fontStyle: 'italic', color: '#6b7280' }}>Market Live...</span> :
                        <span style={{ fontStyle: 'italic', color: '#6b7280', textAlign: 'center' }}>Closed</span>
                    }
                </div>
            </div>

            <PlaceBetModal isOpen={isModalOpen.isModalOpen} isYes={isModalOpen.isYes} market={market} onClose={() => setIsModalOpen({isModalOpen: false, isYes: false})} />
        </div>
    )
}


const MockMarket: React.FC<{ market: Market }> = ({ market }) => {
    const [isModalOpen, setIsModalOpen] = useState<{isModalOpen: boolean, isYes: boolean}>({isModalOpen: false, isYes: false});

    const { chainId, isResolvable, resolveMarket } = useMockMarketStatus(market);

    const isLive = market.status === 0;
    const odds = Number(market.noBalance) / (Number(market.yesBalance) + Number(market.noBalance)) * 100

    return (
        <div style={styles.marketCard}>
            <div style={styles.marketRow}>
                <div style={styles.cell}>{Number(chainId)}</div>
                <div style={styles.cell}>MockMarket</div>
                <div style={styles.cell}>{odds.toFixed(2)}%</div>
                <div style={styles.cell}>{Number(market.ethBalance) / 10 ** 18} ETH</div>
                <div style={{...styles.cell, display: 'flex', justifyContent: 'center'}}>
                    <div style={styles.betButtons}>
                        <button style={{backgroundColor: 'green'}} onClick={() => {setIsModalOpen({isModalOpen: true, isYes: true});}}>Yes</button>
                        <button style={{backgroundColor: '#FF0420'}} onClick={() => {setIsModalOpen({isModalOpen: true, isYes: false});}}>No</button>
                    </div>
                </div>
                <div style={{...styles.cell, display: 'flex', justifyContent: 'center'}}>
                    {
                        isResolvable ? <button onClick={() => resolveMarket()}>Resolve</button> :
                        isLive ? <span style={{ fontStyle: 'italic', color: '#6b7280' }}>Market Live...</span> :
                        <span style={{ fontStyle: 'italic', color: '#6b7280', textAlign: 'center' }}>Closed</span>
                    }
                </div>
            </div>

            <PlaceBetModal isOpen={isModalOpen.isModalOpen} isYes={isModalOpen.isYes} market={market} onClose={() => setIsModalOpen({isModalOpen: false, isYes: false})} />
        </div>
    )
}

const Markets: React.FC<{ markets: any[] }> = ({ markets }) => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Markets</h1>
            <p>View markets. Pick Your Bet!</p>
            
            {/* Table Header */}
            <div style={styles.tableHeader}>
                <div style={styles.headerCell}>Chain</div>
                <div style={styles.headerCell}>Description</div>
                <div style={styles.headerCell}>Odds</div>
                <div style={styles.headerCell}>Liquidity</div>
                <div style={{...styles.headerCell, textAlign: 'center'}}>Place Bet</div>
                <div style={{...styles.headerCell, textAlign: 'center'}}>Status</div>
            </div>

            { /* Market List */
                markets.length === 0 ?
                    <p>No live markets</p> :
                    <div style={styles.marketList}>
                        {markets.map((market) => (
                            <div key={market.resolver}>
                                {market.type === MarketType.BLOCKHASH ? <BlockHashMarket market={market} /> : market.type === MarketType.TICTACTOE ? <TicTacToeMarket market={market} /> : <MockMarket market={market} />}
                            </div>
                        ))}
                    </div>
            }

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