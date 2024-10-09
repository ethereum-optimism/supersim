import findAllPodfilePaths from './findAllPodfilePaths';
import { IOSProjectParams, IOSDependencyParams, IOSProjectConfig, IOSDependencyConfig } from '@react-native-community/cli-types';
import { BuilderCommand } from '../types';
/**
 * Returns project config by analyzing given folder and applying some user defaults
 * when constructing final object
 */
export declare const getProjectConfig: ({ platformName }: BuilderCommand) => (folder: string, userConfig: IOSProjectParams) => IOSProjectConfig | null;
/**
 * Make getDependencyConfig follow the same pattern as getProjectConfig
 */
export declare const getDependencyConfig: ({}: BuilderCommand) => (folder: string, userConfig?: IOSDependencyParams | null) => IOSDependencyConfig | null;
export declare const findPodfilePaths: typeof findAllPodfilePaths;
//# sourceMappingURL=index.d.ts.map