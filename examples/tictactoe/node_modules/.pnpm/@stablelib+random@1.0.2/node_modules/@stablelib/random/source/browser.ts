// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { RandomSource } from "./";

const QUOTA = 65536;

export class BrowserRandomSource implements RandomSource {
    isAvailable = false;
    isInstantiated = false;

    private _crypto?: { getRandomValues: typeof window.crypto.getRandomValues };

    constructor() {
        const browserCrypto = typeof self !== 'undefined'
            ? (self.crypto || (self as { msCrypto?: any }).msCrypto) // IE11 has msCrypto
            : null;

        if (browserCrypto && browserCrypto.getRandomValues !== undefined) {
            this._crypto = browserCrypto;
            this.isAvailable = true;
            this.isInstantiated = true;
        }
    }

    randomBytes(length: number): Uint8Array {
        if (!this.isAvailable || !this._crypto) {
            throw new Error("Browser random byte generator is not available.");
        }
        const out = new Uint8Array(length);
        for (let i = 0; i < out.length; i += QUOTA) {
            this._crypto.getRandomValues(out.subarray(i, i + Math.min(out.length - i, QUOTA)));
        }
        return out;
    }
}
