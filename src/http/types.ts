import { ServerError, ServerErrorType } from "http/ServerError"

export type AfterRequestInterceptor = (body: ResponseBody) => { [key: string]: any }
export type BeforeRequestHook = (uri: string) => Promise<any>
export type BeforeRequestInterceptor = (config: RequestConfig) => RequestConfig
export type Configuration = {
  beforeRequest: BeforeRequestHook,
  errorInterceptor: ErrorInterceptor,
  beforeRequestInterceptor: BeforeRequestInterceptor,
  afterRequestInterceptor: AfterRequestInterceptor,
  unauthInterceptor: UnauthenticatedInterceptor,
}
export type ErrorInterceptor = (e: ServerError | Error) => Promise<boolean>
export type FetchError = TypeError | Response

export interface HttpClient {
  PATCH: RequestWithBody,
  POST: RequestWithBody,
  PUT: RequestWithBody,
  GET: RequestWithoutBody,
  DELETE: RequestWithoutBody,
}

export type Pagination = {
  total_count: number,
  page: number,
  page_size: number,
  reference_id: number,
}
export type RequestConfig = Omit<RequestInit, "body"> & {
  body?: { [key: string]: any },
  query?: { [key: string]: any },
}
export type RequestParams = {
  body?: { [key: string]: any },
  domain: string,
  method: string,
  query?: { [key: string]: any },
  uri: string,
}

type RequestWithBody = <T>(
  uri: string, body: Object, configure?: BeforeRequestInterceptor
) => Promise<T>

type RequestWithoutBody = <T>(
  uri: string, query?: Object, configure?: BeforeRequestInterceptor,
) => Promise<T>

export type ResponseBody = {
  [key: string]: any,
  data?: ResponseData[] | ResponseData,
  pagination?: Pagination
}
export type ResponseData = {
  attributes: { [key: string]: any },
  relationships?: { [key: string]: any },
}

export interface ResponseDataList extends Array<ResponseData> {
  pagination?: Pagination
}

export type ServerErrorDetails = {
  data?: { [key: string]: any },
  error: string,
  status: number,
  type: ServerErrorType,
}
export type Session = { accessToken: string, refreshToken: string }

export type TokenDeleter = () => Promise<void>
export type TokenProvider = () => ({
  isAccessTokenExpired: () => boolean,
} & Session)
export type TokenSetter = (tokens: Session) => Promise<void>
export type UnauthenticatedInterceptor = (route: string) => Promise<any>
