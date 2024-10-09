// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { scalarMultBase } from "./x25519";
import { X25519KeyAgreement } from "./keyagreement";
import { benchmark, report, byteSeq } from "@stablelib/benchmark";

const r = new Uint8Array(32); r[0] = 1;

report("x25519.scalarMultBase", benchmark(() => scalarMultBase(r)));

const seed = byteSeq(32);

const offerMsg = new X25519KeyAgreement(seed).offer();
const acceptMsg = new X25519KeyAgreement(seed).accept(offerMsg);

report("X25519KeyAgreement offer/finish", benchmark(() => {
    const state = new X25519KeyAgreement(seed);
    state.offer();
    state.finish(acceptMsg);
}));

report("X25519KeyAgreement accept", benchmark(() =>
    new X25519KeyAgreement(seed).accept(offerMsg)));
