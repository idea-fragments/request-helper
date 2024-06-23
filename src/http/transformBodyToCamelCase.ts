import camelCaseKeys       from "camelcase-keys"
import { RECORD_TYPE_KEY } from "http/configureJsonApiResponse"
import { ResponseList }    from "http/ResponseList"

export const transformBodyToCamelCase = <T>(body: T) => {
  if(body instanceof Array) {
    body.forEach((item, index) => {
      body[index] = transformBodyToCamelCase(item)
    })

    if(body.hasOwnProperty("pagination")) {
      const b = body as unknown as ResponseList
      b.pagination = transformBodyToCamelCase(b.pagination)
    }

    return body
  }


  return camelCaseKeys<T>(body, {deep: true, exclude: [RECORD_TYPE_KEY]}) as T
}
