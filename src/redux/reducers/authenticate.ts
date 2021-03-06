import {
  LOG_IN_SUCCESS,
  LOG_IN_LOADING,
  LOG_IN_FAIL,
  LOG_IN_EXISTING,
  LOG_OUT,
  ErrorI,
  UserI,
  AuthenticateDispatchTypes,
} from "../actions/authenticate/authenticateTypes";
export interface ActionI {
  type: String;
  payload: ErrorI | UserI;
}

const initialState: AuthenticateI = {
  loadingLogIn: false,
  isLoggedIn: false,
  user: { name: "" },
  error: { message: "" },
};

export interface AuthenticateI {
  loadingLogIn: boolean;
  isLoggedIn: boolean;
  user: UserI;
  error?: ErrorI;
}

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
