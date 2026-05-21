import { BeforeRequestHook, ExtraLogFields, TokenProvider } from "http/types";
export declare const ensureAuthTokensRefreshed: (getAuthTokens: TokenProvider, refreshRoute: string, refreshTokens: () => Promise<any>, extraLogFields?: ExtraLogFields) => BeforeRequestHook;
//# sourceMappingURL=ensureAuthTokensRefreshed.d.ts.map