"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _child_process() {
  const data = require("child_process");
  _child_process = function () {
    return data;
  };
  return data;
}
function _os() {
  const data = _interopRequireDefault(require("os"));
  _os = function () {
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
var _listDevices = _interopRequireDefault(require("../../tools/listDevices"));
var _getPlatformInfo = require("../runCommand/getPlatformInfo");
var _supportedPlatforms = require("../../config/supportedPlatforms");
var _prompts = require("../../tools/prompts");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Starts Apple device syslog tail
 */

const createLog = ({
  platformName
}) => async (_, ctx, args) => {
  const platformConfig = ctx.project[platformName];
  const {
    readableName: platformReadableName
  } = (0, _getPlatformInfo.getPlatformInfo)(platformName);
  if (platformConfig === undefined || _supportedPlatforms.supportedPlatforms[platformName] === undefined) {
    throw new (_cliTools().CLIError)(`Unable to find ${platformName} platform config`);
  }
  const {
    sdkNames
  } = (0, _getPlatformInfo.getPlatformInfo)(platformName);
  const allDevices = await (0, _listDevices.default)(sdkNames);
  const simulators = allDevices.filter(({
    type
  }) => type === 'simulator');
  if (simulators.length === 0) {
    _cliTools().logger.error('No simulators detected. Install simulators via Xcode.');
    return;
  }
  const booted = simulators.filter(({
    state
  }) => state === 'Booted');
  if (booted.length === 0) {
    _cliTools().logger.error(`No booted and available ${platformReadableName} simulators found.`);
    return;
  }
  if (args.interactive && booted.length > 1) {
    const udid = await (0, _prompts.promptForDeviceToTailLogs)(platformReadableName, booted);
    const simulator = booted.find(({
      udid: deviceUDID
    }) => deviceUDID === udid);
    if (!simulator) {
      throw new (_cliTools().CLIError)(`Unable to find simulator with udid: ${udid} in booted simulators`);
    }
    tailDeviceLogs(simulator);
  } else {
    tailDeviceLogs(booted[0]);
  }
};
function tailDeviceLogs(device) {
  const logDir = _path().default.join(_os().default.homedir(), 'Library', 'Logs', 'CoreSimulator', device.udid, 'asl');
  _cliTools().logger.info(`Tailing logs for device ${device.name} (${device.udid})`);
  const log = (0, _child_process().spawnSync)('syslog', ['-w', '-F', 'std', '-d', logDir], {
    stdio: 'inherit'
  });
  if (log.error !== null) {
    throw log.error;
  }
}
var _default = createLog;
exports.default = _default;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/logCommand/createLog.js.map