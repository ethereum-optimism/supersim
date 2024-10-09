import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet
} from "./chunk-2HYBKCYP.js";

// src/queriesObserver.ts
import { notifyManager } from "./notifyManager.js";
import { QueryObserver } from "./queryObserver.js";
import { Subscribable } from "./subscribable.js";
import { replaceEqualDeep } from "./utils.js";
function difference(array1, array2) {
  return array1.filter((x) => !array2.includes(x));
}
function replaceAt(array, index, value) {
  const copy = array.slice(0);
  copy[index] = value;
  return copy;
}
var _client, _result, _queries, _observers, _combinedResult, _lastCombine, _lastResult, _combineResult, combineResult_fn, _findMatchingObservers, findMatchingObservers_fn, _onUpdate, onUpdate_fn, _notify, notify_fn;
var QueriesObserver = class extends Subscribable {
  constructor(client, queries, _options) {
    super();
    __privateAdd(this, _combineResult);
    __privateAdd(this, _findMatchingObservers);
    __privateAdd(this, _onUpdate);
    __privateAdd(this, _notify);
    __privateAdd(this, _client, void 0);
    __privateAdd(this, _result, void 0);
    __privateAdd(this, _queries, void 0);
    __privateAdd(this, _observers, void 0);
    __privateAdd(this, _combinedResult, void 0);
    __privateAdd(this, _lastCombine, void 0);
    __privateAdd(this, _lastResult, void 0);
    __privateSet(this, _client, client);
    __privateSet(this, _queries, []);
    __privateSet(this, _observers, []);
    __privateSet(this, _result, []);
    this.setQueries(queries);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _observers).forEach((observer) => {
        observer.subscribe((result) => {
          __privateMethod(this, _onUpdate, onUpdate_fn).call(this, observer, result);
        });
      });
    }
  }
  onUnsubscribe() {
    if (!this.listeners.size) {
      this.destroy();
    }
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateGet(this, _observers).forEach((observer) => {
      observer.destroy();
    });
  }
  setQueries(queries, _options, notifyOptions) {
    __privateSet(this, _queries, queries);
    notifyManager.batch(() => {
      const prevObservers = __privateGet(this, _observers);
      const newObserverMatches = __privateMethod(this, _findMatchingObservers, findMatchingObservers_fn).call(this, __privateGet(this, _queries));
      newObserverMatches.forEach(
        (match) => match.observer.setOptions(match.defaultedQueryOptions, notifyOptions)
      );
      const newObservers = newObserverMatches.map((match) => match.observer);
      const newResult = newObservers.map(
        (observer) => observer.getCurrentResult()
      );
      const hasIndexChange = newObservers.some(
        (observer, index) => observer !== prevObservers[index]
      );
      if (prevObservers.length === newObservers.length && !hasIndexChange) {
        return;
      }
      __privateSet(this, _observers, newObservers);
      __privateSet(this, _result, newResult);
      if (!this.hasListeners()) {
        return;
      }
      difference(prevObservers, newObservers).forEach((observer) => {
        observer.destroy();
      });
      difference(newObservers, prevObservers).forEach((observer) => {
        observer.subscribe((result) => {
          __privateMethod(this, _onUpdate, onUpdate_fn).call(this, observer, result);
        });
      });
      __privateMethod(this, _notify, notify_fn).call(this);
    });
  }
  getCurrentResult() {
    return __privateGet(this, _result);
  }
  getQueries() {
    return __privateGet(this, _observers).map((observer) => observer.getCurrentQuery());
  }
  getObservers() {
    return __privateGet(this, _observers);
  }
  getOptimisticResult(queries, combine) {
    const matches = __privateMethod(this, _findMatchingObservers, findMatchingObservers_fn).call(this, queries);
    const result = matches.map(
      (match) => match.observer.getOptimisticResult(match.defaultedQueryOptions)
    );
    return [
      result,
      (r) => {
        return __privateMethod(this, _combineResult, combineResult_fn).call(this, r ?? result, combine);
      },
      () => {
        return matches.map((match, index) => {
          const observerResult = result[index];
          return !match.defaultedQueryOptions.notifyOnChangeProps ? match.observer.trackResult(observerResult, (accessedProp) => {
            matches.forEach((m) => {
              m.observer.trackProp(accessedProp);
            });
          }) : observerResult;
        });
      }
    ];
  }
};
_client = new WeakMap();
_result = new WeakMap();
_queries = new WeakMap();
_observers = new WeakMap();
_combinedResult = new WeakMap();
_lastCombine = new WeakMap();
_lastResult = new WeakMap();
_combineResult = new WeakSet();
combineResult_fn = function(input, combine) {
  if (combine) {
    if (!__privateGet(this, _combinedResult) || __privateGet(this, _result) !== __privateGet(this, _lastResult) || combine !== __privateGet(this, _lastCombine)) {
      __privateSet(this, _lastCombine, combine);
      __privateSet(this, _lastResult, __privateGet(this, _result));
      __privateSet(this, _combinedResult, replaceEqualDeep(
        __privateGet(this, _combinedResult),
        combine(input)
      ));
    }
    return __privateGet(this, _combinedResult);
  }
  return input;
};
_findMatchingObservers = new WeakSet();
findMatchingObservers_fn = function(queries) {
  const prevObservers = __privateGet(this, _observers);
  const prevObserversMap = new Map(
    prevObservers.map((observer) => [observer.options.queryHash, observer])
  );
  const defaultedQueryOptions = queries.map(
    (options) => __privateGet(this, _client).defaultQueryOptions(options)
  );
  const matchingObservers = defaultedQueryOptions.flatMap((defaultedOptions) => {
    const match = prevObserversMap.get(defaultedOptions.queryHash);
    if (match != null) {
      return [{ defaultedQueryOptions: defaultedOptions, observer: match }];
    }
    return [];
  });
  const matchedQueryHashes = new Set(
    matchingObservers.map((match) => match.defaultedQueryOptions.queryHash)
  );
  const unmatchedQueries = defaultedQueryOptions.filter(
    (defaultedOptions) => !matchedQueryHashes.has(defaultedOptions.queryHash)
  );
  const getObserver = (options) => {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const currentObserver = __privateGet(this, _observers).find(
      (o) => o.options.queryHash === defaultedOptions.queryHash
    );
    return currentObserver ?? new QueryObserver(__privateGet(this, _client), defaultedOptions);
  };
  const newOrReusedObservers = unmatchedQueries.map((options) => {
    return {
      defaultedQueryOptions: options,
      observer: getObserver(options)
    };
  });
  const sortMatchesByOrderOfQueries = (a, b) => defaultedQueryOptions.indexOf(a.defaultedQueryOptions) - defaultedQueryOptions.indexOf(b.defaultedQueryOptions);
  return matchingObservers.concat(newOrReusedObservers).sort(sortMatchesByOrderOfQueries);
};
_onUpdate = new WeakSet();
onUpdate_fn = function(observer, result) {
  const index = __privateGet(this, _observers).indexOf(observer);
  if (index !== -1) {
    __privateSet(this, _result, replaceAt(__privateGet(this, _result), index, result));
    __privateMethod(this, _notify, notify_fn).call(this);
  }
};
_notify = new WeakSet();
notify_fn = function() {
  notifyManager.batch(() => {
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _result));
    });
  });
};
export {
  QueriesObserver
};
//# sourceMappingURL=queriesObserver.js.map