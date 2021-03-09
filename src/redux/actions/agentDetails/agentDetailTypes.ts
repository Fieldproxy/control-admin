import { ErrorI } from "../common";

export const AGENT_DETAIL_LOADING = "AGENT_DETAIL_LOADING";
export const AGENT_DETAIL_SUCCESS = "AGENT_DETAIL_SUCCESS";
export const AGENT_DETAIL_FAIL = "AGENT_DETAIL_FAIL";

export type userDetailI = {
  userId: string;
  lastUpdated: string;
  deviceToken: string;
  deviceDetails: any;
};

export interface agentDetailLoading {
  type: typeof AGENT_DETAIL_LOADING;
}

export interface agentDetailSuccess {
  type: typeof AGENT_DETAIL_SUCCESS;
  payload: {
    userDetail: userDetailI[];
  };
}

export interface agentDetailFail {
  type: typeof AGENT_DETAIL_FAIL;
  error: ErrorI;
}

export type AgentDetailDispatchTypes =
  | agentDetailLoading
  | agentDetailFail
  | agentDetailSuccess;
