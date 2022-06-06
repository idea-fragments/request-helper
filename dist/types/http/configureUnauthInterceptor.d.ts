import { TokenDeleter, UnauthenticatedInterceptor } from "http/types";
export declare const configureUnauthInterceptor: (deleteAuthTokens: TokenDeleter, refreshRoute: string, refreshTokens: () => Promise<any>) => UnauthenticatedInterceptor;
//# sourceMappingURL=configureUnauthInterceptor.d.ts.map