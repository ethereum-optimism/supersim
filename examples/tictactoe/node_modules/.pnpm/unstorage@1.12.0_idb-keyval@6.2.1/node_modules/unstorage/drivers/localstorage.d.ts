export interface LocalStorageOptions {
    base?: string;
    window?: typeof window;
    localStorage?: typeof window.localStorage;
}
declare const _default: (opts: LocalStorageOptions | undefined) => import("..").Driver<LocalStorageOptions | undefined, Storage>;
export default _default;
