import { combineReducers } from "redux";
import authenticateReducer from "./authenticate";
import dashboardReducer from "./dashboard";
import agentDetailReducer from "./agentDetails";
import identifierStateReducer from "./identifierstate";

const RootReducer = combineReducers({
  auth: authenticateReducer,
  dashboard: dashboardReducer,
  agentDetail: agentDetailReducer,
  identifierData :  identifierStateReducer
});

export type RootStoreI = ReturnType<typeof RootReducer>;

export default RootReducer;
