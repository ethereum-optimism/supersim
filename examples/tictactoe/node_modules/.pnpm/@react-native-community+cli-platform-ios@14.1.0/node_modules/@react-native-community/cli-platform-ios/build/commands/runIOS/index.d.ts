/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
declare const _default: {
    name: string;
    description: string;
    func: (_: string[], ctx: import("@react-native-community/cli-types").Config, args: import("@react-native-community/cli-platform-apple/build/commands/runCommand/createRun").FlagsT) => Promise<void>;
    examples: {
        desc: string;
        cmd: string;
    }[];
    options: (false | {
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
};
export default _default;
//# sourceMappingURL=index.d.ts.map