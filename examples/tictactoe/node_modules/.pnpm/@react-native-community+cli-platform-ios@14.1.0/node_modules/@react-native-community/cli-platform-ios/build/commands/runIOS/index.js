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
  name: 'run-ios',
  description: 'builds your app and starts it on iOS simulator',
  func: (0, _cliPlatformApple().createRun)({
    platformName: 'ios'
  }),
  examples: [{
    desc: 'Run on a different simulator, e.g. iPhone SE (2nd generation)',
    cmd: 'npx react-native run-ios --simulator "iPhone SE (2nd generation)"'
  }, {
    desc: "Run on a connected device, e.g. Max's iPhone",
    cmd: 'npx react-native run-ios --device "Max\'s iPhone"'
  }, {
    desc: 'Run on the AppleTV simulator',
    cmd: 'npx react-native run-ios --simulator "Apple TV"  --scheme "helloworld-tvOS"'
  }],
  options: (0, _cliPlatformApple().getRunOptions)({
    platformName: 'ios'
  })
};
exports.default = _default;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-ios/build/commands/runIOS/index.js.map