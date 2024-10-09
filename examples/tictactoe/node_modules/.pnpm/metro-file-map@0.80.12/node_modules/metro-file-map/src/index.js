"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "DiskCacheManager", {
  enumerable: true,
  get: function () {
    return _DiskCacheManager.DiskCacheManager;
  },
});
Object.defineProperty(exports, "DuplicateHasteCandidatesError", {
  enumerable: true,
  get: function () {
    return _DuplicateHasteCandidatesError.DuplicateHasteCandidatesError;
  },
});
Object.defineProperty(exports, "MutableHasteMap", {
  enumerable: true,
  get: function () {
    return _MutableHasteMap.default;
  },
});
exports.default = void 0;
var _DiskCacheManager = require("./cache/DiskCacheManager");
var _constants = _interopRequireDefault(require("./constants"));
var _getMockName = _interopRequireDefault(require("./getMockName"));
var _checkWatchmanCapabilities = _interopRequireDefault(
  require("./lib/checkWatchmanCapabilities")
);
var _DuplicateError = require("./lib/DuplicateError");
var _MockMap = _interopRequireDefault(require("./lib/MockMap"));
var _MutableHasteMap = _interopRequireDefault(require("./lib/MutableHasteMap"));
var _normalizePathSeparatorsToSystem = _interopRequireDefault(
  require("./lib/normalizePathSeparatorsToSystem")
);
var _RootPathUtils = require("./lib/RootPathUtils");
var _TreeFS = _interopRequireDefault(require("./lib/TreeFS"));
var _Watcher = require("./Watcher");
var _worker = require("./worker");
var _events = _interopRequireDefault(require("events"));
var _invariant = _interopRequireDefault(require("invariant"));
var _jestWorker = require("jest-worker");
var _nodeAbortController = require("node-abort-controller");
var _nullthrows = _interopRequireDefault(require("nullthrows"));
var path = _interopRequireWildcard(require("path"));
var _perf_hooks = require("perf_hooks");
var _DuplicateHasteCandidatesError = require("./lib/DuplicateHasteCandidatesError");
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
const debug = require("debug")("Metro:FileMap");
const CACHE_BREAKER = "7";
const CHANGE_INTERVAL = 30;
const YIELD_EVERY_NUM_HASTE_FILES = 10000;
const NODE_MODULES = path.sep + "node_modules" + path.sep;
const PACKAGE_JSON = path.sep + "package.json";
const VCS_DIRECTORIES = /[/\\]\.(git|hg)[/\\]/.source;
const WATCHMAN_REQUIRED_CAPABILITIES = [
  "field-content.sha1hex",
  "relative_root",
  "suffix-set",
  "wildmatch",
];
class FileMap extends _events.default {
  static create(options) {
    return new FileMap(options);
  }
  constructor(options) {
    super();
    if (options.perfLoggerFactory) {
      this._startupPerfLogger =
        options.perfLoggerFactory?.("START_UP").subSpan("fileMap") ?? null;
      this._startupPerfLogger?.point("constructor_start");
    }
    let ignorePattern;
    if (options.ignorePattern) {
      const inputIgnorePattern = options.ignorePattern;
      if (inputIgnorePattern instanceof RegExp) {
        ignorePattern = new RegExp(
          inputIgnorePattern.source.concat("|" + VCS_DIRECTORIES),
          inputIgnorePattern.flags
        );
      } else {
        throw new Error(
          "metro-file-map: the `ignorePattern` option must be a RegExp"
        );
      }
    } else {
      ignorePattern = new RegExp(VCS_DIRECTORIES);
    }
    const buildParameters = {
      computeDependencies:
        options.computeDependencies == null
          ? true
          : options.computeDependencies,
      computeSha1: options.computeSha1 || false,
      dependencyExtractor: options.dependencyExtractor ?? null,
      enableHastePackages: options.enableHastePackages ?? true,
      enableSymlinks: options.enableSymlinks || false,
      extensions: options.extensions,
      forceNodeFilesystemAPI: !!options.forceNodeFilesystemAPI,
      hasteImplModulePath: options.hasteImplModulePath,
      ignorePattern,
      mocksPattern:
        options.mocksPattern != null && options.mocksPattern !== ""
          ? new RegExp(options.mocksPattern)
          : null,
      platforms: options.platforms,
      retainAllFiles: options.retainAllFiles,
      rootDir: options.rootDir,
      roots: Array.from(new Set(options.roots)),
      skipPackageJson: !!options.skipPackageJson,
      cacheBreaker: CACHE_BREAKER,
    };
    this._options = {
      ...buildParameters,
      enableWorkerThreads: options.enableWorkerThreads ?? false,
      healthCheck: options.healthCheck,
      maxWorkers: options.maxWorkers,
      perfLoggerFactory: options.perfLoggerFactory,
      resetCache: options.resetCache,
      throwOnModuleCollision: !!options.throwOnModuleCollision,
      useWatchman: options.useWatchman == null ? true : options.useWatchman,
      watch: !!options.watch,
      watchmanDeferStates: options.watchmanDeferStates ?? [],
    };
    this._console = options.console || global.console;
    this._cacheManager = options.cacheManagerFactory
      ? options.cacheManagerFactory.call(null, buildParameters)
      : new _DiskCacheManager.DiskCacheManager({
          buildParameters,
        });
    this._buildPromise = null;
    this._pathUtils = new _RootPathUtils.RootPathUtils(options.rootDir);
    this._worker = null;
    this._startupPerfLogger?.point("constructor_end");
    this._crawlerAbortController = new _nodeAbortController.AbortController();
    this._changeID = 0;
  }
  build() {
    this._startupPerfLogger?.point("build_start");
    if (!this._buildPromise) {
      this._buildPromise = (async () => {
        let initialData;
        if (this._options.resetCache !== true) {
          initialData = await this.read();
        }
        if (!initialData) {
          debug("Not using a cache");
        } else {
          debug("Cache loaded (%d clock(s))", initialData.clocks.size);
        }
        const rootDir = this._options.rootDir;
        this._startupPerfLogger?.point("constructFileSystem_start");
        const fileSystem =
          initialData != null
            ? _TreeFS.default.fromDeserializedSnapshot({
                rootDir,
                fileSystemData: initialData.fileSystemData,
              })
            : new _TreeFS.default({
                rootDir,
              });
        this._startupPerfLogger?.point("constructFileSystem_end");
        const mocks = initialData?.mocks ?? new Map();
        const [fileDelta, hasteMap] = await Promise.all([
          this._buildFileDelta({
            fileSystem,
            clocks: initialData?.clocks ?? new Map(),
          }),
          this._constructHasteMap(fileSystem),
        ]);
        await this._applyFileDelta(fileSystem, hasteMap, mocks, fileDelta);
        await this._takeSnapshotAndPersist(
          fileSystem,
          fileDelta.clocks ?? new Map(),
          hasteMap,
          mocks,
          fileDelta.changedFiles,
          fileDelta.removedFiles
        );
        debug(
          "Finished mapping files (%d changes, %d removed).",
          fileDelta.changedFiles.size,
          fileDelta.removedFiles.size
        );
        await this._watch(fileSystem, hasteMap, mocks);
        return {
          fileSystem,
          hasteMap,
          mockMap: new _MockMap.default({
            rootDir,
            rawMockMap: mocks,
          }),
        };
      })();
    }
    return this._buildPromise.then((result) => {
      this._startupPerfLogger?.point("build_end");
      return result;
    });
  }
  async _constructHasteMap(fileSystem) {
    this._startupPerfLogger?.point("constructHasteMap_start");
    const hasteMap = new _MutableHasteMap.default({
      console: this._console,
      platforms: new Set(this._options.platforms),
      rootDir: this._options.rootDir,
      throwOnModuleCollision: this._options.throwOnModuleCollision,
    });
    let hasteFiles = 0;
    for (const {
      baseName,
      canonicalPath,
      metadata,
    } of fileSystem.metadataIterator({
      includeNodeModules: false,
      includeSymlinks: false,
    })) {
      if (metadata[_constants.default.ID]) {
        hasteMap.setModule(metadata[_constants.default.ID], [
          canonicalPath,
          baseName === "package.json"
            ? _constants.default.PACKAGE
            : _constants.default.MODULE,
        ]);
        if (++hasteFiles % YIELD_EVERY_NUM_HASTE_FILES === 0) {
          await new Promise(setImmediate);
        }
      }
    }
    this._startupPerfLogger?.annotate({
      int: {
        hasteFiles,
      },
    });
    this._startupPerfLogger?.point("constructHasteMap_end");
    return hasteMap;
  }
  async read() {
    let data;
    this._startupPerfLogger?.point("read_start");
    try {
      data = await this._cacheManager.read();
    } catch (e) {
      this._console.warn(
        "Error while reading cache, falling back to a full crawl:\n",
        e
      );
      this._startupPerfLogger?.annotate({
        string: {
          cacheReadError: e.toString(),
        },
      });
    }
    this._startupPerfLogger?.point("read_end");
    return data;
  }
  async _buildFileDelta(previousState) {
    this._startupPerfLogger?.point("buildFileDelta_start");
    const {
      computeSha1,
      enableSymlinks,
      extensions,
      forceNodeFilesystemAPI,
      ignorePattern,
      roots,
      rootDir,
      watch,
      watchmanDeferStates,
    } = this._options;
    this._watcher = new _Watcher.Watcher({
      abortSignal: this._crawlerAbortController.signal,
      computeSha1,
      console: this._console,
      enableSymlinks,
      extensions,
      forceNodeFilesystemAPI,
      healthCheckFilePrefix: this._options.healthCheck.filePrefix,
      ignore: (path) => this._ignore(path),
      ignorePattern,
      perfLogger: this._startupPerfLogger,
      previousState,
      roots,
      rootDir,
      useWatchman: await this._shouldUseWatchman(),
      watch,
      watchmanDeferStates,
    });
    const watcher = this._watcher;
    watcher.on("status", (status) => this.emit("status", status));
    return watcher.crawl().then((result) => {
      this._startupPerfLogger?.point("buildFileDelta_end");
      return result;
    });
  }
  _processFile(hasteMap, mockMap, filePath, fileMetadata, workerOptions) {
    const rootDir = this._options.rootDir;
    const relativeFilePath = this._pathUtils.absoluteToNormal(filePath);
    const isSymlink = fileMetadata[_constants.default.SYMLINK] !== 0;
    const computeSha1 =
      this._options.computeSha1 &&
      !isSymlink &&
      fileMetadata[_constants.default.SHA1] == null;
    const readLink =
      this._options.enableSymlinks &&
      isSymlink &&
      typeof fileMetadata[_constants.default.SYMLINK] !== "string";
    const workerReply = (metadata) => {
      fileMetadata[_constants.default.VISITED] = 1;
      const metadataId = metadata.id;
      const metadataModule = metadata.module;
      if (metadataId != null && metadataModule) {
        fileMetadata[_constants.default.ID] = metadataId;
        hasteMap.setModule(metadataId, metadataModule);
      }
      fileMetadata[_constants.default.DEPENDENCIES] = metadata.dependencies
        ? metadata.dependencies.join(_constants.default.DEPENDENCY_DELIM)
        : "";
      if (computeSha1) {
        fileMetadata[_constants.default.SHA1] = metadata.sha1;
      }
      if (metadata.symlinkTarget != null) {
        fileMetadata[_constants.default.SYMLINK] = metadata.symlinkTarget;
      }
    };
    const workerError = (error) => {
      if (
        error == null ||
        typeof error !== "object" ||
        error.message == null ||
        error.stack == null
      ) {
        error = new Error(error);
        error.stack = "";
      }
      throw error;
    };
    if (this._options.retainAllFiles && filePath.includes(NODE_MODULES)) {
      if (computeSha1 || readLink) {
        return this._getWorker(workerOptions)
          .worker({
            computeDependencies: false,
            computeSha1,
            dependencyExtractor: null,
            enableHastePackages: false,
            filePath,
            hasteImplModulePath: null,
            readLink,
            rootDir,
          })
          .then(workerReply, workerError);
      }
      return null;
    }
    if (isSymlink) {
      if (readLink) {
        return this._getWorker({
          forceInBand: true,
        })
          .worker({
            computeDependencies: false,
            computeSha1: false,
            dependencyExtractor: null,
            enableHastePackages: false,
            filePath,
            hasteImplModulePath: null,
            readLink,
            rootDir,
          })
          .then(workerReply, workerError);
      }
      return null;
    }
    if (
      this._options.mocksPattern &&
      this._options.mocksPattern.test(filePath)
    ) {
      const mockPath = (0, _getMockName.default)(filePath);
      const existingMockPath = mockMap.get(mockPath);
      if (existingMockPath != null) {
        const secondMockPath = this._pathUtils.absoluteToNormal(filePath);
        if (existingMockPath !== secondMockPath) {
          const method = this._options.throwOnModuleCollision
            ? "error"
            : "warn";
          this._console[method](
            [
              "metro-file-map: duplicate manual mock found: " + mockPath,
              "  The following files share their name; please delete one of them:",
              "    * <rootDir>" + path.sep + existingMockPath,
              "    * <rootDir>" + path.sep + secondMockPath,
              "",
            ].join("\n")
          );
          if (this._options.throwOnModuleCollision) {
            throw new _DuplicateError.DuplicateError(
              existingMockPath,
              secondMockPath
            );
          }
        }
      }
      mockMap.set(mockPath, relativeFilePath);
    }
    return this._getWorker(workerOptions)
      .worker({
        computeDependencies: this._options.computeDependencies,
        computeSha1,
        dependencyExtractor: this._options.dependencyExtractor,
        enableHastePackages: this._options.enableHastePackages,
        filePath,
        hasteImplModulePath: this._options.hasteImplModulePath,
        readLink: false,
        rootDir,
      })
      .then(workerReply, workerError);
  }
  async _applyFileDelta(fileSystem, hasteMap, mockMap, delta) {
    this._startupPerfLogger?.point("applyFileDelta_start");
    const { changedFiles, removedFiles } = delta;
    this._startupPerfLogger?.point("applyFileDelta_preprocess_start");
    const promises = [];
    const missingFiles = new Set();
    this._startupPerfLogger?.point("applyFileDelta_remove_start");
    for (const relativeFilePath of removedFiles) {
      this._removeIfExists(fileSystem, hasteMap, mockMap, relativeFilePath);
    }
    this._startupPerfLogger?.point("applyFileDelta_remove_end");
    for (const [relativeFilePath, fileData] of changedFiles) {
      if (fileData[_constants.default.VISITED] === 1) {
        continue;
      }
      if (
        this._options.skipPackageJson &&
        relativeFilePath.endsWith(PACKAGE_JSON)
      ) {
        continue;
      }
      const filePath = this._pathUtils.normalToAbsolute(relativeFilePath);
      const maybePromise = this._processFile(
        hasteMap,
        mockMap,
        filePath,
        fileData,
        {
          perfLogger: this._startupPerfLogger,
        }
      );
      if (maybePromise) {
        promises.push(
          maybePromise.catch((e) => {
            if (["ENOENT", "EACCESS"].includes(e.code)) {
              missingFiles.add(relativeFilePath);
            } else {
              throw e;
            }
          })
        );
      }
    }
    this._startupPerfLogger?.point("applyFileDelta_preprocess_end");
    debug("Visiting %d added/modified files.", promises.length);
    this._startupPerfLogger?.point("applyFileDelta_process_start");
    try {
      await Promise.all(promises);
    } finally {
      this._cleanup();
    }
    this._startupPerfLogger?.point("applyFileDelta_process_end");
    this._startupPerfLogger?.point("applyFileDelta_add_start");
    for (const relativeFilePath of missingFiles) {
      changedFiles.delete(relativeFilePath);
      this._removeIfExists(fileSystem, hasteMap, mockMap, relativeFilePath);
    }
    fileSystem.bulkAddOrModify(changedFiles);
    this._startupPerfLogger?.point("applyFileDelta_add_end");
    this._startupPerfLogger?.point("applyFileDelta_end");
  }
  _cleanup() {
    const worker = this._worker;
    if (worker && typeof worker.end === "function") {
      worker.end();
    }
    this._worker = null;
  }
  async _takeSnapshotAndPersist(
    fileSystem,
    clocks,
    hasteMap,
    mockMap,
    changed,
    removed
  ) {
    this._startupPerfLogger?.point("persist_start");
    await this._cacheManager.write(
      {
        fileSystemData: fileSystem.getSerializableSnapshot(),
        clocks: new Map(clocks),
        mocks: new Map(mockMap),
      },
      {
        changed,
        removed,
      }
    );
    this._startupPerfLogger?.point("persist_end");
  }
  _getWorker(options) {
    if (!this._worker) {
      const { forceInBand, perfLogger } = options ?? {};
      if (forceInBand === true || this._options.maxWorkers <= 1) {
        this._worker = {
          worker: _worker.worker,
        };
      } else {
        const workerPath = require.resolve("./worker");
        perfLogger?.point("initWorkers_start");
        this._worker = new _jestWorker.Worker(workerPath, {
          exposedMethods: ["worker"],
          maxRetries: 3,
          numWorkers: this._options.maxWorkers,
          enableWorkerThreads: this._options.enableWorkerThreads,
          forkOptions: {
            execArgv: [],
          },
        });
        perfLogger?.point("initWorkers_end");
      }
    }
    return (0, _nullthrows.default)(this._worker);
  }
  _removeIfExists(fileSystem, hasteMap, mockMap, relativeFilePath) {
    const fileMetadata = fileSystem.remove(relativeFilePath);
    if (fileMetadata == null) {
      return;
    }
    const moduleName = fileMetadata[_constants.default.ID] || null;
    if (moduleName == null) {
      return;
    }
    hasteMap.removeModule(moduleName, relativeFilePath);
    if (this._options.mocksPattern) {
      const absoluteFilePath = path.join(
        this._options.rootDir,
        (0, _normalizePathSeparatorsToSystem.default)(relativeFilePath)
      );
      if (
        this._options.mocksPattern &&
        this._options.mocksPattern.test(absoluteFilePath)
      ) {
        const mockName = (0, _getMockName.default)(absoluteFilePath);
        mockMap.delete(mockName);
      }
    }
  }
  async _watch(fileSystem, hasteMap, mockMap) {
    this._startupPerfLogger?.point("watch_start");
    if (!this._options.watch) {
      this._startupPerfLogger?.point("watch_end");
      return;
    }
    this._options.throwOnModuleCollision = false;
    this._options.retainAllFiles = true;
    const hasWatchedExtension = (filePath) =>
      this._options.extensions.some((ext) => filePath.endsWith(ext));
    let changeQueue = Promise.resolve();
    let nextEmit = null;
    const emitChange = () => {
      if (nextEmit == null || nextEmit.eventsQueue.length === 0) {
        return;
      }
      const { eventsQueue, firstEventTimestamp, firstEnqueuedTimestamp } =
        nextEmit;
      const hmrPerfLogger = this._options.perfLoggerFactory?.("HMR", {
        key: this._getNextChangeID(),
      });
      if (hmrPerfLogger != null) {
        hmrPerfLogger.start({
          timestamp: firstEventTimestamp,
        });
        hmrPerfLogger.point("waitingForChangeInterval_start", {
          timestamp: firstEnqueuedTimestamp,
        });
        hmrPerfLogger.point("waitingForChangeInterval_end");
        hmrPerfLogger.annotate({
          int: {
            eventsQueueLength: eventsQueue.length,
          },
        });
        hmrPerfLogger.point("fileChange_start");
      }
      const changeEvent = {
        logger: hmrPerfLogger,
        eventsQueue,
      };
      this.emit("change", changeEvent);
      nextEmit = null;
    };
    const onChange = (type, filePath, root, metadata) => {
      if (
        metadata &&
        (metadata.type === "d" ||
          (metadata.type === "f" && !hasWatchedExtension(filePath)) ||
          (!this._options.enableSymlinks && metadata?.type === "l"))
      ) {
        return;
      }
      const absoluteFilePath = path.join(
        root,
        (0, _normalizePathSeparatorsToSystem.default)(filePath)
      );
      if (this._options.ignorePattern.test(absoluteFilePath)) {
        return;
      }
      const relativeFilePath =
        this._pathUtils.absoluteToNormal(absoluteFilePath);
      const linkStats = fileSystem.linkStats(relativeFilePath);
      if (
        type === "change" &&
        linkStats != null &&
        metadata &&
        metadata.modifiedTime != null &&
        linkStats.modifiedTime === metadata.modifiedTime
      ) {
        return;
      }
      const onChangeStartTime =
        _perf_hooks.performance.timeOrigin + _perf_hooks.performance.now();
      changeQueue = changeQueue
        .then(async () => {
          if (
            nextEmit != null &&
            nextEmit.eventsQueue.find(
              (event) =>
                event.type === type &&
                event.filePath === absoluteFilePath &&
                ((!event.metadata && !metadata) ||
                  (event.metadata &&
                    metadata &&
                    event.metadata.modifiedTime != null &&
                    metadata.modifiedTime != null &&
                    event.metadata.modifiedTime === metadata.modifiedTime))
            )
          ) {
            return null;
          }
          const linkStats = fileSystem.linkStats(relativeFilePath);
          const enqueueEvent = (metadata) => {
            const event = {
              filePath: absoluteFilePath,
              metadata,
              type,
            };
            if (nextEmit == null) {
              nextEmit = {
                eventsQueue: [event],
                firstEventTimestamp: onChangeStartTime,
                firstEnqueuedTimestamp:
                  _perf_hooks.performance.timeOrigin +
                  _perf_hooks.performance.now(),
              };
            } else {
              nextEmit.eventsQueue.push(event);
            }
            return null;
          };
          if (linkStats != null) {
            this._removeIfExists(
              fileSystem,
              hasteMap,
              mockMap,
              relativeFilePath
            );
          }
          if (type === "add" || type === "change") {
            (0, _invariant.default)(
              metadata != null && metadata.size != null,
              "since the file exists or changed, it should have metadata"
            );
            const fileMetadata = [
              "",
              metadata.modifiedTime,
              metadata.size,
              0,
              "",
              null,
              metadata.type === "l" ? 1 : 0,
            ];
            try {
              await this._processFile(
                hasteMap,
                mockMap,
                absoluteFilePath,
                fileMetadata,
                {
                  forceInBand: true,
                }
              );
              fileSystem.addOrModify(relativeFilePath, fileMetadata);
              enqueueEvent(metadata);
            } catch (e) {
              if (!["ENOENT", "EACCESS"].includes(e.code)) {
                throw e;
              }
            }
          } else if (type === "delete") {
            if (linkStats == null) {
              return null;
            }
            enqueueEvent({
              modifiedTime: null,
              size: null,
              type: linkStats.fileType,
            });
          } else {
            throw new Error(
              `metro-file-map: Unrecognized event type from watcher: ${type}`
            );
          }
          return null;
        })
        .catch((error) => {
          this._console.error(
            `metro-file-map: watch error:\n  ${error.stack}\n`
          );
        });
    };
    this._changeInterval = setInterval(emitChange, CHANGE_INTERVAL);
    (0, _invariant.default)(
      this._watcher != null,
      "Expected _watcher to have been initialised by build()"
    );
    await this._watcher.watch(onChange);
    if (this._options.healthCheck.enabled) {
      const performHealthCheck = () => {
        if (!this._watcher) {
          return;
        }
        this._watcher
          .checkHealth(this._options.healthCheck.timeout)
          .then((result) => {
            this.emit("healthCheck", result);
          });
      };
      performHealthCheck();
      this._healthCheckInterval = setInterval(
        performHealthCheck,
        this._options.healthCheck.interval
      );
    }
    this._startupPerfLogger?.point("watch_end");
  }
  async end() {
    if (this._changeInterval) {
      clearInterval(this._changeInterval);
    }
    if (this._healthCheckInterval) {
      clearInterval(this._healthCheckInterval);
    }
    this._crawlerAbortController.abort();
    if (!this._watcher) {
      return;
    }
    await this._watcher.close();
  }
  _ignore(filePath) {
    const ignoreMatched = this._options.ignorePattern.test(filePath);
    return (
      ignoreMatched ||
      (!this._options.retainAllFiles && filePath.includes(NODE_MODULES))
    );
  }
  async _shouldUseWatchman() {
    if (!this._options.useWatchman) {
      return false;
    }
    if (!this._canUseWatchmanPromise) {
      this._canUseWatchmanPromise = (0, _checkWatchmanCapabilities.default)(
        WATCHMAN_REQUIRED_CAPABILITIES
      )
        .then(({ version }) => {
          this._startupPerfLogger?.annotate({
            string: {
              watchmanVersion: version,
            },
          });
          return true;
        })
        .catch((e) => {
          this._startupPerfLogger?.annotate({
            string: {
              watchmanFailedCapabilityCheck: e?.message ?? "[missing]",
            },
          });
          return false;
        });
    }
    return this._canUseWatchmanPromise;
  }
  _getNextChangeID() {
    if (this._changeID >= Number.MAX_SAFE_INTEGER) {
      this._changeID = 0;
    }
    return ++this._changeID;
  }
  static H = _constants.default;
}
exports.default = FileMap;
