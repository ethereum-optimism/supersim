System.register(['valtio/vanilla'], (function (exports) {
  'use strict';
  var subscribe, snapshot, proxy, getVersion, ref, unstable_buildProxyFunction;
  return {
    setters: [function (module) {
      subscribe = module.subscribe;
      snapshot = module.snapshot;
      proxy = module.proxy;
      getVersion = module.getVersion;
      ref = module.ref;
      unstable_buildProxyFunction = module.unstable_buildProxyFunction;
    }],
    execute: (function () {

      exports({
        addComputed: addComputed_DEPRECATED,
        derive: derive,
        devtools: devtools,
        proxyMap: proxyMap,
        proxySet: proxySet,
        proxyWithComputed: proxyWithComputed_DEPRECATED,
        proxyWithHistory: proxyWithHistory,
        subscribeKey: subscribeKey,
        underive: underive,
        watch: watch
      });

      function subscribeKey(proxyObject, key, callback, notifyInSync) {
        let prevValue = proxyObject[key];
        return subscribe(
          proxyObject,
          () => {
            const nextValue = proxyObject[key];
            if (!Object.is(prevValue, nextValue)) {
              callback(prevValue = nextValue);
            }
          },
          notifyInSync
        );
      }

      let currentCleanups;
      function watch(callback, options) {
        let alive = true;
        const cleanups = /* @__PURE__ */ new Set();
        const subscriptions = /* @__PURE__ */ new Map();
        const cleanup = () => {
          if (alive) {
            alive = false;
            cleanups.forEach((clean) => clean());
            cleanups.clear();
            subscriptions.forEach((unsubscribe) => unsubscribe());
            subscriptions.clear();
          }
        };
        const revalidate = () => {
          if (!alive) {
            return;
          }
          cleanups.forEach((clean) => clean());
          cleanups.clear();
          const proxiesToSubscribe = /* @__PURE__ */ new Set();
          const parent = currentCleanups;
          currentCleanups = cleanups;
          try {
            const cleanupReturn = callback((proxyObject) => {
              proxiesToSubscribe.add(proxyObject);
              return proxyObject;
            });
            if (cleanupReturn) {
              cleanups.add(cleanupReturn);
            }
          } finally {
            currentCleanups = parent;
          }
          subscriptions.forEach((unsubscribe, proxyObject) => {
            if (proxiesToSubscribe.has(proxyObject)) {
              proxiesToSubscribe.delete(proxyObject);
            } else {
              subscriptions.delete(proxyObject);
              unsubscribe();
            }
          });
          proxiesToSubscribe.forEach((proxyObject) => {
            const unsubscribe = subscribe(proxyObject, revalidate, options == null ? void 0 : options.sync);
            subscriptions.set(proxyObject, unsubscribe);
          });
        };
        if (currentCleanups) {
          currentCleanups.add(cleanup);
        }
        revalidate();
        return cleanup;
      }

      const DEVTOOLS = Symbol();
      function devtools(proxyObject, options) {
        if (typeof options === "string") {
          console.warn(
            "string name option is deprecated, use { name }. https://github.com/pmndrs/valtio/pull/400"
          );
          options = { name: options };
        }
        const { enabled, name = "", ...rest } = options || {};
        let extension;
        try {
          extension = (enabled != null ? enabled : true) && window.__REDUX_DEVTOOLS_EXTENSION__;
        } catch {
        }
        if (!extension) {
          if (enabled) {
            console.warn("[Warning] Please install/enable Redux devtools extension");
          }
          return;
        }
        let isTimeTraveling = false;
        const devtools2 = extension.connect({ name, ...rest });
        const unsub1 = subscribe(proxyObject, (ops) => {
          const action = ops.filter(([_, path]) => path[0] !== DEVTOOLS).map(([op, path]) => `${op}:${path.map(String).join(".")}`).join(", ");
          if (!action) {
            return;
          }
          if (isTimeTraveling) {
            isTimeTraveling = false;
          } else {
            const snapWithoutDevtools = Object.assign({}, snapshot(proxyObject));
            delete snapWithoutDevtools[DEVTOOLS];
            devtools2.send(
              {
                type: action,
                updatedAt: (/* @__PURE__ */ new Date()).toLocaleString()
              },
              snapWithoutDevtools
            );
          }
        });
        const unsub2 = devtools2.subscribe((message) => {
          var _a, _b, _c, _d, _e, _f;
          if (message.type === "ACTION" && message.payload) {
            try {
              Object.assign(proxyObject, JSON.parse(message.payload));
            } catch (e) {
              console.error(
                "please dispatch a serializable value that JSON.parse() and proxy() support\n",
                e
              );
            }
          }
          if (message.type === "DISPATCH" && message.state) {
            if (((_a = message.payload) == null ? void 0 : _a.type) === "JUMP_TO_ACTION" || ((_b = message.payload) == null ? void 0 : _b.type) === "JUMP_TO_STATE") {
              isTimeTraveling = true;
              const state = JSON.parse(message.state);
              Object.assign(proxyObject, state);
            }
            proxyObject[DEVTOOLS] = message;
          } else if (message.type === "DISPATCH" && ((_c = message.payload) == null ? void 0 : _c.type) === "COMMIT") {
            devtools2.init(snapshot(proxyObject));
          } else if (message.type === "DISPATCH" && ((_d = message.payload) == null ? void 0 : _d.type) === "IMPORT_STATE") {
            const actions = (_e = message.payload.nextLiftedState) == null ? void 0 : _e.actionsById;
            const computedStates = ((_f = message.payload.nextLiftedState) == null ? void 0 : _f.computedStates) || [];
            isTimeTraveling = true;
            computedStates.forEach(({ state }, index) => {
              const action = actions[index] || "No action found";
              Object.assign(proxyObject, state);
              if (index === 0) {
                devtools2.init(snapshot(proxyObject));
              } else {
                devtools2.send(action, snapshot(proxyObject));
              }
            });
          }
        });
        devtools2.init(snapshot(proxyObject));
        return () => {
          unsub1();
          unsub2 == null ? void 0 : unsub2();
        };
      }

      const sourceObjectMap = /* @__PURE__ */ new WeakMap();
      const derivedObjectMap = /* @__PURE__ */ new WeakMap();
      const markPending = (sourceObject, callback) => {
        const sourceObjectEntry = sourceObjectMap.get(sourceObject);
        if (sourceObjectEntry) {
          sourceObjectEntry[0].forEach((subscription) => {
            const { d: derivedObject } = subscription;
            if (sourceObject !== derivedObject) {
              markPending(derivedObject);
            }
          });
          ++sourceObjectEntry[2];
          if (callback) {
            sourceObjectEntry[3].add(callback);
          }
        }
      };
      const checkPending = (sourceObject, callback) => {
        const sourceObjectEntry = sourceObjectMap.get(sourceObject);
        if (sourceObjectEntry == null ? void 0 : sourceObjectEntry[2]) {
          sourceObjectEntry[3].add(callback);
          return true;
        }
        return false;
      };
      const unmarkPending = (sourceObject) => {
        const sourceObjectEntry = sourceObjectMap.get(sourceObject);
        if (sourceObjectEntry) {
          --sourceObjectEntry[2];
          if (!sourceObjectEntry[2]) {
            sourceObjectEntry[3].forEach((callback) => callback());
            sourceObjectEntry[3].clear();
          }
          sourceObjectEntry[0].forEach((subscription) => {
            const { d: derivedObject } = subscription;
            if (sourceObject !== derivedObject) {
              unmarkPending(derivedObject);
            }
          });
        }
      };
      const addSubscription = (subscription) => {
        const { s: sourceObject, d: derivedObject } = subscription;
        let derivedObjectEntry = derivedObjectMap.get(derivedObject);
        if (!derivedObjectEntry) {
          derivedObjectEntry = [/* @__PURE__ */ new Set()];
          derivedObjectMap.set(subscription.d, derivedObjectEntry);
        }
        derivedObjectEntry[0].add(subscription);
        let sourceObjectEntry = sourceObjectMap.get(sourceObject);
        if (!sourceObjectEntry) {
          const subscriptions = /* @__PURE__ */ new Set();
          const unsubscribe = subscribe(
            sourceObject,
            (ops) => {
              subscriptions.forEach((subscription2) => {
                const {
                  d: derivedObject2,
                  c: callback,
                  n: notifyInSync,
                  i: ignoreKeys
                } = subscription2;
                if (sourceObject === derivedObject2 && ops.every(
                  (op) => op[1].length === 1 && ignoreKeys.includes(op[1][0])
                )) {
                  return;
                }
                if (subscription2.p) {
                  return;
                }
                markPending(sourceObject, callback);
                if (notifyInSync) {
                  unmarkPending(sourceObject);
                } else {
                  subscription2.p = Promise.resolve().then(() => {
                    delete subscription2.p;
                    unmarkPending(sourceObject);
                  });
                }
              });
            },
            true
          );
          sourceObjectEntry = [subscriptions, unsubscribe, 0, /* @__PURE__ */ new Set()];
          sourceObjectMap.set(sourceObject, sourceObjectEntry);
        }
        sourceObjectEntry[0].add(subscription);
      };
      const removeSubscription = (subscription) => {
        const { s: sourceObject, d: derivedObject } = subscription;
        const derivedObjectEntry = derivedObjectMap.get(derivedObject);
        derivedObjectEntry == null ? void 0 : derivedObjectEntry[0].delete(subscription);
        if ((derivedObjectEntry == null ? void 0 : derivedObjectEntry[0].size) === 0) {
          derivedObjectMap.delete(derivedObject);
        }
        const sourceObjectEntry = sourceObjectMap.get(sourceObject);
        if (sourceObjectEntry) {
          const [subscriptions, unsubscribe] = sourceObjectEntry;
          subscriptions.delete(subscription);
          if (!subscriptions.size) {
            unsubscribe();
            sourceObjectMap.delete(sourceObject);
          }
        }
      };
      const listSubscriptions = (derivedObject) => {
        const derivedObjectEntry = derivedObjectMap.get(derivedObject);
        if (derivedObjectEntry) {
          return Array.from(derivedObjectEntry[0]);
        }
        return [];
      };
      const unstable_deriveSubscriptions = exports('unstable_deriveSubscriptions', {
        add: addSubscription,
        remove: removeSubscription,
        list: listSubscriptions
      });
      function derive(derivedFns, options) {
        const proxyObject = (options == null ? void 0 : options.proxy) || proxy({});
        const notifyInSync = !!(options == null ? void 0 : options.sync);
        const derivedKeys = Object.keys(derivedFns);
        derivedKeys.forEach((key) => {
          if (Object.getOwnPropertyDescriptor(proxyObject, key)) {
            throw new Error("object property already defined");
          }
          const fn = derivedFns[key];
          let lastDependencies = null;
          const evaluate = () => {
            if (lastDependencies) {
              if (Array.from(lastDependencies).map(([p]) => checkPending(p, evaluate)).some((isPending) => isPending)) {
                return;
              }
              if (Array.from(lastDependencies).every(
                ([p, entry]) => getVersion(p) === entry.v
              )) {
                return;
              }
            }
            const dependencies = /* @__PURE__ */ new Map();
            const get = (p) => {
              dependencies.set(p, { v: getVersion(p) });
              return p;
            };
            const value = fn(get);
            const subscribeToDependencies = () => {
              dependencies.forEach((entry, p) => {
                var _a;
                const lastSubscription = (_a = lastDependencies == null ? void 0 : lastDependencies.get(p)) == null ? void 0 : _a.s;
                if (lastSubscription) {
                  entry.s = lastSubscription;
                } else {
                  const subscription = {
                    s: p,
                    // sourceObject
                    d: proxyObject,
                    // derivedObject
                    k: key,
                    // derived key
                    c: evaluate,
                    // callback
                    n: notifyInSync,
                    i: derivedKeys
                    // ignoringKeys
                  };
                  addSubscription(subscription);
                  entry.s = subscription;
                }
              });
              lastDependencies == null ? void 0 : lastDependencies.forEach((entry, p) => {
                if (!dependencies.has(p) && entry.s) {
                  removeSubscription(entry.s);
                }
              });
              lastDependencies = dependencies;
            };
            if (value instanceof Promise) {
              value.finally(subscribeToDependencies);
            } else {
              subscribeToDependencies();
            }
            proxyObject[key] = value;
          };
          evaluate();
        });
        return proxyObject;
      }
      function underive(proxyObject, options) {
        const keysToDelete = (options == null ? void 0 : options.delete) ? /* @__PURE__ */ new Set() : null;
        listSubscriptions(proxyObject).forEach((subscription) => {
          const { k: key } = subscription;
          if (!(options == null ? void 0 : options.keys) || options.keys.includes(key)) {
            removeSubscription(subscription);
            if (keysToDelete) {
              keysToDelete.add(key);
            }
          }
        });
        if (keysToDelete) {
          keysToDelete.forEach((key) => {
            delete proxyObject[key];
          });
        }
      }

      function addComputed_DEPRECATED(proxyObject, computedFns_FAKE, targetObject = proxyObject) {
        {
          console.warn(
            "addComputed is deprecated. Please consider using `derive`. Falling back to emulation with derive. https://github.com/pmndrs/valtio/pull/201"
          );
        }
        const derivedFns = {};
        Object.keys(computedFns_FAKE).forEach((key) => {
          derivedFns[key] = (get) => computedFns_FAKE[key](get(proxyObject));
        });
        return derive(derivedFns, { proxy: targetObject });
      }

      function proxyWithComputed_DEPRECATED(initialObject, computedFns) {
        {
          console.warn(
            'proxyWithComputed is deprecated. Please follow "Computed Properties" guide in docs.'
          );
        }
        Object.keys(computedFns).forEach((key) => {
          if (Object.getOwnPropertyDescriptor(initialObject, key)) {
            throw new Error("object property already defined");
          }
          const computedFn = computedFns[key];
          const { get, set } = typeof computedFn === "function" ? { get: computedFn } : computedFn;
          const desc = {};
          desc.get = () => get(snapshot(proxyObject));
          if (set) {
            desc.set = (newValue) => set(proxyObject, newValue);
          }
          Object.defineProperty(initialObject, key, desc);
        });
        const proxyObject = proxy(initialObject);
        return proxyObject;
      }

      const isObject = (x) => typeof x === "object" && x !== null;
      let refSet;
      const deepClone = (obj) => {
        if (!refSet) {
          refSet = unstable_buildProxyFunction()[2];
        }
        if (!isObject(obj) || refSet.has(obj)) {
          return obj;
        }
        const baseObject = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
        Reflect.ownKeys(obj).forEach((key) => {
          baseObject[key] = deepClone(obj[key]);
        });
        return baseObject;
      };
      function proxyWithHistory(initialValue, skipSubscribe = false) {
        const proxyObject = proxy({
          value: initialValue,
          history: ref({
            wip: void 0,
            // to avoid infinite loop
            snapshots: [],
            index: -1
          }),
          clone: deepClone,
          canUndo: () => proxyObject.history.index > 0,
          undo: () => {
            if (proxyObject.canUndo()) {
              proxyObject.value = proxyObject.history.wip = proxyObject.clone(
                proxyObject.history.snapshots[--proxyObject.history.index]
              );
            }
          },
          canRedo: () => proxyObject.history.index < proxyObject.history.snapshots.length - 1,
          redo: () => {
            if (proxyObject.canRedo()) {
              proxyObject.value = proxyObject.history.wip = proxyObject.clone(
                proxyObject.history.snapshots[++proxyObject.history.index]
              );
            }
          },
          saveHistory: () => {
            proxyObject.history.snapshots.splice(proxyObject.history.index + 1);
            proxyObject.history.snapshots.push(snapshot(proxyObject).value);
            ++proxyObject.history.index;
          },
          subscribe: () => subscribe(proxyObject, (ops) => {
            if (ops.every(
              (op) => op[1][0] === "value" && (op[0] !== "set" || op[2] !== proxyObject.history.wip)
            )) {
              proxyObject.saveHistory();
            }
          })
        });
        proxyObject.saveHistory();
        if (!skipSubscribe) {
          proxyObject.subscribe();
        }
        return proxyObject;
      }

      function proxySet(initialValues) {
        const set = proxy({
          data: Array.from(new Set(initialValues)),
          has(value) {
            return this.data.indexOf(value) !== -1;
          },
          add(value) {
            let hasProxy = false;
            if (typeof value === "object" && value !== null) {
              hasProxy = this.data.indexOf(proxy(value)) !== -1;
            }
            if (this.data.indexOf(value) === -1 && !hasProxy) {
              this.data.push(value);
            }
            return this;
          },
          delete(value) {
            const index = this.data.indexOf(value);
            if (index === -1) {
              return false;
            }
            this.data.splice(index, 1);
            return true;
          },
          clear() {
            this.data.splice(0);
          },
          get size() {
            return this.data.length;
          },
          forEach(cb) {
            this.data.forEach((value) => {
              cb(value, value, this);
            });
          },
          get [Symbol.toStringTag]() {
            return "Set";
          },
          toJSON() {
            return new Set(this.data);
          },
          [Symbol.iterator]() {
            return this.data[Symbol.iterator]();
          },
          values() {
            return this.data.values();
          },
          keys() {
            return this.data.values();
          },
          entries() {
            return new Set(this.data).entries();
          }
        });
        Object.defineProperties(set, {
          data: {
            enumerable: false
          },
          size: {
            enumerable: false
          },
          toJSON: {
            enumerable: false
          }
        });
        Object.seal(set);
        return set;
      }

      function proxyMap(entries) {
        const map = proxy({
          data: Array.from(entries || []),
          has(key) {
            return this.data.some((p) => p[0] === key);
          },
          set(key, value) {
            const record = this.data.find((p) => p[0] === key);
            if (record) {
              record[1] = value;
            } else {
              this.data.push([key, value]);
            }
            return this;
          },
          get(key) {
            var _a;
            return (_a = this.data.find((p) => p[0] === key)) == null ? void 0 : _a[1];
          },
          delete(key) {
            const index = this.data.findIndex((p) => p[0] === key);
            if (index === -1) {
              return false;
            }
            this.data.splice(index, 1);
            return true;
          },
          clear() {
            this.data.splice(0);
          },
          get size() {
            return this.data.length;
          },
          toJSON() {
            return new Map(this.data);
          },
          forEach(cb) {
            this.data.forEach((p) => {
              cb(p[1], p[0], this);
            });
          },
          keys() {
            return this.data.map((p) => p[0]).values();
          },
          values() {
            return this.data.map((p) => p[1]).values();
          },
          entries() {
            return new Map(this.data).entries();
          },
          get [Symbol.toStringTag]() {
            return "Map";
          },
          [Symbol.iterator]() {
            return this.entries();
          }
        });
        Object.defineProperties(map, {
          data: {
            enumerable: false
          },
          size: {
            enumerable: false
          },
          toJSON: {
            enumerable: false
          }
        });
        Object.seal(map);
        return map;
      }

    })
  };
}));
