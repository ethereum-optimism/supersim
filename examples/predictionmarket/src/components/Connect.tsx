import React from 'react';

interface ConnectProps {
  onConnect: () => void;
}

const Connect: React.FC<ConnectProps> = ({ onConnect }) => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Superchain Prediction Market App</h1>
        <button onClick={onConnect} style={styles.button}>Connect Wallet </button>
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
    color: 'black',
    margin: '20px 0 30px',
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: 'normal',
    color: 'black',
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