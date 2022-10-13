import { Pagination, ResponseDataList } from "http/types"

export class ResponseList extends Array implements ResponseDataList {
  pagination: Pagination | undefined

  constructor(list: { [key: string]: any }[], pagination?: Pagination) {
    super(...list)
    this.pagination = pagination
  }
}
