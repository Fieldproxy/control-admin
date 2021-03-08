import {
  LOG_IN_SUCCESS,
  LOG_IN_LOADING,
  LOG_IN_FAIL,
  LOG_IN_EXISTING,
  LOG_OUT,
  UserI,
  AuthenticateDispatchTypes,
} from "../actions/authenticate/authenticateTypes";

import { ErrorI } from '../actions/common'
export interface ActionI {
  type: String;
  payload: ErrorI | UserI;
}
export interface AuthenticateI {
  loadingLogIn: boolean;
  isLoggedIn: boolean;
  user: UserI;
  error?: ErrorI;
}

const initialState: AuthenticateI = {
  loadingLogIn: false,
  isLoggedIn: false,
  user: { name: "" },
  error: { message: "" },
};

const authenticateReducer = (
  state: AuthenticateI = initialState,
  action: AuthenticateDispatchTypes
): AuthenticateI => {
  switch (action.type) {
    case LOG_IN_LOADING: {
      return { ...state, loadingLogIn: true };
    }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loadingLogIn: false,
        isLoggedIn: true,
        user: action.payload,
        error: { message: "" },
      };
    case LOG_IN_FAIL:
      return { ...state, loadingLogIn: false, error: action.payload };
    case LOG_OUT:
      return initialState;
    case LOG_IN_EXISTING:
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
};

export default authenticateReducer;
