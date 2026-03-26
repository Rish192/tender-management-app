import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ChartModal from "./ChartModal";

const BarChart = ({ title }) => {
  const [open, setOpen] = useState(false);

  const data = [520, 480, 220, 300];

  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        sx={{
          flex: 1,
          cursor: "pointer",
          px: 2,
        }}
      >
        {/* GRAPH AREA */}
        <Box
          sx={{
            height: 180,
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            gap: 2,
          }}
        >
          {/* RED THRESHOLD LINE */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              borderTop: "2px dashed red",
              opacity: 0.6,
            }}
          />

          {/* BARS */}
          {data.map((d, i) => (
            <Box
              key={i}
              sx={{
                width: 30,
                height: d / 3,
                background: "linear-gradient(#3b82f6, #1d4ed8)",
                borderRadius: "6px",
              }}
            />
          ))}
        </Box>

        {/* X LABEL */}
        <Typography
          textAlign="center"
          mt={1}
          fontSize={12}
          color="#6b7280"
        >
          Bidder Name
        </Typography>

        {/* TITLE */}
        <Typography
          textAlign="center"
          mt={1}
          fontSize={14}
          fontWeight={600}
          color="#1e3a8a"
        >
          {title}
        </Typography>
      </Box>

      <ChartModal open={open} onClose={() => setOpen(false)} title={title} />
    </>
  );
};

export default BarChart;