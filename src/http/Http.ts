import { request } from "http/request"
import {
  BeforeRequestInterceptor,
  Configuration,
  HttpClient,
  RequestConfig
}                  from "http/types"

type Const = Configuration & {
  domain: string
}


export class Http implements HttpClient {
  readonly beforeRequestInterceptor: BeforeRequestInterceptor
  readonly config: Const

  constructor(p: Const) {
    this.beforeRequestInterceptor = p.beforeRequestInterceptor
    this.config                   = p
  }

  private makeRequest = <Rtn>({ configure, ...p }: Params) => request<Rtn>({
    ...p,
    ...this.config,
    beforeRequestInterceptor: (config: RequestConfig): RequestConfig => {
      return configure(this.beforeRequestInterceptor(config))
    },
  })

  private requestWithBody = (method: string) => <Rtn>(
    uri: string,
    body: Object,
    configure: BeforeRequestInterceptor = (c) => c,
  ) => (this.makeRequest<Rtn>({ method, uri, body, configure }))

  private requestWithoutBody = (method: string) => <Rtn>(
    uri: string,
    query?: Object,
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
