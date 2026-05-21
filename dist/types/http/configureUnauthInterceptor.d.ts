import { ExtraLogFields, TokenDeleter, UnauthenticatedInterceptor } from "http/types";
export declare const configureUnauthInterceptor: (deleteAuthTokens: TokenDeleter, refreshRoute: string, refreshTokens: () => Promise<any>, extraLogFields?: ExtraLogFields) => UnauthenticatedInterceptor;
//# sourceMappingURL=configureUnauthInterceptor.d.ts.map