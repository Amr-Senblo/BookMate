import { toast } from "react-toastify";

export const loadingToastStyle = {
  position: toast.POSITION.TOP_CENTER,
  style: {
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  closeButton: true,
};

export const updateToSuccessToastStyle = {
  render: "",
  type: "success",
  isLoading: false,
  autoClose: 2000,
};

export const updateToErrorToastStyle = {
  render: "",
  type: "error",
  isLoading: false,
  autoClose: 2000,
};
