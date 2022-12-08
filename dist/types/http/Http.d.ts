import { BeforeRequestInterceptor, Configuration, HttpClient, RequestWithBody, RequestWithoutBody } from "http/types";
declare type Const = Configuration & {
    domain: string;
};
export declare class Http implements HttpClient {
    readonly globalBeforeRequestInterceptor: BeforeRequestInterceptor;
    readonly config: Const;
    constructor(p: Const);
    private makeRequest;
    private requestWithBody;
    private requestWithoutBody;
    PATCH: RequestWithBody;
    POST: RequestWithBody;
    PUT: RequestWithBody;
    GET: RequestWithoutBody;
    DELETE: RequestWithoutBody;
}
export {};
//# sourceMappingURL=Http.d.ts.map