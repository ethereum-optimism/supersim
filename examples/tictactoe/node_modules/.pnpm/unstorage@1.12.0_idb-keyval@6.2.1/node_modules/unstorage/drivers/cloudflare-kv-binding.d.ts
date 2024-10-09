export interface KVOptions {
    binding?: string | KVNamespace;
    /** Adds prefix to all stored keys */
    base?: string;
}
declare const _default: (opts: KVOptions) => import("..").Driver<KVOptions, KVNamespace<string>>;
export default _default;
