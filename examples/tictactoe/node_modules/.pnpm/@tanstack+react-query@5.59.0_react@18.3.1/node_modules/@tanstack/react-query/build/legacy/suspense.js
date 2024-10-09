// src/suspense.ts
var defaultThrowOnError = (_error, query) => query.state.data === void 0;
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    if (typeof defaultedOptions.staleTime !== "number") {
      defaultedOptions.staleTime = 1e3;
    }
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, 1e3);
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
export {
  defaultThrowOnError,
  ensureSuspenseTimers,
  fetchOptimistic,
  shouldSuspend,
  willFetch
};
//# sourceMappingURL=suspense.js.map