import React from 'react';

import { useContestPositions } from '../hooks/useContestPositions';
import { BlockHashContestStatus, TicTacToeContestStatus, useContestStatus } from '../hooks/useContestStatus';

import { Contest, ContestType } from '../types/contest';
import { chainName } from '../utils/chain';
import { truncateAddress } from '../utils/address';

import ChainLogo from './ChainLogo';

import personIcon from '../assets/person.svg';

const Position: React.FC<{ contest: Contest }> = ({ contest }) => {
    const { chainId, data } = useContestStatus(contest)
    const { positions, redeem, isPending, isConfirming } = useContestPositions(contest);

    if (!positions) return null;

    const isLive = contest.outcome === 0;

    // Factor in the LP balance
    const hasLP = positions.lpBalance > 0

    // Include tokens that this user would get for their LP tokens
    const yesBalance = positions.yesBalance + Number(contest.yesBalance) * positions.lpBalance / positions.lpSupply
    const noBalance = positions.noBalance + Number(contest.noBalance) * positions.lpBalance / positions.lpSupply

    const yesEthPayout = Number(contest.ethBalance) * yesBalance / positions.yesSupply
    const noEthPayout = Number(contest.ethBalance) * noBalance / positions.noSupply

    const yesText = contest.type === ContestType.BLOCKHASH ? 'Odd' : 'Win'
    const noText = contest.type === ContestType.BLOCKHASH ? 'Even' : 'Lose'

    const renderPayout = (outcome: string, amount: number, payout: number) => {
        // If this was redeemable and the user's balance is zero, that indicates that they redeemed
        const redeemable = {"Yes": Number(contest.outcome) === 1, "No": Number(contest.outcome) === 2, "LP": contest.outcome !== 0}[outcome]

        return (
            <div style={styles.positionCard}>
                <div style={styles.positionRow}>
                    <div style={{...styles.cell, flex: 0.8}}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', backgroundColor: isLive ? '#22C55E': '#E0E2EB', borderRadius: '50%' }}></span>
                            <span style={isLive ? {} : { fontStyle: 'italic', color: '#6b7280' }}>{isLive ? "Live" : "Ended"}</span>
                        </span>
                    </div>

                    <div style={styles.cell}><ChainLogo chainId={chainId}/><span style={{marginLeft: '6px'}}>{chainName(chainId)}</span></div>

                    <div style={styles.cell}>
                        {contest.type === ContestType.BLOCKHASH ? (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                                <span style={{fontSize: '12px', lineHeight: '16px', color: '#636779'}}>BlockHeight</span>
                                <span style={{fontSize: '16px', lineHeight: '24px'}}>{(data as BlockHashContestStatus).targetBlockNumber.toString()}</span>
                            </div>
                        ) : (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                                <span style={{fontSize: '12px', lineHeight: '16px', color: '#636779'}}>TicTacToe: 901-0</span>
                                <span style={{fontSize: '16px', lineHeight: '24px'}}>
                                    <img src={personIcon} style={{width: '14px', height: '14px', marginRight: '4px'}} />
                                    {truncateAddress((data as TicTacToeContestStatus).player)}
                                </span>
                            </div>
                        )}
                    </div>

                    <div style={styles.cell}>{outcome === "Yes" ? yesText : noText}</div>

                    <div style={styles.cell}>{(amount / 10 ** 18).toFixed(2)} ETH</div>
                    <div style={{...styles.cell, color: '#0DA529'}}>{(payout/10 ** 18).toFixed(2)} ETH</div>

                    <div style={{...styles.cell, display: 'flex', justifyContent: 'center'}}>
                        {
                            isLive ? <span style={{ fontStyle: 'italic', color: '#6b7280' }}>-</span> :
                            !redeemable ?  <span style={{ fontStyle: 'italic', color: '#6b7280' }}>Lost</span> :
                            <button
                                style={{...styles.redeemButton, opacity: isPending || isConfirming ? 0.5 : 1, cursor: isPending || isConfirming ? 'not-allowed' : 'pointer'}}
                                onClick={() => redeem(contest.resolver, hasLP)}
                                disabled={isPending || isConfirming}>
                                {isPending || isConfirming ? 'Redeeming...' : 'Redeem'}
                            </button>
                        }
                    </div>
                </div>
            </div>
        )
    }

    // TODO: Fix the conditional with pure LP positions
    return (
        <div>
            {yesBalance > 0 && renderPayout("Yes", positions.yesTotalEth, yesEthPayout)}
            {noBalance > 0 && renderPayout("No", positions.noTotalEth, noEthPayout)}
        </div>
    );
}

const Positions: React.FC<{ contests: Contest[] }> = ({ contests }) => {
    const liveContests = contests.filter((contest) => contest.outcome === 0)
    const closedContests = contests.filter((contest) => contest.outcome !== 0)

    return (
        <div style={styles.container}>
            <div style={{fontWeight: '600', fontSize: '20px', lineHeight:'28px'}}>Positions</div>
            <div style={{fontSize: '16px', lineHeight:'24px', color: '#636779'}}>Track your active and redeemable positions</div>

            {/* Table Header */}
            <div style={styles.tableHeader}>
                <div style={{...styles.headerCell, flex: 0.8}}>Status</div>
                <div style={styles.headerCell}>Chain</div>
                <div style={styles.headerCell}>Contest</div>
                <div style={styles.headerCell}>Outcome</div>
                <div style={styles.headerCell}>Decision</div>
                <div style={styles.headerCell}>Payout</div>
                <div style={{...styles.headerCell, display: 'flex', justifyContent: 'center'}}>Result</div>
            </div>

            {/* Position List */}
            <div style={styles.positionsList}>
                {liveContests.length === 0  && closedContests.length === 0 ?
                    <span>...</span>:
                    <div>
                        {liveContests.map((contest) => ( <Position key={contest.resolver} contest={contest} />))}
                        {closedContests.map((contest) => ( <div key={contest.resolver} style={{fontStyle: 'italic', color: '#6b7280'}}><Position contest={contest} /></div>))}
                    </div>
                }
            </div>
        </div>
    )
}

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
    positionsList: {
        display: 'flex',
        flexDirection: 'column' as const,
    },
    positionCard: {
        paddingTop: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid #E2E8F0',
    },
    positionRow: {
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
    redeemButton: {
        width: '80%',
        backgroundColor: '#D6FFDA',
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '500',
        color: '#0DA529',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.2s',
        outline: 'none', // Removes the blue focus outline
    },
}

export default Positions;