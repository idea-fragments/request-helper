import camelCaseKeys       from "camelcase-keys"
import { RECORD_TYPE_KEY } from "http/configureJsonApiResponse"

export const transformBodyToCamelCase = <T>(body: T) => {
  if(body instanceof Array) {
    body.forEach((item, index) => {
      body[index] = transformBodyToCamelCase(item)
    })
    return body
  }

  return camelCaseKeys<T>(body, {deep: true, exclude: [RECORD_TYPE_KEY]}) as T
}
