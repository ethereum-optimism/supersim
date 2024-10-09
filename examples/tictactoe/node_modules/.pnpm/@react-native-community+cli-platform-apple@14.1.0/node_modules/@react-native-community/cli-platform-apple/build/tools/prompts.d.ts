import { Device } from '../types';
export declare function promptForSchemeSelection(schemes: string[]): Promise<string>;
export declare function promptForConfigurationSelection(configurations: string[]): Promise<string>;
export declare function promptForDeviceSelection(devices: Device[], lastUsedIOSDeviceId?: string): Promise<Device | undefined>;
export declare function promptForDeviceToTailLogs(platformReadableName: string, simulators: Device[]): Promise<string>;
//# sourceMappingURL=prompts.d.ts.map