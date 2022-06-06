import { BeforeRequestInterceptor, Configuration, HttpClient } from "http/types";
declare type Const = Configuration & {
    domain: string;
};
export declare class Http implements HttpClient {
    readonly beforeRequestInterceptor: BeforeRequestInterceptor;
    readonly config: Const;
    constructor(p: Const);
    private makeRequest;
    private requestWithBody;
    private requestWithoutBody;
    PATCH: <Rtn>(uri: string, body: Object, configure?: BeforeRequestInterceptor) => Promise<Rtn>;
    POST: <Rtn>(uri: string, body: Object, configure?: BeforeRequestInterceptor) => Promise<Rtn>;
    PUT: <Rtn>(uri: string, body: Object, configure?: BeforeRequestInterceptor) => Promise<Rtn>;
    GET: <Rtn>(uri: string, query?: Object, configure?: BeforeRequestInterceptor) => Promise<Rtn>;
    DELETE: <Rtn>(uri: string, query?: Object, configure?: BeforeRequestInterceptor) => Promise<Rtn>;
}
export {};
//# sourceMappingURL=Http.d.ts.map