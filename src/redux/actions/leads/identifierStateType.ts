import { ErrorI } from "../common";

export const LEAD_DATA_LOADING = "LEAD_DATA_LOADING";
export const LEAD_DATA_SUCCESS = "LEAD_DATA_SUCCESS";
export const LEAD_DATA_FAIL = "LEAD_DATA_FAIL";
export const LEAD_DATA_UPDATE = "LEAD_DATA_UPDATE";

export interface identifierDataLoading {
  type: typeof LEAD_DATA_LOADING;
}

export interface identifierDataFail {
  type: typeof LEAD_DATA_FAIL;
  payload: ErrorI;
}

export type leadObject = {
  "_id": string,
  "entry": string,
  "cf-company": string,
  "cf-email": string,
  "cf-name": string,
  "cf-revenue": string,
  "cf-url": string,
  "utm_campaign": string,
  "utm_medium": string,
  "utm_source": string,
  
  "time": string,
  "cf-status"?: string,
};

export interface identifierDataSuccess {
  
  type: typeof LEAD_DATA_SUCCESS;
  payload: {
    matches?: Array<leadObject>,
    total?: number,
  };
}

export interface identifierDataUpdate {
  type: typeof LEAD_DATA_UPDATE;
  payload: {
    data: leadObject,
    index: number,
  };
}

export type LeadDispatchTypes =
  | identifierDataFail
  | identifierDataLoading
  | identifierDataSuccess
  | identifierDataUpdate;
