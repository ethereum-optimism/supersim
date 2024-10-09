"use strict";

var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
class Module {
  constructor(file, moduleCache) {
    if (!_path.default.isAbsolute(file)) {
      throw new Error("Expected file to be absolute path but got " + file);
    }
    this.path = file;
    this._moduleCache = moduleCache;
  }
  getPackage() {
    return this._moduleCache.getPackageForModule(this)?.pkg;
  }
  invalidate() {}
}
module.exports = Module;
