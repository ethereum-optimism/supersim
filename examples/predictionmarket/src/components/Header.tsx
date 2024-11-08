import React, { useState } from 'react';
import CreateMarketModal from './CreateMarketModal';

interface HeaderProps {
    activeTab: 'markets' | 'positions';
    setActiveTab: (tab: 'markets' | 'positions') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <div style={styles.logo}>
                    <span style={styles.logoCircle}>op</span>
                    <span style={styles.logoText}>Superchain Predictors</span>
                </div>
            </div>
            
            <div style={styles.navigation}>
                <a href="#" style={styles.navLink} onClick={() => setActiveTab('markets')}>Live Markets</a>
                <a href="#" style={styles.navLink} onClick={() => setActiveTab('positions')}>My Positions</a>
            </div>
            
            <button style={styles.createButton} onClick={() => setIsModalOpen(true)}>Create Market</button>

            <CreateMarketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 20px',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    logoCircle: {
        backgroundColor: '#FF0420',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '50%',
        fontSize: '14px',
        fontWeight: 'bold' as const,
    },
    logoText: {
        fontWeight: 'bold',
        fontSize: '18px',
    },
    navigation: {
        display: 'flex',
        gap: '20px',
    },
    navLink: {
        textDecoration: 'none',
        color: '#666',
        padding: '8px 16px',
        borderRadius: '4px',
        ':hover': {
            backgroundColor: '#f5f5f5',
        },
    },
    createButton: {
        backgroundColor: '#FF0420',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold' as const,
        ':hover': {
            backgroundColor: '#e0041c',
        },
    },
};

export default Header;