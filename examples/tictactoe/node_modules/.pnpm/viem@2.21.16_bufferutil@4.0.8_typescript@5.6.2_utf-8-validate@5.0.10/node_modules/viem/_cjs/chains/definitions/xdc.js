"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xdc = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.xdc = (0, defineChain_js_1.defineChain)({
    id: 50,
    name: 'XinFin Network',
    nativeCurrency: {
        decimals: 18,
        name: 'XDC',
        symbol: 'XDC',
    },
    rpcUrls: {
        default: { http: ['https://rpc.xinfin.network'] },
    },
    blockExplorers: {
        default: {
            name: 'Blocksscan',
            url: 'https://xdc.blocksscan.io',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 71542788,
        },
    },
});
//# sourceMappingURL=xdc.js.map