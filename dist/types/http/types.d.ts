import { ServerError, ServerErrorType } from "http/ServerError";
export declare type Association<T> = {
    _recordType: string;
} & T;
export declare type Associations<T> = Association<T>[];
export declare type AfterRequestInterceptor = (body: ResponseBody, options?: IndividualRequestOptions) => {
    [key: string]: any;
};
export declare type BeforeRequestHook = (uri: string) => Promise<any>;
export declare type BeforeRequestInterceptor = (config: RequestConfig) => RequestConfig;
export declare type Configuration = {
    afterRequestInterceptor: AfterRequestInterceptor;
    beforeRequest: BeforeRequestHook;
    beforeRequestInterceptor: BeforeRequestInterceptor;
    errorInterceptor: ErrorInterceptor;
    otherOptions?: IndividualRequestOptions;
    unauthInterceptor: UnauthenticatedInterceptor;
};
export declare type ErrorInterceptor = (e: ServerError | Error) => Promise<boolean>;
export declare type FetchError = TypeError | Response;
export interface HttpClient {
    PATCH: RequestWithBody;
    POST: RequestWithBody;
    PUT: RequestWithBody;
    GET: RequestWithoutBody;
    DELETE: RequestWithoutBody;
}
export declare type Pagination = {
    total_count: number;
    page: number;
    page_size: number;
    reference_id: number;
};
export declare type RequestConfig = Omit<RequestInit, "body"> & {
    body?: {
        [key: string]: any;
    };
    query?: {
        [key: string]: any;
    };
};
export declare type RequestParams = {
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
export declare type IndividualRequestOptions = {
    configure?: BeforeRequestInterceptor;
    addIncludedData?: boolean;
};
export declare type RequestWithBody = <T>(uri: string, body: Object, options?: IndividualRequestOptions) => Promise<T>;
export declare type RequestWithoutBody = <T>(uri: string, query?: Object, options?: IndividualRequestOptions) => Promise<T>;
export declare type ResponseBody = {
    [key: string]: any;
    data?: ResponseData[] | ResponseData;
    pagination?: Pagination;
};
export declare type ResponseData = {
    attributes: {
        [key: string]: any;
    };
    relationships?: {
        [key: string]: any;
    };
    "type": string;
};
export interface ResponseDataList extends Array<ResponseData> {
    pagination?: Pagination;
}
export declare type ServerErrorDetails = {
    data?: {
        [key: string]: any;
    };
    error: string;
    status: number;
    type: ServerErrorType;
};
export declare type Session = {
    accessToken: string;
    refreshToken: string;
};
export declare type TokenDeleter = () => Promise<void>;
export declare type TokenProvider = () => ({
    isAccessTokenExpired: () => boolean;
} & Session);
export declare type TokenSetter = (tokens: Session) => Promise<void>;
export declare type UnauthenticatedInterceptor = (route: string) => Promise<any>;
//# sourceMappingURL=types.d.ts.map