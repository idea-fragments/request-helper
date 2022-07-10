import {
  BeforeRequestInterceptor,
  RequestConfig,
  TokenProvider
} from "http/types"

export const configureAuthedRequest = (
  getAuthTokens: TokenProvider,
  refreshTokenHeaderName?: string,
): BeforeRequestInterceptor =>
  ({ headers = {}, ...rest }: RequestConfig): RequestConfig => {
    const refreshHeader                 = refreshTokenHeaderName ?? "Session"
    const { accessToken, refreshToken } = getAuthTokens()

    return ({
      ...rest,
      headers: {
        ...headers,
        Authorization:   `Bearer ${accessToken}`,
        [refreshHeader]: refreshToken
      },
      mode:    "cors",
    })
  }
