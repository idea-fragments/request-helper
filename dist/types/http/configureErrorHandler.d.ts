import { ServerError } from "http/ServerError";
import { ErrorInterceptor } from "http/types";
export declare const configureErrorHandler: (processError: ErrorInterceptor) => (e: ServerError | Error) => Promise<never>;
//# sourceMappingURL=configureErrorHandler.d.ts.map