import { ResponseList } from "http/ResponseList";
import { IndividualRequestOptions, ResponseBody } from "http/types";
declare type Options = Pick<IndividualRequestOptions, "addIncludedData">;
export declare const RECORD_TYPE_KEY = "_recordType";
export declare const configureJsonApiResponse: (body: ResponseBody, options?: Options) => ResponseList | {
    _recordType: string;
    relationships: void[] | undefined;
} | (ResponseList | {
    _recordType: string;
    relationships: void[] | undefined;
} | {
    _recordType: string;
    relationships: void[] | undefined;
}[])[];
export {};
//# sourceMappingURL=configureJsonApiResponse.d.ts.map