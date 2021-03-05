import { Dispatch } from "redux";
import {
  AuthenticateDispatchTypes,
  LOG_IN_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  LOG_OUT,
} from "./authenticateTypes";
import { ApiUrl } from "../../../config/apiUrl";
import axios from "axios";

type LogInCredI = {
  username: string;
  password: string;
};

export const signInToPortal = (credentials: LogInCredI) => async (
  dispatch: Dispatch<AuthenticateDispatchTypes>
) => {
  try {
    dispatch({ type: LOG_IN_LOADING });
    const res = await axios.post(ApiUrl.signIn, { ...credentials });
    if (res.status === 200) {
      const { data } = res;
      if (data.status) {
        dispatch({
          type: LOG_IN_SUCCESS,
          payload: { name: "Admin" },
        });
      } else {
        throw new Error("Status Unverified");
      }
    } else {
      throw new Error("Api Failed");
    }
  } catch (err) {
    dispatch({
      type: LOG_IN_FAIL,
      payload: { message: err.message },
    });
  }
};

export const logOut = () => async (
  dispatch: Dispatch<AuthenticateDispatchTypes>
) => {
  try {
    const res = await axios.post(ApiUrl.signOut, {});
    if (res.status === 200) {
      const { data } = res;
      if (data.status && data.status === "bye") {
        dispatch({
          type: LOG_OUT,
        });
      } else {
        throw new Error("Status Unverified");
      }
    } else {
      throw new Error("Api Failed");
    }
  } catch (err) {
    console.log(err);
  }
};

export const validateError = (message: string) => (
  dispatch: Dispatch<AuthenticateDispatchTypes>
) => {
  dispatch({
    type: LOG_IN_FAIL,
    payload: { message },
  });
};
