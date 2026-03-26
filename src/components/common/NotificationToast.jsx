// src/components/common/NotificationToast.jsx

import { Snackbar } from "@mui/material";
import { useUI } from "../../store/uiStore";

const NotificationToast = () => {
  const { notification } = useUI();

  return (
    <Snackbar
      open={!!notification}
      message={notification}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    />
  );
};

export default NotificationToast;