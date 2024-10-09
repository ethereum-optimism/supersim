// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { RandomSource } from "./";
import { BrowserRandomSource } from "./browser";
import { NodeRandomSource } from "./node";

export class SystemRandomSource implements RandomSource {
    isAvailable = false;
    name = "";
    private _source: RandomSource;

    constructor() {
        // Try browser.
        this._source = new BrowserRandomSource();
        if (this._source.isAvailable) {
            this.isAvailable = true;
            this.name = "Browser";
            return;
        }

        // If no browser source, try Node.
        this._source = new NodeRandomSource();
        if (this._source.isAvailable) {
            this.isAvailable = true;
            this.name = "Node";
            return;
        }

        // No sources, we're out of options.
    }

    randomBytes(length: number): Uint8Array {
        if (!this.isAvailable) {
            throw new Error("System random byte generator is not available.");
        }
        return this._source.randomBytes(length);
    }
}
