// src/components/common/PDFPreview.jsx

import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PDFPreview = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "40%",
        height: "100vh",
        background: "#eaf1f6",
        boxShadow: "-10px 0 40px rgba(0,0,0,0.3)",
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Typography fontWeight={600} fontSize={18}>
          Preview Window
        </Typography>

        <IconButton onClick={onClose} sx={{ background: "#ef4444", color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* PDF */}
      <Box flex={1} px={2}>
        <iframe src="/sample.pdf" width="100%" height="100%" />
      </Box>

      {/* FOOTER */}
      <Box p={2}>
        <Box
          sx={{
            background: "#2F4DB5",
            color: "#fff",
            textAlign: "center",
            py: 1,
            borderRadius: 2,
          }}
        >
          RFP.pdf
        </Box>
      </Box>
    </Box>
  );
};

export default PDFPreview;