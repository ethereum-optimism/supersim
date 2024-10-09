"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfiguration = getConfiguration;
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
var _selectFromInteractiveMode = require("../../tools/selectFromInteractiveMode");
var _getInfo = require("../../tools/getInfo");
var _checkIfConfigurationExists = require("../../tools/checkIfConfigurationExists");
var _getBuildConfigurationFromXcScheme = require("../../tools/getBuildConfigurationFromXcScheme");
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
var _getPlatformInfo = require("../runCommand/getPlatformInfo");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function getConfiguration(xcodeProject, sourceDir, args, platformName) {
  var _info$schemes;
  const info = (0, _getInfo.getInfo)(xcodeProject, sourceDir);
  if (args.mode) {
    (0, _checkIfConfigurationExists.checkIfConfigurationExists)((info === null || info === void 0 ? void 0 : info.configurations) ?? [], args.mode);
  }
  let scheme = args.scheme || _path().default.basename(xcodeProject.name, _path().default.extname(xcodeProject.name));
  if (!(info === null || info === void 0 ? void 0 : (_info$schemes = info.schemes) === null || _info$schemes === void 0 ? void 0 : _info$schemes.includes(scheme))) {
    var _info$schemes2;
    const {
      readableName
    } = (0, _getPlatformInfo.getPlatformInfo)(platformName);
    const fallbackScheme = `${scheme}-${readableName}`;
    if (info === null || info === void 0 ? void 0 : (_info$schemes2 = info.schemes) === null || _info$schemes2 === void 0 ? void 0 : _info$schemes2.includes(fallbackScheme)) {
      _cliTools().logger.warn(`Scheme "${_chalk().default.bold(scheme)}" doesn't exist. Using fallback scheme "${_chalk().default.bold(fallbackScheme)}"`);
      scheme = fallbackScheme;
    }
  }
  let mode = args.mode || (0, _getBuildConfigurationFromXcScheme.getBuildConfigurationFromXcScheme)(scheme, 'Debug', sourceDir, info);
  if (args.interactive) {
    const selection = await (0, _selectFromInteractiveMode.selectFromInteractiveMode)({
      scheme,
      mode,
      info
    });
    if (selection.scheme) {
      scheme = selection.scheme;
    }
    if (selection.mode) {
      mode = selection.mode;
    }
  }
  _cliTools().logger.info(`Found Xcode ${xcodeProject.isWorkspace ? 'workspace' : 'project'} "${_chalk().default.bold(xcodeProject.name)}"`);
  return {
    scheme,
    mode
  };
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/buildCommand/getConfiguration.js.map