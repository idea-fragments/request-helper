import { Pagination, ResponseDataList } from "http/types";
export declare class ResponseList extends Array implements ResponseDataList {
    pagination: Pagination | undefined;
    constructor(list: {
        [key: string]: any;
    }[], pagination?: Pagination);
}
//# sourceMappingURL=ResponseList.d.ts.map