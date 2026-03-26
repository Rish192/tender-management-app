// src/components/common/Button.jsx

import { Button as MuiButton } from "@mui/material";

const Button = ({ children, ...props }) => {
  return <MuiButton variant="contained" {...props}>{children}</MuiButton>;
};

export default Button;