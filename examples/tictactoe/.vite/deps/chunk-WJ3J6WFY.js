import {
  createClient,
  custom,
  deployContract,
  estimateFeesPerGas,
  estimateGas,
  estimateMaxPriorityFeePerGas,
  getBalance,
  getBlock,
  getBlockNumber,
  getBlockTransactionCount,
  getCode,
  getEnsAddress,
  getEnsAvatar,
  getEnsName,
  getEnsResolver,
  getEnsText,
  getFeeHistory,
  getGasPrice,
  getProof,
  getStorageAt,
  getTransaction,
  getTransactionConfirmations,
  getTransactionCount,
  getTransactionReceipt,
  multicall,
  prepareTransactionRequest,
  publicActions,
  readContract,
  sendTransaction,
  signMessage,
  signTypedData,
  simulateContract,
  verifyMessage2 as verifyMessage,
  verifyTypedData2 as verifyTypedData,
  waitForTransactionReceipt,
  walletActions,
  watchAsset,
  watchBlockNumber,
  watchBlocks,
  watchContractEvent,
  watchPendingTransactions,
  writeContract
} from "./chunk-F6C2J6HC.js";
import {
  ContractFunctionExecutionError,
  call,
  formatUnits,
  getAddress,
  hexToString,
  parseAccount,
  trim,
  weiUnits
} from "./chunk-AIVNYPHD.js";

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/utils/getAction.js
function getAction(client, actionFn, name) {
  const action_implicit = client[actionFn.name];
  if (typeof action_implicit === "function")
    return action_implicit;
  const action_explicit = client[name];
  if (typeof action_explicit === "function")
    return action_explicit;
  return (params) => actionFn(client, params);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/call.js
async function call2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, call, "call");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/version.js
var version = "2.13.8";

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/utils/getVersion.js
var getVersion = () => `@wagmi/core@${version}`;

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/errors/base.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BaseError_instances;
var _BaseError_walk;
var BaseError = class _BaseError extends Error {
  get docsBaseUrl() {
    return "https://wagmi.sh/core";
  }
  get version() {
    return getVersion();
  }
  constructor(shortMessage, options = {}) {
    var _a;
    super();
    _BaseError_instances.add(this);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "metaMessages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WagmiCoreError"
    });
    const details = options.cause instanceof _BaseError ? options.cause.details : ((_a = options.cause) == null ? void 0 : _a.message) ? options.cause.message : options.details;
    const docsPath = options.cause instanceof _BaseError ? options.cause.docsPath || options.docsPath : options.docsPath;
    this.message = [
      shortMessage || "An error occurred.",
      "",
      ...options.metaMessages ? [...options.metaMessages, ""] : [],
      ...docsPath ? [
        `Docs: ${this.docsBaseUrl}${docsPath}.html${options.docsSlug ? `#${options.docsSlug}` : ""}`
      ] : [],
      ...details ? [`Details: ${details}`] : [],
      `Version: ${this.version}`
    ].join("\n");
    if (options.cause)
      this.cause = options.cause;
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = options.metaMessages;
    this.shortMessage = shortMessage;
  }
  walk(fn) {
    return __classPrivateFieldGet(this, _BaseError_instances, "m", _BaseError_walk).call(this, this, fn);
  }
};
_BaseError_instances = /* @__PURE__ */ new WeakSet(), _BaseError_walk = function _BaseError_walk2(err, fn) {
  if (fn == null ? void 0 : fn(err))
    return err;
  if (err.cause)
    return __classPrivateFieldGet(this, _BaseError_instances, "m", _BaseError_walk2).call(this, err.cause, fn);
  return err;
};

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/errors/config.js
var ChainNotConfiguredError = class extends BaseError {
  constructor() {
    super("Chain not configured.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ChainNotConfiguredError"
    });
  }
};
var ConnectorAlreadyConnectedError = class extends BaseError {
  constructor() {
    super("Connector already connected.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorAlreadyConnectedError"
    });
  }
};
var ConnectorNotConnectedError = class extends BaseError {
  constructor() {
    super("Connector not connected.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorNotConnectedError"
    });
  }
};
var ConnectorNotFoundError = class extends BaseError {
  constructor() {
    super("Connector not found.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorNotFoundError"
    });
  }
};
var ConnectorAccountNotFoundError = class extends BaseError {
  constructor({ address, connector }) {
    super(`Account "${address}" not found for connector "${connector.name}".`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorAccountNotFoundError"
    });
  }
};
var ConnectorChainMismatchError = class extends BaseError {
  constructor({ connectionChainId, connectorChainId }) {
    super(`The current chain of the connector (id: ${connectorChainId}) does not match the connection's chain (id: ${connectionChainId}).`, {
      metaMessages: [
        `Current Chain ID:  ${connectorChainId}`,
        `Expected Chain ID: ${connectionChainId}`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorChainMismatchError"
    });
  }
};
var ConnectorUnavailableReconnectingError = class extends BaseError {
  constructor({ connector }) {
    super(`Connector "${connector.name}" unavailable while reconnecting.`, {
      details: [
        "During the reconnection step, the only connector methods guaranteed to be available are: `id`, `name`, `type`, `uuid`.",
        "All other methods are not guaranteed to be available until reconnection completes and connectors are fully restored.",
        "This error commonly occurs for connectors that asynchronously inject after reconnection has already started."
      ].join(" ")
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorUnavailableReconnectingError"
    });
  }
};

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/connect.js
async function connect(config, parameters) {
  var _a;
  let connector;
  if (typeof parameters.connector === "function") {
    connector = config._internal.connectors.setup(parameters.connector);
  } else
    connector = parameters.connector;
  if (connector.uid === config.state.current)
    throw new ConnectorAlreadyConnectedError();
  try {
    config.setState((x) => ({ ...x, status: "connecting" }));
    connector.emitter.emit("message", { type: "connecting" });
    const data = await connector.connect({ chainId: parameters.chainId });
    const accounts = data.accounts;
    connector.emitter.off("connect", config._internal.events.connect);
    connector.emitter.on("change", config._internal.events.change);
    connector.emitter.on("disconnect", config._internal.events.disconnect);
    await ((_a = config.storage) == null ? void 0 : _a.setItem("recentConnectorId", connector.id));
    config.setState((x) => ({
      ...x,
      connections: new Map(x.connections).set(connector.uid, {
        accounts,
        chainId: data.chainId,
        connector
      }),
      current: connector.uid,
      status: "connected"
    }));
    return { accounts, chainId: data.chainId };
  } catch (error) {
    config.setState((x) => ({
      ...x,
      // Keep existing connector connected in case of error
      status: x.current ? "connected" : "disconnected"
    }));
    throw error;
  }
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getConnectorClient.js
async function getConnectorClient(config, parameters = {}) {
  let connection;
  if (parameters.connector) {
    const { connector: connector2 } = parameters;
    if (config.state.status === "reconnecting" && !connector2.getAccounts && !connector2.getChainId)
      throw new ConnectorUnavailableReconnectingError({ connector: connector2 });
    const [accounts, chainId2] = await Promise.all([
      connector2.getAccounts(),
      connector2.getChainId()
    ]);
    connection = {
      accounts,
      chainId: chainId2,
      connector: connector2
    };
  } else
    connection = config.state.connections.get(config.state.current);
  if (!connection)
    throw new ConnectorNotConnectedError();
  const chainId = parameters.chainId ?? connection.chainId;
  const connectorChainId = await connection.connector.getChainId();
  if (connectorChainId !== connection.chainId)
    throw new ConnectorChainMismatchError({
      connectionChainId: connection.chainId,
      connectorChainId
    });
  const connector = connection.connector;
  if (connector.getClient)
    return connector.getClient({ chainId });
  const account = parseAccount(parameters.account ?? connection.accounts[0]);
  account.address = getAddress(account.address);
  if (parameters.account && !connection.accounts.some((x) => x.toLowerCase() === account.address.toLowerCase()))
    throw new ConnectorAccountNotFoundError({
      address: account.address,
      connector
    });
  const chain = config.chains.find((chain2) => chain2.id === chainId);
  const provider = await connection.connector.getProvider({ chainId });
  return createClient({
    account,
    chain,
    name: "Connector Client",
    transport: (opts) => custom(provider)({ ...opts, retryCount: 0 })
  });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/deployContract.js
async function deployContract2(config, parameters) {
  const { account, chainId, connector, ...rest } = parameters;
  let client;
  if (typeof account === "object" && account.type === "local")
    client = config.getClient({ chainId });
  else
    client = await getConnectorClient(config, { account, chainId, connector });
  const action = getAction(client, deployContract, "deployContract");
  const hash = await action({
    ...rest,
    ...account ? { account } : {},
    chain: chainId ? { id: chainId } : null
  });
  return hash;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/disconnect.js
async function disconnect(config, parameters = {}) {
  var _a, _b;
  let connector;
  if (parameters.connector)
    connector = parameters.connector;
  else {
    const { connections: connections2, current } = config.state;
    const connection = connections2.get(current);
    connector = connection == null ? void 0 : connection.connector;
  }
  const connections = config.state.connections;
  if (connector) {
    await connector.disconnect();
    connector.emitter.off("change", config._internal.events.change);
    connector.emitter.off("disconnect", config._internal.events.disconnect);
    connector.emitter.on("connect", config._internal.events.connect);
    connections.delete(connector.uid);
  }
  config.setState((x) => {
    if (connections.size === 0)
      return {
        ...x,
        connections: /* @__PURE__ */ new Map(),
        current: null,
        status: "disconnected"
      };
    const nextConnection = connections.values().next().value;
    return {
      ...x,
      connections: new Map(connections),
      current: nextConnection.connector.uid
    };
  });
  {
    const current = config.state.current;
    if (!current)
      return;
    const connector2 = (_a = config.state.connections.get(current)) == null ? void 0 : _a.connector;
    if (!connector2)
      return;
    await ((_b = config.storage) == null ? void 0 : _b.setItem("recentConnectorId", connector2.id));
  }
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/estimateGas.js
async function estimateGas2(config, parameters) {
  const { chainId, connector, ...rest } = parameters;
  let account;
  if (parameters.account)
    account = parameters.account;
  else {
    const connectorClient = await getConnectorClient(config, {
      account: parameters.account,
      chainId,
      connector
    });
    account = connectorClient.account;
  }
  const client = config.getClient({ chainId });
  const action = getAction(client, estimateGas, "estimateGas");
  return action({ ...rest, account });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/utils/getUnit.js
function getUnit(unit) {
  if (typeof unit === "number")
    return unit;
  if (unit === "wei")
    return 0;
  return Math.abs(weiUnits[unit]);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/estimateFeesPerGas.js
async function estimateFeesPerGas2(config, parameters = {}) {
  const { chainId, formatUnits: units = "gwei", ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, estimateFeesPerGas, "estimateFeesPerGas");
  const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await action({
    ...rest,
    chain: client.chain
  });
  const unit = getUnit(units);
  const formatted = {
    gasPrice: gasPrice ? formatUnits(gasPrice, unit) : void 0,
    maxFeePerGas: maxFeePerGas ? formatUnits(maxFeePerGas, unit) : void 0,
    maxPriorityFeePerGas: maxPriorityFeePerGas ? formatUnits(maxPriorityFeePerGas, unit) : void 0
  };
  return {
    formatted,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/estimateMaxPriorityFeePerGas.js
async function estimateMaxPriorityFeePerGas2(config, parameters = {}) {
  const { chainId } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, estimateMaxPriorityFeePerGas, "estimateMaxPriorityFeePerGas");
  return action({ chain: client.chain });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getAccount.js
function getAccount(config) {
  const uid = config.state.current;
  const connection = config.state.connections.get(uid);
  const addresses = connection == null ? void 0 : connection.accounts;
  const address = addresses == null ? void 0 : addresses[0];
  const chain = config.chains.find((chain2) => chain2.id === (connection == null ? void 0 : connection.chainId));
  const status = config.state.status;
  switch (status) {
    case "connected":
      return {
        address,
        addresses,
        chain,
        chainId: connection == null ? void 0 : connection.chainId,
        connector: connection == null ? void 0 : connection.connector,
        isConnected: true,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: false,
        status
      };
    case "reconnecting":
      return {
        address,
        addresses,
        chain,
        chainId: connection == null ? void 0 : connection.chainId,
        connector: connection == null ? void 0 : connection.connector,
        isConnected: !!address,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: true,
        status
      };
    case "connecting":
      return {
        address,
        addresses,
        chain,
        chainId: connection == null ? void 0 : connection.chainId,
        connector: connection == null ? void 0 : connection.connector,
        isConnected: false,
        isConnecting: true,
        isDisconnected: false,
        isReconnecting: false,
        status
      };
    case "disconnected":
      return {
        address: void 0,
        addresses: void 0,
        chain: void 0,
        chainId: void 0,
        connector: void 0,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        isReconnecting: false,
        status
      };
  }
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/multicall.js
async function multicall2(config, parameters) {
  const { allowFailure = true, chainId, contracts, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, multicall, "multicall");
  return action({
    allowFailure,
    contracts,
    ...rest
  });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/readContract.js
function readContract2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, readContract, "readContract");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/readContracts.js
async function readContracts(config, parameters) {
  var _a;
  const { allowFailure = true, blockNumber, blockTag, ...rest } = parameters;
  const contracts = parameters.contracts;
  try {
    const contractsByChainId = {};
    for (const [index, contract] of contracts.entries()) {
      const chainId = contract.chainId ?? config.state.chainId;
      if (!contractsByChainId[chainId])
        contractsByChainId[chainId] = [];
      (_a = contractsByChainId[chainId]) == null ? void 0 : _a.push({ contract, index });
    }
    const promises = () => Object.entries(contractsByChainId).map(([chainId, contracts2]) => multicall2(config, {
      ...rest,
      allowFailure,
      blockNumber,
      blockTag,
      chainId: Number.parseInt(chainId),
      contracts: contracts2.map(({ contract }) => contract)
    }));
    const multicallResults = (await Promise.all(promises())).flat();
    const resultIndexes = Object.values(contractsByChainId).flatMap((contracts2) => contracts2.map(({ index }) => index));
    return multicallResults.reduce((results, result, index) => {
      if (results)
        results[resultIndexes[index]] = result;
      return results;
    }, []);
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError)
      throw error;
    const promises = () => contracts.map((contract) => readContract2(config, { ...contract, blockNumber, blockTag }));
    if (allowFailure)
      return (await Promise.allSettled(promises())).map((result) => {
        if (result.status === "fulfilled")
          return { result: result.value, status: "success" };
        return { error: result.reason, result: void 0, status: "failure" };
      });
    return await Promise.all(promises());
  }
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getBalance.js
async function getBalance2(config, parameters) {
  const { address, blockNumber, blockTag, chainId, token: tokenAddress, unit = "ether" } = parameters;
  if (tokenAddress) {
    try {
      return getTokenBalance(config, {
        balanceAddress: address,
        chainId,
        symbolType: "string",
        tokenAddress
      });
    } catch (error) {
      if (error instanceof ContractFunctionExecutionError) {
        const balance = await getTokenBalance(config, {
          balanceAddress: address,
          chainId,
          symbolType: "bytes32",
          tokenAddress
        });
        const symbol = hexToString(trim(balance.symbol, { dir: "right" }));
        return { ...balance, symbol };
      }
      throw error;
    }
  }
  const client = config.getClient({ chainId });
  const action = getAction(client, getBalance, "getBalance");
  const value = await action(blockNumber ? { address, blockNumber } : { address, blockTag });
  const chain = config.chains.find((x) => x.id === chainId) ?? client.chain;
  return {
    decimals: chain.nativeCurrency.decimals,
    formatted: formatUnits(value, getUnit(unit)),
    symbol: chain.nativeCurrency.symbol,
    value
  };
}
async function getTokenBalance(config, parameters) {
  const { balanceAddress, chainId, symbolType, tokenAddress, unit } = parameters;
  const contract = {
    abi: [
      {
        type: "function",
        name: "balanceOf",
        stateMutability: "view",
        inputs: [{ type: "address" }],
        outputs: [{ type: "uint256" }]
      },
      {
        type: "function",
        name: "decimals",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint8" }]
      },
      {
        type: "function",
        name: "symbol",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: symbolType }]
      }
    ],
    address: tokenAddress
  };
  const [value, decimals, symbol] = await readContracts(config, {
    allowFailure: false,
    contracts: [
      {
        ...contract,
        functionName: "balanceOf",
        args: [balanceAddress],
        chainId
      },
      { ...contract, functionName: "decimals", chainId },
      { ...contract, functionName: "symbol", chainId }
    ]
  });
  const formatted = formatUnits(value ?? "0", getUnit(unit ?? decimals));
  return { decimals, formatted, symbol, value };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getBlock.js
async function getBlock2(config, parameters = {}) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getBlock, "getBlock");
  const block = await action(rest);
  return {
    ...block,
    chainId: client.chain.id
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getBlockNumber.js
function getBlockNumber2(config, parameters = {}) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getBlockNumber, "getBlockNumber");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getBlockTransactionCount.js
function getBlockTransactionCount2(config, parameters = {}) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getBlockTransactionCount, "getBlockTransactionCount");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getBytecode.js
async function getBytecode(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getCode, "getBytecode");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getChainId.js
function getChainId2(config) {
  return config.state.chainId;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/utils/deepEqual.js
function deepEqual(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor)
      return false;
    let length;
    let i;
    if (Array.isArray(a) && Array.isArray(b)) {
      length = a.length;
      if (length !== b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!deepEqual(a[i], b[i]))
          return false;
      return true;
    }
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();
    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
        return false;
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key && !deepEqual(a[key], b[key]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getChains.js
var previousChains = [];
function getChains(config) {
  const chains = config.chains;
  if (deepEqual(previousChains, chains))
    return previousChains;
  previousChains = chains;
  return chains;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getClient.js
function getClient(config, parameters = {}) {
  let client = void 0;
  try {
    client = config.getClient(parameters);
  } catch {
  }
  return client;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getConnections.js
var previousConnections = [];
function getConnections(config) {
  const connections = [...config.state.connections.values()];
  if (config.state.status === "reconnecting")
    return previousConnections;
  if (deepEqual(previousConnections, connections))
    return previousConnections;
  previousConnections = connections;
  return connections;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getConnectors.js
var previousConnectors = [];
function getConnectors(config) {
  const connectors = config.connectors;
  if (deepEqual(previousConnectors, connectors))
    return previousConnectors;
  previousConnectors = connectors;
  return connectors;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getEnsAddress.js
function getEnsAddress2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getEnsAddress, "getEnsAddress");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getEnsAvatar.js
function getEnsAvatar2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getEnsAvatar, "getEnsAvatar");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getEnsName.js
function getEnsName2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getEnsName, "getEnsName");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getEnsResolver.js
function getEnsResolver2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getEnsResolver, "getEnsResolver");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getEnsText.js
function getEnsText2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getEnsText, "getEnsText");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getFeeHistory.js
function getFeeHistory2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getFeeHistory, "getFeeHistory");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getGasPrice.js
function getGasPrice2(config, parameters = {}) {
  const { chainId } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getGasPrice, "getGasPrice");
  return action({});
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getProof.js
async function getProof2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getProof, "getProof");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getPublicClient.js
function getPublicClient(config, parameters = {}) {
  const client = getClient(config, parameters);
  return client == null ? void 0 : client.extend(publicActions);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getStorageAt.js
async function getStorageAt2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getStorageAt, "getStorageAt");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getToken.js
async function getToken(config, parameters) {
  const { address, chainId, formatUnits: unit = 18 } = parameters;
  function getAbi(type) {
    return [
      {
        type: "function",
        name: "decimals",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint8" }]
      },
      {
        type: "function",
        name: "name",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type }]
      },
      {
        type: "function",
        name: "symbol",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type }]
      },
      {
        type: "function",
        name: "totalSupply",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint256" }]
      }
    ];
  }
  try {
    const abi = getAbi("string");
    const contractConfig = { address, abi, chainId };
    const [decimals, name, symbol, totalSupply] = await readContracts(config, {
      allowFailure: true,
      contracts: [
        { ...contractConfig, functionName: "decimals" },
        { ...contractConfig, functionName: "name" },
        { ...contractConfig, functionName: "symbol" },
        { ...contractConfig, functionName: "totalSupply" }
      ]
    });
    if (name.error instanceof ContractFunctionExecutionError)
      throw name.error;
    if (symbol.error instanceof ContractFunctionExecutionError)
      throw symbol.error;
    if (decimals.error)
      throw decimals.error;
    if (totalSupply.error)
      throw totalSupply.error;
    return {
      address,
      decimals: decimals.result,
      name: name.result,
      symbol: symbol.result,
      totalSupply: {
        formatted: formatUnits(totalSupply.result, getUnit(unit)),
        value: totalSupply.result
      }
    };
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      const abi = getAbi("bytes32");
      const contractConfig = { address, abi, chainId };
      const [decimals, name, symbol, totalSupply] = await readContracts(config, {
        allowFailure: false,
        contracts: [
          { ...contractConfig, functionName: "decimals" },
          { ...contractConfig, functionName: "name" },
          { ...contractConfig, functionName: "symbol" },
          { ...contractConfig, functionName: "totalSupply" }
        ]
      });
      return {
        address,
        decimals,
        name: hexToString(trim(name, { dir: "right" })),
        symbol: hexToString(trim(symbol, { dir: "right" })),
        totalSupply: {
          formatted: formatUnits(totalSupply, getUnit(unit)),
          value: totalSupply
        }
      };
    }
    throw error;
  }
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getTransaction.js
function getTransaction2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getTransaction, "getTransaction");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getTransactionConfirmations.js
function getTransactionConfirmations2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getTransactionConfirmations, "getTransactionConfirmations");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getTransactionCount.js
async function getTransactionCount2(config, parameters) {
  const { address, blockNumber, blockTag, chainId } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getTransactionCount, "getTransactionCount");
  return action(blockNumber ? { address, blockNumber } : { address, blockTag });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getTransactionReceipt.js
async function getTransactionReceipt2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, getTransactionReceipt, "getTransactionReceipt");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/getWalletClient.js
async function getWalletClient(config, parameters = {}) {
  const client = await getConnectorClient(config, parameters);
  return client.extend(walletActions);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/prepareTransactionRequest.js
async function prepareTransactionRequest2(config, parameters) {
  const { account: account_, chainId, ...rest } = parameters;
  const account = account_ ?? getAccount(config).address;
  const client = config.getClient({ chainId });
  const action = getAction(client, prepareTransactionRequest, "prepareTransactionRequest");
  return action({
    ...rest,
    ...account ? { account } : {}
  });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/reconnect.js
var isReconnecting = false;
async function reconnect(config, parameters = {}) {
  var _a, _b;
  if (isReconnecting)
    return [];
  isReconnecting = true;
  config.setState((x) => ({
    ...x,
    status: x.current ? "reconnecting" : "connecting"
  }));
  const connectors = [];
  if ((_a = parameters.connectors) == null ? void 0 : _a.length) {
    for (const connector_ of parameters.connectors) {
      let connector;
      if (typeof connector_ === "function")
        connector = config._internal.connectors.setup(connector_);
      else
        connector = connector_;
      connectors.push(connector);
    }
  } else
    connectors.push(...config.connectors);
  let recentConnectorId;
  try {
    recentConnectorId = await ((_b = config.storage) == null ? void 0 : _b.getItem("recentConnectorId"));
  } catch {
  }
  const scores = {};
  for (const [, connection] of config.state.connections) {
    scores[connection.connector.id] = 1;
  }
  if (recentConnectorId)
    scores[recentConnectorId] = 0;
  const sorted = Object.keys(scores).length > 0 ? (
    // .toSorted()
    [...connectors].sort((a, b) => (scores[a.id] ?? 10) - (scores[b.id] ?? 10))
  ) : connectors;
  let connected = false;
  const connections = [];
  const providers = [];
  for (const connector of sorted) {
    const provider = await connector.getProvider().catch(() => void 0);
    if (!provider)
      continue;
    if (providers.some((x) => x === provider))
      continue;
    const isAuthorized = await connector.isAuthorized();
    if (!isAuthorized)
      continue;
    const data = await connector.connect({ isReconnecting: true }).catch(() => null);
    if (!data)
      continue;
    connector.emitter.off("connect", config._internal.events.connect);
    connector.emitter.on("change", config._internal.events.change);
    connector.emitter.on("disconnect", config._internal.events.disconnect);
    config.setState((x) => {
      const connections2 = new Map(connected ? x.connections : /* @__PURE__ */ new Map()).set(connector.uid, { accounts: data.accounts, chainId: data.chainId, connector });
      return {
        ...x,
        current: connected ? x.current : connector.uid,
        connections: connections2
      };
    });
    connections.push({
      accounts: data.accounts,
      chainId: data.chainId,
      connector
    });
    providers.push(provider);
    connected = true;
  }
  if (config.state.status === "reconnecting" || config.state.status === "connecting") {
    if (!connected)
      config.setState((x) => ({
        ...x,
        connections: /* @__PURE__ */ new Map(),
        current: null,
        status: "disconnected"
      }));
    else
      config.setState((x) => ({ ...x, status: "connected" }));
  }
  isReconnecting = false;
  return connections;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/sendTransaction.js
async function sendTransaction2(config, parameters) {
  const { account, chainId, connector, gas: gas_, ...rest } = parameters;
  let client;
  if (typeof account === "object" && account.type === "local")
    client = config.getClient({ chainId });
  else
    client = await getConnectorClient(config, { account, chainId, connector });
  const { connector: activeConnector } = getAccount(config);
  const gas = await (async () => {
    var _a;
    if (!("data" in parameters) || !parameters.data)
      return void 0;
    if ((_a = connector ?? activeConnector) == null ? void 0 : _a.supportsSimulation)
      return void 0;
    if (gas_ === null)
      return void 0;
    if (gas_ === void 0) {
      const action2 = getAction(client, estimateGas, "estimateGas");
      return action2({
        ...rest,
        account,
        chain: chainId ? { id: chainId } : null
      });
    }
    return gas_;
  })();
  const action = getAction(client, sendTransaction, "sendTransaction");
  const hash = await action({
    ...rest,
    ...account ? { account } : {},
    gas,
    chain: chainId ? { id: chainId } : null
  });
  return hash;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/signMessage.js
async function signMessage2(config, parameters) {
  const { account, connector, ...rest } = parameters;
  let client;
  if (typeof account === "object" && account.type === "local")
    client = config.getClient();
  else
    client = await getConnectorClient(config, { account, connector });
  const action = getAction(client, signMessage, "signMessage");
  return action({
    ...rest,
    ...account ? { account } : {}
  });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/signTypedData.js
async function signTypedData2(config, parameters) {
  const { account, connector, ...rest } = parameters;
  let client;
  if (typeof account === "object" && account.type === "local")
    client = config.getClient();
  else
    client = await getConnectorClient(config, { account, connector });
  const action = getAction(client, signTypedData, "signTypedData");
  return action({
    ...rest,
    ...account ? { account } : {}
  });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/simulateContract.js
async function simulateContract2(config, parameters) {
  const { abi, chainId, connector, ...rest } = parameters;
  let account;
  if (parameters.account)
    account = parameters.account;
  else {
    const connectorClient = await getConnectorClient(config, {
      chainId,
      connector
    });
    account = connectorClient.account;
  }
  const client = config.getClient({ chainId });
  const action = getAction(client, simulateContract, "simulateContract");
  const { result, request } = await action({ ...rest, abi, account });
  return {
    chainId: client.chain.id,
    result,
    request: { __mode: "prepared", ...request, chainId }
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/switchAccount.js
async function switchAccount(config, parameters) {
  var _a;
  const { connector } = parameters;
  const connection = config.state.connections.get(connector.uid);
  if (!connection)
    throw new ConnectorNotConnectedError();
  await ((_a = config.storage) == null ? void 0 : _a.setItem("recentConnectorId", connector.id));
  config.setState((x) => ({
    ...x,
    current: connector.uid
  }));
  return {
    accounts: connection.accounts,
    chainId: connection.chainId
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/errors/connector.js
var ProviderNotFoundError = class extends BaseError {
  constructor() {
    super("Provider not found.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ProviderNotFoundError"
    });
  }
};
var SwitchChainNotSupportedError = class extends BaseError {
  constructor({ connector }) {
    super(`"${connector.name}" does not support programmatic chain switching.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SwitchChainNotSupportedError"
    });
  }
};

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/switchChain.js
async function switchChain2(config, parameters) {
  var _a;
  const { addEthereumChainParameter, chainId } = parameters;
  const connection = config.state.connections.get(((_a = parameters.connector) == null ? void 0 : _a.uid) ?? config.state.current);
  if (connection) {
    const connector = connection.connector;
    if (!connector.switchChain)
      throw new SwitchChainNotSupportedError({ connector });
    const chain2 = await connector.switchChain({
      addEthereumChainParameter,
      chainId
    });
    return chain2;
  }
  const chain = config.chains.find((x) => x.id === chainId);
  if (!chain)
    throw new ChainNotConfiguredError();
  config.setState((x) => ({ ...x, chainId }));
  return chain;
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/verifyMessage.js
async function verifyMessage2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, verifyMessage, "verifyMessage");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/verifyTypedData.js
async function verifyTypedData2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, verifyTypedData, "verifyTypedData");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchAccount.js
function watchAccount(config, parameters) {
  const { onChange } = parameters;
  return config.subscribe(() => getAccount(config), onChange, {
    equalityFn(a, b) {
      const { connector: aConnector, ...aRest } = a;
      const { connector: bConnector, ...bRest } = b;
      return deepEqual(aRest, bRest) && // check connector separately
      (aConnector == null ? void 0 : aConnector.id) === (bConnector == null ? void 0 : bConnector.id) && (aConnector == null ? void 0 : aConnector.uid) === (bConnector == null ? void 0 : bConnector.uid);
    }
  });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchAsset.js
async function watchAsset2(config, parameters) {
  const { connector, ...rest } = parameters;
  const client = await getConnectorClient(config, { connector });
  const action = getAction(client, watchAsset, "watchAsset");
  return action(rest);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchBlocks.js
function watchBlocks2(config, parameters) {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } = parameters;
  let unwatch;
  const listener = (chainId) => {
    if (unwatch)
      unwatch();
    const client = config.getClient({ chainId });
    const action = getAction(client, watchBlocks, "watchBlocks");
    unwatch = action(rest);
    return unwatch;
  };
  const unlisten = listener(parameters.chainId);
  let unsubscribe;
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(({ chainId }) => chainId, async (chainId) => listener(chainId));
  return () => {
    unlisten == null ? void 0 : unlisten();
    unsubscribe == null ? void 0 : unsubscribe();
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchBlockNumber.js
function watchBlockNumber2(config, parameters) {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } = parameters;
  let unwatch;
  const listener = (chainId) => {
    if (unwatch)
      unwatch();
    const client = config.getClient({ chainId });
    const action = getAction(client, watchBlockNumber, "watchBlockNumber");
    unwatch = action(rest);
    return unwatch;
  };
  const unlisten = listener(parameters.chainId);
  let unsubscribe;
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(({ chainId }) => chainId, async (chainId) => listener(chainId));
  return () => {
    unlisten == null ? void 0 : unlisten();
    unsubscribe == null ? void 0 : unsubscribe();
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchChainId.js
function watchChainId(config, parameters) {
  const { onChange } = parameters;
  return config.subscribe((state) => state.chainId, onChange);
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchClient.js
function watchClient(config, parameters) {
  const { onChange } = parameters;
  return config.subscribe(() => getClient(config), onChange, {
    equalityFn(a, b) {
      return (a == null ? void 0 : a.uid) === (b == null ? void 0 : b.uid);
    }
  });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchConnections.js
function watchConnections(config, parameters) {
  const { onChange } = parameters;
  return config.subscribe(() => getConnections(config), onChange, {
    equalityFn: deepEqual
  });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchConnectors.js
function watchConnectors(config, parameters) {
  const { onChange } = parameters;
  return config._internal.connectors.subscribe((connectors, prevConnectors) => {
    onChange(Object.values(connectors), prevConnectors);
  });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchContractEvent.js
function watchContractEvent2(config, parameters) {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } = parameters;
  let unwatch;
  const listener = (chainId) => {
    if (unwatch)
      unwatch();
    const client = config.getClient({ chainId });
    const action = getAction(client, watchContractEvent, "watchContractEvent");
    unwatch = action(rest);
    return unwatch;
  };
  const unlisten = listener(parameters.chainId);
  let unsubscribe;
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(({ chainId }) => chainId, async (chainId) => listener(chainId));
  return () => {
    unlisten == null ? void 0 : unlisten();
    unsubscribe == null ? void 0 : unsubscribe();
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchPendingTransactions.js
function watchPendingTransactions2(config, parameters) {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } = parameters;
  let unwatch;
  const listener = (chainId) => {
    if (unwatch)
      unwatch();
    const client = config.getClient({ chainId });
    const action = getAction(client, watchPendingTransactions, "watchPendingTransactions");
    unwatch = action(rest);
    return unwatch;
  };
  const unlisten = listener(parameters.chainId);
  let unsubscribe;
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(({ chainId }) => chainId, async (chainId) => listener(chainId));
  return () => {
    unlisten == null ? void 0 : unlisten();
    unsubscribe == null ? void 0 : unsubscribe();
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/watchPublicClient.js
function watchPublicClient(config, parameters) {
  const { onChange } = parameters;
  return config.subscribe(() => getPublicClient(config), onChange, {
    equalityFn(a, b) {
      return (a == null ? void 0 : a.uid) === (b == null ? void 0 : b.uid);
    }
  });
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/waitForTransactionReceipt.js
async function waitForTransactionReceipt2(config, parameters) {
  const { chainId, timeout = 0, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt");
  const receipt = await action({ ...rest, timeout });
  if (receipt.status === "reverted") {
    const action_getTransaction = getAction(client, getTransaction, "getTransaction");
    const txn = await action_getTransaction({ hash: receipt.transactionHash });
    const action_call = getAction(client, call, "call");
    const code = await action_call({
      ...txn,
      gasPrice: txn.type !== "eip1559" ? txn.gasPrice : void 0,
      maxFeePerGas: txn.type === "eip1559" ? txn.maxFeePerGas : void 0,
      maxPriorityFeePerGas: txn.type === "eip1559" ? txn.maxPriorityFeePerGas : void 0
    });
    const reason = (code == null ? void 0 : code.data) ? hexToString(`0x${code.data.substring(138)}`) : "unknown reason";
    throw new Error(reason);
  }
  return {
    ...receipt,
    chainId: client.chain.id
  };
}

// node_modules/.pnpm/@wagmi+core@2.13.8_@tanstack+query-core@5.59.0_@types+react@18.3.10_react@18.3.1_typescript@5_h2tfyrrrhmkrhkbftdpx2tgfly/node_modules/@wagmi/core/dist/esm/actions/writeContract.js
async function writeContract2(config, parameters) {
  const { account, chainId, connector, __mode, ...rest } = parameters;
  let client;
  if (typeof account === "object" && account.type === "local")
    client = config.getClient({ chainId });
  else
    client = await getConnectorClient(config, { account, chainId, connector });
  const { connector: activeConnector } = getAccount(config);
  let request;
  if (__mode === "prepared" || (activeConnector == null ? void 0 : activeConnector.supportsSimulation))
    request = rest;
  else {
    const { request: simulateRequest } = await simulateContract2(config, {
      ...rest,
      account,
      chainId
    });
    request = simulateRequest;
  }
  const action = getAction(client, writeContract, "writeContract");
  const hash = await action({
    ...request,
    ...account ? { account } : {},
    chain: chainId ? { id: chainId } : null
  });
  return hash;
}

export {
  call2 as call,
  version,
  BaseError,
  ChainNotConfiguredError,
  ConnectorAlreadyConnectedError,
  ConnectorNotConnectedError,
  ConnectorNotFoundError,
  ConnectorAccountNotFoundError,
  ConnectorChainMismatchError,
  ConnectorUnavailableReconnectingError,
  connect,
  getConnectorClient,
  deployContract2 as deployContract,
  disconnect,
  estimateGas2 as estimateGas,
  estimateFeesPerGas2 as estimateFeesPerGas,
  estimateMaxPriorityFeePerGas2 as estimateMaxPriorityFeePerGas,
  getAccount,
  multicall2 as multicall,
  readContract2 as readContract,
  readContracts,
  getBalance2 as getBalance,
  getBlock2 as getBlock,
  getBlockNumber2 as getBlockNumber,
  getBlockTransactionCount2 as getBlockTransactionCount,
  getBytecode,
  getChainId2 as getChainId,
  deepEqual,
  getChains,
  getClient,
  getConnections,
  getConnectors,
  getEnsAddress2 as getEnsAddress,
  getEnsAvatar2 as getEnsAvatar,
  getEnsName2 as getEnsName,
  getEnsResolver2 as getEnsResolver,
  getEnsText2 as getEnsText,
  getFeeHistory2 as getFeeHistory,
  getGasPrice2 as getGasPrice,
  getProof2 as getProof,
  getPublicClient,
  getStorageAt2 as getStorageAt,
  getToken,
  getTransaction2 as getTransaction,
  getTransactionConfirmations2 as getTransactionConfirmations,
  getTransactionCount2 as getTransactionCount,
  getTransactionReceipt2 as getTransactionReceipt,
  getWalletClient,
  prepareTransactionRequest2 as prepareTransactionRequest,
  reconnect,
  sendTransaction2 as sendTransaction,
  signMessage2 as signMessage,
  signTypedData2 as signTypedData,
  simulateContract2 as simulateContract,
  switchAccount,
  ProviderNotFoundError,
  SwitchChainNotSupportedError,
  switchChain2 as switchChain,
  verifyMessage2 as verifyMessage,
  verifyTypedData2 as verifyTypedData,
  watchAccount,
  watchAsset2 as watchAsset,
  watchBlocks2 as watchBlocks,
  watchBlockNumber2 as watchBlockNumber,
  watchChainId,
  watchClient,
  watchConnections,
  watchConnectors,
  watchContractEvent2 as watchContractEvent,
  watchPendingTransactions2 as watchPendingTransactions,
  watchPublicClient,
  waitForTransactionReceipt2 as waitForTransactionReceipt,
  writeContract2 as writeContract
};
//# sourceMappingURL=chunk-WJ3J6WFY.js.map
