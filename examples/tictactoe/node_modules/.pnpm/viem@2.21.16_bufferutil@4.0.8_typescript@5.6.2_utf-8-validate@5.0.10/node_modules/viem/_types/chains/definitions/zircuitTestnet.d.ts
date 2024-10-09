export declare const zircuitTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Zircuit Explorer";
            readonly url: "https://explorer.zircuit.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 6040287;
        };
    };
    id: 48899;
    name: "Zircuit Testnet";
    nativeCurrency: {
        readonly name: "ETH";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://zircuit1.p2pify.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=zircuitTestnet.d.ts.map