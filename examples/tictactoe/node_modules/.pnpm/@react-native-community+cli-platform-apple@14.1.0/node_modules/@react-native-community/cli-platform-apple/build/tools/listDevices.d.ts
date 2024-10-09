import { Device } from '../types';
/**
 * Executes `xcrun xcdevice list` and `xcrun simctl list --json devices`, and connects parsed output of these two commands. We are running these two commands as they are necessary to display both physical devices and simulators. However, it's important to note that neither command provides a combined output of both.
 * @param sdkNames
 * @returns List of available devices and simulators.
 */
declare function listDevices(sdkNames: string[]): Promise<Device[]>;
export declare function stripPlatform(platform: string): string;
export default listDevices;
//# sourceMappingURL=listDevices.d.ts.map