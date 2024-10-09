// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { SystemRandomSource } from "./system";

describe("SystemRandomSource.randomBytes", () => {

    const source = new SystemRandomSource();

    it("should generate random bytes", () => {
        const len = 64;
        const zeros = new Uint8Array(len);
        const a = source.randomBytes(len);
        const b = source.randomBytes(len);
        expect(a.length).toBe(len);
        expect(b.length).toBe(len);
        expect(a).not.toEqual(b);
        expect(a).not.toEqual(zeros);
        expect(b).not.toEqual(zeros);
    });
});
