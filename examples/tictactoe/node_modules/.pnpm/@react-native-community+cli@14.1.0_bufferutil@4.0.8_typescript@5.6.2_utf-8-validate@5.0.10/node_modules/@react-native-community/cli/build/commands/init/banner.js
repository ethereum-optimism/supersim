"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = banner;
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const reactLogoArray = ['                                                          ', '               ######                ######               ', '             ###     ####        ####     ###             ', '            ##          ###    ###          ##            ', '            ##             ####             ##            ', '            ##             ####             ##            ', '            ##           ##    ##           ##            ', '            ##         ###      ###         ##            ', '             ##  ########################  ##             ', '          ######    ###            ###    ######          ', '      ###     ##    ##              ##    ##     ###      ', '   ###         ## ###      ####      ### ##         ###   ', '  ##           ####      ########      ####           ##  ', ' ##             ###     ##########     ###             ## ', '  ##           ####      ########      ####           ##  ', '   ###         ## ###      ####      ### ##         ###   ', '      ###     ##    ##              ##    ##     ###      ', '          ######    ###            ###    ######          ', '             ##  ########################  ##             ', '            ##         ###      ###         ##            ', '            ##           ##    ##           ##            ', '            ##             ####             ##            ', '            ##             ####             ##            ', '            ##          ###    ###          ##            ', '             ###     ####        ####     ###             ', '               ######                ######               ', '                                                          '];
const getWelcomeMessage = (reactNativeVersion = '') => {
  if (reactNativeVersion) {
    return `              Welcome to React Native ${reactNativeVersion}!                `;
  }
  return '                  Welcome to React Native!                ';
};
const learnOnceMessage = '                 Learn once, write anywhere               ';
function banner(reactNativeVersion) {
  return `${_chalk().default.cyan(reactLogoArray.join('\n'))}

${_chalk().default.cyanBright.bold(getWelcomeMessage(reactNativeVersion))}
${_chalk().default.dim(learnOnceMessage)}
`;
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli/build/commands/init/banner.js.map