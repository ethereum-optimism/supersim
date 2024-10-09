"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectConfig = exports.dependencyConfig = void 0;
function _cliPlatformApple() {
  const data = require("@react-native-community/cli-platform-apple");
  _cliPlatformApple = function () {
    return data;
  };
  return data;
}
const dependencyConfig = (0, _cliPlatformApple().getDependencyConfig)({
  platformName: 'ios'
});
exports.dependencyConfig = dependencyConfig;
const projectConfig = (0, _cliPlatformApple().getProjectConfig)({
  platformName: 'ios'
});
exports.projectConfig = projectConfig;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-ios/build/config/index.js.map