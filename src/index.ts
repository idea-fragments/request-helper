import { configureAuthedRequest }     from "http/configureAuthedRequest"
import { configureJsonApiResponse }   from "http/configureJsonApiResponse"
import { configureUnauthInterceptor } from "http/configureUnauthInterceptor"
import { ensureAuthTokensRefreshed }  from "http/ensureAuthTokensRefreshed"
import { Http }                       from "http/Http"
import { newRequestQueue }            from "http/newRequestQueue"
import { refreshAuthTokens }          from "http/refreshAuthTokens"
import {
  AfterRequestInterceptor,
  BeforeRequestInterceptor,
  ErrorInterceptor,
  HttpClient,
  TokenDeleter,
  TokenProvider,
  TokenSetter
}                                     from "http/types"
import { flow }                       from "lodash"

export type NewClientParams = {
  beforeRequestInterceptor: BeforeRequestInterceptor,
  domain: string,
  processError: ErrorInterceptor,
  getAuthTokens: TokenProvider,
  deleteAuthTokens: TokenDeleter,
  setAuthTokens: TokenSetter,
  refreshRoute: string,
  afterRequestInterceptor: AfterRequestInterceptor,
  refreshTokenHeaderName?: string,
}
const queueRequests = newRequestQueue({ waitUntilComplete: refreshAuthTokens })
export default class JaJa {

}
export const newHttp = ({
                          afterRequestInterceptor,
                          beforeRequestInterceptor,
                          domain,
                          processError,
                          getAuthTokens,
                          deleteAuthTokens,
                          setAuthTokens,
                          refreshRoute,
                          refreshTokenHeaderName,
                        }: NewClientParams) => {
  const http: HttpClient = new Http({
    afterRequestInterceptor:  flow(
      configureJsonApiResponse,
      afterRequestInterceptor
    ),
    beforeRequest:            ensureAuthTokensRefreshed(
      getAuthTokens,
      refreshRoute,
      async () => queueRequests({ http, refreshRoute, setAuthTokens }),
    ),
    beforeRequestInterceptor: flow(
      configureAuthedRequest(getAuthTokens, refreshTokenHeaderName),
      beforeRequestInterceptor,
    ),
    domain,
    errorInterceptor:         processError,
    unauthInterceptor:        configureUnauthInterceptor(
      deleteAuthTokens,
      refreshRoute,
      async () => queueRequests({ http, refreshRoute, setAuthTokens }),
    )
  })
  return http
}

export * from "http/types"
export * from "http/ServerError"
export * from "http/transformBodyToCamelCase"
export * from "http/transformParamsToSnakeCase"
