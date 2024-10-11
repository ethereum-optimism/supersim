import { Chain } from 'viem'

const ethCurrency = { name: 'Ethereum', symbol: 'ETH', decimals: 18 }

const supersimChainA: Chain = {
  id: 901,
  name: 'OPChainA',
  nativeCurrency: ethCurrency,
  rpcUrls: { default: { http: ['http://127.0.0.1:9545'] } },
}

const supersimChainB: Chain = {
  id: 902,
  name: 'OPChainB',
  nativeCurrency: ethCurrency,
  rpcUrls: { default: { http: ['http://127.0.0.1:9546'] } },
}

export { supersimChainA, supersimChainB };
