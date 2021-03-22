import { ErrorI } from "../common";

export const IDENTIFIER_DATA_LOADING = "IDENTIFIER_DATA_LOADING";
export const IDENTIFIER_DATA_SUCCESS = "IDENTIFIER_DATA_SUCCESS";
export const IDENTIFIER_DATA_FAIL = "IDENTIFIER_DATA_FAIL";

export interface identifierDataLoading {
  type: typeof IDENTIFIER_DATA_LOADING;
}

export interface identifierDataFail {
  type: typeof IDENTIFIER_DATA_FAIL;
  payload: ErrorI;
}

export type identifierStateObject = {
  "primaryResponse": string,
  "flowStatus": string,
  "identifierEndTime": string,
  "lastEndTime": string,
  "lastModified": string,
  "numberOfTaskCompleted": number,
  "numberOfTaskFuture": number,
  "numberOfTaskPending": number,
  "ongoing": boolean,
  "primaryIdentifier": Array<any>,
  "reminderData": Array<any>,
  "responses": Array<any>,
  "secondaryIdentifier": Array<any>,
  "totalNumberTask": number,
  "upcomingDateTime"?: string,
  "upcomingTasks": Array<any>,
  "workflowId": string
};

export interface identifierDataSuccess {
  type: typeof IDENTIFIER_DATA_SUCCESS;
  payload: {
    matches?: Array<identifierStateObject>,
    total?: number,
  };
}

export type IdentifierDispatchTypes =
  | identifierDataFail
  | identifierDataLoading
  | identifierDataSuccess;
