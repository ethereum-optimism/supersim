// Copyright (C) 2020 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { KeyAgreement } from "@stablelib/keyagreement";
import { randomBytes, RandomSource } from "@stablelib/random";
import { wipe } from "@stablelib/wipe";
import { PUBLIC_KEY_LENGTH, SECRET_KEY_LENGTH, SHARED_KEY_LENGTH, generateKeyPairFromSeed, sharedKey } from "./x25519";

/** Constants for key agreement */
export const OFFER_MESSAGE_LENGTH = PUBLIC_KEY_LENGTH;
export const ACCEPT_MESSAGE_LENGTH = PUBLIC_KEY_LENGTH;
export const SAVED_STATE_LENGTH = SECRET_KEY_LENGTH;
export const SECRET_SEED_LENGTH = SECRET_KEY_LENGTH;

/**
 * X25519 key agreement using ephemeral key pairs.
 *
 * Note that unless this key agreement is combined with an authentication
 * method, such as public key signatures, it's vulnerable to man-in-the-middle
 * attacks.
 */
export class X25519KeyAgreement implements KeyAgreement {
    readonly offerMessageLength = OFFER_MESSAGE_LENGTH;
    readonly acceptMessageLength = ACCEPT_MESSAGE_LENGTH;
    readonly sharedKeyLength = SHARED_KEY_LENGTH;
    readonly savedStateLength = SAVED_STATE_LENGTH;

    private _secretKey: Uint8Array;
    private _sharedKey: Uint8Array | undefined;
    private _offered = false;

    constructor(secretSeed?: Uint8Array, prng?: RandomSource) {
        this._secretKey = secretSeed || randomBytes(SECRET_KEY_LENGTH, prng);
    }

    saveState(): Uint8Array {
        return new Uint8Array(this._secretKey);
    }

    restoreState(savedState: Uint8Array): this {
        this._secretKey = new Uint8Array(savedState);
        return this;
    }

    clean(): void {
        if (this._secretKey) {
            wipe(this._secretKey);
        }
        if (this._sharedKey) {
            wipe(this._sharedKey);
        }
    }

    offer(): Uint8Array {
        this._offered = true;
        const keyPair = generateKeyPairFromSeed(this._secretKey);
        return keyPair.publicKey;
    }

    accept(offerMsg: Uint8Array): Uint8Array {
        if (this._offered) {
            throw new Error("X25519KeyAgreement: accept shouldn't be called by offering party");
        }
        if (offerMsg.length !== this.offerMessageLength) {
            throw new Error("X25519KeyAgreement: incorrect offer message length");
        }
        const keyPair = generateKeyPairFromSeed(this._secretKey);
        this._sharedKey = sharedKey(keyPair.secretKey, offerMsg);
        wipe(keyPair.secretKey);
        return keyPair.publicKey;
    }

    finish(acceptMsg: Uint8Array): this {
        if (acceptMsg.length !== this.acceptMessageLength) {
            throw new Error("X25519KeyAgreement: incorrect accept message length");
        }
        if (!this._secretKey) {
            throw new Error("X25519KeyAgreement: no offer state");
        }
        if (this._sharedKey) {
            throw new Error("X25519KeyAgreement: finish was already called");
        }
        this._sharedKey = sharedKey(this._secretKey, acceptMsg);
        return this;
    }

    getSharedKey(): Uint8Array {
        if (!this._sharedKey) {
            throw new Error("X25519KeyAgreement: no shared key established");
        }
        return new Uint8Array(this._sharedKey);
    }
}
