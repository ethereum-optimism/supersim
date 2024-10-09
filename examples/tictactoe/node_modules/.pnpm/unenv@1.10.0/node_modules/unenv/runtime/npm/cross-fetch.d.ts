export declare const fetch: (input: string | Request | URL, init?: RequestInit | undefined) => Promise<Response>;
export default fetch;
export declare const Headers: {
    new (init?: HeadersInit): Headers;
    prototype: Headers;
};
export declare const Request: {
    new (input: RequestInfo | URL, init?: RequestInit): Request;
    prototype: Request;
};
export declare const Response: {
    new (body?: BodyInit | null, init?: ResponseInit): Response;
    prototype: Response;
    error(): Response;
    json(data: any, init?: ResponseInit): Response;
    redirect(url: string | URL, status?: number): Response;
};
