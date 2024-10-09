/// <reference types="node" />
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import http from 'http';
type MiddlewareOptions = {
    host?: string;
};
type MiddlewareFn = (req: http.IncomingMessage, res: http.ServerResponse, next: (err?: any) => void) => void;
export default function securityHeadersMiddleware(options: MiddlewareOptions): MiddlewareFn;
export {};
//# sourceMappingURL=securityHeadersMiddleware.d.ts.map