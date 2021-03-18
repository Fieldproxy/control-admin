import { Dispatch } from "redux";

import {
  COMP_DATA_LOADING,
  COMP_DATA_SUCCESS,
  COMP_DATA_FAIL,
  compDataI,
  COMP_DETAIL_FAIL,
  COMP_DETAIL_LOADING,
  COMP_DETAIL_SUCCESS,
  OrganizationDispatchTypes,
} from "./organizationTypes";

import { ApiUrl } from "../../../config/apiUrl";
import axios from "axios";

const getTotalAgents = (data: compDataI[]): number => {
  let totalOrganizations = 0;
  if (data && data.length) {
    totalOrganizations = data.reduce((a, b) => {
      return a + (b ? b.agents : 0);
    }, 0);
  }
  return totalOrganizations;
};

export const GetOrganizationList = () => async (
  dispatch: Dispatch<OrganizationDispatchTypes>
) => {
  try {
    dispatch({ type: COMP_DATA_LOADING });
    const res = await axios.post(ApiUrl.getOrganizations);
    if (res.status === 200) {
      const { data } = res;
      if (data) {
        dispatch({
          type: COMP_DATA_SUCCESS,
          payload: {
            compData: data,
            totalAgents: data.length,
            totalOrganizations: getTotalAgents(data),
          },
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

export const GetOrganizationDetail = (orgId: string) => async (
  dispatch: Dispatch<OrganizationDispatchTypes>
) => {
  try {
    dispatch({ type: COMP_DETAIL_LOADING });
    const res = await axios.post(`${ApiUrl.organizationDetail}/${orgId}`, {});
    if (res.status === 200) {
      const { data } = res;
      if (data) {
        dispatch({
          type: COMP_DETAIL_SUCCESS,
          payload: {
            data,
          },
        });
      } else {
        throw new Error(data.error || "Unable to get data");
      }
    } else {
      throw new Error(`Api Failed with status ${res.status}`);
    }
  } catch (err) {
    dispatch({
      type: COMP_DETAIL_FAIL,
      payload: { message: err.message },
    });
  }
};
