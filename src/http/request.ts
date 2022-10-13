import { parseResponse } from "http/parseResponse"
import { ServerError }   from "http/ServerError"
import {
  BeforeRequestInterceptor,
  Configuration,
  ErrorInterceptor,
  RequestParams,
  ResponseBody,
  ServerErrorDetails
}                        from "http/types"
import { toQueryString } from "http/urlHelpers"
import { Logger }        from "utils/Logger"
import { isString }      from "utils/typeCheckers"

const logger = new Logger("request")

export const request = async <T>(rp: RequestParams & Configuration): Promise<T> => {
  const {
          afterRequestInterceptor,
          beforeRequest,
          beforeRequestInterceptor,
          domain,
          errorInterceptor,
          method,
          uri,
          body,
          query,
          unauthInterceptor,
        } = rp
  return await watchForErrors(errorInterceptor, async () => {
    logger.writeInfo("START", uri)
    logger.writeInfo("beforeRequest hook START", uri)
    await beforeRequest(uri)
    logger.writeInfo("beforeRequest hook DONE", uri)

    const queryString    = query
                           ? `?${toQueryString(query)}`
                           : ""
    const url            = `${domain}${uri}${queryString}`
    const config         = fetchConfig(method, beforeRequestInterceptor, body)
    const resp: Response = await fetch(url, config)
    const { status }     = resp
    logger.writeInfo("fetch DONE", uri)

    if (isUnauthorized(status)) {
      await unauthInterceptor(uri)
      return await retry(rp)
    }

    const respBody = await parseResponse(resp)
    logger.writeInfo("DONE", uri)
    if (isSuccessResponse(status)) {
      return respBody
             ? afterRequestInterceptor(respBody as ResponseBody)
             : undefined
    }
    bubbleServerError(respBody, status)
  })

}

const bubbleServerError = (respBody: any, status: number) => {
  const errorResp: string | Omit<ServerErrorDetails, "status"> = respBody
  const errorDetails: ServerErrorDetails                       =
          isString(respBody)
          ? { status, error: respBody, type: ServerError.ERROR_TYPES.SYSTEM }
          : {
              ...errorResp as Omit<ServerErrorDetails, "status">,
              status,
              type: respBody.type ?? ServerError.ERROR_TYPES.SYSTEM
            }

  throw new ServerError(errorDetails)
}

const fetchConfig = (
  method: string,
  intercept: BeforeRequestInterceptor,
  body?: Object
): RequestInit => {
  const config = intercept({
    body,
    method,
    cache:    "no-cache",
    headers:  { "content-type": "application/json" },
    redirect: "follow",
  })
  // @ts-ignore
  return { ...config, body: finalizeBody(config), }
}

const finalizeBody = ({ headers = {}, body }: RequestInit) => {
  if (!body) return

  // @ts-ignore
  return headers["content-type"] === "application/json"
         ? JSON.stringify(body)
         : body
}

const isSuccessResponse = (status: number): boolean => status < 400
const isUnauthorized    = (status: number): boolean => status === 401
const retry             = <T>(rp: RequestParams & Configuration) =>
  request<T>(rp)
const watchForErrors    = async (
  errorInterceptor: ErrorInterceptor,
  f: Function,
): Promise<any> => {
  try {
    return await f()
  } catch (e) {
    if (!(e instanceof Error)) throw e

    const shouldNotBubble = await errorInterceptor(e)
    if (shouldNotBubble) return

    throw e
  }
}
