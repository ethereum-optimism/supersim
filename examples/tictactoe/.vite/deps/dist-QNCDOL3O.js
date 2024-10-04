import {
  require_events
} from "./chunk-XCT47EJG.js";
import {
  __commonJS
} from "./chunk-MSFXBLHD.js";

// node_modules/.pnpm/@safe-global+safe-apps-provider@0.18.3_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-provider/dist/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-apps-provider@0.18.3_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-provider/dist/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLowerCase = void 0;
    function getLowerCase(value) {
      if (value) {
        return value.toLowerCase();
      }
      return value;
    }
    exports.getLowerCase = getLowerCase;
  }
});

// node_modules/.pnpm/@safe-global+safe-apps-provider@0.18.3_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-provider/dist/provider.js
var require_provider = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-apps-provider@0.18.3_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-provider/dist/provider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SafeAppProvider = void 0;
    var events_1 = require_events();
    var utils_1 = require_utils();
    var SafeAppProvider = class extends events_1.EventEmitter {
      constructor(safe, sdk) {
        super();
        this.submittedTxs = /* @__PURE__ */ new Map();
        this.safe = safe;
        this.sdk = sdk;
      }
      async connect() {
        this.emit("connect", { chainId: this.chainId });
        return;
      }
      async disconnect() {
        return;
      }
      get chainId() {
        return this.safe.chainId;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async request(request) {
        const { method, params = [] } = request;
        switch (method) {
          case "eth_accounts":
            return [this.safe.safeAddress];
          case "net_version":
          case "eth_chainId":
            return `0x${this.chainId.toString(16)}`;
          case "personal_sign": {
            const [message, address] = params;
            if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase()) {
              throw new Error("The address or message hash is invalid");
            }
            const response = await this.sdk.txs.signMessage(message);
            const signature = "signature" in response ? response.signature : void 0;
            return signature || "0x";
          }
          case "eth_sign": {
            const [address, messageHash] = params;
            if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase() || !messageHash.startsWith("0x")) {
              throw new Error("The address or message hash is invalid");
            }
            const response = await this.sdk.txs.signMessage(messageHash);
            const signature = "signature" in response ? response.signature : void 0;
            return signature || "0x";
          }
          case "eth_signTypedData":
          case "eth_signTypedData_v4": {
            const [address, typedData] = params;
            const parsedTypedData = typeof typedData === "string" ? JSON.parse(typedData) : typedData;
            if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase()) {
              throw new Error("The address is invalid");
            }
            const response = await this.sdk.txs.signTypedMessage(parsedTypedData);
            const signature = "signature" in response ? response.signature : void 0;
            return signature || "0x";
          }
          case "eth_sendTransaction":
            const tx = {
              ...params[0],
              value: params[0].value || "0",
              data: params[0].data || "0x"
            };
            if (typeof tx.gas === "string" && tx.gas.startsWith("0x")) {
              tx.gas = parseInt(tx.gas, 16);
            }
            const resp = await this.sdk.txs.send({
              txs: [tx],
              params: { safeTxGas: tx.gas }
            });
            this.submittedTxs.set(resp.safeTxHash, {
              from: this.safe.safeAddress,
              hash: resp.safeTxHash,
              gas: 0,
              gasPrice: "0x00",
              nonce: 0,
              input: tx.data,
              value: tx.value,
              to: tx.to,
              blockHash: null,
              blockNumber: null,
              transactionIndex: null
            });
            return resp.safeTxHash;
          case "eth_blockNumber":
            const block = await this.sdk.eth.getBlockByNumber(["latest"]);
            return block.number;
          case "eth_getBalance":
            return this.sdk.eth.getBalance([(0, utils_1.getLowerCase)(params[0]), params[1]]);
          case "eth_getCode":
            return this.sdk.eth.getCode([(0, utils_1.getLowerCase)(params[0]), params[1]]);
          case "eth_getTransactionCount":
            return this.sdk.eth.getTransactionCount([(0, utils_1.getLowerCase)(params[0]), params[1]]);
          case "eth_getStorageAt":
            return this.sdk.eth.getStorageAt([(0, utils_1.getLowerCase)(params[0]), params[1], params[2]]);
          case "eth_getBlockByNumber":
            return this.sdk.eth.getBlockByNumber([params[0], params[1]]);
          case "eth_getBlockByHash":
            return this.sdk.eth.getBlockByHash([params[0], params[1]]);
          case "eth_getTransactionByHash":
            let txHash = params[0];
            try {
              const resp2 = await this.sdk.txs.getBySafeTxHash(txHash);
              txHash = resp2.txHash || txHash;
            } catch (e) {
            }
            if (this.submittedTxs.has(txHash)) {
              return this.submittedTxs.get(txHash);
            }
            return this.sdk.eth.getTransactionByHash([txHash]).then((tx2) => {
              if (tx2) {
                tx2.hash = params[0];
              }
              return tx2;
            });
          case "eth_getTransactionReceipt": {
            let txHash2 = params[0];
            try {
              const resp2 = await this.sdk.txs.getBySafeTxHash(txHash2);
              txHash2 = resp2.txHash || txHash2;
            } catch (e) {
            }
            return this.sdk.eth.getTransactionReceipt([txHash2]).then((tx2) => {
              if (tx2) {
                tx2.transactionHash = params[0];
              }
              return tx2;
            });
          }
          case "eth_estimateGas": {
            return this.sdk.eth.getEstimateGas(params[0]);
          }
          case "eth_call": {
            return this.sdk.eth.call([params[0], params[1]]);
          }
          case "eth_getLogs":
            return this.sdk.eth.getPastLogs([params[0]]);
          case "eth_gasPrice":
            return this.sdk.eth.getGasPrice();
          case "wallet_getPermissions":
            return this.sdk.wallet.getPermissions();
          case "wallet_requestPermissions":
            return this.sdk.wallet.requestPermissions(params[0]);
          case "safe_setSettings":
            return this.sdk.eth.setSafeSettings([params[0]]);
          default:
            throw Error(`"${request.method}" not implemented`);
        }
      }
      // this method is needed for ethers v4
      // https://github.com/ethers-io/ethers.js/blob/427e16826eb15d52d25c4f01027f8db22b74b76c/src.ts/providers/web3-provider.ts#L41-L55
      send(request, callback) {
        if (!request)
          callback("Undefined request");
        this.request(request).then((result) => callback(null, { jsonrpc: "2.0", id: request.id, result })).catch((error) => callback(error, null));
      }
    };
    exports.SafeAppProvider = SafeAppProvider;
  }
});

// node_modules/.pnpm/@safe-global+safe-apps-provider@0.18.3_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-provider/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-apps-provider@0.18.3_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-provider/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SafeAppProvider = void 0;
    var provider_1 = require_provider();
    Object.defineProperty(exports, "SafeAppProvider", { enumerable: true, get: function() {
      return provider_1.SafeAppProvider;
    } });
  }
});
export default require_dist();
//# sourceMappingURL=dist-QNCDOL3O.js.map
