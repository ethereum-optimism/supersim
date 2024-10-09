"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBuildOptions = void 0;
var _getPlatformInfo = require("../runCommand/getPlatformInfo");
const getBuildOptions = ({
  platformName
}) => {
  const {
    readableName
  } = (0, _getPlatformInfo.getPlatformInfo)(platformName);
  const isMac = platformName === 'macos';
  return [{
    name: '--mode <string>',
    description: 'Explicitly set the scheme configuration to use. This option is case sensitive.'
  }, {
    name: '--scheme <string>',
    description: 'Explicitly set Xcode scheme to use'
  }, {
    name: '--destination <string>',
    description: 'Explicitly extend destination e.g. "arch=x86_64"'
  }, {
    name: '--verbose',
    description: 'Do not use xcbeautify or xcpretty even if installed'
  }, {
    name: '--xcconfig [string]',
    description: 'Explicitly set xcconfig to use'
  }, {
    name: '--buildFolder <string>',
    description: `Location for ${readableName} build artifacts. Corresponds to Xcode's "-derivedDataPath".`
  }, {
    name: '--extra-params <string>',
    description: 'Custom params that will be passed to xcodebuild command.',
    parse: val => val.split(' ')
  }, {
    name: '--target <string>',
    description: 'Explicitly set Xcode target to use.'
  }, {
    name: '-i --interactive',
    description: 'Explicitly select which scheme and configuration to use before running a build'
  }, {
    name: '--force-pods',
    description: 'Force CocoaPods installation'
  }, !isMac && {
    name: '--device [string]',
    // here we're intentionally using [] over <> to make passed value optional to allow users to run only on physical devices
    description: 'Explicitly set the device to use by name or by unique device identifier . If the value is not provided,' + 'the app will run on the first available physical device.'
  }];
};
exports.getBuildOptions = getBuildOptions;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/buildCommand/buildOptions.js.map