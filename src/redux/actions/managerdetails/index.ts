import { ApiUrl } from "../../../config/apiUrl";
import axios from "axios";
import { Dispatch } from "redux";

import {
  ManagerDetailDispatchTypes,
  MANAGER_DETAIL_FAIL,
  MANAGER_DETAIL_LOADING,
  MANAGER_DETAIL_SUCCESS,
} from "./managerdetail";

export const GetManagerDetails = (companyId: string) => async (
  dispatch: Dispatch<ManagerDetailDispatchTypes>
) => {
  try {
    dispatch({ type: MANAGER_DETAIL_LOADING });
    const res = await axios.post(ApiUrl.managerDetails, { companyId });
    if (res) {
      console.log("ress",res)
      if (res.data && res.status === 200) {
        dispatch({
          type: MANAGER_DETAIL_SUCCESS,
          payload: { userDetail: res.data },
        });
      } else {
        throw new Error(res.data.message || "Data fetch failed");
      }
    } else {
      throw new Error("Cannot get data");
    }
  } catch (err) {
    dispatch({
      type: MANAGER_DETAIL_FAIL,
      error: { message: err.message },
    });
  }
};
