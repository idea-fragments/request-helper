import { BeforeRequestHook, TokenProvider } from "http/types";
export declare const ensureAuthTokensRefreshed: (getAuthTokens: TokenProvider, refreshRoute: string, refreshTokens: () => Promise<any>) => BeforeRequestHook;
//# sourceMappingURL=ensureAuthTokensRefreshed.d.ts.map