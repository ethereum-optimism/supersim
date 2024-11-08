import React, { useState } from 'react';

interface CreateMarketModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateMarketModal: React.FC<CreateMarketModalProps> = ({ isOpen, onClose }) => {
    const [selectedChain] = useState('Base');
    const [blockNumber, setBlockNumber] = useState('');
    const [outcome, setOutcome] = useState<'Even' | 'Odd' | null>(null);
    const [stakeAmount, setStakeAmount] = useState('');

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Create Market</h2>
                    <button style={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div style={styles.content}>
                    <div style={styles.field}>
                        <label style={styles.label}>
                            Select Chain <span style={styles.required}>*</span>
                        </label>
                        <div style={styles.select}>
                            <div style={styles.chainOption}>
                                <span>Base</span>
                            </div>
                        </div>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>
                            Select Block number <span style={styles.required}>*</span>
                        </label>
                        <div style={styles.blockInput}>
                            <input
                                type="number"
                                value={blockNumber}
                                onChange={(e) => setBlockNumber(e.target.value)}
                                style={styles.input}
                            />
                            <div style={styles.blockControls}>
                                <button style={styles.blockButton}>+</button>
                                <button style={styles.blockButton}>−</button>
                            </div>
                        </div>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>
                            Bet outcome <span style={styles.required}>*</span>
                        </label>
                        <div style={styles.outcomeButtons}>
                            <button 
                                style={{
                                    ...styles.outcomeButton,
                                    ...(outcome === 'Even' ? styles.selectedOutcome : {})
                                }}
                                onClick={() => setOutcome('Even')}
                            >
                                Even
                            </button>
                            <button 
                                style={{
                                    ...styles.outcomeButton,
                                    ...(outcome === 'Odd' ? styles.selectedOutcome : {})
                                }}
                                onClick={() => setOutcome('Odd')}
                            >
                                Odd
                            </button>
                        </div>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>
                            Stake Amount <span style={styles.required}>*</span>
                        </label>
                        <div style={styles.stakeInput}>
                            <input
                                type="number"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                                style={styles.input}
                                placeholder="0.00"
                            />
                            <span style={styles.ethLabel}>ETH</span>
                        </div>
                    </div>

                    <button style={styles.createButton}>Create bet</button>
                </div>
            </div>
        </div>
    );
};

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
    select: {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '12px',
    },
    chainOption: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '16px',
    },
    blockInput: {
        display: 'flex',
        gap: '8px',
    },
    blockControls: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '4px',
    },
    blockButton: {
        padding: '4px 8px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    outcomeButtons: {
        display: 'flex',
        gap: '12px',
    },
    outcomeButton: {
        flex: 1,
        padding: '12px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: 'white',
        cursor: 'pointer',
    },
    selectedOutcome: {
        backgroundColor: '#FF0420',
        color: 'white',
        border: 'none',
    },
    stakeInput: {
        position: 'relative' as const,
    },
    ethLabel: {
        position: 'absolute' as const,
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#666',
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
};

export default CreateMarketModal; 