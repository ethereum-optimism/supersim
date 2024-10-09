"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectCommands = exports.detachedCommands = void 0;
function _cliClean() {
  const data = require("@react-native-community/cli-clean");
  _cliClean = function () {
    return data;
  };
  return data;
}
function _cliDoctor() {
  const data = require("@react-native-community/cli-doctor");
  _cliDoctor = function () {
    return data;
  };
  return data;
}
function _cliConfig() {
  const data = require("@react-native-community/cli-config");
  _cliConfig = function () {
    return data;
  };
  return data;
}
var _init = _interopRequireDefault(require("./init"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const projectCommands = [..._cliConfig().commands, _cliClean().commands.clean, _cliDoctor().commands.info];
exports.projectCommands = projectCommands;
const detachedCommands = [_init.default, _cliDoctor().commands.doctor];
exports.detachedCommands = detachedCommands;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli/build/commands/index.js.map