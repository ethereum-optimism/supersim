"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = openApp;
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
function _execa() {
  const data = _interopRequireDefault(require("execa"));
  _execa = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function openApp({
  buildOutput,
  xcodeProject,
  mode,
  scheme,
  target,
  binaryPath
}) {
  let appPath = binaryPath;
  const buildSettings = await (0, _getBuildSettings.getBuildSettings)(xcodeProject, mode, buildOutput, scheme, target);
  if (!buildSettings) {
    throw new (_cliTools().CLIError)('Failed to get build settings for your project');
  }
  if (!appPath) {
    appPath = await (0, _getBuildPath.getBuildPath)(buildSettings, 'macos');
  }
  _cliTools().logger.info(`Opening "${_chalk().default.bold(appPath)}"`);
  try {
    await (0, _execa().default)(`open ${appPath}`);
    _cliTools().logger.success('Successfully launched the app');
  } catch (e) {
    _cliTools().logger.error('Failed to launch the app', e);
  }
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/runCommand/openApp.js.map