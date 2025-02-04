import React from 'react';
import { useAccount } from 'wagmi';

import supercontests from '../assets/supercontests.png';
import { useDeployment } from '../hooks/useDeployment';

const Connect: React.FC<{onConnect: () => void}> = ({ onConnect }) => {
  const { isConnected } = useAccount();
  const { deployment, error } = useDeployment();

  const render = () => {
    if (error) {
      return (
        <div style={styles.errorContainer}>
          <div style={styles.errorTitle}>Error Parsing Deployments</div>
          <div style={styles.errorMessage}>{error}</div>
        </div>
      )
    }

    if(!deployment) {
      return (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingTitle}>Loading</div>
          <div style={styles.loadingMessage}>Fetching deployment addresses...</div>
        </div>
      )
    }

    return (
      <button
        style={{...styles.button, opacity: isConnected ? 0.5 : 1, cursor: isConnected ? 'not-allowed' : 'pointer'}}
        disabled={isConnected}
        onClick={onConnect}>
        Connect Wallet
      </button>
    )
  }
  return (
    <div style={styles.content}>
      <div style={styles.container}>
        <div style={styles.header}>
          <img src={supercontests} style={{width: '45px', height: '45px'}} />
          <div style={styles.title}>SuperContests</div>
          <div style={styles.subtitle}>Superchain Contests</div>
        </div>
        {render()}
      </div>
    </div>
  );
};

const styles = {
  content: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', // Light gray background
  },
  container: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    minWidth: '320px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontFamily: 'Sora',
    lineHeight: '32px',
    color: 'black',
  },
  subtitle: {
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: '600',
    color: '#0F111A',
  },
  button: {
    backgroundColor: '#FF0420',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 24px',
    fontFamily: 'Sans-serif',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    border: '1px solid #FCA5A5',
    borderRadius: '8px',
    padding: '16px 24px',
    maxWidth: '400px',
    textAlign: 'center' as const,
  },
  errorTitle: {
    color: '#DC2626',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
  },
  errorMessage: {
    color: '#7F1D1D',
    fontSize: '14px',
    lineHeight: '20px',
  },
  loadingContainer: {
    backgroundColor: '#f0f9ff',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #bae6fd',
    textAlign: 'center' as const,
    maxWidth: '300px',
    margin: '0 auto'
  },
  loadingTitle: {
    color: '#0369a1',
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '8px'
  },
  loadingMessage: {
    color: '#0c4a6e',
    fontSize: '14px'
  }
};

export default Connect;