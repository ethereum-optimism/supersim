"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unixifyPaths;
/**
 *
 * @param path string
 * @returns string
 *
 * This function converts Windows paths to Unix paths.
 */

function unixifyPaths(path) {
  return path.replace(/^([a-zA-Z]+:|\.\/)/, '');
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-tools/build/unixifyPaths.js.map