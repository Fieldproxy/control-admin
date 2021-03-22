import {
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
  notificationI,
  notiStackTypes,
} from "../actions/notistack/notiStackTypes";

type stateTypes = {
  notifications: notificationI[];
};
const defaultState: stateTypes = {
  notifications: [],
};

const notiStackReducer = (
  state: stateTypes = defaultState,
  action: notiStackTypes
) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
          },
        ],
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.options.key !== action.key
        ),
      };

    default:
      return state;
  }
};

export default notiStackReducer;
