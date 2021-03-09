import { combineReducers } from "redux";
import authenticateReducer from "./authenticate";
import dashboardReducer from "./dashboard";
import agentDetailReducer from "./agentDetails";

const RootReducer = combineReducers({
  auth: authenticateReducer,
  dashboard: dashboardReducer,
  agentDetail: agentDetailReducer,
});

export type RootStoreI = ReturnType<typeof RootReducer>;

export default RootReducer;
