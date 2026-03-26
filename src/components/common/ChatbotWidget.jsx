import { Box, Typography, IconButton, InputBase } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useState } from "react";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false); // 🔥 START CLOSED

  return (
    <>
      {/* ================= FLOAT BUTTON ================= */}
      {!open && (
        <Box
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            zIndex: 999,
          }}
        >
          <AutoAwesomeIcon sx={{ color: "#fff" }} />
        </Box>
      )}

      {/* ================= CHAT WINDOW ================= */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 360,
            height: 520,
            background: "#dbe9f1",
            borderRadius: "16px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              background: "#ffffff",
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "3px solid #2F4DB5",
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  background: "#eef2ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SmartToyIcon sx={{ color: "#2F4DB5" }} />
              </Box>

              <Typography fontWeight={600} color="#1e3a8a">
                AI Assistant
              </Typography>

              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#3b82f6",
                }}
              />
            </Box>

            {/* 🔥 CLOSE → BACK TO ICON */}
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* BODY */}
          <Box sx={{ flex: 1, px: 2, py: 2, overflowY: "auto" }}>
            <Typography textAlign="center" fontSize={12} color="#6b7280" mb={2}>
              Mon 7:55 PM
            </Typography>

            <Bubble text="How can I help you today?" left />
            <Bubble text="Yes, can you help me." />
            <Bubble text="I need you to know about the tender details and the restrictions associated with it!" />
            <Bubble text="Can you help me out." />
            <Bubble text="...." left small />
          </Box>

          {/* INPUT */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 1.5,
              py: 1,
              background: "#ffffff",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <IconButton>
              <AddIcon />
            </IconButton>

            <Box
              sx={{
                flex: 1,
                background: "#f3f4f6",
                borderRadius: "999px",
                px: 2,
                py: 0.8,
                mx: 1,
              }}
            >
              <InputBase
                placeholder="Enter your text here!"
                fullWidth
                sx={{ fontSize: 13 }}
              />
            </Box>

            <IconButton>
              <SendIcon sx={{ color: "#2563eb" }} />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChatbotWidget;


/* ================= BUBBLE ================= */

const Bubble = ({ text, left, small }) => {
  return (
    <Box
      display="flex"
      justifyContent={left ? "flex-start" : "flex-end"}
      mb={1.5}
    >
      <Box
        sx={{
          maxWidth: "75%",
          px: 2,
          py: small ? 0.5 : 1,
          borderRadius: left
            ? "12px 12px 12px 4px"
            : "12px 12px 4px 12px",
          background: left ? "#ffffff" : "#2F4DB5",
          color: left ? "#333" : "#fff",
          fontSize: 13,
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        {text}
      </Box>
    </Box>
  );
};