import React, { useState } from 'react';

import { useBuyOutcome } from '../hooks/useBuyOutcome';
import { BlockHashContestStatus, TicTacToeContestStatus } from '../hooks/useContestStatus';

import { Contest, ContestType } from '../types/contest';
import { chainName } from '../utils/chain';
import { truncateAddress } from '../utils/address';

import ProgressBar from './ProgressBar';
import ChainLogo from './ChainLogo';

interface ContestBuyOutcomeModalProps {
    chainId: bigint,
    data: BlockHashContestStatus | TicTacToeContestStatus

    isYes: boolean,
    yesOdds: number,

    yesText: string,
    noText: string,

    contest: Contest;
}

const ContestBuyOutcomeModal: React.FC<ContestBuyOutcomeModalProps> = ({ chainId, data, isYes, yesOdds, yesText, noText, contest }) => {
    const [betAmount, setBetAmount] = useState('');
    const [selectedOutcome, setSelectedOutcome] = useState(isYes ? 1 : 2);

    const { buyOutcome, isPending, isConfirming } = useBuyOutcome();

    const odds = selectedOutcome === 1 ? yesOdds : 1 - yesOdds

    const bet = betAmount === '' ? 0 : Number(betAmount) * 10 ** 18
    const disabled = bet <= 0 || isPending || isConfirming
    return (
        <>
            <div style={{...styles.field, borderBottom: '1px solid #e0e0e0'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '6px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '16px', lineHeight: '24px'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                            <span style={{color: '#71717A'}}>Chain</span>
                            <ChainLogo chainId={chainId} />
                            <span>{chainName(chainId)}</span>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                            <span style={{color: '#71717A'}}>{contest.type === ContestType.BLOCKHASH ? 'Block Height' : 'TicTacToe'}</span>
                            { contest.type === ContestType.BLOCKHASH ?
                                (<span>{(data as BlockHashContestStatus).targetBlockNumber.toString()}</span>) :
                                (<span>{chainId.toString()}-{(data as TicTacToeContestStatus).gameId.toString()}, <span><span style={{color: '#71717A'}}>Player </span>{truncateAddress((data as TicTacToeContestStatus).player)}</span></span>)
                            }
                        </div>
                    </div>

                    <ProgressBar width='98px' height='60px'progress={odds} />
                </div>
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Bet Outcome <span style={styles.required}>*</span></label>
                <div style={{fontSize: '14px', lineHeight: '20px', color: '#71717A'}}>
                    {
                        contest.type === ContestType.BLOCKHASH ?
                        'Pick if the block hash is even or odd when mined' :
                        'Pick the player\'s outcome for the game'
                    }
                </div>
                <div style={styles.outcomeButtons}>
                    <button 
                        style={{ ...styles.outcomeButton, borderRadius: '8px 0px 0px 8px', ...(selectedOutcome === 1 ? { backgroundColor: '#0DA529', color: 'white' } : {}) }} 
                        onClick={() => setSelectedOutcome(1)}>{yesText}</button>
                    <button 
                        style={{ ...styles.outcomeButton, borderRadius: '0px 8px 8px 0px', ...(selectedOutcome === 2 ? { backgroundColor: '#F15A24', color: 'white' } : {}) }} 
                        onClick={() => setSelectedOutcome(2)}>{noText}</button>
                </div>
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Amount <span style={styles.required}>*</span></label>
                <div style={styles.liquidityInput}>
                    <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        style={styles.input}
                        placeholder="0.00"
                    />
                    <span style={styles.ethLabel}>ETH</span>
                </div>
            </div>

            <button 
                style={{ ...styles.createButton, opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
                onClick={() => buyOutcome(contest.resolver, selectedOutcome, bet)}
                disabled={disabled}>
                {isPending || isConfirming ? 'Buying outcome': 'Buy Outcome'}
            </button>
        </>
    )
}

const styles = {
    field: {
        display: 'flex',
        gap: '2px',
        flexDirection: 'column' as const,
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: 0, padding: 0,
    },
    required: {
        color: '#FF0420',
    },
    liquidityInput: {
        marginRight: '24px',
        position: 'relative' as const,
    },
    ethLabel: {
        position: 'absolute' as const,
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#666',
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
        padding: '12px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '16px',
    },
    createButton: {
        backgroundColor: '#FF0420',
        color: 'white',
        border: 'none',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        lineHeight: '24px',
        cursor: 'pointer',
        marginTop: '12px',
    },
    outcomeButtons: {
        display: 'flex',
        width: '100%',
        marginTop: '8px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    outcomeButton: {
        flex: 1,
        padding: '12px',
        border: 'none',
        backgroundColor: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        outline: 'none',
    },
}

export default ContestBuyOutcomeModal;