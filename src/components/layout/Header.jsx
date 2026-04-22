// src/components/layout/Header.jsx

import { Box, Typography } from "@mui/material";

const Header = ({ title = "Dashboard - Quick Overview" }) => {
  return (
    <Box mb={'0.8333vw'}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
};

export default Header;