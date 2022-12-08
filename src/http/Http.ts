import { request } from "http/request"
import {
  BeforeRequestInterceptor,
  Configuration,
  HttpClient,
  RequestConfig,
  IndividualRequestOptions,
  RequestWithBody,
  RequestWithoutBody
}                  from "http/types"

type Const = Configuration & {
  domain: string
}


export class Http implements HttpClient {
  readonly globalBeforeRequestInterceptor: BeforeRequestInterceptor
  readonly config: Const

  constructor(p: Const) {
    this.globalBeforeRequestInterceptor = p.beforeRequestInterceptor
    this.config                         = p
  }

  private makeRequest = <Rtn>({ options, ...p }: Params) => request<Rtn>({
    ...p,
    ...this.config,
    ...options,
    beforeRequestInterceptor: (config: RequestConfig): RequestConfig => {
      const configureIndividualRequest: BeforeRequestInterceptor = options?.configure ?? ((c) => c)

      return configureIndividualRequest(this.globalBeforeRequestInterceptor(config))
    },
  })

  private requestWithBody = (method: string): RequestWithBody => <Rtn>(
    uri: string,
    body: Object,
    options?: IndividualRequestOptions,
  ) => (this.makeRequest<Rtn>({ method, uri, body, options }))

  private requestWithoutBody = (method: string): RequestWithoutBody => <Rtn>(
    uri: string,
    query?: Object,
    options?: IndividualRequestOptions,
    configure: BeforeRequestInterceptor = (c) => c,
  ) => this.makeRequest<Rtn>({ method, uri, query, configure })

  PATCH  = this.requestWithBody("PATCH")
  POST   = this.requestWithBody("POST")
  PUT    = this.requestWithBody("PUT")
  GET    = this.requestWithoutBody("GET")
  DELETE = this.requestWithoutBody("DELETE")
}

type Params = {
  method: string,
  body?: Object,
  uri: string,
  query?: Object,
  configure: BeforeRequestInterceptor,
}
