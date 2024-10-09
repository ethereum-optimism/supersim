"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findPodspec;
function _fastGlob() {
  const data = _interopRequireDefault(require("fast-glob"));
  _fastGlob = function () {
    return data;
  };
  return data;
}
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
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
function findPodspec(folder) {
  const podspecs = _fastGlob().default.sync('*.podspec', {
    cwd: (0, _cliTools().unixifyPaths)(folder)
  });
  if (podspecs.length === 0) {
    return null;
  }
  const packagePodspec = _path().default.basename(folder) + '.podspec';
  const podspecFile = podspecs.includes(packagePodspec) ? packagePodspec : podspecs[0];
  return _path().default.join(folder, podspecFile);
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/config/findPodspec.js.map