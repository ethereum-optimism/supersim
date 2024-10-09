// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { streamXOR, stream } from "./chacha";
import { encode, decode } from "@stablelib/hex";

function seq(len: number): Uint8Array {
    const x = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        x[i] = i & 0xff;
    }
    return x;
}

describe("chacha.streamXOR", () => {
    const key = seq(32);
    const nonce8 = seq(8);
    const nonce12 = seq(12);

    it("should decrypt what it encrypted (8-byte nonce, 17-byte input)", () => {
        const original = seq(17);
        const encrypted = new Uint8Array(original.length);
        const decrypted = new Uint8Array(original.length);

        streamXOR(key, nonce8, original, encrypted);
        expect(encrypted).not.toEqual(original);

        streamXOR(key, nonce8, encrypted, decrypted);
        expect(decrypted).toEqual(original);
    });

    it("should decrypt what it encrypted (8-byte nonce, 155-byte input)", () => {
        const original = seq(155);
        const encrypted = new Uint8Array(original.length);
        const decrypted = new Uint8Array(original.length);

        streamXOR(key, nonce8, original, encrypted);
        expect(encrypted).not.toEqual(original);

        streamXOR(key, nonce8, encrypted, decrypted);
        expect(decrypted).toEqual(original);
    });

    it("should decrypt what it encrypted (12-byte nonce, 155-byte input)", () => {
        const original = seq(155);
        const encrypted = new Uint8Array(original.length);
        const decrypted = new Uint8Array(original.length);

        streamXOR(key, nonce12, original, encrypted);
        expect(encrypted).not.toEqual(original);

        streamXOR(key, nonce12, encrypted, decrypted);
        expect(decrypted).toEqual(original);
    });

});

const vectors = [
    {
        key: "0000000000000000000000000000000000000000000000000000000000000000",
        nonce: "0000000000000000",
        stream: "76b8e0ada0f13d90405d6ae55386bd28bdd219b8a08ded1aa836efcc8b770dc7da41597c5157488d7724e03fb8d84a376a43b8f41518a11cc387b669",
    },
    {
        key: "0000000000000000000000000000000000000000000000000000000000000001",
        nonce: "0000000000000000",
        stream: "4540f05a9f1fb296d7736e7b208e3c96eb4fe1834688d2604f450952ed432d41bbe2a0b6ea7566d2a5d1e7e20d42af2c53d792b1c43fea817e9ad275",
    },
    {
        key: "0000000000000000000000000000000000000000000000000000000000000000",
        nonce: "0000000000000001",
        stream: "de9cba7bf3d69ef5e786dc63973f653a0b49e015adbff7134fcb7df137821031e85a050278a7084527214f73efc7fa5b5277062eb7a0433e445f41e3",
    },
    {
        key: "0000000000000000000000000000000000000000000000000000000000000000",
        nonce: "0100000000000000",
        stream: "ef3fdfd6c61578fbf5cf35bd3dd33b8009631634d21e42ac33960bd138e50d32111e4caf237ee53ca8ad6426194a88545ddc497a0b466e7d6bbdb004",
    },
    {
        key: "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f",
        nonce: "0001020304050607",
        stream:
        "f798a189f195e66982105ffb640bb7757f579da31602fc93ec01ac56f85ac3c134a4547b733b46413042c944" +
        "0049176905d3be59ea1c53f15916155c2be8241a38008b9a26bc35941e2444177c8ade6689de95264986d958" +
        "89fb60e84629c9bd9a5acb1cc118be563eb9b3a4a472f82e09a7e778492b562ef7130e88dfe031c79db9d4f7" +
        "c7a899151b9a475032b63fc385245fe054e3dd5a97a5f576fe064025d3ce042c566ab2c507b138db853e3d69" +
        "59660996546cc9c4a6eafdc777c040d70eaf46f76dad3979e5c5360c3317166a1c894c94a371876a94df7628" +
        "fe4eaaf2ccb27d5aaae0ad7ad0f9d4b6ad3b54098746d4524d38407a6deb",
    },
];

describe("chacha.stream", () => {
    it("should generate test vectors", () => {
        vectors.forEach(v => {
            const key = decode(v.key);
            const nonce = decode(v.nonce);
            const dst = stream(key, nonce, new Uint8Array(v.stream.length / 2));
            expect(encode(dst, true)).toBe(v.stream);
        });
    });
});
