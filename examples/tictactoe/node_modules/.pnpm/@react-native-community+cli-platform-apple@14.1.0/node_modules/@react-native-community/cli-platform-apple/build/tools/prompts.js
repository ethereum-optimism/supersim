"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptForConfigurationSelection = promptForConfigurationSelection;
exports.promptForDeviceSelection = promptForDeviceSelection;
exports.promptForDeviceToTailLogs = promptForDeviceToTailLogs;
exports.promptForSchemeSelection = promptForSchemeSelection;
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getVersionFromDevice({
  version
}) {
  var _version$match;
  return version ? ` (${(_version$match = version.match(/^(\d+\.\d+)/)) === null || _version$match === void 0 ? void 0 : _version$match[1]})` : '';
}
async function promptForSchemeSelection(schemes) {
  const {
    scheme
  } = await (0, _cliTools().prompt)({
    name: 'scheme',
    type: 'select',
    message: 'Select the scheme you want to use',
    choices: schemes.map(value => ({
      title: value,
      value: value
    }))
  });
  return scheme;
}
async function promptForConfigurationSelection(configurations) {
  const {
    configuration
  } = await (0, _cliTools().prompt)({
    name: 'configuration',
    type: 'select',
    message: 'Select the configuration you want to use',
    choices: configurations.map(value => ({
      title: value,
      value: value
    }))
  });
  return configuration;
}
async function promptForDeviceSelection(devices, lastUsedIOSDeviceId) {
  const sortedDevices = [...devices];
  const devicesIds = sortedDevices.map(({
    udid
  }) => udid);
  if (lastUsedIOSDeviceId) {
    const preferredDeviceIndex = devicesIds.indexOf(lastUsedIOSDeviceId);
    if (preferredDeviceIndex > -1) {
      const [preferredDevice] = sortedDevices.splice(preferredDeviceIndex, 1);
      sortedDevices.unshift(preferredDevice);
    }
  }
  const {
    device
  } = await (0, _cliTools().prompt)({
    type: 'select',
    name: 'device',
    message: 'Select the device you want to use',
    choices: sortedDevices.filter(({
      type
    }) => type === 'device' || type === 'simulator').map(d => {
      const availability = !d.isAvailable && !!d.availabilityError ? _chalk().default.red(`(unavailable - ${d.availabilityError})`) : '';
      return {
        title: `${_chalk().default.bold(`${d.name}${getVersionFromDevice(d)}`)} ${availability}`,
        value: d,
        disabled: !d.isAvailable
      };
    }),
    min: 1
  });
  return device;
}
async function promptForDeviceToTailLogs(platformReadableName, simulators) {
  const {
    udid
  } = await (0, _cliTools().prompt)({
    type: 'select',
    name: 'udid',
    message: `Select ${platformReadableName} simulators to tail logs from`,
    choices: simulators.map(simulator => ({
      title: `${simulator.name}${getVersionFromDevice(simulator)}`.trim(),
      value: simulator.udid
    }))
  });
  return udid;
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/tools/prompts.js.map