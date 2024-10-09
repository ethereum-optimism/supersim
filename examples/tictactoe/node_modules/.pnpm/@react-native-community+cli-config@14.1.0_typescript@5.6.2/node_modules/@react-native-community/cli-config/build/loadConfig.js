"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _findDependencies = _interopRequireDefault(require("./findDependencies"));
var _resolveReactNativePath = _interopRequireDefault(require("./resolveReactNativePath"));
var _readConfigFromDisk = require("./readConfigFromDisk");
var _assign = _interopRequireDefault(require("./assign"));
var _merge = _interopRequireDefault(require("./merge"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getDependencyConfig(root, dependencyName, finalConfig, config, userConfig) {
  return (0, _merge.default)({
    root,
    name: dependencyName,
    platforms: Object.keys(finalConfig.platforms).reduce((dependency, platform) => {
      var _config$dependency$pl;
      const platformConfig = finalConfig.platforms[platform];
      dependency[platform] =
      // Linking platforms is not supported
      Object.keys(config.platforms).length > 0 || !platformConfig ? null : platformConfig.dependencyConfig(root, (_config$dependency$pl = config.dependency.platforms) === null || _config$dependency$pl === void 0 ? void 0 : _config$dependency$pl[platform]);
      return dependency;
    }, {})
  }, userConfig.dependencies[dependencyName] || {});
}

// Try our best to figure out what version of React Native we're running. This is
// currently being used to get our deeplinks working, so it's only worried with
// the major and minor version.
function getReactNativeVersion(reactNativePath) {
  try {
    let semver = _cliTools().version.current(reactNativePath);
    if (semver) {
      // Retain only these version, since they correspond with our documentation.
      return `${semver.major}.${semver.minor}`;
    }
  } catch (e) {
    // If we don't seem to be in a well formed project, give up quietly.
    if (!(e instanceof _cliTools().UnknownProjectError)) {
      throw e;
    }
  }
  return 'unknown';
}
const removeDuplicateCommands = commands => {
  const uniqueCommandsMap = new Map();
  commands.forEach(command => {
    uniqueCommandsMap.set(command.name, command);
  });
  return Array.from(uniqueCommandsMap.values());
};

/**
 * Loads CLI configuration
 */
function loadConfig({
  projectRoot = (0, _cliTools().findProjectRoot)(),
  selectedPlatform
}) {
  let lazyProject;
  const userConfig = (0, _readConfigFromDisk.readConfigFromDisk)(projectRoot);
  const initialConfig = {
    root: projectRoot,
    get reactNativePath() {
      return userConfig.reactNativePath ? _path().default.resolve(projectRoot, userConfig.reactNativePath) : (0, _resolveReactNativePath.default)(projectRoot);
    },
    get reactNativeVersion() {
      return getReactNativeVersion(initialConfig.reactNativePath);
    },
    dependencies: userConfig.dependencies,
    commands: userConfig.commands,
    healthChecks: userConfig.healthChecks || [],
    platforms: userConfig.platforms,
    assets: userConfig.assets,
    get project() {
      if (lazyProject) {
        return lazyProject;
      }
      lazyProject = {};
      for (const platform in finalConfig.platforms) {
        const platformConfig = finalConfig.platforms[platform];
        if (platformConfig) {
          lazyProject[platform] = platformConfig.projectConfig(projectRoot, userConfig.project[platform] || {});
        }
      }
      return lazyProject;
    }
  };
  const finalConfig = Array.from(new Set([...Object.keys(userConfig.dependencies), ...(0, _findDependencies.default)(projectRoot)])).reduce((acc, dependencyName) => {
    const localDependencyRoot = userConfig.dependencies[dependencyName] && userConfig.dependencies[dependencyName].root;
    try {
      let root = localDependencyRoot || (0, _cliTools().resolveNodeModuleDir)(projectRoot, dependencyName);
      let config = (0, _readConfigFromDisk.readDependencyConfigFromDisk)(root, dependencyName);
      return (0, _assign.default)({}, acc, {
        dependencies: (0, _assign.default)({}, acc.dependencies, {
          get [dependencyName]() {
            return getDependencyConfig(root, dependencyName, finalConfig, config, userConfig);
          }
        }),
        commands: removeDuplicateCommands([...config.commands, ...acc.commands]),
        platforms: {
          ...acc.platforms,
          ...(selectedPlatform && config.platforms[selectedPlatform] ? {
            [selectedPlatform]: config.platforms[selectedPlatform]
          } : config.platforms)
        },
        healthChecks: [...acc.healthChecks, ...config.healthChecks]
      });
    } catch {
      return acc;
    }
  }, initialConfig);
  return finalConfig;
}
var _default = loadConfig;
exports.default = _default;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-config/build/loadConfig.js.map