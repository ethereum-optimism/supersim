"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBuildSettings = getBuildSettings;
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
function _child_process() {
  const data = _interopRequireDefault(require("child_process"));
  _child_process = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function getBuildSettings(xcodeProject, mode, buildOutput, scheme, target) {
  const buildSettings = _child_process().default.execFileSync('xcodebuild', [xcodeProject.isWorkspace ? '-workspace' : '-project', xcodeProject.name, '-scheme', scheme, '-sdk', getPlatformName(buildOutput), '-configuration', mode, '-showBuildSettings', '-json'], {
    encoding: 'utf8'
  });
  const settings = JSON.parse(buildSettings);
  const targets = settings.map(({
    target: settingsTarget
  }) => settingsTarget);
  let selectedTarget = targets[0];
  if (target) {
    if (!targets.includes(target)) {
      _cliTools().logger.info(`Target ${_chalk().default.bold(target)} not found for scheme ${_chalk().default.bold(scheme)}, automatically selected target ${_chalk().default.bold(selectedTarget)}`);
    } else {
      selectedTarget = target;
    }
  }

  // Find app in all building settings - look for WRAPPER_EXTENSION: 'app',
  const targetIndex = targets.indexOf(selectedTarget);
  const targetSettings = settings[targetIndex].buildSettings;
  const wrapperExtension = targetSettings.WRAPPER_EXTENSION;
  if (wrapperExtension === 'app') {
    return settings[targetIndex].buildSettings;
  }
  return null;
}
function getPlatformName(buildOutput) {
  // Xcode can sometimes escape `=` with a backslash or put the value in quotes
  const platformNameMatch = /export PLATFORM_NAME\\?="?(\w+)"?$/m.exec(buildOutput);
  if (!platformNameMatch) {
    throw new (_cliTools().CLIError)('Couldn\'t find "PLATFORM_NAME" variable in xcodebuild output. Please report this issue and run your project with Xcode instead.');
  }
  return platformNameMatch[1];
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/runCommand/getBuildSettings.js.map