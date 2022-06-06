export declare type PromiseFunc<Args> = (args: Args) => Promise<any>;
declare type Params<Args> = {
    waitUntilComplete: PromiseFunc<Args>;
};
export declare const newRequestQueue: <Args>({ waitUntilComplete }: Params<Args>) => PromiseFunc<Args>;
export {};
//# sourceMappingURL=newRequestQueue.d.ts.map