"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFs = require("node:fs");
var _nodePath = require("node:path");
var _chokidar = require("chokidar");
var _utils = require("./utils/index.cjs");
var _nodeFs2 = require("./utils/node-fs.cjs");
var _anymatch = _interopRequireDefault(require("anymatch"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs";
module.exports = (0, _utils.defineDriver)((opts = {}) => {
  if (!opts.base) {
    throw (0, _utils.createRequiredError)(DRIVER_NAME, "base");
  }
  if (!opts.ignore) {
    opts.ignore = ["**/node_modules/**", "**/.git/**"];
  }
  opts.base = (0, _nodePath.resolve)(opts.base);
  const r = key => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw (0, _utils.createError)(DRIVER_NAME, `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`);
    }
    const resolved = (0, _nodePath.join)(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  let _watcher;
  const _unwatch = async () => {
    if (_watcher) {
      await _watcher.close();
      _watcher = void 0;
    }
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return (0, _nodeFs.existsSync)(r(key));
    },
    getItem(key) {
      return (0, _nodeFs2.readFile)(r(key), "utf8");
    },
    getItemRaw(key) {
      return (0, _nodeFs2.readFile)(r(key));
    },
    async getMeta(key) {
      const {
        atime,
        mtime,
        size,
        birthtime,
        ctime
      } = await _nodeFs.promises.stat(r(key)).catch(() => ({}));
      return {
        atime,
        mtime,
        size,
        birthtime,
        ctime
      };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return (0, _nodeFs2.writeFile)(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return (0, _nodeFs2.writeFile)(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return (0, _nodeFs2.unlink)(r(key));
    },
    getKeys() {
      return (0, _nodeFs2.readdirRecursive)(r("."), (0, _anymatch.default)(opts.ignore || []));
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await (0, _nodeFs2.rmRecursive)(r("."));
    },
    async dispose() {
      if (_watcher) {
        await _watcher.close();
      }
    },
    async watch(callback) {
      if (_watcher) {
        return _unwatch;
      }
      await new Promise((resolve2, reject) => {
        _watcher = (0, _chokidar.watch)(opts.base, {
          ignoreInitial: true,
          ignored: opts.ignore,
          ...opts.watchOptions
        }).on("ready", () => {
          resolve2();
        }).on("error", reject).on("all", (eventName, path) => {
          path = (0, _nodePath.relative)(opts.base, path);
          if (eventName === "change" || eventName === "add") {
            callback("update", path);
          } else if (eventName === "unlink") {
            callback("remove", path);
          }
        });
      });
      return _unwatch;
    }
  };
});