import { ErrorI } from "../common";

export const MANAGER_DETAIL_LOADING = "MANAGER_DETAIL_LOADING";
export const MANAGER_DETAIL_SUCCESS = "MANAGER_DETAIL_SUCCESS";
export const MANAGER_DETAIL_FAIL = "MANAGER_DETAIL_FAIL";

export type userDetailI =  {
  firstName: string;
  lastName: string;
  email: string;
  companyId: string;
  contact: string;
  ts: Date | string;
};

export interface managerDetailLoading {
  type: typeof MANAGER_DETAIL_LOADING;
}

export interface managerDetailSuccess {
  type: typeof MANAGER_DETAIL_SUCCESS;
  payload: {
    userDetail: userDetailI[];
  };
}

export interface managerDetailFail {
  type: typeof MANAGER_DETAIL_FAIL;
  error: ErrorI;
}

export type ManagerDetailDispatchTypes =
  | managerDetailLoading
  | managerDetailFail
  | managerDetailSuccess;
