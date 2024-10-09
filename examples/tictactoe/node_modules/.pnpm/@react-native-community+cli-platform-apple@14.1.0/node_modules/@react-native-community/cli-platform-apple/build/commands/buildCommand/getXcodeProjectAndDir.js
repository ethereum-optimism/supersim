"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getXcodeProjectAndDir = getXcodeProjectAndDir;
function _fs() {
  const data = _interopRequireDefault(require("fs"));
  _fs = function () {
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
var _findXcodeProject = _interopRequireDefault(require("../../config/findXcodeProject"));
var _getPlatformInfo = require("../runCommand/getPlatformInfo");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getXcodeProjectAndDir(iosProjectConfig, platformName, installedPods) {
  const {
    readableName: platformReadableName
  } = (0, _getPlatformInfo.getPlatformInfo)(platformName);
  if (!iosProjectConfig) {
    throw new (_cliTools().CLIError)(`${platformReadableName} project folder not found. Make sure that project.${platformName}.sourceDir points to a directory with your Xcode project and that you are running this command inside of React Native project.`);
  }
  let {
    xcodeProject,
    sourceDir
  } = iosProjectConfig;
  if (!xcodeProject) {
    throw new (_cliTools().CLIError)(`Could not find Xcode project files in "${sourceDir}" folder. Please make sure that you have installed Cocoapods and "${sourceDir}" is a valid path`);
  }

  // if project is freshly created, revisit Xcode project to verify Pods are installed correctly.
  // This is needed because ctx project is created before Pods are installed, so it might have outdated information.
  if (installedPods) {
    const recheckXcodeProject = (0, _findXcodeProject.default)(_fs().default.readdirSync(sourceDir));
    if (recheckXcodeProject) {
      xcodeProject = recheckXcodeProject;
    }
  }
  return {
    xcodeProject,
    sourceDir
  };
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/buildCommand/getXcodeProjectAndDir.js.map