"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dependencyConfig = dependencyConfig;
exports.projectConfig = projectConfig;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _fs() {
  const data = _interopRequireDefault(require("fs"));
  _fs = function () {
    return data;
  };
  return data;
}
var _findAndroidDir = _interopRequireDefault(require("./findAndroidDir"));
var _findManifest = _interopRequireDefault(require("./findManifest"));
var _findPackageClassName = _interopRequireDefault(require("./findPackageClassName"));
var _getAndroidProject = require("./getAndroidProject");
var _findLibraryName = require("./findLibraryName");
var _findComponentDescriptors = require("./findComponentDescriptors");
var _findBuildGradle = require("./findBuildGradle");
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _getMainActivity = _interopRequireDefault(require("./getMainActivity"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Gets android project config by analyzing given folder and taking some
 * defaults specified by user into consideration
 */
function projectConfig(root, userConfig = {}) {
  const src = userConfig.sourceDir || (0, _findAndroidDir.default)(root);
  if (!src) {
    return null;
  }
  const sourceDir = _path().default.join(root, src);
  const appName = getAppName(sourceDir, userConfig.appName);
  const manifestPath = userConfig.manifestPath ? _path().default.join(sourceDir, userConfig.manifestPath) : (0, _findManifest.default)(_path().default.join(sourceDir, appName));
  const buildGradlePath = (0, _findBuildGradle.findBuildGradle)(sourceDir, false);
  if (!manifestPath && !buildGradlePath) {
    return null;
  }
  const packageName = userConfig.packageName || (0, _getAndroidProject.getPackageName)(manifestPath, buildGradlePath);
  if (!packageName) {
    throw new (_cliTools().CLIError)(`Package name not found in neither ${manifestPath} nor ${buildGradlePath}`);
  }
  const applicationId = buildGradlePath ? getApplicationId(buildGradlePath, packageName) : packageName;
  const mainActivity = (0, _getMainActivity.default)(manifestPath || '') ?? '';

  // @todo remove for RN 0.75
  if (userConfig.unstable_reactLegacyComponentNames) {
    _cliTools().logger.warn('The "project.android.unstable_reactLegacyComponentNames" config option is not necessary anymore for React Native 0.74 and does nothing. Please remove it from the "react-native.config.js" file.');
  }
  return {
    sourceDir,
    appName,
    packageName,
    applicationId,
    mainActivity,
    dependencyConfiguration: userConfig.dependencyConfiguration,
    watchModeCommandParams: userConfig.watchModeCommandParams,
    // @todo remove for RN 0.75
    unstable_reactLegacyComponentNames: undefined,
    assets: userConfig.assets ?? []
  };
}
function getApplicationId(buildGradlePath, packageName) {
  let appId = packageName;
  const applicationId = (0, _getAndroidProject.parseApplicationIdFromBuildGradleFile)(buildGradlePath);
  if (applicationId) {
    appId = applicationId;
  }
  return appId;
}
function getAppName(sourceDir, userConfigAppName) {
  let appName = '';
  if (typeof userConfigAppName === 'string' && _fs().default.existsSync(_path().default.join(sourceDir, userConfigAppName))) {
    appName = userConfigAppName;
  } else if (_fs().default.existsSync(_path().default.join(sourceDir, 'app'))) {
    appName = 'app';
  }
  return appName;
}

/**
 * Same as projectConfigAndroid except it returns
 * different config that applies to packages only
 */
function dependencyConfig(root, userConfig = {}) {
  if (userConfig === null) {
    return null;
  }
  const src = userConfig.sourceDir || (0, _findAndroidDir.default)(root);
  if (!src) {
    return null;
  }
  const sourceDir = _path().default.join(root, src);
  const manifestPath = userConfig.manifestPath ? _path().default.join(sourceDir, userConfig.manifestPath) : (0, _findManifest.default)(sourceDir);
  const buildGradlePath = (0, _findBuildGradle.findBuildGradle)(sourceDir, true);
  const isPureCxxDependency = userConfig.cxxModuleCMakeListsModuleName != null && userConfig.cxxModuleCMakeListsPath != null && userConfig.cxxModuleHeaderName != null && !manifestPath && !buildGradlePath;
  if (!manifestPath && !buildGradlePath && !isPureCxxDependency) {
    return null;
  }
  let packageImportPath = null,
    packageInstance = null;
  if (!isPureCxxDependency) {
    const packageName = userConfig.packageName || (0, _getAndroidProject.getPackageName)(manifestPath, buildGradlePath);
    const packageClassName = (0, _findPackageClassName.default)(sourceDir);

    /**
     * This module has no package to export
     */
    if (!packageClassName) {
      return null;
    }
    packageImportPath = userConfig.packageImportPath || `import ${packageName}.${packageClassName};`;
    packageInstance = userConfig.packageInstance || `new ${packageClassName}()`;
  }
  const buildTypes = userConfig.buildTypes || [];
  const dependencyConfiguration = userConfig.dependencyConfiguration;
  const libraryName = userConfig.libraryName || (0, _findLibraryName.findLibraryName)(root, sourceDir);
  const componentDescriptors = userConfig.componentDescriptors || (0, _findComponentDescriptors.findComponentDescriptors)(root);
  let cmakeListsPath = userConfig.cmakeListsPath ? _path().default.join(sourceDir, userConfig.cmakeListsPath) : _path().default.join(sourceDir, 'build/generated/source/codegen/jni/CMakeLists.txt');
  const cxxModuleCMakeListsModuleName = userConfig.cxxModuleCMakeListsModuleName || null;
  const cxxModuleHeaderName = userConfig.cxxModuleHeaderName || null;
  let cxxModuleCMakeListsPath = userConfig.cxxModuleCMakeListsPath ? _path().default.join(sourceDir, userConfig.cxxModuleCMakeListsPath) : null;
  if (process.platform === 'win32') {
    cmakeListsPath = cmakeListsPath.replace(/\\/g, '/');
    if (cxxModuleCMakeListsPath) {
      cxxModuleCMakeListsPath = cxxModuleCMakeListsPath.replace(/\\/g, '/');
    }
  }
  return {
    sourceDir,
    packageImportPath,
    packageInstance,
    buildTypes,
    dependencyConfiguration,
    libraryName,
    componentDescriptors,
    cmakeListsPath,
    cxxModuleCMakeListsModuleName,
    cxxModuleCMakeListsPath,
    cxxModuleHeaderName,
    isPureCxxDependency
  };
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-android/build/config/index.js.map