import { IOSProjectInfo } from '@react-native-community/cli-types';
export type BuildSettings = {
    TARGET_BUILD_DIR: string;
    INFOPLIST_PATH: string;
    EXECUTABLE_FOLDER_PATH: string;
    FULL_PRODUCT_NAME: string;
};
export declare function getBuildSettings(xcodeProject: IOSProjectInfo, mode: string, buildOutput: string, scheme: string, target?: string): Promise<BuildSettings | null>;
//# sourceMappingURL=getBuildSettings.d.ts.map