import { ErrorI } from "../common";

export const COMP_DATA_LOADING = "COMP_DATA_LOADING";
export const COMP_DATA_SUCCESS = "COMP_DATA_SUCCESS";
export const COMP_DATA_FAIL = "COMP_DATA_FAIL";

export const COMP_DETAIL_LOADING = "COMP_DETAIL_LOADING";
export const COMP_DETAIL_SUCCESS = "COMP_DETAIL_SUCCESS";
export const COMP_DETAIL_FAIL = "COMP_DATA_FAIL";

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
  createdAt: string;
  type?: string;
};

export interface compDataSuccess {
  type: typeof COMP_DATA_SUCCESS;
  payload: {
    compData: compDataI[];
    totalAgents: number;
    totalOrganizations: number;
  };
}

export interface compDetailLoading {
  type: typeof COMP_DETAIL_LOADING;
}

export interface companyDetailI {
  agents: number;
  avatar: string;
  companyId: string;
  companyName: string;
  contact: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  managerList: string[];
  responses: number;
  role: string;
  totalManagers: number;
  type: string;
  notionLink: string;
  enableCatalogue: boolean;
  readyCatalogue: boolean;
}

export interface compDetailSuccess {
  type: typeof COMP_DETAIL_SUCCESS;
  payload: {
    data: companyDetailI;
  };
}

export interface compDetailFail {
  type: typeof COMP_DETAIL_FAIL;
  payload: ErrorI;
}

export type OrganizationDispatchTypes =
  | compDataLoading
  | compDataFail
  | compDataSuccess
  | compDetailFail
  | compDetailLoading
  | compDetailSuccess;
