import { ErrorI } from "../common";

export const COMP_DATA_LOADING = "COMP_DATA_LOADING";
export const COMP_DATA_SUCCESS = "COMP_DATA_SUCCESS";
export const COMP_DATA_FAIL = "COMP_DATA_FAIL";

export interface compDataLoading {
  type: typeof COMP_DATA_LOADING;
}

export interface compDataFail {
  type: typeof COMP_DATA_FAIL;
  payload: ErrorI;
}

export type compDataI = {
  companyId: string;
  companyName: string;
  contact: string;
  email: string;
  firstName: string;
  lastName: string;
  managerList: string[];
  pendingAmount: number;
  responses: number;
  start_at: string;
  agents: number;
};

export interface compDataSuccess {
  type: typeof COMP_DATA_SUCCESS;
  payload: {
    compData: [compDataI];
    totalAgents: number;
    totalOrganizations: number;
  };
}

export type DashboardDispatchTypes =
  | compDataLoading
  | compDataFail
  | compDataSuccess;
