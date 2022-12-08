declare const ERROR_TYPES: {
    readonly SYSTEM: "SYSTEM";
    readonly UNKNOWN: "UNKNOWN";
    readonly USER_FACING: "USER_FACING";
    readonly VALIDATION: "VALIDATION";
};
declare type ServerErrorType = typeof ERROR_TYPES[keyof typeof ERROR_TYPES];
declare class ServerError extends Error {
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

declare type Association<T> = {
    _recordType: string;
} & T;
declare type Associations<T> = Association<T>[];
declare type AfterRequestInterceptor = (body: ResponseBody, options?: IndividualRequestOptions) => {
    [key: string]: any;
};
declare type BeforeRequestHook = (uri: string) => Promise<any>;
declare type BeforeRequestInterceptor = (config: RequestConfig) => RequestConfig;
declare type Configuration = {
    afterRequestInterceptor: AfterRequestInterceptor;
    beforeRequest: BeforeRequestHook;
    beforeRequestInterceptor: BeforeRequestInterceptor;
    errorInterceptor: ErrorInterceptor;
    otherOptions?: IndividualRequestOptions;
    unauthInterceptor: UnauthenticatedInterceptor;
};
declare type ErrorInterceptor = (e: ServerError | Error) => Promise<boolean>;
declare type FetchError = TypeError | Response;
interface HttpClient {
    PATCH: RequestWithBody;
    POST: RequestWithBody;
    PUT: RequestWithBody;
    GET: RequestWithoutBody;
    DELETE: RequestWithoutBody;
}
declare type Pagination = {
    total_count: number;
    page: number;
    page_size: number;
    reference_id: number;
};
declare type RequestConfig = Omit<RequestInit, "body"> & {
    body?: {
        [key: string]: any;
    };
    query?: {
        [key: string]: any;
    };
};
declare type RequestParams = {
    body?: {
        [key: string]: any;
    };
    domain: string;
    method: string;
    query?: {
        [key: string]: any;
    };
    uri: string;
};
declare type IndividualRequestOptions = {
    configure?: BeforeRequestInterceptor;
    addIncludedData?: boolean;
};
declare type RequestWithBody = <T>(uri: string, body: Object, options?: IndividualRequestOptions) => Promise<T>;
declare type RequestWithoutBody = <T>(uri: string, query?: Object, options?: IndividualRequestOptions) => Promise<T>;
declare type ResponseBody = {
    [key: string]: any;
    data?: ResponseData[] | ResponseData;
    pagination?: Pagination;
};
declare type ResponseData = {
    attributes: {
        [key: string]: any;
    };
    relationships?: {
        [key: string]: any;
    };
    "type": string;
};
interface ResponseDataList extends Array<ResponseData> {
    pagination?: Pagination;
}
declare type ServerErrorDetails = {
    data?: {
        [key: string]: any;
    };
    error: string;
    status: number;
    type: ServerErrorType;
};
declare type Session = {
    accessToken: string;
    refreshToken: string;
};
declare type TokenDeleter = () => Promise<void>;
declare type TokenProvider = () => ({
    isAccessTokenExpired: () => boolean;
} & Session);
declare type TokenSetter = (tokens: Session) => Promise<void>;
declare type UnauthenticatedInterceptor = (route: string) => Promise<any>;

declare const transformBodyToCamelCase: <T>(body: T) => T;

declare const transformParamsToSnakeCase: ({ body, query, ...rest }: RequestConfig) => RequestConfig;

declare const enableLogging: () => void;

declare type NewClientParams = {
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
declare const newHttp: ({ afterRequestInterceptor, beforeRequestInterceptor, domain, processError, getAuthTokens, deleteAuthTokens, setAuthTokens, refreshRoute, refreshTokenHeaderName, }: NewClientParams) => HttpClient;

export { AfterRequestInterceptor, Association, Associations, BeforeRequestHook, BeforeRequestInterceptor, Configuration, ErrorInterceptor, FetchError, HttpClient, IndividualRequestOptions, NewClientParams, Pagination, RequestConfig, RequestParams, RequestWithBody, RequestWithoutBody, ResponseBody, ResponseData, ResponseDataList, ServerError, ServerErrorDetails, ServerErrorType, Session, TokenDeleter, TokenProvider, TokenSetter, UnauthenticatedInterceptor, enableLogging, newHttp, transformBodyToCamelCase, transformParamsToSnakeCase };
