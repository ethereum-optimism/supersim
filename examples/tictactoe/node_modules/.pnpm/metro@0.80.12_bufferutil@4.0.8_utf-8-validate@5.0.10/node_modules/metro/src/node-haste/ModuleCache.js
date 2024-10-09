"use strict";

const Module = require("./Module");
const Package = require("./Package");
class ModuleCache {
  constructor(options) {
    this._getClosestPackage = options.getClosestPackage;
    this._moduleCache = Object.create(null);
    this._packageCache = Object.create(null);
    this._packagePathAndSubpathByModulePath = Object.create(null);
    this._modulePathsByPackagePath = Object.create(null);
  }
  getModule(filePath) {
    if (!this._moduleCache[filePath]) {
      this._moduleCache[filePath] = new Module(filePath, this);
    }
    return this._moduleCache[filePath];
  }
  getPackage(filePath) {
    if (!this._packageCache[filePath]) {
      this._packageCache[filePath] = new Package({
        file: filePath,
      });
    }
    return this._packageCache[filePath];
  }
  getPackageForModule(module) {
    return this.getPackageOf(module.path);
  }
  getPackageOf(absoluteModulePath) {
    let packagePathAndSubpath =
      this._packagePathAndSubpathByModulePath[absoluteModulePath];
    if (
      packagePathAndSubpath &&
      this._packageCache[packagePathAndSubpath.packageJsonPath]
    ) {
      return {
        pkg: this._packageCache[packagePathAndSubpath.packageJsonPath],
        packageRelativePath: packagePathAndSubpath.packageRelativePath,
      };
    }
    packagePathAndSubpath = this._getClosestPackage(absoluteModulePath);
    if (!packagePathAndSubpath) {
      return null;
    }
    const packagePath = packagePathAndSubpath.packageJsonPath;
    this._packagePathAndSubpathByModulePath[absoluteModulePath] =
      packagePathAndSubpath;
    const modulePaths =
      this._modulePathsByPackagePath[packagePath] ?? new Set();
    modulePaths.add(absoluteModulePath);
    this._modulePathsByPackagePath[packagePath] = modulePaths;
    return {
      pkg: this.getPackage(packagePath),
      packageRelativePath: packagePathAndSubpath.packageRelativePath,
    };
  }
  invalidate(filePath) {
    if (this._moduleCache[filePath]) {
      this._moduleCache[filePath].invalidate();
      delete this._moduleCache[filePath];
    }
    if (this._packageCache[filePath]) {
      this._packageCache[filePath].invalidate();
      delete this._packageCache[filePath];
    }
    const packagePathAndSubpath =
      this._packagePathAndSubpathByModulePath[filePath];
    if (packagePathAndSubpath) {
      const packagePath = packagePathAndSubpath.packageJsonPath;
      delete this._packagePathAndSubpathByModulePath[filePath];
      const modulePaths = this._modulePathsByPackagePath[packagePath];
      if (modulePaths) {
        modulePaths.delete(filePath);
        if (modulePaths.size === 0) {
          delete this._modulePathsByPackagePath[packagePath];
        }
      }
    }
    if (this._modulePathsByPackagePath[filePath]) {
      const modulePaths = this._modulePathsByPackagePath[filePath];
      for (const modulePath of modulePaths) {
        delete this._packagePathAndSubpathByModulePath[modulePath];
      }
      modulePaths.clear();
      delete this._modulePathsByPackagePath[filePath];
    }
  }
}
module.exports = ModuleCache;
