import React from 'react';
import TicTacToeLogo from './TicTacToeLogo';

interface ConnectProps {
  onConnect: () => void;
}

const Connect: React.FC<ConnectProps> = ({ onConnect }) => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <TicTacToeLogo width="48" height="48" />
        <h1 style={styles.title}>Play Tic Tac Toe</h1>
        <h2 style={styles.subtitle}>Superchain Edition</h2>
        <button onClick={onConnect} style={styles.button}>
          Connect Wallet to play
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#F2F3F8',
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '20px 0 0',
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: 'normal',
    margin: '10px 0 30px',
  },
  button: {
    backgroundColor: '#FF0420',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Connect;

