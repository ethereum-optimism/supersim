import React, { useState } from 'react';
import { usePlaceBet } from '../hooks/usePlaceBet';

interface PlaceBetModalProps {
    isOpen: boolean;
    isYes: boolean;
    market: any;
    onClose: () => void;
}

const PlaceBetModal: React.FC<PlaceBetModalProps> = ({ isOpen, isYes, market, onClose }) => {
    const [betAmount, setBetAmount] = useState('');
    const { placeBet, isPending, isConfirming } = usePlaceBet();

    if (!isOpen) return null;
    
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Place Bet ({isYes ? 'Yes' : 'No'})</h2>
                    <button style={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div style={styles.content}>
                    <div style={styles.field}>
                        <label style={styles.label}>Amount <span style={styles.required}>*</span></label>
                        <div style={styles.amountInput}>
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
                        style={styles.createButton}
                        onClick={() => placeBet(market.resolver, isYes ? 1 : 2, Number(betAmount))}>
                        {isPending || isConfirming ? 'Placing bet': 'Place Bet'}
                    </button>

                </div>
            </div>
        </div>
    )
}

const styles = {
    overlay: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        padding: '24px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
    },
    closeButton: {
        border: 'none',
        background: 'none',
        color: 'black',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '4px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px',
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold',
    },
    required: {
        color: '#FF0420',
    },
    amountInput: {
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
        cursor: 'pointer',
        marginTop: '12px',
    },
}

export default PlaceBetModal;