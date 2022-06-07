import { HttpClient, TokenSetter } from "http/types";
export declare type AuthTokensRefresherParams = {
    http: HttpClient;
    refreshRoute: string;
    setAuthTokens: TokenSetter;
};
export declare const refreshAuthTokens: ({ http, refreshRoute, setAuthTokens }: AuthTokensRefresherParams) => Promise<void>;
//# sourceMappingURL=refreshAuthTokens.d.ts.map