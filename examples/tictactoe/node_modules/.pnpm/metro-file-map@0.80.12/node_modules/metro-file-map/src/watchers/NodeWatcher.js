"use strict";

const common = require("./common");
const { EventEmitter } = require("events");
const fs = require("fs");
const platform = require("os").platform();
const path = require("path");
const fsPromises = fs.promises;
const CHANGE_EVENT = common.CHANGE_EVENT;
const DELETE_EVENT = common.DELETE_EVENT;
const ADD_EVENT = common.ADD_EVENT;
const ALL_EVENT = common.ALL_EVENT;
const DEBOUNCE_MS = 100;
module.exports = class NodeWatcher extends EventEmitter {
  _changeTimers = new Map();
  constructor(dir, opts) {
    super();
    common.assignOptions(this, opts);
    this.watched = Object.create(null);
    this._dirRegistry = Object.create(null);
    this.root = path.resolve(dir);
    this._watchdir(this.root);
    common.recReaddir(
      this.root,
      (dir) => {
        this._watchdir(dir);
      },
      (filename) => {
        this._register(filename, "f");
      },
      (symlink) => {
        this._register(symlink, "l");
      },
      () => {
        this.emit("ready");
      },
      this._checkedEmitError,
      this.ignored
    );
  }
  _register(filepath, type) {
    const dir = path.dirname(filepath);
    const filename = path.basename(filepath);
    if (this._dirRegistry[dir] && this._dirRegistry[dir][filename]) {
      return false;
    }
    const relativePath = path.relative(this.root, filepath);
    if (
      type === "f" &&
      !common.isIncluded("f", this.globs, this.dot, this.doIgnore, relativePath)
    ) {
      return false;
    }
    if (!this._dirRegistry[dir]) {
      this._dirRegistry[dir] = Object.create(null);
    }
    this._dirRegistry[dir][filename] = true;
    return true;
  }
  _unregister(filepath) {
    const dir = path.dirname(filepath);
    if (this._dirRegistry[dir]) {
      const filename = path.basename(filepath);
      delete this._dirRegistry[dir][filename];
    }
  }
  _unregisterDir(dirpath) {
    if (this._dirRegistry[dirpath]) {
      delete this._dirRegistry[dirpath];
    }
  }
  _registered(fullpath) {
    const dir = path.dirname(fullpath);
    return !!(
      this._dirRegistry[fullpath] ||
      (this._dirRegistry[dir] &&
        this._dirRegistry[dir][path.basename(fullpath)])
    );
  }
  _checkedEmitError = (error) => {
    if (!isIgnorableFileError(error)) {
      this.emit("error", error);
    }
  };
  _watchdir = (dir) => {
    if (this.watched[dir]) {
      return false;
    }
    const watcher = fs.watch(
      dir,
      {
        persistent: true,
      },
      (event, filename) => this._normalizeChange(dir, event, filename)
    );
    this.watched[dir] = watcher;
    watcher.on("error", this._checkedEmitError);
    if (this.root !== dir) {
      this._register(dir, "d");
    }
    return true;
  };
  _stopWatching(dir) {
    if (this.watched[dir]) {
      this.watched[dir].close();
      delete this.watched[dir];
    }
  }
  async close() {
    Object.keys(this.watched).forEach((dir) => this._stopWatching(dir));
    this.removeAllListeners();
  }
  _detectChangedFile(dir, event, callback) {
    if (!this._dirRegistry[dir]) {
      return;
    }
    let found = false;
    let closest = null;
    let c = 0;
    Object.keys(this._dirRegistry[dir]).forEach((file, i, arr) => {
      fs.lstat(path.join(dir, file), (error, stat) => {
        if (found) {
          return;
        }
        if (error) {
          if (isIgnorableFileError(error)) {
            found = true;
            callback(file);
          } else {
            this.emit("error", error);
          }
        } else {
          if (closest == null || stat.mtime > closest.mtime) {
            closest = {
              file,
              mtime: stat.mtime,
            };
          }
          if (arr.length === ++c) {
            callback(closest.file);
          }
        }
      });
    });
  }
  _normalizeChange(dir, event, file) {
    if (!file) {
      this._detectChangedFile(dir, event, (actualFile) => {
        if (actualFile) {
          this._processChange(dir, event, actualFile).catch((error) =>
            this.emit("error", error)
          );
        }
      });
    } else {
      this._processChange(dir, event, path.normalize(file)).catch((error) =>
        this.emit("error", error)
      );
    }
  }
  async _processChange(dir, event, file) {
    const fullPath = path.join(dir, file);
    const relativePath = path.join(path.relative(this.root, dir), file);
    const registered = this._registered(fullPath);
    try {
      const stat = await fsPromises.lstat(fullPath);
      if (stat.isDirectory()) {
        if (event === "change") {
          return;
        }
        if (
          !common.isIncluded(
            "d",
            this.globs,
            this.dot,
            this.doIgnore,
            relativePath
          )
        ) {
          return;
        }
        common.recReaddir(
          path.resolve(this.root, relativePath),
          (dir, stats) => {
            if (this._watchdir(dir)) {
              this._emitEvent(ADD_EVENT, path.relative(this.root, dir), {
                modifiedTime: stats.mtime.getTime(),
                size: stats.size,
                type: "d",
              });
            }
          },
          (file, stats) => {
            if (this._register(file, "f")) {
              this._emitEvent(ADD_EVENT, path.relative(this.root, file), {
                modifiedTime: stats.mtime.getTime(),
                size: stats.size,
                type: "f",
              });
            }
          },
          (symlink, stats) => {
            if (this._register(symlink, "l")) {
              this._rawEmitEvent(ADD_EVENT, path.relative(this.root, symlink), {
                modifiedTime: stats.mtime.getTime(),
                size: stats.size,
                type: "l",
              });
            }
          },
          function endCallback() {},
          this._checkedEmitError,
          this.ignored
        );
      } else {
        const type = common.typeFromStat(stat);
        if (type == null) {
          return;
        }
        const metadata = {
          modifiedTime: stat.mtime.getTime(),
          size: stat.size,
          type,
        };
        if (registered) {
          this._emitEvent(CHANGE_EVENT, relativePath, metadata);
        } else {
          if (this._register(fullPath, type)) {
            this._emitEvent(ADD_EVENT, relativePath, metadata);
          }
        }
      }
    } catch (error) {
      if (!isIgnorableFileError(error)) {
        this.emit("error", error);
        return;
      }
      this._unregister(fullPath);
      this._stopWatching(fullPath);
      this._unregisterDir(fullPath);
      if (registered) {
        this._emitEvent(DELETE_EVENT, relativePath);
      }
    }
  }
  _emitEvent(type, file, metadata) {
    const key = type + "-" + file;
    const addKey = ADD_EVENT + "-" + file;
    if (type === CHANGE_EVENT && this._changeTimers.has(addKey)) {
      return;
    }
    const existingTimer = this._changeTimers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }
    this._changeTimers.set(
      key,
      setTimeout(() => {
        this._changeTimers.delete(key);
        this._rawEmitEvent(type, file, metadata);
      }, DEBOUNCE_MS)
    );
  }
  _rawEmitEvent(eventType, file, metadata) {
    this.emit(eventType, file, this.root, metadata);
    this.emit(ALL_EVENT, eventType, file, this.root, metadata);
  }
  getPauseReason() {
    return null;
  }
};
function isIgnorableFileError(error) {
  return (
    error.code === "ENOENT" || (error.code === "EPERM" && platform === "win32")
  );
}
