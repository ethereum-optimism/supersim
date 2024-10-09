"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _fs() {
  const data = _interopRequireDefault(require("fs"));
  _fs = function () {
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
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _getArchitecture = _interopRequireDefault(require("../../tools/getArchitecture"));
var _listDevices = _interopRequireDefault(require("../../tools/listDevices"));
var _pods = _interopRequireWildcard(require("../../tools/pods"));
var _prompts = require("../../tools/prompts");
var _buildProject = require("../buildCommand/buildProject");
var _getConfiguration = require("../buildCommand/getConfiguration");
var _getXcodeProjectAndDir = require("../buildCommand/getXcodeProjectAndDir");
var _getFallbackSimulator = require("./getFallbackSimulator");
var _getPlatformInfo = require("./getPlatformInfo");
var _matchingDevice = require("./matchingDevice");
var _runOnDevice = require("./runOnDevice");
var _runOnSimulator = require("./runOnSimulator");
var _supportedPlatforms = require("../../config/supportedPlatforms");
var _openApp = _interopRequireDefault(require("./openApp"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const createRun = ({
  platformName
}) => async (_, ctx, args) => {
  // React Native docs assume platform is always ios/android
  _cliTools().link.setPlatform('ios');
  const platformConfig = ctx.project[platformName];
  const {
    sdkNames,
    readableName: platformReadableName
  } = (0, _getPlatformInfo.getPlatformInfo)(platformName);
  if (platformConfig === undefined || _supportedPlatforms.supportedPlatforms[platformName] === undefined) {
    throw new (_cliTools().CLIError)(`Unable to find ${platformReadableName} platform config`);
  }
  let {
    packager,
    port
  } = args;
  let installedPods = false;
  // check if pods need to be installed
  if (platformConfig.automaticPodsInstallation || args.forcePods) {
    const isAppRunningNewArchitecture = platformConfig.sourceDir ? await (0, _getArchitecture.default)(platformConfig.sourceDir) : undefined;
    await (0, _pods.default)(ctx.root, ctx.dependencies, platformName, {
      forceInstall: args.forcePods,
      newArchEnabled: isAppRunningNewArchitecture
    });
    installedPods = true;
  }
  if (packager) {
    const {
      port: newPort,
      startPackager
    } = await (0, _cliTools().findDevServerPort)(port, ctx.root);
    if (startPackager) {
      await (0, _cliTools().startServerInNewWindow)(newPort, ctx.root, ctx.reactNativePath, args.terminal);
    }
  }
  if (ctx.reactNativeVersion !== 'unknown') {
    _cliTools().link.setVersion(ctx.reactNativeVersion);
  }
  let {
    xcodeProject,
    sourceDir
  } = (0, _getXcodeProjectAndDir.getXcodeProjectAndDir)(platformConfig, platformName, installedPods);
  process.chdir(sourceDir);
  if (args.binaryPath) {
    args.binaryPath = _path().default.isAbsolute(args.binaryPath) ? args.binaryPath : _path().default.join(ctx.root, args.binaryPath);
    if (!_fs().default.existsSync(args.binaryPath)) {
      throw new (_cliTools().CLIError)('binary-path was specified, but the file was not found.');
    }
  }
  const {
    mode,
    scheme
  } = await (0, _getConfiguration.getConfiguration)(xcodeProject, sourceDir, args, platformName);
  if (platformName === 'macos') {
    const buildOutput = await (0, _buildProject.buildProject)(xcodeProject, platformName, undefined, mode, scheme, args);
    (0, _openApp.default)({
      buildOutput,
      xcodeProject,
      mode,
      scheme,
      target: args.target,
      binaryPath: args.binaryPath
    });
    return;
  }
  const devices = await (0, _listDevices.default)(sdkNames);
  if (devices.length === 0) {
    return _cliTools().logger.error(`${platformReadableName} devices or simulators not detected. Install simulators via Xcode or connect a physical ${platformReadableName} device`);
  }
  const fallbackSimulator = platformName === 'ios' ? (0, _getFallbackSimulator.getFallbackSimulator)(args) : devices[0];
  if (args.listDevices || args.interactive) {
    if (args.device || args.udid) {
      _cliTools().logger.warn(`Both ${args.device ? 'device' : 'udid'} and "list-devices" parameters were passed to "run" command. We will list available devices and let you choose from one.`);
    }
    const packageJson = (0, _pods.getPackageJson)(ctx.root);
    const preferredDevice = _cliTools().cacheManager.get(packageJson.name, 'lastUsedIOSDeviceId');
    const selectedDevice = await (0, _prompts.promptForDeviceSelection)(devices, preferredDevice);
    if (!selectedDevice) {
      throw new (_cliTools().CLIError)(`Failed to select device, please try to run app without ${args.listDevices ? 'list-devices' : 'interactive'} command.`);
    } else {
      if (selectedDevice.udid !== preferredDevice) {
        _cliTools().cacheManager.set(packageJson.name, 'lastUsedIOSDeviceId', selectedDevice.udid);
      }
    }
    if (selectedDevice.type === 'simulator') {
      return (0, _runOnSimulator.runOnSimulator)(xcodeProject, platformName, mode, scheme, args, selectedDevice);
    } else {
      return (0, _runOnDevice.runOnDevice)(selectedDevice, platformName, mode, scheme, xcodeProject, args);
    }
  }
  if (!args.device && !args.udid && !args.simulator) {
    const bootedSimulators = devices.filter(({
      state,
      type
    }) => state === 'Booted' && type === 'simulator');
    const bootedDevices = devices.filter(({
      type
    }) => type === 'device'); // Physical devices here are always booted
    const booted = [...bootedSimulators, ...bootedDevices];
    if (booted.length === 0) {
      _cliTools().logger.info('No booted devices or simulators found. Launching first available simulator...');
      return (0, _runOnSimulator.runOnSimulator)(xcodeProject, platformName, mode, scheme, args, fallbackSimulator);
    }
    _cliTools().logger.info(`Found booted ${booted.map(({
      name
    }) => name).join(', ')}`);
    for (const simulator of bootedSimulators) {
      await (0, _runOnSimulator.runOnSimulator)(xcodeProject, platformName, mode, scheme, args, simulator || fallbackSimulator);
    }
    for (const device of bootedDevices) {
      await (0, _runOnDevice.runOnDevice)(device, platformName, mode, scheme, xcodeProject, args);
    }
    return;
  }
  if (args.device && args.udid) {
    return _cliTools().logger.error('The `device` and `udid` options are mutually exclusive.');
  }
  if (args.udid) {
    const device = devices.find(d => d.udid === args.udid);
    if (!device) {
      return _cliTools().logger.error(`Could not find a device with udid: "${_chalk().default.bold(args.udid)}". ${(0, _matchingDevice.printFoundDevices)(devices)}`);
    }
    if (device.type === 'simulator') {
      return (0, _runOnSimulator.runOnSimulator)(xcodeProject, platformName, mode, scheme, args, fallbackSimulator);
    } else {
      return (0, _runOnDevice.runOnDevice)(device, platformName, mode, scheme, xcodeProject, args);
    }
  } else if (args.device) {
    let device = (0, _matchingDevice.matchingDevice)(devices, args.device);
    if (!device) {
      const deviceByUdid = devices.find(d => d.udid === args.device);
      if (!deviceByUdid) {
        return _cliTools().logger.error(`Could not find a physical device with name or unique device identifier: "${_chalk().default.bold(args.device)}". ${(0, _matchingDevice.printFoundDevices)(devices, 'device')}`);
      }
      device = deviceByUdid;
      if (deviceByUdid.type === 'simulator') {
        return _cliTools().logger.error(`The device with udid: "${_chalk().default.bold(args.device)}" is a simulator. If you want to run on a simulator, use the "--simulator" flag instead.`);
      }
    }
    if (device && device.type === 'simulator') {
      return _cliTools().logger.error("`--device` flag is intended for physical devices. If you're trying to run on a simulator, use `--simulator` instead.");
    }
    if (device && device.type === 'device') {
      return (0, _runOnDevice.runOnDevice)(device, platformName, mode, scheme, xcodeProject, args);
    }
  } else {
    (0, _runOnSimulator.runOnSimulator)(xcodeProject, platformName, mode, scheme, args, fallbackSimulator);
  }
};
var _default = createRun;
exports.default = _default;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/runCommand/createRun.js.map