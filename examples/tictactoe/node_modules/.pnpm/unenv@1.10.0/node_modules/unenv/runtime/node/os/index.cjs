"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.availableParallelism = exports.arch = exports.EOL = void 0;
Object.defineProperty(exports, "constants", {
  enumerable: true,
  get: function () {
    return _constants.default;
  }
});
exports.version = exports.userInfo = exports.uptime = exports.type = exports.totalmem = exports.tmpdir = exports.setPriority = exports.release = exports.platform = exports.networkInterfaces = exports.machine = exports.loadavg = exports.hostname = exports.homedir = exports.getPriority = exports.freemem = exports.endianness = exports.devNull = exports.default = exports.cpus = void 0;
var _utils = require("../../_internal/utils.cjs");
var _constants = _interopRequireDefault(require("./_constants.cjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NUM_CPUS = 8;
const availableParallelism = () => NUM_CPUS;
exports.availableParallelism = availableParallelism;
const arch = () => "";
exports.arch = arch;
const machine = () => "";
exports.machine = machine;
const endianness = () => "LE";
exports.endianness = endianness;
const cpus = () => {
  const info = {
    model: "",
    speed: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  };
  return Array.from({
    length: NUM_CPUS
  }, () => info);
};
exports.cpus = cpus;
const getPriority = () => 0;
exports.getPriority = getPriority;
const setPriority = exports.setPriority = (0, _utils.notImplemented)("os.setPriority");
const homedir = () => "/";
exports.homedir = homedir;
const tmpdir = () => "/tmp";
exports.tmpdir = tmpdir;
const devNull = exports.devNull = "/dev/null";
const freemem = () => 0;
exports.freemem = freemem;
const totalmem = () => 0;
exports.totalmem = totalmem;
const loadavg = () => [0, 0, 0];
exports.loadavg = loadavg;
const uptime = () => 0;
exports.uptime = uptime;
const hostname = () => "";
exports.hostname = hostname;
const networkInterfaces = () => {
  return {
    lo0: [{
      address: "127.0.0.1",
      netmask: "255.0.0.0",
      family: "IPv4",
      mac: "00:00:00:00:00:00",
      internal: true,
      cidr: "127.0.0.1/8"
    }, {
      address: "::1",
      netmask: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
      family: "IPv6",
      mac: "00:00:00:00:00:00",
      internal: true,
      cidr: "::1/128",
      scopeid: 0
    }, {
      address: "fe80::1",
      netmask: "ffff:ffff:ffff:ffff::",
      family: "IPv6",
      mac: "00:00:00:00:00:00",
      internal: true,
      cidr: "fe80::1/64",
      scopeid: 1
    }]
  };
};
exports.networkInterfaces = networkInterfaces;
const platform = () => "linux";
exports.platform = platform;
const type = () => "Linux";
exports.type = type;
const release = () => "";
exports.release = release;
const version = () => "";
exports.version = version;
const userInfo = opts => {
  const encode = str => {
    if (opts?.encoding) {
      const buff = Buffer.from(str);
      return opts.encoding === "buffer" ? buff : buff.toString(opts.encoding);
    }
    return str;
  };
  return {
    gid: 1e3,
    uid: 1e3,
    homedir: encode("/"),
    shell: encode("/bin/sh"),
    username: encode("root")
  };
};
exports.userInfo = userInfo;
const EOL = exports.EOL = "\n";
module.exports = {
  arch,
  availableParallelism,
  constants: _constants.default,
  cpus,
  EOL,
  endianness,
  devNull,
  freemem,
  getPriority,
  homedir,
  hostname,
  loadavg,
  machine,
  networkInterfaces,
  platform,
  release,
  setPriority,
  tmpdir,
  totalmem,
  type,
  uptime,
  userInfo,
  version
};