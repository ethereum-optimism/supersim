"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _globalThis = _interopRequireDefault(require("./global-this.cjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
try {
  const _defineOpts = {
    enumerable: false,
    value: _globalThis.default
  };
  Object.defineProperties(_globalThis.default, {
    self: _defineOpts,
    window: _defineOpts,
    global: _defineOpts
  });
} catch {}
module.exports = _globalThis.default;