import {
  BeforeRequestInterceptor,
  RequestConfig,
  TokenProvider
} from "http/types"

export const configureAuthedRequest = (
  getAuthTokens: TokenProvider,
  refreshTokenHeaderName?: string,
): BeforeRequestInterceptor => {
  const refreshHeader                 = refreshTokenHeaderName ?? "Session"
  const { accessToken, refreshToken } = getAuthTokens()

  return ({ headers = {}, ...rest }: RequestConfig): RequestConfig => ({
    ...rest,
    headers: {
      ...headers,
      Authorization:   `Bearer ${accessToken}`,
      [refreshHeader]: refreshToken
    },
    mode:    "cors",
  })
}
