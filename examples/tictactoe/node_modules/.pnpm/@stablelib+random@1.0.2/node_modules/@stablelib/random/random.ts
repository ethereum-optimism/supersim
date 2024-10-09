// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

/**
 * Package random provides functions to access system's
 * cryptographically secure random byte generator.
 */

import { RandomSource } from "./source";
import { SystemRandomSource } from "./source/system";
import { readUint32LE } from "@stablelib/binary";
import { wipe } from "@stablelib/wipe";

export { RandomSource } from "./source";

export const defaultRandomSource = new SystemRandomSource();

export function randomBytes(length: number, prng: RandomSource = defaultRandomSource): Uint8Array {
    return prng.randomBytes(length);
}

/**
 * Returns a uniformly random unsigned 32-bit integer.
 */
export function randomUint32(prng: RandomSource = defaultRandomSource): number {
    // Generate 4-byte random buffer.
    const buf = randomBytes(4, prng);

    // Convert bytes from buffer into a 32-bit integer.
    // It's not important which byte order to use, since
    // the result is random.
    const result = readUint32LE(buf);

    // Clean the buffer.
    wipe(buf);

    return result;
}

/** 62 alphanumeric characters for default charset of randomString() */
const ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * Returns a uniform random string of the given length
 * with characters from the given charset.
 *
 * Charset must not have more than 256 characters.
 *
 * Default charset generates case-sensitive alphanumeric
 * strings (0-9, A-Z, a-z).
 */
export function randomString(
    length: number,
    charset = ALPHANUMERIC,
    prng: RandomSource = defaultRandomSource
): string {
    if (charset.length < 2) {
        throw new Error("randomString charset is too short");
    }
    if (charset.length > 256) {
        throw new Error("randomString charset is too long");
    }
    let out = '';
    const charsLen = charset.length;
    const maxByte = 256 - (256 % charsLen);
    while (length > 0) {
        const buf = randomBytes(Math.ceil(length * 256 / maxByte), prng);
        for (let i = 0; i < buf.length && length > 0; i++) {
            const randomByte = buf[i];
            if (randomByte < maxByte) {
                out += charset.charAt(randomByte % charsLen);
                length--;
            }
        }
        wipe(buf);
    }
    return out;
}

/**
 * Returns uniform random string containing at least the given
 * number of bits of entropy.
 *
 * For example, randomStringForEntropy(128) will return a 22-character
 * alphanumeric string, while randomStringForEntropy(128, "0123456789")
 * will return a 39-character numeric string, both will contain at
 * least 128 bits of entropy.
 *
 * Default charset generates case-sensitive alphanumeric
 * strings (0-9, A-Z, a-z).
 */
export function randomStringForEntropy(
    bits: number,
    charset = ALPHANUMERIC,
    prng: RandomSource = defaultRandomSource
): string {
    const length = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
    return randomString(length, charset, prng);
}
