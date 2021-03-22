
export const ENQUEUE_SNACKBAR = "ENQUEUE_SNACKBAR";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";
export const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";

export type KeyI = string | number;

export type notificationI = {
  message: string;
  key: KeyI;
  dismissed?:boolean;
  options: {
    key: KeyI;
    variant: "warning" | "success" | "info" | "error" | "default";
    // action: ReactNode;
    // onClose?: (
    //   event: React.ChangeEvent<{}>,
    //   reason: string,
    //   myKey: KeyI
    // ) => void;
  }; 
};

export interface enqueueSnackbar {
  type: typeof ENQUEUE_SNACKBAR;
  notification: notificationI;
  key: KeyI;
}

export interface closeSnackbar {
  type: typeof CLOSE_SNACKBAR;
  dismissAll: boolean;
  key?: KeyI;
}

export interface removeSnackbar {
  type: typeof REMOVE_SNACKBAR;
  key: KeyI;
}

export type notiStackTypes = enqueueSnackbar | closeSnackbar | removeSnackbar;
