// src/pages/Login.jsx

import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581093588401-22b7e8d3f1c7?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LEFT OVERLAY */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: "url('src/assets/background_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 8,

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
            zIndex: 1,
          },

          "& > *": {
            position: "relative",
            zIndex: 2,
          },
        }}
      >
        <img
          src=".\src\assets\KPMG_Logo.png"
          alt="logo"
          style={{
            width: "500%",      
            maxWidth: "200px",     
            height: "auto",         
            objectFit: "contain",
            marginBottom: "20px",
            marginLeft: "-1px",
          }}
        />

        <Typography fontSize={38} mb={2}>
          Tender Management System
        </Typography>

        <Typography maxWidth={600} color="#e5e7eb">
          Secure AI-powered platform for Tender management,
          response drafting, and cross-department coordination.
        </Typography>
      </Box>

      {/* RIGHT LOGIN CARD */}
      <Box
        sx={{
          width: 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          background: "linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.95))",
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 4,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <Typography fontSize={28} fontWeight={600} mb={1}>
            Sign In
          </Typography>

          <Typography color="gray" mb={3}>
            Authorized access only
          </Typography>

          <TextField
            fullWidth
            label="Username / Official Email"
            margin="normal"
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
          />

          <TextField
            select
            fullWidth
            label="Role"
            margin="normal"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </TextField>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              background: "#2F4DB5",
              textTransform: "none",
              fontSize: 16,
            }}
            onClick={() => navigate("/dashboard")}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;