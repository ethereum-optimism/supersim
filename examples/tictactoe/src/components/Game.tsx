import React from 'react';

import ChainLogo from './ChainLogo';
import Board from './Board';

import { Game as GameType} from '../types/game';
import { truncateAddress } from '../utils/address';
import { chainName } from '../utils/chains';

interface GameProps {
  game: GameType
}

const Game: React.FC<GameProps> = ({ game }) => {
  const gameId = `${game.chainId}-${game.gameId}`
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <p style={styles.infoTitle}>Game ID:</p><p style={styles.infoValue}>{gameId}</p>

        <p style={styles.infoTitle}>Chain:</p>
        <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <ChainLogo chainId={BigInt(game.lastActionId.chainId)}/>
          <p style={styles.infoValue}>{chainName(Number(game.lastActionId.chainId))}</p>
        </span>

        <p style={styles.infoTitle}>Opponent:</p>
        <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <ChainLogo chainId={BigInt(game.opponentChainId!)}/>
          <p style={styles.infoValue}>{truncateAddress(game.opponent!)}</p>
        </span>
      </div>
      <Board game={game} />
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row' as 'row',
  },
  infoTitle: {
    fontSize: '14px',
    color: '#636779',
    marginRight: '4px',
  },
  infoValue: {
    fontSize: '14px',
    marginRight: '10px',
  },
}

export default Game;
