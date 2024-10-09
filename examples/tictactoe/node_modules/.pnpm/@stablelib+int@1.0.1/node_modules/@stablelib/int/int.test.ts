// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { mul, add, sub } from "./int";

describe("int.mul", () => {
    it("should overflow", () => {
        const float = 0xffffffff * 0x7fffffff;
        const int = mul(0xffffffff, 0x7fffffff);
        expect(int).toBeLessThan(float);
    });
    it("should return correct result", () => {
        expect(mul(0x7fffffff, 0x5ffffff5)).toBe(0x2000000b);
    });
    it("should be commutative", () => {
        expect(mul(0x7fffffff, 0x5ffffff5))
            .toBe(mul(0x5ffffff5, 0x7fffffff));
    });
});

describe("int.add", () => {
    it("should overflow", () => {
        const float = 0xffffffff + 0x7fffffff;
        const int = add(0xffffffff, 0x7fffffff);
        expect(int).toBeLessThan(float);
    });
    it("should return correct result", () => {
        expect(add(0xffffffff, 1)).toBe(0);
        expect(add(2, 0xffffffff)).toBe(1);
    });
    it("should be commutative", () => {
        expect(add(0x7fffffff, 0x5ffffff5))
            .toBe(add(0x5ffffff5, 0x7fffffff));
    });
});

describe("int.sub", () => {
    it("should overflow", () => {
        const float = 0xffffffff + 0x7fffffff;
        const int = sub(0x7fffffff, 0xffffffff);
        expect(int).toBeLessThan(float);
    });
    it("should return correct result", () => {
        expect(sub(1, 0xffffffff)).toBe(2);
        expect(sub(2, 0xffffffff)).toBe(3);
    });
});
