import { configureUnauthInterceptor } from "http/configureUnauthInterceptor"
import { ServerError } from "http/ServerError"

const buildInterceptor = () => {
  const deleteAuthTokens = jest.fn().mockResolvedValue(undefined)
  const refreshTokens = jest.fn().mockResolvedValue(undefined)
  const interceptor = configureUnauthInterceptor(
    deleteAuthTokens,
    "/sessions/refresh",
    refreshTokens,
  )

  return { deleteAuthTokens, interceptor, refreshTokens }
}

describe("configureUnauthInterceptor", () => {
  it("deletes tokens and throws when the refresh route itself gets a 401", async () => {
    const { deleteAuthTokens, interceptor } = buildInterceptor()

    await expect(interceptor("/sessions/refresh")).rejects.toThrow(ServerError)
    expect(deleteAuthTokens).toHaveBeenCalled()
  })

  it("triggers a refresh for a normal route 401", async () => {
    const { interceptor, refreshTokens } = buildInterceptor()

    await interceptor("/user_settings")

    expect(refreshTokens).toHaveBeenCalledTimes(1)
  })

  it("skips refresh when token was already refreshed after the request was initiated", async () => {
    const { interceptor, refreshTokens } = buildInterceptor()

    // First 401 triggers a refresh
    const requestAInitiatedAt = Date.now() - 1000
    await interceptor("/user_settings", requestAInitiatedAt)
    expect(refreshTokens).toHaveBeenCalledTimes(1)

    // Second 401 from a request initiated before the refresh completed — should skip
    const requestBInitiatedAt = Date.now() - 500
    await interceptor("/budgets", requestBInitiatedAt)
    expect(refreshTokens).toHaveBeenCalledTimes(1)
  })

  it("triggers refresh when request was initiated after the last refresh", async () => {
    const { interceptor, refreshTokens } = buildInterceptor()

    // First 401 triggers a refresh
    await interceptor("/user_settings", Date.now() - 1000)
    expect(refreshTokens).toHaveBeenCalledTimes(1)

    // Second 401 from a request initiated after the refresh completed — should refresh
    const requestInitiatedAfterRefresh = Date.now() + 1000
    await interceptor("/budgets", requestInitiatedAfterRefresh)
    expect(refreshTokens).toHaveBeenCalledTimes(2)
  })
})
