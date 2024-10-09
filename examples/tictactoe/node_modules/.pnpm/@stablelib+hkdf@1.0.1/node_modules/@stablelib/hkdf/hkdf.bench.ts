// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { HKDF } from "./hkdf";
import { SHA256 } from "@stablelib/sha256";
import { SHA512 } from "@stablelib/sha512";
import { benchmark, report, byteSeq } from "@stablelib/benchmark";

let key = byteSeq(32);
let salt = byteSeq(32);
let info = byteSeq(5);

report("hkdf/sha256 64", benchmark(() => new HKDF(SHA256, key, salt, info).expand(64)));
report("hkdf/sha256 1K", benchmark(() => new HKDF(SHA256, key, salt, info).expand(1024)));
report("hkdf/sha512 64", benchmark(() => new HKDF(SHA512, key, salt, info).expand(64)));
report("hkdf/sha512 1K", benchmark(() => new HKDF(SHA512, key, salt, info).expand(1024)));
