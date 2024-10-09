"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soneiumMinato = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.soneiumMinato = (0, defineChain_js_1.defineChain)({
    id: 1946,
    name: 'Soneium Minato',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.minato.soneium.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Minato Explorer',
            url: 'https://explorer-testnet.soneium.org',
            apiUrl: 'https://explorer-testnet.soneium.org/api/',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 1,
        },
    },
    testnet: true,
});
//# sourceMappingURL=soneiumMinato.js.map