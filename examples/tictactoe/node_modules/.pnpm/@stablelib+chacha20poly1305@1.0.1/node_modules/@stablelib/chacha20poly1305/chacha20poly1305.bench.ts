// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { ChaCha20Poly1305 } from "./chacha20poly1305";
import { benchmark, report, byteSeq } from "@stablelib/benchmark";

const buf8192 = byteSeq(8192);
const buf1111 = byteSeq(1111);
const buf0 = new Uint8Array(0);

const key = byteSeq(32);
const nonce = byteSeq(12);

const aead = new ChaCha20Poly1305(key);

report("ChaCha20Poly1305 seal 8K",
    benchmark(() => aead.seal(nonce, buf8192), buf8192.length));
report("ChaCha20Poly1305 seal 1111",
    benchmark(() => aead.seal(nonce, buf1111), buf1111.length));
report("ChaCha20Poly1305 seal 8K + AD",
    benchmark(() => aead.seal(nonce, buf8192, buf8192), buf8192.length * 2));
report("ChaCha20Poly1305 seal 1111 + AD",
    benchmark(() => aead.seal(nonce, buf1111, buf1111), buf1111.length * 2));
report("ChaCha20Poly1305 seal 0 + AD 8K",
    benchmark(() => aead.seal(nonce, buf0, buf8192), buf8192.length));

const sealed8192 = aead.seal(nonce, buf8192);
const sealed1111 = aead.seal(nonce, buf1111);
const sealed8192ad = aead.seal(nonce, buf8192, buf8192);
const sealed1111ad = aead.seal(nonce, buf1111, buf1111);

report("ChaCha20Poly1305 open 8K",
    benchmark(() => aead.open(nonce, sealed8192), buf8192.length));
report("ChaCha20Poly1305 open 1111",
    benchmark(() => aead.open(nonce, sealed1111), buf1111.length));
report("ChaCha20Poly1305 open 8K + AD",
    benchmark(() => aead.open(nonce, sealed8192ad, buf8192), buf8192.length * 2));
report("ChaCha20Poly1305 open 1111 + AD",
    benchmark(() => aead.seal(nonce, sealed1111ad, buf1111), buf1111.length * 2));

sealed8192[0] ^= sealed8192[0];

report("ChaCha20Poly1305 open (bad)",
    benchmark(() => aead.open(nonce, sealed8192), buf8192.length));
