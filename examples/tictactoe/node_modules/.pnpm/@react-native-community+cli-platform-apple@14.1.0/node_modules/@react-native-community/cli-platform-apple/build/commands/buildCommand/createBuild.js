"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _getArchitecture = _interopRequireDefault(require("../../tools/getArchitecture"));
var _pods = _interopRequireDefault(require("../../tools/pods"));
var _buildProject = require("./buildProject");
var _getConfiguration = require("./getConfiguration");
var _getXcodeProjectAndDir = require("./getXcodeProjectAndDir");
var _supportedPlatforms = require("../../config/supportedPlatforms");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createBuild = ({
  platformName
}) => async (_, ctx, args) => {
  const platformConfig = ctx.project[platformName];
  if (platformConfig === undefined || _supportedPlatforms.supportedPlatforms[platformName] === undefined) {
    throw new (_cliTools().CLIError)(`Unable to find ${platformName} platform config`);
  }
  let installedPods = false;
  if (platformConfig.automaticPodsInstallation || args.forcePods) {
    const isAppRunningNewArchitecture = platformConfig.sourceDir ? await (0, _getArchitecture.default)(platformConfig.sourceDir) : undefined;
    await (0, _pods.default)(ctx.root, ctx.dependencies, platformName, {
      forceInstall: args.forcePods,
      newArchEnabled: isAppRunningNewArchitecture
    });
    installedPods = true;
  }
  let {
    xcodeProject,
    sourceDir
  } = (0, _getXcodeProjectAndDir.getXcodeProjectAndDir)(platformConfig, platformName, installedPods);
  process.chdir(sourceDir);
  const {
    scheme,
    mode
  } = await (0, _getConfiguration.getConfiguration)(xcodeProject, sourceDir, args, platformName);
  return (0, _buildProject.buildProject)(xcodeProject, platformName, undefined, mode, scheme, args);
};
var _default = createBuild;
exports.default = _default;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/buildCommand/createBuild.js.map