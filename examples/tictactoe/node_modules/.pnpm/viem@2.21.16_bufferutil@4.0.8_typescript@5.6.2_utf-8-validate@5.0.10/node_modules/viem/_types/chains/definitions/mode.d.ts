export declare const mode: {
    blockExplorers: {
        readonly default: {
            readonly name: "Modescan";
            readonly url: "https://modescan.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 2465882;
        };
        readonly l2OutputOracle: {
            readonly 1: {
                readonly address: "0x4317ba146D4933D889518a3e5E11Fe7a53199b04";
            };
        };
        readonly portal: {
            readonly 1: {
                readonly address: "0x8B34b14c7c7123459Cf3076b8Cb929BE097d0C07";
            };
        };
        readonly l1StandardBridge: {
            readonly 1: {
                readonly address: "0x735aDBbE72226BD52e818E7181953f42E3b0FF21";
            };
        };
    };
    id: 34443;
    name: "Mode Mainnet";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.mode.network"];
        };
    };
    sourceId: 1;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=mode.d.ts.map