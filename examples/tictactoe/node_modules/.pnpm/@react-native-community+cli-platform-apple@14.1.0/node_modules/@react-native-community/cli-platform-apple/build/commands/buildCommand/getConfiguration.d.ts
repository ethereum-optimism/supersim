import type { IOSProjectInfo } from '@react-native-community/cli-types';
import type { BuildFlags } from './buildOptions';
import { ApplePlatform } from '../../types';
export declare function getConfiguration(xcodeProject: IOSProjectInfo, sourceDir: string, args: BuildFlags, platformName: ApplePlatform): Promise<{
    scheme: string;
    mode: string;
}>;
//# sourceMappingURL=getConfiguration.d.ts.map