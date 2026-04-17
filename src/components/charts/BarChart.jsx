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
          px: '0.8333vw',
        }}
      >
        {/* GRAPH AREA */}
        <Box
          sx={{
            //height: '25.926vh',
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            gap: '1.0417vw',
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
                width: "3vw",
                height: `${d / 15}vh`,
                background: "linear-gradient(#3b82f6, #1d4ed8)",
                borderRadius: '0.3125vw',
              }}
            />
          ))}
        </Box>

        {/* X LABEL */}
        <Typography
          textAlign="center"
          mt={'0.8333vw'}
          fontSize={'0.7292vw'}
          color="#6b7280"
        >
          Bidder Name
        </Typography>

        {/* TITLE */}
        <Typography
          textAlign="center"
          mt={'0.4167vw'}
          fontSize={'0.9375vw'}
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