import type * as stramWeb from "node:stream/web";
export declare const ReadableStream: {
    new (underlyingSource: UnderlyingByteSource, strategy?: {
        highWaterMark?: number;
    }): ReadableStream<Uint8Array>;
    new <R = any>(underlyingSource: UnderlyingDefaultSource<R>, strategy?: QueuingStrategy<R>): ReadableStream<R>;
    new <R = any>(underlyingSource?: UnderlyingSource<R>, strategy?: QueuingStrategy<R>): ReadableStream<R>;
    prototype: ReadableStream;
};
export declare const ReadableStreamDefaultReader: {
    new <R = any>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
    prototype: ReadableStreamDefaultReader;
};
export declare const ReadableStreamBYOBReader: {
    new (stream: ReadableStream): ReadableStreamBYOBReader;
    prototype: ReadableStreamBYOBReader;
};
export declare const ReadableStreamBYOBRequest: {
    new (): ReadableStreamBYOBRequest;
    prototype: ReadableStreamBYOBRequest;
};
export declare const ReadableByteStreamController: {
    new (): ReadableByteStreamController;
    prototype: ReadableByteStreamController;
};
export declare const ReadableStreamDefaultController: {
    new (): ReadableStreamDefaultController;
    prototype: ReadableStreamDefaultController;
};
export declare const TransformStream: {
    new <I = any, O = any>(transformer?: Transformer<I, O>, writableStrategy?: QueuingStrategy<I>, readableStrategy?: QueuingStrategy<O>): TransformStream<I, O>;
    prototype: TransformStream;
};
export declare const TransformStreamDefaultController: {
    new (): TransformStreamDefaultController;
    prototype: TransformStreamDefaultController;
};
export declare const WritableStream: {
    new <W = any>(underlyingSink?: UnderlyingSink<W>, strategy?: QueuingStrategy<W>): WritableStream<W>;
    prototype: WritableStream;
};
export declare const WritableStreamDefaultWriter: {
    new <W = any>(stream: WritableStream<W>): WritableStreamDefaultWriter<W>;
    prototype: WritableStreamDefaultWriter;
};
export declare const WritableStreamDefaultController: {
    new (): WritableStreamDefaultController;
    prototype: WritableStreamDefaultController;
};
export declare const ByteLengthQueuingStrategy: {
    new (init: QueuingStrategyInit): ByteLengthQueuingStrategy;
    prototype: ByteLengthQueuingStrategy;
};
export declare const CountQueuingStrategy: {
    new (init: QueuingStrategyInit): CountQueuingStrategy;
    prototype: CountQueuingStrategy;
};
export declare const TextEncoderStream: {
    new (): TextEncoderStream;
    prototype: TextEncoderStream;
};
export declare const TextDecoderStream: {
    new (label?: string, options?: TextDecoderOptions): TextDecoderStream;
    prototype: TextDecoderStream;
};
declare const _default: typeof stramWeb;
export default _default;
