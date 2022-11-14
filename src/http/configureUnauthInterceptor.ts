import { ServerError } from "http/ServerError"
import {
  TokenDeleter,
  UnauthenticatedInterceptor
}                      from "http/types"

export const configureUnauthInterceptor = (
  deleteAuthTokens: TokenDeleter,
  refreshRoute: string,
  refreshTokens: () => Promise<any>,
): UnauthenticatedInterceptor => {
  let refreshingTokens = false

  return async (route: string): Promise<any> => {
    if (route === refreshRoute) {
      await deleteAuthTokens()

      throw new ServerError({
        data:   { route: refreshRoute },
        error:  "Unable to refresh access token",
        status: 401,
        type:   "USER_FACING",
      })
    }

    refreshingTokens = true
    await refreshTokens()
    refreshingTokens = false
  }
}
