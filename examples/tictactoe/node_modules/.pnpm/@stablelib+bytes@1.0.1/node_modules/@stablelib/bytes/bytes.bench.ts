// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { concat } from "./bytes";
import { benchmark, report } from "@stablelib/benchmark";

const a0 = new Uint8Array([1, 2, 3]);
const a1 = new Uint8Array([4]);
const a2 = new Uint8Array(0); // empty
const a3 = new Uint8Array([5, 6, 7, 8, 9, 10]);

report("bytes.concat", benchmark(() => concat(a0, a1, a2, a3)));
