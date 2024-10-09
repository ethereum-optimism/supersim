declare const _default: {
    func: ([projectName]: string[], options: import("./types").Options) => Promise<void>;
    detached: boolean;
    name: string;
    description: string;
    options: ({
        name: string;
        description: string;
        parse?: undefined;
    } | {
        name: string;
        description: string;
        parse: (val: string) => Record<string, string>;
    })[];
};
export default _default;
//# sourceMappingURL=index.d.ts.map