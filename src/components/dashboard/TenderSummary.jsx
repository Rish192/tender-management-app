// src/components/dashboard/TenderSummary.jsx

import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";
import { colors } from "../../styles/theme";
import { useTenderStore } from "../../store/tenderStore";
import { useMemo } from "react";

const TenderSummary = () => {
  const { tenders } = useTenderStore();

  const summaryData = useMemo(() => {
    const list = Array.isArray(tenders) ? tenders : [];
    const counts = {
      DRAFT_SAVED: list.filter(t => t.tender_status === "DRAFT_SAVED").length,
      SENT_FOR_CHECKING: list.filter(t => t.tender_status === "SENT_FOR_CHECKING").length,
      BID_DONE: list.filter(t => t.tender_status === "BID_DONE").length,
      RFP_DONE: list.filter(t => t.tender_status === "RFP_DONE").length,
    };
    return [
      { name: "RFP Done", value: counts.RFP_DONE, color: "#0EA5E9", label: "RFP Completed" },
      { name: "Drafts", value: counts.DRAFT_SAVED, color: "#6366F1", label: "Draft Saved" },
      { name: "Bid Done", value: counts.BID_DONE, color: "#14B8A6", label: "Bid Evaluation Done" },
      { name: "Checking", value: counts.SENT_FOR_CHECKING, color: "#3B82F6", label: "Sent for Checking" },
    ];
  }, [tenders]);

  const totalTenders = tenders?.length || 0;
  return (
    <Box width={420}>
      {/* TITLE */}
      <Typography fontWeight={600}>Tender Summary</Typography>

      <Box sx={{ height: 1, background: colors.line, my: 1 }} />

      {/* CONTENT */}
      <Box display="flex" alignItems="center" gap={3}>
        {/* DONUT CHART */}
        <Box position="relative">
          <PieChart width={180} height={180}>
            <Pie
              data={summaryData}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
            >
              {summaryData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>

          {/* CENTER TEXT */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{ transform: "translate(-50%, -50%)" }}
            textAlign="center"
          >
            <Typography fontSize={12} color={colors.textSecondary}>
              TOTAL TENDERS
            </Typography>
            <Typography fontWeight={700} fontSize={18}>
              {totalTenders}
            </Typography>
          </Box>
        </Box>

        {/* LEGEND */}
        <Box>
          {summaryData.map((item, i) => (
            <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: item.color,
                }}
              />
              <Typography fontSize={13}>
                {item.value} - {item.label}
                {/* {item.name === "Issued"
                  ? "Tenders Issued"
                  : item.name === "In Progress"
                  ? "Evaluation in Progress"
                  : item.name === "Completed"
                  ? "Evaluation Completed"
                  : "Tender Awarded"} */}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TenderSummary;