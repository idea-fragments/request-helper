import camelCaseKeys from "camelcase-keys"

export const transformBodyToCamelCase = <T>(body: T) => {
  if(body instanceof Array) {
    body.forEach((item, index) => {
      body[index] = camelCaseKeys(item, {deep: true})
    })
    return body
  }

  return camelCaseKeys<T>(body, {deep: true}) as T
}
