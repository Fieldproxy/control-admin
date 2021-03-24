import { combineReducers } from "redux";
import authenticateReducer from "./authenticate";
import organizationReducer from "./organizations";
import agentDetailReducer from "./agentDetails";
import identifierStateReducer from "./identifierstate";
import leadsReducer from "./leads";
import notiStackReducer from './notistack';


const RootReducer = combineReducers({
  auth: authenticateReducer,
  organizations: organizationReducer,
  agentDetail: agentDetailReducer,
  identifierData :  identifierStateReducer,
  notiStack: notiStackReducer,
  leads:leadsReducer
});

export type RootStoreI = ReturnType<typeof RootReducer>;

export default RootReducer;
