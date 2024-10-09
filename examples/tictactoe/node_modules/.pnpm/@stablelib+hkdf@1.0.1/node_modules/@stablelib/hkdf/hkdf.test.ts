// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { HKDF } from "./hkdf";
import { SHA256, DIGEST_LENGTH } from "@stablelib/sha256";
import { encode, decode } from "@stablelib/hex";

const testVectors = [
    // From RFC5869, SHA256-only.
    {
        hash: SHA256,
        key: "0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B",
        salt: "000102030405060708090A0B0C",
        info: "F0F1F2F3F4F5F6F7F8F9",
        result: "3CB25F25FAACD57A90434F64D0362F2A2D2D0A90CF1A5A4C5DB02D56ECC4C5BF34007208D5B887185865"
    },
    {
        hash: SHA256,
        key: "000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F2021222324252627" +
        "28292A2B2C2D2E2F303132333435363738393A3B3C3D3E3F404142434445464748494A4B4C4D4E4F",
        salt:
        "606162636465666768696A6B6C6D6E6F707172737475767778797A7B7C7D7E7F808182838" +
        "485868788898A8B8C8D8E8F909192939495969798999A9B9C9D9E9FA0A1A2A3A4A5A6A" +
        "7A8A9AAABACADAEAF",
        info: "B0B1B2B3B4B5B6B7B8B9BABBBCBDBEBFC0C1C2C3C4C5C6C7C8C9CACBCCCDCECFD0" +
        "D1D2D3D4D5D6D7D8D9DADBDCDDDEDFE0E1E2E3E4E5E6E7E8E9EAEBECEDEEEFF0F1F2F3F4" +
        "F5F6F7F8F9FAFBFCFDFEFF",
        result: "B11E398DC80327A1C8E7F78C596A49344F012EDA2D4EFAD8A050CC4C19AFA97C59045A99" +
        "CAC7827271CB41C65E590E09DA3275600C2F09B8367793A9ACA3DB71CC30C58179EC3E87C14" +
        "C01D5C1F3434F1D87"
    },
    {
        hash: SHA256,
        key: "0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B",
        salt: "",
        info: "",
        result: "8DA4E775A563C18F715F802A063C5A31B8A11F5C5EE1879EC3454E5F3C738D2D9D201395FAA4B61A96C8"
    }
];

describe("HKDF", () => {
    it("should derive correct keys", () => {
        testVectors.forEach(v => {
           const h = new HKDF(v.hash, decode(v.key), decode(v.salt), decode(v.info));
           const result = h.expand(v.result.length / 2);
           expect(encode(result)).toBe(v.result);
        });
    });

    it("should throw if generated more than 255 blocks", () => {
        const h = new HKDF(SHA256, new Uint8Array([0, 1, 2, 3, 4]));
        for (let i = 0; i < 255; i++) {
            h.expand(DIGEST_LENGTH);
        }
        expect(() => h.expand(1)).toThrowError("hkdf: cannot expand more");
    });

    it("should expand in parts like in full", () => {
        const key = new Uint8Array([0, 1, 2, 3, 4]);
        const salt = new Uint8Array([5, 6, 7, 8, 9, 10, 11]);
        const info = new Uint8Array([12, 13, 14, 15, 16, 17, 18]);

        // Full expansion.
        const full = new HKDF(SHA256, key, salt, info).expand(300);

        // Sliced expansions.
        const h = new HKDF(SHA256, key, salt, info);
        const s1 = h.expand(1);   // 1
        const s2 = h.expand(100); // 101
        const s3 = h.expand(27);  // 128
        const s4 = h.expand(32);  // 160
        const s5 = h.expand(140); // 300

        const se = encode(s1) + encode(s2) + encode(s3) + encode(s4) + encode(s5);

        expect(se).toBe(encode(full));
    });
});
