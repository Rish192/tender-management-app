import { Box, Typography } from "@mui/material";

const PieChart = ({ totalBidders }) => {
  return (
    <Box
      sx={{
        width: '10.417vw',
        height: '10.417vw',
        borderRadius: "50%",
        background:
          "conic-gradient(#2F4DB5 55%, #14b8a6 30%, #0ea5e9 15%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* INNER */}
      <Box
        sx={{
          width: '6.250vw',
          height: '6.250vw',
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontSize={'0.625vw'} color="#6b7280">
          Total Bidders
        </Typography>
        <Typography fontSize={'1.0417vw'} fontWeight={600} color="#1e3a8a">
          {totalBidders}
        </Typography>
      </Box>
    </Box>
  );
};

export default PieChart;