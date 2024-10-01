import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const ConnectWallet: React.FC = () => {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return <button onClick={() => disconnect()}>Disconnect</button>
  }

  return (
    <button onClick={() => connect({ connector: connectors[0] })}>
      Connect
    </button>
  )
}

export default ConnectWallet
