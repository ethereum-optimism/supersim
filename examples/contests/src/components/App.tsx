import React, { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

import { useContests } from '../hooks/useContests';
import { useDeployment } from '../hooks/useDeployment';

import Connect from './Connect';
import Header from './Header';
import Contests from './Contests';
import Positions from './Positions';

import { CONTESTS_CHAIN_ID } from '../constants/app';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'contests' | 'positions'>('contests');

    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();

    const { contests } = useContests();
    const { deployment } = useDeployment();

    if (!isConnected || !address || !deployment) {
        return (
            <div style={styles.app}>
                <Connect onConnect={() => connect({ chainId: CONTESTS_CHAIN_ID, connector: connectors[0] })} />
            </div>
        )
    }

    const renderMain = () => {
        switch (activeTab) {
            case 'contests':
                return <Contests contests={contests} />;
            case 'positions':
                return <Positions contests={contests} />;
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
       

export default App;