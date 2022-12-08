import { ResponseList } from "http/ResponseList";
import { IndividualRequestOptions, ResponseBody } from "http/types";
declare type Options = Pick<IndividualRequestOptions, "addIncludedData">;
export declare const configureJsonApiResponse: (body: ResponseBody, options?: Options) => ResponseList | {
    _recordType: string;
} | (ResponseList | {
    _recordType: string;
} | {
    _recordType: string;
}[])[];
export {};
//# sourceMappingURL=configureJsonApiResponse.d.ts.map