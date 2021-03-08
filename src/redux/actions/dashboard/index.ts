import { Dispatch } from "redux";

import {
  COMP_DATA_LOADING,
  COMP_DATA_SUCCESS,
  COMP_DATA_FAIL,
  DashboardDispatchTypes,
} from "./dashboardTypes";

import { ApiUrl } from "../../../config/apiUrl";
import axios from "axios";

export const GetDashboardData = () => async (
  dispatch: Dispatch<DashboardDispatchTypes>
) => {
  try {
    dispatch({ type: COMP_DATA_LOADING });
    const res = await axios.post(ApiUrl.getOrganizations);
    if (res.status === 200) {
      const { data } = res;
      if (data) {
        dispatch({
          type: COMP_DATA_SUCCESS,
          payload: data,
        });
      } else {
        throw new Error(data.error || "Unable to get data");
      }
    } else {
      throw new Error(`Api Failed with status ${res.status}`);
    }
  } catch (err) {
    dispatch({
      type: COMP_DATA_FAIL,
      payload: { message: err.message },
    });
  }
};
