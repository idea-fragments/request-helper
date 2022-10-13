import { ServerError }                  from "http/ServerError"
import { ErrorInterceptor, FetchError } from "http/types"

export const configureErrorHandler = (processError: ErrorInterceptor) => {
  return async (e: ServerError | Error) => {
    const error: Error = await errorMessage(e)
    await processError(error)
    throw error
  }
}

const errorMessage = async (e: FetchError): Promise<Error> => {
  if (e instanceof TypeError) return e

  try {
    return new ServerError(await e.json())
  } catch (_) {
    return new Error("Unknown request error")
  }
}
