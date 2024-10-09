"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formattedDeviceName = formattedDeviceName;
exports.matchingDevice = matchingDevice;
exports.printFoundDevices = printFoundDevices;
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function matchingDevice(devices, deviceName) {
  // The condition specifically checks if the value is `true`, not just truthy to allow for `--device` flag without a value
  if (deviceName === true) {
    const firstIOSDevice = devices.find(d => d.type === 'device');
    if (firstIOSDevice) {
      _cliTools().logger.info(`Using first available device named "${_chalk().default.bold(firstIOSDevice.name)}" due to lack of name supplied.`);
      return firstIOSDevice;
    } else {
      _cliTools().logger.error('No iOS devices connected.');
      return undefined;
    }
  }
  return devices.find(device => device.name === deviceName || formattedDeviceName(device) === deviceName);
}
function formattedDeviceName(simulator) {
  return simulator.version ? `${simulator.name} (${simulator.version})` : simulator.name;
}
function printFoundDevices(devices, type) {
  let filteredDevice = [...devices];
  if (type) {
    filteredDevice = filteredDevice.filter(device => device.type === type);
  }
  return ['Available devices:', ...filteredDevice.map(({
    name,
    udid
  }) => `  - ${name} (${udid})`)].join('\n');
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/runCommand/matchingDevice.js.map