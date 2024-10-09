/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export declare function getNpmVersionIfAvailable(): string | null;
export declare function isProjectUsingNpm(cwd: string): string | undefined;
export declare const getNpmRegistryUrl: () => string;
/**
 * Convert an npm tag to a concrete version, for example:
 * - next -> 0.75.0-rc.0
 * - nightly -> 0.75.0-nightly-20240618-5df5ed1a8
 */
export declare function npmResolveConcreteVersion(packageName: string, tagOrVersion: string): Promise<string>;
type TemplateVersion = string;
export declare function getTemplateVersion(reactNativeVersion: string): Promise<TemplateVersion | undefined>;
export {};
//# sourceMappingURL=npm.d.ts.map