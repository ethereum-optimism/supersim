import React from 'react';
import { Hex } from 'viem';

import { MessageIdentifier } from '@eth-optimism/viem';
import ChainLogo from './ChainLogo';
import { chainName } from '../utils/chain';
import { truncateAddress } from '../utils/address';

interface ContestResolveModalProps {
    resolvingEvent: { id: MessageIdentifier, payload: Hex}
    resolveContest: () => void
    isPending: boolean
    isConfirming: boolean
}

const ContestResolveModal: React.FC<ContestResolveModalProps> = ({resolvingEvent, resolveContest, isPending, isConfirming}) => {
    const { id, payload } = resolvingEvent
    return (
        <>
            <div style={styles.field}>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                    <span>Chain:</span>
                    <ChainLogo chainId={id.chainId} />
                    <span>{chainName(id.chainId)}</span>
                </div>
            </div>

            <div style={styles.field}>
                <div style={{display: 'flex', gap: '6px', marginBottom: '4px'}}>
                    <span>ID:</span>
                    <span style={{color: '#71717A'}}>Contract</span>
                    <span>{truncateAddress(id.origin)}</span>
                    <span style={{color: '#71717A'}}>Block Number</span>
                    <span>{id.blockNumber.toString()}</span>
                    <span style={{color: '#71717A'}}>Log Index</span>
                    <span>{id.logIndex.toString()}</span>
                </div>
                <div style={{display: 'flex', gap: '6px'}}>
                    <span>Log Data:</span>
                    <span>{payload.slice(0, 25)}...</span>
                </div>
            </div>

            <button 
                style={{ ...styles.resolveButton, opacity: isPending || isConfirming ? 0.5 : 1, cursor: isPending || isConfirming ? 'not-allowed' : 'pointer' }}
                onClick={() => resolveContest()}
                disabled={isPending || isConfirming}>
                {isPending || isConfirming ? 'Resolving...': 'Resolve'}
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

    resolveButton: {
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
}

export default ContestResolveModal