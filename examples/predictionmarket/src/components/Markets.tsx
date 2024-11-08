import React, { useState } from 'react';

import { BlockHashMarketStatus, TicTacToeMarketStatus, useMarketStatus } from '../hooks/useMarketStatus';
import { Market, MarketType } from '../types/market';
import { truncateAddress } from '../utils/address';
import { chainName } from '../utils/chain';

import ChainLogo from './ChainLogo';
import MarketBetModal from './MarketBetModal';
import ProgressBar from './ProgressBar';

import personIcon from '../assets/person.svg';
import Modal from './Modal';
import MarketResolveModal from './MarketResolveModal';

const MarketCard: React.FC<{ market: Market }> = ({ market }) => {
    const [isBetModalOpen, setIsBetModalOpen] = useState<{open: boolean, isYes: boolean}>({open: false, isYes: false});
    const [isResolveModalOpen, setIsResolveModalOpen] = useState<boolean>(false);

    const { chainId, data, isResolvable, resolvingEvent, resolveMarket, isPending, isConfirming } = useMarketStatus(market)

    const yesOdds = Number(market.noBalance) / (Number(market.yesBalance) + Number(market.noBalance))

    const yesText = market.type === MarketType.BLOCKHASH ? 'Odd' : 'Win'
    const noText = market.type === MarketType.BLOCKHASH ? 'Even' : 'Lose'

    const isLive = market.status === 0
    return (
        <div style={styles.marketCard}>
            <div style={styles.marketRow}>
                <div style={styles.cell}>
                    <ChainLogo chainId={chainId} />
                    <span style={{fontSize: '14px', marginLeft: '6px'}}>{chainName(chainId)}</span>
                </div>

                <div style={styles.cell}>
                    {
                        market.type === MarketType.BLOCKHASH ?
                        (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                                <span style={{fontSize: '12px', lineHeight: '16px', color: '#636779'}}>BlockHeight</span>
                                <span style={{fontSize: '16px', lineHeight: '24px'}}>{(data as BlockHashMarketStatus).targetBlockNumber.toString()}</span>
                            </div>
                        ) :
                        (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                                <span style={{fontSize: '12px', lineHeight: '16px', color: '#636779'}}>TicTacToe: 901-0</span>
                                <span style={{fontSize: '16px', lineHeight: '24px'}}>
                                    <img src={personIcon} style={{width: '14px', height: '14px', marginRight: '4px'}} />
                                    {truncateAddress((data as TicTacToeMarketStatus).player)}
                                </span>
                            </div>
                        )
                    }
                </div>

                <div style={styles.cell}>
                    {isLive ?  <ProgressBar width='64px' height='32px' progress={yesOdds} yesColor='#0DA529' noColor='#0DA529' /> : <span style={{marginLeft: '24px'}}>-</span> }
                </div>

                <div style={styles.cell}>{isLive ? (Number(market.ethBalance) / 10 ** 18).toFixed(2) + ' ETH' : <span style={{marginLeft: '24px'}}>-</span>}</div>

                <div style={{...styles.cell, ...styles.statusText}}>
                    {
                        isResolvable ? <span>Live... (<span onClick={() => setIsResolveModalOpen(true)} style={{textDecoration: 'underline', cursor: 'pointer'}}>resolve</span>)</span> :
                        isLive ? <span>Live...</span> :
                        <span>Closed</span>
                    }
                </div>

                <div style={{...styles.cell, display: 'flex', justifyContent: 'center'}}>
                    <div style={styles.outcomeButtons}>
                        <button
                            style={{...styles.yesButton, opacity: !isLive ? 0.5 : 1, cursor: !isLive ? 'not-allowed' : 'pointer'}}
                            disabled={!isLive}
                            onClick={() => setIsBetModalOpen({open: true, isYes: true})}>
                            {yesText}
                        </button>
                        <button
                            style={{...styles.noButton, opacity: !isLive ? 0.5 : 1, cursor: !isLive ? 'not-allowed' : 'pointer'}}
                            disabled={!isLive}
                            onClick={() => setIsBetModalOpen({open: true, isYes: false})}>
                            {noText}
                        </button>
                    </div>
                </div>
            </div>

            <Modal isOpen={isBetModalOpen.open} onClose={() => setIsBetModalOpen({open: false, isYes: false})} title='Place Bet'>
                <MarketBetModal chainId={chainId} data={data} isYes={isBetModalOpen.isYes} yesOdds={yesOdds} yesText={yesText} noText={noText} market={market} />
            </Modal>

            <Modal isOpen={isResolveModalOpen} onClose={() => setIsResolveModalOpen(false)} title='Resolve Market'>
                <MarketResolveModal resolvingEvent={resolvingEvent!} resolveMarket={resolveMarket} isPending={isPending} isConfirming={isConfirming} />
            </Modal>
        </div>
    )
}

const Markets: React.FC<{ markets: any[] }> = ({ markets }) => {
    const liveMarkets = markets.filter((market) => market.status === 0)
    const closedMarkets = markets.filter((market) => market.status === 1)

    return (
        <div style={styles.container}>
            <div style={{fontWeight: '600', fontSize: '20px', lineHeight:'28px'}}>Markets</div>
            <div style={{fontSize: '16px', lineHeight:'24px', color: '#636779'}}>View all created markets. Place your wager</div>
            
            {/* Table Header */}
            <div style={styles.tableHeader}>
                <div style={styles.headerCell}>Chain</div>
                <div style={styles.headerCell}>Market</div>
                <div style={styles.headerCell}>Odds</div>
                <div style={styles.headerCell}>Liquidity</div>
                <div style={{...styles.headerCell}}>Status</div>
                <div style={{...styles.headerCell, textAlign: 'center'}}>Place Bet</div>
            </div>

            {
                liveMarkets.length === 0 && closedMarkets.length === 0 ?
                    <p>No markets</p> :
                    <div style={styles.marketList}>
                        {liveMarkets.map((market) => ( <MarketCard key={market.resolver} market={market} /> ))}
                        {closedMarkets.map((market) => ( <div key={market.resolver} style={{fontStyle: 'italic', color: '#6B7280'}}><MarketCard market={market} /> </div> ))}
                    </div>
            }

        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    tableHeader: {
        display: 'flex',
        paddingTop: '20px',
        marginBottom: '5px',
    },
    headerCell: {
        flex: 1,
        fontSize: '16px',
        lineHeight: '24px',
        color: '#636779',
    },
    marketList: {
        display: 'flex',
        flexDirection: 'column' as const,
    },
    marketCard: {
        paddingTop: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid #E2E8F0',
    },
    marketRow: {
        display: 'flex',
        width: '100%',
    },
    cell: {
        flex: 1,
        display: 'flex',
        fontSize: '16px',
        lineHeight: '24px',
        alignItems: 'center',
    },
    statusText: {
        color: '#6B7280',
        textAlign: 'center' as const,
    },
    outcomeButtons: {
        display: 'flex',
        gap: '4px',
        width: '100%',
    },
    yesButton: {
        flex: 1,
        backgroundColor: '#D6FFDA',
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '500',
        color: '#0DA529'
    },
    noButton: {
        flex: 1,
        backgroundColor: '#FFE0CC',
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '500',
        color: '#FA5300'
    },
}

export default Markets;