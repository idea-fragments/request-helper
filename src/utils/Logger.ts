import { Logger } from "@idea-fragments/logger-js"
// @ts-ignore
import { name }   from "../../package.json"

const MODULES = [
          "configureUnauthInterceptor",
          "ensureAuthTokensRefreshed",
          "newHttp",
          "newRequestQueue",
          "request"
        ]
export const disableLogging = () => Logger.removeModules(MODULES)
export const enableLogging = () => Logger.addModules(MODULES)

Logger.packageName = name

export { Logger }
