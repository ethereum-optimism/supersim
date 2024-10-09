"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTemplateUri = createTemplateUri;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _npm = require("../../tools/npm");
function _semver() {
  const data = _interopRequireDefault(require("semver"));
  _semver = function () {
    return data;
  };
  return data;
}
var _constants = require("./constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function createTemplateUri(options, version) {
  if (options.platformName && options.platformName !== 'react-native') {
    _cliTools().logger.debug('User has specified an out-of-tree platform, using it');
    return `${options.platformName}@${version}`;
  }
  if (options.template === _constants.TEMPLATE_PACKAGE_LEGACY_TYPESCRIPT) {
    _cliTools().logger.warn("Ignoring custom template: 'react-native-template-typescript'. Starting from React Native v0.71 TypeScript is used by default.");
    return _constants.TEMPLATE_PACKAGE_LEGACY;
  }
  if (options.template) {
    _cliTools().logger.debug(`Use the user provided --template=${options.template}`);
    return options.template;
  }

  // 0.75.0-nightly-20240618-5df5ed1a8' -> 0.75.0
  // 0.75.0-rc.1 -> 0.75.0
  const simpleVersion = _semver().default.coerce(version) ?? version;

  // Does the react-native@version package *not* have a template embedded. We know that this applies to
  // all version before 0.75. The 1st release candidate is the minimal version that has no template.
  const useLegacyTemplate = _semver().default.lt(simpleVersion, _constants.TEMPLATE_COMMUNITY_REACT_NATIVE_VERSION);
  _cliTools().logger.debug(`[template]: is '${version} (${simpleVersion})' < '${_constants.TEMPLATE_COMMUNITY_REACT_NATIVE_VERSION}' = ` + (useLegacyTemplate ? 'yes, look for template in react-native' : 'no, look for template in @react-native-community/template'));
  if (!useLegacyTemplate) {
    if (/nightly/.test(version)) {
      _cliTools().logger.debug("[template]: you're using a nightly version of react-native");
      // Template nightly versions and react-native@nightly versions don't match (template releases at a much
      // lower cadence). We have to assume the user is running against the latest nightly by pointing to the tag.
      return `${_constants.TEMPLATE_PACKAGE_COMMUNITY}@nightly`;
    }
    const templateVersion = await (0, _npm.getTemplateVersion)(version);
    return `${_constants.TEMPLATE_PACKAGE_COMMUNITY}@${templateVersion}`;
  }
  _cliTools().logger.debug(`Using the legacy template because '${_constants.TEMPLATE_PACKAGE_LEGACY}' still contains a template folder`);
  return `${_constants.TEMPLATE_PACKAGE_LEGACY}@${version}`;
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli/build/commands/init/version.js.map