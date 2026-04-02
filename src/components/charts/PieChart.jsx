import { Box, Typography } from "@mui/material";

const PieChart = ({ totalBidders }) => {
  return (
    <Box
      sx={{
        width: 200,
        height: 200,
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
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontSize={12} color="#6b7280">
          Total Bidders
        </Typography>
        <Typography fontSize={22} fontWeight={600} color="#1e3a8a">
          {totalBidders}
        </Typography>
      </Box>
    </Box>
  );
};

export default PieChart;