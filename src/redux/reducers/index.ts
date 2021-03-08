import { combineReducers } from "redux";
import authenticateReducer from "./authenticate";
import dashboardReducer from "./dashboard";

const RootReducer = combineReducers({
  auth: authenticateReducer,
  dashboard: dashboardReducer,
});

export type RootStoreI = ReturnType<typeof RootReducer>;

export default RootReducer;
