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
      SAVED_DRAFT: list.filter(t => t.tender_status === "Saved Draft").length,
      SENT_FOR_CHECKING: list.filter(t => t.tender_status === "Sent for Checking").length,
      BID_DONE: list.filter(t => t.tender_status === "Ready to Validate").length,
      RFP_Completed: list.filter(t => t.tender_status === "RFP Completed").length,
    };
    return [
      { name: "RFP Completed", value: counts.RFP_Completed, color: "#0EA5E9", label: "RFP Completed" },
      { name: "Drafts", value: counts.SAVED_DRAFT, color: "#6366F1", label: "Saved Drafts" },
      { name: "Bid Done", value: counts.BID_DONE, color: "#14B8A6", label: "Ready to Validate" },
      { name: "Checking", value: counts.SENT_FOR_CHECKING, color: "#3B82F6", label: "Sent for Checking" },
    ];
  }, [tenders]);

  const totalTenders = tenders?.length || 0;
  return (
    <Box sx={{width: '50vw'}}>
      {/* TITLE */}
      <Typography sx={{fontSize: '1.0417vw', fontWeight: 600}}>Tender Summary</Typography>

      <Box sx={{ height: '0.4167vw',my: '0.4167vw' }} />

      {/* CONTENT */}
      <Box display="flex" alignItems="center" gap={'1.667vw'}>
        {/* DONUT CHART */}
        <Box position="relative">
          <PieChart width={'10.417vw'} height={'10.417vw'}>
            <Pie
              data={summaryData}
              innerRadius={50}
              outerRadius={70}
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
            <Typography fontSize={'0.625vw'} color={colors.textSecondary}>
              TOTAL TENDERS
            </Typography>
            <Typography fontWeight={700} fontSize={'0.9375vw'}>
              {totalTenders}
            </Typography>
          </Box>
        </Box>

        {/* LEGEND */}
        <Box>
          {summaryData.map((item, i) => (
            <Box key={i} display="flex" alignItems="center" gap={'0.8333vw'} mb={'0.625vw'}>
              <Box
                sx={{
                  width: '0.5208vw',
                  height: '0.5208vw',
                  borderRadius: "50%",
                  background: item.color,
                }}
              />
              <Typography fontSize={'0.8333vw'}>
                {item.value} - {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TenderSummary;