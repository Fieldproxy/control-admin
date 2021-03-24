import { Dispatch } from "redux";

import {
  LEAD_DATA_LOADING,
  LEAD_DATA_SUCCESS,
  LEAD_DATA_FAIL,
  
  LeadDispatchTypes,
} from "./identifierStateType";

import { ApiUrl } from "../../../config/apiUrl";
import axios from "axios";



export const getIdentifierData = () => async (
  dispatch: Dispatch<LeadDispatchTypes>
) => {
  try {
    
    
    dispatch({ type: LEAD_DATA_LOADING });
    const res = await axios.post(`${ApiUrl.getLeadDetails}`);
    if (res.status === 200) {
      const { data } = res;
      if (data && data.length) {
        dispatch({
          type: LEAD_DATA_SUCCESS,
          payload: {
            matches: data,
            totalAgents: data.length,
            
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
      type: LEAD_DATA_FAIL,
      payload: { message: err.message },
    });
  }
};
