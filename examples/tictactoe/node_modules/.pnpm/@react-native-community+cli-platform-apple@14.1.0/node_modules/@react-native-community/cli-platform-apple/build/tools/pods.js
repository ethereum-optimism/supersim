"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareMd5Hashes = compareMd5Hashes;
exports.default = resolvePods;
exports.dependenciesToString = dependenciesToString;
exports.generateMd5Hash = generateMd5Hash;
exports.getPackageJson = getPackageJson;
exports.getPlatformDependencies = getPlatformDependencies;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));
  _fsExtra = function () {
    return data;
  };
  return data;
}
function _crypto() {
  const data = require("crypto");
  _crypto = function () {
    return data;
  };
  return data;
}
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
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
var _installPods = _interopRequireDefault(require("./installPods"));
var _findPodfilePath = _interopRequireDefault(require("../config/findPodfilePath"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getPackageJson(root) {
  try {
    return require(_path().default.join(root, 'package.json'));
  } catch {
    throw new (_cliTools().CLIError)('No package.json found. Please make sure the file exists in the current folder.');
  }
}
function getPlatformDependencies(dependencies, platformName) {
  return Object.keys(dependencies).filter(dependency => {
    var _dependencies$depende;
    return (_dependencies$depende = dependencies[dependency].platforms) === null || _dependencies$depende === void 0 ? void 0 : _dependencies$depende[platformName];
  }).map(dependency => {
    var _dependencies$depende2;
    return `${dependency}@${((_dependencies$depende2 = dependencies[dependency].platforms) === null || _dependencies$depende2 === void 0 ? void 0 : _dependencies$depende2[platformName]).version}`;
  }).sort();
}
function dependenciesToString(dependencies) {
  return dependencies.join('\n');
}
function generateMd5Hash(text) {
  return (0, _crypto().createHash)('md5').update(text).digest('hex');
}
function compareMd5Hashes(hash1, hash2) {
  return hash1 === hash2;
}
async function install(packageJson, cachedDependenciesHash, currentDependenciesHash, iosFolderPath) {
  const loader = (0, _cliTools().getLoader)('Installing CocoaPods...');
  try {
    await (0, _installPods.default)(loader, {
      skipBundleInstall: !!cachedDependenciesHash,
      iosFolderPath
    });
    _cliTools().cacheManager.set(packageJson.name, 'dependencies', currentDependenciesHash);
    loader.succeed();
  } catch {
    loader.fail();
    throw new (_cliTools().CLIError)(`Something when wrong while installing CocoaPods. Please run ${_chalk().default.bold('pod install')} manually`);
  }
}
async function resolvePods(root, nativeDependencies, platformName, options) {
  const packageJson = getPackageJson(root);
  const podfilePath = (0, _findPodfilePath.default)(root, platformName);
  const platformFolderPath = podfilePath ? podfilePath.slice(0, podfilePath.lastIndexOf('/')) : _path().default.join(root, platformName);
  const podsPath = _path().default.join(platformFolderPath, 'Pods');
  const arePodsInstalled = _fsExtra().default.existsSync(podsPath);
  const platformDependencies = getPlatformDependencies(nativeDependencies, platformName);
  const dependenciesString = dependenciesToString(platformDependencies);
  const currentDependenciesHash = generateMd5Hash(dependenciesString);
  const cachedDependenciesHash = _cliTools().cacheManager.get(packageJson.name, 'dependencies');
  if (options === null || options === void 0 ? void 0 : options.forceInstall) {
    await install(packageJson, cachedDependenciesHash, currentDependenciesHash, platformFolderPath);
  } else if (arePodsInstalled && cachedDependenciesHash === undefined) {
    _cliTools().cacheManager.set(packageJson.name, 'dependencies', currentDependenciesHash);
  } else if (!cachedDependenciesHash || !compareMd5Hashes(currentDependenciesHash, cachedDependenciesHash) || !arePodsInstalled) {
    const loader = (0, _cliTools().getLoader)('Installing CocoaPods...');
    try {
      await (0, _installPods.default)(loader, {
        skipBundleInstall: !!cachedDependenciesHash,
        newArchEnabled: options === null || options === void 0 ? void 0 : options.newArchEnabled,
        iosFolderPath: platformFolderPath
      });
      _cliTools().cacheManager.set(packageJson.name, 'dependencies', currentDependenciesHash);
      loader.succeed();
    } catch {
      loader.fail();
      throw new (_cliTools().CLIError)(`Something when wrong while installing CocoaPods. Please run ${_chalk().default.bold('pod install')} manually`);
    }
  }
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/tools/pods.js.map