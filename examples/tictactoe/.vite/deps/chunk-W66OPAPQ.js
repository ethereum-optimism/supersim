// node_modules/.pnpm/proxy-compare@2.5.1/node_modules/proxy-compare/dist/index.modern.js
var e = Symbol();
var t = Symbol();
var s = Object.getPrototypeOf;
var c = /* @__PURE__ */ new WeakMap();
var l = (e2) => e2 && (c.has(e2) ? c.get(e2) : s(e2) === Object.prototype || s(e2) === Array.prototype);
var y = (e2) => l(e2) && e2[t] || null;
var h = (e2, t2 = true) => {
  c.set(e2, t2);
};

// node_modules/.pnpm/valtio@1.11.2_@types+react@18.3.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs
var isObject = (x) => typeof x === "object" && x !== null;
var proxyStateMap = /* @__PURE__ */ new WeakMap();
var refSet = /* @__PURE__ */ new WeakSet();
var buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x) => isObject(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
  switch (promise.status) {
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw promise;
  }
}, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
  const cache = snapCache.get(target);
  if ((cache == null ? void 0 : cache[0]) === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  h(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    if (Object.getOwnPropertyDescriptor(snap, key)) {
      return;
    }
    const value = Reflect.get(target, key);
    const desc = {
      value,
      enumerable: true,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: true
    };
    if (refSet.has(value)) {
      h(value, false);
    } else if (value instanceof Promise) {
      delete desc.value;
      desc.get = () => handlePromise(value);
    } else if (proxyStateMap.has(value)) {
      const [target2, ensureVersion] = proxyStateMap.get(
        value
      );
      desc.value = createSnapshot(
        target2,
        ensureVersion(),
        handlePromise
      );
    }
    Object.defineProperty(snap, key, desc);
  });
  return Object.preventExtensions(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction = (initialObject) => {
  if (!isObject(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    var _a;
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      (_a = entry[1]) == null ? void 0 : _a.call(entry);
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject(value)) {
        value = y(value) || value;
      }
      let nextValue = value;
      if (value instanceof Promise) {
        value.then((v) => {
          value.status = "fulfilled";
          value.value = v;
          notifyUpdate(["resolve", [prop], v]);
        }).catch((e2) => {
          value.status = "rejected";
          value.reason = e2;
          notifyUpdate(["reject", [prop], e2]);
        });
      } else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxyFunction(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [
    baseObject,
    ensureVersion,
    createSnapshot,
    addListener
  ];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(
      initialObject,
      key
    );
    if ("value" in desc) {
      proxyObject[key] = initialObject[key];
      delete desc.value;
      delete desc.writable;
    }
    Object.defineProperty(baseObject, key, desc);
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction,
  // shared state
  proxyStateMap,
  refSet,
  // internal things
  objectIs,
  newProxy,
  canProxy,
  defaultHandlePromise,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [defaultProxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return defaultProxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  const proxyState = proxyStateMap.get(proxyObject);
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}

// node_modules/.pnpm/@walletconnect+modal-core@2.6.2_@types+react@18.3.10_react@18.3.1/node_modules/@walletconnect/modal-core/dist/index.js
var o = proxy({ history: ["ConnectWallet"], view: "ConnectWallet", data: void 0 });
var T = { state: o, subscribe(e2) {
  return subscribe(o, () => e2(o));
}, push(e2, t2) {
  e2 !== o.view && (o.view = e2, t2 && (o.data = t2), o.history.push(e2));
}, reset(e2) {
  o.view = e2, o.history = [e2];
}, replace(e2) {
  o.history.length > 1 && (o.history[o.history.length - 1] = e2, o.view = e2);
}, goBack() {
  if (o.history.length > 1) {
    o.history.pop();
    const [e2] = o.history.slice(-1);
    o.view = e2;
  }
}, setData(e2) {
  o.data = e2;
} };
var a = { WALLETCONNECT_DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE", WCM_VERSION: "WCM_VERSION", RECOMMENDED_WALLET_AMOUNT: 9, isMobile() {
  return typeof window < "u" ? Boolean(window.matchMedia("(pointer:coarse)").matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : false;
}, isAndroid() {
  return a.isMobile() && navigator.userAgent.toLowerCase().includes("android");
}, isIos() {
  const e2 = navigator.userAgent.toLowerCase();
  return a.isMobile() && (e2.includes("iphone") || e2.includes("ipad"));
}, isHttpUrl(e2) {
  return e2.startsWith("http://") || e2.startsWith("https://");
}, isArray(e2) {
  return Array.isArray(e2) && e2.length > 0;
}, formatNativeUrl(e2, t2, s2) {
  if (a.isHttpUrl(e2)) return this.formatUniversalUrl(e2, t2, s2);
  let n = e2;
  n.includes("://") || (n = e2.replaceAll("/", "").replaceAll(":", ""), n = `${n}://`), n.endsWith("/") || (n = `${n}/`), this.setWalletConnectDeepLink(n, s2);
  const i = encodeURIComponent(t2);
  return `${n}wc?uri=${i}`;
}, formatUniversalUrl(e2, t2, s2) {
  if (!a.isHttpUrl(e2)) return this.formatNativeUrl(e2, t2, s2);
  let n = e2;
  n.endsWith("/") || (n = `${n}/`), this.setWalletConnectDeepLink(n, s2);
  const i = encodeURIComponent(t2);
  return `${n}wc?uri=${i}`;
}, async wait(e2) {
  return new Promise((t2) => {
    setTimeout(t2, e2);
  });
}, openHref(e2, t2) {
  window.open(e2, t2, "noreferrer noopener");
}, setWalletConnectDeepLink(e2, t2) {
  try {
    localStorage.setItem(a.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({ href: e2, name: t2 }));
  } catch {
    console.info("Unable to set WalletConnect deep link");
  }
}, setWalletConnectAndroidDeepLink(e2) {
  try {
    const [t2] = e2.split("?");
    localStorage.setItem(a.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({ href: t2, name: "Android" }));
  } catch {
    console.info("Unable to set WalletConnect android deep link");
  }
}, removeWalletConnectDeepLink() {
  try {
    localStorage.removeItem(a.WALLETCONNECT_DEEPLINK_CHOICE);
  } catch {
    console.info("Unable to remove WalletConnect deep link");
  }
}, setModalVersionInStorage() {
  try {
    typeof localStorage < "u" && localStorage.setItem(a.WCM_VERSION, "2.6.2");
  } catch {
    console.info("Unable to set Web3Modal version in storage");
  }
}, getWalletRouterData() {
  var e2;
  const t2 = (e2 = T.state.data) == null ? void 0 : e2.Wallet;
  if (!t2) throw new Error('Missing "Wallet" view data');
  return t2;
} };
var _ = typeof location < "u" && (location.hostname.includes("localhost") || location.protocol.includes("https"));
var r = proxy({ enabled: _, userSessionId: "", events: [], connectedWalletId: void 0 });
var R = { state: r, subscribe(e2) {
  return subscribe(r.events, () => e2(snapshot(r.events[r.events.length - 1])));
}, initialize() {
  r.enabled && typeof (crypto == null ? void 0 : crypto.randomUUID) < "u" && (r.userSessionId = crypto.randomUUID());
}, setConnectedWalletId(e2) {
  r.connectedWalletId = e2;
}, click(e2) {
  if (r.enabled) {
    const t2 = { type: "CLICK", name: e2.name, userSessionId: r.userSessionId, timestamp: Date.now(), data: e2 };
    r.events.push(t2);
  }
}, track(e2) {
  if (r.enabled) {
    const t2 = { type: "TRACK", name: e2.name, userSessionId: r.userSessionId, timestamp: Date.now(), data: e2 };
    r.events.push(t2);
  }
}, view(e2) {
  if (r.enabled) {
    const t2 = { type: "VIEW", name: e2.name, userSessionId: r.userSessionId, timestamp: Date.now(), data: e2 };
    r.events.push(t2);
  }
} };
var c2 = proxy({ chains: void 0, walletConnectUri: void 0, isAuth: false, isCustomDesktop: false, isCustomMobile: false, isDataLoaded: false, isUiLoaded: false });
var p = { state: c2, subscribe(e2) {
  return subscribe(c2, () => e2(c2));
}, setChains(e2) {
  c2.chains = e2;
}, setWalletConnectUri(e2) {
  c2.walletConnectUri = e2;
}, setIsCustomDesktop(e2) {
  c2.isCustomDesktop = e2;
}, setIsCustomMobile(e2) {
  c2.isCustomMobile = e2;
}, setIsDataLoaded(e2) {
  c2.isDataLoaded = e2;
}, setIsUiLoaded(e2) {
  c2.isUiLoaded = e2;
}, setIsAuth(e2) {
  c2.isAuth = e2;
} };
var W = proxy({ projectId: "", mobileWallets: void 0, desktopWallets: void 0, walletImages: void 0, chains: void 0, enableAuthMode: false, enableExplorer: true, explorerExcludedWalletIds: void 0, explorerRecommendedWalletIds: void 0, termsOfServiceUrl: void 0, privacyPolicyUrl: void 0 });
var y2 = { state: W, subscribe(e2) {
  return subscribe(W, () => e2(W));
}, setConfig(e2) {
  var t2, s2;
  R.initialize(), p.setChains(e2.chains), p.setIsAuth(Boolean(e2.enableAuthMode)), p.setIsCustomMobile(Boolean((t2 = e2.mobileWallets) == null ? void 0 : t2.length)), p.setIsCustomDesktop(Boolean((s2 = e2.desktopWallets) == null ? void 0 : s2.length)), a.setModalVersionInStorage(), Object.assign(W, e2);
} };
var V = Object.defineProperty;
var D = Object.getOwnPropertySymbols;
var H = Object.prototype.hasOwnProperty;
var B = Object.prototype.propertyIsEnumerable;
var M = (e2, t2, s2) => t2 in e2 ? V(e2, t2, { enumerable: true, configurable: true, writable: true, value: s2 }) : e2[t2] = s2;
var K = (e2, t2) => {
  for (var s2 in t2 || (t2 = {})) H.call(t2, s2) && M(e2, s2, t2[s2]);
  if (D) for (var s2 of D(t2)) B.call(t2, s2) && M(e2, s2, t2[s2]);
  return e2;
};
var L = "https://explorer-api.walletconnect.com";
var E = "wcm";
var O = "js-2.6.2";
async function w(e2, t2) {
  const s2 = K({ sdkType: E, sdkVersion: O }, t2), n = new URL(e2, L);
  return n.searchParams.append("projectId", y2.state.projectId), Object.entries(s2).forEach(([i, l2]) => {
    l2 && n.searchParams.append(i, String(l2));
  }), (await fetch(n)).json();
}
var m = { async getDesktopListings(e2) {
  return w("/w3m/v1/getDesktopListings", e2);
}, async getMobileListings(e2) {
  return w("/w3m/v1/getMobileListings", e2);
}, async getInjectedListings(e2) {
  return w("/w3m/v1/getInjectedListings", e2);
}, async getAllListings(e2) {
  return w("/w3m/v1/getAllListings", e2);
}, getWalletImageUrl(e2) {
  return `${L}/w3m/v1/getWalletImage/${e2}?projectId=${y2.state.projectId}&sdkType=${E}&sdkVersion=${O}`;
}, getAssetImageUrl(e2) {
  return `${L}/w3m/v1/getAssetImage/${e2}?projectId=${y2.state.projectId}&sdkType=${E}&sdkVersion=${O}`;
} };
var z = Object.defineProperty;
var j = Object.getOwnPropertySymbols;
var J = Object.prototype.hasOwnProperty;
var q = Object.prototype.propertyIsEnumerable;
var k = (e2, t2, s2) => t2 in e2 ? z(e2, t2, { enumerable: true, configurable: true, writable: true, value: s2 }) : e2[t2] = s2;
var F = (e2, t2) => {
  for (var s2 in t2 || (t2 = {})) J.call(t2, s2) && k(e2, s2, t2[s2]);
  if (j) for (var s2 of j(t2)) q.call(t2, s2) && k(e2, s2, t2[s2]);
  return e2;
};
var N = a.isMobile();
var d = proxy({ wallets: { listings: [], total: 0, page: 1 }, search: { listings: [], total: 0, page: 1 }, recomendedWallets: [] });
var te = { state: d, async getRecomendedWallets() {
  const { explorerRecommendedWalletIds: e2, explorerExcludedWalletIds: t2 } = y2.state;
  if (e2 === "NONE" || t2 === "ALL" && !e2) return d.recomendedWallets;
  if (a.isArray(e2)) {
    const s2 = { recommendedIds: e2.join(",") }, { listings: n } = await m.getAllListings(s2), i = Object.values(n);
    i.sort((l2, v) => {
      const b = e2.indexOf(l2.id), f = e2.indexOf(v.id);
      return b - f;
    }), d.recomendedWallets = i;
  } else {
    const { chains: s2, isAuth: n } = p.state, i = s2 == null ? void 0 : s2.join(","), l2 = a.isArray(t2), v = { page: 1, sdks: n ? "auth_v1" : void 0, entries: a.RECOMMENDED_WALLET_AMOUNT, chains: i, version: 2, excludedIds: l2 ? t2.join(",") : void 0 }, { listings: b } = N ? await m.getMobileListings(v) : await m.getDesktopListings(v);
    d.recomendedWallets = Object.values(b);
  }
  return d.recomendedWallets;
}, async getWallets(e2) {
  const t2 = F({}, e2), { explorerRecommendedWalletIds: s2, explorerExcludedWalletIds: n } = y2.state, { recomendedWallets: i } = d;
  if (n === "ALL") return d.wallets;
  i.length ? t2.excludedIds = i.map((x) => x.id).join(",") : a.isArray(s2) && (t2.excludedIds = s2.join(",")), a.isArray(n) && (t2.excludedIds = [t2.excludedIds, n].filter(Boolean).join(",")), p.state.isAuth && (t2.sdks = "auth_v1");
  const { page: l2, search: v } = e2, { listings: b, total: f } = N ? await m.getMobileListings(t2) : await m.getDesktopListings(t2), A = Object.values(b), U = v ? "search" : "wallets";
  return d[U] = { listings: [...d[U].listings, ...A], total: f, page: l2 ?? 1 }, { listings: A, total: f };
}, getWalletImageUrl(e2) {
  return m.getWalletImageUrl(e2);
}, getAssetImageUrl(e2) {
  return m.getAssetImageUrl(e2);
}, resetSearch() {
  d.search = { listings: [], total: 0, page: 1 };
} };
var I = proxy({ open: false });
var se = { state: I, subscribe(e2) {
  return subscribe(I, () => e2(I));
}, async open(e2) {
  return new Promise((t2) => {
    const { isUiLoaded: s2, isDataLoaded: n } = p.state;
    if (a.removeWalletConnectDeepLink(), p.setWalletConnectUri(e2 == null ? void 0 : e2.uri), p.setChains(e2 == null ? void 0 : e2.chains), T.reset("ConnectWallet"), s2 && n) I.open = true, t2();
    else {
      const i = setInterval(() => {
        const l2 = p.state;
        l2.isUiLoaded && l2.isDataLoaded && (clearInterval(i), I.open = true, t2());
      }, 200);
    }
  });
}, close() {
  I.open = false;
} };
var G = Object.defineProperty;
var $ = Object.getOwnPropertySymbols;
var Q = Object.prototype.hasOwnProperty;
var X = Object.prototype.propertyIsEnumerable;
var S = (e2, t2, s2) => t2 in e2 ? G(e2, t2, { enumerable: true, configurable: true, writable: true, value: s2 }) : e2[t2] = s2;
var Y = (e2, t2) => {
  for (var s2 in t2 || (t2 = {})) Q.call(t2, s2) && S(e2, s2, t2[s2]);
  if ($) for (var s2 of $(t2)) X.call(t2, s2) && S(e2, s2, t2[s2]);
  return e2;
};
function Z() {
  return typeof matchMedia < "u" && matchMedia("(prefers-color-scheme: dark)").matches;
}
var C = proxy({ themeMode: Z() ? "dark" : "light" });
var ne = { state: C, subscribe(e2) {
  return subscribe(C, () => e2(C));
}, setThemeConfig(e2) {
  const { themeMode: t2, themeVariables: s2 } = e2;
  t2 && (C.themeMode = t2), s2 && (C.themeVariables = Y({}, s2));
} };
var g = proxy({ open: false, message: "", variant: "success" });
var oe = { state: g, subscribe(e2) {
  return subscribe(g, () => e2(g));
}, openToast(e2, t2) {
  g.open = true, g.message = e2, g.variant = t2;
}, closeToast() {
  g.open = false;
} };

export {
  T,
  a,
  R,
  p,
  y2 as y,
  te,
  se,
  ne,
  oe
};
//# sourceMappingURL=chunk-W66OPAPQ.js.map
