"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.assignOptions =
  exports.DELETE_EVENT =
  exports.CHANGE_EVENT =
  exports.ALL_EVENT =
  exports.ADD_EVENT =
    void 0;
exports.isIncluded = isIncluded;
exports.recReaddir = recReaddir;
exports.typeFromStat = typeFromStat;
const anymatch = require("anymatch");
const micromatch = require("micromatch");
const platform = require("os").platform();
const path = require("path");
const walker = require("walker");
const CHANGE_EVENT = "change";
exports.CHANGE_EVENT = CHANGE_EVENT;
const DELETE_EVENT = "delete";
exports.DELETE_EVENT = DELETE_EVENT;
const ADD_EVENT = "add";
exports.ADD_EVENT = ADD_EVENT;
const ALL_EVENT = "all";
exports.ALL_EVENT = ALL_EVENT;
const assignOptions = function (watcher, opts) {
  watcher.globs = opts.glob ?? [];
  watcher.dot = opts.dot ?? false;
  watcher.ignored = opts.ignored ?? false;
  watcher.watchmanDeferStates = opts.watchmanDeferStates;
  if (!Array.isArray(watcher.globs)) {
    watcher.globs = [watcher.globs];
  }
  watcher.doIgnore =
    opts.ignored != null && opts.ignored !== false
      ? anymatch(opts.ignored)
      : () => false;
  if (opts.watchman == true && opts.watchmanPath != null) {
    watcher.watchmanPath = opts.watchmanPath;
  }
  return opts;
};
exports.assignOptions = assignOptions;
function isIncluded(type, globs, dot, doIgnore, relativePath) {
  if (doIgnore(relativePath)) {
    return false;
  }
  if (globs.length === 0 || type !== "f") {
    return dot || micromatch.some(relativePath, "**/*");
  }
  return micromatch.some(relativePath, globs, {
    dot,
  });
}
function recReaddir(
  dir,
  dirCallback,
  fileCallback,
  symlinkCallback,
  endCallback,
  errorCallback,
  ignored
) {
  walker(dir)
    .filterDir((currentDir) => !anymatch(ignored, currentDir))
    .on("dir", normalizeProxy(dirCallback))
    .on("file", normalizeProxy(fileCallback))
    .on("symlink", normalizeProxy(symlinkCallback))
    .on("error", errorCallback)
    .on("end", () => {
      if (platform === "win32") {
        setTimeout(endCallback, 1000);
      } else {
        endCallback();
      }
    });
}
function normalizeProxy(callback) {
  return (filepath, stats) => callback(path.normalize(filepath), stats);
}
function typeFromStat(stat) {
  if (stat.isSymbolicLink()) {
    return "l";
  }
  if (stat.isDirectory()) {
    return "d";
  }
  if (stat.isFile()) {
    return "f";
  }
  return null;
}
