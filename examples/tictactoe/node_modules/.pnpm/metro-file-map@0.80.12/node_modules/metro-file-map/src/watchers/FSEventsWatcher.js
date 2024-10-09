"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
var _common = require("./common");
var _anymatch = _interopRequireDefault(require("anymatch"));
var _events = _interopRequireDefault(require("events"));
var _fs = require("fs");
var path = _interopRequireWildcard(require("path"));
var _walker = _interopRequireDefault(require("walker"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const debug = require("debug")("Metro:FSEventsWatcher");
let fsevents = null;
try {
  fsevents = require("fsevents");
} catch {}
const CHANGE_EVENT = "change";
const DELETE_EVENT = "delete";
const ADD_EVENT = "add";
const ALL_EVENT = "all";
class FSEventsWatcher extends _events.default {
  static isSupported() {
    return fsevents != null;
  }
  static _normalizeProxy(callback) {
    return (filepath, stats) => callback(path.normalize(filepath), stats);
  }
  static _recReaddir(
    dir,
    dirCallback,
    fileCallback,
    symlinkCallback,
    endCallback,
    errorCallback,
    ignored
  ) {
    (0, _walker.default)(dir)
      .filterDir(
        (currentDir) => !ignored || !(0, _anymatch.default)(ignored, currentDir)
      )
      .on("dir", FSEventsWatcher._normalizeProxy(dirCallback))
      .on("file", FSEventsWatcher._normalizeProxy(fileCallback))
      .on("symlink", FSEventsWatcher._normalizeProxy(symlinkCallback))
      .on("error", errorCallback)
      .on("end", () => {
        endCallback();
      });
  }
  constructor(dir, opts) {
    if (!fsevents) {
      throw new Error(
        "`fsevents` unavailable (this watcher can only be used on Darwin)"
      );
    }
    super();
    this.dot = opts.dot || false;
    this.ignored = opts.ignored;
    this.glob = Array.isArray(opts.glob) ? opts.glob : [opts.glob];
    this.doIgnore = opts.ignored
      ? (0, _anymatch.default)(opts.ignored)
      : () => false;
    this.root = path.resolve(dir);
    this.fsEventsWatchStopper = fsevents.watch(this.root, (path) => {
      this._handleEvent(path).catch((error) => {
        this.emit("error", error);
      });
    });
    debug(`Watching ${this.root}`);
    this._tracked = new Set();
    const trackPath = (filePath) => {
      this._tracked.add(filePath);
    };
    FSEventsWatcher._recReaddir(
      this.root,
      trackPath,
      trackPath,
      trackPath,
      this.emit.bind(this, "ready"),
      this.emit.bind(this, "error"),
      this.ignored
    );
  }
  async close(callback) {
    await this.fsEventsWatchStopper();
    this.removeAllListeners();
    if (typeof callback === "function") {
      process.nextTick(callback.bind(null, null, true));
    }
  }
  async _handleEvent(filepath) {
    const relativePath = path.relative(this.root, filepath);
    try {
      const stat = await _fs.promises.lstat(filepath);
      const type = (0, _common.typeFromStat)(stat);
      if (!type) {
        return;
      }
      if (
        !(0, _common.isIncluded)(
          type,
          this.glob,
          this.dot,
          this.doIgnore,
          relativePath
        )
      ) {
        return;
      }
      const metadata = {
        type,
        modifiedTime: stat.mtime.getTime(),
        size: stat.size,
      };
      if (this._tracked.has(filepath)) {
        this._emit(CHANGE_EVENT, relativePath, metadata);
      } else {
        this._tracked.add(filepath);
        this._emit(ADD_EVENT, relativePath, metadata);
      }
    } catch (error) {
      if (error?.code !== "ENOENT") {
        this.emit("error", error);
        return;
      }
      if (!this._tracked.has(filepath)) {
        return;
      }
      this._emit(DELETE_EVENT, relativePath);
      this._tracked.delete(filepath);
    }
  }
  _emit(type, file, metadata) {
    this.emit(type, file, this.root, metadata);
    this.emit(ALL_EVENT, type, file, this.root, metadata);
  }
  getPauseReason() {
    return null;
  }
}
exports.default = FSEventsWatcher;
