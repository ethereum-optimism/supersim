import { IOSProjectInfo } from '@react-native-community/cli-types';
import type { BuildFlags } from './buildOptions';
import { ApplePlatform } from '../../types';
export declare function buildProject(xcodeProject: IOSProjectInfo, platform: ApplePlatform, udid: string | undefined, mode: string, scheme: string, args: BuildFlags): Promise<string>;
//# sourceMappingURL=buildProject.d.ts.map