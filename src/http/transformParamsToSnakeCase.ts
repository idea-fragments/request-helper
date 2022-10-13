import { RequestConfig } from "http/types"
import snakeCaseKeys     from "snakecase-keys"

export const transformParamsToSnakeCase = ({
                                             body,
                                             query,
                                             ...rest
                                           }: RequestConfig): RequestConfig => ({
  ...rest,
  body:  body ? snakeCaseKeys(body) : undefined,
  query: query ? snakeCaseKeys(query) : undefined,
})
