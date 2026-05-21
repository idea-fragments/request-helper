import { Logger } from "utils/Logger"

export type PromiseFunc<Args> = (args: Args) => Promise<any>

type Params<Args> = { waitUntilComplete: PromiseFunc<Args> }

const logger = new Logger("newRequestQueue")

export const newRequestQueue = <Args>(
  { waitUntilComplete }: Params<Args>
): PromiseFunc<Args> => {
  logger.writeInfo("[requestQueue:init]")
  let rtnPromise: Promise<any> | undefined

  const reset = () => {
    rtnPromise = undefined
    logger.writeInfo("[requestQueue:done]")
  }

  return (args: Args) => {
    logger.writeInfo("[requestQueue:enqueue]", { alreadyInFlight: !!rtnPromise })

    if (!rtnPromise) {
      rtnPromise = waitUntilComplete(args).then(reset).catch((e) => {
        reset()
        throw e
      })
    }

    return rtnPromise
  }
}
