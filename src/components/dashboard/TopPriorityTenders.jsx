// src/components/dashboard/TopPriorityTenders.jsx

import { Box, Typography, Button } from "@mui/material";
import { colors } from "../../styles/theme";

const TopPriorityTenders = () => {
  return (
    <Box flex={1}>
      {/* TITLE */}
      <Typography fontWeight={600}>Top Priority Tenders</Typography>

      <Box sx={{ height: 1, background: colors.line, my: 1 }} />

      {/* CARDS */}
      <Box display="flex" gap={3}>
        {[1, 2, 3].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 200,
              background: "#eef2f7",
              borderRadius: 3,
              p: 2,
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                background: "#2F4DB5",
                color: "#fff",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: 12,
                mb: 1,
              }}
            >
              #BID564654
            </Box>

            {/* CONTENT */}
            <Typography fontSize={13}>
              <b>Subject</b> &nbsp; This is Subject
            </Typography>

            <Typography fontSize={13}>
              <b>TAT</b> &nbsp; 5 Days
            </Typography>

            <Typography fontSize={13}>
              <b>Validity</b> &nbsp; 3 Days
            </Typography>

            {/* BUTTON */}
            <Button
              fullWidth
              sx={{
                mt: 1.5,
                background: "#2F4DB5",
                color: "#fff",
                textTransform: "none",
                fontSize: 12,
              }}
            >
              View Tender
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopPriorityTenders;