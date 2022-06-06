import { AfterRequestInterceptor, BeforeRequestInterceptor, ErrorInterceptor, HttpClient, TokenDeleter, TokenProvider, TokenSetter } from "http/types";
export declare type NewClientParams = {
    beforeRequestInterceptor: BeforeRequestInterceptor;
    domain: string;
    processError: ErrorInterceptor;
    getAuthTokens: TokenProvider;
    deleteAuthTokens: TokenDeleter;
    setAuthTokens: TokenSetter;
    refreshRoute: string;
    afterRequestInterceptor: AfterRequestInterceptor;
    refreshTokenHeaderName?: string;
};
export default class JaJa {
}
export declare const newHttp: ({ afterRequestInterceptor, beforeRequestInterceptor, domain, processError, getAuthTokens, deleteAuthTokens, setAuthTokens, refreshRoute, refreshTokenHeaderName, }: NewClientParams) => HttpClient;
export * from "http/types";
export * from "http/ServerError";
export * from "http/transformBodyToCamelCase";
export * from "http/transformParamsToSnakeCase";
//# sourceMappingURL=index.d.ts.map