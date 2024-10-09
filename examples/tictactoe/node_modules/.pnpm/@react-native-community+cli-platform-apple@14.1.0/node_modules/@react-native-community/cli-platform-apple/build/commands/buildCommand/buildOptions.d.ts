import { BuilderCommand } from '../../types';
export type BuildFlags = {
    mode?: string;
    target?: string;
    verbose?: boolean;
    scheme?: string;
    xcconfig?: string;
    buildFolder?: string;
    interactive?: boolean;
    destination?: string;
    extraParams?: string[];
    forcePods?: boolean;
};
export declare const getBuildOptions: ({ platformName }: BuilderCommand) => (false | {
    name: string;
    description: string;
    parse?: undefined;
} | {
    name: string;
    description: string;
    parse: (val: string) => string[];
})[];
//# sourceMappingURL=buildOptions.d.ts.map