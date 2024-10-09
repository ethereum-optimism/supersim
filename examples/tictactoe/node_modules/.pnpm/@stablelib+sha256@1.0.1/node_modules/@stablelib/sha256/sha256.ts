// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

/**
 * Package sha256 implements SHA-2-256 cryptographic hash function.
 */

import { SerializableHash } from "@stablelib/hash";
import { readUint32BE, writeUint32BE } from "@stablelib/binary";
import { wipe } from "@stablelib/wipe";

export const DIGEST_LENGTH = 32;
export const BLOCK_SIZE = 64;

/**
 * SHA2-256 cryptographic hash algorithm.
 */
export class SHA256 implements SerializableHash {
    /** Length of hash output */
    readonly digestLength: number = DIGEST_LENGTH;

    /** Block size */
    readonly blockSize: number = BLOCK_SIZE;

    // Note: Int32Array is used instead of Uint32Array for performance reasons.
    protected _state = new Int32Array(8); // hash state
    private _temp = new Int32Array(64); // temporary state
    private _buffer = new Uint8Array(128); // buffer for data to hash
    private _bufferLength = 0; // number of bytes in buffer
    private _bytesHashed = 0; // number of total bytes hashed
    private _finished = false; // indicates whether the hash was finalized

    constructor() {
        this.reset();
    }

    protected _initState() {
        this._state[0] = 0x6a09e667;
        this._state[1] = 0xbb67ae85;
        this._state[2] = 0x3c6ef372;
        this._state[3] = 0xa54ff53a;
        this._state[4] = 0x510e527f;
        this._state[5] = 0x9b05688c;
        this._state[6] = 0x1f83d9ab;
        this._state[7] = 0x5be0cd19;
    }

    /**
     * Resets hash state making it possible
     * to re-use this instance to hash other data.
     */
    reset(): this {
        this._initState();
        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        return this;
    }

    /**
     * Cleans internal buffers and resets hash state.
     */
    clean() {
        wipe(this._buffer);
        wipe(this._temp);
        this.reset();
    }

    /**
     * Updates hash state with the given data.
     *
     * Throws error when trying to update already finalized hash:
     * instance must be reset to update it again.
     */
    update(data: Uint8Array, dataLength: number = data.length): this {
        if (this._finished) {
            throw new Error("SHA256: can't update because hash was finished.");
        }
        let dataPos = 0;
        this._bytesHashed += dataLength;
        if (this._bufferLength > 0) {
            while (this._bufferLength < this.blockSize && dataLength > 0) {
                this._buffer[this._bufferLength++] = data[dataPos++];
                dataLength--;
            }
            if (this._bufferLength === this.blockSize) {
                hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize);
                this._bufferLength = 0;
            }
        }
        if (dataLength >= this.blockSize) {
            dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength);
            dataLength %= this.blockSize;
        }
        while (dataLength > 0) {
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
        }
        return this;
    }

    /**
     * Finalizes hash state and puts hash into out.
     * If hash was already finalized, puts the same value.
     */
    finish(out: Uint8Array): this {
        if (!this._finished) {
            const bytesHashed = this._bytesHashed;
            const left = this._bufferLength;
            const bitLenHi = (bytesHashed / 0x20000000) | 0;
            const bitLenLo = bytesHashed << 3;
            const padLength = (bytesHashed % 64 < 56) ? 64 : 128;

            this._buffer[left] = 0x80;
            for (let i = left + 1; i < padLength - 8; i++) {
                this._buffer[i] = 0;
            }
            writeUint32BE(bitLenHi, this._buffer, padLength - 8);
            writeUint32BE(bitLenLo, this._buffer, padLength - 4);

            hashBlocks(this._temp, this._state, this._buffer, 0, padLength);

            this._finished = true;
        }

        for (let i = 0; i < this.digestLength / 4; i++) {
            writeUint32BE(this._state[i], out, i * 4);
        }

        return this;
    }

    /**
     * Returns the final hash digest.
     */
    digest(): Uint8Array {
        const out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
    }

    /**
     * Function useful for HMAC/PBKDF2 optimization.
     * Returns hash state to be used with restoreState().
     * Only chain value is saved, not buffers or other
     * state variables.
     */
    saveState(): SavedState {
        if (this._finished) {
            throw new Error("SHA256: cannot save finished state");
        }
        return {
            state: new Int32Array(this._state),
            buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : undefined,
            bufferLength: this._bufferLength,
            bytesHashed: this._bytesHashed
        };
    }

    /**
     * Function useful for HMAC/PBKDF2 optimization.
     * Restores state saved by saveState() and sets bytesHashed
     * to the given value.
     */
    restoreState(savedState: SavedState): this {
        this._state.set(savedState.state);
        this._bufferLength = savedState.bufferLength;
        if (savedState.buffer) {
            this._buffer.set(savedState.buffer);
        }
        this._bytesHashed = savedState.bytesHashed;
        this._finished = false;
        return this;
    }

    /**
     * Cleans state returned by saveState().
     */
    cleanSavedState(savedState: SavedState) {
        wipe(savedState.state);
        if (savedState.buffer) {
            wipe(savedState.buffer);
        }
        savedState.bufferLength = 0;
        savedState.bytesHashed = 0;
    }
}

export type SavedState = {
    state: Int32Array;
    buffer: Uint8Array | undefined;
    bufferLength: number;
    bytesHashed: number;
};

// Constants
const K = new Int32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
    0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
    0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
    0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
    0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
    0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
    0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
    0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
    0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);

function hashBlocks(w: Int32Array, v: Int32Array, p: Uint8Array, pos: number, len: number): number {
    while (len >= 64) {
        let a = v[0];
        let b = v[1];
        let c = v[2];
        let d = v[3];
        let e = v[4];
        let f = v[5];
        let g = v[6];
        let h = v[7];

        for (let i = 0; i < 16; i++) {
            let j = pos + i * 4;
            w[i] = readUint32BE(p, j);
        }

        for (let i = 16; i < 64; i++) {
            let u = w[i - 2];
            let t1 = (u >>> 17 | u << (32 - 17)) ^ (u >>> 19 | u << (32 - 19)) ^ (u >>> 10);

            u = w[i - 15];
            let t2 = (u >>> 7 | u << (32 - 7)) ^ (u >>> 18 | u << (32 - 18)) ^ (u >>> 3);

            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
        }

        for (let i = 0; i < 64; i++) {
            let t1 = (((((e >>> 6 | e << (32 - 6)) ^ (e >>> 11 | e << (32 - 11)) ^
                (e >>> 25 | e << (32 - 25))) + ((e & f) ^ (~e & g))) | 0) +
                ((h + ((K[i] + w[i]) | 0)) | 0)) | 0;

            let t2 = (((a >>> 2 | a << (32 - 2)) ^ (a >>> 13 | a << (32 - 13)) ^
                (a >>> 22 | a << (32 - 22))) + ((a & b) ^ (a & c) ^ (b & c))) | 0;

            h = g;
            g = f;
            f = e;
            e = (d + t1) | 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) | 0;
        }

        v[0] += a;
        v[1] += b;
        v[2] += c;
        v[3] += d;
        v[4] += e;
        v[5] += f;
        v[6] += g;
        v[7] += h;

        pos += 64;
        len -= 64;
    }
    return pos;
}

export function hash(data: Uint8Array): Uint8Array {
    const h = new SHA256();
    h.update(data);
    const digest = h.digest();
    h.clean();
    return digest;
}
