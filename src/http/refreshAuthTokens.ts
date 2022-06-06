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
  await setAuthTokens(
    await http.GET<Session>(refreshRoute)
  )
}
