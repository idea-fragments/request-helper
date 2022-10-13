import { Logger } from "utils/Logger"

export type PromiseFunc<Args> = (args: Args) => Promise<any>

type Params<Args> = { waitUntilComplete: PromiseFunc<Args> }

const logger = new Logger("newRequestQueue")

export const newRequestQueue = <Args>(
  { waitUntilComplete }: Params<Args>
): PromiseFunc<Args> => {
  logger.writeInfo("Creating new queue")
  let rtnPromise: Promise<any> | undefined

  const reset = () => {
    rtnPromise = undefined
    logger.writeInfo("queueing DONE")
  }

  return (args: Args) => {
    logger.writeInfo("queueing START")

    if (!rtnPromise) {
      rtnPromise = waitUntilComplete(args).then(reset).catch((e) => {
        reset()
        throw e
      })
    }

    return rtnPromise
  }
}
