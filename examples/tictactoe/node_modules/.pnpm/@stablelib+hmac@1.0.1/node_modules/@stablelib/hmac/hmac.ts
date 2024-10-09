// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

/**
 * Package hmac implements HMAC algorithm.
 */

import { Hash, SerializableHash, isSerializableHash } from "@stablelib/hash";
import { equal as constantTimeEqual } from "@stablelib/constant-time";
import { wipe } from "@stablelib/wipe";

/**
 *  HMAC implements hash-based message authentication algorithm.
 */
export class HMAC implements SerializableHash {
    readonly blockSize: number;
    readonly digestLength: number;

    private _inner: Hash; // inner hash
    private _outer: Hash; // outer hash

    private _finished = false; // true if HMAC was finalized

    // Copies of hash states after keying.
    // Need for quick reset without hashing the key again.
    private _innerKeyedState: any | undefined;
    private _outerKeyedState: any | undefined;

    /**
     * Constructs a new HMAC with the given Hash and secret key.
     */
    constructor(hash: new () => Hash | SerializableHash, key: Uint8Array) {
        // Initialize inner and outer hashes.
        this._inner = new hash();
        this._outer = new hash();

        // Set block and digest sizes for this HMAC
        // instance to values from the hash.
        this.blockSize = this._outer.blockSize;
        this.digestLength = this._outer.digestLength;

        // Pad temporary stores a key (or its hash) padded with zeroes.
        const pad = new Uint8Array(this.blockSize);

        if (key.length > this.blockSize) {
            // If key is bigger than hash block size, it must be
            // hashed and this hash is used as a key instead.
            this._inner.update(key).finish(pad).clean();
        } else {
            // Otherwise, copy the key into pad.
            pad.set(key);
        }

        // Now two different keys are derived from padded key
        // by xoring a different byte value to each.

        // To make inner hash key, xor byte 0x36 into pad.
        for (let i = 0; i < pad.length; i++) {
            pad[i] ^= 0x36;
        }
        // Update inner hash with the result.
        this._inner.update(pad);

        // To make outer hash key, xor byte 0x5c into pad.
        // But since we already xored 0x36 there, we must
        // first undo this by xoring it again.
        for (let i = 0; i < pad.length; i++) {
            pad[i] ^= 0x36 ^ 0x5c;
        }
        // Update outer hash with the result.
        this._outer.update(pad);

        // Save states of both hashes, so that we can quickly restore
        // them later in reset() without the need to remember the actual
        // key and perform this initialization again.
        if (isSerializableHash(this._inner) && isSerializableHash(this._outer)) {
            this._innerKeyedState = this._inner.saveState();
            this._outerKeyedState = this._outer.saveState();
        }

        // Clean pad.
        wipe(pad);
    }

    /**
     * Returns HMAC state to the state initialized with key
     * to make it possible to run HMAC over the other data with the same
     * key without creating a new instance.
     */
    reset(): this {
        if (!isSerializableHash(this._inner) || !isSerializableHash(this._outer)) {
            throw new Error("hmac: can't reset() because hash doesn't implement restoreState()");
        }
        // Restore keyed states of inner and outer hashes.
        this._inner.restoreState(this._innerKeyedState);
        this._outer.restoreState(this._outerKeyedState);
        this._finished = false;
        return this;
    }

    /**
     * Cleans HMAC state.
     */
    clean() {
        if (isSerializableHash(this._inner)) {
            this._inner.cleanSavedState(this._innerKeyedState);
        }
        if (isSerializableHash(this._outer)) {
            this._outer.cleanSavedState(this._outerKeyedState);
        }
        this._inner.clean();
        this._outer.clean();
    }

    /**
     * Updates state with provided data.
     */
    update(data: Uint8Array): this {
        this._inner.update(data);
        return this;
    }

    /**
     * Finalizes HMAC and puts the result in out.
     */
    finish(out: Uint8Array): this {
        if (this._finished) {
            // If HMAC was finalized, outer hash is also finalized,
            // so it produces the same digest it produced when it
            // was finalized.
            this._outer.finish(out);
            return this;
        }

        // Finalize inner hash and store the result temporarily.
        this._inner.finish(out);

        // Update outer hash with digest of inner hash and and finalize it.
        this._outer.update(out.subarray(0, this.digestLength)).finish(out);
        this._finished = true;

        return this;
    }

    /**
     * Returns the computed message authentication code.
     */
    digest(): Uint8Array {
        const out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
    }

    /**
     * Saves HMAC state.
     * This function is needed for PBKDF2 optimization.
     */
    saveState(): any {
        if (!isSerializableHash(this._inner)) {
            throw new Error("hmac: can't saveState() because hash doesn't implement it");
        }
        return this._inner.saveState();
    }

    restoreState(savedState: any): this {
        if (!isSerializableHash(this._inner) || !isSerializableHash(this._outer)) {
            throw new Error("hmac: can't restoreState() because hash doesn't implement it");
        }
        this._inner.restoreState(savedState);
        this._outer.restoreState(this._outerKeyedState);
        this._finished = false;
        return this;
    }

    cleanSavedState(savedState: any) {
        if (!isSerializableHash(this._inner)) {
            throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");
        }
        this._inner.cleanSavedState(savedState);
    }
}

/**
 * Returns HMAC using the given hash constructor for the key over data.
 */
export function hmac(hash: new () => Hash, key: Uint8Array, data: Uint8Array): Uint8Array {
    const h = new HMAC(hash, key);
    h.update(data);
    const digest = h.digest();
    h.clean();
    return digest;
}

/**
 * Returns true if two HMAC digests are equal.
 * Uses constant-time comparison to avoid leaking timing information.
 *
 * Example:
 *
 *    const receivedDigest = ...
 *    const realDigest = hmac(SHA256, key, data);
 *    if (!equal(receivedDigest, realDigest)) {
 *        throw new Error("Authentication error");
 *    }
 */
export const equal = constantTimeEqual;
