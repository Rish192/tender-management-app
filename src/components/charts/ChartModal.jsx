import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ChartModal = ({ open, onClose, title }) => {
  const data = [520, 480, 220, 300, 600, 450, 520, 480];

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "85%",
          height: "80vh",
          background: "#eef2f7",
          borderRadius: "20px",
          p: 4,
          margin: "40px auto",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* ❌ CLOSE BUTTON */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: -15,
            right: -15,
            background: "#ef4444",
            color: "#fff",
            width: 36,
            height: 36,
            "&:hover": { background: "#dc2626" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* TITLE */}
        <Typography
          fontSize={18}
          fontWeight={600}
          color="#1e3a8a"
          mb={2}
        >
          {title}
        </Typography>

        {/* GRAPH AREA */}
        <Box
          sx={{
            height: "60%",
            display: "flex",
            alignItems: "flex-end",
            gap: 3,
            borderLeft: "2px solid #9ca3af",
            borderBottom: "2px solid #9ca3af",
            pl: 2,
            pb: 2,
            position: "relative",
            overflowX: "auto",
          }}
        >
          {/* GRID LINES */}
          {[150, 300, 450, 600].map((y, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                bottom: y / 2,
                left: 0,
                right: 0,
                borderTop: "1px dashed #9ca3af",
                opacity: 0.4,
              }}
            />
          ))}

          {/* RED THRESHOLD */}
          <Box
            sx={{
              position: "absolute",
              bottom: 200,
              left: 0,
              right: 0,
              borderTop: "2px dashed red",
            }}
          />

          {/* BARS */}
          {data.map((d, i) => (
            <Box key={i} textAlign="center">
              <Box
                sx={{
                  width: 28,
                  height: d / 2,
                  background:
                    "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)",
                  borderRadius: "6px",
                }}
              />
              <Typography fontSize={10} mt={1}>
                Bidder {i + 1}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* SCROLL INDICATOR */}
        <Box
          mt={3}
          sx={{
            height: 6,
            background: "#e5e7eb",
            borderRadius: 10,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "70%",
              height: "100%",
              background: "#2563eb",
              borderRadius: 10,
            }}
          />
        </Box>

        {/* X LABEL */}
        <Typography
          textAlign="center"
          mt={2}
          color="#6b7280"
          fontSize={13}
        >
          Bidder Name
        </Typography>
      </Box>
    </Modal>
  );
};

export default ChartModal;