import { Box, Typography } from "@mui/material";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUI } from "../../store/uiStore";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  // ✅ ADD setNotificationPanelOpen
  const { notificationCount, setNotificationPanelOpen } = useUI();

  const navigate = useNavigate();

  const animationDuration = "0.35s";

  // ✅ UPDATED MENU ITEM (supports click)
  const menuItem = (Icon, label, options = {}) => {
    const { badge, onClick } = options;

    return (
      <Box
        onClick={onClick}
        display="flex"
        alignItems="center"
        px={2}
        py={1.3}
        sx={{
          cursor: "pointer",
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            background: "rgba(255,255,255,0.1)",
          },
        }}
      >
        {/* ICON */}
        <Box position="relative" minWidth={24}>
          <Icon sx={{ color: "#fff" }} />

          {/* 🔴 BADGE (Collapsed) */}
          {!expanded && badge > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: -6,
                right: -6,
                background: "red",
                color: "#fff",
                fontSize: 10,
                minWidth: 16,
                height: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              {badge}
            </Box>
          )}
        </Box>

        {/* TEXT */}
        <Box
          sx={{
            ml: 2,
            whiteSpace: "nowrap",
            opacity: expanded ? 1 : 0,
            transform: expanded ? "translateX(0)" : "translateX(-10px)",
            transition: "all 0.3s ease",
            width: expanded ? "auto" : 0,
            overflow: "hidden",
          }}
        >
          <Typography fontSize={14}>{label}</Typography>
        </Box>

        {/* 🔴 BADGE (Expanded) */}
        {expanded && badge > 0 && (
          <Box
            sx={{
              ml: "auto",
              background: "red",
              color: "#fff",
              fontSize: 11,
              px: 1,
              borderRadius: 2,
            }}
          >
            {badge}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      sx={{
        width: expanded ? 240 : 70,
        transition: `width ${animationDuration} cubic-bezier(0.4, 0, 0.2, 1)`,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(180deg, #1f3a93, #2f4db5)",
        color: "#fff",
        p: 1.5,
      }}
    >
      {/* ================= TOP ================= */}
      <Box>
        {/* PROFILE */}
        <Box textAlign="center" mb={2}>
          <Box
            sx={{
              width: expanded ? 70 : 40,
              height: expanded ? 70 : 40,
              borderRadius: "50%",
              background: "#fff",
              margin: "auto",
              transition: animationDuration,
            }}
          />

          <Box
            sx={{
              opacity: expanded ? 1 : 0,
              height: expanded ? "auto" : 0,
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            <Typography mt={1} fontSize={14} fontWeight={500}>
              Spandan Borgohain
            </Typography>
            <Typography fontSize={11} opacity={0.8}>
              Tender Officer
            </Typography>

            <Box mt={2} sx={{ height: 1, background: "rgba(255,255,255,0.2)" }} />
          </Box>
        </Box>

        {/* MENU */}
        <Box
          sx={{
            background: expanded ? "rgba(255,255,255,0.08)" : "transparent",
            borderRadius: 3,
            py: 1,
          }}
        >
          {menuItem(DashboardIcon, "Dashboard", {
            onClick: () => navigate("/dashboard"),
          })}

          {menuItem(QueryStatsIcon, "Activity")}

          {/* 🔥 THIS IS THE MAIN FIX */}
          {menuItem(NotificationsIcon, "Notifications", {
            badge: notificationCount,
            onClick: () => setNotificationPanelOpen(true),
          })}
        </Box>
      </Box>

      {/* ================= BOTTOM ================= */}
      <Box>
        <Box
          sx={{
            background: expanded ? "rgba(255,255,255,0.08)" : "transparent",
            borderRadius: 3,
            py: 1,
          }}
        >
          {menuItem(InfoOutlinedIcon, "Quick Guide")}
          {menuItem(SettingsIcon, "Settings")}
          {menuItem(PersonIcon, "Profile")}
        </Box>

        {/* SIGN OUT */}
        <Box
          mt={2}
          sx={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: 2,
            py: 1.2,
            cursor: "pointer",
            "&:hover": {
              background: "rgba(255,255,255,0.25)",
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent={expanded ? "flex-start" : "center"}
            px={2}
            gap={1}
          >
            <LogoutIcon fontSize="small" />

            <Box
              sx={{
                opacity: expanded ? 1 : 0,
                width: expanded ? "auto" : 0,
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <Typography fontSize={13}>SIGN OUT</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;