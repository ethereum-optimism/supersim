// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

/**
 * Package hkdf implements HKDF key derivation function.
 */

import { Hash } from "@stablelib/hash";
import { HMAC, hmac } from "@stablelib/hmac";
import { wipe } from "@stablelib/wipe";

/**
 * HMAC-based Extract-and-Expand Key Derivation Function.
 *
 * Implements HKDF from RFC5869.
 *
 * Expands the given master key with salt and info into
 * a limited stream of key material.
 */
export class HKDF {
    private _hmac: HMAC;
    private _buffer: Uint8Array;
    private _bufpos: number;
    private _counter = new Uint8Array(1); // starts with zero
    private _hash: new () => Hash;
    private _info?: Uint8Array;

    /**
     * Create a new HKDF instance for the given hash function
     * with the master key, optional salt, and info.
     *
     * - Master key is a high-entropy secret key (not a password).
     * - Salt is a non-secret random value.
     * - Info is application- and/or context-specific information.
     */
    constructor(hash: new () => Hash,
        key: Uint8Array,
        salt = new Uint8Array(0),
        info?: Uint8Array) {

        this._hash = hash;
        this._info = info;

        // HKDF-Extract uses salt as HMAC key, and key as data.
        const okm = hmac(this._hash, salt, key);

        // Initialize HMAC for expanding with extracted key.
        this._hmac = new HMAC(hash, okm);

        // Allocate buffer.
        this._buffer = new Uint8Array(this._hmac.digestLength);
        this._bufpos = this._buffer.length;
    }

    // Fill buffer with new block of HKDF-Extract output.
    private _fillBuffer(): void {
        // Increment counter.
        this._counter[0]++;

        const ctr = this._counter[0];

        // Check if counter overflowed.
        if (ctr === 0) {
            throw new Error("hkdf: cannot expand more");
        }

        // Prepare HMAC instance for new data with old key.
        this._hmac.reset();

        // Hash in previous output if it was generated
        // (i.e. counter is greater than 1).
        if (ctr > 1) {
            this._hmac.update(this._buffer);
        }

        // Hash in info if it exists.
        if (this._info) {
            this._hmac.update(this._info);
        }

        // Hash in the counter.
        this._hmac.update(this._counter);

        // Output result to buffer and clean HMAC instance.
        this._hmac.finish(this._buffer);

        // Reset buffer position.
        this._bufpos = 0;
    }

    /**
     * Expand returns next key material of the given length.
     *
     * It throws if expansion limit is reached (which is
     * 254 digests of the underlying HMAC function).
     */
    expand(length: number): Uint8Array {
        const out = new Uint8Array(length);
        for (let i = 0; i < out.length; i++) {
            if (this._bufpos === this._buffer.length) {
                this._fillBuffer();
            }
            out[i] = this._buffer[this._bufpos++];
        }
        return out;
    }

    clean(): void {
        this._hmac.clean();
        wipe(this._buffer);
        wipe(this._counter);
        this._bufpos = 0;
    }
}

// TODO(dchest): maybe implement deriveKey?
