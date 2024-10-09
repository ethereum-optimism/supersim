(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('valtio/vanilla')) :
  typeof define === 'function' && define.amd ? define(['exports', 'valtio/vanilla'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.valtioVanillaUtils = {}, global.valtioVanilla));
})(this, (function (exports, vanilla) { 'use strict';

  function subscribeKey(proxyObject, key, callback, notifyInSync) {
    var prevValue = proxyObject[key];
    return vanilla.subscribe(proxyObject, function () {
      var nextValue = proxyObject[key];
      if (!Object.is(prevValue, nextValue)) {
        callback(prevValue = nextValue);
      }
    }, notifyInSync);
  }

  var currentCleanups;
  function watch(callback, options) {
    var alive = true;
    var cleanups = new Set();
    var subscriptions = new Map();
    var cleanup = function cleanup() {
      if (alive) {
        alive = false;
        cleanups.forEach(function (clean) {
          return clean();
        });
        cleanups.clear();
        subscriptions.forEach(function (unsubscribe) {
          return unsubscribe();
        });
        subscriptions.clear();
      }
    };
    var revalidate = function revalidate() {
      if (!alive) {
        return;
      }
      cleanups.forEach(function (clean) {
        return clean();
      });
      cleanups.clear();
      var proxiesToSubscribe = new Set();
      var parent = currentCleanups;
      currentCleanups = cleanups;
      try {
        var cleanupReturn = callback(function (proxyObject) {
          proxiesToSubscribe.add(proxyObject);
          return proxyObject;
        });
        if (cleanupReturn) {
          cleanups.add(cleanupReturn);
        }
      } finally {
        currentCleanups = parent;
      }
      subscriptions.forEach(function (unsubscribe, proxyObject) {
        if (proxiesToSubscribe.has(proxyObject)) {
          proxiesToSubscribe.delete(proxyObject);
        } else {
          subscriptions.delete(proxyObject);
          unsubscribe();
        }
      });
      proxiesToSubscribe.forEach(function (proxyObject) {
        var unsubscribe = vanilla.subscribe(proxyObject, revalidate, options == null ? void 0 : options.sync);
        subscriptions.set(proxyObject, unsubscribe);
      });
    };
    if (currentCleanups) {
      currentCleanups.add(cleanup);
    }
    revalidate();
    return cleanup;
  }

  function _defineAccessor(type, obj, key, fn) {
    var desc = {
      configurable: !0,
      enumerable: !0
    };
    return desc[type] = fn, Object.defineProperty(obj, key, desc);
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }

  var _excluded = ["enabled", "name"];
  var DEVTOOLS = Symbol();
  function devtools(proxyObject, options) {
    if (typeof options === 'string') {
      console.warn('string name option is deprecated, use { name }. https://github.com/pmndrs/valtio/pull/400');
      options = {
        name: options
      };
    }
    var _ref = options || {},
      enabled = _ref.enabled,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? '' : _ref$name,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);
    var extension;
    try {
      extension = (enabled != null ? enabled : "development" !== 'production') && window.__REDUX_DEVTOOLS_EXTENSION__;
    } catch (_unused) {}
    if (!extension) {
      if (enabled) {
        console.warn('[Warning] Please install/enable Redux devtools extension');
      }
      return;
    }
    var isTimeTraveling = false;
    var devtools = extension.connect(_extends({
      name: name
    }, rest));
    var unsub1 = vanilla.subscribe(proxyObject, function (ops) {
      var action = ops.filter(function (_ref2) {
        _ref2[0];
          var path = _ref2[1];
        return path[0] !== DEVTOOLS;
      }).map(function (_ref3) {
        var op = _ref3[0],
          path = _ref3[1];
        return op + ":" + path.map(String).join('.');
      }).join(', ');
      if (!action) {
        return;
      }
      if (isTimeTraveling) {
        isTimeTraveling = false;
      } else {
        var snapWithoutDevtools = Object.assign({}, vanilla.snapshot(proxyObject));
        delete snapWithoutDevtools[DEVTOOLS];
        devtools.send({
          type: action,
          updatedAt: new Date().toLocaleString()
        }, snapWithoutDevtools);
      }
    });
    var unsub2 = devtools.subscribe(function (message) {
      var _message$payload3, _message$payload4;
      if (message.type === 'ACTION' && message.payload) {
        try {
          Object.assign(proxyObject, JSON.parse(message.payload));
        } catch (e) {
          console.error('please dispatch a serializable value that JSON.parse() and proxy() support\n', e);
        }
      }
      if (message.type === 'DISPATCH' && message.state) {
        var _message$payload, _message$payload2;
        if (((_message$payload = message.payload) == null ? void 0 : _message$payload.type) === 'JUMP_TO_ACTION' || ((_message$payload2 = message.payload) == null ? void 0 : _message$payload2.type) === 'JUMP_TO_STATE') {
          isTimeTraveling = true;
          var state = JSON.parse(message.state);
          Object.assign(proxyObject, state);
        }
        proxyObject[DEVTOOLS] = message;
      } else if (message.type === 'DISPATCH' && ((_message$payload3 = message.payload) == null ? void 0 : _message$payload3.type) === 'COMMIT') {
        devtools.init(vanilla.snapshot(proxyObject));
      } else if (message.type === 'DISPATCH' && ((_message$payload4 = message.payload) == null ? void 0 : _message$payload4.type) === 'IMPORT_STATE') {
        var _message$payload$next, _message$payload$next2;
        var actions = (_message$payload$next = message.payload.nextLiftedState) == null ? void 0 : _message$payload$next.actionsById;
        var computedStates = ((_message$payload$next2 = message.payload.nextLiftedState) == null ? void 0 : _message$payload$next2.computedStates) || [];
        isTimeTraveling = true;
        computedStates.forEach(function (_ref4, index) {
          var state = _ref4.state;
          var action = actions[index] || 'No action found';
          Object.assign(proxyObject, state);
          if (index === 0) {
            devtools.init(vanilla.snapshot(proxyObject));
          } else {
            devtools.send(action, vanilla.snapshot(proxyObject));
          }
        });
      }
    });
    devtools.init(vanilla.snapshot(proxyObject));
    return function () {
      unsub1();
      unsub2 == null ? void 0 : unsub2();
    };
  }

  var sourceObjectMap = new WeakMap();
  var derivedObjectMap = new WeakMap();
  var markPending = function markPending(sourceObject, callback) {
    var sourceObjectEntry = sourceObjectMap.get(sourceObject);
    if (sourceObjectEntry) {
      sourceObjectEntry[0].forEach(function (subscription) {
        var derivedObject = subscription.d;
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
  var checkPending = function checkPending(sourceObject, callback) {
    var sourceObjectEntry = sourceObjectMap.get(sourceObject);
    if (sourceObjectEntry != null && sourceObjectEntry[2]) {
      sourceObjectEntry[3].add(callback);
      return true;
    }
    return false;
  };
  var unmarkPending = function unmarkPending(sourceObject) {
    var sourceObjectEntry = sourceObjectMap.get(sourceObject);
    if (sourceObjectEntry) {
      --sourceObjectEntry[2];
      if (!sourceObjectEntry[2]) {
        sourceObjectEntry[3].forEach(function (callback) {
          return callback();
        });
        sourceObjectEntry[3].clear();
      }
      sourceObjectEntry[0].forEach(function (subscription) {
        var derivedObject = subscription.d;
        if (sourceObject !== derivedObject) {
          unmarkPending(derivedObject);
        }
      });
    }
  };
  var addSubscription = function addSubscription(subscription) {
    var sourceObject = subscription.s,
      derivedObject = subscription.d;
    var derivedObjectEntry = derivedObjectMap.get(derivedObject);
    if (!derivedObjectEntry) {
      derivedObjectEntry = [new Set()];
      derivedObjectMap.set(subscription.d, derivedObjectEntry);
    }
    derivedObjectEntry[0].add(subscription);
    var sourceObjectEntry = sourceObjectMap.get(sourceObject);
    if (!sourceObjectEntry) {
      var _subscriptions = new Set();
      var _unsubscribe = vanilla.subscribe(sourceObject, function (ops) {
        _subscriptions.forEach(function (subscription) {
          var derivedObject = subscription.d,
            callback = subscription.c,
            notifyInSync = subscription.n,
            ignoreKeys = subscription.i;
          if (sourceObject === derivedObject && ops.every(function (op) {
            return op[1].length === 1 && ignoreKeys.includes(op[1][0]);
          })) {
            return;
          }
          if (subscription.p) {
            return;
          }
          markPending(sourceObject, callback);
          if (notifyInSync) {
            unmarkPending(sourceObject);
          } else {
            subscription.p = Promise.resolve().then(function () {
              delete subscription.p;
              unmarkPending(sourceObject);
            });
          }
        });
      }, true);
      sourceObjectEntry = [_subscriptions, _unsubscribe, 0, new Set()];
      sourceObjectMap.set(sourceObject, sourceObjectEntry);
    }
    sourceObjectEntry[0].add(subscription);
  };
  var removeSubscription = function removeSubscription(subscription) {
    var sourceObject = subscription.s,
      derivedObject = subscription.d;
    var derivedObjectEntry = derivedObjectMap.get(derivedObject);
    derivedObjectEntry == null ? void 0 : derivedObjectEntry[0].delete(subscription);
    if ((derivedObjectEntry == null ? void 0 : derivedObjectEntry[0].size) === 0) {
      derivedObjectMap.delete(derivedObject);
    }
    var sourceObjectEntry = sourceObjectMap.get(sourceObject);
    if (sourceObjectEntry) {
      var _subscriptions2 = sourceObjectEntry[0],
        _unsubscribe2 = sourceObjectEntry[1];
      _subscriptions2.delete(subscription);
      if (!_subscriptions2.size) {
        _unsubscribe2();
        sourceObjectMap.delete(sourceObject);
      }
    }
  };
  var listSubscriptions = function listSubscriptions(derivedObject) {
    var derivedObjectEntry = derivedObjectMap.get(derivedObject);
    if (derivedObjectEntry) {
      return Array.from(derivedObjectEntry[0]);
    }
    return [];
  };
  var unstable_deriveSubscriptions = {
    add: addSubscription,
    remove: removeSubscription,
    list: listSubscriptions
  };
  function derive(derivedFns, options) {
    var proxyObject = (options == null ? void 0 : options.proxy) || vanilla.proxy({});
    var notifyInSync = !!(options != null && options.sync);
    var derivedKeys = Object.keys(derivedFns);
    derivedKeys.forEach(function (key) {
      if (Object.getOwnPropertyDescriptor(proxyObject, key)) {
        throw new Error('object property already defined');
      }
      var fn = derivedFns[key];
      var lastDependencies = null;
      var evaluate = function evaluate() {
        if (lastDependencies) {
          if (Array.from(lastDependencies).map(function (_ref) {
            var p = _ref[0];
            return checkPending(p, evaluate);
          }).some(function (isPending) {
            return isPending;
          })) {
            return;
          }
          if (Array.from(lastDependencies).every(function (_ref2) {
            var p = _ref2[0],
              entry = _ref2[1];
            return vanilla.getVersion(p) === entry.v;
          })) {
            return;
          }
        }
        var dependencies = new Map();
        var get = function get(p) {
          dependencies.set(p, {
            v: vanilla.getVersion(p)
          });
          return p;
        };
        var value = fn(get);
        var subscribeToDependencies = function subscribeToDependencies() {
          var _lastDependencies2;
          dependencies.forEach(function (entry, p) {
            var _lastDependencies;
            var lastSubscription = (_lastDependencies = lastDependencies) == null || (_lastDependencies = _lastDependencies.get(p)) == null ? void 0 : _lastDependencies.s;
            if (lastSubscription) {
              entry.s = lastSubscription;
            } else {
              var subscription = {
                s: p,
                d: proxyObject,
                k: key,
                c: evaluate,
                n: notifyInSync,
                i: derivedKeys
              };
              addSubscription(subscription);
              entry.s = subscription;
            }
          });
          (_lastDependencies2 = lastDependencies) == null ? void 0 : _lastDependencies2.forEach(function (entry, p) {
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
    var keysToDelete = options != null && options.delete ? new Set() : null;
    listSubscriptions(proxyObject).forEach(function (subscription) {
      var key = subscription.k;
      if (!(options != null && options.keys) || options.keys.includes(key)) {
        removeSubscription(subscription);
        if (keysToDelete) {
          keysToDelete.add(key);
        }
      }
    });
    if (keysToDelete) {
      keysToDelete.forEach(function (key) {
        delete proxyObject[key];
      });
    }
  }

  function addComputed_DEPRECATED(proxyObject, computedFns_FAKE, targetObject) {
    if (targetObject === void 0) {
      targetObject = proxyObject;
    }
    {
      console.warn('addComputed is deprecated. Please consider using `derive`. Falling back to emulation with derive. https://github.com/pmndrs/valtio/pull/201');
    }
    var derivedFns = {};
    Object.keys(computedFns_FAKE).forEach(function (key) {
      derivedFns[key] = function (get) {
        return computedFns_FAKE[key](get(proxyObject));
      };
    });
    return derive(derivedFns, {
      proxy: targetObject
    });
  }

  function proxyWithComputed_DEPRECATED(initialObject, computedFns) {
    {
      console.warn('proxyWithComputed is deprecated. Please follow "Computed Properties" guide in docs.');
    }
    Object.keys(computedFns).forEach(function (key) {
      if (Object.getOwnPropertyDescriptor(initialObject, key)) {
        throw new Error('object property already defined');
      }
      var computedFn = computedFns[key];
      var _ref = typeof computedFn === 'function' ? {
          get: computedFn
        } : computedFn,
        get = _ref.get,
        set = _ref.set;
      var desc = {};
      desc.get = function () {
        return get(vanilla.snapshot(proxyObject));
      };
      if (set) {
        desc.set = function (newValue) {
          return set(proxyObject, newValue);
        };
      }
      Object.defineProperty(initialObject, key, desc);
    });
    var proxyObject = vanilla.proxy(initialObject);
    return proxyObject;
  }

  var isObject = function isObject(x) {
    return typeof x === 'object' && x !== null;
  };
  var refSet;
  var deepClone = function deepClone(obj) {
    if (!refSet) {
      refSet = vanilla.unstable_buildProxyFunction()[2];
    }
    if (!isObject(obj) || refSet.has(obj)) {
      return obj;
    }
    var baseObject = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
    Reflect.ownKeys(obj).forEach(function (key) {
      baseObject[key] = deepClone(obj[key]);
    });
    return baseObject;
  };
  function proxyWithHistory(initialValue, skipSubscribe) {
    if (skipSubscribe === void 0) {
      skipSubscribe = false;
    }
    var proxyObject = vanilla.proxy({
      value: initialValue,
      history: vanilla.ref({
        wip: undefined,
        snapshots: [],
        index: -1
      }),
      clone: deepClone,
      canUndo: function canUndo() {
        return proxyObject.history.index > 0;
      },
      undo: function undo() {
        if (proxyObject.canUndo()) {
          proxyObject.value = proxyObject.history.wip = proxyObject.clone(proxyObject.history.snapshots[--proxyObject.history.index]);
        }
      },
      canRedo: function canRedo() {
        return proxyObject.history.index < proxyObject.history.snapshots.length - 1;
      },
      redo: function redo() {
        if (proxyObject.canRedo()) {
          proxyObject.value = proxyObject.history.wip = proxyObject.clone(proxyObject.history.snapshots[++proxyObject.history.index]);
        }
      },
      saveHistory: function saveHistory() {
        proxyObject.history.snapshots.splice(proxyObject.history.index + 1);
        proxyObject.history.snapshots.push(vanilla.snapshot(proxyObject).value);
        ++proxyObject.history.index;
      },
      subscribe: function subscribe() {
        return vanilla.subscribe(proxyObject, function (ops) {
          if (ops.every(function (op) {
            return op[1][0] === 'value' && (op[0] !== 'set' || op[2] !== proxyObject.history.wip);
          })) {
            proxyObject.saveHistory();
          }
        });
      }
    });
    proxyObject.saveHistory();
    if (!skipSubscribe) {
      proxyObject.subscribe();
    }
    return proxyObject;
  }

  function proxySet(initialValues) {
    var _proxy;
    var set = vanilla.proxy((_proxy = {
      data: Array.from(new Set(initialValues)),
      has: function has(value) {
        return this.data.indexOf(value) !== -1;
      },
      add: function add(value) {
        var hasProxy = false;
        if (typeof value === 'object' && value !== null) {
          hasProxy = this.data.indexOf(vanilla.proxy(value)) !== -1;
        }
        if (this.data.indexOf(value) === -1 && !hasProxy) {
          this.data.push(value);
        }
        return this;
      },
      delete: function _delete(value) {
        var index = this.data.indexOf(value);
        if (index === -1) {
          return false;
        }
        this.data.splice(index, 1);
        return true;
      },
      clear: function clear() {
        this.data.splice(0);
      },
      get size() {
        return this.data.length;
      },
      forEach: function forEach(cb) {
        var _this = this;
        this.data.forEach(function (value) {
          cb(value, value, _this);
        });
      }
    }, _defineAccessor("get", _proxy, Symbol.toStringTag, function () {
      return 'Set';
    }), _proxy.toJSON = function toJSON() {
      return new Set(this.data);
    }, _proxy[Symbol.iterator] = function () {
      return this.data[Symbol.iterator]();
    }, _proxy.values = function values() {
      return this.data.values();
    }, _proxy.keys = function keys() {
      return this.data.values();
    }, _proxy.entries = function entries() {
      return new Set(this.data).entries();
    }, _proxy));
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
    var _proxy;
    var map = vanilla.proxy((_proxy = {
      data: Array.from(entries || []),
      has: function has(key) {
        return this.data.some(function (p) {
          return p[0] === key;
        });
      },
      set: function set(key, value) {
        var record = this.data.find(function (p) {
          return p[0] === key;
        });
        if (record) {
          record[1] = value;
        } else {
          this.data.push([key, value]);
        }
        return this;
      },
      get: function get(key) {
        var _this$data$find;
        return (_this$data$find = this.data.find(function (p) {
          return p[0] === key;
        })) == null ? void 0 : _this$data$find[1];
      },
      delete: function _delete(key) {
        var index = this.data.findIndex(function (p) {
          return p[0] === key;
        });
        if (index === -1) {
          return false;
        }
        this.data.splice(index, 1);
        return true;
      },
      clear: function clear() {
        this.data.splice(0);
      },
      get size() {
        return this.data.length;
      },
      toJSON: function toJSON() {
        return new Map(this.data);
      },
      forEach: function forEach(cb) {
        var _this = this;
        this.data.forEach(function (p) {
          cb(p[1], p[0], _this);
        });
      },
      keys: function keys() {
        return this.data.map(function (p) {
          return p[0];
        }).values();
      },
      values: function values() {
        return this.data.map(function (p) {
          return p[1];
        }).values();
      },
      entries: function entries() {
        return new Map(this.data).entries();
      }
    }, _defineAccessor("get", _proxy, Symbol.toStringTag, function () {
      return 'Map';
    }), _proxy[Symbol.iterator] = function () {
      return this.entries();
    }, _proxy));
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

  exports.addComputed = addComputed_DEPRECATED;
  exports.derive = derive;
  exports.devtools = devtools;
  exports.proxyMap = proxyMap;
  exports.proxySet = proxySet;
  exports.proxyWithComputed = proxyWithComputed_DEPRECATED;
  exports.proxyWithHistory = proxyWithHistory;
  exports.subscribeKey = subscribeKey;
  exports.underive = underive;
  exports.unstable_deriveSubscriptions = unstable_deriveSubscriptions;
  exports.watch = watch;

}));
