// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

/**
 * Package keyagreement provides interface for key agreement.
 */

export interface KeyAgreement {
    /** Offer message length in bytes */
    readonly offerMessageLength: number;

    /** Accept message length in bytes */
    readonly acceptMessageLength: number;

    /** Shared key length in bytes **/
    readonly sharedKeyLength: number;

    /** Saved state length in bytes **/
    readonly savedStateLength: number;

    /**
     * Offer returns a new offer message, which should be send to the accepting
     * party.
     */
    offer(): Uint8Array;

    /**
     * Accept offer message and return new accept message, which should be sent
     * back to the offering party.
     *
     * Also derives shared key, so the accepting party can call getSharedKey()
     * right after calling accept.
     */
    accept(offerMsg: Uint8Array): Uint8Array;

    /**
     * Offering party finishes key agreement by receiving accept message and
     * passing it to finish(). After calling finish(), offering party can call
     * sharedKey() to get shared key.
     */
    finish(acceptMsg: Uint8Array): this;

    /**
     * Returns the agreed shared key.
     * - Offering party should call this after finish().
     * - Accepting party should call this after accept().
     */
    getSharedKey(): Uint8Array;

    /**
     * Serializes secret offering party state into byte array.
     *
     * This function should be called after offer() if the offering party
     * cannot keep KeyAgreement instance in memory. When it receives accept
     * message, it can create a new instance and call restoreState() on it with
     * the serialized state to recover to continue the agreement.
     */
    saveState(): Uint8Array;

    /**
     * Restores offering party's state.
     */
    restoreState(serializedState: Uint8Array): this;

    /**
     * Cleans the temporary instance data.
     */
    clean(): void;
}
