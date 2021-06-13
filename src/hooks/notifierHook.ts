import React from "react";

import {useDispatch} from "react-redux";
import {enqueueSnackbar} from "../redux/actions/notistack";
import {variantI} from "../redux/actions/notistack/notiStackTypes";

export default function useNotifier(key: string) {
  const Dispatch = useDispatch();

  const fireMessage = (message: string, type: variantI) => {
    Dispatch(
      enqueueSnackbar({
        message,
        key,
        options: {
          key,
          variant: type,
        },
      })
    );
  };

  return fireMessage;
}
