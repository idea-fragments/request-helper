import { TokenDeleter, UnauthenticatedInterceptor } from "http/types"

export const configureUnauthInterceptor = (
  deleteAuthTokens: TokenDeleter,
  refreshRoute: string,
  refreshTokens: () => Promise<any>,
): UnauthenticatedInterceptor => {
  let refreshingTokens = false

  return async (route :string): Promise<any> => {
    if (route === refreshRoute) {
      await deleteAuthTokens()
      throw new Error("Please try again later")
    }

    refreshingTokens = true
    await refreshTokens()
    refreshingTokens = false
  }
}
