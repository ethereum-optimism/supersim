import {
  ne,
  p,
  se,
  y
} from "./chunk-W66OPAPQ.js";
import "./chunk-MSFXBLHD.js";

// node_modules/.pnpm/@walletconnect+modal@2.6.2_@types+react@18.3.10_react@18.3.1/node_modules/@walletconnect/modal/dist/index.js
var d = class {
  constructor(e) {
    this.openModal = se.open, this.closeModal = se.close, this.subscribeModal = se.subscribe, this.setTheme = ne.setThemeConfig, ne.setThemeConfig(e), y.setConfig(e), this.initUi();
  }
  async initUi() {
    if (typeof window < "u") {
      await import("./dist-KP2V7T47.js");
      const e = document.createElement("wcm-modal");
      document.body.insertAdjacentElement("beforeend", e), p.setIsUiLoaded(true);
    }
  }
};
export {
  d as WalletConnectModal
};
//# sourceMappingURL=dist-F2UDKX2U.js.map
