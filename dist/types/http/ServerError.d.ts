import { ServerErrorDetails } from "http/types";
declare const ERROR_TYPES: {
    readonly SYSTEM: "SYSTEM";
    readonly UNKNOWN: "UNKNOWN";
    readonly USER_FACING: "USER_FACING";
    readonly VALIDATION: "VALIDATION";
};
export declare type ServerErrorType = typeof ERROR_TYPES[keyof typeof ERROR_TYPES];
export declare class ServerError extends Error {
    static ERROR_TYPES: {
        readonly SYSTEM: "SYSTEM";
        readonly UNKNOWN: "UNKNOWN";
        readonly USER_FACING: "USER_FACING";
        readonly VALIDATION: "VALIDATION";
    };
    static isInstance: (e: Error) => boolean;
    data: {
        [key: string]: any;
    } | undefined;
    status: number;
    type: string;
    _isServerError: boolean;
    constructor({ data, error, status, type }: ServerErrorDetails);
    isValidationError: () => boolean;
    isDisplayableError: () => boolean;
    isSystemError: () => boolean;
}
export {};
//# sourceMappingURL=ServerError.d.ts.map