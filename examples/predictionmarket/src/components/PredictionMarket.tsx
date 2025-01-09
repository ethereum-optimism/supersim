import React, { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

import { useMarkets } from '../hooks/useMarkets';
import { useDeployment } from '../hooks/useDeployment';

import Connect from './Connect';
import Header from './Header';
import Markets from './Markets';
import Positions from './Positions';

import { PREDICTION_MARKET_CHAIN_ID } from '../constants/app';

const PredictionMarket: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'markets' | 'positions'>('markets');

    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();

    const { markets } = useMarkets();
    const { deployment } = useDeployment();

    if (!isConnected || !address || !deployment) {
        return (
            <div style={styles.app}>
                <Connect onConnect={() => connect({ chainId: PREDICTION_MARKET_CHAIN_ID, connector: connectors[0] })} />
            </div>
        )
    }

    const renderMain = () => {
        switch (activeTab) {
            case 'markets':
                return <Markets markets={markets} />;
            case 'positions':
                return <Positions markets={markets} />;
        }
    }

    return (
        <div style={styles.app}>
            <header style={styles.header}>
                <Header address={address} activeTab={activeTab} setActiveTab={setActiveTab} />
            </header>
            <main style={styles.main}>
                {renderMain()}
            </main>
        </div>
    )
}

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column' as const,
        height: '100vh',
        width: '100%',
        backgroundColor: '#FBFCFE',
    },
    header: {
        display: 'flex',
        height: '10%',
        width: '100%',
    },
    main: {
        paddingTop: '10px',
        alignSelf: 'center',
        width: '90%',
    }
}
       

export default PredictionMarket;