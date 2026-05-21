import { AfterRequestInterceptor, BeforeRequestInterceptor, ErrorInterceptor, ExtraLogFields, HttpClient, TokenDeleter, TokenProvider, TokenSetter } from "http/types";
export declare type NewClientParams = {
    afterRequestInterceptor: AfterRequestInterceptor;
    beforeRequestInterceptor: BeforeRequestInterceptor;
    deleteAuthTokens: TokenDeleter;
    domain: string;
    extraLogFields?: ExtraLogFields;
    getAuthTokens: TokenProvider;
    processError: ErrorInterceptor;
    refreshRoute: string;
    refreshTokenHeaderName?: string;
    setAuthTokens: TokenSetter;
};
export declare const newHttp: ({ afterRequestInterceptor, beforeRequestInterceptor, deleteAuthTokens, domain, extraLogFields, getAuthTokens, processError, refreshRoute, refreshTokenHeaderName, setAuthTokens, }: NewClientParams) => HttpClient;
export * from "http/types";
export * from "http/ServerError";
export * from "http/transformBodyToCamelCase";
export * from "http/transformParamsToSnakeCase";
export { enableLogging } from "utils/Logger";
//# sourceMappingURL=index.d.ts.map