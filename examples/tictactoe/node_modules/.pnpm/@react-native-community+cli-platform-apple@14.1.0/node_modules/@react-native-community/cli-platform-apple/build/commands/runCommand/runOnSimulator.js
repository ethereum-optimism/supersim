"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runOnSimulator = runOnSimulator;
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
var _buildProject = require("../buildCommand/buildProject");
var _matchingDevice = require("./matchingDevice");
var _installApp = _interopRequireDefault(require("./installApp"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function runOnSimulator(xcodeProject, platform, mode, scheme, args, simulator) {
  const {
    binaryPath,
    target
  } = args;

  /**
   * Booting simulator through `xcrun simctl boot` will boot it in the `headless` mode
   * (running in the background).
   *
   * In order for user to see the app and the simulator itself, we have to make sure
   * that the Simulator.app is running.
   *
   * We also pass it `-CurrentDeviceUDID` so that when we launch it for the first time,
   * it will not boot the "default" device, but the one we set. If the app is already running,
   * this flag has no effect.
   */
  const activeDeveloperDir = _child_process().default.execFileSync('xcode-select', ['-p'], {
    encoding: 'utf8'
  }).trim();
  _child_process().default.execFileSync('open', [`${activeDeveloperDir}/Applications/Simulator.app`, '--args', '-CurrentDeviceUDID', simulator.udid]);
  if (simulator.state !== 'Booted') {
    bootSimulator(simulator);
  }
  let buildOutput;
  if (!binaryPath) {
    buildOutput = await (0, _buildProject.buildProject)(xcodeProject, platform, simulator.udid, mode, scheme, args);
  }
  (0, _installApp.default)({
    buildOutput: buildOutput ?? '',
    xcodeProject,
    mode,
    scheme,
    target,
    udid: simulator.udid,
    binaryPath
  });
}
function bootSimulator(selectedSimulator) {
  const simulatorFullName = (0, _matchingDevice.formattedDeviceName)(selectedSimulator);
  _cliTools().logger.info(`Launching ${simulatorFullName}`);
  _child_process().default.spawnSync('xcrun', ['simctl', 'boot', selectedSimulator.udid]);
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/runCommand/runOnSimulator.js.map