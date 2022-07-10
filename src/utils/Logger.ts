import { Logger } from "@idea-fragments/logger-js"
// @ts-ignore
import { name }   from "../../package.json"

export const enableLogging = () => Logger.addModules([
  "newHttp",
  "newRequestQueue",
  "request"
])

Logger.packageName = name

export { Logger }
