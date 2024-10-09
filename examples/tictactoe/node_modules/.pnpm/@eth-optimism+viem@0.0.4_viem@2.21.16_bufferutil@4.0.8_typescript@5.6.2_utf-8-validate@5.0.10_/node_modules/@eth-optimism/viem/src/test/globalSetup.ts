import { setupTicTacToe } from '@/test/setupTicTacToe.js'

import { startSupersim } from './startSupersim.js'

async function main() {
  const shutdown = await startSupersim()
  await setupTicTacToe()

  return () => {
    shutdown()
  }
}

export default main
