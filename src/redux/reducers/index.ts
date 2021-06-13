import {combineReducers} from "redux";
import authenticateReducer from "./authenticate";
import organizationReducer from "./organizations";
import agentDetailReducer from "./agentDetails";
import identifierStateReducer from "./identifierstate";
import leadsReducer from "./leads";
import notiStackReducer from "./notistack";
import workflowAndTaskListReducer from "./workflowsAndTaskList";

const RootReducer = combineReducers({
  auth: authenticateReducer,
  organizations: organizationReducer,
  agentDetail: agentDetailReducer,
  identifierData: identifierStateReducer,
  notiStack: notiStackReducer,
  leads: leadsReducer,
  workflowsAndTaskList: workflowAndTaskListReducer,
});

export type RootStoreI = ReturnType<typeof RootReducer>;

export default RootReducer;
