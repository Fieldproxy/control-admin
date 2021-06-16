import { combineReducers } from "redux";
import authenticateReducer from "./authenticate";
import organizationReducer from "./organizations";
import agentDetailReducer from "./agentDetails";
import identifierStateReducer from "./identifierstate";
import leadsReducer from "./leads";
import notiStackReducer from './notistack';
import managerDetailReducer from "./managerdetails";


const RootReducer = combineReducers({
  auth: authenticateReducer,
  organizations: organizationReducer,
  agentDetail: agentDetailReducer,
  managerdetail : managerDetailReducer,
  identifierData :  identifierStateReducer,
  notiStack: notiStackReducer,
  leads:leadsReducer
});

export type RootStoreI = ReturnType<typeof RootReducer>;

export default RootReducer;
