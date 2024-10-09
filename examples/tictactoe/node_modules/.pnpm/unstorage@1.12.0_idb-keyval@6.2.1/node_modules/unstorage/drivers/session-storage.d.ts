export interface SessionStorageOptions {
    base?: string;
    window?: typeof window;
    sessionStorage?: typeof window.sessionStorage;
}
declare const _default: (opts: SessionStorageOptions | undefined) => import("..").Driver<SessionStorageOptions | undefined, Storage>;
export default _default;
