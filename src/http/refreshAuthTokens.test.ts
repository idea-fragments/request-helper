import { refreshAuthTokens } from "http/refreshAuthTokens"

const buildParams = ({ getResult }) => {
  const setAuthTokens = jest.fn().mockResolvedValue(undefined)
  const http = {
    GET: jest.fn().mockImplementation(getResult),
    POST: jest.fn(),
    PUT: jest.fn(),
    PATCH: jest.fn(),
    DELETE: jest.fn(),
  }

  return {
    http,
    refreshRoute: "/sessions/refresh",
    setAuthTokens,
  }
}

describe("refreshAuthTokens", () => {
  it("resolves and calls setAuthTokens on success", async () => {
    const tokens = { accessToken: "new-access", refreshToken: "new-refresh" }
    const params = buildParams({
      getResult: () => Promise.resolve(tokens),
    })

    await refreshAuthTokens(params)

    expect(params.http.GET).toHaveBeenCalledWith("/sessions/refresh")
    expect(params.setAuthTokens).toHaveBeenCalledWith(tokens)
  })

  it("rejects when http.GET fails", async () => {
    const error = new Error("401 Unauthorized")
    const params = buildParams({
      getResult: () => Promise.reject(error),
    })

    await expect(refreshAuthTokens(params)).rejects.toThrow("401 Unauthorized")
    expect(params.setAuthTokens).not.toHaveBeenCalled()
  })

  it("rejects when setAuthTokens fails", async () => {
    const tokens = { accessToken: "new-access", refreshToken: "new-refresh" }
    const params = buildParams({
      getResult: () => Promise.resolve(tokens),
    })
    params.setAuthTokens.mockRejectedValue(new Error("storage failure"))

    await expect(refreshAuthTokens(params)).rejects.toThrow("storage failure")
  })
})
