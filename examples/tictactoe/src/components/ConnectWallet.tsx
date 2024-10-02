import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const ConnectWallet: React.FC = () => {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
        <div className="connected-wallet">
        <span>Connected: {address.slice(0, 6)}...{address.slice(-4)}</span>
        <button onClick={() => disconnect()}>Disconnect</button>
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
