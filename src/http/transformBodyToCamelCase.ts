import camelCaseKeys from "camelcase-keys"

export const transformBodyToCamelCase = <T>(body: T) => {
  return camelCaseKeys<T>(body) as T
}
