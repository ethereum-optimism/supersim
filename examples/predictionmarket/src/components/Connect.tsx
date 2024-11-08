import React from 'react';

import superpredict from '../assets/superpredict.png';

interface ConnectProps {
  onConnect: () => void;
}

const Connect: React.FC<ConnectProps> = ({ onConnect }) => {
  return (
      <div style={styles.content}>
        <div style={styles.header}>
          <img src={superpredict} style={{width: '45px', height: '45px'}} />
          <div style={styles.title}>SuperPredictor</div>
          <div style={styles.subtitle}>Superchain prediction market app</div>
        </div>

        <button onClick={onConnect} style={styles.button}>Connect Wallet</button>
      </div>
  );
};

const styles = {
  content: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center', alignItems: 'center',
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
};

export default Connect;