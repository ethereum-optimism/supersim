export default class AhoCorasick {
    gotoFn: Record<number, Record<string, number>>;
    output: Record<number, string[]>;
    failure: Record<number, number>;
    constructor(keywords: string[]);
    _buildTables(keywords: string[]): {
        gotoFn: Record<number, Record<string, number>>;
        output: Record<number, string[]>;
        failure: Record<number, number>;
    };
    search(str: string): [number, string[]][];
}
