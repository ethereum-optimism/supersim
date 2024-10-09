"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPackageClassName;
exports.getMainActivityFiles = getMainActivityFiles;
exports.matchClassName = matchClassName;
function _fs() {
  const data = _interopRequireDefault(require("fs"));
  _fs = function () {
    return data;
  };
  return data;
}
function _fastGlob() {
  const data = _interopRequireDefault(require("fast-glob"));
  _fastGlob = function () {
    return data;
  };
  return data;
}
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function getMainActivityFiles(folder, includePackage = true) {
  let patternArray = [];
  if (includePackage) {
    patternArray.push('*Package.java', '*Package.kt');
  } else {
    patternArray.push('*.java', '*.kt');
  }
  return _fastGlob().default.sync(`**/+(${patternArray.join('|')})`, {
    cwd: (0, _cliTools().unixifyPaths)(folder)
  });
}
function getPackageClassName(folder) {
  let files = getMainActivityFiles(folder);
  let packages = getClassNameMatches(files, folder);
  if (packages && packages.length > 0 && Array.isArray(packages[0])) {
    return packages[0][1];
  }

  /*
    When module contains `expo-module.config.json` we return null
    because expo modules follow other practices and don't implement
    ReactPackage/TurboReactPackage directly, so it doesn't make sense
    to scan and read hundreds of files to get package class name.
     Exception is `expo` package itself which contains `expo-module.config.json`
    and implements `ReactPackage/TurboReactPackage`.
     Following logic is done due to performance optimization.
  */

  if (_fs().default.existsSync(_path().default.join(folder, '..', 'expo-module.config.json'))) {
    return null;
  }
  files = getMainActivityFiles(folder, false);
  packages = getClassNameMatches(files, folder);

  // @ts-ignore
  return packages.length ? packages[0][1] : null;
}
function getClassNameMatches(files, folder) {
  return files.map(filePath => _fs().default.readFileSync(_path().default.join(folder, filePath), 'utf8')).map(matchClassName).filter(match => match);
}
function matchClassName(file) {
  const nativeModuleMatch = file.match(/class\s+(\w+[^(\s]*)[\s\w():]*(\s+implements\s+|:)[\s\w():,]*[^{]*ReactPackage/);
  // We first check for implementation of ReactPackage to find native
  // modules and then for subclasses of TurboReactPackage to find turbo modules.
  if (nativeModuleMatch) {
    return nativeModuleMatch;
  } else {
    return file.match(/class\s+(\w+[^(\s]*)[\s\w():]*(\s+extends\s+|:)[\s\w():,]*[^{]*TurboReactPackage/);
  }
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-android/build/config/findPackageClassName.js.map