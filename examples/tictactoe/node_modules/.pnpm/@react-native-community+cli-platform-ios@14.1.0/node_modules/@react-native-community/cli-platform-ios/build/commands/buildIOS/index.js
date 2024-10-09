"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _cliPlatformApple() {
  const data = require("@react-native-community/cli-platform-apple");
  _cliPlatformApple = function () {
    return data;
  };
  return data;
}
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var _default = {
  name: 'build-ios',
  description: 'builds your app for iOS platform',
  func: (0, _cliPlatformApple().createBuild)({
    platformName: 'ios'
  }),
  examples: [{
    desc: 'Build the app for all iOS devices in Release mode',
    cmd: 'npx react-native build-ios --mode "Release"'
  }],
  options: (0, _cliPlatformApple().getBuildOptions)({
    platformName: 'ios'
  })
};
exports.default = _default;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-ios/build/commands/buildIOS/index.js.map