import {
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
  notiStackTypes,
  notificationI,
  KeyI,
} from "./notiStackTypes";
import { Dispatch } from "redux";

export const enqueueSnackbar = (notification: notificationI) => (
  dispatch: Dispatch<notiStackTypes>
) => {
  const key = notification.options && notification.options.key;
  dispatch({
    type: ENQUEUE_SNACKBAR,
    key: key || new Date().getTime() + Math.random(),
    notification: {
      ...notification,
    },
  });
};

export const closeSnackbar = (key?: KeyI) => (
  dispatch: Dispatch<notiStackTypes>
) => {
  dispatch({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key: key,
  });
};

export const removeSnackbar = (key: KeyI) => (
  dispatch: Dispatch<notiStackTypes>
) => {
  dispatch({
    type: REMOVE_SNACKBAR,
    key,
  });
};
