// src/components/common/NotificationPanel.jsx

import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useUI } from "../../store/uiStore";

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
          p: '1.25vw',
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
            top: '-0.8333vw',
            right: '-0.8333vw',
            background: "#ef4444",
            color: "#fff",
            p: '0.4167vw',
            "&:hover": { background: "#dc2626" },
          }}
        >
          <CloseIcon sx={{fontSize: '1.0417vw'}} />
        </IconButton>

        {/* HEADER */}
        <Typography fontSize={'1.0417vw'} fontWeight={600} color="#2F4DB5">
          Notifications
        </Typography>

        <Box
          sx={{
            height: '0.0521vw',
            background: "#cbd5e1",
            my: '0.8333vw',
          }}
        />

        {/* LIST */}
        <Box
          sx={{
            maxHeight: "65vh",
            overflowY: "auto",
            pr: '0.4167vw',
          }}
        >
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.map((n, i) => (
              <NotificationItem
                key={n.notification_id}
                data={n}
                onView={() => onView(n)}
                onClose={() => onCloseItem(n)}
              />
            ))
          ) : (
            <Typography textAlign="center" color="gray" mt={4}>
              No notifications found.
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationPanel;


const NotificationItem = ({ data, onView, onClose }) => {
  
  const { markAsRead } = useUI();

  const isRead = data.status === "READ";

  const handleMarkRead = (e) => {
    e.stopPropagation();
    if (!isRead) {
      markAsRead(data.notification_id);
    }
  };

  return (
    <Box
      sx={{
        background: isRead ? '#f1f5f9' : "#fff",
        border: "1px solid #cbd5e1",
        borderRadius: 2,
        px: '0.8333vw',
        py: '0.625vw',
        mb: '0.625vw',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        opacity: isRead ? 0.7 : 1
      }}
    >
      {/* TEXT */}
      <Typography fontSize={'0.7292vw'} color="#444" flex={1} pr={'0.8333vw'}>
        {data.message}
      </Typography>

      {/* ACTIONS */}
      <Box display="flex" alignItems="center" gap={'0.4167vw'}>

        {/* MARK AS READ */}
        <Typography
          onClick={handleMarkRead}
          sx={{
            fontSize: '0.7292vw',
            px: '0.625vw',
            py: '0.208vw',
            borderRadius: "999px",
            cursor: "pointer",
            borderColor: isRead ? "#22c55e" : "#3b82f6",
            color: isRead ? "#166534" : "#1d4ed8",
            background: isRead ? "#f0fdf4" : "#eff6ff",
            fontWeight: 500,
            "&:hover": {
              background: isRead ? "#f0fdf4" : "#dbeafe",
            }
          }}
        >
          {isRead ? "Read" : "Mark as Read"}
        </Typography>

        {/* VIEW */}
        {data.showView && (
          <IconButton
            size="small"
            onClick={onView}
            sx={{
              width: '1.667vw',
              height: '1.667vw',
              borderRadius: "50%",
              background: "#2F4DB5",
              color: "#fff",
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};