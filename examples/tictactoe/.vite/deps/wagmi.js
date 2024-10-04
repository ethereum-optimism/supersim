import {
  cookieStorage,
  cookieToInitialState,
  createConfig,
  createConnector,
  createStorage,
  deserialize,
  fallback,
  hydrate,
  noopStorage,
  normalizeChainId,
  parseCookie,
  serialize,
  unstable_connector
} from "./chunk-XMMAOU34.js";
import "./chunk-RM5DCHXI.js";
import {
  replaceEqualDeep,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from "./chunk-54MUPFJ3.js";
import {
  require_react
} from "./chunk-5AVA5CA6.js";
import {
  BaseError,
  ChainNotConfiguredError,
  ConnectorAccountNotFoundError,
  ConnectorAlreadyConnectedError,
  ConnectorChainMismatchError,
  ConnectorNotFoundError,
  ConnectorUnavailableReconnectingError,
  ProviderNotFoundError,
  SwitchChainNotSupportedError,
  call,
  connect,
  deepEqual,
  deployContract,
  disconnect,
  estimateFeesPerGas,
  estimateGas,
  estimateMaxPriorityFeePerGas,
  getAccount,
  getBalance,
  getBlock,
  getBlockNumber,
  getBlockTransactionCount,
  getBytecode,
  getChainId,
  getChains,
  getClient,
  getConnections,
  getConnectorClient,
  getConnectors,
  getEnsAddress,
  getEnsAvatar,
  getEnsName,
  getEnsResolver,
  getEnsText,
  getFeeHistory,
  getGasPrice,
  getProof,
  getPublicClient,
  getStorageAt,
  getToken,
  getTransaction,
  getTransactionConfirmations,
  getTransactionCount,
  getTransactionReceipt,
  getWalletClient,
  prepareTransactionRequest,
  readContract,
  readContracts,
  reconnect,
  sendTransaction,
  signMessage,
  signTypedData,
  simulateContract,
  switchAccount,
  switchChain,
  verifyMessage,
  verifyTypedData,
  waitForTransactionReceipt,
  watchAccount,
  watchAsset,
  watchBlockNumber,
  watchBlocks,
  watchChainId,
  watchClient,
  watchConnections,
  watchConnectors,
  watchContractEvent,
  watchPendingTransactions,
  watchPublicClient,
  writeContract
} from "./chunk-WJ3J6WFY.js";
import {
  custom,
  http,
  webSocket
} from "./chunk-F6C2J6HC.js";
import "./chunk-AIVNYPHD.js";
import "./chunk-3WR6JLRJ.js";
import "./chunk-ONXFJJ2F.js";
import {
  __commonJS,
  __toESM
} from "./chunk-MSFXBLHD.js";

// node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React = require_react();
        var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var useState = React.useState, useEffect10 = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
        var didWarnOld18Alpha = false;
        var didWarnUncachedGetSnapshot = false;
        function useSyncExternalStore5(subscribe, getSnapshot, getServerSnapshot) {
          {
            if (!didWarnOld18Alpha) {
              if (React.startTransition !== void 0) {
                didWarnOld18Alpha = true;
                error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
              }
            }
          }
          var value = getSnapshot();
          {
            if (!didWarnUncachedGetSnapshot) {
              var cachedValue = getSnapshot();
              if (!objectIs(value, cachedValue)) {
                error("The result of getSnapshot should be cached to avoid an infinite loop");
                didWarnUncachedGetSnapshot = true;
              }
            }
          }
          var _useState = useState({
            inst: {
              value,
              getSnapshot
            }
          }), inst = _useState[0].inst, forceUpdate = _useState[1];
          useLayoutEffect(function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
          }, [subscribe, value, getSnapshot]);
          useEffect10(function() {
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
            var handleStoreChange = function() {
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
            };
            return subscribe(handleStoreChange);
          }, [subscribe]);
          useDebugValue(value);
          return value;
        }
        function checkIfSnapshotChanged(inst) {
          var latestGetSnapshot = inst.getSnapshot;
          var prevValue = inst.value;
          try {
            var nextValue = latestGetSnapshot();
            return !objectIs(prevValue, nextValue);
          } catch (error2) {
            return true;
          }
        }
        function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
          return getSnapshot();
        }
        var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
        var isServerEnvironment = !canUseDOM;
        var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore5;
        var useSyncExternalStore$2 = React.useSyncExternalStore !== void 0 ? React.useSyncExternalStore : shim;
        exports.useSyncExternalStore = useSyncExternalStore$2;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React = require_react();
        var shim = require_shim();
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var useSyncExternalStore5 = shim.useSyncExternalStore;
        var useRef5 = React.useRef, useEffect10 = React.useEffect, useMemo3 = React.useMemo, useDebugValue = React.useDebugValue;
        function useSyncExternalStoreWithSelector4(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
          var instRef = useRef5(null);
          var inst;
          if (instRef.current === null) {
            inst = {
              hasValue: false,
              value: null
            };
            instRef.current = inst;
          } else {
            inst = instRef.current;
          }
          var _useMemo = useMemo3(function() {
            var hasMemo = false;
            var memoizedSnapshot;
            var memoizedSelection;
            var memoizedSelector = function(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                var _nextSelection = selector(nextSnapshot);
                if (isEqual !== void 0) {
                  if (inst.hasValue) {
                    var currentSelection = inst.value;
                    if (isEqual(currentSelection, _nextSelection)) {
                      memoizedSelection = currentSelection;
                      return currentSelection;
                    }
                  }
                }
                memoizedSelection = _nextSelection;
                return _nextSelection;
              }
              var prevSnapshot = memoizedSnapshot;
              var prevSelection = memoizedSelection;
              if (objectIs(prevSnapshot, nextSnapshot)) {
                return prevSelection;
              }
              var nextSelection = selector(nextSnapshot);
              if (isEqual !== void 0 && isEqual(prevSelection, nextSelection)) {
                return prevSelection;
              }
              memoizedSnapshot = nextSnapshot;
              memoizedSelection = nextSelection;
              return nextSelection;
            };
            var maybeGetServerSnapshot = getServerSnapshot === void 0 ? null : getServerSnapshot;
            var getSnapshotWithSelector = function() {
              return memoizedSelector(getSnapshot());
            };
            var getServerSnapshotWithSelector = maybeGetServerSnapshot === null ? void 0 : function() {
              return memoizedSelector(maybeGetServerSnapshot());
            };
            return [getSnapshotWithSelector, getServerSnapshotWithSelector];
          }, [getSnapshot, getServerSnapshot, selector, isEqual]), getSelection = _useMemo[0], getServerSelection = _useMemo[1];
          var value = useSyncExternalStore5(subscribe, getSelection, getServerSelection);
          useEffect10(function() {
            inst.hasValue = true;
            inst.value = value;
          }, [value]);
          useDebugValue(value);
          return value;
        }
        exports.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector4;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.3.1/node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/context.js
var import_react2 = __toESM(require_react(), 1);

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hydrate.js
var import_react = __toESM(require_react(), 1);
function Hydrate(parameters) {
  const { children, config, initialState, reconnectOnMount = true } = parameters;
  const { onMount } = hydrate(config, {
    initialState,
    reconnectOnMount
  });
  if (!config._internal.ssr)
    onMount();
  const active = (0, import_react.useRef)(true);
  (0, import_react.useEffect)(() => {
    if (!active.current)
      return;
    if (!config._internal.ssr)
      return;
    onMount();
    return () => {
      active.current = false;
    };
  }, []);
  return children;
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/context.js
var WagmiContext = (0, import_react2.createContext)(void 0);
function WagmiProvider(parameters) {
  const { children, config } = parameters;
  const props = { value: config };
  return (0, import_react2.createElement)(Hydrate, parameters, (0, import_react2.createElement)(WagmiContext.Provider, props, children));
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/version.js
var version = "2.12.16";

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/utils/getVersion.js
var getVersion = () => `wagmi@${version}`;

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/errors/base.js
var BaseError2 = class extends BaseError {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WagmiError"
    });
  }
  get docsBaseUrl() {
    return "https://wagmi.sh/react";
  }
  get version() {
    return getVersion();
  }
};

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/errors/context.js
var WagmiProviderNotFoundError = class extends BaseError2 {
  constructor() {
    super("`useConfig` must be used within `WagmiProvider`.", {
      docsPath: "/api/WagmiProvider"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WagmiProviderNotFoundError"
    });
  }
};

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useConfig.js
var import_react3 = __toESM(require_react(), 1);
function useConfig(parameters = {}) {
  const config = parameters.config ?? (0, import_react3.useContext)(WagmiContext);
  if (!config)
    throw new WagmiProviderNotFoundError();
  return config;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchChains.js
function watchChains(config, parameters) {
  const { onChange } = parameters;
  return config._internal.chains.subscribe((chains, prevChains) => {
    onChange(chains, prevChains);
  });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useSyncExternalStoreWithTracked.js
var import_react4 = __toESM(require_react(), 1);
var import_with_selector = __toESM(require_with_selector(), 1);
var isPlainObject = (obj) => typeof obj === "object" && !Array.isArray(obj);
function useSyncExternalStoreWithTracked(subscribe, getSnapshot, getServerSnapshot = getSnapshot, isEqual = deepEqual) {
  const trackedKeys = (0, import_react4.useRef)([]);
  const result = (0, import_with_selector.useSyncExternalStoreWithSelector)(subscribe, getSnapshot, getServerSnapshot, (x) => x, (a, b) => {
    if (isPlainObject(a) && isPlainObject(b) && trackedKeys.current.length) {
      for (const key of trackedKeys.current) {
        const equal = isEqual(a[key], b[key]);
        if (!equal)
          return false;
      }
      return true;
    }
    return isEqual(a, b);
  });
  return (0, import_react4.useMemo)(() => {
    if (isPlainObject(result)) {
      const trackedResult = { ...result };
      let properties = {};
      for (const [key, value] of Object.entries(trackedResult)) {
        properties = {
          ...properties,
          [key]: {
            configurable: false,
            enumerable: true,
            get: () => {
              if (!trackedKeys.current.includes(key)) {
                trackedKeys.current.push(key);
              }
              return value;
            }
          }
        };
      }
      Object.defineProperties(trackedResult, properties);
      return trackedResult;
    }
    return result;
  }, [result]);
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useAccount.js
function useAccount(parameters = {}) {
  const config = useConfig(parameters);
  return useSyncExternalStoreWithTracked((onChange) => watchAccount(config, { onChange }), () => getAccount(config));
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useAccountEffect.js
var import_react5 = __toESM(require_react(), 1);
function useAccountEffect(parameters = {}) {
  const { onConnect, onDisconnect } = parameters;
  const config = useConfig(parameters);
  (0, import_react5.useEffect)(() => {
    return watchAccount(config, {
      onChange(data, prevData) {
        if ((prevData.status === "reconnecting" || prevData.status === "connecting" && prevData.address === void 0) && data.status === "connected") {
          const { address, addresses, chain, chainId, connector } = data;
          const isReconnected = prevData.status === "reconnecting" || // if `previousAccount.status` is `undefined`, the connector connected immediately.
          prevData.status === void 0;
          onConnect == null ? void 0 : onConnect({
            address,
            addresses,
            chain,
            chainId,
            connector,
            isReconnected
          });
        } else if (prevData.status === "connected" && data.status === "disconnected")
          onDisconnect == null ? void 0 : onDisconnect();
      }
    });
  }, [config, onConnect, onDisconnect]);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/utils.js
function structuralSharing(oldData, newData) {
  if (deepEqual(oldData, newData))
    return oldData;
  return replaceEqualDeep(oldData, newData);
}
function hashFn(queryKey) {
  return JSON.stringify(queryKey, (_, value) => {
    if (isPlainObject2(value))
      return Object.keys(value).sort().reduce((result, key) => {
        result[key] = value[key];
        return result;
      }, {});
    if (typeof value === "bigint")
      return value.toString();
    return value;
  });
}
function isPlainObject2(value) {
  if (!hasObjectPrototype(value)) {
    return false;
  }
  const ctor = value.constructor;
  if (typeof ctor === "undefined")
    return true;
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot))
    return false;
  if (!prot.hasOwnProperty("isPrototypeOf"))
    return false;
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function filterQueryOptions(options) {
  const {
    // import('@tanstack/query-core').QueryOptions
    _defaulted,
    behavior,
    gcTime,
    initialData,
    initialDataUpdatedAt,
    maxPages,
    meta,
    networkMode,
    queryFn,
    queryHash,
    queryKey,
    queryKeyHashFn,
    retry,
    retryDelay,
    structuralSharing: structuralSharing2,
    // import('@tanstack/query-core').InfiniteQueryObserverOptions
    getPreviousPageParam,
    getNextPageParam,
    initialPageParam,
    // import('@tanstack/react-query').UseQueryOptions
    _optimisticResults,
    enabled,
    notifyOnChangeProps,
    placeholderData,
    refetchInterval,
    refetchIntervalInBackground,
    refetchOnMount,
    refetchOnReconnect,
    refetchOnWindowFocus,
    retryOnMount,
    select,
    staleTime,
    suspense,
    throwOnError,
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // wagmi
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    config,
    connector,
    query,
    ...rest
  } = options;
  return rest;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/call.js
function callQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const data = await call(config, {
        ...parameters
      });
      return data ?? null;
    },
    queryKey: callQueryKey(options)
  };
}
function callQueryKey(options) {
  return ["call", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/connect.js
function connectMutationOptions(config) {
  return {
    mutationFn(variables) {
      return connect(config, variables);
    },
    mutationKey: ["connect"]
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/deployContract.js
function deployContractMutationOptions(config) {
  return {
    mutationFn(variables) {
      return deployContract(config, variables);
    },
    mutationKey: ["deployContract"]
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/disconnect.js
function disconnectMutationOptions(config) {
  return {
    mutationFn(variables) {
      return disconnect(config, variables);
    },
    mutationKey: ["disconnect"]
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/estimateFeesPerGas.js
function estimateFeesPerGasQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      return estimateFeesPerGas(config, parameters);
    },
    queryKey: estimateFeesPerGasQueryKey(options)
  };
}
function estimateFeesPerGasQueryKey(options = {}) {
  return ["estimateFeesPerGas", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/estimateGas.js
function estimateGasQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { connector } = options;
      const { account, scopeKey: _, ...parameters } = queryKey[1];
      if (!account && !connector)
        throw new Error("account or connector is required");
      return estimateGas(config, { account, connector, ...parameters });
    },
    queryKey: estimateGasQueryKey(options)
  };
}
function estimateGasQueryKey(options = {}) {
  const { connector: _, ...rest } = options;
  return ["estimateGas", filterQueryOptions(rest)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/estimateMaxPriorityFeePerGas.js
function estimateMaxPriorityFeePerGasQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      return estimateMaxPriorityFeePerGas(config, parameters);
    },
    queryKey: estimateMaxPriorityFeePerGasQueryKey(options)
  };
}
function estimateMaxPriorityFeePerGasQueryKey(options = {}) {
  return ["estimateMaxPriorityFeePerGas", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getBalance.js
function getBalanceQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      const balance = await getBalance(config, {
        ...parameters,
        address
      });
      return balance ?? null;
    },
    queryKey: getBalanceQueryKey(options)
  };
}
function getBalanceQueryKey(options = {}) {
  return ["balance", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getBlock.js
function getBlockQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const block = await getBlock(config, parameters);
      return block ?? null;
    },
    queryKey: getBlockQueryKey(options)
  };
}
function getBlockQueryKey(options = {}) {
  return ["block", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getBlockNumber.js
function getBlockNumberQueryOptions(config, options = {}) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const blockNumber = await getBlockNumber(config, parameters);
      return blockNumber ?? null;
    },
    queryKey: getBlockNumberQueryKey(options)
  };
}
function getBlockNumberQueryKey(options = {}) {
  return ["blockNumber", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getBlockTransactionCount.js
function getBlockTransactionCountQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const blockTransactionCount = await getBlockTransactionCount(config, parameters);
      return blockTransactionCount ?? null;
    },
    queryKey: getBlockTransactionCountQueryKey(options)
  };
}
function getBlockTransactionCountQueryKey(options = {}) {
  return ["blockTransactionCount", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getBytecode.js
function getBytecodeQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      const bytecode = await getBytecode(config, { ...parameters, address });
      return bytecode ?? null;
    },
    queryKey: getBytecodeQueryKey(options)
  };
}
function getBytecodeQueryKey(options) {
  return ["getBytecode", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getConnectorClient.js
function getConnectorClientQueryOptions(config, options = {}) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { connector } = options;
      const { connectorUid: _, scopeKey: _s, ...parameters } = queryKey[1];
      return getConnectorClient(config, {
        ...parameters,
        connector
      });
    },
    queryKey: getConnectorClientQueryKey(options)
  };
}
function getConnectorClientQueryKey(options = {}) {
  const { connector, ...parameters } = options;
  return [
    "connectorClient",
    { ...filterQueryOptions(parameters), connectorUid: connector == null ? void 0 : connector.uid }
  ];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getEnsAddress.js
function getEnsAddressQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { name, scopeKey: _, ...parameters } = queryKey[1];
      if (!name)
        throw new Error("name is required");
      return getEnsAddress(config, { ...parameters, name });
    },
    queryKey: getEnsAddressQueryKey(options)
  };
}
function getEnsAddressQueryKey(options = {}) {
  return ["ensAddress", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getEnsAvatar.js
function getEnsAvatarQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { name, scopeKey: _, ...parameters } = queryKey[1];
      if (!name)
        throw new Error("name is required");
      return getEnsAvatar(config, { ...parameters, name });
    },
    queryKey: getEnsAvatarQueryKey(options)
  };
}
function getEnsAvatarQueryKey(options = {}) {
  return ["ensAvatar", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getEnsName.js
function getEnsNameQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      return getEnsName(config, { ...parameters, address });
    },
    queryKey: getEnsNameQueryKey(options)
  };
}
function getEnsNameQueryKey(options = {}) {
  return ["ensName", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getEnsResolver.js
function getEnsResolverQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { name, scopeKey: _, ...parameters } = queryKey[1];
      if (!name)
        throw new Error("name is required");
      return getEnsResolver(config, { ...parameters, name });
    },
    queryKey: getEnsResolverQueryKey(options)
  };
}
function getEnsResolverQueryKey(options = {}) {
  return ["ensResolver", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getEnsText.js
function getEnsTextQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { key, name, scopeKey: _, ...parameters } = queryKey[1];
      if (!key || !name)
        throw new Error("key and name are required");
      return getEnsText(config, { ...parameters, key, name });
    },
    queryKey: getEnsTextQueryKey(options)
  };
}
function getEnsTextQueryKey(options = {}) {
  return ["ensText", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getFeeHistory.js
function getFeeHistoryQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { blockCount, rewardPercentiles, scopeKey: _, ...parameters } = queryKey[1];
      if (!blockCount)
        throw new Error("blockCount is required");
      if (!rewardPercentiles)
        throw new Error("rewardPercentiles is required");
      const feeHistory = await getFeeHistory(config, {
        ...parameters,
        blockCount,
        rewardPercentiles
      });
      return feeHistory ?? null;
    },
    queryKey: getFeeHistoryQueryKey(options)
  };
}
function getFeeHistoryQueryKey(options = {}) {
  return ["feeHistory", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getGasPrice.js
function getGasPriceQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const gasPrice = await getGasPrice(config, parameters);
      return gasPrice ?? null;
    },
    queryKey: getGasPriceQueryKey(options)
  };
}
function getGasPriceQueryKey(options = {}) {
  return ["gasPrice", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getProof.js
function getProofQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, storageKeys, ...parameters } = queryKey[1];
      if (!address || !storageKeys)
        throw new Error("address and storageKeys are required");
      return getProof(config, { ...parameters, address, storageKeys });
    },
    queryKey: getProofQueryKey(options)
  };
}
function getProofQueryKey(options) {
  return ["getProof", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getStorageAt.js
function getStorageAtQueryOptions(config, options = {}) {
  return {
    queryFn({ queryKey }) {
      const { address, slot, scopeKey: _, ...parameters } = queryKey[1];
      if (!address || !slot)
        throw new Error("address and slot are required");
      return getStorageAt(config, { ...parameters, address, slot });
    },
    queryKey: getStorageAtQueryKey(options)
  };
}
function getStorageAtQueryKey(options) {
  return ["getStorageAt", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getToken.js
function getTokenQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      return getToken(config, { ...parameters, address });
    },
    queryKey: getTokenQueryKey(options)
  };
}
function getTokenQueryKey(options = {}) {
  return ["token", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getTransaction.js
function getTransactionQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { blockHash, blockNumber, blockTag, hash, index } = queryKey[1];
      if (!blockHash && !blockNumber && !blockTag && !hash)
        throw new Error("blockHash, blockNumber, blockTag, or hash is required");
      if (!hash && !index)
        throw new Error("index is required for blockHash, blockNumber, or blockTag");
      const { scopeKey: _, ...rest } = queryKey[1];
      return getTransaction(config, rest);
    },
    queryKey: getTransactionQueryKey(options)
  };
}
function getTransactionQueryKey(options = {}) {
  return ["transaction", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getTransactionConfirmations.js
function getTransactionConfirmationsQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { hash, transactionReceipt, scopeKey: _, ...parameters } = queryKey[1];
      if (!hash && !transactionReceipt)
        throw new Error("hash or transactionReceipt is required");
      const confirmations = await getTransactionConfirmations(config, {
        hash,
        transactionReceipt,
        ...parameters
      });
      return confirmations ?? null;
    },
    queryKey: getTransactionConfirmationsQueryKey(options)
  };
}
function getTransactionConfirmationsQueryKey(options = {}) {
  return ["transactionConfirmations", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getTransactionCount.js
function getTransactionCountQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      const transactionCount = await getTransactionCount(config, {
        ...parameters,
        address
      });
      return transactionCount ?? null;
    },
    queryKey: getTransactionCountQueryKey(options)
  };
}
function getTransactionCountQueryKey(options = {}) {
  return ["transactionCount", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getTransactionReceipt.js
function getTransactionReceiptQueryOptions(config, options = {}) {
  return {
    queryFn({ queryKey }) {
      const { hash, scopeKey: _, ...parameters } = queryKey[1];
      if (!hash)
        throw new Error("hash is required");
      return getTransactionReceipt(config, { ...parameters, hash });
    },
    queryKey: getTransactionReceiptQueryKey(options)
  };
}
function getTransactionReceiptQueryKey(options) {
  return ["getTransactionReceipt", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/getWalletClient.js
function getWalletClientQueryOptions(config, options = {}) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { connector } = options;
      const { connectorUid: _, scopeKey: _s, ...parameters } = queryKey[1];
      return getWalletClient(config, { ...parameters, connector });
    },
    queryKey: getWalletClientQueryKey(options)
  };
}
function getWalletClientQueryKey(options = {}) {
  const { connector, ...parameters } = options;
  return [
    "walletClient",
    { ...filterQueryOptions(parameters), connectorUid: connector == null ? void 0 : connector.uid }
  ];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/infiniteReadContracts.js
function infiniteReadContractsQueryOptions(config, options) {
  return {
    ...options.query,
    async queryFn({ pageParam, queryKey }) {
      const { contracts } = options;
      const { cacheKey: _, scopeKey: _s, ...parameters } = queryKey[1];
      return await readContracts(config, {
        ...parameters,
        contracts: contracts(pageParam)
      });
    },
    queryKey: infiniteReadContractsQueryKey(options)
  };
}
function infiniteReadContractsQueryKey(options) {
  const { contracts: _, query: _q, ...parameters } = options;
  return ["infiniteReadContracts", filterQueryOptions(parameters)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/prepareTransactionRequest.js
function prepareTransactionRequestQueryOptions(config, options = {}) {
  return {
    queryFn({ queryKey }) {
      const { scopeKey: _, to, ...parameters } = queryKey[1];
      if (!to)
        throw new Error("to is required");
      return prepareTransactionRequest(config, {
        to,
        ...parameters
      });
    },
    queryKey: prepareTransactionRequestQueryKey(options)
  };
}
function prepareTransactionRequestQueryKey(options) {
  return ["prepareTransactionRequest", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/readContract.js
function readContractQueryOptions(config, options = {}) {
  return {
    // TODO: Support `signal` once Viem actions allow passthrough
    // https://tkdodo.eu/blog/why-you-want-react-query#bonus-cancellation
    async queryFn({ queryKey }) {
      const abi = options.abi;
      if (!abi)
        throw new Error("abi is required");
      const { functionName, scopeKey: _, ...parameters } = queryKey[1];
      const addressOrCodeParams = (() => {
        const params = queryKey[1];
        if (params.address)
          return { address: params.address };
        if (params.code)
          return { code: params.code };
        throw new Error("address or code is required");
      })();
      if (!functionName)
        throw new Error("functionName is required");
      return readContract(config, {
        abi,
        functionName,
        args: parameters.args,
        ...addressOrCodeParams,
        ...parameters
      });
    },
    queryKey: readContractQueryKey(options)
  };
}
function readContractQueryKey(options = {}) {
  const { abi: _, ...rest } = options;
  return ["readContract", filterQueryOptions(rest)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/readContracts.js
function readContractsQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      var _a;
      const contracts = [];
      const length = queryKey[1].contracts.length;
      for (let i = 0; i < length; i++) {
        const contract = queryKey[1].contracts[i];
        const abi = ((_a = options.contracts) == null ? void 0 : _a[i]).abi;
        contracts.push({ ...contract, abi });
      }
      const { scopeKey: _, ...parameters } = queryKey[1];
      return readContracts(config, {
        ...parameters,
        contracts
      });
    },
    queryKey: readContractsQueryKey(options)
  };
}
function readContractsQueryKey(options = {}) {
  const contracts = [];
  for (const contract of options.contracts ?? []) {
    const { abi: _, ...rest } = contract;
    contracts.push({ ...rest, chainId: rest.chainId ?? options.chainId });
  }
  return [
    "readContracts",
    filterQueryOptions({ ...options, contracts })
  ];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/reconnect.js
function reconnectMutationOptions(config) {
  return {
    mutationFn(variables) {
      return reconnect(config, variables);
    },
    mutationKey: ["reconnect"]
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/sendTransaction.js
function sendTransactionMutationOptions(config) {
  return {
    mutationFn(variables) {
      return sendTransaction(config, variables);
    },
    mutationKey: ["sendTransaction"]
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/signMessage.js
function signMessageMutationOptions(config) {
  return {
    mutationFn(variables) {
      return signMessage(config, variables);
    },
    mutationKey: ["signMessage"]
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/signTypedData.js
function signTypedDataMutationOptions(config) {
  return {
    mutationFn(variables) {
      return signTypedData(config, variables);
    },
    mutationKey: ["signTypedData"]
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/switchAccount.js
function switchAccountMutationOptions(config) {
  return {
    mutationFn(variables) {
      return switchAccount(config, variables);
    },
    mutationKey: ["switchAccount"]
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/simulateContract.js
function simulateContractQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { abi, connector } = options;
      if (!abi)
        throw new Error("abi is required");
      const { scopeKey: _, ...parameters } = queryKey[1];
      const { address, functionName } = parameters;
      if (!address)
        throw new Error("address is required");
      if (!functionName)
        throw new Error("functionName is required");
      return simulateContract(config, {
        abi,
        connector,
        ...parameters
      });
    },
    queryKey: simulateContractQueryKey(options)
  };
}
function simulateContractQueryKey(options = {}) {
  const { abi: _, connector: _c, ...rest } = options;
  return ["simulateContract", filterQueryOptions(rest)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/switchChain.js
function switchChainMutationOptions(config) {
  return {
    mutationFn(variables) {
      return switchChain(config, variables);
    },
    mutationKey: ["switchChain"]
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/verifyMessage.js
function verifyMessageQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, message, signature } = queryKey[1];
      if (!address || !message || !signature)
        throw new Error("address, message, and signature are required");
      const { scopeKey: _, ...parameters } = queryKey[1];
      const verified = await verifyMessage(config, parameters);
      return verified ?? null;
    },
    queryKey: verifyMessageQueryKey(options)
  };
}
function verifyMessageQueryKey(options) {
  return ["verifyMessage", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/verifyTypedData.js
function verifyTypedDataQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, message, primaryType, signature, types, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      if (!message)
        throw new Error("message is required");
      if (!primaryType)
        throw new Error("primaryType is required");
      if (!signature)
        throw new Error("signature is required");
      if (!types)
        throw new Error("types is required");
      const verified = await verifyTypedData(config, {
        ...parameters,
        address,
        message,
        primaryType,
        signature,
        types
      });
      return verified ?? null;
    },
    queryKey: verifyTypedDataQueryKey(options)
  };
}
function verifyTypedDataQueryKey(options) {
  return ["verifyTypedData", filterQueryOptions(options)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/waitForTransactionReceipt.js
function waitForTransactionReceiptQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { hash, ...parameters } = queryKey[1];
      if (!hash)
        throw new Error("hash is required");
      return waitForTransactionReceipt(config, {
        ...parameters,
        onReplaced: options.onReplaced,
        hash
      });
    },
    queryKey: waitForTransactionReceiptQueryKey(options)
  };
}
function waitForTransactionReceiptQueryKey(options = {}) {
  const { onReplaced: _, ...rest } = options;
  return ["waitForTransactionReceipt", filterQueryOptions(rest)];
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/watchAsset.js
function watchAssetMutationOptions(config) {
  return {
    mutationFn(variables) {
      return watchAsset(config, variables);
    },
    mutationKey: ["watchAsset"]
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/query/writeContract.js
function writeContractMutationOptions(config) {
  return {
    mutationFn(variables) {
      return writeContract(config, variables);
    },
    mutationKey: ["writeContract"]
  };
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/utils/query.js
function useQuery2(parameters) {
  const result = useQuery({
    ...parameters,
    queryKeyHashFn: hashFn
    // for bigint support
  });
  result.queryKey = parameters.queryKey;
  return result;
}
function useInfiniteQuery2(parameters) {
  const result = useInfiniteQuery({
    ...parameters,
    queryKeyHashFn: hashFn
    // for bigint support
  });
  result.queryKey = parameters.queryKey;
  return result;
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useChainId.js
var import_react6 = __toESM(require_react(), 1);
function useChainId(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_react6.useSyncExternalStore)((onChange) => watchChainId(config, { onChange }), () => getChainId(config), () => getChainId(config));
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useBalance.js
function useBalance(parameters = {}) {
  const { address, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getBalanceQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useWatchBlocks.js
var import_react7 = __toESM(require_react(), 1);
function useWatchBlocks(parameters = {}) {
  const { enabled = true, onBlock, config: _, ...rest } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  (0, import_react7.useEffect)(() => {
    if (!enabled)
      return;
    if (!onBlock)
      return;
    return watchBlocks(config, {
      ...rest,
      chainId,
      onBlock
    });
  }, [
    chainId,
    config,
    enabled,
    onBlock,
    ///
    rest.blockTag,
    rest.emitMissed,
    rest.emitOnBegin,
    rest.includeTransactions,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.syncConnectedChain
  ]);
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useBlock.js
function useBlock(parameters = {}) {
  const { query = {}, watch } = parameters;
  const config = useConfig(parameters);
  const queryClient = useQueryClient();
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  const options = getBlockQueryOptions(config, {
    ...parameters,
    chainId
  });
  const enabled = Boolean(query.enabled ?? true);
  useWatchBlocks({
    ...{
      config: parameters.config,
      chainId: parameters.chainId,
      ...typeof watch === "object" ? watch : {}
    },
    enabled: Boolean(enabled && (typeof watch === "object" ? watch.enabled : watch)),
    onBlock(block) {
      queryClient.setQueryData(options.queryKey, block);
    }
  });
  return useQuery2({
    ...query,
    ...options,
    enabled
  });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useWatchBlockNumber.js
var import_react8 = __toESM(require_react(), 1);
function useWatchBlockNumber(parameters = {}) {
  const { enabled = true, onBlockNumber, config: _, ...rest } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  (0, import_react8.useEffect)(() => {
    if (!enabled)
      return;
    if (!onBlockNumber)
      return;
    return watchBlockNumber(config, {
      ...rest,
      chainId,
      onBlockNumber
    });
  }, [
    chainId,
    config,
    enabled,
    onBlockNumber,
    ///
    rest.onError,
    rest.emitMissed,
    rest.emitOnBegin,
    rest.poll,
    rest.pollingInterval,
    rest.syncConnectedChain
  ]);
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useBlockNumber.js
function useBlockNumber(parameters = {}) {
  const { query = {}, watch } = parameters;
  const config = useConfig(parameters);
  const queryClient = useQueryClient();
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  const options = getBlockNumberQueryOptions(config, {
    ...parameters,
    chainId
  });
  useWatchBlockNumber({
    ...{
      config: parameters.config,
      chainId: parameters.chainId,
      ...typeof watch === "object" ? watch : {}
    },
    enabled: Boolean((query.enabled ?? true) && (typeof watch === "object" ? watch.enabled : watch)),
    onBlockNumber(blockNumber) {
      queryClient.setQueryData(options.queryKey, blockNumber);
    }
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useBlockTransactionCount.js
function useBlockTransactionCount(parameters = {}) {
  const { query = {} } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  const options = getBlockTransactionCountQueryOptions(config, {
    ...parameters,
    chainId
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useBytecode.js
function useBytecode(parameters = {}) {
  const { address, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getBytecodeQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useCall.js
function useCall(parameters = {}) {
  const { query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = callQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useChains.js
var import_react9 = __toESM(require_react(), 1);
function useChains(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_react9.useSyncExternalStore)((onChange) => watchChains(config, { onChange }), () => getChains(config), () => getChains(config));
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useClient.js
var import_with_selector2 = __toESM(require_with_selector(), 1);
function useClient(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_with_selector2.useSyncExternalStoreWithSelector)((onChange) => watchClient(config, { onChange }), () => getClient(config, parameters), () => getClient(config, parameters), (x) => x, (a, b) => (a == null ? void 0 : a.uid) === (b == null ? void 0 : b.uid));
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useConnect.js
var import_react11 = __toESM(require_react(), 1);

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useConnectors.js
var import_react10 = __toESM(require_react(), 1);
function useConnectors(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_react10.useSyncExternalStore)((onChange) => watchConnectors(config, { onChange }), () => getConnectors(config), () => getConnectors(config));
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useConnect.js
function useConnect(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = connectMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  (0, import_react11.useEffect)(() => {
    return config.subscribe(({ status }) => status, (status, previousStatus) => {
      if (previousStatus === "connected" && status === "disconnected")
        result.reset();
    });
  }, [config, result.reset]);
  return {
    ...result,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors: useConnectors({ config })
  };
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useConnections.js
var import_react12 = __toESM(require_react(), 1);
function useConnections(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_react12.useSyncExternalStore)((onChange) => watchConnections(config, { onChange }), () => getConnections(config), () => getConnections(config));
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useConnectorClient.js
var import_react13 = __toESM(require_react(), 1);
function useConnectorClient(parameters = {}) {
  const { query = {}, ...rest } = parameters;
  const config = useConfig(rest);
  const queryClient = useQueryClient();
  const { address, connector, status } = useAccount({ config });
  const chainId = useChainId({ config });
  const activeConnector = parameters.connector ?? connector;
  const { queryKey, ...options } = getConnectorClientQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    connector: activeConnector
  });
  const enabled = Boolean((status === "connected" || status === "reconnecting" && (activeConnector == null ? void 0 : activeConnector.getProvider)) && (query.enabled ?? true));
  const addressRef = (0, import_react13.useRef)(address);
  (0, import_react13.useEffect)(() => {
    const previousAddress = addressRef.current;
    if (!address && previousAddress) {
      queryClient.removeQueries({ queryKey });
      addressRef.current = void 0;
    } else if (address !== previousAddress) {
      queryClient.invalidateQueries({ queryKey });
      addressRef.current = address;
    }
  }, [address, queryClient]);
  return useQuery2({
    ...query,
    ...options,
    queryKey,
    enabled,
    staleTime: Number.POSITIVE_INFINITY
  });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useDeployContract.js
function useDeployContract(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = deployContractMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    deployContract: mutate,
    deployContractAsync: mutateAsync
  };
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useDisconnect.js
function useDisconnect(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = disconnectMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    connectors: useConnections({ config }).map((connection) => connection.connector),
    disconnect: mutate,
    disconnectAsync: mutateAsync
  };
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useEnsAddress.js
function useEnsAddress(parameters = {}) {
  const { name, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getEnsAddressQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(name && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useEnsAvatar.js
function useEnsAvatar(parameters = {}) {
  const { name, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getEnsAvatarQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(name && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useEnsName.js
function useEnsName(parameters = {}) {
  const { address, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getEnsNameQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useEnsResolver.js
function useEnsResolver(parameters = {}) {
  const { name, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getEnsResolverQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(name && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useEnsText.js
function useEnsText(parameters = {}) {
  const { key, name, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getEnsTextQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(key && name && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useEstimateFeesPerGas.js
function useEstimateFeesPerGas(parameters = {}) {
  const { query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = estimateFeesPerGasQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useEstimateGas.js
function useEstimateGas(parameters = {}) {
  const { connector, query = {} } = parameters;
  const config = useConfig(parameters);
  const { data: connectorClient } = useConnectorClient({
    connector,
    query: { enabled: parameters.account === void 0 }
  });
  const account = parameters.account ?? (connectorClient == null ? void 0 : connectorClient.account);
  const chainId = useChainId({ config });
  const options = estimateGasQueryOptions(config, {
    ...parameters,
    account,
    chainId: parameters.chainId ?? chainId,
    connector
  });
  const enabled = Boolean((account || connector) && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useEstimateMaxPriorityFeePerGas.js
function useEstimateMaxPriorityFeePerGas(parameters = {}) {
  const { query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = estimateMaxPriorityFeePerGasQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useFeeHistory.js
function useFeeHistory(parameters = {}) {
  const { blockCount, rewardPercentiles, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getFeeHistoryQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(blockCount && rewardPercentiles && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useGasPrice.js
function useGasPrice(parameters = {}) {
  const { query = {} } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  const options = getGasPriceQueryOptions(config, {
    ...parameters,
    chainId
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useInfiniteReadContracts.js
function useInfiniteReadContracts(parameters) {
  const { contracts = [], query } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = infiniteReadContractsQueryOptions(config, {
    ...parameters,
    chainId,
    contracts,
    query
  });
  return useInfiniteQuery2({
    ...query,
    ...options,
    initialPageParam: options.initialPageParam,
    structuralSharing: query.structuralSharing ?? structuralSharing
  });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/usePrepareTransactionRequest.js
function usePrepareTransactionRequest(parameters = {}) {
  const { to, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = prepareTransactionRequestQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(to && (query.enabled ?? true));
  return useQuery2({
    ...query,
    ...options,
    enabled
  });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useProof.js
function useProof(parameters = {}) {
  const { address, storageKeys, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getProofQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && storageKeys && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/usePublicClient.js
var import_with_selector3 = __toESM(require_with_selector(), 1);
function usePublicClient(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_with_selector3.useSyncExternalStoreWithSelector)((onChange) => watchPublicClient(config, { onChange }), () => getPublicClient(config, parameters), () => getPublicClient(config, parameters), (x) => x, (a, b) => (a == null ? void 0 : a.uid) === (b == null ? void 0 : b.uid));
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useReadContract.js
function useReadContract(parameters = {}) {
  const { abi, address, functionName, query = {} } = parameters;
  const code = parameters.code;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = readContractQueryOptions(config, { ...parameters, chainId: parameters.chainId ?? chainId });
  const enabled = Boolean((address || code) && abi && functionName && (query.enabled ?? true));
  return useQuery2({
    ...query,
    ...options,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing
  });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useReadContracts.js
var import_react14 = __toESM(require_react(), 1);
function useReadContracts(parameters = {}) {
  const { contracts = [], query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = readContractsQueryOptions(config, { ...parameters, chainId });
  const enabled = (0, import_react14.useMemo)(() => {
    let isContractsValid = false;
    for (const contract of contracts) {
      const { abi, address, functionName } = contract;
      if (!abi || !address || !functionName) {
        isContractsValid = false;
        break;
      }
      isContractsValid = true;
    }
    return Boolean(isContractsValid && (query.enabled ?? true));
  }, [contracts, query.enabled]);
  return useQuery2({
    ...options,
    ...query,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing
  });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useReconnect.js
function useReconnect(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = reconnectMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    connectors: config.connectors,
    reconnect: mutate,
    reconnectAsync: mutateAsync
  };
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useSendTransaction.js
function useSendTransaction(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = sendTransactionMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    sendTransaction: mutate,
    sendTransactionAsync: mutateAsync
  };
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useSignMessage.js
function useSignMessage(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = signMessageMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    signMessage: mutate,
    signMessageAsync: mutateAsync
  };
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useSignTypedData.js
function useSignTypedData(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = signTypedDataMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    signTypedData: mutate,
    signTypedDataAsync: mutateAsync
  };
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useSimulateContract.js
function useSimulateContract(parameters = {}) {
  const { abi, address, connector, functionName, query = {} } = parameters;
  const config = useConfig(parameters);
  const { data: connectorClient } = useConnectorClient({
    connector,
    query: { enabled: parameters.account === void 0 }
  });
  const chainId = useChainId({ config });
  const options = simulateContractQueryOptions(config, {
    ...parameters,
    account: parameters.account ?? (connectorClient == null ? void 0 : connectorClient.account),
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(abi && address && functionName && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useStorageAt.js
function useStorageAt(parameters = {}) {
  const { address, slot, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getStorageAtQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && slot && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useSwitchAccount.js
function useSwitchAccount(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = switchAccountMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    connectors: useConnections({ config }).map((connection) => connection.connector),
    switchAccount: mutate,
    switchAccountAsync: mutateAsync
  };
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js
function useSwitchChain(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = switchChainMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    chains: useChains({ config }),
    switchChain: mutate,
    switchChainAsync: mutateAsync
  };
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useToken.js
function useToken(parameters = {}) {
  const { address, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getTokenQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useTransaction.js
function useTransaction(parameters = {}) {
  const { blockHash, blockNumber, blockTag, hash, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getTransactionQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(!(blockHash && blockNumber && blockTag && hash) && (query.enabled ?? true));
  return useQuery2({
    ...query,
    ...options,
    enabled
  });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useTransactionConfirmations.js
function useTransactionConfirmations(parameters = {}) {
  const { hash, transactionReceipt, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getTransactionConfirmationsQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(!(hash && transactionReceipt) && (hash || transactionReceipt) && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useTransactionCount.js
function useTransactionCount(parameters = {}) {
  const { address, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getTransactionCountQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useTransactionReceipt.js
function useTransactionReceipt(parameters = {}) {
  const { hash, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getTransactionReceiptQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(hash && (query.enabled ?? true));
  return useQuery2({
    ...query,
    ...options,
    enabled
  });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useVerifyMessage.js
function useVerifyMessage(parameters = {}) {
  const { address, message, signature, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = verifyMessageQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && message && signature && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useVerifyTypedData.js
function useVerifyTypedData(parameters = {}) {
  const { address, message, primaryType, signature, types, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = verifyTypedDataQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && message && primaryType && signature && types && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useWalletClient.js
var import_react15 = __toESM(require_react(), 1);
function useWalletClient(parameters = {}) {
  const { query = {}, ...rest } = parameters;
  const config = useConfig(rest);
  const queryClient = useQueryClient();
  const { address, connector, status } = useAccount({ config });
  const chainId = useChainId({ config });
  const activeConnector = parameters.connector ?? connector;
  const { queryKey, ...options } = getWalletClientQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    connector: parameters.connector ?? connector
  });
  const enabled = Boolean((status === "connected" || status === "reconnecting" && (activeConnector == null ? void 0 : activeConnector.getProvider)) && (query.enabled ?? true));
  const addressRef = (0, import_react15.useRef)(address);
  (0, import_react15.useEffect)(() => {
    const previousAddress = addressRef.current;
    if (!address && previousAddress) {
      queryClient.removeQueries({ queryKey });
      addressRef.current = void 0;
    } else if (address !== previousAddress) {
      queryClient.invalidateQueries({ queryKey });
      addressRef.current = address;
    }
  }, [address, queryClient]);
  return useQuery2({
    ...query,
    ...options,
    queryKey,
    enabled,
    staleTime: Number.POSITIVE_INFINITY
  });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js
function useWaitForTransactionReceipt(parameters = {}) {
  const { hash, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = waitForTransactionReceiptQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(hash && (query.enabled ?? true));
  return useQuery2({
    ...query,
    ...options,
    enabled
  });
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useWatchAsset.js
function useWatchAsset(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = watchAssetMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    watchAsset: mutate,
    watchAssetAsync: mutateAsync
  };
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useWatchContractEvent.js
var import_react16 = __toESM(require_react(), 1);
function useWatchContractEvent(parameters = {}) {
  const { enabled = true, onLogs, config: _, ...rest } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  (0, import_react16.useEffect)(() => {
    if (!enabled)
      return;
    if (!onLogs)
      return;
    return watchContractEvent(config, {
      ...rest,
      chainId,
      onLogs
    });
  }, [
    chainId,
    config,
    enabled,
    onLogs,
    ///
    rest.abi,
    rest.address,
    rest.args,
    rest.batch,
    rest.eventName,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.strict,
    rest.syncConnectedChain
  ]);
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useWatchPendingTransactions.js
var import_react17 = __toESM(require_react(), 1);
function useWatchPendingTransactions(parameters = {}) {
  const { enabled = true, onTransactions, config: _, ...rest } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  (0, import_react17.useEffect)(() => {
    if (!enabled)
      return;
    if (!onTransactions)
      return;
    return watchPendingTransactions(config, {
      ...rest,
      chainId,
      onTransactions
    });
  }, [
    chainId,
    config,
    enabled,
    onTransactions,
    ///
    rest.batch,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.syncConnectedChain
  ]);
}

// node_modules/.pnpm/wagmi@2.12.16_@tanstack+query-core@5.59.0_@tanstack+react-query@5.59.0_react@18.3.1__@types+r_oraoezbsrsvbatbylgeouedlqm/node_modules/wagmi/dist/esm/hooks/useWriteContract.js
function useWriteContract(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = writeContractMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    writeContract: mutate,
    writeContractAsync: mutateAsync
  };
}
export {
  BaseError2 as BaseError,
  ChainNotConfiguredError,
  ConnectorAccountNotFoundError,
  ConnectorAlreadyConnectedError,
  ConnectorChainMismatchError,
  ConnectorNotFoundError,
  ConnectorUnavailableReconnectingError,
  WagmiContext as Context,
  Hydrate,
  ProviderNotFoundError,
  SwitchChainNotSupportedError,
  WagmiProvider as WagmiConfig,
  WagmiContext,
  WagmiProvider,
  WagmiProviderNotFoundError,
  cookieStorage,
  cookieToInitialState,
  createConfig,
  createConnector,
  createStorage,
  custom,
  deepEqual,
  deserialize,
  fallback,
  http,
  noopStorage,
  normalizeChainId,
  parseCookie,
  serialize,
  unstable_connector,
  useAccount,
  useAccountEffect,
  useBalance,
  useBlock,
  useBlockNumber,
  useBlockTransactionCount,
  useBytecode,
  useCall,
  useChainId,
  useChains,
  useClient,
  useConfig,
  useConnect,
  useConnections,
  useConnectorClient,
  useConnectors,
  useInfiniteReadContracts as useContractInfiniteReads,
  useReadContract as useContractRead,
  useReadContracts as useContractReads,
  useWriteContract as useContractWrite,
  useDeployContract,
  useDisconnect,
  useEnsAddress,
  useEnsAvatar,
  useEnsName,
  useEnsResolver,
  useEnsText,
  useEstimateFeesPerGas,
  useEstimateGas,
  useEstimateMaxPriorityFeePerGas,
  useEstimateFeesPerGas as useFeeData,
  useFeeHistory,
  useGasPrice,
  useInfiniteReadContracts,
  usePrepareTransactionRequest,
  useProof,
  usePublicClient,
  useReadContract,
  useReadContracts,
  useReconnect,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useSimulateContract,
  useStorageAt,
  useSwitchAccount,
  useSwitchChain,
  useToken,
  useTransaction,
  useTransactionConfirmations,
  useTransactionCount,
  useTransactionReceipt,
  useVerifyMessage,
  useVerifyTypedData,
  useWaitForTransactionReceipt,
  useWalletClient,
  useWatchAsset,
  useWatchBlockNumber,
  useWatchBlocks,
  useWatchContractEvent,
  useWatchPendingTransactions,
  useWriteContract,
  version,
  webSocket
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=wagmi.js.map
