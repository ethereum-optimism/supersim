import { IOSProjectInfo } from '@react-native-community/cli-types';
type Options = {
    buildOutput: string;
    xcodeProject: IOSProjectInfo;
    mode: string;
    scheme: string;
    target?: string;
    binaryPath?: string;
};
export default function openApp({ buildOutput, xcodeProject, mode, scheme, target, binaryPath, }: Options): Promise<void>;
export {};
//# sourceMappingURL=openApp.d.ts.map