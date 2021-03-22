import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { removeSnackbar } from "../redux/actions/notistack";
import { RootStoreI } from "../redux/reducers";

type keyType = string | number;

let displayed: keyType[] = [];

const Notifier = () => {
  const dispatch = useDispatch();
  const storeEmitter = (state: RootStoreI) => state.notiStack;
  const { notifications } = useSelector(storeEmitter);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: keyType) => {
    displayed = [...displayed, id];
  };
 
  const removeDisplayed = (id: keyType) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          //   onClose: (event, reason, myKey) => {
          //     if (options.onClose) {
          //       options.onClose(event, reason, myKey);
          //     }
          //   }, 
          onExited: (event, myKey) => {
            dispatch(removeSnackbar(myKey));
            removeDisplayed(myKey);
          },
        });
        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;
