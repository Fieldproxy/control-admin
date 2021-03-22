import { Dispatch } from "redux";

import {
  IDENTIFIER_DATA_LOADING,
  IDENTIFIER_DATA_SUCCESS,
  IDENTIFIER_DATA_FAIL,
  
  IdentifierDispatchTypes,
} from "./identifierStateType";

import { ApiUrl } from "../../../config/apiUrl";
import axios from "axios";



export const getIdentifierData = (company: string , searchValue: string) => async (
  dispatch: Dispatch<IdentifierDispatchTypes>
) => {
  try {
    console.log(company,searchValue)
    searchValue = searchValue.replace("#","")
    dispatch({ type: IDENTIFIER_DATA_LOADING });
    const res = await axios.post(`${ApiUrl.getPrimaryResponse}/${searchValue}/${company}`);
    if (res.status === 200) {
      const { data } = res;
      if (data && data.status) {
        dispatch({
          type: IDENTIFIER_DATA_SUCCESS,
          payload: {
            matches: data.status,
            totalAgents: data.status.length,
            
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
      type: IDENTIFIER_DATA_FAIL,
      payload: { message: err.message },
    });
  }
};
