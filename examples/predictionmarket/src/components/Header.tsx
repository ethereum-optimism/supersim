import React, { useState } from 'react';
import { useDisconnect } from 'wagmi';
import { Address } from 'viem';

import MarketCreateModal from './MarketCreateModal';
import Modal from './Modal';
import ChainLogo from './ChainLogo';

import personIcon from '../assets/person.svg';
import { PREDICTION_MARKET_CHAIN_ID } from '../constants/app';

interface HeaderProps {
    address: Address;
    activeTab: 'markets' | 'positions';
    setActiveTab: (tab: 'markets' | 'positions') => void;
}

const Header: React.FC<HeaderProps> = ({ address, activeTab, setActiveTab }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { disconnect } = useDisconnect();

    const addrStr = address ? address.slice(0, 5) + '...' + address.slice(-3) : '';
    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <ChainLogo chainId={BigInt(PREDICTION_MARKET_CHAIN_ID)} size='24px' />
                <div style={styles.title}>
                    <span style={{fontFamily: 'Sora', fontWeight: '600', fontSize: '24px'}}>SuperPredictor</span>
                </div>
                <div style={styles.navigation}>
                    <span
                        style={{
                            ...styles.navItem,
                            borderBottom: activeTab === 'markets' ? '4px solid #0F111A' : 'none',
                            fontWeight: activeTab === 'markets' ? '600' : '400',
                            color: activeTab === 'markets' ? '#0F111A' : '#64748B'
                        }}
                        onClick={() => setActiveTab('markets')}>
                        Markets
                    </span>
                    <span
                        style={{
                            ...styles.navItem,
                            borderBottom: activeTab === 'positions' ? '4px solid #0F111A' : 'none',
                            fontWeight: activeTab === 'positions' ? '600' : '400',
                            color: activeTab === 'positions' ? '#0F111A' : '#64748B'
                        }}
                        onClick={() => setActiveTab('positions')}>
                        My Positions
                    </span>
                </div>
            </div>
            
            <div style={styles.rightSection}>
                <div style={{borderRight: '1px solid #E2E8F0', paddingRight: '10px'}}>
                    <button style={styles.createButton} onClick={() => setIsModalOpen(true)}>Create Market</button>
                </div>

                <div style={{paddingLeft: '10px'}}>
                    <div style={styles.walletContainer}>
                        <img src={personIcon} style={{width: '14px', height: '14px'}} />
                        <span style={{fontSize: '14px'}}>{addrStr}</span>
                        <button style={styles.closeButton} onClick={() => disconnect()}>✕</button>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title='Create Market'>
                <MarketCreateModal />
            </Modal>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        width: '100%',
        padding: '0 20px',
        justifyContent: 'space-between',
        borderBottom: '1px solid #E2E8F0',
    },
    leftSection: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        gap: '5px'
    },
    rightSection: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        gap: '5px'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'default',
        marginLeft: '5px',
    },
    navigation: {
        display: 'flex', height: '100%',
        justifyContent: 'space-between',
        marginLeft: '24px',
        gap: '24px'
    },
    navItem: {
        display: 'flex', height: 'calc(100% - 4px)',
        cursor: 'pointer',
        alignItems: 'center',
    },
    createButton: {
        fontFamily: 'Sans-serif', fontWeight: '500', fontSize: '16px', lineHeight: '24px',
        color: 'white',
        backgroundColor: '#FF0420',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#e0041c',
        },
    },
    walletContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        gap: '8px',
        cursor: 'default',
        backgroundColor: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
    },
    walletButtonContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    closeButton: {
        border: 'none',
        background: 'none',
        color: 'black',
        fontSize: '14px',
        cursor: 'pointer',
        padding: '4px',
    },
};

export default Header;