// src/mutationCache.ts
import { notifyManager } from "./notifyManager.js";
import { Mutation } from "./mutation.js";
import { matchMutation, noop } from "./utils.js";
import { Subscribable } from "./subscribable.js";
var MutationCache = class extends Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#mutations = /* @__PURE__ */ new Map();
    this.#mutationId = Date.now();
  }
  #mutations;
  #mutationId;
  build(client, options, state) {
    const mutation = new Mutation({
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    const scope = scopeFor(mutation);
    const mutations = this.#mutations.get(scope) ?? [];
    mutations.push(mutation);
    this.#mutations.set(scope, mutations);
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    const scope = scopeFor(mutation);
    if (this.#mutations.has(scope)) {
      const mutations = this.#mutations.get(scope)?.filter((x) => x !== mutation);
      if (mutations) {
        if (mutations.length === 0) {
          this.#mutations.delete(scope);
        } else {
          this.#mutations.set(scope, mutations);
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    const firstPendingMutation = this.#mutations.get(scopeFor(mutation))?.find((m) => m.state.status === "pending");
    return !firstPendingMutation || firstPendingMutation === mutation;
  }
  runNext(mutation) {
    const foundMutation = this.#mutations.get(scopeFor(mutation))?.find((m) => m !== mutation && m.state.isPaused);
    return foundMutation?.continue() ?? Promise.resolve();
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((mutation) => {
        this.remove(mutation);
      });
    });
  }
  getAll() {
    return [...this.#mutations.values()].flat();
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
function scopeFor(mutation) {
  return mutation.options.scope?.id ?? String(mutation.mutationId);
}
export {
  MutationCache
};
//# sourceMappingURL=mutationCache.js.map