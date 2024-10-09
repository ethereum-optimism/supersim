"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNpmRegistryUrl = void 0;
exports.getNpmVersionIfAvailable = getNpmVersionIfAvailable;
exports.getTemplateVersion = getTemplateVersion;
exports.isProjectUsingNpm = isProjectUsingNpm;
exports.npmResolveConcreteVersion = npmResolveConcreteVersion;
function _child_process() {
  const data = require("child_process");
  _child_process = function () {
    return data;
  };
  return data;
}
function _findUp() {
  const data = _interopRequireDefault(require("find-up"));
  _findUp = function () {
    return data;
  };
  return data;
}
function _semver() {
  const data = _interopRequireDefault(require("semver"));
  _semver = function () {
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

function getNpmVersionIfAvailable() {
  let npmVersion;
  try {
    // execSync returns a Buffer -> convert to string
    npmVersion = ((0, _child_process().execSync)('npm --version', {
      stdio: [0, 'pipe', 'ignore']
    }).toString() || '').trim();
    return npmVersion;
  } catch (error) {
    return null;
  }
}
function isProjectUsingNpm(cwd) {
  return _findUp().default.sync('package-lock.json', {
    cwd
  });
}
const getNpmRegistryUrl = (() => {
  // Lazily resolve npm registry url since it is only needed when initializing a
  // new project.
  let registryUrl = '';
  return () => {
    if (!registryUrl) {
      try {
        registryUrl = (0, _child_process().execSync)('npm config get registry --workspaces=false --include-workspace-root').toString().trim();
      } catch {
        registryUrl = 'https://registry.npmjs.org/';
      }
    }
    return registryUrl;
  };
})();

/**
 * Convert an npm tag to a concrete version, for example:
 * - next -> 0.75.0-rc.0
 * - nightly -> 0.75.0-nightly-20240618-5df5ed1a8
 */
exports.getNpmRegistryUrl = getNpmRegistryUrl;
async function npmResolveConcreteVersion(packageName, tagOrVersion) {
  const url = new URL(getNpmRegistryUrl());
  url.pathname = `${packageName}/${tagOrVersion}`;
  const resp = await fetch(url);
  if ([200,
  // OK
  301,
  // Moved Permanemently
  302,
  // Found
  304,
  // Not Modified
  307,
  // Temporary Redirect
  308 // Permanent Redirect
  ].indexOf(resp.status) === -1) {
    throw new Error(`Unknown version ${packageName}@${tagOrVersion}`);
  }
  const json = await resp.json();
  return json.version;
}
class Template {
  constructor(version, reactNativeVersion, published) {
    this.version = version;
    this.reactNativeVersion = reactNativeVersion;
    this.published = new Date(published);
  }
  get isPreRelease() {
    return this.version.includes('-rc');
  }
}
const TEMPLATE_VERSIONS_URL = 'https://registry.npmjs.org/@react-native-community/template';
const minorVersion = version => {
  const v = _semver().default.parse(version);
  return `${v.major}.${v.minor}`;
};
async function getTemplateVersion(reactNativeVersion) {
  const json = await fetch(TEMPLATE_VERSIONS_URL).then(resp => resp.json());

  // We are abusing which npm metadata is publicly available through the registry. Scripts
  // is always captured, and we use this in the Github Action that manages our releases to
  // capture the version of React Native the template is built with.
  //
  // Users are interested in:
  // - IF there a match for React Native MAJOR.MINOR.PATCH?
  //    - Yes: if there are >= 2 versions, pick the one last published. This lets us release
  //           specific fixes for React Native versions.
  // - ELSE, is there a match for React Native MINOR.PATCH?
  //    - Yes: if there are >= 2 versions, pick the one last published. This decouples us from
  //           React Native releases.
  //    - No: we don't have a version of the template for a version of React Native. There should
  //          at a minimum be at last one version cut for each MINOR.PATCH since 0.75. Before this
  //          the template was shipped with React Native
  const rnToTemplate = {};
  for (const [templateVersion, pkg] of Object.entries(json.versions)) {
    var _pkg$scripts, _pkg$scripts2;
    const rnVersion = (pkg === null || pkg === void 0 ? void 0 : (_pkg$scripts = pkg.scripts) === null || _pkg$scripts === void 0 ? void 0 : _pkg$scripts.reactNativeVersion) ?? (pkg === null || pkg === void 0 ? void 0 : (_pkg$scripts2 = pkg.scripts) === null || _pkg$scripts2 === void 0 ? void 0 : _pkg$scripts2.version);
    if (rnVersion == null || !_semver().default.valid(rnVersion)) {
      // This is a very early version that doesn't have the correct metadata embedded
      continue;
    }
    const template = new Template(templateVersion, rnVersion, json.time[templateVersion]);
    const rnMinorVersion = minorVersion(rnVersion);
    rnToTemplate[rnVersion] = rnToTemplate[rnVersion] ?? [];
    rnToTemplate[rnVersion].push(template);
    rnToTemplate[rnMinorVersion] = rnToTemplate[rnMinorVersion] ?? [];
    rnToTemplate[rnMinorVersion].push(template);
  }

  // Make sure the last published is the first one in each version of React Native
  for (const v in rnToTemplate) {
    rnToTemplate[v].sort((a, b) => b.published.getTime() - a.published.getTime());
  }
  if (reactNativeVersion in rnToTemplate) {
    return rnToTemplate[reactNativeVersion][0].version;
  }
  const rnMinorVersion = minorVersion(reactNativeVersion);
  if (rnMinorVersion in rnToTemplate) {
    return rnToTemplate[rnMinorVersion][0].version;
  }
  return;
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli/build/tools/npm.js.map