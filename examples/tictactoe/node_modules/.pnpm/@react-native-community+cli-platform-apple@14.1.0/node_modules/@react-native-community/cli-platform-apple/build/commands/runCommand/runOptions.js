"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRunOptions = void 0;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _getPlatformInfo = require("./getPlatformInfo");
var _buildOptions = require("../buildCommand/buildOptions");
const getRunOptions = ({
  platformName
}) => {
  const {
    readableName
  } = (0, _getPlatformInfo.getPlatformInfo)(platformName);
  const isMac = platformName === 'macos';
  return [{
    name: '--no-packager',
    description: 'Do not launch packager while running the app'
  }, {
    name: '--port <number>',
    default: process.env.RCT_METRO_PORT || 8081,
    parse: Number
  }, {
    name: '--terminal <string>',
    description: 'Launches the Metro Bundler in a new window using the specified terminal path.',
    default: (0, _cliTools().getDefaultUserTerminal)()
  }, {
    name: '--binary-path <string>',
    description: 'Path relative to project root where pre-built .app binary lives.'
  }, {
    name: '--list-devices',
    description: `List all available ${readableName} devices and simulators and let you choose one to run the app. `
  }, {
    name: '--udid <string>',
    description: 'Explicitly set the device to use by UDID'
  }, !isMac && {
    name: '--simulator <string>',
    description: `Explicitly set the simulator to use. Optionally set the ${readableName} version ` + 'between parentheses at the end to match an exact version: ' + '"iPhone 15 (17.0)"'
  }, ...(0, _buildOptions.getBuildOptions)({
    platformName
  })];
};
exports.getRunOptions = getRunOptions;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/runCommand/runOptions.js.map