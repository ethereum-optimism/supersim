"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBuildPath = getBuildPath;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function getBuildPath(buildSettings, platform = 'ios', isCatalyst = false) {
  const targetBuildDir = buildSettings.TARGET_BUILD_DIR;
  const executableFolderPath = buildSettings.EXECUTABLE_FOLDER_PATH;
  const fullProductName = buildSettings.FULL_PRODUCT_NAME;
  if (!targetBuildDir) {
    throw new (_cliTools().CLIError)('Failed to get the target build directory.');
  }
  if (!executableFolderPath) {
    throw new (_cliTools().CLIError)('Failed to get the app name.');
  }
  if (!fullProductName) {
    throw new (_cliTools().CLIError)('Failed to get product name.');
  }
  if (isCatalyst) {
    return _path().default.join(`${targetBuildDir}-maccatalyst`, executableFolderPath);
  } else if (platform === 'macos') {
    return _path().default.join(targetBuildDir, fullProductName);
  } else {
    return _path().default.join(targetBuildDir, executableFolderPath);
  }
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/runCommand/getBuildPath.js.map