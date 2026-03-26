// src/pages/Login.jsx

import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        variant="contained"
        onClick={() => navigate("/dashboard")}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;