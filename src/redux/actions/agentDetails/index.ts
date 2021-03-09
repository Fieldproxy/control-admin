import { ApiUrl } from "../../../config/apiUrl";
import axios from "axios";
import { Dispatch } from "redux";

import {
  AgentDetailDispatchTypes,
  AGENT_DETAIL_FAIL,
  AGENT_DETAIL_LOADING,
  AGENT_DETAIL_SUCCESS,
} from "./agentDetailTypes";

export const getAgentDetails = (companyId: string) => async (
  dispatch: Dispatch<AgentDetailDispatchTypes>
) => {
  try {
    dispatch({ type: AGENT_DETAIL_LOADING });
    const res = await axios.post(ApiUrl.deviceDetails, { companyId });
    if (res) {
      dispatch({
        type: AGENT_DETAIL_SUCCESS,
        payload: { userDetail: res.data },
      });
    } else {
      throw new Error("Cannot get data");
    }
  } catch (err) {
    dispatch({
      type: AGENT_DETAIL_FAIL,
      error: { message: err.message },
    });
  }
};
