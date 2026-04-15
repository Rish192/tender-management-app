// src/pages/Dashboard.jsx

import { Box, Typography, Button, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../components/layout/Sidebar";
import TenderSummary from "../components/dashboard/TenderSummary";
import TenderTable from "../components/dashboard/TenderTable";
import SearchFilterModal from "../components/modals/SearchFilterModal";
import UploadTenderModal from "../components/modals/UploadTenderModal";
import UploadCbaModal from "../components/modals/UploadCbaModal";
import ChatbotWidget from "../components/common/ChatbotWidget";
import EditTenderModal from "../components/modals/EditTenderModal";
import NotificationToast from "../components/common/NotificationToast";
import TopPriorityTenders from "../components/dashboard/TopPriorityTenders";
import { useEffect } from "react";
import { useTenderStore } from "../store/tenderStore";
import { useUI } from "../store/uiStore";
import { colors } from "../styles/theme";

import { getTenderListAPI } from "../api/tenderApi";

const Dashboard = () => {
  const { setUploadOpen, setSearchOpen } = useUI();
  const { setTenders, updateTender } = useTenderStore();



  useEffect(() => {
    const loadTenders = async () => {
      try {
        const data = await getTenderListAPI();
        setTenders(data || []); // ✅ correct usage
      } catch (err) {
        console.error("Failed to Fetch:", err);
      }
    };

    loadTenders();

    const interval = setInterval(() => {
      loadTenders();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [setTenders, updateTender]);

  return (
    <Box display="flex" height="100vh" overflow="hidden">
      <Sidebar />

      {/* MAIN CONTENT */}
      <Box flex={1} bgcolor={colors.background} overflow="auto">
        <Box maxWidth="1200px" mx="auto" px={3} py={3}>

          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography fontSize={22} fontWeight={600}>
              Dashboard - Quick Overview
            </Typography>

            <Button
              onClick={() => setUploadOpen(true)}
              sx={{
                background: colors.primary,
                color: "#fff",
                textTransform: "none",
                px: 3,
              }}
            >
              Add Tender +
            </Button>
          </Box>

          {/* TOP SECTION */}
          <Box display="flex" gap={4} alignItems="center" mb={4}>
            <TenderSummary />

            <Box
              sx={{
                width: "1px",
                height: 180,
                background: colors.line,
              }}
            />

            <TopPriorityTenders />
          </Box>

          {/* TENDER LIST */}
          <Box mt={5}>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight={600}>Tender List</Typography>

              {/* SEARCH CAPSULE */}
              <Box
                onClick={() => setSearchOpen(true)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background: "#f5f6fa",
                  borderRadius: "12px",
                  px: 2,
                  py: 0.8,
                  width: 280,
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  transition: "0.2s",
                  "&:hover": {
                    boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <SearchIcon
                  sx={{
                    fontSize: 18,
                    color: "#6b7280",
                  }}
                />

                <InputBase
                  placeholder="Search By Tender No. / Subject"
                  sx={{
                    ml: 1,
                    fontSize: 13,
                    color: "#555",
                    width: "100%",
                    cursor: "pointer",
                    "& input::placeholder": {
                      color: "#9ca3af",
                      opacity: 1,
                    },
                  }}
                  readOnly
                />
              </Box>
            </Box>

            <Box sx={{ height: 1, background: colors.line, my: 1 }} />

            <TenderTable />
          </Box>
        </Box>

        {/* MODALS & GLOBAL COMPONENTS */}
        <SearchFilterModal />
        <UploadTenderModal />
        <EditTenderModal />
        <UploadCbaModal />
        <NotificationToast />
        <ChatbotWidget />
      </Box>
    </Box>
  );
};

export default Dashboard;