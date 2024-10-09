"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildProject = buildProject;
function _child_process() {
  const data = _interopRequireDefault(require("child_process"));
  _child_process = function () {
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
var _simulatorDestinationMap = require("./simulatorDestinationMap");
var _supportedPlatforms = require("../../config/supportedPlatforms");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function prettifyXcodebuildMessages(output) {
  const errorRegex = /error\b[^\S\r\n]*[:\-\s]*([^\r\n]*)/gim;
  const errors = new Set();
  let match;
  while ((match = errorRegex.exec(output)) !== null) {
    if (match[1]) {
      // match[1] contains the captured group that excludes any leading colons or spaces
      errors.add(match[1].trim());
    }
  }
  return errors;
}
function buildProject(xcodeProject, platform, udid, mode, scheme, args) {
  return new Promise((resolve, reject) => {
    const simulatorDest = _simulatorDestinationMap.simulatorDestinationMap === null || _simulatorDestinationMap.simulatorDestinationMap === void 0 ? void 0 : _simulatorDestinationMap.simulatorDestinationMap[platform];
    if (!simulatorDest) {
      reject(new (_cliTools().CLIError)(`Unknown platform: ${platform}. Please, use one of: ${Object.values(_supportedPlatforms.supportedPlatforms).join(', ')}.`));
      return;
    }
    const xcodebuildArgs = [xcodeProject.isWorkspace ? '-workspace' : '-project', xcodeProject.name, ...(args.xcconfig ? ['-xcconfig', args.xcconfig] : []), ...(args.buildFolder ? ['-derivedDataPath', args.buildFolder] : []), '-configuration', mode, '-scheme', scheme, '-destination', (udid ? `id=${udid}` : mode === 'Debug' ? `generic/platform=${simulatorDest}` : `generic/platform=${platform}`) + (args.destination ? ',' + args.destination : '')];
    if (args.extraParams) {
      xcodebuildArgs.push(...args.extraParams);
    }
    const loader = (0, _cliTools().getLoader)();
    _cliTools().logger.info(`Building ${_chalk().default.dim(`(using "xcodebuild ${xcodebuildArgs.join(' ')}")`)}`);
    let xcodebuildOutputFormatter;
    if (!args.verbose) {
      if (xcbeautifyAvailable()) {
        xcodebuildOutputFormatter = _child_process().default.spawn('xcbeautify', [], {
          stdio: ['pipe', process.stdout, process.stderr]
        });
      } else if (xcprettyAvailable()) {
        xcodebuildOutputFormatter = _child_process().default.spawn('xcpretty', [], {
          stdio: ['pipe', process.stdout, process.stderr]
        });
      }
    }
    const buildProcess = _child_process().default.spawn('xcodebuild', xcodebuildArgs, getProcessOptions(args));
    let buildOutput = '';
    buildProcess.stdout.on('data', data => {
      const stringData = data.toString();
      buildOutput += stringData;
      if (xcodebuildOutputFormatter) {
        xcodebuildOutputFormatter.stdin.write(data);
      } else {
        if (_cliTools().logger.isVerbose()) {
          _cliTools().logger.debug(stringData);
        } else {
          loader.start(`Building the app${'.'.repeat(buildOutput.length % 10)}`);
        }
      }
    });
    buildProcess.on('close', code => {
      if (xcodebuildOutputFormatter) {
        xcodebuildOutputFormatter.stdin.end();
      } else {
        loader.stop();
      }
      if (code !== 0) {
        (0, _cliTools().printRunDoctorTip)();
        if (!xcodebuildOutputFormatter) {
          Array.from(prettifyXcodebuildMessages(buildOutput)).forEach(error => _cliTools().logger.error(error));
        }
        reject(new (_cliTools().CLIError)(`
        Failed to build ${platform} project.

        "xcodebuild" exited with error code '${code}'. To debug build
        logs further, consider building your app with Xcode.app, by opening
        '${xcodeProject.name}'.`));
        return;
      }
      _cliTools().logger.success('Successfully built the app');
      resolve(buildOutput);
    });
  });
}
function xcbeautifyAvailable() {
  try {
    _child_process().default.execSync('xcbeautify --version', {
      stdio: [0, 'pipe', 'ignore']
    });
  } catch (error) {
    return false;
  }
  return true;
}
function xcprettyAvailable() {
  try {
    _child_process().default.execSync('xcpretty --version', {
      stdio: [0, 'pipe', 'ignore']
    });
  } catch (error) {
    return false;
  }
  return true;
}
function getProcessOptions(args) {
  if ('packager' in args && typeof args.packager === 'boolean' && args.packager) {
    const terminal = 'terminal' in args && typeof args.terminal === 'string' ? args.terminal : '';
    const port = 'port' in args && typeof args.port === 'number' ? String(args.port) : '';
    return {
      env: {
        ...process.env,
        RCT_TERMINAL: terminal,
        RCT_METRO_PORT: port
      }
    };
  }
  return {
    env: process.env
  };
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-apple/build/commands/buildCommand/buildProject.js.map