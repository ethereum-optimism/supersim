"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = sign;
const secp256k1_1 = require("@noble/curves/secp256k1");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const serializeSignature_js_1 = require("../../utils/signature/serializeSignature.js");
async function sign({ hash, privateKey, to = 'object', }) {
    const { r, s, recovery } = secp256k1_1.secp256k1.sign(hash.slice(2), privateKey.slice(2));
    const signature = {
        r: (0, toHex_js_1.numberToHex)(r, { size: 32 }),
        s: (0, toHex_js_1.numberToHex)(s, { size: 32 }),
        v: recovery ? 28n : 27n,
        yParity: recovery,
    };
    return (() => {
        if (to === 'bytes' || to === 'hex')
            return (0, serializeSignature_js_1.serializeSignature)({ ...signature, to });
        return signature;
    })();
}
//# sourceMappingURL=sign.js.map