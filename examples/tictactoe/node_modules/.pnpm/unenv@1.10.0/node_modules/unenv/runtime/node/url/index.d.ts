import type url from "node:url";
export declare const URL: typeof url.URL;
export declare const URLSearchParams: {
    new (init?: string[][] | Record<string, string> | string | URLSearchParams): URLSearchParams;
    prototype: URLSearchParams;
};
export declare const parse: typeof url.parse;
export declare const resolve: typeof url.resolve;
export declare const urlToHttpOptions: typeof url.urlToHttpOptions;
export declare const format: typeof url.format;
export declare const domainToASCII: typeof url.domainToASCII;
export declare const domainToUnicode: typeof url.domainToUnicode;
export declare const pathToFileURL: typeof url.pathToFileURL;
export declare const fileURLToPath: typeof url.fileURLToPath;
declare const _default: typeof url;
export default _default;
