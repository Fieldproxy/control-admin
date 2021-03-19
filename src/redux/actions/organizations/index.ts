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

import { ENQUEUE_SNACKBAR, notiStackTypes } from "../notistack/notiStackTypes";
import { ApiUrl } from "../../../config/apiUrl";
import axios from "axios";

type dispatchTypesI = OrganizationDispatchTypes | notiStackTypes;

const getTotalAgents = (data: compDataI[]): number => {
  let totalOrganizations = 0;
  if (data && data.length) {
    totalOrganizations = data.reduce((a, b) => {
      return a + (b ? b.agents : 0);
    }, 0);
  }
  return totalOrganizations;
};

const formatOrgData = (data: compDataI[]): compDataI[] => {
  data.forEach((d) => {
    if (d.createdAt) {
      d.createdAt = new Date(d.createdAt).toLocaleDateString();
    }
  });

  return data;
};

export const GetOrganizationList = () => async (
  dispatch: Dispatch<dispatchTypesI>
) => {
  try {
    dispatch({ type: COMP_DATA_LOADING });
    const res = await axios.get(ApiUrl.getOrganizations);
    if (res.status === 200) {
      if (res.data) {
        const { data, status } = res.data;
        if (status) {
          dispatch({
            type: COMP_DATA_SUCCESS,
            payload: {
              compData: formatOrgData(data.organizations),
              totalOrganizations: data.organizations.length,
              totalAgents: getTotalAgents(data.organizations),
            },
          });
        } else {
          throw new Error(data.error || "Unable to get data");
        }
      } else {
        throw new Error("cannot get data");
      }
    } else {
      throw new Error(`Api Failed with status ${res.status}`);
    }
  } catch (err) {
    dispatch({
      type: ENQUEUE_SNACKBAR,
      notification: {
        message: err.message,
        key: "getOrgList",
        options: {
          key: "getOrgList",
          variant: "error",
        },
      },
      key: "getOrgList",
    });
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
