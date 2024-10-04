import {
  hashMessage,
  hashTypedData
} from "./chunk-F6C2J6HC.js";
import {
  encodeFunctionData
} from "./chunk-AIVNYPHD.js";
import "./chunk-3WR6JLRJ.js";
import "./chunk-ONXFJJ2F.js";
import {
  __commonJS,
  __toESM
} from "./chunk-MSFXBLHD.js";

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/utils.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getData = exports.fetchData = exports.stringifyQuery = exports.insertParams = void 0;
    var isErrorResponse = (data) => {
      const isObject = typeof data === "object" && data !== null;
      return isObject && "code" in data && "message" in data;
    };
    function replaceParam(str, key, value) {
      return str.replace(new RegExp(`\\{${key}\\}`, "g"), value);
    }
    function insertParams(template, params) {
      return params ? Object.keys(params).reduce((result, key) => {
        return replaceParam(result, key, String(params[key]));
      }, template) : template;
    }
    exports.insertParams = insertParams;
    function stringifyQuery(query) {
      if (!query) {
        return "";
      }
      const searchParams = new URLSearchParams();
      Object.keys(query).forEach((key) => {
        if (query[key] != null) {
          searchParams.append(key, String(query[key]));
        }
      });
      const searchString = searchParams.toString();
      return searchString ? `?${searchString}` : "";
    }
    exports.stringifyQuery = stringifyQuery;
    function parseResponse(resp) {
      return __awaiter(this, void 0, void 0, function* () {
        let json;
        try {
          json = yield resp.json();
        } catch (_a) {
          json = {};
        }
        if (!resp.ok) {
          const errTxt = isErrorResponse(json) ? `CGW error - ${json.code}: ${json.message}` : `CGW error - status ${resp.statusText}`;
          throw new Error(errTxt);
        }
        return json;
      });
    }
    function fetchData(url, method, body, headers, credentials) {
      return __awaiter(this, void 0, void 0, function* () {
        const requestHeaders = Object.assign({ "Content-Type": "application/json" }, headers);
        const options = {
          method: method !== null && method !== void 0 ? method : "POST",
          headers: requestHeaders
        };
        if (credentials) {
          options["credentials"] = credentials;
        }
        if (body != null) {
          options.body = typeof body === "string" ? body : JSON.stringify(body);
        }
        const resp = yield fetch(url, options);
        return parseResponse(resp);
      });
    }
    exports.fetchData = fetchData;
    function getData(url, headers, credentials) {
      return __awaiter(this, void 0, void 0, function* () {
        const options = {
          method: "GET"
        };
        if (headers) {
          options["headers"] = Object.assign(Object.assign({}, headers), { "Content-Type": "application/json" });
        }
        if (credentials) {
          options["credentials"] = credentials;
        }
        const resp = yield fetch(url, options);
        return parseResponse(resp);
      });
    }
    exports.getData = getData;
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/endpoint.js
var require_endpoint = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/endpoint.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEndpoint = exports.deleteEndpoint = exports.putEndpoint = exports.postEndpoint = void 0;
    var utils_1 = require_utils();
    function makeUrl(baseUrl, path, pathParams, query) {
      const pathname = (0, utils_1.insertParams)(path, pathParams);
      const search = (0, utils_1.stringifyQuery)(query);
      return `${baseUrl}${pathname}${search}`;
    }
    function postEndpoint(baseUrl, path, params) {
      const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
      return (0, utils_1.fetchData)(url, "POST", params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
    }
    exports.postEndpoint = postEndpoint;
    function putEndpoint(baseUrl, path, params) {
      const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
      return (0, utils_1.fetchData)(url, "PUT", params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
    }
    exports.putEndpoint = putEndpoint;
    function deleteEndpoint(baseUrl, path, params) {
      const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
      return (0, utils_1.fetchData)(url, "DELETE", params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
    }
    exports.deleteEndpoint = deleteEndpoint;
    function getEndpoint(baseUrl, path, params, rawUrl) {
      if (rawUrl) {
        return (0, utils_1.getData)(rawUrl, void 0, params === null || params === void 0 ? void 0 : params.credentials);
      }
      const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
      return (0, utils_1.getData)(url, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
    }
    exports.getEndpoint = getEndpoint;
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/config.js
var require_config = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_BASE_URL = void 0;
    exports.DEFAULT_BASE_URL = "https://safe-client.safe.global";
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/safe-info.js
var require_safe_info = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/safe-info.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImplementationVersionState = void 0;
    var ImplementationVersionState;
    (function(ImplementationVersionState2) {
      ImplementationVersionState2["UP_TO_DATE"] = "UP_TO_DATE";
      ImplementationVersionState2["OUTDATED"] = "OUTDATED";
      ImplementationVersionState2["UNKNOWN"] = "UNKNOWN";
    })(ImplementationVersionState = exports.ImplementationVersionState || (exports.ImplementationVersionState = {}));
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/safe-apps.js
var require_safe_apps = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/safe-apps.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SafeAppSocialPlatforms = exports.SafeAppFeatures = exports.SafeAppAccessPolicyTypes = void 0;
    var SafeAppAccessPolicyTypes;
    (function(SafeAppAccessPolicyTypes2) {
      SafeAppAccessPolicyTypes2["NoRestrictions"] = "NO_RESTRICTIONS";
      SafeAppAccessPolicyTypes2["DomainAllowlist"] = "DOMAIN_ALLOWLIST";
    })(SafeAppAccessPolicyTypes = exports.SafeAppAccessPolicyTypes || (exports.SafeAppAccessPolicyTypes = {}));
    var SafeAppFeatures;
    (function(SafeAppFeatures2) {
      SafeAppFeatures2["BATCHED_TRANSACTIONS"] = "BATCHED_TRANSACTIONS";
    })(SafeAppFeatures = exports.SafeAppFeatures || (exports.SafeAppFeatures = {}));
    var SafeAppSocialPlatforms;
    (function(SafeAppSocialPlatforms2) {
      SafeAppSocialPlatforms2["TWITTER"] = "TWITTER";
      SafeAppSocialPlatforms2["GITHUB"] = "GITHUB";
      SafeAppSocialPlatforms2["DISCORD"] = "DISCORD";
    })(SafeAppSocialPlatforms = exports.SafeAppSocialPlatforms || (exports.SafeAppSocialPlatforms = {}));
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/transactions.js
var require_transactions = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/transactions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LabelValue = exports.StartTimeValue = exports.DurationType = exports.DetailedExecutionInfoType = exports.TransactionListItemType = exports.ConflictType = exports.TransactionInfoType = exports.SettingsInfoType = exports.TransactionTokenType = exports.TransferDirection = exports.TransactionStatus = exports.Operation = void 0;
    var Operation2;
    (function(Operation3) {
      Operation3[Operation3["CALL"] = 0] = "CALL";
      Operation3[Operation3["DELEGATE"] = 1] = "DELEGATE";
    })(Operation2 = exports.Operation || (exports.Operation = {}));
    var TransactionStatus2;
    (function(TransactionStatus3) {
      TransactionStatus3["AWAITING_CONFIRMATIONS"] = "AWAITING_CONFIRMATIONS";
      TransactionStatus3["AWAITING_EXECUTION"] = "AWAITING_EXECUTION";
      TransactionStatus3["CANCELLED"] = "CANCELLED";
      TransactionStatus3["FAILED"] = "FAILED";
      TransactionStatus3["SUCCESS"] = "SUCCESS";
    })(TransactionStatus2 = exports.TransactionStatus || (exports.TransactionStatus = {}));
    var TransferDirection2;
    (function(TransferDirection3) {
      TransferDirection3["INCOMING"] = "INCOMING";
      TransferDirection3["OUTGOING"] = "OUTGOING";
      TransferDirection3["UNKNOWN"] = "UNKNOWN";
    })(TransferDirection2 = exports.TransferDirection || (exports.TransferDirection = {}));
    var TransactionTokenType;
    (function(TransactionTokenType2) {
      TransactionTokenType2["ERC20"] = "ERC20";
      TransactionTokenType2["ERC721"] = "ERC721";
      TransactionTokenType2["NATIVE_COIN"] = "NATIVE_COIN";
    })(TransactionTokenType = exports.TransactionTokenType || (exports.TransactionTokenType = {}));
    var SettingsInfoType;
    (function(SettingsInfoType2) {
      SettingsInfoType2["SET_FALLBACK_HANDLER"] = "SET_FALLBACK_HANDLER";
      SettingsInfoType2["ADD_OWNER"] = "ADD_OWNER";
      SettingsInfoType2["REMOVE_OWNER"] = "REMOVE_OWNER";
      SettingsInfoType2["SWAP_OWNER"] = "SWAP_OWNER";
      SettingsInfoType2["CHANGE_THRESHOLD"] = "CHANGE_THRESHOLD";
      SettingsInfoType2["CHANGE_IMPLEMENTATION"] = "CHANGE_IMPLEMENTATION";
      SettingsInfoType2["ENABLE_MODULE"] = "ENABLE_MODULE";
      SettingsInfoType2["DISABLE_MODULE"] = "DISABLE_MODULE";
      SettingsInfoType2["SET_GUARD"] = "SET_GUARD";
      SettingsInfoType2["DELETE_GUARD"] = "DELETE_GUARD";
    })(SettingsInfoType = exports.SettingsInfoType || (exports.SettingsInfoType = {}));
    var TransactionInfoType;
    (function(TransactionInfoType2) {
      TransactionInfoType2["TRANSFER"] = "Transfer";
      TransactionInfoType2["SETTINGS_CHANGE"] = "SettingsChange";
      TransactionInfoType2["CUSTOM"] = "Custom";
      TransactionInfoType2["CREATION"] = "Creation";
      TransactionInfoType2["SWAP_ORDER"] = "SwapOrder";
      TransactionInfoType2["TWAP_ORDER"] = "TwapOrder";
      TransactionInfoType2["SWAP_TRANSFER"] = "SwapTransfer";
    })(TransactionInfoType = exports.TransactionInfoType || (exports.TransactionInfoType = {}));
    var ConflictType;
    (function(ConflictType2) {
      ConflictType2["NONE"] = "None";
      ConflictType2["HAS_NEXT"] = "HasNext";
      ConflictType2["END"] = "End";
    })(ConflictType = exports.ConflictType || (exports.ConflictType = {}));
    var TransactionListItemType;
    (function(TransactionListItemType2) {
      TransactionListItemType2["TRANSACTION"] = "TRANSACTION";
      TransactionListItemType2["LABEL"] = "LABEL";
      TransactionListItemType2["CONFLICT_HEADER"] = "CONFLICT_HEADER";
      TransactionListItemType2["DATE_LABEL"] = "DATE_LABEL";
    })(TransactionListItemType = exports.TransactionListItemType || (exports.TransactionListItemType = {}));
    var DetailedExecutionInfoType;
    (function(DetailedExecutionInfoType2) {
      DetailedExecutionInfoType2["MULTISIG"] = "MULTISIG";
      DetailedExecutionInfoType2["MODULE"] = "MODULE";
    })(DetailedExecutionInfoType = exports.DetailedExecutionInfoType || (exports.DetailedExecutionInfoType = {}));
    var DurationType;
    (function(DurationType2) {
      DurationType2["AUTO"] = "AUTO";
      DurationType2["LIMIT_DURATION"] = "LIMIT_DURATION";
    })(DurationType = exports.DurationType || (exports.DurationType = {}));
    var StartTimeValue;
    (function(StartTimeValue2) {
      StartTimeValue2["AT_MINING_TIME"] = "AT_MINING_TIME";
      StartTimeValue2["AT_EPOCH"] = "AT_EPOCH";
    })(StartTimeValue = exports.StartTimeValue || (exports.StartTimeValue = {}));
    var LabelValue;
    (function(LabelValue2) {
      LabelValue2["Queued"] = "Queued";
      LabelValue2["Next"] = "Next";
    })(LabelValue = exports.LabelValue || (exports.LabelValue = {}));
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/chains.js
var require_chains = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/chains.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FEATURES = exports.GAS_PRICE_TYPE = exports.RPC_AUTHENTICATION = void 0;
    var RPC_AUTHENTICATION;
    (function(RPC_AUTHENTICATION2) {
      RPC_AUTHENTICATION2["API_KEY_PATH"] = "API_KEY_PATH";
      RPC_AUTHENTICATION2["NO_AUTHENTICATION"] = "NO_AUTHENTICATION";
      RPC_AUTHENTICATION2["UNKNOWN"] = "UNKNOWN";
    })(RPC_AUTHENTICATION = exports.RPC_AUTHENTICATION || (exports.RPC_AUTHENTICATION = {}));
    var GAS_PRICE_TYPE;
    (function(GAS_PRICE_TYPE2) {
      GAS_PRICE_TYPE2["ORACLE"] = "ORACLE";
      GAS_PRICE_TYPE2["FIXED"] = "FIXED";
      GAS_PRICE_TYPE2["FIXED_1559"] = "FIXED1559";
      GAS_PRICE_TYPE2["UNKNOWN"] = "UNKNOWN";
    })(GAS_PRICE_TYPE = exports.GAS_PRICE_TYPE || (exports.GAS_PRICE_TYPE = {}));
    var FEATURES;
    (function(FEATURES2) {
      FEATURES2["ERC721"] = "ERC721";
      FEATURES2["SAFE_APPS"] = "SAFE_APPS";
      FEATURES2["CONTRACT_INTERACTION"] = "CONTRACT_INTERACTION";
      FEATURES2["DOMAIN_LOOKUP"] = "DOMAIN_LOOKUP";
      FEATURES2["SPENDING_LIMIT"] = "SPENDING_LIMIT";
      FEATURES2["EIP1559"] = "EIP1559";
      FEATURES2["SAFE_TX_GAS_OPTIONAL"] = "SAFE_TX_GAS_OPTIONAL";
      FEATURES2["TX_SIMULATION"] = "TX_SIMULATION";
      FEATURES2["EIP1271"] = "EIP1271";
    })(FEATURES = exports.FEATURES || (exports.FEATURES = {}));
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenType = void 0;
    var TokenType2;
    (function(TokenType3) {
      TokenType3["ERC20"] = "ERC20";
      TokenType3["ERC721"] = "ERC721";
      TokenType3["NATIVE_TOKEN"] = "NATIVE_TOKEN";
    })(TokenType2 = exports.TokenType || (exports.TokenType = {}));
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/master-copies.js
var require_master_copies = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/master-copies.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/decoded-data.js
var require_decoded_data = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/decoded-data.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConfirmationViewTypes = void 0;
    var ConfirmationViewTypes;
    (function(ConfirmationViewTypes2) {
      ConfirmationViewTypes2["COW_SWAP_ORDER"] = "COW_SWAP_ORDER";
      ConfirmationViewTypes2["COW_SWAP_TWAP_ORDER"] = "COW_SWAP_TWAP_ORDER";
    })(ConfirmationViewTypes = exports.ConfirmationViewTypes || (exports.ConfirmationViewTypes = {}));
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/safe-messages.js
var require_safe_messages = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/safe-messages.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SafeMessageStatus = exports.SafeMessageListItemType = void 0;
    var SafeMessageListItemType;
    (function(SafeMessageListItemType2) {
      SafeMessageListItemType2["DATE_LABEL"] = "DATE_LABEL";
      SafeMessageListItemType2["MESSAGE"] = "MESSAGE";
    })(SafeMessageListItemType = exports.SafeMessageListItemType || (exports.SafeMessageListItemType = {}));
    var SafeMessageStatus;
    (function(SafeMessageStatus2) {
      SafeMessageStatus2["NEEDS_CONFIRMATION"] = "NEEDS_CONFIRMATION";
      SafeMessageStatus2["CONFIRMED"] = "CONFIRMED";
    })(SafeMessageStatus = exports.SafeMessageStatus || (exports.SafeMessageStatus = {}));
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/notifications.js
var require_notifications = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/notifications.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeviceType = void 0;
    var DeviceType;
    (function(DeviceType2) {
      DeviceType2["ANDROID"] = "ANDROID";
      DeviceType2["IOS"] = "IOS";
      DeviceType2["WEB"] = "WEB";
    })(DeviceType = exports.DeviceType || (exports.DeviceType = {}));
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/relay.js
var require_relay = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/types/relay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@safe-global+safe-gateway-typescript-sdk@3.22.2/node_modules/@safe-global/safe-gateway-typescript-sdk/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteAccount = exports.getAccount = exports.createAccount = exports.verifyAuth = exports.getAuthNonce = exports.getContract = exports.getSafeOverviews = exports.unsubscribeAll = exports.unsubscribeSingle = exports.registerRecoveryModule = exports.deleteRegisteredEmail = exports.getRegisteredEmail = exports.verifyEmail = exports.resendEmailVerificationCode = exports.changeEmail = exports.registerEmail = exports.unregisterDevice = exports.unregisterSafe = exports.registerDevice = exports.getDelegates = exports.confirmSafeMessage = exports.proposeSafeMessage = exports.getSafeMessage = exports.getSafeMessages = exports.getDecodedData = exports.getMasterCopies = exports.getSafeApps = exports.getChainConfig = exports.getChainsConfig = exports.getConfirmationView = exports.proposeTransaction = exports.getNonces = exports.postSafeGasEstimation = exports.deleteTransaction = exports.getTransactionDetails = exports.getTransactionQueue = exports.getTransactionHistory = exports.getCollectiblesPage = exports.getCollectibles = exports.getAllOwnedSafes = exports.getOwnedSafes = exports.getFiatCurrencies = exports.getBalances = exports.getMultisigTransactions = exports.getModuleTransactions = exports.getIncomingTransfers = exports.getSafeInfo = exports.getRelayCount = exports.relayTransaction = exports.setBaseUrl = void 0;
    exports.putAccountDataSettings = exports.getAccountDataSettings = exports.getAccountDataTypes = void 0;
    var endpoint_1 = require_endpoint();
    var config_1 = require_config();
    __exportStar(require_safe_info(), exports);
    __exportStar(require_safe_apps(), exports);
    __exportStar(require_transactions(), exports);
    __exportStar(require_chains(), exports);
    __exportStar(require_common(), exports);
    __exportStar(require_master_copies(), exports);
    __exportStar(require_decoded_data(), exports);
    __exportStar(require_safe_messages(), exports);
    __exportStar(require_notifications(), exports);
    __exportStar(require_relay(), exports);
    var baseUrl = config_1.DEFAULT_BASE_URL;
    var setBaseUrl = (url) => {
      baseUrl = url;
    };
    exports.setBaseUrl = setBaseUrl;
    function relayTransaction(chainId, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/relay", { path: { chainId }, body });
    }
    exports.relayTransaction = relayTransaction;
    function getRelayCount(chainId, address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/relay/{address}", { path: { chainId, address } });
    }
    exports.getRelayCount = getRelayCount;
    function getSafeInfo(chainId, address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}", { path: { chainId, address } });
    }
    exports.getSafeInfo = getSafeInfo;
    function getIncomingTransfers(chainId, address, query, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/incoming-transfers/", {
        path: { chainId, address },
        query
      }, pageUrl);
    }
    exports.getIncomingTransfers = getIncomingTransfers;
    function getModuleTransactions(chainId, address, query, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/module-transactions/", {
        path: { chainId, address },
        query
      }, pageUrl);
    }
    exports.getModuleTransactions = getModuleTransactions;
    function getMultisigTransactions(chainId, address, query, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/multisig-transactions/", {
        path: { chainId, address },
        query
      }, pageUrl);
    }
    exports.getMultisigTransactions = getMultisigTransactions;
    function getBalances(chainId, address, currency = "usd", query = {}) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/balances/{currency}", {
        path: { chainId, address, currency },
        query
      });
    }
    exports.getBalances = getBalances;
    function getFiatCurrencies() {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/balances/supported-fiat-codes");
    }
    exports.getFiatCurrencies = getFiatCurrencies;
    function getOwnedSafes(chainId, address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/owners/{address}/safes", { path: { chainId, address } });
    }
    exports.getOwnedSafes = getOwnedSafes;
    function getAllOwnedSafes(address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/owners/{address}/safes", { path: { address } });
    }
    exports.getAllOwnedSafes = getAllOwnedSafes;
    function getCollectibles(chainId, address, query = {}) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/collectibles", {
        path: { chainId, address },
        query
      });
    }
    exports.getCollectibles = getCollectibles;
    function getCollectiblesPage(chainId, address, query = {}, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v2/chains/{chainId}/safes/{address}/collectibles", { path: { chainId, address }, query }, pageUrl);
    }
    exports.getCollectiblesPage = getCollectiblesPage;
    function getTransactionHistory(chainId, address, query = {}, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/transactions/history", { path: { chainId, safe_address: address }, query }, pageUrl);
    }
    exports.getTransactionHistory = getTransactionHistory;
    function getTransactionQueue(chainId, address, query = {}, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/transactions/queued", { path: { chainId, safe_address: address }, query }, pageUrl);
    }
    exports.getTransactionQueue = getTransactionQueue;
    function getTransactionDetails(chainId, transactionId) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/transactions/{transactionId}", {
        path: { chainId, transactionId }
      });
    }
    exports.getTransactionDetails = getTransactionDetails;
    function deleteTransaction(chainId, safeTxHash, signature) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/transactions/{safeTxHash}", {
        path: { chainId, safeTxHash },
        body: { signature }
      });
    }
    exports.deleteTransaction = deleteTransaction;
    function postSafeGasEstimation(chainId, address, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations", {
        path: { chainId, safe_address: address },
        body
      });
    }
    exports.postSafeGasEstimation = postSafeGasEstimation;
    function getNonces(chainId, address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/nonces", {
        path: { chainId, safe_address: address }
      });
    }
    exports.getNonces = getNonces;
    function proposeTransaction(chainId, address, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/transactions/{safe_address}/propose", {
        path: { chainId, safe_address: address },
        body
      });
    }
    exports.proposeTransaction = proposeTransaction;
    function getConfirmationView(chainId, safeAddress, encodedData, to) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation", {
        path: { chainId, safe_address: safeAddress },
        body: { data: encodedData, to }
      });
    }
    exports.getConfirmationView = getConfirmationView;
    function getChainsConfig(query) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains", {
        query
      });
    }
    exports.getChainsConfig = getChainsConfig;
    function getChainConfig(chainId) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}", {
        path: { chainId }
      });
    }
    exports.getChainConfig = getChainConfig;
    function getSafeApps(chainId, query = {}) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safe-apps", {
        path: { chainId },
        query
      });
    }
    exports.getSafeApps = getSafeApps;
    function getMasterCopies(chainId) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/about/master-copies", {
        path: { chainId }
      });
    }
    exports.getMasterCopies = getMasterCopies;
    function getDecodedData(chainId, encodedData, to) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/data-decoder", {
        path: { chainId },
        body: { data: encodedData, to }
      });
    }
    exports.getDecodedData = getDecodedData;
    function getSafeMessages(chainId, address, pageUrl) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/messages", { path: { chainId, safe_address: address }, query: {} }, pageUrl);
    }
    exports.getSafeMessages = getSafeMessages;
    function getSafeMessage(chainId, messageHash) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/messages/{message_hash}", {
        path: { chainId, message_hash: messageHash }
      });
    }
    exports.getSafeMessage = getSafeMessage;
    function proposeSafeMessage(chainId, address, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/messages", {
        path: { chainId, safe_address: address },
        body
      });
    }
    exports.proposeSafeMessage = proposeSafeMessage;
    function confirmSafeMessage(chainId, messageHash, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/messages/{message_hash}/signatures", {
        path: { chainId, message_hash: messageHash },
        body
      });
    }
    exports.confirmSafeMessage = confirmSafeMessage;
    function getDelegates(chainId, query = {}) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v2/chains/{chainId}/delegates", {
        path: { chainId },
        query
      });
    }
    exports.getDelegates = getDelegates;
    function registerDevice(body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/register/notifications", {
        body
      });
    }
    exports.registerDevice = registerDevice;
    function unregisterSafe(chainId, address, uuid) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}", {
        path: { chainId, safe_address: address, uuid }
      });
    }
    exports.unregisterSafe = unregisterSafe;
    function unregisterDevice(chainId, uuid) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/notifications/devices/{uuid}", {
        path: { chainId, uuid }
      });
    }
    exports.unregisterDevice = unregisterDevice;
    function registerEmail(chainId, safeAddress, body, headers) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails", {
        path: { chainId, safe_address: safeAddress },
        body,
        headers
      });
    }
    exports.registerEmail = registerEmail;
    function changeEmail(chainId, safeAddress, signerAddress, body, headers) {
      return (0, endpoint_1.putEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body,
        headers
      });
    }
    exports.changeEmail = changeEmail;
    function resendEmailVerificationCode(chainId, safeAddress, signerAddress) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend", {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body: ""
      });
    }
    exports.resendEmailVerificationCode = resendEmailVerificationCode;
    function verifyEmail(chainId, safeAddress, signerAddress, body) {
      return (0, endpoint_1.putEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify", {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body
      });
    }
    exports.verifyEmail = verifyEmail;
    function getRegisteredEmail(chainId, safeAddress, signerAddress, headers) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        headers
      });
    }
    exports.getRegisteredEmail = getRegisteredEmail;
    function deleteRegisteredEmail(chainId, safeAddress, signerAddress, headers) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        headers
      });
    }
    exports.deleteRegisteredEmail = deleteRegisteredEmail;
    function registerRecoveryModule(chainId, safeAddress, body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/recovery", {
        path: { chainId, safe_address: safeAddress },
        body
      });
    }
    exports.registerRecoveryModule = registerRecoveryModule;
    function unsubscribeSingle(query) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/subscriptions", { query });
    }
    exports.unsubscribeSingle = unsubscribeSingle;
    function unsubscribeAll(query) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/subscriptions/all", { query });
    }
    exports.unsubscribeAll = unsubscribeAll;
    function getSafeOverviews(safes, query) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/safes", {
        query: Object.assign(Object.assign({}, query), { safes: safes.join(",") })
      });
    }
    exports.getSafeOverviews = getSafeOverviews;
    function getContract(chainId, contractAddress) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/contracts/{contractAddress}", {
        path: {
          chainId,
          contractAddress
        }
      });
    }
    exports.getContract = getContract;
    function getAuthNonce() {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/auth/nonce", { credentials: "include" });
    }
    exports.getAuthNonce = getAuthNonce;
    function verifyAuth(body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/auth/verify", {
        body,
        credentials: "include"
      });
    }
    exports.verifyAuth = verifyAuth;
    function createAccount(body) {
      return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/accounts", {
        body,
        credentials: "include"
      });
    }
    exports.createAccount = createAccount;
    function getAccount(address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/accounts/{address}", {
        path: { address },
        credentials: "include"
      });
    }
    exports.getAccount = getAccount;
    function deleteAccount(address) {
      return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/accounts/{address}", {
        path: { address },
        credentials: "include"
      });
    }
    exports.deleteAccount = deleteAccount;
    function getAccountDataTypes() {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/accounts/data-types");
    }
    exports.getAccountDataTypes = getAccountDataTypes;
    function getAccountDataSettings(address) {
      return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/accounts/{address}/data-settings", {
        path: { address },
        credentials: "include"
      });
    }
    exports.getAccountDataSettings = getAccountDataSettings;
    function putAccountDataSettings(address, body) {
      return (0, endpoint_1.putEndpoint)(baseUrl, "/v1/accounts/{address}/data-settings", {
        path: { address },
        body,
        credentials: "include"
      });
    }
    exports.putAccountDataSettings = putAccountDataSettings;
  }
});

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/version.js
var getSDKVersion = () => "9.1.0";

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/utils.js
var dec2hex = (dec) => dec.toString(16).padStart(2, "0");
var generateId = (len) => {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
};
var generateRequestId = () => {
  if (typeof window !== "undefined") {
    return generateId(10);
  }
  return (/* @__PURE__ */ new Date()).getTime().toString(36);
};

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/messageFormatter.js
var MessageFormatter = class {
};
MessageFormatter.makeRequest = (method, params) => {
  const id = generateRequestId();
  return {
    id,
    method,
    params,
    env: {
      sdkVersion: getSDKVersion()
    }
  };
};
MessageFormatter.makeResponse = (id, data, version) => ({
  id,
  success: true,
  version,
  data
});
MessageFormatter.makeErrorResponse = (id, error, version) => ({
  id,
  success: false,
  error,
  version
});

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/methods.js
var Methods;
(function(Methods2) {
  Methods2["sendTransactions"] = "sendTransactions";
  Methods2["rpcCall"] = "rpcCall";
  Methods2["getChainInfo"] = "getChainInfo";
  Methods2["getSafeInfo"] = "getSafeInfo";
  Methods2["getTxBySafeTxHash"] = "getTxBySafeTxHash";
  Methods2["getSafeBalances"] = "getSafeBalances";
  Methods2["signMessage"] = "signMessage";
  Methods2["signTypedMessage"] = "signTypedMessage";
  Methods2["getEnvironmentInfo"] = "getEnvironmentInfo";
  Methods2["getOffChainSignature"] = "getOffChainSignature";
  Methods2["requestAddressBook"] = "requestAddressBook";
  Methods2["wallet_getPermissions"] = "wallet_getPermissions";
  Methods2["wallet_requestPermissions"] = "wallet_requestPermissions";
})(Methods || (Methods = {}));
var RestrictedMethods;
(function(RestrictedMethods2) {
  RestrictedMethods2["requestAddressBook"] = "requestAddressBook";
})(RestrictedMethods || (RestrictedMethods = {}));

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/index.js
var PostMessageCommunicator = class {
  constructor(allowedOrigins = null, debugMode = false) {
    this.allowedOrigins = null;
    this.callbacks = /* @__PURE__ */ new Map();
    this.debugMode = false;
    this.isServer = typeof window === "undefined";
    this.isValidMessage = ({ origin, data, source }) => {
      const emptyOrMalformed = !data;
      const sentFromParentEl = !this.isServer && source === window.parent;
      const majorVersionNumber = typeof data.version !== "undefined" && parseInt(data.version.split(".")[0]);
      const allowedSDKVersion = typeof majorVersionNumber === "number" && majorVersionNumber >= 1;
      let validOrigin = true;
      if (Array.isArray(this.allowedOrigins)) {
        validOrigin = this.allowedOrigins.find((regExp) => regExp.test(origin)) !== void 0;
      }
      return !emptyOrMalformed && sentFromParentEl && allowedSDKVersion && validOrigin;
    };
    this.logIncomingMessage = (msg) => {
      console.info(`Safe Apps SDK v1: A message was received from origin ${msg.origin}. `, msg.data);
    };
    this.onParentMessage = (msg) => {
      if (this.isValidMessage(msg)) {
        this.debugMode && this.logIncomingMessage(msg);
        this.handleIncomingMessage(msg.data);
      }
    };
    this.handleIncomingMessage = (payload) => {
      const { id } = payload;
      const cb = this.callbacks.get(id);
      if (cb) {
        cb(payload);
        this.callbacks.delete(id);
      }
    };
    this.send = (method, params) => {
      const request = MessageFormatter.makeRequest(method, params);
      if (this.isServer) {
        throw new Error("Window doesn't exist");
      }
      window.parent.postMessage(request, "*");
      return new Promise((resolve, reject) => {
        this.callbacks.set(request.id, (response) => {
          if (!response.success) {
            reject(new Error(response.error));
            return;
          }
          resolve(response);
        });
      });
    };
    this.allowedOrigins = allowedOrigins;
    this.debugMode = debugMode;
    if (!this.isServer) {
      window.addEventListener("message", this.onParentMessage);
    }
  }
};
var communication_default = PostMessageCommunicator;

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/types/sdk.js
var isObjectEIP712TypedData = (obj) => {
  return typeof obj === "object" && obj != null && "domain" in obj && "types" in obj && "message" in obj;
};

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/types/gateway.js
var import_safe_gateway_typescript_sdk = __toESM(require_dist(), 1);

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/txs/index.js
var TXs = class {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getBySafeTxHash(safeTxHash) {
    if (!safeTxHash) {
      throw new Error("Invalid safeTxHash");
    }
    const response = await this.communicator.send(Methods.getTxBySafeTxHash, { safeTxHash });
    return response.data;
  }
  async signMessage(message) {
    const messagePayload = {
      message
    };
    const response = await this.communicator.send(Methods.signMessage, messagePayload);
    return response.data;
  }
  async signTypedMessage(typedData) {
    if (!isObjectEIP712TypedData(typedData)) {
      throw new Error("Invalid typed data");
    }
    const response = await this.communicator.send(Methods.signTypedMessage, { typedData });
    return response.data;
  }
  async send({ txs, params }) {
    if (!txs || !txs.length) {
      throw new Error("No transactions were passed");
    }
    const messagePayload = {
      txs,
      params
    };
    const response = await this.communicator.send(Methods.sendTransactions, messagePayload);
    return response.data;
  }
};

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/eth/constants.js
var RPC_CALLS = {
  eth_call: "eth_call",
  eth_gasPrice: "eth_gasPrice",
  eth_getLogs: "eth_getLogs",
  eth_getBalance: "eth_getBalance",
  eth_getCode: "eth_getCode",
  eth_getBlockByHash: "eth_getBlockByHash",
  eth_getBlockByNumber: "eth_getBlockByNumber",
  eth_getStorageAt: "eth_getStorageAt",
  eth_getTransactionByHash: "eth_getTransactionByHash",
  eth_getTransactionReceipt: "eth_getTransactionReceipt",
  eth_getTransactionCount: "eth_getTransactionCount",
  eth_estimateGas: "eth_estimateGas",
  safe_setSettings: "safe_setSettings"
};

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/eth/index.js
var inputFormatters = {
  defaultBlockParam: (arg = "latest") => arg,
  returnFullTxObjectParam: (arg = false) => arg,
  blockNumberToHex: (arg) => Number.isInteger(arg) ? `0x${arg.toString(16)}` : arg
};
var Eth = class {
  constructor(communicator) {
    this.communicator = communicator;
    this.call = this.buildRequest({
      call: RPC_CALLS.eth_call,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getBalance = this.buildRequest({
      call: RPC_CALLS.eth_getBalance,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getCode = this.buildRequest({
      call: RPC_CALLS.eth_getCode,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getStorageAt = this.buildRequest({
      call: RPC_CALLS.eth_getStorageAt,
      formatters: [null, inputFormatters.blockNumberToHex, inputFormatters.defaultBlockParam]
    });
    this.getPastLogs = this.buildRequest({
      call: RPC_CALLS.eth_getLogs
    });
    this.getBlockByHash = this.buildRequest({
      call: RPC_CALLS.eth_getBlockByHash,
      formatters: [null, inputFormatters.returnFullTxObjectParam]
    });
    this.getBlockByNumber = this.buildRequest({
      call: RPC_CALLS.eth_getBlockByNumber,
      formatters: [inputFormatters.blockNumberToHex, inputFormatters.returnFullTxObjectParam]
    });
    this.getTransactionByHash = this.buildRequest({
      call: RPC_CALLS.eth_getTransactionByHash
    });
    this.getTransactionReceipt = this.buildRequest({
      call: RPC_CALLS.eth_getTransactionReceipt
    });
    this.getTransactionCount = this.buildRequest({
      call: RPC_CALLS.eth_getTransactionCount,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getGasPrice = this.buildRequest({
      call: RPC_CALLS.eth_gasPrice
    });
    this.getEstimateGas = (transaction) => this.buildRequest({
      call: RPC_CALLS.eth_estimateGas
    })([transaction]);
    this.setSafeSettings = this.buildRequest({
      call: RPC_CALLS.safe_setSettings
    });
  }
  buildRequest(args) {
    const { call, formatters } = args;
    return async (params) => {
      if (formatters && Array.isArray(params)) {
        formatters.forEach((formatter, i) => {
          if (formatter) {
            params[i] = formatter(params[i]);
          }
        });
      }
      const payload = {
        call,
        params: params || []
      };
      const response = await this.communicator.send(Methods.rpcCall, payload);
      return response.data;
    };
  }
};

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/safe/signatures.js
var MAGIC_VALUE = "0x1626ba7e";
var MAGIC_VALUE_BYTES = "0x20c13b0b";

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/types/permissions.js
var PERMISSIONS_REQUEST_REJECTED = 4001;
var PermissionsError = class _PermissionsError extends Error {
  constructor(message, code, data) {
    super(message);
    this.code = code;
    this.data = data;
    Object.setPrototypeOf(this, _PermissionsError.prototype);
  }
};

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/wallet/index.js
var Wallet = class {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getPermissions() {
    const response = await this.communicator.send(Methods.wallet_getPermissions, void 0);
    return response.data;
  }
  async requestPermissions(permissions) {
    if (!this.isPermissionRequestValid(permissions)) {
      throw new PermissionsError("Permissions request is invalid", PERMISSIONS_REQUEST_REJECTED);
    }
    try {
      const response = await this.communicator.send(Methods.wallet_requestPermissions, permissions);
      return response.data;
    } catch {
      throw new PermissionsError("Permissions rejected", PERMISSIONS_REQUEST_REJECTED);
    }
  }
  isPermissionRequestValid(permissions) {
    return permissions.every((pr) => {
      if (typeof pr === "object") {
        return Object.keys(pr).every((method) => {
          if (Object.values(RestrictedMethods).includes(method)) {
            return true;
          }
          return false;
        });
      }
      return false;
    });
  }
};

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/decorators/requirePermissions.js
var hasPermission = (required, permissions) => permissions.some((permission) => permission.parentCapability === required);
var requirePermission = () => (_, propertyKey, descriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function() {
    const wallet = new Wallet(this.communicator);
    let currentPermissions = await wallet.getPermissions();
    if (!hasPermission(propertyKey, currentPermissions)) {
      currentPermissions = await wallet.requestPermissions([{ [propertyKey]: {} }]);
    }
    if (!hasPermission(propertyKey, currentPermissions)) {
      throw new PermissionsError("Permissions rejected", PERMISSIONS_REQUEST_REJECTED);
    }
    return originalMethod.apply(this);
  };
  return descriptor;
};
var requirePermissions_default = requirePermission;

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/safe/index.js
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Safe = class {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getChainInfo() {
    const response = await this.communicator.send(Methods.getChainInfo, void 0);
    return response.data;
  }
  async getInfo() {
    const response = await this.communicator.send(Methods.getSafeInfo, void 0);
    return response.data;
  }
  // There is a possibility that this method will change because we may add pagination to the endpoint
  async experimental_getBalances({ currency = "usd" } = {}) {
    const response = await this.communicator.send(Methods.getSafeBalances, {
      currency
    });
    return response.data;
  }
  async check1271Signature(messageHash, signature = "0x") {
    const safeInfo = await this.getInfo();
    const encodedIsValidSignatureCall = encodeFunctionData({
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_dataHash",
              type: "bytes32"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [messageHash, signature]
    });
    const payload = {
      call: RPC_CALLS.eth_call,
      params: [
        {
          to: safeInfo.safeAddress,
          data: encodedIsValidSignatureCall
        },
        "latest"
      ]
    };
    try {
      const response = await this.communicator.send(Methods.rpcCall, payload);
      return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE;
    } catch (err) {
      return false;
    }
  }
  async check1271SignatureBytes(messageHash, signature = "0x") {
    const safeInfo = await this.getInfo();
    const encodedIsValidSignatureCall = encodeFunctionData({
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_data",
              type: "bytes"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [messageHash, signature]
    });
    const payload = {
      call: RPC_CALLS.eth_call,
      params: [
        {
          to: safeInfo.safeAddress,
          data: encodedIsValidSignatureCall
        },
        "latest"
      ]
    };
    try {
      const response = await this.communicator.send(Methods.rpcCall, payload);
      return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE_BYTES;
    } catch (err) {
      return false;
    }
  }
  calculateMessageHash(message) {
    return hashMessage(message);
  }
  calculateTypedMessageHash(typedMessage) {
    const chainId = typeof typedMessage.domain.chainId === "object" ? typedMessage.domain.chainId.toNumber() : Number(typedMessage.domain.chainId);
    let primaryType = typedMessage.primaryType;
    if (!primaryType) {
      const fields = Object.values(typedMessage.types);
      const primaryTypes = Object.keys(typedMessage.types).filter((typeName) => fields.every((dataTypes) => dataTypes.every(({ type }) => type.replace("[", "").replace("]", "") !== typeName)));
      if (primaryTypes.length === 0 || primaryTypes.length > 1)
        throw new Error("Please specify primaryType");
      primaryType = primaryTypes[0];
    }
    return hashTypedData({
      message: typedMessage.message,
      domain: {
        ...typedMessage.domain,
        chainId,
        verifyingContract: typedMessage.domain.verifyingContract,
        salt: typedMessage.domain.salt
      },
      types: typedMessage.types,
      primaryType
    });
  }
  async getOffChainSignature(messageHash) {
    const response = await this.communicator.send(Methods.getOffChainSignature, messageHash);
    return response.data;
  }
  async isMessageSigned(message, signature = "0x") {
    let check;
    if (typeof message === "string") {
      check = async () => {
        const messageHash = this.calculateMessageHash(message);
        const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
        return messageHashSigned;
      };
    }
    if (isObjectEIP712TypedData(message)) {
      check = async () => {
        const messageHash = this.calculateTypedMessageHash(message);
        const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
        return messageHashSigned;
      };
    }
    if (check) {
      const isValid = await check();
      return isValid;
    }
    throw new Error("Invalid message type");
  }
  async isMessageHashSigned(messageHash, signature = "0x") {
    const checks = [this.check1271Signature.bind(this), this.check1271SignatureBytes.bind(this)];
    for (const check of checks) {
      const isValid = await check(messageHash, signature);
      if (isValid) {
        return true;
      }
    }
    return false;
  }
  async getEnvironmentInfo() {
    const response = await this.communicator.send(Methods.getEnvironmentInfo, void 0);
    return response.data;
  }
  async requestAddressBook() {
    const response = await this.communicator.send(Methods.requestAddressBook, void 0);
    return response.data;
  }
};
__decorate([
  requirePermissions_default()
], Safe.prototype, "requestAddressBook", null);

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/sdk.js
var SafeAppsSDK = class {
  constructor(opts = {}) {
    const { allowedDomains = null, debug = false } = opts;
    this.communicator = new communication_default(allowedDomains, debug);
    this.eth = new Eth(this.communicator);
    this.txs = new TXs(this.communicator);
    this.safe = new Safe(this.communicator);
    this.wallet = new Wallet(this.communicator);
  }
};
var sdk_default = SafeAppsSDK;

// node_modules/.pnpm/@safe-global+safe-apps-sdk@9.1.0_bufferutil@4.0.8_typescript@5.6.2_utf-8-validate@5.0.10/node_modules/@safe-global/safe-apps-sdk/dist/esm/index.js
var esm_default = sdk_default;
var export_Operation = import_safe_gateway_typescript_sdk.Operation;
var export_TokenType = import_safe_gateway_typescript_sdk.TokenType;
var export_TransactionStatus = import_safe_gateway_typescript_sdk.TransactionStatus;
var export_TransferDirection = import_safe_gateway_typescript_sdk.TransferDirection;
export {
  MessageFormatter,
  Methods,
  export_Operation as Operation,
  RPC_CALLS,
  RestrictedMethods,
  export_TokenType as TokenType,
  export_TransactionStatus as TransactionStatus,
  export_TransferDirection as TransferDirection,
  esm_default as default,
  getSDKVersion,
  isObjectEIP712TypedData
};
//# sourceMappingURL=esm-LHUHBEA6.js.map
