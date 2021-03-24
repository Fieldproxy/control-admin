import {
  LEAD_DATA_FAIL,
  LEAD_DATA_LOADING,
  LEAD_DATA_SUCCESS,
  leadObject,
  LeadDispatchTypes
} from "../actions/leads/identifierStateType";

import { ErrorI } from "../actions/common";

export interface ActionI {
  type: String,
  payload: ErrorI | Array<leadObject>
}

export interface IdentifierStateI {
  loadingIdentifierState : boolean,
  leads?: Array<leadObject>,
  error?: ErrorI,
  totalIdentifiers?: number,
  
}

const initialState: IdentifierStateI = {
  loadingIdentifierState: false,
  leads: [],
  totalIdentifiers: 0
};

const identifierStateReducer = (
  state: IdentifierStateI = initialState,
  action: LeadDispatchTypes
): IdentifierStateI => {
  console.log(action)
  switch (action.type) {
    case LEAD_DATA_LOADING:
      return { ...state, loadingIdentifierState: true, error: undefined };
    case LEAD_DATA_SUCCESS:
      return {
        ...state,
        loadingIdentifierState: false,
        leads: action.payload.matches,
        totalIdentifiers: action.payload.total,
        
        error: undefined,
      };
    case LEAD_DATA_FAIL:
      return { ...initialState, loadingIdentifierState: false, error: action.payload };
    default:
      return state;
  }
};

export default identifierStateReducer;
