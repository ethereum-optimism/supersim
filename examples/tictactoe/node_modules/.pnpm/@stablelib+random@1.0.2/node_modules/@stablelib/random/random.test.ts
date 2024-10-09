// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import {
    randomBytes, randomUint32, randomString, randomStringForEntropy
} from "./random";

describe("randomBytes", () => {
    it("should generate random bytes", () => {
        const len = 64;
        const zeros = new Uint8Array(len);
        const a = randomBytes(len);
        const b = randomBytes(len);
        expect(a).not.toEqual(b);
        expect(a.length).toBe(len);
        expect(b.length).toBe(len);
        expect(a).not.toEqual(zeros);
        expect(b).not.toEqual(zeros);
    });
});

describe("randomUint32", () => {
    it("should generate random uint32", () => {
        // This test has some probabily of failure.
        expect(randomUint32()).not.toBe(randomUint32());
    });
});

describe("randomString", () => {
    it("should not produce biased strings", () => {
        const charset = "abcdefghijklmnopqrstuvwxyz";
        let s = '';
        const counts: { [char: string]: number } = {};
        for (let i = 0; i < 1000; i++) {
            s += randomString(1000, charset);
        }
        for (let i = 0; i < s.length; i++) {
            const c = s.charAt(i);
            counts[c] = (counts[c] || 0) + 1;
        }
        const avg = s.length / charset.length;
        const biases: string[] = [];
        Object.keys(counts).forEach(k => {
            const diff = counts[k] / avg;
            if (diff < 0.95 || diff > 1.05) {
                biases.push('Biased "' + k + '": average is ' + avg +
                    ", got " + counts[k]);
            }
        });
        expect(biases).toEqual([]);
    });

    it("should throw if given charset length < 2 ", () => {
        expect(() => randomString(10, "A")).toThrowError(/^randomString/);
    });
});

describe("randomStringForEntropy", () => {
    it("should return strings of correct length", () => {
        expect(randomStringForEntropy(128).length).toBe(22);
        expect(randomStringForEntropy(128, "0123456789").length).toBe(39);
    });
    it("should return unique strings", () => {
        expect(randomStringForEntropy(80)).not.toEqual(randomStringForEntropy(80));
    });
});
