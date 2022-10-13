import { BeforeRequestHook, TokenProvider } from "http/types"

export const ensureAuthTokensRefreshed = (
  getAuthTokens: TokenProvider,
  refreshRoute: string,
  refreshTokens: () => Promise<any>
): BeforeRequestHook => {
  return async (uri: string) => {
    const { accessToken, isAccessTokenExpired } = getAuthTokens()

    const needToRefresh = uri !== refreshRoute
                          && !!accessToken
                          && isAccessTokenExpired()

    return needToRefresh ? refreshTokens() : Promise.resolve()
  }
}
