import { ApplePlatform } from '../../types';
interface PlatformInfo {
    readableName: string;
    sdkNames: string[];
}
/**
 * Returns platform readable name and list of SDKs for given platform.
 * We can get list of SDKs from `xcodebuild -showsdks` command.
 *
 * Falls back to iOS if platform is not supported.
 */
export declare function getPlatformInfo(platform: ApplePlatform): PlatformInfo;
export {};
//# sourceMappingURL=getPlatformInfo.d.ts.map