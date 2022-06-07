import { HttpClient, Session, TokenSetter } from "http/types"


export type AuthTokensRefresherParams = {
  http: HttpClient,
  refreshRoute: string,
  setAuthTokens: TokenSetter
}

export const refreshAuthTokens = async ({
                                          http,
                                          refreshRoute,
                                          setAuthTokens
                                        }: AuthTokensRefresherParams) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      http.GET<Session>(refreshRoute).then(setAuthTokens).then(resolve)
    }, 500)
  })
}
