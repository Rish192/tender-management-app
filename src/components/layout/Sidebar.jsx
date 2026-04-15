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
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: '0.8333vw',
          py: '0.625vw',
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
        <Box position="relative" sx={{  }}>
          <Icon sx={{ color: "#fff", width: '1.5vw', height: '1.5vw' }} />

          {/* 🔴 BADGE (Collapsed) */}
          {!expanded && badge > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: '-0.4167vw',
                right: '-0.4167vw',
                background: "red",
                color: "#fff",
                fontSize: '0.625vw',
                width: '0.9375vw',
                height: '0.9375vw',
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
            ml: '0.8333vw',
            whiteSpace: "nowrap",
            opacity: expanded ? 1 : 0,
            transform: expanded ? "translateX(0)" : "translateX(-10px)",
            transition: "all 0.3s ease",
            width: expanded ? "auto" : 0,
            overflow: "hidden",
          }}
        >
          <Typography sx={{fontSize: '0.9375vw'}}> {label} </Typography>
        </Box>

        {/* 🔴 BADGE (Expanded) */}
        {expanded && badge > 0 && (
          <Box
            sx={{
              ml: "auto",
              background: "red",
              color: "#fff",
              fontSize: '0.625vw',
              px: '0.5vw',
              py: '0.1vw',
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
        width: expanded ? '14.583vw' : '4.6875vw',
        transition: `width ${animationDuration} cubic-bezier(0.4, 0, 0.2, 1)`,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(180deg, #1f3a93, #2f4db5)",
        color: "#fff",
        p: '0.6250vw',
      }}
    >
      {/* ================= TOP ================= */}
      <Box>
        {/* PROFILE */}
        <Box textAlign="center" mb={'0.8333vw'}>
          <Box
            sx={{
              width: expanded ? '3.9063vw' : '2.2917vw',
              height: expanded ? '3.9063vw' : '2.2917vw',
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
            <Typography mt={'0.4167vw'} fontSize={'0.8333vw'} fontWeight={500}>
              John Doe
            </Typography>
            <Typography fontSize={'0.7292vw'}>
              Tender Officer
            </Typography>

            <Box mt={'0.8333vw'} sx={{ height: '0.0521vw', background: "rgba(255,255,255,1)" }} />
          </Box>
        </Box>

        {/* MENU */}
        <Box
          sx={{
            background: expanded ? "rgba(255,255,255,0.08)" : "transparent",
            borderRadius: 3,
            py: '0.4167vw',
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
            py: '0.4167vw',
          }}
        >
          {menuItem(InfoOutlinedIcon, "Quick Guide")}
          {menuItem(SettingsIcon, "Settings")}
          {menuItem(PersonIcon, "Profile")}
        </Box>

        {/* LOGOUT */}
        <Box
          mt={'0.8333vw'}
          sx={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: 2,
          }}
        >
          {menuItem(LogoutIcon, "Logout", {
            onClick: () => navigate("/"),
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;