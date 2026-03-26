// src/components/common/NotificationPanel.jsx

import {
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

const NotificationPanel = ({
  open,
  onClose,
  notifications = [],
  onView,
  onCloseItem,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "75%",
          maxHeight: "85vh",
          background: "#eaf1f6",
          borderRadius: 3,
          p: 3,
          margin: "80px auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          position: "relative",
        }}
      >
        {/* CLOSE BUTTON */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: -15,
            right: -15,
            background: "#ef4444",
            color: "#fff",
            "&:hover": { background: "#dc2626" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* HEADER */}
        <Typography fontSize={20} fontWeight={600} color="#2F4DB5">
          Notifications
        </Typography>

        <Box
          sx={{
            height: "1px",
            background: "#cbd5e1",
            my: 2,
          }}
        />

        {/* LIST */}
        <Box
          sx={{
            maxHeight: "65vh",
            overflowY: "auto",
            pr: 1,
          }}
        >
          {notifications.map((n, i) => (
            <NotificationItem
              key={i}
              data={n}
              onView={() => onView(n)}
              onClose={() => onCloseItem(n)}
            />
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationPanel;


/* ================= ITEM ================= */

const NotificationItem = ({ data, onView, onClose }) => {
  return (
    <Box
      sx={{
        background: "#f8fafc",
        border: "1px solid #cbd5e1",
        borderRadius: 2,
        px: 2,
        py: 1.5,
        mb: 1.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* TEXT */}
      <Typography fontSize={13} color="#444" flex={1} pr={2}>
        {data.message}
      </Typography>

      {/* ACTIONS */}
      <Box display="flex" gap={1}>
        {/* VIEW */}
        {data.showView && (
          <IconButton
            size="small"
            onClick={onView}
            sx={{
              background: "#2F4DB5",
              color: "#fff",
              "&:hover": { background: "#1e3a8a" },
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        )}

        {/* CLOSE */}
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            background: "#fecaca",
            color: "#7f1d1d",
          }}
        >
          ✕
        </IconButton>
      </Box>
    </Box>
  );
};