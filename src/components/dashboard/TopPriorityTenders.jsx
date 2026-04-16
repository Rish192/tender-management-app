// src/components/dashboard/TopPriorityTenders.jsx

import { Box, Typography, Button } from "@mui/material";
import { colors } from "../../styles/theme";

const TopPriorityTenders = () => {
  return (
    <Box sx={{width: '50vw'}}>
      {/* TITLE */}
      <Typography sx={{fontSize: '1.0417vw', fontWeight: 600}}>Top Priority Tenders</Typography>

      <Box sx={{ height: '0.4167vw',my: '0.4167vw' }} />

      {/* CARDS */}
      <Box display="flex" gap={'1.667vw'} sx={{width: '100%', overflow: 'hidden'}}>
        {[1, 2, 3].map((_, i) => (
          <Box
            key={i}
            sx={{
              flex: '1',
              background: "#eef2f7",
              borderRadius: 3,
              p: '0.8333vw',
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                background: "#2F4DB5",
                color: "#fff",
                px: '0.625vw',
                py: '0.4167vw',
                borderRadius: 1,
                fontSize: '0.625vw',
                mb: '0.4167vw',
              }}
            >
              #BID564654
            </Box>

            {/* CONTENT */}
            <Typography fontSize={'0.7292vw'}>
              <b>Subject</b> &nbsp; This is Subject
            </Typography>

            <Typography fontSize={'0.7292vw'}>
              <b>TAT</b> &nbsp; 5 Days
            </Typography>

            <Typography fontSize={'0.7292vw'}>
              <b>Validity</b> &nbsp; 3 Days
            </Typography>

            {/* BUTTON */}
            <Button
              fullWidth
              sx={{
                mt: '0.625vw',
                background: "#2F4DB5",
                color: "#fff",
                textTransform: "none",
                fontSize: '0.7292vw',
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