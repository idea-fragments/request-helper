import { ResponseList }               from "http/ResponseList"
import { ResponseBody, ResponseData } from "http/types"
import { isArray }                    from "utils/typeCheckers"

export const configureJsonApiResponse = (body: ResponseBody) => {
  const data = body.data!

  return isArray(data)
         ? getDataList(data as ResponseData[], body)
         : getSingleRecordData(data as ResponseData)
}

const getDataList = (data: ResponseData[], body: ResponseBody) => {
  const pagination = body.pagination
  const records    = data.map(getSingleRecordData)

  return new ResponseList(records, pagination)
}

const getSingleRecordData = <T>(data: ResponseData) => {
  return data.attributes
}
