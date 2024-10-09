"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mime2 = _interopRequireDefault(require("_mime"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const mime = {
  ..._mime2.default
};
mime.lookup = mime.getType;
mime.extension = mime.getExtension;
const noop = () => {};
mime.define = noop;
mime.load = noop;
mime.default_type = "application/octet-stream";
mime.charsets = {
  lookup: () => "UTF-8"
};
module.exports = mime;