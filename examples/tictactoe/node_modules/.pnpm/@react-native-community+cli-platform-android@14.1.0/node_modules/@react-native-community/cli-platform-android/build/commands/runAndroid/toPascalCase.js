"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPascalCase = toPascalCase;
function toPascalCase(value) {
  return value !== '' ? value[0].toUpperCase() + value.slice(1) : value;
}

//# sourceMappingURL=/Users/thymikee/Developer/oss/rncli/packages/cli-platform-android/build/commands/runAndroid/toPascalCase.js.map