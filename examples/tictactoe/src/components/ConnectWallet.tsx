import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const ConnectWallet: React.FC = () => {
  const { isConnected, address, chainId } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
        <div className="connected-wallet" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ textAlign: 'left' }}>
                <div>Chain ID: {chainId}</div>
                <div>Address: {address.slice(0, 6)}...{address.slice(-4)}</div>
            </div>
            <button onClick={() => disconnect()} style={{ marginLeft: '20px' }}>Disconnect</button>
        </div>
    )
  }

  return (
    <button onClick={() => connect({ connector: connectors[0] })}>
      Connect
    </button>
  )
}

export default ConnectWallet
