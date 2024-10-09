"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lisk = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.lisk = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 1135,
    name: 'Lisk',
    network: 'lisk',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.api.lisk.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://blockscout.lisk.com',
            apiUrl: 'https://blockscout.lisk.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xA9d71E1dd7ca26F26e656E66d6AA81ed7f745bf0',
        },
    },
});
//# sourceMappingURL=lisk.js.map