"use strict";

const Transformer = require("./DeltaBundler/Transformer");
const DependencyGraph = require("./node-haste/DependencyGraph");
class Bundler {
  constructor(config, options) {
    this._depGraph = new DependencyGraph(config, options);
    this._readyPromise = this._depGraph
      .ready()
      .then(() => {
        config.reporter.update({
          type: "transformer_load_started",
        });
        this._transformer = new Transformer(config, (...args) =>
          this._depGraph.getSha1(...args)
        );
        config.reporter.update({
          type: "transformer_load_done",
        });
      })
      .catch((error) => {
        console.error("Failed to construct transformer: ", error);
        config.reporter.update({
          type: "transformer_load_failed",
          error,
        });
      });
  }
  getWatcher() {
    return this._depGraph.getWatcher();
  }
  async end() {
    await this._depGraph.ready();
    this._transformer.end();
    this._depGraph.end();
  }
  async getDependencyGraph() {
    await this._depGraph.ready();
    return this._depGraph;
  }
  async transformFile(filePath, transformOptions, fileBuffer) {
    await this._depGraph.ready();
    return this._transformer.transformFile(
      filePath,
      transformOptions,
      fileBuffer
    );
  }
  async ready() {
    await this._readyPromise;
  }
}
module.exports = Bundler;
