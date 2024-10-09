// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { streamXOR } from "./chacha";
import { benchmark, report, byteSeq } from "@stablelib/benchmark";

const buf16K = byteSeq(16 << 10);
const buf8192 = byteSeq(8192);
const buf1111 = byteSeq(1111);
const buf64 = byteSeq(64);


const key = byteSeq(32);
const nonce = byteSeq(8);

report("ChaCha20 xor 16K", benchmark(() => streamXOR(key, nonce, buf16K, buf16K), buf16K.length));
report("ChaCha20 xor 8K", benchmark(() => streamXOR(key, nonce, buf8192, buf8192), buf8192.length));
report("ChaCha20 xor 1111", benchmark(() => streamXOR(key, nonce, buf1111, buf1111), buf1111.length));
report("ChaCha20 xor 64", benchmark(() => streamXOR(key, nonce, buf64, buf64), buf64.length));
