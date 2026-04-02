import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import OverviewTab from "../components/tender/OverviewTab";
import CBATab from "../components/tender/CBATab";
import ComparativeTab from "../components/tender/ComparativeTab";
import { colors } from "../styles/theme";
import { useParams } from "react-router-dom";
import { useTenderStore } from "../store/tenderStore";
import ChatbotWidget from "../components/common/ChatbotWidget";

const TenderOverview = () => {
  const [tab, setTab] = useState("overview");

  const { id } = useParams();
  const { tenders } = useTenderStore();

  const tender = tenders?.find((t) => String(t.tender_id) === id);

  return (
    <Box display="flex" height="100vh">
      <Sidebar />

      {/* ✅ MAIN CONTENT WRAPPER (IMPORTANT) */}
      <Box flex={1} p={3} pt={2} bgcolor={colors.background} minWidth={0}>

        {/* ✅ HEADER + TABS (SAME ROW) */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          
          {/* LEFT SIDE */}
          <Box>
            <Typography fontSize={22} fontWeight={600}>
              Dashboard - Tender Details
            </Typography>

            <Typography mt={0.5} color="#666" fontSize={14}>
              {tender?.name || "Tender not found"}
            </Typography>
          </Box>

          {/* RIGHT SIDE TABS */}
          <Box
            sx={{
              background: "#e5e7eb",
              borderRadius: "12px",
              display: "inline-flex",
              p: "4px",
              gap: "4px",
            }}
          >
            <TabButton
              active={tab === "overview"}
              onClick={() => setTab("overview")}
              label="Overview"
            />

            <TabButton
              active={tab === "cba"}
              onClick={() => setTab("cba")}
              label="Commercial Bid Analysis"
            />

            <TabButton
              active={tab === "cs"}
              onClick={() => setTab("cs")}
              label="Comparative Statement"
            />
          </Box>

        </Box>

        {/* TAB CONTENT */}
        <Box mt={3}>
          {tab === "overview" && <OverviewTab tender={tender} />}
          {tab === "cba" && <CBATab />}
          {tab === "cs" && <ComparativeTab />}
        </Box>

      </Box>

      {/* ✅ CHATBOT (OUTSIDE MAIN CONTENT) */}
      <ChatbotWidget />
    </Box>
  );
};

export default TenderOverview;


/* ================= TAB BUTTON ================= */

const TabButton = ({ active, label, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        px: 2.5,
        py: 1,
        borderRadius: "8px",
        cursor: "pointer",
        background: active ? "#2F4DB5" : "transparent",
        color: active ? "#fff" : "#1e3a8a",
        fontSize: "13px",
        fontWeight: 500,
        transition: "0.2s",
        whiteSpace: "nowrap",
        "&:hover": {
          background: active ? "#2F4DB5" : "#d1d5db",
        },
      }}
    >
      {label}
    </Box>
  );
};