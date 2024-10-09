// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

/**
 * Package bytes provides functions for dealing with byte arrays.
 */

/**
 * Concatenates byte arrays.
 */
export function concat(...arrays: Uint8Array[]): Uint8Array;
export function concat(): Uint8Array {
    // Calculate sum of lengths of all arrays.
    let totalLength = 0;
    for (let i = 0; i < arguments.length; i++) {
        totalLength += arguments[i].length;
    }

    // Allocate new array of calculated length.
    const result = new Uint8Array(totalLength);

    // Copy all arrays into result.
    let offset = 0;
    for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[i];
        result.set(arg, offset);
        offset += arg.length;
    }

    return result;
}
