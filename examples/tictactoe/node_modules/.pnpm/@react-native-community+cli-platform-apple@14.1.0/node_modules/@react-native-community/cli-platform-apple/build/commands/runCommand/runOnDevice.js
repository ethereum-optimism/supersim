"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runOnDevice = runOnDevice;
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
var _buildProject = require("../buildCommand/buildProject");
var _getBuildPath = require("./getBuildPath");
var _getBuildSettings = require("./getBuildSettings");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function runOnDevice(selectedDevice, platform, mode, scheme, xcodeProject, args) {
  if (args.binaryPath && selectedDevice.type === 'catalyst') {
    throw new (_cliTools().CLIError)('binary-path was specified for catalyst device, which is not supported.');
  }
  const isIOSDeployInstalled = _child_process().default.spawnSync('ios-deploy', ['--version'], {
    encoding: 'utf8'
  });
  if (isIOSDeployInstalled.error) {
    throw new (_cliTools().CLIError)(`Failed to install the app on the device because we couldn't execute the "ios-deploy" command. Please install it by running "${_chalk().default.bold('brew install ios-deploy')}" and try again.`);
  }
  if (selectedDevice.type === 'catalyst') {
    const buildOutput = await (0, _buildProject.buildProject)(xcodeProject, platform, selectedDevice.udid, mode, scheme, args);
    const buildSettings = await (0, _getBuildSettings.getBuildSettings)(xcodeProject, mode, buildOutput, scheme);
    if (!buildSettings) {
      throw new (_cliTools().CLIError)('Failed to get build settings for your project');
    }
    const appPath = await (0, _getBuildPath.getBuildPath)(buildSettings, platform, true);
    const appProcess = _child_process().default.spawn(`${appPath}/${scheme}`, [], {
      detached: true,
      stdio: 'ignore'
    });
    appProcess.unref();
  } else {
    let buildOutput, appPath;
    if (!args.binaryPath) {
      buildOutput = await (0, _buildProject.buildProject)(xcodeProject, platform, selectedDevice.udid, mode, scheme, args);
      const buildSettings = await (0, _getBuildSettings.getBuildSettings)(xcodeProject, mode, buildOutput, scheme);
      if (!buildSettings) {
        throw new (_cliTools().CLIError)('Failed to get build settings for your project');
      }
      appPath = await (0, _getBuildPath.getBuildPath)(buildSettings, platform);
    } else {
      appPath = args.binaryPath;
    }
    const iosDeployInstallArgs = ['--bundle', appPath, '--id', selectedDevice.udid, '--justlaunch'];
    _cliTools().logger.info(`Installing and launching your app on ${selectedDevice.name}`);
    const iosDeployOutput = _child_process().default.spawnSync('ios-deploy', iosDeployInstallArgs, {
      encoding: 'utf8'
    });
    if (iosDeployOutput.error) {
      throw new (_cliTools().CLIError)(`Failed to install the app on the device. We've encountered an error in "ios-deploy" command: ${iosDeployOutput.error.message}`);
    }
  }
  return _cliTools().logger.success('Installed the app on the device.');
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/runCommand/runOnDevice.js.map