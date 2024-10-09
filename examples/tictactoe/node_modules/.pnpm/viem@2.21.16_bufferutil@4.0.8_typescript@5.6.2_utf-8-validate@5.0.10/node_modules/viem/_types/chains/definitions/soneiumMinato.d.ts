export declare const soneiumMinato: {
    blockExplorers: {
        readonly default: {
            readonly name: "Minato Explorer";
            readonly url: "https://explorer-testnet.soneium.org";
            readonly apiUrl: "https://explorer-testnet.soneium.org/api/";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 1;
        };
    };
    id: 1946;
    name: "Soneium Minato";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.minato.soneium.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=soneiumMinato.d.ts.map