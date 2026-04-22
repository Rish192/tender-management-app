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
            bottom: '1.0417vw',
            right: '1.0417vw',
            width: '2.9167vw',
            height: '2.9167vw',
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
          <AutoAwesomeIcon sx={{ fontSize: '1.4583vw', color: "#fff" }} />
        </Box>
      )}

      {/* ================= CHAT WINDOW ================= */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            bottom: '1.0417vw',
            right: '1.0417vw',
            width: '20.833vw',
            height: '55.556vh',
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
              px: '0.8333vw',
              py: '0.625vw',
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "3px solid #2F4DB5",
            }}
          >
            <Box display="flex" alignItems="center" gap={'0.4167vw'}>
              <Box
                sx={{
                  width: '1.8750vw',
                  height: '1.8750vw',
                  borderRadius: "10px",
                  background: "#eef2ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SmartToyIcon sx={{ fontSize: '1.25vw', color: "#2F4DB5" }} />
              </Box>

              <Typography sx={{fontSize: '1.0417vw', fontWeight: 600, color: "#1e3a8a"}}>
                AI Assistant
              </Typography>

              <Box
                sx={{
                  width: '0.4167vw',
                  height: '0.4167vw',
                  borderRadius: "50%",
                  background: "#3b82f6",
                }}
              />
            </Box>

            {/* 🔥 CLOSE → BACK TO ICON */}
            <IconButton onClick={() => setOpen(false)} sx={{p: '0.4167vw'}}>
              <CloseIcon sx={{fontSize: '1.0417vw'}}/>
            </IconButton>
          </Box>

          {/* BODY */}
          <Box sx={{ flex: 1, p: '0.8333vw', overflowY: "auto" }}>
            <Typography textAlign="center" fontSize={'0.7292vw'} color="#6b7280" mb={'0.8333vw'}>
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
              px: '0.625vw',
              py: '0.4167vw',
              background: "#ffffff",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <IconButton sx={{p: '0.4167vw'}}>
              <AddIcon sx={{fontSize: '1.25vw'}} />
            </IconButton>

            <Box
              sx={{
                flex: 1,
                background: "#f3f4f6",
                borderRadius: "999px",
                px: '0.8333vw',
                py: '0.4167vw',
                mx: '0.4167vw',
              }}
            >
              <InputBase
                placeholder="Enter your text here!"
                fullWidth
                sx={{ fontSize: '0.7292vw' }}
              />
            </Box>

            <IconButton sx={{p: '0.4167vw'}}>
              <SendIcon sx={{ color: "#2563eb", fontSize: '1.25vw' }} />
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
      mb={'0.625vw'}
    >
      <Box
        sx={{
          maxWidth: "75%",
          px: '0.8333vw',
          py: small ? '0.2083vw' : '0.4167vw',
          borderRadius: left
            ? "12px 12px 12px 4px"
            : "12px 12px 4px 12px",
          background: left ? "#ffffff" : "#2F4DB5",
          color: left ? "#333" : "#fff",
          fontSize: '0.8333vw',
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        {text}
      </Box>
    </Box>
  );
};