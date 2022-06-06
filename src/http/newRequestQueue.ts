export type PromiseFunc<Args> = (args: Args) => Promise<any>

type Params<Args> = { waitUntilComplete: PromiseFunc<Args> }

export const newRequestQueue = <Args>(
  { waitUntilComplete }: Params<Args>
): PromiseFunc<Args> => {
  let rtnPromise: Promise<any> | undefined

  const reset = () => { rtnPromise = undefined }

  return (args: Args) => {
    if (!rtnPromise) {
      rtnPromise = waitUntilComplete(args).then(reset).catch((e) => {
        reset()
        throw e
      })
    }

    return rtnPromise
  }
}
