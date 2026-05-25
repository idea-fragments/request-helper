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
  ExtraLogFields,
  HttpClient,
  TokenDeleter,
  TokenProvider,
  TokenSetter
}                                     from "http/types"
import { flow }                       from "lodash"
import { Logger }                     from "utils/Logger"

export type NewClientParams = {
  afterRequestInterceptor: AfterRequestInterceptor,
  beforeRequestInterceptor: BeforeRequestInterceptor,
  deleteAuthTokens: TokenDeleter,
  domain: string,
  extraLogFields?: ExtraLogFields,
  getAuthTokens: TokenProvider,
  processError: ErrorInterceptor,
  refreshRoute: string,
  refreshTokenHeaderName?: string,
  setAuthTokens: TokenSetter,
}

const queueRequests = newRequestQueue({ waitUntilComplete: refreshAuthTokens })
const logger = new Logger("newHttp")

export const newHttp = ({
                          afterRequestInterceptor,
                          beforeRequestInterceptor,
                          deleteAuthTokens,
                          domain,
                          extraLogFields,
                          getAuthTokens,
                          processError,
                          refreshRoute,
                          refreshTokenHeaderName,
                          setAuthTokens,
                        }: NewClientParams) => {
  logger.writeInfo("[newHttp:init]", { domain, ...extraLogFields?.() })

  const http: HttpClient = new Http({
    afterRequestInterceptor:  flow(
      configureJsonApiResponse,
      afterRequestInterceptor
    ),
    beforeRequest:            ensureAuthTokensRefreshed(
      getAuthTokens,
      refreshRoute,
      async () => queueRequests({ http, refreshRoute, setAuthTokens }),
      extraLogFields,
    ),
    beforeRequestInterceptor: flow(
      configureAuthedRequest(getAuthTokens, refreshTokenHeaderName),
      beforeRequestInterceptor,
    ),
    domain,
    extraLogFields,
    errorInterceptor:         processError,
    unauthInterceptor:        configureUnauthInterceptor(
      deleteAuthTokens,
      refreshRoute,
      async () => queueRequests({ http, refreshRoute, setAuthTokens }),
      extraLogFields,
    )
  })
  return http
}

export * from "http/types"
export * from "http/ServerError"
export * from "http/transformBodyToCamelCase"
export * from "http/transformParamsToSnakeCase"
export {
  disableLogging,
  enableLogging
}        from "utils/Logger"
