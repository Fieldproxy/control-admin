import {
  ManagerDetailDispatchTypes,
  MANAGER_DETAIL_FAIL,
  MANAGER_DETAIL_LOADING,
  MANAGER_DETAIL_SUCCESS,
  userDetailI,
} from "../actions/managerdetails/managerdetail";

import { ErrorI } from "../actions/common";

export interface ManagerDetailI {
  loadingManagerDetail: boolean;
  userData: userDetailI[];
  error: ErrorI;
}

const initialState: ManagerDetailI = {
  loadingManagerDetail: false,
  userData: [],
  error: { message: "" },
};

const managerDetailReducer = (
  state: ManagerDetailI = initialState,
  action: ManagerDetailDispatchTypes
): ManagerDetailI => {
  switch (action.type) {
    case MANAGER_DETAIL_LOADING:
      return { ...state, loadingManagerDetail: true };
    case MANAGER_DETAIL_FAIL:
      return { ...initialState, error: action.error };
    case MANAGER_DETAIL_SUCCESS:
      return { ...state, loadingManagerDetail: false, userData: action.payload.userDetail };
    default:
      return state;
  }
};

export default managerDetailReducer;
