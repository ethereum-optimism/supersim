import type asyncHooks from "node:async_hooks";
export { AsyncLocalStorage } from "./_async-local-storage";
export { AsyncResource } from "./_async-resource";
export * from "./_async-hook";
declare const _default: typeof asyncHooks;
export default _default;
