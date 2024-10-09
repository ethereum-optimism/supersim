"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _os() {
  const data = _interopRequireDefault(require("os"));
  _os = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getDefaultUserTerminal = () => {
  const {
    REACT_TERMINAL,
    TERM_PROGRAM,
    TERM
  } = process.env;
  if (REACT_TERMINAL) {
    return REACT_TERMINAL;
  }
  if (_os().default.platform() === 'darwin') {
    return TERM_PROGRAM;
  }
  if (_os().default.platform() === 'win32') {
    return 'cmd.exe';
  }
  return TERM;
};
var _default = getDefaultUserTerminal;
exports.default = _default;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-tools/build/getDefaultUserTerminal.js.map