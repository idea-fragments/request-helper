import { BeforeRequestHook, ExtraLogFields, TokenProvider } from "http/types"
import { Logger } from "utils/Logger"

const logger = new Logger("ensureAuthTokensRefreshed")

export const ensureAuthTokensRefreshed = (
  getAuthTokens: TokenProvider,
  refreshRoute: string,
  refreshTokens: () => Promise<any>,
  extraLogFields?: ExtraLogFields,
): BeforeRequestHook => {
  return async (uri: string) => {
    const { accessToken, isAccessTokenExpired } = getAuthTokens()

    const needToRefresh = uri !== refreshRoute
                          && !!accessToken
                          && isAccessTokenExpired()

    if (!needToRefresh) return Promise.resolve()

    const extra = extraLogFields?.() ?? {}
    logger.writeInfo("[refreshQueue:waiting]", { uri, ...extra })
    await refreshTokens()
    logger.writeInfo("[refreshQueue:resumed]", { uri, ...extra })
  }
}
