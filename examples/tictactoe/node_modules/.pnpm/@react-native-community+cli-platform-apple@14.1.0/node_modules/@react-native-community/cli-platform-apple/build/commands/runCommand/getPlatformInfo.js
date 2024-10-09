"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlatformInfo = getPlatformInfo;
/**
 * Returns platform readable name and list of SDKs for given platform.
 * We can get list of SDKs from `xcodebuild -showsdks` command.
 *
 * Falls back to iOS if platform is not supported.
 */
function getPlatformInfo(platform) {
  const iosPlatformInfo = {
    readableName: 'iOS',
    sdkNames: ['iphonesimulator', 'iphoneos']
  };
  switch (platform) {
    case 'ios':
      return iosPlatformInfo;
    case 'tvos':
      return {
        readableName: 'tvOS',
        sdkNames: ['appletvsimulator', 'appletvos']
      };
    case 'visionos':
      return {
        readableName: 'visionOS',
        sdkNames: ['xrsimulator', 'xros']
      };
    case 'macos':
      return {
        readableName: 'macOS',
        sdkNames: ['macosx']
      };
    default:
      return iosPlatformInfo;
  }
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/runCommand/getPlatformInfo.js.map