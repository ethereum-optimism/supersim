// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { oneTimeAuth } from "./poly1305";
import { benchmark, report, byteSeq } from "@stablelib/benchmark";

const buf8192 = byteSeq(8192);
const buf1024 = byteSeq(1024);
const buf32 = byteSeq(32);
const key = byteSeq(32);

report("Poly1305 8K", benchmark(() => oneTimeAuth(key, buf8192), buf8192.length));
report("Poly1305 1K", benchmark(() => oneTimeAuth(key, buf1024), buf1024.length));
report("Poly1305 32", benchmark(() => oneTimeAuth(key, buf32), buf32.length));
