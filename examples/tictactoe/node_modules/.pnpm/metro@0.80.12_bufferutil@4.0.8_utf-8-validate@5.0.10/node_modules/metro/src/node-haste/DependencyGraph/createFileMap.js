"use strict";

var _metroFileMap = _interopRequireWildcard(require("metro-file-map"));
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
const ci = require("ci-info");
function getIgnorePattern(config) {
  const { blockList, blacklistRE } = config.resolver;
  const ignorePattern = blacklistRE || blockList;
  if (!ignorePattern) {
    return / ^/;
  }
  const combine = (regexes) =>
    new RegExp(
      regexes
        .map((regex, index) => {
          if (regex.flags !== regexes[0].flags) {
            throw new Error(
              "Cannot combine blockList patterns, because they have different flags:\n" +
                " - Pattern 0: " +
                regexes[0].toString() +
                "\n" +
                ` - Pattern ${index}: ` +
                regexes[index].toString()
            );
          }
          return "(" + regex.source + ")";
        })
        .join("|"),
      regexes[0]?.flags ?? ""
    );
  if (Array.isArray(ignorePattern)) {
    return combine(ignorePattern);
  }
  return ignorePattern;
}
function createFileMap(config, options) {
  const dependencyExtractor =
    options?.extractDependencies === false
      ? null
      : config.resolver.dependencyExtractor;
  const computeDependencies = dependencyExtractor != null;
  return _metroFileMap.default.create({
    cacheManagerFactory:
      config?.unstable_fileMapCacheManagerFactory ??
      ((buildParameters) =>
        new _metroFileMap.DiskCacheManager({
          buildParameters,
          cacheDirectory:
            config.fileMapCacheDirectory ?? config.hasteMapCacheDirectory,
          cacheFilePrefix: options?.cacheFilePrefix,
        })),
    perfLoggerFactory: config.unstable_perfLoggerFactory,
    computeDependencies,
    computeSha1: true,
    dependencyExtractor: config.resolver.dependencyExtractor,
    enableHastePackages: config?.resolver.enableGlobalPackages,
    enableSymlinks: config.resolver.unstable_enableSymlinks,
    enableWorkerThreads: config.watcher.unstable_workerThreads,
    extensions: Array.from(
      new Set([
        ...config.resolver.sourceExts,
        ...config.resolver.assetExts,
        ...config.watcher.additionalExts,
      ])
    ),
    forceNodeFilesystemAPI: !config.resolver.useWatchman,
    hasteImplModulePath: config.resolver.hasteImplModulePath,
    healthCheck: config.watcher.healthCheck,
    ignorePattern: getIgnorePattern(config),
    maxWorkers: config.maxWorkers,
    mocksPattern: "",
    platforms: [
      ...config.resolver.platforms,
      _metroFileMap.default.H.NATIVE_PLATFORM,
    ],
    retainAllFiles: true,
    resetCache: config.resetCache,
    rootDir: config.projectRoot,
    roots: config.watchFolders,
    throwOnModuleCollision: options?.throwOnModuleCollision ?? true,
    useWatchman: config.resolver.useWatchman,
    watch: options?.watch == null ? !ci.isCI : options.watch,
    watchmanDeferStates: config.watcher.watchman.deferStates,
  });
}
module.exports = createFileMap;
