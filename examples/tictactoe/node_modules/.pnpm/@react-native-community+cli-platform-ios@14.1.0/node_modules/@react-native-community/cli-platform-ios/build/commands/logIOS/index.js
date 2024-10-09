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
  name: 'log-ios',
  description: 'starts iOS device syslog tail',
  func: (0, _cliPlatformApple().createLog)({
    platformName: 'ios'
  }),
  options: (0, _cliPlatformApple().getLogOptions)({
    platformName: 'ios'
  })
};
exports.default = _default;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-ios/build/commands/logIOS/index.js.map