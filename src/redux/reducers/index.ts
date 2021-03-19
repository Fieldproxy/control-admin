import { combineReducers } from "redux";
import authenticateReducer from "./authenticate";
import organizationReducer from "./organizations";
import agentDetailReducer from "./agentDetails";
import notiStackReducer from './notistack';


const RootReducer = combineReducers({
  auth: authenticateReducer,
  organizations: organizationReducer,
  agentDetail: agentDetailReducer,
  notiStack: notiStackReducer
});

export type RootStoreI = ReturnType<typeof RootReducer>;

export default RootReducer;
