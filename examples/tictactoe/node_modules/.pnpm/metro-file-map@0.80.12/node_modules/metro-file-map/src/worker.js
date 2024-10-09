"use strict";

const H = require("./constants");
const dependencyExtractor = require("./lib/dependencyExtractor");
const excludedExtensions = require("./workerExclusionList");
const { createHash } = require("crypto");
const { promises: fsPromises } = require("fs");
const fs = require("graceful-fs");
const path = require("path");
const PACKAGE_JSON = path.sep + "package.json";
let hasteImpl = null;
let hasteImplModulePath = null;
function getHasteImpl(requestedModulePath) {
  if (hasteImpl) {
    if (requestedModulePath !== hasteImplModulePath) {
      throw new Error("metro-file-map: hasteImplModulePath changed");
    }
    return hasteImpl;
  }
  hasteImplModulePath = requestedModulePath;
  hasteImpl = require(hasteImplModulePath);
  return hasteImpl;
}
function sha1hex(content) {
  return createHash("sha1").update(content).digest("hex");
}
async function worker(data) {
  let content;
  let dependencies;
  let id;
  let module;
  let sha1;
  let symlinkTarget;
  const {
    computeDependencies,
    computeSha1,
    enableHastePackages,
    readLink,
    rootDir,
    filePath,
  } = data;
  const getContent = () => {
    if (content == null) {
      content = fs.readFileSync(filePath);
    }
    return content;
  };
  if (enableHastePackages && filePath.endsWith(PACKAGE_JSON)) {
    try {
      const fileData = JSON.parse(getContent().toString());
      if (fileData.name) {
        const relativeFilePath = path.relative(rootDir, filePath);
        id = fileData.name;
        module = [relativeFilePath, H.PACKAGE];
      }
    } catch (err) {
      throw new Error(`Cannot parse ${filePath} as JSON: ${err.message}`);
    }
  } else if (
    (data.hasteImplModulePath != null || computeDependencies) &&
    !excludedExtensions.has(filePath.substr(filePath.lastIndexOf(".")))
  ) {
    if (data.hasteImplModulePath != null) {
      id = getHasteImpl(data.hasteImplModulePath).getHasteName(filePath);
      if (id != null) {
        const relativeFilePath = path.relative(rootDir, filePath);
        module = [relativeFilePath, H.MODULE];
      }
    }
    if (computeDependencies) {
      dependencies = Array.from(
        data.dependencyExtractor != null
          ? require(data.dependencyExtractor).extract(
              getContent().toString(),
              filePath,
              dependencyExtractor.extract
            )
          : dependencyExtractor.extract(getContent().toString())
      );
    }
  }
  if (computeSha1) {
    sha1 = sha1hex(getContent());
  }
  if (readLink) {
    symlinkTarget = await fsPromises.readlink(filePath);
  }
  return {
    dependencies,
    id,
    module,
    sha1,
    symlinkTarget,
  };
}
module.exports = {
  worker,
};
