import {
  __privateAdd,
  __privateGet,
  __privateSet,
  __privateWrapper
} from "./chunk-2HYBKCYP.js";

// src/mutationCache.ts
import { notifyManager } from "./notifyManager.js";
import { Mutation } from "./mutation.js";
import { matchMutation, noop } from "./utils.js";
import { Subscribable } from "./subscribable.js";
var _mutations, _mutationId;
var MutationCache = class extends Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    __privateAdd(this, _mutations, void 0);
    __privateAdd(this, _mutationId, void 0);
    __privateSet(this, _mutations, /* @__PURE__ */ new Map());
    __privateSet(this, _mutationId, Date.now());
  }
  build(client, options, state) {
    const mutation = new Mutation({
      mutationCache: this,
      mutationId: ++__privateWrapper(this, _mutationId)._,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    const scope = scopeFor(mutation);
    const mutations = __privateGet(this, _mutations).get(scope) ?? [];
    mutations.push(mutation);
    __privateGet(this, _mutations).set(scope, mutations);
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    var _a;
    const scope = scopeFor(mutation);
    if (__privateGet(this, _mutations).has(scope)) {
      const mutations = (_a = __privateGet(this, _mutations).get(scope)) == null ? void 0 : _a.filter((x) => x !== mutation);
      if (mutations) {
        if (mutations.length === 0) {
          __privateGet(this, _mutations).delete(scope);
        } else {
          __privateGet(this, _mutations).set(scope, mutations);
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    var _a;
    const firstPendingMutation = (_a = __privateGet(this, _mutations).get(scopeFor(mutation))) == null ? void 0 : _a.find((m) => m.state.status === "pending");
    return !firstPendingMutation || firstPendingMutation === mutation;
  }
  runNext(mutation) {
    var _a;
    const foundMutation = (_a = __privateGet(this, _mutations).get(scopeFor(mutation))) == null ? void 0 : _a.find((m) => m !== mutation && m.state.isPaused);
    return (foundMutation == null ? void 0 : foundMutation.continue()) ?? Promise.resolve();
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((mutation) => {
        this.remove(mutation);
      });
    });
  }
  getAll() {
    return [...__privateGet(this, _mutations).values()].flat();
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (mutation) => matchMutation(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => matchMutation(filters, mutation));
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
    return notifyManager.batch(
      () => Promise.all(
        pausedMutations.map((mutation) => mutation.continue().catch(noop))
      )
    );
  }
};
_mutations = new WeakMap();
_mutationId = new WeakMap();
function scopeFor(mutation) {
  var _a;
  return ((_a = mutation.options.scope) == null ? void 0 : _a.id) ?? String(mutation.mutationId);
}
export {
  MutationCache
};
//# sourceMappingURL=mutationCache.js.map