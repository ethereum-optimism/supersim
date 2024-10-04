import "./chunk-MSFXBLHD.js";

// node_modules/.pnpm/isows@1.0.4_ws@8.17.1_bufferutil@4.0.8_utf-8-validate@5.0.10_/node_modules/isows/_esm/utils.js
function getNativeWebSocket() {
  if (typeof WebSocket !== "undefined")
    return WebSocket;
  if (typeof global.WebSocket !== "undefined")
    return global.WebSocket;
  if (typeof window.WebSocket !== "undefined")
    return window.WebSocket;
  if (typeof self.WebSocket !== "undefined")
    return self.WebSocket;
  throw new Error("`WebSocket` is not supported in this environment");
}

// node_modules/.pnpm/isows@1.0.4_ws@8.17.1_bufferutil@4.0.8_utf-8-validate@5.0.10_/node_modules/isows/_esm/native.js
var WebSocket2 = getNativeWebSocket();
export {
  WebSocket2 as WebSocket
};
//# sourceMappingURL=native-A7YO5Y3U.js.map
