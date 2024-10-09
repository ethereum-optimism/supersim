"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _os() {
  const data = _interopRequireDefault(require("os"));
  _os = function () {
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
function _fsExtra() {
  const data = _interopRequireWildcard(require("fs-extra"));
  _fsExtra = function () {
    return data;
  };
  return data;
}
var _validate = require("./validate");
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
    return data;
  };
  return data;
}
var _printRunInstructions = _interopRequireDefault(require("./printRunInstructions"));
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _cliPlatformApple() {
  const data = require("@react-native-community/cli-platform-apple");
  _cliPlatformApple = function () {
    return data;
  };
  return data;
}
var _template = require("./template");
var _editTemplate = require("./editTemplate");
var PackageManager = _interopRequireWildcard(require("../../tools/packageManager"));
var _banner = _interopRequireDefault(require("./banner"));
var _TemplateAndVersionError = _interopRequireDefault(require("./errors/TemplateAndVersionError"));
var _bun = require("../../tools/bun");
var _npm = require("../../tools/npm");
var _yarn = require("../../tools/yarn");
function _crypto() {
  const data = require("crypto");
  _crypto = function () {
    return data;
  };
  return data;
}
var _git = require("./git");
function _semver() {
  const data = _interopRequireDefault(require("semver"));
  _semver = function () {
    return data;
  };
  return data;
}
var _executeCommand = require("../../tools/executeCommand");
var _DirectoryAlreadyExistsError = _interopRequireDefault(require("./errors/DirectoryAlreadyExistsError"));
var _version = require("./version");
var _constants = require("./constants");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DEFAULT_VERSION = 'latest';
// Here we are defining explicit version of Yarn to be used in the new project because in some cases providing `3.x` don't work.
const YARN_VERSION = '3.6.4';
const bumpYarnVersion = async root => {
  try {
    let yarnVersion = _semver().default.parse((0, _yarn.getYarnVersionIfAvailable)());
    if (yarnVersion) {
      // `yarn set` is unsupported until 1.22, however it's a alias (yarnpkg/yarn/pull/7862) calling `policies set-version`.
      let setVersionArgs = ['set', 'version', YARN_VERSION];
      if (yarnVersion.major === 1 && yarnVersion.minor < 22) {
        setVersionArgs = ['policies', 'set-version', YARN_VERSION];
      }
      await (0, _executeCommand.executeCommand)('yarn', setVersionArgs, {
        root,
        silent: !_cliTools().logger.isVerbose()
      });

      // React Native doesn't support PnP, so we need to set nodeLinker to node-modules. Read more here: https://github.com/react-native-community/cli/issues/27#issuecomment-1772626767
      await (0, _executeCommand.executeCommand)('yarn', ['config', 'set', 'nodeLinker', 'node-modules'], {
        root,
        silent: !_cliTools().logger.isVerbose()
      });
    }
  } catch (e) {
    _cliTools().logger.debug(e);
  }
};
function doesDirectoryExist(dir) {
  return _fsExtra().default.existsSync(dir);
}
function getConflictsForDirectory(directory) {
  return (0, _fsExtra().readdirSync)(directory);
}
async function setProjectDirectory(directory, replaceDirectory) {
  const directoryExists = doesDirectoryExist(directory);
  if (replaceDirectory === 'false' && directoryExists) {
    throw new _DirectoryAlreadyExistsError.default(directory);
  }
  let deleteDirectory = false;
  if (replaceDirectory === 'true' && directoryExists) {
    deleteDirectory = true;
  } else if (directoryExists) {
    const conflicts = getConflictsForDirectory(directory);
    if (conflicts.length > 0) {
      let warnMessage = `The directory ${_chalk().default.bold(directory)} contains files that will be overwritten:\n`;
      for (const conflict of conflicts) {
        warnMessage += `   ${conflict}\n`;
      }
      _cliTools().logger.warn(warnMessage);
      const {
        replace
      } = await (0, _cliTools().prompt)({
        type: 'confirm',
        name: 'replace',
        message: 'Do you want to replace existing files?'
      });
      deleteDirectory = replace;
      if (!replace) {
        throw new _DirectoryAlreadyExistsError.default(directory);
      }
    }
  }
  try {
    if (deleteDirectory) {
      _fsExtra().default.removeSync(directory);
    }
    _fsExtra().default.mkdirSync(directory, {
      recursive: true
    });
    process.chdir(directory);
  } catch (error) {
    throw new (_cliTools().CLIError)('Error occurred while trying to create project directory.', error);
  }
  return process.cwd();
}
function getTemplateName(cwd) {
  // We use package manager to infer the name of the template module for us.
  // That's why we get it from temporary package.json, where the name is the
  // first and only dependency (hence 0).
  const name = Object.keys(JSON.parse(_fsExtra().default.readFileSync(_path().default.join(cwd, './package.json'), 'utf8')).dependencies)[0];
  return name;
}

//set cache to empty string to prevent installing cocoapods on freshly created project
function setEmptyHashForCachedDependencies(projectName) {
  _cliTools().cacheManager.set(projectName, 'dependencies', (0, _crypto().createHash)('md5').update('').digest('hex'));
}
async function createFromTemplate({
  projectName,
  shouldBumpYarnVersion,
  templateUri,
  npm,
  pm,
  directory,
  projectTitle,
  skipInstall,
  packageName,
  installCocoaPods,
  replaceDirectory,
  yarnConfigOptions,
  version
}) {
  _cliTools().logger.debug('Initializing new project');
  // Only print out the banner if we're not in a CI
  if (!process.env.CI) {
    _cliTools().logger.log((0, _banner.default)(version !== DEFAULT_VERSION ? version : undefined));
  }
  let didInstallPods = String(installCocoaPods) === 'true';
  let packageManager = pm;
  if (pm) {
    packageManager = pm;
  } else {
    const userAgentPM = userAgentPackageManager();
    // if possible, use the package manager from the user agent. Otherwise fallback to default (yarn)
    packageManager = userAgentPM || 'yarn';
  }
  if (npm) {
    _cliTools().logger.warn('Flag --npm is deprecated and will be removed soon. In the future, please use --pm npm instead.');
    packageManager = 'npm';
  }

  // if the project with the name already has cache, remove the cache to avoid problems with pods installation
  _cliTools().cacheManager.removeProjectCache(projectName);
  const projectDirectory = await setProjectDirectory(directory, String(replaceDirectory));
  const loader = (0, _cliTools().getLoader)({
    text: 'Downloading template'
  });
  const templateSourceDir = _fsExtra().default.mkdtempSync(_path().default.join(_os().default.tmpdir(), 'rncli-init-template-'));
  try {
    loader.start();
    await (0, _template.installTemplatePackage)(templateUri, templateSourceDir, packageManager, yarnConfigOptions);
    loader.succeed();
    loader.start('Copying template');
    const templateName = getTemplateName(templateSourceDir);
    const templateConfig = (0, _template.getTemplateConfig)(templateName, templateSourceDir);
    await (0, _template.copyTemplate)(templateName, templateConfig.templateDir, templateSourceDir);
    loader.succeed();
    loader.start('Processing template');
    await (0, _editTemplate.changePlaceholderInTemplate)({
      projectName,
      projectTitle,
      placeholderName: templateConfig.placeholderName,
      placeholderTitle: templateConfig.titlePlaceholder,
      packageName
    });
    if (packageManager === 'yarn' && shouldBumpYarnVersion) {
      await bumpYarnVersion(projectDirectory);
    }
    loader.succeed();
    const {
      postInitScript
    } = templateConfig;
    if (postInitScript) {
      loader.info('Executing post init script ');
      await (0, _template.executePostInitScript)(templateName, postInitScript, templateSourceDir);
    }
    if (!skipInstall) {
      await installDependencies({
        packageManager,
        loader,
        root: projectDirectory
      });
      if (process.platform === 'darwin') {
        const installPodsValue = String(installCocoaPods);
        if (installPodsValue === 'true') {
          didInstallPods = true;
          await (0, _cliPlatformApple().installPods)(loader);
          loader.succeed();
          setEmptyHashForCachedDependencies(projectName);
        } else if (installPodsValue === 'undefined') {
          const {
            installCocoapods
          } = await (0, _cliTools().prompt)({
            type: 'confirm',
            name: 'installCocoapods',
            message: `Do you want to install CocoaPods now? ${_chalk().default.reset.dim('Only needed if you run your project in Xcode directly')}`
          });
          didInstallPods = installCocoapods;
          if (installCocoapods) {
            await (0, _cliPlatformApple().installPods)(loader);
            loader.succeed();
            setEmptyHashForCachedDependencies(projectName);
          }
        }
      }
    } else {
      didInstallPods = false;
      loader.succeed('Dependencies installation skipped');
    }
  } catch (e) {
    loader.fail();
    if (e instanceof Error) {
      _cliTools().logger.error('Installing pods failed. This doesn\'t affect project initialization and you can safely proceed. \nHowever, you will need to install pods manually when running iOS, follow additional steps in "Run instructions for iOS" section.\n');
      _cliTools().logger.debug(e);
    }
    didInstallPods = false;
  } finally {
    _fsExtra().default.removeSync(templateSourceDir);
  }
  if (process.platform === 'darwin') {
    _cliTools().logger.info(`💡 To enable automatic CocoaPods installation when building for iOS you can create react-native.config.js with automaticPodsInstallation field. \n${_chalk().default.reset.dim(`For more details, see ${_chalk().default.underline('https://github.com/react-native-community/cli/blob/main/docs/projects.md#projectiosautomaticpodsinstallation')}`)}
            `);
  }
  return {
    didInstallPods
  };
}
async function installDependencies({
  packageManager,
  loader,
  root
}) {
  loader.start('Installing dependencies');
  await PackageManager.installAll({
    packageManager,
    silent: true,
    root
  });
  loader.succeed();
}
function checkPackageManagerAvailability(packageManager) {
  if (packageManager === 'bun') {
    return (0, _bun.getBunVersionIfAvailable)();
  } else if (packageManager === 'npm') {
    return (0, _npm.getNpmVersionIfAvailable)();
  } else if (packageManager === 'yarn') {
    return (0, _yarn.getYarnVersionIfAvailable)();
  }
  return false;
}
async function createProject(projectName, directory, version, shouldBumpYarnVersion, options) {
  // Handle these cases (when community template is published and react-native >= 0.75
  //
  // +==================================================================+==========+===================+
  // | Arguments                                                        | Template |   React Native    |
  // +==================================================================+==========+===================+
  // | <None>                                                           | 0.74.x   | 0.74.5 (latest)   |
  // +------------------------------------------------------------------+----------+-------------------+
  // | --version next                                                   | 0.75.x   | 0.75.0-rc.1 (next)|
  // +------------------------------------------------------------------+----------+-------------------+
  // | --version 0.75.0                                                 | 0.75.x   | 0.75.0            |
  // +------------------------------------------------------------------+----------+-------------------+
  // | --template @react-native-community/template@0.75.1               | 0.75.1   | latest            |
  // +------------------------------------------------------------------+----------+-------------------+
  // | --template @react-native-community/template@0.75.1 --version 0.75| 0.75.1   | 0.75.x            |
  // +------------------------------------------------------------------+----------+-------------------+
  //
  // 1. If you specify `--version 0.75.0` and `@react-native-community/template@0.75.0` is *NOT*
  // published, then `init` will exit and suggest explicitly using the `--template` argument.
  //
  // 2. `--template` will always win over `--version` for the template.
  //
  // 3. For version < 0.75, the template ships with react-native.
  const templateUri = await (0, _version.createTemplateUri)(options, version);
  _cliTools().logger.debug(`Template: '${templateUri}'`);
  return createFromTemplate({
    projectName,
    shouldBumpYarnVersion,
    templateUri,
    npm: options.npm,
    pm: options.pm,
    directory,
    projectTitle: options.title,
    skipInstall: options.skipInstall,
    packageName: options.packageName,
    installCocoaPods: options.installPods,
    version,
    replaceDirectory: options.replaceDirectory,
    yarnConfigOptions: options.yarnConfigOptions
  });
}
function userAgentPackageManager() {
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent && userAgent.startsWith('bun')) {
    return 'bun';
  }
  return null;
}
var initialize = async function initialize([projectName], options) {
  if (!projectName) {
    const {
      projName
    } = await (0, _cliTools().prompt)({
      type: 'text',
      name: 'projName',
      message: 'How would you like to name the app?'
    });
    projectName = projName;
  }
  (0, _validate.validateProjectName)(projectName);
  let version = options.version ?? DEFAULT_VERSION;
  try {
    const updatedVersion = await (0, _npm.npmResolveConcreteVersion)(options.platformName ?? 'react-native', version);
    _cliTools().logger.debug(`Mapped: ${version} -> ${updatedVersion}`);
    version = updatedVersion;
  } catch (e) {
    _cliTools().logger.debug(`Failed to get concrete version from '${version}': `, e);
  }

  // From 0.75 it actually is useful to be able to specify both the template and react-native version.
  // This should only be used by people who know what they're doing.
  if (!!options.template && !!options.version) {
    var _semver$coerce;
    // 0.75.0-nightly-20240618-5df5ed1a8' -> 0.75.0
    // 0.75.0-rc.1 -> 0.75.0
    const semverVersion = ((_semver$coerce = _semver().default.coerce(version)) === null || _semver$coerce === void 0 ? void 0 : _semver$coerce.version) ?? version;
    if (_semver().default.gte(semverVersion, _constants.TEMPLATE_COMMUNITY_REACT_NATIVE_VERSION)) {
      _cliTools().logger.warn(`Use ${_chalk().default.bold('--template')} and ${_chalk().default.bold('--version')} only if you know what you're doing. Here be dragons 🐉.`);
    } else {
      throw new _TemplateAndVersionError.default(options.template);
    }
  }
  const root = process.cwd();
  const directoryName = _path().default.relative(root, options.directory || projectName);
  const projectFolder = _path().default.join(root, directoryName);
  if (options.pm && !checkPackageManagerAvailability(options.pm)) {
    _cliTools().logger.error('Seems like the package manager you want to use is not installed. Please install it or choose another package manager.');
    return;
  }
  let shouldBumpYarnVersion = true;
  let shouldCreateGitRepository = false;
  const isGitAvailable = await (0, _git.checkGitInstallation)();
  if (isGitAvailable) {
    const isFolderGitRepo = await (0, _git.checkIfFolderIsGitRepo)(projectFolder);
    if (isFolderGitRepo) {
      shouldBumpYarnVersion = false;
    } else {
      shouldCreateGitRepository = true; // Initialize git repo after creating project
    }
  } else {
    _cliTools().logger.warn('Git is not installed on your system. This might cause some features to work incorrectly.');
  }
  const {
    didInstallPods
  } = await createProject(projectName, directoryName, version, shouldBumpYarnVersion, options);
  if (shouldCreateGitRepository && !options.skipGitInit) {
    await (0, _git.createGitRepository)(projectFolder);
  }
  (0, _printRunInstructions.default)(projectFolder, projectName, {
    showPodsInstructions: !didInstallPods
  });
};
exports.default = initialize;

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli/build/commands/init/init.js.map