// src/components/dashboard/TenderSummary.jsx

import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";
import { colors } from "../../styles/theme";

const data = [
  { name: "Issued", value: 100, color: "#6366F1" },
  { name: "In Progress", value: 60, color: "#3B82F6" },
  { name: "Completed", value: 50, color: "#14B8A6" },
  { name: "Awarded", value: 35, color: "#0EA5A4" },
];

const TenderSummary = () => {
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
              data={data}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
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
              245
            </Typography>
          </Box>
        </Box>

        {/* LEGEND */}
        <Box>
          {data.map((item, i) => (
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
                {item.name === "Issued"
                  ? "Tenders Issued"
                  : item.name === "In Progress"
                  ? "Evaluation in Progress"
                  : item.name === "Completed"
                  ? "Evaluation Completed"
                  : "Tender Awarded"}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TenderSummary;