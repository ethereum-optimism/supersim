import { BuilderCommand } from '../../types';
export declare const getRunOptions: ({ platformName }: BuilderCommand) => (false | {
    name: string;
    description: string;
    parse?: undefined;
} | {
    name: string;
    description: string;
    parse: (val: string) => string[];
} | {
    name: string;
    default: string | number;
    parse: NumberConstructor;
    description?: undefined;
} | {
    name: string;
    description: string;
    default: string | undefined;
    parse?: undefined;
})[];
//# sourceMappingURL=runOptions.d.ts.map