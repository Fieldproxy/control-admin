import {ErrorI} from "../actions/common";
import {
  taskI,
  workflowI,
  WORKFLOW_TASK_LIST_FAIL,
  WORKFLOW_TASK_LIST_SUCCESS,
  WORKFLOW_TASK_LIST_LOADING,
  WorkflowAndTaskListDispatchTypes,
} from "../actions/organizations/organizationTypes";

export interface workflowsAndTaskListI {
  loadingWorkflowsAndTaskList: boolean;
  workflows: workflowI[];
  tasks: taskI[];
  error: ErrorI;
}

const initialState: workflowsAndTaskListI = {
  loadingWorkflowsAndTaskList: false,
  workflows: [],
  tasks: [],
  error: {message: ""},
};

const workflowAndTaskListReducer = (
  state: workflowsAndTaskListI = initialState,
  action: WorkflowAndTaskListDispatchTypes
): workflowsAndTaskListI => {
  switch (action.type) {
    case WORKFLOW_TASK_LIST_LOADING:
      return {...state, loadingWorkflowsAndTaskList: true};
    case WORKFLOW_TASK_LIST_SUCCESS:
      return {
        ...state,
        loadingWorkflowsAndTaskList: false,
        error: {message: ""},
        workflows: action.payload.workflows,
        tasks: action.payload.tasks,
      };
    case WORKFLOW_TASK_LIST_FAIL:
      return {...state, loadingWorkflowsAndTaskList: false, error: action.error};
    default:
      return state;
  }
};

export default workflowAndTaskListReducer;
