"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findPodfilePath;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
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
var _findAllPodfilePaths = _interopRequireDefault(require("./findAllPodfilePaths"));
var _supportedPlatforms = require("./supportedPlatforms");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// Regexp matching all test projects
const TEST_PROJECTS = /test|example|sample/i;

// Podfile in the bundle package
const BUNDLE_VENDORED_PODFILE = 'vendor/bundle/ruby';
function findPodfilePath(cwd, platformName) {
  const podfiles = (0, _findAllPodfilePaths.default)(cwd)
  /**
   * Then, we will run a simple test to rule out most example projects,
   * unless they are located in a `platformName` folder
   */.filter(project => {
    if (_path().default.dirname(project) === platformName) {
      // Pick the Podfile in the default project (in the iOS folder)
      return true;
    }
    if (TEST_PROJECTS.test(project)) {
      // Ignore the Podfile in test and example projects
      return false;
    }
    if (project.indexOf(BUNDLE_VENDORED_PODFILE) > -1) {
      // Ignore the podfile shipped with Cocoapods in bundle
      return false;
    }

    // Accept all the others
    return true;
  })
  /**
   * Podfile from `platformName` folder will be picked up as a first one.
   */.sort(project => _path().default.dirname(project) === platformName ? -1 : 1);
  const supportedPlatformsArray = Object.values(_supportedPlatforms.supportedPlatforms);
  const containsUnsupportedPodfiles = podfiles.every(podfile => !supportedPlatformsArray.includes(podfile.split('/')[0]));
  if (podfiles.length > 0) {
    if (podfiles.length > 1 && containsUnsupportedPodfiles) {
      _cliTools().logger.warn((0, _cliTools().inlineString)(`
          Multiple Podfiles were found: ${podfiles}. Choosing ${podfiles[0]} automatically.
          If you would like to select a different one, you can configure it via "project.${platformName}.sourceDir".
          You can learn more about it here: https://github.com/react-native-community/cli/blob/main/docs/configuration.md
        `));
    }
    return _path().default.join(cwd, podfiles[0]);
  }
  return null;
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/config/findPodfilePath.js.map