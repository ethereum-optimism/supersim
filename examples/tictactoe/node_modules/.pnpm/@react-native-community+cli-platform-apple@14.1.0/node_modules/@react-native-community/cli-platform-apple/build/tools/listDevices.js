"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.stripPlatform = stripPlatform;
function _execa() {
  const data = _interopRequireDefault(require("execa"));
  _execa = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const parseXcdeviceList = (text, sdkNames = []) => {
  const rawOutput = JSON.parse(text);
  const devices = rawOutput.filter(device => sdkNames.includes(stripPlatform(device === null || device === void 0 ? void 0 : device.platform))).sort(device => device.simulator ? 1 : -1).map(device => {
    var _device$error;
    return {
      isAvailable: device.available,
      name: device.name,
      udid: device.identifier,
      sdk: device.platform,
      version: device.operatingSystemVersion,
      availabilityError: (_device$error = device.error) === null || _device$error === void 0 ? void 0 : _device$error.description,
      type: device.simulator ? 'simulator' : 'device'
    };
  });
  return devices;
};

/**
 * Executes `xcrun xcdevice list` and `xcrun simctl list --json devices`, and connects parsed output of these two commands. We are running these two commands as they are necessary to display both physical devices and simulators. However, it's important to note that neither command provides a combined output of both.
 * @param sdkNames
 * @returns List of available devices and simulators.
 */
async function listDevices(sdkNames) {
  const xcdeviceOutput = _execa().default.sync('xcrun', ['xcdevice', 'list']).stdout;
  const parsedXcdeviceOutput = parseXcdeviceList(xcdeviceOutput, sdkNames);
  const simctlOutput = JSON.parse(_execa().default.sync('xcrun', ['simctl', 'list', '--json', 'devices']).stdout);
  const parsedSimctlOutput = Object.keys(simctlOutput.devices).map(key => simctlOutput.devices[key]).reduce((acc, val) => acc.concat(val), []);
  const merged = [];
  const matchedUdids = new Set();
  parsedXcdeviceOutput.forEach(first => {
    const match = parsedSimctlOutput.find(second => first.udid === second.udid);
    if (match) {
      matchedUdids.add(first.udid);
      merged.push({
        ...first,
        ...match
      });
    } else {
      merged.push({
        ...first
      });
    }
  });
  parsedSimctlOutput.forEach(item => {
    if (!matchedUdids.has(item.udid)) {
      merged.push({
        ...item
      });
    }
  });
  return merged.filter(({
    isAvailable
  }) => isAvailable === true);
}
function stripPlatform(platform) {
  return platform.replace('com.apple.platform.', '');
}
var _default = listDevices;
exports.default = _default;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/tools/listDevices.js.map