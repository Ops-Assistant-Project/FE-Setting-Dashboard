import { Toast, ToastContainer } from "react-bootstrap";
import type { ToastStatus } from "../constants/toast";

type Props = {
  show: boolean;
  message: string;
  status: ToastStatus;
  onClose: () => void;
};

const bgMap: Record<ToastStatus, string> = {
  success: "success",
  warning: "warning",
  error: "danger",
};

export const CommonToast = ({ show, message, status, onClose }: Props) => {
  return (
    <div className="common-toast-wrapper">
      <ToastContainer className="p-3">
        <Toast
          bg={bgMap[status]}
          show={show}
          onClose={onClose}
          delay={3000}
          autohide
          className={`common-toast ${show ? "toast-enter" : "toast-exit"}`}
        >
          <Toast.Body className="text-white">
            {message}
            <button
              className="toast-close-btn"
              onClick={onClose}
              aria-label="닫기"
            >
              ✕
            </button>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};
