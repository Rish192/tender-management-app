import { Box, Typography } from "@mui/material";

const CBATab = () => {
  const bidders = [
    { name: "Bidder 1", price: "₹10,00,000", status: "Qualified" },
    { name: "Bidder 2", price: "₹12,50,000", status: "Disqualified" },
    { name: "Bidder 3", price: "₹9,80,000", status: "Qualified" },
  ];

  return (
    <Box>
      <Typography fontWeight={600} mb={2}>
        Commercial Bid Analysis
      </Typography>

      {/* TABLE HEADER */}
      <Box
        display="flex"
        px={2}
        py={1.5}
        sx={{
          background: "#2F4DB5",
          color: "#fff",
          borderRadius: 2,
          fontSize: 13,
        }}
      >
        <Box flex={2}>Bidder Name</Box>
        <Box flex={2}>Quoted Price</Box>
        <Box flex={1}>Status</Box>
      </Box>

      {/* ROWS */}
      {bidders.map((b, i) => (
        <Box
          key={i}
          display="flex"
          px={2}
          py={1.5}
          sx={{
            background: i % 2 === 0 ? "#f9fafb" : "#fff",
            borderBottom: "1px solid #eee",
          }}
        >
          <Box flex={2}>{b.name}</Box>
          <Box flex={2}>{b.price}</Box>
          <Box flex={1}>{b.status}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default CBATab;