import { ServerError } from "http/ServerError"
import {
  ExtraLogFields,
  TokenDeleter,
  UnauthenticatedInterceptor
}                      from "http/types"
import { Logger }      from "utils/Logger"

const logger = new Logger("configureUnauthInterceptor")

export const configureUnauthInterceptor = (
  deleteAuthTokens: TokenDeleter,
  refreshRoute: string,
  refreshTokens: () => Promise<any>,
  extraLogFields?: ExtraLogFields,
): UnauthenticatedInterceptor => {
  let lastRefreshCompletedAt = 0

  return async (route: string, requestInitiatedAt?: number): Promise<any> => {
    const extra = extraLogFields?.() ?? {}

    if (route === refreshRoute) {
      await deleteAuthTokens()

      throw new ServerError({
        data:   { route },
        error:  "Unable to refresh access token",
        status: 401,
        type:   "USER_FACING",
        uri:    route,
      })
    }

    if (requestInitiatedAt && lastRefreshCompletedAt > requestInitiatedAt) {
      logger.writeInfo("[unauthInterceptor:skipRefresh]", { route, ...extra })
      return
    }

    await refreshTokens()
    lastRefreshCompletedAt = Date.now()
  }
}
