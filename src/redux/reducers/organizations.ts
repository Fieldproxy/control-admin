import {
  COMP_DATA_FAIL,
  COMP_DATA_LOADING,
  COMP_DATA_SUCCESS,
  compDataI,
  companyDetailI,
  COMP_DETAIL_FAIL,
  COMP_DETAIL_LOADING,
  COMP_DETAIL_SUCCESS,
  OrganizationDispatchTypes,
} from "../actions/organizations/organizationTypes";

import {ErrorI} from "../actions/common";

export interface ActionI {
  type: String;
  payload: ErrorI | Array<compDataI>;
}

export interface dashboardI {
  loadingCompData: boolean;
  compData?: Array<compDataI>;
  error?: ErrorI;
  totalAgents: number;
  totalOrganizations: number;
  loadingCompanyDetail: boolean;
  compDetailError?: ErrorI;
  compDetail?: companyDetailI;
}

const initialState: dashboardI = {
  loadingCompData: false,
  compData: [],
  totalAgents: 0,
  totalOrganizations: 0,
  error: undefined,
  loadingCompanyDetail: false,
  compDetail: undefined,
  compDetailError: undefined,
};

const dashboardReducer = (
  state: dashboardI = initialState,
  action: OrganizationDispatchTypes
): dashboardI => {
  switch (action.type) {
    case COMP_DATA_LOADING:
      return {...state, loadingCompData: true, error: undefined};
    case COMP_DATA_SUCCESS:
      return {
        ...state,
        loadingCompData: false,
        compData: action.payload.compData,
        totalAgents: action.payload.totalAgents,
        totalOrganizations: action.payload.totalOrganizations,
        error: undefined,
      };
    case COMP_DATA_FAIL:
      return {...initialState, loadingCompData: false};
    case COMP_DETAIL_LOADING:
      return {
        ...state,
        loadingCompanyDetail: true,
        compDetailError: undefined,
      };
    case COMP_DETAIL_SUCCESS:
      return {
        ...state,
        loadingCompanyDetail: false,
        compDetailError: undefined,
        compDetail: action.payload.data,
      };
    case COMP_DETAIL_FAIL:
      return {
        ...state,
        loadingCompanyDetail: false,
        compDetailError: action.payload,
        compDetail: undefined,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
