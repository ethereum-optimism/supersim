/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Config } from '@react-native-community/cli-types';
import { BuildFlags } from '../buildCommand/buildOptions';
import { BuilderCommand } from '../../types';
export interface FlagsT extends BuildFlags {
    simulator?: string;
    device?: string | true;
    udid?: string;
    binaryPath?: string;
    listDevices?: boolean;
    packager?: boolean;
    port: number;
    terminal?: string;
}
declare const createRun: ({ platformName }: BuilderCommand) => (_: Array<string>, ctx: Config, args: FlagsT) => Promise<void>;
export default createRun;
//# sourceMappingURL=createRun.d.ts.map