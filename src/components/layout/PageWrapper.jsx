// src/components/layout/PageWrapper.jsx

import { Box } from "@mui/material";

const PageWrapper = ({ children }) => {
  return (
    <Box p={'1.25vw'} width="100%">
      {children}
    </Box>
  );
};

export default PageWrapper;