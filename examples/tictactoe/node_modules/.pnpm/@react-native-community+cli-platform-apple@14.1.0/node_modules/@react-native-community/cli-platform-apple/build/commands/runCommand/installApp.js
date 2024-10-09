"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = installApp;
function _child_process() {
  const data = _interopRequireDefault(require("child_process"));
  _child_process = function () {
    return data;
  };
  return data;
}
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
    return data;
  };
  return data;
}
var _getBuildPath = require("./getBuildPath");
var _getBuildSettings = require("./getBuildSettings");
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function handleLaunchResult(success, errorMessage, errorDetails = '') {
  if (success) {
    _cliTools().logger.success('Successfully launched the app');
  } else {
    _cliTools().logger.error(errorMessage, errorDetails);
  }
}
async function installApp({
  buildOutput,
  xcodeProject,
  mode,
  scheme,
  target,
  udid,
  binaryPath,
  platform
}) {
  let appPath = binaryPath;
  const buildSettings = await (0, _getBuildSettings.getBuildSettings)(xcodeProject, mode, buildOutput, scheme, target);
  if (!buildSettings) {
    throw new (_cliTools().CLIError)('Failed to get build settings for your project');
  }
  if (!appPath) {
    appPath = await (0, _getBuildPath.getBuildPath)(buildSettings, platform);
  }
  const targetBuildDir = buildSettings.TARGET_BUILD_DIR;
  const infoPlistPath = buildSettings.INFOPLIST_PATH;
  if (!infoPlistPath) {
    throw new (_cliTools().CLIError)('Failed to find Info.plist');
  }
  if (!targetBuildDir) {
    throw new (_cliTools().CLIError)('Failed to get target build directory.');
  }
  _cliTools().logger.info(`Installing "${_chalk().default.bold(appPath)}`);
  if (udid && appPath) {
    _child_process().default.spawnSync('xcrun', ['simctl', 'install', udid, appPath], {
      stdio: 'inherit'
    });
  }
  const bundleID = _child_process().default.execFileSync('/usr/libexec/PlistBuddy', ['-c', 'Print:CFBundleIdentifier', _path().default.join(targetBuildDir, infoPlistPath)], {
    encoding: 'utf8'
  }).trim();
  _cliTools().logger.info(`Launching "${_chalk().default.bold(bundleID)}"`);
  let result = _child_process().default.spawnSync('xcrun', ['simctl', 'launch', udid, bundleID]);
  handleLaunchResult(result.status === 0, 'Failed to launch the app on simulator', result.stderr.toString());
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/runCommand/installApp.js.map