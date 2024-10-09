// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { sign, verify, generateKeyPairFromSeed, generateKeyPair } from "./ed25519";
import { benchmark, report } from "@stablelib/benchmark";

const k = generateKeyPair();

const buf = new Uint8Array(256);
const seed = k.secretKey.subarray(0, 32);
const sig = sign(k.secretKey, buf);
const badsig = new Uint8Array(sig); badsig[0] = 1;

report("ed25519.generateKeyPairFromSeed", benchmark(() => generateKeyPairFromSeed(seed)));
report("ed25519.sign", benchmark(() => sign(k.secretKey, buf)));
report("ed25519.verify", benchmark(() => verify(k.publicKey, buf, sig)));
report("ed25519.verify (bad)", benchmark(() => verify(k.publicKey, buf, badsig)));
