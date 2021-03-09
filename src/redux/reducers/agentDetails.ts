import {
  AGENT_DETAIL_FAIL,
  AGENT_DETAIL_LOADING,
  AGENT_DETAIL_SUCCESS,
  AgentDetailDispatchTypes,
  userDetailI,
} from "../actions/agentDetails/agentDetailTypes";

import { ErrorI } from "../actions/common";

export interface AgentDetailI {
  loadingAgentDetail: boolean;
  userData: userDetailI[];
  error: ErrorI;
}

const initialState: AgentDetailI = {
  loadingAgentDetail: false,
  userData: [],
  error: { message: "" },
};

const agentDetailReducer = (
  state: AgentDetailI = initialState,
  action: AgentDetailDispatchTypes
): AgentDetailI => {
  switch (action.type) {
    case AGENT_DETAIL_LOADING:
      return { ...state, loadingAgentDetail: true };
    case AGENT_DETAIL_FAIL:
      return { ...initialState, error: action.error };
    case AGENT_DETAIL_SUCCESS:
      return { ...state, loadingAgentDetail: false, userData: action.payload.userDetail };
    default:
      return state;
  }
};

export default agentDetailReducer;
