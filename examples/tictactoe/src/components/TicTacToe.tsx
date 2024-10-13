import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { truncateAddress } from '../utils/address';

import Connect from './Connect';
import GameControls from './GameControls';
import TicTacToeLogo from '../assets/TicTacToeLogo';

const TicTacToe: React.FC = () => {
  const { address, chainId, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return <Connect onConnect={() => connect({ connector: connectors[0] })} />
  }

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>
              <TicTacToeLogo />
            </span>
            Tic Tac Toe
          </div>
          <div style={styles.chainInfo}>
            <span>Chain ID: {chainId} 🔴</span>
            <div style={styles.addressContainer}>
              <span>Address: {truncateAddress(address!)}</span>
              <button onClick={() => disconnect()} style={styles.disconnectButton}>✕</button>
            </div>
          </div>
        </header>
        <main style={styles.main}>
          <div style={styles.leftContainer}>
            <GameControls />
          </div>
          <div style={styles.rightContainer}>
            {/* Right container content will go here */}
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  outerContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    minHeight: '100vh',
    margin: '0 auto',
    padding: '30px 100px 60px', // Removed top padding, increased bottom padding
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0', // Added padding to the header instead
    marginBottom: '20px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold' as 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: '10px',
  },
  chainInfo: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'flex-end',
  },
  main: {
    display: 'flex',
    gap: '25px',
    flex: 1,
    paddingTop: '20px',
    minHeight: 0,
  },
  leftContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto' as 'auto',
  },
  rightContainer: {
    flex: 4,
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto' as 'auto',
  },
  addressContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  disconnectButton: {
    marginLeft: '10px',
    background: 'none',
    border: 'none',
    color: '#FF5722',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '0 5px',
  },
};

export default TicTacToe;
