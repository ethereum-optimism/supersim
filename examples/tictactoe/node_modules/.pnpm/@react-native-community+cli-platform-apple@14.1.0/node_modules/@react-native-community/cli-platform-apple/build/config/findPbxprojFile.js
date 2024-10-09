"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function findPbxprojFile(projectInfo) {
  return _path().default.join(projectInfo.path, projectInfo.name.replace('.xcworkspace', '.xcodeproj'), 'project.pbxproj');
}
var _default = findPbxprojFile;
exports.default = _default;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/config/findPbxprojFile.js.map