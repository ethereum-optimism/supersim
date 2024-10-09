"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "commands", {
  enumerable: true,
  get: function () {
    return _commands.default;
  }
});
Object.defineProperty(exports, "dependencyConfig", {
  enumerable: true,
  get: function () {
    return _config.dependencyConfig;
  }
});
Object.defineProperty(exports, "findPodfilePaths", {
  enumerable: true,
  get: function () {
    return _cliPlatformApple().findPodfilePaths;
  }
});
Object.defineProperty(exports, "getArchitecture", {
  enumerable: true,
  get: function () {
    return _cliPlatformApple().getArchitecture;
  }
});
Object.defineProperty(exports, "installPods", {
  enumerable: true,
  get: function () {
    return _cliPlatformApple().installPods;
  }
});
Object.defineProperty(exports, "projectConfig", {
  enumerable: true,
  get: function () {
    return _config.projectConfig;
  }
});
var _commands = _interopRequireDefault(require("./commands"));
function _cliPlatformApple() {
  const data = require("@react-native-community/cli-platform-apple");
  _cliPlatformApple = function () {
    return data;
  };
  return data;
}
var _config = require("./config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-ios/build/index.js.map