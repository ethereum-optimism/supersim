// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

export interface RandomSource {

    /**
     * Returns the availability of random source.
     * A source can only be used if isAvailable returns true.
     */
    isAvailable: boolean;

    /**
     * Returns a byte array of the given length filled with random bytes.
     */
    randomBytes(length: number): Uint8Array;
}
