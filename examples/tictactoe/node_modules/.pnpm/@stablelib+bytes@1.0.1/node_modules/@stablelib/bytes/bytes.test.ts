// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { concat } from "./bytes";

describe("concat", () => {
    it("should concatenate byte arrays", () => {
        const arrays = [
            new Uint8Array([1, 2, 3]),
            new Uint8Array([4]),
            new Uint8Array(0), // empty
            new Uint8Array([5, 6, 7, 8, 9, 10])
        ];
        const good = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(concat.apply(null, arrays)).toEqual(good);
    });
});
