import { useState } from "react";
import type { ToastState, ToastStatus } from "../constants/toast";

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    status: "success",
  });

  const openToast = (message: string, status: ToastStatus = "success") => {
    setToast({
      show: true,
      message,
      status,
    });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return {
    toast,
    openToast,
    closeToast,
  };
};
