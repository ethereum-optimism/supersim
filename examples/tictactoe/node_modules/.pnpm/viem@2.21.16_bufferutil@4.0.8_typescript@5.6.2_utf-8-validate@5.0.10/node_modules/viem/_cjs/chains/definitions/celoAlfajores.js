"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.celoAlfajores = void 0;
const chainConfig_js_1 = require("../../celo/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.celoAlfajores = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 44_787,
    name: 'Alfajores',
    nativeCurrency: {
        decimals: 18,
        name: 'CELO',
        symbol: 'A-CELO',
    },
    rpcUrls: {
        default: {
            http: ['https://alfajores-forno.celo-testnet.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Celo Explorer',
            url: 'https://explorer.celo.org/alfajores',
            apiUrl: 'https://explorer.celo.org/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 14569001,
        },
    },
    testnet: true,
});
//# sourceMappingURL=celoAlfajores.js.map