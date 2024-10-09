import { IOSProjectInfo } from '@react-native-community/cli-types';
import { ApplePlatform } from '../../types';
type Options = {
    buildOutput: string;
    xcodeProject: IOSProjectInfo;
    mode: string;
    scheme: string;
    target?: string;
    udid: string;
    binaryPath?: string;
    platform?: ApplePlatform;
};
export default function installApp({ buildOutput, xcodeProject, mode, scheme, target, udid, binaryPath, platform, }: Options): Promise<void>;
export {};
//# sourceMappingURL=installApp.d.ts.map