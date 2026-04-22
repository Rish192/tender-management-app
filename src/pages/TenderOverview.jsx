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
    <Box display="flex" height="100vh" overflow="hidden">
      <Sidebar />

      {/* ✅ MAIN CONTENT WRAPPER (IMPORTANT) */}
      <Box bgcolor={colors.background}
        sx={{display: 'flex', flex: 1, flexDirection: 'column',
          p: '1.25vw', pt: '0.8333vw', minWidth: 0,
          overflow: 'hidden', height: '100%', border: '1px solid green'
          // scrollbarWidth: 'thin',
          // '&::-webkit-scrollbar': { width: '0.2083vw' },
          // '&::-webkit-scrollbar-track': { background: 'transparent' },
          // '&::-webkit-scrollbar-thumb': { borderRadius: '3px' },
          // scrollbarColor: '#5fb2e2ff transparent'
      }}>

        {/* ✅ HEADER + TABS (SAME ROW) */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          
          {/* LEFT SIDE */}
          <Box>
            <Typography fontSize={'1.25vw'} fontWeight={600}>
              Dashboard - Tender Details
            </Typography>

            {/* <Typography mt={0.5} color="#666" fontSize={14}>
              {tender?.tender_name || "Tender not found"}
            </Typography> */}
          </Box>

          {/* RIGHT SIDE TABS */}
          <Box
            sx={{
              background: "#e5e7eb",
              borderRadius: "12px",
              display: "inline-flex",
              p: "0.2083vw",
              gap: "0.2083vw",
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
        <Box mt={'1.25vw'} sx={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column'}}>
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
        px: '1.25vw',
        py: '0.4167vw',
        borderRadius: "8px",
        cursor: "pointer",
        background: active ? "#2F4DB5" : "transparent",
        color: active ? "#fff" : "#1e3a8a",
        fontSize: "0.8333vw",
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