import { ResponseList } from "http/ResponseList"
import {
  IndividualRequestOptions,
  ResponseBody,
  ResponseData
}                       from "http/types"
import { isArray }      from "utils/typeCheckers"

type Options = Pick<IndividualRequestOptions, "addIncludedData">

type Record = { [p: string]: any, _recordType: string }
type Data = ResponseList | Record
type IncludedRelationships = Record[]
type DataWithIncludedRelationships = [Data, IncludedRelationships]

type Func = ((
  body: ResponseBody,
  options: (Options & { addIncludedData?: false })
) => Data) | ((
  body: ResponseBody,
  options: (Options & { addIncludedData: true })
) => DataWithIncludedRelationships)

export const configureJsonApiResponse: Func = (body: ResponseBody, options?: Options) => {
  const data                = body.data!
  const { addIncludedData } = options ?? {}

  const records = isArray(data)
                  ? getDataList(data as ResponseData[], body)
                  : getSingleRecordData(data as ResponseData)

  return addIncludedData
         ? [records, getIncludedData(body.included)]
         : records
}

const getDataList = (data: ResponseData[], body: ResponseBody) => {
  const pagination = body.pagination
  const records    = data.map(getSingleRecordData)

  return new ResponseList(records, pagination)
}

const getIncludedData = (included: ResponseData[]) => included.map(getSingleRecordData)

const getSingleRecordData = <T>(data: ResponseData) => {
  return { ...data.attributes, _recordType: data.type }
}
