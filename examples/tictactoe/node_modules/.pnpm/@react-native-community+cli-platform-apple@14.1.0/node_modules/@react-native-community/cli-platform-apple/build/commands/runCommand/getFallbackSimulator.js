"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFallbackSimulator = getFallbackSimulator;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _getDestinationSimulator = require("../../tools/getDestinationSimulator");
function getFallbackSimulator(args) {
  /**
   * If provided simulator does not exist, try simulators in following order
   * - iPhone 14
   * - iPhone 13
   * - iPhone 12
   * - iPhone 11
   */

  const fallbackSimulators = ['iPhone 14', 'iPhone 13', 'iPhone 12', 'iPhone 11'];
  const selectedSimulator = (0, _getDestinationSimulator.getDestinationSimulator)(args, fallbackSimulators);
  if (!selectedSimulator) {
    throw new (_cliTools().CLIError)(`No simulator available with ${args.simulator ? `name "${args.simulator}"` : `udid "${args.udid}"`}`);
  }
  return selectedSimulator;
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/runCommand/getFallbackSimulator.js.map