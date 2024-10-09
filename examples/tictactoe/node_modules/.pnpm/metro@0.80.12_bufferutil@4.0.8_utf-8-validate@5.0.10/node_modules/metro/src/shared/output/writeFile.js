"use strict";

const denodeify = require("denodeify");
const fs = require("fs");
const throat = require("throat");
const writeFile = throat(128, denodeify(fs.writeFile));
module.exports = writeFile;
