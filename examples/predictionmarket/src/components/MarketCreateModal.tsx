import React, { useState } from 'react';
import { useBlockNumber, useConfig } from 'wagmi';

import { useMarketCreation } from '../hooks/useMarketCreation';
import { useTicTacToeGames } from '../hooks/useTicTacToeGames';

import { AcceptedGame, GameKey } from '../types/tictactoe';
import { chainName } from '../utils/chain';

const MarketCreateModal: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'blockhash' | 'tictactoe' | null>(null);
    return (
        <>
            <div style={styles.field}>
                <label style={styles.label}>Select Market<span style={styles.required}>*</span></label>
                <div style={styles.nav}>
                    <button
                        onClick={() => setActiveTab('blockhash')}
                        style={{
                            ...styles.navItem,
                            ...(activeTab === 'blockhash' ? styles.navSelectedItem : {}),
                            borderRadius: '8px 0px 0px 8px',
                            borderRight: '1px solid #E2E8F0',
                        }}>
                        BlockBet
                    </button>
                    <button 
                        onClick={() => setActiveTab('tictactoe')}
                        style={{
                            ...styles.navItem,
                            ...(activeTab === 'tictactoe' ? styles.navSelectedItem : {}),
                            borderRadius: '0px 8px 8px 0px',
                            borderLeft: '1px solid #E2E8F0',
                        }}>
                        TicTacToe
                    </button>
                </div>
            </div>

            { activeTab ? activeTab === 'blockhash' ?  <BlockHashModal /> : <TicTacToeModal /> : null }
        </>
    );
};

const BlockHashModal: React.FC<{}> = () => {
    const [selectedChain, setSelectedChain] = useState<901 | 902 | 903>(901);
    const [liquidityAmount, setliquidityAmount] = useState('');

    const { newBlockHashMarket, isPending, isConfirming } = useMarketCreation()
    const { chains } = useConfig()

    const [blockNumber, setBlockNumber] = useState<number>(0);
    const { data: latestBlockNumber} = useBlockNumber({ chainId: selectedChain })

    const liquidity = liquidityAmount === '' ? 0 : Number(liquidityAmount) * 10 ** 18
    const disabled = blockNumber === 0 || liquidity <= 0 || isPending || isConfirming
    return (
        <>
            <div style={styles.field}>
                <label style={styles.label}>Chain<span style={styles.required}>*</span></label>
                <select style={styles.select} value={selectedChain} onChange={(e) => setSelectedChain(e.target.value as any)}>
                    {chains.map(chain => (
                        <option key={chain.id} value={chain.id}>{chainName(chain.id)}</option>
                    ))}
                </select>
            </div>
            <div style={styles.field}>
                <label style={styles.label}>Block Number<span style={styles.required}>*</span></label>
                <select 
                    value={blockNumber === 0 ? '' : blockNumber} 
                    onChange={(e) => setBlockNumber(Number(e.target.value))} 
                    style={styles.select}>
                    <option value=''>Select height</option>
                    {
                        !latestBlockNumber ? <></> :
                        Array.from({ length: 5 }, (_, i) => Number(latestBlockNumber) + (i+1) * 10).map(block => (
                            <option key={block} value={block}>{block}</option>))
                    }
                </select>
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Liquidity<span style={styles.required}>*</span></label>
                <div style={styles.liquidityInput}>
                    <input type="number" value={liquidityAmount} onChange={(e) => setliquidityAmount(e.target.value)} style={styles.input} placeholder="0.00" />
                    <span style={styles.ethLabel}>ETH</span>
                </div>
            </div>

            <button
                style={{ ...styles.createButton, opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }} 
                disabled={disabled}
                onClick={() => newBlockHashMarket(BigInt(selectedChain), BigInt(blockNumber), liquidity)}>
                {isPending || isConfirming ? 'Creating...' : 'Create Market'}
            </button>
        </>
    )
}

const TicTacToeModal: React.FC<{}> = () => {
    const [selectedGame, setSelectedGame] = useState<AcceptedGame | null>(null);
    const [liquidityAmount, setliquidityAmount] = useState('');

    const { newTicTacToeMarket, isPending, isConfirming } = useMarketCreation()
    const { availableGames } = useTicTacToeGames()

    // TODO: Filter games with a market already created. Also filter resolved games
    const liquidity = liquidityAmount === '' ? 0 : Number(liquidityAmount) * 10 ** 18
    const disabled = selectedGame === null || liquidity <= 0 || isPending || isConfirming
    return (
        <>
            <div style={styles.field}>
                <label style={styles.label}>Select Game<span style={styles.required}>*</span></label>
                <select
                    style={styles.select}
                    value={selectedGame?.key || ''}
                    onChange={(e) =>  {setSelectedGame(availableGames[e.target.value as GameKey] || null) }}>
                    <option value=''>Select a game</option>
                    {Object.entries(availableGames).map(([key, _]) => (
                        <option key={key} value={key}>ID: {key}</option>
                    ))}
                </select>
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Liquidity<span style={styles.required}>*</span></label>
                <div style={styles.liquidityInput}>
                    <input type="number" value={liquidityAmount} onChange={(e) => setliquidityAmount(e.target.value)} style={styles.input} placeholder="0.00" />
                    <span style={styles.ethLabel}>ETH</span>
                </div>
            </div>

            <button
                style={{ ...styles.createButton, opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }} 
                disabled={disabled}
                onClick={() => newTicTacToeMarket(selectedGame!, liquidity)}>
                {isPending || isConfirming ? 'Creating...' : 'Create Market'}
            </button>

        </>
    )
}

const styles = {
    nav: {
        display: 'flex', width: '100%',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    navItem: {
        flex: 1,
        padding: '8px 12px 8px 12px',
        backgroundColor: '#F8FAFC',
        fontSize: '16px',
        outline: 'none',
    },
    navSelectedItem: {
        backgroundColor: '#F2F3F8',
        opacity: 0.9,
        outline: 'none',
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
        marginLeft: '4px',
        color: '#FF0420',
    },
    select: {
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '12px',
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

export default MarketCreateModal; 