"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zircuitTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zircuitTestnet = (0, defineChain_js_1.defineChain)({
    id: 48899,
    name: 'Zircuit Testnet',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://zircuit1.p2pify.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Zircuit Explorer',
            url: 'https://explorer.zircuit.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 6040287,
        },
    },
});
//# sourceMappingURL=zircuitTestnet.js.map