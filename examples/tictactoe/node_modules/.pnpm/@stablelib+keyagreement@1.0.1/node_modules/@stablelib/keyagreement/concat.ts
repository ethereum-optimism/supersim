// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { KeyAgreement } from "./keyagreement";
import { concat } from "@stablelib/bytes";

/**
 * ConcatKeyAgreement concatenates many key agreements into one.
 * Each message is a concatenation of underlying key agreement
 * messages, and shared key is a concatenation of all shared keys.
 */
export class ConcatKeyAgreement implements KeyAgreement {
    readonly offerMessageLength = 0;
    readonly acceptMessageLength = 0;
    readonly sharedKeyLength = 0;
    readonly savedStateLength = 0;

    constructor(public agreements: KeyAgreement[]) {
        for (let i = 0; i < agreements.length; i++) {
            const a = agreements[i];
            this.offerMessageLength += a.offerMessageLength;
            this.acceptMessageLength += a.acceptMessageLength;
            this.sharedKeyLength += a.sharedKeyLength;
            this.savedStateLength += a.savedStateLength;
        }
    }

    saveState(): Uint8Array {
        return concat.apply(null, this.agreements.map(a => a.saveState()));
    }

    restoreState(savedState: Uint8Array): this {
        let offset = 0;
        this.agreements.forEach(a => {
            a.restoreState(savedState.subarray(offset, offset + a.savedStateLength));
            offset += a.savedStateLength;
        });
        return this;
    }

    clean(): void {
        this.agreements.forEach(a => a.clean());
    }

    offer(): Uint8Array {
        return concat.apply(null, this.agreements.map(a => a.offer()));
    }

    accept(offerMsg: Uint8Array): Uint8Array {
        if (offerMsg.length !== this.offerMessageLength) {
            throw new Error("KeyAgreement: incorrect offer message length");
        }
        let offset = 0;
        let results: Uint8Array[] = [];
        this.agreements.forEach(a => {
            results.push(
                a.accept(offerMsg.subarray(offset, offset + a.offerMessageLength))
            );
            offset += a.offerMessageLength;
        });
        return concat.apply(null, results);
    }

    finish(acceptMsg: Uint8Array): this {
        if (acceptMsg.length !== this.acceptMessageLength) {
            throw new Error("KeyAgreement: incorrect accept message length");
        }
        let offset = 0;
        this.agreements.forEach(a => {
            a.finish(acceptMsg.subarray(offset, offset + a.acceptMessageLength));
            offset += a.acceptMessageLength;
        });
        return this;
    }

    getSharedKey(): Uint8Array {
        return concat.apply(null, this.agreements.map(a => a.getSharedKey()));
    }

}
