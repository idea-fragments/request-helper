import { parse, stringify } from "query-string"


export const parseQueryParams :(s: string) => { [key: string]: any } = parse

export const toQueryString = (o :{ [key: string]: string }) :string => {
    return stringify(o, { arrayFormat: "bracket" })
}
