import React, { useState } from 'react';

import { BlockHashContestStatus, TicTacToeContestStatus, useContestStatus } from '../hooks/useContestStatus';
import { Contest, ContestType } from '../types/contest';
import { truncateAddress } from '../utils/address';
import { chainName } from '../utils/chain';

import personIcon from '../assets/person.svg';

import ChainLogo from './ChainLogo';
import Modal from './Modal';
import ContestBuyOutcomeModal from './ContestBuyOutcomeModal';
import ContestResolveModal from './ContestResolveModal';
import ProgressBar from './ProgressBar';

const ContestCard: React.FC<{ contest: Contest }> = ({ contest }) => {
    const [isBetModalOpen, setIsBetModalOpen] = useState<{open: boolean, isYes: boolean}>({open: false, isYes: false});
    const [isResolveModalOpen, setIsResolveModalOpen] = useState<boolean>(false);

    const { chainId, data, isResolvable, resolvingEvent, resolveContest, isPending, isConfirming } = useContestStatus(contest)

    const yesOdds = Number(contest.noBalance) / (Number(contest.yesBalance) + Number(contest.noBalance))

    const yesText = contest.type === ContestType.BLOCKHASH ? 'Odd' : 'Win'
    const noText = contest.type === ContestType.BLOCKHASH ? 'Even' : 'Lose'

    const isLive = contest.outcome === 0
    return (
        <div style={styles.marketCard}>
            <div style={styles.marketRow}>
                <div style={styles.cell}>
                    <ChainLogo chainId={chainId} />
                    <span style={{fontSize: '14px', marginLeft: '6px'}}>{chainName(chainId)}</span>
                </div>

                <div style={styles.cell}>
                    {
                        contest.type === ContestType.BLOCKHASH ?
                        (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                                <span style={{fontSize: '12px', lineHeight: '16px', color: '#636779'}}>BlockHeight</span>
                                <span style={{fontSize: '16px', lineHeight: '24px'}}>{(data as BlockHashContestStatus).targetBlockNumber.toString()}</span>
                            </div>
                        ) :
                        (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                                <span style={{fontSize: '12px', lineHeight: '16px', color: '#636779'}}>TicTacToe: 901-0</span>
                                <span style={{fontSize: '16px', lineHeight: '24px'}}>
                                    <img src={personIcon} style={{width: '14px', height: '14px', marginRight: '4px'}} />
                                    {truncateAddress((data as TicTacToeContestStatus).player)}
                                </span>
                            </div>
                        )
                    }
                </div>

                <div style={styles.cell}>
                    {isLive ?  <ProgressBar width='64px' height='32px' progress={yesOdds} yesColor='#0DA529' noColor='#0DA529' /> : <span style={{marginLeft: '24px'}}>-</span> }
                </div>

                <div style={styles.cell}>{isLive ? (Number(contest.ethBalance) / 10 ** 18).toFixed(2) + ' ETH' : <span style={{marginLeft: '24px'}}>-</span>}</div>

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

            <Modal isOpen={isBetModalOpen.open} onClose={() => setIsBetModalOpen({open: false, isYes: false})} title='Decide an Outcome'>
                <ContestBuyOutcomeModal chainId={chainId} data={data} isYes={isBetModalOpen.isYes} yesOdds={yesOdds} yesText={yesText} noText={noText} contest={contest} />
            </Modal>

            <Modal isOpen={isResolveModalOpen} onClose={() => setIsResolveModalOpen(false)} title='Resolve Contest'>
                <ContestResolveModal resolvingEvent={resolvingEvent!} resolveContest={resolveContest} isPending={isPending} isConfirming={isConfirming} />
            </Modal>
        </div>
    )
}

const Contests: React.FC<{ contests: Contest[] }> = ({ contests }) => {
    const liveContests = contests.filter((contest) => contest.outcome === 0)
    const closedContests = contests.filter((contest) => contest.outcome === 1)

    return (
        <div style={styles.container}>
            <div style={{fontWeight: '600', fontSize: '20px', lineHeight:'28px'}}>Contests</div>
            <div style={{fontSize: '16px', lineHeight:'24px', color: '#636779'}}>View all created contests. Make decisions!</div>
            
            {/* Table Header */}
            <div style={styles.tableHeader}>
                <div style={styles.headerCell}>Chain</div>
                <div style={styles.headerCell}>Contest</div>
                <div style={styles.headerCell}>Odds</div>
                <div style={styles.headerCell}>Liquidity</div>
                <div style={{...styles.headerCell}}>Status</div>
                <div style={{...styles.headerCell, textAlign: 'center'}}>Decide Outcome</div>
            </div>

            {
                liveContests.length === 0 && closedContests.length === 0 ?
                    <span>...</span> :
                    <div style={styles.marketList}>
                        {liveContests.map((contest) => ( <ContestCard key={contest.resolver} contest={contest} /> ))}
                        {closedContests.map((contest) => ( <div key={contest.resolver} style={{fontStyle: 'italic', color: '#6B7280'}}><ContestCard contest={contest} /> </div> ))}
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

export default Contests;