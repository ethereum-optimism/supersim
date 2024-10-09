"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = _interopRequireDefault(require("../node/process/index.cjs"));
var _globalThis = _interopRequireDefault(require("./global-this.cjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_globalThis.default.process = _globalThis.default.process || _index.default;
module.exports = _globalThis.default.process;