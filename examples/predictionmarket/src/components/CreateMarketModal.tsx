import React, { useState } from 'react';
import { useBlockNumber } from 'wagmi';

import { useNewMockMarket, useNewBlockHashMarket, useNewTicTacToeMarket } from '../hooks/useNewMarket';
import { useTicTacToeGames } from '../hooks/useTicTacToeGames';
import { AcceptedGame, GameKey } from '../types/tictactoe';

interface CreateMarketModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateMarketModal: React.FC<CreateMarketModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'mock' | 'blockhash' | 'tictactoe'>('mock');

    if (!isOpen) return null;
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Create Market</h2>
                    <button style={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%', gap: '20px', marginBottom: '20px'}}>
                    <a href="#" style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}} onClick={() => setActiveTab('mock')}>Mock</a>
                    <a href="#" style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}} onClick={() => setActiveTab('blockhash')}>Block Hash</a>
                    <a href="#" style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}} onClick={() => setActiveTab('tictactoe')}>TicTacToe</a>
                </div>

                {activeTab === 'mock' ? <MockModal /> : activeTab === 'blockhash' ? <BlockHashModal /> : <TicTacToeModal />}
            </div>
        </div>
    );
};

const MockModal: React.FC<{}> = () => {
    const [liquidityAmount, setliquidityAmount] = useState('');
    const { newMockMarket, isPending, isConfirming } = useNewMockMarket()

    return (
        <div style={styles.content}>
            <div style={styles.field}>
                <label style={styles.label}>Liquidity <span style={styles.required}>*</span></label>
                <div style={styles.liquidityInput}>
                    <input
                        type="number"
                        value={liquidityAmount}
                        onChange={(e) => setliquidityAmount(e.target.value)}
                        style={styles.input}
                        placeholder="0.00" />
                    <span style={styles.ethLabel}>ETH</span>
                </div>
            </div>
            <button 
                style={styles.createButton}
                onClick={() => newMockMarket(Number(liquidityAmount) * 10 ** 18)}
                disabled={isPending || isConfirming}>
                {isPending || isConfirming ? 'Making market': 'Create Market'}
            </button>
        </div>
    )
}

const BlockHashModal: React.FC<{}> = () => {
    const [selectedChain, setSelectedChain] = useState<901 | 902>(901);
    const [liquidityAmount, setliquidityAmount] = useState('');

    const { newBlockHashMarket, isPending, isConfirming } = useNewBlockHashMarket()

    const [blockNumber, setBlockNumber] = useState<number>(0);
    const latestBlockNumber = useBlockNumber({ chainId: selectedChain }).data
    if (!latestBlockNumber) {
        return (
             <div style={{justifyContent: 'center', display: 'flex'}}>Unable to fetch block number</div>
        )
    }

    if (blockNumber < Number(latestBlockNumber)) {
        setBlockNumber(Number(latestBlockNumber) + 10)
    }

    return (
        <div style={styles.content}>
            <div style={styles.field}>
                <label style={styles.label}>Chain <span style={styles.required}>*</span></label>
                <select style={styles.select} value={selectedChain} onChange={(e) => setSelectedChain(Number(e.target.value))}>
                    <option value={901}>901</option>
                    <option value={902}>902</option>
                </select>
            </div>
            <div style={styles.field}>
                <label style={styles.label}>Block Number <span style={styles.required}>*</span></label>
                <select 
                    value={blockNumber} 
                    onChange={(e) => setBlockNumber(Number(e.target.value))} 
                    style={styles.select}>
                    {Array.from({ length: 5 }, (_, i) => Number(latestBlockNumber) + (i+1) * 10).map(block => (
                        <option key={block} value={block}>{block}</option>
                    ))}
                </select>
            </div>
            <div style={styles.field}>
                <label style={styles.label}>Liquidity <span style={styles.required}>*</span></label>
                <div style={styles.liquidityInput}>
                    <input
                        type="number"
                        value={liquidityAmount}
                        onChange={(e) => setliquidityAmount(e.target.value)}
                        style={styles.input}
                        placeholder="0.00" />
                    <span style={styles.ethLabel}>ETH</span>
                </div>
            </div>
            <button 
                style={styles.createButton}
                onClick={() => newBlockHashMarket(selectedChain, blockNumber, Number(liquidityAmount) * 10 ** 18)}
                disabled={isPending || isConfirming}>
                {isPending || isConfirming ? 'Making market': 'Create Market'}
            </button>
        </div>
    )
}

const TicTacToeModal: React.FC<{}> = () => {
    const [liquidityAmount, setliquidityAmount] = useState('');
    const [selectedGame, setSelectedGame] = useState<AcceptedGame | null>(null);

    const { availableGames } = useTicTacToeGames()
    const { newTicTacToeMarket, isPending, isConfirming } = useNewTicTacToeMarket()

    // TODO: Filter games with a market already created. Also filter resolved games
    return (
        <div style={styles.content}>
            <div style={styles.field}>
                <label style={styles.label}>Select Game <span style={styles.required}>*</span></label>
                <select
                    style={styles.select}
                    value={selectedGame?.key || ''}
                    onChange={(e) =>  {
                        setSelectedGame(availableGames[e.target.value as GameKey] || null)
                    }}>
                    <option value="">Select a game</option>
                    {Object.entries(availableGames).map(([key, _]) => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
            </div>
            <div style={styles.field}>
                <label style={styles.label}>Liquidity <span style={styles.required}>*</span></label>
                <div style={styles.liquidityInput}>
                    <input
                        type="number"
                        value={liquidityAmount}
                        onChange={(e) => setliquidityAmount(e.target.value)}
                        style={styles.input}
                        placeholder="0.00" />
                    <span style={styles.ethLabel}>ETH</span>
                </div>
            </div>
            <button 
                style={styles.createButton}
                onClick={() => selectedGame && newTicTacToeMarket(selectedGame, Number(liquidityAmount) * 10 ** 18)}
                disabled={isPending || isConfirming}>
                {isPending || isConfirming ? 'Making market': 'Create Market'}
            </button>
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
        marginBottom: '10px',
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
    select: {
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '12px',
    },
    chainOption: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    liquidityInput: {
        marginRight: '24px',
        position: 'relative' as const,
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