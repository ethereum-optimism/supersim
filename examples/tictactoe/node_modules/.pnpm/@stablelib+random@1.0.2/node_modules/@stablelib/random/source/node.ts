// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { RandomSource } from "./";
import { wipe } from "@stablelib/wipe";

declare function require(name: string): any;

export class NodeRandomSource implements RandomSource {
    isAvailable = false;
    isInstantiated = false;

    private _crypto: { randomBytes(n: number): Uint8Array } | undefined;

    constructor() {
        if (typeof require !== "undefined") {
            const nodeCrypto = require("crypto");
            if (nodeCrypto && nodeCrypto.randomBytes) {
                this._crypto = nodeCrypto;
                this.isAvailable = true;
                this.isInstantiated = true;
            }
        }
    }

    randomBytes(length: number): Uint8Array {
        if (!this.isAvailable || !this._crypto) {
            throw new Error("Node.js random byte generator is not available.");
        }

        // Get random bytes (result is Buffer).
        let buffer = this._crypto.randomBytes(length);

        // Make sure we got the length that we requested.
        if (buffer.length !== length) {
            throw new Error("NodeRandomSource: got fewer bytes than requested");
        }

        // Allocate output array.
        const out = new Uint8Array(length);

        // Copy bytes from buffer to output.
        for (let i = 0; i < out.length; i++) {
            out[i] = buffer[i];
        }

        // Cleanup.
        wipe(buffer);

        return out;
    }
}
