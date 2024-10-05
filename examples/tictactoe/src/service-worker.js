import { createMemoryClient, http } from 'tevm'
import { base,  optimism, mainnet } from 'tevm/common'

// Initialize the tevm forks right away
const tevmForks = {
  // TODO we might not even need mainnet?
  mainnet: createMemoryClient({
    common: mainnet,
    fork: {
      transport: http(import.meta.env.RPC_URL_MAINNET || mainnet.rpcUrls.default.http[0])
    },
    // set mining config to auto to match anvil defaults
    miningConfig: {
        type: 'auto'
    }
  }),
  optimism: createMemoryClient({
    common: optimism,
    fork: {
      transport: http(import.meta.env.RPC_URL_OPTIMISM || optimism.rpcUrls.default.http[0])
    },
    miningConfig: {
        type: 'auto'
    }
  }),
  base: createMemoryClient({
    common: base,
    fork: {
      transport: http(import.meta.env.RPC_URL_BASE || base.rpcUrls.default.http[0])
    },
    miningConfig: {
        type: 'auto'
    }
  })
}

// add event listeners just to help with debugging
for (const [name, tevm] of Object.entries(tevmForks)) {
    tevm.transport.tevm.on('connect', tx => {
        // note we don't need to wait for this tevm implicitly will wait before processing requests
        console.log(name, 'forking initialization complete', tx)
    })
    tevm.transport.tevm.on('newPendingTransaction', tx => {
        console.log(name, 'newPendingTransaction', tx)
    })
    tevm.transport.tevm.on('newReceipt', tx => {
        console.log(name, 'newReceipt', tx)
    })
}

async function startSupersim () {
    console.log('Todo compile supersim to wasm and start it here')
    // NOTE: supersim should expect that tevm is already started unlike the anvil one
    // it might be easier to do the setStorage etc. stuff here rather than in supersim as follows
    await tevmForks.optimism.setStorageAt({
        address: `0x${'0'.repeat(40)}`,
        index: '0x420',
        value: '0x420'
    })
}
startSupersim()

// TODO I made these up without checking we should change this to the actual ports being used
const tevmForksByPort = {
    8545: tevmForks.mainnet,
    9545: tevmForks.optimism,
    8546: tevmForks.base
}

// If the web app makes a request to local host we process the json rpc request with tevm instead
self.addEventListener('fetch', async (event) => {
    const url = new URL(event.request.url);
    if (url.hostname === 'localhost' ) {
      const tevm = tevmForksByPort[url.port];
      if (!tevm) throw new Error('No Tevm fork found for port ' + url.port);
      const request = await event.request.json()
      const response = await tevm.request(request)
      event.respondWith(
        response
      );
    }
  });
  
  self.addEventListener('install', (event) => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
  });