"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeCommand = executeCommand;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _execa() {
  const data = _interopRequireDefault(require("execa"));
  _execa = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function executeCommand(command, args, options) {
  return (0, _execa().default)(command, args, {
    stdio: options.silent && !_cliTools().logger.isVerbose() ? 'pipe' : 'inherit',
    cwd: options.root
  });
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli/build/tools/executeCommand.js.map