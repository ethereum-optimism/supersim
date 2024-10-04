import {
  require_buffer
} from "./chunk-QNMR2JUL.js";
import {
  clsx_m_exports,
  hooks_module_exports,
  init_clsx_m,
  init_hooks_module,
  init_preact_module,
  preact_module_exports,
  require_js,
  require_sha
} from "./chunk-K76KBOEY.js";
import "./chunk-7S7TJQN3.js";
import {
  require_events
} from "./chunk-XCT47EJG.js";
import {
  init_tslib_es6,
  tslib_es6_exports
} from "./chunk-TLZKTUPW.js";
import {
  require_eventemitter3
} from "./chunk-RM5DCHXI.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-MSFXBLHD.js";

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/assets/wallet-logo.js
var require_wallet_logo = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/assets/wallet-logo.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.walletLogo = void 0;
    var walletLogo = (type2, width) => {
      let height;
      switch (type2) {
        case "standard":
          height = width;
          return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `;
        case "circle":
          height = width;
          return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 999.81 999.81'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052fe;%7D.cls-2%7Bfill:%23fefefe;%7D.cls-3%7Bfill:%230152fe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M655-115.9h56c.83,1.59,2.36.88,3.56,1a478,478,0,0,1,75.06,10.42C891.4-81.76,978.33-32.58,1049.19,44q116.7,126,131.94,297.61c.38,4.14-.34,8.53,1.78,12.45v59c-1.58.84-.91,2.35-1,3.56a482.05,482.05,0,0,1-10.38,74.05c-24,106.72-76.64,196.76-158.83,268.93s-178.18,112.82-287.2,122.6c-4.83.43-9.86-.25-14.51,1.77H654c-1-1.68-2.69-.91-4.06-1a496.89,496.89,0,0,1-105.9-18.59c-93.54-27.42-172.78-77.59-236.91-150.94Q199.34,590.1,184.87,426.58c-.47-5.19.25-10.56-1.77-15.59V355c1.68-1,.91-2.7,1-4.06a498.12,498.12,0,0,1,18.58-105.9c26-88.75,72.64-164.9,140.6-227.57q126-116.27,297.21-131.61C645.32-114.57,650.35-113.88,655-115.9Zm377.92,500c0-192.44-156.31-349.49-347.56-350.15-194.13-.68-350.94,155.13-352.29,347.42-1.37,194.55,155.51,352.1,348.56,352.47C876.15,734.23,1032.93,577.84,1032.93,384.11Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-2' d='M1032.93,384.11c0,193.73-156.78,350.12-351.29,349.74-193-.37-349.93-157.92-348.56-352.47C334.43,189.09,491.24,33.28,685.37,34,876.62,34.62,1032.94,191.67,1032.93,384.11ZM683,496.81q43.74,0,87.48,0c15.55,0,25.32-9.72,25.33-25.21q0-87.48,0-175c0-15.83-9.68-25.46-25.59-25.46H595.77c-15.88,0-25.57,9.64-25.58,25.46q0,87.23,0,174.45c0,16.18,9.59,25.7,25.84,25.71Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-3' d='M683,496.81H596c-16.25,0-25.84-9.53-25.84-25.71q0-87.23,0-174.45c0-15.82,9.7-25.46,25.58-25.46H770.22c15.91,0,25.59,9.63,25.59,25.46q0,87.47,0,175c0,15.49-9.78,25.2-25.33,25.21Q726.74,496.84,683,496.81Z' transform='translate(-183.1 115.9)'/%3E%3C/svg%3E`;
        case "text":
          height = (0.1 * width).toFixed(2);
          return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`;
        case "textWithLogo":
          height = (0.25 * width).toFixed(2);
          return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`;
        case "textLight":
          height = (0.1 * width).toFixed(2);
          return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`;
        case "textWithLogoLight":
          height = (0.25 * width).toFixed(2);
          return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`;
        default:
          height = width;
          return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `;
      }
    };
    exports.walletLogo = walletLogo;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LINK_API_URL = void 0;
    exports.LINK_API_URL = "https://www.walletlink.org";
  }
});

// node_modules/.pnpm/bn.js@5.2.1/node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/.pnpm/bn.js@5.2.1/node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module2, exports2) {
      "use strict";
      function assert2(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN(number2, base, endian) {
        if (BN.isBN(number2)) {
          return number2;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number2 !== null) {
          if (base === "le" || base === "be") {
            endian = base;
            base = 10;
          }
          this._init(number2 || 0, base || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN;
      } else {
        exports2.BN = BN;
      }
      BN.BN = BN;
      BN.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = require_buffer().Buffer;
        }
      } catch (e) {
      }
      BN.isBN = function isBN(num) {
        if (num instanceof BN) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
      };
      BN.max = function max2(left, right) {
        if (left.cmp(right) > 0) return left;
        return right;
      };
      BN.min = function min2(left, right) {
        if (left.cmp(right) < 0) return left;
        return right;
      };
      BN.prototype._init = function init(number2, base, endian) {
        if (typeof number2 === "number") {
          return this._initNumber(number2, base, endian);
        }
        if (typeof number2 === "object") {
          return this._initArray(number2, base, endian);
        }
        if (base === "hex") {
          base = 16;
        }
        assert2(base === (base | 0) && base >= 2 && base <= 36);
        number2 = number2.toString().replace(/\s+/g, "");
        var start = 0;
        if (number2[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number2.length) {
          if (base === 16) {
            this._parseHex(number2, start, endian);
          } else {
            this._parseBase(number2, base, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base, endian);
            }
          }
        }
      };
      BN.prototype._initNumber = function _initNumber(number2, base, endian) {
        if (number2 < 0) {
          this.negative = 1;
          number2 = -number2;
        }
        if (number2 < 67108864) {
          this.words = [number2 & 67108863];
          this.length = 1;
        } else if (number2 < 4503599627370496) {
          this.words = [
            number2 & 67108863,
            number2 / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert2(number2 < 9007199254740992);
          this.words = [
            number2 & 67108863,
            number2 / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le") return;
        this._initArray(this.toArray(), base, endian);
      };
      BN.prototype._initArray = function _initArray(number2, base, endian) {
        assert2(typeof number2.length === "number");
        if (number2.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number2.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        if (endian === "be") {
          for (i = number2.length - 1, j = 0; i >= 0; i -= 3) {
            w = number2[i] | number2[i - 1] << 8 | number2[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number2.length; i += 3) {
            w = number2[i] | number2[i + 1] << 8 | number2[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this._strip();
      };
      function parseHex4Bits(string2, index) {
        var c = string2.charCodeAt(index);
        if (c >= 48 && c <= 57) {
          return c - 48;
        } else if (c >= 65 && c <= 70) {
          return c - 55;
        } else if (c >= 97 && c <= 102) {
          return c - 87;
        } else {
          assert2(false, "Invalid character in " + string2);
        }
      }
      function parseHexByte(string2, lowerBound, index) {
        var r = parseHex4Bits(string2, index);
        if (index - 1 >= lowerBound) {
          r |= parseHex4Bits(string2, index - 1) << 4;
        }
        return r;
      }
      BN.prototype._parseHex = function _parseHex(number2, start, endian) {
        this.length = Math.ceil((number2.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var off = 0;
        var j = 0;
        var w;
        if (endian === "be") {
          for (i = number2.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number2, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number2.length - start;
          for (i = parseLength % 2 === 0 ? start + 1 : start; i < number2.length; i += 2) {
            w = parseHexByte(number2, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this._strip();
      };
      function parseBase(str, start, end, mul) {
        var r = 0;
        var b = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            b = c - 49 + 10;
          } else if (c >= 17) {
            b = c - 17 + 10;
          } else {
            b = c;
          }
          assert2(c >= 0 && b < mul, "Invalid character");
          r += b;
        }
        return r;
      }
      BN.prototype._parseBase = function _parseBase(number2, base, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base | 0;
        var total = number2.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number2, i, i + limbLen, base);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number2, i, number2.length, base);
          for (i = 0; i < mod; i++) {
            pow *= base;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this._strip();
      };
      BN.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      function move(dest, src) {
        dest.words = src.words;
        dest.length = src.length;
        dest.negative = src.negative;
        dest.red = src.red;
      }
      BN.prototype._move = function _move(dest) {
        move(dest, this);
      };
      BN.prototype.clone = function clone() {
        var r = new BN(null);
        this.copy(r);
        return r;
      };
      BN.prototype._expand = function _expand(size2) {
        while (this.length < size2) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN.prototype._strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      if (typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
        try {
          BN.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspect;
        } catch (e) {
          BN.prototype.inspect = inspect;
        }
      } else {
        BN.prototype.inspect = inspect;
      }
      function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN.prototype.toString = function toString(base, padding) {
        base = base || 10;
        padding = padding | 0 || 1;
        var out;
        if (base === 16 || base === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
            off += 2;
            if (off >= 26) {
              off -= 26;
              i--;
            }
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base];
          var groupBase = groupBases[base];
          out = "";
          var c = this.clone();
          c.negative = 0;
          while (!c.isZero()) {
            var r = c.modrn(groupBase).toString(base);
            c = c.idivn(groupBase);
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out;
            } else {
              out = r + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert2(false, "Base should be between 2 and 36");
      };
      BN.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert2(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN.prototype.toJSON = function toJSON() {
        return this.toString(16, 2);
      };
      if (Buffer2) {
        BN.prototype.toBuffer = function toBuffer(endian, length) {
          return this.toArrayLike(Buffer2, endian, length);
        };
      }
      BN.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      var allocate = function allocate2(ArrayType, size2) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size2);
        }
        return new ArrayType(size2);
      };
      BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        this._strip();
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert2(byteLength <= reqLength, "byte array longer than desired length");
        assert2(reqLength > 0, "Requested array length <= 0");
        var res = allocate(ArrayType, reqLength);
        var postfix = endian === "le" ? "LE" : "BE";
        this["_toArrayLike" + postfix](res, byteLength);
        return res;
      };
      BN.prototype._toArrayLikeLE = function _toArrayLikeLE(res, byteLength) {
        var position = 0;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position++] = word & 255;
          if (position < res.length) {
            res[position++] = word >> 8 & 255;
          }
          if (position < res.length) {
            res[position++] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position < res.length) {
              res[position++] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position < res.length) {
          res[position++] = carry;
          while (position < res.length) {
            res[position++] = 0;
          }
        }
      };
      BN.prototype._toArrayLikeBE = function _toArrayLikeBE(res, byteLength) {
        var position = res.length - 1;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position--] = word & 255;
          if (position >= 0) {
            res[position--] = word >> 8 & 255;
          }
          if (position >= 0) {
            res[position--] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position >= 0) {
              res[position--] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position >= 0) {
          res[position--] = carry;
          while (position >= 0) {
            res[position--] = 0;
          }
        }
      };
      if (Math.clz32) {
        BN.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0) return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = num.words[off] >>> wbit & 1;
        }
        return w;
      }
      BN.prototype.zeroBits = function zeroBits() {
        if (this.isZero()) return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26) break;
        }
        return r;
      };
      BN.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this._strip();
      };
      BN.prototype.ior = function ior(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN.prototype.or = function or(num) {
        if (this.length > num.length) return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN.prototype.uor = function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN.prototype.iuand = function iuand(num) {
        var b;
        if (this.length > num.length) {
          b = num;
        } else {
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i];
        }
        this.length = b.length;
        return this._strip();
      };
      BN.prototype.iand = function iand(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN.prototype.and = function and(num) {
        if (this.length > num.length) return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN.prototype.uand = function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN.prototype.iuxor = function iuxor(num) {
        var a;
        var b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i];
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = a.length;
        return this._strip();
      };
      BN.prototype.ixor = function ixor(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN.prototype.xor = function xor(num) {
        if (this.length > num.length) return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN.prototype.uxor = function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN.prototype.inotn = function inotn(width) {
        assert2(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this._strip();
      };
      BN.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN.prototype.setn = function setn(bit, val) {
        assert2(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this._strip();
      };
      BN.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
        var a, b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN.prototype.add = function add(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length) return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a, b;
        if (cmp > 0) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = Math.max(this.length, i);
        if (a !== this) {
          this.negative = 1;
        }
        return this._strip();
      };
      BN.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        var len = self.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
          }
          out.words[k] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k] = carry | 0;
        } else {
          out.length--;
        }
        return out._strip();
      }
      var comb10MulTo = function comb10MulTo2(self, num, out) {
        var a = self.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o[0] = w0;
        o[1] = w1;
        o[2] = w2;
        o[3] = w3;
        o[4] = w4;
        o[5] = w5;
        o[6] = w6;
        o[7] = w7;
        o[8] = w8;
        o[9] = w9;
        o[10] = w10;
        o[11] = w11;
        o[12] = w12;
        o[13] = w13;
        o[14] = w14;
        o[15] = w15;
        o[16] = w16;
        o[17] = w17;
        o[18] = w18;
        if (c !== 0) {
          o[19] = c;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        out.length = self.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k] = carry;
        } else {
          out.length--;
        }
        return out._strip();
      }
      function jumboMulTo(self, num, out) {
        return bigMulTo(self, num, out);
      }
      BN.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N);
        var l = BN.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1) return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N);
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1;
          var rtwdf = Math.cos(2 * Math.PI / l);
          var itwdf = Math.sin(2 * Math.PI / l);
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j];
              var ie = itws[p + j];
              var ro = rtws[p + j + s];
              var io = itws[p + j + s];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p + j] = re + ro;
              itws[p + j] = ie + io;
              rtws[p + j + s] = re - ro;
              itws[p + j + s] = ie - io;
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1) return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0;
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
          ws[i] = w & 67108863;
          if (w < 67108864) {
            carry = 0;
          } else {
            carry = w / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0;
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0);
          rws[2 * i] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0;
        }
        assert2(carry === 0);
        assert2((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length);
        var rbt = this.makeRBT(N);
        var _ = this.stub(N);
        var rws = new Array(N);
        var rwst = new Array(N);
        var iwst = new Array(N);
        var nrws = new Array(N);
        var nrwst = new Array(N);
        var niwst = new Array(N);
        var rmws = out.words;
        rmws.length = N;
        this.convert13b(x.words, x.length, rws, N);
        this.convert13b(y.words, y.length, nrws, N);
        this.transform(rws, _, rwst, iwst, N, rbt);
        this.transform(nrws, _, nrwst, niwst, N, rbt);
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
          rwst[i] = rx;
        }
        this.conjugate(rwst, iwst, N);
        this.transform(rwst, iwst, rmws, _, N, rbt);
        this.conjugate(rmws, _, N);
        this.normalize13b(rmws, N);
        out.negative = x.negative ^ y.negative;
        out.length = x.length + y.length;
        return out._strip();
      };
      BN.prototype.mul = function mul(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN.prototype.mulf = function mulf(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN.prototype.imuln = function imuln(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert2(typeof num === "number");
        assert2(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return isNegNum ? this.ineg() : this;
      };
      BN.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN.prototype.pow = function pow(num) {
        var w = toBitArray(num);
        if (w.length === 0) return new BN(1);
        var res = this;
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0) break;
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0) continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN.prototype.iushln = function iushln(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
          }
          if (carry) {
            this.words[i] = carry;
            this.length++;
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i];
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0;
          }
          this.length += s;
        }
        return this._strip();
      };
      BN.prototype.ishln = function ishln(bits) {
        assert2(this.negative === 0);
        return this.iushln(bits);
      };
      BN.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert2(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask2 = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0) {
        } else if (this.length > s) {
          this.length -= s;
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0;
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask2;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this._strip();
      };
      BN.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert2(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN.prototype.testn = function testn(bit) {
        assert2(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN.prototype.imaskn = function imaskn(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert2(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask2 = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask2;
        }
        return this._strip();
      };
      BN.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN.prototype.iaddn = function iaddn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0) return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) <= num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN.prototype.isubn = function isubn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0) return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this._strip();
      };
      BN.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0) return this._strip();
        assert2(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this._strip();
      };
      BN.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN(null);
          q.length = m + 1;
          q.words = new Array(q.length);
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0;
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m);
        if (diff.negative === 0) {
          a = diff;
          if (q) {
            q.words[m] = 1;
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a._ishlnsubmul(b, qj, j);
          while (a.negative !== 0) {
            qj--;
            a.negative = 0;
            a._ishlnsubmul(b, 1, j);
            if (!a.isZero()) {
              a.negative ^= 1;
            }
          }
          if (q) {
            q.words[j] = qj;
          }
        }
        if (q) {
          q._strip();
        }
        a._strip();
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN.prototype.divmod = function divmod(num, mode, positive) {
        assert2(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN(0),
            mod: new BN(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN(this.modrn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN(this.modrn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero()) return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN.prototype.modrn = function modrn(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert2(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return isNegNum ? -acc : acc;
      };
      BN.prototype.modn = function modn(num) {
        return this.modrn(num);
      };
      BN.prototype.idivn = function idivn(num) {
        var isNegNum = num < 0;
        if (isNegNum) num = -num;
        assert2(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        this._strip();
        return isNegNum ? this.ineg() : this;
      };
      BN.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN.prototype.egcd = function egcd(p) {
        assert2(p.negative === 0);
        assert2(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN(1);
        var B = new BN(0);
        var C = new BN(0);
        var D = new BN(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            x.iushrn(i);
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            y.iushrn(j);
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp);
                D.isub(xp);
              }
              C.iushrn(1);
              D.iushrn(1);
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y);
            A.isub(C);
            B.isub(D);
          } else {
            y.isub(x);
            C.isub(A);
            D.isub(B);
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        };
      };
      BN.prototype._invmp = function _invmp(p) {
        assert2(p.negative === 0);
        assert2(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN(1);
        var x2 = new BN(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            b.iushrn(j);
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta);
              }
              x2.iushrn(1);
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b);
            x1.isub(x2);
          } else {
            b.isub(a);
            x2.isub(x1);
          }
        }
        var res;
        if (a.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x2;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p);
        }
        return res;
      };
      BN.prototype.gcd = function gcd(num) {
        if (this.isZero()) return num.abs();
        if (num.isZero()) return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1);
          b.iushrn(1);
        }
        do {
          while (a.isEven()) {
            a.iushrn(1);
          }
          while (b.isEven()) {
            b.iushrn(1);
          }
          var r = a.cmp(b);
          if (r < 0) {
            var t = a;
            a = b;
            b = t;
          } else if (r === 0 || b.cmpn(1) === 0) {
            break;
          }
          a.isub(b);
        } while (true);
        return b.iushln(shift);
      };
      BN.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN.prototype.bincn = function bincn(bit) {
        assert2(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative) return -1;
        if (this.negative === 0 && negative) return 1;
        this._strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert2(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1;
        if (this.negative === 0 && num.negative !== 0) return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length) return 1;
        if (this.length < num.length) return -1;
        var res = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0;
          var b = num.words[i] | 0;
          if (a === b) continue;
          if (a < b) {
            res = -1;
          } else if (a > b) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN.red = function red(num) {
        return new Red(num);
      };
      BN.prototype.toRed = function toRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        assert2(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN.prototype.fromRed = function fromRed() {
        assert2(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN.prototype.forceRed = function forceRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN.prototype.redAdd = function redAdd(num) {
        assert2(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN.prototype.redIAdd = function redIAdd(num) {
        assert2(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN.prototype.redSub = function redSub(num) {
        assert2(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN.prototype.redISub = function redISub(num) {
        assert2(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN.prototype.redShl = function redShl(num) {
        assert2(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN.prototype.redMul = function redMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN.prototype.redIMul = function redIMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN.prototype.redSqr = function redSqr() {
        assert2(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN.prototype.redISqr = function redISqr() {
        assert2(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN.prototype.redSqrt = function redSqrt() {
        assert2(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN.prototype.redInvm = function redInvm() {
        assert2(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN.prototype.redNeg = function redNeg() {
        assert2(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN.prototype.redPow = function redPow(num) {
        assert2(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name, p) {
        this.name = name;
        this.p = new BN(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num;
        var rlen;
        do {
          this.split(r, this.tmp);
          r = this.imulK(r);
          r = r.iadd(this.tmp);
          rlen = r.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
        if (cmp === 0) {
          r.words[0] = 0;
          r.length = 1;
        } else if (cmp > 0) {
          r.isub(this.p);
        } else {
          if (r.strip !== void 0) {
            r.strip();
          } else {
            r._strip();
          }
        }
        return r;
      };
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split(input, output) {
        var mask2 = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i = 0; i < outLen; i++) {
          output.words[i] = input.words[i];
        }
        output.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output.words[output.length++] = prev & mask2;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask2) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN._prime = function prime(name) {
        if (primes[name]) return primes[name];
        var prime2;
        if (name === "k256") {
          prime2 = new K256();
        } else if (name === "p224") {
          prime2 = new P224();
        } else if (name === "p192") {
          prime2 = new P192();
        } else if (name === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name);
        }
        primes[name] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert2(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert2(a.negative === 0, "red works only with positives");
        assert2(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert2((a.negative | b.negative) === 0, "red works only with positives");
        assert2(
          a.red && a.red === b.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime) return this.prime.ireduce(a)._forceRed(this);
        move(a, a.umod(this.m)._forceRed(this));
        return a;
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero()) return a.clone();
        var mod3 = this.m.andln(3);
        assert2(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN(1)).iushrn(2);
          return this.pow(a, pow);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert2(!q.isZero());
        var one = new BN(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN(2 * z * z).toRed(this);
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne);
        }
        var c = this.pow(z, q);
        var r = this.pow(a, q.addn(1).iushrn(1));
        var t = this.pow(a, q);
        var m = s;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr();
          }
          assert2(i < m);
          var b = this.pow(c, new BN(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero()) return new BN(1).toRed(this);
        if (num.cmpn(1) === 0) return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN(1).toRed(this);
        wnd[1] = a;
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i];
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0;
          a.length = 1;
          return a;
        }
        var t = a.imul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);
        var t = a.mul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/error/constants.js
var require_constants2 = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/error/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.errorValues = exports.standardErrorCodes = void 0;
    exports.standardErrorCodes = {
      rpc: {
        invalidInput: -32e3,
        resourceNotFound: -32001,
        resourceUnavailable: -32002,
        transactionRejected: -32003,
        methodNotSupported: -32004,
        limitExceeded: -32005,
        parse: -32700,
        invalidRequest: -32600,
        methodNotFound: -32601,
        invalidParams: -32602,
        internal: -32603
      },
      provider: {
        userRejectedRequest: 4001,
        unauthorized: 4100,
        unsupportedMethod: 4200,
        disconnected: 4900,
        chainDisconnected: 4901,
        unsupportedChain: 4902
      }
    };
    exports.errorValues = {
      "-32700": {
        standard: "JSON RPC 2.0",
        message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
      },
      "-32600": {
        standard: "JSON RPC 2.0",
        message: "The JSON sent is not a valid Request object."
      },
      "-32601": {
        standard: "JSON RPC 2.0",
        message: "The method does not exist / is not available."
      },
      "-32602": {
        standard: "JSON RPC 2.0",
        message: "Invalid method parameter(s)."
      },
      "-32603": {
        standard: "JSON RPC 2.0",
        message: "Internal JSON-RPC error."
      },
      "-32000": {
        standard: "EIP-1474",
        message: "Invalid input."
      },
      "-32001": {
        standard: "EIP-1474",
        message: "Resource not found."
      },
      "-32002": {
        standard: "EIP-1474",
        message: "Resource unavailable."
      },
      "-32003": {
        standard: "EIP-1474",
        message: "Transaction rejected."
      },
      "-32004": {
        standard: "EIP-1474",
        message: "Method not supported."
      },
      "-32005": {
        standard: "EIP-1474",
        message: "Request limit exceeded."
      },
      "4001": {
        standard: "EIP-1193",
        message: "User rejected the request."
      },
      "4100": {
        standard: "EIP-1193",
        message: "The requested account and/or method has not been authorized by the user."
      },
      "4200": {
        standard: "EIP-1193",
        message: "The requested method is not supported by this Ethereum provider."
      },
      "4900": {
        standard: "EIP-1193",
        message: "The provider is disconnected from all chains."
      },
      "4901": {
        standard: "EIP-1193",
        message: "The provider is disconnected from the specified chain."
      },
      "4902": {
        standard: "EIP-3085",
        message: "Unrecognized chain ID."
      }
    };
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/error/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/error/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = exports.getErrorCode = exports.isValidCode = exports.getMessageFromCode = exports.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;
    var constants_1 = require_constants2();
    var FALLBACK_MESSAGE = "Unspecified error message.";
    exports.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error.";
    function getMessageFromCode(code, fallbackMessage = FALLBACK_MESSAGE) {
      if (code && Number.isInteger(code)) {
        const codeString = code.toString();
        if (hasKey(constants_1.errorValues, codeString)) {
          return constants_1.errorValues[codeString].message;
        }
        if (isJsonRpcServerError(code)) {
          return exports.JSON_RPC_SERVER_ERROR_MESSAGE;
        }
      }
      return fallbackMessage;
    }
    exports.getMessageFromCode = getMessageFromCode;
    function isValidCode(code) {
      if (!Number.isInteger(code)) {
        return false;
      }
      const codeString = code.toString();
      if (constants_1.errorValues[codeString]) {
        return true;
      }
      if (isJsonRpcServerError(code)) {
        return true;
      }
      return false;
    }
    exports.isValidCode = isValidCode;
    function getErrorCode(error) {
      var _a;
      if (typeof error === "number") {
        return error;
      } else if (isErrorWithCode(error)) {
        return (_a = error.code) !== null && _a !== void 0 ? _a : error.errorCode;
      }
      return void 0;
    }
    exports.getErrorCode = getErrorCode;
    function isErrorWithCode(error) {
      return typeof error === "object" && error !== null && (typeof error.code === "number" || typeof error.errorCode === "number");
    }
    function serialize(error, { shouldIncludeStack = false } = {}) {
      const serialized = {};
      if (error && typeof error === "object" && !Array.isArray(error) && hasKey(error, "code") && isValidCode(error.code)) {
        const _error = error;
        serialized.code = _error.code;
        if (_error.message && typeof _error.message === "string") {
          serialized.message = _error.message;
          if (hasKey(_error, "data")) {
            serialized.data = _error.data;
          }
        } else {
          serialized.message = getMessageFromCode(serialized.code);
          serialized.data = { originalError: assignOriginalError(error) };
        }
      } else {
        serialized.code = constants_1.standardErrorCodes.rpc.internal;
        serialized.message = hasStringProperty(error, "message") ? error.message : FALLBACK_MESSAGE;
        serialized.data = { originalError: assignOriginalError(error) };
      }
      if (shouldIncludeStack) {
        serialized.stack = hasStringProperty(error, "stack") ? error.stack : void 0;
      }
      return serialized;
    }
    exports.serialize = serialize;
    function isJsonRpcServerError(code) {
      return code >= -32099 && code <= -32e3;
    }
    function assignOriginalError(error) {
      if (error && typeof error === "object" && !Array.isArray(error)) {
        return Object.assign({}, error);
      }
      return error;
    }
    function hasKey(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
    function hasStringProperty(obj, prop) {
      return typeof obj === "object" && obj !== null && prop in obj && typeof obj[prop] === "string";
    }
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/error/errors.js
var require_errors = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/error/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.standardErrors = void 0;
    var constants_1 = require_constants2();
    var utils_1 = require_utils();
    exports.standardErrors = {
      rpc: {
        parse: (arg) => getEthJsonRpcError(constants_1.standardErrorCodes.rpc.parse, arg),
        invalidRequest: (arg) => getEthJsonRpcError(constants_1.standardErrorCodes.rpc.invalidRequest, arg),
        invalidParams: (arg) => getEthJsonRpcError(constants_1.standardErrorCodes.rpc.invalidParams, arg),
        methodNotFound: (arg) => getEthJsonRpcError(constants_1.standardErrorCodes.rpc.methodNotFound, arg),
        internal: (arg) => getEthJsonRpcError(constants_1.standardErrorCodes.rpc.internal, arg),
        server: (opts) => {
          if (!opts || typeof opts !== "object" || Array.isArray(opts)) {
            throw new Error("Ethereum RPC Server errors must provide single object argument.");
          }
          const { code } = opts;
          if (!Number.isInteger(code) || code > -32005 || code < -32099) {
            throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
          }
          return getEthJsonRpcError(code, opts);
        },
        invalidInput: (arg) => getEthJsonRpcError(constants_1.standardErrorCodes.rpc.invalidInput, arg),
        resourceNotFound: (arg) => getEthJsonRpcError(constants_1.standardErrorCodes.rpc.resourceNotFound, arg),
        resourceUnavailable: (arg) => getEthJsonRpcError(constants_1.standardErrorCodes.rpc.resourceUnavailable, arg),
        transactionRejected: (arg) => getEthJsonRpcError(constants_1.standardErrorCodes.rpc.transactionRejected, arg),
        methodNotSupported: (arg) => getEthJsonRpcError(constants_1.standardErrorCodes.rpc.methodNotSupported, arg),
        limitExceeded: (arg) => getEthJsonRpcError(constants_1.standardErrorCodes.rpc.limitExceeded, arg)
      },
      provider: {
        userRejectedRequest: (arg) => {
          return getEthProviderError(constants_1.standardErrorCodes.provider.userRejectedRequest, arg);
        },
        unauthorized: (arg) => {
          return getEthProviderError(constants_1.standardErrorCodes.provider.unauthorized, arg);
        },
        unsupportedMethod: (arg) => {
          return getEthProviderError(constants_1.standardErrorCodes.provider.unsupportedMethod, arg);
        },
        disconnected: (arg) => {
          return getEthProviderError(constants_1.standardErrorCodes.provider.disconnected, arg);
        },
        chainDisconnected: (arg) => {
          return getEthProviderError(constants_1.standardErrorCodes.provider.chainDisconnected, arg);
        },
        unsupportedChain: (arg) => {
          return getEthProviderError(constants_1.standardErrorCodes.provider.unsupportedChain, arg);
        },
        custom: (opts) => {
          if (!opts || typeof opts !== "object" || Array.isArray(opts)) {
            throw new Error("Ethereum Provider custom errors must provide single object argument.");
          }
          const { code, message, data } = opts;
          if (!message || typeof message !== "string") {
            throw new Error('"message" must be a nonempty string');
          }
          return new EthereumProviderError(code, message, data);
        }
      }
    };
    function getEthJsonRpcError(code, arg) {
      const [message, data] = parseOpts(arg);
      return new EthereumRpcError(code, message || (0, utils_1.getMessageFromCode)(code), data);
    }
    function getEthProviderError(code, arg) {
      const [message, data] = parseOpts(arg);
      return new EthereumProviderError(code, message || (0, utils_1.getMessageFromCode)(code), data);
    }
    function parseOpts(arg) {
      if (arg) {
        if (typeof arg === "string") {
          return [arg];
        } else if (typeof arg === "object" && !Array.isArray(arg)) {
          const { message, data } = arg;
          if (message && typeof message !== "string") {
            throw new Error("Must specify string message.");
          }
          return [message || void 0, data];
        }
      }
      return [];
    }
    var EthereumRpcError = class extends Error {
      constructor(code, message, data) {
        if (!Number.isInteger(code)) {
          throw new Error('"code" must be an integer.');
        }
        if (!message || typeof message !== "string") {
          throw new Error('"message" must be a nonempty string.');
        }
        super(message);
        this.code = code;
        if (data !== void 0) {
          this.data = data;
        }
      }
    };
    var EthereumProviderError = class extends EthereumRpcError {
      /**
       * Create an Ethereum Provider JSON-RPC error.
       * `code` must be an integer in the 1000 <= 4999 range.
       */
      constructor(code, message, data) {
        if (!isValidEthProviderCode(code)) {
          throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        }
        super(code, message, data);
      }
    };
    function isValidEthProviderCode(code) {
      return Number.isInteger(code) && code >= 1e3 && code <= 4999;
    }
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/type/Web3Response.js
var require_Web3Response = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/type/Web3Response.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isErrorResponse = void 0;
    function isErrorResponse(response) {
      return response.errorMessage !== void 0;
    }
    exports.isErrorResponse = isErrorResponse;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/version.js
var require_version = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LIB_VERSION = void 0;
    exports.LIB_VERSION = "3.9.3";
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/error/serialize.js
var require_serialize = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/error/serialize.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeError = void 0;
    var Web3Response_1 = require_Web3Response();
    var version_1 = require_version();
    var constants_1 = require_constants2();
    var utils_1 = require_utils();
    function serializeError(error, requestOrMethod) {
      const serialized = (0, utils_1.serialize)(getErrorObject(error), {
        shouldIncludeStack: true
      });
      const docUrl = new URL("https://docs.cloud.coinbase.com/wallet-sdk/docs/errors");
      docUrl.searchParams.set("version", version_1.LIB_VERSION);
      docUrl.searchParams.set("code", serialized.code.toString());
      const method = getMethod(serialized.data, requestOrMethod);
      if (method) {
        docUrl.searchParams.set("method", method);
      }
      docUrl.searchParams.set("message", serialized.message);
      return Object.assign(Object.assign({}, serialized), { docUrl: docUrl.href });
    }
    exports.serializeError = serializeError;
    function getErrorObject(error) {
      if (typeof error === "string") {
        return {
          message: error,
          code: constants_1.standardErrorCodes.rpc.internal
        };
      } else if ((0, Web3Response_1.isErrorResponse)(error)) {
        return Object.assign(Object.assign({}, error), { message: error.errorMessage, code: error.errorCode, data: { method: error.method } });
      }
      return error;
    }
    function getMethod(serializedData, request) {
      const methodInData = serializedData === null || serializedData === void 0 ? void 0 : serializedData.method;
      if (methodInData) {
        return methodInData;
      }
      if (request === void 0) {
        return void 0;
      } else if (typeof request === "string") {
        return request;
      } else if (!Array.isArray(request)) {
        return request.method;
      } else if (request.length > 0) {
        return request[0].method;
      }
      return void 0;
    }
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/error/index.js
var require_error = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/error/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.standardErrors = exports.standardErrorCodes = exports.serializeError = exports.getMessageFromCode = exports.getErrorCode = void 0;
    var constants_1 = require_constants2();
    Object.defineProperty(exports, "standardErrorCodes", { enumerable: true, get: function() {
      return constants_1.standardErrorCodes;
    } });
    var errors_1 = require_errors();
    Object.defineProperty(exports, "standardErrors", { enumerable: true, get: function() {
      return errors_1.standardErrors;
    } });
    var serialize_1 = require_serialize();
    Object.defineProperty(exports, "serializeError", { enumerable: true, get: function() {
      return serialize_1.serializeError;
    } });
    var utils_1 = require_utils();
    Object.defineProperty(exports, "getErrorCode", { enumerable: true, get: function() {
      return utils_1.getErrorCode;
    } });
    Object.defineProperty(exports, "getMessageFromCode", { enumerable: true, get: function() {
      return utils_1.getMessageFromCode;
    } });
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/type.js
var require_type = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProviderType = exports.RegExpString = exports.IntNumber = exports.BigIntString = exports.AddressString = exports.HexString = exports.OpaqueType = void 0;
    function OpaqueType() {
      return (value) => value;
    }
    exports.OpaqueType = OpaqueType;
    exports.HexString = OpaqueType();
    exports.AddressString = OpaqueType();
    exports.BigIntString = OpaqueType();
    function IntNumber(num) {
      return Math.floor(num);
    }
    exports.IntNumber = IntNumber;
    exports.RegExpString = OpaqueType();
    var ProviderType;
    (function(ProviderType2) {
      ProviderType2["CoinbaseWallet"] = "CoinbaseWallet";
      ProviderType2["MetaMask"] = "MetaMask";
      ProviderType2["Unselected"] = "";
    })(ProviderType || (exports.ProviderType = ProviderType = {}));
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/util.js
var require_util = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/core/util.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isMobileWeb = exports.getLocation = exports.isInIFrame = exports.createQrUrl = exports.getFavicon = exports.range = exports.isBigNumber = exports.ensureParsedJSONObject = exports.ensureBN = exports.ensureRegExpString = exports.ensureIntNumber = exports.ensureBuffer = exports.ensureAddressString = exports.ensureEvenLengthHexString = exports.ensureHexString = exports.isHexString = exports.prepend0x = exports.strip0x = exports.has0xPrefix = exports.hexStringFromIntNumber = exports.intNumberFromHexString = exports.bigIntStringFromBN = exports.hexStringFromBuffer = exports.hexStringToUint8Array = exports.uint8ArrayToHex = exports.randomBytesHex = void 0;
    var bn_js_1 = __importDefault(require_bn());
    var error_1 = require_error();
    var type_1 = require_type();
    var INT_STRING_REGEX = /^[0-9]*$/;
    var HEXADECIMAL_STRING_REGEX = /^[a-f0-9]*$/;
    function randomBytesHex(length) {
      return uint8ArrayToHex(crypto.getRandomValues(new Uint8Array(length)));
    }
    exports.randomBytesHex = randomBytesHex;
    function uint8ArrayToHex(value) {
      return [...value].map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    exports.uint8ArrayToHex = uint8ArrayToHex;
    function hexStringToUint8Array(hexString) {
      return new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
    }
    exports.hexStringToUint8Array = hexStringToUint8Array;
    function hexStringFromBuffer(buf, includePrefix = false) {
      const hex = buf.toString("hex");
      return (0, type_1.HexString)(includePrefix ? `0x${hex}` : hex);
    }
    exports.hexStringFromBuffer = hexStringFromBuffer;
    function bigIntStringFromBN(bn) {
      return (0, type_1.BigIntString)(bn.toString(10));
    }
    exports.bigIntStringFromBN = bigIntStringFromBN;
    function intNumberFromHexString(hex) {
      return (0, type_1.IntNumber)(new bn_js_1.default(ensureEvenLengthHexString(hex, false), 16).toNumber());
    }
    exports.intNumberFromHexString = intNumberFromHexString;
    function hexStringFromIntNumber(num) {
      return (0, type_1.HexString)(`0x${new bn_js_1.default(num).toString(16)}`);
    }
    exports.hexStringFromIntNumber = hexStringFromIntNumber;
    function has0xPrefix(str) {
      return str.startsWith("0x") || str.startsWith("0X");
    }
    exports.has0xPrefix = has0xPrefix;
    function strip0x(hex) {
      if (has0xPrefix(hex)) {
        return hex.slice(2);
      }
      return hex;
    }
    exports.strip0x = strip0x;
    function prepend0x(hex) {
      if (has0xPrefix(hex)) {
        return `0x${hex.slice(2)}`;
      }
      return `0x${hex}`;
    }
    exports.prepend0x = prepend0x;
    function isHexString(hex) {
      if (typeof hex !== "string") {
        return false;
      }
      const s = strip0x(hex).toLowerCase();
      return HEXADECIMAL_STRING_REGEX.test(s);
    }
    exports.isHexString = isHexString;
    function ensureHexString(hex, includePrefix = false) {
      if (typeof hex === "string") {
        const s = strip0x(hex).toLowerCase();
        if (HEXADECIMAL_STRING_REGEX.test(s)) {
          return (0, type_1.HexString)(includePrefix ? `0x${s}` : s);
        }
      }
      throw error_1.standardErrors.rpc.invalidParams(`"${String(hex)}" is not a hexadecimal string`);
    }
    exports.ensureHexString = ensureHexString;
    function ensureEvenLengthHexString(hex, includePrefix = false) {
      let h = ensureHexString(hex, false);
      if (h.length % 2 === 1) {
        h = (0, type_1.HexString)(`0${h}`);
      }
      return includePrefix ? (0, type_1.HexString)(`0x${h}`) : h;
    }
    exports.ensureEvenLengthHexString = ensureEvenLengthHexString;
    function ensureAddressString(str) {
      if (typeof str === "string") {
        const s = strip0x(str).toLowerCase();
        if (isHexString(s) && s.length === 40) {
          return (0, type_1.AddressString)(prepend0x(s));
        }
      }
      throw error_1.standardErrors.rpc.invalidParams(`Invalid Ethereum address: ${String(str)}`);
    }
    exports.ensureAddressString = ensureAddressString;
    function ensureBuffer(str) {
      if (Buffer.isBuffer(str)) {
        return str;
      }
      if (typeof str === "string") {
        if (isHexString(str)) {
          const s = ensureEvenLengthHexString(str, false);
          return Buffer.from(s, "hex");
        }
        return Buffer.from(str, "utf8");
      }
      throw error_1.standardErrors.rpc.invalidParams(`Not binary data: ${String(str)}`);
    }
    exports.ensureBuffer = ensureBuffer;
    function ensureIntNumber(num) {
      if (typeof num === "number" && Number.isInteger(num)) {
        return (0, type_1.IntNumber)(num);
      }
      if (typeof num === "string") {
        if (INT_STRING_REGEX.test(num)) {
          return (0, type_1.IntNumber)(Number(num));
        }
        if (isHexString(num)) {
          return (0, type_1.IntNumber)(new bn_js_1.default(ensureEvenLengthHexString(num, false), 16).toNumber());
        }
      }
      throw error_1.standardErrors.rpc.invalidParams(`Not an integer: ${String(num)}`);
    }
    exports.ensureIntNumber = ensureIntNumber;
    function ensureRegExpString(regExp) {
      if (regExp instanceof RegExp) {
        return (0, type_1.RegExpString)(regExp.toString());
      }
      throw error_1.standardErrors.rpc.invalidParams(`Not a RegExp: ${String(regExp)}`);
    }
    exports.ensureRegExpString = ensureRegExpString;
    function ensureBN(val) {
      if (val !== null && (bn_js_1.default.isBN(val) || isBigNumber(val))) {
        return new bn_js_1.default(val.toString(10), 10);
      }
      if (typeof val === "number") {
        return new bn_js_1.default(ensureIntNumber(val));
      }
      if (typeof val === "string") {
        if (INT_STRING_REGEX.test(val)) {
          return new bn_js_1.default(val, 10);
        }
        if (isHexString(val)) {
          return new bn_js_1.default(ensureEvenLengthHexString(val, false), 16);
        }
      }
      throw error_1.standardErrors.rpc.invalidParams(`Not an integer: ${String(val)}`);
    }
    exports.ensureBN = ensureBN;
    function ensureParsedJSONObject(val) {
      if (typeof val === "string") {
        return JSON.parse(val);
      }
      if (typeof val === "object") {
        return val;
      }
      throw error_1.standardErrors.rpc.invalidParams(`Not a JSON string or an object: ${String(val)}`);
    }
    exports.ensureParsedJSONObject = ensureParsedJSONObject;
    function isBigNumber(val) {
      if (val == null || typeof val.constructor !== "function") {
        return false;
      }
      const { constructor } = val;
      return typeof constructor.config === "function" && typeof constructor.EUCLID === "number";
    }
    exports.isBigNumber = isBigNumber;
    function range(start, stop) {
      return Array.from({ length: stop - start }, (_, i) => start + i);
    }
    exports.range = range;
    function getFavicon() {
      const el = document.querySelector('link[sizes="192x192"]') || document.querySelector('link[sizes="180x180"]') || document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
      const { protocol, host } = document.location;
      const href = el ? el.getAttribute("href") : null;
      if (!href || href.startsWith("javascript:") || href.startsWith("vbscript:")) {
        return null;
      }
      if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("data:")) {
        return href;
      }
      if (href.startsWith("//")) {
        return protocol + href;
      }
      return `${protocol}//${host}${href}`;
    }
    exports.getFavicon = getFavicon;
    function createQrUrl(sessionId, sessionSecret, serverUrl, isParentConnection, version, chainId) {
      const sessionIdKey = isParentConnection ? "parent-id" : "id";
      const query = new URLSearchParams({
        [sessionIdKey]: sessionId,
        secret: sessionSecret,
        server: serverUrl,
        v: version,
        chainId: chainId.toString()
      }).toString();
      const qrUrl = `${serverUrl}/#/link?${query}`;
      return qrUrl;
    }
    exports.createQrUrl = createQrUrl;
    function isInIFrame() {
      try {
        return window.frameElement !== null;
      } catch (e) {
        return false;
      }
    }
    exports.isInIFrame = isInIFrame;
    function getLocation() {
      try {
        if (isInIFrame() && window.top) {
          return window.top.location;
        }
        return window.location;
      } catch (e) {
        return window.location;
      }
    }
    exports.getLocation = getLocation;
    function isMobileWeb() {
      var _a;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent);
    }
    exports.isMobileWeb = isMobileWeb;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/lib/ScopedLocalStorage.js
var require_ScopedLocalStorage = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/lib/ScopedLocalStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScopedLocalStorage = void 0;
    var ScopedLocalStorage = class {
      // eslint-disable-next-line no-useless-constructor
      constructor(scope) {
        this.scope = scope;
      }
      setItem(key, value) {
        localStorage.setItem(this.scopedKey(key), value);
      }
      getItem(key) {
        return localStorage.getItem(this.scopedKey(key));
      }
      removeItem(key) {
        localStorage.removeItem(this.scopedKey(key));
      }
      clear() {
        const prefix = this.scopedKey("");
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (typeof key === "string" && key.startsWith(prefix)) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
      }
      scopedKey(key) {
        return `${this.scope}:${key}`;
      }
    };
    exports.ScopedLocalStorage = ScopedLocalStorage;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/provider/DiagnosticLogger.js
var require_DiagnosticLogger = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/provider/DiagnosticLogger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EVENTS = void 0;
    exports.EVENTS = {
      STARTED_CONNECTING: "walletlink_sdk.started.connecting",
      CONNECTED_STATE_CHANGE: "walletlink_sdk.connected",
      DISCONNECTED: "walletlink_sdk.disconnected",
      METADATA_DESTROYED: "walletlink_sdk_metadata_destroyed",
      LINKED: "walletlink_sdk.linked",
      FAILURE: "walletlink_sdk.generic_failure",
      SESSION_CONFIG_RECEIVED: "walletlink_sdk.session_config_event_received",
      ETH_ACCOUNTS_STATE: "walletlink_sdk.eth_accounts_state",
      SESSION_STATE_CHANGE: "walletlink_sdk.session_state_change",
      UNLINKED_ERROR_STATE: "walletlink_sdk.unlinked_error_state",
      SKIPPED_CLEARING_SESSION: "walletlink_sdk.skipped_clearing_session",
      GENERAL_ERROR: "walletlink_sdk.general_error",
      WEB3_REQUEST: "walletlink_sdk.web3.request",
      WEB3_REQUEST_PUBLISHED: "walletlink_sdk.web3.request_published",
      WEB3_RESPONSE: "walletlink_sdk.web3.response",
      METHOD_NOT_IMPLEMENTED: "walletlink_sdk.method_not_implemented",
      UNKNOWN_ADDRESS_ENCOUNTERED: "walletlink_sdk.unknown_address_encountered"
    };
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/RelayAbstract.js
var require_RelayAbstract = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/RelayAbstract.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RelayAbstract = exports.APP_VERSION_KEY = exports.LOCAL_STORAGE_ADDRESSES_KEY = exports.WALLET_USER_NAME_KEY = void 0;
    var error_1 = require_error();
    exports.WALLET_USER_NAME_KEY = "walletUsername";
    exports.LOCAL_STORAGE_ADDRESSES_KEY = "Addresses";
    exports.APP_VERSION_KEY = "AppVersion";
    var RelayAbstract = class {
      async makeEthereumJSONRPCRequest(request, jsonRpcUrl) {
        if (!jsonRpcUrl)
          throw new Error("Error: No jsonRpcUrl provided");
        return window.fetch(jsonRpcUrl, {
          method: "POST",
          body: JSON.stringify(request),
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        }).then((res) => res.json()).then((json) => {
          if (!json) {
            throw error_1.standardErrors.rpc.parse({});
          }
          const response = json;
          const { error } = response;
          if (error) {
            throw (0, error_1.serializeError)(error, request.method);
          }
          return response;
        });
      }
    };
    exports.RelayAbstract = RelayAbstract;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/Session.js
var require_Session = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/Session.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Session = void 0;
    var sha_js_1 = require_sha();
    var util_1 = require_util();
    var STORAGE_KEY_SESSION_ID = "session:id";
    var STORAGE_KEY_SESSION_SECRET = "session:secret";
    var STORAGE_KEY_SESSION_LINKED = "session:linked";
    var Session = class _Session {
      constructor(storage, id, secret, linked) {
        this._storage = storage;
        this._id = id || (0, util_1.randomBytesHex)(16);
        this._secret = secret || (0, util_1.randomBytesHex)(32);
        this._key = new sha_js_1.sha256().update(`${this._id}, ${this._secret} WalletLink`).digest("hex");
        this._linked = !!linked;
      }
      static load(storage) {
        const id = storage.getItem(STORAGE_KEY_SESSION_ID);
        const linked = storage.getItem(STORAGE_KEY_SESSION_LINKED);
        const secret = storage.getItem(STORAGE_KEY_SESSION_SECRET);
        if (id && secret) {
          return new _Session(storage, id, secret, linked === "1");
        }
        return null;
      }
      /**
       * Takes in a session ID and returns the sha256 hash of it.
       * @param sessionId session ID
       */
      static hash(sessionId) {
        return new sha_js_1.sha256().update(sessionId).digest("hex");
      }
      get id() {
        return this._id;
      }
      get secret() {
        return this._secret;
      }
      get key() {
        return this._key;
      }
      get linked() {
        return this._linked;
      }
      set linked(val) {
        this._linked = val;
        this.persistLinked();
      }
      save() {
        this._storage.setItem(STORAGE_KEY_SESSION_ID, this._id);
        this._storage.setItem(STORAGE_KEY_SESSION_SECRET, this._secret);
        this.persistLinked();
        return this;
      }
      persistLinked() {
        this._storage.setItem(STORAGE_KEY_SESSION_LINKED, this._linked ? "1" : "0");
      }
    };
    exports.Session = Session;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/lib/Cipher.js
var require_Cipher = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/lib/Cipher.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cipher = void 0;
    var util_1 = require_util();
    var Cipher = class {
      // @param secret hex representation of 32-byte secret
      constructor(secret) {
        this.secret = secret;
      }
      /**
       *
       * @param plainText string to be encrypted
       * returns hex string representation of bytes in the order: initialization vector (iv),
       * auth tag, encrypted plaintext. IV is 12 bytes. Auth tag is 16 bytes. Remaining bytes are the
       * encrypted plainText.
       */
      async encrypt(plainText) {
        const secret = this.secret;
        if (secret.length !== 64)
          throw Error(`secret must be 256 bits`);
        const ivBytes = crypto.getRandomValues(new Uint8Array(12));
        const secretKey = await crypto.subtle.importKey("raw", (0, util_1.hexStringToUint8Array)(secret), { name: "aes-gcm" }, false, ["encrypt", "decrypt"]);
        const enc = new TextEncoder();
        const encryptedResult = await window.crypto.subtle.encrypt({
          name: "AES-GCM",
          iv: ivBytes
        }, secretKey, enc.encode(plainText));
        const tagLength = 16;
        const authTag = encryptedResult.slice(encryptedResult.byteLength - tagLength);
        const encryptedPlaintext = encryptedResult.slice(0, encryptedResult.byteLength - tagLength);
        const authTagBytes = new Uint8Array(authTag);
        const encryptedPlaintextBytes = new Uint8Array(encryptedPlaintext);
        const concatted = new Uint8Array([...ivBytes, ...authTagBytes, ...encryptedPlaintextBytes]);
        return (0, util_1.uint8ArrayToHex)(concatted);
      }
      /**
       *
       * @param cipherText hex string representation of bytes in the order: initialization vector (iv),
       * auth tag, encrypted plaintext. IV is 12 bytes. Auth tag is 16 bytes.
       */
      async decrypt(cipherText) {
        const secret = this.secret;
        if (secret.length !== 64)
          throw Error(`secret must be 256 bits`);
        return new Promise((resolve, reject) => {
          void async function() {
            const secretKey = await crypto.subtle.importKey("raw", (0, util_1.hexStringToUint8Array)(secret), { name: "aes-gcm" }, false, ["encrypt", "decrypt"]);
            const encrypted = (0, util_1.hexStringToUint8Array)(cipherText);
            const ivBytes = encrypted.slice(0, 12);
            const authTagBytes = encrypted.slice(12, 28);
            const encryptedPlaintextBytes = encrypted.slice(28);
            const concattedBytes = new Uint8Array([...encryptedPlaintextBytes, ...authTagBytes]);
            const algo = {
              name: "AES-GCM",
              iv: new Uint8Array(ivBytes)
            };
            try {
              const decrypted = await window.crypto.subtle.decrypt(algo, secretKey, concattedBytes);
              const decoder = new TextDecoder();
              resolve(decoder.decode(decrypted));
            } catch (err) {
              reject(err);
            }
          }();
        });
      }
    };
    exports.Cipher = Cipher;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/connection/WalletLinkHTTP.js
var require_WalletLinkHTTP = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/connection/WalletLinkHTTP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WalletLinkHTTP = void 0;
    var WalletLinkHTTP = class {
      constructor(linkAPIUrl, sessionId, sessionKey) {
        this.linkAPIUrl = linkAPIUrl;
        this.sessionId = sessionId;
        const credentials = `${sessionId}:${sessionKey}`;
        this.auth = `Basic ${btoa(credentials)}`;
      }
      // mark unseen events as seen
      async markUnseenEventsAsSeen(events) {
        return Promise.all(events.map((e) => fetch(`${this.linkAPIUrl}/events/${e.eventId}/seen`, {
          method: "POST",
          headers: {
            Authorization: this.auth
          }
        }))).catch((error) => console.error("Unabled to mark event as failed:", error));
      }
      async fetchUnseenEvents() {
        var _a;
        const response = await fetch(`${this.linkAPIUrl}/events?unseen=true`, {
          headers: {
            Authorization: this.auth
          }
        });
        if (response.ok) {
          const { events, error } = await response.json();
          if (error) {
            throw new Error(`Check unseen events failed: ${error}`);
          }
          const responseEvents = (_a = events === null || events === void 0 ? void 0 : events.filter((e) => e.event === "Web3Response").map((e) => ({
            type: "Event",
            sessionId: this.sessionId,
            eventId: e.id,
            event: e.event,
            data: e.data
          }))) !== null && _a !== void 0 ? _a : [];
          this.markUnseenEventsAsSeen(responseEvents);
          return responseEvents;
        }
        throw new Error(`Check unseen events failed: ${response.status}`);
      }
    };
    exports.WalletLinkHTTP = WalletLinkHTTP;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/connection/WalletLinkWebSocket.js
var require_WalletLinkWebSocket = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/connection/WalletLinkWebSocket.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WalletLinkWebSocket = exports.ConnectionState = void 0;
    var ConnectionState;
    (function(ConnectionState2) {
      ConnectionState2[ConnectionState2["DISCONNECTED"] = 0] = "DISCONNECTED";
      ConnectionState2[ConnectionState2["CONNECTING"] = 1] = "CONNECTING";
      ConnectionState2[ConnectionState2["CONNECTED"] = 2] = "CONNECTED";
    })(ConnectionState || (exports.ConnectionState = ConnectionState = {}));
    var WalletLinkWebSocket = class {
      setConnectionStateListener(listener) {
        this.connectionStateListener = listener;
      }
      setIncomingDataListener(listener) {
        this.incomingDataListener = listener;
      }
      /**
       * Constructor
       * @param url WebSocket server URL
       * @param [WebSocketClass] Custom WebSocket implementation
       */
      constructor(url, WebSocketClass = WebSocket) {
        this.WebSocketClass = WebSocketClass;
        this.webSocket = null;
        this.pendingData = [];
        this.url = url.replace(/^http/, "ws");
      }
      /**
       * Make a websocket connection
       * @returns a Promise that resolves when connected
       */
      async connect() {
        if (this.webSocket) {
          throw new Error("webSocket object is not null");
        }
        return new Promise((resolve, reject) => {
          var _a;
          let webSocket;
          try {
            this.webSocket = webSocket = new this.WebSocketClass(this.url);
          } catch (err) {
            reject(err);
            return;
          }
          (_a = this.connectionStateListener) === null || _a === void 0 ? void 0 : _a.call(this, ConnectionState.CONNECTING);
          webSocket.onclose = (evt) => {
            var _a2;
            this.clearWebSocket();
            reject(new Error(`websocket error ${evt.code}: ${evt.reason}`));
            (_a2 = this.connectionStateListener) === null || _a2 === void 0 ? void 0 : _a2.call(this, ConnectionState.DISCONNECTED);
          };
          webSocket.onopen = (_) => {
            var _a2;
            resolve();
            (_a2 = this.connectionStateListener) === null || _a2 === void 0 ? void 0 : _a2.call(this, ConnectionState.CONNECTED);
            if (this.pendingData.length > 0) {
              const pending = [...this.pendingData];
              pending.forEach((data) => this.sendData(data));
              this.pendingData = [];
            }
          };
          webSocket.onmessage = (evt) => {
            var _a2, _b;
            if (evt.data === "h") {
              (_a2 = this.incomingDataListener) === null || _a2 === void 0 ? void 0 : _a2.call(this, {
                type: "Heartbeat"
              });
            } else {
              try {
                const message = JSON.parse(evt.data);
                (_b = this.incomingDataListener) === null || _b === void 0 ? void 0 : _b.call(this, message);
              } catch (_c) {
              }
            }
          };
        });
      }
      /**
       * Disconnect from server
       */
      disconnect() {
        var _a;
        const { webSocket } = this;
        if (!webSocket) {
          return;
        }
        this.clearWebSocket();
        (_a = this.connectionStateListener) === null || _a === void 0 ? void 0 : _a.call(this, ConnectionState.DISCONNECTED);
        this.connectionStateListener = void 0;
        this.incomingDataListener = void 0;
        try {
          webSocket.close();
        } catch (_b) {
        }
      }
      /**
       * Send data to server
       * @param data text to send
       */
      sendData(data) {
        const { webSocket } = this;
        if (!webSocket) {
          this.pendingData.push(data);
          this.connect();
          return;
        }
        webSocket.send(data);
      }
      clearWebSocket() {
        const { webSocket } = this;
        if (!webSocket) {
          return;
        }
        this.webSocket = null;
        webSocket.onclose = null;
        webSocket.onerror = null;
        webSocket.onmessage = null;
        webSocket.onopen = null;
      }
    };
    exports.WalletLinkWebSocket = WalletLinkWebSocket;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/connection/WalletLinkConnection.js
var require_WalletLinkConnection = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/connection/WalletLinkConnection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WalletLinkConnection = void 0;
    var type_1 = require_type();
    var Cipher_1 = require_Cipher();
    var DiagnosticLogger_1 = require_DiagnosticLogger();
    var RelayAbstract_1 = require_RelayAbstract();
    var Session_1 = require_Session();
    var WalletLinkHTTP_1 = require_WalletLinkHTTP();
    var WalletLinkWebSocket_1 = require_WalletLinkWebSocket();
    var HEARTBEAT_INTERVAL = 1e4;
    var REQUEST_TIMEOUT = 6e4;
    var WalletLinkConnection = class {
      /**
       * Constructor
       * @param session Session
       * @param linkAPIUrl Coinbase Wallet link server URL
       * @param listener WalletLinkConnectionUpdateListener
       * @param [WebSocketClass] Custom WebSocket implementation
       */
      constructor({ session, linkAPIUrl, listener, diagnostic, WebSocketClass = WebSocket }) {
        this.destroyed = false;
        this.lastHeartbeatResponse = 0;
        this.nextReqId = (0, type_1.IntNumber)(1);
        this._connected = false;
        this._linked = false;
        this.shouldFetchUnseenEventsOnConnect = false;
        this.requestResolutions = /* @__PURE__ */ new Map();
        this.handleSessionMetadataUpdated = (metadata) => {
          if (!metadata)
            return;
          const handlers = /* @__PURE__ */ new Map([
            ["__destroyed", this.handleDestroyed],
            ["EthereumAddress", this.handleAccountUpdated],
            ["WalletUsername", this.handleWalletUsernameUpdated],
            ["AppVersion", this.handleAppVersionUpdated],
            [
              "ChainId",
              (v) => metadata.JsonRpcUrl && this.handleChainUpdated(v, metadata.JsonRpcUrl)
            ]
          ]);
          handlers.forEach((handler, key) => {
            const value = metadata[key];
            if (value === void 0)
              return;
            handler(value);
          });
        };
        this.handleDestroyed = (__destroyed) => {
          var _a, _b;
          if (__destroyed !== "1")
            return;
          (_a = this.listener) === null || _a === void 0 ? void 0 : _a.resetAndReload();
          (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.METADATA_DESTROYED, {
            alreadyDestroyed: this.isDestroyed,
            sessionIdHash: Session_1.Session.hash(this.session.id)
          });
        };
        this.handleAccountUpdated = async (encryptedEthereumAddress) => {
          var _a, _b;
          try {
            const address = await this.cipher.decrypt(encryptedEthereumAddress);
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.accountUpdated(address);
          } catch (_c) {
            (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
              message: "Had error decrypting",
              value: "selectedAddress"
            });
          }
        };
        this.handleMetadataUpdated = async (key, encryptedMetadataValue) => {
          var _a, _b;
          try {
            const decryptedValue = await this.cipher.decrypt(encryptedMetadataValue);
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.metadataUpdated(key, decryptedValue);
          } catch (_c) {
            (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
              message: "Had error decrypting",
              value: key
            });
          }
        };
        this.handleWalletUsernameUpdated = async (walletUsername) => {
          this.handleMetadataUpdated(RelayAbstract_1.WALLET_USER_NAME_KEY, walletUsername);
        };
        this.handleAppVersionUpdated = async (appVersion) => {
          this.handleMetadataUpdated(RelayAbstract_1.APP_VERSION_KEY, appVersion);
        };
        this.handleChainUpdated = async (encryptedChainId, encryptedJsonRpcUrl) => {
          var _a, _b;
          try {
            const chainId = await this.cipher.decrypt(encryptedChainId);
            const jsonRpcUrl = await this.cipher.decrypt(encryptedJsonRpcUrl);
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.chainUpdated(chainId, jsonRpcUrl);
          } catch (_c) {
            (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
              message: "Had error decrypting",
              value: "chainId|jsonRpcUrl"
            });
          }
        };
        this.session = session;
        this.cipher = new Cipher_1.Cipher(session.secret);
        this.diagnostic = diagnostic;
        this.listener = listener;
        const ws = new WalletLinkWebSocket_1.WalletLinkWebSocket(`${linkAPIUrl}/rpc`, WebSocketClass);
        ws.setConnectionStateListener(async (state) => {
          var _a;
          (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.CONNECTED_STATE_CHANGE, {
            state,
            sessionIdHash: Session_1.Session.hash(session.id)
          });
          let connected = false;
          switch (state) {
            case WalletLinkWebSocket_1.ConnectionState.DISCONNECTED:
              if (!this.destroyed) {
                const connect = async () => {
                  await new Promise((resolve) => setTimeout(resolve, 5e3));
                  if (!this.destroyed) {
                    ws.connect().catch(() => {
                      connect();
                    });
                  }
                };
                connect();
              }
              break;
            case WalletLinkWebSocket_1.ConnectionState.CONNECTED:
              try {
                await this.authenticate();
                this.sendIsLinked();
                this.sendGetSessionConfig();
                connected = true;
              } catch (_b) {
              }
              this.updateLastHeartbeat();
              setInterval(() => {
                this.heartbeat();
              }, HEARTBEAT_INTERVAL);
              if (this.shouldFetchUnseenEventsOnConnect) {
                this.fetchUnseenEventsAPI();
              }
              break;
            case WalletLinkWebSocket_1.ConnectionState.CONNECTING:
              break;
          }
          if (this.connected !== connected) {
            this.connected = connected;
          }
        });
        ws.setIncomingDataListener((m) => {
          var _a, _b, _c;
          switch (m.type) {
            case "Heartbeat":
              this.updateLastHeartbeat();
              return;
            case "IsLinkedOK":
            case "Linked": {
              const linked = m.type === "IsLinkedOK" ? m.linked : void 0;
              (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.LINKED, {
                sessionIdHash: Session_1.Session.hash(session.id),
                linked,
                type: m.type,
                onlineGuests: m.onlineGuests
              });
              this.linked = linked || m.onlineGuests > 0;
              break;
            }
            case "GetSessionConfigOK":
            case "SessionConfigUpdated": {
              (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.SESSION_CONFIG_RECEIVED, {
                sessionIdHash: Session_1.Session.hash(session.id),
                metadata_keys: m && m.metadata ? Object.keys(m.metadata) : void 0
              });
              this.handleSessionMetadataUpdated(m.metadata);
              break;
            }
            case "Event": {
              this.handleIncomingEvent(m);
              break;
            }
          }
          if (m.id !== void 0) {
            (_c = this.requestResolutions.get(m.id)) === null || _c === void 0 ? void 0 : _c(m);
          }
        });
        this.ws = ws;
        this.http = new WalletLinkHTTP_1.WalletLinkHTTP(linkAPIUrl, session.id, session.key);
      }
      /**
       * Make a connection to the server
       */
      connect() {
        var _a;
        if (this.destroyed) {
          throw new Error("instance is destroyed");
        }
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.STARTED_CONNECTING, {
          sessionIdHash: Session_1.Session.hash(this.session.id)
        });
        this.ws.connect();
      }
      /**
       * Terminate connection, and mark as destroyed. To reconnect, create a new
       * instance of WalletSDKConnection
       */
      destroy() {
        var _a;
        this.destroyed = true;
        this.ws.disconnect();
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.DISCONNECTED, {
          sessionIdHash: Session_1.Session.hash(this.session.id)
        });
        this.listener = void 0;
      }
      get isDestroyed() {
        return this.destroyed;
      }
      get connected() {
        return this._connected;
      }
      set connected(connected) {
        var _a, _b;
        this._connected = connected;
        if (connected)
          (_a = this.onceConnected) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.listener) === null || _b === void 0 ? void 0 : _b.connectedUpdated(connected);
      }
      setOnceConnected(callback) {
        return new Promise((resolve) => {
          if (this.connected) {
            callback().then(resolve);
          } else {
            this.onceConnected = () => {
              callback().then(resolve);
              this.onceConnected = void 0;
            };
          }
        });
      }
      get linked() {
        return this._linked;
      }
      set linked(linked) {
        var _a, _b;
        this._linked = linked;
        if (linked)
          (_a = this.onceLinked) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.listener) === null || _b === void 0 ? void 0 : _b.linkedUpdated(linked);
      }
      setOnceLinked(callback) {
        return new Promise((resolve) => {
          if (this.linked) {
            callback().then(resolve);
          } else {
            this.onceLinked = () => {
              callback().then(resolve);
              this.onceLinked = void 0;
            };
          }
        });
      }
      async handleIncomingEvent(m) {
        var _a, _b;
        if (m.type !== "Event" || m.event !== "Web3Response") {
          return;
        }
        try {
          const decryptedData = await this.cipher.decrypt(m.data);
          const message = JSON.parse(decryptedData);
          if (message.type !== "WEB3_RESPONSE")
            return;
          (_a = this.listener) === null || _a === void 0 ? void 0 : _a.handleWeb3ResponseMessage(message);
        } catch (_c) {
          (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.GENERAL_ERROR, {
            message: "Had error decrypting",
            value: "incomingEvent"
          });
        }
      }
      async checkUnseenEvents() {
        if (!this.connected) {
          this.shouldFetchUnseenEventsOnConnect = true;
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
        try {
          await this.fetchUnseenEventsAPI();
        } catch (e) {
          console.error("Unable to check for unseen events", e);
        }
      }
      async fetchUnseenEventsAPI() {
        this.shouldFetchUnseenEventsOnConnect = false;
        const responseEvents = await this.http.fetchUnseenEvents();
        responseEvents.forEach((e) => this.handleIncomingEvent(e));
      }
      /**
       * Set session metadata in SessionConfig object
       * @param key
       * @param value
       * @returns a Promise that completes when successful
       */
      async setSessionMetadata(key, value) {
        const message = {
          type: "SetSessionConfig",
          id: (0, type_1.IntNumber)(this.nextReqId++),
          sessionId: this.session.id,
          metadata: { [key]: value }
        };
        return this.setOnceConnected(async () => {
          const res = await this.makeRequest(message);
          if (res.type === "Fail") {
            throw new Error(res.error || "failed to set session metadata");
          }
        });
      }
      /**
       * Publish an event and emit event ID when successful
       * @param event event name
       * @param unencryptedData unencrypted event data
       * @param callWebhook whether the webhook should be invoked
       * @returns a Promise that emits event ID when successful
       */
      async publishEvent(event, unencryptedData, callWebhook = false) {
        const data = await this.cipher.encrypt(JSON.stringify(Object.assign(Object.assign({}, unencryptedData), { origin: location.origin, relaySource: window.coinbaseWalletExtension ? "injected_sdk" : "sdk" })));
        const message = {
          type: "PublishEvent",
          id: (0, type_1.IntNumber)(this.nextReqId++),
          sessionId: this.session.id,
          event,
          data,
          callWebhook
        };
        return this.setOnceLinked(async () => {
          const res = await this.makeRequest(message);
          if (res.type === "Fail") {
            throw new Error(res.error || "failed to publish event");
          }
          return res.eventId;
        });
      }
      sendData(message) {
        this.ws.sendData(JSON.stringify(message));
      }
      updateLastHeartbeat() {
        this.lastHeartbeatResponse = Date.now();
      }
      heartbeat() {
        if (Date.now() - this.lastHeartbeatResponse > HEARTBEAT_INTERVAL * 2) {
          this.ws.disconnect();
          return;
        }
        try {
          this.ws.sendData("h");
        } catch (_a) {
        }
      }
      async makeRequest(message, timeout = REQUEST_TIMEOUT) {
        const reqId = message.id;
        this.sendData(message);
        let timeoutId;
        return Promise.race([
          new Promise((_, reject) => {
            timeoutId = window.setTimeout(() => {
              reject(new Error(`request ${reqId} timed out`));
            }, timeout);
          }),
          new Promise((resolve) => {
            this.requestResolutions.set(reqId, (m) => {
              clearTimeout(timeoutId);
              resolve(m);
              this.requestResolutions.delete(reqId);
            });
          })
        ]);
      }
      async authenticate() {
        const m = {
          type: "HostSession",
          id: (0, type_1.IntNumber)(this.nextReqId++),
          sessionId: this.session.id,
          sessionKey: this.session.key
        };
        const res = await this.makeRequest(m);
        if (res.type === "Fail") {
          throw new Error(res.error || "failed to authentcate");
        }
      }
      sendIsLinked() {
        const m = {
          type: "IsLinked",
          id: (0, type_1.IntNumber)(this.nextReqId++),
          sessionId: this.session.id
        };
        this.sendData(m);
      }
      sendGetSessionConfig() {
        const m = {
          type: "GetSessionConfig",
          id: (0, type_1.IntNumber)(this.nextReqId++),
          sessionId: this.session.id
        };
        this.sendData(m);
      }
    };
    exports.WalletLinkConnection = WalletLinkConnection;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/lib/cssReset-css.js
var require_cssReset_css = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/lib/cssReset-css.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = /* @__PURE__ */ (() => `@namespace svg "http://www.w3.org/2000/svg";.-cbwsdk-css-reset,.-cbwsdk-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;counter-increment:none;counter-reset:none;direction:ltr;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;word-spacing:normal;z-index:auto}.-cbwsdk-css-reset strong{font-weight:bold}.-cbwsdk-css-reset *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-cbwsdk-css-reset [class*=container]{margin:0;padding:0}.-cbwsdk-css-reset style{display:none}`)();
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/lib/cssReset.js
var require_cssReset = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/lib/cssReset.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.injectCssReset = void 0;
    var cssReset_css_1 = __importDefault(require_cssReset_css());
    function injectCssReset() {
      const styleEl = document.createElement("style");
      styleEl.type = "text/css";
      styleEl.appendChild(document.createTextNode(cssReset_css_1.default));
      document.documentElement.appendChild(styleEl);
    }
    exports.injectCssReset = injectCssReset;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/CloseIcon.js
var require_CloseIcon = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/CloseIcon.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CloseIcon = void 0;
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    function CloseIcon(props) {
      return (0, preact_1.h)(
        "svg",
        Object.assign({ width: "40", height: "40", viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props),
        (0, preact_1.h)("path", { d: "M13.7677 13L12.3535 14.4142L18.3535 20.4142L12.3535 26.4142L13.7677 27.8284L19.7677 21.8284L25.7677 27.8284L27.1819 26.4142L21.1819 20.4142L27.1819 14.4142L25.7677 13L19.7677 19L13.7677 13Z" })
      );
    }
    exports.CloseIcon = CloseIcon;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/CoinbaseWalletRound.js
var require_CoinbaseWalletRound = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/CoinbaseWalletRound.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CoinbaseWalletRound = void 0;
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    function CoinbaseWalletRound(props) {
      return (0, preact_1.h)(
        "svg",
        Object.assign({ width: "28", height: "28", viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props),
        (0, preact_1.h)("circle", { cx: "14", cy: "14", r: "14", fill: "#0052FF" }),
        (0, preact_1.h)("path", { d: "M23.8521 14.0003C23.8521 19.455 19.455 23.8521 14.0003 23.8521C8.54559 23.8521 4.14844 19.455 4.14844 14.0003C4.14844 8.54559 8.54559 4.14844 14.0003 4.14844C19.455 4.14844 23.8521 8.54559 23.8521 14.0003Z", fill: "white" }),
        (0, preact_1.h)("path", { d: "M11.1855 12.5042C11.1855 12.0477 11.1855 11.7942 11.2835 11.642C11.3814 11.4899 11.4793 11.3377 11.6261 11.287C11.8219 11.1855 12.0178 11.1855 12.5073 11.1855H15.4934C15.983 11.1855 16.1788 11.1855 16.3746 11.287C16.5215 11.3884 16.6683 11.4899 16.7173 11.642C16.8152 11.8449 16.8152 12.0477 16.8152 12.5042V15.4965C16.8152 15.953 16.8152 16.2066 16.7173 16.3587C16.6194 16.5109 16.5215 16.663 16.3746 16.7137C16.1788 16.8152 15.983 16.8152 15.4934 16.8152H12.5073C12.0178 16.8152 11.8219 16.8152 11.6261 16.7137C11.4793 16.6123 11.3324 16.5109 11.2835 16.3587C11.1855 16.1558 11.1855 15.953 11.1855 15.4965V12.5042Z", fill: "#0052FF" })
      );
    }
    exports.CoinbaseWalletRound = CoinbaseWalletRound;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/QRCodeIcon.js
var require_QRCodeIcon = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/QRCodeIcon.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QRCodeIcon = void 0;
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    function QRCodeIcon(props) {
      return (0, preact_1.h)(
        "svg",
        Object.assign({ width: "18", height: "18", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, props),
        (0, preact_1.h)("path", { d: "M3 3V8.99939L5 8.99996V5H9V3H3Z" }),
        (0, preact_1.h)("path", { d: "M15 21L21 21V15.0006L19 15V19L15 19V21Z" }),
        (0, preact_1.h)("path", { d: "M21 9H19V5H15.0006L15 3H21V9Z" }),
        (0, preact_1.h)("path", { d: "M3 15V21H8.99939L8.99996 19H5L5 15H3Z" })
      );
    }
    exports.QRCodeIcon = QRCodeIcon;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/vendor-js/qrcode-svg/index.js
var require_qrcode_svg = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/vendor-js/qrcode-svg/index.js"(exports, module) {
    function QR8bitByte(data) {
      this.mode = QRMode.MODE_8BIT_BYTE;
      this.data = data;
      this.parsedData = [];
      for (var i2 = 0, l = this.data.length; i2 < l; i2++) {
        var byteArray = [];
        var code = this.data.charCodeAt(i2);
        if (code > 65536) {
          byteArray[0] = 240 | (code & 1835008) >>> 18;
          byteArray[1] = 128 | (code & 258048) >>> 12;
          byteArray[2] = 128 | (code & 4032) >>> 6;
          byteArray[3] = 128 | code & 63;
        } else if (code > 2048) {
          byteArray[0] = 224 | (code & 61440) >>> 12;
          byteArray[1] = 128 | (code & 4032) >>> 6;
          byteArray[2] = 128 | code & 63;
        } else if (code > 128) {
          byteArray[0] = 192 | (code & 1984) >>> 6;
          byteArray[1] = 128 | code & 63;
        } else {
          byteArray[0] = code;
        }
        this.parsedData.push(byteArray);
      }
      this.parsedData = Array.prototype.concat.apply([], this.parsedData);
      if (this.parsedData.length != this.data.length) {
        this.parsedData.unshift(191);
        this.parsedData.unshift(187);
        this.parsedData.unshift(239);
      }
    }
    QR8bitByte.prototype = {
      getLength: function(buffer) {
        return this.parsedData.length;
      },
      write: function(buffer) {
        for (var i2 = 0, l = this.parsedData.length; i2 < l; i2++) {
          buffer.put(this.parsedData[i2], 8);
        }
      }
    };
    function QRCodeModel(typeNumber, errorCorrectLevel) {
      this.typeNumber = typeNumber;
      this.errorCorrectLevel = errorCorrectLevel;
      this.modules = null;
      this.moduleCount = 0;
      this.dataCache = null;
      this.dataList = [];
    }
    QRCodeModel.prototype = { addData: function(data) {
      var newData = new QR8bitByte(data);
      this.dataList.push(newData);
      this.dataCache = null;
    }, isDark: function(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
      }
      return this.modules[row][col];
    }, getModuleCount: function() {
      return this.moduleCount;
    }, make: function() {
      this.makeImpl(false, this.getBestMaskPattern());
    }, makeImpl: function(test, maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (var row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
        for (var col = 0; col < this.moduleCount; col++) {
          this.modules[row][col] = null;
        }
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
      }
      if (this.dataCache == null) {
        this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
      }
      this.mapData(this.dataCache, maskPattern);
    }, setupPositionProbePattern: function(row, col) {
      for (var r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;
        for (var c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;
          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    }, getBestMaskPattern: function() {
      var minLostPoint = 0;
      var pattern2 = 0;
      for (var i2 = 0; i2 < 8; i2++) {
        this.makeImpl(true, i2);
        var lostPoint = QRUtil.getLostPoint(this);
        if (i2 == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern2 = i2;
        }
      }
      return pattern2;
    }, createMovieClip: function(target_mc, instance_name, depth) {
      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
      var cs = 1;
      this.make();
      for (var row = 0; row < this.modules.length; row++) {
        var y = row * cs;
        for (var col = 0; col < this.modules[row].length; col++) {
          var x = col * cs;
          var dark = this.modules[row][col];
          if (dark) {
            qr_mc.beginFill(0, 100);
            qr_mc.moveTo(x, y);
            qr_mc.lineTo(x + cs, y);
            qr_mc.lineTo(x + cs, y + cs);
            qr_mc.lineTo(x, y + cs);
            qr_mc.endFill();
          }
        }
      }
      return qr_mc;
    }, setupTimingPattern: function() {
      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
      }
      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
          continue;
        }
        this.modules[6][c] = c % 2 == 0;
      }
    }, setupPositionAdjustPattern: function() {
      var pos = QRUtil.getPatternPosition(this.typeNumber);
      for (var i2 = 0; i2 < pos.length; i2++) {
        for (var j = 0; j < pos.length; j++) {
          var row = pos[i2];
          var col = pos[j];
          if (this.modules[row][col] != null) {
            continue;
          }
          for (var r = -2; r <= 2; r++) {
            for (var c = -2; c <= 2; c++) {
              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    }, setupTypeNumber: function(test) {
      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
      for (var i2 = 0; i2 < 18; i2++) {
        var mod = !test && (bits >> i2 & 1) == 1;
        this.modules[Math.floor(i2 / 3)][i2 % 3 + this.moduleCount - 8 - 3] = mod;
      }
      for (var i2 = 0; i2 < 18; i2++) {
        var mod = !test && (bits >> i2 & 1) == 1;
        this.modules[i2 % 3 + this.moduleCount - 8 - 3][Math.floor(i2 / 3)] = mod;
      }
    }, setupTypeInfo: function(test, maskPattern) {
      var data = this.errorCorrectLevel << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);
      for (var i2 = 0; i2 < 15; i2++) {
        var mod = !test && (bits >> i2 & 1) == 1;
        if (i2 < 6) {
          this.modules[i2][8] = mod;
        } else if (i2 < 8) {
          this.modules[i2 + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i2][8] = mod;
        }
      }
      for (var i2 = 0; i2 < 15; i2++) {
        var mod = !test && (bits >> i2 & 1) == 1;
        if (i2 < 8) {
          this.modules[8][this.moduleCount - i2 - 1] = mod;
        } else if (i2 < 9) {
          this.modules[8][15 - i2 - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i2 - 1] = mod;
        }
      }
      this.modules[this.moduleCount - 8][8] = !test;
    }, mapData: function(data, maskPattern) {
      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;
        while (true) {
          for (var c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              var dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }
              var mask2 = QRUtil.getMask(maskPattern, row, col - c);
              if (mask2) {
                dark = !dark;
              }
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    } };
    QRCodeModel.PAD0 = 236;
    QRCodeModel.PAD1 = 17;
    QRCodeModel.createData = function(typeNumber, errorCorrectLevel, dataList) {
      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
      var buffer = new QRBitBuffer();
      for (var i2 = 0; i2 < dataList.length; i2++) {
        var data = dataList[i2];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
        data.write(buffer);
      }
      var totalDataCount = 0;
      for (var i2 = 0; i2 < rsBlocks.length; i2++) {
        totalDataCount += rsBlocks[i2].dataCount;
      }
      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
      }
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }
      while (true) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeModel.PAD0, 8);
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeModel.PAD1, 8);
      }
      return QRCodeModel.createBytes(buffer, rsBlocks);
    };
    QRCodeModel.createBytes = function(buffer, rsBlocks) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i2 = 0; i2 < dcdata[r].length; i2++) {
          dcdata[r][i2] = 255 & buffer.buffer[i2 + offset];
        }
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i2 = 0; i2 < ecdata[r].length; i2++) {
          var modIndex = i2 + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i2] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }
      var totalCodeCount = 0;
      for (var i2 = 0; i2 < rsBlocks.length; i2++) {
        totalCodeCount += rsBlocks[i2].totalCount;
      }
      var data = new Array(totalCodeCount);
      var index = 0;
      for (var i2 = 0; i2 < maxDcCount; i2++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i2 < dcdata[r].length) {
            data[index++] = dcdata[r][i2];
          }
        }
      }
      for (var i2 = 0; i2 < maxEcCount; i2++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i2 < ecdata[r].length) {
            data[index++] = ecdata[r][i2];
          }
        }
      }
      return data;
    };
    var QRMode = { MODE_NUMBER: 1 << 0, MODE_ALPHA_NUM: 1 << 1, MODE_8BIT_BYTE: 1 << 2, MODE_KANJI: 1 << 3 };
    var QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };
    var QRMaskPattern = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 };
    var QRUtil = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0, G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0, G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1, getBCHTypeInfo: function(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    }, getBCHTypeNumber: function(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    }, getBCHDigit: function(data) {
      var digit = 0;
      while (data != 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    }, getPatternPosition: function(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    }, getMask: function(maskPattern, i2, j) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000:
          return (i2 + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i2 % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i2 + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i2 / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i2 * j % 2 + i2 * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i2 * j % 2 + i2 * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i2 * j % 3 + (i2 + j) % 2) % 2 == 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }, getErrorCorrectPolynomial: function(errorCorrectLength) {
      var a = new QRPolynomial([1], 0);
      for (var i2 = 0; i2 < errorCorrectLength; i2++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i2)], 0));
      }
      return a;
    }, getLengthInBits: function(mode, type2) {
      if (1 <= type2 && type2 < 10) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + mode);
        }
      } else if (type2 < 27) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + mode);
        }
      } else if (type2 < 41) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + mode);
        }
      } else {
        throw new Error("type:" + type2);
      }
    }, getLostPoint: function(qrCode) {
      var moduleCount = qrCode.getModuleCount();
      var lostPoint = 0;
      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount; col++) {
          var sameCount = 0;
          var dark = qrCode.isDark(row, col);
          for (var r = -1; r <= 1; r++) {
            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }
            for (var c = -1; c <= 1; c++) {
              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }
              if (r == 0 && c == 0) {
                continue;
              }
              if (dark == qrCode.isDark(row + r, col + c)) {
                sameCount++;
              }
            }
          }
          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }
      for (var row = 0; row < moduleCount - 1; row++) {
        for (var col = 0; col < moduleCount - 1; col++) {
          var count = 0;
          if (qrCode.isDark(row, col)) count++;
          if (qrCode.isDark(row + 1, col)) count++;
          if (qrCode.isDark(row, col + 1)) count++;
          if (qrCode.isDark(row + 1, col + 1)) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }
      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount - 6; col++) {
          if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
            lostPoint += 40;
          }
        }
      }
      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount - 6; row++) {
          if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
            lostPoint += 40;
          }
        }
      }
      var darkCount = 0;
      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount; row++) {
          if (qrCode.isDark(row, col)) {
            darkCount++;
          }
        }
      }
      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    } };
    var QRMath = { glog: function(n) {
      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }
      return QRMath.LOG_TABLE[n];
    }, gexp: function(n) {
      while (n < 0) {
        n += 255;
      }
      while (n >= 256) {
        n -= 255;
      }
      return QRMath.EXP_TABLE[n];
    }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256) };
    for (i = 0; i < 8; i++) {
      QRMath.EXP_TABLE[i] = 1 << i;
    }
    var i;
    for (i = 8; i < 256; i++) {
      QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
    }
    var i;
    for (i = 0; i < 255; i++) {
      QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
    }
    var i;
    function QRPolynomial(num, shift) {
      if (num.length == void 0) {
        throw new Error(num.length + "/" + shift);
      }
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset++;
      }
      this.num = new Array(num.length - offset + shift);
      for (var i2 = 0; i2 < num.length - offset; i2++) {
        this.num[i2] = num[i2 + offset];
      }
    }
    QRPolynomial.prototype = { get: function(index) {
      return this.num[index];
    }, getLength: function() {
      return this.num.length;
    }, multiply: function(e) {
      var num = new Array(this.getLength() + e.getLength() - 1);
      for (var i2 = 0; i2 < this.getLength(); i2++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i2 + j] ^= QRMath.gexp(QRMath.glog(this.get(i2)) + QRMath.glog(e.get(j)));
        }
      }
      return new QRPolynomial(num, 0);
    }, mod: function(e) {
      if (this.getLength() - e.getLength() < 0) {
        return this;
      }
      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
      var num = new Array(this.getLength());
      for (var i2 = 0; i2 < this.getLength(); i2++) {
        num[i2] = this.get(i2);
      }
      for (var i2 = 0; i2 < e.getLength(); i2++) {
        num[i2] ^= QRMath.gexp(QRMath.glog(e.get(i2)) + ratio);
      }
      return new QRPolynomial(num, 0).mod(e);
    } };
    function QRRSBlock(totalCount, dataCount) {
      this.totalCount = totalCount;
      this.dataCount = dataCount;
    }
    QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
    QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
      var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
      if (rsBlock == void 0) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
      }
      var length = rsBlock.length / 3;
      var list = [];
      for (var i2 = 0; i2 < length; i2++) {
        var count = rsBlock[i2 * 3 + 0];
        var totalCount = rsBlock[i2 * 3 + 1];
        var dataCount = rsBlock[i2 * 3 + 2];
        for (var j = 0; j < count; j++) {
          list.push(new QRRSBlock(totalCount, dataCount));
        }
      }
      return list;
    };
    QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
      switch (errorCorrectLevel) {
        case QRErrorCorrectLevel.L:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case QRErrorCorrectLevel.M:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case QRErrorCorrectLevel.Q:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case QRErrorCorrectLevel.H:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    function QRBitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    QRBitBuffer.prototype = { get: function(index) {
      var bufIndex = Math.floor(index / 8);
      return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    }, put: function(num, length) {
      for (var i2 = 0; i2 < length; i2++) {
        this.putBit((num >>> length - i2 - 1 & 1) == 1);
      }
    }, getLengthInBits: function() {
      return this.length;
    }, putBit: function(bit) {
      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }
      if (bit) {
        this.buffer[bufIndex] |= 128 >>> this.length % 8;
      }
      this.length++;
    } };
    var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
    function QRCode(options) {
      var instance2 = this;
      this.options = {
        padding: 4,
        width: 256,
        height: 256,
        typeNumber: 4,
        color: "#000000",
        background: "#ffffff",
        ecl: "M",
        image: {
          svg: "",
          width: 0,
          height: 0
        }
      };
      if (typeof options === "string") {
        options = {
          content: options
        };
      }
      if (options) {
        for (var i2 in options) {
          this.options[i2] = options[i2];
        }
      }
      if (typeof this.options.content !== "string") {
        throw new Error("Expected 'content' as string!");
      }
      if (this.options.content.length === 0) {
        throw new Error("Expected 'content' to be non-empty!");
      }
      if (!(this.options.padding >= 0)) {
        throw new Error("Expected 'padding' value to be non-negative!");
      }
      if (!(this.options.width > 0) || !(this.options.height > 0)) {
        throw new Error("Expected 'width' or 'height' value to be higher than zero!");
      }
      function _getErrorCorrectLevel(ecl2) {
        switch (ecl2) {
          case "L":
            return QRErrorCorrectLevel.L;
          case "M":
            return QRErrorCorrectLevel.M;
          case "Q":
            return QRErrorCorrectLevel.Q;
          case "H":
            return QRErrorCorrectLevel.H;
          default:
            throw new Error("Unknwon error correction level: " + ecl2);
        }
      }
      function _getTypeNumber(content2, ecl2) {
        var length = _getUTF8Length(content2);
        var type3 = 1;
        var limit = 0;
        for (var i3 = 0, len = QRCodeLimitLength.length; i3 <= len; i3++) {
          var table = QRCodeLimitLength[i3];
          if (!table) {
            throw new Error("Content too long: expected " + limit + " but got " + length);
          }
          switch (ecl2) {
            case "L":
              limit = table[0];
              break;
            case "M":
              limit = table[1];
              break;
            case "Q":
              limit = table[2];
              break;
            case "H":
              limit = table[3];
              break;
            default:
              throw new Error("Unknwon error correction level: " + ecl2);
          }
          if (length <= limit) {
            break;
          }
          type3++;
        }
        if (type3 > QRCodeLimitLength.length) {
          throw new Error("Content too long");
        }
        return type3;
      }
      function _getUTF8Length(content2) {
        var result = encodeURI(content2).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
        return result.length + (result.length != content2 ? 3 : 0);
      }
      var content = this.options.content;
      var type2 = _getTypeNumber(content, this.options.ecl);
      var ecl = _getErrorCorrectLevel(this.options.ecl);
      this.qrcode = new QRCodeModel(type2, ecl);
      this.qrcode.addData(content);
      this.qrcode.make();
    }
    QRCode.prototype.svg = function(opt) {
      var options = this.options || {};
      var modules = this.qrcode.modules;
      if (typeof opt == "undefined") {
        opt = { container: options.container || "svg" };
      }
      var pretty = typeof options.pretty != "undefined" ? !!options.pretty : true;
      var indent = pretty ? "  " : "";
      var EOL = pretty ? "\r\n" : "";
      var width = options.width;
      var height = options.height;
      var length = modules.length;
      var xsize = width / (length + 2 * options.padding);
      var ysize = height / (length + 2 * options.padding);
      var join = typeof options.join != "undefined" ? !!options.join : false;
      var swap = typeof options.swap != "undefined" ? !!options.swap : false;
      var xmlDeclaration = typeof options.xmlDeclaration != "undefined" ? !!options.xmlDeclaration : true;
      var predefined = typeof options.predefined != "undefined" ? !!options.predefined : false;
      var defs = predefined ? indent + '<defs><path id="qrmodule" d="M0 0 h' + ysize + " v" + xsize + ' H0 z" style="fill:' + options.color + ';shape-rendering:crispEdges;" /></defs>' + EOL : "";
      var bgrect = indent + '<rect x="0" y="0" width="' + width + '" height="' + height + '" style="fill:' + options.background + ';shape-rendering:crispEdges;"/>' + EOL;
      var modrect = "";
      var pathdata = "";
      for (var y = 0; y < length; y++) {
        for (var x = 0; x < length; x++) {
          var module2 = modules[x][y];
          if (module2) {
            var px = x * xsize + options.padding * xsize;
            var py = y * ysize + options.padding * ysize;
            if (swap) {
              var t = px;
              px = py;
              py = t;
            }
            if (join) {
              var w = xsize + px;
              var h = ysize + py;
              px = Number.isInteger(px) ? Number(px) : px.toFixed(2);
              py = Number.isInteger(py) ? Number(py) : py.toFixed(2);
              w = Number.isInteger(w) ? Number(w) : w.toFixed(2);
              h = Number.isInteger(h) ? Number(h) : h.toFixed(2);
              pathdata += "M" + px + "," + py + " V" + h + " H" + w + " V" + py + " H" + px + " Z ";
            } else if (predefined) {
              modrect += indent + '<use x="' + px.toString() + '" y="' + py.toString() + '" href="#qrmodule" />' + EOL;
            } else {
              modrect += indent + '<rect x="' + px.toString() + '" y="' + py.toString() + '" width="' + xsize + '" height="' + ysize + '" style="fill:' + options.color + ';shape-rendering:crispEdges;"/>' + EOL;
            }
          }
        }
      }
      if (join) {
        modrect = indent + '<path x="0" y="0" style="fill:' + options.color + ';shape-rendering:crispEdges;" d="' + pathdata + '" />';
      }
      let imgSvg = "";
      if (this.options.image !== void 0 && this.options.image.svg) {
        const imgWidth = width * this.options.image.width / 100;
        const imgHeight = height * this.options.image.height / 100;
        const imgX = width / 2 - imgWidth / 2;
        const imgY = height / 2 - imgHeight / 2;
        imgSvg += `<svg x="${imgX}" y="${imgY}" width="${imgWidth}" height="${imgHeight}" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">`;
        imgSvg += this.options.image.svg + EOL;
        imgSvg += "</svg>";
      }
      var svg = "";
      switch (opt.container) {
        case "svg":
          if (xmlDeclaration) {
            svg += '<?xml version="1.0" standalone="yes"?>' + EOL;
          }
          svg += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + width + '" height="' + height + '">' + EOL;
          svg += defs + bgrect + modrect;
          svg += imgSvg;
          svg += "</svg>";
          break;
        case "svg-viewbox":
          if (xmlDeclaration) {
            svg += '<?xml version="1.0" standalone="yes"?>' + EOL;
          }
          svg += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' + width + " " + height + '">' + EOL;
          svg += defs + bgrect + modrect;
          svg += imgSvg;
          svg += "</svg>";
          break;
        case "g":
          svg += '<g width="' + width + '" height="' + height + '">' + EOL;
          svg += defs + bgrect + modrect;
          svg += imgSvg;
          svg += "</g>";
          break;
        default:
          svg += (defs + bgrect + modrect + imgSvg).replace(/^\s+/, "");
          break;
      }
      return svg;
    };
    module.exports = QRCode;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/QRCode.js
var require_QRCode = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/QRCode.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QRCode = void 0;
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    var hooks_1 = (init_hooks_module(), __toCommonJS(hooks_module_exports));
    var qrcode_svg_1 = __importDefault(require_qrcode_svg());
    var QRCode = (props) => {
      const [svg, setSvg] = (0, hooks_1.useState)("");
      (0, hooks_1.useEffect)(() => {
        var _a, _b;
        const qrcode = new qrcode_svg_1.default({
          content: props.content,
          background: props.bgColor || "#ffffff",
          color: props.fgColor || "#000000",
          container: "svg",
          ecl: "M",
          width: (_a = props.width) !== null && _a !== void 0 ? _a : 256,
          height: (_b = props.height) !== null && _b !== void 0 ? _b : 256,
          padding: 0,
          image: props.image
        });
        const base64 = Buffer.from(qrcode.svg(), "utf8").toString("base64");
        setSvg(`data:image/svg+xml;base64,${base64}`);
      }, [props.bgColor, props.content, props.fgColor, props.height, props.image, props.width]);
      return svg ? (0, preact_1.h)("img", { src: svg, alt: "QR Code" }) : null;
    };
    exports.QRCode = QRCode;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/Spinner/Spinner-css.js
var require_Spinner_css = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/Spinner/Spinner-css.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = /* @__PURE__ */ (() => `.-cbwsdk-css-reset .-cbwsdk-spinner{display:inline-block}.-cbwsdk-css-reset .-cbwsdk-spinner svg{display:inline-block;animation:2s linear infinite -cbwsdk-spinner-svg}.-cbwsdk-css-reset .-cbwsdk-spinner svg circle{animation:1.9s ease-in-out infinite both -cbwsdk-spinner-circle;display:block;fill:rgba(0,0,0,0);stroke-dasharray:283;stroke-dashoffset:280;stroke-linecap:round;stroke-width:10px;transform-origin:50% 50%}@keyframes -cbwsdk-spinner-svg{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}@keyframes -cbwsdk-spinner-circle{0%,25%{stroke-dashoffset:280;transform:rotate(0)}50%,75%{stroke-dashoffset:75;transform:rotate(45deg)}100%{stroke-dashoffset:280;transform:rotate(360deg)}}`)();
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/Spinner/Spinner.js
var require_Spinner = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/Spinner/Spinner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Spinner = void 0;
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    var Spinner_css_1 = __importDefault(require_Spinner_css());
    var Spinner = (props) => {
      var _a;
      const size2 = (_a = props.size) !== null && _a !== void 0 ? _a : 64;
      const color = props.color || "#000";
      return (0, preact_1.h)(
        "div",
        { class: "-cbwsdk-spinner" },
        (0, preact_1.h)("style", null, Spinner_css_1.default),
        (0, preact_1.h)(
          "svg",
          { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", style: { width: size2, height: size2 } },
          (0, preact_1.h)("circle", { style: { cx: 50, cy: 50, r: 45, stroke: color } })
        )
      );
    };
    exports.Spinner = Spinner;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/ConnectContent/ConnectContent-css.js
var require_ConnectContent_css = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/ConnectContent/ConnectContent-css.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = /* @__PURE__ */ (() => `.-cbwsdk-css-reset .-cbwsdk-connect-content{height:430px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-connect-content.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-header{display:flex;align-items:center;justify-content:space-between;margin:0 0 30px}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading{font-style:normal;font-weight:500;font-size:28px;line-height:36px;margin:0}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-layout{display:flex;flex-direction:row}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-left{margin-right:30px;display:flex;flex-direction:column;justify-content:space-between}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-right{flex:25%;margin-right:34px}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-wrapper{width:220px;height:220px;border-radius:12px;display:flex;justify-content:center;align-items:center;background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light{background-color:rgba(255,255,255,.95)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light>p{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark{background-color:rgba(10,11,13,.9)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark>p{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting>p{font-size:12px;font-weight:bold;margin-top:16px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app{border-radius:8px;font-size:14px;line-height:20px;padding:12px;width:339px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.light{background:#eef0f3;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.dark{background:#1e2025;color:#8a919e}.-cbwsdk-css-reset .-cbwsdk-cancel-button{-webkit-appearance:none;border:none;background:none;cursor:pointer;padding:0;margin:0}.-cbwsdk-css-reset .-cbwsdk-cancel-button-x{position:relative;display:block;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-wallet-steps{padding:0 0 0 16px;margin:0;width:100%;list-style:decimal}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item{list-style-type:decimal;display:list-item;font-style:normal;font-weight:400;font-size:16px;line-height:24px;margin-top:20px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item-wrapper{display:flex;align-items:center}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-pad-left{margin-left:6px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon{display:flex;border-radius:50%;height:24px;width:24px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.light{background:#0052ff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.dark{background:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item{align-items:center;display:flex;flex-direction:row;padding:16px 24px;gap:12px;cursor:pointer;border-radius:100px;font-weight:600}.-cbwsdk-css-reset .-cbwsdk-connect-item.light{background:#f5f8ff;color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-connect-item.dark{background:#001033;color:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item-copy-wrapper{margin:0 4px 0 8px}.-cbwsdk-css-reset .-cbwsdk-connect-item-title{margin:0 0 0;font-size:16px;line-height:24px;font-weight:500}.-cbwsdk-css-reset .-cbwsdk-connect-item-description{font-weight:400;font-size:14px;line-height:20px;margin:0}`)();
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/ConnectContent/ConnectContent.js
var require_ConnectContent = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/ConnectContent/ConnectContent.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CoinbaseWalletSteps = exports.ConnectContent = void 0;
    var clsx_1 = __importDefault((init_clsx_m(), __toCommonJS(clsx_m_exports)));
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    var util_1 = require_util();
    var version_1 = require_version();
    var CloseIcon_1 = require_CloseIcon();
    var CoinbaseWalletRound_1 = require_CoinbaseWalletRound();
    var QRCodeIcon_1 = require_QRCodeIcon();
    var QRCode_1 = require_QRCode();
    var Spinner_1 = require_Spinner();
    var ConnectContent_css_1 = __importDefault(require_ConnectContent_css());
    var wallet = {
      title: "Coinbase Wallet app",
      description: "Connect with your self-custody wallet",
      steps: CoinbaseWalletSteps
    };
    var makeIconColor = (theme) => {
      return theme === "light" ? "#FFFFFF" : "#0A0B0D";
    };
    function ConnectContent(props) {
      const { theme } = props;
      const qrUrl = (0, util_1.createQrUrl)(props.sessionId, props.sessionSecret, props.linkAPIUrl, props.isParentConnection, props.version, props.chainId);
      const WalletSteps = wallet.steps;
      return (0, preact_1.h)(
        "div",
        { "data-testid": "connect-content", className: (0, clsx_1.default)("-cbwsdk-connect-content", theme) },
        (0, preact_1.h)("style", null, ConnectContent_css_1.default),
        (0, preact_1.h)(
          "div",
          { className: "-cbwsdk-connect-content-header" },
          (0, preact_1.h)("h2", { className: (0, clsx_1.default)("-cbwsdk-connect-content-heading", theme) }, "Scan to connect with our mobile app"),
          props.onCancel && (0, preact_1.h)(
            "button",
            { type: "button", className: "-cbwsdk-cancel-button", onClick: props.onCancel },
            (0, preact_1.h)(CloseIcon_1.CloseIcon, { fill: theme === "light" ? "#0A0B0D" : "#FFFFFF" })
          )
        ),
        (0, preact_1.h)(
          "div",
          { className: "-cbwsdk-connect-content-layout" },
          (0, preact_1.h)(
            "div",
            { className: "-cbwsdk-connect-content-column-left" },
            (0, preact_1.h)(ConnectItem, { title: wallet.title, description: wallet.description, theme })
          ),
          (0, preact_1.h)(
            "div",
            { className: "-cbwsdk-connect-content-column-right" },
            (0, preact_1.h)(
              "div",
              { className: "-cbwsdk-connect-content-qr-wrapper" },
              (0, preact_1.h)(QRCode_1.QRCode, { content: qrUrl, width: 200, height: 200, fgColor: "#000", bgColor: "transparent" }),
              (0, preact_1.h)("input", { type: "hidden", name: "cbw-cbwsdk-version", value: version_1.LIB_VERSION }),
              (0, preact_1.h)("input", { type: "hidden", value: qrUrl })
            ),
            (0, preact_1.h)(WalletSteps, { theme }),
            !props.isConnected && (0, preact_1.h)(
              "div",
              { "data-testid": "connecting-spinner", className: (0, clsx_1.default)("-cbwsdk-connect-content-qr-connecting", theme) },
              (0, preact_1.h)(Spinner_1.Spinner, { size: 36, color: theme === "dark" ? "#FFF" : "#000" }),
              (0, preact_1.h)("p", null, "Connecting...")
            )
          )
        )
      );
    }
    exports.ConnectContent = ConnectContent;
    function ConnectItem({ title, description, theme }) {
      return (0, preact_1.h)(
        "div",
        { className: (0, clsx_1.default)("-cbwsdk-connect-item", theme) },
        (0, preact_1.h)(
          "div",
          null,
          (0, preact_1.h)(CoinbaseWalletRound_1.CoinbaseWalletRound, null)
        ),
        (0, preact_1.h)(
          "div",
          { className: "-cbwsdk-connect-item-copy-wrapper" },
          (0, preact_1.h)("h3", { className: "-cbwsdk-connect-item-title" }, title),
          (0, preact_1.h)("p", { className: "-cbwsdk-connect-item-description" }, description)
        )
      );
    }
    function CoinbaseWalletSteps({ theme }) {
      return (0, preact_1.h)(
        "ol",
        { className: "-cbwsdk-wallet-steps" },
        (0, preact_1.h)(
          "li",
          { className: (0, clsx_1.default)("-cbwsdk-wallet-steps-item", theme) },
          (0, preact_1.h)("div", { className: "-cbwsdk-wallet-steps-item-wrapper" }, "Open Coinbase Wallet app")
        ),
        (0, preact_1.h)(
          "li",
          { className: (0, clsx_1.default)("-cbwsdk-wallet-steps-item", theme) },
          (0, preact_1.h)(
            "div",
            { className: "-cbwsdk-wallet-steps-item-wrapper" },
            (0, preact_1.h)(
              "span",
              null,
              "Tap ",
              (0, preact_1.h)("strong", null, "Scan"),
              " "
            ),
            (0, preact_1.h)(
              "span",
              { className: (0, clsx_1.default)("-cbwsdk-wallet-steps-pad-left", "-cbwsdk-wallet-steps-icon", theme) },
              (0, preact_1.h)(QRCodeIcon_1.QRCodeIcon, { fill: makeIconColor(theme) })
            )
          )
        )
      );
    }
    exports.CoinbaseWalletSteps = CoinbaseWalletSteps;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/ArrowLeftIcon.js
var require_ArrowLeftIcon = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/ArrowLeftIcon.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArrowLeftIcon = void 0;
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    function ArrowLeftIcon(props) {
      return (0, preact_1.h)(
        "svg",
        Object.assign({ width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, props),
        (0, preact_1.h)("path", { d: "M8.60675 0.155884L7.37816 1.28209L12.7723 7.16662H0V8.83328H12.6548L6.82149 14.6666L8 15.8451L15.8201 8.02501L8.60675 0.155884Z" })
      );
    }
    exports.ArrowLeftIcon = ArrowLeftIcon;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/LaptopIcon.js
var require_LaptopIcon = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/LaptopIcon.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LaptopIcon = void 0;
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    function LaptopIcon(props) {
      return (0, preact_1.h)(
        "svg",
        Object.assign({ width: "14", height: "14", viewBox: "0 0 14 14", xmlns: "http://www.w3.org/2000/svg" }, props),
        (0, preact_1.h)("path", { d: "M1.8001 2.2002H12.2001V9.40019H1.8001V2.2002ZM3.4001 3.8002V7.80019H10.6001V3.8002H3.4001Z" }),
        (0, preact_1.h)("path", { d: "M13.4001 10.2002H0.600098C0.600098 11.0838 1.31644 11.8002 2.2001 11.8002H11.8001C12.6838 11.8002 13.4001 11.0838 13.4001 10.2002Z" })
      );
    }
    exports.LaptopIcon = LaptopIcon;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/SafeIcon.js
var require_SafeIcon = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/icons/SafeIcon.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SafeIcon = void 0;
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    function SafeIcon(props) {
      return (0, preact_1.h)(
        "svg",
        Object.assign({ width: "14", height: "14", viewBox: "0 0 14 14", xmlns: "http://www.w3.org/2000/svg" }, props),
        (0, preact_1.h)("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0.600098 0.600098V11.8001H13.4001V0.600098H0.600098ZM7.0001 9.2001C5.3441 9.2001 4.0001 7.8561 4.0001 6.2001C4.0001 4.5441 5.3441 3.2001 7.0001 3.2001C8.6561 3.2001 10.0001 4.5441 10.0001 6.2001C10.0001 7.8561 8.6561 9.2001 7.0001 9.2001ZM0.600098 12.6001H3.8001V13.4001H0.600098V12.6001ZM10.2001 12.6001H13.4001V13.4001H10.2001V12.6001ZM8.8001 6.2001C8.8001 7.19421 7.99421 8.0001 7.0001 8.0001C6.00598 8.0001 5.2001 7.19421 5.2001 6.2001C5.2001 5.20598 6.00598 4.4001 7.0001 4.4001C7.99421 4.4001 8.8001 5.20598 8.8001 6.2001Z" })
      );
    }
    exports.SafeIcon = SafeIcon;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/TryExtensionContent/TryExtensionContent-css.js
var require_TryExtensionContent_css = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/TryExtensionContent/TryExtensionContent-css.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = /* @__PURE__ */ (() => `.-cbwsdk-css-reset .-cbwsdk-try-extension{display:flex;margin-top:12px;height:202px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-try-extension.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-column-half{flex:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading{font-style:normal;font-weight:500;font-size:25px;line-height:32px;margin:0;max-width:204px}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta{appearance:none;border:none;background:none;color:#0052ff;cursor:pointer;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.light{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.dark{color:#588af5}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-wrapper{display:flex;align-items:center;margin-top:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-icon{display:block;margin-left:4px;height:14px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0;padding:0;list-style:none;height:100%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item{display:flex;align-items:center;flex-flow:nowrap;margin-top:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item:first-of-type{margin-top:0}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon-wrapper{display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon{display:flex;height:32px;width:32px;border-radius:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.light{background:#eef0f3}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.dark{background:#1e2025}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy{display:block;font-weight:400;font-size:14px;line-height:20px;padding-left:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.light{color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.dark{color:#8a919e}`)();
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/TryExtensionContent/TryExtensionContent.js
var require_TryExtensionContent = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/TryExtensionContent/TryExtensionContent.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TryExtensionContent = void 0;
    var clsx_1 = __importDefault((init_clsx_m(), __toCommonJS(clsx_m_exports)));
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    var hooks_1 = (init_hooks_module(), __toCommonJS(hooks_module_exports));
    var ArrowLeftIcon_1 = require_ArrowLeftIcon();
    var LaptopIcon_1 = require_LaptopIcon();
    var SafeIcon_1 = require_SafeIcon();
    var TryExtensionContent_css_1 = __importDefault(require_TryExtensionContent_css());
    function TryExtensionContent({ theme }) {
      const [clicked, setClicked] = (0, hooks_1.useState)(false);
      const handleInstallClick = (0, hooks_1.useCallback)(() => {
        window.open("https://api.wallet.coinbase.com/rpc/v2/desktop/chrome", "_blank");
      }, []);
      const handleClick = (0, hooks_1.useCallback)(() => {
        if (clicked) {
          window.location.reload();
        } else {
          handleInstallClick();
          setClicked(true);
        }
      }, [handleInstallClick, clicked]);
      return (0, preact_1.h)(
        "div",
        { class: (0, clsx_1.default)("-cbwsdk-try-extension", theme) },
        (0, preact_1.h)("style", null, TryExtensionContent_css_1.default),
        (0, preact_1.h)(
          "div",
          { class: "-cbwsdk-try-extension-column-half" },
          (0, preact_1.h)("h3", { class: (0, clsx_1.default)("-cbwsdk-try-extension-heading", theme) }, "Or try the Coinbase Wallet browser extension"),
          (0, preact_1.h)(
            "div",
            { class: "-cbwsdk-try-extension-cta-wrapper" },
            (0, preact_1.h)("button", { class: (0, clsx_1.default)("-cbwsdk-try-extension-cta", theme), onClick: handleClick }, clicked ? "Refresh" : "Install"),
            (0, preact_1.h)("div", null, !clicked && (0, preact_1.h)(ArrowLeftIcon_1.ArrowLeftIcon, { class: "-cbwsdk-try-extension-cta-icon", fill: theme === "light" ? "#0052FF" : "#588AF5" }))
          )
        ),
        (0, preact_1.h)(
          "div",
          { class: "-cbwsdk-try-extension-column-half" },
          (0, preact_1.h)(
            "ul",
            { class: "-cbwsdk-try-extension-list" },
            (0, preact_1.h)(
              "li",
              { class: "-cbwsdk-try-extension-list-item" },
              (0, preact_1.h)(
                "div",
                { class: "-cbwsdk-try-extension-list-item-icon-wrapper" },
                (0, preact_1.h)(
                  "span",
                  { class: (0, clsx_1.default)("-cbwsdk-try-extension-list-item-icon", theme) },
                  (0, preact_1.h)(LaptopIcon_1.LaptopIcon, { fill: theme === "light" ? "#0A0B0D" : "#FFFFFF" })
                )
              ),
              (0, preact_1.h)("div", { class: (0, clsx_1.default)("-cbwsdk-try-extension-list-item-copy", theme) }, "Connect with dapps with just one click on your desktop browser")
            ),
            (0, preact_1.h)(
              "li",
              { class: "-cbwsdk-try-extension-list-item" },
              (0, preact_1.h)(
                "div",
                { class: "-cbwsdk-try-extension-list-item-icon-wrapper" },
                (0, preact_1.h)(
                  "span",
                  { class: (0, clsx_1.default)("-cbwsdk-try-extension-list-item-icon", theme) },
                  (0, preact_1.h)(SafeIcon_1.SafeIcon, { fill: theme === "light" ? "#0A0B0D" : "#FFFFFF" })
                )
              ),
              (0, preact_1.h)("div", { class: (0, clsx_1.default)("-cbwsdk-try-extension-list-item-copy", theme) }, "Add an additional layer of security by using a supported Ledger hardware wallet")
            )
          )
        )
      );
    }
    exports.TryExtensionContent = TryExtensionContent;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/ConnectDialog/ConnectDialog-css.js
var require_ConnectDialog_css = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/ConnectDialog/ConnectDialog-css.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = /* @__PURE__ */ (() => `.-cbwsdk-css-reset .-cbwsdk-connect-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.light{background-color:rgba(0,0,0,.5)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.dark{background-color:rgba(50,53,61,.4)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box{display:flex;position:relative;flex-direction:column;transform:scale(1);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container{display:block}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container-hidden{display:none}`)();
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/ConnectDialog/ConnectDialog.js
var require_ConnectDialog = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/ConnectDialog/ConnectDialog.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConnectDialog = void 0;
    var clsx_1 = __importDefault((init_clsx_m(), __toCommonJS(clsx_m_exports)));
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    var hooks_1 = (init_hooks_module(), __toCommonJS(hooks_module_exports));
    var ConnectContent_1 = require_ConnectContent();
    var TryExtensionContent_1 = require_TryExtensionContent();
    var ConnectDialog_css_1 = __importDefault(require_ConnectDialog_css());
    var ConnectDialog = (props) => {
      const { isOpen, darkMode } = props;
      const [containerHidden, setContainerHidden] = (0, hooks_1.useState)(!isOpen);
      const [dialogHidden, setDialogHidden] = (0, hooks_1.useState)(!isOpen);
      (0, hooks_1.useEffect)(() => {
        const timers = [
          window.setTimeout(() => {
            setDialogHidden(!isOpen);
          }, 10)
        ];
        if (isOpen) {
          setContainerHidden(false);
        } else {
          timers.push(window.setTimeout(() => {
            setContainerHidden(true);
          }, 360));
        }
        return () => {
          timers.forEach(window.clearTimeout);
        };
      }, [isOpen]);
      const theme = darkMode ? "dark" : "light";
      return (0, preact_1.h)(
        "div",
        { class: (0, clsx_1.default)("-cbwsdk-connect-dialog-container", containerHidden && "-cbwsdk-connect-dialog-container-hidden") },
        (0, preact_1.h)("style", null, ConnectDialog_css_1.default),
        (0, preact_1.h)("div", { class: (0, clsx_1.default)("-cbwsdk-connect-dialog-backdrop", theme, dialogHidden && "-cbwsdk-connect-dialog-backdrop-hidden") }),
        (0, preact_1.h)(
          "div",
          { class: "-cbwsdk-connect-dialog" },
          (0, preact_1.h)(
            "div",
            { class: (0, clsx_1.default)("-cbwsdk-connect-dialog-box", dialogHidden && "-cbwsdk-connect-dialog-box-hidden") },
            !props.connectDisabled ? (0, preact_1.h)(ConnectContent_1.ConnectContent, { theme, version: props.version, sessionId: props.sessionId, sessionSecret: props.sessionSecret, linkAPIUrl: props.linkAPIUrl, isConnected: props.isConnected, isParentConnection: props.isParentConnection, chainId: props.chainId, onCancel: props.onCancel }) : null,
            (0, preact_1.h)(TryExtensionContent_1.TryExtensionContent, { theme })
          )
        )
      );
    };
    exports.ConnectDialog = ConnectDialog;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/LinkFlow/LinkFlow.js
var require_LinkFlow = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/LinkFlow/LinkFlow.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinkFlow = void 0;
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    var ConnectDialog_1 = require_ConnectDialog();
    var LinkFlow = class {
      constructor(options) {
        this.connected = false;
        this.chainId = 1;
        this.isOpen = false;
        this.onCancel = null;
        this.root = null;
        this.connectDisabled = false;
        this.darkMode = options.darkMode;
        this.version = options.version;
        this.sessionId = options.sessionId;
        this.sessionSecret = options.sessionSecret;
        this.linkAPIUrl = options.linkAPIUrl;
        this.isParentConnection = options.isParentConnection;
      }
      attach(el) {
        this.root = document.createElement("div");
        this.root.className = "-cbwsdk-link-flow-root";
        el.appendChild(this.root);
        this.render();
      }
      setConnected(v) {
        if (this.connected !== v) {
          this.connected = v;
          this.render();
        }
      }
      setChainId(chainId) {
        if (this.chainId !== chainId) {
          this.chainId = chainId;
          this.render();
        }
      }
      detach() {
        var _a;
        if (!this.root) {
          return;
        }
        (0, preact_1.render)(null, this.root);
        (_a = this.root.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.root);
      }
      setConnectDisabled(connectDisabled) {
        this.connectDisabled = connectDisabled;
      }
      open(options) {
        this.isOpen = true;
        this.onCancel = options.onCancel;
        this.render();
      }
      close() {
        this.isOpen = false;
        this.onCancel = null;
        this.render();
      }
      render() {
        if (!this.root) {
          return;
        }
        (0, preact_1.render)((0, preact_1.h)(ConnectDialog_1.ConnectDialog, { darkMode: this.darkMode, version: this.version, sessionId: this.sessionId, sessionSecret: this.sessionSecret, linkAPIUrl: this.linkAPIUrl, isOpen: this.isOpen, isConnected: this.connected, isParentConnection: this.isParentConnection, chainId: this.chainId, onCancel: this.onCancel, connectDisabled: this.connectDisabled }), this.root);
      }
    };
    exports.LinkFlow = LinkFlow;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/Snackbar/Snackbar-css.js
var require_Snackbar_css = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/Snackbar/Snackbar-css.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = /* @__PURE__ */ (() => `.-cbwsdk-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-cbwsdk-css-reset .-gear-container *{user-select:none}.-cbwsdk-css-reset .-gear-container svg{opacity:0;position:absolute}.-cbwsdk-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-cbwsdk-css-reset .-cbwsdk-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-cbwsdk-css-reset .-cbwsdk-snackbar *{user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-expanded .-cbwsdk-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}`)();
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/Snackbar/Snackbar.js
var require_Snackbar = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/Snackbar/Snackbar.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SnackbarInstance = exports.SnackbarContainer = exports.Snackbar = void 0;
    var clsx_1 = __importDefault((init_clsx_m(), __toCommonJS(clsx_m_exports)));
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    var hooks_1 = (init_hooks_module(), __toCommonJS(hooks_module_exports));
    var Snackbar_css_1 = __importDefault(require_Snackbar_css());
    var cblogo = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+`;
    var gearIcon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=`;
    var Snackbar = class {
      constructor(options) {
        this.items = /* @__PURE__ */ new Map();
        this.nextItemKey = 0;
        this.root = null;
        this.darkMode = options.darkMode;
      }
      attach(el) {
        this.root = document.createElement("div");
        this.root.className = "-cbwsdk-snackbar-root";
        el.appendChild(this.root);
        this.render();
      }
      presentItem(itemProps) {
        const key = this.nextItemKey++;
        this.items.set(key, itemProps);
        this.render();
        return () => {
          this.items.delete(key);
          this.render();
        };
      }
      clear() {
        this.items.clear();
        this.render();
      }
      render() {
        if (!this.root) {
          return;
        }
        (0, preact_1.render)((0, preact_1.h)(
          "div",
          null,
          (0, preact_1.h)(exports.SnackbarContainer, { darkMode: this.darkMode }, Array.from(this.items.entries()).map(([key, itemProps]) => (0, preact_1.h)(exports.SnackbarInstance, Object.assign({}, itemProps, { key }))))
        ), this.root);
      }
    };
    exports.Snackbar = Snackbar;
    var SnackbarContainer = (props) => (0, preact_1.h)(
      "div",
      { class: (0, clsx_1.default)("-cbwsdk-snackbar-container") },
      (0, preact_1.h)("style", null, Snackbar_css_1.default),
      (0, preact_1.h)("div", { class: "-cbwsdk-snackbar" }, props.children)
    );
    exports.SnackbarContainer = SnackbarContainer;
    var SnackbarInstance = ({ autoExpand, message, menuItems }) => {
      const [hidden, setHidden] = (0, hooks_1.useState)(true);
      const [expanded, setExpanded] = (0, hooks_1.useState)(autoExpand !== null && autoExpand !== void 0 ? autoExpand : false);
      (0, hooks_1.useEffect)(() => {
        const timers = [
          window.setTimeout(() => {
            setHidden(false);
          }, 1),
          window.setTimeout(() => {
            setExpanded(true);
          }, 1e4)
        ];
        return () => {
          timers.forEach(window.clearTimeout);
        };
      });
      const toggleExpanded = () => {
        setExpanded(!expanded);
      };
      return (0, preact_1.h)(
        "div",
        { class: (0, clsx_1.default)("-cbwsdk-snackbar-instance", hidden && "-cbwsdk-snackbar-instance-hidden", expanded && "-cbwsdk-snackbar-instance-expanded") },
        (0, preact_1.h)(
          "div",
          { class: "-cbwsdk-snackbar-instance-header", onClick: toggleExpanded },
          (0, preact_1.h)("img", { src: cblogo, class: "-cbwsdk-snackbar-instance-header-cblogo" }),
          " ",
          (0, preact_1.h)("div", { class: "-cbwsdk-snackbar-instance-header-message" }, message),
          (0, preact_1.h)(
            "div",
            { class: "-gear-container" },
            !expanded && (0, preact_1.h)(
              "svg",
              { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
              (0, preact_1.h)("circle", { cx: "12", cy: "12", r: "12", fill: "#F5F7F8" })
            ),
            (0, preact_1.h)("img", { src: gearIcon, class: "-gear-icon", title: "Expand" })
          )
        ),
        menuItems && menuItems.length > 0 && (0, preact_1.h)("div", { class: "-cbwsdk-snackbar-instance-menu" }, menuItems.map((action, i) => (0, preact_1.h)(
          "div",
          { class: (0, clsx_1.default)("-cbwsdk-snackbar-instance-menu-item", action.isRed && "-cbwsdk-snackbar-instance-menu-item-is-red"), onClick: action.onClick, key: i },
          (0, preact_1.h)(
            "svg",
            { width: action.svgWidth, height: action.svgHeight, viewBox: "0 0 10 11", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            (0, preact_1.h)("path", { "fill-rule": action.defaultFillRule, "clip-rule": action.defaultClipRule, d: action.path, fill: "#AAAAAA" })
          ),
          (0, preact_1.h)("span", { class: (0, clsx_1.default)("-cbwsdk-snackbar-instance-menu-item-info", action.isRed && "-cbwsdk-snackbar-instance-menu-item-info-is-red") }, action.info)
        )))
      );
    };
    exports.SnackbarInstance = SnackbarInstance;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/WalletLinkRelayUI.js
var require_WalletLinkRelayUI = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/WalletLinkRelayUI.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WalletLinkRelayUI = void 0;
    var cssReset_1 = require_cssReset();
    var LinkFlow_1 = require_LinkFlow();
    var Snackbar_1 = require_Snackbar();
    var WalletLinkRelayUI = class {
      constructor(options) {
        this.standalone = null;
        this.attached = false;
        this.snackbar = new Snackbar_1.Snackbar({
          darkMode: options.darkMode
        });
        this.linkFlow = new LinkFlow_1.LinkFlow({
          darkMode: options.darkMode,
          version: options.version,
          sessionId: options.session.id,
          sessionSecret: options.session.secret,
          linkAPIUrl: options.linkAPIUrl,
          isParentConnection: false
        });
      }
      attach() {
        if (this.attached) {
          throw new Error("Coinbase Wallet SDK UI is already attached");
        }
        const el = document.documentElement;
        const container = document.createElement("div");
        container.className = "-cbwsdk-css-reset";
        el.appendChild(container);
        this.linkFlow.attach(container);
        this.snackbar.attach(container);
        this.attached = true;
        (0, cssReset_1.injectCssReset)();
      }
      setConnected(connected) {
        this.linkFlow.setConnected(connected);
      }
      setChainId(chainId) {
        this.linkFlow.setChainId(chainId);
      }
      setConnectDisabled(connectDisabled) {
        this.linkFlow.setConnectDisabled(connectDisabled);
      }
      /* istanbul ignore next */
      addEthereumChain() {
      }
      // no-op
      /* istanbul ignore next */
      watchAsset() {
      }
      // no-op
      /* istanbul ignore next */
      switchEthereumChain() {
      }
      // no-op
      requestEthereumAccounts(options) {
        this.linkFlow.open({ onCancel: options.onCancel });
      }
      hideRequestEthereumAccounts() {
        this.linkFlow.close();
      }
      /* istanbul ignore next */
      signEthereumMessage() {
      }
      // no-op
      /* istanbul ignore next */
      signEthereumTransaction() {
      }
      // no-op
      /* istanbul ignore next */
      submitEthereumTransaction() {
      }
      // no-op
      /* istanbul ignore next */
      ethereumAddressFromSignedMessage() {
      }
      // no-op
      showConnecting(options) {
        let snackbarProps;
        if (options.isUnlinkedErrorState) {
          snackbarProps = {
            autoExpand: true,
            message: "Connection lost",
            menuItems: [
              {
                isRed: false,
                info: "Reset connection",
                svgWidth: "10",
                svgHeight: "11",
                path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
                defaultFillRule: "evenodd",
                defaultClipRule: "evenodd",
                onClick: options.onResetConnection
              }
            ]
          };
        } else {
          snackbarProps = {
            message: "Confirm on phone",
            menuItems: [
              {
                isRed: true,
                info: "Cancel transaction",
                svgWidth: "11",
                svgHeight: "11",
                path: "M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z",
                defaultFillRule: "inherit",
                defaultClipRule: "inherit",
                onClick: options.onCancel
              },
              {
                isRed: false,
                info: "Reset connection",
                svgWidth: "10",
                svgHeight: "11",
                path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
                defaultFillRule: "evenodd",
                defaultClipRule: "evenodd",
                onClick: options.onResetConnection
              }
            ]
          };
        }
        return this.snackbar.presentItem(snackbarProps);
      }
      /* istanbul ignore next */
      reloadUI() {
        document.location.reload();
      }
      /* istanbul ignore next */
      inlineAccountsResponse() {
        return false;
      }
      /* istanbul ignore next */
      inlineAddEthereumChain() {
        return false;
      }
      /* istanbul ignore next */
      inlineWatchAsset() {
        return false;
      }
      /* istanbul ignore next */
      inlineSwitchEthereumChain() {
        return false;
      }
      /* istanbul ignore next */
      setStandalone(status) {
        this.standalone = status;
      }
      /* istanbul ignore next */
      isStandalone() {
        var _a;
        return (_a = this.standalone) !== null && _a !== void 0 ? _a : false;
      }
    };
    exports.WalletLinkRelayUI = WalletLinkRelayUI;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/WalletLinkRelay.js
var require_WalletLinkRelay = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/WalletLinkRelay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WalletLinkRelay = void 0;
    var error_1 = require_error();
    var type_1 = require_type();
    var util_1 = require_util();
    var DiagnosticLogger_1 = require_DiagnosticLogger();
    var RelayAbstract_1 = require_RelayAbstract();
    var Session_1 = require_Session();
    var WalletLinkConnection_1 = require_WalletLinkConnection();
    var Web3Response_1 = require_Web3Response();
    var WalletLinkRelayUI_1 = require_WalletLinkRelayUI();
    var WalletLinkRelay = class _WalletLinkRelay extends RelayAbstract_1.RelayAbstract {
      constructor(options) {
        var _a;
        super();
        this.accountsCallback = null;
        this.chainCallbackParams = { chainId: "", jsonRpcUrl: "" };
        this.chainCallback = null;
        this.dappDefaultChain = 1;
        this.appName = "";
        this.appLogoUrl = null;
        this.linkedUpdated = (linked) => {
          var _a2;
          this.isLinked = linked;
          const cachedAddresses = this.storage.getItem(RelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY);
          if (linked) {
            this.session.linked = linked;
          }
          this.isUnlinkedErrorState = false;
          if (cachedAddresses) {
            const addresses = cachedAddresses.split(" ");
            const wasConnectedViaStandalone = this.storage.getItem("IsStandaloneSigning") === "true";
            if (addresses[0] !== "" && !linked && this.session.linked && !wasConnectedViaStandalone) {
              this.isUnlinkedErrorState = true;
              const sessionIdHash = this.getSessionIdHash();
              (_a2 = this.diagnostic) === null || _a2 === void 0 ? void 0 : _a2.log(DiagnosticLogger_1.EVENTS.UNLINKED_ERROR_STATE, {
                sessionIdHash
              });
            }
          }
        };
        this.metadataUpdated = (key, value) => {
          this.storage.setItem(key, value);
        };
        this.chainUpdated = (chainId, jsonRpcUrl) => {
          if (this.chainCallbackParams.chainId === chainId && this.chainCallbackParams.jsonRpcUrl === jsonRpcUrl) {
            return;
          }
          this.chainCallbackParams = {
            chainId,
            jsonRpcUrl
          };
          if (this.chainCallback) {
            this.chainCallback(chainId, jsonRpcUrl);
          }
        };
        this.accountUpdated = (selectedAddress) => {
          if (this.accountsCallback) {
            this.accountsCallback([selectedAddress]);
          }
          if (_WalletLinkRelay.accountRequestCallbackIds.size > 0) {
            Array.from(_WalletLinkRelay.accountRequestCallbackIds.values()).forEach((id) => {
              const message = {
                type: "WEB3_RESPONSE",
                id,
                response: {
                  method: "requestEthereumAccounts",
                  result: [selectedAddress]
                }
              };
              this.invokeCallback(Object.assign(Object.assign({}, message), { id }));
            });
            _WalletLinkRelay.accountRequestCallbackIds.clear();
          }
        };
        this.connectedUpdated = (connected) => {
          this.ui.setConnected(connected);
        };
        this.resetAndReload = this.resetAndReload.bind(this);
        this.linkAPIUrl = options.linkAPIUrl;
        this.storage = options.storage;
        this.options = options;
        const { session, ui, connection } = this.subscribe();
        this._session = session;
        this.connection = connection;
        this.relayEventManager = options.relayEventManager;
        this.diagnostic = options.diagnosticLogger;
        this._reloadOnDisconnect = (_a = options.reloadOnDisconnect) !== null && _a !== void 0 ? _a : true;
        this.ui = ui;
      }
      subscribe() {
        const session = Session_1.Session.load(this.storage) || new Session_1.Session(this.storage).save();
        const { linkAPIUrl, diagnostic } = this;
        const connection = new WalletLinkConnection_1.WalletLinkConnection({
          session,
          linkAPIUrl,
          diagnostic,
          listener: this
        });
        const { version, darkMode } = this.options;
        const ui = this.options.uiConstructor({
          linkAPIUrl,
          version,
          darkMode,
          session
        });
        connection.connect();
        return { session, ui, connection };
      }
      attachUI() {
        this.ui.attach();
      }
      resetAndReload() {
        Promise.race([
          this.connection.setSessionMetadata("__destroyed", "1"),
          new Promise((resolve) => setTimeout(() => resolve(null), 1e3))
        ]).then(() => {
          var _a, _b;
          const isStandalone = this.ui.isStandalone();
          (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.SESSION_STATE_CHANGE, {
            method: "relay::resetAndReload",
            sessionMetadataChange: "__destroyed, 1",
            sessionIdHash: this.getSessionIdHash()
          });
          this.connection.destroy();
          const storedSession = Session_1.Session.load(this.storage);
          if ((storedSession === null || storedSession === void 0 ? void 0 : storedSession.id) === this._session.id) {
            this.storage.clear();
          } else if (storedSession) {
            (_b = this.diagnostic) === null || _b === void 0 ? void 0 : _b.log(DiagnosticLogger_1.EVENTS.SKIPPED_CLEARING_SESSION, {
              sessionIdHash: this.getSessionIdHash(),
              storedSessionIdHash: Session_1.Session.hash(storedSession.id)
            });
          }
          if (this._reloadOnDisconnect) {
            this.ui.reloadUI();
            return;
          }
          if (this.accountsCallback) {
            this.accountsCallback([], true);
          }
          const { session, ui, connection } = this.subscribe();
          this._session = session;
          this.connection = connection;
          this.ui = ui;
          if (isStandalone && this.ui.setStandalone)
            this.ui.setStandalone(true);
          if (!this.options.headlessMode)
            this.attachUI();
        }).catch((err) => {
          var _a;
          (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.FAILURE, {
            method: "relay::resetAndReload",
            message: `failed to reset and reload with ${err}`,
            sessionIdHash: this.getSessionIdHash()
          });
        });
      }
      setAppInfo(appName, appLogoUrl) {
        this.appName = appName;
        this.appLogoUrl = appLogoUrl;
      }
      getStorageItem(key) {
        return this.storage.getItem(key);
      }
      get session() {
        return this._session;
      }
      setStorageItem(key, value) {
        this.storage.setItem(key, value);
      }
      signEthereumMessage(message, address, addPrefix, typedDataJson) {
        return this.sendRequest({
          method: "signEthereumMessage",
          params: {
            message: (0, util_1.hexStringFromBuffer)(message, true),
            address,
            addPrefix,
            typedDataJson: typedDataJson || null
          }
        });
      }
      ethereumAddressFromSignedMessage(message, signature, addPrefix) {
        return this.sendRequest({
          method: "ethereumAddressFromSignedMessage",
          params: {
            message: (0, util_1.hexStringFromBuffer)(message, true),
            signature: (0, util_1.hexStringFromBuffer)(signature, true),
            addPrefix
          }
        });
      }
      signEthereumTransaction(params) {
        return this.sendRequest({
          method: "signEthereumTransaction",
          params: {
            fromAddress: params.fromAddress,
            toAddress: params.toAddress,
            weiValue: (0, util_1.bigIntStringFromBN)(params.weiValue),
            data: (0, util_1.hexStringFromBuffer)(params.data, true),
            nonce: params.nonce,
            gasPriceInWei: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
            maxFeePerGas: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
            maxPriorityFeePerGas: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
            gasLimit: params.gasLimit ? (0, util_1.bigIntStringFromBN)(params.gasLimit) : null,
            chainId: params.chainId,
            shouldSubmit: false
          }
        });
      }
      signAndSubmitEthereumTransaction(params) {
        return this.sendRequest({
          method: "signEthereumTransaction",
          params: {
            fromAddress: params.fromAddress,
            toAddress: params.toAddress,
            weiValue: (0, util_1.bigIntStringFromBN)(params.weiValue),
            data: (0, util_1.hexStringFromBuffer)(params.data, true),
            nonce: params.nonce,
            gasPriceInWei: params.gasPriceInWei ? (0, util_1.bigIntStringFromBN)(params.gasPriceInWei) : null,
            maxFeePerGas: params.maxFeePerGas ? (0, util_1.bigIntStringFromBN)(params.maxFeePerGas) : null,
            maxPriorityFeePerGas: params.maxPriorityFeePerGas ? (0, util_1.bigIntStringFromBN)(params.maxPriorityFeePerGas) : null,
            gasLimit: params.gasLimit ? (0, util_1.bigIntStringFromBN)(params.gasLimit) : null,
            chainId: params.chainId,
            shouldSubmit: true
          }
        });
      }
      submitEthereumTransaction(signedTransaction, chainId) {
        return this.sendRequest({
          method: "submitEthereumTransaction",
          params: {
            signedTransaction: (0, util_1.hexStringFromBuffer)(signedTransaction, true),
            chainId
          }
        });
      }
      scanQRCode(regExp) {
        return this.sendRequest({
          method: "scanQRCode",
          params: {
            regExp
          }
        });
      }
      getQRCodeUrl() {
        return (0, util_1.createQrUrl)(this._session.id, this._session.secret, this.linkAPIUrl, false, this.options.version, this.dappDefaultChain);
      }
      genericRequest(data, action) {
        return this.sendRequest({
          method: "generic",
          params: {
            action,
            data
          }
        });
      }
      sendGenericMessage(request) {
        return this.sendRequest(request);
      }
      sendRequest(request) {
        let hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
          this.publishWeb3RequestCanceledEvent(id);
          this.handleErrorResponse(id, request.method, error);
          hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        const promise = new Promise((resolve, reject) => {
          if (!this.ui.isStandalone()) {
            hideSnackbarItem = this.ui.showConnecting({
              isUnlinkedErrorState: this.isUnlinkedErrorState,
              onCancel: cancel,
              onResetConnection: this.resetAndReload
              // eslint-disable-line @typescript-eslint/unbound-method
            });
          }
          this.relayEventManager.callbacks.set(id, (response) => {
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
            if ((0, Web3Response_1.isErrorResponse)(response)) {
              return reject(new Error(response.errorMessage));
            }
            resolve(response);
          });
          if (this.ui.isStandalone()) {
            this.sendRequestStandalone(id, request);
          } else {
            this.publishWeb3RequestEvent(id, request);
          }
        });
        return { promise, cancel };
      }
      setConnectDisabled(disabled) {
        this.ui.setConnectDisabled(disabled);
      }
      setAccountsCallback(accountsCallback) {
        this.accountsCallback = accountsCallback;
      }
      setChainCallback(chainCallback) {
        this.chainCallback = chainCallback;
      }
      setDappDefaultChainCallback(chainId) {
        this.dappDefaultChain = chainId;
        if (this.ui instanceof WalletLinkRelayUI_1.WalletLinkRelayUI) {
          this.ui.setChainId(chainId);
        }
      }
      publishWeb3RequestEvent(id, request) {
        var _a;
        const message = { type: "WEB3_REQUEST", id, request };
        const storedSession = Session_1.Session.load(this.storage);
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.WEB3_REQUEST, {
          eventId: message.id,
          method: `relay::${request.method}`,
          sessionIdHash: this.getSessionIdHash(),
          storedSessionIdHash: storedSession ? Session_1.Session.hash(storedSession.id) : "",
          isSessionMismatched: ((storedSession === null || storedSession === void 0 ? void 0 : storedSession.id) !== this._session.id).toString()
        });
        this.publishEvent("Web3Request", message, true).then((_) => {
          var _a2;
          (_a2 = this.diagnostic) === null || _a2 === void 0 ? void 0 : _a2.log(DiagnosticLogger_1.EVENTS.WEB3_REQUEST_PUBLISHED, {
            eventId: message.id,
            method: `relay::${request.method}`,
            sessionIdHash: this.getSessionIdHash(),
            storedSessionIdHash: storedSession ? Session_1.Session.hash(storedSession.id) : "",
            isSessionMismatched: ((storedSession === null || storedSession === void 0 ? void 0 : storedSession.id) !== this._session.id).toString()
          });
        }).catch((err) => {
          this.handleWeb3ResponseMessage({
            type: "WEB3_RESPONSE",
            id: message.id,
            response: {
              method: request.method,
              errorMessage: err.message
            }
          });
        });
      }
      publishWeb3RequestCanceledEvent(id) {
        const message = {
          type: "WEB3_REQUEST_CANCELED",
          id
        };
        this.publishEvent("Web3RequestCanceled", message, false).then();
      }
      publishEvent(event, message, callWebhook) {
        return this.connection.publishEvent(event, message, callWebhook);
      }
      handleWeb3ResponseMessage(message) {
        var _a;
        const { response } = message;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.WEB3_RESPONSE, {
          eventId: message.id,
          method: `relay::${response.method}`,
          sessionIdHash: this.getSessionIdHash()
        });
        if (response.method === "requestEthereumAccounts") {
          _WalletLinkRelay.accountRequestCallbackIds.forEach((id) => this.invokeCallback(Object.assign(Object.assign({}, message), { id })));
          _WalletLinkRelay.accountRequestCallbackIds.clear();
          return;
        }
        this.invokeCallback(message);
      }
      handleErrorResponse(id, method, error, errorCode) {
        var _a;
        const errorMessage = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : (0, error_1.getMessageFromCode)(errorCode);
        this.handleWeb3ResponseMessage({
          type: "WEB3_RESPONSE",
          id,
          response: {
            method,
            errorMessage,
            errorCode
          }
        });
      }
      invokeCallback(message) {
        const callback = this.relayEventManager.callbacks.get(message.id);
        if (callback) {
          callback(message.response);
          this.relayEventManager.callbacks.delete(message.id);
        }
      }
      requestEthereumAccounts() {
        const request = {
          method: "requestEthereumAccounts",
          params: {
            appName: this.appName,
            appLogoUrl: this.appLogoUrl || null
          }
        };
        const hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
          this.publishWeb3RequestCanceledEvent(id);
          this.handleErrorResponse(id, request.method, error);
          hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        const promise = new Promise((resolve, reject) => {
          this.relayEventManager.callbacks.set(id, (response) => {
            this.ui.hideRequestEthereumAccounts();
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
            if ((0, Web3Response_1.isErrorResponse)(response)) {
              return reject(new Error(response.errorMessage));
            }
            resolve(response);
          });
          if (this.ui.inlineAccountsResponse()) {
            const onAccounts = (accounts) => {
              this.handleWeb3ResponseMessage({
                type: "WEB3_RESPONSE",
                id,
                response: { method: "requestEthereumAccounts", result: accounts }
              });
            };
            this.ui.requestEthereumAccounts({
              onCancel: cancel,
              onAccounts
            });
          } else {
            const err = error_1.standardErrors.provider.userRejectedRequest("User denied account authorization");
            this.ui.requestEthereumAccounts({
              onCancel: () => cancel(err)
            });
          }
          _WalletLinkRelay.accountRequestCallbackIds.add(id);
          if (!this.ui.inlineAccountsResponse() && !this.ui.isStandalone()) {
            this.publishWeb3RequestEvent(id, request);
          }
        });
        return { promise, cancel };
      }
      selectProvider(providerOptions) {
        const request = {
          method: "selectProvider",
          params: {
            providerOptions
          }
        };
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
          this.publishWeb3RequestCanceledEvent(id);
          this.handleErrorResponse(id, request.method, error);
        };
        const promise = new Promise((resolve, reject) => {
          this.relayEventManager.callbacks.set(id, (response) => {
            if ((0, Web3Response_1.isErrorResponse)(response)) {
              return reject(new Error(response.errorMessage));
            }
            resolve(response);
          });
          const _cancel = (_error) => {
            this.handleWeb3ResponseMessage({
              type: "WEB3_RESPONSE",
              id,
              response: { method: "selectProvider", result: type_1.ProviderType.Unselected }
            });
          };
          const approve = (selectedProviderKey) => {
            this.handleWeb3ResponseMessage({
              type: "WEB3_RESPONSE",
              id,
              response: { method: "selectProvider", result: selectedProviderKey }
            });
          };
          if (this.ui.selectProvider)
            this.ui.selectProvider({
              onApprove: approve,
              onCancel: _cancel,
              providerOptions
            });
        });
        return { cancel, promise };
      }
      watchAsset(type2, address, symbol, decimals, image, chainId) {
        const request = {
          method: "watchAsset",
          params: {
            type: type2,
            options: {
              address,
              symbol,
              decimals,
              image
            },
            chainId
          }
        };
        let hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
          this.publishWeb3RequestCanceledEvent(id);
          this.handleErrorResponse(id, request.method, error);
          hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        if (!this.ui.inlineWatchAsset()) {
          hideSnackbarItem = this.ui.showConnecting({
            isUnlinkedErrorState: this.isUnlinkedErrorState,
            onCancel: cancel,
            onResetConnection: this.resetAndReload
            // eslint-disable-line @typescript-eslint/unbound-method
          });
        }
        const promise = new Promise((resolve, reject) => {
          this.relayEventManager.callbacks.set(id, (response) => {
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
            if ((0, Web3Response_1.isErrorResponse)(response)) {
              return reject(new Error(response.errorMessage));
            }
            resolve(response);
          });
          const _cancel = (_error) => {
            this.handleWeb3ResponseMessage({
              type: "WEB3_RESPONSE",
              id,
              response: {
                method: "watchAsset",
                result: false
              }
            });
          };
          const approve = () => {
            this.handleWeb3ResponseMessage({
              type: "WEB3_RESPONSE",
              id,
              response: {
                method: "watchAsset",
                result: true
              }
            });
          };
          if (this.ui.inlineWatchAsset()) {
            this.ui.watchAsset({
              onApprove: approve,
              onCancel: _cancel,
              type: type2,
              address,
              symbol,
              decimals,
              image,
              chainId
            });
          }
          if (!this.ui.inlineWatchAsset() && !this.ui.isStandalone()) {
            this.publishWeb3RequestEvent(id, request);
          }
        });
        return { cancel, promise };
      }
      addEthereumChain(chainId, rpcUrls, iconUrls, blockExplorerUrls, chainName, nativeCurrency) {
        const request = {
          method: "addEthereumChain",
          params: {
            chainId,
            rpcUrls,
            blockExplorerUrls,
            chainName,
            iconUrls,
            nativeCurrency
          }
        };
        let hideSnackbarItem = null;
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
          this.publishWeb3RequestCanceledEvent(id);
          this.handleErrorResponse(id, request.method, error);
          hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
        };
        if (!this.ui.inlineAddEthereumChain(chainId)) {
          hideSnackbarItem = this.ui.showConnecting({
            isUnlinkedErrorState: this.isUnlinkedErrorState,
            onCancel: cancel,
            onResetConnection: this.resetAndReload
            // eslint-disable-line @typescript-eslint/unbound-method
          });
        }
        const promise = new Promise((resolve, reject) => {
          this.relayEventManager.callbacks.set(id, (response) => {
            hideSnackbarItem === null || hideSnackbarItem === void 0 ? void 0 : hideSnackbarItem();
            if ((0, Web3Response_1.isErrorResponse)(response)) {
              return reject(new Error(response.errorMessage));
            }
            resolve(response);
          });
          const _cancel = (_error) => {
            this.handleWeb3ResponseMessage({
              type: "WEB3_RESPONSE",
              id,
              response: {
                method: "addEthereumChain",
                result: {
                  isApproved: false,
                  rpcUrl: ""
                }
              }
            });
          };
          const approve = (rpcUrl) => {
            this.handleWeb3ResponseMessage({
              type: "WEB3_RESPONSE",
              id,
              response: {
                method: "addEthereumChain",
                result: {
                  isApproved: true,
                  rpcUrl
                }
              }
            });
          };
          if (this.ui.inlineAddEthereumChain(chainId)) {
            this.ui.addEthereumChain({
              onCancel: _cancel,
              onApprove: approve,
              chainId: request.params.chainId,
              rpcUrls: request.params.rpcUrls,
              blockExplorerUrls: request.params.blockExplorerUrls,
              chainName: request.params.chainName,
              iconUrls: request.params.iconUrls,
              nativeCurrency: request.params.nativeCurrency
            });
          }
          if (!this.ui.inlineAddEthereumChain(chainId) && !this.ui.isStandalone()) {
            this.publishWeb3RequestEvent(id, request);
          }
        });
        return { promise, cancel };
      }
      switchEthereumChain(chainId, address) {
        const request = {
          method: "switchEthereumChain",
          params: Object.assign({ chainId }, { address })
        };
        const id = (0, util_1.randomBytesHex)(8);
        const cancel = (error) => {
          this.publishWeb3RequestCanceledEvent(id);
          this.handleErrorResponse(id, request.method, error);
        };
        const promise = new Promise((resolve, reject) => {
          this.relayEventManager.callbacks.set(id, (response) => {
            if ((0, Web3Response_1.isErrorResponse)(response) && response.errorCode) {
              return reject(error_1.standardErrors.provider.custom({
                code: response.errorCode,
                message: `Unrecognized chain ID. Try adding the chain using addEthereumChain first.`
              }));
            } else if ((0, Web3Response_1.isErrorResponse)(response)) {
              return reject(new Error(response.errorMessage));
            }
            resolve(response);
          });
          const _cancel = (error) => {
            var _a;
            if (error) {
              const errorCode = (_a = (0, error_1.getErrorCode)(error)) !== null && _a !== void 0 ? _a : error_1.standardErrorCodes.provider.unsupportedChain;
              this.handleErrorResponse(id, "switchEthereumChain", error instanceof Error ? error : error_1.standardErrors.provider.unsupportedChain(chainId), errorCode);
            } else {
              this.handleWeb3ResponseMessage({
                type: "WEB3_RESPONSE",
                id,
                response: {
                  method: "switchEthereumChain",
                  result: {
                    isApproved: false,
                    rpcUrl: ""
                  }
                }
              });
            }
          };
          const approve = (rpcUrl) => {
            this.handleWeb3ResponseMessage({
              type: "WEB3_RESPONSE",
              id,
              response: {
                method: "switchEthereumChain",
                result: {
                  isApproved: true,
                  rpcUrl
                }
              }
            });
          };
          this.ui.switchEthereumChain({
            onCancel: _cancel,
            onApprove: approve,
            chainId: request.params.chainId,
            address: request.params.address
          });
          if (!this.ui.inlineSwitchEthereumChain() && !this.ui.isStandalone()) {
            this.publishWeb3RequestEvent(id, request);
          }
        });
        return { promise, cancel };
      }
      inlineAddEthereumChain(chainId) {
        return this.ui.inlineAddEthereumChain(chainId);
      }
      getSessionIdHash() {
        return Session_1.Session.hash(this._session.id);
      }
      sendRequestStandalone(id, request) {
        const _cancel = (error) => {
          this.handleErrorResponse(id, request.method, error);
        };
        const onSuccess = (response) => {
          this.handleWeb3ResponseMessage({
            type: "WEB3_RESPONSE",
            id,
            response
          });
        };
        switch (request.method) {
          case "signEthereumMessage":
            this.ui.signEthereumMessage({
              request,
              onSuccess,
              onCancel: _cancel
            });
            break;
          case "signEthereumTransaction":
            this.ui.signEthereumTransaction({
              request,
              onSuccess,
              onCancel: _cancel
            });
            break;
          case "submitEthereumTransaction":
            this.ui.submitEthereumTransaction({
              request,
              onSuccess,
              onCancel: _cancel
            });
            break;
          case "ethereumAddressFromSignedMessage":
            this.ui.ethereumAddressFromSignedMessage({
              request,
              onSuccess
            });
            break;
          default:
            _cancel();
            break;
        }
      }
    };
    exports.WalletLinkRelay = WalletLinkRelay;
    WalletLinkRelay.accountRequestCallbackIds = /* @__PURE__ */ new Set();
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/Snackbar/index.js
var require_Snackbar2 = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/Snackbar/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Snackbar(), exports);
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/RedirectDialog/RedirectDialog-css.js
var require_RedirectDialog_css = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/RedirectDialog/RedirectDialog-css.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = /* @__PURE__ */ (() => `.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s;background-color:rgba(10,11,13,.5)}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box{display:block;position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);padding:20px;border-radius:8px;background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box p{display:block;font-weight:400;font-size:14px;line-height:20px;padding-bottom:12px;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box button{appearance:none;border:none;background:none;color:#0052ff;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark{background-color:#0a0b0d;color:#fff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark button{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light{background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light button{color:#0052ff}`)();
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/RedirectDialog/RedirectDialog.js
var require_RedirectDialog = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/walletlink/ui/components/RedirectDialog/RedirectDialog.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RedirectDialog = void 0;
    var clsx_1 = __importDefault((init_clsx_m(), __toCommonJS(clsx_m_exports)));
    var preact_1 = (init_preact_module(), __toCommonJS(preact_module_exports));
    var cssReset_1 = require_cssReset();
    var Snackbar_1 = require_Snackbar2();
    var RedirectDialog_css_1 = __importDefault(require_RedirectDialog_css());
    var RedirectDialog = class {
      constructor() {
        this.root = null;
      }
      attach() {
        const el = document.documentElement;
        this.root = document.createElement("div");
        this.root.className = "-cbwsdk-css-reset";
        el.appendChild(this.root);
        (0, cssReset_1.injectCssReset)();
      }
      present(props) {
        this.render(props);
      }
      clear() {
        this.render(null);
      }
      render(props) {
        if (!this.root)
          return;
        (0, preact_1.render)(null, this.root);
        if (!props)
          return;
        (0, preact_1.render)((0, preact_1.h)(RedirectDialogContent, Object.assign({}, props, { onDismiss: () => {
          this.clear();
        } })), this.root);
      }
    };
    exports.RedirectDialog = RedirectDialog;
    var RedirectDialogContent = ({ title, buttonText, darkMode, onButtonClick, onDismiss }) => {
      const theme = darkMode ? "dark" : "light";
      return (0, preact_1.h)(
        Snackbar_1.SnackbarContainer,
        { darkMode },
        (0, preact_1.h)(
          "div",
          { class: "-cbwsdk-redirect-dialog" },
          (0, preact_1.h)("style", null, RedirectDialog_css_1.default),
          (0, preact_1.h)("div", { class: "-cbwsdk-redirect-dialog-backdrop", onClick: onDismiss }),
          (0, preact_1.h)(
            "div",
            { class: (0, clsx_1.default)("-cbwsdk-redirect-dialog-box", theme) },
            (0, preact_1.h)("p", null, title),
            (0, preact_1.h)("button", { onClick: onButtonClick }, buttonText)
          )
        )
      );
    };
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/mobile/MobileRelayUI.js
var require_MobileRelayUI = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/mobile/MobileRelayUI.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MobileRelayUI = void 0;
    var RedirectDialog_1 = require_RedirectDialog();
    var MobileRelayUI = class {
      constructor(options) {
        this.attached = false;
        this.darkMode = false;
        this.redirectDialog = new RedirectDialog_1.RedirectDialog();
        this.darkMode = options.darkMode;
      }
      attach() {
        if (this.attached) {
          throw new Error("Coinbase Wallet SDK UI is already attached");
        }
        this.redirectDialog.attach();
        this.attached = true;
      }
      setConnected(_connected) {
      }
      // no-op
      redirectToCoinbaseWallet(walletLinkUrl) {
        const url = new URL("https://go.cb-w.com/walletlink");
        url.searchParams.append("redirect_url", window.location.href);
        if (walletLinkUrl) {
          url.searchParams.append("wl_url", walletLinkUrl);
        }
        const anchorTag = document.createElement("a");
        anchorTag.target = "cbw-opener";
        anchorTag.href = url.href;
        anchorTag.rel = "noreferrer noopener";
        anchorTag.click();
      }
      openCoinbaseWalletDeeplink(walletLinkUrl) {
        this.redirectDialog.present({
          title: "Redirecting to Coinbase Wallet...",
          buttonText: "Open",
          darkMode: this.darkMode,
          onButtonClick: () => {
            this.redirectToCoinbaseWallet(walletLinkUrl);
          }
        });
        setTimeout(() => {
          this.redirectToCoinbaseWallet(walletLinkUrl);
        }, 99);
      }
      showConnecting(_options) {
        return () => {
          this.redirectDialog.clear();
        };
      }
      hideRequestEthereumAccounts() {
        this.redirectDialog.clear();
      }
      // -- Methods below are not needed for mobile
      requestEthereumAccounts() {
      }
      // no-op
      addEthereumChain() {
      }
      // no-op
      watchAsset() {
      }
      // no-op
      selectProvider() {
      }
      // no-op
      switchEthereumChain() {
      }
      // no-op
      signEthereumMessage() {
      }
      // no-op
      signEthereumTransaction() {
      }
      // no-op
      submitEthereumTransaction() {
      }
      // no-op
      ethereumAddressFromSignedMessage() {
      }
      // no-op
      reloadUI() {
      }
      // no-op
      setStandalone() {
      }
      // no-op
      setConnectDisabled() {
      }
      // no-op
      inlineAccountsResponse() {
        return false;
      }
      inlineAddEthereumChain() {
        return false;
      }
      inlineWatchAsset() {
        return false;
      }
      inlineSwitchEthereumChain() {
        return false;
      }
      isStandalone() {
        return false;
      }
    };
    exports.MobileRelayUI = MobileRelayUI;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/mobile/MobileRelay.js
var require_MobileRelay = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/mobile/MobileRelay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MobileRelay = void 0;
    var util_1 = require_util();
    var WalletLinkRelay_1 = require_WalletLinkRelay();
    var MobileRelayUI_1 = require_MobileRelayUI();
    var MobileRelay = class extends WalletLinkRelay_1.WalletLinkRelay {
      constructor(options) {
        var _a;
        super(options);
        this._enableMobileWalletLink = (_a = options.enableMobileWalletLink) !== null && _a !== void 0 ? _a : false;
      }
      // override
      requestEthereumAccounts() {
        if (this._enableMobileWalletLink) {
          return super.requestEthereumAccounts();
        }
        return {
          promise: new Promise(() => {
            const location2 = (0, util_1.getLocation)();
            location2.href = `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(location2.href)}`;
          }),
          cancel: () => {
          }
        };
      }
      // override
      publishWeb3RequestEvent(id, request) {
        super.publishWeb3RequestEvent(id, request);
        if (!(this._enableMobileWalletLink && this.ui instanceof MobileRelayUI_1.MobileRelayUI))
          return;
        let navigatedToCBW = false;
        switch (request.method) {
          case "requestEthereumAccounts":
          case "connectAndSignIn":
            navigatedToCBW = true;
            this.ui.openCoinbaseWalletDeeplink(this.getQRCodeUrl());
            break;
          case "switchEthereumChain":
            return;
          default:
            navigatedToCBW = true;
            this.ui.openCoinbaseWalletDeeplink();
            break;
        }
        if (navigatedToCBW) {
          window.addEventListener("blur", () => {
            window.addEventListener("focus", () => {
              this.connection.checkUnseenEvents();
            }, { once: true });
          }, { once: true });
        }
      }
      // override
      handleWeb3ResponseMessage(message) {
        super.handleWeb3ResponseMessage(message);
      }
      connectAndSignIn(params) {
        if (!this._enableMobileWalletLink) {
          throw new Error("connectAndSignIn is supported only when enableMobileWalletLink is on");
        }
        return this.sendRequest({
          method: "connectAndSignIn",
          params: {
            appName: this.appName,
            appLogoUrl: this.appLogoUrl,
            domain: window.location.hostname,
            aud: window.location.href,
            version: "1",
            type: "eip4361",
            nonce: params.nonce,
            iat: (/* @__PURE__ */ new Date()).toISOString(),
            chainId: `eip155:${this.dappDefaultChain}`,
            statement: params.statement,
            resources: params.resources
          }
        });
      }
    };
    exports.MobileRelay = MobileRelay;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/vendor-js/eth-eip712-util/util.js
var require_util2 = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/vendor-js/eth-eip712-util/util.js"(exports, module) {
    var createKeccakHash = require_js();
    var BN = require_bn();
    function zeros(bytes) {
      return Buffer.allocUnsafe(bytes).fill(0);
    }
    function setLength(msg, length, right) {
      const buf = zeros(length);
      msg = toBuffer(msg);
      if (right) {
        if (msg.length < length) {
          msg.copy(buf);
          return buf;
        }
        return msg.slice(0, length);
      } else {
        if (msg.length < length) {
          msg.copy(buf, length - msg.length);
          return buf;
        }
        return msg.slice(-length);
      }
    }
    function setLengthRight(msg, length) {
      return setLength(msg, length, true);
    }
    function toBuffer(v) {
      if (!Buffer.isBuffer(v)) {
        if (Array.isArray(v)) {
          v = Buffer.from(v);
        } else if (typeof v === "string") {
          if (isHexString(v)) {
            v = Buffer.from(padToEven(stripHexPrefix(v)), "hex");
          } else {
            v = Buffer.from(v);
          }
        } else if (typeof v === "number") {
          v = intToBuffer(v);
        } else if (v === null || v === void 0) {
          v = Buffer.allocUnsafe(0);
        } else if (BN.isBN(v)) {
          v = v.toArrayLike(Buffer);
        } else if (v.toArray) {
          v = Buffer.from(v.toArray());
        } else {
          throw new Error("invalid type");
        }
      }
      return v;
    }
    function bufferToHex(buf) {
      buf = toBuffer(buf);
      return "0x" + buf.toString("hex");
    }
    function keccak(a, bits) {
      a = toBuffer(a);
      if (!bits) bits = 256;
      return createKeccakHash("keccak" + bits).update(a).digest();
    }
    function padToEven(str) {
      return str.length % 2 ? "0" + str : str;
    }
    function isHexString(str) {
      return typeof str === "string" && str.match(/^0x[0-9A-Fa-f]*$/);
    }
    function stripHexPrefix(str) {
      if (typeof str === "string" && str.startsWith("0x")) {
        return str.slice(2);
      }
      return str;
    }
    module.exports = {
      zeros,
      setLength,
      setLengthRight,
      isHexString,
      stripHexPrefix,
      toBuffer,
      bufferToHex,
      keccak
    };
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/vendor-js/eth-eip712-util/abi.js
var require_abi = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/vendor-js/eth-eip712-util/abi.js"(exports, module) {
    var util = require_util2();
    var BN = require_bn();
    function elementaryName(name) {
      if (name.startsWith("int[")) {
        return "int256" + name.slice(3);
      } else if (name === "int") {
        return "int256";
      } else if (name.startsWith("uint[")) {
        return "uint256" + name.slice(4);
      } else if (name === "uint") {
        return "uint256";
      } else if (name.startsWith("fixed[")) {
        return "fixed128x128" + name.slice(5);
      } else if (name === "fixed") {
        return "fixed128x128";
      } else if (name.startsWith("ufixed[")) {
        return "ufixed128x128" + name.slice(6);
      } else if (name === "ufixed") {
        return "ufixed128x128";
      }
      return name;
    }
    function parseTypeN(type2) {
      return parseInt(/^\D+(\d+)$/.exec(type2)[1], 10);
    }
    function parseTypeNxM(type2) {
      var tmp = /^\D+(\d+)x(\d+)$/.exec(type2);
      return [parseInt(tmp[1], 10), parseInt(tmp[2], 10)];
    }
    function parseTypeArray(type2) {
      var tmp = type2.match(/(.*)\[(.*?)\]$/);
      if (tmp) {
        return tmp[2] === "" ? "dynamic" : parseInt(tmp[2], 10);
      }
      return null;
    }
    function parseNumber(arg) {
      var type2 = typeof arg;
      if (type2 === "string") {
        if (util.isHexString(arg)) {
          return new BN(util.stripHexPrefix(arg), 16);
        } else {
          return new BN(arg, 10);
        }
      } else if (type2 === "number") {
        return new BN(arg);
      } else if (arg.toArray) {
        return arg;
      } else {
        throw new Error("Argument is not a number");
      }
    }
    function encodeSingle(type2, arg) {
      var size2, num, ret, i;
      if (type2 === "address") {
        return encodeSingle("uint160", parseNumber(arg));
      } else if (type2 === "bool") {
        return encodeSingle("uint8", arg ? 1 : 0);
      } else if (type2 === "string") {
        return encodeSingle("bytes", new Buffer(arg, "utf8"));
      } else if (isArray(type2)) {
        if (typeof arg.length === "undefined") {
          throw new Error("Not an array?");
        }
        size2 = parseTypeArray(type2);
        if (size2 !== "dynamic" && size2 !== 0 && arg.length > size2) {
          throw new Error("Elements exceed array size: " + size2);
        }
        ret = [];
        type2 = type2.slice(0, type2.lastIndexOf("["));
        if (typeof arg === "string") {
          arg = JSON.parse(arg);
        }
        for (i in arg) {
          ret.push(encodeSingle(type2, arg[i]));
        }
        if (size2 === "dynamic") {
          var length = encodeSingle("uint256", arg.length);
          ret.unshift(length);
        }
        return Buffer.concat(ret);
      } else if (type2 === "bytes") {
        arg = new Buffer(arg);
        ret = Buffer.concat([encodeSingle("uint256", arg.length), arg]);
        if (arg.length % 32 !== 0) {
          ret = Buffer.concat([ret, util.zeros(32 - arg.length % 32)]);
        }
        return ret;
      } else if (type2.startsWith("bytes")) {
        size2 = parseTypeN(type2);
        if (size2 < 1 || size2 > 32) {
          throw new Error("Invalid bytes<N> width: " + size2);
        }
        return util.setLengthRight(arg, 32);
      } else if (type2.startsWith("uint")) {
        size2 = parseTypeN(type2);
        if (size2 % 8 || size2 < 8 || size2 > 256) {
          throw new Error("Invalid uint<N> width: " + size2);
        }
        num = parseNumber(arg);
        if (num.bitLength() > size2) {
          throw new Error("Supplied uint exceeds width: " + size2 + " vs " + num.bitLength());
        }
        if (num < 0) {
          throw new Error("Supplied uint is negative");
        }
        return num.toArrayLike(Buffer, "be", 32);
      } else if (type2.startsWith("int")) {
        size2 = parseTypeN(type2);
        if (size2 % 8 || size2 < 8 || size2 > 256) {
          throw new Error("Invalid int<N> width: " + size2);
        }
        num = parseNumber(arg);
        if (num.bitLength() > size2) {
          throw new Error("Supplied int exceeds width: " + size2 + " vs " + num.bitLength());
        }
        return num.toTwos(256).toArrayLike(Buffer, "be", 32);
      } else if (type2.startsWith("ufixed")) {
        size2 = parseTypeNxM(type2);
        num = parseNumber(arg);
        if (num < 0) {
          throw new Error("Supplied ufixed is negative");
        }
        return encodeSingle("uint256", num.mul(new BN(2).pow(new BN(size2[1]))));
      } else if (type2.startsWith("fixed")) {
        size2 = parseTypeNxM(type2);
        return encodeSingle("int256", parseNumber(arg).mul(new BN(2).pow(new BN(size2[1]))));
      }
      throw new Error("Unsupported or invalid type: " + type2);
    }
    function isDynamic(type2) {
      return type2 === "string" || type2 === "bytes" || parseTypeArray(type2) === "dynamic";
    }
    function isArray(type2) {
      return type2.lastIndexOf("]") === type2.length - 1;
    }
    function rawEncode(types, values) {
      var output = [];
      var data = [];
      var headLength = 32 * types.length;
      for (var i in types) {
        var type2 = elementaryName(types[i]);
        var value = values[i];
        var cur = encodeSingle(type2, value);
        if (isDynamic(type2)) {
          output.push(encodeSingle("uint256", headLength));
          data.push(cur);
          headLength += cur.length;
        } else {
          output.push(cur);
        }
      }
      return Buffer.concat(output.concat(data));
    }
    function solidityPack(types, values) {
      if (types.length !== values.length) {
        throw new Error("Number of types are not matching the values");
      }
      var size2, num;
      var ret = [];
      for (var i = 0; i < types.length; i++) {
        var type2 = elementaryName(types[i]);
        var value = values[i];
        if (type2 === "bytes") {
          ret.push(value);
        } else if (type2 === "string") {
          ret.push(new Buffer(value, "utf8"));
        } else if (type2 === "bool") {
          ret.push(new Buffer(value ? "01" : "00", "hex"));
        } else if (type2 === "address") {
          ret.push(util.setLength(value, 20));
        } else if (type2.startsWith("bytes")) {
          size2 = parseTypeN(type2);
          if (size2 < 1 || size2 > 32) {
            throw new Error("Invalid bytes<N> width: " + size2);
          }
          ret.push(util.setLengthRight(value, size2));
        } else if (type2.startsWith("uint")) {
          size2 = parseTypeN(type2);
          if (size2 % 8 || size2 < 8 || size2 > 256) {
            throw new Error("Invalid uint<N> width: " + size2);
          }
          num = parseNumber(value);
          if (num.bitLength() > size2) {
            throw new Error("Supplied uint exceeds width: " + size2 + " vs " + num.bitLength());
          }
          ret.push(num.toArrayLike(Buffer, "be", size2 / 8));
        } else if (type2.startsWith("int")) {
          size2 = parseTypeN(type2);
          if (size2 % 8 || size2 < 8 || size2 > 256) {
            throw new Error("Invalid int<N> width: " + size2);
          }
          num = parseNumber(value);
          if (num.bitLength() > size2) {
            throw new Error("Supplied int exceeds width: " + size2 + " vs " + num.bitLength());
          }
          ret.push(num.toTwos(size2).toArrayLike(Buffer, "be", size2 / 8));
        } else {
          throw new Error("Unsupported or invalid type: " + type2);
        }
      }
      return Buffer.concat(ret);
    }
    function soliditySHA3(types, values) {
      return util.keccak(solidityPack(types, values));
    }
    module.exports = {
      rawEncode,
      solidityPack,
      soliditySHA3
    };
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/vendor-js/eth-eip712-util/index.js
var require_eth_eip712_util = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/vendor-js/eth-eip712-util/index.js"(exports, module) {
    var util = require_util2();
    var abi = require_abi();
    var TYPED_MESSAGE_SCHEMA = {
      type: "object",
      properties: {
        types: {
          type: "object",
          additionalProperties: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                type: { type: "string" }
              },
              required: ["name", "type"]
            }
          }
        },
        primaryType: { type: "string" },
        domain: { type: "object" },
        message: { type: "object" }
      },
      required: ["types", "primaryType", "domain", "message"]
    };
    var TypedDataUtils = {
      /**
       * Encodes an object by encoding and concatenating each of its members
       *
       * @param {string} primaryType - Root type
       * @param {Object} data - Object to encode
       * @param {Object} types - Type definitions
       * @returns {string} - Encoded representation of an object
       */
      encodeData(primaryType, data, types, useV4 = true) {
        const encodedTypes = ["bytes32"];
        const encodedValues = [this.hashType(primaryType, types)];
        if (useV4) {
          const encodeField = (name, type2, value) => {
            if (types[type2] !== void 0) {
              return ["bytes32", value == null ? "0x0000000000000000000000000000000000000000000000000000000000000000" : util.keccak(this.encodeData(type2, value, types, useV4))];
            }
            if (value === void 0)
              throw new Error(`missing value for field ${name} of type ${type2}`);
            if (type2 === "bytes") {
              return ["bytes32", util.keccak(value)];
            }
            if (type2 === "string") {
              if (typeof value === "string") {
                value = Buffer.from(value, "utf8");
              }
              return ["bytes32", util.keccak(value)];
            }
            if (type2.lastIndexOf("]") === type2.length - 1) {
              const parsedType = type2.slice(0, type2.lastIndexOf("["));
              const typeValuePairs = value.map((item) => encodeField(name, parsedType, item));
              return ["bytes32", util.keccak(abi.rawEncode(
                typeValuePairs.map(([type3]) => type3),
                typeValuePairs.map(([, value2]) => value2)
              ))];
            }
            return [type2, value];
          };
          for (const field of types[primaryType]) {
            const [type2, value] = encodeField(field.name, field.type, data[field.name]);
            encodedTypes.push(type2);
            encodedValues.push(value);
          }
        } else {
          for (const field of types[primaryType]) {
            let value = data[field.name];
            if (value !== void 0) {
              if (field.type === "bytes") {
                encodedTypes.push("bytes32");
                value = util.keccak(value);
                encodedValues.push(value);
              } else if (field.type === "string") {
                encodedTypes.push("bytes32");
                if (typeof value === "string") {
                  value = Buffer.from(value, "utf8");
                }
                value = util.keccak(value);
                encodedValues.push(value);
              } else if (types[field.type] !== void 0) {
                encodedTypes.push("bytes32");
                value = util.keccak(this.encodeData(field.type, value, types, useV4));
                encodedValues.push(value);
              } else if (field.type.lastIndexOf("]") === field.type.length - 1) {
                throw new Error("Arrays currently unimplemented in encodeData");
              } else {
                encodedTypes.push(field.type);
                encodedValues.push(value);
              }
            }
          }
        }
        return abi.rawEncode(encodedTypes, encodedValues);
      },
      /**
       * Encodes the type of an object by encoding a comma delimited list of its members
       *
       * @param {string} primaryType - Root type to encode
       * @param {Object} types - Type definitions
       * @returns {string} - Encoded representation of the type of an object
       */
      encodeType(primaryType, types) {
        let result = "";
        let deps = this.findTypeDependencies(primaryType, types).filter((dep) => dep !== primaryType);
        deps = [primaryType].concat(deps.sort());
        for (const type2 of deps) {
          const children = types[type2];
          if (!children) {
            throw new Error("No type definition specified: " + type2);
          }
          result += type2 + "(" + types[type2].map(({ name, type: type3 }) => type3 + " " + name).join(",") + ")";
        }
        return result;
      },
      /**
       * Finds all types within a type defintion object
       *
       * @param {string} primaryType - Root type
       * @param {Object} types - Type definitions
       * @param {Array} results - current set of accumulated types
       * @returns {Array} - Set of all types found in the type definition
       */
      findTypeDependencies(primaryType, types, results = []) {
        primaryType = primaryType.match(/^\w*/)[0];
        if (results.includes(primaryType) || types[primaryType] === void 0) {
          return results;
        }
        results.push(primaryType);
        for (const field of types[primaryType]) {
          for (const dep of this.findTypeDependencies(field.type, types, results)) {
            !results.includes(dep) && results.push(dep);
          }
        }
        return results;
      },
      /**
       * Hashes an object
       *
       * @param {string} primaryType - Root type
       * @param {Object} data - Object to hash
       * @param {Object} types - Type definitions
       * @returns {Buffer} - Hash of an object
       */
      hashStruct(primaryType, data, types, useV4 = true) {
        return util.keccak(this.encodeData(primaryType, data, types, useV4));
      },
      /**
       * Hashes the type of an object
       *
       * @param {string} primaryType - Root type to hash
       * @param {Object} types - Type definitions
       * @returns {string} - Hash of an object
       */
      hashType(primaryType, types) {
        return util.keccak(this.encodeType(primaryType, types));
      },
      /**
       * Removes properties from a message object that are not defined per EIP-712
       *
       * @param {Object} data - typed message object
       * @returns {Object} - typed message object with only allowed fields
       */
      sanitizeData(data) {
        const sanitizedData = {};
        for (const key in TYPED_MESSAGE_SCHEMA.properties) {
          data[key] && (sanitizedData[key] = data[key]);
        }
        if (sanitizedData.types) {
          sanitizedData.types = Object.assign({ EIP712Domain: [] }, sanitizedData.types);
        }
        return sanitizedData;
      },
      /**
       * Returns the hash of a typed message as per EIP-712 for signing
       *
       * @param {Object} typedData - Types message data to sign
       * @returns {string} - sha3 hash for signing
       */
      hash(typedData, useV4 = true) {
        const sanitizedData = this.sanitizeData(typedData);
        const parts = [Buffer.from("1901", "hex")];
        parts.push(this.hashStruct("EIP712Domain", sanitizedData.domain, sanitizedData.types, useV4));
        if (sanitizedData.primaryType !== "EIP712Domain") {
          parts.push(this.hashStruct(sanitizedData.primaryType, sanitizedData.message, sanitizedData.types, useV4));
        }
        return util.keccak(Buffer.concat(parts));
      }
    };
    module.exports = {
      TYPED_MESSAGE_SCHEMA,
      TypedDataUtils,
      hashForSignTypedDataLegacy: function(msgParams) {
        return typedSignatureHashLegacy(msgParams.data);
      },
      hashForSignTypedData_v3: function(msgParams) {
        return TypedDataUtils.hash(msgParams.data, false);
      },
      hashForSignTypedData_v4: function(msgParams) {
        return TypedDataUtils.hash(msgParams.data);
      }
    };
    function typedSignatureHashLegacy(typedData) {
      const error = new Error("Expect argument to be non-empty array");
      if (typeof typedData !== "object" || !typedData.length) throw error;
      const data = typedData.map(function(e) {
        return e.type === "bytes" ? util.toBuffer(e.value) : e.value;
      });
      const types = typedData.map(function(e) {
        return e.type;
      });
      const schema = typedData.map(function(e) {
        if (!e.name) throw error;
        return e.type + " " + e.name;
      });
      return abi.soliditySHA3(
        ["bytes32", "bytes32"],
        [
          abi.soliditySHA3(new Array(typedData.length).fill("string"), schema),
          abi.soliditySHA3(types, data)
        ]
      );
    }
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/provider/FilterPolyfill.js
var require_FilterPolyfill = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/provider/FilterPolyfill.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.filterFromParam = exports.FilterPolyfill = void 0;
    var type_1 = require_type();
    var util_1 = require_util();
    var TIMEOUT = 5 * 60 * 1e3;
    var JSONRPC_TEMPLATE = {
      jsonrpc: "2.0",
      id: 0
    };
    var FilterPolyfill = class {
      constructor(provider) {
        this.logFilters = /* @__PURE__ */ new Map();
        this.blockFilters = /* @__PURE__ */ new Set();
        this.pendingTransactionFilters = /* @__PURE__ */ new Set();
        this.cursors = /* @__PURE__ */ new Map();
        this.timeouts = /* @__PURE__ */ new Map();
        this.nextFilterId = (0, type_1.IntNumber)(1);
        this.REQUEST_THROTTLE_INTERVAL = 1e3;
        this.lastFetchTimestamp = /* @__PURE__ */ new Date(0);
        this.resolvers = [];
        this.provider = provider;
      }
      async newFilter(param) {
        const filter = filterFromParam(param);
        const id = this.makeFilterId();
        const cursor = await this.setInitialCursorPosition(id, filter.fromBlock);
        console.info(`Installing new log filter(${id}):`, filter, "initial cursor position:", cursor);
        this.logFilters.set(id, filter);
        this.setFilterTimeout(id);
        return (0, util_1.hexStringFromIntNumber)(id);
      }
      async newBlockFilter() {
        const id = this.makeFilterId();
        const cursor = await this.setInitialCursorPosition(id, "latest");
        console.info(`Installing new block filter (${id}) with initial cursor position:`, cursor);
        this.blockFilters.add(id);
        this.setFilterTimeout(id);
        return (0, util_1.hexStringFromIntNumber)(id);
      }
      async newPendingTransactionFilter() {
        const id = this.makeFilterId();
        const cursor = await this.setInitialCursorPosition(id, "latest");
        console.info(`Installing new block filter (${id}) with initial cursor position:`, cursor);
        this.pendingTransactionFilters.add(id);
        this.setFilterTimeout(id);
        return (0, util_1.hexStringFromIntNumber)(id);
      }
      uninstallFilter(filterId) {
        const id = (0, util_1.intNumberFromHexString)(filterId);
        console.info(`Uninstalling filter (${id})`);
        this.deleteFilter(id);
        return true;
      }
      getFilterChanges(filterId) {
        const id = (0, util_1.intNumberFromHexString)(filterId);
        if (this.timeouts.has(id)) {
          this.setFilterTimeout(id);
        }
        if (this.logFilters.has(id)) {
          return this.getLogFilterChanges(id);
        } else if (this.blockFilters.has(id)) {
          return this.getBlockFilterChanges(id);
        } else if (this.pendingTransactionFilters.has(id)) {
          return this.getPendingTransactionFilterChanges(id);
        }
        return Promise.resolve(filterNotFoundError());
      }
      async getFilterLogs(filterId) {
        const id = (0, util_1.intNumberFromHexString)(filterId);
        const filter = this.logFilters.get(id);
        if (!filter) {
          return filterNotFoundError();
        }
        return this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), { method: "eth_getLogs", params: [paramFromFilter(filter)] }));
      }
      makeFilterId() {
        return (0, type_1.IntNumber)(++this.nextFilterId);
      }
      sendAsyncPromise(request) {
        return new Promise((resolve, reject) => {
          this.provider.sendAsync(request, (err, response) => {
            if (err) {
              return reject(err);
            }
            if (Array.isArray(response) || response == null) {
              return reject(new Error(`unexpected response received: ${JSON.stringify(response)}`));
            }
            resolve(response);
          });
        });
      }
      deleteFilter(id) {
        console.info(`Deleting filter (${id})`);
        this.logFilters.delete(id);
        this.blockFilters.delete(id);
        this.pendingTransactionFilters.delete(id);
        this.cursors.delete(id);
        this.timeouts.delete(id);
      }
      async getLogFilterChanges(id) {
        const filter = this.logFilters.get(id);
        const cursorPosition = this.cursors.get(id);
        if (!cursorPosition || !filter) {
          return filterNotFoundError();
        }
        const currentBlockHeight = await this.getCurrentBlockHeight();
        const toBlock = filter.toBlock === "latest" ? currentBlockHeight : filter.toBlock;
        if (cursorPosition > currentBlockHeight) {
          return emptyResult();
        }
        if (cursorPosition > Number(filter.toBlock)) {
          return emptyResult();
        }
        console.info(`Fetching logs from ${cursorPosition} to ${toBlock} for filter ${id}`);
        const response = await this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), { method: "eth_getLogs", params: [
          paramFromFilter(Object.assign(Object.assign({}, filter), { fromBlock: cursorPosition, toBlock }))
        ] }));
        if (Array.isArray(response.result)) {
          const blocks = response.result.map((log) => (0, util_1.intNumberFromHexString)(log.blockNumber || "0x0"));
          const highestBlock = Math.max(...blocks);
          if (highestBlock && highestBlock > cursorPosition) {
            const newCursorPosition = (0, type_1.IntNumber)(highestBlock + 1);
            console.info(`Moving cursor position for filter (${id}) from ${cursorPosition} to ${newCursorPosition}`);
            this.cursors.set(id, newCursorPosition);
          }
        }
        return response;
      }
      async getBlockFilterChanges(id) {
        const cursorPosition = this.cursors.get(id);
        if (!cursorPosition) {
          return filterNotFoundError();
        }
        const currentBlockHeight = await this.getCurrentBlockHeight();
        if (cursorPosition > currentBlockHeight) {
          return emptyResult();
        }
        console.info(`Fetching blocks from ${cursorPosition} to ${currentBlockHeight} for filter (${id})`);
        const blocks = (await Promise.all(
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          (0, util_1.range)(cursorPosition, currentBlockHeight + 1).map((i) => this.getBlockHashByNumber((0, type_1.IntNumber)(i)))
        )).filter((hash) => !!hash);
        const newCursorPosition = (0, type_1.IntNumber)(cursorPosition + blocks.length);
        console.info(`Moving cursor position for filter (${id}) from ${cursorPosition} to ${newCursorPosition}`);
        this.cursors.set(id, newCursorPosition);
        return Object.assign(Object.assign({}, JSONRPC_TEMPLATE), { result: blocks });
      }
      async getPendingTransactionFilterChanges(_id) {
        return Promise.resolve(emptyResult());
      }
      async setInitialCursorPosition(id, startBlock) {
        const currentBlockHeight = await this.getCurrentBlockHeight();
        const initialCursorPosition = typeof startBlock === "number" && startBlock > currentBlockHeight ? startBlock : currentBlockHeight;
        this.cursors.set(id, initialCursorPosition);
        return initialCursorPosition;
      }
      setFilterTimeout(id) {
        const existing = this.timeouts.get(id);
        if (existing) {
          window.clearTimeout(existing);
        }
        const timeout = window.setTimeout(() => {
          console.info(`Filter (${id}) timed out`);
          this.deleteFilter(id);
        }, TIMEOUT);
        this.timeouts.set(id, timeout);
      }
      // throttle eth_blockNumber requests
      async getCurrentBlockHeight() {
        const now = /* @__PURE__ */ new Date();
        if (now.getTime() - this.lastFetchTimestamp.getTime() > this.REQUEST_THROTTLE_INTERVAL) {
          this.lastFetchTimestamp = now;
          const height = await this._getCurrentBlockHeight();
          this.currentBlockHeight = height;
          this.resolvers.forEach((resolve) => resolve(height));
          this.resolvers = [];
        }
        if (!this.currentBlockHeight) {
          return new Promise((resolve) => this.resolvers.push(resolve));
        }
        return this.currentBlockHeight;
      }
      async _getCurrentBlockHeight() {
        const { result } = await this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), { method: "eth_blockNumber", params: [] }));
        return (0, util_1.intNumberFromHexString)((0, util_1.ensureHexString)(result));
      }
      async getBlockHashByNumber(blockNumber) {
        const response = await this.sendAsyncPromise(Object.assign(Object.assign({}, JSONRPC_TEMPLATE), { method: "eth_getBlockByNumber", params: [(0, util_1.hexStringFromIntNumber)(blockNumber), false] }));
        if (response.result && typeof response.result.hash === "string") {
          return (0, util_1.ensureHexString)(response.result.hash);
        }
        return null;
      }
    };
    exports.FilterPolyfill = FilterPolyfill;
    function filterFromParam(param) {
      return {
        fromBlock: intBlockHeightFromHexBlockHeight(param.fromBlock),
        toBlock: intBlockHeightFromHexBlockHeight(param.toBlock),
        addresses: param.address === void 0 ? null : Array.isArray(param.address) ? param.address : [param.address],
        topics: param.topics || []
      };
    }
    exports.filterFromParam = filterFromParam;
    function paramFromFilter(filter) {
      const param = {
        fromBlock: hexBlockHeightFromIntBlockHeight(filter.fromBlock),
        toBlock: hexBlockHeightFromIntBlockHeight(filter.toBlock),
        topics: filter.topics
      };
      if (filter.addresses !== null) {
        param.address = filter.addresses;
      }
      return param;
    }
    function intBlockHeightFromHexBlockHeight(value) {
      if (value === void 0 || value === "latest" || value === "pending") {
        return "latest";
      } else if (value === "earliest") {
        return (0, type_1.IntNumber)(0);
      } else if ((0, util_1.isHexString)(value)) {
        return (0, util_1.intNumberFromHexString)(value);
      }
      throw new Error(`Invalid block option: ${String(value)}`);
    }
    function hexBlockHeightFromIntBlockHeight(value) {
      if (value === "latest") {
        return value;
      }
      return (0, util_1.hexStringFromIntNumber)(value);
    }
    function filterNotFoundError() {
      return Object.assign(Object.assign({}, JSONRPC_TEMPLATE), { error: { code: -32e3, message: "filter not found" } });
    }
    function emptyResult() {
      return Object.assign(Object.assign({}, JSONRPC_TEMPLATE), { result: [] });
    }
  }
});

// node_modules/.pnpm/json-rpc-random-id@1.0.1/node_modules/json-rpc-random-id/index.js
var require_json_rpc_random_id = __commonJS({
  "node_modules/.pnpm/json-rpc-random-id@1.0.1/node_modules/json-rpc-random-id/index.js"(exports, module) {
    module.exports = IdIterator;
    function IdIterator(opts) {
      opts = opts || {};
      var max2 = opts.max || Number.MAX_SAFE_INTEGER;
      var idCounter = typeof opts.start !== "undefined" ? opts.start : Math.floor(Math.random() * max2);
      return function createRandomId() {
        idCounter = idCounter % max2;
        return idCounter++;
      };
    }
  }
});

// node_modules/.pnpm/pify@3.0.0/node_modules/pify/index.js
var require_pify = __commonJS({
  "node_modules/.pnpm/pify@3.0.0/node_modules/pify/index.js"(exports, module) {
    "use strict";
    var processFn = (fn, opts) => function() {
      const P = opts.promiseModule;
      const args = new Array(arguments.length);
      for (let i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }
      return new P((resolve, reject) => {
        if (opts.errorFirst) {
          args.push(function(err, result) {
            if (opts.multiArgs) {
              const results = new Array(arguments.length - 1);
              for (let i = 1; i < arguments.length; i++) {
                results[i - 1] = arguments[i];
              }
              if (err) {
                results.unshift(err);
                reject(results);
              } else {
                resolve(results);
              }
            } else if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        } else {
          args.push(function(result) {
            if (opts.multiArgs) {
              const results = new Array(arguments.length - 1);
              for (let i = 0; i < arguments.length; i++) {
                results[i] = arguments[i];
              }
              resolve(results);
            } else {
              resolve(result);
            }
          });
        }
        fn.apply(this, args);
      });
    };
    module.exports = (obj, opts) => {
      opts = Object.assign({
        exclude: [/.+(Sync|Stream)$/],
        errorFirst: true,
        promiseModule: Promise
      }, opts);
      const filter = (key) => {
        const match = (pattern2) => typeof pattern2 === "string" ? key === pattern2 : pattern2.test(key);
        return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
      };
      let ret;
      if (typeof obj === "function") {
        ret = function() {
          if (opts.excludeMain) {
            return obj.apply(this, arguments);
          }
          return processFn(obj, opts).apply(this, arguments);
        };
      } else {
        ret = Object.create(Object.getPrototypeOf(obj));
      }
      for (const key in obj) {
        const x = obj[key];
        ret[key] = typeof x === "function" && filter(key) ? processFn(x, opts) : x;
      }
      return ret;
    };
  }
});

// node_modules/.pnpm/@metamask+safe-event-emitter@3.1.1/node_modules/@metamask/safe-event-emitter/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/.pnpm/@metamask+safe-event-emitter@3.1.1/node_modules/@metamask/safe-event-emitter/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var events_1 = require_events();
    function safeApply(handler, context, args) {
      try {
        Reflect.apply(handler, context, args);
      } catch (err) {
        setTimeout(() => {
          throw err;
        });
      }
    }
    function arrayClone(arr) {
      const n = arr.length;
      const copy = new Array(n);
      for (let i = 0; i < n; i += 1) {
        copy[i] = arr[i];
      }
      return copy;
    }
    var SafeEventEmitter = class extends events_1.EventEmitter {
      emit(type2, ...args) {
        let doError = type2 === "error";
        const events = this._events;
        if (events !== void 0) {
          doError = doError && events.error === void 0;
        } else if (!doError) {
          return false;
        }
        if (doError) {
          let er;
          if (args.length > 0) {
            [er] = args;
          }
          if (er instanceof Error) {
            throw er;
          }
          const err = new Error(`Unhandled error.${er ? ` (${er.message})` : ""}`);
          err.context = er;
          throw err;
        }
        const handler = events[type2];
        if (handler === void 0) {
          return false;
        }
        if (typeof handler === "function") {
          safeApply(handler, this, args);
        } else {
          const len = handler.length;
          const listeners = arrayClone(handler);
          for (let i = 0; i < len; i += 1) {
            safeApply(listeners[i], this, args);
          }
        }
        return true;
      }
    };
    exports.default = SafeEventEmitter;
  }
});

// node_modules/.pnpm/eth-block-tracker@7.1.0/node_modules/eth-block-tracker/dist/BaseBlockTracker.js
var require_BaseBlockTracker = __commonJS({
  "node_modules/.pnpm/eth-block-tracker@7.1.0/node_modules/eth-block-tracker/dist/BaseBlockTracker.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseBlockTracker = void 0;
    var safe_event_emitter_1 = __importDefault(require_cjs());
    var sec = 1e3;
    var calculateSum = (accumulator, currentValue) => accumulator + currentValue;
    var blockTrackerEvents = ["sync", "latest"];
    var BaseBlockTracker = class extends safe_event_emitter_1.default {
      constructor(opts) {
        super();
        this._blockResetDuration = opts.blockResetDuration || 20 * sec;
        this._usePastBlocks = opts.usePastBlocks || false;
        this._currentBlock = null;
        this._isRunning = false;
        this._onNewListener = this._onNewListener.bind(this);
        this._onRemoveListener = this._onRemoveListener.bind(this);
        this._resetCurrentBlock = this._resetCurrentBlock.bind(this);
        this._setupInternalEvents();
      }
      async destroy() {
        this._cancelBlockResetTimeout();
        await this._maybeEnd();
        super.removeAllListeners();
      }
      isRunning() {
        return this._isRunning;
      }
      getCurrentBlock() {
        return this._currentBlock;
      }
      async getLatestBlock() {
        if (this._currentBlock) {
          return this._currentBlock;
        }
        const latestBlock = await new Promise((resolve) => this.once("latest", resolve));
        return latestBlock;
      }
      // dont allow module consumer to remove our internal event listeners
      removeAllListeners(eventName) {
        if (eventName) {
          super.removeAllListeners(eventName);
        } else {
          super.removeAllListeners();
        }
        this._setupInternalEvents();
        this._onRemoveListener();
        return this;
      }
      _setupInternalEvents() {
        this.removeListener("newListener", this._onNewListener);
        this.removeListener("removeListener", this._onRemoveListener);
        this.on("newListener", this._onNewListener);
        this.on("removeListener", this._onRemoveListener);
      }
      _onNewListener(eventName) {
        if (blockTrackerEvents.includes(eventName)) {
          this._maybeStart();
        }
      }
      _onRemoveListener() {
        if (this._getBlockTrackerEventCount() > 0) {
          return;
        }
        this._maybeEnd();
      }
      async _maybeStart() {
        if (this._isRunning) {
          return;
        }
        this._isRunning = true;
        this._cancelBlockResetTimeout();
        await this._start();
        this.emit("_started");
      }
      async _maybeEnd() {
        if (!this._isRunning) {
          return;
        }
        this._isRunning = false;
        this._setupBlockResetTimeout();
        await this._end();
        this.emit("_ended");
      }
      _getBlockTrackerEventCount() {
        return blockTrackerEvents.map((eventName) => this.listenerCount(eventName)).reduce(calculateSum);
      }
      _shouldUseNewBlock(newBlock) {
        const currentBlock = this._currentBlock;
        if (!currentBlock) {
          return true;
        }
        const newBlockInt = hexToInt(newBlock);
        const currentBlockInt = hexToInt(currentBlock);
        return this._usePastBlocks && newBlockInt < currentBlockInt || newBlockInt > currentBlockInt;
      }
      _newPotentialLatest(newBlock) {
        if (!this._shouldUseNewBlock(newBlock)) {
          return;
        }
        this._setCurrentBlock(newBlock);
      }
      _setCurrentBlock(newBlock) {
        const oldBlock = this._currentBlock;
        this._currentBlock = newBlock;
        this.emit("latest", newBlock);
        this.emit("sync", { oldBlock, newBlock });
      }
      _setupBlockResetTimeout() {
        this._cancelBlockResetTimeout();
        this._blockResetTimeout = setTimeout(this._resetCurrentBlock, this._blockResetDuration);
        if (this._blockResetTimeout.unref) {
          this._blockResetTimeout.unref();
        }
      }
      _cancelBlockResetTimeout() {
        if (this._blockResetTimeout) {
          clearTimeout(this._blockResetTimeout);
        }
      }
      _resetCurrentBlock() {
        this._currentBlock = null;
      }
    };
    exports.BaseBlockTracker = BaseBlockTracker;
    function hexToInt(hexInt) {
      return Number.parseInt(hexInt, 16);
    }
  }
});

// node_modules/.pnpm/superstruct@1.0.4/node_modules/superstruct/dist/index.mjs
var dist_exports = {};
__export(dist_exports, {
  Struct: () => Struct,
  StructError: () => StructError,
  any: () => any,
  array: () => array,
  assert: () => assert,
  assign: () => assign,
  bigint: () => bigint,
  boolean: () => boolean,
  coerce: () => coerce,
  create: () => create,
  date: () => date,
  defaulted: () => defaulted,
  define: () => define,
  deprecated: () => deprecated,
  dynamic: () => dynamic,
  empty: () => empty,
  enums: () => enums,
  func: () => func,
  instance: () => instance,
  integer: () => integer,
  intersection: () => intersection,
  is: () => is,
  lazy: () => lazy,
  literal: () => literal,
  map: () => map,
  mask: () => mask,
  max: () => max,
  min: () => min,
  never: () => never,
  nonempty: () => nonempty,
  nullable: () => nullable,
  number: () => number,
  object: () => object,
  omit: () => omit,
  optional: () => optional,
  partial: () => partial,
  pattern: () => pattern,
  pick: () => pick,
  record: () => record,
  refine: () => refine,
  regexp: () => regexp,
  set: () => set,
  size: () => size,
  string: () => string,
  struct: () => struct,
  trimmed: () => trimmed,
  tuple: () => tuple,
  type: () => type,
  union: () => union,
  unknown: () => unknown,
  validate: () => validate
});
function isIterable(x) {
  return isObject(x) && typeof x[Symbol.iterator] === "function";
}
function isObject(x) {
  return typeof x === "object" && x != null;
}
function isPlainObject(x) {
  if (Object.prototype.toString.call(x) !== "[object Object]") {
    return false;
  }
  const prototype = Object.getPrototypeOf(x);
  return prototype === null || prototype === Object.prototype;
}
function print(value) {
  if (typeof value === "symbol") {
    return value.toString();
  }
  return typeof value === "string" ? JSON.stringify(value) : `${value}`;
}
function shiftIterator(input) {
  const { done, value } = input.next();
  return done ? void 0 : value;
}
function toFailure(result, context, struct2, value) {
  if (result === true) {
    return;
  } else if (result === false) {
    result = {};
  } else if (typeof result === "string") {
    result = { message: result };
  }
  const { path, branch } = context;
  const { type: type2 } = struct2;
  const { refinement, message = `Expected a value of type \`${type2}\`${refinement ? ` with refinement \`${refinement}\`` : ""}, but received: \`${print(value)}\`` } = result;
  return {
    value,
    type: type2,
    refinement,
    key: path[path.length - 1],
    path,
    branch,
    ...result,
    message
  };
}
function* toFailures(result, context, struct2, value) {
  if (!isIterable(result)) {
    result = [result];
  }
  for (const r of result) {
    const failure = toFailure(r, context, struct2, value);
    if (failure) {
      yield failure;
    }
  }
}
function* run(value, struct2, options = {}) {
  const { path = [], branch = [value], coerce: coerce2 = false, mask: mask2 = false } = options;
  const ctx = { path, branch };
  if (coerce2) {
    value = struct2.coercer(value, ctx);
    if (mask2 && struct2.type !== "type" && isObject(struct2.schema) && isObject(value) && !Array.isArray(value)) {
      for (const key in value) {
        if (struct2.schema[key] === void 0) {
          delete value[key];
        }
      }
    }
  }
  let status = "valid";
  for (const failure of struct2.validator(value, ctx)) {
    failure.explanation = options.message;
    status = "not_valid";
    yield [failure, void 0];
  }
  for (let [k, v, s] of struct2.entries(value, ctx)) {
    const ts = run(v, s, {
      path: k === void 0 ? path : [...path, k],
      branch: k === void 0 ? branch : [...branch, v],
      coerce: coerce2,
      mask: mask2,
      message: options.message
    });
    for (const t of ts) {
      if (t[0]) {
        status = t[0].refinement != null ? "not_refined" : "not_valid";
        yield [t[0], void 0];
      } else if (coerce2) {
        v = t[1];
        if (k === void 0) {
          value = v;
        } else if (value instanceof Map) {
          value.set(k, v);
        } else if (value instanceof Set) {
          value.add(v);
        } else if (isObject(value)) {
          if (v !== void 0 || k in value)
            value[k] = v;
        }
      }
    }
  }
  if (status !== "not_valid") {
    for (const failure of struct2.refiner(value, ctx)) {
      failure.explanation = options.message;
      status = "not_refined";
      yield [failure, void 0];
    }
  }
  if (status === "valid") {
    yield [void 0, value];
  }
}
function assert(value, struct2, message) {
  const result = validate(value, struct2, { message });
  if (result[0]) {
    throw result[0];
  }
}
function create(value, struct2, message) {
  const result = validate(value, struct2, { coerce: true, message });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function mask(value, struct2, message) {
  const result = validate(value, struct2, { coerce: true, mask: true, message });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function is(value, struct2) {
  const result = validate(value, struct2);
  return !result[0];
}
function validate(value, struct2, options = {}) {
  const tuples = run(value, struct2, options);
  const tuple2 = shiftIterator(tuples);
  if (tuple2[0]) {
    const error = new StructError(tuple2[0], function* () {
      for (const t of tuples) {
        if (t[0]) {
          yield t[0];
        }
      }
    });
    return [error, void 0];
  } else {
    const v = tuple2[1];
    return [void 0, v];
  }
}
function assign(...Structs) {
  const isType = Structs[0].type === "type";
  const schemas = Structs.map((s) => s.schema);
  const schema = Object.assign({}, ...schemas);
  return isType ? type(schema) : object(schema);
}
function define(name, validator) {
  return new Struct({ type: name, schema: null, validator });
}
function deprecated(struct2, log) {
  return new Struct({
    ...struct2,
    refiner: (value, ctx) => value === void 0 || struct2.refiner(value, ctx),
    validator(value, ctx) {
      if (value === void 0) {
        return true;
      } else {
        log(value, ctx);
        return struct2.validator(value, ctx);
      }
    }
  });
}
function dynamic(fn) {
  return new Struct({
    type: "dynamic",
    schema: null,
    *entries(value, ctx) {
      const struct2 = fn(value, ctx);
      yield* struct2.entries(value, ctx);
    },
    validator(value, ctx) {
      const struct2 = fn(value, ctx);
      return struct2.validator(value, ctx);
    },
    coercer(value, ctx) {
      const struct2 = fn(value, ctx);
      return struct2.coercer(value, ctx);
    },
    refiner(value, ctx) {
      const struct2 = fn(value, ctx);
      return struct2.refiner(value, ctx);
    }
  });
}
function lazy(fn) {
  let struct2;
  return new Struct({
    type: "lazy",
    schema: null,
    *entries(value, ctx) {
      struct2 ?? (struct2 = fn());
      yield* struct2.entries(value, ctx);
    },
    validator(value, ctx) {
      struct2 ?? (struct2 = fn());
      return struct2.validator(value, ctx);
    },
    coercer(value, ctx) {
      struct2 ?? (struct2 = fn());
      return struct2.coercer(value, ctx);
    },
    refiner(value, ctx) {
      struct2 ?? (struct2 = fn());
      return struct2.refiner(value, ctx);
    }
  });
}
function omit(struct2, keys) {
  const { schema } = struct2;
  const subschema = { ...schema };
  for (const key of keys) {
    delete subschema[key];
  }
  switch (struct2.type) {
    case "type":
      return type(subschema);
    default:
      return object(subschema);
  }
}
function partial(struct2) {
  const isStruct = struct2 instanceof Struct;
  const schema = isStruct ? { ...struct2.schema } : { ...struct2 };
  for (const key in schema) {
    schema[key] = optional(schema[key]);
  }
  if (isStruct && struct2.type === "type") {
    return type(schema);
  }
  return object(schema);
}
function pick(struct2, keys) {
  const { schema } = struct2;
  const subschema = {};
  for (const key of keys) {
    subschema[key] = schema[key];
  }
  switch (struct2.type) {
    case "type":
      return type(subschema);
    default:
      return object(subschema);
  }
}
function struct(name, validator) {
  console.warn("superstruct@0.11 - The `struct` helper has been renamed to `define`.");
  return define(name, validator);
}
function any() {
  return define("any", () => true);
}
function array(Element) {
  return new Struct({
    type: "array",
    schema: Element,
    *entries(value) {
      if (Element && Array.isArray(value)) {
        for (const [i, v] of value.entries()) {
          yield [i, v, Element];
        }
      }
    },
    coercer(value) {
      return Array.isArray(value) ? value.slice() : value;
    },
    validator(value) {
      return Array.isArray(value) || `Expected an array value, but received: ${print(value)}`;
    }
  });
}
function bigint() {
  return define("bigint", (value) => {
    return typeof value === "bigint";
  });
}
function boolean() {
  return define("boolean", (value) => {
    return typeof value === "boolean";
  });
}
function date() {
  return define("date", (value) => {
    return value instanceof Date && !isNaN(value.getTime()) || `Expected a valid \`Date\` object, but received: ${print(value)}`;
  });
}
function enums(values) {
  const schema = {};
  const description = values.map((v) => print(v)).join();
  for (const key of values) {
    schema[key] = key;
  }
  return new Struct({
    type: "enums",
    schema,
    validator(value) {
      return values.includes(value) || `Expected one of \`${description}\`, but received: ${print(value)}`;
    }
  });
}
function func() {
  return define("func", (value) => {
    return typeof value === "function" || `Expected a function, but received: ${print(value)}`;
  });
}
function instance(Class) {
  return define("instance", (value) => {
    return value instanceof Class || `Expected a \`${Class.name}\` instance, but received: ${print(value)}`;
  });
}
function integer() {
  return define("integer", (value) => {
    return typeof value === "number" && !isNaN(value) && Number.isInteger(value) || `Expected an integer, but received: ${print(value)}`;
  });
}
function intersection(Structs) {
  return new Struct({
    type: "intersection",
    schema: null,
    *entries(value, ctx) {
      for (const S of Structs) {
        yield* S.entries(value, ctx);
      }
    },
    *validator(value, ctx) {
      for (const S of Structs) {
        yield* S.validator(value, ctx);
      }
    },
    *refiner(value, ctx) {
      for (const S of Structs) {
        yield* S.refiner(value, ctx);
      }
    }
  });
}
function literal(constant) {
  const description = print(constant);
  const t = typeof constant;
  return new Struct({
    type: "literal",
    schema: t === "string" || t === "number" || t === "boolean" ? constant : null,
    validator(value) {
      return value === constant || `Expected the literal \`${description}\`, but received: ${print(value)}`;
    }
  });
}
function map(Key, Value) {
  return new Struct({
    type: "map",
    schema: null,
    *entries(value) {
      if (Key && Value && value instanceof Map) {
        for (const [k, v] of value.entries()) {
          yield [k, k, Key];
          yield [k, v, Value];
        }
      }
    },
    coercer(value) {
      return value instanceof Map ? new Map(value) : value;
    },
    validator(value) {
      return value instanceof Map || `Expected a \`Map\` object, but received: ${print(value)}`;
    }
  });
}
function never() {
  return define("never", () => false);
}
function nullable(struct2) {
  return new Struct({
    ...struct2,
    validator: (value, ctx) => value === null || struct2.validator(value, ctx),
    refiner: (value, ctx) => value === null || struct2.refiner(value, ctx)
  });
}
function number() {
  return define("number", (value) => {
    return typeof value === "number" && !isNaN(value) || `Expected a number, but received: ${print(value)}`;
  });
}
function object(schema) {
  const knowns = schema ? Object.keys(schema) : [];
  const Never = never();
  return new Struct({
    type: "object",
    schema: schema ? schema : null,
    *entries(value) {
      if (schema && isObject(value)) {
        const unknowns = new Set(Object.keys(value));
        for (const key of knowns) {
          unknowns.delete(key);
          yield [key, value[key], schema[key]];
        }
        for (const key of unknowns) {
          yield [key, value[key], Never];
        }
      }
    },
    validator(value) {
      return isObject(value) || `Expected an object, but received: ${print(value)}`;
    },
    coercer(value) {
      return isObject(value) ? { ...value } : value;
    }
  });
}
function optional(struct2) {
  return new Struct({
    ...struct2,
    validator: (value, ctx) => value === void 0 || struct2.validator(value, ctx),
    refiner: (value, ctx) => value === void 0 || struct2.refiner(value, ctx)
  });
}
function record(Key, Value) {
  return new Struct({
    type: "record",
    schema: null,
    *entries(value) {
      if (isObject(value)) {
        for (const k in value) {
          const v = value[k];
          yield [k, k, Key];
          yield [k, v, Value];
        }
      }
    },
    validator(value) {
      return isObject(value) || `Expected an object, but received: ${print(value)}`;
    }
  });
}
function regexp() {
  return define("regexp", (value) => {
    return value instanceof RegExp;
  });
}
function set(Element) {
  return new Struct({
    type: "set",
    schema: null,
    *entries(value) {
      if (Element && value instanceof Set) {
        for (const v of value) {
          yield [v, v, Element];
        }
      }
    },
    coercer(value) {
      return value instanceof Set ? new Set(value) : value;
    },
    validator(value) {
      return value instanceof Set || `Expected a \`Set\` object, but received: ${print(value)}`;
    }
  });
}
function string() {
  return define("string", (value) => {
    return typeof value === "string" || `Expected a string, but received: ${print(value)}`;
  });
}
function tuple(Structs) {
  const Never = never();
  return new Struct({
    type: "tuple",
    schema: null,
    *entries(value) {
      if (Array.isArray(value)) {
        const length = Math.max(Structs.length, value.length);
        for (let i = 0; i < length; i++) {
          yield [i, value[i], Structs[i] || Never];
        }
      }
    },
    validator(value) {
      return Array.isArray(value) || `Expected an array, but received: ${print(value)}`;
    }
  });
}
function type(schema) {
  const keys = Object.keys(schema);
  return new Struct({
    type: "type",
    schema,
    *entries(value) {
      if (isObject(value)) {
        for (const k of keys) {
          yield [k, value[k], schema[k]];
        }
      }
    },
    validator(value) {
      return isObject(value) || `Expected an object, but received: ${print(value)}`;
    },
    coercer(value) {
      return isObject(value) ? { ...value } : value;
    }
  });
}
function union(Structs) {
  const description = Structs.map((s) => s.type).join(" | ");
  return new Struct({
    type: "union",
    schema: null,
    coercer(value) {
      for (const S of Structs) {
        const [error, coerced] = S.validate(value, { coerce: true });
        if (!error) {
          return coerced;
        }
      }
      return value;
    },
    validator(value, ctx) {
      const failures = [];
      for (const S of Structs) {
        const [...tuples] = run(value, S, ctx);
        const [first] = tuples;
        if (!first[0]) {
          return [];
        } else {
          for (const [failure] of tuples) {
            if (failure) {
              failures.push(failure);
            }
          }
        }
      }
      return [
        `Expected the value to satisfy a union of \`${description}\`, but received: ${print(value)}`,
        ...failures
      ];
    }
  });
}
function unknown() {
  return define("unknown", () => true);
}
function coerce(struct2, condition, coercer) {
  return new Struct({
    ...struct2,
    coercer: (value, ctx) => {
      return is(value, condition) ? struct2.coercer(coercer(value, ctx), ctx) : struct2.coercer(value, ctx);
    }
  });
}
function defaulted(struct2, fallback, options = {}) {
  return coerce(struct2, unknown(), (x) => {
    const f = typeof fallback === "function" ? fallback() : fallback;
    if (x === void 0) {
      return f;
    }
    if (!options.strict && isPlainObject(x) && isPlainObject(f)) {
      const ret = { ...x };
      let changed = false;
      for (const key in f) {
        if (ret[key] === void 0) {
          ret[key] = f[key];
          changed = true;
        }
      }
      if (changed) {
        return ret;
      }
    }
    return x;
  });
}
function trimmed(struct2) {
  return coerce(struct2, string(), (x) => x.trim());
}
function empty(struct2) {
  return refine(struct2, "empty", (value) => {
    const size2 = getSize(value);
    return size2 === 0 || `Expected an empty ${struct2.type} but received one with a size of \`${size2}\``;
  });
}
function getSize(value) {
  if (value instanceof Map || value instanceof Set) {
    return value.size;
  } else {
    return value.length;
  }
}
function max(struct2, threshold, options = {}) {
  const { exclusive } = options;
  return refine(struct2, "max", (value) => {
    return exclusive ? value < threshold : value <= threshold || `Expected a ${struct2.type} less than ${exclusive ? "" : "or equal to "}${threshold} but received \`${value}\``;
  });
}
function min(struct2, threshold, options = {}) {
  const { exclusive } = options;
  return refine(struct2, "min", (value) => {
    return exclusive ? value > threshold : value >= threshold || `Expected a ${struct2.type} greater than ${exclusive ? "" : "or equal to "}${threshold} but received \`${value}\``;
  });
}
function nonempty(struct2) {
  return refine(struct2, "nonempty", (value) => {
    const size2 = getSize(value);
    return size2 > 0 || `Expected a nonempty ${struct2.type} but received an empty one`;
  });
}
function pattern(struct2, regexp2) {
  return refine(struct2, "pattern", (value) => {
    return regexp2.test(value) || `Expected a ${struct2.type} matching \`/${regexp2.source}/\` but received "${value}"`;
  });
}
function size(struct2, min2, max2 = min2) {
  const expected = `Expected a ${struct2.type}`;
  const of = min2 === max2 ? `of \`${min2}\`` : `between \`${min2}\` and \`${max2}\``;
  return refine(struct2, "size", (value) => {
    if (typeof value === "number" || value instanceof Date) {
      return min2 <= value && value <= max2 || `${expected} ${of} but received \`${value}\``;
    } else if (value instanceof Map || value instanceof Set) {
      const { size: size2 } = value;
      return min2 <= size2 && size2 <= max2 || `${expected} with a size ${of} but received one with a size of \`${size2}\``;
    } else {
      const { length } = value;
      return min2 <= length && length <= max2 || `${expected} with a length ${of} but received one with a length of \`${length}\``;
    }
  });
}
function refine(struct2, name, refiner) {
  return new Struct({
    ...struct2,
    *refiner(value, ctx) {
      yield* struct2.refiner(value, ctx);
      const result = refiner(value, ctx);
      const failures = toFailures(result, ctx, struct2, value);
      for (const failure of failures) {
        yield { ...failure, refinement: name };
      }
    }
  });
}
var StructError, Struct;
var init_dist = __esm({
  "node_modules/.pnpm/superstruct@1.0.4/node_modules/superstruct/dist/index.mjs"() {
    StructError = class extends TypeError {
      constructor(failure, failures) {
        let cached;
        const { message, explanation, ...rest } = failure;
        const { path } = failure;
        const msg = path.length === 0 ? message : `At path: ${path.join(".")} -- ${message}`;
        super(explanation ?? msg);
        if (explanation != null)
          this.cause = msg;
        Object.assign(this, rest);
        this.name = this.constructor.name;
        this.failures = () => {
          return cached ?? (cached = [failure, ...failures()]);
        };
      }
    };
    Struct = class {
      constructor(props) {
        const { type: type2, schema, validator, refiner, coercer = (value) => value, entries = function* () {
        } } = props;
        this.type = type2;
        this.schema = schema;
        this.entries = entries;
        this.coercer = coercer;
        if (validator) {
          this.validator = (value, context) => {
            const result = validator(value, context);
            return toFailures(result, context, this, value);
          };
        } else {
          this.validator = () => [];
        }
        if (refiner) {
          this.refiner = (value, context) => {
            const result = refiner(value, context);
            return toFailures(result, context, this, value);
          };
        } else {
          this.refiner = () => [];
        }
      }
      /**
       * Assert that a value passes the struct's validation, throwing if it doesn't.
       */
      assert(value, message) {
        return assert(value, this, message);
      }
      /**
       * Create a value with the struct's coercion logic, then validate it.
       */
      create(value, message) {
        return create(value, this, message);
      }
      /**
       * Check if a value passes the struct's validation.
       */
      is(value) {
        return is(value, this);
      }
      /**
       * Mask a value, coercing and validating it, but returning only the subset of
       * properties defined by the struct's schema.
       */
      mask(value, message) {
        return mask(value, this, message);
      }
      /**
       * Validate a value with the struct's validation logic, returning a tuple
       * representing the result.
       *
       * You may optionally pass `true` for the `withCoercion` argument to coerce
       * the value before attempting to validate it. If you do, the result will
       * contain the coerced result when successful.
       */
      validate(value, options = {}) {
        return validate(value, this, options);
      }
    };
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/assert.js
var require_assert = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/assert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertExhaustive = exports.assertStruct = exports.assert = exports.AssertionError = void 0;
    var superstruct_1 = (init_dist(), __toCommonJS(dist_exports));
    function isErrorWithMessage(error) {
      return typeof error === "object" && error !== null && "message" in error;
    }
    function isConstructable(fn) {
      var _a, _b;
      return Boolean(typeof ((_b = (_a = fn === null || fn === void 0 ? void 0 : fn.prototype) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) === "string");
    }
    function getErrorMessage(error) {
      const message = isErrorWithMessage(error) ? error.message : String(error);
      if (message.endsWith(".")) {
        return message.slice(0, -1);
      }
      return message;
    }
    function getError(ErrorWrapper, message) {
      if (isConstructable(ErrorWrapper)) {
        return new ErrorWrapper({
          message
        });
      }
      return ErrorWrapper({
        message
      });
    }
    var AssertionError = class extends Error {
      constructor(options) {
        super(options.message);
        this.code = "ERR_ASSERTION";
      }
    };
    exports.AssertionError = AssertionError;
    function assert2(value, message = "Assertion failed.", ErrorWrapper = AssertionError) {
      if (!value) {
        if (message instanceof Error) {
          throw message;
        }
        throw getError(ErrorWrapper, message);
      }
    }
    exports.assert = assert2;
    function assertStruct(value, struct2, errorPrefix = "Assertion failed", ErrorWrapper = AssertionError) {
      try {
        (0, superstruct_1.assert)(value, struct2);
      } catch (error) {
        throw getError(ErrorWrapper, `${errorPrefix}: ${getErrorMessage(error)}.`);
      }
    }
    exports.assertStruct = assertStruct;
    function assertExhaustive(_object) {
      throw new Error("Invalid branch reached. Should be detected during compilation.");
    }
    exports.assertExhaustive = assertExhaustive;
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/base64.js
var require_base64 = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/base64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.base64 = void 0;
    var superstruct_1 = (init_dist(), __toCommonJS(dist_exports));
    var assert_1 = require_assert();
    var base64 = (struct2, options = {}) => {
      var _a, _b;
      const paddingRequired = (_a = options.paddingRequired) !== null && _a !== void 0 ? _a : false;
      const characterSet = (_b = options.characterSet) !== null && _b !== void 0 ? _b : "base64";
      let letters;
      if (characterSet === "base64") {
        letters = String.raw`[A-Za-z0-9+\/]`;
      } else {
        (0, assert_1.assert)(characterSet === "base64url");
        letters = String.raw`[-_A-Za-z0-9]`;
      }
      let re;
      if (paddingRequired) {
        re = new RegExp(`^(?:${letters}{4})*(?:${letters}{3}=|${letters}{2}==)?$`, "u");
      } else {
        re = new RegExp(`^(?:${letters}{4})*(?:${letters}{2,3}|${letters}{3}=|${letters}{2}==)?$`, "u");
      }
      return (0, superstruct_1.pattern)(struct2, re);
    };
    exports.base64 = base64;
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/hex.js
var require_hex = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/hex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.remove0x = exports.add0x = exports.assertIsStrictHexString = exports.assertIsHexString = exports.isStrictHexString = exports.isHexString = exports.StrictHexStruct = exports.HexStruct = void 0;
    var superstruct_1 = (init_dist(), __toCommonJS(dist_exports));
    var assert_1 = require_assert();
    exports.HexStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^(?:0x)?[0-9a-f]+$/iu);
    exports.StrictHexStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^0x[0-9a-f]+$/iu);
    function isHexString(value) {
      return (0, superstruct_1.is)(value, exports.HexStruct);
    }
    exports.isHexString = isHexString;
    function isStrictHexString(value) {
      return (0, superstruct_1.is)(value, exports.StrictHexStruct);
    }
    exports.isStrictHexString = isStrictHexString;
    function assertIsHexString(value) {
      (0, assert_1.assert)(isHexString(value), "Value must be a hexadecimal string.");
    }
    exports.assertIsHexString = assertIsHexString;
    function assertIsStrictHexString(value) {
      (0, assert_1.assert)(isStrictHexString(value), 'Value must be a hexadecimal string, starting with "0x".');
    }
    exports.assertIsStrictHexString = assertIsStrictHexString;
    function add0x(hexadecimal) {
      if (hexadecimal.startsWith("0x")) {
        return hexadecimal;
      }
      if (hexadecimal.startsWith("0X")) {
        return `0x${hexadecimal.substring(2)}`;
      }
      return `0x${hexadecimal}`;
    }
    exports.add0x = add0x;
    function remove0x(hexadecimal) {
      if (hexadecimal.startsWith("0x") || hexadecimal.startsWith("0X")) {
        return hexadecimal.substring(2);
      }
      return hexadecimal;
    }
    exports.remove0x = remove0x;
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/bytes.js
var require_bytes = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/bytes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDataView = exports.concatBytes = exports.valueToBytes = exports.stringToBytes = exports.numberToBytes = exports.signedBigIntToBytes = exports.bigIntToBytes = exports.hexToBytes = exports.bytesToString = exports.bytesToNumber = exports.bytesToSignedBigInt = exports.bytesToBigInt = exports.bytesToHex = exports.assertIsBytes = exports.isBytes = void 0;
    var assert_1 = require_assert();
    var hex_1 = require_hex();
    var HEX_MINIMUM_NUMBER_CHARACTER = 48;
    var HEX_MAXIMUM_NUMBER_CHARACTER = 58;
    var HEX_CHARACTER_OFFSET = 87;
    function getPrecomputedHexValuesBuilder() {
      const lookupTable = [];
      return () => {
        if (lookupTable.length === 0) {
          for (let i = 0; i < 256; i++) {
            lookupTable.push(i.toString(16).padStart(2, "0"));
          }
        }
        return lookupTable;
      };
    }
    var getPrecomputedHexValues = getPrecomputedHexValuesBuilder();
    function isBytes(value) {
      return value instanceof Uint8Array;
    }
    exports.isBytes = isBytes;
    function assertIsBytes(value) {
      (0, assert_1.assert)(isBytes(value), "Value must be a Uint8Array.");
    }
    exports.assertIsBytes = assertIsBytes;
    function bytesToHex(bytes) {
      assertIsBytes(bytes);
      if (bytes.length === 0) {
        return "0x";
      }
      const lookupTable = getPrecomputedHexValues();
      const hexadecimal = new Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        hexadecimal[i] = lookupTable[bytes[i]];
      }
      return (0, hex_1.add0x)(hexadecimal.join(""));
    }
    exports.bytesToHex = bytesToHex;
    function bytesToBigInt(bytes) {
      assertIsBytes(bytes);
      const hexadecimal = bytesToHex(bytes);
      return BigInt(hexadecimal);
    }
    exports.bytesToBigInt = bytesToBigInt;
    function bytesToSignedBigInt(bytes) {
      assertIsBytes(bytes);
      let value = BigInt(0);
      for (const byte of bytes) {
        value = (value << BigInt(8)) + BigInt(byte);
      }
      return BigInt.asIntN(bytes.length * 8, value);
    }
    exports.bytesToSignedBigInt = bytesToSignedBigInt;
    function bytesToNumber(bytes) {
      assertIsBytes(bytes);
      const bigint2 = bytesToBigInt(bytes);
      (0, assert_1.assert)(bigint2 <= BigInt(Number.MAX_SAFE_INTEGER), "Number is not a safe integer. Use `bytesToBigInt` instead.");
      return Number(bigint2);
    }
    exports.bytesToNumber = bytesToNumber;
    function bytesToString(bytes) {
      assertIsBytes(bytes);
      return new TextDecoder().decode(bytes);
    }
    exports.bytesToString = bytesToString;
    function hexToBytes(value) {
      var _a;
      if (((_a = value === null || value === void 0 ? void 0 : value.toLowerCase) === null || _a === void 0 ? void 0 : _a.call(value)) === "0x") {
        return new Uint8Array();
      }
      (0, hex_1.assertIsHexString)(value);
      const strippedValue = (0, hex_1.remove0x)(value).toLowerCase();
      const normalizedValue = strippedValue.length % 2 === 0 ? strippedValue : `0${strippedValue}`;
      const bytes = new Uint8Array(normalizedValue.length / 2);
      for (let i = 0; i < bytes.length; i++) {
        const c1 = normalizedValue.charCodeAt(i * 2);
        const c2 = normalizedValue.charCodeAt(i * 2 + 1);
        const n1 = c1 - (c1 < HEX_MAXIMUM_NUMBER_CHARACTER ? HEX_MINIMUM_NUMBER_CHARACTER : HEX_CHARACTER_OFFSET);
        const n2 = c2 - (c2 < HEX_MAXIMUM_NUMBER_CHARACTER ? HEX_MINIMUM_NUMBER_CHARACTER : HEX_CHARACTER_OFFSET);
        bytes[i] = n1 * 16 + n2;
      }
      return bytes;
    }
    exports.hexToBytes = hexToBytes;
    function bigIntToBytes(value) {
      (0, assert_1.assert)(typeof value === "bigint", "Value must be a bigint.");
      (0, assert_1.assert)(value >= BigInt(0), "Value must be a non-negative bigint.");
      const hexadecimal = value.toString(16);
      return hexToBytes(hexadecimal);
    }
    exports.bigIntToBytes = bigIntToBytes;
    function bigIntFits(value, bytes) {
      (0, assert_1.assert)(bytes > 0);
      const mask2 = value >> BigInt(31);
      return !((~value & mask2) + (value & ~mask2) >> BigInt(bytes * 8 + ~0));
    }
    function signedBigIntToBytes(value, byteLength) {
      (0, assert_1.assert)(typeof value === "bigint", "Value must be a bigint.");
      (0, assert_1.assert)(typeof byteLength === "number", "Byte length must be a number.");
      (0, assert_1.assert)(byteLength > 0, "Byte length must be greater than 0.");
      (0, assert_1.assert)(bigIntFits(value, byteLength), "Byte length is too small to represent the given value.");
      let numberValue = value;
      const bytes = new Uint8Array(byteLength);
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] = Number(BigInt.asUintN(8, numberValue));
        numberValue >>= BigInt(8);
      }
      return bytes.reverse();
    }
    exports.signedBigIntToBytes = signedBigIntToBytes;
    function numberToBytes(value) {
      (0, assert_1.assert)(typeof value === "number", "Value must be a number.");
      (0, assert_1.assert)(value >= 0, "Value must be a non-negative number.");
      (0, assert_1.assert)(Number.isSafeInteger(value), "Value is not a safe integer. Use `bigIntToBytes` instead.");
      const hexadecimal = value.toString(16);
      return hexToBytes(hexadecimal);
    }
    exports.numberToBytes = numberToBytes;
    function stringToBytes(value) {
      (0, assert_1.assert)(typeof value === "string", "Value must be a string.");
      return new TextEncoder().encode(value);
    }
    exports.stringToBytes = stringToBytes;
    function valueToBytes(value) {
      if (typeof value === "bigint") {
        return bigIntToBytes(value);
      }
      if (typeof value === "number") {
        return numberToBytes(value);
      }
      if (typeof value === "string") {
        if (value.startsWith("0x")) {
          return hexToBytes(value);
        }
        return stringToBytes(value);
      }
      if (isBytes(value)) {
        return value;
      }
      throw new TypeError(`Unsupported value type: "${typeof value}".`);
    }
    exports.valueToBytes = valueToBytes;
    function concatBytes(values) {
      const normalizedValues = new Array(values.length);
      let byteLength = 0;
      for (let i = 0; i < values.length; i++) {
        const value = valueToBytes(values[i]);
        normalizedValues[i] = value;
        byteLength += value.length;
      }
      const bytes = new Uint8Array(byteLength);
      for (let i = 0, offset = 0; i < normalizedValues.length; i++) {
        bytes.set(normalizedValues[i], offset);
        offset += normalizedValues[i].length;
      }
      return bytes;
    }
    exports.concatBytes = concatBytes;
    function createDataView(bytes) {
      if (typeof Buffer !== "undefined" && bytes instanceof Buffer) {
        const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
        return new DataView(buffer);
      }
      return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    }
    exports.createDataView = createDataView;
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/checksum.js
var require_checksum = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/checksum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChecksumStruct = void 0;
    var superstruct_1 = (init_dist(), __toCommonJS(dist_exports));
    var base64_1 = require_base64();
    exports.ChecksumStruct = (0, superstruct_1.size)((0, base64_1.base64)((0, superstruct_1.string)(), { paddingRequired: true }), 44, 44);
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/coercers.js
var require_coercers = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/coercers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createHex = exports.createBytes = exports.createBigInt = exports.createNumber = void 0;
    var superstruct_1 = (init_dist(), __toCommonJS(dist_exports));
    var assert_1 = require_assert();
    var bytes_1 = require_bytes();
    var hex_1 = require_hex();
    var NumberLikeStruct = (0, superstruct_1.union)([(0, superstruct_1.number)(), (0, superstruct_1.bigint)(), (0, superstruct_1.string)(), hex_1.StrictHexStruct]);
    var NumberCoercer = (0, superstruct_1.coerce)((0, superstruct_1.number)(), NumberLikeStruct, Number);
    var BigIntCoercer = (0, superstruct_1.coerce)((0, superstruct_1.bigint)(), NumberLikeStruct, BigInt);
    var BytesLikeStruct = (0, superstruct_1.union)([hex_1.StrictHexStruct, (0, superstruct_1.instance)(Uint8Array)]);
    var BytesCoercer = (0, superstruct_1.coerce)((0, superstruct_1.instance)(Uint8Array), (0, superstruct_1.union)([hex_1.StrictHexStruct]), bytes_1.hexToBytes);
    var HexCoercer = (0, superstruct_1.coerce)(hex_1.StrictHexStruct, (0, superstruct_1.instance)(Uint8Array), bytes_1.bytesToHex);
    function createNumber(value) {
      try {
        const result = (0, superstruct_1.create)(value, NumberCoercer);
        (0, assert_1.assert)(Number.isFinite(result), `Expected a number-like value, got "${value}".`);
        return result;
      } catch (error) {
        if (error instanceof superstruct_1.StructError) {
          throw new Error(`Expected a number-like value, got "${value}".`);
        }
        throw error;
      }
    }
    exports.createNumber = createNumber;
    function createBigInt(value) {
      try {
        return (0, superstruct_1.create)(value, BigIntCoercer);
      } catch (error) {
        if (error instanceof superstruct_1.StructError) {
          throw new Error(`Expected a number-like value, got "${String(error.value)}".`);
        }
        throw error;
      }
    }
    exports.createBigInt = createBigInt;
    function createBytes(value) {
      if (typeof value === "string" && value.toLowerCase() === "0x") {
        return new Uint8Array();
      }
      try {
        return (0, superstruct_1.create)(value, BytesCoercer);
      } catch (error) {
        if (error instanceof superstruct_1.StructError) {
          throw new Error(`Expected a bytes-like value, got "${String(error.value)}".`);
        }
        throw error;
      }
    }
    exports.createBytes = createBytes;
    function createHex(value) {
      if (value instanceof Uint8Array && value.length === 0 || typeof value === "string" && value.toLowerCase() === "0x") {
        return "0x";
      }
      try {
        return (0, superstruct_1.create)(value, HexCoercer);
      } catch (error) {
        if (error instanceof superstruct_1.StructError) {
          throw new Error(`Expected a bytes-like value, got "${String(error.value)}".`);
        }
        throw error;
      }
    }
    exports.createHex = createHex;
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/collections.js
var require_collections = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/collections.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _FrozenMap_map;
    var _FrozenSet_set;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FrozenSet = exports.FrozenMap = void 0;
    var FrozenMap = class {
      constructor(entries) {
        _FrozenMap_map.set(this, void 0);
        __classPrivateFieldSet(this, _FrozenMap_map, new Map(entries), "f");
        Object.freeze(this);
      }
      get size() {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").size;
      }
      [(_FrozenMap_map = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f")[Symbol.iterator]();
      }
      entries() {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").entries();
      }
      forEach(callbackfn, thisArg) {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").forEach((value, key, _map) => callbackfn.call(thisArg, value, key, this));
      }
      get(key) {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").get(key);
      }
      has(key) {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").has(key);
      }
      keys() {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").keys();
      }
      values() {
        return __classPrivateFieldGet(this, _FrozenMap_map, "f").values();
      }
      toString() {
        return `FrozenMap(${this.size}) {${this.size > 0 ? ` ${[...this.entries()].map(([key, value]) => `${String(key)} => ${String(value)}`).join(", ")} ` : ""}}`;
      }
    };
    exports.FrozenMap = FrozenMap;
    var FrozenSet = class {
      constructor(values) {
        _FrozenSet_set.set(this, void 0);
        __classPrivateFieldSet(this, _FrozenSet_set, new Set(values), "f");
        Object.freeze(this);
      }
      get size() {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").size;
      }
      [(_FrozenSet_set = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f")[Symbol.iterator]();
      }
      entries() {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").entries();
      }
      forEach(callbackfn, thisArg) {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").forEach((value, value2, _set) => callbackfn.call(thisArg, value, value2, this));
      }
      has(value) {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").has(value);
      }
      keys() {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").keys();
      }
      values() {
        return __classPrivateFieldGet(this, _FrozenSet_set, "f").values();
      }
      toString() {
        return `FrozenSet(${this.size}) {${this.size > 0 ? ` ${[...this.values()].map((member) => String(member)).join(", ")} ` : ""}}`;
      }
    };
    exports.FrozenSet = FrozenSet;
    Object.freeze(FrozenMap);
    Object.freeze(FrozenMap.prototype);
    Object.freeze(FrozenSet);
    Object.freeze(FrozenSet.prototype);
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/encryption-types.js
var require_encryption_types = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/encryption-types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/json.js
var require_json = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/json.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getJsonRpcIdValidator = exports.assertIsJsonRpcError = exports.isJsonRpcError = exports.assertIsJsonRpcFailure = exports.isJsonRpcFailure = exports.assertIsJsonRpcSuccess = exports.isJsonRpcSuccess = exports.assertIsJsonRpcResponse = exports.isJsonRpcResponse = exports.assertIsPendingJsonRpcResponse = exports.isPendingJsonRpcResponse = exports.JsonRpcResponseStruct = exports.JsonRpcFailureStruct = exports.JsonRpcSuccessStruct = exports.PendingJsonRpcResponseStruct = exports.assertIsJsonRpcRequest = exports.isJsonRpcRequest = exports.assertIsJsonRpcNotification = exports.isJsonRpcNotification = exports.JsonRpcNotificationStruct = exports.JsonRpcRequestStruct = exports.JsonRpcParamsStruct = exports.JsonRpcErrorStruct = exports.JsonRpcIdStruct = exports.JsonRpcVersionStruct = exports.jsonrpc2 = exports.getJsonSize = exports.isValidJson = exports.JsonStruct = exports.UnsafeJsonStruct = void 0;
    var superstruct_1 = (init_dist(), __toCommonJS(dist_exports));
    var assert_1 = require_assert();
    var finiteNumber = () => (0, superstruct_1.define)("finite number", (value) => {
      return (0, superstruct_1.is)(value, (0, superstruct_1.number)()) && Number.isFinite(value);
    });
    exports.UnsafeJsonStruct = (0, superstruct_1.union)([
      (0, superstruct_1.literal)(null),
      (0, superstruct_1.boolean)(),
      finiteNumber(),
      (0, superstruct_1.string)(),
      (0, superstruct_1.array)((0, superstruct_1.lazy)(() => exports.UnsafeJsonStruct)),
      (0, superstruct_1.record)((0, superstruct_1.string)(), (0, superstruct_1.lazy)(() => exports.UnsafeJsonStruct))
    ]);
    exports.JsonStruct = (0, superstruct_1.define)("Json", (value, context) => {
      function checkStruct(innerValue, struct2) {
        const iterator = struct2.validator(innerValue, context);
        const errors = [...iterator];
        if (errors.length > 0) {
          return errors;
        }
        return true;
      }
      try {
        const unsafeResult = checkStruct(value, exports.UnsafeJsonStruct);
        if (unsafeResult !== true) {
          return unsafeResult;
        }
        return checkStruct(JSON.parse(JSON.stringify(value)), exports.UnsafeJsonStruct);
      } catch (error) {
        if (error instanceof RangeError) {
          return "Circular reference detected";
        }
        return false;
      }
    });
    function isValidJson(value) {
      return (0, superstruct_1.is)(value, exports.JsonStruct);
    }
    exports.isValidJson = isValidJson;
    function getJsonSize(value) {
      (0, assert_1.assertStruct)(value, exports.JsonStruct, "Invalid JSON value");
      const json = JSON.stringify(value);
      return new TextEncoder().encode(json).byteLength;
    }
    exports.getJsonSize = getJsonSize;
    exports.jsonrpc2 = "2.0";
    exports.JsonRpcVersionStruct = (0, superstruct_1.literal)(exports.jsonrpc2);
    exports.JsonRpcIdStruct = (0, superstruct_1.nullable)((0, superstruct_1.union)([(0, superstruct_1.number)(), (0, superstruct_1.string)()]));
    exports.JsonRpcErrorStruct = (0, superstruct_1.object)({
      code: (0, superstruct_1.integer)(),
      message: (0, superstruct_1.string)(),
      data: (0, superstruct_1.optional)(exports.JsonStruct),
      stack: (0, superstruct_1.optional)((0, superstruct_1.string)())
    });
    exports.JsonRpcParamsStruct = (0, superstruct_1.optional)((0, superstruct_1.union)([(0, superstruct_1.record)((0, superstruct_1.string)(), exports.JsonStruct), (0, superstruct_1.array)(exports.JsonStruct)]));
    exports.JsonRpcRequestStruct = (0, superstruct_1.object)({
      id: exports.JsonRpcIdStruct,
      jsonrpc: exports.JsonRpcVersionStruct,
      method: (0, superstruct_1.string)(),
      params: exports.JsonRpcParamsStruct
    });
    exports.JsonRpcNotificationStruct = (0, superstruct_1.omit)(exports.JsonRpcRequestStruct, ["id"]);
    function isJsonRpcNotification(value) {
      return (0, superstruct_1.is)(value, exports.JsonRpcNotificationStruct);
    }
    exports.isJsonRpcNotification = isJsonRpcNotification;
    function assertIsJsonRpcNotification(value, ErrorWrapper) {
      (0, assert_1.assertStruct)(value, exports.JsonRpcNotificationStruct, "Invalid JSON-RPC notification", ErrorWrapper);
    }
    exports.assertIsJsonRpcNotification = assertIsJsonRpcNotification;
    function isJsonRpcRequest(value) {
      return (0, superstruct_1.is)(value, exports.JsonRpcRequestStruct);
    }
    exports.isJsonRpcRequest = isJsonRpcRequest;
    function assertIsJsonRpcRequest(value, ErrorWrapper) {
      (0, assert_1.assertStruct)(value, exports.JsonRpcRequestStruct, "Invalid JSON-RPC request", ErrorWrapper);
    }
    exports.assertIsJsonRpcRequest = assertIsJsonRpcRequest;
    exports.PendingJsonRpcResponseStruct = (0, superstruct_1.object)({
      id: exports.JsonRpcIdStruct,
      jsonrpc: exports.JsonRpcVersionStruct,
      result: (0, superstruct_1.optional)((0, superstruct_1.unknown)()),
      error: (0, superstruct_1.optional)(exports.JsonRpcErrorStruct)
    });
    exports.JsonRpcSuccessStruct = (0, superstruct_1.object)({
      id: exports.JsonRpcIdStruct,
      jsonrpc: exports.JsonRpcVersionStruct,
      result: exports.JsonStruct
    });
    exports.JsonRpcFailureStruct = (0, superstruct_1.object)({
      id: exports.JsonRpcIdStruct,
      jsonrpc: exports.JsonRpcVersionStruct,
      error: exports.JsonRpcErrorStruct
    });
    exports.JsonRpcResponseStruct = (0, superstruct_1.union)([
      exports.JsonRpcSuccessStruct,
      exports.JsonRpcFailureStruct
    ]);
    function isPendingJsonRpcResponse(response) {
      return (0, superstruct_1.is)(response, exports.PendingJsonRpcResponseStruct);
    }
    exports.isPendingJsonRpcResponse = isPendingJsonRpcResponse;
    function assertIsPendingJsonRpcResponse(response, ErrorWrapper) {
      (0, assert_1.assertStruct)(response, exports.PendingJsonRpcResponseStruct, "Invalid pending JSON-RPC response", ErrorWrapper);
    }
    exports.assertIsPendingJsonRpcResponse = assertIsPendingJsonRpcResponse;
    function isJsonRpcResponse(response) {
      return (0, superstruct_1.is)(response, exports.JsonRpcResponseStruct);
    }
    exports.isJsonRpcResponse = isJsonRpcResponse;
    function assertIsJsonRpcResponse(value, ErrorWrapper) {
      (0, assert_1.assertStruct)(value, exports.JsonRpcResponseStruct, "Invalid JSON-RPC response", ErrorWrapper);
    }
    exports.assertIsJsonRpcResponse = assertIsJsonRpcResponse;
    function isJsonRpcSuccess(value) {
      return (0, superstruct_1.is)(value, exports.JsonRpcSuccessStruct);
    }
    exports.isJsonRpcSuccess = isJsonRpcSuccess;
    function assertIsJsonRpcSuccess(value, ErrorWrapper) {
      (0, assert_1.assertStruct)(value, exports.JsonRpcSuccessStruct, "Invalid JSON-RPC success response", ErrorWrapper);
    }
    exports.assertIsJsonRpcSuccess = assertIsJsonRpcSuccess;
    function isJsonRpcFailure(value) {
      return (0, superstruct_1.is)(value, exports.JsonRpcFailureStruct);
    }
    exports.isJsonRpcFailure = isJsonRpcFailure;
    function assertIsJsonRpcFailure(value, ErrorWrapper) {
      (0, assert_1.assertStruct)(value, exports.JsonRpcFailureStruct, "Invalid JSON-RPC failure response", ErrorWrapper);
    }
    exports.assertIsJsonRpcFailure = assertIsJsonRpcFailure;
    function isJsonRpcError(value) {
      return (0, superstruct_1.is)(value, exports.JsonRpcErrorStruct);
    }
    exports.isJsonRpcError = isJsonRpcError;
    function assertIsJsonRpcError(value, ErrorWrapper) {
      (0, assert_1.assertStruct)(value, exports.JsonRpcErrorStruct, "Invalid JSON-RPC error", ErrorWrapper);
    }
    exports.assertIsJsonRpcError = assertIsJsonRpcError;
    function getJsonRpcIdValidator(options) {
      const { permitEmptyString, permitFractions, permitNull } = Object.assign({ permitEmptyString: true, permitFractions: false, permitNull: true }, options);
      const isValidJsonRpcId = (id) => {
        return Boolean(typeof id === "number" && (permitFractions || Number.isInteger(id)) || typeof id === "string" && (permitEmptyString || id.length > 0) || permitNull && id === null);
      };
      return isValidJsonRpcId;
    }
    exports.getJsonRpcIdValidator = getJsonRpcIdValidator;
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/keyring.js
var require_keyring = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/keyring.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type2 = typeof val;
      if (type2 === "string" && val.length > 0) {
        return parse(val);
      } else if (type2 === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type2 = (match[2] || "ms").toLowerCase();
      switch (type2) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/.pnpm/debug@4.3.7/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/debug@4.3.7/node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce2;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp2) {
        return regexp2.toString().substring(2, regexp2.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce2(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/.pnpm/debug@4.3.7/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/debug@4.3.7/node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/logging.js
var require_logging = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/logging.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createModuleLogger = exports.createProjectLogger = void 0;
    var debug_1 = __importDefault(require_browser());
    var globalLogger = (0, debug_1.default)("metamask");
    function createProjectLogger(projectName) {
      return globalLogger.extend(projectName);
    }
    exports.createProjectLogger = createProjectLogger;
    function createModuleLogger(projectLogger, moduleName) {
      return projectLogger.extend(moduleName);
    }
    exports.createModuleLogger = createModuleLogger;
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/misc.js
var require_misc = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/misc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.calculateNumberSize = exports.calculateStringSize = exports.isASCII = exports.isPlainObject = exports.ESCAPE_CHARACTERS_REGEXP = exports.JsonSize = exports.hasProperty = exports.isObject = exports.isNullOrUndefined = exports.isNonEmptyArray = void 0;
    function isNonEmptyArray(value) {
      return Array.isArray(value) && value.length > 0;
    }
    exports.isNonEmptyArray = isNonEmptyArray;
    function isNullOrUndefined(value) {
      return value === null || value === void 0;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isObject2(value) {
      return Boolean(value) && typeof value === "object" && !Array.isArray(value);
    }
    exports.isObject = isObject2;
    var hasProperty = (objectToCheck, name) => Object.hasOwnProperty.call(objectToCheck, name);
    exports.hasProperty = hasProperty;
    var JsonSize;
    (function(JsonSize2) {
      JsonSize2[JsonSize2["Null"] = 4] = "Null";
      JsonSize2[JsonSize2["Comma"] = 1] = "Comma";
      JsonSize2[JsonSize2["Wrapper"] = 1] = "Wrapper";
      JsonSize2[JsonSize2["True"] = 4] = "True";
      JsonSize2[JsonSize2["False"] = 5] = "False";
      JsonSize2[JsonSize2["Quote"] = 1] = "Quote";
      JsonSize2[JsonSize2["Colon"] = 1] = "Colon";
      JsonSize2[JsonSize2["Date"] = 24] = "Date";
    })(JsonSize = exports.JsonSize || (exports.JsonSize = {}));
    exports.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu;
    function isPlainObject2(value) {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      try {
        let proto = value;
        while (Object.getPrototypeOf(proto) !== null) {
          proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(value) === proto;
      } catch (_) {
        return false;
      }
    }
    exports.isPlainObject = isPlainObject2;
    function isASCII(character) {
      return character.charCodeAt(0) <= 127;
    }
    exports.isASCII = isASCII;
    function calculateStringSize(value) {
      var _a;
      const size2 = value.split("").reduce((total, character) => {
        if (isASCII(character)) {
          return total + 1;
        }
        return total + 2;
      }, 0);
      return size2 + ((_a = value.match(exports.ESCAPE_CHARACTERS_REGEXP)) !== null && _a !== void 0 ? _a : []).length;
    }
    exports.calculateStringSize = calculateStringSize;
    function calculateNumberSize(value) {
      return value.toString().length;
    }
    exports.calculateNumberSize = calculateNumberSize;
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/number.js
var require_number = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/number.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hexToBigInt = exports.hexToNumber = exports.bigIntToHex = exports.numberToHex = void 0;
    var assert_1 = require_assert();
    var hex_1 = require_hex();
    var numberToHex = (value) => {
      (0, assert_1.assert)(typeof value === "number", "Value must be a number.");
      (0, assert_1.assert)(value >= 0, "Value must be a non-negative number.");
      (0, assert_1.assert)(Number.isSafeInteger(value), "Value is not a safe integer. Use `bigIntToHex` instead.");
      return (0, hex_1.add0x)(value.toString(16));
    };
    exports.numberToHex = numberToHex;
    var bigIntToHex = (value) => {
      (0, assert_1.assert)(typeof value === "bigint", "Value must be a bigint.");
      (0, assert_1.assert)(value >= 0, "Value must be a non-negative bigint.");
      return (0, hex_1.add0x)(value.toString(16));
    };
    exports.bigIntToHex = bigIntToHex;
    var hexToNumber = (value) => {
      (0, hex_1.assertIsHexString)(value);
      const numberValue = parseInt(value, 16);
      (0, assert_1.assert)(Number.isSafeInteger(numberValue), "Value is not a safe integer. Use `hexToBigInt` instead.");
      return numberValue;
    };
    exports.hexToNumber = hexToNumber;
    var hexToBigInt = (value) => {
      (0, hex_1.assertIsHexString)(value);
      return BigInt((0, hex_1.add0x)(value));
    };
    exports.hexToBigInt = hexToBigInt;
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/opaque.js
var require_opaque = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/opaque.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/time.js
var require_time = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timeSince = exports.inMilliseconds = exports.Duration = void 0;
    var Duration;
    (function(Duration2) {
      Duration2[Duration2["Millisecond"] = 1] = "Millisecond";
      Duration2[Duration2["Second"] = 1e3] = "Second";
      Duration2[Duration2["Minute"] = 6e4] = "Minute";
      Duration2[Duration2["Hour"] = 36e5] = "Hour";
      Duration2[Duration2["Day"] = 864e5] = "Day";
      Duration2[Duration2["Week"] = 6048e5] = "Week";
      Duration2[Duration2["Year"] = 31536e6] = "Year";
    })(Duration = exports.Duration || (exports.Duration = {}));
    var isNonNegativeInteger = (number2) => Number.isInteger(number2) && number2 >= 0;
    var assertIsNonNegativeInteger = (number2, name) => {
      if (!isNonNegativeInteger(number2)) {
        throw new Error(`"${name}" must be a non-negative integer. Received: "${number2}".`);
      }
    };
    function inMilliseconds(count, duration) {
      assertIsNonNegativeInteger(count, "count");
      return count * duration;
    }
    exports.inMilliseconds = inMilliseconds;
    function timeSince(timestamp) {
      assertIsNonNegativeInteger(timestamp, "timestamp");
      return Date.now() - timestamp;
    }
    exports.timeSince = timeSince;
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/transaction-types.js
var require_transaction_types = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/transaction-types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/constants.js
var require_constants3 = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/constants.js"(exports, module) {
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/debug.js"(exports, module) {
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module.exports = debug;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/re.js"(exports, module) {
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants3();
    var debug = require_debug();
    exports = module.exports = {};
    var re = exports.re = [];
    var safeRe = exports.safeRe = [];
    var src = exports.src = [];
    var t = exports.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max2] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max2}}`).split(`${token}+`).join(`${token}{1,${max2}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/parse-options.js"(exports, module) {
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module.exports = parseOptions;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/identifiers.js"(exports, module) {
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/classes/semver.js"(exports, module) {
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants3();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (!identifier && identifierBase === false) {
              throw new Error("invalid increment argument: identifier is empty");
            }
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module.exports = SemVer;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/parse.js"(exports, module) {
    var SemVer = require_semver();
    var parse = (version, options, throwErrors = false) => {
      if (version instanceof SemVer) {
        return version;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module.exports = parse;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/valid.js"(exports, module) {
    var parse = require_parse();
    var valid = (version, options) => {
      const v = parse(version, options);
      return v ? v.version : null;
    };
    module.exports = valid;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/clean.js"(exports, module) {
    var parse = require_parse();
    var clean = (version, options) => {
      const s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module.exports = clean;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/inc.js"(exports, module) {
    var SemVer = require_semver();
    var inc = (version, release, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version instanceof SemVer ? version.version : version,
          options
        ).inc(release, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    };
    module.exports = inc;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/diff.js"(exports, module) {
    var parse = require_parse();
    var diff = (version1, version2) => {
      const v1 = parse(version1, null, true);
      const v2 = parse(version2, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (highVersion.patch) {
          return "patch";
        }
        if (highVersion.minor) {
          return "minor";
        }
        return "major";
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    };
    module.exports = diff;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/major.js
var require_major = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/major.js"(exports, module) {
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module.exports = major;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/minor.js"(exports, module) {
    var SemVer = require_semver();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module.exports = minor;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/patch.js"(exports, module) {
    var SemVer = require_semver();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module.exports = patch;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/prerelease.js"(exports, module) {
    var parse = require_parse();
    var prerelease = (version, options) => {
      const parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module.exports = prerelease;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/compare.js"(exports, module) {
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module.exports = compare;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/rcompare.js"(exports, module) {
    var compare = require_compare();
    var rcompare = (a, b, loose) => compare(b, a, loose);
    module.exports = rcompare;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/compare-loose.js"(exports, module) {
    var compare = require_compare();
    var compareLoose = (a, b) => compare(a, b, true);
    module.exports = compareLoose;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/compare-build.js"(exports, module) {
    var SemVer = require_semver();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module.exports = compareBuild;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/sort.js"(exports, module) {
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module.exports = sort;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/rsort.js"(exports, module) {
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module.exports = rsort;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/gt.js"(exports, module) {
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module.exports = gt;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/lt.js"(exports, module) {
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module.exports = lt;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/eq.js"(exports, module) {
    var compare = require_compare();
    var eq = (a, b, loose) => compare(a, b, loose) === 0;
    module.exports = eq;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/neq.js"(exports, module) {
    var compare = require_compare();
    var neq = (a, b, loose) => compare(a, b, loose) !== 0;
    module.exports = neq;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/gte.js"(exports, module) {
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module.exports = gte;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/lte.js"(exports, module) {
    var compare = require_compare();
    var lte = (a, b, loose) => compare(a, b, loose) <= 0;
    module.exports = lte;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/cmp.js"(exports, module) {
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module.exports = cmp;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/coerce.js"(exports, module) {
    var SemVer = require_semver();
    var parse = require_parse();
    var { safeRe: re, t } = require_re();
    var coerce2 = (version, options) => {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      const major = match[2];
      const minor = match[3] || "0";
      const patch = match[4] || "0";
      const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
      const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
      return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    };
    module.exports = coerce2;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/internal/lrucache.js"(exports, module) {
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module.exports = LRUCache;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/classes/range.js
var require_range = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/classes/range.js"(exports, module) {
    var SPACE_CHARACTERS = /\s+/g;
    var Range = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module.exports = Range;
    var LRU = require_lrucache();
    var cache = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants3();
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set2, version, options) => {
      for (let i = 0; i < set2.length; i++) {
        if (!set2[i].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set2.length; i++) {
          debug(set2[i].semver);
          if (set2[i].semver === Comparator.ANY) {
            continue;
          }
          if (set2[i].semver.prerelease.length > 0) {
            const allowed = set2[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/classes/comparator.js"(exports, module) {
    var ANY = Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/functions/satisfies.js"(exports, module) {
    var Range = require_range();
    var satisfies = (version, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    };
    module.exports = satisfies;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/to-comparators.js"(exports, module) {
    var Range = require_range();
    var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module.exports = toComparators;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/max-satisfying.js"(exports, module) {
    var SemVer = require_semver();
    var Range = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max2 = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max2 || maxSV.compare(v) === -1) {
            max2 = v;
            maxSV = new SemVer(max2, options);
          }
        }
      });
      return max2;
    };
    module.exports = maxSatisfying;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/min-satisfying.js"(exports, module) {
    var SemVer = require_semver();
    var Range = require_range();
    var minSatisfying = (versions, range, options) => {
      let min2 = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min2 || minSV.compare(v) === 1) {
            min2 = v;
            minSV = new SemVer(min2, options);
          }
        }
      });
      return min2;
    };
    module.exports = minSatisfying;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/min-version.js"(exports, module) {
    var SemVer = require_semver();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = (range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module.exports = minVersion;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/valid.js"(exports, module) {
    var Range = require_range();
    var validRange = (range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module.exports = validRange;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/outside.js"(exports, module) {
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module.exports = outside;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/gtr.js"(exports, module) {
    var outside = require_outside();
    var gtr = (version, range, options) => outside(version, range, ">", options);
    module.exports = gtr;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/ltr.js"(exports, module) {
    var outside = require_outside();
    var ltr = (version, range, options) => outside(version, range, "<", options);
    module.exports = ltr;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/intersects.js"(exports, module) {
    var Range = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2, options);
    };
    module.exports = intersects;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/simplify.js"(exports, module) {
    var satisfies = require_satisfies();
    var compare = require_compare();
    module.exports = (versions, range, options) => {
      const set2 = [];
      let first = null;
      let prev = null;
      const v = versions.sort((a, b) => compare(a, b, options));
      for (const version of v) {
        const included = satisfies(version, range, options);
        if (included) {
          prev = version;
          if (!first) {
            first = version;
          }
        } else {
          if (prev) {
            set2.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set2.push([first, null]);
      }
      const ranges = [];
      for (const [min2, max2] of set2) {
        if (min2 === max2) {
          ranges.push(min2);
        } else if (!max2 && min2 === v[0]) {
          ranges.push("*");
        } else if (!max2) {
          ranges.push(`>=${min2}`);
        } else if (min2 === v[0]) {
          ranges.push(`<=${max2}`);
        } else {
          ranges.push(`${min2} - ${max2}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/ranges/subset.js"(exports, module) {
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    };
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt = higherGT(gt, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module.exports = subset;
  }
});

// node_modules/.pnpm/semver@7.6.3/node_modules/semver/index.js
var require_semver2 = __commonJS({
  "node_modules/.pnpm/semver@7.6.3/node_modules/semver/index.js"(exports, module) {
    var internalRe = require_re();
    var constants = require_constants3();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce2 = require_coerce();
    var Comparator = require_comparator();
    var Range = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module.exports = {
      parse,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce: coerce2,
      Comparator,
      Range,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/versions.js
var require_versions = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/versions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.satisfiesVersionRange = exports.gtRange = exports.gtVersion = exports.assertIsSemVerRange = exports.assertIsSemVerVersion = exports.isValidSemVerRange = exports.isValidSemVerVersion = exports.VersionRangeStruct = exports.VersionStruct = void 0;
    var semver_1 = require_semver2();
    var superstruct_1 = (init_dist(), __toCommonJS(dist_exports));
    var assert_1 = require_assert();
    exports.VersionStruct = (0, superstruct_1.refine)((0, superstruct_1.string)(), "Version", (value) => {
      if ((0, semver_1.valid)(value) === null) {
        return `Expected SemVer version, got "${value}"`;
      }
      return true;
    });
    exports.VersionRangeStruct = (0, superstruct_1.refine)((0, superstruct_1.string)(), "Version range", (value) => {
      if ((0, semver_1.validRange)(value) === null) {
        return `Expected SemVer range, got "${value}"`;
      }
      return true;
    });
    function isValidSemVerVersion(version) {
      return (0, superstruct_1.is)(version, exports.VersionStruct);
    }
    exports.isValidSemVerVersion = isValidSemVerVersion;
    function isValidSemVerRange(versionRange) {
      return (0, superstruct_1.is)(versionRange, exports.VersionRangeStruct);
    }
    exports.isValidSemVerRange = isValidSemVerRange;
    function assertIsSemVerVersion(version) {
      (0, assert_1.assertStruct)(version, exports.VersionStruct);
    }
    exports.assertIsSemVerVersion = assertIsSemVerVersion;
    function assertIsSemVerRange(range) {
      (0, assert_1.assertStruct)(range, exports.VersionRangeStruct);
    }
    exports.assertIsSemVerRange = assertIsSemVerRange;
    function gtVersion(version1, version2) {
      return (0, semver_1.gt)(version1, version2);
    }
    exports.gtVersion = gtVersion;
    function gtRange(version, range) {
      return (0, semver_1.gtr)(version, range);
    }
    exports.gtRange = gtRange;
    function satisfiesVersionRange(version, versionRange) {
      return (0, semver_1.satisfies)(version, versionRange, {
        includePrerelease: true
      });
    }
    exports.satisfiesVersionRange = satisfiesVersionRange;
  }
});

// node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@metamask+utils@5.0.2/node_modules/@metamask/utils/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_assert(), exports);
    __exportStar(require_base64(), exports);
    __exportStar(require_bytes(), exports);
    __exportStar(require_checksum(), exports);
    __exportStar(require_coercers(), exports);
    __exportStar(require_collections(), exports);
    __exportStar(require_encryption_types(), exports);
    __exportStar(require_hex(), exports);
    __exportStar(require_json(), exports);
    __exportStar(require_keyring(), exports);
    __exportStar(require_logging(), exports);
    __exportStar(require_misc(), exports);
    __exportStar(require_number(), exports);
    __exportStar(require_opaque(), exports);
    __exportStar(require_time(), exports);
    __exportStar(require_transaction_types(), exports);
    __exportStar(require_versions(), exports);
  }
});

// node_modules/.pnpm/eth-block-tracker@7.1.0/node_modules/eth-block-tracker/dist/logging-utils.js
var require_logging_utils = __commonJS({
  "node_modules/.pnpm/eth-block-tracker@7.1.0/node_modules/eth-block-tracker/dist/logging-utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createModuleLogger = exports.projectLogger = void 0;
    var utils_1 = require_dist();
    Object.defineProperty(exports, "createModuleLogger", { enumerable: true, get: function() {
      return utils_1.createModuleLogger;
    } });
    exports.projectLogger = (0, utils_1.createProjectLogger)("eth-block-tracker");
  }
});

// node_modules/.pnpm/eth-block-tracker@7.1.0/node_modules/eth-block-tracker/dist/PollingBlockTracker.js
var require_PollingBlockTracker = __commonJS({
  "node_modules/.pnpm/eth-block-tracker@7.1.0/node_modules/eth-block-tracker/dist/PollingBlockTracker.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollingBlockTracker = void 0;
    var json_rpc_random_id_1 = __importDefault(require_json_rpc_random_id());
    var pify_1 = __importDefault(require_pify());
    var BaseBlockTracker_1 = require_BaseBlockTracker();
    var logging_utils_1 = require_logging_utils();
    var log = (0, logging_utils_1.createModuleLogger)(logging_utils_1.projectLogger, "polling-block-tracker");
    var createRandomId = (0, json_rpc_random_id_1.default)();
    var sec = 1e3;
    var PollingBlockTracker = class extends BaseBlockTracker_1.BaseBlockTracker {
      constructor(opts = {}) {
        var _a;
        if (!opts.provider) {
          throw new Error("PollingBlockTracker - no provider specified.");
        }
        super(Object.assign(Object.assign({}, opts), { blockResetDuration: (_a = opts.blockResetDuration) !== null && _a !== void 0 ? _a : opts.pollingInterval }));
        this._provider = opts.provider;
        this._pollingInterval = opts.pollingInterval || 20 * sec;
        this._retryTimeout = opts.retryTimeout || this._pollingInterval / 10;
        this._keepEventLoopActive = opts.keepEventLoopActive === void 0 ? true : opts.keepEventLoopActive;
        this._setSkipCacheFlag = opts.setSkipCacheFlag || false;
      }
      // trigger block polling
      async checkForLatestBlock() {
        await this._updateLatestBlock();
        return await this.getLatestBlock();
      }
      async _start() {
        this._synchronize();
      }
      async _end() {
      }
      async _synchronize() {
        var _a;
        while (this._isRunning) {
          try {
            await this._updateLatestBlock();
            const promise = timeout(this._pollingInterval, !this._keepEventLoopActive);
            this.emit("_waitingForNextIteration");
            await promise;
          } catch (err) {
            const newErr = new Error(`PollingBlockTracker - encountered an error while attempting to update latest block:
${(_a = err.stack) !== null && _a !== void 0 ? _a : err}`);
            try {
              this.emit("error", newErr);
            } catch (emitErr) {
              console.error(newErr);
            }
            const promise = timeout(this._retryTimeout, !this._keepEventLoopActive);
            this.emit("_waitingForNextIteration");
            await promise;
          }
        }
      }
      async _updateLatestBlock() {
        const latestBlock = await this._fetchLatestBlock();
        this._newPotentialLatest(latestBlock);
      }
      async _fetchLatestBlock() {
        const req = {
          jsonrpc: "2.0",
          id: createRandomId(),
          method: "eth_blockNumber",
          params: []
        };
        if (this._setSkipCacheFlag) {
          req.skipCache = true;
        }
        log("Making request", req);
        const res = await (0, pify_1.default)((cb) => this._provider.sendAsync(req, cb))();
        log("Got response", res);
        if (res.error) {
          throw new Error(`PollingBlockTracker - encountered error fetching block:
${res.error.message}`);
        }
        return res.result;
      }
    };
    exports.PollingBlockTracker = PollingBlockTracker;
    function timeout(duration, unref) {
      return new Promise((resolve) => {
        const timeoutRef = setTimeout(resolve, duration);
        if (timeoutRef.unref && unref) {
          timeoutRef.unref();
        }
      });
    }
  }
});

// node_modules/.pnpm/eth-block-tracker@7.1.0/node_modules/eth-block-tracker/dist/SubscribeBlockTracker.js
var require_SubscribeBlockTracker = __commonJS({
  "node_modules/.pnpm/eth-block-tracker@7.1.0/node_modules/eth-block-tracker/dist/SubscribeBlockTracker.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SubscribeBlockTracker = void 0;
    var json_rpc_random_id_1 = __importDefault(require_json_rpc_random_id());
    var BaseBlockTracker_1 = require_BaseBlockTracker();
    var createRandomId = (0, json_rpc_random_id_1.default)();
    var SubscribeBlockTracker = class extends BaseBlockTracker_1.BaseBlockTracker {
      constructor(opts = {}) {
        if (!opts.provider) {
          throw new Error("SubscribeBlockTracker - no provider specified.");
        }
        super(opts);
        this._provider = opts.provider;
        this._subscriptionId = null;
      }
      async checkForLatestBlock() {
        return await this.getLatestBlock();
      }
      async _start() {
        if (this._subscriptionId === void 0 || this._subscriptionId === null) {
          try {
            const blockNumber = await this._call("eth_blockNumber");
            this._subscriptionId = await this._call("eth_subscribe", "newHeads");
            this._provider.on("data", this._handleSubData.bind(this));
            this._newPotentialLatest(blockNumber);
          } catch (e) {
            this.emit("error", e);
          }
        }
      }
      async _end() {
        if (this._subscriptionId !== null && this._subscriptionId !== void 0) {
          try {
            await this._call("eth_unsubscribe", this._subscriptionId);
            this._subscriptionId = null;
          } catch (e) {
            this.emit("error", e);
          }
        }
      }
      _call(method, ...params) {
        return new Promise((resolve, reject) => {
          this._provider.sendAsync({
            id: createRandomId(),
            method,
            params,
            jsonrpc: "2.0"
          }, (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res.result);
            }
          });
        });
      }
      _handleSubData(_, response) {
        var _a;
        if (response.method === "eth_subscription" && ((_a = response.params) === null || _a === void 0 ? void 0 : _a.subscription) === this._subscriptionId) {
          this._newPotentialLatest(response.params.result.number);
        }
      }
    };
    exports.SubscribeBlockTracker = SubscribeBlockTracker;
  }
});

// node_modules/.pnpm/eth-block-tracker@7.1.0/node_modules/eth-block-tracker/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/.pnpm/eth-block-tracker@7.1.0/node_modules/eth-block-tracker/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_PollingBlockTracker(), exports);
    __exportStar(require_SubscribeBlockTracker(), exports);
  }
});

// node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/getUniqueId.js
var require_getUniqueId = __commonJS({
  "node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/getUniqueId.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getUniqueId = void 0;
    var MAX = 4294967295;
    var idCounter = Math.floor(Math.random() * MAX);
    function getUniqueId() {
      idCounter = (idCounter + 1) % MAX;
      return idCounter;
    }
    exports.getUniqueId = getUniqueId;
  }
});

// node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/idRemapMiddleware.js
var require_idRemapMiddleware = __commonJS({
  "node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/idRemapMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createIdRemapMiddleware = void 0;
    var getUniqueId_1 = require_getUniqueId();
    function createIdRemapMiddleware() {
      return (req, res, next, _end) => {
        const originalId = req.id;
        const newId = getUniqueId_1.getUniqueId();
        req.id = newId;
        res.id = newId;
        next((done) => {
          req.id = originalId;
          res.id = originalId;
          done();
        });
      };
    }
    exports.createIdRemapMiddleware = createIdRemapMiddleware;
  }
});

// node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/createAsyncMiddleware.js
var require_createAsyncMiddleware = __commonJS({
  "node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/createAsyncMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createAsyncMiddleware = void 0;
    function createAsyncMiddleware(asyncMiddleware) {
      return async (req, res, next, end) => {
        let resolveNextPromise;
        const nextPromise = new Promise((resolve) => {
          resolveNextPromise = resolve;
        });
        let returnHandlerCallback = null;
        let nextWasCalled = false;
        const asyncNext = async () => {
          nextWasCalled = true;
          next((runReturnHandlersCallback) => {
            returnHandlerCallback = runReturnHandlersCallback;
            resolveNextPromise();
          });
          await nextPromise;
        };
        try {
          await asyncMiddleware(req, res, asyncNext);
          if (nextWasCalled) {
            await nextPromise;
            returnHandlerCallback(null);
          } else {
            end(null);
          }
        } catch (error) {
          if (returnHandlerCallback) {
            returnHandlerCallback(error);
          } else {
            end(error);
          }
        }
      };
    }
    exports.createAsyncMiddleware = createAsyncMiddleware;
  }
});

// node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/createScaffoldMiddleware.js
var require_createScaffoldMiddleware = __commonJS({
  "node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/createScaffoldMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createScaffoldMiddleware = void 0;
    function createScaffoldMiddleware(handlers) {
      return (req, res, next, end) => {
        const handler = handlers[req.method];
        if (handler === void 0) {
          return next();
        }
        if (typeof handler === "function") {
          return handler(req, res, next, end);
        }
        res.result = handler;
        return end();
      };
    }
    exports.createScaffoldMiddleware = createScaffoldMiddleware;
  }
});

// node_modules/.pnpm/@metamask+safe-event-emitter@2.0.0/node_modules/@metamask/safe-event-emitter/index.js
var require_safe_event_emitter = __commonJS({
  "node_modules/.pnpm/@metamask+safe-event-emitter@2.0.0/node_modules/@metamask/safe-event-emitter/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var events_1 = require_events();
    function safeApply(handler, context, args) {
      try {
        Reflect.apply(handler, context, args);
      } catch (err) {
        setTimeout(() => {
          throw err;
        });
      }
    }
    function arrayClone(arr) {
      const n = arr.length;
      const copy = new Array(n);
      for (let i = 0; i < n; i += 1) {
        copy[i] = arr[i];
      }
      return copy;
    }
    var SafeEventEmitter = class extends events_1.EventEmitter {
      emit(type2, ...args) {
        let doError = type2 === "error";
        const events = this._events;
        if (events !== void 0) {
          doError = doError && events.error === void 0;
        } else if (!doError) {
          return false;
        }
        if (doError) {
          let er;
          if (args.length > 0) {
            [er] = args;
          }
          if (er instanceof Error) {
            throw er;
          }
          const err = new Error(`Unhandled error.${er ? ` (${er.message})` : ""}`);
          err.context = er;
          throw err;
        }
        const handler = events[type2];
        if (handler === void 0) {
          return false;
        }
        if (typeof handler === "function") {
          safeApply(handler, this, args);
        } else {
          const len = handler.length;
          const listeners = arrayClone(handler);
          for (let i = 0; i < len; i += 1) {
            safeApply(listeners[i], this, args);
          }
        }
        return true;
      }
    };
    exports.default = SafeEventEmitter;
  }
});

// node_modules/.pnpm/fast-safe-stringify@2.1.1/node_modules/fast-safe-stringify/index.js
var require_fast_safe_stringify = __commonJS({
  "node_modules/.pnpm/fast-safe-stringify@2.1.1/node_modules/fast-safe-stringify/index.js"(exports, module) {
    module.exports = stringify;
    stringify.default = stringify;
    stringify.stable = deterministicStringify;
    stringify.stableStringify = deterministicStringify;
    var LIMIT_REPLACE_NODE = "[...]";
    var CIRCULAR_REPLACE_NODE = "[Circular]";
    var arr = [];
    var replacerStack = [];
    function defaultOptions() {
      return {
        depthLimit: Number.MAX_SAFE_INTEGER,
        edgesLimit: Number.MAX_SAFE_INTEGER
      };
    }
    function stringify(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      decirc(obj, "", 0, [], void 0, 0, options);
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(obj, replacer, spacer);
        } else {
          res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function setReplace(replace, val, k, parent) {
      var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
      if (propertyDescriptor.get !== void 0) {
        if (propertyDescriptor.configurable) {
          Object.defineProperty(parent, k, { value: replace });
          arr.push([parent, k, val, propertyDescriptor]);
        } else {
          replacerStack.push([val, k, replace]);
        }
      } else {
        parent[k] = replace;
        arr.push([parent, k, val]);
      }
    }
    function decirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            decirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var keys = Object.keys(val);
          for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            decirc(val[key], key, i, stack, val, depth, options);
          }
        }
        stack.pop();
      }
    }
    function compareFunction(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
    function deterministicStringify(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      var tmp = deterministicDecirc(obj, "", 0, [], void 0, 0, options) || obj;
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(tmp, replacer, spacer);
        } else {
          res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        try {
          if (typeof val.toJSON === "function") {
            return;
          }
        } catch (_) {
          return;
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            deterministicDecirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var tmp = {};
          var keys = Object.keys(val).sort(compareFunction);
          for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            deterministicDecirc(val[key], key, i, stack, val, depth, options);
            tmp[key] = val[key];
          }
          if (typeof parent !== "undefined") {
            arr.push([parent, k, val]);
            parent[k] = tmp;
          } else {
            return tmp;
          }
        }
        stack.pop();
      }
    }
    function replaceGetterValues(replacer) {
      replacer = typeof replacer !== "undefined" ? replacer : function(k, v) {
        return v;
      };
      return function(key, val) {
        if (replacerStack.length > 0) {
          for (var i = 0; i < replacerStack.length; i++) {
            var part = replacerStack[i];
            if (part[1] === key && part[0] === val) {
              val = part[2];
              replacerStack.splice(i, 1);
              break;
            }
          }
        }
        return replacer.call(this, key, val);
      };
    }
  }
});

// node_modules/.pnpm/eth-rpc-errors@4.0.3/node_modules/eth-rpc-errors/dist/classes.js
var require_classes = __commonJS({
  "node_modules/.pnpm/eth-rpc-errors@4.0.3/node_modules/eth-rpc-errors/dist/classes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EthereumProviderError = exports.EthereumRpcError = void 0;
    var fast_safe_stringify_1 = require_fast_safe_stringify();
    var EthereumRpcError = class extends Error {
      constructor(code, message, data) {
        if (!Number.isInteger(code)) {
          throw new Error('"code" must be an integer.');
        }
        if (!message || typeof message !== "string") {
          throw new Error('"message" must be a nonempty string.');
        }
        super(message);
        this.code = code;
        if (data !== void 0) {
          this.data = data;
        }
      }
      /**
       * Returns a plain object with all public class properties.
       */
      serialize() {
        const serialized = {
          code: this.code,
          message: this.message
        };
        if (this.data !== void 0) {
          serialized.data = this.data;
        }
        if (this.stack) {
          serialized.stack = this.stack;
        }
        return serialized;
      }
      /**
       * Return a string representation of the serialized error, omitting
       * any circular references.
       */
      toString() {
        return fast_safe_stringify_1.default(this.serialize(), stringifyReplacer, 2);
      }
    };
    exports.EthereumRpcError = EthereumRpcError;
    var EthereumProviderError = class extends EthereumRpcError {
      /**
       * Create an Ethereum Provider JSON-RPC error.
       * `code` must be an integer in the 1000 <= 4999 range.
       */
      constructor(code, message, data) {
        if (!isValidEthProviderCode(code)) {
          throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        }
        super(code, message, data);
      }
    };
    exports.EthereumProviderError = EthereumProviderError;
    function isValidEthProviderCode(code) {
      return Number.isInteger(code) && code >= 1e3 && code <= 4999;
    }
    function stringifyReplacer(_, value) {
      if (value === "[Circular]") {
        return void 0;
      }
      return value;
    }
  }
});

// node_modules/.pnpm/eth-rpc-errors@4.0.3/node_modules/eth-rpc-errors/dist/error-constants.js
var require_error_constants = __commonJS({
  "node_modules/.pnpm/eth-rpc-errors@4.0.3/node_modules/eth-rpc-errors/dist/error-constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.errorValues = exports.errorCodes = void 0;
    exports.errorCodes = {
      rpc: {
        invalidInput: -32e3,
        resourceNotFound: -32001,
        resourceUnavailable: -32002,
        transactionRejected: -32003,
        methodNotSupported: -32004,
        limitExceeded: -32005,
        parse: -32700,
        invalidRequest: -32600,
        methodNotFound: -32601,
        invalidParams: -32602,
        internal: -32603
      },
      provider: {
        userRejectedRequest: 4001,
        unauthorized: 4100,
        unsupportedMethod: 4200,
        disconnected: 4900,
        chainDisconnected: 4901
      }
    };
    exports.errorValues = {
      "-32700": {
        standard: "JSON RPC 2.0",
        message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
      },
      "-32600": {
        standard: "JSON RPC 2.0",
        message: "The JSON sent is not a valid Request object."
      },
      "-32601": {
        standard: "JSON RPC 2.0",
        message: "The method does not exist / is not available."
      },
      "-32602": {
        standard: "JSON RPC 2.0",
        message: "Invalid method parameter(s)."
      },
      "-32603": {
        standard: "JSON RPC 2.0",
        message: "Internal JSON-RPC error."
      },
      "-32000": {
        standard: "EIP-1474",
        message: "Invalid input."
      },
      "-32001": {
        standard: "EIP-1474",
        message: "Resource not found."
      },
      "-32002": {
        standard: "EIP-1474",
        message: "Resource unavailable."
      },
      "-32003": {
        standard: "EIP-1474",
        message: "Transaction rejected."
      },
      "-32004": {
        standard: "EIP-1474",
        message: "Method not supported."
      },
      "-32005": {
        standard: "EIP-1474",
        message: "Request limit exceeded."
      },
      "4001": {
        standard: "EIP-1193",
        message: "User rejected the request."
      },
      "4100": {
        standard: "EIP-1193",
        message: "The requested account and/or method has not been authorized by the user."
      },
      "4200": {
        standard: "EIP-1193",
        message: "The requested method is not supported by this Ethereum provider."
      },
      "4900": {
        standard: "EIP-1193",
        message: "The provider is disconnected from all chains."
      },
      "4901": {
        standard: "EIP-1193",
        message: "The provider is disconnected from the specified chain."
      }
    };
  }
});

// node_modules/.pnpm/eth-rpc-errors@4.0.3/node_modules/eth-rpc-errors/dist/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/eth-rpc-errors@4.0.3/node_modules/eth-rpc-errors/dist/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeError = exports.isValidCode = exports.getMessageFromCode = exports.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;
    var error_constants_1 = require_error_constants();
    var classes_1 = require_classes();
    var FALLBACK_ERROR_CODE = error_constants_1.errorCodes.rpc.internal;
    var FALLBACK_MESSAGE = "Unspecified error message. This is a bug, please report it.";
    var FALLBACK_ERROR = {
      code: FALLBACK_ERROR_CODE,
      message: getMessageFromCode(FALLBACK_ERROR_CODE)
    };
    exports.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error.";
    function getMessageFromCode(code, fallbackMessage = FALLBACK_MESSAGE) {
      if (Number.isInteger(code)) {
        const codeString = code.toString();
        if (hasKey(error_constants_1.errorValues, codeString)) {
          return error_constants_1.errorValues[codeString].message;
        }
        if (isJsonRpcServerError(code)) {
          return exports.JSON_RPC_SERVER_ERROR_MESSAGE;
        }
      }
      return fallbackMessage;
    }
    exports.getMessageFromCode = getMessageFromCode;
    function isValidCode(code) {
      if (!Number.isInteger(code)) {
        return false;
      }
      const codeString = code.toString();
      if (error_constants_1.errorValues[codeString]) {
        return true;
      }
      if (isJsonRpcServerError(code)) {
        return true;
      }
      return false;
    }
    exports.isValidCode = isValidCode;
    function serializeError(error, { fallbackError = FALLBACK_ERROR, shouldIncludeStack = false } = {}) {
      var _a, _b;
      if (!fallbackError || !Number.isInteger(fallbackError.code) || typeof fallbackError.message !== "string") {
        throw new Error("Must provide fallback error with integer number code and string message.");
      }
      if (error instanceof classes_1.EthereumRpcError) {
        return error.serialize();
      }
      const serialized = {};
      if (error && typeof error === "object" && !Array.isArray(error) && hasKey(error, "code") && isValidCode(error.code)) {
        const _error = error;
        serialized.code = _error.code;
        if (_error.message && typeof _error.message === "string") {
          serialized.message = _error.message;
          if (hasKey(_error, "data")) {
            serialized.data = _error.data;
          }
        } else {
          serialized.message = getMessageFromCode(serialized.code);
          serialized.data = { originalError: assignOriginalError(error) };
        }
      } else {
        serialized.code = fallbackError.code;
        const message = (_a = error) === null || _a === void 0 ? void 0 : _a.message;
        serialized.message = message && typeof message === "string" ? message : fallbackError.message;
        serialized.data = { originalError: assignOriginalError(error) };
      }
      const stack = (_b = error) === null || _b === void 0 ? void 0 : _b.stack;
      if (shouldIncludeStack && error && stack && typeof stack === "string") {
        serialized.stack = stack;
      }
      return serialized;
    }
    exports.serializeError = serializeError;
    function isJsonRpcServerError(code) {
      return code >= -32099 && code <= -32e3;
    }
    function assignOriginalError(error) {
      if (error && typeof error === "object" && !Array.isArray(error)) {
        return Object.assign({}, error);
      }
      return error;
    }
    function hasKey(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  }
});

// node_modules/.pnpm/eth-rpc-errors@4.0.3/node_modules/eth-rpc-errors/dist/errors.js
var require_errors2 = __commonJS({
  "node_modules/.pnpm/eth-rpc-errors@4.0.3/node_modules/eth-rpc-errors/dist/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ethErrors = void 0;
    var classes_1 = require_classes();
    var utils_1 = require_utils2();
    var error_constants_1 = require_error_constants();
    exports.ethErrors = {
      rpc: {
        /**
         * Get a JSON RPC 2.0 Parse (-32700) error.
         */
        parse: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.parse, arg),
        /**
         * Get a JSON RPC 2.0 Invalid Request (-32600) error.
         */
        invalidRequest: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidRequest, arg),
        /**
         * Get a JSON RPC 2.0 Invalid Params (-32602) error.
         */
        invalidParams: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidParams, arg),
        /**
         * Get a JSON RPC 2.0 Method Not Found (-32601) error.
         */
        methodNotFound: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotFound, arg),
        /**
         * Get a JSON RPC 2.0 Internal (-32603) error.
         */
        internal: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.internal, arg),
        /**
         * Get a JSON RPC 2.0 Server error.
         * Permits integer error codes in the [ -32099 <= -32005 ] range.
         * Codes -32000 through -32004 are reserved by EIP-1474.
         */
        server: (opts) => {
          if (!opts || typeof opts !== "object" || Array.isArray(opts)) {
            throw new Error("Ethereum RPC Server errors must provide single object argument.");
          }
          const { code } = opts;
          if (!Number.isInteger(code) || code > -32005 || code < -32099) {
            throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
          }
          return getEthJsonRpcError(code, opts);
        },
        /**
         * Get an Ethereum JSON RPC Invalid Input (-32000) error.
         */
        invalidInput: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidInput, arg),
        /**
         * Get an Ethereum JSON RPC Resource Not Found (-32001) error.
         */
        resourceNotFound: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceNotFound, arg),
        /**
         * Get an Ethereum JSON RPC Resource Unavailable (-32002) error.
         */
        resourceUnavailable: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceUnavailable, arg),
        /**
         * Get an Ethereum JSON RPC Transaction Rejected (-32003) error.
         */
        transactionRejected: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.transactionRejected, arg),
        /**
         * Get an Ethereum JSON RPC Method Not Supported (-32004) error.
         */
        methodNotSupported: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotSupported, arg),
        /**
         * Get an Ethereum JSON RPC Limit Exceeded (-32005) error.
         */
        limitExceeded: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.limitExceeded, arg)
      },
      provider: {
        /**
         * Get an Ethereum Provider User Rejected Request (4001) error.
         */
        userRejectedRequest: (arg) => {
          return getEthProviderError(error_constants_1.errorCodes.provider.userRejectedRequest, arg);
        },
        /**
         * Get an Ethereum Provider Unauthorized (4100) error.
         */
        unauthorized: (arg) => {
          return getEthProviderError(error_constants_1.errorCodes.provider.unauthorized, arg);
        },
        /**
         * Get an Ethereum Provider Unsupported Method (4200) error.
         */
        unsupportedMethod: (arg) => {
          return getEthProviderError(error_constants_1.errorCodes.provider.unsupportedMethod, arg);
        },
        /**
         * Get an Ethereum Provider Not Connected (4900) error.
         */
        disconnected: (arg) => {
          return getEthProviderError(error_constants_1.errorCodes.provider.disconnected, arg);
        },
        /**
         * Get an Ethereum Provider Chain Not Connected (4901) error.
         */
        chainDisconnected: (arg) => {
          return getEthProviderError(error_constants_1.errorCodes.provider.chainDisconnected, arg);
        },
        /**
         * Get a custom Ethereum Provider error.
         */
        custom: (opts) => {
          if (!opts || typeof opts !== "object" || Array.isArray(opts)) {
            throw new Error("Ethereum Provider custom errors must provide single object argument.");
          }
          const { code, message, data } = opts;
          if (!message || typeof message !== "string") {
            throw new Error('"message" must be a nonempty string');
          }
          return new classes_1.EthereumProviderError(code, message, data);
        }
      }
    };
    function getEthJsonRpcError(code, arg) {
      const [message, data] = parseOpts(arg);
      return new classes_1.EthereumRpcError(code, message || utils_1.getMessageFromCode(code), data);
    }
    function getEthProviderError(code, arg) {
      const [message, data] = parseOpts(arg);
      return new classes_1.EthereumProviderError(code, message || utils_1.getMessageFromCode(code), data);
    }
    function parseOpts(arg) {
      if (arg) {
        if (typeof arg === "string") {
          return [arg];
        } else if (typeof arg === "object" && !Array.isArray(arg)) {
          const { message, data } = arg;
          if (message && typeof message !== "string") {
            throw new Error("Must specify string message.");
          }
          return [message || void 0, data];
        }
      }
      return [];
    }
  }
});

// node_modules/.pnpm/eth-rpc-errors@4.0.3/node_modules/eth-rpc-errors/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/.pnpm/eth-rpc-errors@4.0.3/node_modules/eth-rpc-errors/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMessageFromCode = exports.serializeError = exports.EthereumProviderError = exports.EthereumRpcError = exports.ethErrors = exports.errorCodes = void 0;
    var classes_1 = require_classes();
    Object.defineProperty(exports, "EthereumRpcError", { enumerable: true, get: function() {
      return classes_1.EthereumRpcError;
    } });
    Object.defineProperty(exports, "EthereumProviderError", { enumerable: true, get: function() {
      return classes_1.EthereumProviderError;
    } });
    var utils_1 = require_utils2();
    Object.defineProperty(exports, "serializeError", { enumerable: true, get: function() {
      return utils_1.serializeError;
    } });
    Object.defineProperty(exports, "getMessageFromCode", { enumerable: true, get: function() {
      return utils_1.getMessageFromCode;
    } });
    var errors_1 = require_errors2();
    Object.defineProperty(exports, "ethErrors", { enumerable: true, get: function() {
      return errors_1.ethErrors;
    } });
    var error_constants_1 = require_error_constants();
    Object.defineProperty(exports, "errorCodes", { enumerable: true, get: function() {
      return error_constants_1.errorCodes;
    } });
  }
});

// node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/JsonRpcEngine.js
var require_JsonRpcEngine = __commonJS({
  "node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/JsonRpcEngine.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JsonRpcEngine = void 0;
    var safe_event_emitter_1 = __importDefault(require_safe_event_emitter());
    var eth_rpc_errors_1 = require_dist3();
    var JsonRpcEngine = class _JsonRpcEngine extends safe_event_emitter_1.default {
      constructor() {
        super();
        this._middleware = [];
      }
      /**
       * Add a middleware function to the engine's middleware stack.
       *
       * @param middleware - The middleware function to add.
       */
      push(middleware) {
        this._middleware.push(middleware);
      }
      handle(req, cb) {
        if (cb && typeof cb !== "function") {
          throw new Error('"callback" must be a function if provided.');
        }
        if (Array.isArray(req)) {
          if (cb) {
            return this._handleBatch(req, cb);
          }
          return this._handleBatch(req);
        }
        if (cb) {
          return this._handle(req, cb);
        }
        return this._promiseHandle(req);
      }
      /**
       * Returns this engine as a middleware function that can be pushed to other
       * engines.
       *
       * @returns This engine as a middleware function.
       */
      asMiddleware() {
        return async (req, res, next, end) => {
          try {
            const [middlewareError, isComplete, returnHandlers] = await _JsonRpcEngine._runAllMiddleware(req, res, this._middleware);
            if (isComplete) {
              await _JsonRpcEngine._runReturnHandlers(returnHandlers);
              return end(middlewareError);
            }
            return next(async (handlerCallback) => {
              try {
                await _JsonRpcEngine._runReturnHandlers(returnHandlers);
              } catch (error) {
                return handlerCallback(error);
              }
              return handlerCallback();
            });
          } catch (error) {
            return end(error);
          }
        };
      }
      async _handleBatch(reqs, cb) {
        try {
          const responses = await Promise.all(
            // 1. Begin executing each request in the order received
            reqs.map(this._promiseHandle.bind(this))
          );
          if (cb) {
            return cb(null, responses);
          }
          return responses;
        } catch (error) {
          if (cb) {
            return cb(error);
          }
          throw error;
        }
      }
      /**
       * A promise-wrapped _handle.
       */
      _promiseHandle(req) {
        return new Promise((resolve) => {
          this._handle(req, (_err, res) => {
            resolve(res);
          });
        });
      }
      /**
       * Ensures that the request object is valid, processes it, and passes any
       * error and the response object to the given callback.
       *
       * Does not reject.
       */
      async _handle(callerReq, cb) {
        if (!callerReq || Array.isArray(callerReq) || typeof callerReq !== "object") {
          const error2 = new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.invalidRequest, `Requests must be plain objects. Received: ${typeof callerReq}`, { request: callerReq });
          return cb(error2, { id: void 0, jsonrpc: "2.0", error: error2 });
        }
        if (typeof callerReq.method !== "string") {
          const error2 = new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.invalidRequest, `Must specify a string method. Received: ${typeof callerReq.method}`, { request: callerReq });
          return cb(error2, { id: callerReq.id, jsonrpc: "2.0", error: error2 });
        }
        const req = Object.assign({}, callerReq);
        const res = {
          id: req.id,
          jsonrpc: req.jsonrpc
        };
        let error = null;
        try {
          await this._processRequest(req, res);
        } catch (_error) {
          error = _error;
        }
        if (error) {
          delete res.result;
          if (!res.error) {
            res.error = eth_rpc_errors_1.serializeError(error);
          }
        }
        return cb(error, res);
      }
      /**
       * For the given request and response, runs all middleware and their return
       * handlers, if any, and ensures that internal request processing semantics
       * are satisfied.
       */
      async _processRequest(req, res) {
        const [error, isComplete, returnHandlers] = await _JsonRpcEngine._runAllMiddleware(req, res, this._middleware);
        _JsonRpcEngine._checkForCompletion(req, res, isComplete);
        await _JsonRpcEngine._runReturnHandlers(returnHandlers);
        if (error) {
          throw error;
        }
      }
      /**
       * Serially executes the given stack of middleware.
       *
       * @returns An array of any error encountered during middleware execution,
       * a boolean indicating whether the request was completed, and an array of
       * middleware-defined return handlers.
       */
      static async _runAllMiddleware(req, res, middlewareStack) {
        const returnHandlers = [];
        let error = null;
        let isComplete = false;
        for (const middleware of middlewareStack) {
          [error, isComplete] = await _JsonRpcEngine._runMiddleware(req, res, middleware, returnHandlers);
          if (isComplete) {
            break;
          }
        }
        return [error, isComplete, returnHandlers.reverse()];
      }
      /**
       * Runs an individual middleware.
       *
       * @returns An array of any error encountered during middleware exection,
       * and a boolean indicating whether the request should end.
       */
      static _runMiddleware(req, res, middleware, returnHandlers) {
        return new Promise((resolve) => {
          const end = (err) => {
            const error = err || res.error;
            if (error) {
              res.error = eth_rpc_errors_1.serializeError(error);
            }
            resolve([error, true]);
          };
          const next = (returnHandler) => {
            if (res.error) {
              end(res.error);
            } else {
              if (returnHandler) {
                if (typeof returnHandler !== "function") {
                  end(new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: "next" return handlers must be functions. Received "${typeof returnHandler}" for request:
${jsonify(req)}`, { request: req }));
                }
                returnHandlers.push(returnHandler);
              }
              resolve([null, false]);
            }
          };
          try {
            middleware(req, res, next, end);
          } catch (error) {
            end(error);
          }
        });
      }
      /**
       * Serially executes array of return handlers. The request and response are
       * assumed to be in their scope.
       */
      static async _runReturnHandlers(handlers) {
        for (const handler of handlers) {
          await new Promise((resolve, reject) => {
            handler((err) => err ? reject(err) : resolve());
          });
        }
      }
      /**
       * Throws an error if the response has neither a result nor an error, or if
       * the "isComplete" flag is falsy.
       */
      static _checkForCompletion(req, res, isComplete) {
        if (!("result" in res) && !("error" in res)) {
          throw new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: Response has no error or result for request:
${jsonify(req)}`, { request: req });
        }
        if (!isComplete) {
          throw new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: Nothing ended request:
${jsonify(req)}`, { request: req });
        }
      }
    };
    exports.JsonRpcEngine = JsonRpcEngine;
    function jsonify(request) {
      return JSON.stringify(request, null, 2);
    }
  }
});

// node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/mergeMiddleware.js
var require_mergeMiddleware = __commonJS({
  "node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/mergeMiddleware.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mergeMiddleware = void 0;
    var JsonRpcEngine_1 = require_JsonRpcEngine();
    function mergeMiddleware(middlewareStack) {
      const engine = new JsonRpcEngine_1.JsonRpcEngine();
      middlewareStack.forEach((middleware) => engine.push(middleware));
      return engine.asMiddleware();
    }
    exports.mergeMiddleware = mergeMiddleware;
  }
});

// node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/index.js
var require_dist4 = __commonJS({
  "node_modules/.pnpm/json-rpc-engine@6.1.0/node_modules/json-rpc-engine/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_idRemapMiddleware(), exports);
    __exportStar(require_createAsyncMiddleware(), exports);
    __exportStar(require_createScaffoldMiddleware(), exports);
    __exportStar(require_getUniqueId(), exports);
    __exportStar(require_JsonRpcEngine(), exports);
    __exportStar(require_mergeMiddleware(), exports);
  }
});

// node_modules/.pnpm/async-mutex@0.2.6/node_modules/async-mutex/lib/Semaphore.js
var require_Semaphore = __commonJS({
  "node_modules/.pnpm/async-mutex@0.2.6/node_modules/async-mutex/lib/Semaphore.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var Semaphore = (
      /** @class */
      function() {
        function Semaphore2(_maxConcurrency) {
          this._maxConcurrency = _maxConcurrency;
          this._queue = [];
          if (_maxConcurrency <= 0) {
            throw new Error("semaphore must be initialized to a positive value");
          }
          this._value = _maxConcurrency;
        }
        Semaphore2.prototype.acquire = function() {
          var _this = this;
          var locked = this.isLocked();
          var ticket = new Promise(function(r) {
            return _this._queue.push(r);
          });
          if (!locked)
            this._dispatch();
          return ticket;
        };
        Semaphore2.prototype.runExclusive = function(callback) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, value, release;
            return tslib_1.__generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  return [4, this.acquire()];
                case 1:
                  _a = _b.sent(), value = _a[0], release = _a[1];
                  _b.label = 2;
                case 2:
                  _b.trys.push([2, , 4, 5]);
                  return [4, callback(value)];
                case 3:
                  return [2, _b.sent()];
                case 4:
                  release();
                  return [
                    7
                    /*endfinally*/
                  ];
                case 5:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        Semaphore2.prototype.isLocked = function() {
          return this._value <= 0;
        };
        Semaphore2.prototype.release = function() {
          if (this._maxConcurrency > 1) {
            throw new Error("this method is unavailabel on semaphores with concurrency > 1; use the scoped release returned by acquire instead");
          }
          if (this._currentReleaser) {
            var releaser = this._currentReleaser;
            this._currentReleaser = void 0;
            releaser();
          }
        };
        Semaphore2.prototype._dispatch = function() {
          var _this = this;
          var nextConsumer = this._queue.shift();
          if (!nextConsumer)
            return;
          var released = false;
          this._currentReleaser = function() {
            if (released)
              return;
            released = true;
            _this._value++;
            _this._dispatch();
          };
          nextConsumer([this._value--, this._currentReleaser]);
        };
        return Semaphore2;
      }()
    );
    exports.default = Semaphore;
  }
});

// node_modules/.pnpm/async-mutex@0.2.6/node_modules/async-mutex/lib/Mutex.js
var require_Mutex = __commonJS({
  "node_modules/.pnpm/async-mutex@0.2.6/node_modules/async-mutex/lib/Mutex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var Semaphore_1 = require_Semaphore();
    var Mutex = (
      /** @class */
      function() {
        function Mutex2() {
          this._semaphore = new Semaphore_1.default(1);
        }
        Mutex2.prototype.acquire = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var _a, releaser;
            return tslib_1.__generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  return [4, this._semaphore.acquire()];
                case 1:
                  _a = _b.sent(), releaser = _a[1];
                  return [2, releaser];
              }
            });
          });
        };
        Mutex2.prototype.runExclusive = function(callback) {
          return this._semaphore.runExclusive(function() {
            return callback();
          });
        };
        Mutex2.prototype.isLocked = function() {
          return this._semaphore.isLocked();
        };
        Mutex2.prototype.release = function() {
          this._semaphore.release();
        };
        return Mutex2;
      }()
    );
    exports.default = Mutex;
  }
});

// node_modules/.pnpm/async-mutex@0.2.6/node_modules/async-mutex/lib/withTimeout.js
var require_withTimeout = __commonJS({
  "node_modules/.pnpm/async-mutex@0.2.6/node_modules/async-mutex/lib/withTimeout.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.withTimeout = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    function withTimeout(sync, timeout, timeoutError) {
      var _this = this;
      if (timeoutError === void 0) {
        timeoutError = new Error("timeout");
      }
      return {
        acquire: function() {
          return new Promise(function(resolve, reject) {
            return tslib_1.__awaiter(_this, void 0, void 0, function() {
              var isTimeout, ticket, release;
              return tslib_1.__generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    isTimeout = false;
                    setTimeout(function() {
                      isTimeout = true;
                      reject(timeoutError);
                    }, timeout);
                    return [4, sync.acquire()];
                  case 1:
                    ticket = _a.sent();
                    if (isTimeout) {
                      release = Array.isArray(ticket) ? ticket[1] : ticket;
                      release();
                    } else {
                      resolve(ticket);
                    }
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          });
        },
        runExclusive: function(callback) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var release, ticket;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  release = function() {
                    return void 0;
                  };
                  _a.label = 1;
                case 1:
                  _a.trys.push([1, , 7, 8]);
                  return [4, this.acquire()];
                case 2:
                  ticket = _a.sent();
                  if (!Array.isArray(ticket)) return [3, 4];
                  release = ticket[1];
                  return [4, callback(ticket[0])];
                case 3:
                  return [2, _a.sent()];
                case 4:
                  release = ticket;
                  return [4, callback()];
                case 5:
                  return [2, _a.sent()];
                case 6:
                  return [3, 8];
                case 7:
                  release();
                  return [
                    7
                    /*endfinally*/
                  ];
                case 8:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        },
        release: function() {
          sync.release();
        },
        isLocked: function() {
          return sync.isLocked();
        }
      };
    }
    exports.withTimeout = withTimeout;
  }
});

// node_modules/.pnpm/async-mutex@0.2.6/node_modules/async-mutex/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/async-mutex@0.2.6/node_modules/async-mutex/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.withTimeout = exports.Semaphore = exports.Mutex = void 0;
    var Mutex_1 = require_Mutex();
    Object.defineProperty(exports, "Mutex", { enumerable: true, get: function() {
      return Mutex_1.default;
    } });
    var Semaphore_1 = require_Semaphore();
    Object.defineProperty(exports, "Semaphore", { enumerable: true, get: function() {
      return Semaphore_1.default;
    } });
    var withTimeout_1 = require_withTimeout();
    Object.defineProperty(exports, "withTimeout", { enumerable: true, get: function() {
      return withTimeout_1.withTimeout;
    } });
  }
});

// node_modules/.pnpm/xtend@4.0.2/node_modules/xtend/immutable.js
var require_immutable = __commonJS({
  "node_modules/.pnpm/xtend@4.0.2/node_modules/xtend/immutable.js"(exports, module) {
    module.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend() {
      var target = {};
      for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
  }
});

// node_modules/.pnpm/eth-query@2.1.2/node_modules/eth-query/index.js
var require_eth_query = __commonJS({
  "node_modules/.pnpm/eth-query@2.1.2/node_modules/eth-query/index.js"(exports, module) {
    var extend = require_immutable();
    var createRandomId = require_json_rpc_random_id()();
    module.exports = EthQuery;
    function EthQuery(provider) {
      const self = this;
      self.currentProvider = provider;
    }
    EthQuery.prototype.getBalance = generateFnWithDefaultBlockFor(2, "eth_getBalance");
    EthQuery.prototype.getCode = generateFnWithDefaultBlockFor(2, "eth_getCode");
    EthQuery.prototype.getTransactionCount = generateFnWithDefaultBlockFor(2, "eth_getTransactionCount");
    EthQuery.prototype.getStorageAt = generateFnWithDefaultBlockFor(3, "eth_getStorageAt");
    EthQuery.prototype.call = generateFnWithDefaultBlockFor(2, "eth_call");
    EthQuery.prototype.protocolVersion = generateFnFor("eth_protocolVersion");
    EthQuery.prototype.syncing = generateFnFor("eth_syncing");
    EthQuery.prototype.coinbase = generateFnFor("eth_coinbase");
    EthQuery.prototype.mining = generateFnFor("eth_mining");
    EthQuery.prototype.hashrate = generateFnFor("eth_hashrate");
    EthQuery.prototype.gasPrice = generateFnFor("eth_gasPrice");
    EthQuery.prototype.accounts = generateFnFor("eth_accounts");
    EthQuery.prototype.blockNumber = generateFnFor("eth_blockNumber");
    EthQuery.prototype.getBlockTransactionCountByHash = generateFnFor("eth_getBlockTransactionCountByHash");
    EthQuery.prototype.getBlockTransactionCountByNumber = generateFnFor("eth_getBlockTransactionCountByNumber");
    EthQuery.prototype.getUncleCountByBlockHash = generateFnFor("eth_getUncleCountByBlockHash");
    EthQuery.prototype.getUncleCountByBlockNumber = generateFnFor("eth_getUncleCountByBlockNumber");
    EthQuery.prototype.sign = generateFnFor("eth_sign");
    EthQuery.prototype.sendTransaction = generateFnFor("eth_sendTransaction");
    EthQuery.prototype.sendRawTransaction = generateFnFor("eth_sendRawTransaction");
    EthQuery.prototype.estimateGas = generateFnFor("eth_estimateGas");
    EthQuery.prototype.getBlockByHash = generateFnFor("eth_getBlockByHash");
    EthQuery.prototype.getBlockByNumber = generateFnFor("eth_getBlockByNumber");
    EthQuery.prototype.getTransactionByHash = generateFnFor("eth_getTransactionByHash");
    EthQuery.prototype.getTransactionByBlockHashAndIndex = generateFnFor("eth_getTransactionByBlockHashAndIndex");
    EthQuery.prototype.getTransactionByBlockNumberAndIndex = generateFnFor("eth_getTransactionByBlockNumberAndIndex");
    EthQuery.prototype.getTransactionReceipt = generateFnFor("eth_getTransactionReceipt");
    EthQuery.prototype.getUncleByBlockHashAndIndex = generateFnFor("eth_getUncleByBlockHashAndIndex");
    EthQuery.prototype.getUncleByBlockNumberAndIndex = generateFnFor("eth_getUncleByBlockNumberAndIndex");
    EthQuery.prototype.getCompilers = generateFnFor("eth_getCompilers");
    EthQuery.prototype.compileLLL = generateFnFor("eth_compileLLL");
    EthQuery.prototype.compileSolidity = generateFnFor("eth_compileSolidity");
    EthQuery.prototype.compileSerpent = generateFnFor("eth_compileSerpent");
    EthQuery.prototype.newFilter = generateFnFor("eth_newFilter");
    EthQuery.prototype.newBlockFilter = generateFnFor("eth_newBlockFilter");
    EthQuery.prototype.newPendingTransactionFilter = generateFnFor("eth_newPendingTransactionFilter");
    EthQuery.prototype.uninstallFilter = generateFnFor("eth_uninstallFilter");
    EthQuery.prototype.getFilterChanges = generateFnFor("eth_getFilterChanges");
    EthQuery.prototype.getFilterLogs = generateFnFor("eth_getFilterLogs");
    EthQuery.prototype.getLogs = generateFnFor("eth_getLogs");
    EthQuery.prototype.getWork = generateFnFor("eth_getWork");
    EthQuery.prototype.submitWork = generateFnFor("eth_submitWork");
    EthQuery.prototype.submitHashrate = generateFnFor("eth_submitHashrate");
    EthQuery.prototype.sendAsync = function(opts, cb) {
      const self = this;
      self.currentProvider.sendAsync(createPayload(opts), function(err, response) {
        if (!err && response.error) err = new Error("EthQuery - RPC Error - " + response.error.message);
        if (err) return cb(err);
        cb(null, response.result);
      });
    };
    function generateFnFor(methodName) {
      return function() {
        const self = this;
        var args = [].slice.call(arguments);
        var cb = args.pop();
        self.sendAsync({
          method: methodName,
          params: args
        }, cb);
      };
    }
    function generateFnWithDefaultBlockFor(argCount, methodName) {
      return function() {
        const self = this;
        var args = [].slice.call(arguments);
        var cb = args.pop();
        if (args.length < argCount) args.push("latest");
        self.sendAsync({
          method: methodName,
          params: args
        }, cb);
      };
    }
    function createPayload(data) {
      return extend({
        // defaults
        id: createRandomId(),
        jsonrpc: "2.0",
        params: []
        // user-specified
      }, data);
    }
  }
});

// node_modules/.pnpm/pify@5.0.0/node_modules/pify/index.js
var require_pify2 = __commonJS({
  "node_modules/.pnpm/pify@5.0.0/node_modules/pify/index.js"(exports, module) {
    "use strict";
    var processFn = (fn, options, proxy, unwrapped) => function(...arguments_) {
      const P = options.promiseModule;
      return new P((resolve, reject) => {
        if (options.multiArgs) {
          arguments_.push((...result) => {
            if (options.errorFirst) {
              if (result[0]) {
                reject(result);
              } else {
                result.shift();
                resolve(result);
              }
            } else {
              resolve(result);
            }
          });
        } else if (options.errorFirst) {
          arguments_.push((error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        } else {
          arguments_.push(resolve);
        }
        const self = this === proxy ? unwrapped : this;
        Reflect.apply(fn, self, arguments_);
      });
    };
    var filterCache = /* @__PURE__ */ new WeakMap();
    module.exports = (input, options) => {
      options = {
        exclude: [/.+(?:Sync|Stream)$/],
        errorFirst: true,
        promiseModule: Promise,
        ...options
      };
      const objectType = typeof input;
      if (!(input !== null && (objectType === "object" || objectType === "function"))) {
        throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? "null" : objectType}\``);
      }
      const filter = (target, key) => {
        let cached = filterCache.get(target);
        if (!cached) {
          cached = {};
          filterCache.set(target, cached);
        }
        if (key in cached) {
          return cached[key];
        }
        const match = (pattern2) => typeof pattern2 === "string" || typeof key === "symbol" ? key === pattern2 : pattern2.test(key);
        const desc = Reflect.getOwnPropertyDescriptor(target, key);
        const writableOrConfigurableOwn = desc === void 0 || desc.writable || desc.configurable;
        const included = options.include ? options.include.some(match) : !options.exclude.some(match);
        const shouldFilter = included && writableOrConfigurableOwn;
        cached[key] = shouldFilter;
        return shouldFilter;
      };
      const cache = /* @__PURE__ */ new WeakMap();
      const proxy = new Proxy(input, {
        apply(target, thisArg, args) {
          const cached = cache.get(target);
          if (cached) {
            return Reflect.apply(cached, thisArg, args);
          }
          const pified = options.excludeMain ? target : processFn(target, options, proxy, target);
          cache.set(target, pified);
          return Reflect.apply(pified, thisArg, args);
        },
        get(target, key) {
          const property = target[key];
          if (!filter(target, key) || property === Function.prototype[key]) {
            return property;
          }
          const cached = cache.get(property);
          if (cached) {
            return cached;
          }
          if (typeof property === "function") {
            const pified = processFn(property, options, proxy, target);
            cache.set(property, pified);
            return pified;
          }
          return property;
        }
      });
      return proxy;
    };
  }
});

// node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/base-filter.js
var require_base_filter = __commonJS({
  "node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/base-filter.js"(exports, module) {
    var SafeEventEmitter = require_cjs().default;
    var BaseFilter = class extends SafeEventEmitter {
      constructor() {
        super();
        this.updates = [];
      }
      async initialize() {
      }
      async update() {
        throw new Error("BaseFilter - no update method specified");
      }
      addResults(newResults) {
        this.updates = this.updates.concat(newResults);
        newResults.forEach((result) => this.emit("update", result));
      }
      addInitialResults(newResults) {
      }
      getChangesAndClear() {
        const updates = this.updates;
        this.updates = [];
        return updates;
      }
    };
    module.exports = BaseFilter;
  }
});

// node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/base-filter-history.js
var require_base_filter_history = __commonJS({
  "node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/base-filter-history.js"(exports, module) {
    var BaseFilter = require_base_filter();
    var BaseFilterWithHistory = class extends BaseFilter {
      constructor() {
        super();
        this.allResults = [];
      }
      async update() {
        throw new Error("BaseFilterWithHistory - no update method specified");
      }
      addResults(newResults) {
        this.allResults = this.allResults.concat(newResults);
        super.addResults(newResults);
      }
      addInitialResults(newResults) {
        this.allResults = this.allResults.concat(newResults);
        super.addInitialResults(newResults);
      }
      getAllResults() {
        return this.allResults;
      }
    };
    module.exports = BaseFilterWithHistory;
  }
});

// node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/hexUtils.js
var require_hexUtils = __commonJS({
  "node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/hexUtils.js"(exports, module) {
    module.exports = {
      minBlockRef,
      maxBlockRef,
      sortBlockRefs,
      bnToHex,
      blockRefIsNumber,
      hexToInt,
      incrementHexInt,
      intToHex,
      unsafeRandomBytes
    };
    function minBlockRef(...refs) {
      const sortedRefs = sortBlockRefs(refs);
      return sortedRefs[0];
    }
    function maxBlockRef(...refs) {
      const sortedRefs = sortBlockRefs(refs);
      return sortedRefs[sortedRefs.length - 1];
    }
    function sortBlockRefs(refs) {
      return refs.sort((refA, refB) => {
        if (refA === "latest" || refB === "earliest") return 1;
        if (refB === "latest" || refA === "earliest") return -1;
        return hexToInt(refA) - hexToInt(refB);
      });
    }
    function bnToHex(bn) {
      return "0x" + bn.toString(16);
    }
    function blockRefIsNumber(blockRef) {
      return blockRef && !["earliest", "latest", "pending"].includes(blockRef);
    }
    function hexToInt(hexString) {
      if (hexString === void 0 || hexString === null) return hexString;
      return Number.parseInt(hexString, 16);
    }
    function incrementHexInt(hexString) {
      if (hexString === void 0 || hexString === null) return hexString;
      const value = hexToInt(hexString);
      return intToHex(value + 1);
    }
    function intToHex(int) {
      if (int === void 0 || int === null) return int;
      let hexString = int.toString(16);
      const needsLeftPad = hexString.length % 2;
      if (needsLeftPad) hexString = "0" + hexString;
      return "0x" + hexString;
    }
    function unsafeRandomBytes(byteCount) {
      let result = "0x";
      for (let i = 0; i < byteCount; i++) {
        result += unsafeRandomNibble();
        result += unsafeRandomNibble();
      }
      return result;
    }
    function unsafeRandomNibble() {
      return Math.floor(Math.random() * 16).toString(16);
    }
  }
});

// node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/log-filter.js
var require_log_filter = __commonJS({
  "node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/log-filter.js"(exports, module) {
    var EthQuery = require_eth_query();
    var pify = require_pify2();
    var BaseFilterWithHistory = require_base_filter_history();
    var { bnToHex, hexToInt, incrementHexInt, minBlockRef, blockRefIsNumber } = require_hexUtils();
    var LogFilter = class extends BaseFilterWithHistory {
      constructor({ provider, params }) {
        super();
        this.type = "log";
        this.ethQuery = new EthQuery(provider);
        this.params = Object.assign({
          fromBlock: "latest",
          toBlock: "latest",
          address: void 0,
          topics: []
        }, params);
        if (this.params.address) {
          if (!Array.isArray(this.params.address)) {
            this.params.address = [this.params.address];
          }
          this.params.address = this.params.address.map((address) => address.toLowerCase());
        }
      }
      async initialize({ currentBlock }) {
        let fromBlock = this.params.fromBlock;
        if (["latest", "pending"].includes(fromBlock)) fromBlock = currentBlock;
        if ("earliest" === fromBlock) fromBlock = "0x0";
        this.params.fromBlock = fromBlock;
        const toBlock = minBlockRef(this.params.toBlock, currentBlock);
        const params = Object.assign({}, this.params, { toBlock });
        const newLogs = await this._fetchLogs(params);
        this.addInitialResults(newLogs);
      }
      async update({ oldBlock, newBlock }) {
        const toBlock = newBlock;
        let fromBlock;
        if (oldBlock) {
          fromBlock = incrementHexInt(oldBlock);
        } else {
          fromBlock = newBlock;
        }
        const params = Object.assign({}, this.params, { fromBlock, toBlock });
        const newLogs = await this._fetchLogs(params);
        const matchingLogs = newLogs.filter((log) => this.matchLog(log));
        this.addResults(matchingLogs);
      }
      async _fetchLogs(params) {
        const newLogs = await pify((cb) => this.ethQuery.getLogs(params, cb))();
        return newLogs;
      }
      matchLog(log) {
        if (hexToInt(this.params.fromBlock) >= hexToInt(log.blockNumber)) return false;
        if (blockRefIsNumber(this.params.toBlock) && hexToInt(this.params.toBlock) <= hexToInt(log.blockNumber)) return false;
        const normalizedLogAddress = log.address && log.address.toLowerCase();
        if (this.params.address && normalizedLogAddress && !this.params.address.includes(normalizedLogAddress)) return false;
        const topicsMatch = this.params.topics.every((topicPattern, index) => {
          let logTopic = log.topics[index];
          if (!logTopic) return false;
          logTopic = logTopic.toLowerCase();
          let subtopicsToMatch = Array.isArray(topicPattern) ? topicPattern : [topicPattern];
          const subtopicsIncludeWildcard = subtopicsToMatch.includes(null);
          if (subtopicsIncludeWildcard) return true;
          subtopicsToMatch = subtopicsToMatch.map((topic) => topic.toLowerCase());
          const topicDoesMatch = subtopicsToMatch.includes(logTopic);
          return topicDoesMatch;
        });
        return topicsMatch;
      }
    };
    module.exports = LogFilter;
  }
});

// node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/getBlocksForRange.js
var require_getBlocksForRange = __commonJS({
  "node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/getBlocksForRange.js"(exports, module) {
    module.exports = getBlocksForRange;
    async function getBlocksForRange({ provider, fromBlock, toBlock }) {
      if (!fromBlock) fromBlock = toBlock;
      const fromBlockNumber = hexToInt(fromBlock);
      const toBlockNumber = hexToInt(toBlock);
      const blockCountToQuery = toBlockNumber - fromBlockNumber + 1;
      const missingBlockNumbers = Array(blockCountToQuery).fill().map((_, index) => fromBlockNumber + index).map(intToHex);
      let blockBodies = await Promise.all(
        missingBlockNumbers.map((blockNum) => query(provider, "eth_getBlockByNumber", [blockNum, false]))
      );
      blockBodies = blockBodies.filter((block) => block !== null);
      return blockBodies;
    }
    function hexToInt(hexString) {
      if (hexString === void 0 || hexString === null) return hexString;
      return Number.parseInt(hexString, 16);
    }
    function intToHex(int) {
      if (int === void 0 || int === null) return int;
      const hexString = int.toString(16);
      return "0x" + hexString;
    }
    function sendAsync(provider, request) {
      return new Promise((resolve, reject) => {
        provider.sendAsync(request, (error, response) => {
          if (error) {
            reject(error);
          } else if (response.error) {
            reject(response.error);
          } else if (response.result) {
            resolve(response.result);
          } else {
            reject(new Error("Result was empty"));
          }
        });
      });
    }
    async function query(provider, method, params) {
      for (let i = 0; i < 3; i++) {
        try {
          return await sendAsync(provider, {
            id: 1,
            jsonrpc: "2.0",
            method,
            params
          });
        } catch (error) {
          console.error(
            `provider.sendAsync failed: ${error.stack || error.message || error}`
          );
        }
      }
      return null;
    }
  }
});

// node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/block-filter.js
var require_block_filter = __commonJS({
  "node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/block-filter.js"(exports, module) {
    var BaseFilter = require_base_filter();
    var getBlocksForRange = require_getBlocksForRange();
    var { incrementHexInt } = require_hexUtils();
    var BlockFilter = class extends BaseFilter {
      constructor({ provider, params }) {
        super();
        this.type = "block";
        this.provider = provider;
      }
      async update({ oldBlock, newBlock }) {
        const toBlock = newBlock;
        const fromBlock = incrementHexInt(oldBlock);
        const blockBodies = await getBlocksForRange({ provider: this.provider, fromBlock, toBlock });
        const blockHashes = blockBodies.map((block) => block.hash);
        this.addResults(blockHashes);
      }
    };
    module.exports = BlockFilter;
  }
});

// node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/tx-filter.js
var require_tx_filter = __commonJS({
  "node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/tx-filter.js"(exports, module) {
    var BaseFilter = require_base_filter();
    var getBlocksForRange = require_getBlocksForRange();
    var { incrementHexInt } = require_hexUtils();
    var TxFilter = class extends BaseFilter {
      constructor({ provider }) {
        super();
        this.type = "tx";
        this.provider = provider;
      }
      async update({ oldBlock }) {
        const toBlock = oldBlock;
        const fromBlock = incrementHexInt(oldBlock);
        const blocks = await getBlocksForRange({ provider: this.provider, fromBlock, toBlock });
        const blockTxHashes = [];
        for (const block of blocks) {
          blockTxHashes.push(...block.transactions);
        }
        this.addResults(blockTxHashes);
      }
    };
    module.exports = TxFilter;
  }
});

// node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/index.js
var require_eth_json_rpc_filters = __commonJS({
  "node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/index.js"(exports, module) {
    var Mutex = require_lib().Mutex;
    var { createAsyncMiddleware, createScaffoldMiddleware } = require_dist4();
    var LogFilter = require_log_filter();
    var BlockFilter = require_block_filter();
    var TxFilter = require_tx_filter();
    var { intToHex, hexToInt } = require_hexUtils();
    module.exports = createEthFilterMiddleware;
    function createEthFilterMiddleware({ blockTracker, provider }) {
      let filterIndex = 0;
      let filters = {};
      const mutex = new Mutex();
      const waitForFree = mutexMiddlewareWrapper({ mutex });
      const middleware = createScaffoldMiddleware({
        // install filters
        eth_newFilter: waitForFree(toFilterCreationMiddleware(newLogFilter)),
        eth_newBlockFilter: waitForFree(toFilterCreationMiddleware(newBlockFilter)),
        eth_newPendingTransactionFilter: waitForFree(toFilterCreationMiddleware(newPendingTransactionFilter)),
        // uninstall filters
        eth_uninstallFilter: waitForFree(toAsyncRpcMiddleware(uninstallFilterHandler)),
        // checking filter changes
        eth_getFilterChanges: waitForFree(toAsyncRpcMiddleware(getFilterChanges)),
        eth_getFilterLogs: waitForFree(toAsyncRpcMiddleware(getFilterLogs))
      });
      const filterUpdater = async ({ oldBlock, newBlock }) => {
        if (filters.length === 0) return;
        const releaseLock = await mutex.acquire();
        try {
          await Promise.all(objValues(filters).map(async (filter) => {
            try {
              await filter.update({ oldBlock, newBlock });
            } catch (err) {
              console.error(err);
            }
          }));
        } catch (err) {
          console.error(err);
        }
        releaseLock();
      };
      middleware.newLogFilter = newLogFilter;
      middleware.newBlockFilter = newBlockFilter;
      middleware.newPendingTransactionFilter = newPendingTransactionFilter;
      middleware.uninstallFilter = uninstallFilterHandler;
      middleware.getFilterChanges = getFilterChanges;
      middleware.getFilterLogs = getFilterLogs;
      middleware.destroy = () => {
        uninstallAllFilters();
      };
      return middleware;
      async function newLogFilter(params) {
        const filter = new LogFilter({ provider, params });
        const filterIndex2 = await installFilter(filter);
        return filter;
      }
      async function newBlockFilter() {
        const filter = new BlockFilter({ provider });
        const filterIndex2 = await installFilter(filter);
        return filter;
      }
      async function newPendingTransactionFilter() {
        const filter = new TxFilter({ provider });
        const filterIndex2 = await installFilter(filter);
        return filter;
      }
      async function getFilterChanges(filterIndexHex) {
        const filterIndex2 = hexToInt(filterIndexHex);
        const filter = filters[filterIndex2];
        if (!filter) {
          throw new Error(`No filter for index "${filterIndex2}"`);
        }
        const results = filter.getChangesAndClear();
        return results;
      }
      async function getFilterLogs(filterIndexHex) {
        const filterIndex2 = hexToInt(filterIndexHex);
        const filter = filters[filterIndex2];
        if (!filter) {
          throw new Error(`No filter for index "${filterIndex2}"`);
        }
        let results = [];
        if (filter.type === "log") {
          results = filter.getAllResults();
        }
        return results;
      }
      async function uninstallFilterHandler(filterIndexHex) {
        const filterIndex2 = hexToInt(filterIndexHex);
        const filter = filters[filterIndex2];
        const result = Boolean(filter);
        if (result) {
          await uninstallFilter(filterIndex2);
        }
        return result;
      }
      async function installFilter(filter) {
        const prevFilterCount = objValues(filters).length;
        const currentBlock = await blockTracker.getLatestBlock();
        await filter.initialize({ currentBlock });
        filterIndex++;
        filters[filterIndex] = filter;
        filter.id = filterIndex;
        filter.idHex = intToHex(filterIndex);
        const newFilterCount = objValues(filters).length;
        updateBlockTrackerSubs({ prevFilterCount, newFilterCount });
        return filterIndex;
      }
      async function uninstallFilter(filterIndex2) {
        const prevFilterCount = objValues(filters).length;
        delete filters[filterIndex2];
        const newFilterCount = objValues(filters).length;
        updateBlockTrackerSubs({ prevFilterCount, newFilterCount });
      }
      async function uninstallAllFilters() {
        const prevFilterCount = objValues(filters).length;
        filters = {};
        updateBlockTrackerSubs({ prevFilterCount, newFilterCount: 0 });
      }
      function updateBlockTrackerSubs({ prevFilterCount, newFilterCount }) {
        if (prevFilterCount === 0 && newFilterCount > 0) {
          blockTracker.on("sync", filterUpdater);
          return;
        }
        if (prevFilterCount > 0 && newFilterCount === 0) {
          blockTracker.removeListener("sync", filterUpdater);
          return;
        }
      }
    }
    function toFilterCreationMiddleware(createFilterFn) {
      return toAsyncRpcMiddleware(async (...args) => {
        const filter = await createFilterFn(...args);
        const result = intToHex(filter.id);
        return result;
      });
    }
    function toAsyncRpcMiddleware(asyncFn) {
      return createAsyncMiddleware(async (req, res) => {
        const result = await asyncFn.apply(null, req.params);
        res.result = result;
      });
    }
    function mutexMiddlewareWrapper({ mutex }) {
      return (middleware) => {
        return async (req, res, next, end) => {
          const releaseLock = await mutex.acquire();
          releaseLock();
          middleware(req, res, next, end);
        };
      };
    }
    function objValues(obj, fn) {
      const values = [];
      for (let key in obj) {
        values.push(obj[key]);
      }
      return values;
    }
  }
});

// node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/subscriptionManager.js
var require_subscriptionManager = __commonJS({
  "node_modules/.pnpm/eth-json-rpc-filters@6.0.1/node_modules/eth-json-rpc-filters/subscriptionManager.js"(exports, module) {
    var SafeEventEmitter = require_cjs().default;
    var { createAsyncMiddleware, createScaffoldMiddleware } = require_dist4();
    var createFilterMiddleware = require_eth_json_rpc_filters();
    var { unsafeRandomBytes, incrementHexInt } = require_hexUtils();
    var getBlocksForRange = require_getBlocksForRange();
    module.exports = createSubscriptionMiddleware;
    function createSubscriptionMiddleware({ blockTracker, provider }) {
      const subscriptions = {};
      const filterManager = createFilterMiddleware({ blockTracker, provider });
      let isDestroyed = false;
      const events = new SafeEventEmitter();
      const middleware = createScaffoldMiddleware({
        eth_subscribe: createAsyncMiddleware(subscribe),
        eth_unsubscribe: createAsyncMiddleware(unsubscribe)
      });
      middleware.destroy = destroy;
      return { events, middleware };
      async function subscribe(req, res) {
        if (isDestroyed) throw new Error(
          "SubscriptionManager - attempting to use after destroying"
        );
        const subscriptionType = req.params[0];
        const subId = unsafeRandomBytes(16);
        let sub;
        switch (subscriptionType) {
          case "newHeads":
            sub = createSubNewHeads({ subId });
            break;
          case "logs":
            const filterParams = req.params[1];
            const filter = await filterManager.newLogFilter(filterParams);
            sub = createSubFromFilter({ subId, filter });
            break;
          default:
            throw new Error(`SubscriptionManager - unsupported subscription type "${subscriptionType}"`);
        }
        subscriptions[subId] = sub;
        res.result = subId;
        return;
        function createSubNewHeads({ subId: subId2 }) {
          const sub2 = {
            type: subscriptionType,
            destroy: async () => {
              blockTracker.removeListener("sync", sub2.update);
            },
            update: async ({ oldBlock, newBlock }) => {
              const toBlock = newBlock;
              const fromBlock = incrementHexInt(oldBlock);
              const rawBlocks = await getBlocksForRange({ provider, fromBlock, toBlock });
              const results = rawBlocks.map(normalizeBlock).filter((block) => block !== null);
              results.forEach((value) => {
                _emitSubscriptionResult(subId2, value);
              });
            }
          };
          blockTracker.on("sync", sub2.update);
          return sub2;
        }
        function createSubFromFilter({ subId: subId2, filter }) {
          filter.on("update", (result) => _emitSubscriptionResult(subId2, result));
          const sub2 = {
            type: subscriptionType,
            destroy: async () => {
              return await filterManager.uninstallFilter(filter.idHex);
            }
          };
          return sub2;
        }
      }
      async function unsubscribe(req, res) {
        if (isDestroyed) throw new Error(
          "SubscriptionManager - attempting to use after destroying"
        );
        const id = req.params[0];
        const subscription = subscriptions[id];
        if (!subscription) {
          res.result = false;
          return;
        }
        delete subscriptions[id];
        await subscription.destroy();
        res.result = true;
      }
      function _emitSubscriptionResult(filterIdHex, value) {
        events.emit("notification", {
          jsonrpc: "2.0",
          method: "eth_subscription",
          params: {
            subscription: filterIdHex,
            result: value
          }
        });
      }
      function destroy() {
        events.removeAllListeners();
        for (const id in subscriptions) {
          subscriptions[id].destroy();
          delete subscriptions[id];
        }
        isDestroyed = true;
      }
    }
    function normalizeBlock(block) {
      if (block === null || block === void 0) {
        return null;
      }
      return {
        hash: block.hash,
        parentHash: block.parentHash,
        sha3Uncles: block.sha3Uncles,
        miner: block.miner,
        stateRoot: block.stateRoot,
        transactionsRoot: block.transactionsRoot,
        receiptsRoot: block.receiptsRoot,
        logsBloom: block.logsBloom,
        difficulty: block.difficulty,
        number: block.number,
        gasLimit: block.gasLimit,
        gasUsed: block.gasUsed,
        nonce: block.nonce,
        mixHash: block.mixHash,
        timestamp: block.timestamp,
        extraData: block.extraData
      };
    }
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/provider/SubscriptionManager.js
var require_SubscriptionManager = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/provider/SubscriptionManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SubscriptionManager = void 0;
    var eth_block_tracker_1 = require_dist2();
    var createSubscriptionManager = require_subscriptionManager();
    var noop = () => {
    };
    var SubscriptionManager = class {
      constructor(provider) {
        const blockTracker = new eth_block_tracker_1.PollingBlockTracker({
          provider,
          pollingInterval: 15e3,
          setSkipCacheFlag: true
        });
        const { events, middleware } = createSubscriptionManager({
          blockTracker,
          provider
        });
        this.events = events;
        this.subscriptionMiddleware = middleware;
      }
      async handleRequest(request) {
        const result = {};
        await this.subscriptionMiddleware(request, result, noop, noop);
        return result;
      }
      destroy() {
        this.subscriptionMiddleware.destroy();
      }
    };
    exports.SubscriptionManager = SubscriptionManager;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/provider/CoinbaseWalletProvider.js
var require_CoinbaseWalletProvider = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/provider/CoinbaseWalletProvider.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CoinbaseWalletProvider = void 0;
    var bn_js_1 = __importDefault(require_bn());
    var eventemitter3_1 = require_eventemitter3();
    var error_1 = require_error();
    var util_1 = require_util();
    var MobileRelay_1 = require_MobileRelay();
    var RelayAbstract_1 = require_RelayAbstract();
    var Session_1 = require_Session();
    var Web3Response_1 = require_Web3Response();
    var eth_eip712_util_1 = __importDefault(require_eth_eip712_util());
    var DiagnosticLogger_1 = require_DiagnosticLogger();
    var FilterPolyfill_1 = require_FilterPolyfill();
    var SubscriptionManager_1 = require_SubscriptionManager();
    var DEFAULT_CHAIN_ID_KEY = "DefaultChainId";
    var DEFAULT_JSON_RPC_URL = "DefaultJsonRpcUrl";
    var CoinbaseWalletProvider = class extends eventemitter3_1.EventEmitter {
      constructor(options) {
        var _a, _b;
        super();
        this._filterPolyfill = new FilterPolyfill_1.FilterPolyfill(this);
        this._subscriptionManager = new SubscriptionManager_1.SubscriptionManager(this);
        this._relay = null;
        this._addresses = [];
        this.hasMadeFirstChainChangedEmission = false;
        this.setProviderInfo = this.setProviderInfo.bind(this);
        this.updateProviderInfo = this.updateProviderInfo.bind(this);
        this.getChainId = this.getChainId.bind(this);
        this.setAppInfo = this.setAppInfo.bind(this);
        this.enable = this.enable.bind(this);
        this.close = this.close.bind(this);
        this.send = this.send.bind(this);
        this.sendAsync = this.sendAsync.bind(this);
        this.request = this.request.bind(this);
        this._setAddresses = this._setAddresses.bind(this);
        this.scanQRCode = this.scanQRCode.bind(this);
        this.genericRequest = this.genericRequest.bind(this);
        this._chainIdFromOpts = options.chainId;
        this._jsonRpcUrlFromOpts = options.jsonRpcUrl;
        this._overrideIsMetaMask = options.overrideIsMetaMask;
        this._relayProvider = options.relayProvider;
        this._storage = options.storage;
        this._relayEventManager = options.relayEventManager;
        this.diagnostic = options.diagnosticLogger;
        this.reloadOnDisconnect = true;
        this.isCoinbaseWallet = (_a = options.overrideIsCoinbaseWallet) !== null && _a !== void 0 ? _a : true;
        this.isCoinbaseBrowser = (_b = options.overrideIsCoinbaseBrowser) !== null && _b !== void 0 ? _b : false;
        this.qrUrl = options.qrUrl;
        const chainId = this.getChainId();
        const chainIdStr = (0, util_1.prepend0x)(chainId.toString(16));
        this.emit("connect", { chainIdStr });
        const cachedAddresses = this._storage.getItem(RelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY);
        if (cachedAddresses) {
          const addresses = cachedAddresses.split(" ");
          if (addresses[0] !== "") {
            this._addresses = addresses.map((address) => (0, util_1.ensureAddressString)(address));
            this.emit("accountsChanged", addresses);
          }
        }
        this._subscriptionManager.events.on("notification", (notification) => {
          this.emit("message", {
            type: notification.method,
            data: notification.params
          });
        });
        if (this._isAuthorized()) {
          void this.initializeRelay();
        }
        window.addEventListener("message", (event) => {
          var _a2;
          if (event.origin !== location.origin || event.source !== window) {
            return;
          }
          if (event.data.type !== "walletLinkMessage")
            return;
          if (event.data.data.action === "dappChainSwitched") {
            const _chainId = event.data.data.chainId;
            const jsonRpcUrl = (_a2 = event.data.data.jsonRpcUrl) !== null && _a2 !== void 0 ? _a2 : this.jsonRpcUrl;
            this.updateProviderInfo(jsonRpcUrl, Number(_chainId));
          }
        });
      }
      /** @deprecated Use `.request({ method: 'eth_accounts' })` instead. */
      get selectedAddress() {
        return this._addresses[0] || void 0;
      }
      /** @deprecated Use the chain ID. If you still need the network ID, use `.request({ method: 'net_version' })`. */
      get networkVersion() {
        return this.getChainId().toString(10);
      }
      /** @deprecated Use `.request({ method: 'eth_chainId' })` instead. */
      get chainId() {
        return (0, util_1.prepend0x)(this.getChainId().toString(16));
      }
      get isWalletLink() {
        return true;
      }
      /**
       * Some DApps (i.e. Alpha Homora) seem to require the window.ethereum object return
       * true for this method.
       */
      get isMetaMask() {
        return this._overrideIsMetaMask;
      }
      get host() {
        return this.jsonRpcUrl;
      }
      get connected() {
        return true;
      }
      isConnected() {
        return true;
      }
      get jsonRpcUrl() {
        var _a;
        return (_a = this._storage.getItem(DEFAULT_JSON_RPC_URL)) !== null && _a !== void 0 ? _a : this._jsonRpcUrlFromOpts;
      }
      set jsonRpcUrl(value) {
        this._storage.setItem(DEFAULT_JSON_RPC_URL, value);
      }
      disableReloadOnDisconnect() {
        this.reloadOnDisconnect = false;
      }
      setProviderInfo(jsonRpcUrl, chainId) {
        if (!this.isCoinbaseBrowser) {
          this._chainIdFromOpts = chainId;
          this._jsonRpcUrlFromOpts = jsonRpcUrl;
        }
        this.updateProviderInfo(this.jsonRpcUrl, this.getChainId());
      }
      updateProviderInfo(jsonRpcUrl, chainId) {
        this.jsonRpcUrl = jsonRpcUrl;
        const originalChainId = this.getChainId();
        this._storage.setItem(DEFAULT_CHAIN_ID_KEY, chainId.toString(10));
        const chainChanged = (0, util_1.ensureIntNumber)(chainId) !== originalChainId;
        if (chainChanged || !this.hasMadeFirstChainChangedEmission) {
          this.emit("chainChanged", this.getChainId());
          this.hasMadeFirstChainChangedEmission = true;
        }
      }
      async watchAsset(type2, address, symbol, decimals, image, chainId) {
        const relay = await this.initializeRelay();
        const result = await relay.watchAsset(type2, address, symbol, decimals, image, chainId === null || chainId === void 0 ? void 0 : chainId.toString()).promise;
        if ((0, Web3Response_1.isErrorResponse)(result))
          return false;
        return !!result.result;
      }
      async addEthereumChain(chainId, rpcUrls, blockExplorerUrls, chainName, iconUrls, nativeCurrency) {
        var _a, _b;
        if ((0, util_1.ensureIntNumber)(chainId) === this.getChainId()) {
          return false;
        }
        const relay = await this.initializeRelay();
        const isWhitelistedNetworkOrStandalone = relay.inlineAddEthereumChain(chainId.toString());
        if (!this._isAuthorized() && !isWhitelistedNetworkOrStandalone) {
          await relay.requestEthereumAccounts().promise;
        }
        const res = await relay.addEthereumChain(chainId.toString(), rpcUrls, iconUrls, blockExplorerUrls, chainName, nativeCurrency).promise;
        if ((0, Web3Response_1.isErrorResponse)(res))
          return false;
        if (((_a = res.result) === null || _a === void 0 ? void 0 : _a.isApproved) === true) {
          this.updateProviderInfo(rpcUrls[0], chainId);
        }
        return ((_b = res.result) === null || _b === void 0 ? void 0 : _b.isApproved) === true;
      }
      async switchEthereumChain(chainId) {
        const relay = await this.initializeRelay();
        const res = await relay.switchEthereumChain(chainId.toString(10), this.selectedAddress || void 0).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
          if (!res.errorCode)
            return;
          if (res.errorCode === error_1.standardErrorCodes.provider.unsupportedChain) {
            throw error_1.standardErrors.provider.unsupportedChain();
          } else {
            throw error_1.standardErrors.provider.custom({
              message: res.errorMessage,
              code: res.errorCode
            });
          }
        }
        const switchResponse = res.result;
        if (switchResponse.isApproved && switchResponse.rpcUrl.length > 0) {
          this.updateProviderInfo(switchResponse.rpcUrl, chainId);
        }
      }
      setAppInfo(appName, appLogoUrl) {
        void this.initializeRelay().then((relay) => relay.setAppInfo(appName, appLogoUrl));
      }
      /** @deprecated Use `.request({ method: 'eth_requestAccounts' })` instead. */
      async enable() {
        var _a;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.ETH_ACCOUNTS_STATE, {
          method: "provider::enable",
          addresses_length: this._addresses.length,
          sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : void 0
        });
        if (this._isAuthorized()) {
          return [...this._addresses];
        }
        return await this.send("eth_requestAccounts");
      }
      async close() {
        const relay = await this.initializeRelay();
        relay.resetAndReload();
      }
      send(requestOrMethod, callbackOrParams) {
        try {
          const result = this._send(requestOrMethod, callbackOrParams);
          if (result instanceof Promise) {
            return result.catch((error) => {
              throw (0, error_1.serializeError)(error, requestOrMethod);
            });
          }
        } catch (error) {
          throw (0, error_1.serializeError)(error, requestOrMethod);
        }
      }
      _send(requestOrMethod, callbackOrParams) {
        if (typeof requestOrMethod === "string") {
          const method = requestOrMethod;
          const params = Array.isArray(callbackOrParams) ? callbackOrParams : callbackOrParams !== void 0 ? [callbackOrParams] : [];
          const request = {
            jsonrpc: "2.0",
            id: 0,
            method,
            params
          };
          return this._sendRequestAsync(request).then((res) => res.result);
        }
        if (typeof callbackOrParams === "function") {
          const request = requestOrMethod;
          const callback = callbackOrParams;
          return this._sendAsync(request, callback);
        }
        if (Array.isArray(requestOrMethod)) {
          const requests = requestOrMethod;
          return requests.map((r) => this._sendRequest(r));
        }
        const req = requestOrMethod;
        return this._sendRequest(req);
      }
      async sendAsync(request, callback) {
        try {
          return this._sendAsync(request, callback).catch((error) => {
            throw (0, error_1.serializeError)(error, request);
          });
        } catch (error) {
          return Promise.reject((0, error_1.serializeError)(error, request));
        }
      }
      async _sendAsync(request, callback) {
        if (typeof callback !== "function") {
          throw new Error("callback is required");
        }
        if (Array.isArray(request)) {
          const arrayCb = callback;
          this._sendMultipleRequestsAsync(request).then((responses) => arrayCb(null, responses)).catch((err) => arrayCb(err, null));
          return;
        }
        const cb = callback;
        return this._sendRequestAsync(request).then((response) => cb(null, response)).catch((err) => cb(err, null));
      }
      async request(args) {
        try {
          return this._request(args).catch((error) => {
            throw (0, error_1.serializeError)(error, args.method);
          });
        } catch (error) {
          return Promise.reject((0, error_1.serializeError)(error, args.method));
        }
      }
      async _request(args) {
        if (!args || typeof args !== "object" || Array.isArray(args)) {
          throw error_1.standardErrors.rpc.invalidRequest({
            message: "Expected a single, non-array, object argument.",
            data: args
          });
        }
        const { method, params } = args;
        if (typeof method !== "string" || method.length === 0) {
          throw error_1.standardErrors.rpc.invalidRequest({
            message: "'args.method' must be a non-empty string.",
            data: args
          });
        }
        if (params !== void 0 && !Array.isArray(params) && (typeof params !== "object" || params === null)) {
          throw error_1.standardErrors.rpc.invalidRequest({
            message: "'args.params' must be an object or array if provided.",
            data: args
          });
        }
        const newParams = params === void 0 ? [] : params;
        const id = this._relayEventManager.makeRequestId();
        const result = await this._sendRequestAsync({
          method,
          params: newParams,
          jsonrpc: "2.0",
          id
        });
        return result.result;
      }
      async scanQRCode(match) {
        const relay = await this.initializeRelay();
        const res = await relay.scanQRCode((0, util_1.ensureRegExpString)(match)).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
          throw (0, error_1.serializeError)(res.errorMessage, "scanQRCode");
        } else if (typeof res.result !== "string") {
          throw (0, error_1.serializeError)("result was not a string", "scanQRCode");
        }
        return res.result;
      }
      async genericRequest(data, action) {
        const relay = await this.initializeRelay();
        const res = await relay.genericRequest(data, action).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
          throw (0, error_1.serializeError)(res.errorMessage, "generic");
        } else if (typeof res.result !== "string") {
          throw (0, error_1.serializeError)("result was not a string", "generic");
        }
        return res.result;
      }
      /**
       * @beta
       * This method is currently in beta. While it is available for use, please note that it is still under testing and may undergo significant changes.
       *
       * @remarks
       * IMPORTANT: Signature validation is not performed by this method. Users of this method are advised to perform their own signature validation.
       * Common web3 frontend libraries such as ethers.js and viem provide the `verifyMessage` utility function that can be used for signature validation.
       *
       * It combines `eth_requestAccounts` and "Sign-In with Ethereum" (EIP-4361) into a single call.
       * The returned account and signed message can be used to authenticate the user.
       *
       * @param {Object} params - An object with the following properties:
       * - `nonce` {string}: A unique string to prevent replay attacks.
       * - `statement` {string}: An optional human-readable ASCII assertion that the user will sign.
       * - `resources` {string[]}: An optional list of information the user wishes to have resolved as part of authentication by the relying party.
       *
       * @returns {Promise<ConnectAndSignInResponse>} A promise that resolves to an object with the following properties:
       * - `accounts` {string[]}: The Ethereum accounts of the user.
       * - `message` {string}: The overall message that the user signed. Hex encoded.
       * - `signature` {string}: The signature of the message, signed with the user's private key. Hex encoded.
       */
      async connectAndSignIn(params) {
        var _a;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.ETH_ACCOUNTS_STATE, {
          method: "provider::connectAndSignIn",
          sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : void 0
        });
        let res;
        try {
          const relay = await this.initializeRelay();
          if (!(relay instanceof MobileRelay_1.MobileRelay)) {
            throw new Error("connectAndSignIn is only supported on mobile");
          }
          res = await relay.connectAndSignIn(params).promise;
          if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw new Error(res.errorMessage);
          }
        } catch (err) {
          if (typeof err.message === "string" && err.message.match(/(denied|rejected)/i)) {
            throw error_1.standardErrors.provider.userRejectedRequest("User denied account authorization");
          }
          throw err;
        }
        if (!res.result) {
          throw new Error("accounts received is empty");
        }
        const { accounts } = res.result;
        this._setAddresses(accounts);
        if (!this.isCoinbaseBrowser) {
          await this.switchEthereumChain(this.getChainId());
        }
        return res.result;
      }
      async selectProvider(providerOptions) {
        const relay = await this.initializeRelay();
        const res = await relay.selectProvider(providerOptions).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
          throw (0, error_1.serializeError)(res.errorMessage, "selectProvider");
        } else if (typeof res.result !== "string") {
          throw (0, error_1.serializeError)("result was not a string", "selectProvider");
        }
        return res.result;
      }
      supportsSubscriptions() {
        return false;
      }
      subscribe() {
        throw new Error("Subscriptions are not supported");
      }
      unsubscribe() {
        throw new Error("Subscriptions are not supported");
      }
      disconnect() {
        return true;
      }
      _sendRequest(request) {
        const response = {
          jsonrpc: "2.0",
          id: request.id
        };
        const { method } = request;
        response.result = this._handleSynchronousMethods(request);
        if (response.result === void 0) {
          throw new Error(`Coinbase Wallet does not support calling ${method} synchronously without a callback. Please provide a callback parameter to call ${method} asynchronously.`);
        }
        return response;
      }
      _setAddresses(addresses, _) {
        if (!Array.isArray(addresses)) {
          throw new Error("addresses is not an array");
        }
        const newAddresses = addresses.map((address) => (0, util_1.ensureAddressString)(address));
        if (JSON.stringify(newAddresses) === JSON.stringify(this._addresses)) {
          return;
        }
        this._addresses = newAddresses;
        this.emit("accountsChanged", this._addresses);
        this._storage.setItem(RelayAbstract_1.LOCAL_STORAGE_ADDRESSES_KEY, newAddresses.join(" "));
      }
      _sendRequestAsync(request) {
        return new Promise((resolve, reject) => {
          try {
            const syncResult = this._handleSynchronousMethods(request);
            if (syncResult !== void 0) {
              return resolve({
                jsonrpc: "2.0",
                id: request.id,
                result: syncResult
              });
            }
            const filterPromise = this._handleAsynchronousFilterMethods(request);
            if (filterPromise !== void 0) {
              filterPromise.then((res) => resolve(Object.assign(Object.assign({}, res), { id: request.id }))).catch((err) => reject(err));
              return;
            }
            const subscriptionPromise = this._handleSubscriptionMethods(request);
            if (subscriptionPromise !== void 0) {
              subscriptionPromise.then((res) => resolve({
                jsonrpc: "2.0",
                id: request.id,
                result: res.result
              })).catch((err) => reject(err));
              return;
            }
          } catch (err) {
            return reject(err);
          }
          this._handleAsynchronousMethods(request).then((res) => res && resolve(Object.assign(Object.assign({}, res), { id: request.id }))).catch((err) => reject(err));
        });
      }
      _sendMultipleRequestsAsync(requests) {
        return Promise.all(requests.map((r) => this._sendRequestAsync(r)));
      }
      _handleSynchronousMethods(request) {
        const { method } = request;
        const params = request.params || [];
        switch (method) {
          case "eth_accounts":
            return this._eth_accounts();
          case "eth_coinbase":
            return this._eth_coinbase();
          case "eth_uninstallFilter":
            return this._eth_uninstallFilter(params);
          case "net_version":
            return this._net_version();
          case "eth_chainId":
            return this._eth_chainId();
          default:
            return void 0;
        }
      }
      async _handleAsynchronousMethods(request) {
        const { method } = request;
        const params = request.params || [];
        switch (method) {
          case "eth_requestAccounts":
            return this._eth_requestAccounts();
          case "eth_sign":
            return this._eth_sign(params);
          case "eth_ecRecover":
            return this._eth_ecRecover(params);
          case "personal_sign":
            return this._personal_sign(params);
          case "personal_ecRecover":
            return this._personal_ecRecover(params);
          case "eth_signTransaction":
            return this._eth_signTransaction(params);
          case "eth_sendRawTransaction":
            return this._eth_sendRawTransaction(params);
          case "eth_sendTransaction":
            return this._eth_sendTransaction(params);
          case "eth_signTypedData_v1":
            return this._eth_signTypedData_v1(params);
          case "eth_signTypedData_v2":
            return this._throwUnsupportedMethodError();
          case "eth_signTypedData_v3":
            return this._eth_signTypedData_v3(params);
          case "eth_signTypedData_v4":
          case "eth_signTypedData":
            return this._eth_signTypedData_v4(params);
          case "cbWallet_arbitrary":
            return this._cbwallet_arbitrary(params);
          case "wallet_addEthereumChain":
            return this._wallet_addEthereumChain(params);
          case "wallet_switchEthereumChain":
            return this._wallet_switchEthereumChain(params);
          case "wallet_watchAsset":
            return this._wallet_watchAsset(params);
        }
        const relay = await this.initializeRelay();
        return relay.makeEthereumJSONRPCRequest(request, this.jsonRpcUrl).catch((err) => {
          var _a;
          if (err.code === error_1.standardErrorCodes.rpc.methodNotFound || err.code === error_1.standardErrorCodes.rpc.methodNotSupported) {
            (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.METHOD_NOT_IMPLEMENTED, {
              method: request.method,
              sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : void 0
            });
          }
          throw err;
        });
      }
      _handleAsynchronousFilterMethods(request) {
        const { method } = request;
        const params = request.params || [];
        switch (method) {
          case "eth_newFilter":
            return this._eth_newFilter(params);
          case "eth_newBlockFilter":
            return this._eth_newBlockFilter();
          case "eth_newPendingTransactionFilter":
            return this._eth_newPendingTransactionFilter();
          case "eth_getFilterChanges":
            return this._eth_getFilterChanges(params);
          case "eth_getFilterLogs":
            return this._eth_getFilterLogs(params);
        }
        return void 0;
      }
      _handleSubscriptionMethods(request) {
        switch (request.method) {
          case "eth_subscribe":
          case "eth_unsubscribe":
            return this._subscriptionManager.handleRequest(request);
        }
        return void 0;
      }
      _isKnownAddress(addressString) {
        try {
          const addressStr = (0, util_1.ensureAddressString)(addressString);
          const lowercaseAddresses = this._addresses.map((address) => (0, util_1.ensureAddressString)(address));
          return lowercaseAddresses.includes(addressStr);
        } catch (_a) {
        }
        return false;
      }
      _ensureKnownAddress(addressString) {
        var _a;
        if (!this._isKnownAddress(addressString)) {
          (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.UNKNOWN_ADDRESS_ENCOUNTERED);
          throw new Error("Unknown Ethereum address");
        }
      }
      _prepareTransactionParams(tx) {
        const fromAddress = tx.from ? (0, util_1.ensureAddressString)(tx.from) : this.selectedAddress;
        if (!fromAddress) {
          throw new Error("Ethereum address is unavailable");
        }
        this._ensureKnownAddress(fromAddress);
        const toAddress = tx.to ? (0, util_1.ensureAddressString)(tx.to) : null;
        const weiValue = tx.value != null ? (0, util_1.ensureBN)(tx.value) : new bn_js_1.default(0);
        const data = tx.data ? (0, util_1.ensureBuffer)(tx.data) : Buffer.alloc(0);
        const nonce = tx.nonce != null ? (0, util_1.ensureIntNumber)(tx.nonce) : null;
        const gasPriceInWei = tx.gasPrice != null ? (0, util_1.ensureBN)(tx.gasPrice) : null;
        const maxFeePerGas = tx.maxFeePerGas != null ? (0, util_1.ensureBN)(tx.maxFeePerGas) : null;
        const maxPriorityFeePerGas = tx.maxPriorityFeePerGas != null ? (0, util_1.ensureBN)(tx.maxPriorityFeePerGas) : null;
        const gasLimit = tx.gas != null ? (0, util_1.ensureBN)(tx.gas) : null;
        const chainId = tx.chainId ? (0, util_1.ensureIntNumber)(tx.chainId) : this.getChainId();
        return {
          fromAddress,
          toAddress,
          weiValue,
          data,
          nonce,
          gasPriceInWei,
          maxFeePerGas,
          maxPriorityFeePerGas,
          gasLimit,
          chainId
        };
      }
      _isAuthorized() {
        return this._addresses.length > 0;
      }
      _requireAuthorization() {
        if (!this._isAuthorized()) {
          throw error_1.standardErrors.provider.unauthorized({});
        }
      }
      _throwUnsupportedMethodError() {
        throw error_1.standardErrors.provider.unsupportedMethod({});
      }
      async _signEthereumMessage(message, address, addPrefix, typedDataJson) {
        this._ensureKnownAddress(address);
        try {
          const relay = await this.initializeRelay();
          const res = await relay.signEthereumMessage(message, address, addPrefix, typedDataJson).promise;
          if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw new Error(res.errorMessage);
          }
          return { jsonrpc: "2.0", id: 0, result: res.result };
        } catch (err) {
          if (typeof err.message === "string" && err.message.match(/(denied|rejected)/i)) {
            throw error_1.standardErrors.provider.userRejectedRequest("User denied message signature");
          }
          throw err;
        }
      }
      async _ethereumAddressFromSignedMessage(message, signature, addPrefix) {
        const relay = await this.initializeRelay();
        const res = await relay.ethereumAddressFromSignedMessage(message, signature, addPrefix).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
          throw new Error(res.errorMessage);
        }
        return { jsonrpc: "2.0", id: 0, result: res.result };
      }
      _eth_accounts() {
        return [...this._addresses];
      }
      _eth_coinbase() {
        return this.selectedAddress || null;
      }
      _net_version() {
        return this.getChainId().toString(10);
      }
      _eth_chainId() {
        return (0, util_1.hexStringFromIntNumber)(this.getChainId());
      }
      getChainId() {
        const chainIdStr = this._storage.getItem(DEFAULT_CHAIN_ID_KEY);
        if (!chainIdStr) {
          return (0, util_1.ensureIntNumber)(this._chainIdFromOpts);
        }
        const chainId = parseInt(chainIdStr, 10);
        return (0, util_1.ensureIntNumber)(chainId);
      }
      async _eth_requestAccounts() {
        var _a;
        (_a = this.diagnostic) === null || _a === void 0 ? void 0 : _a.log(DiagnosticLogger_1.EVENTS.ETH_ACCOUNTS_STATE, {
          method: "provider::_eth_requestAccounts",
          addresses_length: this._addresses.length,
          sessionIdHash: this._relay ? Session_1.Session.hash(this._relay.session.id) : void 0
        });
        if (this._isAuthorized()) {
          return Promise.resolve({
            jsonrpc: "2.0",
            id: 0,
            result: this._addresses
          });
        }
        let res;
        try {
          const relay = await this.initializeRelay();
          res = await relay.requestEthereumAccounts().promise;
          if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw new Error(res.errorMessage);
          }
        } catch (err) {
          if (typeof err.message === "string" && err.message.match(/(denied|rejected)/i)) {
            throw error_1.standardErrors.provider.userRejectedRequest("User denied account authorization");
          }
          throw err;
        }
        if (!res.result) {
          throw new Error("accounts received is empty");
        }
        this._setAddresses(res.result);
        if (!this.isCoinbaseBrowser) {
          await this.switchEthereumChain(this.getChainId());
        }
        return { jsonrpc: "2.0", id: 0, result: this._addresses };
      }
      _eth_sign(params) {
        this._requireAuthorization();
        const address = (0, util_1.ensureAddressString)(params[0]);
        const message = (0, util_1.ensureBuffer)(params[1]);
        return this._signEthereumMessage(message, address, false);
      }
      _eth_ecRecover(params) {
        const message = (0, util_1.ensureBuffer)(params[0]);
        const signature = (0, util_1.ensureBuffer)(params[1]);
        return this._ethereumAddressFromSignedMessage(message, signature, false);
      }
      _personal_sign(params) {
        this._requireAuthorization();
        const message = (0, util_1.ensureBuffer)(params[0]);
        const address = (0, util_1.ensureAddressString)(params[1]);
        return this._signEthereumMessage(message, address, true);
      }
      _personal_ecRecover(params) {
        const message = (0, util_1.ensureBuffer)(params[0]);
        const signature = (0, util_1.ensureBuffer)(params[1]);
        return this._ethereumAddressFromSignedMessage(message, signature, true);
      }
      async _eth_signTransaction(params) {
        this._requireAuthorization();
        const tx = this._prepareTransactionParams(params[0] || {});
        try {
          const relay = await this.initializeRelay();
          const res = await relay.signEthereumTransaction(tx).promise;
          if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw new Error(res.errorMessage);
          }
          return { jsonrpc: "2.0", id: 0, result: res.result };
        } catch (err) {
          if (typeof err.message === "string" && err.message.match(/(denied|rejected)/i)) {
            throw error_1.standardErrors.provider.userRejectedRequest("User denied transaction signature");
          }
          throw err;
        }
      }
      async _eth_sendRawTransaction(params) {
        const signedTransaction = (0, util_1.ensureBuffer)(params[0]);
        const relay = await this.initializeRelay();
        const res = await relay.submitEthereumTransaction(signedTransaction, this.getChainId()).promise;
        if ((0, Web3Response_1.isErrorResponse)(res)) {
          throw new Error(res.errorMessage);
        }
        return { jsonrpc: "2.0", id: 0, result: res.result };
      }
      async _eth_sendTransaction(params) {
        this._requireAuthorization();
        const tx = this._prepareTransactionParams(params[0] || {});
        try {
          const relay = await this.initializeRelay();
          const res = await relay.signAndSubmitEthereumTransaction(tx).promise;
          if ((0, Web3Response_1.isErrorResponse)(res)) {
            throw new Error(res.errorMessage);
          }
          return { jsonrpc: "2.0", id: 0, result: res.result };
        } catch (err) {
          if (typeof err.message === "string" && err.message.match(/(denied|rejected)/i)) {
            throw error_1.standardErrors.provider.userRejectedRequest("User denied transaction signature");
          }
          throw err;
        }
      }
      async _eth_signTypedData_v1(params) {
        this._requireAuthorization();
        const typedData = (0, util_1.ensureParsedJSONObject)(params[0]);
        const address = (0, util_1.ensureAddressString)(params[1]);
        this._ensureKnownAddress(address);
        const message = eth_eip712_util_1.default.hashForSignTypedDataLegacy({ data: typedData });
        const typedDataJSON = JSON.stringify(typedData, null, 2);
        return this._signEthereumMessage(message, address, false, typedDataJSON);
      }
      async _eth_signTypedData_v3(params) {
        this._requireAuthorization();
        const address = (0, util_1.ensureAddressString)(params[0]);
        const typedData = (0, util_1.ensureParsedJSONObject)(params[1]);
        this._ensureKnownAddress(address);
        const message = eth_eip712_util_1.default.hashForSignTypedData_v3({ data: typedData });
        const typedDataJSON = JSON.stringify(typedData, null, 2);
        return this._signEthereumMessage(message, address, false, typedDataJSON);
      }
      async _eth_signTypedData_v4(params) {
        this._requireAuthorization();
        const address = (0, util_1.ensureAddressString)(params[0]);
        const typedData = (0, util_1.ensureParsedJSONObject)(params[1]);
        this._ensureKnownAddress(address);
        const message = eth_eip712_util_1.default.hashForSignTypedData_v4({ data: typedData });
        const typedDataJSON = JSON.stringify(typedData, null, 2);
        return this._signEthereumMessage(message, address, false, typedDataJSON);
      }
      /** @deprecated */
      async _cbwallet_arbitrary(params) {
        const action = params[0];
        const data = params[1];
        if (typeof data !== "string") {
          throw new Error("parameter must be a string");
        }
        if (typeof action !== "object" || action === null) {
          throw new Error("parameter must be an object");
        }
        const result = await this.genericRequest(action, data);
        return { jsonrpc: "2.0", id: 0, result };
      }
      async _wallet_addEthereumChain(params) {
        var _a, _b, _c, _d;
        const request = params[0];
        if (((_a = request.rpcUrls) === null || _a === void 0 ? void 0 : _a.length) === 0) {
          return {
            jsonrpc: "2.0",
            id: 0,
            error: { code: 2, message: `please pass in at least 1 rpcUrl` }
          };
        }
        if (!request.chainName || request.chainName.trim() === "") {
          throw error_1.standardErrors.rpc.invalidParams("chainName is a required field");
        }
        if (!request.nativeCurrency) {
          throw error_1.standardErrors.rpc.invalidParams("nativeCurrency is a required field");
        }
        const chainIdNumber = parseInt(request.chainId, 16);
        const success = await this.addEthereumChain(chainIdNumber, (_b = request.rpcUrls) !== null && _b !== void 0 ? _b : [], (_c = request.blockExplorerUrls) !== null && _c !== void 0 ? _c : [], request.chainName, (_d = request.iconUrls) !== null && _d !== void 0 ? _d : [], request.nativeCurrency);
        if (success) {
          return { jsonrpc: "2.0", id: 0, result: null };
        }
        return {
          jsonrpc: "2.0",
          id: 0,
          error: { code: 2, message: `unable to add ethereum chain` }
        };
      }
      async _wallet_switchEthereumChain(params) {
        const request = params[0];
        await this.switchEthereumChain(parseInt(request.chainId, 16));
        return { jsonrpc: "2.0", id: 0, result: null };
      }
      async _wallet_watchAsset(params) {
        const request = Array.isArray(params) ? params[0] : params;
        if (!request.type) {
          throw error_1.standardErrors.rpc.invalidParams("Type is required");
        }
        if ((request === null || request === void 0 ? void 0 : request.type) !== "ERC20") {
          throw error_1.standardErrors.rpc.invalidParams(`Asset of type '${request.type}' is not supported`);
        }
        if (!(request === null || request === void 0 ? void 0 : request.options)) {
          throw error_1.standardErrors.rpc.invalidParams("Options are required");
        }
        if (!(request === null || request === void 0 ? void 0 : request.options.address)) {
          throw error_1.standardErrors.rpc.invalidParams("Address is required");
        }
        const chainId = this.getChainId();
        const { address, symbol, image, decimals } = request.options;
        const res = await this.watchAsset(request.type, address, symbol, decimals, image, chainId);
        return { jsonrpc: "2.0", id: 0, result: res };
      }
      _eth_uninstallFilter(params) {
        const filterId = (0, util_1.ensureHexString)(params[0]);
        return this._filterPolyfill.uninstallFilter(filterId);
      }
      async _eth_newFilter(params) {
        const param = params[0];
        const filterId = await this._filterPolyfill.newFilter(param);
        return { jsonrpc: "2.0", id: 0, result: filterId };
      }
      async _eth_newBlockFilter() {
        const filterId = await this._filterPolyfill.newBlockFilter();
        return { jsonrpc: "2.0", id: 0, result: filterId };
      }
      async _eth_newPendingTransactionFilter() {
        const filterId = await this._filterPolyfill.newPendingTransactionFilter();
        return { jsonrpc: "2.0", id: 0, result: filterId };
      }
      _eth_getFilterChanges(params) {
        const filterId = (0, util_1.ensureHexString)(params[0]);
        return this._filterPolyfill.getFilterChanges(filterId);
      }
      _eth_getFilterLogs(params) {
        const filterId = (0, util_1.ensureHexString)(params[0]);
        return this._filterPolyfill.getFilterLogs(filterId);
      }
      initializeRelay() {
        if (this._relay) {
          return Promise.resolve(this._relay);
        }
        return this._relayProvider().then((relay) => {
          relay.setAccountsCallback((accounts, isDisconnect) => this._setAddresses(accounts, isDisconnect));
          relay.setChainCallback((chainId, jsonRpcUrl) => {
            this.updateProviderInfo(jsonRpcUrl, parseInt(chainId, 10));
          });
          relay.setDappDefaultChainCallback(this._chainIdFromOpts);
          this._relay = relay;
          return relay;
        });
      }
    };
    exports.CoinbaseWalletProvider = CoinbaseWalletProvider;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/RelayEventManager.js
var require_RelayEventManager = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/relay/RelayEventManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RelayEventManager = void 0;
    var util_1 = require_util();
    var RelayEventManager = class {
      constructor() {
        this._nextRequestId = 0;
        this.callbacks = /* @__PURE__ */ new Map();
      }
      makeRequestId() {
        this._nextRequestId = (this._nextRequestId + 1) % 2147483647;
        const id = this._nextRequestId;
        const idStr = (0, util_1.prepend0x)(id.toString(16));
        const callback = this.callbacks.get(idStr);
        if (callback) {
          this.callbacks.delete(idStr);
        }
        return id;
      }
    };
    exports.RelayEventManager = RelayEventManager;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/CoinbaseWalletSDK.js
var require_CoinbaseWalletSDK = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/CoinbaseWalletSDK.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CoinbaseWalletSDK = void 0;
    var wallet_logo_1 = require_wallet_logo();
    var constants_1 = require_constants();
    var util_1 = require_util();
    var ScopedLocalStorage_1 = require_ScopedLocalStorage();
    var CoinbaseWalletProvider_1 = require_CoinbaseWalletProvider();
    var MobileRelay_1 = require_MobileRelay();
    var MobileRelayUI_1 = require_MobileRelayUI();
    var RelayEventManager_1 = require_RelayEventManager();
    var WalletLinkRelayUI_1 = require_WalletLinkRelayUI();
    var WalletLinkRelay_1 = require_WalletLinkRelay();
    var version_1 = require_version();
    var CoinbaseWalletSDK = class _CoinbaseWalletSDK {
      /**
       * Constructor
       * @param options Coinbase Wallet SDK constructor options
       */
      constructor(options) {
        var _a, _b, _c;
        this._appName = "";
        this._appLogoUrl = null;
        this._relay = null;
        this._relayEventManager = null;
        const linkAPIUrl = options.linkAPIUrl || constants_1.LINK_API_URL;
        if (typeof options.overrideIsMetaMask === "undefined") {
          this._overrideIsMetaMask = false;
        } else {
          this._overrideIsMetaMask = options.overrideIsMetaMask;
        }
        this._overrideIsCoinbaseWallet = (_a = options.overrideIsCoinbaseWallet) !== null && _a !== void 0 ? _a : true;
        this._overrideIsCoinbaseBrowser = (_b = options.overrideIsCoinbaseBrowser) !== null && _b !== void 0 ? _b : false;
        this._diagnosticLogger = options.diagnosticLogger;
        this._reloadOnDisconnect = (_c = options.reloadOnDisconnect) !== null && _c !== void 0 ? _c : true;
        const url = new URL(linkAPIUrl);
        const origin = `${url.protocol}//${url.host}`;
        this._storage = new ScopedLocalStorage_1.ScopedLocalStorage(`-walletlink:${origin}`);
        this._storage.setItem("version", _CoinbaseWalletSDK.VERSION);
        if (this.walletExtension || this.coinbaseBrowser) {
          return;
        }
        this._relayEventManager = new RelayEventManager_1.RelayEventManager();
        const isMobile = (0, util_1.isMobileWeb)();
        const uiConstructor = options.uiConstructor || ((opts) => isMobile ? new MobileRelayUI_1.MobileRelayUI(opts) : new WalletLinkRelayUI_1.WalletLinkRelayUI(opts));
        const relayOption = {
          linkAPIUrl,
          version: version_1.LIB_VERSION,
          darkMode: !!options.darkMode,
          headlessMode: !!options.headlessMode,
          uiConstructor,
          storage: this._storage,
          relayEventManager: this._relayEventManager,
          diagnosticLogger: this._diagnosticLogger,
          reloadOnDisconnect: this._reloadOnDisconnect,
          enableMobileWalletLink: options.enableMobileWalletLink
        };
        this._relay = isMobile ? new MobileRelay_1.MobileRelay(relayOption) : new WalletLinkRelay_1.WalletLinkRelay(relayOption);
        this.setAppInfo(options.appName, options.appLogoUrl);
        if (options.headlessMode)
          return;
        this._relay.attachUI();
      }
      /**
       * Create a Web3 Provider object
       * @param jsonRpcUrl Ethereum JSON RPC URL (Default: "")
       * @param chainId Ethereum Chain ID (Default: 1)
       * @returns A Web3 Provider
       */
      makeWeb3Provider(jsonRpcUrl = "", chainId = 1) {
        const extension = this.walletExtension;
        if (extension) {
          if (!this.isCipherProvider(extension)) {
            extension.setProviderInfo(jsonRpcUrl, chainId);
          }
          if (this._reloadOnDisconnect === false && typeof extension.disableReloadOnDisconnect === "function")
            extension.disableReloadOnDisconnect();
          return extension;
        }
        const dappBrowser = this.coinbaseBrowser;
        if (dappBrowser) {
          return dappBrowser;
        }
        const relay = this._relay;
        if (!relay || !this._relayEventManager || !this._storage) {
          throw new Error("Relay not initialized, should never happen");
        }
        if (!jsonRpcUrl)
          relay.setConnectDisabled(true);
        return new CoinbaseWalletProvider_1.CoinbaseWalletProvider({
          relayProvider: () => Promise.resolve(relay),
          relayEventManager: this._relayEventManager,
          storage: this._storage,
          jsonRpcUrl,
          chainId,
          qrUrl: this.getQrUrl(),
          diagnosticLogger: this._diagnosticLogger,
          overrideIsMetaMask: this._overrideIsMetaMask,
          overrideIsCoinbaseWallet: this._overrideIsCoinbaseWallet,
          overrideIsCoinbaseBrowser: this._overrideIsCoinbaseBrowser
        });
      }
      /**
       * Set application information
       * @param appName Application name
       * @param appLogoUrl Application logo image URL
       */
      setAppInfo(appName, appLogoUrl) {
        var _a;
        this._appName = appName || "DApp";
        this._appLogoUrl = appLogoUrl || (0, util_1.getFavicon)();
        const extension = this.walletExtension;
        if (extension) {
          if (!this.isCipherProvider(extension)) {
            extension.setAppInfo(this._appName, this._appLogoUrl);
          }
        } else {
          (_a = this._relay) === null || _a === void 0 ? void 0 : _a.setAppInfo(this._appName, this._appLogoUrl);
        }
      }
      /**
       * Disconnect. After disconnecting, this will reload the web page to ensure
       * all potential stale state is cleared.
       */
      disconnect() {
        var _a;
        const extension = this === null || this === void 0 ? void 0 : this.walletExtension;
        if (extension) {
          void extension.close();
        } else {
          (_a = this._relay) === null || _a === void 0 ? void 0 : _a.resetAndReload();
        }
      }
      /**
       * Return QR URL for mobile wallet connection, will return null if extension is installed
       */
      getQrUrl() {
        var _a, _b;
        return (_b = (_a = this._relay) === null || _a === void 0 ? void 0 : _a.getQRCodeUrl()) !== null && _b !== void 0 ? _b : null;
      }
      /**
       * Official Coinbase Wallet logo for developers to use on their frontend
       * @param type Type of wallet logo: "standard" | "circle" | "text" | "textWithLogo" | "textLight" | "textWithLogoLight"
       * @param width Width of the logo (Optional)
       * @returns SVG Data URI
       */
      getCoinbaseWalletLogo(type2, width = 240) {
        return (0, wallet_logo_1.walletLogo)(type2, width);
      }
      get walletExtension() {
        var _a;
        return (_a = window.coinbaseWalletExtension) !== null && _a !== void 0 ? _a : window.walletLinkExtension;
      }
      get coinbaseBrowser() {
        var _a, _b;
        try {
          const ethereum = (_a = window.ethereum) !== null && _a !== void 0 ? _a : (_b = window.top) === null || _b === void 0 ? void 0 : _b.ethereum;
          if (!ethereum) {
            return void 0;
          }
          if ("isCoinbaseBrowser" in ethereum && ethereum.isCoinbaseBrowser) {
            return ethereum;
          }
          return void 0;
        } catch (e) {
          return void 0;
        }
      }
      isCipherProvider(provider) {
        return typeof provider.isCipher === "boolean" && provider.isCipher;
      }
    };
    exports.CoinbaseWalletSDK = CoinbaseWalletSDK;
    CoinbaseWalletSDK.VERSION = version_1.LIB_VERSION;
  }
});

// node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/index.js
var require_dist5 = __commonJS({
  "node_modules/.pnpm/@coinbase+wallet-sdk@3.9.3/node_modules/@coinbase/wallet-sdk/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CoinbaseWalletProvider = exports.CoinbaseWalletSDK = void 0;
    var CoinbaseWalletSDK_1 = require_CoinbaseWalletSDK();
    var CoinbaseWalletProvider_1 = require_CoinbaseWalletProvider();
    var CoinbaseWalletSDK_2 = require_CoinbaseWalletSDK();
    Object.defineProperty(exports, "CoinbaseWalletSDK", { enumerable: true, get: function() {
      return CoinbaseWalletSDK_2.CoinbaseWalletSDK;
    } });
    var CoinbaseWalletProvider_2 = require_CoinbaseWalletProvider();
    Object.defineProperty(exports, "CoinbaseWalletProvider", { enumerable: true, get: function() {
      return CoinbaseWalletProvider_2.CoinbaseWalletProvider;
    } });
    exports.default = CoinbaseWalletSDK_1.CoinbaseWalletSDK;
    if (typeof window !== "undefined") {
      window.CoinbaseWalletSDK = CoinbaseWalletSDK_1.CoinbaseWalletSDK;
      window.CoinbaseWalletProvider = CoinbaseWalletProvider_1.CoinbaseWalletProvider;
      window.WalletLink = CoinbaseWalletSDK_1.CoinbaseWalletSDK;
      window.WalletLinkProvider = CoinbaseWalletProvider_1.CoinbaseWalletProvider;
    }
  }
});
export default require_dist5();
//# sourceMappingURL=dist-44GGJGJ6.js.map
