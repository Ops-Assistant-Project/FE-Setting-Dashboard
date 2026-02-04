export type ToastStatus = "success" | "warning" | "error";

export interface ToastState {
  show: boolean;
  message: string;
  status: ToastStatus;
}

export type ToastController = {
  openToast: (message: string, status?: ToastStatus) => void;
};
