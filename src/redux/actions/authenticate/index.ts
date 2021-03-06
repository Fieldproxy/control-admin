import { Dispatch } from "redux";
import {
  AuthenticateDispatchTypes,
  LOG_IN_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  LOG_OUT,
  LOG_IN_EXISTING,
} from "./authenticateTypes";
import { ApiUrl } from "../../../config/apiUrl";
import axios from "axios";

type LogInCredI = {
  username: string;
  password: string;
};

export const SignInToPortal = (credentials: LogInCredI) => async (
  dispatch: Dispatch<AuthenticateDispatchTypes>
) => {
  try {
    dispatch({ type: LOG_IN_LOADING });
    const res = await axios.post(ApiUrl.signIn, { ...credentials });
    if (res.status === 200) {
      const { data } = res;
      if (data.status && data.status === "You are admin") {
        localStorage.setItem("controlAdminIn", "logged In");
        dispatch({
          type: LOG_IN_SUCCESS,
          payload: { name: "Admin" },
        });
      } else {
        throw new Error("UnAuthorized Access");
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
        localStorage.removeItem("controlAdminIn");
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

export const logInExistUser = () => (
  dispatch: Dispatch<AuthenticateDispatchTypes>
) => {
  dispatch({
    type: LOG_IN_EXISTING,
  });
};

export const validateError = (message: string) => (
  dispatch: Dispatch<AuthenticateDispatchTypes>
) => {
  dispatch({
    type: LOG_IN_FAIL,
    payload: { message },
  });
};
