export const LOG_IN = "LOG_IN";
export const LOG_IN_FAIL = "LOG_IN_FAIL";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_LOADING = "LOG_IN_LOADING";
export const LOG_OUT = "LOG_OUT";
export const LOG_IN_EXISTING = "LOG_IN_EXISTING";

export type ErrorI = {
  message: string;
};

export type UserI = {
  name: string;
};

export interface LogInSuccess {
  type: typeof LOG_IN_SUCCESS;
  payload: UserI;
}

export interface LogInFail {
  type: typeof LOG_IN_FAIL;
  payload: ErrorI;
}

export interface LogInLoading {
  type: typeof LOG_IN_LOADING;
}

export interface LogOut {
  type: typeof LOG_OUT;
}

export interface LOG_IN_EXISTING {
  type: typeof LOG_IN_EXISTING;
}

export type AuthenticateDispatchTypes =
  | LogInSuccess
  | LogInFail
  | LogInLoading
  | LogOut
  | LOG_IN_EXISTING;
