import {
  IDENTIFIER_DATA_FAIL,
  IDENTIFIER_DATA_LOADING,
  IDENTIFIER_DATA_SUCCESS,
  identifierStateObject,
  IdentifierDispatchTypes
} from "../actions/identifierstate/identifierStateType";

import { ErrorI } from "../actions/common";

export interface ActionI {
  type: String,
  payload: ErrorI | Array<identifierStateObject>
}

export interface IdentifierStateI {
  loadingIdentifierState : boolean,
  identifiers?: Array<identifierStateObject>,
  error?: ErrorI,
  totalIdentifiers?: number,
  
}

const initialState: IdentifierStateI = {
  loadingIdentifierState: false,
  identifiers: [],
  totalIdentifiers: 0
};

const identifierStateReducer = (
  state: IdentifierStateI = initialState,
  action: IdentifierDispatchTypes
): IdentifierStateI => {
  switch (action.type) {
    case IDENTIFIER_DATA_LOADING:
      return { ...state, loadingIdentifierState: true, error: undefined };
    case IDENTIFIER_DATA_SUCCESS:
      return {
        ...state,
        loadingIdentifierState: false,
        identifiers: action.payload.matches,
        totalIdentifiers: action.payload.total,
        
        error: undefined,
      };
    case IDENTIFIER_DATA_FAIL:
      return { ...initialState, loadingIdentifierState: false, error: action.payload };
    default:
      return state;
  }
};

export default identifierStateReducer;
